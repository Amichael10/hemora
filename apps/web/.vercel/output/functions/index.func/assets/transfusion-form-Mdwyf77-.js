import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useLocation, d as useProfile, a as useToast, au as useCreateTransfusionLog } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { S as Switch } from "./switch-DQuenbYb.js";
import { M as Minus, P as Plus } from "./plus-hu0LYozh.js";
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
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode);
function TransfusionForm() {
  const [, setWouterLocation] = useLocation();
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createTransfusion = useCreateTransfusionLog();
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [hospital, setHospital] = reactExports.useState("");
  const [reason, setReason] = reactExports.useState("");
  const [bloodType, setBloodType] = reactExports.useState("");
  const [units, setUnits] = reactExports.useState(2);
  const [hbPre, setHbPre] = reactExports.useState("");
  const [reaction, setReaction] = reactExports.useState(false);
  const [reactionNotes, setReactionNotes] = reactExports.useState("");
  const [showReactionAlert, setShowReactionAlert] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (units <= 0) {
      toast({ title: "Error", description: "Units must be greater than 0", variant: "destructive" });
      return;
    }
    const combinedNotes = [
      reason ? `Reason: ${reason}` : null,
      bloodType ? `Blood Type: ${bloodType}` : null,
      hbPre ? `Pre-transfusion Hb: ${hbPre}` : null
    ].filter(Boolean).join(" | ");
    createTransfusion.mutate({
      data: {
        profileId,
        unitsCount: units,
        hospital: hospital || null,
        occurredAt: new Date(date).toISOString(),
        reaction,
        reactionNotes: reaction ? reactionNotes || null : null,
        notes: combinedNotes || null
      }
    }, {
      onSuccess: () => {
        toast({ title: "Transfusion logged" });
        if (reaction) {
          setShowReactionAlert(true);
        } else {
          setWouterLocation("/iron-monitoring");
        }
      },
      onError: (err) => {
        toast({ title: "Failed to log", description: err.message, variant: "destructive" });
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Add transfusion", back: "/transfusion" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Add details to keep an accurate record of your care." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date of transfusion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "date",
              type: "date",
              value: date,
              onChange: (e) => setDate(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hospital", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Hospital / clinic" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "hospital",
              value: hospital,
              onChange: (e) => setHospital(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reason", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Reason for transfusion" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "reason",
              value: reason,
              onChange: (e) => setReason(e.target.value),
              placeholder: "e.g. Pain crisis",
              className: "h-14 text-base rounded-2xl bg-card border-border/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bloodType", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Blood type / compatibility note" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "bloodType",
              value: bloodType,
              onChange: (e) => setBloodType(e.target.value),
              placeholder: "e.g. O+ (Compatible)",
              className: "h-14 text-base rounded-2xl bg-card border-border/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground/70 ml-1", children: "Units received" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-card border border-border/40 rounded-2xl h-14 w-32 px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-10 w-10 rounded-xl",
                  onClick: () => setUnits(Math.max(1, units - 1)),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold", children: units }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-10 w-10 rounded-xl",
                  onClick: () => setUnits(units + 1),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "units" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "hbPre", className: "text-sm font-semibold text-foreground/70 ml-1", children: [
            "Pre-transfusion hemoglobin ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "hbPre",
              value: hbPre,
              onChange: (e) => setHbPre(e.target.value),
              placeholder: "e.g. 8.2 g/dL",
              className: "h-14 text-base rounded-2xl bg-card border-border/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reaction", className: "text-base font-bold", children: "Any reaction?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Toggle if you experienced any adverse effects" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Switch,
            {
              id: "reaction",
              checked: reaction,
              onCheckedChange: setReaction
            }
          )
        ] }),
        reaction && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 animate-in fade-in slide-in-from-top-2 duration-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "reaction-notes", className: "text-sm font-semibold text-[#A8324A] ml-1", children: [
            "Reaction Details / Notes ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-[#A8324A]/70", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "reaction-notes",
              value: reactionNotes,
              onChange: (e) => setReactionNotes(e.target.value),
              placeholder: "e.g., mild headache, chills",
              className: "min-h-[100px] rounded-2xl bg-rose-50/30 border-rose-200 text-base p-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            className: "w-full mt-4 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-md",
            disabled: createTransfusion.isPending,
            children: createTransfusion.isPending ? "Saving..." : "Save & continue"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showReactionAlert, onOpenChange: (open) => {
      setShowReactionAlert(open);
      if (!open) setWouterLocation("/iron-monitoring");
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[90vw] max-w-md rounded-[32px] p-8 border-none shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-8 h-8 text-orange-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-serif text-center text-orange-700", children: "Reaction Logged" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-base text-center leading-relaxed text-foreground", children: [
          "You reported a reaction during or after this transfusion.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-orange-800", children: "Transfusion reactions can be serious." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Please notify your care team immediately if you haven't already. Watch for worsening symptoms like shortness of breath or back pain."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { className: "mt-8 flex flex-col gap-3 sm:flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg",
          onClick: () => {
            setShowReactionAlert(false);
          },
          children: "I understand"
        }
      ) })
    ] }) })
  ] });
}
export {
  TransfusionForm as default
};
