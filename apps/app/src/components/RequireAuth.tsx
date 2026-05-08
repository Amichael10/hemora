import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { HemoraLoader } from "./HemoraLoader";

/**
 * Gate any protected page behind an authenticated session.
 * This project is the app shell — unauthenticated users are always sent to
 * /login. The marketing landing page lives in a separate Lovable project on
 * hemora.xyz / staging.hemora.xyz.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (loading || user) return;
    setLocation("/login");
  }, [loading, user, setLocation]);

  if (loading || !user) {
    return <HemoraLoader sublabel={loading ? "Getting things ready…" : "Redirecting to sign in…"} />;
  }
  return <>{children}</>;
}

export default RequireAuth;