import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { u as useToast, G as supabase } from "./AppRouter-B_BCS-Zy.js";
import { CheckCircleBold, LockBold } from "solar-icon-set";
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
function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [sessionError, setSessionError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        setReady(true);
        return;
      }
      const sub = supabase.auth.onAuthStateChange((event, s) => {
        if (cancelled) return;
        if (event === "PASSWORD_RECOVERY" || s) {
          setReady(true);
        }
      });
      setTimeout(() => {
        if (cancelled) return;
        if (!ready) {
          supabase.auth.getSession().then(({ data: d }) => {
            if (cancelled) return;
            if (d.session) setReady(true);
            else setSessionError("This reset link is invalid or has expired. Please request a new one.");
          });
        }
        sub.data.subscription.unsubscribe();
      }, 2500);
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirm) {
      toast({ title: "Passwords don't match", description: "Please re-enter the same password.", variant: "destructive" });
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't update password", description: error.message, variant: "destructive" });
      return;
    }
    setDone(true);
    setTimeout(() => setLocation("/dashboard"), 1500);
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16", children: [
    /* @__PURE__ */ jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "flex-1 flex flex-col justify-center", children: done ? /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("span", { className: "mx-auto inline-flex text-primary", children: /* @__PURE__ */ jsx(CheckCircleBold, { size: 48 }) }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[24px] text-primary font-semibold", children: "Password updated" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Signing you in…" })
    ] }) : sessionError ? /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[22px] text-primary font-semibold", children: "Link expired" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", "data-testid": "text-reset-error", children: sessionError }),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/forgot-password",
          className: "inline-block text-primary font-semibold text-sm underline",
          children: "Request a new link"
        }
      )
    ] }) : !ready ? /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Verifying your reset link…" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center", children: "Set a new password" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground text-center", children: "Choose a strong password you don't use anywhere else." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "New password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "password",
              required: true,
              minLength: 8,
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "At least 8 characters",
              autoComplete: "new-password",
              "data-testid": "input-reset-password"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Confirm password" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "password",
              required: true,
              minLength: 8,
              value: confirm,
              onChange: (e) => setConfirm(e.target.value),
              placeholder: "Re-enter password",
              autoComplete: "new-password",
              "data-testid": "input-reset-confirm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", size: "xl", className: "w-full", disabled: busy, "data-testid": "button-reset-submit", children: [
          /* @__PURE__ */ jsx(LockBold, { size: 18 }),
          " ",
          busy ? "Updating…" : "Update password"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-center text-muted-foreground pb-4 py-[12px]", children: /* @__PURE__ */ jsx(Link, { href: "/login", className: "text-primary font-semibold", children: "Back to sign in" }) })
  ] }) });
}
export {
  ResetPassword as default
};
