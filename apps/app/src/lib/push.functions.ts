import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { sendPushToUser } from "./push.server";

const SubscriptionSchema = z.object({
  endpoint: z.string().url().max(2048),
  p256dh: z.string().min(1).max(512),
  auth: z.string().min(1).max(512),
  userAgent: z.string().max(512).optional(),
  timezone: z.string().max(64).optional(),
});

export const subscribeToPush = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SubscriptionSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await (supabase as any).from("push_subscriptions").upsert(
      {
        user_id: userId,
        endpoint: data.endpoint,
        p256dh: data.p256dh,
        auth: data.auth,
        user_agent: data.userAgent ?? null,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: "endpoint" }
    );
    if (error) throw error;
    if (data.timezone) {
      await (supabase as any)
        .from("profiles")
        .update({ timezone: data.timezone })
        .eq("user_id", userId);
    }
    return { ok: true };
  });

export const unsubscribeFromPush = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ endpoint: z.string().url().max(2048) }).parse(input)
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await (supabase as any)
      .from("push_subscriptions")
      .delete()
      .eq("user_id", userId)
      .eq("endpoint", data.endpoint);
    if (error) throw error;
    return { ok: true };
  });

export const sendTestNotification = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const result = await sendPushToUser(userId, {
      title: "Hemora test notification",
      body: "If you can read this, push notifications are working 🎉",
      url: "/settings/notifications",
      tag: "hemora-test",
    });
    return result;
  });

const PrefsSchema = z.object({
  notify_med_reminders: z.boolean().optional(),
  notify_daily_summary: z.boolean().optional(),
  notify_crisis_followups: z.boolean().optional(),
  notify_product_updates: z.boolean().optional(),
});

export const getNotificationPrefs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await (supabase as any)
      .from("profiles")
      .select(
        "notify_med_reminders, notify_daily_summary, notify_crisis_followups, notify_product_updates"
      )
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw error;
    return (
      (data as any) ?? {
        notify_med_reminders: true,
        notify_daily_summary: false,
        notify_crisis_followups: true,
        notify_product_updates: false,
      }
    );
  });

export const updateNotificationPrefs = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PrefsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await (supabase as any).from("profiles").update(data).eq("user_id", userId);
    if (error) throw error;
    return { ok: true };
  });