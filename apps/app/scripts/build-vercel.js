#!/usr/bin/env node
/**
 * Vercel Build Output API v3 postbuild script
 *
 * Transforms TanStack Start Vite output (dist/client + dist/server)
 * into .vercel/output format so Vercel serves it correctly.
 *
 * Structure created:
 *   .vercel/output/
 *     config.json              - routing rules
 *     static/                  - client assets (dist/client/**)
 *     functions/
 *       index.func/            - Node.js 22 serverless function
 *         .vc-config.json      - marks as nodejs22 function
 *         index.mjs            - entry: wraps SSR handler for Node.js HTTP
 *         server.js            - built SSR handler (fetch-API based)
 *         assets/              - server assets
 *         node_modules/        - symlinked or copied for bare specifiers
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const distClient = path.join(root, "dist", "client");
const distServer = path.join(root, "dist", "server");
const vercelOut = path.join(root, ".vercel", "output");
const nodeModules = path.join(root, "node_modules");

// Clean and recreate .vercel/output
fs.rmSync(vercelOut, { recursive: true, force: true });
fs.mkdirSync(vercelOut, { recursive: true });

// 1. Copy static client assets → .vercel/output/static/
console.log("📦 Copying client assets → .vercel/output/static/ ...");
const staticDir = path.join(vercelOut, "static");
copyDir(distClient, staticDir);
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

// Symlink node_modules into function directory so bare specifiers resolve
const funcModules = path.join(funcDir, "node_modules");
if (!fs.existsSync(funcModules)) {
  try {
    fs.symlinkSync(nodeModules, funcModules, "junction");
    console.log("   node_modules symlinked.");
  } catch {
    // fallback: skip — runtime node_modules should be available
    console.log("   note: could not symlink node_modules (non-critical).");
  }
}

// index.mjs — wraps the fetch-API handler for Vercel's Node.js runtime
// Vercel's shouldAddHelpers injects __vc_bridge which we use here
const entry = `
import server from "./server.js";

// Vercel Node.js runtime: export a default async function handler
export default async function handler(req, res) {
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
}
`.trimStart();

fs.writeFileSync(path.join(funcDir, "index.mjs"), entry);
console.log("   done.");

// 3. Write config.json — routing
console.log("📝 Writing .vercel/output/config.json ...");
const config = {
  version: 3,
  routes: [
    // Cache immutable hashed assets forever
    {
      src: "^/_build/assets/(.*)$",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      continue: true,
    },
    // Filesystem check — serves static files from /static
    { handle: "filesystem" },
    // Everything else → SSR Node.js function
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
