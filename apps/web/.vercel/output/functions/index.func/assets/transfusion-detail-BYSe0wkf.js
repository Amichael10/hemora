import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { C as Calendar } from "./calendar-DSuIX0ZM.js";
import { D as Droplet } from "./droplet-D4V_v_P6.js";
import { c as createLucideIcon } from "./AppRouter-B_BCS-Zy.js";
import { S as Share2 } from "./share-2-B5mAkNuT.js";
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
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function TransfusionDetail() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Transfusion detail", back: "/transfusion" }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Recorded on May 16, 2025 at 8:00 PM" }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-3 ml-1", children: "Summary" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Calendar, { size: 16, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Transfusion date" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "May 16, 2025" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(Droplet, { size: 16, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Units received" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "2 units" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "H" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Hospital / clinic" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "LUTH Sickle Cell Clinic" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "R" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Reason" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "Pain crisis" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "B" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Blood type / compatibility" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "O+ (Compatible)" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "Hb" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Pre-transfusion Hb" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "8.2 g/dL" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "Rx" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: "Reactions / notes" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: "Mild headache" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-3 ml-1", children: "Iron & chelation" }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Ferritin (May 16, 2025)" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-foreground", children: "842" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "ng/mL" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-primary/10 px-2 py-1 rounded", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-primary", children: "High" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Chelation therapy" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "Deferasirox (Exjade)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Dose" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "1500 mg once daily" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-3 ml-1", children: "History" }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "relative border-l border-border/40 ml-3 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground mb-1", children: "May 16, 2025 - Completed" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "2 units • LUTH Sickle Cell Clinic" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full opacity-50" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground mb-1", children: "Apr 16, 2025 - Completed" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "1 unit • LUTH Sickle Cell Clinic" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full opacity-50" }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground mb-1", children: "Mar 18, 2025 - Completed" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "2 units • LUTH Sickle Cell Clinic" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 px-2", children: [
        /* @__PURE__ */ jsxs("button", { className: "flex flex-col items-center gap-2 flex-1", onClick: () => setLocation("/transfusion/new"), children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors", children: /* @__PURE__ */ jsx(Pen, { size: 20, className: "text-foreground" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Edit record" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex flex-col items-center gap-2 flex-1", onClick: () => setLocation("/iron-monitoring"), children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors", children: /* @__PURE__ */ jsx(Droplet, { size: 20, className: "text-foreground" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Add ferritin" })
        ] }),
        /* @__PURE__ */ jsxs("button", { className: "flex flex-col items-center gap-2 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors", children: /* @__PURE__ */ jsx(Share2, { size: 20, className: "text-foreground" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Share with doctor" })
        ] })
      ] })
    ] })
  ] });
}
export {
  TransfusionDetail as default
};
