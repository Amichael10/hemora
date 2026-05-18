import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, a as useToast, e as useAuth, L as Link } from "./AppRouter-yFV4k-aY.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { F as FaGoogle } from "./index-BTaan__n.js";
import { Z as ZF1 } from "./index-D2ZfvGdl.js";
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
function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { signInWithGoogle, signInWithPassword, user } = useAuth();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col p-6 pt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, className: "flex-1 flex flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[28px] text-foreground font-semibold tracking-[-0.5px] text-center", children: "Welcome back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground text-center", children: "Sign in to continue your care." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleEmail, className: "mt-10 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Your password", autoComplete: "current-password" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/forgot-password", className: "text-xs text-foreground font-medium hover:underline opacity-80", children: "Forgot password?" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", size: "xl", className: "w-full", disabled: busy, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ZF1, { size: 18 }),
          " Sign in"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "or" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "xl", className: "w-full", onClick: handleGoogle, disabled: busy, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGoogle, { className: "w-[18px] h-[18px]" }),
        " Continue with Google"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-center text-muted-foreground pb-4 py-[12px]", children: [
      "New here?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/signup", className: "text-primary font-semibold", children: "Create an account" })
    ] })
  ] }) });
}
export {
  Login as default
};
