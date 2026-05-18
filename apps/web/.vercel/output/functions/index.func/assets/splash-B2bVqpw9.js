import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { m as motion } from "./router-D6f9eD8n.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./AppRouter-B_BCS-Zy.js";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@tanstack/router-core";
import "tiny-invariant";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
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
import "react-dom";
import "lottie-react";
import "posthog-js";
import "posthog-js/react/dist/esm/index.js";
import "motion-dom";
import "motion-utils";
import "@react-email/components";
import "standardwebhooks";
import "resend";
import "./push.server-BMx5QtSF.js";
import "web-push";
import "zod";
const kindredLogo = "/assets/Logo-Cgcb5_W_.png";
const illustration = "/assets/african-family-illustration-DZ_3F-zR.png";
function Splash() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-24 pb-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "flex flex-col items-center",
        children: [
          /* @__PURE__ */ jsx("img", { src: kindredLogo, alt: "Kindred Logo", className: "w-24 h-24 mb-6", "data-testid": "img-splash-logo" }),
          /* @__PURE__ */ jsx("h1", { className: "h-display text-primary max-w-[280px]", children: "For every family touched by sickle cell." }),
          /* @__PURE__ */ jsx("p", { className: "mt-4 body-md tracking-wide", children: "Built for families. Guided by care." })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.3 },
        className: "mt-12 mb-auto",
        children: /* @__PURE__ */ jsx("img", { src: illustration, alt: "Family", className: "w-[280px] max-w-full", "data-testid": "img-splash-illustration" })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay: 1 },
        className: "w-full mt-8",
        children: /* @__PURE__ */ jsx(Button, { size: "xl", className: "w-full", onClick: () => setLocation("/onboarding"), "data-testid": "button-get-started", children: "Get Started" })
      }
    )
  ] }) });
}
export {
  Splash as default
};
