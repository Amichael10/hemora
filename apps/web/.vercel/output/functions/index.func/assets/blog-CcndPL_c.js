import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { c as createLucideIcon, G as supabase } from "./AppRouter-B_BCS-Zy.js";
import { W as WebNav } from "./WebNav-DapAMd2h.js";
import { W as WebFooter } from "./WebFooter-D9gb4m8I.js";
import { C as Calendar } from "./calendar-DSuIX0ZM.js";
import { C as Clock } from "./clock-B_eR6ahH.js";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "./button-CVyzTRqg.js";
import "@radix-ui/react-slot";
import "./Logo-qOo-96Vk.js";
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
];
const BookOpen = createLucideIcon("book-open", __iconNode);
function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("blog_posts").select("id, slug, title, excerpt, cover_url, published_at").eq("status", "published").order("published_at", { ascending: false });
      const postsWithMeta = (data || []).map((p) => ({
        ...p,
        reading_time: `${Math.floor(Math.random() * 5) + 3} min read`
      }));
      setPosts(postsWithMeta);
      setLoading(false);
    })();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen w-full bg-background font-serif overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(WebNav, {}),
    /* @__PURE__ */ jsxs("div", { className: "bg-background min-h-screen font-serif", children: [
      /* @__PURE__ */ jsx("header", { className: "pt-24 pb-20 text-center border-b border-border/60 bg-cream-light/30", children: /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto px-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-[1px] bg-primary/20" }),
            /* @__PURE__ */ jsx("h2", { className: "text-[11px] font-bold uppercase tracking-[0.4em] text-primary/70", children: "Hemora Heritage" }),
            /* @__PURE__ */ jsx("div", { className: "w-12 h-[1px] bg-primary/20" })
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-6xl md:text-8xl tracking-tighter text-foreground leading-[0.85] font-serif italic", children: "The Blog" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-serif italic leading-relaxed", children: "Archiving resilience, medical wisdom, and the collective heartbeat of the sickle cell community." })
      ] }) }),
      /* @__PURE__ */ jsx("main", { className: "max-w-7xl mx-auto px-6 py-24", children: loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-pulse", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[3/4] bg-muted/40 rounded-sm" }),
        /* @__PURE__ */ jsx("div", { className: "h-10 bg-muted/40 rounded w-5/6" }),
        /* @__PURE__ */ jsx("div", { className: "h-4 bg-muted/40 rounded w-1/2" })
      ] }, i)) }) : !posts.length ? /* @__PURE__ */ jsxs("div", { className: "text-center py-40 border border-dashed border-border/80 rounded-3xl bg-card/20", children: [
        /* @__PURE__ */ jsx(BookOpen, { className: "w-16 h-16 text-primary/10 mx-auto mb-6" }),
        /* @__PURE__ */ jsx("p", { className: "text-2xl italic text-muted-foreground font-serif", children: "Our scribes are currently gathering new stories." })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-40", children: [
        posts[0] && /* @__PURE__ */ jsx(Link, { href: `/blog/${posts[0].slug}`, className: "group block", children: /* @__PURE__ */ jsxs("article", { className: "grid grid-cols-1 lg:grid-cols-12 gap-16 items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-sm shadow-2xl transition-transform duration-1000 group-hover:scale-[1.005]", children: [
            posts[0].cover_url ? /* @__PURE__ */ jsx("img", { src: posts[0].cover_url, alt: posts[0].title, className: "w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-secondary/5 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-5xl text-primary/10 font-serif italic", children: "Hemora" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 ring-1 ring-inset ring-white/10" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "lg:col-span-5 space-y-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.25em] text-primary", children: [
              /* @__PURE__ */ jsx("span", { children: "Lead Perspective" }),
              /* @__PURE__ */ jsx("div", { className: "w-12 h-[1px] bg-primary/30" }),
              /* @__PURE__ */ jsx("span", { children: posts[0].reading_time })
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-5xl md:text-7xl tracking-tighter leading-[0.9] group-hover:text-primary transition-colors duration-500 font-serif", children: posts[0].title }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground leading-relaxed font-serif italic", children: posts[0].excerpt }),
            /* @__PURE__ */ jsx("div", { className: "pt-6", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-6 transition-all duration-500 text-foreground border-b border-primary/20 pb-2", children: [
              "Read Full Entry ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-primary" })
            ] }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32", children: posts.slice(1).map((p) => /* @__PURE__ */ jsx(Link, { href: `/blog/${p.slug}`, className: "group block", children: /* @__PURE__ */ jsxs("article", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-[3/4] overflow-hidden rounded-sm shadow-xl transition-all duration-1000 group-hover:shadow-3xl group-hover:-translate-y-2 relative bg-card", children: [
            p.cover_url ? /* @__PURE__ */ jsx("img", { src: p.cover_url, alt: p.title, className: "w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000" }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-muted/20 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-3xl text-primary/10 font-serif italic", children: "Hemora" }) }),
            /* @__PURE__ */ jsx("div", { className: "absolute top-6 left-6", children: /* @__PURE__ */ jsx("div", { className: "bg-background/95 backdrop-blur px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm border border-border/40", children: "Journal Entry" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5" }),
                " ",
                p.published_at ? new Date(p.published_at).toLocaleDateString(void 0, { month: "short", day: "numeric", year: "numeric" }) : "Draft"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
                " ",
                p.reading_time
              ] })
            ] }),
            /* @__PURE__ */ jsx("h3", { className: "text-3xl leading-[0.9] tracking-tight group-hover:text-primary transition-colors duration-500 font-serif", children: p.title }),
            p.excerpt && /* @__PURE__ */ jsx("p", { className: "text-base text-muted-foreground/80 line-clamp-3 leading-relaxed font-serif italic", children: p.excerpt }),
            /* @__PURE__ */ jsxs("div", { className: "pt-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0", children: [
              "Explore Entry ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5 text-primary" })
            ] })
          ] })
        ] }) }, p.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(WebFooter, {})
  ] });
}
export {
  BlogIndex as default
};
