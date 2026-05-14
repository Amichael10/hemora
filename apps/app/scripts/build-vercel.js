#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// TanStack Start / Nitro output paths
const distClient = path.join(root, ".output", "public");
const distServer = path.join(root, ".output", "server");
const vercelOut = path.join(root, ".vercel", "output");

console.log("🛠️ Starting Vercel Build Output API v3 transformation...");

// Clean and recreate .vercel/output
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(vercelOut, { recursive: true });

// 1. Copy static client assets
console.log("📦 Copying static assets...");
const staticDir = path.join(vercelOut, "static");
if (fs.existsSync(distClient)) {
  fs.cpSync(distClient, staticDir, { recursive: true });
}

// 2. Create Node.js serverless function
console.log("🚀 Building serverless function...");
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

// Copy EVERY file from the server output to the function directory
if (fs.existsSync(distServer)) {
  console.log("   📂 Copying server files...");
  fs.cpSync(distServer, funcDir, { recursive: true });
}

// CRITICAL: Ensure index.mjs exists (Vercel's entry point)
const indexMjs = path.join(funcDir, "index.mjs");
const serverMjs = path.join(funcDir, "server.mjs");

if (!fs.existsSync(indexMjs)) {
  if (fs.existsSync(serverMjs)) {
    console.log("   🔄 Renaming server.mjs to index.mjs...");
    fs.renameSync(serverMjs, indexMjs);
  } else {
    console.log("   ❌ Error: No server entry point found!");
  }
}

// DIAGNOSTIC: List files in function directory
console.log("📂 Function Directory Contents:");
fs.readdirSync(funcDir).forEach(file => console.log(`   📄 ${file}`));

// 3. Write config.json
console.log("📝 Writing config.json...");
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

console.log("\n✅ Build complete. Ready for Vercel.");
