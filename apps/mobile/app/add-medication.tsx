import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { AltArrowDownLinear, CalendarLinear } from "@/components/icons/solar";
import { DetailHeader } from "@/components/DetailHeader";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";

export default function AddMedicationScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.root, { backgroundColor: t.background }]}>
        <DetailHeader
          title="Add medication"
          onBack={() => router.back()}
          backgroundColor={t.background}
          titleColor={t.text}
          iconColor={Brand.ink}
        />
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Field label="Name" placeholder="e.g. Hydroxyurea" t={t} />
          <Field label="Dose" placeholder="e.g. 500 mg" t={t} />

          <Text style={[styles.label, { color: t.text }]}>Frequency</Text>
          <Pressable style={[styles.fieldRow, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <Text style={[styles.fieldVal, { color: t.text, fontFamily: Fonts.sans }]}>Once daily</Text>
            <AltArrowDownLinear color={t.textMuted} size={18} />
          </Pressable>

          <Text style={[styles.label, { color: t.text }]}>Reminder time</Text>
          <View style={styles.timeRow}>
            {["8", "00", "AM"].map((x, i) => (
              <Pressable
                key={i}
                style={[styles.timeChip, { borderColor: t.tabBorder, backgroundColor: "#fff", flex: 1 }]}
              >
                <Text style={[styles.fieldVal, { color: t.text, fontFamily: Fonts.sansBold }]}>{x}</Text>
                <AltArrowDownLinear color={t.textMuted} size={14} />
              </Pressable>
            ))}
          </View>
          <Text style={[styles.hint, { color: t.textMuted }]}>Pick the hour, minute, and AM or PM</Text>

          <Text style={[styles.label, { color: t.text }]}>Start date</Text>
          <Pressable style={[styles.fieldRow, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <Text style={[styles.fieldVal, { color: t.text, fontFamily: Fonts.sans }]}>05/10/2026</Text>
            <CalendarLinear color={t.textMuted} size={18} />
          </Pressable>
          <Text style={[styles.hint, { color: t.textMuted }]}>
            Defaults to today if your first dose time has already passed, otherwise tomorrow. You can change it.
          </Text>

          <Text style={[styles.label, { color: t.text, marginTop: 8 }]}>Refill reminder</Text>
          <Pressable style={[styles.fieldRow, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <Text style={[styles.fieldVal, { color: t.text, fontFamily: Fonts.sans }]}>3 days before</Text>
            <AltArrowDownLinear color={t.textMuted} size={18} />
          </Pressable>
          <Text style={[styles.hint, { color: t.textMuted }]}>
            We&apos;ll nudge you this many days before you&apos;re due to run out.
          </Text>

          <Text style={[styles.label, { color: t.text }]}>Next refill date</Text>
          <Pressable style={[styles.fieldRow, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <Text style={[styles.placeholder, { color: t.textMuted, fontFamily: Fonts.sans }]}>mm/dd/yyyy</Text>
            <CalendarLinear color={t.textMuted} size={18} />
          </Pressable>
          <Text style={[styles.hint, { color: t.textMuted }]}>
            When do you expect to run out? We&apos;ll remind you ahead of this date.
          </Text>

          <Pressable style={[styles.primaryBtn, { backgroundColor: Brand.red }]}>
            <Text style={[styles.primaryBtnText, { fontFamily: Fonts.sansBold }]}>Save medication</Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}

type ThemeTokens = (typeof Theme)[keyof typeof Theme];

function Field({
  label,
  placeholder,
  t,
}: {
  label: string;
  placeholder: string;
  t: ThemeTokens;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={[styles.label, { color: t.text }]}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={t.textMuted}
        style={[styles.input, { borderColor: t.tabBorder, color: t.text, backgroundColor: "#fff", fontFamily: Fonts.sans }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },
  label: { fontFamily: Fonts.sansMedium, fontSize: 13, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
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
  placeholder: { fontSize: 15 },
  timeRow: { flexDirection: "row", gap: 8 },
  timeChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
  },
  hint: { fontSize: 12, marginTop: 8, lineHeight: 18 },
  primaryBtn: {
    marginTop: 28,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16 },
});
