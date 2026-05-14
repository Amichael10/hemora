import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    tsconfigPaths(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "src/lib/workspace/assets"),
      "@workspace/regions": path.resolve(
        __dirname,
        "src/lib/workspace/regions/index.ts"
      ),
      "@workspace/api-client-react": path.resolve(
        __dirname,
        "src/lib/workspace/api-client-react/index.ts"
      ),
    },
  },
  ssr: {
    noExternal: true,
  },
});
