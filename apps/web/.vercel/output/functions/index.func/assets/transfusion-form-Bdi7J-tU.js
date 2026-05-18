import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { M as MobileAppShell, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
import { S as Switch } from "./switch-DsQDFMkP.js";
import { c as createLucideIcon, b as useProfile, u as useToast, $ as useCreateTransfusionLog } from "./AppRouter-B_BCS-Zy.js";
import { M as Minus, P as Plus } from "./plus-CTaEEGH6.js";
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
  const [date, setDate] = useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState(2);
  const [hbPre, setHbPre] = useState("");
  const [reaction, setReaction] = useState(false);
  const [reactionNotes, setReactionNotes] = useState("");
  const [showReactionAlert, setShowReactionAlert] = useState(false);
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
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Add transfusion", back: "/transfusion" }),
    /* @__PURE__ */ jsxs("div", { className: "px-6 pb-10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Add details to keep an accurate record of your care." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date of transfusion" }),
          /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "hospital", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Hospital / clinic" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "hospital",
              value: hospital,
              onChange: (e) => setHospital(e.target.value),
              className: "h-14 text-base rounded-2xl bg-card border-border/40"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "reason", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Reason for transfusion" }),
          /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "bloodType", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Blood type / compatibility note" }),
          /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-sm font-semibold text-foreground/70 ml-1", children: "Units received" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-card border border-border/40 rounded-2xl h-14 w-32 px-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-10 w-10 rounded-xl",
                  onClick: () => setUnits(Math.max(1, units - 1)),
                  children: /* @__PURE__ */ jsx(Minus, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-lg font-bold", children: units }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  className: "h-10 w-10 rounded-xl",
                  onClick: () => setUnits(units + 1),
                  children: /* @__PURE__ */ jsx(Plus, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground font-medium", children: "units" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "hbPre", className: "text-sm font-semibold text-foreground/70 ml-1", children: [
            "Pre-transfusion hemoglobin ",
            /* @__PURE__ */ jsx("span", { className: "font-normal text-muted-foreground", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "reaction", className: "text-base font-bold", children: "Any reaction?" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Toggle if you experienced any adverse effects" })
          ] }),
          /* @__PURE__ */ jsx(
            Switch,
            {
              id: "reaction",
              checked: reaction,
              onCheckedChange: setReaction
            }
          )
        ] }),
        reaction && /* @__PURE__ */ jsxs("div", { className: "space-y-3 animate-in fade-in slide-in-from-top-2 duration-300", children: [
          /* @__PURE__ */ jsxs(Label, { htmlFor: "reaction-notes", className: "text-sm font-semibold text-[#8A272A] ml-1", children: [
            "Reaction Details / Notes ",
            /* @__PURE__ */ jsx("span", { className: "font-normal text-[#8A272A]/70", children: "(optional)" })
          ] }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              id: "reaction-notes",
              value: reactionNotes,
              onChange: (e) => setReactionNotes(e.target.value),
              placeholder: "e.g., mild headache, chills",
              className: "min-h-[100px] rounded-2xl bg-red-50/30 border-red-200 text-base p-4"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(Dialog, { open: showReactionAlert, onOpenChange: (open) => {
      setShowReactionAlert(open);
      if (!open) setWouterLocation("/iron-monitoring");
    }, children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[90vw] max-w-md rounded-[32px] p-8 border-none shadow-2xl", children: [
      /* @__PURE__ */ jsxs(DialogHeader, { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center animate-pulse", children: /* @__PURE__ */ jsx(CircleAlert, { className: "w-8 h-8 text-orange-600" }) }),
        /* @__PURE__ */ jsx(DialogTitle, { className: "text-2xl font-serif text-center text-orange-700", children: "Reaction Logged" }),
        /* @__PURE__ */ jsxs(DialogDescription, { className: "text-base text-center leading-relaxed text-foreground", children: [
          "You reported a reaction during or after this transfusion.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "font-bold text-orange-800", children: "Transfusion reactions can be serious." }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "Please notify your care team immediately if you haven't already. Watch for worsening symptoms like shortness of breath or back pain."
        ] })
      ] }),
      /* @__PURE__ */ jsx(DialogFooter, { className: "mt-8 flex flex-col gap-3 sm:flex-col", children: /* @__PURE__ */ jsx(
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
