import { q as jsxRuntimeExports } from "../server.js";
import { u as useLocation } from "./AppRouter-yFV4k-aY.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { h as hemoraLogo } from "./Logo-qOo-96Vk.js";
function WebNav() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between border-x border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setLocation("/"), className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hemoraLogo, alt: "Hemora", className: "w-8 h-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-xl text-secondary", children: "Hemora" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLocation("/"), className: "hover:text-foreground transition", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setLocation("/blog"), className: "hover:text-foreground transition text-foreground", children: "Blog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://app.hemora.xyz/resources", className: "hover:text-foreground transition", children: "Resources" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://app.hemora.xyz", children: "Sign in" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://app.hemora.xyz", children: "Get started" }) })
    ] })
  ] }) });
}
export {
  WebNav as W
};
