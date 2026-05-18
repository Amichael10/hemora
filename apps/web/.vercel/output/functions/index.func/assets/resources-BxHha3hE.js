import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { R as RESOURCES } from "./resources-HUPnBkju.js";
import { MagniferLinear, AltArrowRightLinear, PlayCircleLinear, BookLinear } from "solar-icon-set";
import { w as cn } from "./AppRouter-B_BCS-Zy.js";
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
import "./button-CVyzTRqg.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./push.server-BMx5QtSF.js";
import "web-push";
import "@supabase/supabase-js";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const FILTERS = ["All", "Learn", "Lifestyle", "Treatment"];
function kindIcon(kind) {
  if (kind === "Video") return /* @__PURE__ */ jsx(PlayCircleLinear, { size: 18 });
  if (kind === "Guide") return /* @__PURE__ */ jsx(BookLinear, { size: 18 });
  return /* @__PURE__ */ jsx(BookLinear, { size: 18 });
}
function categoryTone(c) {
  if (c === "Learn") return "bg-primary/10 text-primary";
  if (c === "Lifestyle") return "bg-accent/20 text-accent-foreground";
  return "bg-secondary/10 text-secondary";
}
function Resources() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return RESOURCES.filter((r) => filter === "All" || r.category === filter).filter(
      (r) => !term || r.title.toLowerCase().includes(term) || r.summary.toLowerCase().includes(term)
    );
  }, [filter, q]);
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Resources Library", back: "/settings" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-12 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(MagniferLinear, { size: 16, color: "hsl(var(--muted-foreground))", className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Search resources",
            value: q,
            onChange: (e) => setQ(e.target.value),
            className: "h-11 pl-9 rounded-full bg-muted/40 border-transparent focus-visible:bg-card"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 no-scrollbar", children: FILTERS.map((f) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilter(f),
          className: cn(
            "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
            filter === f ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground/70 border-border/60 hover:bg-muted/40"
          ),
          children: f
        },
        f
      )) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: items.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: "No resources match your search." }) : items.map((r) => /* @__PURE__ */ jsx(Link, { href: `/resources/${r.id}`, children: /* @__PURE__ */ jsxs("div", { className: "group flex items-center gap-3 rounded-2xl bg-card border border-border/60 p-3 hover:shadow-sm transition-shadow cursor-pointer", children: [
        /* @__PURE__ */ jsx("div", { className: cn("w-11 h-11 rounded-xl shrink-0 grid place-items-center", categoryTone(r.category)), children: kindIcon(r.kind) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground truncate", children: r.title }),
          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
            r.kind,
            " · ",
            r.readMinutes,
            " min ",
            r.kind === "Video" ? "" : "read"
          ] })
        ] }),
        /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 14, color: "rgba(115,115,115,0.5)" })
      ] }) }, r.id)) })
    ] })
  ] });
}
export {
  Resources as default
};
