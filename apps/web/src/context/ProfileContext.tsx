import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfileByUser, ApiError } from "@workspace/api-client-react";

interface ProfileContextType {
  profileId: string;
  setProfileId: (id: string) => void;
  /** True while we're resolving a profile for the current auth session. */
  resolving: boolean;
  /** True when we have an authenticated user but no linked profile yet. */
  needsOnboarding: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const FALLBACK_PROFILE_ID = "";

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [profileId, setProfileId] = useState<string>(FALLBACK_PROFILE_ID);
  const [resolving, setResolving] = useState<boolean>(true);
  const [needsOnboarding, setNeedsOnboarding] = useState<boolean>(false);

  useEffect(() => {
    if (authLoading) return;

    // Unauthenticated (skip-flow / new install): keep the seeded demo profile so
    // existing pages keep working until proper auth gating is added server-side.
    if (!user) {
      setProfileId(FALLBACK_PROFILE_ID);
      setNeedsOnboarding(false);
      setResolving(false);
      return;
    }

    let cancelled = false;
    setResolving(true);
    (async () => {
      try {
        const profile = await getProfileByUser(user.id);
        if (cancelled) return;
        setProfileId(profile.id);
        setNeedsOnboarding(false);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          // Authed but no linked profile yet — onboarding will create one.
          setNeedsOnboarding(true);
        }
        // For other errors leave needsOnboarding false; auth-callback surfaces them.
      } finally {
        if (!cancelled) setResolving(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.id]);

  return (
    <ProfileContext.Provider value={{ profileId, setProfileId, resolving, needsOnboarding }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
