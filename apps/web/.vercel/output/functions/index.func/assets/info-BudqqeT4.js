import { q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./AppRouter-yFV4k-aY.js";
import "./router-BY6ex80A.js";
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
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
import "./button-Be3fVaAL.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-D2ZfvGdl.js";
function InfoPage({ title, back = "/settings", children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title, back }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "px-6 pb-12 prose prose-sm max-w-none text-foreground/90 leading-relaxed [&_h2]:font-serif [&_h2]:text-primary [&_h2]:text-[18px] [&_h2]:font-semibold [&_h2]:tracking-[-0.3px] [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-sm [&_p]:text-muted-foreground [&_li]:text-sm [&_li]:text-muted-foreground", children })
  ] });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoPage, { title: "About Kindred", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Care, together." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kindred is a gentle companion for families managing sickle cell care. Track medications, log crisis moments, save records, and find providers — all in one private place." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Our mission" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To make day-to-day care feel less heavy, and to make sure no caregiver feels alone." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Built with love" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Made by a small team in collaboration with patients and families." })
  ] });
}
function Help() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoPage, { title: "Help & support", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Common questions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "How do I add a medication?" }),
      " Go to Meds → tap the + button → fill in the details."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "How do I log a crisis?" }),
      " Tap Crisis from the bottom navigation and follow the steps."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Is my data private?" }),
      " Yes — your data is tied to your account and only visible to you."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Contact us" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Email ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@kindred.app", className: "text-primary underline", children: "hello@kindred.app" }),
      " — we usually reply within 24 hours."
    ] })
  ] });
}
function Privacy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoPage, { title: "Privacy Policy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Last updated: May 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "What we collect" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Account info (email, name) and the health data you choose to log: medications, crisis events, care records, and emergency contacts." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "How we use it" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To deliver Kindred features only. We do not sell your data and we do not share it with advertisers." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Where it's stored" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your data is stored securely on our backend and protected by row-level security so only you can read it." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Your rights" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You can export, edit, or delete your data at any time. Email us to request deletion of your account." })
  ] });
}
function Terms() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InfoPage, { title: "Terms of Service", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Last updated: May 2026" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Not medical advice" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kindred helps you organise care information. It is not a substitute for professional medical advice, diagnosis, or treatment." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Account responsibility" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Keep your sign-in credentials safe. You are responsible for activity on your account." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Acceptable use" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Do not use Kindred to harm others, share illegal content, or attempt to disrupt the service." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Changes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may update these terms; we'll notify you of meaningful changes." })
  ] });
}
export {
  About,
  Help,
  InfoPage,
  Privacy,
  Terms
};
