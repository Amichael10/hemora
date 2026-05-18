import { q as jsxRuntimeExports } from "../server.js";
import { q as useRoute, R as useGetProvider, L as Link } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { L as L4, a as FX1, N as N41, ab as P, P as Zr, a3 as $o, a5 as f4 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
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
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
function DirectoryDetail() {
  const [, params] = useRoute("/directory/:id");
  const id = params?.id;
  const { data: provider, isLoading } = useGetProvider(id);
  const fullAddress = provider ? [provider.name, provider.address, provider.city, provider.state, provider.country].filter(Boolean).join(", ") : "";
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MobileAppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-5 pt-11 pb-16 relative",
        style: { background: "var(--gradient-brand)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/directory", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/20 hover:bg-white/25 transition-colors",
                "aria-label": "Back",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(L4, { size: 18 })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-[0.2em] text-white/80 font-semibold", children: "Provider" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9" })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-2/3 bg-white/20" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-serif text-white text-[1.6rem] font-semibold leading-tight tracking-[-0.5px]", children: [
              provider?.name,
              provider?.verified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex ml-2 align-middle text-white/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { size: 18 }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white/85 text-sm mt-1 capitalize", children: [
              provider?.type,
              provider?.specialty ? ` • ${provider.specialty}` : ""
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-4 pb-10 space-y-3", children: isLoading || !provider ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 w-full" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
        provider.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `tel:${provider.phone}`,
            className: "flex items-center gap-3 group",
            "data-testid": "provider-phone",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(N41, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary truncate", children: provider.phone })
              ] })
            ]
          }
        ),
        provider.email && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `mailto:${provider.email}`,
            className: "flex items-center gap-3 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(P, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary truncate", children: provider.email })
              ] })
            ]
          }
        ),
        provider.website && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: provider.website,
            target: "_blank",
            rel: "noreferrer",
            className: "flex items-center gap-3 group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zr, { size: 16 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Website" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary truncate", children: provider.website.replace(/^https?:\/\//, "") })
              ] })
            ]
          }
        ),
        (provider.address || provider.city || provider.state || provider.country) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx($o, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground leading-snug", children: [provider.address, provider.city, provider.state, provider.country].filter(Boolean).join(", ") })
          ] })
        ] }),
        !provider.phone && !provider.email && !provider.website && !provider.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No contact details available yet." })
      ] }) }),
      fullAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] w-full bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "iframe",
            {
              title: `Map of ${provider.name}`,
              src: embedSrc,
              width: "100%",
              height: "100%",
              style: { border: 0 },
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
              "data-testid": "provider-map"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-0 left-0 h-12 w-44 bg-muted", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, className: "w-full rounded-xl gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: mapsLink, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(f4, { size: 14 }),
          " Open in Google Maps"
        ] }) }) })
      ] }) }),
      provider.services?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-2", children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: provider.services.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs bg-muted/60 px-2.5 py-1 rounded-md text-foreground",
            children: s
          },
          i
        )) })
      ] }) })
    ] }) })
  ] }) });
}
export {
  DirectoryDetail as default
};
