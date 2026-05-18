import type { SupabaseClient } from "@supabase/supabase-js";

import { localDayKey } from "@/lib/datetime";

export type CrisisLogRow = {
  id: string;
  occurredAt: string;
  crisisType: string;
  painLevel: string;
  painLocations: string[];
  triggers: string[];
  whatHelped: string[];
  hospitalVisit: boolean;
};

function asStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return [];
}

function mapCrisisRow(r: Record<string, unknown>): CrisisLogRow {
  return {
    id: String(r.id),
    occurredAt: String(r.occurred_at),
    crisisType: String(r.crisis_type ?? "pain"),
    painLevel: String(r.pain_level ?? "").trim() || "unspecified",
    painLocations: asStringArray(r.pain_locations),
    triggers: asStringArray(r.triggers),
    whatHelped: asStringArray(r.what_helped),
    hospitalVisit: r.hospital_visit === true,
  };
}

/** For body illustration (Male vs Female paths); ignores errors / RLS. */
export async function fetchProfileGender(supabase: SupabaseClient, userId: string): Promise<string | null> {
  const { data, error } = await supabase.from("profiles").select("gender").eq("user_id", userId).maybeSingle();
  if (error) return null;
  const g = (data as { gender?: string | null } | null)?.gender;
  return typeof g === "string" && g.trim() ? g.trim() : null;
}

export async function fetchRecentCrisisLogs(
  supabase: SupabaseClient,
  userId: string,
  limit = 50
): Promise<CrisisLogRow[]> {
  const { data, error } = await supabase
    .from("crisis_logs")
    .select("id,occurred_at,crisis_type,pain_level,pain_locations,triggers,what_helped,hospital_visit")
    .eq("user_id", userId)
    .order("occurred_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => mapCrisisRow(r as Record<string, unknown>));
}

export async function fetchCrisisLogById(
  supabase: SupabaseClient,
  userId: string,
  id: string
): Promise<CrisisLogRow | null> {
  const { data, error } = await supabase
    .from("crisis_logs")
    .select("id,occurred_at,crisis_type,pain_level,pain_locations,triggers,what_helped,hospital_visit")
    .eq("user_id", userId)
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapCrisisRow(data as Record<string, unknown>);
}

export type CreateCrisisLogInput = {
  crisisType: string;
  painLevel: string;
  painLocations: string[];
  triggers: string[];
  whatHelped: string[];
  hospitalVisit: boolean;
  occurredAt?: string;
};

export async function insertCrisisLog(
  supabase: SupabaseClient,
  userId: string,
  input: CreateCrisisLogInput
): Promise<CrisisLogRow> {
  const { data, error } = await supabase
    .from("crisis_logs")
    .insert({
      user_id: userId,
      crisis_type: input.crisisType,
      pain_level: input.painLevel,
      pain_locations: input.painLocations,
      triggers: input.triggers,
      what_helped: input.whatHelped,
      hospital_visit: input.hospitalVisit,
      occurred_at: input.occurredAt ?? new Date().toISOString(),
    })
    .select("id,occurred_at,crisis_type,pain_level,pain_locations,triggers,what_helped,hospital_visit")
    .single();

  if (error) throw new Error(error.message);
  return mapCrisisRow(data as Record<string, unknown>);
}

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
