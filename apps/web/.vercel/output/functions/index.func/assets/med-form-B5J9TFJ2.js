import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, q as useRoute, d as useProfile, a as useToast, t as useGetMedication, v as useCreateMedication, w as useUpdateMedication, x as useDeleteMedication, y as CreateMedicationBodyStatus } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell, m as maybeAskToEnableNotifications } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-x5Uz1oRZ.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
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
const FREQUENCIES = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Four times daily",
  "Every morning",
  "Every evening",
  "Every 8 hours",
  "Every 12 hours",
  "As needed",
  "Weekly",
  "Other"
];
const COMMON_DRUGS = [
  "Hydroxyurea",
  "Folic Acid",
  "Penicillin V",
  "L-Glutamine (Endari)",
  "Paracetamol",
  "Ibuprofen",
  "Vitamin D",
  "Voxelotor"
];
const FREQ_OFFSETS = {
  "Once daily": [0],
  "Twice daily": [0, 12],
  "Three times daily": [0, 8, 16],
  "Four times daily": [0, 6, 12, 18],
  "Every morning": [0],
  "Every evening": [0],
  "Every 8 hours": [0, 8, 16],
  "Every 12 hours": [0, 12],
  "Weekly": [0],
  "As needed": [],
  "Other": [0]
};
function formatHHMM12(hh, mm) {
  const ampm = hh >= 12 ? "PM" : "AM";
  const h12 = (hh + 11) % 12 + 1;
  return `${h12}:${mm} ${ampm}`;
}
function dosePreview(reminder24, frequency) {
  if (!reminder24 || !/^\d{1,2}:\d{2}/.test(reminder24)) return [];
  const offsets = FREQ_OFFSETS[frequency] ?? [0];
  if (!offsets.length) return [];
  const [h, m] = reminder24.split(":");
  const baseH = parseInt(h, 10);
  return offsets.map((off) => formatHHMM12((baseH + off) % 24, m));
}
const REFILL_OPTIONS = [
  { value: "0", label: "Off" },
  { value: "1", label: "1 day before" },
  { value: "3", label: "3 days before" },
  { value: "5", label: "5 days before" },
  { value: "7", label: "1 week before" },
  { value: "14", label: "2 weeks before" }
];
function todayISO() {
  const d = /* @__PURE__ */ new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function defaultStartDate(reminder24) {
  if (!reminder24 || !/^\d{1,2}:\d{2}/.test(reminder24)) return todayISO();
  const [hh, mm] = reminder24.split(":").map((s) => parseInt(s, 10));
  const now = /* @__PURE__ */ new Date();
  const scheduled = /* @__PURE__ */ new Date();
  scheduled.setHours(hh, mm, 0, 0);
  const d = scheduled.getTime() <= now.getTime() ? now : new Date(now.getTime() + 864e5);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function to24h(hour12, minute, period) {
  if (!hour12) return "";
  let h = parseInt(hour12, 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${minute}`;
}
function from24h(t) {
  if (!t || !/^\d{1,2}:\d{2}/.test(t)) return { h: "8", m: "00", p: "AM" };
  const [hh, mm] = t.split(":");
  const h24 = parseInt(hh, 10);
  const p = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return { h: String(h12), m: mm.slice(0, 2), p };
}
function MedForm() {
  const [, setLocation] = useLocation();
  const [matchEdit, editParams] = useRoute("/meds/:id/edit");
  const id = matchEdit ? editParams?.id : void 0;
  const isEdit = !!id;
  const { profileId, activeProfileId } = useProfile();
  const { toast } = useToast();
  const { data: med, isLoading } = useGetMedication(id);
  const createMed = useCreateMedication();
  const updateMed = useUpdateMedication();
  const deleteMed = useDeleteMedication();
  const [name, setName] = reactExports.useState("");
  const [dose, setDose] = reactExports.useState("");
  const [frequency, setFrequency] = reactExports.useState("Once daily");
  const [hour, setHour] = reactExports.useState("8");
  const [minute, setMinute] = reactExports.useState("00");
  const [period, setPeriod] = reactExports.useState("AM");
  const [notes, setNotes] = reactExports.useState("");
  const [refillDays, setRefillDays] = reactExports.useState("3");
  const [startDate, setStartDate] = reactExports.useState(todayISO());
  const [startDateTouched, setStartDateTouched] = reactExports.useState(false);
  const [nextRefillDate, setNextRefillDate] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (med) {
      setName(med.name ?? "");
      setDose(med.dose ?? "");
      setFrequency(med.frequency ?? "Once daily");
      const { h, m, p } = from24h(med.reminderTime ?? "");
      setHour(h);
      setMinute(m);
      setPeriod(p);
      setNotes(med.notes ?? "");
      setRefillDays(med.refillReminderDays != null ? String(med.refillReminderDays) : "3");
      if (med.startDate) {
        setStartDate(med.startDate);
        setStartDateTouched(true);
      }
      if (med.nextRefillDate) setNextRefillDate(med.nextRefillDate);
    }
  }, [med]);
  reactExports.useEffect(() => {
    if (isEdit || startDateTouched) return;
    setStartDate(defaultStartDate(to24h(hour, minute, period)));
  }, [hour, minute, period, isEdit, startDateTouched]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeProfileId) return;
    const reminderTime = to24h(hour, minute, period);
    const refillNum = parseInt(refillDays, 10);
    const baseData = {
      name,
      dose,
      frequency,
      reminderTime,
      notes,
      status: CreateMedicationBodyStatus.ongoing,
      reminderEnabled: true,
      refillReminderDays: refillNum > 0 ? refillNum : null,
      startDate: startDate || null,
      nextRefillDate: nextRefillDate || null
    };
    if (isEdit) {
      updateMed.mutate({
        id,
        data: {
          ...baseData,
          familyMemberId: activeProfileId
        }
      }, {
        onSuccess: () => {
          toast({ title: "Medication updated" });
          setLocation("/meds");
        },
        onError: (e2) => toast({ title: "Couldn't save", description: e2?.message, variant: "destructive" })
      });
    } else {
      createMed.mutate({
        data: {
          ...baseData,
          profileId,
          familyMemberId: activeProfileId
        }
      }, {
        onSuccess: () => {
          toast({ title: "Medication added" });
          maybeAskToEnableNotifications("first-med");
          setLocation("/meds");
        },
        onError: (e2) => toast({ title: "Couldn't save", description: e2?.message, variant: "destructive" })
      });
    }
  };
  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this medication?")) return;
    deleteMed.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Deleted" });
        setLocation("/meds");
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: isEdit ? "Edit medication" : "Add medication", back: "/meds" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-10", children: isEdit && isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true,
            placeholder: "e.g. Hydroxyurea",
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: COMMON_DRUGS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setName(d),
            className: `px-3 h-8 rounded-full text-xs font-medium border transition-colors ${name === d ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border/60 hover:border-primary/40"}`,
            children: d
          },
          d
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Dose" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: dose,
            onChange: (e) => setDose(e.target.value),
            placeholder: "e.g. 500 mg",
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Frequency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: frequency, onValueChange: setFrequency, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl bg-card border-border/60 text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: FREQUENCIES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f, children: f }, f)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: (FREQ_OFFSETS[frequency]?.length ?? 1) > 1 ? "First dose time" : "Reminder time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: hour, onValueChange: setHour, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl bg-card border-border/60 text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Hour" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Array.from({ length: 12 }, (_, i) => String(i + 1)).map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: h, children: h }, h)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: minute, onValueChange: setMinute, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl bg-card border-border/60 text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Min" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: m, children: m }, m)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: period, onValueChange: (v) => setPeriod(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl bg-card border-border/60 text-base font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "AM", children: "AM" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "PM", children: "PM" })
            ] })
          ] })
        ] }),
        (() => {
          const times = dosePreview(to24h(hour, minute, period), frequency);
          if (times.length <= 1) {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Pick the hour, minute, and AM or PM" });
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Doses today at ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: times.join(", ") })
          ] });
        })()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Start date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: startDate,
            onChange: (e) => {
              setStartDate(e.target.value);
              setStartDateTouched(true);
            },
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Defaults to today if your first dose time has already passed, otherwise tomorrow. You can change it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Refill reminder" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: refillDays, onValueChange: setRefillDays, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl bg-card border-border/60 text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REFILL_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o.value, children: o.label }, o.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "We'll nudge you this many days before you're due to run out." })
      ] }),
      refillDays !== "0" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Next refill date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: nextRefillDate,
            onChange: (e) => setNextRefillDate(e.target.value),
            className: "h-12 text-base rounded-xl bg-card border-border/60"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "When do you expect to run out? We'll remind you ahead of this date." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: notes,
            onChange: (e) => setNotes(e.target.value),
            placeholder: "Optional",
            className: "min-h-[88px] rounded-xl bg-card border-border/60 text-base"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "xl", className: "w-full mt-6", disabled: createMed.isPending || updateMed.isPending, children: isEdit ? "Save changes" : "Add medication" }),
      isEdit && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "crisis", size: "xl", className: "w-full", onClick: handleDelete, disabled: deleteMed.isPending, children: "Delete medication" })
    ] }) })
  ] });
}
export {
  MedForm as default
};
