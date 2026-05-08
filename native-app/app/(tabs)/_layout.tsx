import { Tabs } from "expo-router";
import { LayoutDashboard, Activity, Pill, FolderHeart, Search, Users, User } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 90,
        paddingBottom: 30,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "#d8cdc0",
        backgroundColor: "#fbf5e7",
        elevation: 0,
        shadowOpacity: 0,
      },
      tabBarActiveTintColor: "#a8324a",
      tabBarInactiveTintColor: "#425f61",
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: 1,
      }
    }}>
      <Tabs.Screen 
        name="dashboard" 
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="crisis" 
        options={{
          title: "Crisis",
          tabBarIcon: ({ color }) => <Activity size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="meds" 
        options={{
          title: "Meds",
          tabBarIcon: ({ color }) => <Pill size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="records" 
        options={{
          title: "Records",
          tabBarIcon: ({ color }) => <FolderHeart size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="directory" 
        options={{
          title: "Directory",
          tabBarIcon: ({ color }) => <Search size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="family" 
        options={{
          href: null,
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          href: null,
        }} 
      />
    </Tabs>
  );
}
