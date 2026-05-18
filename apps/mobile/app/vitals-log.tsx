import { router, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";

import { 
  ThermometerLinear, 
  ClockCircleLinear, 
  CalendarLinear, 
  PhoneBold, 
  HeartPulseBold, 
  PillBold, 
  DangerTriangleBold, 
  CheckCircleBold, 
  ChevronLeftLinear, 
  InfoCircleLinear,
  AddCircleBold,
  HistoryLinear
} from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { createVitalLog } from "@/lib/healthData";

const { width } = Dimensions.get("window");

type Step = "history" | "input" | "assessment" | "protocol" | "success";

const SYMPTOMS = [
  { id: "chills", label: "Chills" },
  { id: "cough", label: "Cough" },
  { id: "sore_throat", label: "Sore throat" },
  { id: "headache", label: "Headache" },
  { id: "body_pain", label: "Body pain" },
  { id: "breathing", label: "Difficulty breathing" },
  { id: "none", label: "None of the above" },
];

const METHODS = [
  { id: "digital_underarm", label: "Digital thermometer (underarm)" },
  { id: "digital_oral", label: "Digital thermometer (oral)" },
  { id: "tympanic", label: "Tympanic (ear)" },
  { id: "other", label: "Other" },
];

export default function VitalsLogScreen() {
  const { user } = useAuth();

  const [step, setStep] = useState<Step>("history");
  const [temp, setTemp] = useState("38.6");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [method, setMethod] = useState("digital_underarm");
  const [notes, setNotes] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);



  const isHighFever = parseFloat(temp) >= 38.0;

  const handleSave = async () => {
    if (!user) return;
    const value = parseFloat(temp);
    if (isNaN(value)) return;

    setLoading(true);
    try {
      const combinedNotes = [
        method ? `Method: ${METHODS.find(m => m.id === method)?.label}` : null,
        selectedSymptoms.length > 0 ? `Symptoms: ${selectedSymptoms.join(", ")}` : null,
        notes ? `User Notes: ${notes}` : null
      ].filter(Boolean).join(" | ");

      await createVitalLog(user.id, {
        type: "temperature",
        value,
        unit: `Â°${unit}`,
        notes: combinedNotes,
      });

      setStep("protocol");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSymptom = (id: string) => {
    if (id === "none") {
      setSelectedSymptoms(["none"]);
      return;
    }
    setSelectedSymptoms(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev.filter(s => s !== "none"), id]
    );
  };

  const renderStep = () => {
    switch (step) {
      case "history":
        return (
          <ScrollView style={styles.stepContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Pressable onPress={() => router.back()} style={styles.iconBtn}>
                <ChevronLeftLinear color={Brand.ink} size={28} />
              </Pressable>
              <Text style={[styles.headerTitle, { color: Brand.ink }]}>Vitals & Monitoring</Text>
              <Pressable style={styles.iconBtn}>
                <InfoCircleLinear color={Brand.ink} size={24} />
              </Pressable>
            </View>



            <View style={styles.centerContent}>
              <View style={[styles.illustrationContainer, { backgroundColor: Brand.ink + "08" }]}>
                <ThermometerLinear color={Brand.red} size={80} />
                <View style={[styles.unitBadge, { backgroundColor: Brand.creamCard, borderColor: Brand.border }]}>
                  <Text style={[styles.unitBadgeText, { color: Brand.ink }]}>Â°C</Text>
                </View>
              </View>
              <Text style={[styles.heroText, { color: Brand.muted }]}>
                Log temperature and get guidance based on your care plan.
              </Text>
              <Pressable 
                style={[styles.primaryBtn, { backgroundColor: Brand.red }]}
                onPress={() => setStep("input")}
              >
                <Text style={styles.primaryBtnText}>Log new fever</Text>
              </Pressable>
            </View>

            <View style={styles.recentLogs}>
              <View style={styles.recentLogsHeader}>
                <Text style={styles.sectionTitle}>RECENT LOGS</Text>
                <Pressable><Text style={styles.viewAllText}>View all</Text></Pressable>
              </View>
              <View style={styles.logPlaceholder}>
                <HistoryLinear color={Brand.ink + "20"} size={32} />
                <Text style={{ color: Brand.ink + "40", fontSize: 12, marginTop: 8 }}>No recent fever logs</Text>
              </View>
            </View>
          </ScrollView>
        );

      case "input":
        return (
          <ScrollView style={styles.stepContainer}>
            <View style={styles.header}>
              <Pressable onPress={() => setStep("history")} style={styles.iconBtn}>
                <ChevronLeftLinear color={Brand.ink} size={28} />
              </Pressable>
              <Text style={[styles.headerTitle, { color: Brand.ink }]}>Log new fever</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>ENTER THE CURRENT TEMPERATURE</Text>
              <View style={[styles.tempInputContainer, { backgroundColor: Brand.creamCard }]}>
                <TextInput
                  value={temp}
                  onChangeText={setTemp}
                  keyboardType="numeric"
                  style={[styles.tempInput, { color: Brand.ink }]}
                />
                <View style={[styles.unitToggle, { backgroundColor: Brand.cream }]}>
                  <Pressable 
                    onPress={() => setUnit("C")}
                    style={[styles.unitBtn, unit === "C" && { backgroundColor: Brand.red }]}
                  >
                    <Text style={[styles.unitBtnText, unit === "C" && { color: "#fff" }, unit !== "C" && { color: Brand.muted }]}>Â°C</Text>
                  </Pressable>
                  <Pressable 
                    onPress={() => setUnit("F")}
                    style={[styles.unitBtn, unit === "F" && { backgroundColor: Brand.red }]}
                  >
                    <Text style={[styles.unitBtnText, unit === "F" && { color: "#fff" }, unit !== "F" && { color: Brand.muted }]}>Â°F</Text>
                  </Pressable>
                </View>
              </View>

              <Text style={[styles.formLabel, { marginTop: 24 }]}>DATE & TIME</Text>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={[styles.dateTimeBox, { backgroundColor: Brand.creamCard, flex: 1 }]}>
                  <CalendarLinear color={Brand.muted} size={18} />
                  <Text style={[styles.dateTimeText, { color: Brand.ink }]}>May 16, 2025</Text>
                </View>
                <View style={[styles.dateTimeBox, { backgroundColor: Brand.creamCard, flex: 1 }]}>
                  <ClockCircleLinear color={Brand.muted} size={18} />
                  <Text style={[styles.dateTimeText, { color: Brand.ink }]}>7:30 PM</Text>
                </View>
              </View>

              <Text style={[styles.formLabel, { marginTop: 24 }]}>HOW WAS TEMPERATURE TAKEN?</Text>
              <View style={styles.methodList}>
                {METHODS.map(m => (
                  <Pressable 
                    key={m.id}
                    onPress={() => setMethod(m.id)}
                    style={[
                      styles.methodItem, 
                      { backgroundColor: Brand.creamCard },
                      method === m.id && { backgroundColor: Brand.red + "10", borderColor: Brand.red + "40", borderWidth: 1 }
                    ]}
                  >
                    <Text style={[styles.methodText, { color: Brand.ink }, method === m.id && { color: Brand.red, fontFamily: Fonts.sansBold }]}>{m.label}</Text>
                    <View style={[styles.radio, { borderColor: Brand.ink + "20" }, method === m.id && { borderColor: Brand.red, backgroundColor: Brand.red }]}>
                      {method === m.id && <View style={styles.radioDot} />}
                    </View>
                  </Pressable>
                ))}
              </View>

              <Text style={[styles.formLabel, { marginTop: 24 }]}>NOTES (OPTIONAL)</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add any notes about this fever..."
                placeholderTextColor={Brand.muted}
                multiline
                style={[styles.notesInput, { backgroundColor: Brand.creamCard, color: Brand.ink }]}
              />

              <Pressable 
                style={[styles.primaryBtn, { backgroundColor: Brand.red, marginTop: 32, marginBottom: 48 }]}
                onPress={() => setStep("assessment")}
              >
                <Text style={styles.primaryBtnText}>Save temperature</Text>
              </Pressable>
            </View>
          </ScrollView>
        );

      case "assessment":
        return (
          <View style={styles.stepContainer}>
            <View style={styles.header}>
              <Pressable onPress={() => setStep("input")} style={styles.iconBtn}>
                <ChevronLeftLinear color={Brand.ink} size={28} />
              </Pressable>
              <Text style={[styles.headerTitle, { color: Brand.ink }]}>Fever assessment</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={[styles.summaryCard, { backgroundColor: Brand.creamCard }]}>
              <View style={[styles.summaryIcon, { backgroundColor: Brand.red + "15" }]}>
                <ThermometerLinear color={Brand.red} size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.summaryLabel}>TEMPERATURE</Text>
                <Text style={[styles.summaryValue, { color: Brand.ink }]}>{temp}Â°{unit}</Text>
                <Text style={{ fontSize: 10, color: Brand.muted, marginTop: 4 }}>May 16, 2025 â€¢ 7:30 PM</Text>
              </View>
              {isHighFever && (
                <View style={[styles.highBadge, { backgroundColor: Brand.red }]}>
                  <Text style={styles.highBadgeText}>High</Text>
                </View>
              )}
            </View>

            <Text style={[styles.formLabel, { marginTop: 32 }]}>ANY OTHER SYMPTOMS?</Text>
            <Text style={[styles.hintText, { color: Brand.muted }]}>Select all that apply</Text>
            
            <ScrollView style={styles.symptomList}>
              <View style={[styles.symptomCard, { backgroundColor: Brand.creamCard }]}>
                {SYMPTOMS.map((s, idx) => (
                  <Pressable 
                    key={s.id}
                    onPress={() => toggleSymptom(s.id)}
                    style={[styles.symptomItem, idx < SYMPTOMS.length - 1 && { borderBottomWidth: 1, borderBottomColor: Brand.ink + "08" }]}
                  >
                    <View style={[styles.checkbox, selectedSymptoms.includes(s.id) && { backgroundColor: Brand.red, borderColor: Brand.red }]}>
                      {selectedSymptoms.includes(s.id) && <CheckCircleBold color="#fff" size={14} />}
                    </View>
                    <Text style={[styles.symptomText, { color: Brand.ink }, selectedSymptoms.includes(s.id) && { color: Brand.red, fontFamily: Fonts.sansBold }]}>{s.label}</Text>
                  </Pressable>
                ))}
              </View>
              
              <Text style={[styles.formLabel, { marginTop: 24 }]}>ADDITIONAL NOTES (OPTIONAL)</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add notes..."
                placeholderTextColor={Brand.muted}
                multiline
                style={[styles.notesInput, { backgroundColor: Brand.creamCard, color: Brand.ink, height: 100 }]}
              />

              <View style={{ paddingVertical: 32, paddingBottom: 48 }}>
                <Pressable 
                  style={[styles.primaryBtn, { backgroundColor: Brand.red }]}
                  onPress={handleSave}
                  disabled={loading}
                >
                  <Text style={styles.primaryBtnText}>{loading ? "Saving..." : "Continue"}</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        );

      case "protocol":
        return (
          <ScrollView style={styles.stepContainer}>
            <View style={styles.header}>
              <Pressable onPress={() => setStep("assessment")} style={styles.iconBtn}>
                <ChevronLeftLinear color={Brand.ink} size={28} />
              </Pressable>
              <Text style={[styles.headerTitle, { color: Brand.ink }]}>Care protocol</Text>
              <View style={{ width: 44 }} />
            </View>

            <View style={styles.protocolContent}>
              <View style={[styles.alertBox, { backgroundColor: Brand.red + "08", borderColor: Brand.red + "20" }]}>
                <View style={styles.alertHeader}>
                  <DangerTriangleBold color={Brand.red} size={20} />
                  <Text style={[styles.alertTitle, { color: Brand.red }]}>HIGH FEVER DETECTED</Text>
                </View>
                <Text style={[styles.alertValue, { color: Brand.ink }]}>â‰¥38Â°C</Text>
                <Text style={[styles.alertMsg, { color: Brand.ink + "CC" }]}>Call your doctor immediately or seek medical care now.</Text>
              </View>

              <Text style={[styles.formLabel, { marginTop: 32, marginBottom: 24 }]}>WHAT TO DO NEXT</Text>
              
              <View style={styles.timeline}>
                <View style={[styles.timelineLine, { backgroundColor: Brand.ink + "10" }]} />
                
                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { backgroundColor: Brand.cream, borderColor: Brand.red + "30" }]}>
                    <PhoneBold color={Brand.red} size={14} />
                  </View>
                  <View style={styles.timelineText}>
                    <Text style={[styles.timelineTitle, { color: Brand.ink }]}>1. Contact your doctor now</Text>
                    <Text style={[styles.timelineDesc, { color: Brand.muted }]}>Tell them the temperature and any other symptoms.</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { backgroundColor: Brand.cream, borderColor: Brand.red + "30" }]}>
                    <ClockCircleLinear color={Brand.red} size={14} />
                  </View>
                  <View style={styles.timelineText}>
                    <Text style={[styles.timelineTitle, { color: Brand.ink }]}>2. Monitor closely</Text>
                    <Text style={[styles.timelineDesc, { color: Brand.muted }]}>Check temperature every 2â€“4 hours.</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { backgroundColor: Brand.cream, borderColor: Brand.red + "30" }]}>
                    <HeartPulseBold color={Brand.red} size={14} />
                  </View>
                  <View style={styles.timelineText}>
                    <Text style={[styles.timelineTitle, { color: Brand.ink }]}>3. Stay hydrated</Text>
                    <Text style={[styles.timelineDesc, { color: Brand.muted }]}>Give plenty of fluids.</Text>
                  </View>
                </View>

                <View style={styles.timelineItem}>
                  <View style={[styles.timelineDot, { backgroundColor: Brand.cream, borderColor: Brand.red + "30" }]}>
                    <PillBold color={Brand.red} size={14} />
                  </View>
                  <View style={styles.timelineText}>
                    <Text style={[styles.timelineTitle, { color: Brand.ink }]}>4. Use fever reducer (if advised)</Text>
                    <Text style={[styles.timelineDesc, { color: Brand.muted }]}>Follow your doctor's guidance on medication.</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.infoFooter, { backgroundColor: Brand.creamCard }]}>
                <InfoCircleLinear color={Brand.ink + "40"} size={16} />
                <Text style={[styles.infoFooterText, { color: Brand.ink + "60" }]}>
                  This advice is part of your care plan and does not replace professional medical judgment.
                </Text>
              </View>

              <Pressable 
                style={[styles.primaryBtn, { backgroundColor: Brand.red, marginTop: 40, marginBottom: 48 }]}
                onPress={() => setStep("success")}
              >
                <Text style={styles.primaryBtnText}>I understand</Text>
              </Pressable>
            </View>
          </ScrollView>
        );

      case "success":
        return (
          <View style={styles.stepContainer}>
            <View style={styles.centerContent}>
              <View style={[styles.successIcon, { backgroundColor: "#C9A35A20" }]}>
                <CheckCircleBold color="#C9A35A" size={48} />
              </View>
              <Text style={[styles.successTitle, { color: Brand.ink }]}>Fever logged</Text>
              <Text style={[styles.successSubtitle, { color: Brand.muted }]}>Fever logged successfully</Text>

              <View style={[styles.summaryCard, { backgroundColor: Brand.creamCard, width: "100%", marginTop: 32 }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.summaryLabel}>TEMPERATURE</Text>
                  <Text style={[styles.summaryValue, { color: Brand.ink }]}>{temp}Â°{unit}</Text>
                  <Text style={{ fontSize: 10, color: Brand.muted, marginTop: 4 }}>May 16, 2025 â€¢ 7:30 PM</Text>
                </View>
              </View>

              <View style={styles.nextSteps}>
                <Text style={styles.nextStepsLabel}>WHAT'S NEXT?</Text>
                
                <Pressable style={[styles.nextStepBtn, { backgroundColor: Brand.creamCard }]}>
                  <View style={styles.nextStepIcon}>
                    <ClockCircleLinear color={Brand.ink} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.nextStepTitle, { color: Brand.ink }]}>Set a reminder to recheck</Text>
                    <Text style={styles.nextStepDesc}>We'll remind you to recheck temperature.</Text>
                  </View>
                  <View style={{ transform: [{ rotate: "180deg" }] }}><ChevronLeftLinear color={Brand.muted} size={16}  /></View>
                </Pressable>

                <Pressable style={[styles.nextStepBtn, { backgroundColor: Brand.creamCard }]}>
                  <View style={styles.nextStepIcon}>
                    <HistoryLinear color={Brand.ink} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.nextStepTitle, { color: Brand.ink }]}>View fever history</Text>
                    <Text style={styles.nextStepDesc}>See your past fever logs and notes.</Text>
                  </View>
                  <View style={{ transform: [{ rotate: "180deg" }] }}>
                    <ChevronLeftLinear color={Brand.muted} size={16} />
                  </View>
                </Pressable>

                <Pressable style={[styles.nextStepBtn, { backgroundColor: Brand.creamCard }]} onPress={() => router.push("/emergency")}>
                  <View style={styles.nextStepIcon}>
                    <AddCircleBold color={Brand.ink} size={20} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.nextStepTitle, { color: Brand.ink }]}>Need help now?</Text>
                    <Text style={styles.nextStepDesc}>Find nearby hospitals or call your care team.</Text>
                  </View>
                  <View style={{ transform: [{ rotate: "180deg" }] }}>
                    <ChevronLeftLinear color={Brand.muted} size={16} />
                  </View>
                </Pressable>
              </View>

              <Pressable 
                style={[styles.primaryBtn, { backgroundColor: Brand.red, width: "100%", marginTop: 32 }]}
                onPress={() => router.replace("/")}
              >
                <Text style={styles.primaryBtnText}>Done</Text>
              </Pressable>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Brand.cream }}>
      <Stack.Screen options={{ headerShown: false }} />
      {renderStep()}
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: { flex: 1, paddingTop: 48 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  iconBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: Fonts.sansBold,
    fontSize: 18,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  illustrationContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  unitBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  unitBadgeText: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    color: Brand.ink,
  },
  heroText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: Fonts.sans,
    lineHeight: 22,
    marginBottom: 32,
  },
  primaryBtn: {
    height: 58,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    elevation: 4,
    shadowColor: Brand.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: Fonts.sansBold,
  },
  recentLogs: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    marginTop: 40,
  },
  recentLogsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    letterSpacing: 1.5,
    color: Brand.ink + "60",
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Brand.red,
  },
  logPlaceholder: {
    height: 100,
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Brand.ink + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  formSection: { paddingHorizontal: 24 },
  formLabel: {
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    letterSpacing: 1.2,
    color: Brand.ink + "60",
    marginBottom: 12,
  },
  tempInputContainer: {
    height: 96,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  tempInput: {
    flex: 1,
    fontSize: 36,
    fontFamily: Fonts.serif,
  },
  unitToggle: {
    flexDirection: "row",
    backgroundColor: Brand.ink + "08",
    padding: 4,
    borderRadius: 12,
  },
  unitBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  unitBtnText: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    color: Brand.ink + "40",
  },
  methodList: { gap: 10 },
  methodItem: {
    height: 64,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  methodText: {
    fontSize: 14,
    fontFamily: Fonts.sansMedium,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  notesInput: {
    borderRadius: 20,
    padding: 16,
    fontSize: 14,
    fontFamily: Fonts.sans,
    height: 120,
    textAlignVertical: "top",
  },
  dateTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 20,
  },
  dateTimeText: {
    fontSize: 14,
    fontFamily: Fonts.sansMedium,
  },
  summaryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 24,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  summaryLabel: {
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    color: Brand.ink + "60",
    letterSpacing: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: Fonts.serif,
  },
  highBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  highBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    letterSpacing: 1,
  },
  hintText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  symptomList: { flex: 1, paddingHorizontal: 24 },
  symptomCard: { borderRadius: 24, overflow: "hidden" },
  symptomItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  symptomText: { fontSize: 14, fontFamily: Fonts.sansMedium },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Brand.ink + "15",
    alignItems: "center",
    justifyContent: "center",
  },
  protocolContent: { paddingHorizontal: 24 },
  alertBox: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 24,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  alertTitle: {
    fontSize: 12,
    fontFamily: Fonts.sansBold,
    letterSpacing: 1,
  },
  alertValue: {
    fontSize: 28,
    fontFamily: Fonts.serif,
    marginBottom: 8,
  },
  alertMsg: {
    fontSize: 14,
    fontFamily: Fonts.sansMedium,
    lineHeight: 20,
  },
  timeline: { paddingLeft: 8 },
  timelineLine: {
    position: "absolute",
    left: 19,
    top: 24,
    bottom: 24,
    width: 2,
  },
  timelineItem: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  timelineText: { flex: 1 },
  timelineTitle: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    marginBottom: 4,
  },
  timelineDesc: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    lineHeight: 18,
  },
  infoFooter: {
    flexDirection: "row",
    gap: 12,
    padding: 16,
    borderRadius: 18,
  },
  infoFooterText: {
    flex: 1,
    fontSize: 10,
    fontFamily: Fonts.sansMedium,
    lineHeight: 15,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: Fonts.serif,
    marginBottom: 4,
  },
  successSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    marginBottom: 24,
  },
  nextSteps: { width: "100%", gap: 12, marginTop: 40 },
  nextStepsLabel: {
    fontSize: 10,
    fontFamily: Fonts.sansBold,
    color: Brand.ink + "60",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  nextStepBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    gap: 16,
  },
  nextStepIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Brand.ink + "08",
    alignItems: "center",
    justifyContent: "center",
  },
  nextStepTitle: {
    fontSize: 14,
    fontFamily: Fonts.sansBold,
    marginBottom: 2,
  },
  nextStepDesc: {
    fontSize: 11,
    color: Brand.ink + "40",
    fontFamily: Fonts.sans,
  },

});
