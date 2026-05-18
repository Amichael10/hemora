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
import { b as useProfile, u as useToast, a0 as useCreateAppointment } from "./AppRouter-B_BCS-Zy.js";
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
function AppointmentForm() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialTitle = searchParams.get("title") || "";
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const [title, setTitle] = useState(initialTitle);
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [urgent, setUrgent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) {
      toast({ title: "Required fields missing", description: "Please provide a title and date/time.", variant: "destructive" });
      return;
    }
    createAppointment.mutate({
      data: {
        profileId,
        title,
        doctorName: doctor || null,
        hospital: hospital || null,
        scheduledAt: new Date(date).toISOString(),
        notes: notes || null,
        status: urgent ? "urgent" : "scheduled"
      }
    }, {
      onSuccess: () => {
        toast({ title: "Appointment scheduled" });
        setLocation("/appointments");
      },
      onError: (err) => {
        toast({ title: "Failed to schedule", description: err.message, variant: "destructive" });
      }
    });
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Schedule Visit", back: "/appointments" }),
    /* @__PURE__ */ jsx("div", { className: "px-6 pb-10", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "title", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Purpose of Visit" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "title",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            placeholder: "e.g. Hematology Review, Routine Checkup",
            className: "h-14 text-lg font-bold rounded-2xl bg-card border-border/40",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date & Time" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "date",
            type: "datetime-local",
            value: date,
            onChange: (e) => setDate(e.target.value),
            className: "h-14 text-base rounded-2xl bg-card border-border/40",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "doctor", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Doctor Name" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "doctor",
            value: doctor,
            onChange: (e) => setDoctor(e.target.value),
            placeholder: "Who are you seeing?",
            className: "h-14 text-base rounded-2xl bg-card border-border/40"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "hospital", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Location / Hospital" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "hospital",
            value: hospital,
            onChange: (e) => setHospital(e.target.value),
            placeholder: "Where is the visit?",
            className: "h-14 text-base rounded-2xl bg-card border-border/40"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "urgent", className: "text-base font-bold", children: "Urgent Visit?" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Toggle if this is a high-priority or emergency visit" })
        ] }),
        /* @__PURE__ */ jsx(
          Switch,
          {
            id: "urgent",
            checked: urgent,
            onCheckedChange: setUrgent
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "notes", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Questions / Notes" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            id: "notes",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "List questions for your doctor or specific concerns to discuss...",
            className: "min-h-[120px] rounded-2xl bg-card border-border/40 text-base p-4 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          size: "xl",
          className: "w-full mt-4 h-14 rounded-2xl shadow-lg shadow-primary/20 text-lg font-bold",
          disabled: createAppointment.isPending,
          children: createAppointment.isPending ? "Scheduling..." : "Schedule Appointment"
        }
      )
    ] }) })
  ] });
}
export {
  AppointmentForm as default
};
