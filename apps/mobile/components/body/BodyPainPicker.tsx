import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Svg, { G, Rect, Text as SvgText } from "react-native-svg";

import { Fonts } from "@/constants/typography";

import { FemaleBodyPaths, FEMALE_VIEW_H, FEMALE_VIEW_W } from "./FemaleBody";
import { MaleBodyPaths, MALE_VIEW_H, MALE_VIEW_W, PAIN_FILL } from "./MaleBody";

const ALL_CHIPS = ["Head", "Chest", "Abdomen", "Arms", "Legs", "Back", "Joints", "Other"] as const;

type CalloutAnchor = { x: number; y: number; side: "left" | "right"; label: string };

function calloutWidth(label: string): number {
  return Math.max(54, label.length * 9 + 18);
}

export function BodyPainPicker({
  gender,
  selected,
  onToggle,
  otherText = "",
  onOtherChange,
  chipBorderColor,
  chipSurfaceColor,
  chipTextColor,
}: {
  gender: string | null | undefined;
  selected: string[];
  onToggle: (label: string) => void;
  otherText?: string;
  onOtherChange?: (text: string) => void;
  chipBorderColor: string;
  chipSurfaceColor: string;
  chipTextColor: string;
}) {
  const isMale = gender === "Male";
  const [callout, setCallout] = useState<CalloutAnchor | null>(null);
  const isSelected = (label: string) => selected.includes(label);
  const otherActive = isSelected("Other");

  const handleTap = (label: string, anchor: { x: number; y: number; side: "left" | "right" }) => {
    setCallout({ ...anchor, label });
    onToggle(label);
  };

  const calloutVisible = callout && isSelected(callout.label) ? callout : null;

  const viewW = isMale ? MALE_VIEW_W : FEMALE_VIEW_W;
  const viewH = isMale ? MALE_VIEW_H : FEMALE_VIEW_H;
  const w = calloutVisible ? calloutWidth(calloutVisible.label) : 0;

  return (
    <View style={styles.root}>
      <View style={[styles.svgFrame, { aspectRatio: viewW / viewH }]}>
        <Svg viewBox={`0 0 ${viewW} ${viewH}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          {isMale ? (
            <MaleBodyPaths isSelected={isSelected} onTap={handleTap} />
          ) : (
            <FemaleBodyPaths isSelected={isSelected} onTap={handleTap} />
          )}

          {calloutVisible ? (
            <G opacity={1}>
              <Rect
                x={calloutVisible.x}
                y={calloutVisible.y}
                rx={28}
                ry={28}
                width={w * 2.4}
                height={56}
                fill="#fff"
                stroke={PAIN_FILL}
                strokeOpacity={0.25}
                strokeWidth={2}
              />
              <SvgText
                x={calloutVisible.x + w * 1.2}
                y={calloutVisible.y + 36}
                textAnchor="middle"
                fontSize={28}
                fontWeight="600"
                fill={PAIN_FILL}
              >
                {calloutVisible.label}
              </SvgText>
            </G>
          ) : null}
        </Svg>
      </View>

      <View style={styles.chipsRow}>
        {ALL_CHIPS.map((chip) => {
          const active = isSelected(chip);
          return (
            <Pressable
              key={chip}
              onPress={() => onToggle(chip)}
              style={[
                styles.chip,
                {
                  borderColor: active ? PAIN_FILL : chipBorderColor,
                  backgroundColor: active ? PAIN_FILL : chipSurfaceColor,
                },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[styles.chipTxt, { color: active ? "#fff" : chipTextColor, fontFamily: Fonts.sansBold }]}>
                {chip}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {otherActive ? (
        <View style={styles.otherBlock}>
          <Text style={[styles.otherLbl, { color: chipTextColor }]}>Where else does it hurt?</Text>
          <TextInput
            value={otherText}
            onChangeText={onOtherChange}
            placeholder="Describe in your own words…"
            placeholderTextColor={`${chipTextColor}99`}
            multiline
            style={[
              styles.otherInput,
              { borderColor: chipBorderColor, color: chipTextColor, backgroundColor: chipSurfaceColor, fontFamily: Fonts.sans },
            ]}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: "100%", alignItems: "center" },
  svgFrame: {
    width: "100%",
    maxHeight: 420,
    alignSelf: "center",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 4,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
  },
  chipTxt: { fontSize: 12 },
  otherBlock: { width: "100%", marginTop: 16, paddingHorizontal: 4 },
  otherLbl: { fontSize: 12, fontFamily: Fonts.sansBold, marginBottom: 8, paddingHorizontal: 4 },
  otherInput: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    minHeight: 72,
    textAlignVertical: "top",
  },
});
