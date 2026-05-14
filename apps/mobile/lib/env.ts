import Constants from "expo-constants";

type Extra = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

/** Merge legacy manifest `extra` with `expoConfig.extra` (Expo Go / web sometimes only populate one). */
function getExtra(): Extra {
  const fromManifest = (Constants.manifest as { extra?: Extra } | null)?.extra;
  const fromExpoConfig = Constants.expoConfig?.extra as Extra | undefined;
  return { ...(fromManifest ?? {}), ...(fromExpoConfig ?? {}) };
}

export function getSupabaseUrl(): string | undefined {
  const fromExtra = getExtra().supabaseUrl;
  if (fromExtra) return fromExtra.trim();
  return (
    process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim()
  );
}

export function getSupabaseAnonKey(): string | undefined {
  const fromExtra = getExtra().supabaseAnonKey;
  if (fromExtra) return fromExtra.trim();
  return (
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim()
  );
}
