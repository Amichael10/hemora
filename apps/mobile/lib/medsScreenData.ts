import type { SupabaseClient } from "@supabase/supabase-js";

import { addDays, isSameLocalDay, startOfWeekMonday } from "@/lib/datetime";

export type MedRoutineRow = {
  id: string;
  name: string;
  dose: string;
  reminderTime: string | null;
  nextRefillDate: string | null;
};

export type WeekBar = { label: string; pct: number };

type LogRow = { medication_id: string; status: string; taken_at: string };

export type MedsScreenPayload = {
  medications: MedRoutineRow[];
  adherencePct: number;
  weekBars: WeekBar[];
  streakDays: number;
  takenThisWeek: number;
  expectedThisWeek: number;
};

type MedRow = {
  id: string;
  name: string;
  dose: string | null;
  reminder_time: string | null;
  next_refill_date: string | null;
  status: string | null;
};

function mapMed(r: MedRow): MedRoutineRow {
  return {
    id: r.id,
    name: r.name,
    dose: r.dose?.trim() || "—",
    reminderTime: r.reminder_time,
    nextRefillDate: r.next_refill_date,
  };
}

function computeStreak(medications: MedRoutineRow[], logs: LogRow[]): number {
  if (medications.length === 0) return 0;
  let streak = 0;
  for (let back = 0; back < 365; back++) {
    const d = new Date();
    d.setDate(d.getDate() - back);
    d.setHours(12, 0, 0, 0);
    const medIds = new Set(medications.map((m) => m.id));
    const takenMeds = new Set(
      logs
        .filter((l) => l.status === "taken" && isSameLocalDay(l.taken_at, d) && medIds.has(l.medication_id))
        .map((l) => l.medication_id)
    );
    const ok = takenMeds.size >= medications.length;
    if (ok) streak++;
    else break;
  }
  return streak;
}

export async function fetchMedsScreen(supabase: SupabaseClient, userId: string): Promise<MedsScreenPayload> {
  const lookback = new Date(Date.now() - 28 * 86400000).toISOString();

  const [medsRes, logsRes] = await Promise.all([
    supabase
      .from("medications")
      .select("id,name,dose,reminder_time,next_refill_date,status")
      .eq("user_id", userId)
      .or("status.eq.ongoing,status.eq.active")
      .order("reminder_time", { ascending: true }),
    supabase
      .from("medication_logs")
      .select("medication_id,status,taken_at")
      .eq("user_id", userId)
      .gte("taken_at", lookback),
  ]);

  const err = medsRes.error?.message || logsRes.error?.message;
  if (err) throw new Error(err);

  const medications = ((medsRes.data ?? []) as MedRow[]).map(mapMed);
  const logs = (logsRes.data ?? []) as LogRow[];
  const medIds = new Set(medications.map((m) => m.id));

  const monday = startOfWeekMonday(new Date());
  const labels = ["M", "T", "W", "T", "F", "S", "S"] as const;
  const weekBars: WeekBar[] = [];
  let takenThisWeek = 0;
  let expectedThisWeek = 0;

  for (let i = 0; i < 7; i++) {
    const day = addDays(monday, i);
    const takenCount = logs.filter(
      (l) => l.status === "taken" && isSameLocalDay(l.taken_at, day) && medIds.has(l.medication_id)
    ).length;
    const expected = medications.length;
    const pct = expected > 0 ? Math.min(100, Math.round((takenCount / expected) * 100)) : 0;
    weekBars.push({ label: labels[i], pct });
    takenThisWeek += takenCount;
    expectedThisWeek += expected;
  }

  const adherencePct =
    expectedThisWeek > 0 ? Math.min(100, Math.round((takenThisWeek / expectedThisWeek) * 100)) : 0;
  const streakDays = computeStreak(medications, logs);

  return {
    medications,
    adherencePct,
    weekBars,
    streakDays,
    takenThisWeek,
    expectedThisWeek,
  };
}
