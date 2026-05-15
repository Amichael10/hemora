-- Add category column to blog_posts
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS category TEXT;
