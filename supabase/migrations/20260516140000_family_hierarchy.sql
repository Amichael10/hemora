-- Migration: Family Hierarchy Support
-- Description: Adds family_member_id to medical data tables to support multiple profiles per user.

-- 1. Ensure columns exist for scoping
ALTER TABLE IF EXISTS crisis_logs ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS medications ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS care_records ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS vitals_logs ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS transfusion_logs ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS appointments ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;

-- 2. Index the new columns for performance
CREATE INDEX IF NOT EXISTS idx_crisis_logs_family_member_id ON crisis_logs(family_member_id);
CREATE INDEX IF NOT EXISTS idx_medications_family_member_id ON medications(family_member_id);
CREATE INDEX IF NOT EXISTS idx_care_records_family_member_id ON care_records(family_member_id);
CREATE INDEX IF NOT EXISTS idx_vitals_logs_family_member_id ON vitals_logs(family_member_id);
CREATE INDEX IF NOT EXISTS idx_transfusion_logs_family_member_id ON transfusion_logs(family_member_id);
CREATE INDEX IF NOT EXISTS idx_appointments_family_member_id ON appointments(family_member_id);

-- 3. Policy updates (Simple approach: allow if user_id matches or member is in user's family)
-- Existing policies usually check user_id. We'll add profile-aware checks in the app logic for now.
