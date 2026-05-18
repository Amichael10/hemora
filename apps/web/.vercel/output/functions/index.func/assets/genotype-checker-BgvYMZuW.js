import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { o as offspringOutcomes, G as GENOTYPES } from "./genotype-DY_jNrKS.js";
import { z as cn } from "./AppRouter-yFV4k-aY.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
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
import "./button-Be3fVaAL.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-D2ZfvGdl.js";
import "./router-BY6ex80A.js";
function GenotypePicker({ label, value, onChange }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-3", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: GENOTYPES.map((g) => {
      const active = value === g;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
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
  const [p1, setP1] = reactExports.useState(null);
  const [p2, setP2] = reactExports.useState(null);
  const outcomes = p1 && p2 ? offspringOutcomes(p1, p2) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Genotype risk checker", back: "/dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-32 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Pick both partners' genotypes to see possible outcomes for each pregnancy." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GenotypePicker, { label: "You / Partner 1", value: p1, onChange: setP1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GenotypePicker, { label: "Partner 2", value: p2, onChange: setP2 }),
      outcomes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow", children: "Possible outcomes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            p1,
            " + ",
            p2
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: outcomes.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-xl border p-3 text-center", TONE[o.tone]), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-serif font-bold", children: [
            o.percent,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm mt-0.5", children: o.genotype }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] mt-1 leading-tight opacity-80", children: o.label })
        ] }, o.genotype)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Risk is the same for each pregnancy. Results are guidance, not a guarantee — speak with a counsellor for personal advice." })
      ] })
    ] })
  ] });
}
export {
  GenotypeChecker as default
};
