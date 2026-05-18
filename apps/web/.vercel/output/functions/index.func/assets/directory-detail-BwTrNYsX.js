import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRoute, Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { C as Card, a as CardContent } from "./card-DUll-XNs.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { N as useGetProvider } from "./AppRouter-B_BCS-Zy.js";
import { ArrowLeftLinear, CheckCircleBold, PhoneBold, LetterLinear, GlobalLinear, MapPointLinear, ArrowRightUpLinear } from "solar-icon-set";
import "react";
import "@tanstack/router-core";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "tiny-invariant";
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
import "@radix-ui/react-dialog";
import "./push.server-BMx5QtSF.js";
import "web-push";
import "@supabase/supabase-js";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
function DirectoryDetail() {
  const [, params] = useRoute("/directory/:id");
  const id = params?.id;
  const { data: provider, isLoading } = useGetProvider(id);
  const fullAddress = provider ? [provider.name, provider.address, provider.city, provider.state, provider.country].filter(Boolean).join(", ") : "";
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
  return /* @__PURE__ */ jsx(MobileAppShell, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-full", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "px-5 pt-11 pb-16 relative",
        style: { background: "var(--gradient-brand)" },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsx(Link, { href: "/directory", children: /* @__PURE__ */ jsx(
              "button",
              {
                className: "w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/20 hover:bg-white/25 transition-colors",
                "aria-label": "Back",
                children: /* @__PURE__ */ jsx(ArrowLeftLinear, { size: 18 })
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] uppercase tracking-[0.2em] text-white/80 font-semibold", children: "Provider" }),
            /* @__PURE__ */ jsx("span", { className: "w-9" })
          ] }),
          isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-7 w-2/3 bg-white/20" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("h1", { className: "font-serif text-white text-[1.6rem] font-semibold leading-tight tracking-[-0.5px]", children: [
              provider?.name,
              provider?.verified && /* @__PURE__ */ jsx("span", { className: "inline-flex ml-2 align-middle text-white/90", children: /* @__PURE__ */ jsx(CheckCircleBold, { size: 18 }) })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-white/85 text-sm mt-1 capitalize", children: [
              provider?.type,
              provider?.specialty ? ` • ${provider.specialty}` : ""
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "px-5 pt-4 pb-10 space-y-3", children: isLoading || !provider ? /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" })
    ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5 space-y-3", children: [
        provider.phone && /* @__PURE__ */ jsxs(
          "a",
          {
            href: `tel:${provider.phone}`,
            className: "flex items-center gap-3 group",
            "data-testid": "provider-phone",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(PhoneBold, { size: 16 }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Phone" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary truncate", children: provider.phone })
              ] })
            ]
          }
        ),
        provider.email && /* @__PURE__ */ jsxs(
          "a",
          {
            href: `mailto:${provider.email}`,
            className: "flex items-center gap-3 group",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(LetterLinear, { size: 16 }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Email" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary truncate", children: provider.email })
              ] })
            ]
          }
        ),
        provider.website && /* @__PURE__ */ jsxs(
          "a",
          {
            href: provider.website,
            target: "_blank",
            rel: "noreferrer",
            className: "flex items-center gap-3 group",
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(GlobalLinear, { size: 16 }) }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Website" }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground group-hover:text-primary truncate", children: provider.website.replace(/^https?:\/\//, "") })
              ] })
            ]
          }
        ),
        (provider.address || provider.city || provider.state || provider.country) && /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(MapPointLinear, { size: 16 }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Address" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-foreground leading-snug", children: [provider.address, provider.city, provider.state, provider.country].filter(Boolean).join(", ") })
          ] })
        ] }),
        !provider.phone && !provider.email && !provider.website && !provider.address && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "No contact details available yet." })
      ] }) }),
      fullAddress && /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm overflow-hidden", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/3] w-full bg-muted", children: [
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute top-0 left-0 h-12 w-44 bg-muted", "aria-hidden": "true" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "w-full rounded-xl gap-1.5", children: /* @__PURE__ */ jsxs("a", { href: mapsLink, target: "_blank", rel: "noreferrer", children: [
          /* @__PURE__ */ jsx(ArrowRightUpLinear, { size: 14 }),
          " Open in Google Maps"
        ] }) }) })
      ] }) }),
      provider.services?.length > 0 && /* @__PURE__ */ jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground mb-2", children: "Services" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: provider.services.map((s, i) => /* @__PURE__ */ jsx(
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
