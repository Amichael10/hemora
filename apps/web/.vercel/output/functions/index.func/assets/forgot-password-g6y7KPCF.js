import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { a as useToast, L as Link, J as supabase } from "./AppRouter-yFV4k-aY.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { V as V1, a as FX1 } from "./index-D2ZfvGdl.js";
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
function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "flex-1 flex flex-col justify-center", children: !sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[28px] text-primary font-semibold tracking-[-0.5px] text-center", children: "Reset your password" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground text-center", children: "Enter your email and we'll send you a link to set a new password." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-10 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "xl", className: "w-full", disabled: busy, "data-testid": "button-forgot-submit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(V1, { size: 18 }),
          " ",
          busy ? "Sending…" : "Send reset link"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto inline-flex text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { size: 48 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[24px] text-primary font-semibold", children: "Check your inbox" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "If an account exists for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: email }),
        ", you'll receive a password reset link shortly."
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-center text-muted-foreground pb-4 py-[12px]", children: [
      "Remembered it?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/login", className: "text-primary font-semibold", children: "Back to sign in" })
    ] })
  ] }) });
}
export {
  ForgotPassword as default
};
