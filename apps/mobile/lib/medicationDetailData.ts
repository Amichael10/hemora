import type { SupabaseClient } from "@supabase/supabase-js";

import { formatReminder, formatShortDate } from "@/lib/datetime";

export type MedicationDetailModel = {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  reminderTime: string | null;
  reminderEnabled: boolean;
  status: string;
  startDate: string | null;
  nextRefillDate: string | null;
  refillReminderDays: number | null;
  notes: string | null;
};

export type MedicationDetailPayload = {
  medication: MedicationDetailModel;
  takenThisMonth: number;
  expectedThisMonth: number;
  adherencePct: number;
};

export async function fetchMedicationDetail(
  supabase: SupabaseClient,
  userId: string,
  medicationId: string
): Promise<MedicationDetailPayload | null> {
  const { data: med, error: medErr } = await supabase
    .from("medications")
    .select(
      "id,name,dose,frequency,reminder_time,reminder_enabled,status,start_date,next_refill_date,refill_reminder_days,notes"
    )
    .eq("user_id", userId)
    .eq("id", medicationId)
    .maybeSingle();

  if (medErr) throw new Error(medErr.message);
  if (!med) return null;

  const now = new Date();
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const { data: logs, error: logErr } = await supabase
    .from("medication_logs")
    .select("status,taken_at")
    .eq("user_id", userId)
    .eq("medication_id", medicationId)
    .gte("taken_at", startMonth);

  if (logErr) throw new Error(logErr.message);

  const takenThisMonth = (logs ?? []).filter((l: any) => l.status === "taken").length;
  const dayOfMonth = now.getDate();
  const expectedThisMonth = Math.max(dayOfMonth, 1);
  const adherencePct = Math.min(100, Math.round((takenThisMonth / expectedThisMonth) * 100));

  const m = med as any;
  return {
    medication: {
      id: m.id,
      name: m.name,
      dose: m.dose?.trim() || "—",
      frequency: m.frequency?.trim() || "—",
      reminderTime: m.reminder_time,
      reminderEnabled: m.reminder_enabled !== false,
      status: m.status || "ongoing",
      startDate: m.start_date,
      nextRefillDate: m.next_refill_date,
      refillReminderDays: m.refill_reminder_days ?? null,
      notes: m.notes ?? null,
    },
    takenThisMonth,
    expectedThisMonth,
    adherencePct,
  };
}

export function medicationDetailGrid(m: MedicationDetailModel) {
  return [
    ["DOSE", m.dose],
    ["FREQUENCY", m.frequency],
    ["TIME", formatReminder(m.reminderTime)],
    ["STARTED ON", m.startDate ? formatShortDate(m.startDate) : "—"],
  ] as const;
}
