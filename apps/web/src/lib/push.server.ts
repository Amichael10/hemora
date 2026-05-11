// Server-only web-push sender. Never import from client code.
import webpush from "web-push";
import { VAPID_PUBLIC_KEY } from "./vapid";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

let configured = false;
function ensureConfigured() {
  if (configured) return;
  const subject = process.env.VAPID_SUBJECT || "mailto:hello@hemora.xyz";
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!privateKey) throw new Error("VAPID_PRIVATE_KEY is not configured");
  webpush.setVapidDetails(subject, VAPID_PUBLIC_KEY, privateKey);
  configured = true;
}

export type PushPayload = {
  title: string;
  body: string;
  url?: string;
  tag?: string;
  icon?: string;
  badge?: string;
  requireInteraction?: boolean;
  data?: Record<string, unknown>;
};

type SubscriptionRow = {
  id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

export async function sendPushToUser(userId: string, payload: PushPayload): Promise<{ sent: number; removed: number }> {
  ensureConfigured();
  const { data: subs, error } = await (supabaseAdmin as any)
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("user_id", userId);
  if (error) throw error;
  return sendToSubscriptions((subs ?? []) as SubscriptionRow[], payload);
}

export async function sendToSubscriptions(subs: SubscriptionRow[], payload: PushPayload): Promise<{ sent: number; removed: number }> {
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
      } catch (err: any) {
        const status = err?.statusCode;
        if (status === 404 || status === 410) {
          // Subscription expired — clean up
          await (supabaseAdmin as any).from("push_subscriptions").delete().eq("id", sub.id);
          removed++;
        } else {
          console.error("[push] send failed", { id: sub.id, status, message: err?.message });
        }
      }
    })
  );

  return { sent, removed };
}