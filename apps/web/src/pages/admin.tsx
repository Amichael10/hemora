import { useEffect, useState } from "react";
import { useLocation } from "wouter";
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
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Pill, 
  Building2, 
  ArrowUpRight, 
  TrendingUp, 
  Activity,
  UserPlus,
  Clock,
  Shield
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

function DashboardTab() {
  const [stats, setStats] = useState<{ 
    users: number; 
    posts: number; 
    crises: number; 
    meds: number; 
    providers: number;
    userGrowth: any[];
    activityData: any[];
    recentActivity: any[];
    regionalData: any[];
  }>({ 
    users: 0, posts: 0, crises: 0, meds: 0, providers: 0,
    userGrowth: [], activityData: [], recentActivity: [], regionalData: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [u, p, c, m, pr, recentUsers, recentPosts] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("crisis_logs").select("*", { count: "exact", head: true }),
        supabase.from("medications").select("*", { count: "exact", head: true }),
        supabase.from("providers").select("*", { count: "exact", head: true }).is("user_id", null),
        supabase.from("profiles").select("full_name, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("blog_posts").select("title, status, updated_at").order("updated_at", { ascending: false }).limit(5),
      ]);

      const growthData = [
        { name: "Jan", users: 12, crisis: 45, meds: 88, spark: [10, 15, 12, 18, 22] },
        { name: "Feb", users: 18, crisis: 52, meds: 104, spark: [18, 22, 20, 25, 28] },
        { name: "Mar", users: 25, crisis: 61, meds: 132, spark: [25, 28, 26, 32, 35] },
        { name: "Apr", users: 32, crisis: 58, meds: 156, spark: [32, 35, 30, 38, 42] },
        { name: "May", users: 45, crisis: 85, meds: 198, spark: [45, 48, 42, 52, 55] },
        { name: "Jun", users: 54, crisis: 92, meds: 245, spark: [54, 58, 52, 62, 65] },
      ];

      const regionalDistribution = [
        { state: "Lagos", count: 124 },
        { state: "Abuja", count: 86 },
        { state: "Kano", count: 42 },
        { state: "Rivers", count: 38 },
        { state: "Oyo", count: 32 },
      ];

      setStats({
        users: u.count ?? 0,
        posts: p.count ?? 0,
        crises: c.count ?? 0,
        meds: m.count ?? 0,
        providers: pr.count ?? 0,
        userGrowth: growthData,
        activityData: [],
        regionalData: regionalDistribution,
        recentActivity: [
          ...(recentUsers?.data?.map(u => ({ type: "user", label: "New user joined", name: u.full_name, date: u.created_at, status: "completed" })) || []),
          ...(recentPosts?.data?.map(p => ({ type: "post", label: "Blog updated", name: p.title, date: p.updated_at, status: "synced" })) || []),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8)
      });
      setLoading(false);
    })();
  }, []);

  const kpis = [
    { label: "Community Size", value: stats.users, icon: Users, color: "text-primary", bg: "bg-primary/5", trend: "+12.5%", sub: "Active members" },
    { label: "Knowledge Base", value: stats.posts, icon: FileText, color: "text-accent", bg: "bg-accent/5", trend: "+4", sub: "Published entries" },
    { label: "Crisis Response", value: stats.crises, icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-500/5", trend: "Alerting", sub: "Logs recorded" },
    { label: "Med Adherence", value: stats.meds, icon: Pill, color: "text-blue-600", bg: "bg-blue-500/5", trend: "Stable", sub: "Units tracked" },
    { label: "Health Network", value: stats.providers, icon: Building2, color: "text-emerald-600", bg: "bg-emerald-500/5", trend: "Verified", sub: "Resource nodes" },
  ];

  if (loading) return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    {[1, 2, 3, 4, 5].map(i => <Card key={i} className="h-40 animate-pulse bg-muted/20 border-none shadow-none" />)}
  </div>;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI Section with modern cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${kpi.bg}`}>
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <Badge variant="outline" className="text-[9px] font-bold border-none bg-muted/50 uppercase tracking-[0.15em] px-2.5 py-0.5">
                  {kpi.trend}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold tracking-tight text-foreground">{kpi.value.toLocaleString()}</div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[1px]">{kpi.label}</p>
                <p className="text-[10px] text-muted-foreground/60 italic">{kpi.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="pb-6 border-b border-border/40 bg-muted/5">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-serif">Community Vitality</CardTitle>
                <CardDescription>Engagement trends across users and healthcare resources</CardDescription>
              </div>
              <div className="flex bg-muted/50 p-1 rounded-xl">
                {['Daily', 'Weekly', 'Monthly'].map((t) => (
                  <Button key={t} variant={t === 'Monthly' ? 'default' : 'ghost'} size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest px-4 rounded-lg">
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] pt-10 px-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.userGrowth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMeds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.4)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))', fontWeight: 700 }}
                />
                <Tooltip 
                  content={<ChartTooltipContent indicator="dot" />}
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorUsers)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="meds" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorMeds)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution Bar Chart */}
        <Card className="border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="pb-6 border-b border-border/40 bg-muted/5">
            <CardTitle className="text-xl font-serif">Regional Reach</CardTitle>
            <CardDescription>Provider density by location</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.regionalData} layout="vertical" margin={{ left: -20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border) / 0.4)" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="state" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 11, fill: 'hsl(var(--foreground))', fontWeight: 600 }}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  {stats.regionalData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advanced Activity Feed */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="pb-4 border-b border-border/40">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-serif">Live Operations</CardTitle>
                <CardDescription>Real-time audit of platform interactions</CardDescription>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Stream
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/30">
              {stats.recentActivity.map((act, i) => (
                <div key={i} className="px-6 py-4 hover:bg-muted/10 transition-all group cursor-default">
                  <div className="flex items-center gap-6">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.type === 'user' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                      {act.type === 'user' ? <UserPlus className="w-5 h-5 text-primary" /> : <FileText className="w-5 h-5 text-accent" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className="text-sm font-bold text-foreground truncate">{act.name || "System"}</p>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{act.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{act.label}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-bold text-foreground mb-0.5">
                        {new Date(act.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(act.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <div className="p-4 bg-muted/5 text-center">
            <Button variant="link" className="text-[10px] font-bold uppercase tracking-[2px] text-primary h-auto p-0">
              Access Full Archive <ArrowUpRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </Card>

        {/* System Health Bento */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-secondary text-secondary-foreground p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[2px] opacity-60">System Status</p>
                <h3 className="font-serif text-lg italic">Operating Optimally</h3>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Database Latency', value: '42ms', status: 'Healthy' },
                { label: 'Uptime (30d)', value: '99.98%', status: 'Stable' },
                { label: 'Sync Status', value: 'Complete', status: 'Healthy' }
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{item.label}</span>
                  <div className="text-right">
                    <p className="text-xs font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-none shadow-sm bg-card p-6 rounded-3xl border border-border/40">
            <h3 className="text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Broadcast', icon: AlertTriangle, bg: 'bg-amber-500/10', text: 'text-amber-600' },
                { label: 'Sync API', icon: Clock, bg: 'bg-blue-500/10', text: 'text-blue-600' },
                { label: 'User Report', icon: Users, bg: 'bg-emerald-500/10', text: 'text-emerald-600' },
                { label: 'Export Data', icon: ArrowUpRight, bg: 'bg-muted', text: 'text-foreground' }
              ].map((action) => (
                <Button key={action.label} variant="outline" className={`h-auto py-4 flex flex-col gap-2 rounded-2xl border-none ${action.bg} hover:brightness-95 transition-all`}>
                  <action.icon className={`w-5 h-5 ${action.text}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{action.label}</span>
                </Button>
              ))}
            </div>
          </Card>
        </div>
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
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="h-display">Restricted Area</h1>
          <p className="body-md">You do not have the necessary privileges to access the Hemora Admin Console. If you believe this is an error, contact your system administrator.</p>
          <Button className="rounded-full px-8 hover-elevate" onClick={() => setLocation("/dashboard")}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="max-w-7xl mx-auto pt-12 pb-24 px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">System Console</span>
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full px-5 hover:shadow-md transition-all" onClick={() => window.location.reload()}>
              <Clock className="w-4 h-4 mr-2" /> Refresh
            </Button>
            <Button size="sm" className="rounded-full px-5 shadow-sm hover:shadow-md transition-all">
              <ArrowUpRight className="w-4 h-4 mr-2" /> Export Logs
            </Button>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-8">
          <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md py-4 border-b border-border/40">
            <TabsList className="bg-muted/40 p-1.5 rounded-2xl h-auto flex flex-wrap sm:inline-flex overflow-x-auto max-w-full justify-start">
              <TabsTrigger value="dashboard" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap">
                Overview
              </TabsTrigger>
              <TabsTrigger value="blog" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap">
                Blog
              </TabsTrigger>
              <TabsTrigger value="prov" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap">
                Providers
              </TabsTrigger>
              <TabsTrigger value="sugg" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap">
                Suggestions
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap">
                Users
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="pt-2">
            <TabsContent value="dashboard" className="outline-none focus:ring-0 animate-in fade-in duration-500">
              <DashboardTab />
            </TabsContent>
            <TabsContent value="blog" className="outline-none focus:ring-0 animate-in fade-in duration-500">
              <div className="max-w-5xl mx-auto"><BlogTab /></div>
            </TabsContent>
            <TabsContent value="prov" className="outline-none focus:ring-0 animate-in fade-in duration-500">
              <div className="max-w-5xl mx-auto"><ProvidersTab /></div>
            </TabsContent>
            <TabsContent value="sugg" className="outline-none focus:ring-0 animate-in fade-in duration-500">
              <div className="max-w-5xl mx-auto"><SuggestionsTab /></div>
            </TabsContent>
            <TabsContent value="users" className="outline-none focus:ring-0 animate-in fade-in duration-500">
              <div className="max-w-5xl mx-auto"><UsersTab /></div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}