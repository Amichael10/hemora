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
  sex: r.sex,
  bloodType: r.blood_type,
  genotype: r.genotype,
  heightCm: r.height_cm,
  weightKg: r.weight_kg,
  allergies: r.allergies,
  conditions: r.conditions,
});
const mapMed = (r: any) => ({
  id: r.id, name: r.name, dose: r.dose, frequency: r.frequency,
  reminderTime: r.reminder_time, reminderEnabled: r.reminder_enabled,
  status: r.status, notes: r.notes,
  refillReminderDays: r.refill_reminder_days ?? null,
  startDate: r.start_date ?? null,
  nextRefillDate: r.next_refill_date ?? null,
  createdAt: r.created_at,
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
  labName: r.lab_name ?? null, fileUrl: r.file_url ?? null, notes: r.notes ?? null,
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
const mapVitals = (r: any) => ({
  id: r.id, type: r.type, value: r.value, unit: r.unit,
  occurredAt: r.occurred_at, notes: r.notes ?? null,
  createdAt: r.created_at,
});
const mapTransfusion = (r: any) => ({
  id: r.id, occurredAt: r.occurred_at, unitsCount: r.units_count ?? 1,
  transfusionType: r.transfusion_type ?? 'simple',
  reactionLogged: r.reaction_logged ?? false,
  reactionDetails: r.reaction_details ?? null,
  hospitalId: r.hospital_id ?? null,
  hemoglobinPre: r.hemoglobin_pre ?? null,
  hemoglobinPost: r.hemoglobin_post ?? null,
  notes: r.notes ?? null,
  createdAt: r.created_at,
});
const mapAppointment = (r: any) => ({
  id: r.id, title: r.title, description: r.description ?? null,
  appointmentAt: r.appointment_at,
  providerId: r.provider_id ?? null,
  status: r.status ?? "scheduled",
  notes: r.notes ?? null,
  createdAt: r.created_at,
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
export const getListVitalsLogsQueryKey = k("vitals-logs");
export const getListTransfusionLogsQueryKey = k("transfusion-logs");
export const getListAppointmentsQueryKey = k("appointments");

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
  useList("medications", mapMed, args, opts, (q) => {
    if (args?.familyMemberId) return q.eq("family_member_id", args.familyMemberId);
    return q;
  });
export const useListMedicationLogs = (args: any, opts?: any) =>
  useList("medication_logs", mapMedLog, args, opts, (q) => {
    if (args?.familyMemberId) return q.eq("family_member_id", args.familyMemberId);
    return q;
  });
export const useListCrisisLogs = (args: any, opts?: any) =>
  useList("crisis_logs", mapCrisis, args, opts, (q) => {
    let query = q.order("occurred_at", { ascending: false });
    if (args?.familyMemberId) query = query.eq("family_member_id", args.familyMemberId);
    return query;
  });
export const useListCareRecords = (args: any, opts?: any) =>
  useList("care_records", mapRecord, args, opts, (q) => {
    if (args?.familyMemberId) return q.eq("family_member_id", args.familyMemberId);
    return q;
  });
export const useListEmergencyContacts = (args: any, opts?: any) =>
  useList("emergency_contacts", mapEC, args, opts);
export const useListVitalsLogs = (args: any, opts?: any) =>
  useList("vitals_logs", mapVitals, args, opts, (q) => {
    let query = q.order("occurred_at", { ascending: false });
    if (args?.familyMemberId) query = query.eq("family_member_id", args.familyMemberId);
    return query;
  });
export const useListTransfusionLogs = (args: any, opts?: any) =>
  useList("transfusion_logs", mapTransfusion, args, opts, (q) => {
    let query = q.order("occurred_at", { ascending: false });
    if (args?.familyMemberId) query = query.eq("family_member_id", args.familyMemberId);
    return query;
  });
export const useListAppointments = (args: any, opts?: any) =>
  useList("appointments", mapAppointment, args, opts, (q) => {
    let query = q.order("appointment_at", { ascending: true });
    if (args?.familyMemberId) query = query.eq("family_member_id", args.familyMemberId);
    return query;
  });
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
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes?.user?.id ?? null;
      let savedIds = new Set<string>();
      if (uid) {
        const { data: savedRows } = await supabase
          .from("saved_providers")
          .select("provider_id")
          .eq("user_id", uid);
        savedIds = new Set((savedRows ?? []).map((r: any) => r.provider_id));
      }
      const { data, error } = await q;
      if (error) throw new ApiError(error.message);
      let rows = (data ?? []).map((r: any) => ({
        ...mapProvider(r),
        saved: savedIds.has(r.id),
      }));
      if (args?.saved) rows = rows.filter((r: any) => r.saved);
      return rows;
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

export const useGetProvider = (id?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!id;
  return useQuery({
    queryKey: opts?.query?.queryKey ?? ["provider", id],
    enabled,
    queryFn: async () => {
      const { data, error } = await (supabase.from("providers") as any)
        .select("*").eq("id", id).maybeSingle();
      if (error) throw new ApiError(error.message);
      if (!data) return null;
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes?.user?.id ?? null;
      let isSaved = false;
      if (uid) {
        const { data: savedRow } = await supabase
          .from("saved_providers")
          .select("id")
          .eq("user_id", uid)
          .eq("provider_id", id)
          .maybeSingle();
        isSaved = !!savedRow;
      }
      return { ...mapProvider(data), saved: isSaved };
    },
  }) as UseQueryResult<any, Error>;
};
export const getGetProviderQueryKey = (id: any) => ["provider", id];

export const useGetDashboardSummary = (arg?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!arg;
  return useQuery({
    queryKey: opts?.query?.queryKey ?? ["dashboard-summary", arg],
    enabled,
    queryFn: async () => {
      const [{ data: meds }, { data: crisis }, { data: logs }, { data: vitals }, { data: transfusions }] = await Promise.all([
        supabase.from("medications").select("*").eq("status", "ongoing").eq("family_member_id", arg).limit(1),
        supabase.from("crisis_logs").select("*").eq("family_member_id", arg).order("occurred_at", { ascending: false }).limit(1),
        supabase.from("medication_logs").select("*").eq("family_member_id", arg).gte("taken_at", new Date(Date.now() - 7 * 86400000).toISOString()),
        supabase.from("vitals_logs").select("*").eq("family_member_id", arg).order("occurred_at", { ascending: false }).limit(5),
        supabase.from("transfusion_logs").select("*").eq("family_member_id", arg).order("occurred_at", { ascending: false }).limit(1),
      ]);
      const taken = (logs ?? []).filter((l: any) => l.status === "taken").length;
      const total = (logs ?? []).length;

      const latestVitals = vitals && vitals.length > 0 ? {
        temp: vitals.find((r: any) => r.type === "temperature")?.value ?? null,
        oxygen: vitals.find((r: any) => r.type === "spo2")?.value ?? null,
        occurredAt: vitals[0]?.occurred_at ?? null,
      } : null;

      return {
        overallAdherencePercent: total ? Math.round((taken / total) * 100) : 0,
        nextMedication: meds?.[0] ? mapMed(meds[0]) : null,
        recentCrisisLog: crisis?.[0] ? mapCrisis(crisis[0]) : null,
        latestVitals,
        latestTransfusion: transfusions?.[0]?.occurred_at ?? null,
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
        user_id, family_member_id: data.familyMemberId,
        name: data.name, dose: data.dose, frequency: data.frequency,
        reminder_time: data.reminderTime, reminder_enabled: data.reminderEnabled ?? true,
        status: data.status ?? "ongoing", notes: data.notes ?? null,
        refill_reminder_days: data.refillReminderDays ?? null,
        start_date: data.startDate ?? null,
        next_refill_date: data.nextRefillDate ?? null,
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
        family_member_id: data.familyMemberId,
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
        user_id, family_member_id: data.familyMemberId,
        pain_level: data.painLevel,
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
        user_id, family_member_id: data.familyMemberId,
        title: data.documentTitle ?? "Care Record",
        document_title: data.documentTitle,
        hospital_clinic: data.hospitalClinic,
        type: data.type ?? "other",
        status: data.status ?? "saved",
        date_of_record: data.dateOfRecord ?? new Date().toISOString(),
        lab_name: data.labName ?? null,
        file_url: data.fileUrl ?? null,
        notes: data.notes ?? null,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["care-records"] });
      return mapRecord(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateVitalsLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("vitals_logs").insert({
        user_id, family_member_id: data.familyMemberId,
        type: data.type, value: data.value, unit: data.unit,
        occurred_at: data.occurredAt ?? new Date().toISOString(),
        notes: data.notes ?? null,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["vitals-logs"] });
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
      return mapVitals(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateTransfusionLog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("transfusion_logs").insert({
        user_id, family_member_id: data.familyMemberId,
        occurred_at: data.occurredAt ?? new Date().toISOString(),
        units_count: data.unitsCount ?? 1,
        transfusion_type: data.transfusionType ?? 'simple',
        reaction_logged: data.reactionLogged ?? false,
        reaction_details: data.reactionDetails ?? null,
        hospital_id: data.hospitalId ?? null,
        hemoglobin_pre: data.hemoglobinPre ?? null,
        hemoglobin_post: data.hemoglobinPost ?? null,
        notes: data.notes ?? null,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["transfusion-logs"] });
      qc.invalidateQueries({ queryKey: ["dashboard-summary"] });
      return mapTransfusion(row);
    },
  }) as UseMutationResult<any, Error, any>;
};

export const useCreateAppointment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("appointments").insert({
        user_id, family_member_id: data.familyMemberId,
        title: data.title, description: data.description ?? null,
        appointment_at: data.appointmentAt,
        provider_id: data.providerId ?? null,
        status: data.status ?? "scheduled",
        notes: data.notes ?? null,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["appointments"] });
      return mapAppointment(row);
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
      if (data.sex !== undefined) patch.sex = data.sex;
      if (data.bloodType !== undefined) patch.blood_type = data.bloodType;
      if (data.genotype !== undefined) patch.genotype = data.genotype;
      if (data.heightCm !== undefined) patch.height_cm = data.heightCm;
      if (data.weightKg !== undefined) patch.weight_kg = data.weightKg;
      if (data.allergies !== undefined) patch.allergies = data.allergies;
      if (data.conditions !== undefined) patch.conditions = data.conditions;
      if (data.setupFor !== undefined) patch.setup_for = data.setupFor;
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
      if (Object.prototype.hasOwnProperty.call(data, "saved")) {
        const user_id = await getUserId();
        if (data.saved) {
          const { error } = await supabase
            .from("saved_providers")
            .upsert({ user_id, provider_id: id }, { onConflict: "user_id,provider_id" });
          if (error) throw new ApiError(error.message);
        } else {
          const { error } = await supabase
            .from("saved_providers")
            .delete()
            .eq("user_id", user_id)
            .eq("provider_id", id);
          if (error) throw new ApiError(error.message);
        }
        const { saved: _omit, ...rest } = data;
        if (Object.keys(rest).length === 0) {
          qc.invalidateQueries({ queryKey: ["providers"] });
          qc.invalidateQueries({ queryKey: ["provider", id] });
          return { id, saved: !!data.saved };
        }
        data = rest;
      }
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

// ---- Generic update/delete factories for owned tables ----
function useUpdateRow(table: string, mapRow: (r: any) => any, invalidateKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: any) => {
      const patch: any = {};
      for (const [k, v] of Object.entries(data)) {
        const key = k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
        patch[key] = v;
      }
      const { data: row, error } = await (supabase.from(table as any) as any)
        .update(patch).eq("id", id).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: [invalidateKey] });
      return mapRow(row);
    },
  }) as UseMutationResult<any, Error, any>;
}

