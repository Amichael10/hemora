import { useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/(tabs)/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [user, loading]);

  return (
    <View className="flex-1 bg-background items-center justify-center">
      <StatusBar style="dark" />
      {/* 
        This acts as your dynamic splash screen. 
        Once the app knows if you are logged in or not, it redirects instantly.
      */}
      <View className="w-24 h-24 bg-card rounded-[32px] items-center justify-center shadow-lg border border-muted mb-8">
        <ActivityIndicator color="#a8324a" size="large" />
      </View>
    </View>
  );
}
