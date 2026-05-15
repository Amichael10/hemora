import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const vercelOut = path.join(__dirname, "..", ".vercel", "output");
const distServer = path.join(__dirname, "..", "dist", "server");
const distClient = path.join(__dirname, "..", "dist", "client");

console.log("🛠️  Starting Vercel Build Output API v3 transformation...");

// Clean up old output
if (fs.existsSync(vercelOut)) {
  fs.rmSync(vercelOut, { recursive: true, force: true });
}

// ── 1. Static Assets ─────────────────────────────────────────────────────────
console.log("📦 Copying static assets (dist/client → static) ...");
const staticDir = path.join(vercelOut, "static");
fs.mkdirSync(staticDir, { recursive: true });
if (fs.existsSync(distClient)) {
  fs.cpSync(distClient, staticDir, { recursive: true });
  console.log("   ✅ Static assets copied.");
}

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

// package.json for the function (ensure ESM)
fs.writeFileSync(
  path.join(funcDir, "package.json"),
  JSON.stringify({ type: "module" }, null, 2)
);

// Copy server bundle
if (fs.existsSync(distServer)) {
  fs.cpSync(distServer, funcDir, { recursive: true });
  console.log("   ✅ Server bundle copied.");
}

// Create bridge
const indexMjs = path.join(funcDir, "index.mjs");
fs.writeFileSync(indexMjs, `
import * as serverModule from "./server.js";

export default async function handler(req, res) {
  console.log("SSR: Request", req.method, req.url);
  try {
    const server = serverModule.default || serverModule;
    
    const host = req.headers["x-forwarded-host"] || req.headers["host"] || "localhost";
    const proto = req.headers["x-forwarded-proto"] || "https";
    const url = new URL(req.url, proto + "://" + host);

    console.log("SSR: Converting headers...");
    // Convert Node headers to Headers object
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) value.forEach(v => headers.append(key, v));
        else headers.set(key, value);
      }
    }

    // Read body if not GET/HEAD
    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      console.log("SSR: Reading request body...");
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      body = Buffer.concat(chunks);
      console.log("SSR: Body read, length:", body.length);
    }

    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body: body && body.length > 0 ? body : undefined,
      // Duplex is required for some Node fetch implementations when body is present
      duplex: body ? "half" : undefined
    });

    if (!server || typeof server.fetch !== "function") {
      throw new Error("Server fetch handler not found in bundle");
    }

    console.log("SSR: Calling server.fetch...");
    const webResponse = await server.fetch(webRequest, process.env, {});
    console.log("SSR: server.fetch returned status:", webResponse.status);
    
    res.statusCode = webResponse.status;
    webResponse.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    console.log("SSR: Reading response body as arrayBuffer...");
    const responseBody = await webResponse.arrayBuffer();
    console.log("SSR: Response body read, length:", responseBody.byteLength);
    res.end(Buffer.from(responseBody));
    console.log("SSR: Response sent.");
  } catch (err) {
    console.error("SSR Error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error\\n\\n" + err.stack);
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