function useDeleteRow(table: string, invalidateKey: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: any) => {
      const { error } = await (supabase.from(table as any) as any).delete().eq("id", id);
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: [invalidateKey] });
      return { id };
    },
  }) as UseMutationResult<any, Error, any>;
}

export const useUpdateMedication = () => useUpdateRow("medications", mapMed, "medications");
export const useDeleteMedication = () => useDeleteRow("medications", "medications");
export const useUpdateCareRecord = () => useUpdateRow("care_records", mapRecord, "care-records");
export const useDeleteCareRecord = () => useDeleteRow("care_records", "care-records");
export const useDeleteCrisisLog = () => useDeleteRow("crisis_logs", "crisis-logs");

export const useCreateEmergencyContact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const user_id = await getUserId();
      const { data: row, error } = await supabase.from("emergency_contacts").insert({
        user_id, name: data.fullName ?? data.name, full_name: data.fullName ?? data.name,
        phone: data.phone, relationship: data.relationship, is_primary: data.isPrimary ?? false,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["emergency-contacts"] });
      return mapEC(row);
    },
  }) as UseMutationResult<any, Error, any>;
};
export const useDeleteEmergencyContact = () => useDeleteRow("emergency_contacts", "emergency-contacts");

// ---- Provider suggestions (admin review) ----
export const useCreateProviderSuggestion = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ data }: any) => {
      const { data: auth } = await supabase.auth.getUser();
      const { data: row, error } = await (supabase.from("provider_suggestions") as any).insert({
        user_id: auth.user?.id ?? null,
        name: data.name, type: data.type ?? "hospital",
        country: data.country ?? null, state: data.state ?? null, city: data.city ?? null,
        phone: data.phone ?? null, email: data.email ?? null, website: data.website ?? null,
        notes: data.notes ?? data.about ?? null,
      }).select().single();
      if (error) throw new ApiError(error.message);
      qc.invalidateQueries({ queryKey: ["provider-suggestions"] });
      return row;
    },
  }) as UseMutationResult<any, Error, any>;
};

