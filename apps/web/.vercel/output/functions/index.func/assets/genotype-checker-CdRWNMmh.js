import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { o as offspringOutcomes, G as GENOTYPES } from "./genotype-DY_jNrKS.js";
import { w as cn } from "./AppRouter-B_BCS-Zy.js";
import "wouter";
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
import "solar-icon-set";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
function GenotypePicker({ label, value, onChange }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "eyebrow mb-3", children: label }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: GENOTYPES.map((g) => {
      const active = value === g;
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(g),
          className: cn(
            "py-3 rounded-xl font-serif font-semibold text-lg border transition-colors",
            active ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary/40"
          ),
          children: g
        },
        g
      );
    }) })
  ] });
}
const TONE = {
  ok: "bg-emerald-50 text-emerald-900 border-emerald-200",
  warn: "bg-amber-50 text-amber-900 border-amber-200",
  bad: "bg-rose-50 text-rose-900 border-rose-200"
};
function GenotypeChecker() {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const outcomes = p1 && p2 ? offspringOutcomes(p1, p2) : null;
  return /* @__PURE__ */ jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Genotype risk checker", back: "/dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-32 space-y-5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Pick both partners' genotypes to see possible outcomes for each pregnancy." }),
      /* @__PURE__ */ jsx(GenotypePicker, { label: "You / Partner 1", value: p1, onChange: setP1 }),
      /* @__PURE__ */ jsx(GenotypePicker, { label: "Partner 2", value: p2, onChange: setP2 }),
      outcomes && /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-5 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "eyebrow", children: "Possible outcomes" }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
            p1,
            " + ",
            p2
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2", children: outcomes.map((o) => /* @__PURE__ */ jsxs("div", { className: cn("rounded-xl border p-3 text-center", TONE[o.tone]), children: [
          /* @__PURE__ */ jsxs("div", { className: "text-2xl font-serif font-bold", children: [
            o.percent,
            "%"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm mt-0.5", children: o.genotype }),
          /* @__PURE__ */ jsx("div", { className: "text-[11px] mt-1 leading-tight opacity-80", children: o.label })
        ] }, o.genotype)) }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Risk is the same for each pregnancy. Results are guidance, not a guarantee — speak with a counsellor for personal advice." })
      ] })
    ] })
  ] });
}
export {
  GenotypeChecker as default
};
