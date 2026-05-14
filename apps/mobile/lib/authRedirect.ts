import Constants from "expo-constants";
import { makeRedirectUri } from "expo-auth-session";
import * as Linking from "expo-linking";
import { Platform } from "react-native";

type Extra = {
  /** Expo Go: exp://192.168.x.x:8081/--/auth-callback — set EXPO_PUBLIC_AUTH_REDIRECT in apps/app/.env */
  authRedirectUrl?: string;
};

/**
 * Must match Supabase → Auth → URL Configuration → Additional Redirect URLs.
 * For Expo Go (changing LAN IP), add one wildcard row: `exp://**` (see Supabase redirect URL docs).
 * For dev client / release builds, add: `hemora://auth-callback`
 */
export const HEMORA_AUTH_CALLBACK = "hemora://auth-callback";

/** Copy into Supabase → Additional Redirect URLs (wildcards are supported). */
export const SUPABASE_REDIRECT_ALLOWLIST_HINT = [
  "hemora://auth-callback",
  "exp://**",
] as const;

function getExtraOverride(): string | undefined {
  return (Constants.expoConfig?.extra as Extra | undefined)?.authRedirectUrl?.trim();
}

/** Supabase Additional Redirect URLs reject `localhost`; use loopback IP instead. */
function supabaseSafeWebRedirect(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname === "localhost") {
      u.hostname = "127.0.0.1";
      return u.href.replace(/\/$/, "");
    }
  } catch {
    /* ignore */
  }
  return url;
}

function webAuthCallbackUrl(): string {
  return supabaseSafeWebRedirect(Linking.createURL("/auth-callback"));
}

/**
 * Magic link emailRedirectTo.
 * - Web: http(s) URL so the browser can finish the redirect (not hemora://).
 * - Native + EXPO_PUBLIC_AUTH_REDIRECT: Expo Go (exp://…).
 * - Native APK / dev build without override: hemora://auth-callback.
 */
export function getAuthRedirectUrl(): string {
  if (Platform.OS === "web") {
    return webAuthCallbackUrl();
  }
  const override = getExtraOverride();
  if (override) return override;
  /** Expo Go needs `exp://…/--/auth-callback`; dev builds use `hemora://auth-callback`. */
  return makeRedirectUri({
    scheme: "hemora",
    path: "auth-callback",
  });
}

/**
 * Google OAuth redirectTo + WebBrowser.openAuthSessionAsync return URL (must be identical).
 * - Web: same as magic link — http://127.0.0.1…/auth-callback (Supabase disallows localhost).
 * - Native + override: Expo Go uses exp://… (hemora:// does not open in Expo Go).
 * - Production APK without override: hemora://auth-callback.
 */
export function getGoogleOAuthRedirectUrl(): string {
  return getAuthRedirectUrl();
}
