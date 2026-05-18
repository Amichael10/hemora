import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota / privacy mode failures
    }
  }, [key, value]);
  return [value, setValue];
}

export const AMBULANCE_KEY = "hemora.ambulanceNumber";
export const HOSPITAL_CHECKLIST_KEY = "hemora.hospitalChecklist";

export const DEFAULT_HOSPITAL_CHECKLIST: { id: string; label: string; description: string }[] = [
  { id: "id", label: "Health insurance / ID", description: "Insurance card, ID, or NHIS card" },
  { id: "meds", label: "List of current medications", description: "Include doses and frequency" },
  { id: "allergies", label: "Allergies information", description: "List any allergies or reactions" },
  { id: "tests", label: "Recent test results", description: "Lab results, scans, or reports" },
  { id: "contacts", label: "Emergency contacts", description: "Names and phone numbers" },
  { id: "comfort", label: "Comfort items", description: "Clothes, toiletries, charger, etc." },
];