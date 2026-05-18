import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { c as createLucideIcon } from "./AppRouter-B_BCS-Zy.js";
import { D as Download } from "./download-BT8L8gzW.js";
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
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode);
function TransfusionHistory() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-4 pt-6", children: [
      /* @__PURE__ */ jsx(SubPageHeader, { title: "History & export", back: "/transfusion", className: "pt-0 pb-0" }),
      /* @__PURE__ */ jsx("button", { className: "p-2 mr-2 rounded-full hover:bg-muted transition-colors", children: /* @__PURE__ */ jsx(Funnel, { size: 20, className: "text-foreground" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Review your history and share a summary with your care team." }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-8 bg-card p-1 rounded-full border border-border", children: [
        /* @__PURE__ */ jsx("button", { className: "flex-1 py-2 px-4 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm transition-all", children: "Transfusions" }),
        /* @__PURE__ */ jsx("button", { className: "flex-1 py-2 px-4 rounded-full text-muted-foreground text-xs font-semibold hover:bg-muted transition-all", children: "Ferritin" }),
        /* @__PURE__ */ jsx("button", { className: "flex-1 py-2 px-4 rounded-full text-muted-foreground text-xs font-semibold hover:bg-muted transition-all", children: "Chelation" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative border-l border-border ml-3 space-y-8 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2", children: "May 2025" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer", onClick: () => setLocation("/transfusion/detail"), children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground", children: "May 16, 2025" }),
              /* @__PURE__ */ jsx("div", { className: "bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-accent", children: "Completed" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "2 units • LUTH Sickle Cell Clinic" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Ferritin: 842 ng/mL" }),
              /* @__PURE__ */ jsx("div", { className: "bg-primary/10 px-1.5 py-0.5 rounded", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-primary", children: "High" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2", children: "Apr 2025" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground", children: "Apr 16, 2025" }),
              /* @__PURE__ */ jsx("div", { className: "bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-accent", children: "Completed" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "1 unit • LUTH Sickle Cell Clinic" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Ferritin: 765 ng/mL" }),
              /* @__PURE__ */ jsx("div", { className: "bg-primary/10 px-1.5 py-0.5 rounded", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-primary", children: "High" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2", children: "Mar 2025" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground", children: "Mar 18, 2025" }),
              /* @__PURE__ */ jsx("div", { className: "bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-accent", children: "Completed" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "2 units • LUTH Sickle Cell Clinic" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Ferritin: 690 ng/mL" }),
              /* @__PURE__ */ jsx("div", { className: "bg-accent/15 px-1.5 py-0.5 rounded", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-accent", children: "Moderate" }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2", children: "Feb 2025" }),
          /* @__PURE__ */ jsx("div", { className: "absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" }),
          /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border shadow-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-bold text-foreground", children: "Feb 12, 2025" }),
              /* @__PURE__ */ jsx("div", { className: "bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-accent", children: "Completed" }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "1 unit • LUTH Sickle Cell Clinic" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "Ferritin: 620 ng/mL" }),
              /* @__PURE__ */ jsx("div", { className: "bg-accent/15 px-1.5 py-0.5 rounded", children: /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-accent", children: "Moderate" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          size: "xl",
          className: "w-full rounded-2xl shadow-md mb-3",
          children: [
            /* @__PURE__ */ jsx(Download, { size: 18, className: "mr-2" }),
            "Export summary"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "xl",
          className: "w-full rounded-2xl",
          children: [
            /* @__PURE__ */ jsx(Share2, { size: 18, className: "mr-2" }),
            "Share with doctor"
          ]
        }
      )
    ] })
  ] });
}
export {
  TransfusionHistory as default
};
