import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { CalendarLinear, ChevronLeftLinear } from "@/components/icons/solar";
import { Brand } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { Leaf } from "lucide-react-native";
import { getSupabase } from "@/lib/supabase"; // adjust if needed

export default function IronMonitoringScreen() {
  const { logId } = useLocalSearchParams();
  const [ferritin, setFerritin] = useState("842");
  const [date, setDate] = useState("May 16, 2025");
  const [therapy, setTherapy] = useState("Deferasirox (Exjade)");
  const [dose, setDose] = useState("1500 mg once daily");
  const [adherence, setAdherence] = useState(true);
  const [notes, setNotes] = useState("Occasional stomach upset");

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // For now, simulating save
      setTimeout(() => {
        Alert.alert("Success", "Iron monitoring details saved.", [
          { text: "OK", onPress: () => router.push("/(tabs)/records") }
        ]);
        setLoading(false);
      }, 500);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save details.");
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
          <Text style={styles.title}>Iron monitoring</Text>
          <Text style={styles.subtitle}>Track your ferritin levels and iron management.</Text>

          {/* Ferritin level */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ferritin level</Text>
            <View style={styles.unitInputWrap}>
              <TextInput
                value={ferritin}
                onChangeText={setFerritin}
                keyboardType="numeric"
                style={[styles.textInput, { flex: 1, borderWidth: 0 }]}
                placeholderTextColor={Brand.ink + "40"}
              />
              <Text style={styles.unitLabel}>ng/mL</Text>
            </View>
          </View>

          {/* Date tested */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date tested</Text>
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

          {/* Chelation therapy */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Chelation therapy</Text>
            <TextInput
              value={therapy}
              onChangeText={setTherapy}
              style={styles.textInput}
              placeholderTextColor={Brand.ink + "40"}
            />
          </View>

          {/* Dose */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dose</Text>
            <TextInput
              value={dose}
              onChangeText={setDose}
              style={styles.textInput}
              placeholderTextColor={Brand.ink + "40"}
            />
          </View>

          {/* Adherence reminder */}
          <View style={[styles.inputGroup, styles.toggleRow]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Adherence reminder</Text>
              <Text style={styles.optional}>Remind me to take my medication</Text>
            </View>
            <Switch
              value={adherence}
              onValueChange={setAdherence}
              trackColor={{ false: Brand.ink + "20", true: Brand.ink }}
              thumbColor={"#fff"}
            />
          </View>

          {/* Side effects / notes */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Side effects / notes <Text style={styles.optional}>(optional)</Text></Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholderTextColor={Brand.ink + "40"}
              multiline
              style={[styles.textInput, styles.textArea]}
            />
          </View>

          {/* Tip */}
          <View style={styles.tipBox}>
            <Leaf color={Brand.ink} size={24} style={styles.tipIcon} />
            <Text style={styles.tipText}>
              Iron chelation helps remove excess iron and protect your organs. Keep going—your consistency makes a difference.
            </Text>
          </View>

          <Pressable 
            style={[styles.primaryBtn, { opacity: loading ? 0.7 : 1 }]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.primaryBtnText}>
              {loading ? "Saving..." : "Save ferritin result"}
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
    fontSize: 12,
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
  unitInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Brand.ink + "15",
    borderRadius: 16,
    height: 56,
    backgroundColor: "#fff",
    paddingRight: 16,
  },
  unitLabel: {
    fontFamily: Fonts.sansMedium,
    color: Brand.ink,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    paddingTop: 16,
    textAlignVertical: "top",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tipBox: {
    flexDirection: "row",
    backgroundColor: Brand.ink + "10",
    padding: 16,
    borderRadius: 16,
    marginBottom: 32,
    alignItems: "flex-start",
  },
  tipIcon: {
    marginTop: 2,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    fontFamily: Fonts.sans,
    fontSize: 13,
    lineHeight: 18,
    color: Brand.ink,
  },
  primaryBtn: {
    backgroundColor: Brand.ink,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  primaryBtnText: {
    fontFamily: Fonts.sansBold,
    color: "#fff",
    fontSize: 16,
  },
});
