-- Medications
ALTER TABLE public.medications
  ADD COLUMN dose TEXT,
  ADD COLUMN reminder_time TEXT,
  ADD COLUMN reminder_enabled BOOLEAN DEFAULT true;

-- Medication logs
ALTER TABLE public.medication_logs
  ADD COLUMN scheduled_at TIMESTAMPTZ DEFAULT now();

-- Crisis logs
ALTER TABLE public.crisis_logs
  ADD COLUMN what_helped JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN hospital_visit BOOLEAN DEFAULT false;
-- Convert triggers from text to jsonb list
ALTER TABLE public.crisis_logs DROP COLUMN triggers;
ALTER TABLE public.crisis_logs ADD COLUMN triggers JSONB DEFAULT '[]'::jsonb;

-- Care records
ALTER TABLE public.care_records
  ADD COLUMN document_title TEXT,
  ADD COLUMN hospital_clinic TEXT,
  ADD COLUMN date_of_record TIMESTAMPTZ;

-- Emergency contacts
ALTER TABLE public.emergency_contacts
  ADD COLUMN full_name TEXT;

-- Providers
ALTER TABLE public.providers
  ADD COLUMN type TEXT DEFAULT 'hospital',
  ADD COLUMN city TEXT,
  ADD COLUMN country TEXT,
  ADD COLUMN services JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN saved BOOLEAN DEFAULT false,
  ADD COLUMN verified BOOLEAN DEFAULT false;

-- Profiles extras
ALTER TABLE public.profiles
  ADD COLUMN gender TEXT,
  ADD COLUMN scd_status TEXT;