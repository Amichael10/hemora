import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, Link } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { u as useToast, d as useAuth } from "./AppRouter-B_BCS-Zy.js";
import { FaGoogle } from "react-icons/fa";
import { LockBold } from "solar-icon-set";
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
function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { signInWithGoogle, signInWithPassword, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  if (user) {
    setTimeout(() => setLocation("/dashboard"), 0);
  }
  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await signInWithGoogle();
    setBusy(false);
    if (error) toast({ title: "Couldn't sign in", description: error, variant: "destructive" });
  };
  const handleEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setBusy(true);
    const { error } = await signInWithPassword(email, password);
    setBusy(false);
    if (error) {
      toast({ title: "Couldn't sign in", description: error, variant: "destructive" });
      return;
    }
    setLocation("/dashboard");
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16", children: [
    /* @__PURE__ */ jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "flex-1 flex flex-col justify-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-[28px] text-foreground font-semibold tracking-[-0.5px] text-center", children: "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground text-center", children: "Sign in to continue your care." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleEmail, className: "mt-10 space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Password" }),
          /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Your password", autoComplete: "current-password" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Link, { href: "/forgot-password", className: "text-xs text-foreground font-medium hover:underline opacity-80", children: "Forgot password?" }) }),
        /* @__PURE__ */ jsxs(Button, { type: "submit", size: "xl", className: "w-full", disabled: busy, children: [
          /* @__PURE__ */ jsx(LockBold, { size: 18 }),
          " Sign in"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "my-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-border" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "xl", className: "w-full", onClick: handleGoogle, disabled: busy, children: [
        /* @__PURE__ */ jsx(FaGoogle, { className: "w-[18px] h-[18px]" }),
        " Continue with Google"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "text-sm text-center text-muted-foreground pb-4 py-[12px]", children: [
      "New here?",
      " ",
      /* @__PURE__ */ jsx(Link, { href: "/signup", className: "text-primary font-semibold", children: "Create an account" })
    ] })
  ] }) });
}
export {
  Login as default
};
