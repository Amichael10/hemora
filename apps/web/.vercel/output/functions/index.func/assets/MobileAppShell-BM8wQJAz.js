import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "wouter";
import { X, w as cn, u as useToast } from "./AppRouter-B_BCS-Zy.js";
import * as React from "react";
import { useState, useEffect } from "react";
import { isRedirect } from "@tanstack/router-core";
import { a as useRouter, T as TSS_SERVER_FUNCTION, h as getServerFnById, f as createServerFn } from "../server.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { B as Button } from "./button-CVyzTRqg.js";
import { V as VAPID_PUBLIC_KEY } from "./push.server-BMx5QtSF.js";
import { z } from "zod";
import { r as requireSupabaseAuth } from "./auth-middleware-CfCTPg1S.js";
import { HomeSmileBold, HomeSmileLinear, HeartPulse2Bold, HeartPulse2Linear, Pills2Bold, Pills2Linear, NotebookBold, NotebookLinear, UsersGroupRoundedBold, UsersGroupRoundedLinear } from "solar-icon-set";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.state.location;
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
function arrayBufferToBase64(buf) {
  if (!buf) return "";
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}
function isPushSupported() {
  if (typeof window === "undefined") return false;
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}
function isPreviewOrIframe() {
  if (typeof window === "undefined") return true;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  const host = window.location.hostname;
  return host.includes("id-preview--");
}
async function ensureServiceWorker() {
  if (!isPushSupported() || isPreviewOrIframe()) return null;
  try {
    const existing = await navigator.serviceWorker.getRegistration("/sw.js");
    if (existing) return existing;
    return await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch (e) {
    console.warn("[push] sw register failed", e);
    return null;
  }
}
async function subscribeBrowser() {
  const reg = await ensureServiceWorker();
  if (!reg) return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
  }
  return {
    endpoint: sub.endpoint,
    p256dh: arrayBufferToBase64(sub.getKey("p256dh")),
    auth: arrayBufferToBase64(sub.getKey("auth")),
    userAgent: navigator.userAgent.slice(0, 512),
    timezone: getBrowserTimezone()
  };
}
async function unsubscribeBrowser() {
  if (!isPushSupported() || isPreviewOrIframe()) return null;
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  if (!reg) return null;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return null;
  const endpoint = sub.endpoint;
  await sub.unsubscribe();
  return endpoint;
}
async function getCurrentEndpoint() {
  if (!isPushSupported() || isPreviewOrIframe()) return null;
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  if (!reg) return null;
  const sub = await reg.pushManager.getSubscription();
  return sub?.endpoint ?? null;
}
function isIosSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}
function isStandalonePwa() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}
function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || void 0;
  } catch {
    return void 0;
  }
}
var createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const SubscriptionSchema = z.object({
  endpoint: z.string().url().max(2048),
  p256dh: z.string().min(1).max(512),
  auth: z.string().min(1).max(512),
  userAgent: z.string().max(512).optional(),
  timezone: z.string().max(64).optional()
});
const subscribeToPush = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => SubscriptionSchema.parse(input)).handler(createSsrRpc("2e1ab3a05ddfeccbf7cb4d8a2420d1fdcf5f7d44e6ba3c167d872e1d222dee48"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => z.object({
  endpoint: z.string().url().max(2048)
}).parse(input)).handler(createSsrRpc("eeba9ae444a7e4479e167de361288b5564ac9a35c9644c3b3586cd211fad1f96"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("19fbe5f422daa21f53de02c4650dcb6774250d2d1b1396b38f281ca100286cfc"));
const PrefsSchema = z.object({
  notify_med_reminders: z.boolean().optional(),
  notify_daily_summary: z.boolean().optional(),
  notify_crisis_followups: z.boolean().optional(),
  notify_product_updates: z.boolean().optional()
});
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("4934fdf2872d0779001bf8846e702ab736343795250c0396af45f6c412681345"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => PrefsSchema.parse(input)).handler(createSsrRpc("02fa8882595590cb3de1f07df4626fd043ff8da44d3a9df404debfbccac8bca5"));
const SHOWN_KEY = "hemora.notify-prompt.shown";
function maybeAskToEnableNotifications(reason) {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(SHOWN_KEY)) return;
    if (typeof Notification !== "undefined" && Notification.permission !== "default") {
      localStorage.setItem(SHOWN_KEY, "1");
      return;
    }
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("hemora:ask-notifications", { detail: { reason } }));
    }, 600);
  } catch {
  }
}
function NotifyEnablePrompt() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("first-med");
  const [busy, setBusy] = useState(false);
  const subscribe = useServerFn(subscribeToPush);
  const { toast } = useToast();
  useEffect(() => {
    function onAsk(e) {
      const detail = e.detail;
      if (detail?.reason) setReason(detail.reason);
      setOpen(true);
    }
    window.addEventListener("hemora:ask-notifications", onAsk);
    return () => window.removeEventListener("hemora:ask-notifications", onAsk);
  }, []);
  function dismiss() {
    try {
      localStorage.setItem(SHOWN_KEY, "1");
    } catch {
    }
    setOpen(false);
  }
  async function handleEnable() {
    if (isIosSafari() && !isStandalonePwa()) {
      toast({
        title: "Add Hemora to your Home Screen first",
        description: "iOS only sends push to installed web apps. Tap Share → Add to Home Screen, then come back."
      });
      dismiss();
      return;
    }
    if (!isPushSupported()) {
      toast({ title: "Notifications aren't supported on this device", variant: "destructive" });
      dismiss();
      return;
    }
    setBusy(true);
    try {
      const sub = await subscribeBrowser();
      if (!sub) {
        toast({ title: "Notifications not enabled", description: "You can turn them on later in Settings." });
        dismiss();
        return;
      }
      await subscribe({ data: sub });
      toast({ title: "Notifications enabled" });
      dismiss();
    } catch (e) {
      toast({ title: "Couldn't enable notifications", description: e?.message, variant: "destructive" });
      dismiss();
    } finally {
      setBusy(false);
    }
  }
  const title = reason === "first-crisis" ? "Get crisis follow-ups?" : "Never miss a dose?";
  const body = reason === "first-crisis" ? "We'll check in 24 hours after a crisis and send heads-ups when patterns suggest a tough day ahead." : "Turn on push notifications and Hemora will remind you when it's time to take this medication.";
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: (v) => v ? setOpen(true) : dismiss(), children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-sm rounded-3xl", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: title }),
      /* @__PURE__ */ jsx(DialogDescription, { children: body })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "flex flex-col gap-2 sm:flex-col", children: [
      /* @__PURE__ */ jsx(Button, { onClick: handleEnable, disabled: busy, size: "lg", className: "w-full", children: busy ? "Enabling…" : "Turn on notifications" }),
      /* @__PURE__ */ jsx(Button, { onClick: dismiss, variant: "ghost", size: "lg", className: "w-full", children: "Not now" })
    ] })
  ] }) });
}
const navItems = [
  { label: "Home", path: "/dashboard", Outline: HomeSmileLinear, Filled: HomeSmileBold },
  { label: "Crisis", path: "/crisis", Outline: HeartPulse2Linear, Filled: HeartPulse2Bold, activeColor: "text-accent" },
  { label: "Meds", path: "/meds", Outline: Pills2Linear, Filled: Pills2Bold },
  { label: "Records", path: "/records", Outline: NotebookLinear, Filled: NotebookBold },
  { label: "Directory", path: "/directory", Outline: UsersGroupRoundedLinear, Filled: UsersGroupRoundedBold }
];
function MobileAppShell({ children, hideNav = false, fullWidth = false }) {
  const [location] = useLocation();
  return /* @__PURE__ */ jsxs("div", { className: cn(
    "min-h-[100dvh] w-full flex justify-center",
    fullWidth ? "bg-background" : "bg-secondary"
  ), children: [
    /* @__PURE__ */ jsxs("div", { className: cn(
      "w-full bg-background min-h-[100dvh] flex flex-col relative",
      fullWidth ? "max-w-none shadow-none" : "max-w-[430px] shadow-xl"
    ), children: [
      /* @__PURE__ */ jsx("main", { className: cn("flex-1", hideNav ? "" : "pb-20", fullWidth ? "w-full" : ""), children }),
      !hideNav && /* @__PURE__ */ jsx("nav", { className: "sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/60 px-2 py-2 pb-safe flex justify-between items-center z-50 shadow-[rgba(0,0,0,0.03)_0px_-4px_24px]", children: navItems.map(({ label, path, Outline, Filled, activeColor }) => {
        const isActive = location.startsWith(path);
        const color = activeColor || "text-primary";
        return /* @__PURE__ */ jsx(Link, { href: path, className: "flex-1", children: /* @__PURE__ */ jsxs(
          "button",
          {
            "data-testid": `nav-${label.toLowerCase()}`,
            className: cn(
              "group w-full flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors",
              isActive ? color : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              isActive ? /* @__PURE__ */ jsx(Filled, { size: 22 }) : /* @__PURE__ */ jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 22, height: 22 }, children: [
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover:opacity-0", children: /* @__PURE__ */ jsx(Outline, { size: 22 }) }),
                /* @__PURE__ */ jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100", children: /* @__PURE__ */ jsx(Filled, { size: 22 }) })
              ] }),
              /* @__PURE__ */ jsx("span", { className: cn("text-[10px] tracking-tight", isActive ? "font-semibold" : "font-medium"), children: label })
            ]
          }
        ) }, path);
      }) })
    ] }),
    /* @__PURE__ */ jsx(NotifyEnablePrompt, {})
  ] });
}
export {
  Dialog as D,
  MobileAppShell as M,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  DialogDescription as d,
  DialogFooter as e,
  isIosSafari as f,
  isPushSupported as g,
  getCurrentEndpoint as h,
  isStandalonePwa as i,
  maybeAskToEnableNotifications as m,
  subscribeBrowser as s,
  unsubscribeBrowser as u
};
