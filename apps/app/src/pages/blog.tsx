import { useEffect, useState } from "react";
import { Link } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { supabase } from "@/integrations/supabase/client";

type Post = { id: string; slug: string; title: string; excerpt: string | null; cover_url: string | null; published_at: string | null };

export default function BlogIndex() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, cover_url, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false });
      setPosts((data as Post[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Blog" back="/dashboard" />
      <div className="px-5 pb-10 space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Loading…</p>
        ) : !posts.length ? (
          <p className="text-sm text-muted-foreground text-center py-8">No posts yet.</p>
        ) : (
          posts.map((p) => (
            <Link key={p.id} href={`/blog/${p.slug}`}>
              <div className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:bg-muted/40 transition-colors">
                {p.cover_url && (
                  <img src={p.cover_url} alt={p.title} className="w-full h-40 object-cover" loading="lazy" />
                )}
                <div className="p-4">
                  <h2 className="font-serif font-semibold text-base text-foreground">{p.title}</h2>
                  {p.excerpt && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{p.excerpt}</p>}
                  {p.published_at && (
                    <p className="text-[11px] text-muted-foreground mt-2">
                      {new Date(p.published_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </MobileAppShell>
  );
}