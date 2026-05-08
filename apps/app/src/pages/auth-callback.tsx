import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { getProfileByUser } from "@workspace/api-client-react";
import { ApiError } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const { setProfileId } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setLocation("/onboarding");
      return;
    }

    let cancelled = false;
    setError(null);
    (async () => {
      try {
        const profile = await getProfileByUser(user.id);
        if (cancelled) return;
        setProfileId(String(profile.id));
        setLocation("/dashboard");
      } catch (err) {
        if (cancelled) return;
        // Only 404 means "no linked profile yet" → continue onboarding.
        if (err instanceof ApiError && err.status === 404) {
          setLocation("/onboarding?step=1");
          return;
        }
        const msg =
          err instanceof Error ? err.message : "We couldn't reach the server.";
        setError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user?.id, retryKey]);

  if (error) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-secondary p-6">
        <div className="text-center space-y-4 max-w-sm">
          <h2 className="font-serif text-xl text-primary">Couldn't finish signing you in</h2>
          <p className="text-sm text-muted-foreground" data-testid="text-callback-error">{error}</p>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setRetryKey((k) => k + 1)}
              data-testid="button-callback-retry"
            >
              Try again
            </Button>
            <Button
              variant="outline"
              onClick={() => setLocation("/onboarding")}
              data-testid="button-callback-back"
            >
              Back to sign in
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-secondary">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground text-sm">Signing you in…</p>
      </div>
    </div>
  );
}
