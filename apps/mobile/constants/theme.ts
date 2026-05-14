/**
 * Protective Crescent — matches `apps/app/src/kindred-theme.css` (light) hex notes.
 */
export const Brand = {
  cream: "#f4ead8",
  creamCard: "#fbf5e7",
  ink: "#17363a",
  teal: "#244e52",
  tealDeep: "#0f2a2d",
  gold: "#c9a35a",
  goldSoft: "#f0e4c8",
  red: "#a8324a",
  redDeep: "#8b2639",
  muted: "#5c6f72",
  border: "#e8dcc4",
  borderDark: "#2a3f42",
} as const;

export const Theme = {
  light: {
    background: Brand.cream,
    surface: Brand.creamCard,
    text: Brand.ink,
    textMuted: Brand.muted,
    primary: Brand.red,
    onPrimary: Brand.creamCard,
    accent: Brand.gold,
    onAccent: Brand.tealDeep,
    teal: Brand.teal,
    tabBar: Brand.creamCard,
    tabBorder: Brand.border,
    crisisActive: Brand.gold,
    tabActive: Brand.red,
    tabInactive: Brand.muted,
  },
  dark: {
    background: Brand.tealDeep,
    surface: "#1a3336",
    text: Brand.creamCard,
    textMuted: "#a8bdbf",
    primary: "#e85d75",
    onPrimary: Brand.creamCard,
    accent: Brand.gold,
    onAccent: Brand.tealDeep,
    teal: "#3d7a80",
    tabBar: "#152a2d",
    tabBorder: Brand.borderDark,
    crisisActive: Brand.gold,
    tabActive: Brand.gold,
    tabInactive: "#8aa3a6",
  },
} as const;

export type ColorSchemeName = "light" | "dark";
