import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { d as useProfile, u as useLocation, a as useToast, ao as useListVitalsLogs, ap as getListVitalsLogsQueryKey, aq as useCreateVitalsLog } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { u as useQueryClient } from "./router-BY6ex80A.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { M as Ma1, au as w_, a as FX1, L as L4, ae as u11, A as A_, g as YX1 } from "./index-D2ZfvGdl.js";
import { D as Droplet } from "./droplet-C4QC1yjA.js";
import { M as Minus, P as Plus } from "./plus-hu0LYozh.js";
import { S as Share2 } from "./share-2-BAmO7cwO.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
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
function Hydration() {
  const { profileId } = useProfile();
  useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentView, setCurrentView] = reactExports.useState("dashboard");
  const [targetGlasses, setTargetGlasses] = reactExports.useState(10);
  const [preferredUnit, setPreferredUnit] = reactExports.useState("glasses");
  const [remindersEnabled, setRemindersEnabled] = reactExports.useState({
    "9:00 AM": true,
    "1:00 PM": true,
    "6:00 PM": true
  });
  const [higherTargetOverride, setHigherTargetOverride] = reactExports.useState(false);
  const [manualAmount, setManualAmount] = reactExports.useState("");
  const [drinkType, setDrinkType] = reactExports.useState("Water");
  const [logDate, setLogDate] = reactExports.useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 16));
  const [notes, setNotes] = reactExports.useState("");
  const [timeRange, setTimeRange] = reactExports.useState("7");
  const { data: vitals, isLoading } = useListVitalsLogs(
    { profileId },
    { query: { queryKey: getListVitalsLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const createVital = useCreateVitalsLog();
  const hydrationLogs = reactExports.useMemo(() => {
    if (!vitals) return [];
    return vitals.filter((v) => v.type === "hydration").sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
  }, [vitals]);
  const finalTargetMl = reactExports.useMemo(() => {
    let multiplier = targetGlasses;
    if (higherTargetOverride) {
      multiplier += 2;
    }
    return multiplier * 250;
  }, [targetGlasses, higherTargetOverride]);
  const todayHydrationTotalMl = reactExports.useMemo(() => {
    const today = (/* @__PURE__ */ new Date()).toDateString();
    return hydrationLogs.filter((log) => new Date(log.occurredAt).toDateString() === today).reduce((sum, log) => {
      const val = Number(log.value);
      if (log.unit === "glasses") {
        return sum + val * 250;
      }
      return sum + val;
    }, 0);
  }, [hydrationLogs]);
  const todayHydrationTotalGlasses = reactExports.useMemo(() => {
    return Math.round(todayHydrationTotalMl / 250 * 10) / 10;
  }, [todayHydrationTotalMl]);
  const handleSaveIntake = (amountMl) => {
    if (!profileId) return;
    const valueStr = amountMl.toString();
    const finalUnit = preferredUnit === "glasses" ? "glasses" : "ml";
    const finalValue = preferredUnit === "glasses" ? (amountMl / 250).toString() : valueStr;
    createVital.mutate(
      {
        data: {
          profileId,
          type: "hydration",
          value: finalValue,
          unit: finalUnit,
          occurredAt: new Date(logDate).toISOString(),
          notes: notes || `${drinkType} intake`
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListVitalsLogsQueryKey({ profileId }) });
          toast({ title: "Water logged successfully!" });
          setNotes("");
          setManualAmount("");
          const newTotal = todayHydrationTotalMl + amountMl;
          if (newTotal >= finalTargetMl) {
            setCurrentView("summary");
          } else {
            setCurrentView("dashboard");
          }
        },
        onError: (err) => {
          toast({
            title: "Failed to log",
            description: err.message,
            variant: "destructive"
          });
        }
      }
    );
  };
  const handleQuickAdd = (ml) => {
    handleSaveIntake(ml);
  };
  const targetPercent = reactExports.useMemo(() => {
    return Math.min(100, Math.round(todayHydrationTotalMl / finalTargetMl * 100));
  }, [todayHydrationTotalMl, finalTargetMl]);
  const weeklyChartData = reactExports.useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const results = days.map((day, idx) => {
      const today = /* @__PURE__ */ new Date();
      const currentDayIdx = today.getDay();
      const targetDate = /* @__PURE__ */ new Date();
      targetDate.setDate(today.getDate() - (currentDayIdx - idx));
      const targetDateStr = targetDate.toDateString();
      const dayLogs = hydrationLogs.filter(
        (log) => new Date(log.occurredAt).toDateString() === targetDateStr
      );
      const totalMl = dayLogs.reduce((sum, log) => {
        const val = Number(log.value);
        if (log.unit === "glasses") {
          return sum + val * 250;
        }
        return sum + val;
      }, 0);
      return {
        day,
        ml: totalMl,
        glasses: totalMl / 250
      };
    });
    return results;
  }, [hydrationLogs]);
  const hydrationStreak = reactExports.useMemo(() => {
    let streak = 0;
    const today = /* @__PURE__ */ new Date();
    for (let i = 0; i < 7; i++) {
      const checkDate = /* @__PURE__ */ new Date();
      checkDate.setDate(today.getDate() - i);
      const checkDateStr = checkDate.toDateString();
      const hasIntake = hydrationLogs.some(
        (log) => new Date(log.occurredAt).toDateString() === checkDateStr
      );
      if (hasIntake) {
        streak++;
      } else {
        if (i > 0) break;
      }
    }
    return streak;
  }, [hydrationLogs]);
  const handleShareSummary = () => {
    const text = `💧 My Hydration Summary for today: ${todayHydrationTotalGlasses} / ${targetGlasses} glasses (${todayHydrationTotalMl} mL) completed! Streak: ${hydrationStreak} days. Logged on Hemora.`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Summary copied to clipboard!",
      description: "You can now share it with your care team or family."
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 pb-24", children: [
    currentView === "dashboard" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[28px] font-serif text-[#193B3F] mb-1 leading-tight", children: "Hydration Tracker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#193B3F]/80 font-sans", children: "Staying hydrated supports your blood flow, energy, and overall well-being." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "w-10 h-10 rounded-full border-[#193B3F]/10 bg-white",
            onClick: () => setCurrentView("settings"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ma1, { size: 20, className: "text-[#193B3F]" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[32px] p-6 border border-[#193B3F]/10 shadow-sm flex flex-col items-center relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-[#193B3F]/5 rounded-full -mr-16 -mt-16 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-48 h-48 flex items-center justify-center mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full -rotate-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "96", cy: "96", r: "80", fill: "transparent", stroke: "#F4EAD8", strokeWidth: "12" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "96",
                cy: "96",
                r: "80",
                fill: "transparent",
                stroke: "#A8324A",
                strokeWidth: "12",
                strokeDasharray: 502.4,
                strokeDashoffset: 502.4 - 502.4 * targetPercent / 100,
                strokeLinecap: "round",
                className: "transition-all duration-1000 ease-out"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "text-[#A8324A] w-8 h-8 mb-1 animate-bounce", fill: "#A8324A" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-serif font-bold text-[#193B3F]", children: [
              todayHydrationTotalGlasses,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-sans font-medium text-[#193B3F]/60", children: [
                "/ ",
                targetGlasses
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60 mt-1", children: "glasses" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-[#A8324A] mt-0.5", children: [
              "(",
              todayHydrationTotalMl,
              " mL)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#F4EAD8]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-r border-[#F4EAD8] pr-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] font-bold text-[#193B3F]/60 uppercase tracking-wider", children: "Today's Target" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold mt-0.5 block", children: [
              targetGlasses,
              " glasses (",
              finalTargetMl / 1e3,
              "L)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrentView("settings"), className: "text-xs text-[#A8324A] font-bold hover:underline mt-1", children: "Edit Goal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center pl-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-[10px] font-bold text-[#193B3F]/60 uppercase tracking-wider", children: "Reminder Alarm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold mt-0.5 block", children: "On - 3x per day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrentView("settings"), className: "text-xs text-[#A8324A] font-bold hover:underline mt-1", children: "Configure" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full flex gap-3 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => handleQuickAdd(250),
              className: "flex-[1.2] bg-[#A8324A] hover:bg-[#A8324A]/90 text-white text-sm font-extrabold h-12 rounded-xl shadow-sm flex items-center justify-center gap-1.5",
              children: "🥤 I've taken 1 Glass"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => handleQuickAdd(500),
              variant: "outline",
              className: "flex-1 border-[#A8324A] text-[#A8324A] hover:bg-[#A8324A]/5 text-xs font-bold h-12 rounded-xl flex items-center justify-center gap-1",
              children: "Log 500mL Bottle"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setCurrentView("log"),
            className: "text-xs text-[#193B3F]/60 font-semibold hover:underline mt-4 cursor-pointer",
            children: "Log custom amount or details"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setCurrentView("history"),
            className: "h-16 rounded-2xl bg-white border-[#193B3F]/10 text-[#193B3F] text-sm font-bold flex gap-2.5 shadow-sm hover:bg-[#FBF5E7]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(w_, { size: 20, className: "text-[#A8324A]" }),
              "History & Trends"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => setCurrentView("summary"),
            className: "h-16 rounded-2xl bg-white border-[#193B3F]/10 text-[#193B3F] text-sm font-bold flex gap-2.5 shadow-sm hover:bg-[#FBF5E7]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { size: 20, className: "text-[#A8324A]" }),
              "Daily Summary"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-serif mb-4 flex items-center gap-2", children: "Recent Hydration Log" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-full rounded-2xl" })
        ] }) : hydrationLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-[#193B3F]/10 rounded-[24px] p-8 text-center shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { className: "text-[#193B3F]/20 w-10 h-10 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-[#193B3F]/60", children: "No water logged today yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", onClick: () => setCurrentView("log"), className: "text-[#A8324A] font-bold p-0 mt-1 h-auto", children: "Log intake now" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: hydrationLogs.slice(0, 4).map((log) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-[#193B3F]/10 shadow-sm overflow-hidden rounded-[20px] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-[#FBF5E7] flex items-center justify-center text-[#A8324A]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplet, { size: 18, fill: "#A8324A" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm text-[#193B3F]", children: [
                log.value,
                " ",
                log.unit === "glasses" ? "glass" : "mL",
                " ",
                Number(log.value) > 1 && log.unit === "glasses" ? "es" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/60 mt-0.5", children: log.notes || "Water intake" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#193B3F]/60 font-semibold", children: new Date(log.occurredAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) })
        ] }) }, log.id)) })
      ] })
    ] }),
    currentView === "log" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "w-10 h-10 rounded-full border-[#193B3F]/10 bg-white",
            onClick: () => setCurrentView("dashboard"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(L4, { size: 20, className: "text-[#193B3F]" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-serif text-[#193B3F]", children: "Log water" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/70", children: "Add your intake to keep your progress on track." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[28px] p-6 border border-[#193B3F]/10 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Quick add presets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
            { label: "1 glass", desc: "250 mL", amount: 250 },
            { label: "2 glasses", desc: "500 mL", amount: 500 },
            { label: "500 mL bottle", desc: "500 mL", amount: 500 },
            { label: "750 mL bottle", desc: "750 mL", amount: 750 }
          ].map((preset, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => handleQuickAdd(preset.amount),
              className: "p-3 bg-[#FBF5E7] border border-[#193B3F]/10 rounded-2xl flex flex-col items-center hover:border-[#A8324A] active:scale-98 transition-all",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm text-[#193B3F]", children: preset.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-[#193B3F]/60 font-medium mt-0.5", children: preset.desc })
              ]
            },
            idx
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-[#193B3F]/40 uppercase tracking-widest font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[1px] bg-[#193B3F]/10 flex-1 mr-4" }),
          "or enter manually",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-[1px] bg-[#193B3F]/10 flex-1 ml-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "manualAmount", className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Custom amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "manualAmount",
                type: "number",
                value: manualAmount,
                onChange: (e) => setManualAmount(e.target.value),
                placeholder: "e.g. 250, 500",
                className: "h-12 rounded-xl bg-[#FBF5E7] border-[#193B3F]/10 text-sm font-semibold"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-12 px-4 rounded-xl bg-[#FBF5E7] border border-[#193B3F]/10 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-[#193B3F]/60 shrink-0", children: "mL" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "logDate", className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Date & Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "logDate",
              type: "datetime-local",
              value: logDate,
              onChange: (e) => setLogDate(e.target.value),
              className: "h-12 rounded-xl bg-[#FBF5E7] border-[#193B3F]/10 text-sm font-semibold"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "drinkType", className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Drink Type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              id: "drinkType",
              value: drinkType,
              onChange: (e) => setDrinkType(e.target.value),
              className: "w-full h-12 px-3 rounded-xl bg-[#FBF5E7] border border-[#193B3F]/10 text-sm font-semibold focus:outline-none focus:border-[#A8324A]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Water" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Juice" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Herbal Tea" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Electrolyte Drink" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Other" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Notes (Optional)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "notes",
              value: notes,
              onChange: (e) => setNotes(e.target.value),
              placeholder: "e.g. with medication, after workout, etc.",
              className: "min-h-[80px] rounded-2xl bg-[#FBF5E7] border-[#193B3F]/10 text-sm p-4 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FBF5E7] p-4 rounded-2xl flex gap-3 border border-[#193B3F]/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(u11, { size: 16, className: "text-[#A8324A] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#193B3F]/80 leading-normal", children: "Small sips add up. Every glass counts toward your daily hydration goal, supporting optimal blood flow." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => {
              const amount = manualAmount ? Number(manualAmount) : 250;
              handleSaveIntake(amount);
            },
            className: "w-full h-14 rounded-2xl bg-[#193B3F] hover:bg-[#0a1e1c] text-white text-base font-bold shadow-md",
            children: "Save intake"
          }
        )
      ] })
    ] }),
    currentView === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "w-10 h-10 rounded-full border-[#193B3F]/10 bg-white",
            onClick: () => setCurrentView("dashboard"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(L4, { size: 20, className: "text-[#193B3F]" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-serif text-[#193B3F]", children: "Hydration goal & reminders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/70", children: "Set your goals and reminders that fit your care plan." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[28px] p-6 border border-[#193B3F]/10 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60 block text-left", children: "Daily Target Goal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-6 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setTargetGlasses((g) => Math.max(4, g - 1)),
                className: "w-12 h-12 rounded-full border border-[#193B3F]/10 flex items-center justify-center hover:bg-[#FBF5E7] active:scale-95 transition-all text-[#193B3F]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 18 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-serif font-bold text-[#193B3F]", children: targetGlasses }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold uppercase text-[#193B3F]/60 block mt-1", children: [
                "glasses (",
                targetGlasses * 250,
                " mL)"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setTargetGlasses((g) => Math.min(24, g + 1)),
                className: "w-12 h-12 rounded-full border border-[#193B3F]/10 flex items-center justify-center hover:bg-[#FBF5E7] active:scale-95 transition-all text-[#193B3F]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 18 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Preferred Unit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 p-1 bg-[#FBF5E7] rounded-xl border border-[#193B3F]/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setPreferredUnit("glasses"),
                className: `py-2 rounded-lg text-xs font-bold transition-all ${preferredUnit === "glasses" ? "bg-white text-[#193B3F] shadow-sm" : "text-[#193B3F]/60 hover:text-[#193B3F]"}`,
                children: "Glasses"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setPreferredUnit("ml"),
                className: `py-2 rounded-lg text-xs font-bold transition-all ${preferredUnit === "ml" ? "bg-white text-[#193B3F] shadow-sm" : "text-[#193B3F]/60 hover:text-[#193B3F]"}`,
                children: "Milliliters (mL)"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60", children: "Reminder times" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            Object.entries(remindersEnabled).map(([time, enabled]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-3.5 bg-[#FBF5E7] rounded-2xl border border-[#193B3F]/5 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(A_, { size: 16, className: "text-[#A8324A]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: time })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => setRemindersEnabled((prev) => ({ ...prev, [time]: !enabled })),
                      className: `w-12 h-6 rounded-full p-0.5 transition-all ${enabled ? "bg-[#193B3F]" : "bg-gray-200"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : ""}` })
                    }
                  )
                ]
              },
              time
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full py-3 border border-dashed border-[#193B3F]/20 rounded-xl text-xs font-bold text-[#A8324A] hover:bg-[#FBF5E7] transition-colors mt-2", children: "+ Add reminder" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-[#FBF5E7] rounded-3xl border border-[#193B3F]/5 flex gap-4 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              id: "override",
              checked: higherTargetOverride,
              onChange: (e) => setHigherTargetOverride(e.target.checked),
              className: "w-5 h-5 mt-0.5 accent-[#A8324A] border-[#193B3F]/20 rounded"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "override", className: "font-bold text-sm leading-tight block mb-1", children: "Higher target during recovery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/70 leading-normal", children: "Automatically suggest +2 extra glasses daily during hot weather, fever, or crisis recovery when your body requires extra hydration support." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 border-t border-[#F4EAD8] pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(u11, { size: 16, className: "text-[#A8324A] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#193B3F]/70 leading-relaxed", children: "Follow your care team's guidance. Always match your fluid targets with your clinical care plan." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: () => {
              toast({ title: "Goal & Reminders updated!" });
              setCurrentView("dashboard");
              if (typeof window !== "undefined" && "Notification" in window) {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    new Notification("Hydration Reminder", {
                      body: "It's time for your scheduled water break to support recovery & circulation.",
                      icon: "/brand/logo.png"
                    });
                  }
                });
              }
            },
            className: "w-full h-14 rounded-2xl bg-[#193B3F] hover:bg-[#0a1e1c] text-white text-base font-bold shadow-md",
            children: "Save Settings"
          }
        )
      ] })
    ] }),
    currentView === "history" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "w-10 h-10 rounded-full border-[#193B3F]/10 bg-white",
            onClick: () => setCurrentView("dashboard"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(L4, { size: 20, className: "text-[#193B3F]" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-serif text-[#193B3F]", children: "History & trends" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/70 font-sans", children: "See how hydration supports your health over time." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 p-1 bg-white rounded-2xl border border-[#193B3F]/10", children: ["7", "30", "90"].map((range) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setTimeRange(range),
          className: `py-2.5 rounded-xl text-xs font-bold transition-all ${timeRange === range ? "bg-[#FBF5E7] text-[#193B3F] border border-[#193B3F]/5 font-extrabold" : "text-[#193B3F]/60"}`,
          children: [
            range,
            " Days"
          ]
        },
        range
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[28px] p-6 border border-[#193B3F]/10 shadow-sm space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-bold uppercase tracking-wider text-[#193B3F]/60 mb-4", children: "Daily intake" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-48 w-full flex items-end justify-between px-2 pt-6 relative border-b border-[#193B3F]/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 border-t border-dashed border-[#A8324A]/50 z-0 top-[35%]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-0 text-[9px] font-bold text-[#A8324A] bg-white px-1 leading-none -mt-2 z-10 top-[35%]", children: "Goal" }),
            weeklyChartData.map((data, idx) => {
              const maxHeight = 120;
              const height = Math.max(12, Math.min(maxHeight, data.ml / finalTargetMl * maxHeight));
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center flex-1 z-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    style: { height: `${height}px` },
                    className: "w-4 rounded-t-full bg-[#A8324A] relative overflow-hidden group transition-all duration-300 hover:brightness-95 flex justify-center",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 left-0 h-1 bg-white/20" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#193B3F]/60 mt-2 block", children: data.day })
              ] }, idx);
            })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-[#FBF5E7] rounded-2xl flex items-center justify-between border border-[#193B3F]/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#193B3F]/60 uppercase tracking-wider block", children: "7-day streak" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-serif font-bold text-[#193B3F] mt-0.5 block", children: [
              hydrationStreak,
              " days - Keep it going!"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => {
            const active = idx < hydrationStreak;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${active ? "bg-[#A8324A] text-white" : "bg-white border border-[#193B3F]/10 text-[#193B3F]/30"}`,
                children: day
              },
              idx
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-[#FBF5E7] border border-[#193B3F]/5 rounded-2xl text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-[#193B3F]/60 uppercase block", children: "Average Daily" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-serif font-bold mt-1 block", children: "8.1gl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-[#FBF5E7] border border-[#193B3F]/5 rounded-2xl text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-[#193B3F]/60 uppercase block", children: "Best Day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-serif font-bold mt-1 block", children: "11gl" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-[#FBF5E7] border border-[#193B3F]/5 rounded-2xl text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-[#193B3F]/60 uppercase block", children: "Below Target" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-serif font-bold mt-1 block", children: "2d" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#FBF5E7] p-4 rounded-2xl flex gap-3 border border-[#193B3F]/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { size: 16, className: "text-[#A8324A] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-[#193B3F]/80 leading-normal", children: "Great consistency! Proper hydration plays a massive clinical role in preventing sickle-cell vaso-occlusion." })
        ] })
      ] })
    ] }),
    currentView === "summary" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "w-10 h-10 rounded-full border-[#193B3F]/10 bg-white",
            onClick: () => setCurrentView("dashboard"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(L4, { size: 20, className: "text-[#193B3F]" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-serif text-[#193B3F]", children: "Today's summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/70 font-sans", children: "Nice work! Here's how you did today." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[28px] p-6 border border-[#193B3F]/10 shadow-sm space-y-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-40 h-40 flex items-center justify-center mx-auto mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full -rotate-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "80", cy: "80", r: "64", fill: "transparent", stroke: "#F4EAD8", strokeWidth: "10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "80",
                cy: "80",
                r: "64",
                fill: "transparent",
                stroke: "#A8324A",
                strokeWidth: "10",
                strokeDasharray: 401.92,
                strokeDashoffset: 401.92 - 401.92 * targetPercent / 100,
                strokeLinecap: "round",
                className: "transition-all duration-1000 ease-out"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center justify-center text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { className: "text-[#A8324A] w-6 h-6 mb-0.5", fill: "#A8324A animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-serif font-bold text-[#193B3F]", children: [
              targetPercent,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#193B3F]/60 block mt-0.5", children: "completed" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-serif font-bold text-[#193B3F] mt-2", children: targetPercent >= 100 ? "Goal Reached!" : "Keep Sipping!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-[#193B3F]/60 mt-1 max-w-[280px] mx-auto", children: [
            "You've logged ",
            todayHydrationTotalGlasses,
            " / ",
            targetGlasses,
            " glasses today.",
            targetPercent >= 80 ? " Excellent hydration progress!" : " Keep sipping to stay on track."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-[#FBF5E7] rounded-2xl border border-[#193B3F]/5 text-left space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-[#A8324A] uppercase tracking-wider block", children: "Today's Intake" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-serif font-bold text-[#193B3F] block", children: [
            todayHydrationTotalGlasses,
            " glasses (",
            todayHydrationTotalMl,
            " mL)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#193B3F]/70 italic mt-2", children: '"Felt good staying on track today."' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-[#FBF5E7] rounded-2xl border border-[#193B3F]/5 flex gap-3 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(YX1, { size: 18, className: "text-[#A8324A] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xs", children: "Low hydration can be a trigger" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[#193B3F]/70 leading-normal mt-0.5", children: "Dehydration triggers RBC sickling. Staying ahead is your most powerful tool to reduce pain and complications." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "flex-1 h-12 rounded-xl border-[#193B3F]/10 text-[#193B3F]",
              onClick: () => setCurrentView("log"),
              children: "Edit today"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 h-12 rounded-xl bg-[#A8324A] hover:bg-[#A8324A]/90 text-white font-bold",
              onClick: handleShareSummary,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { size: 16, className: "mr-2" }),
                " Share summary"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Hydration as default
};
