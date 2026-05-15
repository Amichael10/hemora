import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { BrandedSplash } from "@/components/BrandedSplash";
import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { fontAssets } from "@/constants/typography";
import { hemoraDarkTheme, hemoraLightTheme } from "@/constants/navigation-theme";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();
WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutWithSplash />
    </AuthProvider>
  );
}

function RootLayoutWithSplash() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    ...fontAssets,
  });
  const { ready: authReady } = useAuth();
  const [minWaitDone, setMinWaitDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const t = setTimeout(() => setMinWaitDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  const hideSplash = useCallback(async () => {
    if (loaded && authReady && minWaitDone) {
      await SplashScreen.hideAsync();
    }
  }, [loaded, authReady, minWaitDone]);

  useEffect(() => {
    void hideSplash();
  }, [hideSplash]);

  if (!loaded || !authReady || !minWaitDone) {
    return <BrandedSplash />;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? hemoraDarkTheme : hemoraLightTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="auth-callback" options={{ headerShown: false }} />
          <Stack.Screen name="add-medication" options={{ headerShown: false }} />
          <Stack.Screen name="add-record" options={{ headerShown: false }} />
          <Stack.Screen name="medication-detail" options={{ headerShown: false }} />
          <Stack.Screen name="emergency" options={{ headerShown: false }} />
          <Stack.Screen name="crisis-detail" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ title: "Settings" }} />
          <Stack.Screen name="modal" options={{ presentation: "modal", title: "About Hemora" }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
