import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-OxmP8OOz.js";
import { u as useToast, b as useProfile, e as useGetProfile, I as useUpdateProfile } from "./AppRouter-B_BCS-Zy.js";
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
import "@radix-ui/react-select";
import "./check-Cj3vfzP8.js";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENOTYPES = ["AA", "AS", "AC", "SS", "SC", "CC"];
const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];
const LOCAL_KEY = "hemora.profileDraft";
function ProfileEdit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { profileId } = useProfile();
  const { data: profile, isLoading } = useGetProfile(profileId, {
    query: { queryKey: ["profile", profileId], enabled: !!profileId }
  });
  const update = useUpdateProfile();
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    state: "",
    bloodType: "",
    genotype: "",
    heightCm: "",
    weightKg: "",
    allergies: "",
    conditions: ""
  });
  useEffect(() => {
    if (!profile) return;
    const local = (() => {
      try {
        return JSON.parse(localStorage.getItem(LOCAL_KEY) || "null");
      } catch {
        return null;
      }
    })();
    setForm((prev) => ({
      ...prev,
      fullName: profile.fullName ?? local?.fullName ?? "",
      dateOfBirth: profile.dateOfBirth ?? local?.dateOfBirth ?? "",
      gender: profile.gender ?? local?.gender ?? "",
      country: profile.country ?? local?.country ?? "",
      state: profile.state ?? local?.state ?? "",
      bloodType: profile.bloodType ?? local?.bloodType ?? "",
      genotype: profile.genotype ?? local?.genotype ?? "",
      heightCm: profile.heightCm != null ? String(profile.heightCm) : local?.heightCm ?? "",
      weightKg: profile.weightKg != null ? String(profile.weightKg) : local?.weightKg ?? "",
      allergies: profile.allergies ?? local?.allergies ?? "",
      conditions: profile.conditions ?? local?.conditions ?? ""
    }));
  }, [profile]);
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));
  const onSave = async () => {
    if (!profileId) return;
    try {
      const payload = {
        fullName: form.fullName.trim() || void 0,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender || null,
        country: form.country.trim() || null,
        state: form.state.trim() || null,
        bloodType: form.bloodType || null,
        genotype: form.genotype || null,
        heightCm: form.heightCm ? Number(form.heightCm) : null,
        weightKg: form.weightKg ? Number(form.weightKg) : null,
        allergies: form.allergies.trim() || null,
        conditions: form.conditions.trim() || null
      };
      await update.mutateAsync({ id: profileId, data: payload });
      try {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(form));
      } catch {
      }
      toast({ title: "Profile saved", description: "Your details are up to date." });
      setLocation("/profile");
    } catch (e) {
      toast({ title: "Couldn't save", description: e?.message ?? "Try again", variant: "destructive" });
    }
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Edit profile", back: "/profile" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-32 space-y-6", children: [
      isLoading && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Personal" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Full name" }),
          /* @__PURE__ */ jsx(Input, { value: form.fullName, onChange: (e) => set("fullName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Date of birth" }),
          /* @__PURE__ */ jsx(Input, { type: "date", value: form.dateOfBirth ?? "", onChange: (e) => set("dateOfBirth", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Gender" }),
          /* @__PURE__ */ jsxs(Select, { value: form.gender, onValueChange: (v) => set("gender", v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
            /* @__PURE__ */ jsx(SelectContent, { children: GENDERS.map((g) => /* @__PURE__ */ jsx(SelectItem, { value: g, children: g }, g)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Country" }),
            /* @__PURE__ */ jsx(Input, { value: form.country, onChange: (e) => set("country", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "State" }),
            /* @__PURE__ */ jsx(Input, { value: form.state, onChange: (e) => set("state", e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("p", { className: "eyebrow", children: [
          "Medical ",
          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/70 font-normal", children: "· optional" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Blood type" }),
            /* @__PURE__ */ jsxs(Select, { value: form.bloodType, onValueChange: (v) => set("bloodType", v), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: BLOOD_TYPES.map((b) => /* @__PURE__ */ jsx(SelectItem, { value: b, children: b }, b)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Genotype" }),
            /* @__PURE__ */ jsxs(Select, { value: form.genotype, onValueChange: (v) => set("genotype", v), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsx(SelectContent, { children: GENOTYPES.map((g) => /* @__PURE__ */ jsx(SelectItem, { value: g, children: g }, g)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Height (cm)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", inputMode: "decimal", value: form.heightCm, onChange: (e) => set("heightCm", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx(Label, { children: "Weight (kg)" }),
            /* @__PURE__ */ jsx(Input, { type: "number", inputMode: "decimal", value: form.weightKg, onChange: (e) => set("weightKg", e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Allergies" }),
          /* @__PURE__ */ jsx(Textarea, { rows: 2, value: form.allergies, onChange: (e) => set("allergies", e.target.value), placeholder: "e.g. Penicillin" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Other conditions" }),
          /* @__PURE__ */ jsx(Textarea, { rows: 2, value: form.conditions, onChange: (e) => set("conditions", e.target.value), placeholder: "e.g. Asthma" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-background border-t border-border/60", children: /* @__PURE__ */ jsx(Button, { size: "xl", className: "w-full", onClick: onSave, disabled: update.isPending, children: update.isPending ? "Saving…" : "Save changes" }) })
  ] });
}
export {
  ProfileEdit as default
};
