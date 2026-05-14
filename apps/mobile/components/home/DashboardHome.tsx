import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import {
  AddCircleBold,
  AltArrowRightLinear,
  ChartLinear,
  ClockCircleBold,
  DocumentTextLinear,
  EyeClosedLinear,
  HeartPulseLinear,
  PillBold,
  PillLinear,
  SettingsLinear,
} from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import {
  fetchDashboardHome,
  insertMedicationLogTaken,
  type DashboardHomePayload,
  type DashboardMedication,
} from "@/lib/dashboardHomeData";
import { formatReminder, formatShortDateNoYear, isLocalToday } from "@/lib/datetime";
import { getSupabase } from "@/lib/supabase";

const GRADIENT_COLORS = [Brand.tealDeep, Brand.teal, "#33595c"] as const;

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] ?? "H").toUpperCase();
}

function titleCasePain(s: string) {
  if (!s) return "";
  const lower = s.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function deriveFromPayload(data: DashboardHomePayload) {
  const medIds = new Set(data.medications.map((m) => m.id));
  const takenToday = new Set<string>();
  for (const log of data.logs) {
    if (log.status === "taken" && isLocalToday(log.takenAt) && medIds.has(log.medicationId)) {
      takenToday.add(log.medicationId);
    }
  }
  const totalToday = data.medications.length;
  const doneToday = takenToday.size;
  const activeMeds = data.medications.length;
  const taken7 = data.logs.filter((l) => l.status === "taken").length;
  const expected7 = Math.max(data.medications.length * 7, 1);
  const adherencePct = Math.min(100, Math.round((taken7 / expected7) * 100));
  const nextMed = data.medications.find((m) => !takenToday.has(m.id)) ?? null;

  let crisisTitle = "None logged";
  let crisisSub = "Tap Crisis to log";
  if (data.latestCrisis) {
    crisisTitle = formatShortDateNoYear(data.latestCrisis.occurredAt);
    const pain = titleCasePain(data.latestCrisis.painLevel);
    const loc = data.latestCrisis.painLocations.filter(Boolean).join(", ") || "—";
    crisisSub = `${pain} · ${loc}`;
  }

  return {
    doneToday,
    totalToday,
    activeMeds,
    adherencePct,
    takenToday,
    nextMed,
    crisisTitle,
    crisisSub,
    recordCount: data.recordCount,
  };
}

export function DashboardHome() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();
  const [hideStats, setHideStats] = useState(false);
  const [data, setData] = useState<DashboardHomePayload | null>(null);
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [configError, setConfigError] = useState(false);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const everLoaded = useRef(false);

  const load = useCallback(
    async (mode: "focus" | "pull") => {
      if (!user?.id) return;
      const supabase = getSupabase();
      if (!supabase) {
        setConfigError(true);
        setBusy(false);
        setRefreshing(false);
        return;
      }
      setConfigError(false);
      if (mode === "pull") setRefreshing(true);
      else if (!everLoaded.current) setBusy(true);
      try {
        const payload = await fetchDashboardHome(supabase, user.id);
        setData(payload);
        setFetchError(null);
        everLoaded.current = true;
      } catch (e) {
        setFetchError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        setBusy(false);
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

  const displayName = useMemo(() => {
    const meta = user?.user_metadata as { full_name?: string } | undefined;
    if (meta?.full_name?.trim()) return meta.full_name.trim();
    const email = user?.email?.trim();
    if (email) {
      const local = email.split("@")[0];
      if (local) return local.replace(/[._]/g, " ");
    }
    return "Member";
  }, [user]);

  const firstName = displayName.split(" ")[0] ?? "Member";

  const derived = useMemo(() => (data ? deriveFromPayload(data) : null), [data]);

  const onMarkTaken = useCallback(
    async (med: DashboardMedication) => {
      if (!user?.id) return;
      const supabase = getSupabase();
      if (!supabase) {
        Alert.alert("Setup needed", "Add Supabase URL and key in your Expo env (see lib/env).");
        return;
      }
      setMarkingId(med.id);
      const { error } = await insertMedicationLogTaken(supabase, user.id, med.id);
      setMarkingId(null);
      if (error) {
        Alert.alert("Could not log dose", error);
        return;
      }
      void load("focus");
    },
    [user?.id, load]
  );

  if (!user) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: t.background }]} edges={["top"]}>
        <LinearGradient
          colors={[...GRADIENT_COLORS]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signInHero}
        >
          <Text style={styles.signInGreeting}>{getGreeting()},</Text>
          <Text style={styles.signInName}>welcome</Text>
          <Text style={styles.signInSub}>Sign in to see your dashboard.</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const doneToday = derived?.doneToday ?? 0;
  const totalToday = derived?.totalToday ?? 0;
  const activeMeds = derived?.activeMeds ?? 0;
  const adherencePct = derived?.adherencePct ?? 0;
  const takenToday = derived?.takenToday ?? new Set<string>();
  const nextMed = derived?.nextMed ?? null;
  const crisisTitle = derived?.crisisTitle ?? "—";
  const crisisSub = derived?.crisisSub ?? "";
  const recordCount = derived?.recordCount ?? 0;
  const medications = data?.medications ?? [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.background }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => void load("pull")} tintColor={Brand.red} />
      }
    >
      <LinearGradient
        colors={[...GRADIENT_COLORS]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={[styles.hero, { paddingTop: 12 + insets.top }]}
      >
        <View style={styles.heroHeader}>
          <Pressable onPress={() => router.push("/settings")} style={styles.avatarBlock} accessibilityRole="button">
            <View style={styles.avatarCircle}>
              <Text style={[styles.avatarInitials, { fontFamily: Fonts.sansBold }]}>
                {hideStats ? "••" : getInitials(displayName)}
              </Text>
            </View>
            <View>
              <Text style={[styles.greetingLine, { fontFamily: Fonts.sansMedium }]}>{getGreeting()},</Text>
              <Text style={[styles.nameLine, { fontFamily: Fonts.serif }]}>{firstName}</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => router.push("/settings")} style={styles.iconBtn} accessibilityLabel="Settings">
            <SettingsLinear color="#fff" size={18} />
          </Pressable>
        </View>

        <View style={styles.careBlock}>
          <Pressable onPress={() => router.push("/meds")} style={styles.careLinkRow}>
            <Text style={[styles.careLink, { fontFamily: Fonts.sansMedium }]}>Today's care</Text>
            <AltArrowRightLinear color="rgba(255,255,255,0.85)" size={12} />
          </Pressable>
          <View style={styles.doseRow}>
            <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
              <Text style={[styles.doseBig, { fontFamily: Fonts.serif }]}>
                {hideStats ? "•••" : `${doneToday}/${totalToday || 0}`}
              </Text>
              <Text style={[styles.doseLabel, { fontFamily: Fonts.sans }]}>doses</Text>
            </View>
            <Pressable onPress={() => setHideStats((v) => !v)} style={styles.iconBtn}>
              <EyeClosedLinear color="rgba(255,255,255,0.9)" size={18} />
            </Pressable>
          </View>
        </View>

        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <View style={styles.statCardTop}>
              <PillBold color="#fff" size={18} />
              <Text style={[styles.statEyebrow, { fontFamily: Fonts.sansBold }]}>ACTIVE</Text>
            </View>
            <Text style={[styles.statMuted, { fontFamily: Fonts.sans }]}>Medications</Text>
            <Text style={[styles.statValue, { fontFamily: Fonts.serif }]}>{hideStats ? "••" : activeMeds}</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statCardTop}>
              <ChartLinear color="#fff" size={18} />
              <Text style={[styles.statEyebrow, { fontFamily: Fonts.sansBold }]}>7 DAYS</Text>
            </View>
            <Text style={[styles.statMuted, { fontFamily: Fonts.sans }]}>Adherence</Text>
            <Text style={[styles.statValue, { fontFamily: Fonts.serif }]}>
              {hideStats ? "•••" : `${adherencePct}%`}
            </Text>
          </View>
        </View>

        <View style={styles.quickRow}>
          <Pressable
            onPress={() => router.push("/meds")}
            style={({ pressed }) => [styles.quickBtn, pressed && { opacity: 0.92 }]}
          >
            <AddCircleBold color={Brand.red} size={20} />
            <Text style={[styles.quickLabel, { fontFamily: Fonts.sansBold }]}>Log dose</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/crisis")}
            style={({ pressed }) => [styles.quickBtn, pressed && { opacity: 0.92 }]}
          >
            <HeartPulseLinear color={Brand.red} size={20} />
            <Text style={[styles.quickLabel, { fontFamily: Fonts.sansBold }]}>Crisis</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/records")}
            style={({ pressed }) => [styles.quickBtn, pressed && { opacity: 0.92 }]}
          >
            <DocumentTextLinear color={Brand.red} size={20} />
            <Text style={[styles.quickLabel, { fontFamily: Fonts.sansBold }]}>Records</Text>
          </Pressable>
        </View>
      </LinearGradient>

      <View style={[styles.sheet, { backgroundColor: t.surface }]}>
        <View style={[styles.handle, { backgroundColor: t.tabBorder }]} />

        {busy && !data ? (
          <View style={styles.sheetBusy}>
            <ActivityIndicator size="small" color={Brand.red} />
            <Text style={[styles.sheetBusyText, { color: t.textMuted, fontFamily: Fonts.sans }]}>Loading your data…</Text>
          </View>
        ) : null}

        {configError ? (
          <View style={[styles.banner, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <Text style={[styles.bannerText, { color: t.text, fontFamily: Fonts.sans }]}>
              Connect Supabase: set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY (see app config / lib/env).
            </Text>
          </View>
        ) : null}

        {fetchError ? (
          <View style={[styles.banner, { borderColor: `${Brand.red}44`, backgroundColor: `${Brand.red}10` }]}>
            <Text style={[styles.bannerText, { color: t.text, fontFamily: Fonts.sans }]}>{fetchError}</Text>
            <Pressable onPress={() => void load("pull")} style={styles.retry}>
              <Text style={[styles.retryText, { fontFamily: Fonts.sansBold }]}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        <View style={styles.toolsGrid}>
          <Pressable
            onPress={() => router.push("/meds")}
            style={[styles.toolHalf, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
          >
            <Text style={[styles.toolTitle, { color: t.text, fontFamily: Fonts.sansBold }]}>Genotype checker</Text>
            <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              See pregnancy outcomes for any pairing.
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/directory")}
            style={[styles.toolHalf, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
          >
            <Text style={[styles.toolTitle, { color: t.text, fontFamily: Fonts.sansBold }]}>Family tree</Text>
            <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              Add relatives and check shared risk.
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/directory")}
          style={[styles.resourcesRow, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
        >
          <View style={{ flex: 1, paddingRight: 24 }}>
            <Text style={[styles.toolTitle, { color: t.text, fontFamily: Fonts.sansBold }]}>Resources Library</Text>
            <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              Trusted reads on SCD, treatment, and daily life.
            </Text>
          </View>
          <AltArrowRightLinear color={t.textMuted} size={14} />
        </Pressable>

        <View style={styles.sectionHead}>
          <Text style={[styles.sectionEyebrow, styles.sectionEyebrowAccent]}>Next dose</Text>
          <Pressable onPress={() => router.push("/meds")} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={[styles.seeAll, { color: Brand.red, fontFamily: Fonts.sansBold }]}>See all</Text>
            <AltArrowRightLinear color={Brand.red} size={12} />
          </Pressable>
        </View>

        {!nextMed && medications.length === 0 ? (
          <Pressable
            onPress={() => router.push("/add-medication")}
            style={[styles.nextCard, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}
          >
            <View style={[styles.nextIcon, { backgroundColor: `${Brand.red}22` }]}>
              <PillLinear color={Brand.red} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.medName, { color: t.text, fontFamily: Fonts.serif }]}>No medications yet</Text>
              <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                Add a medication to see reminders here.
              </Text>
            </View>
            <AltArrowRightLinear color={Brand.red} size={14} />
          </Pressable>
        ) : !nextMed ? (
          <View style={[styles.nextCard, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <View style={[styles.nextIcon, { backgroundColor: `${Brand.teal}22` }]}>
              <PillLinear color={Brand.teal} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.medName, { color: t.text, fontFamily: Fonts.serif }]}>You're all caught up</Text>
              <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>Great job today.</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.nextCard, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <View style={[styles.nextIcon, { backgroundColor: `${Brand.red}22` }]}>
              <PillLinear color={Brand.red} size={22} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.timeRow}>
                <ClockCircleBold color={Brand.red} size={12} />
                <Text style={[styles.timeText, { color: Brand.red, fontFamily: Fonts.sansBold }]}>
                  {formatReminder(nextMed.reminderTime)}
                </Text>
              </View>
              <Text style={[styles.medName, { color: t.text, fontFamily: Fonts.serif }]}>{nextMed.name}</Text>
              <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>{nextMed.dose}</Text>
            </View>
            <Pressable
              onPress={() => void onMarkTaken(nextMed)}
              disabled={markingId === nextMed.id}
              style={({ pressed }) => [
                styles.takePill,
                { backgroundColor: Brand.red, opacity: pressed || markingId === nextMed.id ? 0.75 : 1 },
              ]}
            >
              <Text style={[styles.takePillText, { fontFamily: Fonts.sansBold }]}>
                {markingId === nextMed.id ? "…" : "Take"}
              </Text>
            </Pressable>
          </View>
        )}

        <Text style={[styles.sectionEyebrow, styles.sectionEyebrowAccent, { marginTop: 8 }]}>Today's schedule</Text>
        <View style={{ gap: 10 }}>
          {medications.length === 0 ? (
            <Text style={[styles.emptyHint, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              No schedule yet — add medications from the Meds tab.
            </Text>
          ) : (
            medications.map((med) => {
              const done = takenToday.has(med.id);
              return (
                <View
                  key={med.id}
                  style={[styles.scheduleRow, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}
                >
                  <View style={[styles.scheduleIcon, { backgroundColor: `${Brand.red}22` }]}>
                    <PillLinear color={Brand.red} size={18} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.scheduleTime, { color: Brand.red, fontFamily: Fonts.sansBold }]}>
                      {formatReminder(med.reminderTime)}
                    </Text>
                    <Text style={[styles.scheduleName, { color: t.text, fontFamily: Fonts.serif }]} numberOfLines={1}>
                      {med.name}
                    </Text>
                    <Text style={[styles.toolSub, { color: t.textMuted, fontFamily: Fonts.sans }]} numberOfLines={1}>
                      {med.dose}
                    </Text>
                  </View>
                  {done ? (
                    <View style={[styles.takeOutline, { borderColor: t.tabBorder, backgroundColor: t.background }]}>
                      <Text style={[styles.takeOutlineText, { color: t.textMuted, fontFamily: Fonts.sansBold }]}>Done</Text>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => void onMarkTaken(med)}
                      disabled={markingId === med.id}
                      style={({ pressed }) => [
                        styles.takeOutline,
                        {
                          borderColor: `${Brand.red}55`,
                          backgroundColor: `${Brand.red}12`,
                          opacity: pressed || markingId === med.id ? 0.7 : 1,
                        },
                      ]}
                    >
                      <Text style={[styles.takeOutlineText, { color: Brand.red, fontFamily: Fonts.sansBold }]}>
                        {markingId === med.id ? "…" : "Take"}
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            })
          )}
        </View>

        <Text style={[styles.sectionEyebrow, styles.sectionEyebrowAccent, { marginTop: 10 }]}>Recent</Text>
        <View style={styles.recentRow}>
          <Pressable
            onPress={() => router.push("/crisis")}
            style={[styles.recentCard, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}
          >
            <View style={[styles.recentIcon, { backgroundColor: `${Brand.red}14` }]}>
              <HeartPulseLinear color={Brand.red} size={16} />
            </View>
            <Text style={[styles.recentEyebrow, { color: t.textMuted, fontFamily: Fonts.sansBold }]}>Last crisis</Text>
            <Text style={[styles.recentTitle, { color: t.text, fontFamily: Fonts.serif }]}>{crisisTitle}</Text>
            <Text style={[styles.recentSub, { color: t.textMuted, fontFamily: Fonts.sans }]} numberOfLines={2}>
              {crisisSub}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/records")}
            style={[styles.recentCard, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}
          >
            <View style={[styles.recentIcon, { backgroundColor: `${Brand.red}14` }]}>
              <DocumentTextLinear color={Brand.red} size={16} />
            </View>
            <Text style={[styles.recentEyebrow, { color: t.textMuted, fontFamily: Fonts.sansBold }]}>Records</Text>
            <Text style={[styles.recentTitle, { color: t.text, fontFamily: Fonts.serif }]}>{recordCount}</Text>
            <Text style={[styles.recentSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>saved</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingBottom: 120 },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarBlock: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
  },
  avatarInitials: { fontSize: 15, color: Brand.red },
  greetingLine: { fontSize: 12, color: "rgba(255,255,255,0.75)" },
  nameLine: { fontSize: 20, color: "#fff", marginTop: 2 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  careBlock: { marginTop: 28 },
  careLinkRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  careLink: { fontSize: 13, color: "rgba(255,255,255,0.88)" },
  doseRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: 4 },
  doseBig: { fontSize: 36, color: "#fff", letterSpacing: -1 },
  doseLabel: { fontSize: 14, color: "rgba(255,255,255,0.82)" },
  statRow: { flexDirection: "row", gap: 12, marginTop: 22 },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  statCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statEyebrow: {
    fontSize: 9,
    letterSpacing: 1.2,
    color: "rgba(255,255,255,0.75)",
    textTransform: "uppercase",
  },
  statMuted: { fontSize: 11, color: "rgba(255,255,255,0.78)", marginTop: 12 },
  statValue: { fontSize: 24, color: "#fff", marginTop: 4, letterSpacing: -0.5 },
  quickRow: { flexDirection: "row", gap: 10, marginTop: 20 },
  quickBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  quickLabel: { fontSize: 12, color: Brand.red },
  sheet: {
    marginTop: -28,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
    gap: 16,
  },
  sheetBusy: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 },
  sheetBusyText: { fontSize: 13 },
  banner: { borderRadius: 12, borderWidth: 1, padding: 12, gap: 8 },
  bannerText: { fontSize: 12, lineHeight: 18 },
  retry: { alignSelf: "flex-start" },
  retryText: { fontSize: 13, color: Brand.red },
  emptyHint: { fontSize: 12, lineHeight: 18, paddingVertical: 4 },
  handle: { width: 40, height: 4, borderRadius: 2, alignSelf: "center", marginBottom: 4 },
  toolsGrid: { flexDirection: "row", gap: 12 },
  toolHalf: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    minHeight: 88,
  },
  toolTitle: { fontSize: 13 },
  toolSub: { fontSize: 11, marginTop: 6, lineHeight: 16 },
  resourcesRow: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 4,
  },
  sectionEyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  sectionEyebrowAccent: {
    color: "#c0707d",
    fontFamily: Fonts.sansBold,
  },
  seeAll: { fontSize: 12 },
  nextCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  nextIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  timeText: { fontSize: 11, letterSpacing: 0.5 },
  medName: { fontSize: 18, marginTop: 4 },
  takePill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
  },
  takePillText: { color: "#fff", fontSize: 12 },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
  },
  scheduleIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleTime: { fontSize: 10, letterSpacing: 1 },
  scheduleName: { fontSize: 15, marginTop: 2 },
  takeOutline: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  takeOutlineText: { fontSize: 11 },
  recentRow: { flexDirection: "row", gap: 12 },
  recentCard: { flex: 1, borderRadius: 16, borderWidth: 1, padding: 14 },
  recentIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  recentEyebrow: {
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  recentTitle: { fontSize: 20, marginTop: 4 },
  recentSub: { fontSize: 12, marginTop: 4 },
  centered: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  signInHero: { borderRadius: 20, padding: 24, width: "100%", maxWidth: 400 },
  signInGreeting: { fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: Fonts.sans },
  signInName: { fontSize: 22, color: "#fff", marginTop: 4, fontFamily: Fonts.serif },
  signInSub: { fontSize: 14, color: "rgba(255,255,255,0.88)", marginTop: 12, lineHeight: 21, fontFamily: Fonts.sans },
});
