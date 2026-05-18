import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { h as hemoraLogo } from "./Logo-qOo-96Vk.js";
import { DownloadMinimalisticLinear } from "solar-icon-set";
import { W as WebFooter } from "./WebFooter-D9gb4m8I.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./AppRouter-B_BCS-Zy.js";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
const LOGO_VARIANTS = [
  {
    name: "Colored",
    description: "Default mark for cream and warm-light backgrounds.",
    bg: "bg-[#f4ead8]",
    preview: "/brand/logos/hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/hemora-icon.svg" },
      { label: "Icon PNG", href: "/brand/logos/hemora-icon.png" },
      { label: "Wordmark SVG", href: "/brand/logos/hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/hemora-wordmark.png" }
    ]
  },
  {
    name: "Black",
    description: "For light, neutral, or photographic backgrounds.",
    bg: "bg-white",
    preview: "/brand/logos/black-hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/black-hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/black-hemora-icon.svg" },
      { label: "Wordmark SVG", href: "/brand/logos/black-hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/black-hemora-wordmark.png" }
    ]
  },
  {
    name: "White",
    description: "For dark, deep teal, or oxblood backgrounds.",
    bg: "bg-[#193b3f]",
    preview: "/brand/logos/white-hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/white-hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/white-hemora-icon.svg" },
      { label: "Icon PNG", href: "/brand/logos/white-hemora-icon.png" },
      { label: "Wordmark SVG", href: "/brand/logos/white-hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/white-hemora-wordmark.png" }
    ]
  },
  {
    name: "Green",
    description: "Single-color mark for tonal or partner contexts.",
    bg: "bg-[#f4ead8]",
    preview: "/brand/logos/green-hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/green-hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/green-hemora-icon.svg" },
      { label: "Icon PNG", href: "/brand/logos/green-hemora-icon.png" },
      { label: "Wordmark SVG", href: "/brand/logos/green-hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/green-hemora-wordmark.png" }
    ]
  }
];
const COLORS = [
  { name: "Cream", hex: "#F4EAD8", role: "Canvas / background", className: "bg-[#F4EAD8] text-[#193b3f]" },
  { name: "Cream Card", hex: "#FBF5E7", role: "Surfaces / cards", className: "bg-[#FBF5E7] text-[#193b3f]" },
  { name: "Deep Teal", hex: "#193B3F", role: "Headings / dark surfaces", className: "bg-[#193B3F] text-white" },
  { name: "Teal Bright", hex: "#34696E", role: "Secondary surfaces", className: "bg-[#34696E] text-white" },
  { name: "Sickle Red", hex: "#A8324A", role: "Primary CTA / urgent", className: "bg-[#A8324A] text-white" },
  { name: "Red Deep", hex: "#7E2438", role: "Hover / pressed states", className: "bg-[#7E2438] text-white" },
  { name: "Gold", hex: "#C9A35A", role: "Accent / highlights", className: "bg-[#C9A35A] text-[#193b3f]" },
  { name: "Gold Soft", hex: "#F2DEB3", role: "Subtle accent surfaces", className: "bg-[#F2DEB3] text-[#193b3f]" }
];
const USAGE = [
  "Essentials Pouch.png",
  "Hoodie.png",
  "Mug.png",
  "Pill counter.png",
  "Scarf.png",
  "Tote bag.png",
  "Water Bottle.png",
  "Weekly Pill Organizer.png"
].map((f) => ({ name: f.replace(/\.png$/, ""), href: `/brand/usage/${encodeURIComponent(f)}` }));
const SOCIALS = Array.from({ length: 9 }, (_, i) => ({
  name: `Socials ${i + 1}`,
  href: `/brand/socials/${encodeURIComponent(`Socials ${i + 1}.png`)}`
}));
function Nav() {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between border-x border-border", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setLocation("/"), className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("img", { src: hemoraLogo, alt: "Hemora", className: "w-8 h-8" }),
      /* @__PURE__ */ jsx("span", { className: "font-serif text-xl text-secondary", children: "Hemora" })
    ] }),
    /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-8 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("a", { href: "/", className: "hover:text-foreground transition", children: "Home" }),
      /* @__PURE__ */ jsx("a", { href: "/about", className: "hover:text-foreground transition", children: "About" }),
      /* @__PURE__ */ jsx("a", { href: "https://app.hemora.xyz/resources", className: "hover:text-foreground transition", children: "Resources" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://app.hemora.xyz/login", children: "Sign in" }) }),
      /* @__PURE__ */ jsx(Button, { size: "sm", asChild: true, children: /* @__PURE__ */ jsx("a", { href: "https://app.hemora.xyz/signup", children: "Get started" }) })
    ] })
  ] }) });
}
function LogoCard({ variant }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsx("div", { className: `${variant.bg} flex items-center justify-center p-10 h-56`, children: /* @__PURE__ */ jsx("img", { src: variant.preview, alt: `${variant.name} Hemora logo`, className: "max-h-32 w-auto" }) }),
    /* @__PURE__ */ jsxs("div", { className: "p-5 flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-serif text-xl font-semibold text-foreground tracking-[-0.3px]", children: variant.name }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: variant.description }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: variant.files.map((f) => /* @__PURE__ */ jsx("a", { href: f.href, download: true, children: /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "rounded-full text-xs h-8", children: [
        /* @__PURE__ */ jsx(DownloadMinimalisticLinear, { size: 12 }),
        f.label
      ] }) }, f.href)) })
    ] })
  ] });
}
function ColorSwatch({ name, hex, role, className }) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-2xl overflow-hidden border border-border bg-card", children: [
    /* @__PURE__ */ jsx("div", { className: `${className} h-28 flex items-end p-4 font-serif text-lg`, children: name }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-foreground", children: hex }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => navigator.clipboard?.writeText(hex),
            className: "text-xs text-muted-foreground hover:text-foreground",
            children: "Copy"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: role })
    ] })
  ] });
}
function Brand() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-[100dvh] bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(Nav, {}),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-20 border-x border-border", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "Brand" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-1px] text-secondary max-w-3xl", children: "The Hemora visual identity." }),
      /* @__PURE__ */ jsx("p", { className: "mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed", children: "Logos, colors, and typography for press, partners, and community use. Please use these assets thoughtfully and don't recolor or distort the marks." })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border", children: /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "The name" }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2", children: 'What "Hemora" means' }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl bg-card border border-border p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-accent", children: "Pronunciation" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-4xl font-semibold text-secondary mt-2 tracking-[-0.5px]", children: "Hemora" }),
          /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-muted-foreground mt-2", children: "heh-MOR-ah" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-4", children: "Meaning · inspired by hemoglobin, care, and family connection." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-serif text-2xl sm:text-3xl text-secondary leading-snug tracking-[-0.3px]", children: [
          "Hemora means ",
          /* @__PURE__ */ jsx("em", { className: "text-primary not-italic", children: "care around the bloodline" }),
          " — a calm support system for families touched by sickle cell."
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-base text-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "The name comes from ",
            /* @__PURE__ */ jsx("strong", { children: '"heme"' }),
            ", the part of hemoglobin that carries oxygen in red blood cells. We softened it into something warmer, more human, and less clinical — so the name connects quietly to the condition without sounding like a hospital, lab, or disease label."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "The ",
            /* @__PURE__ */ jsx("strong", { children: '"-ora"' }),
            " ending gives it a calmer, more caring feel — almost like",
            /* @__PURE__ */ jsx("em", { children: " aura" }),
            ", care, or support gathered around the family."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-secondary text-secondary-foreground p-6", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-accent", children: "Short brand line" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-xl sm:text-2xl mt-2 leading-snug", children: "Hemora is a warm name inspired by hemoglobin and family care. It represents support for every family touched by sickle cell." })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "Logos" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2", children: "Download the marks" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-md", children: "SVG for web and print. PNG for raster contexts. Choose the variant with the strongest contrast against your background." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: LOGO_VARIANTS.map((v) => /* @__PURE__ */ jsx(LogoCard, { variant: v }, v.name)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "Color" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2", children: "Protective Crescent palette" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-md", children: "Cream as canvas. Deep teal for trust. Sickle red reserved for what matters most. Gold lights the way." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4", children: COLORS.map((c) => /* @__PURE__ */ jsx(ColorSwatch, { ...c }, c.hex)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "Typography" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2", children: "Two voices, one tone" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-md", children: "Fraunces speaks with warmth in headings. Inter holds the body steady. Together they feel like a kind hand on your shoulder." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-accent", children: "Display" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-2xl text-muted-foreground mt-2", children: "Fraunces — serif" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-6xl font-semibold tracking-[-1px] text-secondary mt-4 leading-[0.95]", children: "Care that stays with you." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("div", { children: "Weights · 400 · 500 · 600 · 700" }),
            /* @__PURE__ */ jsx("div", { children: "Use for · Headings, hero, quotes" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card border border-border p-8", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-accent", children: "Body" }),
          /* @__PURE__ */ jsx("p", { className: "font-sans text-2xl text-muted-foreground mt-2", children: "Inter — sans" }),
          /* @__PURE__ */ jsx("p", { className: "font-sans text-base text-foreground mt-4 leading-relaxed", children: "Hemora is a gentle companion for families managing sickle cell — track medications, log crisis moments, save records, and keep care close. Inter keeps the day-to-day clear, calm, and easy on tired eyes." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsx("div", { children: "Weights · 400 · 500 · 600 · 700" }),
            /* @__PURE__ */ jsx("div", { children: "Use for · Body, UI, labels" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl bg-card border border-border p-8 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-muted-foreground", children: "H1 · Fraunces 600" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-5xl font-semibold tracking-[-0.5px] text-secondary", children: "A gentle place for hard days." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-muted-foreground", children: "H2 · Fraunces 600" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-3xl font-semibold tracking-[-0.3px] text-secondary", children: "Track meds. Log crises. Stay close." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-muted-foreground", children: "H3 · Fraunces 600" }),
          /* @__PURE__ */ jsx("p", { className: "font-serif text-xl font-semibold text-secondary", children: "Built with families, for families." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-muted-foreground", children: "Body · Inter 400" }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-foreground", children: "For every family touched by sickle cell — Hemora is here." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[2px] text-muted-foreground", children: "Caption · Inter 500" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-[2px]", children: "Eyebrow · uppercase · 2px tracking" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "In use" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2", children: "Brand in the world" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-md", children: "Examples of how Hemora shows up beyond the screen. Preview only." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: USAGE.map((u) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card overflow-hidden aspect-square", children: /* @__PURE__ */ jsx("img", { src: u.href, alt: u.name, className: "w-full h-full object-cover", loading: "lazy" }) }, u.href)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between flex-wrap gap-3 mb-8", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold uppercase tracking-[2px] text-primary/70", children: "Social" }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2", children: "Social templates" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-md", children: "A peek at how Hemora speaks across social. Preview only." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-4 grid-cols-2 md:grid-cols-3", children: SOCIALS.map((s) => /* @__PURE__ */ jsx("div", { className: "rounded-2xl border border-border bg-card overflow-hidden aspect-square", children: /* @__PURE__ */ jsx("img", { src: s.href, alt: s.name, className: "w-full h-full object-cover", loading: "lazy" }) }, s.href)) })
    ] }) }),
    /* @__PURE__ */ jsx(WebFooter, {})
  ] });
}
export {
  Brand as default
};
