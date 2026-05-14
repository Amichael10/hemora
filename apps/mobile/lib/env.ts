import Constants from "expo-constants";

type Extra = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

/**
 * Resolve Supabase URL / anon key for the running bundle.
 *
 * Prefer `process.env.EXPO_PUBLIC_*` first: Metro inlines those at bundle time, so they work
 * reliably in Expo Go and on device. `Constants.expoConfig.extra` can be empty or stale there;
 * use it only as a fallback (e.g. values set only in app.config without EXPO_PUBLIC_ prefix).
 */
function getExtra(): Extra {
  const fromManifest = (Constants.manifest as { extra?: Extra } | null)?.extra;
  const fromExpoConfig = Constants.expoConfig?.extra as Extra | undefined;
  return { ...(fromManifest ?? {}), ...(fromExpoConfig ?? {}) };
}

export function getSupabaseUrl(): string | undefined {
  const fromEnv =
    process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();
  if (fromEnv) return fromEnv;
  const fromExtra = getExtra().supabaseUrl?.trim();
  return fromExtra || undefined;
}

export function getSupabaseAnonKey(): string | undefined {
  const fromEnv =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim();
  if (fromEnv) return fromEnv;
  const fromExtra = getExtra().supabaseAnonKey?.trim();
  return fromExtra || undefined;
}

/** User-facing hint when URL or key is missing (no secrets). */
export function getSupabaseMissingEnvHint(): string {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (url && key) return "";
  const missing: string[] = [];
  if (!url) missing.push("project URL (e.g. EXPO_PUBLIC_SUPABASE_URL)");
  if (!key) missing.push("anon key (e.g. EXPO_PUBLIC_SUPABASE_ANON_KEY)");
  return `Missing ${missing.join(" and ")}. Add them to apps/mobile/.env (see .env.example), save, then run: pnpm run start:clean`;
}
