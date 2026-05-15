import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, BookOpen, Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { WebNav } from "@/components/layout/WebNav";
import { WebFooter } from "@/components/layout/WebFooter";

type Post = {
  id: string; slug: string; title: string; excerpt: string | null;
  body_markdown: string; cover_url: string | null; published_at: string | null;
};

// Tiny markdown -> HTML (headings, bold, italic, links, paragraphs, lists)
function renderMarkdown(md: string): string {
  const escape = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as any)[c]);
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

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();
      if (!data) setNotFound(true);
      else setPost(data as Post);
      setLoading(false);
    })();
  }, [slug]);

  return (
    <div className="min-h-screen bg-background font-serif text-foreground flex flex-col">
      <WebNav />
      <header className="border-b border-border/40 bg-card py-6">
        <div className="max-w-4xl mx-auto px-6">
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>
        </div>
      </header>
      <div className="flex-1">
      <article className="max-w-4xl mx-auto px-6 py-16">
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-12">Loading…</p>
        ) : notFound || !post ? (
          <p className="text-sm text-muted-foreground text-center py-12">Post not found.</p>
        ) : (
          <>
            {post.cover_url && (
              <img src={post.cover_url} alt={post.title} className="w-full h-[40vh] object-cover rounded-2xl mb-12 shadow-xl" />
            )}
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
              <span>Blog Entry</span>
              {post.published_at && (
                <>
                  <div className="w-8 h-[1px] bg-primary/30" />
                  <span>{new Date(post.published_at).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </>
              )}
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground tracking-tight leading-[1.1] mb-12">{post.title}</h1>
            <div
              className="prose prose-lg dark:prose-invert max-w-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_a]:text-primary [&_a]:underline [&_p]:my-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-2"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body_markdown) }}
            />
          </>
        )}
      </article>
      </div>
      <WebFooter />
    </div>
  );
}