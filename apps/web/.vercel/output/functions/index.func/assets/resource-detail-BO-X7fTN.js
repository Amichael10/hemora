import { jsxs, jsx } from "react/jsx-runtime";
import { useRoute } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { g as getResource } from "./resources-HUPnBkju.js";
import "./AppRouter-B_BCS-Zy.js";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
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
import "./push.server-BMx5QtSF.js";
import "web-push";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "solar-icon-set";
function ResourceDetail() {
  const [, params] = useRoute("/resources/:id");
  const r = params?.id ? getResource(params.id) : void 0;
  if (!r) {
    return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
      /* @__PURE__ */ jsx(SubPageHeader, { title: "Resource", back: "/resources" }),
      /* @__PURE__ */ jsx("div", { className: "px-6 py-12 text-center text-sm text-muted-foreground", children: "Resource not found." })
    ] });
  }
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: r.kind, back: "/resources" }),
    /* @__PURE__ */ jsxs("article", { className: "px-6 pb-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-full text-[10px] font-semibold px-2.5 py-0.5", children: r.category }),
        /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
          r.readMinutes,
          " min ",
          r.kind === "Video" ? "" : "read"
        ] })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[26px] leading-tight tracking-[-0.5px] text-foreground", children: r.title }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: r.summary }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85", children: r.body.split(/\n\n+/).map((p, i) => /* @__PURE__ */ jsx("p", { className: "whitespace-pre-line", children: p }, i)) }),
      r.source && /* @__PURE__ */ jsxs("p", { className: "mt-8 text-[11px] text-muted-foreground", children: [
        "Source:",
        " ",
        r.sourceUrl ? /* @__PURE__ */ jsx("a", { href: r.sourceUrl, target: "_blank", rel: "noreferrer", className: "underline hover:text-foreground", children: r.source }) : r.source
      ] }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 text-[11px] text-muted-foreground italic", children: "For learning only — not a substitute for medical advice." })
    ] })
  ] });
}
export {
  ResourceDetail as default
};
