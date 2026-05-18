import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
import { C as Checkbox } from "./checkbox-CbHvjaNi.js";
import { b as useProfile, d as useAuth, e as useGetProfile, u as useToast } from "./AppRouter-B_BCS-Zy.js";
import { b as exportSchoolLetterToPdf } from "./profilePdf-RGgcTAFP.js";
import "wouter";
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
import "@radix-ui/react-checkbox";
import "./check-Cj3vfzP8.js";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "jspdf";
import "./Logo-qOo-96Vk.js";
const DEFAULT_ACCOMMODATIONS = [
  "Rest breaks when needed",
  "Free access to water and hydration",
  "Permission to use the restroom freely",
  "Avoid extreme heat or extended outdoor exertion",
  "Permission to take prescribed medication on time",
  "Notify parents at the first sign of pain or fever"
];
function SchoolLetter() {
  const { profileId } = useProfile();
  const { user } = useAuth();
  const { data: profile } = useGetProfile(profileId, { query: { queryKey: ["profile", profileId], enabled: !!profileId } });
  const { toast } = useToast();
  const [form, setForm] = useState({
    childName: "",
    childAge: "",
    genotype: "",
    schoolName: "",
    schoolAddress: "",
    additionalNotes: "",
    parentName: "",
    parentContact: ""
  });
  const [picked, setPicked] = useState(DEFAULT_ACCOMMODATIONS);
  useEffect(() => {
    if (!profile) return;
    setForm((s) => ({
      ...s,
      childName: s.childName || profile.fullName || "",
      genotype: s.genotype || profile.genotype || "",
      parentContact: s.parentContact || user?.email || ""
    }));
  }, [profile, user]);
  const toggle = (item) => setPicked((p) => p.includes(item) ? p.filter((x) => x !== item) : [...p, item]);
  const onExport = async () => {
    if (!form.childName || !form.schoolName) {
      toast({ title: "Please fill child name and school", variant: "destructive" });
      return;
    }
    try {
      await exportSchoolLetterToPdf({
        childName: form.childName,
        childAge: form.childAge,
        genotype: form.genotype,
        schoolName: form.schoolName,
        schoolAddress: form.schoolAddress,
        accommodations: picked,
        additionalNotes: form.additionalNotes,
        parentName: form.parentName,
        parentContact: form.parentContact
      });
      toast({ title: "Letter downloaded" });
    } catch (e) {
      toast({ title: "Export failed", description: e?.message, variant: "destructive" });
    }
  };
  const set = (k, v) => setForm({ ...form, [k]: v });
  return /* @__PURE__ */ jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "School accommodation letter", back: "/dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-32 space-y-5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "A letter you can send to your child's school requesting reasonable accommodations for sickle cell." }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Student details" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Child's full name" }),
          /* @__PURE__ */ jsx(Input, { value: form.childName, onChange: (e) => set("childName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Age" }),
            /* @__PURE__ */ jsx(Input, { value: form.childAge, onChange: (e) => set("childAge", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Genotype" }),
            /* @__PURE__ */ jsx(Input, { value: form.genotype, onChange: (e) => set("genotype", e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "School" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "School name" }),
          /* @__PURE__ */ jsx(Input, { value: form.schoolName, onChange: (e) => set("schoolName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "School address" }),
          /* @__PURE__ */ jsx(Textarea, { rows: 2, value: form.schoolAddress, onChange: (e) => set("schoolAddress", e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Key support needs" }),
        /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border/60 divide-y divide-border/60", children: DEFAULT_ACCOMMODATIONS.map((item) => /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-3 p-3 cursor-pointer", children: [
          /* @__PURE__ */ jsx(Checkbox, { checked: picked.includes(item), onCheckedChange: () => toggle(item) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm leading-snug", children: item })
        ] }, item)) })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Additional notes (optional)" }),
          /* @__PURE__ */ jsx(Textarea, { rows: 3, value: form.additionalNotes, onChange: (e) => set("additionalNotes", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Parent name" }),
            /* @__PURE__ */ jsx(Input, { value: form.parentName, onChange: (e) => set("parentName", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { children: "Contact" }),
            /* @__PURE__ */ jsx(Input, { value: form.parentContact, onChange: (e) => set("parentContact", e.target.value) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-background border-t border-border/60", children: /* @__PURE__ */ jsx(Button, { size: "xl", className: "w-full", onClick: onExport, children: "Download letter PDF" }) })
  ] });
}
export {
  SchoolLetter as default
};
