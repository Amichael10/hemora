import { Redirect, Tabs } from "expo-router";

import {
  HeartPulse2Bold,
  HeartPulse2Linear,
  HomeSmileBold,
  HomeSmileLinear,
  NotebookBold,
  NotebookLinear,
  Pills2Bold,
  Pills2Linear,
  UsersGroupRoundedBold,
  UsersGroupRoundedLinear,
} from "@/components/icons/solar";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { BrandedSplash } from "@/components/BrandedSplash";
import { Theme } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";

export default function TabLayout() {
  const { ready, user } = useAuth();
  const colorScheme = useColorScheme() ?? "light";
  const t = Theme[colorScheme];
  if (!ready) return <BrandedSplash />;
  if (!user) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { backgroundColor: t.surface },
        headerTintColor: t.teal,
        headerTitleStyle: { color: t.text, fontWeight: "600" },
        headerShadowVisible: false,
        tabBarActiveTintColor: route.name === "crisis" ? t.crisisActive : t.tabActive,
        tabBarInactiveTintColor: t.tabInactive,
        tabBarStyle: {
          backgroundColor: t.tabBar,
          borderTopColor: t.tabBorder,
          paddingTop: 4,
        },
        tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HomeSmileBold color={color} size={22} />
            ) : (
              <HomeSmileLinear color={color} size={22} />
            ),
        }}
      />
      <Tabs.Screen
        name="crisis"
        options={{
          title: "Crisis",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <HeartPulse2Bold color={color} size={22} />
            ) : (
              <HeartPulse2Linear color={color} size={22} />
            ),
        }}
      />
      <Tabs.Screen
        name="meds"
        options={{
          title: "Meds",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Pills2Bold color={color} size={22} />
            ) : (
              <Pills2Linear color={color} size={22} />
            ),
        }}
      />
      <Tabs.Screen
        name="records"
        options={{
          title: "Records",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <NotebookBold color={color} size={22} />
            ) : (
              <NotebookLinear color={color} size={22} />
            ),
        }}
      />
      <Tabs.Screen
        name="directory"
        options={{
          title: "Directory",
          headerShown: false,
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <UsersGroupRoundedBold color={color} size={22} />
            ) : (
              <UsersGroupRoundedLinear color={color} size={22} />
            ),
        }}
      />
    </Tabs>
  );
}
