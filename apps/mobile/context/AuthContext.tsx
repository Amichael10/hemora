import type { Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getGoogleOAuthRedirectUrl } from "@/lib/authRedirect";
import { getSupabaseMissingEnvHint } from "@/lib/env";
import { establishSessionFromUrl, hasAuthPayloadInUrl } from "@/lib/oauthRedirectHandler";
import { getSupabase } from "@/lib/supabase";
import { registerForPushNotificationsAsync } from "@/lib/notifications";

type AuthState = {
  user: User | null;
  session: Session | null;
  ready: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  completeAuthFromUrl: (url: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  const completeAuthFromUrl = useCallback(async (url: string) => {
    const supabase = getSupabase();
    if (!supabase || !url) return;
    if (!hasAuthPayloadInUrl(url)) return;
    const { error } = await establishSessionFromUrl(supabase, url);
    if (error) {
      console.warn("[Auth] Could not complete redirect:", error);
    }
  }, []);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setSession(null);
      setReady(true);
      return;
    }

    let cancelled = false;

    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) {
        setSession(data.session ?? null);
        setReady(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    const linkSub = Linking.addEventListener("url", ({ url }) => {
      void completeAuthFromUrl(url);
    });
    void Linking.getInitialURL().then((url) => {
      if (url) void completeAuthFromUrl(url);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      linkSub.remove();
    };
  }, [completeAuthFromUrl]);

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: getSupabaseMissingEnvHint() || "Supabase is not configured." };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) {
      return { error: getSupabaseMissingEnvHint() || "Supabase is not configured." };
    }
    const redirectTo = getGoogleOAuthRedirectUrl();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });
    if (error) return { error: error.message };
    if (!data?.url) return { error: "Could not start Google sign-in." };

    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (result.type === "success" && "url" in result && result.url) {
      const { error: sessionErr } = await establishSessionFromUrl(supabase, result.url);
      if (sessionErr) return { error: sessionErr };
      return { error: null };
    }

    if (result.type === "cancel") {
      return { error: "Google sign-in was cancelled." };
    }

    /**
     * `dismiss` / `locked` / `opened`: the in-app browser closed without returning a URL.
     * On some devices the deep link still fires → `Linking` listener runs `completeAuthFromUrl`.
     */
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabase();
    if (supabase) await supabase.auth.signOut();
  }, []);

  const user = session?.user ?? null;

  useEffect(() => {
    if (user) {
      void registerForPushNotificationsAsync();
    }
  }, [user]);

  const value = useMemo<AuthState>(
    () => ({
      user: session?.user ?? null,
      session,
      ready,
      signInWithPassword,
      signInWithGoogle,
      completeAuthFromUrl,
      signOut,
    }),
    [session, ready, signInWithPassword, signInWithGoogle, completeAuthFromUrl, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
