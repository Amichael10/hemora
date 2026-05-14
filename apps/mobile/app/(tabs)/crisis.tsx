import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DonutChart } from "@/components/charts/DonutChart";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { fetchCrisisInsights, type CrisisInsightsPayload } from "@/lib/crisisScreenData";
import { getSupabase } from "@/lib/supabase";

type InsightTab = "overview" | "trends";

export default function CrisisScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();
  const [tab, setTab] = useState<InsightTab>("overview");
  const year = useMemo(() => new Date().getFullYear(), []);
  const [data, setData] = useState<CrisisInsightsPayload | null>(null);
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
        const payload = await fetchCrisisInsights(supabase, user.id, year);
        setData(payload);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load crisis data");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [user?.id, year]
  );

  useFocusEffect(
    useCallback(() => {
      void load("focus");
    }, [load])
  );

  const total = data?.totalCrises ?? 0;
  const hospital = data?.hospitalVisits ?? 0;
  const uniqueDays = data?.uniqueCrisisDays ?? 0;
  const painSlices = data?.painSlices ?? [];
  const triggers = data?.triggers ?? [];
  const topPain = painSlices[0];
  const donutPct = topPain && total > 0 ? topPain.pct : total > 0 ? 100 : 0;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void load("pull")} tintColor={Brand.red} />
        }
      >
        <Text style={[styles.pageTitle, { color: t.text }]}>Crisis Insights</Text>

        {configError ? (
          <Text style={[styles.hint, { color: t.textMuted }]}>Add Supabase keys to load crisis history.</Text>
        ) : null}
        {error ? (
          <Pressable onPress={() => void load("pull")}>
            <Text style={[styles.hint, { color: Brand.red }]}>{error} — tap to retry</Text>
          </Pressable>
        ) : null}
        {loading && !data ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={Brand.red} />
            <Text style={[styles.hint, { color: t.textMuted }]}>Loading…</Text>
          </View>
        ) : null}

        <View style={[styles.segmentWrap, { backgroundColor: `${Brand.teal}14` }]}>
          <Pressable
            onPress={() => setTab("overview")}
            style={[styles.segmentBtn, tab === "overview" && { backgroundColor: Brand.red }]}
          >
            <Text
              style={[
                styles.segmentText,
                { fontFamily: Fonts.sansBold },
                { color: tab === "overview" ? "#fff" : t.textMuted },
              ]}
            >
              Overview
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTab("trends")}
            style={[styles.segmentBtn, tab === "trends" && { backgroundColor: Brand.red }]}
          >
            <Text
              style={[
                styles.segmentText,
                { fontFamily: Fonts.sansBold },
                { color: tab === "trends" ? "#fff" : t.textMuted },
              ]}
            >
              Trends
            </Text>
          </Pressable>
        </View>

        {tab === "overview" ? (
          <>
            <Text style={[styles.yearLbl, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              This year ({year})
            </Text>
            <View style={styles.statsRow}>
              {[
                { v: String(total), l: "TOTAL CRISES" },
                { v: String(hospital), l: "HOSPITAL VISITS" },
                { v: String(uniqueDays), l: "CRISIS DAYS" },
              ].map((s) => (
                <View key={s.l} style={[styles.statBox, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
                  <Text style={[styles.statNum, { color: Brand.red, fontFamily: Fonts.serif }]}>{s.v}</Text>
                  <Text style={[styles.statLbl, { color: t.text, fontFamily: Fonts.sansBold }]}>{s.l}</Text>
                </View>
              ))}
            </View>

            <Text style={[styles.h2, { color: t.text }]}>Pain levels</Text>
            <View style={[styles.donutCard, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
              <DonutChart
                percent={donutPct}
                color={Brand.red}
                trackColor={`${Brand.red}22`}
                size={112}
                strokeWidth={16}
              />
              <View style={styles.legend}>
                {total === 0 ? (
                  <Text style={[styles.legendMain, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                    No crisis logs yet this year.
                  </Text>
                ) : (
                  painSlices.map((p, idx) => (
                    <View key={`${p.label}-${idx}`} style={styles.legendLine}>
                      <View style={[styles.dot, { backgroundColor: Brand.red }]} />
                      <Text style={[styles.legendMain, { color: t.text, fontFamily: Fonts.sans }]}>
                        {p.label}
                      </Text>
                      <Text style={[styles.legendPct, { color: Brand.red, fontFamily: Fonts.sansBold }]}>
                        {p.pct}% ({p.count})
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </View>

            <Text style={[styles.h2, { color: t.text }]}>Common triggers</Text>
            <View style={[styles.triggerCard, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
              {triggers.length === 0 ? (
                <Text style={[styles.triggerEmpty, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                  {total === 0
                    ? "Log a crisis to capture triggers."
                    : "No triggers recorded on your logs yet."}
                </Text>
              ) : (
                triggers.map((row, i) => (
                  <View key={`${row.label}-${i}`}>
                    {i > 0 ? <View style={[styles.sep, { backgroundColor: t.tabBorder }]} /> : null}
                    <View style={styles.triggerRow}>
                      <Text style={[styles.triggerLabel, { color: t.text, fontFamily: Fonts.sans }]}>{row.label}</Text>
                      <Text style={[styles.triggerCount, { color: t.text, fontFamily: Fonts.sansBold }]}>
                        {row.count}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </>
        ) : (
          <View style={[styles.trendsPlaceholder, { borderColor: t.tabBorder }]}>
            <Text style={{ color: t.textMuted, fontFamily: Fonts.sans, textAlign: "center", lineHeight: 22 }}>
              This year you have logged {total} crisis{total === 1 ? "" : "es"}. More charts can mirror the web
              dashboard once you have several months of data.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 8 },
  hint: { fontSize: 13, marginBottom: 10, lineHeight: 18 },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  pageTitle: {
    fontFamily: Fonts.serif,
    fontSize: 26,
    letterSpacing: -0.5,
    marginBottom: 18,
    textAlign: "center",
  },
  segmentWrap: {
    flexDirection: "row",
    borderRadius: 999,
    padding: 4,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  segmentText: { fontSize: 13 },
  yearLbl: { fontSize: 13, marginBottom: 10 },
  statsRow: { flexDirection: "row", gap: 10, marginBottom: 22 },
  statBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  statNum: { fontSize: 26, letterSpacing: -0.5 },
  statLbl: { fontSize: 8, letterSpacing: 0.8, marginTop: 8, textAlign: "center" },
  h2: { fontFamily: Fonts.serifSemi, fontSize: 18, marginBottom: 12 },
  donutCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 22,
  },
  legend: { flex: 1, gap: 8 },
  legendLine: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendMain: { fontSize: 14, flex: 1 },
  legendPct: { fontSize: 14 },
  triggerCard: {
    borderRadius: 18,
    borderWidth: 1,
    paddingVertical: 4,
    marginBottom: 16,
  },
  triggerEmpty: { padding: 16, fontSize: 14, lineHeight: 20 },
  triggerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  triggerLabel: { fontSize: 14 },
  triggerCount: { fontSize: 14 },
  sep: { height: StyleSheet.hairlineWidth, marginLeft: 16 },
  trendsPlaceholder: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    borderStyle: "dashed",
  },
});
