#!/usr/bin/env node
/**
 * Vercel Build Output API v3 postbuild script
 *
 * Transforms TanStack Start Vite output (dist/client + dist/server)
 * into .vercel/output format so Vercel serves it correctly.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const distClient = path.join(root, "dist", "client");
const distServer = path.join(root, "dist", "server");
const vercelOut = path.join(root, ".vercel", "output");

// Clean and recreate .vercel/output
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(vercelOut, { recursive: true });

// 1. Copy static client assets → .vercel/output/static/
console.log("📦 Copying client assets → .vercel/output/static/ ...");
const staticDir = path.join(vercelOut, "static");
copyDir(distClient, staticDir);

// Ensure 'assets' is at the root of static (some frameworks nest it)
const buildAssets = path.join(staticDir, "_build", "assets");
const rootAssets = path.join(staticDir, "assets");
if (fs.existsSync(buildAssets) && !fs.existsSync(rootAssets)) {
  console.log("   🚚 Moving _build/assets to root assets...");
  copyDir(buildAssets, rootAssets);
}
console.log("   done.");

// 2. Create Node.js serverless function
console.log("🚀 Building Node.js function → .vercel/output/functions/index.func/ ...");
const funcDir = path.join(vercelOut, "functions", "index.func");
fs.mkdirSync(funcDir, { recursive: true });

// .vc-config.json — Node.js 22 serverless runtime
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs22.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: true,
    },
    null,
    2
  )
);

// Copy the server build into the function directory
copyDir(distServer, funcDir);

// index.mjs — wraps the fetch-API handler for Vercel's Node.js runtime
const entry = `
import server from "./server.js";

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, \`http://\${req.headers.host || "localhost"}\`);
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
      duplex: "half",
    });

    const response = await server.fetch(request);

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error("SSR Execution Error:", error);
    res.statusCode = 500;
    res.end("Internal Server Error: " + error.message);
  }
}
`.trimStart();

fs.writeFileSync(path.join(funcDir, "index.mjs"), entry);
console.log("   done.");

// 3. Write config.json — routing
console.log("📝 Writing .vercel/output/config.json ...");
const config = {
  version: 3,
  routes: [
    {
      src: "^/assets/(.*)$",
      dest: "/assets/$1",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    { handle: "filesystem" },
    { src: "/(.*)", dest: "/index" },
  ],
};
fs.writeFileSync(
  path.join(vercelOut, "config.json"),
  JSON.stringify(config, null, 2)
);
console.log("   done.");

console.log("\n✅ .vercel/output built successfully.");

// --- helpers ---
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
