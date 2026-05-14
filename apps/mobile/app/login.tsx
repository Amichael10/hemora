import { Stack, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogIn } from "lucide-react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { Theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { getGoogleOAuthRedirectUrl, SUPABASE_REDIRECT_ALLOWLIST_HINT } from "@/lib/authRedirect";

export default function LoginScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const { user, signInWithPassword, signInWithGoogle, ready } = useAuth();
  const params = useLocalSearchParams<{ oauthError?: string | string[] }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = params.oauthError;
    const msg = Array.isArray(raw) ? raw[0] : raw;
    if (msg) setError(msg);
  }, [params.oauthError]);

  if (ready && user) {
    router.replace("/(tabs)");
  }

  const onSignIn = async () => {
    setError(null);
    const e = email.trim();
    if (!e) {
      setError("Enter your email.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setBusy(true);
    const result = await signInWithPassword(e, password);
    setBusy(false);
    if (result.error) {
      setError(result.error);
    }
  };

  const continueWithGoogle = async () => {
    setError(null);
    setBusy(true);
    const result = await signInWithGoogle();
    setBusy(false);
    if (result.error) setError(result.error);
  };

  return (
    <>
      <Stack.Screen options={{ title: "Sign in", headerShown: false }} />
      <SafeAreaView style={[styles.root, { backgroundColor: t.background }]}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: t.text }]}>Welcome back</Text>
          <Text style={[styles.subtitle, { color: t.textMuted }]}>Sign in to continue your care.</Text>

          <View style={styles.inputWrap}>
            <Text style={[styles.label, { color: t.textMuted }]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              placeholder="you@example.com"
              placeholderTextColor={t.textMuted}
              style={[
                styles.input,
                { backgroundColor: t.surface, borderColor: t.tabBorder, color: t.text },
              ]}
            />
          </View>

          <View style={styles.inputWrap}>
            <Text style={[styles.label, { color: t.textMuted }]}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              textContentType="password"
              placeholder="••••••••"
              placeholderTextColor={t.textMuted}
              style={[
                styles.input,
                { backgroundColor: t.surface, borderColor: t.tabBorder, color: t.text },
              ]}
            />
          </View>

          <Pressable
            onPress={() => void onSignIn()}
            disabled={busy}
            style={({ pressed }) => [
              styles.primaryBtn,
              { backgroundColor: t.teal, opacity: pressed || busy ? 0.85 : 1 },
            ]}
          >
            {busy ? (
              <ActivityIndicator color={t.surface} />
            ) : (
              <>
                <LogIn size={18} color={t.surface} />
                <Text style={[styles.primaryLabel, { color: t.surface }]}>Sign in</Text>
              </>
            )}
          </Pressable>

          <View style={styles.orRow}>
            <View style={[styles.line, { backgroundColor: t.tabBorder }]} />
            <Text style={[styles.orText, { color: t.textMuted }]}>or</Text>
            <View style={[styles.line, { backgroundColor: t.tabBorder }]} />
          </View>

          <Pressable
            onPress={() => void continueWithGoogle()}
            disabled={busy}
            style={({ pressed }) => [
              styles.secondaryBtn,
              { borderColor: t.tabBorder, backgroundColor: t.surface, opacity: pressed || busy ? 0.9 : 1 },
            ]}
          >
            <Text style={[styles.secondaryLabel, { color: t.text }]}>Continue with Google</Text>
          </Pressable>

          {!!error && <Text style={[styles.feedback, { color: t.crisisActive }]}>{error}</Text>}

          {Platform.OS === "web" ? (
            <Text style={[styles.hint, { color: t.textMuted }]}>
              Supabase → Additional Redirect URLs (exact) for Google: {getGoogleOAuthRedirectUrl()}
              {"\n"}
              Supabase rejects localhost — use 127.0.0.1. Open this dev server at http://127.0.0.1:8081 (not localhost).
            </Text>
          ) : (
            <Text style={[styles.hint, { color: t.textMuted }]}>
              Supabase → Auth → URL configuration → Additional Redirect URLs. Add these lines (wildcards are
              OK — you do not need a new URL every time your Wi‑Fi IP changes):{"\n"}
              {SUPABASE_REDIRECT_ALLOWLIST_HINT.map((u) => `• ${u}`).join("\n")}
              {"\n\n"}
              This session’s Google redirect (must still match an allow‑list pattern):{"\n"}
              {getGoogleOAuthRedirectUrl()}
              {"\n\n"}
              Android “adb not recognized”: install Android Studio → SDK Manager → set ANDROID_HOME to the SDK
              path → add %ANDROID_HOME%\platform-tools to PATH, then restart the terminal.
            </Text>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 24 },
  title: { fontSize: 30, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginTop: 8, marginBottom: 28 },
  inputWrap: { gap: 8, marginBottom: 4 },
  label: { fontSize: 13, fontWeight: "600" },
  input: { height: 48, borderWidth: 1, borderRadius: 12, paddingHorizontal: 14, fontSize: 15 },
  primaryBtn: {
    height: 48,
    borderRadius: 12,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  primaryLabel: { fontSize: 15, fontWeight: "700" },
  orRow: { flexDirection: "row", alignItems: "center", gap: 10, marginVertical: 18 },
  line: { flex: 1, height: 1 },
  orText: { fontSize: 12 },
  secondaryBtn: { height: 48, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  secondaryLabel: { fontSize: 15, fontWeight: "600" },
  feedback: { marginTop: 14, textAlign: "center", fontSize: 13 },
  hint: { marginTop: 22, fontSize: 11, lineHeight: 16 },
});
