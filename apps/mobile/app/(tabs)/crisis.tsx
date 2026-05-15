import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AlertTriangle, Droplets } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import HemoraLottie from "@/components/HemoraLottie";
import { SafeAreaView } from "react-native-safe-area-context";

import { BodyPainPicker } from "@/components/body/BodyPainPicker";
import { DonutChart } from "@/components/charts/DonutChart";
import {
  AddCircleBold,
  AltArrowLeftLinear,
  ChartSquareLinear,
  CheckCircleBold,
  ClockCircleBold,
  HeartPulse2Bold,
  HeartPulse2Linear,
  HospitalBold,
  PillBold,
  ShareLinear,
} from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import {
  fetchCrisisInsights,
  fetchProfileGender,
  fetchRecentCrisisLogs,
  insertCrisisLog,
  type CrisisInsightsPayload,
  type CrisisLogRow,
} from "@/lib/crisisScreenData";
import { getSupabase } from "@/lib/supabase";

const LOTTIE_MILD = require("@/assets/lottie/1f60a.json");
const LOTTIE_MODERATE = require("@/assets/lottie/1f614.json");
const LOTTIE_SEVERE = require("@/assets/lottie/1f613.json");
const LOTTIE_WORST = require("@/assets/lottie/1f621.json");
const LOTTIE_COLD = require("@/assets/lottie/1f976.json");
const LOTTIE_STRESS = require("@/assets/lottie/1f629.json");
const LOTTIE_INFECTION = require("@/assets/lottie/1f92e.json");
const LOTTIE_DEHYDRATION = require("@/assets/lottie/1f4a7.json");
const LOTTIE_EXERTION = require("@/assets/lottie/1f624.json");
const LOTTIE_CLOCK = require("@/assets/lottie/23f0.json");
const LOTTIE_STETH = require("@/assets/lottie/1fa7a.json");
const LOTTIE_REST = require("@/assets/lottie/1f634.json");
const LOTTIE_MEDS = require("@/assets/lottie/1f917.json");
const LOTTIE_BATH = require("@/assets/lottie/2668.json");
const LOTTIE_MASSAGE = require("@/assets/lottie/1f64c.json");
const LOTTIE_SHRUG = require("@/assets/lottie/1f615.json");

const PAIN = [
  {
    level: "mild",
    source: LOTTIE_MILD,
    bg: "#5C9B85",
    label: "Mild",
    caption: "I can manage this",
  },
  {
    level: "moderate",
    source: LOTTIE_MODERATE,
    bg: "#C9A24A",
    label: "Moderate",
    caption: "It's noticeable",
  },
  {
    level: "severe",
    source: LOTTIE_SEVERE,
    bg: "#C97A4A",
    label: "Severe",
    caption: "It's hard to bear",
  },
  {
    level: "worst",
    source: LOTTIE_WORST,
    bg: "#8C2A3A",
    label: "Worst",
    caption: "I need help now",
  },
] as const;

const TRIGGERS = [
  { key: "Cold Weather", bg: "#3B7FB8", caption: "Cold can constrict blood flow", source: LOTTIE_COLD },
  { key: "Stress", bg: "#7A5CA8", caption: "Stress takes a toll on the body", source: LOTTIE_STRESS },
  { key: "Infection", bg: "#5C9B5C", caption: "Infections can trigger crises", source: LOTTIE_INFECTION },
  { key: "Dehydration", bg: "#3FA6B8", caption: "Hydration helps cells flow", source: LOTTIE_DEHYDRATION },
  { key: "Exertion", bg: "#C97A4A", caption: "Push gentle, rest often", source: LOTTIE_EXERTION },
  { key: "Missed meds", bg: "#A85C7A", caption: "Routine matters — set a reminder", source: LOTTIE_CLOCK },
  { key: "Other", bg: "#3D6B6B", caption: "Note it for your team", source: LOTTIE_STETH },
] as const;

const RELIEFS = [
  { key: "Rest", bg: "#5C7A9B", caption: "Rest helps your body recover", source: LOTTIE_REST },
  { key: "Fluids", bg: "#3FA6B8", caption: "Hydration keeps cells flowing", source: LOTTIE_DEHYDRATION },
  { key: "Pain meds", bg: "#7A5CA8", caption: "Take your meds as prescribed", source: LOTTIE_MEDS },
  { key: "Warm bath", bg: "#C97A4A", caption: "Warmth eases the muscles", source: LOTTIE_BATH },
  { key: "Massage", bg: "#A85C7A", caption: "Gentle touch can soothe pain", source: LOTTIE_MASSAGE },
  { key: "Nothing yet", bg: "#3D6B6B", caption: "It's okay — let's keep tracking", source: LOTTIE_SHRUG },
] as const;

const DEFAULT_FLOW_BG = "#3D6B6B";

type Phase = "hub" | "insights" | "flow";
type FlowStep = "pain" | "location" | "triggers" | "relief" | "hospital";
type InsightTab = "overview" | "trends";

