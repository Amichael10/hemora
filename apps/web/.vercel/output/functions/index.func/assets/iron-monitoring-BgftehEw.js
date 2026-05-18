import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, a as useToast } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { S as Switch } from "./switch-DQuenbYb.js";
import { L as Leaf } from "./leaf-DbdMevnl.js";
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
import "./index-D8DUTDeV.js";
function IronMonitoring() {
  const [, setWouterLocation] = useLocation();
  const { toast } = useToast();
  const [ferritin, setFerritin] = reactExports.useState("842");
  const [date, setDate] = reactExports.useState("2025-05-16");
  const [therapy, setTherapy] = reactExports.useState("Deferasirox (Exjade)");
  const [dose, setDose] = reactExports.useState("1500 mg once daily");
  const [adherence, setAdherence] = reactExports.useState(true);
  const [notes, setNotes] = reactExports.useState("Occasional stomach upset");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Iron monitoring saved" });
      setWouterLocation("/transfusion");
      setIsSubmitting(false);
    }, 500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Iron monitoring", back: "/transfusion" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Track your ferritin levels and iron management." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ferritin", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Ferritin level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center bg-card border border-border/40 rounded-2xl h-14 overflow-hidden pr-4 shadow-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "ferritin",
                type: "number",
                value: ferritin,
                onChange: (e) => setFerritin(e.target.value),
                className: "h-full border-none shadow-none focus-visible:ring-0 text-base bg-transparent text-foreground"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium text-sm whitespace-nowrap", children: "ng/mL" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date tested" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "therapy", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Chelation therapy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "therapy",
              value: therapy,
              onChange: (e) => setTherapy(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40 text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "dose", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Dose" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "dose",
              value: dose,
              onChange: (e) => setDose(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40 text-foreground"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "adherence", className: "text-base font-bold text-foreground", children: "Adherence reminder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Remind me to take my medication" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "adherence",
              checked: adherence,
              onCheckedChange: setAdherence,
              className: "data-[state=checked]:bg-primary"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "notes", className: "text-sm font-semibold text-foreground/70 ml-1", children: [
            "Side effects / notes ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 bg-primary/5 p-4 rounded-2xl items-start mb-8 border border-primary/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { size: 24, className: "text-primary shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-foreground/90 leading-relaxed", children: "Iron chelation helps remove excess iron and protect your organs. Keep going—your consistency makes a difference." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
