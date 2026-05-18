import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DCUvaQ8E.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { c as createLucideIcon, b as useProfile, u as useToast, e as useGetProfile, f as useGetDashboardSummary, g as useListMedications, h as useListMedicationLogs, i as useCreateMedicationLog, j as CreateMedicationLogBodyStatus } from "./AppRouter-B_BCS-Zy.js";
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetHeader, d as SheetTitle } from "./sheet-lHYgKUEM.js";
import { useQueryClient } from "@tanstack/react-query";
import { AddCircleBold, CheckCircleBold, BellLinear, SettingsLinear, AltArrowRightLinear, PillBold, ClockCircleLinear, DocumentTextBold, BookLinear, ShieldCheckBold, UsersGroupRoundedLinear, UserLinear, StethoscopeLinear } from "solar-icon-set";
import { m as motion } from "./router-D6f9eD8n.js";
import { D as Droplet } from "./droplet-D4V_v_P6.js";
import { A as AnimatePresence } from "./index-DmJD9Jb4.js";
import { B as Building2 } from "./building-2-Q1QiLhh2.js";
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
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "react-dom";
import "lottie-react";
import "posthog-js";
import "posthog-js/react/dist/esm/index.js";
import "motion-dom";
import "motion-utils";
import "@react-email/components";
import "standardwebhooks";
import "resend";
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
];
const FlaskConical = createLucideIcon("flask-conical", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4", key: "re6nr2" }],
  ["path", { d: "M2 6h4", key: "aawbzj" }],
  ["path", { d: "M2 10h4", key: "l0bgd4" }],
  ["path", { d: "M2 14h4", key: "1gsvsf" }],
  ["path", { d: "M2 18h4", key: "1bu2t1" }],
  [
    "path",
    {
      d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "pqwjuv"
    }
  ]
];
const NotebookPen = createLucideIcon("notebook-pen", __iconNode$1);
const __iconNode = [
  ["path", { d: "m18 2 4 4", key: "22kx64" }],
  ["path", { d: "m17 7 3-3", key: "1w1zoj" }],
  ["path", { d: "M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5", key: "1exhtz" }],
  ["path", { d: "m9 11 4 4", key: "rovt3i" }],
  ["path", { d: "m5 19-3 3", key: "59f2uf" }],
  ["path", { d: "m14 4 6 6", key: "yqp9t2" }]
];
const Syringe = createLucideIcon("syringe", __iconNode);
function getGreeting() {
  const h = (/* @__PURE__ */ new Date()).getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function getInitials(name) {
  if (!name) return "K";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}
function formatTime(t) {
  if (!t) return "—";
  const m = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!m) {
    const d = new Date(t);
    if (!isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return t;
  }
  const h = parseInt(m[1], 10);
  const min = m[2];
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = (h + 11) % 12 + 1;
  return `${h12}:${min} ${ampm}`;
}
function Dashboard() {
  const { profileId, activeProfileId, setActiveProfileId, familyMembers } = useProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [markingTaken, setMarkingTaken] = useState(null);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const { data: profile, isLoading: loadingProfile } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId }
  });
  const activeMember = familyMembers.find((m) => m.id === activeProfileId);
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary(
    activeProfileId,
    { query: { queryKey: ["dashboard-summary", activeProfileId], enabled: !!activeProfileId } }
  );
  const { data: meds, isLoading: loadingMeds } = useListMedications(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medications", activeProfileId], enabled: !!activeProfileId } }
  );
  const { data: logs } = useListMedicationLogs(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medication-logs", activeProfileId], enabled: !!activeProfileId } }
  );
  const createLog = useCreateMedicationLog();
  const todayStr = (/* @__PURE__ */ new Date()).toDateString();
  const takenTodayIds = new Set(
    (logs || []).filter((l) => l.status === "taken" && new Date(l.scheduledAt).toDateString() === todayStr).map((l) => l.medicationId)
  );
  const handleMarkTaken = (medId, medName) => {
    setMarkingTaken(medId);
    createLog.mutate(
      {
        data: {
          medicationId: medId,
          profileId,
          familyMemberId: activeProfileId,
          scheduledAt: (/* @__PURE__ */ new Date()).toISOString(),
          status: CreateMedicationLogBodyStatus.taken
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["medication-logs", activeProfileId] });
          queryClient.invalidateQueries({ queryKey: ["dashboard-summary", activeProfileId] });
          toast({ title: `${medName} marked as taken` });
        },
        onSettled: () => setMarkingTaken(null)
      }
    );
  };
  const sortedMeds = useMemo(() => {
    if (!meds) return [];
    return [...meds].sort((a, b) => (a.reminderTime || "99:99").localeCompare(b.reminderTime || "99:99"));
  }, [meds]);
  const totalToday = sortedMeds.length;
  const doneToday = sortedMeds.filter((m) => takenTodayIds.has(m.id)).length;
  const firstName = activeMember?.fullName.split(" ")[0] || profile?.fullName?.split(" ")[0] || "Friend";
  const missingProfileFields = useMemo(() => {
    if (!profile) return [];
    const m = [];
    if (!profile.dateOfBirth) m.push("date of birth");
    if (!profile.gender) m.push("gender");
    if (!profile.genotype) m.push("genotype");
    if (!profile.country) m.push("location");
    return m;
  }, [profile]);
  const hydrationToday = summary?.latestVitals ? 6 : 0;
  const hydrationTarget = 8;
  const painLevel = summary?.recentCrisisLog ? 2 : 0;
  const quickLogItems = [
    { label: "Fever & Vitals", icon: /* @__PURE__ */ jsx(StethoscopeLinear, { size: 22 }), color: "bg-secondary/15 text-secondary", route: "/vitals" },
    { label: "Hydration", icon: /* @__PURE__ */ jsx(Droplet, { size: 22, className: "fill-current" }), color: "bg-primary/10 text-primary", route: "/hydration" },
    { label: "Pain", icon: /* @__PURE__ */ jsx(Heart, { size: 22, className: "fill-current" }), color: "bg-destructive/10 text-destructive", route: "/crisis" },
    { label: "Medications", icon: /* @__PURE__ */ jsx(PillBold, { size: 22 }), color: "bg-accent/15 text-accent", route: "/meds" },
    { label: "Transfusion", icon: /* @__PURE__ */ jsx(Syringe, { size: 22 }), color: "bg-primary/10 text-primary", route: "/transfusion" },
    { label: "Iron & ferritin", icon: /* @__PURE__ */ jsx(FlaskConical, { size: 22 }), color: "bg-secondary/15 text-secondary", route: "/iron-monitoring" },
    { label: "Hospital Visit", icon: /* @__PURE__ */ jsx(Building2, { size: 22 }), color: "bg-accent/15 text-accent", route: "/records" },
    { label: "Care Notes", icon: /* @__PURE__ */ jsx(NotebookPen, { size: 22 }), color: "bg-muted text-foreground", route: "/records" }
  ];
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-full pb-24", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-50 bg-background/90 backdrop-blur-md px-5 py-3 flex items-center justify-between border-b border-border/30", children: [
      /* @__PURE__ */ jsxs(Sheet, { open: isSwitcherOpen, onOpenChange: setIsSwitcherOpen, children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("button", { className: "flex items-center gap-3 active:scale-95 transition-transform text-left", children: [
          /* @__PURE__ */ jsx(Avatar, { className: "w-9 h-9 ring-2 ring-primary/20", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "font-serif font-bold text-xs bg-primary text-primary-foreground", children: getInitials(activeMember?.fullName || profile?.fullName) }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-none mb-0.5", children: activeMember?.isSelf ? "My Profile" : activeMember?.relationship ?? "Care Profile" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx("p", { className: "font-serif font-semibold text-sm truncate max-w-[120px]", children: activeMember?.fullName || firstName }),
              /* @__PURE__ */ jsx(AddCircleBold, { size: 10, className: "rotate-45 text-muted-foreground/60" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs(SheetContent, { side: "bottom", className: "rounded-t-[32px] border-none px-6 pb-10 bg-background shadow-2xl", children: [
          /* @__PURE__ */ jsxs(SheetHeader, { className: "mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "mx-auto w-12 h-1.5 rounded-full bg-border mb-4" }),
            /* @__PURE__ */ jsx(SheetTitle, { className: "font-serif text-2xl text-left", children: "Switch Care Profile" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
            familyMembers.map((member) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setActiveProfileId(member.id);
                  setIsSwitcherOpen(false);
                  toast({
                    title: `Switched to ${member.fullName.split(" ")[0]}`,
                    description: member.isSelf ? "Main account active" : `Viewing ${member.relationship}'s care data`
                  });
                },
                className: `flex items-center justify-between p-4 rounded-2xl border transition-all ${activeProfileId === member.id ? "border-primary bg-primary/5 ring-1 ring-primary/10" : "border-border/60 bg-card hover:border-primary/40"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                    /* @__PURE__ */ jsx(Avatar, { className: "w-10 h-10", children: /* @__PURE__ */ jsx(AvatarFallback, { className: `${activeProfileId === member.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: getInitials(member.fullName) }) }),
                    /* @__PURE__ */ jsxs("div", { className: "text-left", children: [
                      /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: member.fullName }),
                      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground capitalize", children: member.relationship || "Self" })
                    ] })
                  ] }),
                  activeProfileId === member.id && /* @__PURE__ */ jsx(CheckCircleBold, { size: 18, className: "text-primary" })
                ]
              },
              member.id
            )),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => {
                  setLocation("/family/add");
                  setIsSwitcherOpen(false);
                },
                className: "flex items-center gap-3 p-4 rounded-2xl border border-dashed border-border hover:border-primary transition-colors",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(AddCircleBold, { size: 20 }) }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Add family member" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setLocation("/notifications"),
            className: "w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors relative",
            children: [
              /* @__PURE__ */ jsx(BellLinear, { size: 20 }),
              /* @__PURE__ */ jsx("span", { className: "absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLocation("/settings"),
            className: "w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors",
            children: /* @__PURE__ */ jsx(SettingsLinear, { size: 20 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-5 pt-6 pb-4", children: /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 }, children: [
      loadingProfile ? /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-44 rounded-xl mb-1" }) : /* @__PURE__ */ jsxs("h1", { className: "font-serif text-[26px] text-foreground leading-tight tracking-tight", children: [
        "Welcome back,",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: firstName })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        getGreeting(),
        " — here's your care summary"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "px-5 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold uppercase tracking-[1.5px] text-primary/60", children: "Today's Care Overview" }),
        /* @__PURE__ */ jsxs("button", { onClick: () => setLocation("/crisis"), className: "text-[11px] text-primary font-bold flex items-center gap-0.5 hover:underline", children: [
          "Details ",
          /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 12 })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileTap: { scale: 0.96 },
            onClick: () => setLocation("/hydration"),
            className: "bg-card rounded-[20px] p-3.5 flex flex-col items-center gap-2 border border-border/40 shadow-sm hover:border-primary/30 transition-all",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Droplet, { size: 18, className: "text-primary fill-primary/40" }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "font-serif font-bold text-base text-foreground leading-none", children: loadingSummary ? "—" : `${hydrationToday}/${hydrationTarget}` }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 font-medium", children: "cups" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-foreground/70 text-center", children: "Hydration" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileTap: { scale: 0.96 },
            onClick: () => setLocation("/crisis"),
            className: "bg-card rounded-[20px] p-3.5 flex flex-col items-center gap-2 border border-border/40 shadow-sm hover:border-destructive/30 transition-all",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Heart, { size: 18, className: "text-destructive fill-destructive/40" }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "font-serif font-bold text-base text-foreground leading-none", children: loadingSummary ? "—" : `${painLevel}/10` }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 font-medium", children: "score" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-foreground/70 text-center", children: "Pain Level" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.button,
          {
            whileTap: { scale: 0.96 },
            onClick: () => setLocation("/meds"),
            className: "bg-card rounded-[20px] p-3.5 flex flex-col items-center gap-2 border border-border/40 shadow-sm hover:border-accent/30 transition-all",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(PillBold, { size: 18, className: "text-accent" }) }),
              /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx("p", { className: "font-serif font-bold text-base text-foreground leading-none", children: loadingMeds ? "—" : `${doneToday}/${totalToday}` }),
                /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 font-medium", children: "taken" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-semibold text-foreground/70 text-center", children: "Medications" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "px-5 mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold uppercase tracking-[1.5px] text-primary/60 mb-3", children: "Quick Log" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: quickLogItems.map((item) => /* @__PURE__ */ jsxs(
        motion.button,
        {
          whileTap: { scale: 0.92 },
          onClick: () => setLocation(item.route),
          className: "flex flex-col items-center gap-1.5 active:opacity-80 transition-opacity",
          children: [
            /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-[18px] ${item.color} flex items-center justify-center shadow-sm`, children: item.icon }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold text-foreground/80 text-center leading-tight", children: item.label })
          ]
        },
        item.label
      )) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "px-5 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold uppercase tracking-[1.5px] text-primary/60", children: "Today's Schedule" }),
        /* @__PURE__ */ jsxs(Link, { href: "/meds", className: "text-[11px] font-bold text-primary flex items-center gap-1 hover:underline", children: [
          "View All ",
          /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 12 })
        ] })
      ] }),
      loadingMeds ? /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-[72px] w-full rounded-2xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-[72px] w-full rounded-2xl" })
      ] }) : sortedMeds.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-card border border-dashed border-border/60 rounded-2xl p-6 text-center", children: [
        /* @__PURE__ */ jsx(PillBold, { size: 28, className: "mx-auto text-muted-foreground/30 mb-2" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground font-medium mb-2", children: "No medications scheduled today." }),
        /* @__PURE__ */ jsx(Button, { variant: "link", onClick: () => setLocation("/meds"), className: "text-primary font-bold text-sm p-0 h-auto", children: "Add Medication" })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2.5", children: [
        sortedMeds.slice(0, 3).map((med) => {
          const done = takenTodayIds.has(med.id);
          return /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              className: `px-4 py-3 rounded-2xl border flex items-center gap-3 transition-all ${done ? "bg-muted/30 border-transparent opacity-60" : "bg-card border-border/40 shadow-sm"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${done ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`, children: done ? /* @__PURE__ */ jsx(CheckCircleBold, { size: 18 }) : /* @__PURE__ */ jsx(PillBold, { size: 18 }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 mb-0.5", children: [
                    /* @__PURE__ */ jsx(ClockCircleLinear, { size: 11, className: "text-muted-foreground" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold tracking-wider uppercase text-muted-foreground", children: formatTime(med.reminderTime) })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: `font-semibold text-sm leading-tight ${done ? "line-through text-muted-foreground" : "text-foreground"}`, children: med.name }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground", children: med.dose })
                ] }),
                !done && /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleMarkTaken(med.id, med.name),
                    disabled: markingTaken === med.id,
                    className: "h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider text-primary-foreground bg-primary shadow-sm active:scale-95 transition-all disabled:opacity-50",
                    children: markingTaken === med.id ? "…" : "Take"
                  }
                )
              ]
            },
            med.id
          );
        }),
        sortedMeds.length > 3 && /* @__PURE__ */ jsxs("button", { onClick: () => setLocation("/meds"), className: "text-center text-xs text-primary font-bold py-2 hover:underline", children: [
          "+",
          sortedMeds.length - 3,
          " more medications"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-5 mb-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border/40 rounded-[24px] p-5 shadow-sm relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -top-8 -right-8 w-28 h-28 bg-primary/5 rounded-full blur-2xl" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(DocumentTextBold, { size: 20, className: "text-primary" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-foreground", children: "Care Summary" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 leading-snug", children: "Generate a summary for your next clinic visit." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          className: "w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-sm",
          onClick: () => setLocation("/crisis-insights"),
          children: [
            "Generate Summary ",
            /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 14, className: "ml-1.5" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "px-5 mb-3", children: /* @__PURE__ */ jsx("h2", { className: "text-xs font-bold uppercase tracking-[1.5px] text-primary/60", children: "More Tools" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2.5 overflow-x-auto px-5 pb-1 scrollbar-hide", children: [
        { label: "Directory", icon: /* @__PURE__ */ jsx(BookLinear, { size: 15, className: "text-secondary" }), route: "/directory" },
        { label: "Genotype Check", icon: /* @__PURE__ */ jsx(ShieldCheckBold, { size: 15, className: "text-primary" }), route: "/genotype-checker" },
        { label: "Family Tree", icon: /* @__PURE__ */ jsx(UsersGroupRoundedLinear, { size: 15, className: "text-accent" }), route: "/family" },
        { label: "Resources", icon: /* @__PURE__ */ jsx(BookLinear, { size: 15, className: "text-secondary" }), route: "/resources" },
        { label: "Emergency", icon: /* @__PURE__ */ jsx(Heart, { size: 15, className: "text-destructive fill-destructive" }), route: "/emergency" }
      ].map((item) => /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setLocation(item.route),
          className: "shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border/40 shadow-sm active:scale-95 transition-all hover:border-primary/30",
          children: [
            item.icon,
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold whitespace-nowrap text-foreground", children: item.label })
          ]
        },
        item.label
      )) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: missingProfileFields.length > 0 && /* @__PURE__ */ jsx(
      motion.section,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95 },
        className: "px-5 mb-4",
        children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setLocation("/profile/edit"),
            className: "w-full relative overflow-hidden rounded-[24px] p-5 text-left border border-accent/30 group",
            children: [
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-accent/5 transition-colors group-hover:bg-accent/10" }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex items-center gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20 shrink-0", children: /* @__PURE__ */ jsx(UserLinear, { size: 22 }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm mb-0.5", children: "Complete your care profile" }),
                  /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground leading-tight", children: [
                    "Add ",
                    missingProfileFields.slice(0, 2).join(" & "),
                    " for personalized insights."
                  ] })
                ] }),
                /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 16, className: "text-accent shrink-0" })
              ] })
            ]
          }
        )
      }
    ) })
  ] }) });
}
export {
  Dashboard as default
};
