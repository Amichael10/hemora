import { q as jsxRuntimeExports, c as reactExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import "./input-BdT5cO17.js";
import "./label-oa-7Bv2h.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-x5Uz1oRZ.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BurGepQN.js";
import { a as useFamilyMembers, b as useDeleteFamilyMember } from "./family-api-DiGCStl0.js";
import { o as offspringOutcomes } from "./genotype-DY_jNrKS.js";
import { L as Link } from "./AppRouter-yFV4k-aY.js";
import { i as p11, ac as vb1, s as s01 } from "./index-D2ZfvGdl.js";
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
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-DkPu60F3.js";
import "./router-BY6ex80A.js";
import "./index-BfrgU2eP.js";
import "./index-D8DUTDeV.js";
import "./check-Dt55N_VK.js";
function MemberCard({ m, onDelete }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-4 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center font-serif font-semibold shadow-sm relative", children: [
      m.fullName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase(),
      m.relationship === "Self" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 bg-white rounded-full" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: m.fullName }),
        m.genotype && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold", children: m.genotype })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase tracking-wider font-bold", children: m.relationship === "Self" ? "Main Account" : m.relationship || "Family Member" }),
        m.relationship === "Child" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-muted-foreground/30" }),
        m.relationship === "Child" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-accent font-medium italic", children: "Dependent" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDelete, className: "text-muted-foreground hover:text-destructive p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s01, { size: 16 }) })
  ] });
}
function FamilyTree({ members }) {
  const parents = members.filter((m) => ["Mother", "Father", "Partner", "Self"].includes(m.relationship || ""));
  const children = members.filter((m) => m.relationship === "Child");
  const others = members.filter((m) => !parents.includes(m) && !children.includes(m));
  const Node = ({ m }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-card border rounded-xl px-3 py-2 min-w-[110px] text-center shadow-sm ${m.relationship === "Self" ? "border-primary/40 ring-1 ring-primary/5" : "border-border/60"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold truncate", children: m.fullName.split(" ")[0] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: m.relationship || "—" }),
    m.genotype && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block mt-1 text-[10px] font-bold text-primary bg-primary/10 px-1.5 rounded", children: m.genotype })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/10 rounded-[2rem] p-6 space-y-6 border border-secondary/20", children: [
    parents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-center text-muted-foreground/60 mb-4", children: "Caregivers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-3 flex-wrap", children: parents.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { m }),
        i === 0 && parents.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(vb1, { size: 14, className: "text-accent/60" })
      ] }, m.id)) })
    ] }),
    parents.length > 0 && children.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center -my-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-secondary/30" }) }),
    children.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-center text-muted-foreground/60 mb-4", children: "Children" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-3 flex-wrap", children: children.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { m }, m.id)) })
    ] }),
    others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-6 border-t border-secondary/10 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-center text-muted-foreground/60 mb-4", children: "Extended Family" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-3 flex-wrap", children: others.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(Node, { m }, m.id)) })
    ] }),
    members.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-6", children: "Add family members to see your tree." })
  ] });
}
function RiskChecker({ members }) {
  const withGeno = reactExports.useMemo(() => members.filter((m) => m.genotype), [members]);
  const [a, setA] = reactExports.useState("");
  const [b, setB] = reactExports.useState("");
  const ga = withGeno.find((m) => m.id === a)?.genotype;
  const gb = withGeno.find((m) => m.id === b)?.genotype;
  const outcomes = ga && gb ? offspringOutcomes(ga, gb) : null;
  if (withGeno.length < 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border/60 p-5 text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add at least two family members with a known genotype, or use the standalone checker." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/genotype-checker", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "rounded-xl", children: "Open checker" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
      { v: a, set: setA, label: "Partner 1" },
      { v: b, set: setB, label: "Partner 2" }
    ].map(({ v, set, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: v, onValueChange: set, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-12 rounded-xl border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: label }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: withGeno.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: m.id, children: [
        m.fullName.split(" ")[0],
        " (",
        m.genotype,
        ")"
      ] }, m.id)) })
    ] }, label)) }),
    outcomes && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border/60 p-5 grid grid-cols-3 gap-3 shadow-sm", children: outcomes.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center p-3 rounded-2xl bg-secondary/10 border border-secondary/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-serif font-bold text-primary", children: [
        o.percent,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-bold text-secondary uppercase tracking-wider", children: o.genotype }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground leading-tight mt-1.5", children: o.label })
    ] }, o.genotype)) })
  ] });
}
function Family() {
  const { data: members = [], isLoading } = useFamilyMembers();
  const del = useDeleteFamilyMember();
  const caregivers = members.filter((m) => ["Mother", "Father", "Partner", "Self"].includes(m.relationship || ""));
  const children = members.filter((m) => m.relationship === "Child");
  const others = members.filter((m) => !caregivers.includes(m) && !children.includes(m));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Family & Care", back: "/dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-32 space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "tree", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 w-full p-1 h-14 bg-muted/50 rounded-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "tree", className: "rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-sm", children: "Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "risk", className: "rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-sm", children: "Risk Tool" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "tree", className: "space-y-6 mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FamilyTree, { members }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          caregivers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground ml-1", children: "Caregivers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: caregivers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCard, { m, onDelete: () => del.mutate(m.id) }, m.id)) })
          ] }),
          children.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground ml-1", children: "Children & Dependents" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: children.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCard, { m, onDelete: () => del.mutate(m.id) }, m.id)) })
          ] }),
          others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground ml-1", children: "Extended Family" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: others.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(MemberCard, { m, onDelete: () => del.mutate(m.id) }, m.id)) })
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm text-muted-foreground py-10", children: "Loading your family details…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/family/add", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "w-full bg-secondary text-white hover:bg-secondary/90 h-14 rounded-2xl shadow-md transition-all active:scale-[0.98]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(p11, { size: 18 }),
          " Add family member"
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "risk", className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-accent/5 rounded-[2rem] p-6 border border-accent/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl font-semibold text-primary mb-2", children: "Genotype Risk Tool" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Select two family members with known genotypes to calculate the statistical probability of sickle cell traits in offspring." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RiskChecker, { members }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/genotype-checker", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full h-14 rounded-2xl border-primary/20 text-primary hover:bg-primary/5", children: "Open Advanced Checker" }) })
      ] })
    ] }) })
  ] });
}
export {
  Family as default
};
