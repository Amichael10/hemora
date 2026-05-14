import type { SupabaseClient } from "@supabase/supabase-js";
import * as QueryParams from "expo-auth-session/build/QueryParams";

function pick(v: string | string[] | undefined): string | undefined {
  if (v == null) return undefined;
  return Array.isArray(v) ? v[0] : v;
}

function readAuthParams(url: string) {
  const { params, errorCode } = QueryParams.getQueryParams(url);
  return {
    errorCode: errorCode ?? null,
    oauthError: pick(params.error),
    oauthErrorDesc: pick(params.error_description),
    accessToken: pick(params.access_token),
    refreshToken: pick(params.refresh_token),
    code: pick(params.code),
  };
}

export function hasAuthPayloadInUrl(url: string): boolean {
  try {
    const p = readAuthParams(url);
    return Boolean(p.errorCode || p.oauthError || p.accessToken || p.refreshToken || p.code);
  } catch {
    return false;
  }
}

/**
 * Parses Supabase OAuth / magic-link redirects (query + hash) and sets the session.
 * PKCE returns `?code=…`; some flows return `#access_token=…&refresh_token=…`.
 */
export async function establishSessionFromUrl(
  supabase: SupabaseClient,
  url: string
): Promise<{ error: string | null }> {
  try {
    const { errorCode, oauthError, oauthErrorDesc, accessToken, refreshToken, code } = readAuthParams(url);
    if (errorCode) {
      return { error: `Sign-in failed (${errorCode}).` };
    }
    if (oauthError) {
      return { error: String(oauthErrorDesc ?? oauthError) };
    }

    if (accessToken && refreshToken) {
      const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
      return { error: error?.message ?? null };
    }

    if (code && code.length > 0) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      return { error: error?.message ?? null };
    }

    return { error: "No auth code or tokens in the redirect link." };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Could not parse sign-in link." };
  }
}
