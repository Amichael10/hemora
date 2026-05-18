import { q as jsxRuntimeExports } from "../server.js";
import { q as useRoute, u as useLocation, a as useToast, d as useProfile, r as useGetCrisisLog, f as useGetProfile, s as useDeleteCrisisLog } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { m as m01, s as s01 } from "./index-D2ZfvGdl.js";
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
function Row({ label, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground text-right max-w-[60%]", children: value || "—" })
  ] });
}
function painLabel(level) {
  if (!level) return "—";
  const map = { mild: "Mild (1-3)", moderate: "Moderate (4-6)", severe: "Severe (7-9)", worst: "Worst (10)" };
  return map[level] ?? level;
}
function CrisisDetail() {
  const [, params] = useRoute("/crisis/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { profileId } = useProfile();
  const id = params?.id;
  const { data: log, isLoading } = useGetCrisisLog(id);
  const { data: profile } = useGetProfile(profileId, { query: { enabled: !!profileId } });
  const del = useDeleteCrisisLog();
  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this crisis log?")) return;
    del.mutate({ id }, { onSuccess: () => {
      toast({ title: "Deleted" });
      setLocation("/crisis");
    } });
  };
  const buildShareText = () => {
    if (!log) return "";
    const when = log.occurredAt ? new Date(log.occurredAt).toLocaleString() : "—";
    const lines = [
      `Hemora · Crisis log`,
      profile?.fullName ? `Patient: ${profile.fullName}` : null,
      `When: ${when}`,
      `Pain: ${painLabel(log.painLevel)}`,
      log.painLocations?.length ? `Location: ${log.painLocations.join(", ")}` : null,
      log.triggers?.length ? `Triggers: ${log.triggers.join(", ")}` : null,
      log.whatHelped?.length ? `Helped by: ${log.whatHelped.join(", ")}` : null,
      `Hospital visit: ${log.hospitalVisit ? "Yes" : "No"}`
    ].filter(Boolean).join("\n");
    return lines;
  };
  const handleShare = async () => {
    const text = buildShareText();
    if (!text) return;
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "Crisis log", text });
        return;
      }
    } catch {
    }
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Crisis Details", back: "/crisis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full" })
    ] }) : !log ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground py-12", children: "Log not found." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-5 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1", children: log.occurredAt ? new Date(log.occurredAt).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" }) : "" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl font-semibold text-foreground tracking-[-0.3px]", children: "Pain crisis" }),
          log.hospitalVisit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold", children: "Hospital visit" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 px-5 py-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-bold pt-3 pb-1", children: "Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "When", value: log.occurredAt ? new Date(log.occurredAt).toLocaleString() : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Pain level", value: painLabel(log.painLevel) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Location", value: (log.painLocations || []).join(", ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Triggers", value: (log.triggers || []).join(", ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Helped by", value: (log.whatHelped || []).join(", ") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Hospital visit", value: log.hospitalVisit ? "Yes" : "No" })
      ] }),
      (log.whatHelped || []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 px-5 py-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-bold pt-3 pb-1", children: "Treatment" }),
        (log.whatHelped || []).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: t, value: "Used" }, t))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "xl", className: "w-full mt-6", onClick: handleShare, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(m01, { size: 18 }),
        " Share this log"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center mt-2", children: "Sends a quick summary via WhatsApp, Messages, or your share menu." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "xl", className: "w-full mt-2 text-destructive hover:bg-destructive/10", onClick: handleDelete, disabled: del.isPending, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(s01, { size: 18 }),
        " Delete log"
      ] })
    ] }) })
  ] });
}
export {
  CrisisDetail as default
};
