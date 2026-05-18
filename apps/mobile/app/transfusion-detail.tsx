import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { ChevronLeftLinear, CalendarLinear } from "@/components/icons/solar";
import { Brand } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { Droplet, Info, AlertTriangle, FileText, Share2, Download, CheckCircle2 } from "lucide-react-native";
import { fetchTransfusionById } from "@/lib/healthData";

export default function TransfusionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [log, setLog] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const mockLogs: Record<string, any> = {
    "mock-1": {
      occurred_at: "2025-05-14T14:30:00.000Z",
      units_count: 2,
      hospital: "LUTH Sickle Cell Clinic",
      transfusion_type: "simple",
      hemoglobin_pre: 8.2,
      reason_for_transfusion: "Severe Pain Crisis",
      reaction_logged: false,
      reaction_details: null,
      bloodType: "O+ (Compatible)"
    },
    "mock-2": {
      occurred_at: "2025-04-16T15:00:00.000Z",
      units_count: 1,
      hospital: "LUTH Sickle Cell Clinic",
      transfusion_type: "simple",
      hemoglobin_pre: 7.1,
      reason_for_transfusion: "Anemia",
      reaction_logged: false,
      reaction_details: null,
      bloodType: "O+ (Compatible)"
    },
    "mock-3": {
      occurred_at: "2025-03-18T10:00:00.000Z",
      units_count: 2,
      hospital: "LUTH Sickle Cell Clinic",
      transfusion_type: "exchange",
      hemoglobin_pre: 8.0,
      reason_for_transfusion: "Chronic Transfusion Therapy",
      reaction_logged: false,
      reaction_details: null,
      bloodType: "O+ (Compatible)"
    },
    "mock-4": {
      occurred_at: "2025-02-12T11:00:00.000Z",
      units_count: 1,
      hospital: "LUTH Sickle Cell Clinic",
      transfusion_type: "simple",
      hemoglobin_pre: 7.8,
      reason_for_transfusion: "Acute chest syndrome follow-up",
      reaction_logged: false,
      reaction_details: null,
      bloodType: "O+ (Compatible)"
    },
    "mock-5": {
      occurred_at: "2024-12-05T09:00:00.000Z",
      units_count: 2,
      hospital: "LUTH Sickle Cell Clinic",
      transfusion_type: "simple",
      hemoglobin_pre: 8.5,
      reason_for_transfusion: "Severe Pain Crisis",
      reaction_logged: false,
      reaction_details: null,
      bloodType: "O+ (Compatible)"
    }
  };

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      if (id.startsWith("mock-")) {
        setLog(mockLogs[id] || mockLogs["mock-1"]);
        return;
      }
      setLoading(true);
      try {
        const fetched = await fetchTransfusionById(id);
        if (fetched) {
          setLog(fetched);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString([], {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const hospitalName = log?.hospital || log?.notes?.split("Hospital: ")[1]?.split(" | ")[0] || "LUTH";
  const reasonText = log?.reason_for_transfusion || log?.notes?.split("Reason: ")[1]?.split(" | ")[0] || "Chronic Transfusion";
  const bloodTypeText = log?.bloodType || log?.notes?.split("Blood Type: ")[1]?.split(" | ")[0] || "O+ (Compatible)";

  if (loading) {
    return (
      <View style={[styles.root, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Brand.ink} />
      </View>
    );
  }

  if (!log) {
    return (
      <View style={[styles.root, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ fontFamily: Fonts.sans }}>Record not found.</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn}>
            <ChevronLeftLinear color={Brand.ink} size={28} />
          </Pressable>
          <Text style={styles.headerTitle}>Record Detail</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Main Info */}
          <View style={styles.mainInfoCard}>
            <View style={styles.mainInfoTop}>
              <View style={styles.iconCircle}>
                <Droplet color=Brand.red size={24} fill=Brand.red />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.mainTitle}>{log.transfusion_type === "exchange" ? "Exchange Transfusion" : "Simple Transfusion"}</Text>
                <Text style={styles.mainSubtitle}>{formatDate(log.occurred_at)}</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <CheckCircle2 color="#C9A35A" size={14} strokeWidth={3} />
              <Text style={styles.statusText}>Completed</Text>
            </View>
          </View>

          {/* Details Section */}
          <Text style={styles.sectionTitle}>Clinical Details</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Hospital / Clinic</Text>
              <Text style={styles.rowValue}>{hospitalName}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Units Received</Text>
              <Text style={styles.rowValue}>{log.units_count} Unit{log.units_count > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Blood Type</Text>
              <Text style={styles.rowValue}>{bloodTypeText}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Pre-transfusion Hb</Text>
              <Text style={styles.rowValue}>{log.hemoglobin_pre ? `${log.hemoglobin_pre} g/dL` : "â€”"}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Reason</Text>
              <Text style={styles.rowValue}>{reasonText}</Text>
            </View>
          </View>

          {/* Reaction Alert */}
          <View style={[styles.reactionCard, log.reaction_logged && { backgroundColor: Brand.red + "10", borderColor: Brand.red + "20" }]}>
            <View style={[styles.reactionIconBg, log.reaction_logged && { backgroundColor: Brand.red + "20" }]}>
              {log.reaction_logged ? (
                <AlertTriangle color="#D93025" size={20} />
              ) : (
                <CheckCircle2 color="#C9A35A" size={20} />
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.reactionTitle, log.reaction_logged && { color: "#D93025" }]}>
                {log.reaction_logged ? "Reaction logged" : "No adverse reactions"}
              </Text>
              <Text style={[styles.reactionDesc, log.reaction_logged && { color: "#D93025" }]}>
                {log.reaction_logged ? log.reaction_details || "Reaction noted during or after transfusion." : "Transfusion completed smoothly without complications."}
              </Text>
            </View>
          </View>

          {/* Post Care */}
          <Text style={styles.sectionTitle}>Post-Care Plan</Text>
          <View style={styles.card}>
            <View style={styles.postCareItem}>
              <View style={styles.postCareBullet} />
              <Text style={styles.postCareText}>Monitor for fever or body pain over the next 48 hours.</Text>
            </View>
            <View style={styles.postCareItem}>
              <View style={styles.postCareBullet} />
              <Text style={styles.postCareText}>Schedule ferritin check in 4 weeks to monitor iron overload.</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <Pressable style={styles.actionBtn}>
              <Share2 color={Brand.ink} size={20} />
              <Text style={styles.actionBtnText}>Share Record</Text>
            </Pressable>
            <Pressable style={styles.actionBtn}>
              <Download color={Brand.ink} size={20} />
              <Text style={styles.actionBtnText}>Download PDF</Text>
            </Pressable>
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
    marginBottom: 16,
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
  scroll: { paddingHorizontal: 24, paddingBottom: 48 },
  mainInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Brand.ink + "10",
  },
  mainInfoTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Brand.red + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    fontFamily: Fonts.serif,
    fontSize: 22,
    color: Brand.ink,
    marginBottom: 4,
  },
  mainSubtitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: Brand.ink + "80",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F2DEB3",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontFamily: Fonts.sansBold,
    fontSize: 12,
    color: "#C9A35A",
  },
  sectionTitle: {
    fontFamily: Fonts.serif,
    fontSize: 18,
    color: Brand.ink,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Brand.ink + "10",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLabel: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: Brand.ink + "80",
  },
  rowValue: {
    fontFamily: Fonts.sansBold,
    fontSize: 14,
    color: Brand.ink,
  },
  divider: {
    height: 1,
    backgroundColor: Brand.ink + "10",
  },
  reactionCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F2DEB3",
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    gap: 16,
    borderWidth: 1,
    borderColor: "#C9A35A20",
  },
  reactionIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#C9A35A20",
    justifyContent: "center",
    alignItems: "center",
  },
  reactionTitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 16,
    color: "#C9A35A",
    marginBottom: 4,
  },
  reactionDesc: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: "#C9A35A90",
    lineHeight: 20,
  },
  postCareItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  postCareBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Brand.ink + "40",
    marginTop: 6,
  },
  postCareText: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: Brand.ink,
    lineHeight: 22,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Brand.ink + "20",
    backgroundColor: "#fff",
  },
  actionBtnText: {
    fontFamily: Fonts.sansBold,
    fontSize: 14,
    color: Brand.ink,
  },
});
