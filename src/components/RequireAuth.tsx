import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { HemoraLoader } from "./HemoraLoader";

/**
 * Gate any protected page behind an authenticated session.
 * - While auth is loading, shows the branded loader.
 * - If unauthenticated, redirects to /login (no flash of protected UI).
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/login");
    }
  }, [loading, user, setLocation]);

  if (loading || !user) {
    return <HemoraLoader sublabel={loading ? "Getting things ready…" : "Redirecting to sign in…"} />;
  }
  return <>{children}</>;
}

export default RequireAuth;