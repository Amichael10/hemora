import { q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, L as Link } from "./AppRouter-yFV4k-aY.js";
import { m as motion, L as Lottie, y as meltingFace } from "./router-BY6ex80A.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { af as pJ1, ag as P3 } from "./index-D2ZfvGdl.js";
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
function NotFound() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-20 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "flex flex-col items-center flex-1 justify-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lottie, { animationData: meltingFace, loop: true, className: "w-56 h-56" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[120px] leading-none font-bold text-primary tracking-tight mt-2", children: "404" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "h-display text-foreground mt-6 max-w-[280px]", children: "We couldn't find that page." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 body-md text-muted-foreground max-w-[300px]", children: "The link may be broken, or the page may have been moved. Let's get you back on track." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3, duration: 0.5 },
        className: "mt-auto w-full flex flex-col gap-3 pt-12",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "w-full gap-2",
              onClick: () => setLocation("/dashboard"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(pJ1, { size: 20 }),
                "Go to dashboard"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              variant: "ghost",
              className: "w-full gap-2",
              onClick: () => window.history.back(),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(P3, { size: 18 }),
                "Go back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-xs text-muted-foreground", children: [
            "Need help?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/help", className: "text-primary underline underline-offset-2", children: "Visit support" })
          ] })
        ]
      }
    )
  ] }) });
}
export {
  NotFound as default
};
