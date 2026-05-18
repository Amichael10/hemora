import { router, Stack } from "expo-router";
import React, { useState, useEffect, useMemo } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ActivityIndicator,
  Vibration,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Svg, { Circle } from "react-native-svg";
import { ChevronLeftLinear, SettingsLinear, HistoryLinear, CheckCircleBold, CalendarLinear, DangerTriangleBold } from "@/components/icons/solar";
import { Droplet, Plus as PlusIcon, Minus as MinusIcon } from "lucide-react-native";
import { Brand } from "@/constants/theme";
import { Fonts } from "@/constants/typography";
import { useAuth } from "@/context/AuthContext";
import { getSupabase } from "@/lib/supabase";
import { createVitalLog } from "@/lib/healthData";
import { scheduleHydrationReminders } from "@/lib/notifications";

const { width } = Dimensions.get("window");

type HydrationView = "dashboard" | "log" | "settings" | "history";

export default function HydrationScreen() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<HydrationView>("dashboard");

  // Goals and settings
  const [targetGlasses, setTargetGlasses] = useState(10);
  const [higherTargetOverride, setHigherTargetOverride] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState({
    "9:00 AM": true,
    "1:00 PM": true,
    "6:00 PM": true,
  });

  // DB Logs State
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Manual logging state
  const [manualAmount, setManualAmount] = useState("");
  const [drinkType, setDrinkType] = useState("Water");
  const [notes, setNotes] = useState("");

  const finalTargetMl = useMemo(() => {
    let base = targetGlasses;
    if (higherTargetOverride) {
      base += 2;
    }
    return base * 250;
  }, [targetGlasses, higherTargetOverride]);

  const fetchHydrationLogs = async () => {
    if (!user) return;
    const supabase = getSupabase();
    if (!supabase) return;

    try {
      const { data, error } = await supabase
        .from("vitals_logs")
        .select("*")
        .eq("user_id", user.id)
        .eq("type", "hydration")
        .order("occurred_at", { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (e: any) {
      console.warn("Failed to fetch logs:", e.message);
    } finally {
      setLoading(false);
    }
  };

  // Load target goal and reminders from storage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedTarget = await AsyncStorage.getItem("hydration_target_glasses");
        const storedOverride = await AsyncStorage.getItem("hydration_higher_target_override");
        const storedReminders = await AsyncStorage.getItem("hydration_reminders_enabled");

        if (storedTarget) {
          setTargetGlasses(parseInt(storedTarget, 10));
        }
        if (storedOverride) {
          setHigherTargetOverride(storedOverride === "true");
        }
        if (storedReminders) {
          const parsed = JSON.parse(storedReminders);
          setRemindersEnabled(parsed);
          await scheduleHydrationReminders(parsed);
        } else {
          // Schedule default alarms
          await scheduleHydrationReminders({
            "9:00 AM": true,
            "1:00 PM": true,
            "6:00 PM": true,
          });
        }
      } catch (e) {
        console.warn("Failed to load hydration preferences from storage:", e);
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    fetchHydrationLogs();
  }, [user]);

  // Today's total hydration
  const todayTotalMl = useMemo(() => {
    const todayStr = new Date().toDateString();
    return logs
      .filter((log) => new Date(log.occurred_at || log.created_at).toDateString() === todayStr)
      .reduce((sum, log) => {
        const val = Number(log.value);
        if (log.unit === "glasses") {
          return sum + val * 250;
        }
        return sum + val;
      }, 0);
  }, [logs]);

  const todayGlasses = useMemo(() => {
    return Math.round((todayTotalMl / 250) * 10) / 10;
  }, [todayTotalMl]);

  const progressPercent = useMemo(() => {
    return Math.min(100, Math.round((todayTotalMl / finalTargetMl) * 100));
  }, [todayTotalMl, finalTargetMl]);

  const activeStreak = useMemo(() => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const checkDateStr = checkDate.toDateString();
      const hasIntake = logs.some(
        (log) => new Date(log.occurred_at || log.created_at).toDateString() === checkDateStr
      );
      if (hasIntake) {
        streak++;
      } else {
        if (i > 0) break;
      }
    }
    return streak;
  }, [logs]);

  const handleQuickAdd = async (amountMl: number) => {
    if (!user) return;
    setSaving(true);
    // Vibrate to provide an extremely satisfying micro-animation / physical feedback
    Vibration.vibrate(60);

    try {
      await createVitalLog(user.id, {
        type: "hydration",
        value: amountMl,
        unit: "ml",
        notes: `Quick hydration log: ${drinkType}`,
        occurred_at: new Date().toISOString(),
      });

      Alert.alert("💧 Hydrated!", `Successfully logged ${amountMl}mL of water.`);
      await fetchHydrationLogs();
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to log hydration.");
    } finally {
      setSaving(false);
    }
  };


  const handleManualSave = async () => {
    if (!user) return;
    const amount = parseInt(manualAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount in ml.");
      return;
    }

    setSaving(true);
    try {
      await createVitalLog(user.id, {
        type: "hydration",
        value: amount,
        unit: "ml",
        notes: notes || `Manual log: ${drinkType}`,
        occurred_at: new Date().toISOString(),
      });

      Alert.alert("Success", `Logged ${amount}ml successfully!`);
      setManualAmount("");
      setNotes("");
      setCurrentView("dashboard");
      await fetchHydrationLogs();
    } catch (e: any) {
      Alert.alert("Error", e.message || "Failed to log hydration.");
    } finally {
      setSaving(false);
    }
  };

  // SVGs progress ring settings
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  const weeklyData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day, idx) => {
      const today = new Date();
      const currentDayIdx = today.getDay();
      const targetDate = new Date();
      targetDate.setDate(today.getDate() - (currentDayIdx - idx));
      const targetDateStr = targetDate.toDateString();

      const dayLogs = logs.filter(
        (log) => new Date(log.occurred_at || log.created_at).toDateString() === targetDateStr
      );
      const totalMl = dayLogs.reduce((sum, log) => {
        const val = Number(log.value);
        if (log.unit === "glasses") {
          return sum + val * 250;
        }
        return sum + val;
      }, 0);

      return {
        day,
        ml: totalMl,
        glasses: totalMl / 250,
      };
    });
  }, [logs]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => {
            if (currentView !== "dashboard") {
              setCurrentView("dashboard");
            } else {
              router.back();
            }
          }} style={styles.iconBtn}>
            <ChevronLeftLinear color={Brand.ink} size={28} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: Brand.ink }]}>
            {currentView === "settings" ? "Hydration Settings" : currentView === "history" ? "History & Trends" : currentView === "log" ? "Log Water" : "Hydration Tracker"}
          </Text>
          {currentView === "dashboard" ? (
            <Pressable onPress={() => setCurrentView("settings")} style={styles.iconBtn}>
              <SettingsLinear color={Brand.ink} size={24} />
            </Pressable>
          ) : (
            <View style={{ width: 44 }} />
          )}
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={Brand.red} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {/* VIEW 1: DASHBOARD */}
            {currentView === "dashboard" && (
              <View style={styles.dashContainer}>
                {/* Gentle in-app reminder banner */}
                {progressPercent < 100 && (
                  <View style={styles.reminderBanner}>
                    <Text style={[styles.reminderBannerText, { fontFamily: Fonts.sans }]}>
                      💧 Have you had water recently? Stay ahead of dehydration to keep blood cells flowing and prevent crises!
                    </Text>
                    <Pressable style={styles.reminderBannerAction} onPress={() => handleQuickAdd(250)}>
                      <Text style={[styles.reminderBannerActionText, { fontFamily: Fonts.sansBold }]}>I've Drank a Glass</Text>
                    </Pressable>
                  </View>
                )}

                {/* Visual Progress Ring */}
                <View style={styles.card}>
                  <View style={styles.ringWrapper}>
                    <Svg width={size} height={size} style={styles.svgRing}>
                      <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={Brand.cream}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                      />
                      <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke={Brand.red}
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </Svg>
                    <View style={styles.innerRingText}>
                      <Droplet size={32} color={Brand.red} fill={Brand.red} />
                      <Text style={[styles.bigGlasses, { fontFamily: Fonts.serif }]}>
                        {todayGlasses} <Text style={styles.targetMuted}>/ {targetGlasses + (higherTargetOverride ? 2 : 0)}</Text>
                      </Text>
                      <Text style={styles.glassesLabel}>glasses</Text>
                      <Text style={styles.mlLabel}>({todayTotalMl} mL)</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* Summary items */}
                  <View style={styles.statsSplit}>
                    <View style={styles.splitCol}>
                      <Text style={styles.splitLabel}>TODAY'S TARGET</Text>
                      <Text style={[styles.splitValue, { fontFamily: Fonts.sansBold }]}>{finalTargetMl} mL</Text>
                      <Pressable onPress={() => setCurrentView("settings")}><Text style={styles.splitLink}>Edit Goal</Text></Pressable>
                    </View>
                    <View style={styles.splitCol}>
                      <Text style={styles.splitLabel}>ACTIVE STREAK</Text>
                      <Text style={[styles.splitValue, { fontFamily: Fonts.sansBold }]}>{activeStreak} Days</Text>
                      <Text style={styles.splitSub}>Keep it up!</Text>
                    </View>
                  </View>

                  {saving ? (
                    <ActivityIndicator size="small" color={Brand.red} style={{ marginTop: 24 }} />
                  ) : (
                    <View>
                      <View style={styles.logCtaRow}>
                        <Pressable 
                          style={styles.primaryCtaBtn} 
                          onPress={() => handleQuickAdd(250)}
                        >
                          <Droplet size={16} color="#fff" fill="#fff" />
                          <Text style={[styles.primaryCtaText, { fontFamily: Fonts.sansBold }]}>Glass (+250ml)</Text>
                        </Pressable>
                        <Pressable 
                          style={styles.secondaryCtaBtn} 
                          onPress={() => handleQuickAdd(500)}
                        >
                          <Droplet size={16} color={Brand.red} fill={Brand.red} />
                          <Text style={[styles.secondaryCtaText, { fontFamily: Fonts.sansBold }]}>Bottle (+500ml)</Text>
                        </Pressable>
                      </View>
                      <Pressable style={styles.customLogLink} onPress={() => setCurrentView("log")}>
                        <Text style={[styles.customLogLinkText, { fontFamily: Fonts.sans }]}>Log Custom amount or drink...</Text>
                      </Pressable>
                    </View>
                  )}
                </View>

                {/* Quick Add Section */}
                <Text style={styles.sectionTitle}>QUICK INTENSE HYDRATION</Text>
                <View style={styles.quickAddRow}>
                  <Pressable style={styles.quickAddBtn} onPress={() => handleQuickAdd(250)}>
                    <Droplet size={20} color={Brand.red} fill={Brand.red} />
                    <Text style={styles.quickAddLabel}>+ 250ml</Text>
                    <Text style={styles.quickAddSub}>Standard Glass</Text>
                  </Pressable>
                  <Pressable style={styles.quickAddBtn} onPress={() => handleQuickAdd(500)}>
                    <Droplet size={20} color={Brand.red} fill={Brand.red} />
                    <Text style={styles.quickAddLabel}>+ 500ml</Text>
                    <Text style={styles.quickAddSub}>Sports Bottle</Text>
                  </Pressable>
                </View>

                {/* Navigation Items */}
                <View style={styles.navGrid}>
                  <Pressable style={styles.navCard} onPress={() => setCurrentView("history")}>
                    <HistoryLinear size={24} color={Brand.red} />
                    <Text style={[styles.navCardTitle, { fontFamily: Fonts.sansBold }]}>History & Trends</Text>
                    <Text style={styles.navCardSub}>Review weekly progress</Text>
                  </Pressable>
                  <Pressable style={styles.navCard} onPress={() => setCurrentView("settings")}>
                    <SettingsLinear size={24} color={Brand.red} />
                    <Text style={[styles.navCardTitle, { fontFamily: Fonts.sansBold }]}>Reminders & Target</Text>
                    <Text style={styles.navCardSub}>Modify alerts</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* VIEW 2: LOG WATER */}
            {currentView === "log" && (
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Intake volume (mL)</Text>
                  <TextInput
                    value={manualAmount}
                    onChangeText={setManualAmount}
                    keyboardType="numeric"
                    placeholder="e.g. 350"
                    placeholderTextColor={Brand.ink + "40"}
                    style={styles.textInput}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Drink type</Text>
                  <View style={styles.optionsRow}>
                    {["Water", "Hydration Salt", "Juice", "Other"].map((item) => (
                      <Pressable
                        key={item}
                        onPress={() => setDrinkType(item)}
                        style={[
                          styles.optionBtn,
                          drinkType === item && { backgroundColor: Brand.red, borderColor: Brand.red },
                        ]}
                      >
                        <Text style={[styles.optionBtnText, drinkType === item && { color: "#fff", fontFamily: Fonts.sansBold }]}>
                          {item}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Notes (Optional)</Text>
                  <TextInput
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Add logs notes here..."
                    placeholderTextColor={Brand.ink + "40"}
                    style={[styles.textInput, { height: 80, textAlignVertical: "top" }]}
                    multiline
                  />
                </View>

                {saving ? (
                  <ActivityIndicator size="large" color={Brand.red} style={{ marginTop: 24 }} />
                ) : (
                  <Pressable style={[styles.primaryBtn, { backgroundColor: Brand.red }]} onPress={handleManualSave}>
                    <Text style={styles.primaryBtnText}>Save Hydration Intake</Text>
                  </Pressable>
                )}
              </View>
            )}

            {/* VIEW 3: SETTINGS */}
            {currentView === "settings" && (
              <View style={styles.formContainer}>
                <View style={styles.card}>
                  <Text style={[styles.cardHeading, { fontFamily: Fonts.serif }]}>Daily Target Goal</Text>
                  
                  <View style={styles.targetGoalRow}>
                    <Pressable
                      style={styles.stepperBtn}
                      onPress={() => setTargetGlasses((g) => Math.max(4, g - 1))}
                    >
                      <MinusIcon size={18} color={Brand.red} />
                    </Pressable>
                    <Text style={[styles.targetGoalText, { fontFamily: Fonts.serif }]}>
                      {targetGlasses} <Text style={{ fontSize: 16 }}>glasses</Text>
                    </Text>
                    <Pressable
                      style={styles.stepperBtn}
                      onPress={() => setTargetGlasses((g) => g + 1)}
                    >
                      <PlusIcon size={18} color={Brand.red} />
                    </Pressable>
                  </View>

                  <Text style={styles.targetGoalSub}>
                    Equivalent to {targetGlasses * 250} mL per day.
                  </Text>

                  <View style={styles.divider} />

                  <Pressable
                    style={styles.switchRow}
                    onPress={() => setHigherTargetOverride((o) => !o)}
                  >
                    <View style={{ flex: 1, paddingRight: 16 }}>
                      <Text style={[styles.switchTitle, { fontFamily: Fonts.sansBold }]}>Crisis Mode Target</Text>
                      <Text style={styles.switchDesc}>
                        Automatically increase daily goal by 2 glasses during hot weather or pain crisis recovery.
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.toggleTrack,
                        higherTargetOverride ? { backgroundColor: Brand.red } : { backgroundColor: "#ccc" },
                      ]}
                    >
                      <View style={[styles.toggleThumb, higherTargetOverride ? { left: 22 } : { left: 2 }]} />
                    </View>
                  </Pressable>
                </View>

                {/* Alarm reminders */}
                <Text style={styles.sectionTitle}>HYDRATION ALARMS</Text>
                <View style={styles.card}>
                  {Object.entries(remindersEnabled).map(([time, enabled]) => (
                    <Pressable
                      key={time}
                      style={styles.reminderRow}
                      onPress={() =>
                        setRemindersEnabled((r) => ({ ...r, [time]: !enabled }))
                      }
                    >
                      <CalendarLinear size={20} color={Brand.ink} />
                      <Text style={[styles.reminderTime, { fontFamily: Fonts.sansBold }]}>{time}</Text>
                      <View
                        style={[
                          styles.toggleTrack,
                          enabled ? { backgroundColor: Brand.red } : { backgroundColor: "#ccc" },
                        ]}
                      >
                        <View style={[styles.toggleThumb, enabled ? { left: 22 } : { left: 2 }]} />
                      </View>
                    </Pressable>
                  ))}
                </View>

                <Pressable
                  style={[styles.primaryBtn, { backgroundColor: Brand.red, marginTop: 12 }]}
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem("hydration_target_glasses", targetGlasses.toString());
                      await AsyncStorage.setItem("hydration_higher_target_override", higherTargetOverride.toString());
                      await AsyncStorage.setItem("hydration_reminders_enabled", JSON.stringify(remindersEnabled));
                      
                      await scheduleHydrationReminders(remindersEnabled);
                      
                      Alert.alert("Saved", "Your hydration target and alarm notifications have been updated.");
                      setCurrentView("dashboard");
                    } catch (e) {
                      Alert.alert("Error", "Failed to save settings.");
                    }
                  }}
                >
                  <Text style={styles.primaryBtnText}>Save Settings</Text>
                </Pressable>
              </View>
            )}

            {/* VIEW 4: HISTORY */}
            {currentView === "history" && (
              <View style={styles.formContainer}>
                {/* 7 Day Weekly Log */}
                <View style={styles.card}>
                  <Text style={[styles.cardHeading, { fontFamily: Fonts.serif }]}>Weekly Intake Chart</Text>
                  
                  <View style={styles.chartWrapper}>
                    {weeklyData.map((item, idx) => {
                      const maxTarget = finalTargetMl;
                      const heightPct = Math.min(100, (item.ml / maxTarget) * 100);
                      
                      return (
                        <View key={idx} style={styles.chartCol}>
                          <View style={styles.barContainer}>
                            <View style={[styles.barFill, { height: `${heightPct}%`, backgroundColor: Brand.red }]} />
                          </View>
                          <Text style={styles.chartDay}>{item.day}</Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <Text style={styles.sectionTitle}>RECENT INTAKES</Text>
                {logs.length === 0 ? (
                  <View style={styles.cardEmpty}>
                    <DangerTriangleBold color={Brand.ink + "30"} size={40} />
                    <Text style={styles.emptyText}>No hydration logs recorded.</Text>
                  </View>
                ) : (
                  logs.slice(0, 10).map((log, idx) => (
                    <View key={idx} style={styles.historyItem}>
                      <View style={styles.historyRow}>
                        <Droplet size={20} color={Brand.red} fill={Brand.red} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                          <Text style={[styles.historyName, { fontFamily: Fonts.sansBold }]}>
                            {log.value} {log.unit === "glasses" ? "glasses" : "mL"}
                          </Text>
                          <Text style={styles.historySub}>{log.notes || "Hydration Log"}</Text>
                        </View>
                        <Text style={styles.historyTime}>
                          {new Date(log.occurred_at || log.created_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Brand.cream,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 16,
    backgroundColor: Brand.cream,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(23, 54, 58, 0.05)",
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.serif,
    fontWeight: "700",
    textAlign: "center",
    flex: 1,
  },
  scroll: {
    paddingBottom: 80,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dashContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    shadowColor: Brand.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 24,
  },
  ringWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
  },
  svgRing: {
    transform: [{ rotate: "-90deg" }],
  },
  innerRingText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  bigGlasses: {
    fontSize: 32,
    fontWeight: "700",
    color: Brand.ink,
    marginTop: 4,
  },
  targetMuted: {
    fontSize: 18,
    color: "rgba(23, 54, 58, 0.4)",
  },
  glassesLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(23, 54, 58, 0.6)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  mlLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: Brand.red,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(23, 54, 58, 0.06)",
    marginVertical: 20,
  },
  statsSplit: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  splitCol: {
    flex: 1,
    alignItems: "center",
  },
  splitLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "rgba(23, 54, 58, 0.5)",
    letterSpacing: 1,
    marginBottom: 4,
  },
  splitValue: {
    fontSize: 16,
    color: Brand.ink,
  },
  splitLink: {
    fontSize: 12,
    color: Brand.red,
    fontWeight: "700",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  splitSub: {
    fontSize: 12,
    color: "rgba(23, 54, 58, 0.5)",
    marginTop: 4,
  },
  logWaterBtn: {
    backgroundColor: Brand.ink,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  logWaterBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(23, 54, 58, 0.5)",
    letterSpacing: 1,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  quickAddRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  quickAddBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickAddLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: Brand.ink,
    marginTop: 8,
  },
  quickAddSub: {
    fontSize: 11,
    color: "rgba(23, 54, 58, 0.4)",
    marginTop: 2,
  },
  navGrid: {
    flexDirection: "row",
    gap: 12,
  },
  navCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
  },
  navCardTitle: {
    fontSize: 14,
    color: Brand.ink,
    marginTop: 12,
  },
  navCardSub: {
    fontSize: 11,
    color: "rgba(23, 54, 58, 0.5)",
    marginTop: 2,
  },
  formContainer: {
    padding: 20,
  },
  formContainerTitle: {
    fontSize: 22,
    fontFamily: Fonts.serif,
    color: Brand.ink,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(23, 54, 58, 0.5)",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Brand.ink,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionBtnText: {
    fontSize: 13,
    color: Brand.ink,
  },
  primaryBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  cardHeading: {
    fontSize: 18,
    color: Brand.ink,
    fontWeight: "700",
    marginBottom: 16,
  },
  targetGoalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginVertical: 12,
  },
  stepperBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Brand.cream,
  },
  targetGoalText: {
    fontSize: 36,
    fontWeight: "700",
    color: Brand.ink,
  },
  targetGoalSub: {
    fontSize: 12,
    textAlign: "center",
    color: "rgba(23, 54, 58, 0.5)",
    marginTop: 4,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchTitle: {
    fontSize: 15,
    color: Brand.ink,
    marginBottom: 4,
  },
  switchDesc: {
    fontSize: 12,
    color: "rgba(23, 54, 58, 0.5)",
    lineHeight: 16,
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "absolute",
  },
  reminderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(23, 54, 58, 0.05)",
  },
  reminderTime: {
    flex: 1,
    fontSize: 15,
    color: Brand.ink,
    marginLeft: 12,
  },
  chartWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 160,
    paddingVertical: 12,
  },
  chartCol: {
    alignItems: "center",
    flex: 1,
  },
  barContainer: {
    height: 120,
    width: 14,
    backgroundColor: Brand.cream,
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: 7,
  },
  chartDay: {
    fontSize: 10,
    color: "rgba(23, 54, 58, 0.4)",
    fontWeight: "600",
    marginTop: 6,
  },
  cardEmpty: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "rgba(23, 54, 58, 0.4)",
    marginTop: 12,
  },
  historyItem: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(23, 54, 58, 0.08)",
    padding: 16,
    marginBottom: 12,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyName: {
    fontSize: 15,
    color: Brand.ink,
  },
  historySub: {
    fontSize: 12,
    color: "rgba(23, 54, 58, 0.5)",
    marginTop: 2,
  },
  historyTime: {
    fontSize: 12,
    color: "rgba(23, 54, 58, 0.4)",
    fontWeight: "600",
  },
  logCtaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  primaryCtaBtn: {
    flex: 1.2,
    backgroundColor: Brand.red,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    shadowColor: Brand.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryCtaText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryCtaBtn: {
    flex: 1,
    backgroundColor: Brand.cream,
    borderWidth: 1.5,
    borderColor: Brand.red,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  secondaryCtaText: {
    color: Brand.red,
    fontSize: 13,
    fontWeight: "700",
  },
  customLogLink: {
    alignSelf: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  customLogLinkText: {
    fontSize: 13,
    color: "rgba(23, 54, 58, 0.6)",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  reminderBanner: {
    backgroundColor: "rgba(224, 76, 76, 0.08)",
    borderWidth: 1.2,
    borderColor: "rgba(224, 76, 76, 0.15)",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  reminderBannerText: {
    fontSize: 13,
    color: Brand.ink,
    lineHeight: 18,
    marginBottom: 12,
  },
  reminderBannerAction: {
    backgroundColor: Brand.red,
    alignSelf: "flex-start",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  reminderBannerActionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});

