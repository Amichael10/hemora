import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, q as useRoute, a as useToast, F as useGetCareRecord, H as useDeleteCareRecord, J as supabase } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { B as Badge } from "./badge-BSJQNhgq.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { H as HealthIcon } from "./health-icon-CyFHTseb.js";
import { O as OM1, x as om1, y as oT, B as Bq, C as T91, $ as $61, z as B91, D as D61, n as G, I as I_, E as l40, j as UH1, H as Cj1, s as s01 } from "./index-D2ZfvGdl.js";
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
const TYPE_META = {
  visit: { label: "Hospital visit", outline: D61, filled: B91 },
  lab: { label: "Lab result", outline: $61, filled: T91 },
  imaging: { label: "Imaging / scan", outline: Bq, filled: oT },
  other: { label: "Other record", outline: om1, filled: OM1 }
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
  const [signedUrl, setSignedUrl] = reactExports.useState(null);
  reactExports.useEffect(() => {
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
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Record", back: "/records" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full rounded-2xl" })
      ] })
    ] });
  }
  const meta = TYPE_META[rec.type] ?? TYPE_META.other;
  const isImage = signedUrl && /\.(png|jpe?g|gif|webp)$/i.test(rec.fileUrl ?? "");
  const isPdf = signedUrl && /\.pdf$/i.test(rec.fileUrl ?? "");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SubPageHeader,
      {
        title: meta.label,
        back: "/records",
        right: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setLocation(`/records/${id}/edit`),
            "aria-label": "Edit",
            className: "w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(G, { size: 16 })
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-10 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthIcon, { outline: meta.outline, filled: meta.filled, width: "24", height: "24" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif font-semibold text-[20px] tracking-[-0.5px] text-foreground", children: rec.documentTitle || meta.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full text-[11px] font-medium px-2.5 py-0.5 capitalize", children: meta.label }),
              rec.status && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `rounded-full text-[11px] font-medium px-2.5 py-0.5 border-none capitalize ${STATUS_COLOR[rec.status] ?? "bg-muted text-muted-foreground"}`, children: String(rec.status).replace("_", " ") })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(I_, { size: 11 }),
              " Date"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: rec.dateOfRecord ? new Date(rec.dateOfRecord).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(l40, { size: 11 }),
              " Hospital / clinic"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-1 truncate", children: rec.hospitalClinic || "—" })
          ] }),
          rec.type === "lab" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-xl p-3 col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Lab" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mt-1", children: rec.labName || "—" })
          ] })
        ] })
      ] }) }),
      rec.notes && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed", children: rec.notes })
      ] }) }),
      rec.fileUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground font-semibold", children: "Attachment" }),
          signedUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: signedUrl,
              target: "_blank",
              rel: "noreferrer",
              className: "text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UH1, { size: 12 }),
                " Open"
              ]
            }
          )
        ] }),
        isImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: signedUrl, target: "_blank", rel: "noreferrer", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: signedUrl, alt: "attachment", className: "w-full rounded-xl border border-border/40" }) }) : isPdf ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: signedUrl,
            target: "_blank",
            rel: "noreferrer",
            className: "flex items-center gap-3 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cj1, { size: 18 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: "View PDF" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Cj1, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: signedUrl ? "Tap Open above" : "Loading…" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 pt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "soft", className: "rounded-xl", onClick: () => setLocation(`/records/${id}/edit`), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(G, { size: 16 }),
          " Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "crisis", className: "rounded-xl", onClick: handleDelete, disabled: deleteRec.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(s01, { size: 16 }),
          " Delete"
        ] })
      ] })
    ] })
  ] });
}
export {
  RecordDetail as default
};
