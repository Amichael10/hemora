import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ChevronLeftLinear, CalendarLinear } from "@/components/icons/solar";
import { Brand } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { Droplet, Search, Filter, CheckCircle2, ChevronRight } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { fetchTransfusions } from "@/lib/healthData";

export default function TransfusionHistoryScreen() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const fetched = await fetchTransfusions(user.id);
        if (fetched && fetched.length > 0) {
          setRecords(fetched);
        } else {
          // Fallback mock records
          setRecords([
            { id: "mock-1", occurred_at: "2025-05-14T14:30:00.000Z", hospital: "LUTH", units_count: 2, transfusion_type: "simple", reaction_logged: false, notes: "Hospital: LUTH | Reason: Pain crisis" },
            { id: "mock-2", occurred_at: "2025-04-16T15:00:00.000Z", hospital: "LUTH", units_count: 1, transfusion_type: "simple", reaction_logged: false, notes: "Hospital: LUTH | Reason: Anemia" },
            { id: "mock-3", occurred_at: "2025-03-18T10:00:00.000Z", hospital: "LUTH", units_count: 2, transfusion_type: "exchange", reaction_logged: false, notes: "Hospital: LUTH" },
            { id: "mock-4", occurred_at: "2025-02-12T11:00:00.000Z", hospital: "LUTH", units_count: 1, transfusion_type: "simple", reaction_logged: false, notes: "Hospital: LUTH" },
            { id: "mock-5", occurred_at: "2024-12-05T09:00:00.000Z", hospital: "LUTH", units_count: 2, transfusion_type: "simple", reaction_logged: false, notes: "Hospital: LUTH" },
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString([], {
      month: "short",
      day: "2-digit",
      year: "numeric"
    });
  };

  const filteredRecords = records.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "simple") return item.transfusion_type === "simple";
    if (activeTab === "exchange") return item.transfusion_type === "exchange";
    return true;
  });

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <ChevronLeftLinear color={Brand.ink} size={28} />
          </Pressable>
          <Text style={styles.headerTitle}>History</Text>
          <View style={styles.headerRight}>
            <Pressable style={styles.iconBtnSmall}>
              <Search color={Brand.ink} size={20} />
            </Pressable>
            <Pressable style={styles.iconBtnSmall}>
              <Filter color={Brand.ink} size={20} />
            </Pressable>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {["All Records", "Simple", "Exchange", "Iron Check"].map((tab) => {
              const isActive = activeTab === tab.toLowerCase().split(' ')[0];
              return (
                <Pressable
                  key={tab}
                  style={[styles.tab, isActive && styles.tabActive]}
                  onPress={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>2025 Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryStat}>
                <Text style={styles.summaryValue}>
                  {records.filter(r => new Date(r.occurred_at).getFullYear() === 2025).reduce((sum, r) => sum + r.units_count, 0)}
                </Text>
                <Text style={styles.summaryLabel}>Total Units</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryStat}>
                <Text style={styles.summaryValue}>
                  {records.filter(r => new Date(r.occurred_at).getFullYear() === 2025).length}
                </Text>
                <Text style={styles.summaryLabel}>Transfusions</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryStat}>
                <Text style={styles.summaryValue}>8.5</Text>
                <Text style={styles.summaryLabel}>Avg Hb</Text>
              </View>
            </View>
          </View>

          {/* List */}
          <View style={styles.list}>
            {filteredRecords.map((item, i) => (
              <Pressable 
                key={i} 
                style={styles.listItem}
                onPress={() => router.push({ pathname: "/transfusion-detail", params: { id: item.id } } as any)}
              >
                <View style={styles.listIconBg}>
                  <Droplet color=Brand.red size={18} fill=Brand.red />
                </View>
                <View style={styles.listBody}>
                  <View style={styles.listBodyTop}>
                    <Text style={styles.listDate}>{formatDate(item.occurred_at)}</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>Completed</Text>
                    </View>
                  </View>
                  <Text style={styles.listHospital}>{item.hospital || "LUTH"} â€¢ {item.transfusion_type}</Text>
                  <Text style={styles.listUnits}>{item.units_count} unit{item.units_count > 1 ? 's' : ''}</Text>
                </View>
                <ChevronRight color={Brand.ink + "40"} size={20} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Brand.cream, paddingTop: 48 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    color: Brand.ink,
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtnSmall: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Brand.ink + "08",
    borderRadius: 18,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsScroll: {
    paddingHorizontal: 24,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Brand.ink + "15",
    backgroundColor: "#fff",
  },
  tabActive: {
    backgroundColor: Brand.ink,
    borderColor: Brand.ink,
  },
  tabText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 14,
    color: Brand.ink + "80",
  },
  tabTextActive: {
    color: "#fff",
  },
  scroll: { paddingHorizontal: 24, paddingBottom: 48 },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Brand.ink + "10",
  },
  summaryTitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 14,
    color: Brand.ink + "80",
    marginBottom: 16,
    textAlign: "center",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryStat: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    color: Brand.ink,
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Brand.ink + "70",
  },
  summaryDivider: {
    width: 1,
    height: 32,
    backgroundColor: Brand.ink + "10",
  },
  list: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: Brand.ink + "10",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Brand.ink + "08",
    gap: 16,
  },
  listIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Brand.red + "10",
    justifyContent: "center",
    alignItems: "center",
  },
  listBody: {
    flex: 1,
  },
  listBodyTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  listDate: {
    fontFamily: Fonts.sansBold,
    fontSize: 15,
    color: Brand.ink,
  },
  statusBadge: {
    backgroundColor: "#F2DEB3",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: Fonts.sansBold,
    fontSize: 10,
    color: "#C9A35A",
  },
  listHospital: {
    fontFamily: Fonts.sans,
    fontSize: 13,
    color: Brand.ink + "80",
    marginBottom: 4,
  },
  listUnits: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    color: Brand.ink,
  },
});
