import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AltArrowLeftLinear } from "@/components/icons/solar";
import { Fonts } from "@/constants/typography";

type Props = {
  title: string;
  onBack: () => void;
  backgroundColor: string;
  titleColor: string;
  iconColor: string;
  right?: ReactNode;
};

export function DetailHeader({
  title,
  onBack,
  backgroundColor,
  titleColor,
  iconColor,
  right,
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 8, backgroundColor }]}>
      <View style={styles.row}>
        <View style={styles.side}>
          <Pressable
            onPress={onBack}
            style={[styles.circle, { borderColor: `${iconColor}33`, backgroundColor: "#fff" }]}
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <AltArrowLeftLinear color={iconColor} size={18} />
          </Pressable>
        </View>
        <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.side}>{right ?? <View style={styles.spacer} />}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
  },
  side: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    width: 40,
    height: 40,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontFamily: Fonts.serifSemi,
    fontSize: 18,
    letterSpacing: -0.3,
  },
});
