import { router, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { CalendarLinear } from "@/components/icons/solar";
import { DetailHeader } from "@/components/DetailHeader";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";

const TYPES = ["Visit", "Lab", "Imaging", "Other"] as const;

export default function AddRecordScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const [kind, setKind] = useState<(typeof TYPES)[number]>("Visit");

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.root, { backgroundColor: t.background }]}>
        <DetailHeader
          title="Add record"
          onBack={() => router.back()}
          backgroundColor={t.background}
          titleColor={t.text}
          iconColor={Brand.ink}
        />
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={[styles.label, { color: t.text }]}>Type</Text>
          <View style={styles.typeRow}>
            {TYPES.map((x) => (
              <Pressable
                key={x}
                onPress={() => setKind(x)}
                style={[
                  styles.typeChip,
                  kind === x
                    ? { backgroundColor: Brand.red, borderColor: Brand.red }
                    : { backgroundColor: "#fff", borderColor: t.tabBorder },
                ]}
              >
                <Text
                  style={[
                    styles.typeChipText,
                    { fontFamily: Fonts.sansBold },
                    { color: kind === x ? "#fff" : t.text },
                  ]}
                >
                  {x}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.label, { color: t.text }]}>Title</Text>
          <TextInput
            placeholder="e.g. Blood Work"
            placeholderTextColor={t.textMuted}
            style={[styles.input, { borderColor: t.tabBorder, color: t.text, backgroundColor: "#fff" }]}
          />

          <Text style={[styles.label, { color: t.text }]}>Hospital / Clinic</Text>
          <TextInput
            placeholder="e.g. General Hospital"
            placeholderTextColor={t.textMuted}
            style={[styles.input, { borderColor: t.tabBorder, color: t.text, backgroundColor: "#fff" }]}
          />

          <Text style={[styles.label, { color: t.text }]}>Date</Text>
          <Pressable style={[styles.fieldRow, { borderColor: t.tabBorder, backgroundColor: "#fff" }]}>
            <Text style={[styles.fieldVal, { color: t.text, fontFamily: Fonts.sans }]}>05/10/2026</Text>
            <CalendarLinear color={t.textMuted} size={18} />
          </Pressable>

          <Pressable style={[styles.primaryBtn, { backgroundColor: Brand.red }]}>
            <Text style={[styles.primaryBtnText, { fontFamily: Fonts.sansBold }]}>Add record</Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },
  label: { fontFamily: Fonts.sansMedium, fontSize: 13, marginBottom: 8, marginTop: 6 },
  typeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
  typeChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },
  typeChipText: { fontSize: 12 },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: Fonts.sans,
    marginBottom: 4,
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
  primaryBtn: {
    marginTop: 28,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 16 },
});
