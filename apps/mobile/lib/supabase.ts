import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseUrl } from "@/lib/env";

let client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (client) return client;
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      const missing: string[] = [];
      if (!url) missing.push("Supabase URL (extra or EXPO_PUBLIC_SUPABASE_URL / VITE_SUPABASE_URL / SUPABASE_URL)");
      if (!key)
        missing.push(
          "anon/publishable key (extra or EXPO_PUBLIC_SUPABASE_ANON_KEY / EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY / …)",
        );
      console.warn(
        `[Supabase] Not configured — missing: ${missing.join(" · ")}. Put vars in apps/mobile/.env, then stop Metro and run: pnpm run start:clean`,
      );
    }
    return null;
  }
  client = createClient(url, key, {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: "pkce",
    },
  });
  return client;
}
