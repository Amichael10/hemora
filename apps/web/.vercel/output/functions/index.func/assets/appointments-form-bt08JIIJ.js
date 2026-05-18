import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, d as useProfile, a as useToast, av as useCreateAppointment } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { S as Switch } from "./switch-DQuenbYb.js";
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
function AppointmentForm() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialTitle = searchParams.get("title") || "";
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const [title, setTitle] = reactExports.useState(initialTitle);
  const [doctor, setDoctor] = reactExports.useState("");
  const [hospital, setHospital] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [urgent, setUrgent] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Schedule Visit", back: "/appointments" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Purpose of Visit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Date & Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doctor", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Doctor Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hospital", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Location / Hospital" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "urgent", className: "text-base font-bold", children: "Urgent Visit?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Toggle if this is a high-priority or emergency visit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "urgent",
            checked: urgent,
            onCheckedChange: setUrgent
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", className: "text-sm font-semibold text-foreground/70 ml-1", children: "Questions / Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(
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
