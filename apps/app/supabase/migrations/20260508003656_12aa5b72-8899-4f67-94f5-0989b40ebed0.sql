ALTER TABLE public.medications
  ADD COLUMN IF NOT EXISTS next_refill_date date;