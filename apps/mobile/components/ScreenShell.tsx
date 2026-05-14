import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";

type Props = {
  title: string;
  children?: React.ReactNode;
};

export function ScreenShell({ title, children }: Props) {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: t.background }]} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: t.text }]}>{title}</Text>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    letterSpacing: -0.5,
    marginBottom: 16,
    fontFamily: Fonts.serif,
  },
});
