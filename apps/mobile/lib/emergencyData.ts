import type { SupabaseClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type EmergencyContactModel = {
  id: string;
  fullName: string;
  phone: string;
  relationship: string | null;
};

export const AMBULANCE_KEY = "hemora_ambulance_number";
export const HOSPITAL_CHECKLIST_KEY = "hemora_hospital_checklist";

export const DEFAULT_HOSPITAL_CHECKLIST = [
  { id: "id_cards", label: "Hospital ID & Insurance", description: "Essential for admission" },
  { id: "meds", label: "Current Medications", description: "Bring your current bottles" },
  { id: "chargers", label: "Phone Charger", description: "Extra long cable is best" },
  { id: "comfort", label: "Warm Socks & Blanket", description: "Hospitals can be cold" },
  { id: "water", label: "Bottle of Water", description: "Stay hydrated if allowed" },
  { id: "toiletries", label: "Toothbrush & Paste", description: "Basic hygiene kit" },
];

export async function fetchEmergencyData(supabase: SupabaseClient, userId: string) {
  const { data: contacts, error } = await supabase
    .from("emergency_contacts")
    .select("id,full_name,phone,relationship")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const ambulanceNumber = await AsyncStorage.getItem(AMBULANCE_KEY);
  const checklistJson = await AsyncStorage.getItem(HOSPITAL_CHECKLIST_KEY);
  const checkedItems = checklistJson ? JSON.parse(checklistJson) : {};

  return {
    contacts: (contacts ?? []).map((c: any) => ({
      id: c.id,
      fullName: c.full_name,
      phone: c.phone,
      relationship: c.relationship,
    })),
    ambulanceNumber: ambulanceNumber || "112",
    checkedItems,
  };
}

export async function saveAmbulanceNumber(num: string) {
  await AsyncStorage.setItem(AMBULANCE_KEY, num);
}

export async function saveChecklist(checked: Record<string, boolean>) {
  await AsyncStorage.setItem(HOSPITAL_CHECKLIST_KEY, JSON.stringify(checked));
}
