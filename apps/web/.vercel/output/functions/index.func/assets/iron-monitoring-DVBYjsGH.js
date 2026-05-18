import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
import { S as Switch } from "./switch-DsQDFMkP.js";
import { u as useToast } from "./AppRouter-B_BCS-Zy.js";
import { L as Leaf } from "./leaf-DZTNRhIo.js";
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
import "@radix-ui/react-label";
import "@radix-ui/react-switch";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
function IronMonitoring() {
  const [, setWouterLocation] = useLocation();
  const { toast } = useToast();
  const [ferritin, setFerritin] = useState("842");
  const [date, setDate] = useState("2025-05-16");
  const [therapy, setTherapy] = useState("Deferasirox (Exjade)");
  const [dose, setDose] = useState("1500 mg once daily");
  const [adherence, setAdherence] = useState(true);
  const [notes, setNotes] = useState("Occasional stomach upset");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Iron monitoring saved" });
      setWouterLocation("/transfusion");
      setIsSubmitting(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Iron monitoring", back: "/transfusion" }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Track your ferritin levels and iron management." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "ferritin", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Ferritin level" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-card border border-border/40 rounded-2xl h-14 overflow-hidden pr-4 shadow-sm", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                id: "ferritin",
                type: "number",
                value: ferritin,
                onChange: (e) => setFerritin(e.target.value),
                className: "h-full border-none shadow-none focus-visible:ring-0 text-base bg-transparent text-foreground"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-medium text-sm whitespace-nowrap", children: "ng/mL" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date tested" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "date",
              type: "date",
              value: date,
              onChange: (e) => setDate(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40 text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "therapy", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Chelation therapy" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "therapy",
              value: therapy,
              onChange: (e) => setTherapy(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40 text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "dose", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Dose" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "dose",
              value: dose,
              onChange: (e) => setDose(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40 text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40 shadow-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "adherence", className: "text-base font-bold text-foreground", children: "Adherence reminder" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Remind me to take my medication" })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "adherence",
              checked: adherence,
              onCheckedChange: setAdherence,
              className: "data-[state=checked]:bg-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "notes", className: "text-sm font-semibold text-foreground/70 ml-1", children: [
            "Side effects / notes ",
            /* @__PURE__ */ jsx("span", { className: "font-normal text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "notes",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "e.g. Occasional stomach upset",
              className: "min-h-[100px] rounded-2xl bg-card border-border/40 text-foreground text-base p-4 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-3 bg-primary/5 p-4 rounded-2xl items-start mb-8 border border-primary/10", children: [
          /* @__PURE__ */ jsx(Leaf, { size: 24, className: "text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] text-foreground/90 leading-relaxed", children: "Iron chelation helps remove excess iron and protect your organs. Keep going—your consistency makes a difference." })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-md",
            disabled: isSubmitting,
            children: isSubmitting ? "Saving..." : "Save ferritin result"
          }
        )
      ] })
    ] })
  ] });
}
export {
  IronMonitoring as default
};
