import { useState, useEffect } from "react";
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
    }
  }, [key, value]);
  return [value, setValue];
}
const AMBULANCE_KEY = "hemora.ambulanceNumber";
const HOSPITAL_CHECKLIST_KEY = "hemora.hospitalChecklist";
const DEFAULT_HOSPITAL_CHECKLIST = [
  { id: "id", label: "Health insurance / ID", description: "Insurance card, ID, or NHIS card" },
  { id: "meds", label: "List of current medications", description: "Include doses and frequency" },
  { id: "allergies", label: "Allergies information", description: "List any allergies or reactions" },
  { id: "tests", label: "Recent test results", description: "Lab results, scans, or reports" },
  { id: "contacts", label: "Emergency contacts", description: "Names and phone numbers" },
  { id: "comfort", label: "Comfort items", description: "Clothes, toiletries, charger, etc." }
];
export {
  AMBULANCE_KEY as A,
  DEFAULT_HOSPITAL_CHECKLIST as D,
  HOSPITAL_CHECKLIST_KEY as H,
  useLocalStorage as u
};
