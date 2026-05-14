import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Stethoscope, 
  MessageSquare,
  ArrowLeft,
  Search,
  Bell,
  Settings,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { HemoraLoader } from "@/components/HemoraLoader";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

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
      <div className="bg-white rounded-[2rem] border border-border/40 overflow-hidden">
        <div className="p-6 border-b border-border/40 bg-[#F9F6F2] flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg">{editing.id ? "Edit Article" : "New Publication"}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(null)}>Discard</Button>
            <Button size="sm" onClick={save}>Save Changes</Button>
          </div>
        </div>
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Title</label>
                <Input placeholder="Enter a compelling title..." value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Slug</label>
                <Input placeholder="article-url-slug" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cover Image</label>
                <Input placeholder="https://unsplash.com/..." value={editing.cover_url || ""} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Status</label>
                <div className="flex gap-2">
                  {(["draft", "published", "archived"] as const).map((s) => (
                    <Button key={s} size="sm" variant={editing.status === s ? "default" : "outline"} onClick={() => setEditing({ ...editing, status: s })} className="rounded-full px-4 capitalize">
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Summary</label>
            <Textarea placeholder="Brief summary for social sharing..." value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} className="rounded-xl border-stone-200" />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Content (Markdown)</label>
            <Textarea placeholder="Write your story..." value={editing.body_markdown || ""} onChange={(e) => setEditing({ ...editing, body_markdown: e.target.value })} rows={15} className="rounded-xl border-stone-200 font-mono text-sm leading-relaxed" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Blog Management</h3>
          <p className="text-xs text-muted-foreground">Manage articles, health guides, and company news.</p>
        </div>
        <Button onClick={() => setEditing({ status: "draft", body_markdown: "" })} className="rounded-full gap-2">
          <Plus className="w-4 h-4" /> New Article
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-12">Loading content library…</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-border/60 p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-stone-200 mx-auto" />
          <p className="text-sm text-muted-foreground">No articles published yet. Start your first draft!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div key={p.id} className="bg-white rounded-3xl border border-border/40 overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-black/5 transition-all">
              <div className="h-32 bg-stone-100 relative overflow-hidden shrink-0">
                {p.cover_url ? (
                  <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-stone-200" />
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <Badge className={cn(
                    "capitalize",
                    p.status === "published" ? "bg-green-500 hover:bg-green-600" : 
                    p.status === "draft" ? "bg-stone-500 hover:bg-stone-600" : "bg-red-500 hover:bg-red-600"
                  )}>
                    {p.status}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-serif font-bold text-base text-[#1A1A1A] line-clamp-2 mb-2">{p.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{p.excerpt || "No summary provided."}</p>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/30">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(p.updated_at).toLocaleDateString()}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(p)}>Edit</Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600" onClick={() => remove(p.id)}>Delete</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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

  if (loading) return <p className="text-sm text-muted-foreground text-center py-12">Loading user directory…</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">User Directory</h3>
          <p className="text-xs text-muted-foreground">{users.length} active users · {adminIds.size} administrators</p>
        </div>
        <Button size="sm" variant="outline" className="rounded-full gap-2">
          <Plus className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border/40 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F9F6F2] border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <div className="col-span-5">User Profile</div>
          <div className="col-span-4">Identifier</div>
          <div className="col-span-2">Access Role</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        <div className="divide-y divide-border/30">
          {users.map((u) => (
            <div key={u.user_id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-stone-50/50 transition-colors">
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-[#1A1A1A] font-bold text-xs uppercase">
                  {(u.full_name || "U")[0]}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#1A1A1A] truncate">{u.full_name || "Anonymous User"}</div>
                  <div className="text-[10px] text-muted-foreground">Joined {new Date(u.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="col-span-4 font-mono text-[10px] text-muted-foreground truncate">{u.user_id}</div>
              <div className="col-span-2">
                {adminIds.has(u.user_id) ? (
                  <Badge className="bg-[#1A1A1A] text-white hover:bg-[#1A1A1A]">Admin</Badge>
                ) : (
                  <Badge variant="secondary" className="bg-stone-100 text-stone-600 border-none">Patient</Badge>
                )}
              </div>
              <div className="col-span-1 text-right">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3 items-start">
        <Bell className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          <strong>Pro-tip:</strong> Role modifications currently require Direct SQL access for security. Please contact the technical lead to promote or demote users.
        </p>
      </div>
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
    { label: "Total Users", value: stats.users, description: "Registered profiles in database", icon: Users },
    { label: "Blog Content", value: stats.posts, description: "Drafts and published articles", icon: BookOpen },
    { label: "Crisis Reports", value: stats.crises, description: "Total recorded health events", icon: Bell },
    { label: "Managed Meds", value: stats.meds, description: "Active prescriptions tracked", icon: Stethoscope },
    { label: "Health Providers", value: stats.providers, description: "Directory entries", icon: Search },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((s) => (
          <div key={s.label} className="bg-white rounded-3xl border border-border/40 p-6 hover:shadow-lg hover:shadow-black/5 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[#F9F6F2] rounded-2xl group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                <s.icon className="w-6 h-6" />
              </div>
              <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-100">+0%</Badge>
            </div>
            <div className="text-4xl font-serif font-bold text-[#1A1A1A] tracking-tight">{s.value ?? "—"}</div>
            <h3 className="text-sm font-semibold text-[#1A1A1A] mt-1">{s.label}</h3>
            <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-[#1A1A1A] rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-serif font-bold mb-2">System Health</h3>
          <p className="text-stone-400 max-w-md text-sm">All systems are operational. Global traffic and detailed visitor analytics are managed via the external Hemora Analytics dashboard.</p>
          <Button variant="outline" className="mt-6 border-stone-700 hover:bg-stone-800 text-white hover:text-white">
            View Live Reports
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800/50 rounded-full blur-3xl -mr-20 -mt-20" />
      </div>
    </div>
  );
}



export default function AdminPage() {
  const { isAdmin, loading } = useIsAdmin();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("stats");

  if (loading) return <HemoraLoader />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDF8F1] px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
            <h1 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2">Restricted Access</h1>
            <p className="text-sm text-muted-foreground">You don't have permission to access the management tools.</p>
            <Button className="mt-6 w-full bg-[#1A1A1A] hover:bg-[#333]" onClick={() => setLocation("/dashboard")}>
              Back to dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "stats", label: "Overview", icon: LayoutDashboard },
    { id: "blog", label: "Blog Posts", icon: BookOpen },
    { id: "prov", label: "Providers", icon: Stethoscope },
    { id: "sugg", label: "Suggestions", icon: MessageSquare },
    { id: "users", label: "User Directory", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#FDF8F1] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border/40 flex flex-col shrink-0">
        <div className="p-6 border-b border-border/40 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white font-bold">H</div>
          <span className="font-serif font-bold text-lg tracking-tight">Hemora Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === item.id 
                  ? "bg-[#1A1A1A] text-white shadow-md shadow-black/10" 
                  : "text-muted-foreground hover:bg-black/5 hover:text-[#1A1A1A]"
              )}
            >
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-muted-foreground/70")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/40 space-y-2">
          <button 
            onClick={() => setLocation("/dashboard")}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit to App
          </button>
          <div className="flex items-center gap-3 px-3 py-4 bg-[#F9F6F2] rounded-2xl border border-border/30">
            <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Admin User</p>
              <p className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">Master Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-border/40 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">
            {menuItems.find(m => m.id === activeTab)?.label}
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-1.5 bg-[#F9F6F2] border-none rounded-full text-sm w-64 focus:ring-1 focus:ring-black/10 transition-all"
              />
            </div>
            <button className="p-2 text-muted-foreground hover:text-[#1A1A1A] relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-[#1A1A1A] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {activeTab === "stats" && <StatsTab />}
            {activeTab === "blog" && <BlogTab />}
            {activeTab === "prov" && <ProvidersTab />}
            {activeTab === "sugg" && <SuggestionsTab />}
            {activeTab === "users" && <UsersTab />}
          </div>
        </div>
      </main>
    </div>
  );
}