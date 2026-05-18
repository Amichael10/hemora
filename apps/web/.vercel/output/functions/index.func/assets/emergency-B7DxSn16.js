import { q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { H as HealthIcon } from "./health-icon-CyFHTseb.js";
import { u as useLocation, d as useProfile, S as useListEmergencyContacts, T as getListEmergencyContactsQueryKey } from "./AppRouter-yFV4k-aY.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { R as R4, t as t81, f as N91, a4 as L41, N as N41, i as p11, g as YX1, k as k11 } from "./index-D2ZfvGdl.js";
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
import "./router-BY6ex80A.js";
function Emergency() {
  const [, setLocation] = useLocation();
  const { profileId } = useProfile();
  const { data: contacts, isLoading } = useListEmergencyContacts(
    { profileId },
    { query: { queryKey: getListEmergencyContactsQueryKey({ profileId }), enabled: !!profileId } }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setLocation("/crisis"), className: "flex items-center text-xs font-medium text-muted-foreground mb-6 hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(R4, { size: 16 }),
      " Back to Crisis Log"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-destructive/[0.06] border border-destructive/15 rounded-2xl p-5 mb-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[1.5rem] text-destructive font-semibold mb-2 tracking-[-0.5px]", children: "Emergency Support" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive/70 mb-6 leading-relaxed", children: "If you're experiencing severe pain, shortness of breath, or fever, seek immediate care." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "group/amb w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-base shadow-md gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 22, height: 22 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover/amb:opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(t81, { size: 22 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/amb:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(N91, { size: 22 }) })
          ] }),
          "Call Ambulance (112)"
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-14 rounded-xl" }) : contacts && contacts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "group/call w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 20, height: 20 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover/call:opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(L41, { size: 20 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/call:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(N41, { size: 20 }) })
          ] }),
          "Call ",
          contacts[0].fullName
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(p11, { size: 20 }),
          " Add Caregiver"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-xs text-primary mb-4 uppercase tracking-widest opacity-60", children: "Quick Actions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mb-8", children: ["Stay calm & breathe", "Drink water", "Take pain meds", "Find nearest clinic"].map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl p-4 shadow-sm border border-border/40 flex items-center justify-center text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground leading-tight", children: action }) }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold text-xs text-primary mb-4 uppercase tracking-widest opacity-60 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: k11, filled: YX1, width: "16", height: "16", className: "text-accent", active: true }),
      "Hospital Bag Checklist"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/50", children: ["Health ID / Insurance Card", "Current Medications", "Comfortable Clothes", "Phone Charger", "Water Bottle"].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center p-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-md border border-muted-foreground/25 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground", children: item })
    ] }, i)) }) }) })
  ] }) });
}
export {
  Emergency as default
};
