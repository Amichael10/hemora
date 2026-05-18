import { jsx, jsxs } from "react/jsx-runtime";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { H as HealthIcon } from "./health-icon-C6Kgh4k2.js";
import { useLocation } from "wouter";
import { b as useProfile, O as useListEmergencyContacts, P as getListEmergencyContactsQueryKey } from "./AppRouter-B_BCS-Zy.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { AltArrowLeftLinear, HeartPulseLinear, HeartPulseBold, PhoneLinear, PhoneBold, AddCircleLinear, DangerTriangleBold, DangerTriangleLinear } from "solar-icon-set";
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
function Emergency() {
  const [, setLocation] = useLocation();
  const { profileId } = useProfile();
  const { data: contacts, isLoading } = useListEmergencyContacts(
    { profileId },
    { query: { queryKey: getListEmergencyContactsQueryKey({ profileId }), enabled: !!profileId } }
  );
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setLocation("/crisis"), className: "flex items-center text-xs font-medium text-muted-foreground mb-6 hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsx(AltArrowLeftLinear, { size: 16 }),
      " Back to Crisis Log"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-destructive/[0.06] border border-destructive/15 rounded-2xl p-5 mb-8 shadow-sm", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[1.5rem] text-destructive font-semibold mb-2 tracking-[-0.5px]", children: "Emergency Support" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-destructive/70 mb-6 leading-relaxed", children: "If you're experiencing severe pain, shortness of breath, or fever, seek immediate care." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs(Button, { className: "group/amb w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-base shadow-md gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 22, height: 22 }, children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover/amb:opacity-0", children: /* @__PURE__ */ jsx(HeartPulseLinear, { size: 22 }) }),
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/amb:opacity-100", children: /* @__PURE__ */ jsx(HeartPulseBold, { size: 22 }) })
          ] }),
          "Call Ambulance (112)"
        ] }),
        isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "w-full h-14 rounded-xl" }) : contacts && contacts.length > 0 ? /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "group/call w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 20, height: 20 }, children: [
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover/call:opacity-0", children: /* @__PURE__ */ jsx(PhoneLinear, { size: 20 }) }),
            /* @__PURE__ */ jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/call:opacity-100", children: /* @__PURE__ */ jsx(PhoneBold, { size: 20 }) })
          ] }),
          "Call ",
          contacts[0].fullName
        ] }) : /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2", children: [
          /* @__PURE__ */ jsx(AddCircleLinear, { size: 20 }),
          " Add Caregiver"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xs text-primary mb-4 uppercase tracking-widest opacity-60", children: "Quick Actions" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 mb-8", children: ["Stay calm & breathe", "Drink water", "Take pain meds", "Find nearest clinic"].map((action, i) => /* @__PURE__ */ jsx("div", { className: "bg-card rounded-xl p-4 shadow-sm border border-border/40 flex items-center justify-center text-center", children: /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground leading-tight", children: action }) }, i)) }),
    /* @__PURE__ */ jsxs("h2", { className: "font-semibold text-xs text-primary mb-4 uppercase tracking-widest opacity-60 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(HealthIcon, { outline: DangerTriangleLinear, filled: DangerTriangleBold, width: "16", height: "16", className: "text-accent", active: true }),
      "Hospital Bag Checklist"
    ] }),
    /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm bg-card", children: /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx("div", { className: "divide-y divide-border/50", children: ["Health ID / Insurance Card", "Current Medications", "Comfortable Clothes", "Phone Charger", "Water Bottle"].map((item, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center p-4 gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-md border border-muted-foreground/25 shrink-0" }),
      /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: item })
    ] }, i)) }) }) })
  ] }) });
}
export {
  Emergency as default
};
