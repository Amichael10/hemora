import { q as jsxRuntimeExports } from "../server.js";
import { u as useLocation } from "./AppRouter-yFV4k-aY.js";
import { B as Button } from "./button-Be3fVaAL.js";
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
const kindredLogo = "/assets/Logo-Cgcb5_W_.png";
const illustration = "/assets/african-family-illustration-DZ_3F-zR.png";
function Splash() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-24 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
        className: "flex flex-col items-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: kindredLogo, alt: "Kindred Logo", className: "w-24 h-24 mb-6", "data-testid": "img-splash-logo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "h-display text-primary max-w-[280px]", children: "For every family touched by sickle cell." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 body-md tracking-wide", children: "Built for families. Guided by care." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 1, delay: 0.3 },
        className: "mt-12 mb-auto",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: illustration, alt: "Family", className: "w-[280px] max-w-full", "data-testid": "img-splash-illustration" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5, delay: 1 },
        className: "w-full mt-8",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xl", className: "w-full", onClick: () => setLocation("/onboarding"), "data-testid": "button-get-started", children: "Get Started" })
      }
    )
  ] }) });
}
export {
  Splash as default
};
