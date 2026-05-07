/**
 * Real Supabase-backed implementation of the original `@workspace/api-client-react`.
 *
 * Maps the snake_case Supabase columns to the camelCase shapes the Kindred UI expects.
 */
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

// ---- Enums (string-literal style; pages use `Foo.BAR`) ----
export const CrisisLogPainLevel = { mild: "mild", moderate: "moderate", severe: "severe", worst: "worst" } as const;
export type CrisisLogPainLevel = (typeof CrisisLogPainLevel)[keyof typeof CrisisLogPainLevel];

export const CreateCareRecordBodyType = { lab: "lab", imaging: "imaging", visit: "visit", other: "other" } as const;
export type CreateCareRecordBodyType = (typeof CreateCareRecordBodyType)[keyof typeof CreateCareRecordBodyType];

export const CreateCareRecordBodyStatus = { pending: "pending", completed: "completed", saved: "saved" } as const;
export type CreateCareRecordBodyStatus = (typeof CreateCareRecordBodyStatus)[keyof typeof CreateCareRecordBodyStatus];

export const CreateMedicationBodyStatus = { ongoing: "ongoing", active: "active", paused: "paused", archived: "archived" } as const;
export type CreateMedicationBodyStatus = (typeof CreateMedicationBodyStatus)[keyof typeof CreateMedicationBodyStatus];

export const CreateMedicationLogBodyStatus = { taken: "taken", skipped: "skipped", missed: "missed" } as const;
export type CreateMedicationLogBodyStatus = (typeof CreateMedicationLogBodyStatus)[keyof typeof CreateMedicationLogBodyStatus];

export const CreateProfileBodySetupFor = {
  myself: "myself",
  my_child: "my_child",
  someone_i_care_for: "someone_i_care_for",
  partner_and_i: "partner_and_i",
} as const;
export type CreateProfileBodySetupFor = (typeof CreateProfileBodySetupFor)[keyof typeof CreateProfileBodySetupFor];

export type CreateProviderBody = any;
export type ListProvidersParams = any;

// ---- Field mappers ----
const mapProfile = (r: any) => r && ({
  id: r.id,
  fullName: r.full_name ?? "",
  setupFor: r.setup_for,
  country: r.country,
  state: r.state,
  dateOfBirth: r.date_of_birth,
  gender: r.gender,
  scdStatus: r.scd_status,
});
const mapMed = (r: any) => ({
  id: r.id, name: r.name, dose: r.dose, frequency: r.frequency,
  reminderTime: r.reminder_time, reminderEnabled: r.reminder_enabled,
  status: r.status, notes: r.notes,
});
const mapMedLog = (r: any) => ({
  id: r.id, medicationId: r.medication_id, status: r.status,
  scheduledAt: r.scheduled_at ?? r.taken_at, takenAt: r.taken_at,
});
const mapCrisis = (r: any) => ({
  id: r.id, occurredAt: r.occurred_at, painLevel: r.pain_level,
  painLocations: r.pain_locations ?? [], triggers: r.triggers ?? [],
  whatHelped: r.what_helped ?? [], hospitalVisit: r.hospital_visit ?? false,
});
const mapRecord = (r: any) => ({
  id: r.id, documentTitle: r.document_title, hospitalClinic: r.hospital_clinic,
  type: r.type, status: r.status, dateOfRecord: r.date_of_record,
});
const mapProvider = (r: any) => ({
  id: r.id, name: r.name, type: r.type, specialty: r.specialty,
  hospital: r.hospital, phone: r.phone, email: r.email, address: r.address,
  city: r.city, state: r.state, country: r.country,
  website: r.website ?? null,
  latitude: r.latitude ?? null, longitude: r.longitude ?? null,
  services: r.services ?? [], saved: r.saved ?? false, verified: r.verified ?? false,
});
const mapEC = (r: any) => ({
  id: r.id, fullName: r.full_name ?? r.name, name: r.name,
  phone: r.phone, relationship: r.relationship,
});

