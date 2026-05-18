import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, a as useToast, J as supabase, L as Link } from "./AppRouter-yFV4k-aY.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { a as FX1, Z as ZF1 } from "./index-D2ZfvGdl.js";
import { m as motion } from "./router-BY6ex80A.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
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
import "./index-DkPu60F3.js";
function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = reactExports.useState("");
  const [confirm, setConfirm] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [ready, setReady] = reactExports.useState(false);
  const [sessionError, setSessionError] = reactExports.useState(null);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "flex-1 flex flex-col justify-center", children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto inline-flex text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { size: 48 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[24px] text-primary font-semibold", children: "Password updated" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Signing you in…" })
    ] }) : sessionError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[22px] text-primary font-semibold", children: "Link expired" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", "data-testid": "text-reset-error", children: sessionError }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          href: "/forgot-password",
          className: "inline-block text-primary font-semibold text-sm underline",
          children: "Request a new link"
        }
      )
    ] }) : !ready ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 mx-auto rounded-full border-4 border-primary border-t-transparent animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Verifying your reset link…" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center", children: "Set a new password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground text-center", children: "Choose a strong password you don't use anywhere else." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "New password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Confirm password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "xl", className: "w-full", disabled: busy, "data-testid": "button-reset-submit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ZF1, { size: 18 }),
          " ",
          busy ? "Updating…" : "Update password"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-center text-muted-foreground pb-4 py-[12px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/login", className: "text-primary font-semibold", children: "Back to sign in" }) })
  ] }) });
}
export {
  ResetPassword as default
};
