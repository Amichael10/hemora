import { jsx, jsxs } from "react/jsx-runtime";
import { useLocation, Link } from "wouter";
import Lottie from "lottie-react";
import { B as Button } from "./button-CVyzTRqg.js";
import { HomeSmileBold, ArrowLeftBold } from "solar-icon-set";
import { m as motion, c as meltingFace } from "./router-D6f9eD8n.js";
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
function NotFound() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-20 pb-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "flex flex-col items-center flex-1 justify-center",
        children: [
          /* @__PURE__ */ jsx(Lottie, { animationData: meltingFace, loop: true, className: "w-56 h-56" }),
          /* @__PURE__ */ jsx("h1", { className: "text-[120px] leading-none font-bold text-primary tracking-tight mt-2", children: "404" }),
          /* @__PURE__ */ jsx("h2", { className: "h-display text-foreground mt-6 max-w-[280px]", children: "We couldn't find that page." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 body-md text-muted-foreground max-w-[300px]", children: "The link may be broken, or the page may have been moved. Let's get you back on track." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3, duration: 0.5 },
        className: "mt-auto w-full flex flex-col gap-3 pt-12",
        children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "lg",
              className: "w-full gap-2",
              onClick: () => setLocation("/dashboard"),
              children: [
                /* @__PURE__ */ jsx(HomeSmileBold, { size: 20 }),
                "Go to dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              size: "lg",
              variant: "ghost",
              className: "w-full gap-2",
              onClick: () => window.history.back(),
              children: [
                /* @__PURE__ */ jsx(ArrowLeftBold, { size: 18 }),
                "Go back"
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 text-xs text-muted-foreground", children: [
            "Need help?",
            " ",
            /* @__PURE__ */ jsx(Link, { href: "/help", className: "text-primary underline underline-offset-2", children: "Visit support" })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  NotFound as default
};
