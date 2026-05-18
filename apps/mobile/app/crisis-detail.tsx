import { useFocusEffect } from "@react-navigation/native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { DetailHeader } from "@/components/DetailHeader";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { fetchCrisisLogById, type CrisisLogRow } from "@/lib/crisisScreenData";
import { getSupabase } from "@/lib/supabase";
import { ClockCircleBold, HospitalBold } from "@/components/icons/solar";

function painEmojiSource(level: string, type: string) {
  if (type !== "pain") {
    // Return a generic medical icon or specific one if we want
    return require("@/assets/images/emoji-mild.png"); 
  }
  switch (level.toLowerCase()) {
    case "mild":
      return require("@/assets/images/emoji-mild.png");
    case "moderate":
      return require("@/assets/images/emoji-moderate.png");
    case "severe":
      return require("@/assets/images/emoji-severe.png");
    case "worst":
      return require("@/assets/images/emoji-worst.png");
    default:
      return require("@/assets/images/emoji-mild.png");
  }
}

const CRISIS_TYPE_LABELS: Record<string, string> = {
  pain: "Pain (VOC)",
  acs: "Chest / Breathing",
  stroke: "Stroke Signs",
  splenic: "Spleen / Abdomen",
  fever: "Fever",
  priapism: "Priapism",
  aplastic: "Extreme Fatigue",
};

function painBar(level: string, type: string): string {
  if (type !== "pain") return Brand.red; // Emergency colors
  switch (level.toLowerCase()) {
    case "mild":
      return "#22c55e";
    case "moderate":
      return "#eab308";
    case "severe":
      return "#ea580c";
    case "worst":
      return Brand.red;
    default:
      return Brand.border;
  }
}

export default function CrisisDetailScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = useMemo(() => {
    const raw = params.id;
    if (Array.isArray(raw)) return raw[0];
    return raw;
  }, [params.id]);

  const [row, setRow] = useState<CrisisLogRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user?.id || !id) {
      setLoading(false);
      setError("Missing log.");
      return;
    }
    const supabase = getSupabase();
    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const r = await fetchCrisisLogById(supabase, user.id, id);
      setRow(r);
      setError(r ? null : "Log not found.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setRow(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id, id]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const occurred = row ? new Date(row.occurredAt) : null;
  const dateStr =
    occurred &&
    occurred.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const timeStr = occurred && occurred.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.root, { backgroundColor: t.background }]}>
        <DetailHeader
          title="Crisis log"
          onBack={() => router.back()}
          backgroundColor={t.background}
          titleColor={t.text}
          iconColor={t.teal}
        />

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator color={Brand.red} />
            <Text style={[styles.muted, { color: t.textMuted, fontFamily: Fonts.sans }]}>Loading…</Text>
          </View>
        ) : error ? (
          <View style={styles.centered}>
            <Text style={[styles.muted, { color: Brand.red, fontFamily: Fonts.sans, textAlign: "center" }]}>{error}</Text>
          </View>
        ) : row ? (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            <View style={[styles.card, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
              <View style={[styles.accent, { backgroundColor: painBar(row.painLevel, row.crisisType) }]} />
              <View style={styles.cardInner}>
                <View style={styles.rowTop}>
                  <View style={[styles.emojiWrap, { borderColor: t.tabBorder }]}>
                    <Image source={painEmojiSource(row.painLevel, row.crisisType)} style={styles.emoji} resizeMode="contain" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.typeRow}>
                      <Text style={[styles.painTitle, { color: t.text, fontFamily: Fonts.serifSemi }]}>
                        {CRISIS_TYPE_LABELS[row.crisisType] ?? row.crisisType}
                      </Text>
                      {row.crisisType !== "pain" && (
                        <View style={styles.emergencyBadge}>
                          <Text style={styles.emergencyBadgeTxt}>EMERGENCY</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.painLevel, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                      {row.painLevel} intensity
                    </Text>
                    <View style={styles.timeRow}>
                      <ClockCircleBold color={t.textMuted} size={12} />
                      <Text style={[styles.timeText, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                        {dateStr} · {timeStr}
                      </Text>
                    </View>
                  </View>
                </View>

                {row.painLocations.length > 0 ? (
                  <View style={styles.section}>
                    <Text style={[styles.sectionLbl, { color: t.textMuted, fontFamily: Fonts.sansBold }]}>Where</Text>
                    <View style={styles.chips}>
                      {row.painLocations.map((loc) => (
                        <View key={loc} style={[styles.chip, { backgroundColor: `${Brand.teal}12` }]}>
                          <Text style={[styles.chipTxt, { color: t.text, fontFamily: Fonts.sans }]}>{loc}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : null}

                {row.triggers.length > 0 ? (
                  <View style={styles.section}>
                    <Text style={[styles.sectionLbl, { color: t.textMuted, fontFamily: Fonts.sansBold }]}>Triggers</Text>
                    <Text style={[styles.body, { color: t.text, fontFamily: Fonts.sans }]}>{row.triggers.join(", ")}</Text>
                  </View>
                ) : null}

                {row.whatHelped.length > 0 ? (
                  <View style={styles.section}>
                    <Text style={[styles.sectionLbl, { color: t.textMuted, fontFamily: Fonts.sansBold }]}>What helped</Text>
                    <Text style={[styles.body, { color: t.text, fontFamily: Fonts.sans }]}>{row.whatHelped.join(", ")}</Text>
                  </View>
                ) : null}

                {row.hospitalVisit ? (
                  <View style={[styles.hosp, { backgroundColor: `${Brand.gold}22` }]}>
                    <HospitalBold color={Brand.teal} size={16} />
                    <Text style={{ color: Brand.tealDeep, fontFamily: Fonts.sansBold, fontSize: 13, marginLeft: 8 }}>
                      Hospital visit
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, padding: 24 },
  muted: { fontSize: 14 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
    flexDirection: "row",
  },
  accent: { width: 4 },
  cardInner: { flex: 1, padding: 16 },
  rowTop: { flexDirection: "row", gap: 12, marginBottom: 8 },
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { width: 36, height: 36 },
  typeRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  emergencyBadge: { backgroundColor: Brand.red, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  emergencyBadgeTxt: { color: "#fff", fontSize: 9, fontFamily: Fonts.sansBold },
  painTitle: { fontSize: 17 },
  painLevel: { fontSize: 13, textTransform: "capitalize", marginTop: 2 },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4 },
  timeText: { fontSize: 12 },
  section: { marginTop: 14 },
  sectionLbl: { fontSize: 11, letterSpacing: 0.6, marginBottom: 6 },
  body: { fontSize: 14, lineHeight: 21 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  chipTxt: { fontSize: 12 },
  hosp: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
});
