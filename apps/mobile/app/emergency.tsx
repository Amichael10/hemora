import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AltArrowLeftLinear } from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle, HeartPulse, Pill, Phone } from "lucide-react-native";

/**
 * Prototype “action plan” screen — mirrors the web `/emergency` intent from the Crisis hub hero.
 * Replace copy and steps with your clinical content when engineering wires the real flow.
 */
export default function EmergencyScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];

  const steps = [
    { Icon: HeartPulse, title: "Stay calm", body: "Sit or lie down in a safe place. Slow breathing helps your body respond." },
    { Icon: Pill, title: "Follow your care plan", body: "Take pain medication only as prescribed. If unsure, call your care team." },
    { Icon: Phone, title: "Know when to call", body: "If pain is sudden and severe, or you have chest pain, trouble breathing, or fainting, seek emergency care." },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [styles.backBtn, { opacity: pressed ? 0.7 : 1 }]}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <AltArrowLeftLinear color={t.teal} size={22} />
          </Pressable>
          <Text style={[styles.topTitle, { color: t.text, fontFamily: Fonts.serifSemi }]}>Action plan</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={["#6a1d2c", "#3a0d18"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroInnerBorder} />
            <AlertTriangle color="#f1cf86" size={28} style={{ marginBottom: 10 }} />
            <Text style={[styles.heroTitle, { fontFamily: Fonts.serifSemi }]}>In a crisis?</Text>
            <Text style={styles.heroSub}>
              This is a UI prototype. Your clinical team should provide your real emergency instructions.
            </Text>
          </LinearGradient>

          {steps.map((s, i) => (
            <View key={s.title} style={[styles.card, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
              <View style={[styles.stepNum, { backgroundColor: `${Brand.red}18` }]}>
                <Text style={{ color: Brand.red, fontFamily: Fonts.sansBold, fontSize: 13 }}>{i + 1}</Text>
              </View>
              <s.Icon color={Brand.teal} size={22} style={{ marginBottom: 8 }} />
              <Text style={[styles.cardTitle, { color: t.text, fontFamily: Fonts.serifSemi }]}>{s.title}</Text>
              <Text style={[styles.cardBody, { color: t.textMuted, fontFamily: Fonts.sans }]}>{s.body}</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  backBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  topTitle: { fontSize: 18 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },
  hero: {
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    overflow: "hidden",
  },
  heroInnerBorder: {
    ...StyleSheet.absoluteFillObject,
    margin: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(216, 165, 90, 0.28)",
  },
  heroTitle: { fontSize: 24, color: "#f1cf86", letterSpacing: -0.4, marginBottom: 8 },
  heroSub: { fontSize: 14, lineHeight: 20, color: "rgba(255,255,255,0.88)", fontFamily: Fonts.sans },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 14,
  },
  stepNum: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 18, marginBottom: 6 },
  cardBody: { fontSize: 14, lineHeight: 21 },
});
