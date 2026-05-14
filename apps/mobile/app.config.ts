import * as fs from "node:fs";
import * as path from "node:path";

import type { ConfigContext, ExpoConfig } from "expo/config";

/** Load env files in order; later files override earlier keys (same as most dotenv CLIs). */
function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

const repoRootEnv = path.resolve(__dirname, "../../.env");
const siblingAppEnv = path.resolve(__dirname, "../app/.env");
const mobileEnv = path.resolve(__dirname, ".env");
loadEnvFile(repoRootEnv);
loadEnvFile(siblingAppEnv);
loadEnvFile(mobileEnv);

export default ({ config }: ConfigContext): ExpoConfig => {
  const existingExtra = (config.extra ?? {}) as Record<string, unknown>;

  const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    (typeof existingExtra.supabaseUrl === "string" ? existingExtra.supabaseUrl.trim() : "");

  const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.VITE_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    (typeof existingExtra.supabaseAnonKey === "string" ? existingExtra.supabaseAnonKey.trim() : "");

  const authRedirectUrl =
    process.env.EXPO_PUBLIC_AUTH_REDIRECT?.trim() ||
    (typeof existingExtra.authRedirectUrl === "string" ? existingExtra.authRedirectUrl.trim() : "");

  return {
    ...config,
    name: "Hemora",
    slug: "hemora",
    scheme: "hemora",
    icon: "./assets/brand/app-icon.png",
    splash: {
      image: "./assets/brand/hemora-logo.png",
      resizeMode: "contain",
      backgroundColor: "#f4ead8",
    },
    ios: {
      ...config.ios,
      bundleIdentifier: "com.hemora.app",
    },
    android: {
      ...config.android,
      package: "com.hemora.app",
      adaptiveIcon: {
        foregroundImage: "./assets/brand/app-icon.png",
        backgroundColor: "#f4ead8",
      },
    },
    extra: {
      ...existingExtra,
      ...(supabaseUrl ? { supabaseUrl } : {}),
      ...(supabaseAnonKey ? { supabaseAnonKey } : {}),
      ...(authRedirectUrl ? { authRedirectUrl } : {}),
    },
  };
};
