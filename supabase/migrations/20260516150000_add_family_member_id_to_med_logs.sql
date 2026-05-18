-- Migration: Add family_member_id to medication_logs
-- Description: Ensures medication logs are correctly scoped to family members.

ALTER TABLE IF EXISTS medication_logs ADD COLUMN IF NOT EXISTS family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_medication_logs_family_member_id ON medication_logs(family_member_id);

-- Backfill existing logs by joining with medications
UPDATE medication_logs
SET family_member_id = medications.family_member_id
FROM medications
WHERE medication_logs.medication_id = medications.id
AND medication_logs.family_member_id IS NULL;