// ---- Query-key helpers ----
const k = (name: string) => (...args: any[]) => [name, ...args];
export const getListCrisisLogsQueryKey = k("crisis-logs");
export const getListMedicationsQueryKey = k("medications");
export const getListMedicationLogsQueryKey = k("medication-logs");
export const getListCareRecordsQueryKey = k("care-records");
export const getListProvidersQueryKey = k("providers");
export const getListEmergencyContactsQueryKey = k("emergency-contacts");
export const getGetProfileQueryKey = k("profile");
export const getGetDashboardSummaryQueryKey = k("dashboard-summary");

// ---- Profile direct fetch ----
export async function getProfileByUser(userId: string): Promise<any> {
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw new ApiError(error.message, 500);
  if (!data) throw new ApiError("Profile not found", 404);
  return mapProfile(data);
}

// ---- Generic list/get hook factories ----
function useList<T>(table: string, mapRow: (r: any) => T, args: any, opts: any, extraFilter?: (q: any) => any) {
  const enabled = opts?.query?.enabled ?? true;
  const queryKey = opts?.query?.queryKey ?? [table, args];
  return useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      let q: any = (supabase.from(table as any) as any).select("*").order("created_at", { ascending: false });
      if (extraFilter) q = extraFilter(q);
      const { data, error } = await q;
      if (error) throw new ApiError(error.message);
      return (data ?? []).map(mapRow);
    },
  }) as UseQueryResult<T[], Error>;
}

// ---- Lists ----
export const useListMedications = (args: any, opts?: any) =>
  useList("medications", mapMed, args, opts);
export const useListMedicationLogs = (args: any, opts?: any) =>
  useList("medication_logs", mapMedLog, args, opts);
export const useListCrisisLogs = (args: any, opts?: any) =>
  useList("crisis_logs", mapCrisis, args, opts, (q) => q.order("occurred_at", { ascending: false }));
export const useListCareRecords = (args: any, opts?: any) =>
  useList("care_records", mapRecord, args, opts);
export const useListEmergencyContacts = (args: any, opts?: any) =>
  useList("emergency_contacts", mapEC, args, opts);
export const useListProviders = (args: any, opts?: any) => {
  const enabled = opts?.query?.enabled ?? true;
  const queryKey = opts?.query?.queryKey ?? ["providers", args];
  return useQuery({
    queryKey,
    enabled,
    queryFn: async () => {
      let q: any = supabase.from("providers").select("*");
      if (args?.country) q = q.eq("country", args.country);
      if (args?.state) q = q.eq("state", args.state);
      if (args?.type) q = q.eq("type", args.type);
      if (args?.saved) q = q.eq("saved", true);
      const { data, error } = await q;
      if (error) throw new ApiError(error.message);
      return (data ?? []).map(mapProvider);
    },
  }) as UseQueryResult<any[], Error>;
};

// ---- Single profile / dashboard ----
export const useGetProfile = (id?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!id;
  return useQuery({
    queryKey: opts?.query?.queryKey ?? ["profile", id],
    enabled,
    queryFn: async () => {
      const { data, error } = await (supabase.from("profiles") as any).select("*").eq("id", id).maybeSingle();
      if (error) throw new ApiError(error.message);
      return mapProfile(data);
    },
  }) as UseQueryResult<any, Error>;
};

export const useGetDashboardSummary = (arg?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!arg;
  return useQuery({
    queryKey: opts?.query?.queryKey ?? ["dashboard-summary", arg],
    enabled,
    queryFn: async () => {
      const [{ data: meds }, { data: crisis }, { data: logs }] = await Promise.all([
        supabase.from("medications").select("*").eq("status", "ongoing").limit(1),
        supabase.from("crisis_logs").select("*").order("occurred_at", { ascending: false }).limit(1),
        supabase.from("medication_logs").select("*").gte("taken_at", new Date(Date.now() - 7 * 86400000).toISOString()),
      ]);
      const taken = (logs ?? []).filter((l: any) => l.status === "taken").length;
      const total = (logs ?? []).length;
      return {
        overallAdherencePercent: total ? Math.round((taken / total) * 100) : 0,
        nextMedication: meds?.[0] ? mapMed(meds[0]) : null,
        recentCrisisLog: crisis?.[0] ? mapCrisis(crisis[0]) : null,
      };
    },
  }) as UseQueryResult<any, Error>;
};

