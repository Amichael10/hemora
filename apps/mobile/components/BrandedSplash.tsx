import { Image, StyleSheet, View } from "react-native";

import { Brand } from "@/constants/theme";

/**
 * Mirrors native splash (cream + logo) so the hand-off from expo-splash-screen feels continuous.
 */
export function BrandedSplash() {
  return (
    <View style={styles.root} accessibilityLabel="Hemora loading">
      <Image source={require("../assets/brand/hemora-logo.png")} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Brand.cream,
  },
  logo: {
    width: 220,
    height: 120,
  },
});
