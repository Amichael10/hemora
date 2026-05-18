import { q as jsxRuntimeExports } from "../server.js";
import { q as useRoute } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Badge } from "./badge-BSJQNhgq.js";
import { g as getResource } from "./resources-HUPnBkju.js";
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
import "./index-D2ZfvGdl.js";
function ResourceDetail() {
  const [, params] = useRoute("/resources/:id");
  const r = params?.id ? getResource(params.id) : void 0;
  if (!r) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Resource", back: "/resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-12 text-center text-sm text-muted-foreground", children: "Resource not found." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: r.kind, back: "/resources" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "px-6 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full text-[10px] font-semibold px-2.5 py-0.5", children: r.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          r.readMinutes,
          " min ",
          r.kind === "Video" ? "" : "read"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[26px] leading-tight tracking-[-0.5px] text-foreground", children: r.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: r.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85", children: r.body.split(/\n\n+/).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line", children: p }, i)) }),
      r.source && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-[11px] text-muted-foreground", children: [
        "Source:",
        " ",
        r.sourceUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: r.sourceUrl, target: "_blank", rel: "noreferrer", className: "underline hover:text-foreground", children: r.source }) : r.source
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-[11px] text-muted-foreground italic", children: "For learning only — not a substitute for medical advice." })
    ] })
  ] });
}
export {
  ResourceDetail as default
};
