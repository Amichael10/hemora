# @hemora/landing — apps/web

The marketing landing page for Hemora. Deploys to **Vercel** at `hemora.xyz`.

The companion app (`apps/app`) also deploys to **Vercel** at `app.hemora.xyz`.
The two apps share the monorepo but have independent deployment configurations
within the same Vercel team.

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

Output goes to `apps/web/dist/client/` (static SPA assets) and
`apps/web/dist/server/` (unused on Vercel — the landing page is served as a
static SPA).

## Deploy to Vercel

1. **Import the repo** in Vercel → New Project.
2. **Root Directory**: `apps/web`.
3. **Framework Preset**: leave at "Other" (the included `vercel.json` already
   points the build command at the workspace).
4. **Install command**: handled by `vercel.json` (`pnpm install` from repo root).
5. **Build command**: handled by `vercel.json` (`pnpm --filter @hemora/landing build`).
6. **Output Directory**: handled by `vercel.json` (`dist/client`).
7. **SPA rewrite**: handled by `vercel.json` (`/(.*) → /index.html`) so client-side
   routes like `/blog` resolve on direct visit / refresh.
8. **Environment variables** — copy these from Lovable Cloud:
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
3. The `app` subdomain should also point to Vercel as a separate project
   serving `apps/app`.

Once `hemora.xyz` resolves to Vercel, remove the custom domain from the
standalone "Hemora Landing Page" Lovable project (Project Settings → Domains)
so DNS doesn't conflict, then archive that project — this monorepo is now the
single source of truth.

## Why two deployment targets?

- `apps/app` and `apps/web` are both deployed on Vercel to simplify
  the monorepo infrastructure and provide consistent SSR performance.
- Previously, `apps/app` was on Cloudflare Workers, but it was migrated
  to Vercel to resolve routing issues (404s) and unify the build pipeline.
- `apps/web` is the marketing surface. Vercel's preview deployments per PR
  and zero-config domain wiring are nicer for marketing iteration.

## Editing workflow

- Marketing changes → edits land in `apps/web/`.
- App changes → edits land in `apps/app/`.
- Be explicit in your prompt about which app you mean (e.g. "on the landing page hero…" vs "on the dashboard…") so the correct tree is edited.