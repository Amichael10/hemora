import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { c as createLucideIcon, b as useProfile, Z as useListTransfusionLogs, _ as getListTransfusionLogsQueryKey } from "./AppRouter-B_BCS-Zy.js";
import { D as Droplet } from "./droplet-D4V_v_P6.js";
import { A as ArrowUpRight } from "./arrow-up-right-7tyOEiAv.js";
import { C as Calendar } from "./calendar-DSuIX0ZM.js";
import { L as Leaf } from "./leaf-DZTNRhIo.js";
import "react";
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
import "./push.server-BMx5QtSF.js";
import "web-push";
import "@supabase/supabase-js";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "solar-icon-set";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
function Transfusion() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { data: transfusions, isLoading } = useListTransfusionLogs(
    { profileId },
    { query: { queryKey: getListTransfusionLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const hasTransfusions = transfusions && transfusions.length > 0;
  const displayList = hasTransfusions ? transfusions.map((log) => ({
    date: new Date(log.occurredAt).toLocaleDateString([], { dateStyle: "medium" }),
    hospital: log.hospital || "Hospital / Clinic",
    units: `${log.unitsCount || log.volumeMl || 1} unit${log.unitsCount > 1 ? "s" : ""}`
  })) : [
    { date: "May 14, 2025", hospital: "LUTH", units: "2 units" },
    { date: "Apr 16, 2025", hospital: "LUTH", units: "1 unit" },
    { date: "Mar 18, 2025", hospital: "LUTH", units: "2 units" },
    { date: "Feb 12, 2025", hospital: "LUTH", units: "1 unit" }
  ];
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "p-6 pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-8 mt-2", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[28px] font-serif text-foreground mb-2 leading-tight", children: "Transfusion & iron log" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-sans max-w-[85%]", children: "Track transfusions, ferritin levels, and iron management." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full border-[4px] border-secondary/40 border-l-primary flex items-center justify-center bg-card", children: /* @__PURE__ */ jsx(Droplet, { className: "text-primary fill-primary", size: 24 }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Latest ferritin" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[32px] font-bold text-foreground leading-none", children: "842" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "ng/mL" }),
            /* @__PURE__ */ jsx("div", { className: "bg-primary/10 px-1.5 py-0.5 rounded ml-1", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-primary", children: "High" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(ArrowUpRight, { size: 14, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Up 12% from last result" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-px bg-border/40 mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(Calendar, { size: 18, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium text-muted-foreground mb-0.5", children: "Next follow-up" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: "June 10, 2025" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx(Leaf, { size: 18, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-medium text-muted-foreground mb-0.5", children: "On chelation" }),
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: "Deferasirox" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[20px] font-serif text-foreground", children: "Recent transfusions" }),
      /* @__PURE__ */ jsx("button", { className: "text-xs font-medium text-muted-foreground hover:text-foreground", onClick: () => setLocation("/transfusion/history"), children: "View all" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: displayList.map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center py-4 border-b border-border/40 last:border-0 cursor-pointer", onClick: () => setLocation("/transfusion/detail"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-[2]", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground mb-0.5", children: item.date }),
        /* @__PURE__ */ jsx("div", { className: "text-xs font-sans text-muted-foreground", children: item.hospital })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 items-start", children: /* @__PURE__ */ jsx("div", { className: "text-[13px] font-medium text-foreground", children: item.units }) }),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex justify-end", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-accent/15 px-2 py-1 rounded-full", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium text-accent", children: "Completed" }),
        /* @__PURE__ */ jsx(CircleCheck, { size: 12, className: "text-accent", strokeWidth: 3 })
      ] }) })
    ] }, i)) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-md",
        onClick: () => setLocation("/transfusion/new"),
        children: "Add transfusion"
      }
    )
  ] }) });
}
export {
  Transfusion as default
};
