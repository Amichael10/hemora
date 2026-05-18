import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { u as useToast, G as supabase } from "./AppRouter-B_BCS-Zy.js";
import { LetterBold, CheckCircleBold } from "solar-icon-set";
import { m as motion } from "./router-D6f9eD8n.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
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
function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setBusy(true);
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/reset-password` : "/reset-password";
    const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo });
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't send reset email", description: error.message, variant: "destructive" });
      return;
    }
    setSent(true);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16", children: [
    /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "flex-1 flex flex-col justify-center", children: !sent ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center", children: "Reset your password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground text-center", children: "Enter your email and we'll send you a link to set a new password." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "email",
              required: true,
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "you@example.com",
              autoComplete: "email",
              "data-testid": "input-forgot-email"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", size: "xl", className: "w-full", disabled: busy, "data-testid": "button-forgot-submit", children: [
          /* @__PURE__ */ jsx(LetterBold, { size: 18 }),
          " ",
          busy ? "Sending…" : "Send reset link"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("span", { className: "mx-auto inline-flex text-primary", children: /* @__PURE__ */ jsx(CheckCircleBold, { size: 48 }) }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[24px] text-primary font-semibold", children: "Check your inbox" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "If an account exists for ",
        /* @__PURE__ */ jsx("span", { className: "text-primary", children: email }),
        ", you'll receive a password reset link shortly."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-muted-foreground pb-4 py-[12px]", children: [
      "Remembered it?",
      " ",
      /* @__PURE__ */ jsx(Link, { href: "/login", className: "text-primary font-semibold", children: "Back to sign in" })
    ] })
  ] }) });
}
export {
  ForgotPassword as default
};
