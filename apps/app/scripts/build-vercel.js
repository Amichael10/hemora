#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const distClient = path.join(root, ".output", "public");
const distServer = path.join(root, ".output", "server");
const vercelOut = path.join(root, ".vercel", "output");

// Clean and recreate .vercel/output
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(vercelOut, { recursive: true });

// 1. Copy static client assets → .vercel/output/static/
console.log("📦 Copying static assets...");
const staticDir = path.join(vercelOut, "static");
if (fs.existsSync(distClient)) {
  copyDir(distClient, staticDir);
}

// 2. Create Node.js serverless function
console.log("🚀 Building Node.js function...");
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

// Copy the server build into the function directory
if (fs.existsSync(distServer)) {
  copyDir(distServer, funcDir);
}

// Rename Nitro's entry to index.mjs if needed, or wrap it
const nitroEntry = path.join(funcDir, "index.mjs");
if (!fs.existsSync(nitroEntry)) {
  // If Nitro output 'server.mjs' instead
  const altEntry = path.join(funcDir, "server.mjs");
  if (fs.existsSync(altEntry)) {
    fs.renameSync(altEntry, nitroEntry);
  }
}

// 3. Write config.json — routing
console.log("📝 Writing .vercel/output/config.json ...");
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

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
