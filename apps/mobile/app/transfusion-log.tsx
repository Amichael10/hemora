import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Switch,
} from "react-native";
import { CalendarLinear, ChevronLeftLinear } from "@/components/icons/solar";
import { Brand } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { createTransfusionLog } from "@/lib/healthData";

export default function TransfusionLogScreen() {
  const [date, setDate] = useState("May 16, 2025");
  const [hospital, setHospital] = useState("LUTH Sickle Cell Clinic");
  const [reason, setReason] = useState("Pain crisis");
  const [bloodType, setBloodType] = useState("O+ (Compatible)");
  const [units, setUnits] = useState(2);
  const [hbPre, setHbPre] = useState("8.2");
  const [reaction, setReaction] = useState(false);
  const [notes, setNotes] = useState("");

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (units <= 0) {
      Alert.alert("Error", "Please enter at least 1 unit.");
      return;
    }

    setLoading(true);
    try {
      const combinedNotes = [
        hospital ? `Hospital: ${hospital}` : null,
        reason ? `Reason: ${reason}` : null,
        bloodType ? `Blood Type: ${bloodType}` : null,
        notes ? `Notes: ${notes}` : null
      ].filter(Boolean).join(" | ");

      await createTransfusionLog(user.id, {
        occurred_at: new Date().toISOString(), // In real app, parse `date`
        units_count: units,
        transfusion_type: "simple",
        hemoglobin_pre: hbPre ? parseFloat(hbPre) : undefined,
        reaction_logged: reaction,
        reaction_details: reaction ? notes : undefined,
        notes: combinedNotes,
      });

      if (reaction) {
        Alert.alert(
          "Reaction Logged",
          "You reported a reaction during or after this transfusion.\n\nTransfusion reactions can be serious.\n\nPlease notify your care team immediately if you haven't already. Watch for worsening symptoms like shortness of breath or back pain.",
          [
            { text: "I understand", onPress: () => router.replace("/iron-monitoring" as any) }
          ]
        );
      } else {
        router.replace("/iron-monitoring" as any);
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save transfusion log.");
    } finally {
      setLoading(false);
    }
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
        </View>

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Add transfusion</Text>
          <Text style={styles.subtitle}>Add details to keep an accurate record of your care.</Text>

          {/* Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of transfusion</Text>
            <View style={styles.dateField}>
              <CalendarLinear color={Brand.ink + "60"} size={20} />
              <TextInput 
                style={styles.dateInput} 
                value={date} 
                onChangeText={setDate}
                placeholderTextColor={Brand.ink + "40"}
              />
            </View>
          </View>

          {/* Hospital */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Hospital / clinic</Text>
            <TextInput
              value={hospital}
              onChangeText={setHospital}
              style={styles.textInput}
              placeholderTextColor={Brand.ink + "40"}
            />
          </View>

          {/* Reason */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reason for transfusion</Text>
            <TextInput
              value={reason}
              onChangeText={setReason}
              style={styles.textInput}
              placeholderTextColor={Brand.ink + "40"}
            />
          </View>

          {/* Blood type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Blood type / compatibility note</Text>
            <TextInput
              value={bloodType}
              onChangeText={setBloodType}
              style={styles.textInput}
              placeholderTextColor={Brand.ink + "40"}
            />
          </View>

          {/* Units */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Units received</Text>
            <View style={styles.unitsRow}>
              <View style={styles.stepper}>
                <Pressable onPress={() => setUnits(u => Math.max(1, u - 1))} style={styles.stepperBtn}>
                  <Text style={styles.stepperBtnText}>-</Text>
                </Pressable>
                <Text style={styles.stepperValue}>{units}</Text>
                <Pressable onPress={() => setUnits(u => u + 1)} style={styles.stepperBtn}>
                  <Text style={styles.stepperBtnText}>+</Text>
                </Pressable>
              </View>
              <Text style={styles.unitsText}>units</Text>
            </View>
          </View>

          {/* Pre-transfusion Hemoglobin */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pre-transfusion hemoglobin <Text style={styles.optional}>(optional)</Text></Text>
            <TextInput
              value={hbPre}
              onChangeText={setHbPre}
              keyboardType="numeric"
              style={styles.textInput}
              placeholder="e.g. 8.2 g/dL"
              placeholderTextColor={Brand.ink + "40"}
            />
          </View>

          {/* Reaction Toggle */}
          <View style={[styles.inputGroup, { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }]}>
            <View>
              <Text style={[styles.label, { marginBottom: 2 }]}>Any reaction?</Text>
              <Text style={{ fontSize: 12, color: Brand.ink + "80" }}>Toggle if you experienced adverse effects</Text>
            </View>
            <Switch 
              value={reaction}
              onValueChange={setReaction}
              trackColor={{ false: Brand.ink + "20", true: Brand.red }}
            />
          </View>

          {/* Reaction Notes (Conditional) */}
          {reaction && (
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: Brand.red }]}>Reaction Details / Notes <Text style={[styles.optional, { color: Brand.red + "80" }]}>(optional)</Text></Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="e.g., mild headache, chills"
                placeholderTextColor={Brand.ink + "40"}
                multiline
                style={[styles.textInput, styles.textArea, { backgroundColor: Brand.red + "10", borderColor: Brand.red + "30" }]}
              />
            </View>
          )}

          <Pressable 
            style={[styles.primaryBtn, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Saving..." : "Save & continue"}
            </Text>
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
    marginLeft: -8,
  },
  scroll: { paddingHorizontal: 24, paddingBottom: 48 },
  title: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    color: Brand.ink,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: Fonts.sans,
    fontSize: 14,
    color: Brand.muted,
    marginBottom: 32,
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontFamily: Fonts.sansBold,
    fontSize: 13,
    color: Brand.ink,
    marginBottom: 10,
  },
  optional: {
    fontFamily: Fonts.sans,
    color: Brand.muted,
    fontWeight: "normal",
  },
  dateField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Brand.ink + "15",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#fff",
    gap: 12,
  },
  dateInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: Fonts.sansMedium,
    color: Brand.ink,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Brand.ink + "15",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#fff",
    fontSize: 15,
    fontFamily: Fonts.sansMedium,
    color: Brand.ink,
  },
  textArea: {
    height: 100,
    paddingTop: 16,
    textAlignVertical: "top",
  },
  unitsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Brand.ink + "15",
    borderRadius: 16,
    backgroundColor: "#fff",
    height: 56,
  },
  stepperBtn: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperBtnText: {
    fontSize: 24,
    fontFamily: Fonts.sans,
    color: Brand.muted,
  },
  stepperValue: {
    fontSize: 18,
    fontFamily: Fonts.sansMedium,
    color: Brand.ink,
    width: 48,
    textAlign: "center",
  },
  unitsText: {
    fontSize: 16,
    fontFamily: Fonts.sansMedium,
    color: Brand.ink,
  },
  primaryBtn: {
    backgroundColor: Brand.ink,
    borderRadius: 18,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.sansBold,
  },
});

