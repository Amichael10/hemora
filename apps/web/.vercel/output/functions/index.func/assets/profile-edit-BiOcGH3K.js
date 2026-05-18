import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, a as useToast, d as useProfile, f as useGetProfile, M as useUpdateProfile } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-x5Uz1oRZ.js";
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
import "./index-DkPu60F3.js";
import "./index-BfrgU2eP.js";
import "./index-D8DUTDeV.js";
import "./check-Dt55N_VK.js";
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
  const [form, setForm] = reactExports.useState({
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
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Edit profile", back: "/profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-32 space-y-6", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Personal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.fullName, onChange: (e) => set("fullName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date of birth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: form.dateOfBirth ?? "", onChange: (e) => set("dateOfBirth", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Gender" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.gender, onValueChange: (v) => set("gender", v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENDERS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Country" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.country, onChange: (e) => set("country", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.state, onChange: (e) => set("state", e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "eyebrow", children: [
          "Medical ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/70 font-normal", children: "· optional" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Blood type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.bloodType, onValueChange: (v) => set("bloodType", v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BLOOD_TYPES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Genotype" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.genotype, onValueChange: (v) => set("genotype", v), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENOTYPES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Height (cm)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", inputMode: "decimal", value: form.heightCm, onChange: (e) => set("heightCm", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Weight (kg)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", inputMode: "decimal", value: form.weightKg, onChange: (e) => set("weightKg", e.target.value) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Allergies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.allergies, onChange: (e) => set("allergies", e.target.value), placeholder: "e.g. Penicillin" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Other conditions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.conditions, onChange: (e) => set("conditions", e.target.value), placeholder: "e.g. Asthma" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-background border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xl", className: "w-full", onClick: onSave, disabled: update.isPending, children: update.isPending ? "Saving…" : "Save changes" }) })
  ] });
}
export {
  ProfileEdit as default
};
