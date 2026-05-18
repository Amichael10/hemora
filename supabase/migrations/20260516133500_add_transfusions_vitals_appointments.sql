-- Add Transfusions, Vitals, and Appointments tables for Hemora
-- Following "Log & Flag" strategy

-- 1) Transfusion Logs
CREATE TABLE IF NOT EXISTS public.transfusion_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  units_count INTEGER NOT NULL DEFAULT 1,
  transfusion_type TEXT NOT NULL DEFAULT 'simple', -- 'simple' or 'exchange'
  hospital_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
  hemoglobin_pre NUMERIC,
  hemoglobin_post NUMERIC,
  reaction_logged BOOLEAN DEFAULT false,
  reaction_details TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.transfusion_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own transfusion all" ON public.transfusion_logs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_transfusion_updated BEFORE UPDATE ON public.transfusion_logs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 2) Vitals Logs (Fever, SPO2, etc)
CREATE TABLE IF NOT EXISTS public.vitals_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  type TEXT NOT NULL, -- 'temperature', 'spo2', 'heart_rate', 'blood_pressure'
  value NUMERIC NOT NULL,
  value_secondary NUMERIC, -- for BP (diastolic)
  unit TEXT, -- 'C', 'F', '%', 'bpm', 'mmHg'
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.vitals_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own vitals all" ON public.vitals_logs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- 3) Appointments
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  appointment_at TIMESTAMPTZ NOT NULL,
  provider_id UUID REFERENCES public.providers(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'scheduled', -- 'scheduled', 'completed', 'missed', 'cancelled'
  reminder_sent BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own appointments all" ON public.appointments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_appointments_updated BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4) Indexes for performance
CREATE INDEX IF NOT EXISTS idx_transfusion_user ON public.transfusion_logs(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_vitals_user ON public.vitals_logs(user_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON public.appointments(user_id, appointment_at);
