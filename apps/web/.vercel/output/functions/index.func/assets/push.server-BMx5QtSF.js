import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";
const VAPID_PUBLIC_KEY = "BLcNCxqj6-gDMa-gHbmNYUhQhE6Yq_isEd_n-Xerq9KQwWFM7TsSFfVBCBWZHpE5T4U-Nzot6MdfhKp4HlcWij8";
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Please add them to your Vercel Project Settings.`;
    console.error(`[Supabase Admin] ${message}`);
    return {
      auth: {},
      from: () => {
        throw new Error(message);
      }
    };
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
let configured = false;
function ensureConfigured() {
  if (configured) return;
  const subject = process.env.VAPID_SUBJECT || "mailto:hello@hemora.xyz";
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!privateKey) throw new Error("VAPID_PRIVATE_KEY is not configured");
  webpush.setVapidDetails(subject, VAPID_PUBLIC_KEY, privateKey);
  configured = true;
}
async function sendPushToUser(userId, payload) {
  ensureConfigured();
  const { data: subs, error } = await supabaseAdmin.from("push_subscriptions").select("id, endpoint, p256dh, auth").eq("user_id", userId);
  if (error) throw error;
  return sendToSubscriptions(subs ?? [], payload);
}
async function sendToSubscriptions(subs, payload) {
  ensureConfigured();
  let sent = 0;
  let removed = 0;
  const json = JSON.stringify(payload);
  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          json
        );
        sent++;
      } catch (err) {
        const status = err?.statusCode;
        if (status === 404 || status === 410) {
          await supabaseAdmin.from("push_subscriptions").delete().eq("id", sub.id);
          removed++;
        } else {
          console.error("[push] send failed", { id: sub.id, status, message: err?.message });
        }
      }
    })
  );
  return { sent, removed };
}
export {
  VAPID_PUBLIC_KEY as V,
  sendPushToUser as a,
  sendToSubscriptions as b,
  supabaseAdmin as s
};
