ALTER TABLE public.crisis_logs ADD COLUMN IF NOT EXISTS crisis_type TEXT NOT NULL DEFAULT 'pain';
