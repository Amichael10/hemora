import { T as TSS_SERVER_FUNCTION, z as createServerFn } from "../server.js";
import { r as requireSupabaseAuth } from "./auth-middleware-C0ZeJ0gn.js";
import { o as objectType, d as stringType, a as sendPushToUser, e as booleanType } from "./push.server-DA3L-NAE.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./createMiddleware-BvN2ghIY.js";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "tty";
import "os";
import "http";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const SubscriptionSchema = objectType({
  endpoint: stringType().url().max(2048),
  p256dh: stringType().min(1).max(512),
  auth: stringType().min(1).max(512),
  userAgent: stringType().max(512).optional(),
  timezone: stringType().max(64).optional()
});
const subscribeToPush_createServerFn_handler = createServerRpc({
  id: "2e1ab3a05ddfeccbf7cb4d8a2420d1fdcf5f7d44e6ba3c167d872e1d222dee48",
  name: "subscribeToPush",
  filename: "src/lib/push.functions.ts"
}, (opts) => subscribeToPush.__executeServer(opts));
const subscribeToPush = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => SubscriptionSchema.parse(input)).handler(subscribeToPush_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("push_subscriptions").upsert({
    user_id: userId,
    endpoint: data.endpoint,
    p256dh: data.p256dh,
    auth: data.auth,
    user_agent: data.userAgent ?? null,
    last_seen_at: (/* @__PURE__ */ new Date()).toISOString()
  }, {
    onConflict: "endpoint"
  });
  if (error) throw error;
  if (data.timezone) {
    await supabase.from("profiles").update({
      timezone: data.timezone
    }).eq("user_id", userId);
  }
  return {
    ok: true
  };
});
const unsubscribeFromPush_createServerFn_handler = createServerRpc({
  id: "eeba9ae444a7e4479e167de361288b5564ac9a35c9644c3b3586cd211fad1f96",
  name: "unsubscribeFromPush",
  filename: "src/lib/push.functions.ts"
}, (opts) => unsubscribeFromPush.__executeServer(opts));
const unsubscribeFromPush = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  endpoint: stringType().url().max(2048)
}).parse(input)).handler(unsubscribeFromPush_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("push_subscriptions").delete().eq("user_id", userId).eq("endpoint", data.endpoint);
  if (error) throw error;
  return {
    ok: true
  };
});
const sendTestNotification_createServerFn_handler = createServerRpc({
  id: "19fbe5f422daa21f53de02c4650dcb6774250d2d1b1396b38f281ca100286cfc",
  name: "sendTestNotification",
  filename: "src/lib/push.functions.ts"
}, (opts) => sendTestNotification.__executeServer(opts));
const sendTestNotification = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(sendTestNotification_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const result = await sendPushToUser(userId, {
    title: "Hemora test notification",
    body: "If you can read this, push notifications are working 🎉",
    url: "/settings/notifications",
    tag: "hemora-test"
  });
  return result;
});
const PrefsSchema = objectType({
  notify_med_reminders: booleanType().optional(),
  notify_daily_summary: booleanType().optional(),
  notify_crisis_followups: booleanType().optional(),
  notify_product_updates: booleanType().optional()
});
const getNotificationPrefs_createServerFn_handler = createServerRpc({
  id: "4934fdf2872d0779001bf8846e702ab736343795250c0396af45f6c412681345",
  name: "getNotificationPrefs",
  filename: "src/lib/push.functions.ts"
}, (opts) => getNotificationPrefs.__executeServer(opts));
const getNotificationPrefs = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getNotificationPrefs_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data,
    error
  } = await supabase.from("profiles").select("notify_med_reminders, notify_daily_summary, notify_crisis_followups, notify_product_updates").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ?? {
    notify_med_reminders: true,
    notify_daily_summary: false,
    notify_crisis_followups: true,
    notify_product_updates: false
  };
});
const updateNotificationPrefs_createServerFn_handler = createServerRpc({
  id: "02fa8882595590cb3de1f07df4626fd043ff8da44d3a9df404debfbccac8bca5",
  name: "updateNotificationPrefs",
  filename: "src/lib/push.functions.ts"
}, (opts) => updateNotificationPrefs.__executeServer(opts));
const updateNotificationPrefs = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => PrefsSchema.parse(input)).handler(updateNotificationPrefs_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("profiles").update(data).eq("user_id", userId);
  if (error) throw error;
  return {
    ok: true
  };
});
export {
  getNotificationPrefs_createServerFn_handler,
  sendTestNotification_createServerFn_handler,
  subscribeToPush_createServerFn_handler,
  unsubscribeFromPush_createServerFn_handler,
  updateNotificationPrefs_createServerFn_handler
};
