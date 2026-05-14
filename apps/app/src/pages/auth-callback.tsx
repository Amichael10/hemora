import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { supabase } from "@/integrations/supabase/client";
import { getProfileByUser, ApiError } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const { setProfileId } = useProfile();
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (loading) return;

    let cancelled = false;
    setError(null);

    (async () => {
      try {
        // 1. Check for token_hash in URL (from email link)
        const params = new URLSearchParams(window.location.search);
        const tokenHash = params.get("token_hash");
        const type = params.get("type") as any;

        if (tokenHash && type) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type,
          });
          if (verifyError) throw verifyError;
        }

        // 2. If we still don't have a user after verification attempt, go to onboarding/login
        if (!user) {
          // If we weren't trying to verify a token, just redirect
          if (!tokenHash) {
            setLocation("/onboarding");
          }
          return;
        }

        // 3. We have a user! Check if they have a profile.
        const profile = await getProfileByUser(user.id);
        if (cancelled) return;
        setProfileId(String(profile.id));
        
        // Profile already exists → returning user. Always go straight to dashboard.
        setLocation("/dashboard");
      } catch (err) {
        if (cancelled) return;
        
        // 404 = no linked profile yet → brand new user, begin onboarding.
        if (err instanceof ApiError && err.status === 404) {
          const provider = user?.app_metadata?.provider ?? "email";
          setLocation(`/onboarding?step=1&provider=${provider}`);
          return;
        }

        const msg = err instanceof Error ? err.message : "We couldn't finish signing you in.";
        setError(msg);
      }
    })();

    return () => {
      cancelled = true;
    };
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
