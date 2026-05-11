CREATE TABLE IF NOT EXISTS public.saved_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  provider_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, provider_id)
);

ALTER TABLE public.saved_providers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own saved providers all"
ON public.saved_providers
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_saved_providers_user ON public.saved_providers(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_providers_provider ON public.saved_providers(provider_id);