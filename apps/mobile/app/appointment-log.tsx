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
} from "react-native";

import { DetailHeader } from "@/components/DetailHeader";
import { AltArrowDownLinear, CalendarLinear, ClockCircleBold, HospitalLinear } from "@/components/icons/solar";
import { Brand } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { createAppointment } from "@/lib/healthData";

export default function AppointmentLogScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("05/20/2026");
  const [time, setTime] = useState("10:00 AM");
  const [provider, setProvider] = useState("");
  const [notes, setNotes] = useState("");

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (!title) {
      Alert.alert("Error", "Please enter a title for the appointment.");
      return;
    }

    setLoading(true);
    try {
      const appointmentDate = new Date(); 
      
      await createAppointment(user.id, {
        title: title,
        description: notes,
        appointment_at: appointmentDate.toISOString(),
        status: "scheduled",
        notes: provider ? `At: ${provider}` : undefined,
      });

      Alert.alert("Success", "Appointment scheduled.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to schedule appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.root, { backgroundColor: Brand.cream }]}>
        <DetailHeader
          title="New Appointment"
          onBack={() => router.back()}
          backgroundColor={Brand.cream}
          titleColor={Brand.ink}
          iconColor={Brand.ink}
        />
        
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.headerIcon}>
            <CalendarLinear color={Brand.red} size={48} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Brand.ink }]}>What is it for?</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="e.g. Hematology Review"
              placeholderTextColor={Brand.muted}
              style={[styles.input, { borderColor: Brand.ink + "15", color: Brand.ink, backgroundColor: "#fff" }]}
            />
          </View>

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text style={[styles.label, { color: Brand.ink }]}>Date</Text>
              <Pressable style={[styles.fieldRow, { borderColor: Brand.ink + "15", backgroundColor: "#fff" }]}>
                <Text style={[styles.fieldVal, { color: Brand.ink, fontFamily: Fonts.sans }]}>{date}</Text>
                <CalendarLinear color={Brand.muted} size={18} />
              </Pressable>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: Brand.ink }]}>Time</Text>
              <Pressable style={[styles.fieldRow, { borderColor: Brand.ink + "15", backgroundColor: "#fff" }]}>
                <Text style={[styles.fieldVal, { color: Brand.ink, fontFamily: Fonts.sans }]}>{time}</Text>
                <ClockCircleBold color={Brand.muted} size={18} />
              </Pressable>
            </View>
          </View>

          <View style={[styles.inputGroup, { marginTop: 16 }]}>
            <Text style={[styles.label, { color: Brand.ink }]}>Healthcare Provider / Clinic</Text>
            <Pressable style={[styles.fieldRow, { borderColor: Brand.ink + "15", backgroundColor: "#fff" }]}>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View style={{ marginRight: 10 }}><HospitalLinear color={Brand.muted} size={18} /></View>
                <TextInput
                  value={provider}
                  onChangeText={setProvider}
                  placeholder="Search or enter clinic name"
                  placeholderTextColor={Brand.muted}
                  style={{ flex: 1, color: Brand.ink, fontFamily: Fonts.sans, fontSize: 15 }}
                />
              </View>
              <AltArrowDownLinear color={Brand.muted} size={16} />
            </Pressable>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: Brand.ink }]}>Reminders</Text>
            <Pressable style={[styles.fieldRow, { borderColor: Brand.ink + "15", backgroundColor: "#fff" }]}>
              <Text style={[styles.fieldVal, { color: Brand.ink, fontFamily: Fonts.sans }]}>1 day before, 2 hours before</Text>
              <AltArrowDownLinear color={Brand.muted} size={18} />
            </Pressable>
          </View>

          <View style={{ marginTop: 8 }}>
            <Text style={[styles.label, { color: Brand.ink }]}>Preparation Notes</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder="e.g. Need to do blood test 2 days before"
              placeholderTextColor={Brand.muted}
              multiline
              numberOfLines={4}
              style={[styles.textArea, { borderColor: Brand.ink + "15", color: Brand.ink, backgroundColor: "#fff" }]}
            />
          </View>

          <Pressable 
            style={[styles.primaryBtn, { backgroundColor: Brand.red, opacity: loading ? 0.7 : 1 }]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={[styles.primaryBtnText, { fontFamily: Fonts.sansBold }]}>
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },
  headerIcon: {
    alignItems: "center",
    marginVertical: 20,
  },
  inputGroup: { marginBottom: 16 },
  label: { fontFamily: Fonts.sansMedium, fontSize: 13, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: Fonts.sans,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: Fonts.sans,
    height: 100,
    textAlignVertical: "top",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldVal: { fontSize: 15 },
  row: { flexDirection: "row" },
  primaryBtn: {
    marginTop: 32,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16 },
});
