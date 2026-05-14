import type { SupabaseClient } from "@supabase/supabase-js";

import { localDayKey } from "@/lib/datetime";

export type CrisisTriggerRow = { label: string; count: number };

export type PainSlice = { label: string; count: number; pct: number };

export type CrisisInsightsPayload = {
  year: number;
  totalCrises: number;
  hospitalVisits: number;
  uniqueCrisisDays: number;
  painSlices: PainSlice[];
  triggers: CrisisTriggerRow[];
};

function asStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return [];
}

export async function fetchCrisisInsights(
  supabase: SupabaseClient,
  userId: string,
  year: number
): Promise<CrisisInsightsPayload> {
  const start = `${year}-01-01T00:00:00.000Z`;
  const end = `${year + 1}-01-01T00:00:00.000Z`;

  const { data, error } = await supabase
    .from("crisis_logs")
    .select("occurred_at,pain_level,hospital_visit,triggers")
    .eq("user_id", userId)
    .gte("occurred_at", start)
    .lt("occurred_at", end);

  if (error) throw new Error(error.message);

  const rows = data ?? [];
  const totalCrises = rows.length;
  const hospitalVisits = rows.filter((r: any) => r.hospital_visit === true).length;
  const dayKeys = new Set(
    rows.map((r: any) => {
      try {
        return localDayKey(new Date(r.occurred_at));
      } catch {
        return "";
      }
    })
  );
  dayKeys.delete("");
  const uniqueCrisisDays = dayKeys.size;

  const painCounts = new Map<string, number>();
  for (const r of rows as any[]) {
    const key = (r.pain_level as string)?.trim() || "unspecified";
    painCounts.set(key, (painCounts.get(key) ?? 0) + 1);
  }
  const painSorted = [...painCounts.entries()].sort((a, b) => b[1] - a[1]);
  const painSlices: PainSlice[] =
    totalCrises === 0
      ? []
      : painSorted.map(([label, count]) => ({
          label: label.charAt(0).toUpperCase() + label.slice(1).toLowerCase(),
          count,
          pct: Math.round((count / totalCrises) * 100),
        }));

  const triggerCounts = new Map<string, number>();
  for (const r of rows as any[]) {
    for (const t of asStringArray(r.triggers)) {
      const label = t.trim() || "Unknown";
      triggerCounts.set(label, (triggerCounts.get(label) ?? 0) + 1);
    }
  }
  const triggers: CrisisTriggerRow[] = [...triggerCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([label, count]) => ({ label, count }));

  return {
    year,
    totalCrises,
    hospitalVisits,
    uniqueCrisisDays,
    painSlices,
    triggers,
  };
}
