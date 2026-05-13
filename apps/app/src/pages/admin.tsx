import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { HemoraLoader } from "@/components/HemoraLoader";
import { supabase } from "@/integrations/supabase/client";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body_markdown: string;
  cover_url: string | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  updated_at: string;
};

function BlogTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) toast({ title: "Failed to load posts", description: error.message, variant: "destructive" });
    setPosts((data as Post[]) || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.title) return toast({ title: "Title required" });
    const slug = editing.slug || slugify(editing.title);
    const payload = {
      title: editing.title,
      slug,
      excerpt: editing.excerpt ?? null,
      body_markdown: editing.body_markdown ?? "",
      cover_url: editing.cover_url ?? null,
      status: (editing.status as Post["status"]) ?? "draft",
      published_at: editing.status === "published" ? (editing.published_at || new Date().toISOString()) : null,
    };
    const { error } = editing.id
      ? await supabase.from("blog_posts").update(payload).eq("id", editing.id)
      : await supabase.from("blog_posts").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: editing.id ? "Post updated" : "Post created" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    toast({ title: "Deleted" });
    load();
  };

  if (editing) {
    return (
      <div className="space-y-3">
        <Input
          placeholder="Title"
          value={editing.title || ""}
          onChange={(e) => setEditing({ ...editing, title: e.target.value })}
        />
        <Input
          placeholder="Slug (auto from title)"
          value={editing.slug || ""}
          onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
        />
        <Textarea
          placeholder="Excerpt (short summary)"
          value={editing.excerpt || ""}
          onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
          rows={2}
        />
        <Input
          placeholder="Cover image URL"
          value={editing.cover_url || ""}
          onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })}
        />
        <Textarea
          placeholder="Body (Markdown supported)"
          value={editing.body_markdown || ""}
          onChange={(e) => setEditing({ ...editing, body_markdown: e.target.value })}
          rows={14}
          className="font-mono text-sm"
        />
        <div className="flex gap-2">
          {(["draft", "published", "archived"] as const).map((s) => (
            <Button
              key={s}
              size="sm"
              variant={editing.status === s ? "default" : "outline"}
              onClick={() => setEditing({ ...editing, status: s })}
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <Button onClick={save} className="flex-1">Save</Button>
          <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setEditing({ status: "draft", body_markdown: "" })} className="w-full">
        + New post
      </Button>
      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-4">Loading…</p>
      ) : posts.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">No posts yet.</p>
      ) : (
        posts.map((p) => (
          <div key={p.id} className="bg-card rounded-xl border border-border/60 p-3 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-sm truncate">{p.title}</span>
              <Badge variant={p.status === "published" ? "default" : "secondary"}>{p.status}</Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate">/{p.slug}</p>
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(p.id)}>Delete</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

type Provider = {
  id: string;
  name: string;
  type: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  phone: string | null;
  verified: boolean | null;
  user_id: string | null;
};

function ProvidersTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<Provider[]>([]);
  const [editing, setEditing] = useState<Partial<Provider> | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("providers")
      .select("id,name,type,city,state,country,phone,verified,user_id")
      .is("user_id", null)
      .order("name");
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    setItems((data as Provider[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing?.name) return toast({ title: "Name required" });
    const payload = {
      name: editing.name,
      type: editing.type || "hospital",
      city: editing.city || null,
      state: editing.state || null,
      country: editing.country || "Nigeria",
      phone: editing.phone || null,
      verified: editing.verified ?? true,
      user_id: null,
    };
    const { error } = editing.id
      ? await supabase.from("providers").update(payload).eq("id", editing.id)
      : await supabase.from("providers").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Saved" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete provider?")) return;
    const { error } = await supabase.from("providers").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    load();
  };

  if (editing) {
    return (
      <div className="space-y-3">
        <Input placeholder="Name" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
        <Input placeholder="Type (hospital, clinic, doctor…)" value={editing.type || ""} onChange={(e) => setEditing({ ...editing, type: e.target.value })} />
        <Input placeholder="City" value={editing.city || ""} onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
        <Input placeholder="State" value={editing.state || ""} onChange={(e) => setEditing({ ...editing, state: e.target.value })} />
        <Input placeholder="Country" value={editing.country || "Nigeria"} onChange={(e) => setEditing({ ...editing, country: e.target.value })} />
        <Input placeholder="Phone" value={editing.phone || ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
        <div className="flex gap-2 pt-2">
          <Button onClick={save} className="flex-1">Save</Button>
          <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Button onClick={() => setEditing({ verified: true, country: "Nigeria", type: "hospital" })} className="w-full">+ New provider</Button>
      {loading ? <p className="text-sm text-muted-foreground text-center py-4">Loading…</p> : items.map((p) => (
        <div key={p.id} className="bg-card rounded-xl border border-border/60 p-3">
          <div className="font-medium text-sm">{p.name}</div>
          <p className="text-xs text-muted-foreground">{[p.type, p.city, p.state].filter(Boolean).join(" · ")}</p>
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Edit</Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => remove(p.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SuggestionsTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("provider_suggestions")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const approve = async (s: any) => {
    const { error: insErr } = await supabase.from("providers").insert({
      name: s.name, type: s.type || "hospital", city: s.city, state: s.state,
      country: s.country, phone: s.phone, email: s.email, website: s.website,
      verified: true, user_id: null,
    });
    if (insErr) return toast({ title: "Approve failed", description: insErr.message, variant: "destructive" });
    await supabase.from("provider_suggestions").update({ status: "approved" }).eq("id", s.id);
    toast({ title: "Approved" });
    load();
  };
  const reject = async (id: string) => {
    await supabase.from("provider_suggestions").update({ status: "rejected" }).eq("id", id);
    load();
  };

  if (loading) return <p className="text-sm text-muted-foreground text-center py-4">Loading…</p>;
  if (!items.length) return <p className="text-sm text-muted-foreground text-center py-4">No pending suggestions.</p>;
  return (
    <div className="space-y-3">
      {items.map((s) => (
        <div key={s.id} className="bg-card rounded-xl border border-border/60 p-3">
          <div className="font-medium text-sm">{s.name}</div>
          <p className="text-xs text-muted-foreground">{[s.type, s.city, s.state, s.country].filter(Boolean).join(" · ")}</p>
          {s.phone && <p className="text-xs text-muted-foreground">{s.phone}</p>}
          {s.notes && <p className="text-xs text-muted-foreground mt-1">{s.notes}</p>}
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={() => approve(s)}>Approve</Button>
            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => reject(s.id)}>Reject</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function UsersTab() {
  const { toast } = useToast();
  const [users, setUsers] = useState<any[]>([]);
  const [adminIds, setAdminIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [{ data: profs }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("user_id, full_name, created_at").order("created_at", { ascending: false }).limit(200),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin"),
    ]);
    setUsers(profs || []);
    setAdminIds(new Set((roles || []).map((r: any) => r.user_id)));
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  if (loading) return <p className="text-sm text-muted-foreground text-center py-4">Loading…</p>;
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">{users.length} users · {adminIds.size} admins</p>
      {users.map((u) => (
        <div key={u.user_id} className="bg-card rounded-xl border border-border/60 p-3 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm font-medium truncate">{u.full_name || "Unnamed"}</div>
            <p className="text-[11px] text-muted-foreground truncate">{u.user_id}</p>
          </div>
          {adminIds.has(u.user_id) ? (
            <Badge>admin</Badge>
          ) : (
            <Badge variant="secondary">user</Badge>
          )}
        </div>
      ))}
      <p className="text-[11px] text-muted-foreground pt-2">Role changes require backend access — contact dev.</p>
    </div>
  );
}

function StatsTab() {
  const [stats, setStats] = useState<{ users?: number; posts?: number; crises?: number; meds?: number; providers?: number }>({});

  useEffect(() => {
    (async () => {
      const [u, p, c, m, pr] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("crisis_logs").select("*", { count: "exact", head: true }),
        supabase.from("medications").select("*", { count: "exact", head: true }),
        supabase.from("providers").select("*", { count: "exact", head: true }).is("user_id", null),
      ]);
      setStats({
        users: u.count ?? 0,
        posts: p.count ?? 0,
        crises: c.count ?? 0,
        meds: m.count ?? 0,
        providers: pr.count ?? 0,
      });
    })();
  }, []);

  const items = [
    { label: "Users", value: stats.users },
    { label: "Blog posts", value: stats.posts },
    { label: "Crisis logs", value: stats.crises },
    { label: "Medications", value: stats.meds },
    { label: "Providers", value: stats.providers },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((s) => (
        <div key={s.label} className="bg-card rounded-xl border border-border/60 p-4">
          <div className="text-2xl font-serif font-semibold">{s.value ?? "—"}</div>
          <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
        </div>
      ))}
      <div className="col-span-2 text-[11px] text-muted-foreground pt-2">
        Traffic and visitor analytics are managed via the Hemora dashboard.
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { isAdmin, loading } = useIsAdmin();
  const [, setLocation] = useLocation();

  if (loading) return <HemoraLoader />;
  if (!isAdmin) {
    return (
      <MobileAppShell hideNav>
        <SubPageHeader title="Admin" back="/dashboard" />
        <div className="px-5 py-12 text-center">
          <p className="text-sm text-muted-foreground">You don't have admin access.</p>
          <Button className="mt-4" onClick={() => setLocation("/dashboard")}>Back to dashboard</Button>
        </div>
      </MobileAppShell>
    );
  }

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Admin" back="/dashboard" />
      <div className="px-5 pb-20">
        <Tabs defaultValue="stats">
          <TabsList className="w-full grid grid-cols-5 mb-4">
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="prov">Provs</TabsTrigger>
            <TabsTrigger value="sugg">Sugg</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          <TabsContent value="stats"><StatsTab /></TabsContent>
          <TabsContent value="blog"><BlogTab /></TabsContent>
          <TabsContent value="prov"><ProvidersTab /></TabsContent>
          <TabsContent value="sugg"><SuggestionsTab /></TabsContent>
          <TabsContent value="users"><UsersTab /></TabsContent>
        </Tabs>
      </div>
    </MobileAppShell>
  );
}