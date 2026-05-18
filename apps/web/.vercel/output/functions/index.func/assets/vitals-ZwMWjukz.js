import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { H as HealthIcon } from "./health-icon-C6Kgh4k2.js";
import { b as useProfile, V as useListVitalsLogs, W as getListVitalsLogsQueryKey } from "./AppRouter-B_BCS-Zy.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { AddCircleLinear, AltArrowRightLinear, ThermometerBold, ThermometerLinear, WindLinear, HeartLinear, CalendarLinear, HeartBold, WindBold } from "solar-icon-set";
import { D as Droplet } from "./droplet-D4V_v_P6.js";
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
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
function Vitals() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { data: vitals, isLoading } = useListVitalsLogs(
    { profileId },
    { query: { queryKey: getListVitalsLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const getIcon = (type) => {
    switch (type) {
      case "temperature":
        return /* @__PURE__ */ jsx(HealthIcon, { outline: ThermometerLinear, filled: ThermometerBold, width: "16", height: "16" });
      case "spo2":
        return /* @__PURE__ */ jsx(HealthIcon, { outline: WindLinear, filled: WindBold, width: "16", height: "16" });
      default:
        return /* @__PURE__ */ jsx(HealthIcon, { outline: HeartLinear, filled: HeartBold, width: "16", height: "16" });
    }
  };
  const getUnitSuffix = (type) => {
    switch (type) {
      case "temperature":
        return "Â°C";
      case "spo2":
        return "%";
      case "blood_pressure":
        return "mmHg";
      case "heart_rate":
        return "bpm";
      default:
        return "";
    }
  };
  const getLabel = (type) => {
    switch (type) {
      case "temperature":
        return "Temperature";
      case "spo2":
        return "SpO2 (Oxygen)";
      case "blood_pressure":
        return "Blood Pressure";
      case "heart_rate":
        return "Heart Rate";
      default:
        return type;
    }
  };
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "p-6 pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8 mt-2", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "h-page mb-2", children: "Vitals & Monitoring" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-sans max-w-[85%]", children: "Track your vitals to identify trends and stay ahead of crises." })
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "soft", className: "rounded-full w-10 h-10 shadow-sm shrink-0", onClick: () => setLocation("/vitals/new"), children: /* @__PURE__ */ jsx(AddCircleLinear, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "border-none bg-card p-5 mb-8 shadow-sm relative overflow-hidden rounded-[24px]", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start mb-3 relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full border border-border flex items-center justify-center bg-background text-primary", children: /* @__PURE__ */ jsx(Droplet, { size: 18, className: "text-primary", fill: "currentColor" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "font-serif font-bold text-base text-foreground", children: "Standalone Hydration Tracker" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: "Hydration is now separated with trends, alerts, and sickling crisis prevention." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-sm relative z-10 mt-2",
          onClick: () => setLocation("/hydration"),
          children: [
            "Go to Hydration Tracker ",
            /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 14, className: "ml-1.5" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsx("h2", { className: "text-[20px] font-serif text-foreground", children: "Recent vitals" }) }),
    isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(Card, { className: "border-none bg-card shadow-sm rounded-2xl", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex gap-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-10 rounded-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-2/3" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" })
      ] })
    ] }) }, i)) }) : !vitals || vitals.length === 0 ? /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-card p-8 text-center rounded-[24px] border-none shadow-sm relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto w-20 h-20 rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-primary/10 relative z-10 bg-primary", children: /* @__PURE__ */ jsx(
        HealthIcon,
        {
          outline: ThermometerLinear,
          filled: ThermometerBold,
          width: "36",
          height: "36",
          active: true,
          className: "text-white"
        }
      ) }),
      /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground mb-2", children: "No vitals logged yet" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-8 max-w-[260px] mx-auto", children: "Tracking your vitals like temperature and oxygen levels can help you identify trends and stay ahead of crisis." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 mb-8 text-left relative z-10", children: [
        { icon: /* @__PURE__ */ jsx(ThermometerLinear, { size: 16 }), label: "Temperature" },
        { icon: /* @__PURE__ */ jsx(WindLinear, { size: 16 }), label: "Oxygen Levels" },
        { icon: /* @__PURE__ */ jsx(HeartLinear, { size: 16 }), label: "Heart Rate" },
        { icon: /* @__PURE__ */ jsx(CalendarLinear, { size: 16 }), label: "Health Trends" }
      ].map((item, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-3 rounded-2xl bg-background border border-border", children: [
        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-card flex items-center justify-center text-foreground shadow-sm border border-border/5", children: item.icon }),
        /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: item.label })
      ] }, idx)) }),
      /* @__PURE__ */ jsxs(Button, { size: "lg", className: "w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-md relative z-10", onClick: () => setLocation("/vitals/new"), children: [
        /* @__PURE__ */ jsx(AddCircleLinear, { size: 18, className: "mr-2" }),
        " Log your first vitals"
      ] })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: vitals.map((log) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm overflow-hidden rounded-[20px] bg-card", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-start", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-background text-foreground flex items-center justify-center shrink-0 border border-border/5 shadow-sm", children: getIcon(log.type) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground text-sm", children: getLabel(log.type) }),
            /* @__PURE__ */ jsxs(Badge, { variant: "soft", className: "text-[10px] px-1.5 py-0 h-5 rounded-md font-bold bg-accent/15 text-accent border border-accent/20", children: [
              log.value,
              getUnitSuffix(log.type)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-medium", children: [
            /* @__PURE__ */ jsx(CalendarLinear, { size: 12 }),
            new Date(log.occurredAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })
          ] })
        ] })
      ] }) }),
      log.notes && /* @__PURE__ */ jsx("div", { className: "mt-4 pt-3 border-t border-border/40", children: /* @__PURE__ */ jsxs("p", { className: "text-xs text-foreground/80 italic", children: [
        '"',
        log.notes,
        '"'
      ] }) })
    ] }) }, log.id)) })
  ] }) });
}
export {
  Vitals as default
};
