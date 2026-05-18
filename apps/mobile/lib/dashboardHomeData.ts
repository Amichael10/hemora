import type { SupabaseClient } from "@supabase/supabase-js";

export type DashboardMedication = {
  id: string;
  name: string;
  dose: string;
  reminderTime: string | null;
  status: string | null;
};

export type DashboardLog = {
  medicationId: string;
  status: string;
  takenAt: string;
};

export type DashboardCrisis = {
  occurredAt: string;
  painLevel: string;
  painLocations: string[];
};

export type DashboardProfile = {
  fullName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  genotype: string | null;
  country: string | null;
  setupFor: string | null;
  avatarUrl: string | null;
};

export type DashboardAppointment = {
  id: string;
  title: string;
  appointmentAt: string;
  status: string;
};

export type DashboardHomePayload = {
  medications: DashboardMedication[];
  logs: DashboardLog[];
  latestCrisis: DashboardCrisis | null;
  recordCount: number;
  profile: DashboardProfile | null;
  nextAppointments: DashboardAppointment[];
  latestTransfusion: string | null;
  latestVitals: {
    temp: number | null;
    oxygen: number | null;
    occurredAt: string | null;
  } | null;
};

function mapMedicationRow(r: {
  id: string;
  name: string;
  dose: string | null;
  reminder_time: string | null;
  status: string | null;
}): DashboardMedication {
  return {
    id: r.id,
    name: r.name,
    dose: r.dose?.trim() || "—",
    reminderTime: r.reminder_time,
    status: r.status,
  };
}

export async function fetchDashboardHome(
  supabase: SupabaseClient,
  userId: string
): Promise<DashboardHomePayload> {
  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();

  const [medsRes, logsRes, crisisRes, countRes, profileRes, apptsRes, transfusionRes, vitalsRes] =
    await Promise.all([
      supabase
        .from("medications")
        .select("id,name,dose,reminder_time,status")
        .eq("user_id", userId)
        .or("status.eq.ongoing,status.eq.active")
        .order("reminder_time", { ascending: true }),
      supabase
        .from("medication_logs")
        .select("medication_id,status,taken_at")
        .eq("user_id", userId)
        .gte("taken_at", weekAgo),
      supabase
        .from("crisis_logs")
        .select("occurred_at,pain_level,pain_locations")
        .eq("user_id", userId)
        .order("occurred_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase.from("care_records").select("id", { count: "exact", head: true }).eq("user_id", userId),
      supabase
        .from("profiles")
        .select("full_name,date_of_birth,gender,genotype,country,setup_for,avatar_url")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase
        .from("appointments")
        .select("id,title,appointment_at,status")
        .eq("user_id", userId)
        .gte("appointment_at", new Date().toISOString())
        .order("appointment_at", { ascending: true })
        .limit(3),
      supabase
        .from("transfusion_logs")
        .select("occurred_at")
        .eq("user_id", userId)
        .order("occurred_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
      supabase
        .from("vitals_logs")
        .select("type,value,occurred_at")
        .eq("user_id", userId)
        .order("occurred_at", { ascending: false })
        .limit(5),
    ]);

  const err =
    medsRes.error?.message ||
    logsRes.error?.message ||
    crisisRes.error?.message ||
    countRes.error?.message ||
    profileRes.error?.message ||
    apptsRes.error?.message ||
    transfusionRes.error?.message ||
    vitalsRes.error?.message;
  if (err) throw new Error(err);

  type MedRow = {
    id: string;
    name: string;
    dose: string | null;
    reminder_time: string | null;
    status: string | null;
  };
  type LogRow = { medication_id: string; status: string; taken_at: string };
  type CrisisRow = {
    occurred_at: string;
    pain_level: string;
    pain_locations: unknown;
  };

  const medications = ((medsRes.data ?? []) as MedRow[]).map(mapMedicationRow);
  const logs: DashboardLog[] = ((logsRes.data ?? []) as LogRow[]).map((r) => ({
    medicationId: r.medication_id,
    status: r.status,
    takenAt: r.taken_at,
  }));

  let latestCrisis: DashboardCrisis | null = null;
  if (crisisRes.data) {
    const c = crisisRes.data as CrisisRow;
    latestCrisis = {
      occurredAt: c.occurred_at,
      painLevel: c.pain_level,
      painLocations: Array.isArray(c.pain_locations) ? (c.pain_locations as string[]) : [],
    };
  }

  const nextAppointments: DashboardAppointment[] = (apptsRes.data ?? []).map((r: any) => ({
    id: r.id,
    title: r.title,
    appointmentAt: r.appointment_at,
    status: r.status,
  }));

  let latestVitals: DashboardHomePayload["latestVitals"] = null;
  if (vitalsRes.data && vitalsRes.data.length > 0) {
    const tempRow = vitalsRes.data.find((r: any) => r.type === "temperature");
    const oxyRow = vitalsRes.data.find((r: any) => r.type === "spo2");
    latestVitals = {
      temp: tempRow?.value ?? null,
      oxygen: oxyRow?.value ?? null,
      occurredAt: vitalsRes.data[0]?.occurred_at ?? null,
    };
  }

  return {
    medications,
    logs,
    latestCrisis,
    recordCount: countRes.count ?? 0,
    profile: profileRes.data ? {
      fullName: profileRes.data.full_name,
      dateOfBirth: profileRes.data.date_of_birth,
      gender: profileRes.data.gender,
      genotype: profileRes.data.genotype,
      country: profileRes.data.country,
      setupFor: profileRes.data.setup_for,
      avatarUrl: profileRes.data.avatar_url,
    } : null,
    nextAppointments,
    latestTransfusion: (transfusionRes.data as any)?.occurred_at ?? null,
    latestVitals,
  };
}

export async function insertMedicationLog(
  supabase: SupabaseClient,
  userId: string,
  medicationId: string,
  status: "taken" | "skipped" | "missed"
): Promise<{ error: string | null }> {
  const now = new Date().toISOString();
  const { error } = await supabase.from("medication_logs").insert({
    user_id: userId,
    medication_id: medicationId,
    status,
    taken_at: now,
    scheduled_at: now,
  });
  return { error: error?.message ?? null };
}

export async function insertMedicationLogTaken(
  supabase: SupabaseClient,
  userId: string,
  medicationId: string
): Promise<{ error: string | null }> {
  return insertMedicationLog(supabase, userId, medicationId, "taken");
}
