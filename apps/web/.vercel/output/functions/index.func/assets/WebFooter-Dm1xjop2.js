import { q as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useLocation } from "./AppRouter-yFV4k-aY.js";
import { h as hemoraLogo } from "./Logo-qOo-96Vk.js";
const __iconNode = [
  [
    "path",
    {
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      key: "c2jq9f"
    }
  ],
  ["rect", { width: "4", height: "12", x: "2", y: "9", key: "mk3on5" }],
  ["circle", { cx: "4", cy: "4", r: "2", key: "bt5ra8" }]
];
const Linkedin = createLucideIcon("linkedin", __iconNode);
function WebFooter() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "bg-secondary text-secondary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-14 grid md:grid-cols-4 gap-8 text-sm border-x border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 cursor-pointer", onClick: () => setLocation("/"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hemoraLogo, alt: "Hemora", className: "w-9 h-9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-2xl", children: "Hemora" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-secondary-foreground/70 max-w-sm leading-relaxed", children: "Care that stays with you. For every family touched by sickle cell." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-accent mb-3", children: "Product" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-secondary-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#features", className: "hover:text-accent", children: "Features" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#how", className: "hover:text-accent", children: "How it works" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/#download", className: "hover:text-accent", children: "Download" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-wider text-accent mb-3", children: "Company" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-secondary-foreground/80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/about", className: "hover:text-accent", children: "About" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLocation("/blog"), className: "hover:text-accent", children: "Blog" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacy", className: "hover:text-accent", children: "Privacy" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/terms", className: "hover:text-accent", children: "Terms" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/brand", className: "hover:text-accent", children: "Brand" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-5 text-xs text-secondary-foreground/60 flex flex-wrap justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Hemora. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://linkedin.com/company/hemorax",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-accent transition-colors flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LinkedIn" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "https://twitter.com/HemoraApp",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-accent transition-colors",
            children: "Twitter"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Made with care." })
      ] })
    ] }) })
  ] });
}
export {
  WebFooter as W
};
