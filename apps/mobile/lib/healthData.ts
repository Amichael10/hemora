import { getSupabase } from "./supabase";

export interface VitalLogData {
  type: "temperature" | "spo2" | "heart_rate" | "blood_pressure" | "hydration";
  value: number;
  value_secondary?: number;
  unit: string;
  notes?: string;
  occurred_at?: string;
}

export interface TransfusionLogData {
  id?: string;
  occurred_at: string;
  units_count: number;
  transfusion_type: "simple" | "exchange";
  hemoglobin_pre?: number;
  hemoglobin_post?: number;
  reaction_logged?: boolean;
  reaction_details?: string;
  notes?: string;
}

export interface AppointmentData {
  title: string;
  description?: string;
  appointment_at: string;
  provider_id?: string;
  status?: "scheduled" | "completed" | "missed" | "cancelled";
  notes?: string;
}

export const createVitalLog = async (userId: string, data: VitalLogData) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await (supabase as any).from("vitals_logs").insert({
    user_id: userId,
    ...data,
  });
  if (error) throw error;
};

export const createTransfusionLog = async (userId: string, data: TransfusionLogData) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await (supabase as any).from("transfusion_logs").insert({
    user_id: userId,
    ...data,
  });
  if (error) throw error;
};

export const createAppointment = async (userId: string, data: AppointmentData) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await (supabase as any).from("appointments").insert({
    user_id: userId,
    ...data,
  });
  if (error) throw error;
};

export const fetchAppointments = async (userId: string) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await (supabase as any)
    .from("appointments")
    .select("*, providers(name)")
    .eq("user_id", userId)
    .order("appointment_at", { ascending: true });
  if (error) throw error;
  return data;
};

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  type: string;
  services: string[];
  verified: boolean;
  saved?: boolean;
}

export const fetchProviders = async () => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await (supabase as any)
    .from("providers")
    .select("*")
    .order("name", { ascending: true });
  if (error) throw error;
  return data as Provider[];
};

export interface SuggestionData {
  name: string;
  type?: string;
  phone?: string;
  email?: string;
  website?: string;
  notes?: string;
}

export const suggestProvider = async (userId: string, data: SuggestionData) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await (supabase as any).from("provider_suggestions").insert({
    user_id: userId,
    ...data,
    status: "pending",
  });
  if (error) throw error;
};

export const fetchTransfusions = async (userId: string) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await (supabase as any)
    .from("transfusion_logs")
    .select("*")
    .eq("user_id", userId)
    .order("occurred_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const fetchTransfusionById = async (id: string) => {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await (supabase as any)
    .from("transfusion_logs")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
};
