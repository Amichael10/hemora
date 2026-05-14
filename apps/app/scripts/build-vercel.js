#!/usr/bin/env node
/**
 * Vercel Build Output API v3 postbuild script
 * Verified paths from actual local build output:
 *   - Static: dist/client/
 *   - Server: dist/server/server.js (main entry)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// CORRECT paths confirmed by running `pnpm build` locally
const distClient = path.join(root, "dist", "client");
const distServer = path.join(root, "dist", "server");
const vercelOut = path.join(root, ".vercel", "output");

console.log("🛠️  Starting Vercel Build Output API v3 transformation...");

// Clean and recreate .vercel/output
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(vercelOut, { recursive: true });

// 1. Copy static client assets → .vercel/output/static/
console.log("📦 Copying static assets from dist/client ...");
const staticDir = path.join(vercelOut, "static");
if (fs.existsSync(distClient)) {
  fs.cpSync(distClient, staticDir, { recursive: true });
  console.log("   ✅ Static assets copied.");
} else {
  console.error("   ❌ dist/client not found!");
  process.exit(1);
}

// 2. Create Node.js serverless function
console.log("🚀 Building serverless function ...");
const funcDir = path.join(vercelOut, "functions", "index.func");
fs.mkdirSync(funcDir, { recursive: true });

// .vc-config.json — Node.js 22 serverless runtime
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
  }, null, 2)
);

// Copy all server build files into the function directory
if (fs.existsSync(distServer)) {
  fs.cpSync(distServer, funcDir, { recursive: true });
  console.log("   ✅ Server files copied.");
} else {
  console.error("   ❌ dist/server not found!");
  process.exit(1);
}

// The server entry is dist/server/server.js — wrap it as index.mjs for Vercel
const serverJs = path.join(funcDir, "server.js");
const indexMjs = path.join(funcDir, "index.mjs");

if (fs.existsSync(serverJs) && !fs.existsSync(indexMjs)) {
  console.log("   🔄 Creating index.mjs wrapper for server.js ...");
  // Write an ESM wrapper that imports and re-exports the server handler
  fs.writeFileSync(indexMjs, `import handler from "./server.js";\nexport default handler;\n`);
  console.log("   ✅ index.mjs created.");
} else if (fs.existsSync(indexMjs)) {
  console.log("   ✅ index.mjs already exists.");
} else {
  console.error("   ❌ Neither server.js nor index.mjs found in dist/server!");
  process.exit(1);
}

// 3. Write config.json — routing
console.log("📝 Writing config.json ...");
const config = {
  version: 3,
  routes: [
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/index" },
  ],
};
fs.writeFileSync(
  path.join(vercelOut, "config.json"),
  JSON.stringify(config, null, 2)
);

console.log("\n✅ .vercel/output built successfully.");
