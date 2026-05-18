import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AltArrowLeftLinear } from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle, HeartPulse, Pill, Phone, CheckSquare, Square, Share2, PhoneCall } from "lucide-react-native";
import * as Linking from "expo-linking";
import { getSupabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { fetchEmergencyData, saveChecklist, DEFAULT_HOSPITAL_CHECKLIST } from "@/lib/emergencyData";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

/**
 * Prototype “action plan” screen — mirrors the web `/emergency` intent from the Crisis hub hero.
 * Replace copy and steps with your clinical content when engineering wires the real flow.
 */
export default function EmergencyScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
    if (!user?.id) return;
    const supabase = getSupabase();
    if (!supabase) return;
    try {
      const res = await fetchEmergencyData(supabase, user.id);
      setData(res);
      setChecked(res.checkedItems);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const toggleCheck = async (id: string) => {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    await saveChecklist(next);
  };

  const completedCount = DEFAULT_HOSPITAL_CHECKLIST.filter((i) => checked[i.id]).length;
  const progressPct = Math.round((completedCount / DEFAULT_HOSPITAL_CHECKLIST.length) * 100);

  const steps = [
    { Icon: HeartPulse, title: "Stay calm", body: "Sit or lie down in a safe place. Slow breathing helps your body respond." },
    { Icon: Pill, title: "Follow your care plan", body: "Take pain medication only as prescribed. If unsure, call your care team." },
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
            <AltArrowLeftLinear color={Brand.red} size={22} />
          </Pressable>
          <Text style={[styles.topTitle, { color: Brand.red, fontFamily: Fonts.serifSemi }]}>Emergency Support</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={["#a8324a", "#6a1d2c"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
          >
            <View style={styles.heroInnerBorder} />
            <AlertTriangle color="#fff" size={28} style={{ marginBottom: 12 }} />
            <Text style={[styles.heroTitle, { fontFamily: Fonts.serifSemi, color: "#fff" }]}>In a crisis?</Text>
            <Text style={[styles.heroSub, { color: "rgba(255,255,255,0.9)" }]}>
              If you're experiencing severe pain, shortness of breath, or fever, seek immediate care.
            </Text>

            <View style={styles.heroActions}>
              <Pressable
                onPress={() => Linking.openURL(`tel:${data?.ambulanceNumber || "112"}`)}
                style={styles.callBtn}
              >
                <PhoneCall color="#fff" size={20} />
                <Text style={styles.callBtnText}>Call Ambulance ({data?.ambulanceNumber || "112"})</Text>
              </Pressable>

              {data?.contacts?.[0] && (
                <Pressable
                  onPress={() => Linking.openURL(`tel:${data.contacts[0].phone}`)}
                  style={styles.contactBtn}
                >
                  <Phone color="#fff" size={18} />
                  <Text style={styles.contactBtnText}>Call {data.contacts[0].fullName}</Text>
                </Pressable>
              )}
            </View>
          </LinearGradient>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: t.textMuted }]}>QUICK ACTIONS</Text>
          </View>
          <View style={styles.actionGrid}>
            {["Stay calm", "Drink water", "Take meds", "Find clinic"].map((a) => (
              <View key={a} style={[styles.actionTag, { backgroundColor: t.surface, borderColor: t.tabBorder }]}>
                <Text style={[styles.actionTagText, { color: t.text }]}>{a}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: t.textMuted }]}>HOSPITAL BAG CHECKLIST</Text>
            <Text style={[styles.progressText, { color: Brand.red }]}>{progressPct}%</Text>
          </View>
          
          <View style={[styles.progressTrack, { backgroundColor: `${Brand.red}15` }]}>
            <View style={[styles.progressFill, { width: `${progressPct}%`, backgroundColor: Brand.red }]} />
          </View>

          <View style={[styles.checklistCard, { backgroundColor: t.surface, borderColor: t.tabBorder }]}>
            {DEFAULT_HOSPITAL_CHECKLIST.map((item, idx) => {
              const isChecked = checked[item.id];
              return (
                <Pressable
                  key={item.id}
                  onPress={() => toggleCheck(item.id)}
                  style={[styles.checkItem, idx < DEFAULT_HOSPITAL_CHECKLIST.length - 1 && { borderBottomWidth: 1, borderBottomColor: `${t.textMuted}15` }]}
                >
                  {isChecked ? (
                    <CheckSquare color={Brand.red} size={20} />
                  ) : (
                    <Square color={t.textMuted} size={20} />
                  )}
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.checkLabel, isChecked && { textDecorationLine: "line-through", color: t.textMuted }]}>{item.label}</Text>
                    <Text style={styles.checkDesc}>{item.description}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={{ height: 20 }} />
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
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  heroTitle: { fontSize: 24, letterSpacing: -0.4, marginBottom: 8 },
  heroSub: { fontSize: 14, lineHeight: 20, fontFamily: Fonts.sans, marginBottom: 20 },
  heroActions: { gap: 10 },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  callBtnText: { color: "#fff", fontFamily: Fonts.sansBold, fontSize: 15 },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
  },
  contactBtnText: { color: "#fff", fontFamily: Fonts.sansMedium, fontSize: 14 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12, marginTop: 10 },
  sectionTitle: { fontSize: 10, letterSpacing: 1.2, fontFamily: Fonts.sansBold },
  progressText: { fontSize: 12, fontFamily: Fonts.sansBold },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 14 },
  progressFill: { height: "100%" },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 24 },
  actionTag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  actionTagText: { fontSize: 13, fontFamily: Fonts.sansMedium },
  checklistCard: { borderRadius: 22, borderWidth: 1, padding: 4 },
  checkItem: { flexDirection: "row", alignItems: "center", padding: 14 },
  checkLabel: { fontSize: 15, fontFamily: Fonts.sansMedium },
  checkDesc: { fontSize: 11, color: Brand.muted, marginTop: 2, fontFamily: Fonts.sans },
});
