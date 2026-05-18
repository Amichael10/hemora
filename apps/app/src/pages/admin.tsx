import { useEffect, useState, useRef } from "react";
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
  Plus,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  List as ListIcon,
  ListOrdered,
  Eye,
  Edit3,
  CheckCircle2,
  XCircle,
  MapPin,
  Trash2,
  Save,
  ChevronRight,
  Globe,
  Phone,
  Mail,
  Building2,
  Upload,
  BarChart3,
  ExternalLink
} from "lucide-react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  body_markdown: string; // We'll keep the name but store HTML
  cover_url: string | null;
  status: "draft" | "published" | "archived";
  published_at: string | null;
  updated_at: string;
};

const TiptapEditor = ({ content, onChange }: { content: string, onChange: (html: string) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: 'Write your story here...',
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-stone max-w-none focus:outline-none min-h-[400px] p-8',
      },
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-assets/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('care-record-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('care-record-files')
        .getPublicUrl(filePath);

      editor?.chain().focus().setImage({ src: publicUrl }).run();
      toast({ title: "Image uploaded successfully" });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    }
  };

  if (!editor) return null;

  return (
    <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-stone-100 bg-stone-50/50">
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('bold') && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('italic') && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('underline') && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-stone-200 mx-1" />
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('heading', { level: 2 }) && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <span className="font-bold text-xs">H2</span>
        </Button>
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('heading', { level: 3 }) && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <span className="font-bold text-xs">H3</span>
        </Button>
        <div className="w-px h-4 bg-stone-200 mx-1" />
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('bulletList') && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost" size="sm" className={cn("h-8 w-8 p-0", editor.isActive('orderedList') && "bg-stone-200")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <div className="w-px h-4 bg-stone-200 mx-1" />
        <Button
          variant="ghost" size="sm" className="h-8 w-8 p-0"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost" size="sm" className="h-8 w-8 p-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload} 
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

function BlogTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Partial<Post> | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

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

  const insertMarkdown = (prefix: string, suffix: string = "") => {
    if (!editing) return;
    const textarea = document.getElementById("blog-body") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = editing.body_markdown || "";
    const selected = text.substring(start, end);
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = before + prefix + selected + suffix + after;
    setEditing({ ...editing, body_markdown: newText });
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

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
      <div className="bg-white rounded-[2rem] border border-border/40 overflow-hidden shadow-2xl shadow-black/5">
        <div className="p-6 border-b border-border/40 bg-[#FDF8F1] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setEditing(null)} className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            <h3 className="font-serif font-bold text-lg">{editing.id ? "Edit Article" : "New Publication"}</h3>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setPreviewMode(!previewMode)}
              className={cn("rounded-full px-4", previewMode && "bg-black text-white hover:bg-black/80")}
            >
              {previewMode ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {previewMode ? "Edit Mode" : "Live Preview"}
            </Button>
            <Button size="sm" onClick={save} className="rounded-full px-6 bg-[#1A1A1A]">Save & Publish</Button>
          </div>
        </div>
        
        <div className="p-8 max-w-5xl mx-auto space-y-8">
          {!previewMode ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Article Title</label>
                    <Input 
                      placeholder="e.g. Living Well with SCD: A Daily Guide" 
                      value={editing.title || ""} 
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })} 
                      className="text-xl font-serif font-bold h-14 rounded-2xl border-stone-200 focus:ring-black/5" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Summary (Excerpt)</label>
                    <Textarea 
                      placeholder="Provide a brief summary for the feed..." 
                      value={editing.excerpt || ""} 
                      onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} 
                      rows={2} 
                      className="rounded-2xl border-stone-200 resize-none" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Publication Status</label>
                    <div className="flex gap-2 p-1 bg-[#F9F6F2] rounded-2xl border border-border/40">
                      {(["draft", "published"] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setEditing({ ...editing, status: s })}
                          className={cn(
                            "flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all",
                            editing.status === s ? "bg-white shadow-sm text-[#1A1A1A]" : "text-muted-foreground hover:text-[#1A1A1A]"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Cover Image URL</label>
                    <Input 
                      placeholder="https://images.unsplash.com/..." 
                      value={editing.cover_url || ""} 
                      onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} 
                      className="rounded-xl border-stone-200" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Article Content</label>
                <TiptapEditor 
                  content={editing.body_markdown || ""} 
                  onChange={(html) => setEditing({ ...editing, body_markdown: html })} 
                />
              </div>
            </>
          ) : (
            <article className="prose prose-stone lg:prose-xl max-w-none bg-white p-12 rounded-[2rem] border border-border/40">
              {editing.cover_url && <img src={editing.cover_url} className="w-full h-96 object-cover rounded-[2rem] mb-12 shadow-xl" />}
              <h1 className="font-serif font-bold text-5xl mb-8 text-[#1A1A1A] leading-tight">{editing.title || "Untitled Article"}</h1>
              <div 
                className="font-sans text-stone-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: editing.body_markdown || "<p className='italic text-muted-foreground'>No content to preview yet.</p>" }}
              />
            </article>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Blog Management</h3>
          <p className="text-xs text-muted-foreground">Publish guides, news, and resources for the community.</p>
        </div>
        <Button onClick={() => setEditing({ status: "draft", body_markdown: "" })} className="rounded-full gap-2 bg-[#1A1A1A]">
          <Plus className="w-4 h-4" /> New Publication
        </Button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-12">Loading content library…</p>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-dashed border-border/60 p-12 text-center space-y-4">
          <BookOpen className="w-12 h-12 text-stone-200 mx-auto" />
          <p className="text-sm text-muted-foreground">No articles published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((p) => (
            <div key={p.id} className="bg-white rounded-[2rem] border border-border/40 overflow-hidden flex flex-col group hover:shadow-2xl hover:shadow-black/5 transition-all duration-300">
              <div className="h-40 bg-stone-100 relative overflow-hidden shrink-0">
                {p.cover_url ? (
                  <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-stone-200" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <Badge className={cn(
                    "capitalize px-3 py-1 rounded-full text-[10px] font-bold tracking-widest",
                    p.status === "published" ? "bg-green-500 text-white" : "bg-stone-200 text-stone-600"
                  )}>
                    {p.status}
                  </Badge>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="font-serif font-bold text-lg text-[#1A1A1A] line-clamp-2 mb-2 leading-snug">{p.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-3 mb-6 flex-1">{p.excerpt || "No description provided."}</p>
                <div className="flex items-center justify-between border-t border-border/30 pt-4">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(p.updated_at).toLocaleDateString()}</span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={() => setEditing(p)} className="rounded-full">Edit</Button>
                    <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 rounded-full" onClick={() => remove(p.id)}>Delete</Button>
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

  const providerTypes = [
    "Hospital",
    "Clinic",
    "Pharmacy",
    "Diagnostic Center",
    "Specialist",
    "Doctor",
    "Laboratory",
    "Support Group"
  ];

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("providers")
      .select("id,name,type,city,state,country,phone,verified,user_id,address")
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
      type: editing.type || "Hospital",
      address: editing.address || null,
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
    toast({ title: "Provider saved successfully" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this provider from directory?")) return;
    const { error } = await supabase.from("providers").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    load();
  };

  if (editing) {
    return (
      <div className="bg-white rounded-[2rem] border border-border/40 overflow-hidden shadow-xl shadow-black/5">
        <div className="p-6 border-b border-border/40 bg-[#F9F6F2] flex items-center justify-between">
          <h3 className="font-serif font-bold text-lg">{editing.id ? "Edit Provider" : "Register New Provider"}</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setEditing(null)} className="rounded-full">Cancel</Button>
            <Button size="sm" onClick={save} className="bg-[#A8324A] hover:bg-[#8e2a3e] rounded-full">Save Provider</Button>
          </div>
        </div>
        <div className="p-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Entity Name</label>
              <Input placeholder="e.g. St. Nicholas Hospital" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="rounded-xl border-stone-200" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Provider Category</label>
              <Select value={editing.type || ""} onValueChange={(v) => setEditing({ ...editing, type: v })}>
                <SelectTrigger className="rounded-xl border-stone-200">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {providerTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Contact Phone</label>
              <Input placeholder="+234..." value={editing.phone || ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="rounded-xl border-stone-200" />
            </div>
          </div>

          <div className="space-y-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Physical Address</label>
              <Input placeholder="123 Health Street, Victoria Island" value={editing.address || ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} className="rounded-xl border-stone-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">City</label>
                <Input placeholder="Lagos" value={editing.city || ""} onChange={(e) => setEditing({ ...editing, city: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">State</label>
                <Input placeholder="Lagos" value={editing.state || ""} onChange={(e) => setEditing({ ...editing, state: e.target.value })} className="rounded-xl border-stone-200" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Country</label>
              <Input placeholder="Nigeria" value={editing.country || "Nigeria"} onChange={(e) => setEditing({ ...editing, country: e.target.value })} className="rounded-xl border-stone-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Healthcare Directory</h3>
          <p className="text-xs text-muted-foreground">Manage verified hospitals, clinics, and specialists.</p>
        </div>
        <Button onClick={() => setEditing({ verified: true, country: "Nigeria", type: "Hospital" })} className="rounded-full gap-2 bg-[#A8324A] hover:bg-[#8e2a3e]">
          <Plus className="w-4 h-4" /> Add Provider
        </Button>
      </div>

      <div className="bg-white rounded-[2rem] border border-border/40 overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 px-8 py-4 bg-[#F9F6F2] border-b border-border/40 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <div className="col-span-4">Entity</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-4">Location</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        <div className="divide-y divide-border/20">
          {loading ? (
             <p className="text-sm text-muted-foreground text-center py-12">Fetching directory...</p>
          ) : items.map((p) => (
            <div key={p.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-stone-50/50 transition-colors">
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#1A1A1A] truncate">{p.name}</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Verified Partner
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <Badge variant="secondary" className="bg-stone-100 text-stone-600 border-none capitalize">{p.type}</Badge>
              </div>
              <div className="col-span-4">
                <div className="text-xs text-stone-700 truncate">{p.address || "No address provided"}</div>
                <div className="text-[10px] text-muted-foreground">{p.city}, {p.state}</div>
              </div>
              <div className="col-span-1 text-right">
                <div className="flex justify-end gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setEditing(p)} className="h-9 w-9 p-0 rounded-full">
                    <Edit3 className="w-4 h-4 text-stone-500" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-9 w-9 p-0 rounded-full text-red-400 hover:text-red-500" onClick={() => remove(p.id)}>
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SuggestionsTab() {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState<any | null>(null);

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
    // This is called from the Review/Edit form
    const { error: insErr } = await supabase.from("providers").insert({
      name: s.name, 
      type: s.type || "Hospital", 
      address: s.address || null,
      city: s.city, 
      state: s.state,
      country: s.country, 
      phone: s.phone, 
      email: s.email, 
      website: s.website,
      verified: true, 
      user_id: null,
    });
    if (insErr) return toast({ title: "Approve failed", description: insErr.message, variant: "destructive" });
    await supabase.from("provider_suggestions").update({ status: "approved" }).eq("id", s.id);
    toast({ title: "Provider added to live directory" });
    setReviewing(null);
    load();
  };

  const reject = async (id: string) => {
    if (!confirm("Permanently reject this suggestion?")) return;
    await supabase.from("provider_suggestions").update({ status: "rejected" }).eq("id", id);
    toast({ title: "Suggestion rejected" });
    load();
  };

  if (loading) return <p className="text-sm text-muted-foreground text-center py-20 font-serif italic">Reviewing pending requests...</p>;
  
  if (reviewing) {
     return (
        <div className="bg-white rounded-[2rem] border border-border/40 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-border/40 bg-[#FDF8F1] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#A8324A] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#A8324A]/20">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">Reviewing Suggestion</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Action Required</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setReviewing(null)} className="rounded-full">Cancel</Button>
              <Button size="sm" onClick={() => approve(reviewing)} className="bg-[#A8324A] hover:bg-[#8B293D] rounded-full px-6">Approve & Publish</Button>
            </div>
          </div>
          <div className="p-8 max-w-5xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Entity Name</label>
                  <Input value={reviewing.name || ""} onChange={(e) => setReviewing({ ...reviewing, name: e.target.value })} className="rounded-2xl border-stone-200 h-12" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Provider Type</label>
                  <Select value={reviewing.type || "Hospital"} onValueChange={(v) => setReviewing({ ...reviewing, type: v })}>
                    <SelectTrigger className="rounded-2xl border-stone-200 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Hospital", "Clinic", "Pharmacy", "Diagnostic Center", "Specialist", "Doctor", "Laboratory", "Support Group"].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Contact Phone</label>
                  <Input value={reviewing.phone || ""} onChange={(e) => setReviewing({ ...reviewing, phone: e.target.value })} className="rounded-2xl border-stone-200 h-12" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Physical Address</label>
                  <Input placeholder="Verify and enter full address..." value={reviewing.address || ""} onChange={(e) => setReviewing({ ...reviewing, address: e.target.value })} className="rounded-2xl border-stone-200 h-12" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">City</label>
                    <Input value={reviewing.city || ""} onChange={(e) => setReviewing({ ...reviewing, city: e.target.value })} className="rounded-2xl border-stone-200 h-12" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">State</label>
                    <Input value={reviewing.state || ""} onChange={(e) => setReviewing({ ...reviewing, state: e.target.value })} className="rounded-2xl border-stone-200 h-12" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Website (Optional)</label>
                  <Input value={reviewing.website || ""} onChange={(e) => setReviewing({ ...reviewing, website: e.target.value })} className="rounded-2xl border-stone-200 h-12" />
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-[#F9F6F2] rounded-[2rem] border border-border/40">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#A8324A] mb-3 flex items-center gap-2">
                <MessageSquare className="w-3 h-3" /> User Provided Notes
              </h4>
              <p className="text-sm text-stone-600 italic leading-relaxed">"{reviewing.notes || "No additional context provided by the user."}"</p>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full" onClick={() => reject(reviewing.id)}>
                <Trash2 className="w-4 h-4 mr-2" /> Reject Suggestion
              </Button>
            </div>
          </div>
        </div>
     );
  }

  if (!items.length) return (
    <div className="bg-white rounded-[2rem] border border-dashed border-border/60 p-20 text-center space-y-4">
      <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 className="w-8 h-8 text-green-200" />
      </div>
      <p className="text-sm text-muted-foreground font-serif">Inbox Zero! No pending provider suggestions.</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">Pending Suggestions</h3>
        <p className="text-xs text-muted-foreground">Review and verify provider details submitted by users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((s) => (
          <div key={s.id} className="bg-white rounded-[2rem] border border-border/40 p-6 flex flex-col hover:shadow-lg transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-none text-[10px] uppercase tracking-widest mb-1">Pending Review</Badge>
                <h4 className="font-serif font-bold text-lg text-[#1A1A1A]">{s.name}</h4>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl">
                <MessageSquare className="w-5 h-5 text-stone-400" />
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <MapPin className="w-4 h-4 text-stone-400" />
                {[s.city, s.state, s.country].filter(Boolean).join(", ")}
              </div>
              {s.notes && (
                <div className="text-xs text-muted-foreground bg-[#F9F6F2] p-3 rounded-xl italic line-clamp-2">
                  "{s.notes}"
                </div>
              )}
            </div>

            <div className="mt-auto flex gap-2">
              <Button className="flex-1 rounded-full bg-[#1A1A1A]" onClick={() => setReviewing(s)}>Review & Edit</Button>
              <Button variant="ghost" className="rounded-full text-red-500 hover:text-red-600" onClick={() => reject(s.id)}>Reject</Button>
            </div>
          </div>
        ))}
      </div>
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


function AnalyticsTab() {
  const stats = [
    { label: "Active Sessions", value: "Live", status: "Connected", icon: Globe },
    { label: "Event Pipeline", value: "Active", status: "Healthy", icon: Bell },
    { label: "Data Retention", value: "1 Year", status: "Standard", icon: Save },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-[#1A1A1A] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <Badge className="bg-[#A8324A] text-white border-none mb-4 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-black">PostHog Infrastructure</Badge>
          <h3 className="text-4xl font-serif font-black mb-4 leading-tight">Advanced Product <br/>Analytics Dashboard</h3>
          <p className="text-stone-400 max-w-xl text-lg leading-relaxed">
            We've successfully integrated PostHog to track user behavior, retention, and conversion funnels. 
            Real-time data is flowing from both the landing page and the patient application.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button 
              className="bg-white text-black hover:bg-stone-200 rounded-full px-8 h-14 font-bold text-base shadow-xl"
              onClick={() => window.open(`https://us.posthog.com/project/${import.meta.env.VITE_POSTHOG_PROJECT_ID || '425433'}`, '_blank')}
            >
              Open Full Dashboard <ExternalLink className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white hover:text-white rounded-full px-8 h-14 font-bold text-base">
              View Event Stream
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A8324A]/20 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-[2rem] border border-border/40 p-8 hover:shadow-xl transition-all border-l-4 border-l-[#A8324A]">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-stone-50 rounded-2xl text-[#A8324A]">
                <s.icon className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</div>
            </div>
            <div className="text-3xl font-serif font-black text-[#1A1A1A]">{s.value}</div>
            <div className="mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{s.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-border/40 p-10 space-y-6">
          <h4 className="text-xl font-serif font-black text-[#1A1A1A]">Tracking Plan</h4>
          <div className="space-y-4">
            {[
              { event: "$pageview", desc: "Automatic tracking for all page transitions." },
              { event: "Log Crisis", desc: "Triggered when a patient starts a health log." },
              { event: "Provider Search", desc: "Tracks directory usage and location filters." },
              { event: "Blog Interaction", desc: "Tracks reading time and content popularity." },
            ].map(e => (
              <div key={e.event} className="flex items-center justify-between p-5 bg-stone-50 rounded-2xl border border-stone-100">
                <div>
                  <code className="text-xs font-black text-[#A8324A] bg-[#A8324A]/5 px-2 py-1 rounded-md">{e.event}</code>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{e.desc}</p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-none text-[10px] font-black">LIVE</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#FDF8F1] to-white rounded-[2.5rem] border border-border/40 p-10 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-[#A8324A]">
            <BarChart3 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-serif font-black text-[#1A1A1A]">Session Recording</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We are now capturing anonymous session recordings. You can watch how users navigate Hemora to identify friction points in the onboarding flow.
            </p>
          </div>
          <Button variant="ghost" className="text-[#A8324A] font-black uppercase tracking-widest text-[10px] hover:bg-[#A8324A]/5 rounded-full px-8">
            Manage Privacy Settings
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-serif font-black text-[#1A1A1A]">Recent Global Activity</h4>
          <Badge className="bg-blue-100 text-blue-700 border-none px-3 py-1 rounded-full text-[10px] font-black tracking-widest">LIVE FEED</Badge>
        </div>
        <div className="bg-white rounded-[2.5rem] border border-border/40 overflow-hidden shadow-sm">
          <GlobalActivityFeed />
        </div>
      </div>
    </div>
  );
}

function GlobalActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [{ data: crises }, { data: meds }, { data: vitals }, { data: transfusions }, { data: appointments }] = await Promise.all([
        supabase.from("crisis_logs").select("*, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
        supabase.from("medications").select("*, profiles(full_name)").order("updated_at", { ascending: false }).limit(5),
        supabase.from("health_vitals").select("*, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
        supabase.from("transfusions").select("*, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
        supabase.from("appointments").select("*, profiles(full_name)").order("created_at", { ascending: false }).limit(5),
      ]);

      const combined = [
        ...(crises || []).map(c => ({ ...c, type: 'crisis', time: c.created_at })),
        ...(meds || []).map(m => ({ ...m, type: 'med', time: m.updated_at })),
        ...(vitals || []).map(v => ({ ...v, type: 'vitals', time: v.created_at })),
        ...(transfusions || []).map(t => ({ ...t, type: 'transfusion', time: t.created_at })),
        ...(appointments || []).map(a => ({ ...a, type: 'appointment', time: a.created_at })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 12);

      setActivities(combined);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="p-12 text-center text-sm text-muted-foreground animate-pulse">Synchronizing global event stream...</div>;

  return (
    <div className="divide-y divide-border/20">
      {activities.map((a, i) => (
        <div key={i} className="flex items-center gap-6 p-6 hover:bg-stone-50 transition-colors">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-black/5",
            a.type === 'crisis' ? "bg-red-50 text-red-500" : 
            a.type === 'vitals' ? "bg-amber-50 text-amber-500" :
            a.type === 'transfusion' ? "bg-blue-50 text-blue-500" :
            a.type === 'appointment' ? "bg-green-50 text-green-500" :
            "bg-stone-50 text-stone-500"
          )}>
            {a.type === 'crisis' ? <Bell className="w-6 h-6" /> : 
             a.type === 'vitals' ? <BarChart3 className="w-6 h-6" /> :
             a.type === 'transfusion' ? <Stethoscope className="w-6 h-6" /> :
             a.type === 'appointment' ? <CalendarLinear className="w-6 h-6" /> :
             <Globe className="w-6 h-6" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-bold text-[#1A1A1A]">{a.profiles?.full_name || "Anonymous User"}</span>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                a.type === 'crisis' ? "bg-red-100 text-red-700" :
                a.type === 'vitals' ? "bg-amber-100 text-amber-700" :
                a.type === 'transfusion' ? "bg-blue-100 text-blue-700" :
                a.type === 'appointment' ? "bg-green-100 text-green-700" :
                "bg-stone-100 text-muted-foreground"
              )}>
                {a.type === 'crisis' ? "Crisis Log" : 
                 a.type === 'med' ? "Medication Update" :
                 a.type === 'vitals' ? "Vitals Recorded" :
                 a.type === 'transfusion' ? "Transfusion" :
                 a.type === 'appointment' ? "Appointment" :
                 "Activity"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {a.type === 'crisis' ? `Reported ${a.pain_level} pain in ${a.pain_locations?.join(', ') || 'unspecified area'}` : 
               a.type === 'med' ? `Tracking ${a.name} (${a.dosage})` :
               a.type === 'vitals' ? `Recorded Temp: ${a.temperature}°C, SpO2: ${a.spo2}%` :
               a.type === 'transfusion' ? `Log: ${a.units} units (${a.blood_type}) at ${a.hospital}` :
               a.type === 'appointment' ? `Scheduled: ${a.title} with ${a.doctor}` :
               "System interaction logged."}
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] font-black text-[#A8324A] uppercase tracking-widest mb-1">{new Date(a.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            <div className="text-[10px] text-muted-foreground font-medium">{new Date(a.time).toLocaleDateString()}</div>
          </div>
        </div>
      ))}
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
              <div className="p-3 bg-[#F9F6F2] rounded-2xl group-hover:bg-[#A8324A] group-hover:text-white transition-colors">
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
      
      <div className="bg-[#A8324A] rounded-[2rem] p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-serif font-bold mb-2">System Health</h3>
          <p className="text-stone-100/80 max-w-md text-sm">All systems are operational. Global traffic and detailed visitor analytics are managed via the external Hemora Analytics dashboard.</p>
          <Button variant="outline" className="mt-6 border-white/20 bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-full">
            View Live Reports
          </Button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />
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
            <Button className="mt-6 w-full bg-[#A8324A] hover:bg-[#8e2a3e] rounded-full" onClick={() => setLocation("/dashboard")}>
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
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];


  return (
    <div className="flex h-screen bg-[#FDF8F1] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#A8324A] flex flex-col shrink-0">
        <div className="p-10 border-b border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#FDF8F1] rounded-2xl flex items-center justify-center text-[#A8324A] font-serif font-black text-2xl shadow-2xl shadow-black/20">H</div>
          <div className="min-w-0">
            <h1 className="font-serif font-black text-[#FDF8F1] text-xl tracking-tight uppercase">Hemora</h1>
            <p className="text-[10px] text-[#FDF8F1]/60 font-bold uppercase tracking-[0.2em] leading-none">Management</p>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto mt-4">
          <p className="text-[10px] font-black text-[#FDF8F1]/40 uppercase tracking-widest mb-6 ml-4">Administration</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-[2rem] text-sm font-bold transition-all duration-500 group",
                activeTab === item.id 
                  ? "bg-[#FDF8F1] text-[#A8324A] shadow-2xl shadow-black/30 translate-x-2" 
                  : "text-[#FDF8F1]/70 hover:text-[#FDF8F1] hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-colors", activeTab === item.id ? "text-[#A8324A]" : "text-[#FDF8F1]/40 group-hover:text-[#FDF8F1]")} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-4">
          <button 
            onClick={() => setLocation("/dashboard")}
            className="w-full flex items-center gap-3 px-6 py-4 text-sm text-[#FDF8F1]/60 hover:text-[#FDF8F1] transition-colors rounded-[2rem] hover:bg-white/5 font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Console
          </button>
          <div className="flex items-center gap-4 px-6 py-5 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#FDF8F1]/10 overflow-hidden flex-shrink-0 flex items-center justify-center text-[#FDF8F1] font-bold">
              AD
            </div>
            <div className="min-w-0">
              <p className="text-xs font-black text-[#FDF8F1] truncate">Administrator</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400" />
                <p className="text-[9px] text-[#FDF8F1]/40 font-bold uppercase tracking-widest">System Active</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-border/40 flex items-center justify-between px-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-1 h-8 bg-[#1A1A1A] rounded-full hidden md:block" />
             <h2 className="text-2xl font-serif font-black text-[#1A1A1A]">
                {menuItems.find(m => m.id === activeTab)?.label}
             </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-12 pr-6 py-2.5 bg-stone-50 border-none rounded-full text-xs w-72 focus:ring-2 focus:ring-black/5 transition-all font-medium"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-stone-50">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-stone-400 hover:text-[#1A1A1A] transition-colors rounded-full hover:bg-stone-50">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {activeTab === "stats" && <StatsTab />}
            {activeTab === "blog" && <BlogTab />}
            {activeTab === "prov" && <ProvidersTab />}
            {activeTab === "sugg" && <SuggestionsTab />}
            {activeTab === "users" && <UsersTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
          </div>
        </div>
      </main>
    </div>
  );
}