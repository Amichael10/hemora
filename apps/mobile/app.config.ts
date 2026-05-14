import * as fs from "node:fs";
import * as path from "node:path";

import type { ConfigContext, ExpoConfig } from "expo/config";

/** Load repo root `.env` then `apps/app/.env` (later wins on duplicate keys). Same Supabase vars as Lovable/Vite (`VITE_SUPABASE_*`). */
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
    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

const siblingAppEnv = path.resolve(__dirname, "../app/.env");
const repoRootEnv = path.resolve(__dirname, "../../.env");
loadEnvFile(repoRootEnv);
loadEnvFile(siblingAppEnv);

export default ({ config }: ConfigContext): ExpoConfig => {
  const supabaseUrl =
    process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.VITE_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim();
  const supabaseAnonKey =
    process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  const authRedirectUrl = process.env.EXPO_PUBLIC_AUTH_REDIRECT?.trim();

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
      ...config.extra,
      supabaseUrl,
      supabaseAnonKey,
      ...(authRedirectUrl ? { authRedirectUrl } : {}),
    },
  };
};
