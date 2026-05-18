import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Checkbox } from "./checkbox-CbHvjaNi.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-OxmP8OOz.js";
import { b as useProfile, u as useToast, k as useListCrisisLogs, n as getListCrisisLogsQueryKey, e as useGetProfile } from "./AppRouter-B_BCS-Zy.js";
import { e as exportCrisisReportToPdf } from "./profilePdf-RGgcTAFP.js";
import { useLocation } from "wouter";
import { ShareLinear, DownloadLinear } from "solar-icon-set";
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
import "@radix-ui/react-checkbox";
import "./check-Cj3vfzP8.js";
import "@radix-ui/react-select";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "jspdf";
import "./Logo-qOo-96Vk.js";
function CrisisShare() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [period, setPeriod] = useState("year");
  const [details, setDetails] = useState(true);
  const [treatments, setTreatments] = useState(true);
  const [insights, setInsights] = useState(true);
  const { data: logs = [] } = useListCrisisLogs(
    { profileId },
    { query: { queryKey: getListCrisisLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: profile } = useGetProfile(profileId, { query: { enabled: !!profileId } });
  const filterLogs = () => {
    const now = Date.now();
    if (period === "all") return logs;
    if (period === "year") {
      const y = (/* @__PURE__ */ new Date()).getFullYear();
      return logs.filter((l) => l.occurredAt && new Date(l.occurredAt).getFullYear() === y);
    }
    const days = parseInt(period, 10);
    return logs.filter((l) => l.occurredAt && now - new Date(l.occurredAt).getTime() <= days * 864e5);
  };
  const periodLabel = period === "year" ? `This year (${(/* @__PURE__ */ new Date()).getFullYear()})` : period === "all" ? "All time" : `Last ${period} days`;
  const handleGenerate = async () => {
    const filtered = filterLogs();
    if (!filtered.length) {
      toast({ title: "Nothing to share yet", description: "No crises in this period.", variant: "destructive" });
      return;
    }
    if (!details && !treatments && !insights) {
      toast({ title: "Pick at least one section", variant: "destructive" });
      return;
    }
    await exportCrisisReportToPdf({
      patientName: profile?.fullName,
      periodLabel,
      include: { details, treatments, insights },
      logs: filtered
    });
    toast({ title: "Report generated", description: "Saved to your downloads." });
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Share with Care Team", back: "/crisis" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center mb-6 mt-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(ShareLinear, { size: 32 }) }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl font-semibold text-foreground tracking-[-0.3px] mb-2", children: "Share your crisis history" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-[280px]", children: "Help your doctor understand your pattern and provide better care." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-foreground mb-2 block", children: "Share period" }),
          /* @__PURE__ */ jsxs(Select, { value: period, onValueChange: (v) => setPeriod(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-card h-12 rounded-xl", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "30", children: "Last 30 days" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "90", children: "Last 90 days" }),
              /* @__PURE__ */ jsxs(SelectItem, { value: "year", children: [
                "This year (",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ")"
              ] }),
              /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All time" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "text-sm font-semibold text-foreground mb-2 block", children: "Include" }),
          /* @__PURE__ */ jsx("div", { className: "bg-card border border-border/60 rounded-2xl px-4", children: [
            { id: "details", label: "Crisis details", val: details, set: setDetails },
            { id: "treatments", label: "Treatments", val: treatments, set: setTreatments },
            { id: "insights", label: "Insights summary", val: insights, set: setInsights }
          ].map((opt, i, arr) => /* @__PURE__ */ jsxs("label", { className: `flex items-center gap-3 py-3.5 cursor-pointer ${i < arr.length - 1 ? "border-b border-border/50" : ""}`, children: [
            /* @__PURE__ */ jsx(Checkbox, { checked: opt.val, onCheckedChange: (v) => opt.set(!!v) }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: opt.label })
          ] }, opt.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Button, { size: "xl", className: "w-full mt-8", onClick: handleGenerate, children: [
        /* @__PURE__ */ jsx(DownloadLinear, { size: 18 }),
        " Generate report"
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "xl", variant: "ghost", className: "w-full mt-2", onClick: () => setLocation("/crisis"), children: "Cancel" })
    ] })
  ] });
}
export {
  CrisisShare as default
};
