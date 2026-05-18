import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { i as isStandalonePwa, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, j as isIosSafari, k as isPushSupported, l as getCurrentEndpoint, M as MobileAppShell, u as unsubscribeBrowser, s as subscribeBrowser } from "./MobileAppShell-o-1rb7vr.js";
import { S as Switch } from "./switch-DQuenbYb.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { c as createLucideIcon, a as useToast, J as supabase } from "./AppRouter-yFV4k-aY.js";
import { D as Download } from "./download-B_-BxNCX.js";
import { A as ArrowLeft } from "./arrow-left-CBTqZdfO.js";
import { H as HeartPulse } from "./heart-pulse-BDwd63t-.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
import "./push.server-DA3L-NAE.js";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "tty";
import "os";
import "http";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-D2ZfvGdl.js";
import "./index-D8DUTDeV.js";
import "./index-DkPu60F3.js";
import "./router-BY6ex80A.js";
const __iconNode$6 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$6);
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$5);
const __iconNode$4 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "m9 14 2 2 4-4", key: "df797q" }]
];
const ClipboardCheck = createLucideIcon("clipboard-check", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function PwaInstallButton({ variant = "default", size = "default", className, label = "Install Hemora" }) {
  const [deferred, setDeferred] = reactExports.useState(null);
  const [installed, setInstalled] = reactExports.useState(false);
  const [iosOpen, setIosOpen] = reactExports.useState(false);
  const ios = typeof window !== "undefined" && isIosSafari();
  const standalone = typeof window !== "undefined" && isStandalonePwa();
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    function onPrompt(e) {
      e.preventDefault();
      setDeferred(e);
    }
    function onInstalled() {
      setInstalled(true);
      setDeferred(null);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  if (standalone || installed) return null;
  if (!deferred && !ios) return null;
  async function handleClick() {
    if (deferred) {
      await deferred.prompt();
      try {
        await deferred.userChoice;
      } catch {
      }
      setDeferred(null);
      return;
    }
    if (ios) setIosOpen(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleClick, variant, size, className, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4 mr-2" }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: iosOpen, onOpenChange: setIosOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-sm rounded-3xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add Hemora to Home Screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
        "In Safari, tap the ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Share" }),
        " button at the bottom of the screen, then choose",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " Add to Home Screen" }),
        ". Open Hemora from the new icon to enable notifications."
      ] })
    ] }) }) })
  ] });
}
const DEFAULT_PREFS = {
  notify_med_reminders: true,
  notify_daily_summary: false,
  notify_crisis_followups: true,
  notify_product_updates: false
};
function NotificationSettings() {
  const { toast } = useToast();
  const fetchPrefs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { data, error } = await supabase.from("profiles").select("notify_med_reminders, notify_daily_summary, notify_crisis_followups, notify_product_updates").eq("user_id", user.id).maybeSingle();
    if (error) throw error;
    return data ?? {};
  };
  const savePrefs = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { error } = await supabase.from("profiles").update(payload.data).eq("user_id", user.id);
    if (error) throw error;
    return { ok: true };
  };
  const subscribe = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: payload.data.endpoint,
      p256dh: payload.data.p256dh,
      auth: payload.data.auth,
      user_agent: payload.data.userAgent ?? navigator.userAgent,
      last_seen_at: (/* @__PURE__ */ new Date()).toISOString()
    }, { onConflict: "endpoint" });
    if (error) throw error;
    if (payload.data.timezone) {
      await supabase.from("profiles").update({ timezone: payload.data.timezone }).eq("user_id", user.id);
    }
    return { ok: true };
  };
  const unsubscribe = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { error } = await supabase.from("push_subscriptions").delete().eq("user_id", user.id).eq("endpoint", payload.data.endpoint);
    if (error) throw error;
    return { ok: true };
  };
  const sendTest = async () => {
    if (Notification.permission === "granted") {
      new Notification("Hemora test notification", {
        body: "If you can read this, push notifications are working 🎉",
        icon: "/favicon.ico"
      });
      return { sent: 1, removed: 0 };
    } else {
      return { sent: 0, removed: 0 };
    }
  };
  const [prefs, setPrefs] = reactExports.useState(DEFAULT_PREFS);
  const [loaded, setLoaded] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  const [subscribed, setSubscribed] = reactExports.useState(false);
  const [permission, setPermission] = reactExports.useState("default");
  const [showIosHint, setShowIosHint] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const p = await fetchPrefs();
        setPrefs({ ...DEFAULT_PREFS, ...p });
      } catch (e) {
        console.error(e);
      } finally {
        setLoaded(true);
      }
      if (!isPushSupported()) {
        setPermission("unsupported");
      } else {
        setPermission(Notification.permission);
        const ep = await getCurrentEndpoint();
        setSubscribed(!!ep);
      }
      if (isIosSafari() && !isStandalonePwa()) setShowIosHint(true);
    })();
  }, []);
  async function ensureSubscription() {
    if (subscribed) return true;
    if (!isPushSupported()) {
      toast({ title: "Notifications aren't supported on this device", variant: "destructive" });
      return false;
    }
    if (isIosSafari() && !isStandalonePwa()) {
      setShowIosHint(true);
      toast({
        title: "Add Hemora to your Home Screen first",
        description: "iOS only allows notifications from installed web apps. Tap Share → Add to Home Screen."
      });
      return false;
    }
    const sub = await subscribeBrowser();
    if (!sub) {
      toast({ title: "Notification permission denied", variant: "destructive" });
      setPermission(Notification.permission);
      return false;
    }
    await subscribe({ data: sub });
    setSubscribed(true);
    setPermission(Notification.permission);
    return true;
  }
  async function togglePref(key, value) {
    const prev = prefs;
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    setBusy(true);
    try {
      if (value) {
        const ok = await ensureSubscription();
        if (!ok) {
          setPrefs(prev);
          return;
        }
      }
      await savePrefs({ data: { [key]: value } });
    } catch (e) {
      console.error(e);
      setPrefs(prev);
      toast({ title: "Couldn't save preference", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }
  async function handleTest() {
    setBusy(true);
    try {
      const ok = await ensureSubscription();
      if (!ok) return;
      const res = await sendTest();
      if (res.sent > 0) {
        toast({ title: "Test notification sent", description: "It should arrive in a few seconds." });
      } else {
        toast({ title: "No active subscription found", variant: "destructive" });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Couldn't send test", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }
  async function handleDisable() {
    setBusy(true);
    try {
      const endpoint = await unsubscribeBrowser();
      if (endpoint) await unsubscribe({ data: { endpoint } });
      setSubscribed(false);
      toast({ title: "Notifications disabled on this device" });
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-24 bg-background min-h-screen text-foreground space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "icon",
          className: "w-10 h-10 rounded-full border-border bg-card shadow-sm flex items-center justify-center hover:bg-muted",
          onClick: () => window.history.back(),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18, className: "text-foreground" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-serif text-foreground font-bold", children: "Notification Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-sans", children: "Customize reminders and clinical check-ins." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-secondary to-primary text-white p-6 rounded-[28px] relative overflow-hidden shadow-md space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-36 h-36 bg-accent/20 rounded-full -mr-12 -mt-12 blur-2xl animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 20, className: "text-white animate-pulse" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif font-bold text-lg", children: "Push Reminders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/70", children: "Timely health alerts support optimal care consistency." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PwaInstallButton, { className: "w-full h-14 rounded-2xl text-sm font-bold border border-border shadow-sm bg-card hover:bg-muted", size: "lg" }),
    showIosHint && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-[24px] p-5 shadow-sm space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 18 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-sm font-serif font-bold", children: "iPhone Setup Required" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-normal", children: "iOS requires web apps to be installed to the Home Screen to receive push notifications." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "text-xs text-muted-foreground space-y-1.5 list-decimal pl-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Open Safari and tap the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-bold", children: "Share" }),
          " button."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "Select ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-bold", children: "Add to Home Screen" }),
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Launch Hemora from your Home Screen to enable reminders." })
      ] })
    ] }),
    permission === "denied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/5 border border-destructive/20 rounded-2xl p-4 flex gap-3 text-xs text-destructive leading-normal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { size: 18, className: "shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "block mb-0.5 font-bold", children: "Notifications Blocked" }),
        "Please enable notification permissions in your browser/device settings to receive medication and hydration prompts."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-[28px] p-6 shadow-sm space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-muted-foreground", children: "Device Sync Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${subscribed ? "bg-accent" : "bg-primary"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `relative inline-flex rounded-full h-2.5 w-2.5 ${subscribed ? "bg-accent" : "bg-primary"}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-foreground/80", children: subscribed ? "Active & Synced" : "Pending Setup" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-normal", children: subscribed ? "This device is registered to receive secure push notifications from your Care Circle." : "Set up push prompts on this device to get alerts for scheduled care events." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleTest,
            disabled: busy || permission === "unsupported",
            className: "w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-sm transition-all",
            children: "Send Test Notification"
          }
        ),
        subscribed && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            onClick: handleDisable,
            disabled: busy,
            className: "w-full h-12 rounded-xl hover:bg-destructive/5 hover:text-destructive text-xs font-bold border border-dashed border-border transition-all",
            children: "Disable on this device"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground pl-2", children: "Care & Monitoring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeartPulse, { size: 18 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify_med_reminders", className: "text-sm font-bold text-foreground cursor-pointer", children: "Medication Reminders" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-normal", children: "Get real-time browser alerts when a dose is due." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "notify_med_reminders",
                checked: prefs.notify_med_reminders,
                disabled: !loaded || busy,
                onCheckedChange: (v) => togglePref("notify_med_reminders", v),
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify_crisis_followups", className: "text-sm font-bold text-foreground cursor-pointer", children: "Crisis Follow-ups" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-normal", children: "Receive supportive check-ins and resolution prompts after crisis logging." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "notify_crisis_followups",
                checked: prefs.notify_crisis_followups,
                disabled: !loaded || busy,
                onCheckedChange: (v) => togglePref("notify_crisis_followups", v),
                className: "mt-1"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-widest text-muted-foreground pl-2", children: "Logs & Insights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-background flex items-center justify-center text-foreground shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { size: 18 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify_daily_summary", className: "text-sm font-bold text-foreground cursor-pointer", children: "Daily Adherence Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-normal", children: "A visual daily digest of your logged medications and goals sent each evening." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "notify_daily_summary",
                checked: prefs.notify_daily_summary,
                disabled: !loaded || busy,
                onCheckedChange: (v) => togglePref("notify_daily_summary", v),
                className: "mt-1"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-background flex items-center justify-center text-foreground shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 18 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notify_product_updates", className: "text-sm font-bold text-foreground cursor-pointer", children: "System Updates" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-normal", children: "Tips, updates, and reminders to optimize your care flow." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "notify_product_updates",
                checked: prefs.notify_product_updates,
                disabled: !loaded || busy,
                onCheckedChange: (v) => togglePref("notify_product_updates", v),
                className: "mt-1"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-5 rounded-[24px] border border-border flex gap-4 items-start shadow-inner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { size: 20, className: "text-primary shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif font-bold text-xs text-foreground", children: "Clinical Note" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-relaxed mt-1", children: "Consistency is key. Active browser notifications are critical to support your adherence and prevent sudden vaso-occlusion events." })
      ] })
    ] })
  ] }) });
}
export {
  NotificationSettings as default
};
