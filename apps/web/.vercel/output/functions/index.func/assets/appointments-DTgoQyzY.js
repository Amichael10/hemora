import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { d as useProfile, u as useLocation, av as useCreateAppointment } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { I as I_, A as A_, E as l40, b as Nq1 } from "./index-D2ZfvGdl.js";
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
import "./index-DkPu60F3.js";
function AppointmentsPage() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  const [title, setTitle] = reactExports.useState("");
  const [date, setDate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [provider, setProvider] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { title: "New Appointment", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 max-w-md mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-red-50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(I_, { className: "text-red-600 w-8 h-8" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "What is it for?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value),
                className: "h-12 pl-10"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(I_, { className: "absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "time",
                value: time,
                onChange: (e) => setTime(e.target.value),
                className: "h-12 pl-10"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(A_, { className: "absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Clinic / Provider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "e.g. Hematology Clinic",
              value: provider,
              onChange: (e) => setProvider(e.target.value),
              className: "h-12 pl-10"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(l40, { className: "absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preparation Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            placeholder: "e.g. Need to fast for 8 hours",
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            rows: 3
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Nq1, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Reminders set for 1 day and 2 hours before." })
      ] }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
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
