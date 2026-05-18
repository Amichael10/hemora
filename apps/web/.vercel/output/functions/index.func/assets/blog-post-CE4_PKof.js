import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { q as useRoute, J as supabase } from "./AppRouter-yFV4k-aY.js";
import { W as WebNav } from "./WebNav-B1JtJBH1.js";
import { W as WebFooter } from "./WebFooter-Dm1xjop2.js";
import { A as ArrowLeft } from "./arrow-left-CBTqZdfO.js";
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
import "./button-Be3fVaAL.js";
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
  const [post, setPost] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [notFound, setNotFound] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (!data) setNotFound(true);
      else setPost(data);
      setLoading(false);
    })();
  }, [slug]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background font-serif text-foreground flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(WebNav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border/40 bg-card py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => window.history.back(), className: "inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
      " Back to Blog"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "max-w-4xl mx-auto px-6 py-16", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: "Loading…" }) : notFound || !post ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-12", children: "Post not found." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      post.cover_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover_url, alt: post.title, className: "w-full h-[40vh] object-cover rounded-2xl mb-12 shadow-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Blog Entry" }),
        post.published_at && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-[1px] bg-primary/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.published_at).toLocaleDateString(void 0, { month: "long", day: "numeric", year: "numeric" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-5xl md:text-6xl text-foreground tracking-tight leading-[1.1] mb-12", children: post.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "prose prose-lg dark:prose-invert max-w-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_a]:text-primary [&_a]:underline [&_p]:my-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-2",
          dangerouslySetInnerHTML: { __html: renderMarkdown(post.body_markdown) }
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WebFooter, {})
  ] });
}
export {
  BlogPost as default
};
