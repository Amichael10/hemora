import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { c as createLucideIcon, w as cn } from "./AppRouter-B_BCS-Zy.js";
import { A as ArrowLeft } from "./arrow-left-BlzPqGNg.js";
import { D as Droplet } from "./droplet-D4V_v_P6.js";
import { P as Pill } from "./pill-0M61oejH.js";
import { H as HeartPulse } from "./heart-pulse-Coe0b8vR.js";
import "@tanstack/router-core";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core/isServer";
import "@tanstack/react-store";
import "tiny-warning";
import "node:stream";
import "react-dom/server";
import "isbot";
import "@radix-ui/react-dialog";
import "./button-CVyzTRqg.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./push.server-BMx5QtSF.js";
import "web-push";
import "@supabase/supabase-js";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "solar-icon-set";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const __iconNode$2 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const MOCK_NOTIFICATIONS = [
  {
    id: "n1",
    type: "meds",
    title: "Medication Due",
    body: "Time to take Hydroxyurea 500 mg. Tap to confirm.",
    time: "Just now",
    ts: Date.now() - 2 * 60 * 1e3,
    read: false
  },
  {
    id: "n2",
    type: "hydration",
    title: "Hydration Reminder",
    body: "You're at 4 / 8 glasses today. Keep it up!",
    time: "2 h ago",
    ts: Date.now() - 2 * 60 * 60 * 1e3,
    read: false
  },
  {
    id: "n3",
    type: "crisis",
    title: "Crisis Follow-up",
    body: "How are you feeling after yesterday's pain episode?",
    time: "Yesterday",
    ts: Date.now() - 24 * 60 * 60 * 1e3,
    read: true
  },
  {
    id: "n4",
    type: "meds",
    title: "Dose Confirmed",
    body: "Folic Acid logged at 8:00 AM. Great job staying on track.",
    time: "Yesterday",
    ts: Date.now() - 26 * 60 * 60 * 1e3,
    read: true
  },
  {
    id: "n5",
    type: "hydration",
    title: "Daily Goal Achieved!",
    body: "You reached your hydration target of 8 glasses. 🎉",
    time: "2 days ago",
    ts: Date.now() - 48 * 60 * 60 * 1e3,
    read: true
  },
  {
    id: "n6",
    type: "system",
    title: "Hemora Update",
    body: "New: Transfusion & Iron Log is now live. Track ferritin directly in the app.",
    time: "3 days ago",
    ts: Date.now() - 72 * 60 * 60 * 1e3,
    read: true
  },
  {
    id: "n7",
    type: "crisis",
    title: "Crisis Episode Logged",
    body: "Your May 14 vaso-occlusive episode was saved. Sharing with your care team.",
    time: "4 days ago",
    ts: Date.now() - 4 * 24 * 60 * 60 * 1e3,
    read: true
  }
];
const TABS = [
  { key: "all", label: "All" },
  { key: "crisis", label: "Crisis" },
  { key: "meds", label: "Meds" },
  { key: "hydration", label: "Hydration" },
  { key: "system", label: "System" }
];
function typeIcon(type) {
  switch (type) {
    case "crisis":
      return /* @__PURE__ */ jsx(HeartPulse, { size: 18 });
    case "meds":
      return /* @__PURE__ */ jsx(Pill, { size: 18 });
    case "hydration":
      return /* @__PURE__ */ jsx(Droplet, { size: 18 });
    case "system":
      return /* @__PURE__ */ jsx(CircleCheckBig, { size: 18 });
  }
}
function typeBg(type) {
  switch (type) {
    case "crisis":
      return "bg-primary/10 text-primary";
    case "meds":
      return "bg-secondary/15 text-secondary";
    case "hydration":
      return "bg-accent/15 text-accent";
    case "system":
      return "bg-accent/15 text-accent";
  }
}
function groupByDay(notifs) {
  const groups = {};
  const now = Date.now();
  notifs.forEach((n) => {
    const delta = now - n.ts;
    let label;
    if (delta < 24 * 60 * 60 * 1e3) {
      label = "Today";
    } else if (delta < 48 * 60 * 60 * 1e3) {
      label = "Yesterday";
    } else {
      const d = new Date(n.ts);
      label = d.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });
  return Object.entries(groups).map(([label, items]) => ({ label, items }));
}
function NotificationsInbox() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const filtered = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const groups = groupByDay(filtered);
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 bg-background border-b border-border px-5 pt-6 pb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLocation("/dashboard"),
              className: "w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors",
              children: /* @__PURE__ */ jsx(ArrowLeft, { size: 17, className: "text-foreground" })
            }
          ),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl font-serif text-foreground leading-tight", children: "Notifications" }),
            unreadCount > 0 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground font-sans", children: [
              unreadCount,
              " unread"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          unreadCount > 0 && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: markAllRead,
              className: "text-[10px] font-bold text-primary hover:underline",
              children: "Mark all read"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLocation("/settings/notifications"),
              className: "w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors",
              title: "Notification settings",
              children: /* @__PURE__ */ jsx(Settings, { size: 16, className: "text-foreground" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-1.5 overflow-x-auto pb-1 mt-3 scrollbar-none", children: TABS.map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab(tab.key),
          className: cn(
            "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all",
            activeTab === tab.key ? "bg-primary text-white shadow-sm" : "bg-card text-foreground/75 border border-border hover:bg-muted"
          ),
          children: tab.label
        },
        tab.key
      )) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-5 py-4 pb-24 space-y-6", children: groups.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4 shadow-sm", children: /* @__PURE__ */ jsx(BellOff, { size: 28, className: "text-muted-foreground/40" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-serif text-muted-foreground", children: "No notifications here" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground/60 mt-1", children: activeTab === "all" ? "You're all caught up." : `No ${activeTab} alerts yet.` })
    ] }) : groups.map(({ label, items }) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1 mb-3", children: label }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: items.map((notif) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => markRead(notif.id),
          className: cn(
            "w-full text-left rounded-[20px] p-4 border transition-all",
            notif.read ? "bg-card border-border hover:border-primary/20" : "bg-card border-primary/20 shadow-sm"
          ),
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: cn(
              "w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5",
              typeBg(notif.type)
            ), children: typeIcon(notif.type) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-0.5", children: [
                /* @__PURE__ */ jsx("span", { className: cn(
                  "text-sm font-bold text-foreground leading-snug",
                  !notif.read && "font-extrabold"
                ), children: notif.title }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground shrink-0 font-medium", children: notif.time })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-normal line-clamp-2", children: notif.body })
            ] }),
            !notif.read && /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" })
          ] })
        },
        notif.id
      )) })
    ] }, label)) }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[390px]", children: /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setLocation("/settings/notifications"),
        className: "w-full flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-3.5 rounded-2xl shadow-lg hover:bg-primary/90 transition-colors",
        children: [
          /* @__PURE__ */ jsx(Settings, { size: 16 }),
          "Manage Notification Settings"
        ]
      }
    ) })
  ] }) });
}
export {
  NotificationsInbox as default
};
