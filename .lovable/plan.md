## Goal

Make `apps/web` the real landing page (sourced from the standalone "Hemora Landing Page" Lovable project) and prep it to deploy as a static site on Vercel at `hemora.xyz`. Leave `apps/app` untouched on Cloudflare Workers at `app.hemora.xyz`.

## End state

```text
hemora.xyz       → Vercel    → apps/web   (static landing page)
app.hemora.xyz   → Cloudflare → apps/app  (TanStack Start + Workers, unchanged)
```

One GitHub repo, two independent deployments, two independent domains.

## Steps

### 1. Pull landing page code into apps/web
- Use cross-project tools to read the "Hemora Landing Page" project structure.
- Replace the current `apps/web/src/` (which is a stale duplicate of `apps/app`) with the actual landing page source: routes, components, assets, styles, brand tokens.
- Keep `apps/web/package.json` deps in sync with what the landing page imports (add/remove as needed).

### 2. Strip Cloudflare Worker bits from apps/web
Landing page is static-only on Vercel, so remove server-runtime files:
- Delete `apps/web/src/server.ts`
- Delete `apps/web/src/start.ts`
- Delete `apps/web/wrangler.jsonc`
- Delete `apps/web/src/lib/error-capture.ts` and `error-page.ts` (Worker-specific)
- Delete `apps/web/src/routes/lovable/email/**` (server route handlers — not needed on a static landing page)
- Delete `apps/web/src/integrations/supabase/client.server.ts` and `auth-middleware.ts` (server-only)
- Delete `apps/web/supabase/` migrations directory (the app project owns the DB schema)
- Simplify `apps/web/vite.config.ts` to a plain Vite + React config (drop the TanStack Start server-entry override and Cloudflare-specific aliases not used by the landing page).

### 3. Vercel configuration
- Add `apps/web/vercel.json` with SPA fallback if the landing page uses client-side routing:
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
  ```
- Otherwise rely on Vercel's Vite preset auto-detection.
- No code changes needed to `apps/app` — it keeps building via wrangler.

### 4. Verify the build
- Run `apps/web` build locally in the sandbox to confirm it compiles cleanly without the Worker bits.
- Confirm `apps/app` build still passes (no changes expected).

## What you do after I'm done (outside Lovable)

1. Push the repo to GitHub (if not already).
2. In Vercel: New Project → import the repo → set **Root Directory** = `apps/web` → Framework: Vite → Deploy.
3. In Vercel project settings, add domains `hemora.xyz` and `www.hemora.xyz`. Vercel will show DNS records to add at your registrar.
4. At your registrar, update DNS:
   - `hemora.xyz` (apex) → Vercel's A record
   - `www` → Vercel's CNAME
   - `app` → leave pointing at Cloudflare (unchanged)
5. In the standalone "Hemora Landing Page" Lovable project, **remove the `hemora.xyz` custom domain first** so DNS doesn't conflict, then archive/delete that project.

## Notes & trade-offs

- **No SSR or server functions on apps/web.** If the landing page has a contact form, newsletter signup, or anything that calls a server function today, those will break on Vercel-as-static. Options when we get there: (a) call `app.hemora.xyz` endpoints, (b) convert to Vercel serverless functions, (c) keep apps/web on Cloudflare instead. I'll flag any such code when I pull it in.
- **Future edits**: marketing changes → prompt in this Lovable project, edit `apps/web/`. App changes → prompt in this project, edit `apps/app/`. The standalone landing-page Lovable project is retired.
- **Lovable's preview** for this project will only show one app at a time (currently `apps/app`). To preview the landing page in Lovable, we may need to switch the project's default app, or just preview via Vercel's preview deployments on each push.

## Open question I'll handle inline

The standalone landing page project may have its own Supabase tables (waitlist, contact submissions, etc.). When I pull the code in, I'll list any DB-touching code and ask before wiring it to this project's Lovable Cloud or stripping it.
