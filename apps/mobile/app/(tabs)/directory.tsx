import { useEffect, useMemo, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AltArrowDownLinear,
  BookmarkLinear,
  ChatRoundBold,
  CloseCircleLinear,
  HospitalBold,
  MagniferLinear,
  MapPointLinear,
  PhoneBold,
  SquareArrowRightUpLinear,
} from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { fetchProviders, suggestProvider, type Provider } from "@/lib/healthData";

const CHIPS = ["All", "Hospitals", "Counselling", "Labs", "Support", "Saved"] as const;

function KindIcon({ kind }: { kind: string }) {
  if (kind === "chat" || kind === "counselling") return <ChatRoundBold color={Brand.red} size={22} />;
  return <HospitalBold color={Brand.red} size={22} />;
}

export default function DirectoryScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();

  const [q, setQ] = useState("");
  const [chip, setChip] = useState<(typeof CHIPS)[number]>("All");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Suggest Modal State
  const [showSuggest, setShowSuggest] = useState(false);
  const [sName, setSName] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sNotes, setSNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const data = await fetchProviders();
      setProviders(data);
    } catch (error) {
      console.error("Failed to load providers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggest = async () => {
    if (!user) return;
    if (!sName.trim()) {
      Alert.alert("Error", "Please enter the provider's name.");
      return;
    }

    setSubmitting(true);
    try {
      await suggestProvider(user.id, {
        name: sName,
        phone: sPhone,
        notes: sNotes,
      });
      Alert.alert("Thank You", "We've received your suggestion and will verify it soon.");
      setShowSuggest(false);
      setSName("");
      setSPhone("");
      setSNotes("");
    } catch (error) {
      Alert.alert("Error", "Failed to send suggestion.");
    } finally {
      setSubmitting(false);
    }
  };

  const list = useMemo(() => {
    return providers.filter((p) => {
      const ok =
        !q.trim() ||
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.hospital?.toLowerCase().includes(q.toLowerCase()) ||
        p.city?.toLowerCase().includes(q.toLowerCase());
      
      if (!ok) return false;
      if (chip === "All") return true;
      if (chip === "Saved") return p.saved === true;
      if (chip === "Hospitals") return p.type === "hospital";
      if (chip === "Counselling") return p.type === "counselling" || p.name.toLowerCase().includes("foundation");
      if (chip === "Labs") return p.type === "lab" || p.services?.some(s => s.toLowerCase().includes("lab"));
      if (chip === "Support") return p.type === "support" || p.type === "chat";
      return true;
    });
  }, [q, chip, providers]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topRow}>
          <Text style={[styles.pageTitle, { color: Brand.red }]}>Care Directory</Text>
          <Pressable 
            style={[styles.suggestBtn, { borderColor: Brand.red }]}
            onPress={() => setShowSuggest(true)}
          >
            <MagniferLinear color={Brand.red} size={16} />
            <Text style={[styles.suggestTxt, { color: Brand.red }]}>Suggest</Text>
          </Pressable>
        </View>

        <View style={[styles.searchRow, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
          <MagniferLinear color={t.textMuted} size={18} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Search specialists, clinics..."
            placeholderTextColor={t.textMuted}
            style={[styles.searchInput, { color: t.text, fontFamily: Fonts.sans }]}
          />
        </View>

        <View style={styles.ddRow}>
          <Pressable style={[styles.dd, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
            <Text style={[styles.ddTxt, { color: t.text }]}>Nigeria</Text>
            <AltArrowDownLinear color={t.textMuted} size={16} />
          </Pressable>
          <Pressable style={[styles.dd, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
            <Text style={[styles.ddTxt, { color: t.text }]}>All states</Text>
            <AltArrowDownLinear color={t.textMuted} size={16} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {CHIPS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setChip(c)}
              style={[
                styles.chip,
                chip === c
                  ? { backgroundColor: Brand.red, borderColor: Brand.red }
                  : { backgroundColor: t.surface, borderColor: t.tabBorder },
              ]}
            >
              {c === "Saved" ? (
                <BookmarkLinear color={chip === c ? "#fff" : Brand.red} size={14} />
              ) : null}
              <Text
                style={[
                  styles.chipText,
                  { fontFamily: Fonts.sansBold },
                  { color: chip === c ? "#fff" : Brand.red },
                ]}
              >
                {c}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.sortLink}>
          <MapPointLinear color={Brand.red} size={14} />
          <Text style={[styles.sortTxt, { color: Brand.red }]}>Sort by closest to me</Text>
        </Pressable>

        {loading ? (
          <View style={{ marginTop: 40 }}>
            <ActivityIndicator color={Brand.red} />
          </View>
        ) : list.length === 0 ? (
          <View style={styles.empty}>
            <Text style={[styles.emptyTxt, { color: t.textMuted }]}>No results found.</Text>
          </View>
        ) : (
          list.map((p) => (
            <View key={p.id} style={[styles.card, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
              <View style={styles.cardHead}>
                <View style={[styles.iconBubble, { backgroundColor: `${Brand.red}18` }]}>
                  <KindIcon kind={p.type || "hospital"} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.titleRow}>
                    <Text style={[styles.cardTitle, { color: Brand.red, fontFamily: Fonts.serifSemi }]} numberOfLines={2}>
                      {p.name}
                    </Text>
                    {p.verified ? (
                      <View style={styles.check}>
                        <Text style={styles.checkTxt}>✓</Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.sub, { color: t.textMuted, fontFamily: Fonts.sans }]}>
                    {p.specialty || p.type} · {p.city}, {p.state}
                  </Text>
                </View>
                <BookmarkLinear color={p.saved ? Brand.red : t.textMuted} size={22} />
              </View>

              <View style={styles.tagRow}>
                {p.services && Array.isArray(p.services) && p.services.slice(0, 3).map((tag) => (
                  <View key={tag} style={[styles.tag, { backgroundColor: `${Brand.goldSoft}99` }]}>
                    <Text style={[styles.tagTxt, { color: Brand.tealDeep }]}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actions}>
                <Pressable style={[styles.actionBtn, { backgroundColor: Brand.red }]}>
                  <PhoneBold color="#fff" size={16} />
                  <Text style={[styles.actionTxt, { color: "#fff" }]}>Call</Text>
                </Pressable>
                <Pressable style={[styles.actionBtn, { backgroundColor: Brand.red }]}>
                  <SquareArrowRightUpLinear color="#fff" size={16} />
                  <Text style={[styles.actionTxt, { color: "#fff" }]}>Directions</Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Suggest Provider Modal */}
      <Modal
        visible={showSuggest}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSuggest(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: "#fff" }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: Brand.red }]}>Suggest a Provider</Text>
              <Pressable onPress={() => setShowSuggest(false)}>
                <CloseCircleLinear color={t.textMuted} size={24} />
              </Pressable>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.mGroup}>
                <Text style={[styles.mLabel, { color: t.text }]}>Provider Name</Text>
                <TextInput
                  value={sName}
                  onChangeText={setSName}
                  placeholder="e.g. Health Plus Clinic"
                  style={[styles.mInput, { borderColor: t.tabBorder }]}
                />
              </View>

              <View style={styles.mGroup}>
                <Text style={[styles.mLabel, { color: t.text }]}>Phone Number</Text>
                <TextInput
                  value={sPhone}
                  onChangeText={setSPhone}
                  placeholder="e.g. +234 800..."
                  keyboardType="phone-pad"
                  style={[styles.mInput, { borderColor: t.tabBorder }]}
                />
              </View>

              <View style={styles.mGroup}>
                <Text style={[styles.mLabel, { color: t.text }]}>Additional Details</Text>
                <TextInput
                  value={sNotes}
                  onChangeText={setSNotes}
                  placeholder="e.g. Address, website, or why you recommend them"
                  multiline
                  numberOfLines={4}
                  style={[styles.mArea, { borderColor: t.tabBorder }]}
                />
              </View>

              <Pressable 
                style={[styles.mBtn, { backgroundColor: Brand.red, opacity: submitting ? 0.7 : 1 }]}
                onPress={handleSuggest}
                disabled={submitting}
              >
                <Text style={styles.mBtnTxt}>
                  {submitting ? "Sending..." : "Submit Suggestion"}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12 },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pageTitle: { fontFamily: Fonts.serif, fontSize: 26, letterSpacing: -0.5, flex: 1, paddingRight: 12 },
  suggestBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  suggestTxt: { fontFamily: Fonts.sansBold, fontSize: 13 },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  searchInput: { flex: 1, fontSize: 15, paddingVertical: 2 },
  ddRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  dd: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  ddTxt: { fontFamily: Fonts.sans, fontSize: 14 },
  chips: { gap: 8, paddingBottom: 12, flexDirection: "row", alignItems: "center" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  chipText: { fontSize: 12 },
  sortLink: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 16 },
  sortTxt: { fontFamily: Fonts.sansBold, fontSize: 12 },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    marginBottom: 14,
  },
  cardHead: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  cardTitle: { flex: 1, fontSize: 15, lineHeight: 21 },
  check: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },
  checkTxt: { color: "#fff", fontSize: 11, fontWeight: "800" },
  sub: { fontSize: 12, marginTop: 6 },
  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 12 },
  tag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
  tagTxt: { fontSize: 10, fontFamily: Fonts.sansMedium },
  actions: { flexDirection: "row", gap: 10, marginTop: 14 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
  },
  actionTxt: { fontFamily: Fonts.sansBold, fontSize: 13 },
  empty: { marginTop: 40, alignItems: "center" },
  emptyTxt: { fontFamily: Fonts.sans, fontSize: 15 },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: Fonts.serifSemi,
    fontSize: 22,
  },
  mGroup: { marginBottom: 20 },
  mLabel: { fontFamily: Fonts.sansMedium, fontSize: 14, marginBottom: 8 },
  mInput: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: Fonts.sans,
  },
  mArea: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: Fonts.sans,
    height: 120,
    textAlignVertical: "top",
  },
  mBtn: {
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  mBtnTxt: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.sansBold,
  },
});
