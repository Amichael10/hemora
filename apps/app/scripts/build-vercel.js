import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vercelOut = path.join(__dirname, "..", ".vercel", "output");
const distServer = path.join(__dirname, "..", "dist", "server");
const distClient = path.join(__dirname, "..", "dist", "client");

console.log("🛠️  Starting Vercel Build Output API v3 transformation...");

// ── 1. Static Assets ─────────────────────────────────────────────────────────
console.log("📦 Copying static assets (dist/client → static) ...");
const staticDir = path.join(vercelOut, "static");
fs.mkdirSync(staticDir, { recursive: true });
fs.cpSync(distClient, staticDir, { recursive: true });
console.log("   ✅ Static assets copied.");

// ── 2. Serverless function ────────────────────────────────────────────────────
console.log("🚀 Building serverless function ...");
const funcDir = path.join(vercelOut, "functions", "index.func");
fs.mkdirSync(funcDir, { recursive: true });

// vc-config.json
fs.writeFileSync(
  path.join(funcDir, ".vc-config.json"),
  JSON.stringify({
    runtime: "nodejs20.x",
    handler: "index.mjs",
    launcherType: "Nodejs",
    shouldAddHelpers: true,
  }, null, 2)
);

// Copy server bundle
fs.cpSync(distServer, funcDir, { recursive: true });

// Create bridge
const indexMjs = path.join(funcDir, "index.mjs");
fs.writeFileSync(indexMjs, `
import * as serverModule from "./server.js";

export default async function handler(req, res) {
  try {
    const server = serverModule.default || serverModule;
    
    // Build URL
    const host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
    const proto = req.headers["x-forwarded-proto"] || "https";
    const url = new URL(req.url, proto + "://" + host);

    // Simple GET/HEAD handling (no body reading to prevent hangs)
    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers: req.headers
    });

    const webResponse = await server.fetch(webRequest, process.env, {});
    
    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const responseBody = await webResponse.arrayBuffer();
    res.end(Buffer.from(responseBody));
  } catch (err) {
    res.statusCode = 500;
    res.end("Bridge Error: " + err.message);
  }
}
`.trim() + "\n");

// ── 3. Routing ───────────────────────────────────────────────────────────────
fs.writeFileSync(
  path.join(vercelOut, "config.json"),
  JSON.stringify({
    version: 3,
    routes: [
      { handle: "filesystem" },
      { src: "/(.*)", dest: "/index" }
    ],
  }, null, 2)
);

console.log("✅ .vercel/output built successfully.");
