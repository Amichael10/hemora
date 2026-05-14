import { Image, Platform, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/theme";

export default function ModalScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];

  return (
    <View style={[styles.container, { backgroundColor: t.background }]}>
      <Image source={require("../assets/brand/hemora-logo.png")} style={styles.logo} resizeMode="contain" />
      <Text style={[styles.title, { color: t.text }]}>Hemora</Text>
      <Text style={[styles.body, { color: t.textMuted }]}>
        The sickle cell companion for families. Track meds, log crises, keep records, and find care
        that understands the disease.
      </Text>
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
