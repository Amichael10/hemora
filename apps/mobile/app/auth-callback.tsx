import * as Linking from "expo-linking";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/theme";
import { establishSessionFromUrl, hasAuthPayloadInUrl } from "@/lib/oauthRedirectHandler";
import { getSupabase } from "@/lib/supabase";

export default function AuthCallbackScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const linkingUrl = Linking.useLinkingURL();
  const [message, setMessage] = useState("Signing you in...");

  useEffect(() => {
    void (async () => {
      const supabase = getSupabase();
      if (!supabase) {
        router.replace("/login");
        return;
      }

      if (Platform.OS === "web" && typeof window !== "undefined") {
        const { error } = await establishSessionFromUrl(supabase, window.location.href);
        if (error) {
          router.replace({ pathname: "/login", params: { oauthError: error } });
          return;
        }
        router.replace("/(tabs)");
        return;
      }

      const effectiveUrl = linkingUrl ?? (await Linking.getInitialURL());
      if (!effectiveUrl) {
        router.replace({
          pathname: "/login",
          params: { oauthError: "No redirect link found. Please try Google sign-in again." },
        });
        return;
      }

      if (!hasAuthPayloadInUrl(effectiveUrl)) {
        router.replace({
          pathname: "/login",
          params: {
            oauthError:
              "Google returned without auth data. In Supabase add redirect allow-list entries: exp://** and hemora://auth-callback.",
          },
        });
        return;
      }

      const { error } = await establishSessionFromUrl(supabase, effectiveUrl);
      if (error) {
        router.replace({ pathname: "/login", params: { oauthError: error } });
        return;
      }
      router.replace("/(tabs)");
    })();
  }, [linkingUrl]);

  return (
    <>
      <Stack.Screen options={{ title: "Signing in", headerShown: false }} />
      <View style={[styles.root, { backgroundColor: t.background }]}>
        <ActivityIndicator color={t.teal} />
        <Text style={[styles.text, { color: t.textMuted }]}>{message}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  text: { fontSize: 14, textAlign: "center", paddingHorizontal: 24 },
});
