import { Stack, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/components/useColorScheme";
import { useAuth } from "@/context/AuthContext";
import { Theme } from "@/constants/theme";
import { MOBILE_UI_BUILD } from "@/constants/version";

export default function SettingsScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user, signOut } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerStyle: { backgroundColor: t.surface },
          headerTintColor: t.teal,
          headerTitleStyle: { color: t.text, fontWeight: "600" },
          headerShadowVisible: false,
        }}
      />
      <SafeAreaView style={[styles.root, { backgroundColor: t.background }]} edges={["bottom"]}>
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.tabBorder }]}>
          <Text style={[styles.label, { color: t.textMuted }]}>Signed in as</Text>
          <Text style={[styles.email, { color: t.text }]}>{user?.email ?? "—"}</Text>
        </View>
        <Pressable
          onPress={() => void signOut().then(() => router.replace("/login"))}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: t.teal, opacity: pressed ? 0.88 : 1 },
          ]}
        >
          <Text style={[styles.buttonLabel, { color: t.surface }]}>Sign out</Text>
        </Pressable>
        <Text style={[styles.build, { color: t.textMuted }]}>{MOBILE_UI_BUILD}</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, gap: 16 },
  card: { borderRadius: 16, borderWidth: 1, padding: 18 },
  label: { fontSize: 12, fontWeight: "600", marginBottom: 6 },
  email: { fontSize: 16, fontWeight: "600" },
  button: { alignSelf: "flex-start", paddingVertical: 14, paddingHorizontal: 22, borderRadius: 12 },
  buttonLabel: { fontSize: 15, fontWeight: "700" },
  build: { fontSize: 11, marginTop: 8 },
});
