
-- Allow seed/public providers (no owner) and add geo fields used by the directory UI
ALTER TABLE public.providers ALTER COLUMN user_id DROP NOT NULL;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS latitude double precision;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS longitude double precision;
ALTER TABLE public.providers ADD COLUMN IF NOT EXISTS website text;

-- Public (seeded) providers are readable by everyone
CREATE POLICY "public providers select"
ON public.providers
FOR SELECT
USING (user_id IS NULL);
