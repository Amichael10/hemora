import bottleHydroxyurea from "@/assets/images/Bottle Hydroxyurea.png";
import bottleFolicAcid from "@/assets/images/Bottle Folic Acid.png";
import bottleEndari from "@/assets/images/Bottle Endari.png";
import bottleAntibiotics from "@/assets/images/Bottle Anti Biotics.png";
import bottleHydr from "@/assets/images/Bottle HYDR.png";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const BOTTLE_MAP: Array<{ keys: string[]; src: string }> = [
  { keys: ["hydroxyurea", "hydrea", "droxia"], src: bottleHydroxyurea },
  { keys: ["folicacid", "folate"], src: bottleFolicAcid },
  { keys: ["endari", "lglutamine", "glutamine"], src: bottleEndari },
  {
    keys: [
      "antibiotics",
      "antibiotic",
      "penicillin",
      "penv",
      "penvk",
      "amoxicillin",
      "azithromycin",
    ],
    src: bottleAntibiotics,
  },
  { keys: ["hydr"], src: bottleHydr },
];

const DEFAULT_BOTTLE = bottleHydroxyurea;

export function bottleForMedication(name?: string | null): string {
  if (!name) return DEFAULT_BOTTLE;
  const n = norm(name);
  for (const entry of BOTTLE_MAP) {
    if (entry.keys.some((k) => n.includes(k))) return entry.src;
  }
  return DEFAULT_BOTTLE;
}
