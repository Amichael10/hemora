import Constants from "expo-constants";

type Extra = {
  supabaseUrl?: string;
  supabaseAnonKey?: string;
};

function getExtra(): Extra {
  const extra = Constants.expoConfig?.extra as Extra | undefined;
  return extra ?? {};
}

export function getSupabaseUrl(): string | undefined {
  const fromExtra = getExtra().supabaseUrl;
  if (fromExtra) return fromExtra.trim();
  return process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
}

export function getSupabaseAnonKey(): string | undefined {
  const fromExtra = getExtra().supabaseAnonKey;
  if (fromExtra) return fromExtra.trim();
  return process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
}
