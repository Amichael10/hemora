import * as Linking from "expo-linking";
import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/theme";
import { establishSessionFromUrl, hasAuthPayloadInUrl } from "@/lib/oauthRedirectHandler";
import { getSupabase } from "@/lib/supabase";

/**
 * After a successful OAuth redirect, we land here.
 * We check if the user already has a profile:
 *  - Yes → go to main tabs (returning user)
 *  - No  → go to onboarding (new user)
 */
export default function AuthCallbackScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const linkingUrl = Linking.useLinkingURL();

  useEffect(() => {
    void (async () => {
      const supabase = getSupabase();
      if (!supabase) {
        router.replace("/login");
        return;
      }

      // ── 1. Establish session from URL (web flow or deep-link) ──
      if (typeof window !== "undefined" && window.location?.href) {
        const { error } = await establishSessionFromUrl(supabase, window.location.href);
        if (error) {
          router.replace({ pathname: "/login", params: { oauthError: error } });
          return;
        }
      } else {
        const effectiveUrl = linkingUrl ?? (await Linking.getInitialURL());
        if (!effectiveUrl) {
          router.replace({
            pathname: "/login",
            params: { oauthError: "No redirect link found. Please try Google sign-in again." },
          });
          return;
        }

        if (hasAuthPayloadInUrl(effectiveUrl)) {
          const { error } = await establishSessionFromUrl(supabase, effectiveUrl);
          if (error) {
            router.replace({ pathname: "/login", params: { oauthError: error } });
            return;
          }
        }
      }

      // ── 2. Get the freshly-established session ──
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      // ── 3. Check whether this user already has a profile ──
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profile) {
        // Returning user — go straight to dashboard
        router.replace("/(tabs)");
      } else {
        // New user — send to onboarding
        router.replace("/onboarding");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkingUrl]);

  return (
    <>
      <Stack.Screen options={{ title: "Signing in", headerShown: false }} />
      <View style={[styles.root, { backgroundColor: t.background }]}>
        <ActivityIndicator color={t.teal} />
        <Text style={[styles.text, { color: t.textMuted }]}>Signing you in…</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  text: { fontSize: 14, textAlign: "center", paddingHorizontal: 24 },
});
