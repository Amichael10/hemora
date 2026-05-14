import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import {
  Fraunces_400Regular,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from "@expo-google-fonts/fraunces";

/** Loaded in `app/_layout.tsx` — use these names in `fontFamily` styles. */
export const Fonts = {
  serif: "Fraunces_700Bold",
  serifSemi: "Fraunces_600SemiBold",
  serifBody: "Fraunces_400Regular",
  sans: "DMSans_400Regular",
  sansMedium: "DMSans_500Medium",
  sansBold: "DMSans_700Bold",
} as const;

export const fontAssets = {
  Fraunces_400Regular,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
};
