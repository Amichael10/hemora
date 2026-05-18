import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation, Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { H as HealthIcon } from "./health-icon-C6Kgh4k2.js";
import { b as useProfile, g as useListMedications, h as useListMedicationLogs } from "./AppRouter-B_BCS-Zy.js";
import { AddCircleLinear, Pills2Bold, Pills2Linear, PillLinear, PillBold, AltArrowRightLinear } from "solar-icon-set";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { ai as ResponsiveContainer, aj as Tooltip, K as Cell } from "./CategoricalChart-DJedIoBC.js";
import { B as BarChart, X as XAxis, Y as YAxis, a as Bar } from "./BarChart-KQihFzjw.js";
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
import "react-dom";
import "es-toolkit/compat/sortBy";
import "es-toolkit/compat/uniqBy";
import "es-toolkit/compat/get";
import "react-is";
import "es-toolkit/compat/isPlainObject";
import "victory-vendor/d3-shape";
import "react-redux";
import "@reduxjs/toolkit";
import "immer";
import "use-sync-external-store/shim/with-selector";
import "reselect";
import "es-toolkit/compat/throttle";
import "es-toolkit/compat/range";
import "victory-vendor/d3-scale";
import "decimal.js-light";
import "eventemitter3";
function AdherenceReport({ logs, isLoading }) {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const buckets = days.map((d) => {
    const next = new Date(d);
    next.setDate(d.getDate() + 1);
    const todays = (logs ?? []).filter((l) => {
      const t = new Date(l.takenAt ?? l.scheduledAt);
      return t >= d && t < next;
    });
    const taken = todays.filter((l) => l.status === "taken").length;
    const total = todays.length;
    return {
      day: d.toLocaleDateString(void 0, { weekday: "short" }).slice(0, 1),
      pct: total ? Math.round(taken / total * 100) : 0,
      taken,
      total
    };
  });
  const totalTaken = buckets.reduce((s, b) => s + b.taken, 0);
  const totalAll = buckets.reduce((s, b) => s + b.total, 0);
  const overall = totalAll ? Math.round(totalTaken / totalAll * 100) : 0;
  const streak = (() => {
    let s = 0;
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].total > 0 && buckets[i].pct === 100) s++;
      else if (buckets[i].total > 0) break;
    }
    return s;
  })();
  return /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-1", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Last 7 days" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2 mt-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-4xl font-bold tracking-[-1.5px] text-primary", children: [
            overall,
            "%"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "adherence" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Streak" }),
        /* @__PURE__ */ jsxs("p", { className: "text-lg font-semibold text-foreground", children: [
          streak,
          " ",
          streak === 1 ? "day" : "days"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-32 mt-3", children: isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "w-full h-full rounded-lg" }) : /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: buckets, margin: { top: 8, right: 4, bottom: 0, left: -28 }, children: [
      /* @__PURE__ */ jsx(XAxis, { dataKey: "day", tickLine: false, axisLine: false, tick: { fontSize: 11, fill: "hsl(var(--muted-foreground))" } }),
      /* @__PURE__ */ jsx(YAxis, { hide: true, domain: [0, 100] }),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          cursor: { fill: "hsl(var(--muted)/0.4)" },
          contentStyle: { borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", fontSize: 12 },
          formatter: (v, _n, p) => [`${v}% (${p.payload.taken}/${p.payload.total})`, "Taken"]
        }
      ),
      /* @__PURE__ */ jsx(Bar, { dataKey: "pct", radius: [8, 8, 4, 4], children: buckets.map((b, i) => /* @__PURE__ */ jsx(Cell, { fill: b.total === 0 ? "hsl(var(--muted))" : b.pct >= 80 ? "hsl(var(--brand-teal))" : b.pct >= 50 ? "hsl(var(--brand-teal)/0.6)" : "hsl(var(--destructive)/0.6)" }, i)) })
    ] }) }) }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground text-center mt-1", children: totalAll === 0 ? "Log your meds to see your report here." : `${totalTaken} of ${totalAll} doses taken this week` })
  ] });
}
function Meds() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const { data: meds, isLoading: isLoadingMeds } = useListMedications(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medications", activeProfileId], enabled: !!activeProfileId } }
  );
  const { data: medLogs, isLoading: isLoadingLogs } = useListMedicationLogs(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medication-logs", activeProfileId], enabled: !!activeProfileId } }
  );
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "h-page", children: "Medications" }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "soft", "data-testid": "btn-add-med", onClick: () => setLocation("/meds/new"), children: /* @__PURE__ */ jsx(AddCircleLinear, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm bg-card mb-6 overflow-hidden", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx(AdherenceReport, { logs: medLogs, isLoading: isLoadingLogs }) }) }),
    /* @__PURE__ */ jsx("h2", { className: "eyebrow mb-4", children: "Current Routine" }),
    isLoadingMeds ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2].map((i) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex gap-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-12 w-12 rounded-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-1/2" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" })
      ] })
    ] }) }, i)) }) : meds?.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "text-primary/20 flex justify-center mb-4", children: /* @__PURE__ */ jsx(HealthIcon, { outline: Pills2Linear, filled: Pills2Bold, width: "48", height: "48" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-4", children: "No medications added yet." }),
      /* @__PURE__ */ jsx(Button, { variant: "soft", onClick: () => setLocation("/meds/new"), children: "Add Medication" })
    ] }) : /* @__PURE__ */ jsx("div", { children: meds?.map((med) => /* @__PURE__ */ jsx(Link, { href: `/meds/${med.id}`, className: "block my-[6px]", children: /* @__PURE__ */ jsx(Card, { className: "group border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer", "data-testid": `med-card-${med.id}`, children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: `w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${med.status === "paused" ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`, children: /* @__PURE__ */ jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 22, height: 22 }, children: [
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover:opacity-0", children: /* @__PURE__ */ jsx(PillLinear, { size: 22 }) }),
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100", children: /* @__PURE__ */ jsx(PillBold, { size: 22 }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-0.5", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground text-sm tracking-[-0.01em]", children: med.name }),
            med.status === "paused" && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-[10px] py-0 px-1.5 h-4 opacity-70", children: "Paused" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: med.dose }),
            /* @__PURE__ */ jsx("span", { children: med.frequency })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 16, color: "rgba(115,115,115,0.5)" })
    ] }) }) }, med.id)) })
  ] }) });
}
export {
  Meds as default
};
