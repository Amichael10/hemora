import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useMemo } from "react";
import { useLocation, useRoute } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { w as cn, b as useProfile, u as useToast, q as useGetMedication, h as useListMedicationLogs, i as useCreateMedicationLog } from "./AppRouter-B_BCS-Zy.js";
import { PenNewSquareLinear, BellLinear, RefreshCircleLinear, CheckCircleBold, CloseCircleBold } from "solar-icon-set";
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
const Progress = React.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsx(
  ProgressPrimitive.Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsx(
      ProgressPrimitive.Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = ProgressPrimitive.Root.displayName;
const bottleHydroxyurea = "/assets/Bottle%20Hydroxyurea-oAzE83Le.png";
const bottleFolicAcid = "/assets/Bottle%20Folic%20Acid-wsRSrAgM.png";
const bottleEndari = "/assets/Bottle%20Endari-DA3X5JGo.png";
const bottleAntibiotics = "/assets/Bottle%20Anti%20Biotics-DU6APpU9.png";
const bottleHydr = "/assets/Bottle%20HYDR-DnP3ttjU.png";
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const BOTTLE_MAP = [
  { keys: ["hydroxyurea", "hydrea", "droxia"], src: bottleHydroxyurea },
  { keys: ["folicacid", "folate"], src: bottleFolicAcid },
  { keys: ["endari", "lglutamine", "glutamine"], src: bottleEndari },
  {
    keys: [
      "antibiotics",
      "antibiotic",
      "penicillin",
      "penv",
      "penvk",
      "amoxicillin",
      "azithromycin"
    ],
    src: bottleAntibiotics
  },
  { keys: ["hydr"], src: bottleHydr }
];
const DEFAULT_BOTTLE = bottleHydroxyurea;
function bottleForMedication(name) {
  if (!name) return DEFAULT_BOTTLE;
  const n = norm(name);
  for (const entry of BOTTLE_MAP) {
    if (entry.keys.some((k) => n.includes(k))) return entry.src;
  }
  return DEFAULT_BOTTLE;
}
function fmtTime(t) {
  if (!t || !/^\d{1,2}:\d{2}/.test(t)) return "—";
  const [hh, mm] = t.split(":");
  const h24 = parseInt(hh, 10);
  const p = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${mm.slice(0, 2)} ${p}`;
}
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
function MonthCalendar({ logs, medId }) {
  const today = /* @__PURE__ */ new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayStatus = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const l of logs) {
      if (l.medicationId !== medId) continue;
      const d = new Date(l.takenAt ?? l.scheduledAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (l.status === "taken") map.set(day, "taken");
        else if (!map.has(day)) map.set(day, l.status);
      }
    }
    return map;
  }, [logs, medId, year, month]);
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      status: dayStatus.get(d),
      isToday: d === today.getDate()
    });
  }
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 mb-2", children: WEEKDAYS.map((w, i) => /* @__PURE__ */ jsx("div", { className: "text-[11px] text-muted-foreground text-center font-medium", children: w }, i)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1", children: cells.map((c, i) => /* @__PURE__ */ jsx("div", { className: "aspect-square flex items-center justify-center", children: c.day && /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium",
          c.status === "taken" && "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
          c.status === "skipped" && "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
          c.status === "missed" && "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
          !c.status && "text-foreground/70",
          c.isToday && "ring-2 ring-primary"
        ),
        children: c.day
      }
    ) }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 mt-4 text-[11px] text-muted-foreground", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400" }),
        " Taken"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-400" }),
        " Skipped"
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-muted-foreground/30" }),
        " Not logged"
      ] })
    ] })
  ] });
}
function MedDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/meds/:id");
  const id = params?.id;
  const { profileId, activeProfileId, familyMembers } = useProfile();
  const { toast } = useToast();
  const activeMember = familyMembers.find((m) => m.id === activeProfileId);
  const { data: med, isLoading } = useGetMedication(id);
  const { data: logs } = useListMedicationLogs(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medication-logs", activeProfileId], enabled: !!activeProfileId } }
  );
  const createLog = useCreateMedicationLog();
  const medLogs = (logs ?? []).filter((l) => l.medicationId === id);
  const monthStats = useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const ym = `${now.getFullYear()}-${now.getMonth()}`;
    const inMonth = medLogs.filter((l) => {
      const d = new Date(l.takenAt ?? l.scheduledAt);
      return `${d.getFullYear()}-${d.getMonth()}` === ym;
    });
    const taken = inMonth.filter((l) => l.status === "taken").length;
    const total = inMonth.length;
    return { taken, total, pct: total ? Math.round(taken / total * 100) : 0 };
  }, [medLogs]);
  const recent = [...medLogs].sort((a, b) => new Date(b.takenAt ?? b.scheduledAt).getTime() - new Date(a.takenAt ?? a.scheduledAt).getTime()).slice(0, 5);
  const logDose = (status) => {
    if (!id) return;
    createLog.mutate(
      { data: { medicationId: id, status, scheduledAt: (/* @__PURE__ */ new Date()).toISOString() } },
      {
        onSuccess: () => toast({ title: status === "taken" ? "Dose logged" : "Dose skipped" }),
        onError: (e) => toast({ title: "Couldn't log", description: e?.message, variant: "destructive" })
      }
    );
  };
  if (isLoading || !med) {
    return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
      /* @__PURE__ */ jsx(SubPageHeader, { title: "Medication", back: "/meds" }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 space-y-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full rounded-2xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full rounded-2xl" })
      ] })
    ] });
  }
  const bottle = bottleForMedication(med.name);
  const isPaused = med.status === "paused";
  const startedOn = med.startDate ?? med.createdAt ?? null;
  const refillDays = med.refillReminderDays;
  const refillLabel = refillDays == null ? "Off" : refillDays === 1 ? "1 day before" : refillDays === 7 ? "1 week before" : refillDays === 14 ? "2 weeks before" : `${refillDays} days before`;
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(
      SubPageHeader,
      {
        title: med.name,
        back: "/meds",
        right: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "h-7 px-2 text-[10px] uppercase tracking-wider font-bold border-foreground/20 text-foreground bg-foreground/5", children: activeMember?.fullName || "Self" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setLocation(`/meds/${id}/edit`),
              "aria-label": "Edit",
              className: "w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors",
              children: /* @__PURE__ */ jsx(PenNewSquareLinear, { size: 16 })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10 space-y-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: bottle, alt: "", className: "w-12 h-12 object-contain" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-serif font-semibold text-[20px] tracking-[-0.5px] text-foreground truncate", children: [
              med.name,
              " ",
              med.dose && /* @__PURE__ */ jsx("span", { className: "text-foreground/80 font-normal", children: med.dose })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxs(
                Badge,
                {
                  className: cn(
                    "rounded-full text-[11px] font-medium px-2.5 py-0.5 border-none",
                    isPaused ? "bg-muted text-muted-foreground" : "bg-emerald-100 text-emerald-700"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: cn("w-1.5 h-1.5 rounded-full mr-1.5", isPaused ? "bg-muted-foreground" : "bg-emerald-500") }),
                    isPaused ? "Paused" : "Active"
                  ]
                }
              ),
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-full text-[11px] font-medium px-2.5 py-0.5", children: "Ongoing" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mt-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Dose" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: med.dose || "—" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Frequency" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: med.frequency || "—" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Time" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: fmtTime(med.reminderTime) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Started on" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: startedOn ? (() => {
              const s = String(startedOn);
              const d = /^\d{4}-\d{2}-\d{2}$/.test(s) ? /* @__PURE__ */ new Date(`${s}T00:00:00`) : new Date(s);
              return d.toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" });
            })() : "—" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-foreground/10 text-foreground flex items-center justify-center mb-2", children: /* @__PURE__ */ jsx(BellLinear, { size: 16 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Reminder" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-0.5", children: med.reminderEnabled === false ? "Off" : "On" })
        ] }) }),
        /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-foreground/10 text-foreground flex items-center justify-center mb-2", children: /* @__PURE__ */ jsx(RefreshCircleLinear, { size: 16 }) }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Refill reminder" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-0.5", children: refillLabel })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: () => logDose("taken"), disabled: createLog.isPending, className: "rounded-xl", children: [
          /* @__PURE__ */ jsx(CheckCircleBold, { size: 16 }),
          " Mark taken"
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "soft", onClick: () => logDose("skipped"), disabled: createLog.isPending, className: "rounded-xl", children: [
          /* @__PURE__ */ jsx(CloseCircleBold, { size: 16 }),
          " Skip"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-end justify-between mb-3", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold", children: "Adherence this month" }),
          /* @__PURE__ */ jsx("div", { className: "flex items-baseline gap-2 mt-1", children: /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold tracking-[-1px] text-primary", children: [
            monthStats.pct,
            "%"
          ] }) }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
            monthStats.taken,
            " of ",
            monthStats.total,
            " doses taken"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Progress, { value: monthStats.pct, className: "h-1.5 mb-5" }),
        /* @__PURE__ */ jsx(MonthCalendar, { logs: logs ?? [], medId: id })
      ] }) }),
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-3", children: /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Recent doses" }) }),
        recent.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground py-4 text-center", children: "No doses logged yet." }) : /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: recent.map((l) => {
          const d = new Date(l.takenAt ?? l.scheduledAt);
          const isToday = d.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
          const yest = /* @__PURE__ */ new Date();
          yest.setDate(yest.getDate() - 1);
          const isYest = d.toDateString() === yest.toDateString();
          const label = isToday ? "Today" : isYest ? "Yesterday" : d.toLocaleDateString(void 0, { weekday: "short", month: "short", day: "numeric" });
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-foreground/80", children: [
              label,
              ", ",
              d.toLocaleTimeString(void 0, { hour: "numeric", minute: "2-digit" })
            ] }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: cn(
                  "flex items-center gap-1 text-xs font-medium",
                  l.status === "taken" && "text-emerald-600",
                  l.status === "skipped" && "text-amber-600",
                  l.status === "missed" && "text-rose-600"
                ),
                children: [
                  l.status === "taken" ? "Taken" : l.status === "skipped" ? "Skipped" : "Missed",
                  l.status === "taken" && /* @__PURE__ */ jsx(CheckCircleBold, { size: 12 })
                ]
              }
            )
          ] }, l.id);
        }) })
      ] }) })
    ] })
  ] });
}
export {
  MedDetail as default
};
