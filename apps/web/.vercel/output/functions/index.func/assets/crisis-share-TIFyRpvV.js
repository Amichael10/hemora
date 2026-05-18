import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Checkbox } from "./checkbox-eERtGHNF.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-x5Uz1oRZ.js";
import { d as useProfile, u as useLocation, a as useToast, l as useListCrisisLogs, p as getListCrisisLogsQueryKey, f as useGetProfile } from "./AppRouter-yFV4k-aY.js";
import { e as exportCrisisReportToPdf } from "./profilePdf-SgRuM8D2.js";
import { m as m01, j as UH1 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
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
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-D8DUTDeV.js";
import "./check-Dt55N_VK.js";
import "./router-BY6ex80A.js";
import "./index-BfrgU2eP.js";
import "./jspdf.node.min-Ba6FWgAB.js";
import "fs";
import "path";
import "./Logo-qOo-96Vk.js";
function CrisisShare() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [period, setPeriod] = reactExports.useState("year");
  const [details, setDetails] = reactExports.useState(true);
  const [treatments, setTreatments] = reactExports.useState(true);
  const [insights, setInsights] = reactExports.useState(true);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Share with Care Team", back: "/crisis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-6 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(m01, { size: 32 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-xl font-semibold text-foreground tracking-[-0.3px] mb-2", children: "Share your crisis history" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-[280px]", children: "Help your doctor understand your pattern and provide better care." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground mb-2 block", children: "Share period" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: period, onValueChange: (v) => setPeriod(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-card h-12 rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "30", children: "Last 30 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "90", children: "Last 90 days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: "year", children: [
                "This year (",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All time" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-semibold text-foreground mb-2 block", children: "Include" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border/60 rounded-2xl px-4", children: [
            { id: "details", label: "Crisis details", val: details, set: setDetails },
            { id: "treatments", label: "Treatments", val: treatments, set: setTreatments },
            { id: "insights", label: "Insights summary", val: insights, set: setInsights }
          ].map((opt, i, arr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: `flex items-center gap-3 py-3.5 cursor-pointer ${i < arr.length - 1 ? "border-b border-border/50" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: opt.val, onCheckedChange: (v) => opt.set(!!v) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: opt.label })
          ] }, opt.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "xl", className: "w-full mt-8", onClick: handleGenerate, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UH1, { size: 18 }),
        " Generate report"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xl", variant: "ghost", className: "w-full mt-2", onClick: () => setLocation("/crisis"), children: "Cancel" })
    ] })
  ] });
}
export {
  CrisisShare as default
};
