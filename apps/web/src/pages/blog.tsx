import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { WebNav } from "@/components/layout/WebNav";
import { WebFooter } from "@/components/layout/WebFooter";

type Post = { 
  id: string; 
  slug: string; 
  title: string; 
  excerpt: string | null; 
  cover_url: string | null; 
  published_at: string | null;
  reading_time?: string;
};

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
      
      // Mock reading time for aesthetics
      const postsWithMeta = (data as Post[] || []).map(p => ({
        ...p,
        reading_time: `${Math.floor(Math.random() * 5) + 3} min read`
      }));
      
      setPosts(postsWithMeta);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen w-full bg-background font-serif overflow-x-hidden">
      <WebNav />
      <div className="bg-background min-h-screen font-serif">
        {/* Premium Branded Header */}
        <header className="pt-24 pb-20 text-center border-b border-border/60 bg-cream-light/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-col items-center gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-primary/20" />
                <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-primary/70">Hemora Heritage</h2>
                <div className="w-12 h-[1px] bg-primary/20" />
              </div>
              <h1 className="text-6xl md:text-8xl tracking-tighter text-foreground leading-[0.85] font-serif italic">
                The Blog
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-2xl mx-auto font-serif italic leading-relaxed">
              Archiving resilience, medical wisdom, and the collective heartbeat of the sickle cell community.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-24">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-8 animate-pulse">
                  <div className="aspect-[3/4] bg-muted/40 rounded-sm" />
                  <div className="h-10 bg-muted/40 rounded w-5/6" />
                  <div className="h-4 bg-muted/40 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : !posts.length ? (
            <div className="text-center py-40 border border-dashed border-border/80 rounded-3xl bg-card/20">
              <BookOpen className="w-16 h-16 text-primary/10 mx-auto mb-6" />
              <p className="text-2xl italic text-muted-foreground font-serif">Our scribes are currently gathering new stories.</p>
            </div>
          ) : (
            <div className="space-y-40">
              {/* Featured Post (First one) */}
              {posts[0] && (
                <Link href={`/blog/${posts[0].slug}`} className="group block">
                  <article className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-sm shadow-2xl transition-transform duration-1000 group-hover:scale-[1.005]">
                      {posts[0].cover_url ? (
                        <img src={posts[0].cover_url} alt={posts[0].title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000" />
                      ) : (
                        <div className="w-full h-full bg-secondary/5 flex items-center justify-center">
                          <span className="text-5xl text-primary/10 font-serif italic">Hemora</span>
                        </div>
                      )}
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>
                    <div className="lg:col-span-5 space-y-8">
                      <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                        <span>Lead Perspective</span>
                        <div className="w-12 h-[1px] bg-primary/30" />
                        <span>{posts[0].reading_time}</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl tracking-tighter leading-[0.9] group-hover:text-primary transition-colors duration-500 font-serif">
                        {posts[0].title}
                      </h2>
                      <p className="text-xl text-muted-foreground leading-relaxed font-serif italic">
                        {posts[0].excerpt}
                      </p>
                      <div className="pt-6">
                        <div className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-6 transition-all duration-500 text-foreground border-b border-primary/20 pb-2">
                          Read Full Entry <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Grid for the rest */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
                {posts.slice(1).map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                    <article className="space-y-8">
                      <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-xl transition-all duration-1000 group-hover:shadow-3xl group-hover:-translate-y-2 relative bg-card">
                        {p.cover_url ? (
                          <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000" />
                        ) : (
                          <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                            <span className="text-3xl text-primary/10 font-serif italic">Hemora</span>
                          </div>
                        )}
                        <div className="absolute top-6 left-6">
                          <div className="bg-background/95 backdrop-blur px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm shadow-sm border border-border/40">
                            Journal Entry
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                          <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {p.published_at ? new Date(p.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}</span>
                          <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {p.reading_time}</span>
                        </div>
                        <h3 className="text-3xl leading-[0.9] tracking-tight group-hover:text-primary transition-colors duration-500 font-serif">
                          {p.title}
                        </h3>
                        {p.excerpt && (
                          <p className="text-base text-muted-foreground/80 line-clamp-3 leading-relaxed font-serif italic">
                            {p.excerpt}
                          </p>
                        )}
                        <div className="pt-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                          Explore Entry <ArrowRight className="w-3.5 h-3.5 text-primary" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>

      </div>
      <WebFooter />
    </div>
  );
}