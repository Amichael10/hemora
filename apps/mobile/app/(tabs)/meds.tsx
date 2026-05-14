import { useFocusEffect } from "@react-navigation/native";
import { router, type Href } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AltArrowRightLinear, PillBold, PlusLinear } from "@/components/icons/solar";
import { ScreenShell } from "@/components/ScreenShell";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { formatReminder, formatShortDate } from "@/lib/datetime";
import { fetchMedsScreen, type MedsScreenPayload } from "@/lib/medsScreenData";
import { getSupabase } from "@/lib/supabase";

export default function MedsScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();
  const [data, setData] = useState<MedsScreenPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState(false);

  const load = useCallback(
    async (mode: "focus" | "pull") => {
      if (!user?.id) return;
      const supabase = getSupabase();
      if (!supabase) {
        setConfigError(true);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      setConfigError(false);
      if (mode === "pull") setRefreshing(true);
      else setLoading(true);
      try {
        const payload = await fetchMedsScreen(supabase, user.id);
        setData(payload);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load medications");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user?.id]
  );

  useFocusEffect(
    useCallback(() => {
      void load("focus");
    }, [load])
  );

  const adherencePct = data?.adherencePct ?? 0;
  const weekBars = data?.weekBars ?? [];
  const streakDays = data?.streakDays ?? 0;
  const meds = data?.medications ?? [];
  const takenThisWeek = data?.takenThisWeek ?? 0;
  const expectedThisWeek = data?.expectedThisWeek ?? 0;

  return (
    <ScreenShell title="Medications">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void load("pull")} tintColor={Brand.red} />
        }
      >
        <View style={styles.rowBetween}>
          <Text style={[styles.lead, { color: t.textMuted, fontFamily: Fonts.sans }]}>
            Your routine, adherence, and refill snapshots — synced from your account.
          </Text>
          <Pressable
            onPress={() => router.push("/add-medication" as Href)}
            style={[styles.addFab, { backgroundColor: `${Brand.red}18` }]}
            accessibilityLabel="Add medication"
          >
            <PlusLinear color={Brand.red} size={18} />
          </Pressable>
        </View>

        {configError ? (
          <Text style={[styles.inlineErr, { color: t.textMuted }]}>Add Supabase keys so this tab can load (see app config).</Text>
        ) : null}
        {error ? (
          <Pressable onPress={() => void load("pull")} style={styles.errBox}>
            <Text style={[styles.inlineErr, { color: Brand.red }]}>{error}</Text>
            <Text style={[styles.retry, { color: Brand.teal }]}>Tap to retry</Text>
          </Pressable>
        ) : null}

        {loading && !data ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={Brand.red} />
            <Text style={[styles.inlineErr, { color: t.textMuted }]}>Loading…</Text>
          </View>
        ) : null}

        <View style={[styles.adherenceCard, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
          <Text style={[styles.adherenceEyebrow, { color: t.textMuted }]}>This week</Text>
          <View style={styles.adherenceHead}>
            <Text style={[styles.adherenceBig, { color: Brand.red }]}>{adherencePct}%</Text>
            <Text style={[styles.adherenceLbl, { color: t.textMuted }]}>adherence</Text>
            <View style={{ flex: 1 }} />
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.streakLbl, { color: t.textMuted }]}>Streak</Text>
              <Text style={[styles.streakVal, { color: t.text }]}>
                {streakDays} day{streakDays === 1 ? "" : "s"}
              </Text>
            </View>
          </View>
          <View style={styles.chartRow}>
            {weekBars.map((d, i) => (
              <View key={`${d.label}-${i}`} style={styles.chartCol}>
                <View style={[styles.chartTrack, { backgroundColor: `${Brand.teal}22` }]}>
                  <View
                    style={[
                      styles.chartFill,
                      {
                        height: Math.max(4, Math.round((d.pct / 100) * 88)),
                        backgroundColor:
                          d.pct >= 80 ? Brand.teal : d.pct >= 50 ? `${Brand.teal}99` : `${Brand.red}88`,
                      },
                    ]}
                  />
                </View>
                <Text style={[styles.chartDay, { color: t.textMuted }]}>{d.label}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.chartFoot, { color: t.textMuted }]}>
            {expectedThisWeek === 0
              ? "Add medications to see weekly targets."
              : `${takenThisWeek} of ${expectedThisWeek} dose slots logged this week`}
          </Text>
        </View>

        <Text style={[styles.sectionEyebrow, { color: t.textMuted }]}>Current routine</Text>
        {meds.length === 0 && !loading ? (
          <Text style={[styles.empty, { color: t.textMuted }]}>No active medications. Tap + to add one.</Text>
        ) : null}
        {meds.map((med) => (
          <Pressable
            key={med.id}
            onPress={() => router.push({ pathname: "/medication-detail", params: { id: med.id } } as Href)}
            style={[styles.medCard, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
          >
            <View style={[styles.medIcon, { backgroundColor: `${Brand.red}14` }]}>
              <PillBold color={Brand.red} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.medName, { color: t.text, fontFamily: Fonts.serifSemi }]}>{med.name}</Text>
              <Text style={[styles.medMeta, { color: t.textMuted, fontFamily: Fonts.sans }]}>{med.dose}</Text>
              <Text style={[styles.medMeta, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                {formatReminder(med.reminderTime)} · Refill{" "}
                {med.nextRefillDate ? formatShortDate(med.nextRefillDate) : "—"}
              </Text>
            </View>
            <AltArrowRightLinear color={t.textMuted} size={16} />
          </Pressable>
        ))}
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  rowBetween: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 16 },
  lead: { flex: 1, fontSize: 15, lineHeight: 22 },
  addFab: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  inlineErr: { fontSize: 13, marginBottom: 8 },
  errBox: { marginBottom: 12 },
  retry: { fontSize: 13, fontWeight: "700", marginTop: 4 },
  empty: { fontSize: 14, marginBottom: 12, lineHeight: 20 },
  adherenceCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  adherenceEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  adherenceHead: { flexDirection: "row", alignItems: "flex-end" },
  adherenceBig: { fontSize: 36, fontWeight: "700", letterSpacing: -1 },
  adherenceLbl: { fontSize: 12, marginLeft: 6, marginBottom: 6 },
  streakLbl: { fontSize: 11 },
  streakVal: { fontSize: 18, fontWeight: "700", marginTop: 2 },
  chartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    height: 100,
    gap: 6,
  },
  chartCol: { flex: 1, alignItems: "center" },
  chartTrack: {
    width: "100%",
    height: 88,
    borderRadius: 8,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  chartFill: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  chartDay: { fontSize: 10, marginTop: 6, fontWeight: "600" },
  chartFoot: { fontSize: 11, textAlign: "center", marginTop: 10 },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  medCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
  },
  medIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  medName: { fontSize: 16, fontWeight: "700" },
  medMeta: { fontSize: 12, marginTop: 2 },
});
