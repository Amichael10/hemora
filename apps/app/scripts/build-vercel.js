#!/usr/bin/env node
/**
 * Vercel Build Output API v3 postbuild script
 *
 * TanStack Start actual build output (verified locally):
 *   dist/server/server.js        ← SSR entry point
 *   dist/server/assets/*.js      ← ALL JS chunks (both client + server)
 *   (no dist/client/ folder)
 *
 * Strategy:
 *   - Copy dist/server/assets/ → .vercel/output/static/assets/  (browser can fetch them)
 *   - Copy dist/server/         → .vercel/output/functions/index.func/ (SSR runtime)
 *   - Create index.mjs wrapper  → so Vercel finds the entry point
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const distServer = path.join(root, "dist", "server");
const distAssets = path.join(distServer, "assets");
const vercelOut = path.join(root, ".vercel", "output");

console.log("🛠️  Starting Vercel Build Output API v3 transformation...");

// Verify the build actually ran
if (!fs.existsSync(distServer)) {
  console.error("❌ dist/server not found — did the build run?");
  process.exit(1);
}

// Clean and recreate .vercel/output
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(vercelOut, { recursive: true });

// ── 1. Static assets ─────────────────────────────────────────────────────────
// Copy dist/server/assets/ → .vercel/output/static/assets/
// Vercel will serve these directly with correct MIME types (no SSR needed)
console.log("📦 Copying static assets (dist/server/assets → static/assets) ...");
const staticAssetsDir = path.join(vercelOut, "static", "assets");
if (fs.existsSync(distAssets)) {
  fs.cpSync(distAssets, staticAssetsDir, { recursive: true });
  const count = fs.readdirSync(staticAssetsDir).length;
  console.log(`   ✅ ${count} asset files copied.`);
} else {
  console.warn("   ⚠️  No dist/server/assets directory found.");
}

// ── 2. Serverless function ────────────────────────────────────────────────────
console.log("🚀 Building serverless function ...");
const funcDir = path.join(vercelOut, "functions", "index.func");
fs.mkdirSync(funcDir, { recursive: true });

// Runtime config
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
  }, null, 2)
);

// Copy entire dist/server/ into the function directory
fs.cpSync(distServer, funcDir, { recursive: true });
console.log("   ✅ Server runtime copied.");

// Create index.mjs → entry point Vercel calls
// This wrapper returns 404 for /assets/ paths so Vercel's static handler serves them
const serverJs = path.join(funcDir, "server.js");
const indexMjs = path.join(funcDir, "index.mjs");

if (fs.existsSync(serverJs)) {
  console.log("   🔄 Creating index.mjs wrapper for server.js ...");
  fs.writeFileSync(indexMjs, `
import handler from "./server.js";

export default async function(req, res) {
  // Never let SSR handle static asset paths — return 404 so Vercel serves them from static
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/assets/")) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  return handler(req, res);
}
`.trim() + "\n");
  console.log("   ✅ index.mjs created.");
} else {
  console.error("   ❌ server.js not found in dist/server!");
  process.exit(1);
}

// ── 3. Routing config ─────────────────────────────────────────────────────────
console.log("📝 Writing config.json ...");
fs.writeFileSync(
  path.join(vercelOut, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      // Static assets bypass SSR entirely
      {
        src: "/assets/(.+\\.(js|css|png|jpg|svg|ico|woff2|woff|ttf|json))",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      // Vercel checks static folder first
      { handle: "filesystem" },
      // Everything else → SSR
      { src: "/(.*)", dest: "/index" },
    ],
  }, null, 2)
);

console.log("\n✅ .vercel/output built successfully.");
