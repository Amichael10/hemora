import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { u as useToast, B as useGetCareRecord, E as useDeleteCareRecord, G as supabase } from "./AppRouter-B_BCS-Zy.js";
import { H as HealthIcon } from "./health-icon-C6Kgh4k2.js";
import { NotebookBold, NotebookLinear, Folder2Bold, Folder2Linear, TestTubeBold, TestTubeLinear, StethoscopeBold, StethoscopeLinear, PenNewSquareLinear, CalendarLinear, HospitalLinear, DownloadLinear, DocumentTextLinear, TrashBinTrashLinear } from "solar-icon-set";
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
const TYPE_META = {
  visit: { label: "Hospital visit", outline: StethoscopeLinear, filled: StethoscopeBold },
  lab: { label: "Lab result", outline: TestTubeLinear, filled: TestTubeBold },
  imaging: { label: "Imaging / scan", outline: Folder2Linear, filled: Folder2Bold },
  other: { label: "Other record", outline: NotebookLinear, filled: NotebookBold }
};
const STATUS_COLOR = {
  saved: "bg-blue-500/10 text-blue-700",
  normal: "bg-green-500/10 text-green-700",
  follow_up: "bg-orange-500/10 text-orange-700",
  reviewed: "bg-blue-500/10 text-blue-700",
  pending: "bg-muted text-muted-foreground",
  completed: "bg-green-500/10 text-green-700"
};
function RecordDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/records/:id");
  const id = params?.id;
  const { toast } = useToast();
  const { data: rec, isLoading } = useGetCareRecord(id);
  const deleteRec = useDeleteCareRecord();
  const [signedUrl, setSignedUrl] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const path = rec?.fileUrl;
    if (!path) {
      setSignedUrl(null);
      return;
    }
    (async () => {
      const { data, error } = await supabase.storage.from("care-record-files").createSignedUrl(path, 60 * 60);
      if (!cancelled && !error) setSignedUrl(data?.signedUrl ?? null);
    })();
    return () => {
      cancelled = true;
    };
  }, [rec]);
  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this record?")) return;
    deleteRec.mutate({ id }, {
      onSuccess: () => {
        toast({ title: "Deleted" });
        setLocation("/records");
      },
      onError: (e) => toast({ title: "Couldn't delete", description: e?.message, variant: "destructive" })
    });
  };
  if (isLoading || !rec) {
    return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
      /* @__PURE__ */ jsx(SubPageHeader, { title: "Record", back: "/records" }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 space-y-3", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-32 w-full rounded-2xl" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-24 w-full rounded-2xl" })
      ] })
    ] });
  }
  const meta = TYPE_META[rec.type] ?? TYPE_META.other;
  const isImage = signedUrl && /\.(png|jpe?g|gif|webp)$/i.test(rec.fileUrl ?? "");
  const isPdf = signedUrl && /\.pdf$/i.test(rec.fileUrl ?? "");
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(
      SubPageHeader,
      {
        title: meta.label,
        back: "/records",
        right: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setLocation(`/records/${id}/edit`),
            "aria-label": "Edit",
            className: "w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors",
            children: /* @__PURE__ */ jsx(PenNewSquareLinear, { size: 16 })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10 space-y-4", children: [
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(HealthIcon, { outline: meta.outline, filled: meta.filled, width: "24", height: "24" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-serif font-semibold text-[20px] tracking-[-0.5px] text-foreground", children: rec.documentTitle || meta.label }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-full text-[11px] font-medium px-2.5 py-0.5 capitalize", children: meta.label }),
              rec.status && /* @__PURE__ */ jsx(Badge, { className: `rounded-full text-[11px] font-medium px-2.5 py-0.5 border-none capitalize ${STATUS_COLOR[rec.status] ?? "bg-muted text-muted-foreground"}`, children: String(rec.status).replace("_", " ") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mt-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(CalendarLinear, { size: 11 }),
              " Date"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: rec.dateOfRecord ? new Date(rec.dateOfRecord).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) : "—" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(HospitalLinear, { size: 11 }),
              " Hospital / clinic"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1 truncate", children: rec.hospitalClinic || "—" })
          ] }),
          rec.type === "lab" && /* @__PURE__ */ jsxs("div", { className: "bg-muted/40 rounded-xl p-3 col-span-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Lab" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: rec.labName || "—" })
          ] })
        ] })
      ] }) }),
      rec.notes && /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2", children: "Notes" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed", children: rec.notes })
      ] }) }),
      rec.fileUrl && /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Attachment" }),
          signedUrl && /* @__PURE__ */ jsxs(
            "a",
            {
              href: signedUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline",
              children: [
                /* @__PURE__ */ jsx(DownloadLinear, { size: 12 }),
                " Open"
              ]
            }
          )
        ] }),
        isImage ? /* @__PURE__ */ jsx("a", { href: signedUrl, target: "_blank", rel: "noreferrer", className: "block", children: /* @__PURE__ */ jsx("img", { src: signedUrl, alt: "attachment", className: "w-full rounded-xl border border-border/40" }) }) : isPdf ? /* @__PURE__ */ jsxs(
          "a",
          {
            href: signedUrl,
            target: "_blank",
            rel: "noreferrer",
            className: "flex items-center gap-3 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors",
            children: [
              /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(DocumentTextLinear, { size: 18 }) }),
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "View PDF" })
            ]
          }
        ) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-muted/40", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsx(DocumentTextLinear, { size: 18 }) }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: signedUrl ? "Tap Open above" : "Loading…" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 pt-1", children: [
        /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "soft", className: "rounded-xl", onClick: () => setLocation(`/records/${id}/edit`), children: [
          /* @__PURE__ */ jsx(PenNewSquareLinear, { size: 16 }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "lg", variant: "crisis", className: "rounded-xl", onClick: handleDelete, disabled: deleteRec.isPending, children: [
          /* @__PURE__ */ jsx(TrashBinTrashLinear, { size: 16 }),
          " Delete"
        ] })
      ] })
    ] })
  ] });
}
export {
  RecordDetail as default
};
