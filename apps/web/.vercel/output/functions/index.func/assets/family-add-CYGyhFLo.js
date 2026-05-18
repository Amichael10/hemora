import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
import { u as useCreateFamilyMember } from "./family-api-Bg4kCrLY.js";
import { G as GENOTYPES } from "./genotype-DY_jNrKS.js";
import { u as useToast } from "./AppRouter-B_BCS-Zy.js";
import { HeartLinear, UserLinear, CalendarLinear, NotesLinear } from "solar-icon-set";
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
import "@radix-ui/react-label";
import "@tanstack/react-query";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
const RELATIONSHIPS = [
  { value: "Self", label: "Self" },
  { value: "Partner", label: "Partner" },
  { value: "Mother", label: "Mother" },
  { value: "Father", label: "Father" },
  { value: "Child", label: "Child" },
  { value: "Sibling", label: "Sibling" },
  { value: "Grandparent", label: "Grandparent" },
  { value: "Other", label: "Other" }
];
const GENOTYPE_META = {
  AA: { desc: "No sickle cell trait", badge: "Normal" },
  AS: { desc: "Sickle cell trait (Carrier)", badge: "Carrier" },
  AC: { desc: "Hemoglobin C trait", badge: "Carrier" },
  SS: { desc: "Sickle cell disease (Anemia)", badge: "Affected" },
  SC: { desc: "Sickle cell disease (SC)", badge: "Affected" },
  CC: { desc: "Hemoglobin C disease", badge: "Mild Disease" }
};
function FamilyAdd() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const create = useCreateFamilyMember();
  const [form, setForm] = useState({
    fullName: "",
    relationship: "Child",
    genotype: "",
    dateOfBirth: "",
    notes: ""
  });
  const submit = async () => {
    if (!form.fullName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a full name for your family member.",
        variant: "destructive"
      });
      return;
    }
    try {
      await create.mutateAsync({
        fullName: form.fullName.trim(),
        relationship: form.relationship || null,
        genotype: form.genotype || null,
        dateOfBirth: form.dateOfBirth || null,
        notes: form.notes.trim() || null
      });
      toast({
        title: "Family member added",
        description: `${form.fullName} has been added to your profile.`
      });
      setLocation("/family");
    } catch (e) {
      toast({
        title: "Couldn't add family member",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Add family member", back: "/family" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-36 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-secondary/40 rounded-3xl p-5 border border-border/40 flex items-start gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(HeartLinear, { size: 20 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-serif font-semibold text-sm text-foreground", children: "Genotype History" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mt-0.5", children: "Add known family genotypes to generate a custom family risk chart." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { className: "font-semibold text-xs text-foreground/80 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(UserLinear, { size: 14, className: "text-primary/60" }),
            "Full Name"
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: form.fullName,
              onChange: (e) => setForm({ ...form, fullName: e.target.value }),
              placeholder: "e.g. Adanna Mensah",
              className: "bg-card/50 border-border/60 focus:border-primary focus-visible:ring-primary/20 h-12"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "font-semibold text-xs text-foreground/80", children: "Relationship" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: RELATIONSHIPS.map((r) => {
            const active = form.relationship === r.value;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, relationship: r.value }),
                className: `py-2 px-1 text-xs rounded-xl border text-center transition-all duration-200 font-medium ${active ? "bg-secondary text-secondary-foreground border-secondary shadow-sm scale-[1.02]" : "bg-card/40 border-border/60 hover:border-border text-muted-foreground"}`,
                children: r.label
              },
              r.value
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { className: "font-semibold text-xs text-foreground/80", children: [
            "Genotype ",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/60 font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: GENOTYPES.map((g) => {
            const active = form.genotype === g;
            const meta = GENOTYPE_META[g];
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setForm({ ...form, genotype: active ? "" : g }),
                className: `p-3 rounded-2xl border text-left transition-all duration-200 ${active ? "bg-primary/5 border-primary shadow-sm scale-[1.02] ring-1 ring-primary/20" : "bg-card/40 border-border/60 hover:border-border"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsx("span", { className: `font-serif font-bold text-base ${active ? "text-primary" : "text-foreground"}`, children: g }),
                    /* @__PURE__ */ jsx("span", { className: `text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${meta.badge === "Normal" ? "bg-green-500/10 text-green-600 dark:text-green-400" : meta.badge === "Carrier" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" : "bg-red-500/10 text-red-600 dark:text-red-400"}`, children: meta.badge })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground leading-snug mt-1.5 truncate", children: meta.desc })
                ]
              },
              g
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { className: "font-semibold text-xs text-foreground/80 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(CalendarLinear, { size: 14, className: "text-primary/60" }),
            "Date of Birth ",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/60 font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "date",
              value: form.dateOfBirth,
              onChange: (e) => setForm({ ...form, dateOfBirth: e.target.value }),
              className: "bg-card/50 border-border/60 focus:border-primary focus-visible:ring-primary/20 h-12"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs(Label, { className: "font-semibold text-xs text-foreground/80 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(NotesLinear, { size: 14, className: "text-primary/60" }),
            "Notes ",
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/60 font-normal", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: form.notes,
              onChange: (e) => setForm({ ...form, notes: e.target.value }),
              placeholder: "e.g. Any specific health patterns, drug reactions, or other details...",
              rows: 3,
              className: "bg-card/50 border-border/60 focus:border-primary focus-visible:ring-primary/20 p-3 rounded-2xl resize-none"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 pb-safe bg-background/95 backdrop-blur border-t border-border/60 z-40", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "xl",
        className: "w-full bg-primary hover:bg-primary/95 text-primary-foreground font-serif font-semibold text-base rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all",
        onClick: submit,
        disabled: create.isPending,
        children: create.isPending ? "Adding Member..." : "Add Family Member"
      }
    ) })
  ] });
}
export {
  FamilyAdd as default
};
