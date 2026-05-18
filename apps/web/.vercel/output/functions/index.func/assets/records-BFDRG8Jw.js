import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { d as useProfile, u as useLocation, a as useToast, B as useListCareRecords, D as useCreateCareRecord, E as CreateCareRecordBodyType, L as Link } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { B as Badge } from "./badge-BSJQNhgq.js";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-BurGepQN.js";
import { H as HealthIcon } from "./health-icon-CyFHTseb.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { u as useQueryClient } from "./router-BY6ex80A.js";
import { i as p11, v as aH1, O as OM1, x as om1, I as I_, y as oT, B as Bq, z as B91, D as D61, C as T91, $ as $61 } from "./index-D2ZfvGdl.js";
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
import "./index-BfrgU2eP.js";
function Records() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = reactExports.useState("all");
  useQueryClient();
  useToast();
  const [open, setOpen] = reactExports.useState(false);
  const { data: records, isLoading } = useListCareRecords(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["care-records", activeProfileId], enabled: !!activeProfileId } }
  );
  useCreateCareRecord();
  const [title, setTitle] = reactExports.useState("");
  const [hospital, setHospital] = reactExports.useState("");
  const [type, setType] = reactExports.useState(CreateCareRecordBodyType.visit);
  const filteredRecords = activeTab === "all" ? records : records?.filter((r) => r.type === activeTab);
  const getIcon = (type2) => {
    switch (type2) {
      case "lab":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: $61, filled: T91, width: "16", height: "16" });
      case "visit":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: D61, filled: B91, width: "16", height: "16" });
      case "doc":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: Bq, filled: oT, width: "16", height: "16" });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: om1, filled: OM1, width: "16", height: "16" });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-page", children: "Care Records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "soft", "data-testid": "btn-add-record", onClick: () => setLocation("/records/new"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(p11, { size: 16 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { defaultValue: "all", value: activeTab, onValueChange: setActiveTab, className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-4 w-full bg-muted/50 rounded-2xl p-1.5 h-13 shadow-sm gap-1", style: { height: 52 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "All" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "visit", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "Visits" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "lab", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "Labs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "imaging", className: "rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md", children: "Imaging" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-6 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "soft", size: "sm", className: "whitespace-nowrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(aH1, { size: 14 }),
        " Export Summary"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "soft", size: "sm", className: "whitespace-nowrap", children: "Filter by Date" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-10 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
      ] })
    ] }) }, i)) }) : filteredRecords?.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-primary/20 flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: om1, filled: OM1, width: "48", height: "48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mb-4", children: "No records found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "soft", onClick: () => setLocation("/records/new"), children: "Add Record" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: filteredRecords?.map((record) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: `/records/${record.id}`, className: "block my-[6px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "group border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer", "data-testid": `record-card-${record.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: getIcon(record.type) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm tracking-[-0.01em] line-clamp-1", children: record.documentTitle || record.hospitalClinic || "Care Record" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(I_, { size: 12 }),
              record.dateOfRecord ? new Date(record.dateOfRecord).toLocaleDateString() : "Date unrecorded"
            ] })
          ] })
        ] }),
        record.status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `border-none text-[10px] px-2 py-0.5 font-medium capitalize ${getStatusColor(record.status)}`, children: record.status.replace("_", " ") })
      ] }),
      record.hospitalClinic && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-lg inline-block", children: record.hospitalClinic })
    ] }) }) }, record.id)) })
  ] }) });
}
export {
  Records as default
};