function toggleItem(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

function painBar(level: string): string {
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

function painLottieSource(level: string) {
  switch (level.toLowerCase()) {
    case "mild":
      return LOTTIE_MILD;
    case "moderate":
      return LOTTIE_MODERATE;
    case "severe":
      return LOTTIE_SEVERE;
    case "worst":
      return LOTTIE_WORST;
    default:
      return LOTTIE_MILD;
  }
}

function StepDots({ current, total, light }: { current: number; total: number; light?: boolean }) {
  return (
    <View style={styles.dotsRow}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={String(i)}
          style={[
            styles.dot,
            { width: i < current ? 22 : 8 },
            { backgroundColor: i < current ? (light ? "#fff" : Brand.red) : light ? "rgba(255,255,255,0.35)" : `${Brand.muted}55` },
          ]}
        />
      ))}
    </View>
  );
}

export default function CrisisScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();

  const [phase, setPhase] = useState<Phase>("hub");
  const [flowStep, setFlowStep] = useState<FlowStep>("pain");
  const [painLevel, setPainLevel] = useState<(typeof PAIN)[number]["level"] | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [otherLocationText, setOtherLocationText] = useState("");
  const [triggers, setTriggers] = useState<string[]>([]);
  const [otherTriggerText, setOtherTriggerText] = useState("");
  const [whatHelped, setWhatHelped] = useState<string[]>([]);
  const [hospitalVisit, setHospitalVisit] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const [profileGender, setProfileGender] = useState<string | null>(null);

  const [logs, setLogs] = useState<CrisisLogRow[]>([]);
  const [logsLoading, setLogsLoading] = useState(true);

  const year = useMemo(() => new Date().getFullYear(), []);
  const [insightTab, setInsightTab] = useState<InsightTab>("overview");
  const [insightData, setInsightData] = useState<CrisisInsightsPayload | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configError, setConfigError] = useState(false);

  const load = useCallback(
    async (mode: "focus" | "pull") => {
      if (!user?.id) return;
      const supabase = getSupabase();
      if (!supabase) {
        setConfigError(true);
        setLogsLoading(false);
        setRefreshing(false);
        return;
      }
      setConfigError(false);
      if (mode === "pull") setRefreshing(true);
      else setLogsLoading(true);
      try {
        const [logRows, insights] = await Promise.all([
          fetchRecentCrisisLogs(supabase, user.id),
          fetchCrisisInsights(supabase, user.id, year),
        ]);
        setLogs(logRows);
        setInsightData(insights);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load crisis data");
      } finally {
        setLogsLoading(false);
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

  useEffect(() => {
    if (!user?.id) {
      setProfileGender(null);
      return;
    }
    const supabase = getSupabase();
    if (!supabase) return;
    void fetchProfileGender(supabase, user.id).then(setProfileGender);
  }, [user?.id]);

  const resetFlow = useCallback(() => {
    setFlowStep("pain");
    setPainLevel(null);
    setLocations([]);
    setOtherLocationText("");
    setTriggers([]);
    setOtherTriggerText("");
    setWhatHelped([]);
    setHospitalVisit(null);
  }, []);

  const openFlow = useCallback(() => {
    resetFlow();
    setPhase("flow");
  }, [resetFlow]);

  const closeFlowToHub = useCallback(() => {
    resetFlow();
    setPhase("hub");
  }, [resetFlow]);

  const selectedPain = painLevel ? PAIN.find((p) => p.level === painLevel) ?? null : null;
  const painBg = selectedPain?.bg ?? DEFAULT_FLOW_BG;

  const lastTrigger = triggers[triggers.length - 1];
  const triggerFocus = TRIGGERS.find((x) => x.key === lastTrigger) ?? null;
  const triggerBg = triggerFocus?.bg ?? DEFAULT_FLOW_BG;

  const lastRelief = whatHelped[whatHelped.length - 1];
  const reliefFocus = RELIEFS.find((x) => x.key === lastRelief) ?? null;
  const reliefBg = reliefFocus?.bg ?? DEFAULT_FLOW_BG;

  const finalLocations = useMemo(() => {
    if (locations.includes("Other") && otherLocationText.trim()) {
      return [...locations.filter((l) => l !== "Other"), `Other: ${otherLocationText.trim()}`];
    }
    return locations;
  }, [locations, otherLocationText]);

  const finalTriggers = useMemo(() => {
    if (triggers.includes("Other") && otherTriggerText.trim()) {
      return [...triggers.filter((x) => x !== "Other"), `Other: ${otherTriggerText.trim()}`];
    }
    return triggers;
  }, [triggers, otherTriggerText]);

  const saveLog = useCallback(async () => {
    if (!user?.id || !painLevel) return;
    const supabase = getSupabase();
    if (!supabase) {
      Alert.alert("Not configured", "Add Supabase keys to save a crisis log.");
      return;
    }
    setSaving(true);
    try {
      await insertCrisisLog(supabase, user.id, {
        painLevel,
        painLocations: finalLocations,
        triggers: finalTriggers,
        whatHelped,
        hospitalVisit: hospitalVisit === true,
      });
      Alert.alert("Log saved", "Thanks for tracking — it helps you see patterns.");
      const nextLogs = await fetchRecentCrisisLogs(supabase, user.id);
      setLogs(nextLogs);
      closeFlowToHub();
    } catch (e) {
      Alert.alert("Couldn't save", e instanceof Error ? e.message : "Please try again.");
    } finally {
      setSaving(false);
    }
  }, [user?.id, painLevel, finalLocations, finalTriggers, whatHelped, hospitalVisit, closeFlowToHub]);

  const total = insightData?.totalCrises ?? 0;
  const hospital = insightData?.hospitalVisits ?? 0;
  const uniqueDays = insightData?.uniqueCrisisDays ?? 0;
  const painSlices = insightData?.painSlices ?? [];
  const insightTriggers = insightData?.triggers ?? [];
  const topPain = painSlices[0];
  const donutPct = topPain && total > 0 ? topPain.pct : total > 0 ? 100 : 0;

  const flowStepIndex =
    flowStep === "pain" ? 1 : flowStep === "location" ? 2 : flowStep === "triggers" ? 3 : flowStep === "relief" ? 4 : 5;

  if (phase === "flow") {
    return (
      <View style={[styles.flowRoot, { backgroundColor: t.background }]}>
        {flowStep === "pain" && (
          <View style={[styles.flowFill, { backgroundColor: painBg }]}>
            <SafeAreaView style={styles.flowSafe} edges={["top"]}>
              <Pressable style={styles.flowBack} onPress={closeFlowToHub} accessibilityLabel="Back">
                <AltArrowLeftLinear color="#fff" size={20} />
              </Pressable>
              <StepDots current={flowStepIndex} total={5} light />
              <Text style={styles.flowH1}>How severe is{"\n"}the pain right now?</Text>
              <Text style={styles.flowSub}>Take a breath. Choose the face that fits.</Text>
              <View style={styles.flowCenter}>
                <HemoraLottie
                  source={selectedPain ? selectedPain.source : PAIN[1].source}
                  autoPlay
                  loop
                  style={[styles.bigFace, { opacity: selectedPain ? 1 : 0.55 }]}
                />
                <Text style={styles.flowCaption}>
                  {selectedPain ? (
                    <>
                      <Text style={styles.flowCaptionStrong}>{`I'm feeling ${selectedPain.label.toLowerCase()} pain`}</Text>
                      {"\n"}
                      <Text style={styles.flowCaptionItal}>&quot;{selectedPain.caption}&quot;</Text>
                    </>
                  ) : (
                    <Text style={styles.flowCaptionItal}>Tap a face below to start</Text>
                  )}
                </Text>
              </View>
              <View style={styles.faceRow}>
                {PAIN.map((face) => {
                  const on = painLevel === face.level;
                  return (
                    <Pressable
                      key={face.level}
                      onPress={() => setPainLevel(face.level)}
                      style={[styles.faceCell, on && styles.faceCellOn]}
                    >
                      <HemoraLottie source={face.source} autoPlay loop style={styles.faceSm} />
                      <Text style={[styles.faceLbl, on && styles.faceLblOn]}>{face.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <Pressable
                style={[styles.flowPrimaryBtn, !painLevel && styles.flowPrimaryBtnDisabled]}
                disabled={!painLevel}
                onPress={() => setFlowStep("location")}
              >
                <Text style={styles.flowPrimaryTxt}>Continue</Text>
                <CheckCircleBold color={Brand.ink} size={18} />
              </Pressable>
            </SafeAreaView>
          </View>
        )}

        {flowStep === "location" && (
          <SafeAreaView style={[styles.flowSafeLight, { backgroundColor: t.background, flex: 1 }]} edges={["top"]}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.locationScroll}
            >
              <Pressable style={styles.flowBackLight} onPress={() => setFlowStep("pain")} accessibilityLabel="Back">
                <AltArrowLeftLinear color={t.teal} size={20} />
              </Pressable>
              <StepDots current={flowStepIndex} total={5} />
              <Text style={[styles.hPage, { color: t.text }]}>Where does it hurt?</Text>
              <Text style={[styles.bodyMd, { color: t.textMuted }]}>
                Tap the body or the chips — same illustration as the web app.
              </Text>
              <BodyPainPicker
                gender={profileGender}
                selected={locations}
                onToggle={(label) => setLocations((prev) => toggleItem(prev, label))}
                otherText={otherLocationText}
                onOtherChange={setOtherLocationText}
                chipBorderColor={t.tabBorder}
                chipSurfaceColor={t.surface}
                chipTextColor={t.text}
              />
              <Pressable style={styles.ctaRed} onPress={() => setFlowStep("triggers")}>
                <Text style={styles.ctaRedTxt}>Next</Text>
              </Pressable>
            </ScrollView>
          </SafeAreaView>
        )}

        {flowStep === "triggers" && (
          <View style={[styles.flowFill, { backgroundColor: triggerBg }]}>
            <SafeAreaView style={styles.flowSafe} edges={["top"]}>
              <Pressable style={styles.flowBack} onPress={() => setFlowStep("location")} accessibilityLabel="Back">
                <AltArrowLeftLinear color="#fff" size={20} />
              </Pressable>
              <StepDots current={flowStepIndex} total={5} light />
              <Text style={styles.flowH1}>Any known triggers?</Text>
              <Text style={styles.flowSub}>Tap all that apply</Text>
              <View style={styles.flowCenter}>
                <HemoraLottie
                  source={triggerFocus?.source ?? LOTTIE_STETH}
                  autoPlay
                  loop
                  style={styles.bigLottieHero}
                />
                <Text style={styles.flowCaptionItal}>
                  {triggerFocus ? `"${triggerFocus.caption}"` : "Tap a trigger below"}
                </Text>
              </View>
              <View style={styles.triGrid}>
                {TRIGGERS.map((item) => {
                  const on = triggers.includes(item.key);
                  return (
                    <Pressable key={item.key} onPress={() => setTriggers((p) => toggleItem(p, item.key))} style={[styles.triCell, on && styles.triCellOn]}>
                      <HemoraLottie source={item.source} autoPlay loop style={styles.triLottie} />
                      <Text style={[styles.triLbl, on && styles.triLblOn]}>{item.key}</Text>
                    </Pressable>
                  );
                })}
              </View>
              {triggers.includes("Other") ? (
                <TextInput
                  value={otherTriggerText}
                  onChangeText={setOtherTriggerText}
                  placeholder="Describe your trigger…"
                  placeholderTextColor="rgba(255,255,255,0.55)"
                  style={styles.otherInputDark}
                />
              ) : null}
              <Pressable style={styles.flowPrimaryBtn} onPress={() => setFlowStep("relief")}>
                <Text style={styles.flowPrimaryTxt}>Next</Text>
                <CheckCircleBold color={Brand.ink} size={18} />
              </Pressable>
            </SafeAreaView>
          </View>
        )}

        {flowStep === "relief" && (
          <View style={[styles.flowFill, { backgroundColor: reliefBg }]}>
            <SafeAreaView style={styles.flowSafe} edges={["top"]}>
              <Pressable style={styles.flowBack} onPress={() => setFlowStep("triggers")} accessibilityLabel="Back">
                <AltArrowLeftLinear color="#fff" size={20} />
              </Pressable>
              <StepDots current={flowStepIndex} total={5} light />
              <Text style={styles.flowH1}>What has helped so far?</Text>
              <Text style={styles.flowSub}>Tap all that apply</Text>
              <View style={styles.flowCenter}>
                <HemoraLottie
                  source={reliefFocus?.source ?? LOTTIE_REST}
                  autoPlay
                  loop
                  style={styles.bigLottieHero}
                />
                <Text style={styles.flowCaptionItal}>
                  {reliefFocus ? `"${reliefFocus.caption}"` : "Tap what has helped below"}
                </Text>
              </View>
              <View style={styles.triGrid}>
                {RELIEFS.map((item) => {
                  const on = whatHelped.includes(item.key);
                  return (
                    <Pressable key={item.key} onPress={() => setWhatHelped((p) => toggleItem(p, item.key))} style={[styles.triCell, on && styles.triCellOn]}>
                      <HemoraLottie source={item.source} autoPlay loop style={styles.triLottie} />
                      <Text style={[styles.triLbl, on && styles.triLblOn]}>{item.key}</Text>
                    </Pressable>
                  );
                })}
              </View>
              <Pressable style={styles.flowPrimaryBtn} onPress={() => setFlowStep("hospital")}>
                <Text style={styles.flowPrimaryTxt}>Next</Text>
                <CheckCircleBold color={Brand.ink} size={18} />
              </Pressable>
            </SafeAreaView>
          </View>
        )}

        {flowStep === "hospital" && (
          <SafeAreaView style={[styles.flowSafeLight, { backgroundColor: t.background }]} edges={["top"]}>
            <Pressable style={styles.flowBackLight} onPress={() => setFlowStep("relief")} accessibilityLabel="Back">
              <AltArrowLeftLinear color={t.teal} size={20} />
            </Pressable>
            <StepDots current={flowStepIndex} total={5} />
            <Text style={[styles.hPage, { color: t.text }]}>Did this require a hospital visit?</Text>
            <Pressable
              style={[styles.hospChoice, { borderColor: t.tabBorder, backgroundColor: hospitalVisit === true ? `${Brand.red}18` : t.surface }]}
              onPress={() => setHospitalVisit(true)}
            >
              <Text style={[styles.hospChoiceTxt, { color: t.text, fontFamily: Fonts.sansBold }]}>Yes, visited hospital</Text>
              {hospitalVisit === true ? <CheckCircleBold color={Brand.red} size={22} /> : null}
            </Pressable>
            <Pressable
              style={[styles.hospChoice, { borderColor: t.tabBorder, backgroundColor: hospitalVisit === false ? `${Brand.red}18` : t.surface }]}
              onPress={() => setHospitalVisit(false)}
            >
              <Text style={[styles.hospChoiceTxt, { color: t.text, fontFamily: Fonts.sansBold }]}>No, managed at home</Text>
              {hospitalVisit === false ? <CheckCircleBold color={Brand.red} size={22} /> : null}
            </Pressable>
            <Pressable
              style={[styles.ctaRed, { marginTop: 24, opacity: hospitalVisit === null || saving ? 0.5 : 1 }]}
              disabled={hospitalVisit === null || saving}
              onPress={() => void saveLog()}
            >
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.ctaRedTxt}>Save log</Text>}
            </Pressable>
          </SafeAreaView>
        )}
      </View>
    );
  }

  if (phase === "insights") {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
        <View style={styles.insHeader}>
          <Pressable onPress={() => setPhase("hub")} style={styles.insBack}>
            <AltArrowLeftLinear color={t.teal} size={22} />
            <Text style={[styles.insBackLbl, { color: t.teal, fontFamily: Fonts.sansBold }]}>Crisis</Text>
          </Pressable>
        </View>
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
          {(refreshing && !insightData) || (!insightData && logsLoading) ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color={Brand.red} />
              <Text style={[styles.hint, { color: t.textMuted }]}>Loading…</Text>
            </View>
          ) : null}

          <View style={[styles.segmentWrap, { backgroundColor: `${Brand.teal}14` }]}>
            <Pressable
              onPress={() => setInsightTab("overview")}
              style={[styles.segmentBtn, insightTab === "overview" && { backgroundColor: Brand.red }]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { fontFamily: Fonts.sansBold },
                  { color: insightTab === "overview" ? "#fff" : t.textMuted },
                ]}
              >
                Overview
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setInsightTab("trends")}
              style={[styles.segmentBtn, insightTab === "trends" && { backgroundColor: Brand.red }]}
            >
              <Text
                style={[
                  styles.segmentText,
                  { fontFamily: Fonts.sansBold },
                  { color: insightTab === "trends" ? "#fff" : t.textMuted },
                ]}
              >
                Trends
              </Text>
            </Pressable>
          </View>

          {insightTab === "overview" ? (
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
                        <View style={[styles.dotSm, { backgroundColor: Brand.red }]} />
                        <Text style={[styles.legendMain, { color: t.text, fontFamily: Fonts.sans }]}>{p.label}</Text>
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
                {insightTriggers.length === 0 ? (
                  <Text style={[styles.triggerEmpty, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                    {total === 0 ? "Log a crisis to capture triggers." : "No triggers recorded on your logs yet."}
                  </Text>
                ) : (
                  insightTriggers.map((row, i) => (
                    <View key={`${row.label}-${i}`}>
                      {i > 0 ? <View style={[styles.sep, { backgroundColor: t.tabBorder }]} /> : null}
                      <View style={styles.triggerRow}>
                        <Text style={[styles.triggerLabel, { color: t.text, fontFamily: Fonts.sans }]}>{row.label}</Text>
                        <Text style={[styles.triggerCount, { color: t.text, fontFamily: Fonts.sansBold }]}>{row.count}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </>
          ) : (
            <View style={[styles.trendsPlaceholder, { borderColor: t.tabBorder }]}>
              <Text style={{ color: t.textMuted, fontFamily: Fonts.sans, textAlign: "center", lineHeight: 22 }}>
                This year you have logged {total} crisis{total === 1 ? "" : "es"}. More charts can mirror the web dashboard once you
                have several months of data.
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void load("pull")} tintColor={Brand.red} />
        }
      >
        <View style={styles.hubTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.hubTitle, { color: t.text }]}>Crisis</Text>
            <Text style={[styles.hubSub, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              You&apos;re not alone. We&apos;re here to help.
            </Text>
          </View>
          {logs.length > 0 ? (
            <View style={styles.iconRow}>
              <Pressable
                onPress={() => setPhase("insights")}
                style={[styles.iconBtn, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
                accessibilityLabel="Insights"
              >
                <ChartSquareLinear color={t.text} size={18} />
              </Pressable>
              <Pressable
                onPress={() =>
                  Alert.alert("Share history", "In the full app, this would open sharing options for your crisis history.")
                }
                style={[styles.iconBtn, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
                accessibilityLabel="Share history"
              >
                <ShareLinear color={t.text} size={18} />
              </Pressable>
            </View>
          ) : null}
        </View>

        {configError ? (
          <Text style={[styles.hint, { color: t.textMuted }]}>Add Supabase keys to load crisis history.</Text>
        ) : null}
        {error ? (
          <Pressable onPress={() => void load("pull")}>
            <Text style={[styles.hint, { color: Brand.red }]}>{error} — tap to retry</Text>
          </Pressable>
        ) : null}

        <View style={styles.heroCard}>
          <LinearGradient
            colors={["#6a1d2c", "#4a121e", "#3a0d18"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.heroGoldRing} />
          <Image
            source={require("@/assets/images/crisis-mug.png")}
            style={styles.heroMug}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <View style={styles.heroContent}>
            <Text style={[styles.heroH3, { fontFamily: Fonts.serifSemi }]}>In a crisis?</Text>
            <View style={styles.heroRuleRow}>
              <View style={styles.heroRule} />
              <HeartPulse2Bold color="#d8a55a" size={12} />
              <View style={styles.heroRule} />
            </View>
            <View style={styles.heroLi}>
              <View style={styles.heroLiIcon}>
                <HeartPulse2Bold size={12} color="#e8b96a" />
              </View>
              <Text style={styles.heroLiTxt}>Stay calm and follow your plan</Text>
            </View>
            <View style={styles.heroLi}>
              <View style={styles.heroLiIcon}>
                <PillBold size={12} color="#e8b96a" />
              </View>
              <Text style={styles.heroLiTxt}>Take your pain medication</Text>
            </View>
            <View style={styles.heroLi}>
              <View style={styles.heroLiIcon}>
                <Droplets size={12} color="#e8b96a" />
              </View>
              <Text style={styles.heroLiTxt}>Hydrate and rest</Text>
            </View>
            <View style={styles.heroLi}>
              <View style={styles.heroLiIcon}>
                <AlertTriangle size={12} color="#e8b96a" />
              </View>
              <Text style={styles.heroLiTxt}>Seek medical help if needed</Text>
            </View>
            <Pressable style={styles.heroCta} onPress={() => router.push("/emergency")}>
              <Text style={[styles.heroCtaTxt, { fontFamily: Fonts.sansBold }]}>View Action Plan</Text>
              <View style={{ transform: [{ rotate: "180deg" }] }}>
                <AltArrowLeftLinear color="#3a0d18" size={12} />
              </View>
            </Pressable>
          </View>
        </View>

        {logsLoading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={Brand.red} />
            <Text style={[styles.hint, { color: t.textMuted }]}>Loading…</Text>
          </View>
        ) : logs.length > 0 ? (
          <>
            <Text style={[styles.recentH, { color: t.text }]}>Recent Crisis Logs</Text>
            {logs.map((log, idx) => {
              const d = new Date(log.occurredAt);
              const dateStr = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
              const timeStr = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
              return (
                <Pressable
                  key={log.id}
                  onPress={() => router.push({ pathname: "/crisis-detail", params: { id: log.id } })}
                  style={[styles.logCard, { borderColor: t.tabBorder, backgroundColor: t.surface }]}
                >
                  <View style={[styles.logAccent, { backgroundColor: painBar(log.painLevel) }]} />
                  <View style={styles.logInner}>
                    <View style={styles.logTop}>
                      <View style={[styles.logEmojiWrap, { borderColor: t.tabBorder }]}>
                        <HemoraLottie source={painLottieSource(log.painLevel)} autoPlay loop style={styles.logEmoji} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View style={styles.logTitleRow}>
                          <Text style={[styles.logPain, { color: t.text, fontFamily: Fonts.serifSemi }]}>
                            {log.painLevel} pain
                          </Text>
                          <View style={[styles.badge, { backgroundColor: `${Brand.red}14` }]}>
                            <Text style={[styles.badgeTxt, { color: Brand.red, fontFamily: Fonts.sansBold }]}>
                              {log.painLevel}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.timeRow}>
                          <ClockCircleBold color={t.textMuted} size={11} />
                          <Text style={[styles.logTime, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                            {dateStr} · {timeStr}
                          </Text>
                        </View>
                        {log.painLocations.length > 0 ? (
                          <View style={styles.locRow}>
                            {log.painLocations.slice(0, 4).map((loc) => (
                              <View key={loc} style={[styles.locPill, { backgroundColor: `${Brand.teal}10` }]}>
                                <Text style={[styles.locPillTxt, { color: t.text, fontFamily: Fonts.sans }]}>{loc}</Text>
                              </View>
                            ))}
                            {log.painLocations.length > 4 ? (
                              <Text style={[styles.locMore, { color: t.textMuted }]}>+{log.painLocations.length - 4}</Text>
                            ) : null}
                          </View>
                        ) : null}
                        {log.triggers.length > 0 ? (
                          <Text style={[styles.triggerLine, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                            <Text style={{ fontFamily: Fonts.sansBold, color: t.text }}>Triggers · </Text>
                            {log.triggers.join(", ")}
                          </Text>
                        ) : null}
                        {log.hospitalVisit ? (
                          <View style={[styles.hospTag, { backgroundColor: `${Brand.gold}22` }]}>
                            <HospitalBold color={Brand.teal} size={13} />
                            <Text style={[styles.hospTagTxt, { color: Brand.tealDeep, fontFamily: Fonts.sansBold }]}>
                              Hospital visit required
                            </Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </>
        ) : (
          <View style={[styles.emptyCard, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
            <LinearGradient colors={["#c9a35a", "#e8dcc4"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.emptyIconGrad}>
              <HeartPulse2Linear color={Brand.red} size={30} />
            </LinearGradient>
            <Text style={[styles.emptyH, { color: t.text, fontFamily: Fonts.serifSemi }]}>
              No crises logged — that&apos;s a good thing.
            </Text>
            <Text style={[styles.emptyBody, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              When pain shows up, log it here. Over time you&apos;ll see patterns — triggers, what helped, when to call your team.
            </Text>
            <View style={styles.stepGrid}>
              {[
                { n: "1", tt: "Tap Start log" },
                { n: "2", tt: "Rate the pain" },
                { n: "3", tt: "Note what helped" },
              ].map((s) => (
                <View key={s.n} style={[styles.stepCell, { borderColor: t.tabBorder, backgroundColor: `${t.surface}ee` }]}>
                  <Text style={[styles.stepNum, { color: Brand.gold, fontFamily: Fonts.sansBold }]}>STEP {s.n}</Text>
                  <Text style={[styles.stepTxt, { color: t.text, fontFamily: Fonts.sansBold }]}>{s.tt}</Text>
                </View>
              ))}
            </View>
            <Pressable style={styles.ctaRed} onPress={openFlow}>
              <AddCircleBold color="#fff" size={18} />
              <Text style={[styles.ctaRedTxt, { marginLeft: 8 }]}>Log your first crisis</Text>
            </Pressable>
            <Pressable onPress={() => router.push("/emergency")}>
              <Text style={[styles.urgentLink, { color: Brand.gold, fontFamily: Fonts.sansBold }]}>
                In a crisis right now? Get urgent care →
              </Text>
            </Pressable>
          </View>
        )}

        {logs.length > 0 ? (
          <View style={{ marginTop: 8, marginBottom: 28 }}>
            <Pressable style={styles.ctaRed} onPress={openFlow}>
              <AddCircleBold color="#fff" size={18} />
              <Text style={[styles.ctaRedTxt, { marginLeft: 8 }]}>Start New Crisis Log</Text>
            </Pressable>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 8 },
  hubTitleRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8, paddingHorizontal: 4 },
  hubTitle: { fontFamily: Fonts.serif, fontSize: 28, letterSpacing: -0.5 },
  hubSub: { fontSize: 14, marginTop: 4, lineHeight: 20 },
  iconRow: { flexDirection: "row", gap: 8, marginTop: 4 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: { fontSize: 13, marginBottom: 10, lineHeight: 18 },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  heroCard: {
    borderRadius: 24,
    overflow: "hidden",
    marginTop: 12,
    marginBottom: 20,
    minHeight: 230,
    shadowColor: "#501019",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 8,
  },
  heroGoldRing: {
    ...StyleSheet.absoluteFillObject,
    margin: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(216, 165, 90, 0.28)",
    zIndex: 2,
    pointerEvents: "none",
  },
  heroMug: {
    position: "absolute",
    right: -6,
    bottom: 0,
    width: 148,
    height: 148,
    zIndex: 1,
  },
  heroContent: { padding: 20, paddingRight: 130, zIndex: 3 },
  heroH3: {
    fontSize: 22,
    letterSpacing: -0.4,
    color: "#f1cf86",
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroRuleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6, marginBottom: 12 },
  heroRule: { flex: 1, height: 1, backgroundColor: "rgba(216,165,90,0.45)" },
  heroLi: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  heroLiIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#5a1622",
    borderWidth: 1,
    borderColor: "rgba(216,165,90,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroLiTxt: { flex: 1, fontSize: 12.5, lineHeight: 18, color: "rgba(255,255,255,0.92)", fontFamily: Fonts.sansBold },
  heroCta: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    backgroundColor: "#f3d28a",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  heroCtaTxt: { fontSize: 12.5, color: "#3a0d18" },
  recentH: { fontFamily: Fonts.serifSemi, fontSize: 17, marginBottom: 12 },
  logCard: {
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#0f2837",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  logAccent: { width: 4 },
  logInner: { flex: 1, padding: 14, paddingLeft: 16 },
  logTop: { flexDirection: "row", gap: 12 },
  logEmojiWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logEmoji: { width: 32, height: 32 },
  logTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  logPain: { fontSize: 15, textTransform: "capitalize" },
  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  badgeTxt: { fontSize: 10, textTransform: "capitalize" },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 4, marginBottom: 8 },
  logTime: { fontSize: 11 },
  locRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  locPill: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  locPillTxt: { fontSize: 10.5 },
  locMore: { fontSize: 10.5, alignSelf: "center" },
  triggerLine: { fontSize: 11, lineHeight: 16 },
  hospTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  hospTagTxt: { fontSize: 11 },
  emptyCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 22,
    alignItems: "center",
    marginTop: 4,
  },
  emptyIconGrad: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyH: { fontSize: 18, textAlign: "center", marginBottom: 8 },
  emptyBody: { fontSize: 14, lineHeight: 21, textAlign: "center", maxWidth: 300, marginBottom: 18 },
  stepGrid: { flexDirection: "row", gap: 8, marginBottom: 18, width: "100%" },
  stepCell: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 10 },
  stepNum: { fontSize: 10, marginBottom: 4 },
  stepTxt: { fontSize: 11, lineHeight: 14 },
  ctaRed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Brand.red,
    paddingVertical: 16,
    borderRadius: 999,
    width: "100%",
  },
  ctaRedTxt: { color: "#fff", fontFamily: Fonts.sansBold, fontSize: 16 },
  urgentLink: { marginTop: 14, fontSize: 12 },
  flowRoot: { flex: 1 },
  flowFill: { flex: 1 },
  flowSafe: { flex: 1, paddingHorizontal: 22, paddingBottom: 20 },
  flowSafeLight: { flex: 1, paddingHorizontal: 22, paddingBottom: 24, paddingTop: 8 },
  flowBack: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  flowBackLight: {
    width: 40,
    height: 40,
    marginBottom: 8,
    justifyContent: "center",
  },
  flowH1: {
    fontFamily: Fonts.serifSemi,
    fontSize: 26,
    lineHeight: 30,
    textAlign: "center",
    color: "#fff",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  flowSub: { textAlign: "center", color: "rgba(255,255,255,0.75)", fontSize: 14, fontFamily: Fonts.sans, marginBottom: 8 },
  flowCenter: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 12 },
  bigFace: { width: 200, height: 200, marginBottom: 16 },
  bigLottieHero: { width: 100, height: 100, marginBottom: 12 },
  flowCaption: { alignItems: "center", paddingHorizontal: 12 },
  flowCaptionStrong: { fontFamily: Fonts.serifSemi, fontSize: 22, color: "#fff", textAlign: "center" },
  flowCaptionItal: { fontSize: 14, color: "rgba(255,255,255,0.88)", fontStyle: "italic", textAlign: "center", marginTop: 6 },
  faceRow: { flexDirection: "row", gap: 8, marginBottom: 20 },
  faceCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  faceCellOn: { backgroundColor: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.35)" },
  faceSm: { width: 36, height: 36 },
  faceLbl: { fontSize: 11, fontFamily: Fonts.sansBold, color: "rgba(255,255,255,0.72)", marginTop: 4 },
  faceLblOn: { color: "#fff" },
  flowPrimaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  flowPrimaryBtnDisabled: { opacity: 0.45 },
  flowPrimaryTxt: { fontFamily: Fonts.sansBold, fontSize: 16, color: Brand.ink },
  hPage: {
    fontFamily: Fonts.serifSemi,
    fontSize: 26,
    textAlign: "center",
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  bodyMd: { fontSize: 14, textAlign: "center", lineHeight: 20, marginBottom: 16, fontFamily: Fonts.sans },
  locationScroll: { paddingHorizontal: 22, paddingBottom: 32, paddingTop: 8 },
  otherInput: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    minHeight: 72,
    textAlignVertical: "top",
    marginBottom: 12,
  },
  triGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 12 },
  triCell: {
    width: "30%",
    minWidth: 96,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  triCellOn: { backgroundColor: "rgba(255,255,255,0.22)", borderColor: "rgba(255,255,255,0.45)" },
  triLottie: { width: 36, height: 36, marginBottom: 4 },
  triLbl: { fontSize: 11, fontFamily: Fonts.sansBold, color: "rgba(255,255,255,0.75)", textAlign: "center" },
  triLblOn: { color: "#fff" },
  otherInputDark: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    padding: 14,
    color: "#fff",
    marginBottom: 12,
    fontFamily: Fonts.sans,
  },
  hospChoice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  hospChoiceTxt: { fontSize: 15 },
  dotsRow: { flexDirection: "row", gap: 8, justifyContent: "center", marginBottom: 20 },
  dot: { height: 6, borderRadius: 3 },
  insHeader: { paddingHorizontal: 12, paddingBottom: 4 },
  insBack: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 8, paddingHorizontal: 8 },
  insBackLbl: { fontSize: 15 },
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
  dotSm: { width: 8, height: 8, borderRadius: 4 },
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
