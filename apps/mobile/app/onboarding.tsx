import { Stack, router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, ArrowRight, Sparkles } from "lucide-react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { getSupabase } from "@/lib/supabase";

// ─── Types ─────────────────────────────────────────────────────────────────

type SetupFor = "myself" | "my_child" | "someone_i_care_for" | "partner_and_i";

interface FormData {
  setupFor: SetupFor;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  scdStatus: string;
  country: string;
}

// ─── Static data ───────────────────────────────────────────────────────────

const SETUP_OPTIONS: { id: SetupFor; label: string; sub: string }[] = [
  { id: "myself", label: "Myself", sub: "I live with sickle cell" },
  { id: "my_child", label: "My child", sub: "I'm caring for my little one" },
  { id: "someone_i_care_for", label: "Someone I care for", sub: "A loved one or family member" },
  { id: "partner_and_i", label: "My partner and I", sub: "We're navigating this together" },
];

const GENOTYPES = ["HbSS", "HbSC", "HbSβ", "AS (Trait)", "Not sure", "Prefer not to say"];
const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];
const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "United Kingdom", "United States", "South Africa",
  "Tanzania", "Uganda", "Cameroon", "Ivory Coast", "Senegal", "Ethiopia",
  "Democratic Republic of Congo", "Togo", "Benin", "Angola", "Zambia",
  "Zimbabwe", "Malawi", "Mozambique", "Canada", "France", "Italy",
  "Germany", "Netherlands", "Belgium", "Spain", "Brazil", "Jamaica",
  "Trinidad and Tobago", "India", "Saudi Arabia", "UAE", "Other",
];

const TOTAL_STEPS = 7;

