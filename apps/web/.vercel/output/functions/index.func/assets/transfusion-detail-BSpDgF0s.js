import { q as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useLocation } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { C as Calendar } from "./calendar-CM7zBXIA.js";
import { D as Droplet } from "./droplet-C4QC1yjA.js";
import { S as Share2 } from "./share-2-BAmO7cwO.js";
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
import "./button-Be3fVaAL.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-D2ZfvGdl.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Transfusion detail", back: "/transfusion" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Recorded on May 16, 2025 at 8:00 PM" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3 ml-1", children: "Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 16, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Transfusion date" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "May 16, 2025" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { size: 16, className: "text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Units received" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "2 units" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "H" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Hospital / clinic" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "LUTH Sickle Cell Clinic" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "R" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Reason" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Pain crisis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "B" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Blood type / compatibility" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "O+ (Compatible)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pb-3 border-b border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "Hb" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Pre-transfusion Hb" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "8.2 g/dL" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5", children: "Rx" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: "Reactions / notes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Mild headache" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3 ml-1", children: "Iron & chelation" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Ferritin (May 16, 2025)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-foreground", children: "842" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "ng/mL" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/10 px-2 py-1 rounded", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary", children: "High" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Chelation therapy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "Deferasirox (Exjade)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Dose" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "1500 mg once daily" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-3 ml-1", children: "History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative border-l border-border/40 ml-3 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground mb-1", children: "May 16, 2025 - Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "2 units • LUTH Sickle Cell Clinic" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground mb-1", children: "Apr 16, 2025 - Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "1 unit • LUTH Sickle Cell Clinic" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground mb-1", children: "Mar 18, 2025 - Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "2 units • LUTH Sickle Cell Clinic" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2 flex-1", onClick: () => setLocation("/transfusion/new"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 20, className: "text-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Edit record" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2 flex-1", onClick: () => setLocation("/iron-monitoring"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { size: 20, className: "text-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Add ferritin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex flex-col items-center gap-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 20, className: "text-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: "Share with doctor" })
        ] })
      ] })
    ] })
  ] });
}
export {
  TransfusionDetail as default
};
