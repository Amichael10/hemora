import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProfileByUser, ApiError } from "@workspace/api-client-react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileContextType {
  profileId: string;
  activeProfileId: string;
  setActiveProfileId: (id: string) => void;
  familyMembers: any[];
  setProfileId: (id: string) => void;
  /** The detailed member object for the active profile */
  activeMember: any | null;
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
  const [activeProfileId, setActiveProfileId] = useState<string>(FALLBACK_PROFILE_ID);
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
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

        // Also fetch family members
        const { data: members, error: familyError } = await supabase
          .from("family_members")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: true });
        
        if (cancelled) return;

        if (members && members.length > 0) {
          const mappedMembers = members.map(m => ({
            id: m.id,
            fullName: m.full_name,
            isSelf: m.is_self,
            relationship: m.relationship
          }));
          setFamilyMembers(mappedMembers);
          // Default active profile to the one marked as self, or the first one
          const self = mappedMembers.find(m => m.isSelf);
          setActiveProfileId(self ? self.id : mappedMembers[0].id);
        } else {
          // If no family members yet, use the main profile ID as fallback active
          setActiveProfileId(profile.id);
        }

        setNeedsOnboarding(false);
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setNeedsOnboarding(true);
        }
      } finally {
        if (!cancelled) setResolving(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authLoading, user?.id]);

  return (
    <ProfileContext.Provider value={{ 
      profileId, 
      activeProfileId, 
      setActiveProfileId, 
      familyMembers, 
      activeMember: familyMembers.find(m => m.id === activeProfileId) || null,
      setProfileId, 
      resolving, 
      needsOnboarding 
    }}>
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
