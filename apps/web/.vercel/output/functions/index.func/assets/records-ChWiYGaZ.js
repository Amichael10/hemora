import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-D4ZL-bNu.js";
import { H as HealthIcon } from "./health-icon-C6Kgh4k2.js";
import { b as useProfile, u as useToast, x as useListCareRecords, y as useCreateCareRecord, z as CreateCareRecordBodyType } from "./AppRouter-B_BCS-Zy.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { useQueryClient } from "@tanstack/react-query";
import { AddCircleLinear, UploadSquareLinear, NotebookBold, NotebookLinear, CalendarLinear, Folder2Bold, Folder2Linear, StethoscopeBold, StethoscopeLinear, TestTubeBold, TestTubeLinear } from "solar-icon-set";
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
import "@radix-ui/react-tabs";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
function Records() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  useQueryClient();
  useToast();
  const [open, setOpen] = useState(false);
  const { data: records, isLoading } = useListCareRecords(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["care-records", activeProfileId], enabled: !!activeProfileId } }
  );
  useCreateCareRecord();
  const [title, setTitle] = useState("");
  const [hospital, setHospital] = useState("");
  const [type, setType] = useState(CreateCareRecordBodyType.visit);
  const filteredRecords = activeTab === "all" ? records : records?.filter((r) => r.type === activeTab);
  const getIcon = (type2) => {
    switch (type2) {
      case "lab":
        return /* @__PURE__ */ jsx(HealthIcon, { outline: TestTubeLinear, filled: TestTubeBold, width: "16", height: "16" });
      case "visit":
        return /* @__PURE__ */ jsx(HealthIcon, { outline: StethoscopeLinear, filled: StethoscopeBold, width: "16", height: "16" });
      case "doc":
        return /* @__PURE__ */ jsx(HealthIcon, { outline: Folder2Linear, filled: Folder2Bold, width: "16", height: "16" });
      default:
        return /* @__PURE__ */ jsx(HealthIcon, { outline: NotebookLinear, filled: NotebookBold, width: "16", height: "16" });
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "bg-green-500/10 text-green-700";
      case "follow_up":
        return "bg-orange-500/10 text-orange-700";
      case "reviewed":
        return "bg-blue-500/10 text-blue-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "h-page", children: "Care Records" }),
      /* @__PURE__ */ jsx(Button, { size: "icon", variant: "soft", "data-testid": "btn-add-record", onClick: () => setLocation("/records/new"), children: /* @__PURE__ */ jsx(AddCircleLinear, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsx(Tabs, { defaultValue: "all", value: activeTab, onValueChange: setActiveTab, className: "mb-6", children: /* @__PURE__ */ jsxs(TabsList, { className: "grid grid-cols-4 w-full bg-muted/50 rounded-2xl p-1.5 h-13 shadow-sm gap-1", style: { height: 52 }, children: [
      /* @__PURE__ */ jsx(TabsTrigger, { value: "all", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "All" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "visit", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "Visits" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "lab", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "Labs" }),
      /* @__PURE__ */ jsx(TabsTrigger, { value: "imaging", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "Imaging" })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-6 flex-wrap", children: [
      /* @__PURE__ */ jsxs(Button, { variant: "soft", size: "sm", className: "whitespace-nowrap", children: [
        /* @__PURE__ */ jsx(UploadSquareLinear, { size: 14 }),
        " Export Summary"
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "soft", size: "sm", className: "whitespace-nowrap", children: "Filter by Date" })
    ] }),
    isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-5", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4 flex gap-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-10 rounded-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-2/3" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" })
      ] })
    ] }) }, i)) }) : filteredRecords?.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsx("div", { className: "text-primary/20 flex justify-center mb-4", children: /* @__PURE__ */ jsx(HealthIcon, { outline: NotebookLinear, filled: NotebookBold, width: "48", height: "48" }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm mb-4", children: "No records found." }),
      /* @__PURE__ */ jsx(Button, { variant: "soft", onClick: () => setLocation("/records/new"), children: "Add Record" })
    ] }) : /* @__PURE__ */ jsx("div", { children: filteredRecords?.map((record) => /* @__PURE__ */ jsx(Link, { href: `/records/${record.id}`, className: "block my-[6px]", children: /* @__PURE__ */ jsx(Card, { className: "group border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer", "data-testid": `record-card-${record.id}`, children: /* @__PURE__ */ jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: getIcon(record.type) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground text-sm tracking-[-0.01em] line-clamp-1", children: record.documentTitle || record.hospitalClinic || "Care Record" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5", children: [
              /* @__PURE__ */ jsx(CalendarLinear, { size: 12 }),
              record.dateOfRecord ? new Date(record.dateOfRecord).toLocaleDateString() : "Date unrecorded"
            ] })
          ] })
        ] }),
        record.status && /* @__PURE__ */ jsx(Badge, { variant: "outline", className: `border-none text-[10px] px-2 py-0.5 font-medium capitalize ${getStatusColor(record.status)}`, children: record.status.replace("_", " ") })
      ] }),
      record.hospitalClinic && /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg inline-block", children: record.hospitalClinic })
    ] }) }) }, record.id)) })
  ] }) });
}
export {
  Records as default
};
