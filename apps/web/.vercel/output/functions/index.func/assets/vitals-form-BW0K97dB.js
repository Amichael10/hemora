import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useLocation, d as useProfile, a as useToast, aq as useCreateVitalsLog, ar as useSearch } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
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
const __iconNode = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
];
const Stethoscope = createLucideIcon("stethoscope", __iconNode);
function VitalsForm() {
  const [, setLocation] = useLocation();
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createVitals = useCreateVitalsLog();
  const search = useSearch();
  const queryParams = new URLSearchParams(search);
  const initialType = queryParams.get("type") || "temperature";
  const [type, setType] = reactExports.useState(initialType);
  const [value, setValue] = reactExports.useState("");
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 16));
  const [notes, setNotes] = reactExports.useState("");
  const [showFeverAlert, setShowFeverAlert] = reactExports.useState(false);
  const getUnit = (t) => {
    switch (t) {
      case "temperature":
        return "°C";
      case "spo2":
        return "%";
      case "heart_rate":
        return "bpm";
      case "blood_pressure":
        return "mmHg";
      default:
        return "";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const tempValue = type === "temperature" ? parseFloat(value) : null;
    createVitals.mutate({
      data: {
        profileId,
        type,
        value,
        unit: getUnit(type),
        occurredAt: new Date(date).toISOString(),
        notes: notes || null
      }
    }, {
      onSuccess: () => {
        toast({ title: "Vitals logged" });
        if (tempValue !== null && tempValue >= 38) {
          setShowFeverAlert(true);
        } else {
          setLocation("/vitals");
        }
      },
      onError: (err) => {
        toast({ title: "Failed to log", description: err.message, variant: "destructive" });
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubPageHeader,
      {
        title: type === "temperature" ? "Log Fever" : "Log Vitals",
        back: "/vitals"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground/70 ml-1", children: "Vitals Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [
          { id: "temperature", label: "Temp" },
          { id: "spo2", label: "Oxygen" },
          { id: "heart_rate", label: "Heart" },
          { id: "blood_pressure", label: "BP" }
        ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => setType(t.id),
            className: `h-12 rounded-xl text-sm font-medium transition-all ${type === t.id ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02] hover:bg-primary/90" : "bg-background border-border text-foreground hover:bg-card"}`,
            children: t.label
          },
          t.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "value", className: "text-sm font-semibold text-foreground/70 ml-1", children: [
          "Value (",
          getUnit(type),
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "value",
            type: "text",
            inputMode: "decimal",
            value,
            onChange: (e) => setValue(e.target.value),
            required: true,
            placeholder: type === "blood_pressure" ? "120/80" : "Enter value",
            className: "h-14 text-lg font-medium rounded-2xl bg-card border-border/40 focus:ring-2 focus:ring-primary/20 transition-shadow"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date & Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "date",
            type: "datetime-local",
            value: date,
            onChange: (e) => setDate(e.target.value),
            className: "h-14 text-base rounded-2xl bg-card border-border/40"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Notes (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "notes",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "How are you feeling? Any symptoms?",
            className: "min-h-[100px] rounded-2xl bg-card border-border/40 text-base p-4 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          size: "xl",
          className: "w-full mt-4 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-bold shadow-md",
          disabled: createVitals.isPending,
          children: createVitals.isPending ? "Logging..." : "Save Vitals"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showFeverAlert, onOpenChange: setShowFeverAlert, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[90vw] max-w-md rounded-[32px] p-8 border-none shadow-2xl bg-card text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stethoscope, { className: "w-8 h-8 text-destructive" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-serif text-center text-destructive", children: "Emergency Alert" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-base text-center leading-relaxed text-foreground", children: [
          "A temperature of ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
            value,
            "°C"
          ] }),
          " is considered a fever.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-destructive", children: "In Sickle Cell Disease, a fever is a medical emergency." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Please contact your hematologist or visit the nearest Emergency Room immediately."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex flex-col gap-3 mt-4 sm:flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "w-full h-14 rounded-2xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-lg font-bold shadow-md",
            onClick: () => setLocation("/emergency"),
            children: "View Emergency Plan"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            className: "w-full h-12 rounded-xl text-muted-foreground",
            onClick: () => setLocation("/vitals"),
            children: "I'm already at the hospital"
          }
        )
      ] })
    ] }) })
  ] });
}
export {
  VitalsForm as default
};