// ---- Mutations ----
async function getUserId(): Promise<string> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) throw new ApiError("Not signed in", 401);
  return data.user.id;
}

export const useCreateMedication = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("medications").insert({
        user_id, name: data.name, dose: data.dose, frequency: data.frequency,
        reminder_time: data.reminderTime, reminder_enabled: data.reminderEnabled ?? true,
        status: data.status ?? "ongoing",
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["medications"] });
      return mapMed(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateMedicationLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("medication_logs").insert({
        user_id, medication_id: data.medicationId,
        status: data.status ?? "taken",
        scheduled_at: data.scheduledAt ?? new Date().toISOString(),
        taken_at: data.scheduledAt ?? new Date().toISOString(),
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["medication-logs"] });
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
      return mapMedLog(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateCrisisLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("crisis_logs").insert({
        user_id, pain_level: data.painLevel,
        pain_locations: data.painLocations ?? [],
        triggers: data.triggers ?? [],
        what_helped: data.whatHelped ?? [],
        hospital_visit: data.hospitalVisit ?? false,
        occurred_at: data.occurredAt ?? new Date().toISOString(),
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["crisis-logs"] });
      return mapCrisis(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateCareRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("care_records").insert({
        user_id,
        title: data.documentTitle ?? "Care Record",
        document_title: data.documentTitle,
        hospital_clinic: data.hospitalClinic,
        type: data.type ?? "other",
        status: data.status ?? "saved",
        date_of_record: data.dateOfRecord ?? new Date().toISOString(),
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["care-records"] });
      return mapRecord(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = data.supabaseUserId ?? (await getUserId());
      // Profile may already exist via trigger — upsert by user_id
      const { data: row, error } = await supabase.from("profiles").upsert({
        user_id,
        full_name: data.fullName,
        setup_for: data.setupFor,
        country: data.country,
        state: data.state,
        date_of_birth: data.dateOfBirth || null,
        gender: data.gender,
        scd_status: data.scdStatus,
      }, { onConflict: "user_id" }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["profile"] });
      return mapProfile(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: any) => {
      const patch: any = {};
      if (data.fullName !== undefined) patch.full_name = data.fullName;
      if (data.country !== undefined) patch.country = data.country;
      if (data.state !== undefined) patch.state = data.state;
      if (data.gender !== undefined) patch.gender = data.gender;
      if (data.scdStatus !== undefined) patch.scd_status = data.scdStatus;
      if (data.dateOfBirth !== undefined) patch.date_of_birth = data.dateOfBirth;
      const { data: row, error } = await supabase.from("profiles").update(patch).eq("id", id).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["profile"] });
      return mapProfile(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateProvider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await (supabase.from("providers") as any).insert({
        user_id, name: data.name, type: data.type ?? "hospital",
        specialty: data.specialty, hospital: data.hospital,
        phone: data.phone, email: data.email, address: data.address,
        city: data.city, state: data.state, country: data.country,
        services: data.services ?? [], saved: data.saved ?? false,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["providers"] });
      return mapProvider(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useUpdateProvider = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: any) => {
      const patch: any = {};
      for (const [k, v] of Object.entries(data)) {
        const key = k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
        patch[key] = v;
      }
      const { data: row, error } = await supabase.from("providers").update(patch).eq("id", id).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["providers"] });
      return mapProvider(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

// Auth-token / base-url plumbing — no-ops (we use the Supabase client directly)
export type AuthTokenGetter = () => string | Promise<string | null> | null;
export function setBaseUrl(_url: string) {}
export function setAuthTokenGetter(_getter: AuthTokenGetter) {}
