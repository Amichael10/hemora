import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AltArrowDownLinear,
  BookmarkLinear,
  ChatRoundBold,
  HospitalBold,
  MagniferLinear,
  MapPointLinear,
  PhoneBold,
  SquareArrowRightUpLinear,
} from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";

const CHIPS = ["All", "Hospitals", "Counselling", "Labs", "Support", "Saved"] as const;

const MOCK = [
  {
    id: "1",
    title: "Sickle Cell Foundation Nigeria",
    subtitle: "Counselling · Lagos, Lagos",
    tags: ["counselling", "genotype testing", "+1"],
    kind: "chat" as const,
    verified: true,
  },
  {
    id: "2",
    title: "Lagos University Teaching Hospital (LUTH) – Haematology",
    subtitle: "Hospital · Lagos, Lagos",
    tags: ["sickle cell clinic", "transfusion", "+1"],
    kind: "hospital" as const,
    verified: true,
  },
  {
    id: "3",
    title: "University College Hospital Ibadan – SCD Clinic",
    subtitle: "Hospital · Ibadan, Oyo",
    tags: ["sickle cell clinic", "haematology"],
    kind: "hospital" as const,
    verified: true,
  },
];

function KindIcon({ kind }: { kind: "chat" | "hospital" }) {
  if (kind === "chat") return <ChatRoundBold color={Brand.red} size={22} />;
  return <HospitalBold color={Brand.red} size={22} />;
}

export default function DirectoryScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const [q, setQ] = useState("");
  const [chip, setChip] = useState<(typeof CHIPS)[number]>("All");

  const list = useMemo(() => {
    return MOCK.filter((p) => {
      const ok =
        !q.trim() ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(q.toLowerCase());
      if (!ok) return false;
      if (chip === "All") return true;
      if (chip === "Saved") return false;
      if (chip === "Hospitals") return p.kind === "hospital";
      if (chip === "Counselling") return p.title.toLowerCase().includes("foundation") || p.kind === "chat";
      if (chip === "Labs") return p.tags.some((x) => x.includes("lab"));
      if (chip === "Support") return true;
      return true;
    });
  }, [q, chip]);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
    <ScrollView
      contentContainerStyle={styles.scroll}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <Text style={[styles.pageTitle, { color: Brand.red }]}>Care Directory</Text>
        <Pressable style={[styles.suggestBtn, { borderColor: Brand.red }]}>
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

      {list.map((p) => (
        <View key={p.id} style={[styles.card, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
          <View style={styles.cardHead}>
            <View style={[styles.iconBubble, { backgroundColor: `${Brand.red}18` }]}>
              <KindIcon kind={p.kind} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.titleRow}>
                <Text style={[styles.cardTitle, { color: Brand.red, fontFamily: Fonts.serifSemi }]} numberOfLines={2}>
                  {p.title}
                </Text>
                {p.verified ? (
                  <View style={styles.check}>
                    <Text style={styles.checkTxt}>✓</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.sub, { color: t.textMuted, fontFamily: Fonts.sans }]}>{p.subtitle}</Text>
            </View>
            <BookmarkLinear color={Brand.red} size={22} />
          </View>

          <View style={styles.tagRow}>
            {p.tags.map((tag) => (
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
      ))}
    </ScrollView>
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
});
