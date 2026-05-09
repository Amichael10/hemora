# @hemora/landing — apps/web

The marketing landing page for Hemora. Deploys to **Vercel** at `hemora.xyz`.

The companion app (`apps/app`) deploys separately to Cloudflare Workers at
`app.hemora.xyz`. The two apps share the monorepo but have independent
deployments and independent domains.

## Stack

- TanStack Start (React 19 + Vite 7)
- Nitro `vercel` preset (SSR + server functions on Vercel serverless)
- Tailwind v4

## Local dev

```bash
pnpm install            # from repo root
pnpm --filter @hemora/landing dev
```

## Build

```bash
pnpm --filter @hemora/landing build
```

Output goes to `apps/web/.vercel/output/`, the format Vercel auto-detects.

## Deploy to Vercel

1. **Import the repo** in Vercel → New Project.
2. **Root Directory**: `apps/web`.
3. **Framework Preset**: leave at "Other" (the included `vercel.json` already
   points the build command at the workspace).
4. **Install command**: handled by `vercel.json` (`pnpm install` from repo root).
5. **Build command**: handled by `vercel.json` (`pnpm --filter @hemora/landing build`).
6. **Output Directory**: handled by `vercel.json` (`.vercel/output`).
7. **Environment variables** — copy these from Lovable Cloud:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - (server-only secrets only if any landing-page server function needs them)

## Domains

After the first deploy succeeds:

1. Vercel project → Settings → Domains → add `hemora.xyz` and `www.hemora.xyz`.
2. At your registrar (where `hemora.xyz` is registered), add the DNS records
   Vercel shows. Typically:
   - `@` → A record `76.76.21.21`
   - `www` → CNAME `cname.vercel-dns.com`
3. Leave the existing `app` CNAME pointing at Cloudflare untouched —
   `app.hemora.xyz` continues to serve `apps/app`.

Once `hemora.xyz` resolves to Vercel, remove the custom domain from the
standalone "Hemora Landing Page" Lovable project (Project Settings → Domains)
so DNS doesn't conflict, then archive that project — this monorepo is now the
single source of truth.

## Why two deployment targets?

- `apps/app` uses Cloudflare Worker–specific server bits (`src/server.ts`,
  `wrangler.jsonc`, auth-protected `createServerFn` middleware) and is
  already live on `app.hemora.xyz`. Migrating it would be a real refactor
  with no upside.
- `apps/web` is the marketing surface. Vercel's preview deployments per PR
  and zero-config domain wiring are nicer for marketing iteration.

## Editing workflow in Lovable

- Marketing changes → prompt in this Lovable project, edits land in `apps/web/`.
- App changes → prompt in this Lovable project, edits land in `apps/app/`.
- Be explicit in your prompt about which app you mean (e.g. "on the landing
  page hero…" vs "on the dashboard…") so the agent edits the right tree.