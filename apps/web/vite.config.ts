import { defineConfig, loadEnv } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Load all (non VITE_-prefixed) env vars into process.env for server routes
// (e.g. SUPABASE_SERVICE_ROLE_KEY, HEMORA_API_KEY). Do NOT expose via define.
const serverEnv = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "");
Object.assign(process.env, serverEnv);

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "src/lib/workspace/assets"),
      "@workspace/regions": path.resolve(__dirname, "src/lib/workspace/regions/index.ts"),
      "@workspace/api-client-react": path.resolve(__dirname, "src/lib/workspace/api-client-react/index.ts"),
    },
  },
  optimizeDeps: {
    include: ["@tanstack/query-core"],
  },
  ssr: {
    noExternal: [
      "@tanstack/react-start",
      "@tanstack/react-router",
      "lucide-react",
      "recharts",
      "gsap",
      "framer-motion",
    ],
  },
});
