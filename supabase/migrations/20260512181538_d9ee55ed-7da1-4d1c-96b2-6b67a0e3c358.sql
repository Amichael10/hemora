-- Blog posts table for admin-managed blog
CREATE TABLE public.blog_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  body_markdown text NOT NULL DEFAULT '',
  cover_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','archived')),
  author_id uuid,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_posts_status_published ON public.blog_posts(status, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Anyone (including anon) can read published posts
CREATE POLICY "published posts are public"
ON public.blog_posts FOR SELECT
USING (status = 'published');

-- Admins can do everything
CREATE POLICY "admins manage all blog posts"
ON public.blog_posts FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Allow admins to manage providers (currently only own-row policy exists)
CREATE POLICY "admins manage all providers"
ON public.providers FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all profiles for user management
CREATE POLICY "admins view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for blog cover images (public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "blog images public read"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

CREATE POLICY "admins upload blog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins update blog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "admins delete blog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'blog-images' AND public.has_role(auth.uid(), 'admin'));
