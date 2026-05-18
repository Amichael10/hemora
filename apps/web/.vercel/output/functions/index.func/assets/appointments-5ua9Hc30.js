import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { b as useProfile, a0 as useCreateAppointment } from "./AppRouter-B_BCS-Zy.js";
import { CalendarLinear, ClockCircleLinear, HospitalLinear, BellLinear } from "solar-icon-set";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
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
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-label";
function AppointmentsPage() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [provider, setProvider] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (!activeProfileId) return;
    if (!title || !date) {
      toast({ title: "Error", description: "Title and Date are required.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const appointmentDate = /* @__PURE__ */ new Date(`${date}T${time || "00:00"}`);
      await createAppointment.mutateAsync({
        data: {
          familyMemberId: activeProfileId,
          title,
          description: provider,
          appointmentAt: appointmentDate.toISOString(),
          status: "scheduled",
          notes: notes || void 0
        }
      });
      toast({ title: "Scheduled", description: "Your appointment has been saved." });
      setLocation("/");
    } catch (error) {
      toast({ title: "Error", description: error.message || "Failed to schedule appointment.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(MobileAppShell, { title: "New Appointment", children: /* @__PURE__ */ jsxs("div", { className: "p-4 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-red-50 flex items-center justify-center", children: /* @__PURE__ */ jsx(CalendarLinear, { className: "text-red-600 w-8 h-8" }) }) }),
    /* @__PURE__ */ jsx(Card, { className: "mb-6", children: /* @__PURE__ */ jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "title", children: "What is it for?" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "title",
            placeholder: "e.g. Hematology Review",
            value: title,
            onChange: (e) => setTitle(e.target.value),
            className: "h-12"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                className: "h-12 pl-10"
              }
            ),
            /* @__PURE__ */ jsx(CalendarLinear, { className: "absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx(Label, { children: "Time" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "time",
                value: time,
                onChange: (e) => setTime(e.target.value),
                className: "h-12 pl-10"
              }
            ),
            /* @__PURE__ */ jsx(ClockCircleLinear, { className: "absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Clinic / Provider" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: "e.g. Hematology Clinic",
              value: provider,
              onChange: (e) => setProvider(e.target.value),
              className: "h-12 pl-10"
            }
          ),
          /* @__PURE__ */ jsx(HospitalLinear, { className: "absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(Label, { children: "Preparation Notes" }),
        /* @__PURE__ */ jsx(
          Textarea,
          {
            placeholder: "e.g. Need to fast for 8 hours",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            rows: 3
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsx(BellLinear, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsx("span", { children: "Reminders set for 1 day and 2 hours before." })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full h-14 text-lg bg-red-600 hover:bg-red-700 rounded-2xl",
        onClick: handleSave,
        disabled: loading,
        children: loading ? "Scheduling..." : "Schedule Appointment"
      }
    )
  ] }) });
}
export {
  AppointmentsPage as default
};