// ─── Component ─────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<FormData>({
    setupFor: "myself",
    fullName: (user?.user_metadata?.full_name as string) || "",
    dateOfBirth: "",
    gender: "",
    scdStatus: "",
    country: "",
  });

  const update = useCallback(<K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
  }, []);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), []);
  const back = useCallback(() => {
    if (step <= 1) return;
    setStep((s) => s - 1);
  }, [step]);

  const canAdvance =
    step === 1 ? !!data.setupFor :
    step === 2 ? data.fullName.trim().length >= 2 :
    true;

  const handleFinish = async () => {
    if (!user?.id) return;
    const supabase = getSupabase();
    if (!supabase) {
      Alert.alert("Setup needed", "Supabase is not configured.");
      return;
    }

    setSaving(true);
    try {
      // 1. Upsert profile
      const { data: profileRow, error: profileErr } = await supabase
        .from("profiles")
        .upsert(
          {
            user_id: user.id,
            full_name: data.fullName,
            setup_for: data.setupFor,
            country: data.country || null,
            date_of_birth: data.dateOfBirth || null,
            gender: data.gender || null,
            scd_status: data.scdStatus || null,
          },
          { onConflict: "user_id" }
        )
        .select("id")
        .single();

      if (profileErr) throw profileErr;

      // 2. Create self family member
      const isSelf = data.setupFor === "myself";
      const selfName = isSelf ? data.fullName : (user.user_metadata?.full_name as string || user.email?.split("@")[0] || "Me");

      const { data: selfMember, error: selfErr } = await supabase
        .from("family_members")
        .upsert(
          {
            user_id: user.id,
            full_name: selfName,
            relationship: "Self",
            is_self: true,
            genotype: isSelf ? data.scdStatus || null : null,
          },
          { onConflict: "user_id,is_self" }
        )
        .select("id")
        .single();

      if (selfErr && selfErr.code !== "23505") throw selfErr;

      // 3. If setting up for someone else, create a dependent member
      if (!isSelf) {
        const relationship =
          data.setupFor === "my_child" ? "child" :
          data.setupFor === "someone_i_care_for" ? "dependent" :
          data.setupFor === "partner_and_i" ? "partner" : "other";

        await supabase.from("family_members").insert({
          user_id: user.id,
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth || null,
          relationship,
          genotype: data.scdStatus || null,
          is_self: false,
        });
      }

      router.replace("/(tabs)");
    } catch (err: any) {
      Alert.alert("Something went wrong", err?.message || "Please try again in a moment.");
    } finally {
      setSaving(false);
    }
  };

  const progressDots = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.root, { backgroundColor: t.background }]} edges={["top", "bottom"]}>
        {/* ── Header: back + progress dots ── */}
        {step > 0 && step < TOTAL_STEPS && (
          <View style={styles.header}>
            <TouchableOpacity onPress={back} style={styles.backBtn} hitSlop={8}>
              <ChevronLeft size={22} color={t.text} />
            </TouchableOpacity>
            <View style={styles.dotsRow}>
              {progressDots.map((s) => (
                <View
                  key={s}
                  style={[
                    styles.dot,
                    s <= step
                      ? { backgroundColor: t.text, width: s === step ? 22 : 6, opacity: s === step ? 1 : 0.4 }
                      : { backgroundColor: t.tabBorder, width: 6, opacity: 0.5 },
                  ]}
                />
              ))}
            </View>
            <View style={styles.headerSpacer} />
          </View>
        )}

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* ── STEP 1: Who are you setting up for? ── */}
            {step === 1 && (
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: t.textMuted }]}>Step One</Text>
                <Text style={[styles.stepTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  Who are you setting up Kindred for?
                </Text>
                <View style={{ gap: 10, marginTop: 24 }}>
                  {SETUP_OPTIONS.map((opt) => {
                    const selected = data.setupFor === opt.id;
                    return (
                      <TouchableOpacity
                        key={opt.id}
                        onPress={() => { update("setupFor", opt.id); setTimeout(next, 220); }}
                        activeOpacity={0.85}
                        style={[
                          styles.optionCard,
                          {
                            backgroundColor: selected ? t.teal : t.surface,
                            borderColor: selected ? t.teal : t.tabBorder,
                          },
                        ]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={[styles.optionLabel, { color: selected ? "#fff" : t.text }]}>
                            {opt.label}
                          </Text>
                          <Text style={[styles.optionSub, { color: selected ? "rgba(255,255,255,0.75)" : t.textMuted }]}>
                            {opt.sub}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* ── STEP 2: Name ── */}
            {step === 2 && (
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: t.textMuted }]}>Step Two</Text>
                <Text style={[styles.stepTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  {data.setupFor === "myself" ? "What should we call you?" :
                   data.setupFor === "my_child" ? "What's your child's name?" :
                   "What's their name?"}
                </Text>
                <Text style={[styles.stepSub, { color: t.textMuted }]}>
                  We'll use this to personalize your experience.
                </Text>
                <TextInput
                  autoFocus
                  value={data.fullName}
                  onChangeText={(v) => update("fullName", v)}
                  placeholder="Full name"
                  placeholderTextColor={t.textMuted}
                  style={[styles.textInput, { borderColor: t.tabBorder, color: t.text, backgroundColor: t.surface }]}
                  returnKeyType="next"
                  onSubmitEditing={() => { if (canAdvance) next(); }}
                />
                <TouchableOpacity
                  onPress={next}
                  disabled={!canAdvance}
                  style={[styles.primaryBtn, { backgroundColor: t.teal, opacity: canAdvance ? 1 : 0.4 }]}
                >
                  <Text style={styles.primaryBtnLabel}>Continue</Text>
                  <ArrowRight size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            {/* ── STEP 3: Date of birth ── */}
            {step === 3 && (
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: t.textMuted }]}>Step Three</Text>
                <Text style={[styles.stepTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  {data.setupFor === "myself" ? "When were you born?" : "When were they born?"}
                </Text>
                <Text style={[styles.stepSub, { color: t.textMuted }]}>
                  Helps us tailor age-appropriate guidance. You can skip this.
                </Text>
                <TextInput
                  autoFocus
                  value={data.dateOfBirth}
                  onChangeText={(v) => update("dateOfBirth", v)}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={t.textMuted}
                  keyboardType="numeric"
                  style={[styles.textInput, { borderColor: t.tabBorder, color: t.text, backgroundColor: t.surface }]}
                />
                <View style={styles.row}>
                  <TouchableOpacity onPress={next} style={[styles.ghostBtn, { borderColor: t.tabBorder }]}>
                    <Text style={[styles.ghostBtnLabel, { color: t.textMuted }]}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={next}
                    style={[styles.primaryBtn, { flex: 2, backgroundColor: t.teal }]}
                  >
                    <Text style={styles.primaryBtnLabel}>Continue</Text>
                    <ArrowRight size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* ── STEP 4: Gender ── */}
            {step === 4 && (
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: t.textMuted }]}>Step Four</Text>
                <Text style={[styles.stepTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  {data.setupFor === "myself" ? "How do you identify?" : "How do they identify?"}
                </Text>
                <Text style={[styles.stepSub, { color: t.textMuted }]}>Optional — skip if you'd rather not say.</Text>
                <View style={styles.chipGrid}>
                  {GENDERS.map((g) => {
                    const selected = data.gender === g;
                    return (
                      <TouchableOpacity
                        key={g}
                        onPress={() => { update("gender", g); setTimeout(next, 220); }}
                        style={[
                          styles.chip,
                          { backgroundColor: selected ? t.teal : t.surface, borderColor: selected ? t.teal : t.tabBorder },
                        ]}
                      >
                        <Text style={[styles.chipLabel, { color: selected ? "#fff" : t.text }]}>{g}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* ── STEP 5: SCD genotype ── */}
            {step === 5 && (
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: t.textMuted }]}>Step Five</Text>
                <Text style={[styles.stepTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  Sickle cell genotype
                </Text>
                <Text style={[styles.stepSub, { color: t.textMuted }]}>
                  If you know it, share it — it helps us personalize care guidance.
                </Text>
                <View style={styles.chipWrap}>
                  {GENOTYPES.map((g) => {
                    const selected = data.scdStatus === g;
                    return (
                      <TouchableOpacity
                        key={g}
                        onPress={() => update("scdStatus", g)}
                        style={[
                          styles.pill,
                          { backgroundColor: selected ? t.teal : t.surface, borderColor: selected ? t.teal : t.tabBorder },
                        ]}
                      >
                        <Text style={[styles.pillLabel, { color: selected ? "#fff" : t.text }]}>{g}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity onPress={next} style={[styles.primaryBtn, { backgroundColor: t.teal, marginTop: 24 }]}>
                  <Text style={styles.primaryBtnLabel}>Continue</Text>
                  <ArrowRight size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            )}

            {/* ── STEP 6: Country ── */}
            {step === 6 && (
              <View style={styles.stepContainer}>
                <Text style={[styles.stepLabel, { color: t.textMuted }]}>Step Six</Text>
                <Text style={[styles.stepTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  Where are you based?
                </Text>
                <Text style={[styles.stepSub, { color: t.textMuted }]}>
                  We'll show specialists and clinics near you first.
                </Text>
                <ScrollView
                  style={[styles.countryList, { borderColor: t.tabBorder }]}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                >
                  {COUNTRIES.map((c) => {
                    const selected = data.country === c;
                    return (
                      <TouchableOpacity
                        key={c}
                        onPress={() => update("country", c)}
                        style={[
                          styles.countryItem,
                          {
                            backgroundColor: selected ? t.teal + "20" : "transparent",
                            borderBottomColor: t.tabBorder,
                          },
                        ]}
                      >
                        <Text style={[styles.countryLabel, { color: selected ? t.teal : t.text }]}>
                          {selected ? "✓  " : "    "}{c}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
                <View style={[styles.row, { marginTop: 12 }]}>
                  <TouchableOpacity onPress={next} style={[styles.ghostBtn, { borderColor: t.tabBorder }]}>
                    <Text style={[styles.ghostBtnLabel, { color: t.textMuted }]}>Skip</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={next} style={[styles.primaryBtn, { flex: 2, backgroundColor: t.teal }]}>
                    <Text style={styles.primaryBtnLabel}>Continue</Text>
                    <ArrowRight size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* ── STEP 7: Welcome reveal ── */}
            {step === 7 && (
              <View style={[styles.stepContainer, styles.centeredStep]}>
                <View style={[styles.sparkleCircle, { backgroundColor: t.teal }]}>
                  <Sparkles size={26} color="#fff" />
                </View>
                <Text style={[styles.allSet, { color: t.textMuted }]}>ALL SET</Text>
                <Text style={[styles.welcomeTitle, { color: t.text, fontFamily: Fonts.serif }]}>
                  Welcome, {data.fullName.split(" ")[0] || "friend"}.
                </Text>
                <Text style={[styles.welcomeSub, { color: t.textMuted }]}>
                  Your space is ready. We're honored to walk this journey with you.
                </Text>
                <TouchableOpacity
                  onPress={handleFinish}
                  disabled={saving}
                  style={[styles.primaryBtn, { backgroundColor: t.teal, marginTop: 40, width: "100%" }]}
                >
                  {saving ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.primaryBtnLabel}>Enter Kindred</Text>
                      <ArrowRight size={16} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center", borderRadius: 18 },
  dotsRow: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 5 },
  dot: { height: 6, borderRadius: 3 },
  headerSpacer: { width: 36 },
  scroll: { paddingBottom: 32 },
  stepContainer: { paddingHorizontal: 24, paddingTop: 20, gap: 4 },
  centeredStep: { alignItems: "center", paddingTop: 60 },
  stepLabel: { fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 },
  stepTitle: { fontSize: 26, lineHeight: 32, marginBottom: 8 },
  stepSub: { fontSize: 14, lineHeight: 20, marginBottom: 16 },
  textInput: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 12,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1a7a73",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  primaryBtnLabel: { color: "#fff", fontSize: 15, fontWeight: "700" },
  ghostBtn: {
    flex: 1,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostBtnLabel: { fontSize: 14, fontWeight: "600" },
  row: { flexDirection: "row", gap: 10 },
  optionCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
  },
  optionLabel: { fontSize: 15, fontWeight: "700", marginBottom: 2 },
  optionSub: { fontSize: 12 },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    minWidth: "45%",
    alignItems: "center",
  },
  chipLabel: { fontSize: 14, fontWeight: "600" },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 },
  pill: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 100, borderWidth: 1.5 },
  pillLabel: { fontSize: 13, fontWeight: "600" },
  countryList: {
    maxHeight: 260,
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 12,
    overflow: "hidden",
  },
  countryItem: { paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: StyleSheet.hairlineWidth },
  countryLabel: { fontSize: 14, fontWeight: "500" },
  sparkleCircle: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 20 },
  allSet: { fontSize: 11, letterSpacing: 3, fontWeight: "700", textTransform: "uppercase", marginBottom: 10 },
  welcomeTitle: { fontSize: 32, textAlign: "center", lineHeight: 38, marginBottom: 12 },
  welcomeSub: { fontSize: 14, textAlign: "center", lineHeight: 20, maxWidth: 280 },
});
