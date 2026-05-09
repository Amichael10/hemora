// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "node:path";
import { loadEnv } from "vite";

// Load all (non VITE_-prefixed) env vars into process.env for server routes
// (e.g. SUPABASE_SERVICE_ROLE_KEY, LOVABLE_API_KEY). Do NOT expose via define.
const serverEnv = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
Object.assign(process.env, serverEnv);

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/lib/workspace/assets"),
        "@workspace/regions": path.resolve(__dirname, "src/lib/workspace/regions/index.ts"),
        "@workspace/api-client-react": path.resolve(__dirname, "src/lib/workspace/api-client-react/index.ts"),
      },
    },
    ssr: {
      noExternal: ["entities"],
    },
  },
});
