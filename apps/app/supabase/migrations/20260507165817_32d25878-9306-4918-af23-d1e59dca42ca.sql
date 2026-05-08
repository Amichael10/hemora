
-- 1) Provider suggestions: separate table for admin review
CREATE TABLE IF NOT EXISTS public.provider_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  type text DEFAULT 'hospital',
  country text,
  state text,
  city text,
  phone text,
  email text,
  website text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.provider_suggestions ENABLE ROW LEVEL SECURITY;

-- Roles infra
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

DROP POLICY IF EXISTS "anyone signed in can suggest" ON public.provider_suggestions;
CREATE POLICY "anyone signed in can suggest" ON public.provider_suggestions
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

DROP POLICY IF EXISTS "users see own suggestions" ON public.provider_suggestions;
CREATE POLICY "users see own suggestions" ON public.provider_suggestions
  FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "admin manage suggestions" ON public.provider_suggestions;
CREATE POLICY "admin manage suggestions" ON public.provider_suggestions
  FOR ALL USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

DROP POLICY IF EXISTS "users see own roles" ON public.user_roles;
CREATE POLICY "users see own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- 2) care_records: add lab_name and file_url is already present
ALTER TABLE public.care_records ADD COLUMN IF NOT EXISTS lab_name text;

-- 3) Storage bucket for care record files
INSERT INTO storage.buckets (id, name, public)
VALUES ('care-record-files', 'care-record-files', false)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "users read own care files" ON storage.objects;
CREATE POLICY "users read own care files" ON storage.objects
  FOR SELECT USING (bucket_id = 'care-record-files' AND auth.uid()::text = (storage.foldername(name))[1]);
DROP POLICY IF EXISTS "users upload own care files" ON storage.objects;
CREATE POLICY "users upload own care files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'care-record-files' AND auth.uid()::text = (storage.foldername(name))[1]);
DROP POLICY IF EXISTS "users delete own care files" ON storage.objects;
CREATE POLICY "users delete own care files" ON storage.objects
  FOR DELETE USING (bucket_id = 'care-record-files' AND auth.uid()::text = (storage.foldername(name))[1]);
