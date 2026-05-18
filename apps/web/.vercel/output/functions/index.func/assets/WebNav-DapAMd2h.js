import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { h as hemoraLogo } from "./Logo-qOo-96Vk.js";
function WebNav() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between border-x border-border", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setLocation("/"), className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("img", { src: hemoraLogo, alt: "Hemora", className: "w-8 h-8" }),
      /* @__PURE__ */ jsx("span", { className: "font-serif text-xl text-secondary", children: "Hemora" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setLocation("/"), className: "hover:text-foreground transition", children: "Home" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setLocation("/blog"), className: "hover:text-foreground transition text-foreground", children: "Blog" }),
      /* @__PURE__ */ jsx("a", { href: "https://app.hemora.xyz/resources", className: "hover:text-foreground transition", children: "Resources" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://app.hemora.xyz", children: "Sign in" }) }),
      /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://app.hemora.xyz", children: "Get started" }) })
    ] })
  ] }) });
}
export {
  WebNav as W
};
