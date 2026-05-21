import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";
import * as Notifications from "expo-notifications";


import { BrandedSplash } from "@/components/BrandedSplash";
import { useColorScheme } from "@/components/useColorScheme";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { fontAssets } from "@/constants/typography";
import { hemoraDarkTheme, hemoraLightTheme } from "@/constants/navigation-theme";
import { PostHogProvider } from "posthog-react-native";

const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY || "";
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";

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

  useEffect(() => {
    // Listen for notification responses (tap actions)
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      if (data && data.url) {
        router.push(data.url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <PostHogProvider apiKey={posthogKey} options={{ host: posthogHost }}>
        <ThemeProvider value={colorScheme === "dark" ? hemoraDarkTheme : hemoraLightTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="auth-callback" options={{ headerShown: false }} />
            <Stack.Screen name="add-medication" options={{ headerShown: false }} />
            <Stack.Screen name="add-record" options={{ headerShown: false }} />
            <Stack.Screen name="medication-detail" options={{ headerShown: false }} />
            <Stack.Screen name="emergency" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="crisis-detail" options={{ headerShown: false }} />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal", title: "About Hemora" }} />
          </Stack>
        </ThemeProvider>
      </PostHogProvider>
    </SafeAreaProvider>
  );
}
