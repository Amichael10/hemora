import { DarkTheme, DefaultTheme, Theme } from "@react-navigation/native";

import { Theme as Hemora } from "@/constants/theme";

export const hemoraLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Hemora.light.primary,
    background: Hemora.light.background,
    card: Hemora.light.surface,
    text: Hemora.light.text,
    border: Hemora.light.tabBorder,
    notification: Hemora.light.primary,
  },
};

export const hemoraDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: Hemora.dark.accent,
    background: Hemora.dark.background,
    card: Hemora.dark.surface,
    text: Hemora.dark.text,
    border: Hemora.dark.tabBorder,
    notification: Hemora.dark.primary,
  },
};
