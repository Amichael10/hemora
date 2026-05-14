import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

import { getSupabaseAnonKey, getSupabaseMissingEnvHint, getSupabaseUrl } from "@/lib/env";

let client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (client) return client;
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();
  if (!url || !key) {
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.warn(`[Supabase] ${getSupabaseMissingEnvHint() || "Not configured."}`);
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
