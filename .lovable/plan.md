## Push Notifications — full build plan

This is a multi-part feature. iOS only allows web push when Hemora is installed to the home screen, so PWA install support comes with it.

### Phase 1 — Foundation (PWA + subscription plumbing)

1. **Make Hemora installable on iOS**
   - Add a proper `manifest.webmanifest` to `apps/app` and `apps/web` with name, icons (use existing Hemora icon SVGs → 192/512 PNGs), `display: "standalone"`, theme colors.
   - Add iOS-specific `<link rel="apple-touch-icon">` and `<meta name="apple-mobile-web-app-capable">` tags in `__root.tsx`.
   - Add an "Add to Home Screen" prompt component for iOS Safari (one-time, dismissible).

2. **Service worker for push**
   - Ship `public/sw.js` with `push` and `notificationclick` event handlers (open the right route based on payload `url`).
   - Register it from `main.tsx` — but only on production hosts, never in the Lovable iframe preview (per PWA guidelines).

3. **VAPID keys + secrets**
   - Generate a VAPID keypair (one-off script).
   - Store `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` (mailto:) as Lovable Cloud secrets.
   - Expose only the public key to the client.

4. **Database**
   - `push_subscriptions` table: `user_id`, `endpoint` (unique), `p256dh`, `auth`, `user_agent`, `created_at`, `last_seen_at`. RLS: user can read/insert/delete their own.
   - Add `notification_prefs` columns to `profiles` (or a separate small table): `med_reminders`, `daily_summary`, `crisis_followups`, `product_updates` booleans (defaults match current UI).

5. **Subscribe / unsubscribe server fns**
   - `subscribeToPush` — saves PushSubscription to DB.
   - `unsubscribeFromPush` — deletes by endpoint.
   - `sendTestNotification` — fires one push to the current user (used by Settings).

### Phase 2 — Wire the Settings toggles

- Replace the local `useState` toggles in `apps/app/src/pages/notifications.tsx` and `apps/web/src/pages/notifications.tsx` with reads/writes to `notification_prefs`.
- First time a user enables any toggle: prompt for browser permission, create subscription, save it.
- Add a "Send test notification" button so the user can verify it works.

### Phase 3 — The four notification types

1. **Medication reminders** (the big one)
   - Each medication already has dose times. Add a `next_dose_at` computed column or a per-user materialized view of upcoming doses for the next 60 minutes.
   - `pg_cron` job every minute → calls `/api/public/hooks/send-med-reminders` → looks up doses due in the next minute for users with `med_reminders = true` and an active push subscription → sends push.

2. **Daily adherence summary**
   - `pg_cron` daily at 8pm local-ish (we'll use a single UTC time for v1, or per-user timezone if profiles store one) → `/api/public/hooks/send-daily-summary` → counts taken/missed doses today → push payload with the recap.

3. **Crisis follow-ups**
   - When a crisis log is created, schedule a follow-up (e.g. 24h later). Either a row in a `scheduled_notifications` table polled by cron, or a Postgres trigger that enqueues a row.
   - Cron every 5 min → sends due follow-ups → "How are you feeling today? Log an update."

4. **Product updates**
   - Admin-only broadcast endpoint (gated by `has_role('admin')`) → fans out a push to all opted-in subscribers.
   - Simple internal page later; for v1, callable via SQL or curl.

### Phase 4 — Hygiene

- 410 / 404 responses from push endpoint → delete the dead subscription row.
- Server fn logs for debugging.
- Unsubscribe button in Settings that revokes the browser subscription AND deletes the DB row.

### Technical notes

- Library: `web-push` npm package on the server. Pure JS, works in the Worker runtime.
- All cron endpoints live under `/api/public/hooks/*` and authenticate via the Supabase anon `apikey` header (per cron pattern).
- Service worker is the *only* SW we ship — kept minimal so it can't break the preview.
- Preview/iframe guard: SW registration is no-op on `id-preview--*.lovable.app` and inside iframes, so the editor preview stays clean.

### What I need from you before I start

- **Sender email for VAPID** — push services require a `mailto:` (e.g. `mailto:hello@hemora.xyz`). What should I use?
- **Daily summary time** — pick a single send time for v1 (e.g. 8pm UTC), or should I add a timezone field to profiles first?
- **Crisis follow-up delay** — 24h after the crisis log? Different?

Once you confirm those three, I'll ship Phase 1 (PWA + plumbing + test button) first so we can verify a real push lands on your phone, then build the four triggers on top.
