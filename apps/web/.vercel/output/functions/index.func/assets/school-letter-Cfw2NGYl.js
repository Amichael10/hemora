import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { C as Checkbox } from "./checkbox-eERtGHNF.js";
import { d as useProfile, e as useAuth, f as useGetProfile, a as useToast } from "./AppRouter-yFV4k-aY.js";
import { b as exportSchoolLetterToPdf } from "./profilePdf-SgRuM8D2.js";
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
import "./index-D2ZfvGdl.js";
import "./index-DkPu60F3.js";
import "./router-BY6ex80A.js";
import "./index-D8DUTDeV.js";
import "./check-Dt55N_VK.js";
import "./jspdf.node.min-Ba6FWgAB.js";
import "fs";
import "path";
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
  const [form, setForm] = reactExports.useState({
    childName: "",
    childAge: "",
    genotype: "",
    schoolName: "",
    schoolAddress: "",
    additionalNotes: "",
    parentName: "",
    parentContact: ""
  });
  const [picked, setPicked] = reactExports.useState(DEFAULT_ACCOMMODATIONS);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "School accommodation letter", back: "/dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-32 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "A letter you can send to your child's school requesting reasonable accommodations for sickle cell." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Student details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Child's full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.childName, onChange: (e) => set("childName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Age" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.childAge, onChange: (e) => set("childAge", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Genotype" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.genotype, onChange: (e) => set("genotype", e.target.value) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "School" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "School name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.schoolName, onChange: (e) => set("schoolName", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "School address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, value: form.schoolAddress, onChange: (e) => set("schoolAddress", e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Key support needs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border/60 divide-y divide-border/60", children: DEFAULT_ACCOMMODATIONS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-start gap-3 p-3 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: picked.includes(item), onCheckedChange: () => toggle(item) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-snug", children: item })
        ] }, item)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Additional notes (optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.additionalNotes, onChange: (e) => set("additionalNotes", e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Parent name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.parentName, onChange: (e) => set("parentName", e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Contact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.parentContact, onChange: (e) => set("parentContact", e.target.value) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-background border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xl", className: "w-full", onClick: onExport, children: "Download letter PDF" }) })
  ] });
}
export {
  SchoolLetter as default
};
