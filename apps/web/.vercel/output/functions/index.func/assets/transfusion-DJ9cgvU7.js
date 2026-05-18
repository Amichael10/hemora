import { q as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, d as useProfile, u as useLocation, as as useListTransfusionLogs, at as getListTransfusionLogsQueryKey } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { D as Droplet } from "./droplet-C4QC1yjA.js";
import { A as ArrowUpRight } from "./arrow-up-right-fR-5UF1o.js";
import { C as Calendar } from "./calendar-CM7zBXIA.js";
import { L as Leaf } from "./leaf-DbdMevnl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./router-BY6ex80A.js";
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
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-D2ZfvGdl.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[28px] font-serif text-foreground mb-2 leading-tight", children: "Transfusion & iron log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-sans max-w-[85%]", children: "Track transfusions, ferritin levels, and iron management." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-[4px] border-secondary/40 border-l-primary flex items-center justify-center bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "text-primary fill-primary", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Latest ferritin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[32px] font-bold text-foreground leading-none", children: "842" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "ng/mL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 px-1.5 py-0.5 rounded ml-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-primary", children: "High" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { size: 14, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Up 12% from last result" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/40 mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 18, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-muted-foreground mb-0.5", children: "Next follow-up" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-foreground", children: "June 10, 2025" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 18, className: "text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-muted-foreground mb-0.5", children: "On chelation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-foreground", children: "Deferasirox" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[20px] font-serif text-foreground", children: "Recent transfusions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs font-medium text-muted-foreground hover:text-foreground", onClick: () => setLocation("/transfusion/history"), children: "View all" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: displayList.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center py-4 border-b border-border/40 last:border-0 cursor-pointer", onClick: () => setLocation("/transfusion/detail"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-[2]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground mb-0.5", children: item.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-sans text-muted-foreground", children: item.hospital })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] font-medium text-foreground", children: item.units }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-accent/15 px-2 py-1 rounded-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-accent", children: "Completed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { size: 12, className: "text-accent", strokeWidth: 3 })
      ] }) })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
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
