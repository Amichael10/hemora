import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/AuthContext";
import { HemoraLoader } from "./HemoraLoader";

const APP_HOST_PREFIX = "app.";

/**
 * Gate any protected page behind an authenticated session.
 * - On non-app hosts (hemora.xyz, www, staging, previews), unauthenticated
 *   users are sent to the marketing landing page instead of /login. Auth is
 *   only enforced on app.hemora.xyz.
 * - While auth is loading, shows the branded loader.
 * - On the app host, unauthenticated users are redirected to /login.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (loading || user) return;
    if (typeof window === "undefined") {
      setLocation("/login");
      return;
    }
    const host = window.location.hostname;
    const isAppHost = host.startsWith(APP_HOST_PREFIX);
    if (isAppHost) {
      setLocation("/login");
    } else {
      setLocation("/");
    }
  }, [loading, user, setLocation]);

  if (loading || !user) {
    return <HemoraLoader sublabel={loading ? "Getting things ready…" : "Redirecting to sign in…"} />;
  }
  return <>{children}</>;
}

export default RequireAuth;