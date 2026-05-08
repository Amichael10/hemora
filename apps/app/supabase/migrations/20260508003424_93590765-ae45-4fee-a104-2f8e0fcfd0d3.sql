ALTER TABLE public.medications
  ADD COLUMN IF NOT EXISTS refill_reminder_days integer,
  ADD COLUMN IF NOT EXISTS start_date date;