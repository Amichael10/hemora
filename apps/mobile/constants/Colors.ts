import { Theme } from "@/constants/theme";

/** @deprecated Prefer `Theme` from `@/constants/theme` — kept for older imports */
export default {
  light: {
    text: Theme.light.text,
    background: Theme.light.background,
    tint: Theme.light.tabActive,
    tabIconDefault: Theme.light.tabInactive,
    tabIconSelected: Theme.light.tabActive,
    crisisActive: Theme.light.crisisActive,
    card: Theme.light.surface,
    muted: Theme.light.textMuted,
    border: Theme.light.tabBorder,
  },
  dark: {
    text: Theme.dark.text,
    background: Theme.dark.background,
    tint: Theme.dark.tabActive,
    tabIconDefault: Theme.dark.tabInactive,
    tabIconSelected: Theme.dark.tabActive,
    crisisActive: Theme.dark.crisisActive,
    card: Theme.dark.surface,
    muted: Theme.dark.textMuted,
    border: Theme.dark.tabBorder,
  },
};

export { Theme };
export { Brand } from "@/constants/theme";
