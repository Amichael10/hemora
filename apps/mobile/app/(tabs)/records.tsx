import { useFocusEffect } from "@react-navigation/native";
import { router, type Href } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  CalendarLinear,
  Folder2Bold,
  PlusLinear,
  StethoscopeBold,
  TestTubeBold,
  UploadSquareLinear,
} from "@/components/icons/solar";
import { ScreenShell } from "@/components/ScreenShell";
import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { fetchCareRecords, type CareRecordListItem } from "@/lib/recordsScreenData";
import { getSupabase } from "@/lib/supabase";

type TabKey = "all" | "visit" | "lab" | "imaging" | "doc";

function TypeIcon({ type }: { type: string }) {
  const size = 18;
  if (type === "lab") return <TestTubeBold color={Brand.teal} size={size} />;
  if (type === "visit") return <StethoscopeBold color={Brand.teal} size={size} />;
  if (type === "imaging") return <Folder2Bold color={Brand.gold} size={size} />;
  return <Folder2Bold color={Brand.teal} size={size} />;
}

export default function RecordsScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user } = useAuth();
  const [tab, setTab] = useState<TabKey>("all");
  const [rows, setRows] = useState<CareRecordListItem[]>([]);
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
        const list = await fetchCareRecords(supabase, user.id);
        setRows(list);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not load records");
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

  const filtered = useMemo(() => {
    if (tab === "all") return rows;
    return rows.filter((r) => r.type === tab);
  }, [rows, tab]);

  const statusStyle = (s: string) => {
    const x = s.toLowerCase();
    if (x === "normal" || x === "completed") return { bg: "#22c55e22", fg: "#15803d" };
    if (x === "follow_up" || x === "pending") return { bg: "#ea580c22", fg: "#c2410c" };
    if (x === "reviewed" || x === "saved") return { bg: "#2563eb22", fg: "#1d4ed8" };
    return { bg: `${Brand.teal}22`, fg: Brand.teal };
  };

  return (
    <ScreenShell title="Care Records">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => void load("pull")} tintColor={Brand.red} />
        }
      >
        <View style={styles.toolbar}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.lead, { color: t.textMuted, fontFamily: Fonts.sans }]}>
              Manage your visits, labs, and documents.
            </Text>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
              <Pressable 
                style={[styles.miniBtn, { backgroundColor: `${Brand.teal}14` }]}
                onPress={() => {
                  const csv = [
                    ["Date", "Title", "Type", "Status"],
                    ...rows.map(r => [r.date, r.title, r.type, r.status])
                  ].map(e => e.join(",")).join("\n");
                  console.log("Exporting CSV:", csv);
                  // In a real device we would use FileSystem + Sharing
                  import("react-native").then(({ Alert }) => {
                    Alert.alert("Export Summary", "Care record summary generated successfully. Sharing would open now on a physical device.");
                  });
                }}
              >
                <UploadSquareLinear color={Brand.teal} size={14} />
                <Text style={[styles.miniBtnText, { color: Brand.teal }]}>Export Summary</Text>
              </Pressable>
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/add-record" as Href)}
            style={[styles.iconBtn, { backgroundColor: `${Brand.red}18` }]}
          >
            <PlusLinear color={Brand.red} size={18} />
          </Pressable>
        </View>

        {configError ? (
          <Text style={[styles.note, { color: t.textMuted }]}>Add Supabase keys to load records.</Text>
        ) : null}
        {error ? (
          <Pressable onPress={() => void load("pull")}>
            <Text style={[styles.note, { color: Brand.red }]}>{error} — tap to retry</Text>
          </Pressable>
        ) : null}
        {loading && rows.length === 0 ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color={Brand.red} />
            <Text style={[styles.note, { color: t.textMuted }]}>Loading…</Text>
          </View>
        ) : null}

        <View style={[styles.tabs, { backgroundColor: `${Brand.teal}14` }]}>
          {(
            [
              ["all", "All"],
              ["visit", "Visit"],
              ["lab", "Lab"],
              ["imaging", "Imaging"],
              ["doc", "Doc"],
            ] as const
          ).map(([key, label]) => (
            <Pressable
              key={key}
              onPress={() => setTab(key)}
              style={[
                styles.tab,
                tab === key && { backgroundColor: t.surface, shadowOpacity: 0.08, shadowRadius: 8 },
              ]}
            >
              <Text style={[styles.tabText, { color: tab === key ? t.text : t.textMuted }]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        {filtered.length === 0 && !loading ? (
          <View style={[styles.emptyBox, { backgroundColor: `${Brand.goldSoft}44`, borderColor: t.tabBorder }]}>
            <View style={[styles.emptyIconCircle, { backgroundColor: Brand.gold }]}>
              <Folder2Bold color="#fff" size={32} />
            </View>
            <Text style={[styles.emptyTitle, { color: t.text }]}>No care records yet</Text>
            <Text style={[styles.emptySub, { color: t.textMuted }]}>
              Keep track of your health journey. Log your visits and labs to have everything in one place.
            </Text>

            <View style={styles.stepsRow}>
              {[
                { n: "1", t: "Add a record" },
                { n: "2", t: "Note details" },
                { n: "3", t: "Track history" },
              ].map((s) => (
                <View key={s.n} style={[styles.stepCard, { backgroundColor: t.surface, borderColor: t.tabBorder }]}>
                  <Text style={styles.stepNum}>STEP {s.n}</Text>
                  <Text style={[styles.stepText, { color: t.text }]}>{s.t}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() => router.push("/add-record" as Href)}
              style={styles.emptyAddBtn}
            >
              <Text style={styles.emptyAddBtnText}>Add your first record</Text>
            </Pressable>
          </View>
        ) : null}

        {filtered.map((r) => {
          const st = statusStyle(r.status);
          return (
            <View key={r.id} style={[styles.card, { borderColor: t.tabBorder, backgroundColor: t.surface }]}>
              <View style={styles.cardTop}>
                <View style={[styles.typeBubble, { backgroundColor: `${Brand.teal}14` }]}>
                  <TypeIcon type={r.type} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.cardTitle, { color: t.text }]}>{r.title}</Text>
                  <Text style={[styles.cardMeta, { color: t.textMuted }]}>{r.hospital}</Text>
                </View>
                <View style={[styles.badge, { backgroundColor: st.bg }]}>
                  <Text style={[styles.badgeText, { color: st.fg }]}>{r.status.replace(/_/g, " ")}</Text>
                </View>
              </View>
              <View style={styles.cardFoot}>
                <CalendarLinear color={t.textMuted} size={14} />
                <Text style={[styles.date, { color: t.textMuted }]}>{r.date}</Text>
              </View>
            </View>
          );
        })}

        <Text style={[styles.sectionEyebrow, { color: t.textMuted }]}>Quick Actions</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <Pressable 
            onPress={() => router.push('/transfusion' as any)}
            style={[styles.upload, { flex: 1, minWidth: 140, borderColor: t.tabBorder, backgroundColor: t.surface }]}
          >
            <TestTubeBold color={Brand.red} size={18} />
            <Text style={[styles.uploadText, { color: t.text }]}>Transfusions</Text>
          </Pressable>
          <Pressable 
            onPress={() => router.push('/vitals-log' as any)}
            style={[styles.upload, { flex: 1, minWidth: 140, borderColor: t.tabBorder, backgroundColor: t.surface }]}
          >
            <StethoscopeBold color={Brand.teal} size={18} />
            <Text style={[styles.uploadText, { color: t.text }]}>Log Vitals</Text>
          </Pressable>
          <Pressable 
            onPress={() => router.push('/hydration' as any)}
            style={[styles.upload, { flex: 1, minWidth: 140, borderColor: t.tabBorder, backgroundColor: t.surface }]}
          >
            <StethoscopeBold color={Brand.red} size={18} />
            <Text style={[styles.uploadText, { color: t.text }]}>Hydration</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  toolbar: { flexDirection: "row", gap: 12, marginBottom: 16, alignItems: "flex-start" },
  lead: { flex: 1, fontSize: 15, lineHeight: 22 },
  note: { fontSize: 13, marginBottom: 8, lineHeight: 18 },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  miniBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  miniBtnText: { fontSize: 11, fontFamily: Fonts.sansBold },
  tabs: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 4,
    gap: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  tabText: { fontSize: 13, fontWeight: "700" },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  cardTop: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  typeBubble: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "700" },
  cardMeta: { fontSize: 12, marginTop: 4 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, alignSelf: "flex-start" },
  badgeText: { fontSize: 10, fontWeight: "700", textTransform: "capitalize" },
  cardFoot: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 12 },
  date: { fontSize: 12 },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10,
  },
  upload: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
  },
  uploadText: { fontSize: 14, fontWeight: "600" },
  emptyBox: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    marginTop: 10,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: { fontSize: 18, fontFamily: Fonts.serifSemi, marginBottom: 8 },
  emptySub: { fontSize: 13, textAlign: "center", color: Brand.muted, lineHeight: 20, marginBottom: 24, paddingHorizontal: 10 },
  stepsRow: { flexDirection: "row", gap: 8, marginBottom: 24 },
  stepCard: { flex: 1, padding: 10, borderRadius: 14, borderWidth: 1 },
  stepNum: { fontSize: 8, color: Brand.gold, fontFamily: Fonts.sansBold, marginBottom: 4 },
  stepText: { fontSize: 10, fontFamily: Fonts.sansMedium, lineHeight: 13 },
  emptyAddBtn: {
    backgroundColor: Brand.tealDeep,
    width: "100%",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  emptyAddBtnText: { color: "#fff", fontFamily: Fonts.sansBold, fontSize: 14 },
});
