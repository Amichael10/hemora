## Goal

Fix the Vercel build for `apps/web` so `hemora.xyz` deploys successfully as a static SPA. No changes to `apps/app` (Cloudflare) and no changes to DNS — your current records are correct.

## Changes

### 1. `apps/web/vercel.json`

Point Vercel at the actual build output (`dist/client`) and add a SPA rewrite so client-side routes like `/blog` work on refresh.

```json
{
  "version": 2,
  "framework": null,
  "cleanUrls": true,
  "buildCommand": "cd ../.. && pnpm --filter @hemora/landing build",
  "installCommand": "cd ../.. && pnpm install --frozen-lockfile",
  "outputDirectory": "dist/client",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 2. `apps/web/package.json`

Drop the unused `NITRO_PRESET=vercel` env var (the shared Lovable Vite config doesn't use it — output goes to `dist/client` either way):

```json
"build": "vite build"
```

### 3. `apps/web/README.md`

Update the "Deploy to Vercel" section to reflect the static SPA setup (output dir is `dist/client`, not `.vercel/output`).

## After implementation

1. Commit + push to GitHub.
2. Vercel auto-redeploys → build succeeds → landing page live at the `*.vercel.app` URL.
3. In Vercel → Settings → Domains, confirm `hemora.xyz` and `www.hemora.xyz` are attached. SSL auto-issues.
4. `app.hemora.xyz` keeps working unchanged (your `app` A record beats the wildcard).

## What stays the same

- DNS records — your current setup is fine, no edits needed at the registrar.
- `apps/app` — untouched, still on Cloudflare at `app.hemora.xyz`.
- The `/blog` route — works as a static SPA route. When you add real posts later, use MDX-in-repo, a headless CMS, or Supabase reads — all compatible with static hosting.
