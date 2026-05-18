import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { z as cn, L as Link } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { I as Input } from "./input-BdT5cO17.js";
import { R as RESOURCES } from "./resources-HUPnBkju.js";
import { J as zK, c as b4, ao as gi, h as hm1 } from "./index-D2ZfvGdl.js";
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
import "./button-Be3fVaAL.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
const FILTERS = ["All", "Learn", "Lifestyle", "Treatment"];
function kindIcon(kind) {
  if (kind === "Video") return /* @__PURE__ */ jsxRuntimeExports.jsx(gi, { size: 18 });
  if (kind === "Guide") return /* @__PURE__ */ jsxRuntimeExports.jsx(hm1, { size: 18 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(hm1, { size: 18 });
}
function categoryTone(c) {
  if (c === "Learn") return "bg-primary/10 text-primary";
  if (c === "Lifestyle") return "bg-accent/20 text-accent-foreground";
  return "bg-secondary/10 text-secondary";
}
function Resources() {
  const [filter, setFilter] = reactExports.useState("All");
  const [q, setQ] = reactExports.useState("");
  const items = reactExports.useMemo(() => {
    const term = q.trim().toLowerCase();
    return RESOURCES.filter((r) => filter === "All" || r.category === filter).filter(
      (r) => !term || r.title.toLowerCase().includes(term) || r.summary.toLowerCase().includes(term)
    );
  }, [filter, q]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Resources Library", back: "/settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-12 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(zK, { size: 16, color: "hsl(var(--muted-foreground))", className: "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search resources",
            value: q,
            onChange: (e) => setQ(e.target.value),
            className: "h-11 pl-9 rounded-full bg-muted/40 border-transparent focus-visible:bg-card"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 no-scrollbar", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: "No resources match your search." }) : items.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: `/resources/${r.id}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group flex items-center gap-3 rounded-2xl bg-card border border-border/60 p-3 hover:shadow-sm transition-shadow cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-11 h-11 rounded-xl shrink-0 grid place-items-center", categoryTone(r.category)), children: kindIcon(r.kind) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground truncate", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: [
            r.kind,
            " · ",
            r.readMinutes,
            " min ",
            r.kind === "Video" ? "" : "read"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(b4, { size: 14, color: "rgba(115,115,115,0.5)" })
      ] }) }, r.id)) })
    ] })
  ] });
}
export {
  Resources as default
};
