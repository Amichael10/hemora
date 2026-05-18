const BOTTLE_HYDROXYUREA = require("../assets/images/Bottle Hydroxyurea.png");
const BOTTLE_FOLIC_ACID = require("../assets/images/Bottle Folic Acid.png");
const BOTTLE_ENDARI = require("../assets/images/Bottle Endari.png");
const BOTTLE_ANTIBIOTICS = require("../assets/images/Bottle Anti Biotics.png");
const BOTTLE_HYDR = require("../assets/images/Bottle HYDR.png");

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const BOTTLE_MAP: Array<{ keys: string[]; src: any }> = [
  { keys: ["hydroxyurea", "hydrea", "droxia"], src: BOTTLE_HYDROXYUREA },
  { keys: ["folicacid", "folate"], src: BOTTLE_FOLIC_ACID },
  { keys: ["endari", "lglutamine", "glutamine"], src: BOTTLE_ENDARI },
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
    src: BOTTLE_ANTIBIOTICS,
  },
  { keys: ["hydr"], src: BOTTLE_HYDR },
];

const DEFAULT_BOTTLE = BOTTLE_HYDROXYUREA;

export function bottleForMedication(name?: string | null): any {
  if (!name) return DEFAULT_BOTTLE;
  const n = norm(name);
  for (const entry of BOTTLE_MAP) {
    if (entry.keys.some((k) => n.includes(k))) return entry.src;
  }
  return DEFAULT_BOTTLE;
}
