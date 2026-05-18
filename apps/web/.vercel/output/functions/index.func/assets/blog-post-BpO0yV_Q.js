import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { G as supabase } from "./AppRouter-B_BCS-Zy.js";
import { W as WebNav } from "./WebNav-DapAMd2h.js";
import { W as WebFooter } from "./WebFooter-D9gb4m8I.js";
import { A as ArrowLeft } from "./arrow-left-BlzPqGNg.js";
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
function renderMarkdown(md) {
  const escape = (s) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
  let html = escape(md);
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/^[-*] (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
  html = html.split(/\n\n+/).map((b) => /^<(h\d|ul|ol|blockquote|pre)/.test(b.trim()) ? b : `<p>${b.replace(/\n/g, "<br/>")}</p>`).join("\n");
  return html;
}
function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (!data) setNotFound(true);
      else setPost(data);
      setLoading(false);
    })();
  }, [slug]);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background font-serif text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsx(WebNav, {}),
    /* @__PURE__ */ jsx("header", { className: "border-b border-border/40 bg-card py-6", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto px-6", children: /* @__PURE__ */ jsxs("button", { onClick: () => window.history.back(), className: "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Back to Blog"
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsx("article", { className: "max-w-4xl mx-auto px-6 py-16", children: loading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: "Loading…" }) : notFound || !post ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: "Post not found." }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      post.cover_url && /* @__PURE__ */ jsx("img", { src: post.cover_url, alt: post.title, className: "w-full h-[40vh] object-cover rounded-2xl mb-12 shadow-xl" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6", children: [
        /* @__PURE__ */ jsx("span", { children: "Blog Entry" }),
        post.published_at && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-[1px] bg-primary/30" }),
          /* @__PURE__ */ jsx("span", { children: new Date(post.published_at).toLocaleDateString(void 0, { month: "long", day: "numeric", year: "numeric" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "font-serif text-5xl md:text-6xl text-foreground tracking-tight leading-[1.1] mb-12", children: post.title }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "prose prose-lg dark:prose-invert max-w-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_a]:text-primary [&_a]:underline [&_p]:my-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-2",
          dangerouslySetInnerHTML: { __html: renderMarkdown(post.body_markdown) }
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx(WebFooter, {})
  ] });
}
export {
  BlogPost as default
};
