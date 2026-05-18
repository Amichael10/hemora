import { router, Stack } from "expo-router";
import React from "react";
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
import { Bell, Droplet, ArrowUpRight, Leaf, CheckCircle2 } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { fetchTransfusions } from "@/lib/healthData";

export default function TransfusionDashboardScreen() {
  const { user } = useAuth();
  const [records, setRecords] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const fetched = await fetchTransfusions(user.id);
        if (fetched && fetched.length > 0) {
          setRecords(fetched);
        } else {
          setRecords([
            { id: "mock-1", occurred_at: "2025-05-14T14:30:00.000Z", hospital: "LUTH", units_count: 2 },
            { id: "mock-2", occurred_at: "2025-04-16T15:00:00.000Z", hospital: "LUTH", units_count: 1 },
            { id: "mock-3", occurred_at: "2025-03-18T10:00:00.000Z", hospital: "LUTH", units_count: 2 },
            { id: "mock-4", occurred_at: "2025-02-12T11:00:00.000Z", hospital: "LUTH", units_count: 1 },
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

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <ChevronLeftLinear color={Brand.ink} size={28} />
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.iconBtn}>
            <Bell color={Brand.ink} size={22} strokeWidth={1.5} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Transfusion & iron log</Text>
          <Text style={styles.subtitle}>Track transfusions, ferritin levels, and iron management.</Text>

          {/* Ferritin Card */}
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.ferritinCircle}>
                <Droplet color=Brand.red size={24} fill=Brand.red />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.labelSmall}>Latest ferritin</Text>
                <View style={styles.ferritinValueRow}>
                  <Text style={styles.ferritinValue}>842</Text>
                  <Text style={styles.ferritinUnit}>ng/mL</Text>
                  <View style={styles.highBadge}>
                    <Text style={styles.highBadgeText}>High</Text>
                  </View>
                </View>
                <View style={styles.trendRow}>
                  <ArrowUpRight color={Brand.ink} size={14} />
                  <Text style={styles.trendText}>Up 12% from last result</Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.cardBottom}>
              <View style={styles.cardBottomItem}>
                <CalendarLinear color={Brand.ink} size={18} />
                <View>
                  <Text style={styles.labelTiny}>Next follow-up</Text>
                  <Text style={styles.valueSmall}>June 10, 2025</Text>
                </View>
              </View>
              <View style={styles.cardBottomItem}>
                <Leaf color={Brand.ink} size={18} strokeWidth={1.5} />
                <View>
                  <Text style={styles.labelTiny}>On chelation</Text>
                  <Text style={styles.valueSmall}>Deferasirox</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Recent Transfusions Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent transfusions</Text>
            <Pressable onPress={() => router.push("/transfusion-history" as any)}>
              <Text style={styles.viewAll}>View all</Text>
            </Pressable>
          </View>

          <View style={styles.list}>
            {records.slice(0, 4).map((item, i) => (
              <Pressable 
                key={i} 
                style={styles.listItem}
                onPress={() => router.push({ pathname: "/transfusion-detail", params: { id: item.id } } as any)}
              >
                <View style={styles.listLeft}>
                  <Text style={styles.listDate}>{formatDate(item.occurred_at)}</Text>
                  <Text style={styles.listHospital}>{item.hospital || "LUTH"}</Text>
                </View>
                <View style={styles.listMiddle}>
                  <Text style={styles.listUnits}>{item.units_count} unit{item.units_count > 1 ? 's' : ''}</Text>
                </View>
                <View style={styles.listRight}>
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedBadgeText}>Completed</Text>
                    <CheckCircle2 color="#C9A35A" size={12} strokeWidth={3} />
                  </View>
                </View>
              </Pressable>
            ))}
          </View>

          <Pressable 
            style={styles.primaryBtn}
            onPress={() => router.push("/transfusion-log" as any)}
          >
            <Text style={styles.primaryBtnText}>Add transfusion</Text>
          </Pressable>
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
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -8,
  },
  scroll: { paddingHorizontal: 24, paddingBottom: 48 },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    color: Brand.ink,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: Brand.ink + "90",
    marginBottom: 32,
    lineHeight: 20,
    maxWidth: "85%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Brand.ink + "10",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  ferritinCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: Brand.border, // from design, dark greenish border
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: Brand.red, // To simulate a circular chart
  },
  labelSmall: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Brand.ink + "80",
    marginBottom: 4,
  },
  ferritinValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginBottom: 4,
  },
  ferritinValue: {
    fontFamily: Fonts.sansBold,
    fontSize: 32,
    color: Brand.ink,
  },
  ferritinUnit: {
    fontFamily: Fonts.sansMedium,
    fontSize: 14,
    color: Brand.ink,
  },
  highBadge: {
    backgroundColor: "15",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4,
  },
  highBadgeText: {
    color: "#D93025",
    fontSize: 10,
    fontFamily: Fonts.sansBold,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Brand.ink,
  },
  divider: {
    height: 1,
    backgroundColor: Brand.ink + "10",
    marginBottom: 16,
  },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottomItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  labelTiny: {
    fontFamily: Fonts.sansMedium,
    fontSize: 10,
    color: Brand.ink + "70",
    marginBottom: 2,
  },
  valueSmall: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Brand.ink,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    color: Brand.ink,
  },
  viewAll: {
    fontFamily: Fonts.sansMedium,
    fontSize: 12,
    color: Brand.ink + "90",
  },
  list: {
    marginBottom: 32,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Brand.ink + "10",
  },
  listLeft: {
    flex: 2,
  },
  listDate: {
    fontFamily: Fonts.sansMedium,
    fontSize: 14,
    color: Brand.ink,
    marginBottom: 2,
  },
  listHospital: {
    fontFamily: Fonts.sans,
    fontSize: 12,
    color: Brand.ink + "70",
  },
  listMiddle: {
    flex: 1,
    alignItems: "flex-start",
  },
  listUnits: {
    fontFamily: Fonts.sansMedium,
    fontSize: 13,
    color: Brand.ink,
  },
  listRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#F2DEB3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadgeText: {
    fontFamily: Fonts.sansMedium,
    fontSize: 10,
    color: "#C9A35A",
  },
  primaryBtn: {
    backgroundColor: Brand.ink,
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontFamily: Fonts.sansBold,
    fontSize: 16,
  },
});
