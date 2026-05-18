import { useFocusEffect } from "@react-navigation/native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { CheckCircleBold, CloseCircleLinear, PenBold, PillBold } from "@/components/icons/solar";
import { DetailHeader } from "@/components/DetailHeader";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { insertMedicationLog } from "@/lib/dashboardHomeData";
import { fetchMedicationDetail, medicationDetailGrid } from "@/lib/medicationDetailData";
import { getSupabase } from "@/lib/supabase";
import { bottleForMedication } from "@/lib/medBottle";
import { Image } from "expo-image";

const WEEK = ["M", "T", "W", "T", "F", "S", "S"];

function MonthCalendar({ logs, medId, t }: { logs: any[]; medId: string; t: any }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayStatus = useMemo(() => {
    const map = new Map<number, "taken" | "skipped" | "missed">();
    for (const l of logs) {
      const d = new Date(l.taken_at ?? l.scheduled_at);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (l.status === "taken") map.set(day, "taken");
        else if (!map.has(day)) map.set(day, l.status);
      }
    }
    return map;
  }, [logs, medId, year, month]);

  const cells: Array<{ day?: number; status?: string; isToday?: boolean }> = [];
  for (let i = 0; i < startOffset; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      status: dayStatus.get(d),
      isToday: d === today.getDate(),
    });
  }

  return (
    <View>
      <View style={styles.calHead}>
        {WEEK.map((w, i) => (
          <Text key={i} style={[styles.calDow, { color: t.textMuted }]}>{w}</Text>
        ))}
      </View>
      <View style={styles.calRow}>
        {cells.map((c, i) => (
          <View key={i} style={styles.calCell}>
            {c.day && (
              <View
                style={[
                  styles.calDayBox,
                  c.status === "taken" && { backgroundColor: "#d1fae5", borderColor: "#a7f3d0", borderWidth: 1 },
                  c.status === "skipped" && { backgroundColor: "#fef3c7", borderColor: "#fde68a", borderWidth: 1 },
                  c.status === "missed" && { backgroundColor: "#fee2e2", borderColor: "#fecaca", borderWidth: 1 },
                  c.isToday && { borderColor: Brand.red, borderWidth: 2 },
                ]}
              >
                <Text
                  style={[
                    styles.calNum,
                    { color: c.status ? (c.status === "taken" ? "#065f46" : c.status === "skipped" ? "#92400e" : "#991b1b") : t.text },
                    c.isToday && { color: Brand.red, fontFamily: Fonts.sansBold }
                  ]}
                >
                  {c.day}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function MedicationDetailScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const id = useMemo(() => {
    const raw = params.id;
    if (Array.isArray(raw)) return raw[0];
    return raw;
  }, [params.id]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [payload, setPayload] = useState<Awaited<ReturnType<typeof fetchMedicationDetail>>>(null);

  const load = useCallback(async () => {
    if (!user?.id || !id) {
      setLoading(false);
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
      const p = await fetchMedicationDetail(supabase, user.id, id);
      setPayload(p);
      setError(p ? null : "Medication not found.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setPayload(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id, id]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  const m = payload?.medication;
  const grid = m ? medicationDetailGrid(m) : [];
  const adherencePct = payload?.adherencePct ?? 0;
  const takenM = payload?.takenThisMonth ?? 0;
  const expectedM = payload?.expectedThisMonth ?? 0;

  const onLog = async (status: "taken" | "skipped") => {
    if (!user?.id || !id) return;
    const supabase = getSupabase();
    if (!supabase) {
      Alert.alert("Setup", "Supabase is not configured.");
      return;
    }
    setBusy(true);
    const { error: err } = await insertMedicationLog(supabase, user.id, id, status);
    setBusy(false);
    if (err) {
      Alert.alert("Could not save", err);
      return;
    }
    void load();
  };

  const title = m?.name ?? "Medication";
  const subtitle = m ? `${m.dose} · ${m.frequency}` : "—";
  const statusLabel = m?.status ? m.status.replace(/_/g, " ") : "—";

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.root, { backgroundColor: "#f5f2ea" }]}>
        <DetailHeader
          title={title}
          onBack={() => router.back()}
          backgroundColor="#f5f2ea"
          titleColor={Brand.tealDeep}
          iconColor={Brand.ink}
          right={
            <Pressable style={[styles.iconCircle, { borderColor: `${Brand.ink}22` }]}>
              <PenBold color={Brand.ink} size={18} />
            </Pressable>
          }
        />
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {!id ? (
            <Text style={[styles.err, { color: t.textMuted }]}>Open this screen from the Meds list.</Text>
          ) : loading ? (
            <View style={styles.center}>
              <ActivityIndicator color={Brand.red} />
              <Text style={[styles.err, { color: t.textMuted }]}>Loading…</Text>
            </View>
          ) : error || !m ? (
            <Text style={[styles.err, { color: Brand.red }]}>{error ?? "Not found"}</Text>
          ) : (
            <>
              <View style={[styles.heroCard, { borderColor: t.tabBorder }]}>
                <View style={styles.heroTop}>
                <View style={[styles.photoPh, { backgroundColor: `${Brand.red}12` }]}>
                  <Image
                    source={bottleForMedication(m.name)}
                    style={{ width: 56, height: 56 }}
                    contentFit="contain"
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.medTitle, { color: Brand.tealDeep }]}>{m.name}</Text>
                  <View style={styles.badgeRow}>
                    <View style={[styles.badgeSoft, { backgroundColor: "#e0f2f1" }]}>
                      <View style={[styles.dot, { backgroundColor: "#0d9488" }]} />
                      <Text style={[styles.badgeSoftText, { color: "#0f766e" }]}>
                        {m.reminderEnabled ? "Reminders on" : "Reminders off"}
                      </Text>
                    </View>
                    <View style={[styles.badgeDark, { backgroundColor: m.status === "active" ? "#065f46" : Brand.tealDeep }]}>
                      <Text style={styles.badgeDarkText}>{statusLabel}</Text>
                    </View>
                  </View>
                </View>
                </View>
                <View style={styles.grid}>
                  {grid.map(([k, v]) => (
                    <View key={String(k)} style={[styles.gridCell, { backgroundColor: `${Brand.goldSoft}66` }]}>
                      <Text style={[styles.gridLbl, { color: t.textMuted }]}>{k}</Text>
                      <Text style={[styles.gridVal, { color: Brand.tealDeep }]}>{v}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.remRow}>
                <View style={[styles.remCard, { borderColor: t.tabBorder, backgroundColor: "#fcfbf7" }]}>
                  <View style={[styles.remIcon, { backgroundColor: `${Brand.red}22` }]}>
                    <PillBold color={Brand.red} size={18} />
                  </View>
                  <Text style={[styles.remLbl, { color: t.textMuted }]}>REMINDER</Text>
                  <Text style={[styles.remVal, { color: Brand.tealDeep }]}>{m.reminderEnabled ? "On" : "Off"}</Text>
                </View>
                <View style={[styles.remCard, { borderColor: t.tabBorder, backgroundColor: "#fcfbf7" }]}>
                  <View style={[styles.remIcon, { backgroundColor: `${Brand.red}22` }]}>
                    <PillBold color={Brand.red} size={18} />
                  </View>
                  <Text style={[styles.remLbl, { color: t.textMuted }]}>REFILL REMINDER</Text>
                  <Text style={[styles.remVal, { color: Brand.tealDeep }]}>
                    {m.refillReminderDays != null ? `${m.refillReminderDays} days before` : "—"}
                  </Text>
                </View>
              </View>

              <View style={styles.actionRow}>
                <Pressable
                  onPress={() => void onLog("taken")}
                  disabled={busy}
                  style={[styles.markBtn, { backgroundColor: Brand.red, opacity: busy ? 0.7 : 1 }]}
                >
                  <CheckCircleBold color="#fff" size={18} />
                  <Text style={[styles.markBtnText, { fontFamily: Fonts.sansBold }]}>Mark taken</Text>
                </Pressable>
                <Pressable
                  onPress={() => void onLog("skipped")}
                  disabled={busy}
                  style={[
                    styles.skipBtn,
                    { borderColor: `${Brand.red}44`, backgroundColor: `${Brand.red}10`, opacity: busy ? 0.7 : 1 },
                  ]}
                >
                  <CloseCircleLinear color={Brand.red} size={18} />
                  <Text style={[styles.skipBtnText, { color: Brand.red, fontFamily: Fonts.sansBold }]}>Skip</Text>
                </Pressable>
              </View>

              <View style={[styles.adCard, { borderColor: t.tabBorder, backgroundColor: "#fcfbf7" }]}>
                <Text style={[styles.adEyebrow, { color: Brand.tealDeep }]}>ADHERENCE THIS MONTH</Text>
                <Text style={[styles.adBig, { color: Brand.red }]}>{adherencePct}%</Text>
                <Text style={[styles.adSub, { color: t.textMuted }]}>
                  {takenM} of {expectedM} doses taken
                </Text>
                <View style={[styles.divider, { backgroundColor: `${Brand.red}22` }]} />
                <MonthCalendar logs={payload?.logs ?? []} medId={id} t={t} />
              </View>

              <View style={[styles.recentCard, { borderColor: t.tabBorder, backgroundColor: "#fcfbf7" }]}>
                <Text style={[styles.adEyebrow, { color: Brand.tealDeep, marginBottom: 12 }]}>RECENT DOSES</Text>
                {payload?.logs?.length === 0 ? (
                  <Text style={{ color: t.textMuted, textAlign: "center", paddingVertical: 12 }}>No doses logged yet.</Text>
                ) : (
                  payload?.logs?.slice(0, 5).map((l: any, i: number) => {
                    const d = new Date(l.taken_at ?? l.scheduled_at);
                    return (
                      <View key={l.id} style={[styles.recentRow, i < 4 && { borderBottomWidth: 1, borderBottomColor: "#eee" }]}>
                        <Text style={[styles.recentDate, { color: t.text }]}>
                          {d.toLocaleDateString(undefined, { month: "short", day: "numeric" })}, {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </Text>
                        <Text style={[styles.recentStatus, { color: l.status === "taken" ? "#065f46" : Brand.red }]}>
                          {l.status === "taken" ? "Taken" : "Skipped"}
                        </Text>
                      </View>
                    );
                  })
                )}
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  center: { paddingVertical: 40, alignItems: "center", gap: 12 },
  err: { fontSize: 15, textAlign: "center", marginTop: 24, paddingHorizontal: 16 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    backgroundColor: "#fcfbf7",
    marginBottom: 14,
  },
  heroTop: { flexDirection: "row", gap: 14, alignItems: "flex-start" },
  photoPh: { width: 72, height: 72, borderRadius: 18 },
  medTitle: { fontFamily: Fonts.serif, fontSize: 20, letterSpacing: -0.3 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10 },
  badgeSoft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  badgeSoftText: { fontFamily: Fonts.sansBold, fontSize: 11 },
  badgeDark: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  badgeDarkText: { color: "#fff", fontFamily: Fonts.sansBold, fontSize: 11 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 16 },
  gridCell: { width: "47%", borderRadius: 14, padding: 12 },
  gridLbl: { fontSize: 9, letterSpacing: 1, fontFamily: Fonts.sansBold },
  gridVal: { fontFamily: Fonts.sansBold, fontSize: 14, marginTop: 6 },
  remRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  remCard: { flex: 1, borderRadius: 18, borderWidth: 1, padding: 12 },
  remIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  remLbl: { fontSize: 8, letterSpacing: 0.8, fontFamily: Fonts.sansBold },
  remVal: { fontFamily: Fonts.sansBold, fontSize: 14, marginTop: 6 },
  actionRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  markBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
  },
  markBtnText: { color: "#fff", fontSize: 14 },
  skipBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  skipBtnText: { fontSize: 14 },
  adCard: { borderRadius: 22, borderWidth: 1, padding: 18 },
  adEyebrow: { fontSize: 10, letterSpacing: 1.5, fontFamily: Fonts.sansBold },
  adBig: { fontFamily: Fonts.serif, fontSize: 44, marginTop: 8, letterSpacing: -1 },
  adSub: { fontSize: 13, marginTop: 4, fontFamily: Fonts.sans },
  divider: { height: 1, marginVertical: 16 },
  calHead: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12, paddingHorizontal: 4 },
  calDow: { width: 32, textAlign: "center", fontSize: 11, fontFamily: Fonts.sansBold },
  calRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  calCell: { width: "11.6%", alignItems: "center", marginBottom: 8 },
  calDayBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  calNum: { fontSize: 11, fontFamily: Fonts.sansMedium },
  recentCard: { borderRadius: 22, borderWidth: 1, padding: 18, marginTop: 14 },
  recentRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  recentDate: { fontSize: 13, fontFamily: Fonts.sans },
  recentStatus: { fontSize: 13, fontFamily: Fonts.sansBold },
});