// Get single med / record helpers
export const useGetMedication = (id?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!id;
  return useQuery({
    queryKey: ["medication", id],
    enabled,
    queryFn: async () => {
      const { data, error } = await (supabase.from("medications") as any).select("*").eq("id", id).maybeSingle();
      if (error) throw new ApiError(error.message);
      return data ? mapMed(data) : null;
    },
  }) as UseQueryResult<any, Error>;
};
export const useGetCareRecord = (id?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!id;
  return useQuery({
    queryKey: ["care-record", id],
    enabled,
    queryFn: async () => {
      const { data, error } = await (supabase.from("care_records") as any).select("*").eq("id", id).maybeSingle();
      if (error) throw new ApiError(error.message);
      return data ? mapRecord(data) : null;
    },
  }) as UseQueryResult<any, Error>;
};
export const useGetCrisisLog = (id?: any, opts?: any) => {
  const enabled = (opts?.query?.enabled ?? true) && !!id;
  return useQuery({
    queryKey: ["crisis-log", id],
    enabled,
    queryFn: async () => {
      const { data, error } = await (supabase.from("crisis_logs") as any).select("*").eq("id", id).maybeSingle();
      if (error) throw new ApiError(error.message);
      return data ? mapCrisis(data) : null;
    },
  }) as UseQueryResult<any, Error>;
};

// Auth-token / base-url plumbing — no-ops (we use the Supabase client directly)
export type AuthTokenGetter = () => string | Promise<string | null> | null;
export function setBaseUrl(_url: string) {}
export function setAuthTokenGetter(_getter: AuthTokenGetter) {}
