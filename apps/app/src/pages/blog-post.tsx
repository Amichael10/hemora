import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { supabase } from "@/integrations/supabase/client";

type Post = {
  id: string; slug: string; title: string; excerpt: string | null;
  body_markdown: string; cover_url: string | null; published_at: string | null;
};

// Handle both legacy markdown and new TipTap HTML
function renderMarkdown(content: string): string {
  if (!content) return "";
  
  // If it starts with a tag (TipTap output), treat as HTML
  if (content.trim().startsWith("<")) {
    return content;
  }

  // Legacy markdown -> HTML (headings, bold, italic, links, paragraphs, lists)
  const escape = (s: string) => s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" } as any)[c]);
  let html = escape(content);
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
    <MobileAppShell hideNav>
      <SubPageHeader title={post?.title || "Post"} back="/blog" />
      <article className="px-5 pb-16">
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-12">Loading…</p>
        ) : notFound || !post ? (
          <p className="text-sm text-muted-foreground text-center py-12">Post not found.</p>
        ) : (
          <>
            {post.cover_url && (
              <img src={post.cover_url} alt={post.title} className="w-full h-48 object-cover rounded-2xl mb-4" />
            )}
            <h1 className="font-serif font-semibold text-2xl text-foreground tracking-[-0.5px]">{post.title}</h1>
            {post.published_at && (
              <p className="text-xs text-muted-foreground mt-1">{new Date(post.published_at).toLocaleDateString()}</p>
            )}
            <div
              className="prose prose-sm dark:prose-invert mt-5 max-w-none [&_h1]:font-serif [&_h2]:font-serif [&_h3]:font-serif [&_a]:text-primary [&_a]:underline [&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body_markdown) }}
            />
          </>
        )}
      </article>
    </MobileAppShell>
  );
}