import { useState } from "react";
import { router, Stack } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bell, Heart, Pill, Droplet, Info, Settings } from "lucide-react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { Brand, Theme } from "@/constants/theme";
import { Fonts } from "@/constants/typography";

type NotifType = "all" | "crisis" | "meds" | "hydration" | "system";

interface Notification {
  id: string;
  type: "crisis" | "meds" | "hydration" | "system";
  title: string;
  body: string;
  time: string;
  ts: number;
  read: boolean;
}

const MOCK: Notification[] = [
  {
    id: "n1",
    type: "meds",
    title: "Medication Due",
    body: "Time to take Hydroxyurea 500 mg. Tap to confirm.",
    time: "Just now",
    ts: Date.now() - 2 * 60 * 1000,
    read: false,
  },
  {
    id: "n2",
    type: "hydration",
    title: "Hydration Reminder",
    body: "You're at 4 / 8 glasses today. Keep it up!",
    time: "2 h ago",
    ts: Date.now() - 2 * 60 * 60 * 1000,
    read: false,
  },
  {
    id: "n3",
    type: "crisis",
    title: "Crisis Follow-up",
    body: "How are you feeling after yesterday's pain episode?",
    time: "Yesterday",
    ts: Date.now() - 24 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: "n4",
    type: "meds",
    title: "Dose Confirmed",
    body: "Folic Acid logged at 8:00 AM. Great job staying on track.",
    time: "Yesterday",
    ts: Date.now() - 26 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: "n5",
    type: "hydration",
    title: "Daily Goal Achieved!",
    body: "You reached your hydration target of 8 glasses. 🎉",
    time: "2 days ago",
    ts: Date.now() - 48 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: "n6",
    type: "system",
    title: "Hemora Update",
    body: "New: Transfusion & Iron Log is now live. Track ferritin directly.",
    time: "3 days ago",
    ts: Date.now() - 72 * 60 * 60 * 1000,
    read: true,
  },
];

const TABS: { key: NotifType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "crisis", label: "Crisis" },
  { key: "meds", label: "Meds" },
  { key: "hydration", label: "Hydration" },
  { key: "system", label: "System" },
];

function NotifIcon({ type }: { type: Notification["type"] }) {
  const color = type === "crisis" ? Brand.red : type === "meds" ? Brand.teal : type === "hydration" ? Brand.teal : Brand.gold;
  const size = 17;
  if (type === "crisis") return <Heart size={size} color={color} />;
  if (type === "meds") return <Pill size={size} color={color} />;
  if (type === "hydration") return <Droplet size={size} color={color} />;
  return <Info size={size} color={color} />;
}

function iconBg(type: Notification["type"]) {
  if (type === "crisis") return `${Brand.red}18`;
  if (type === "meds") return `${Brand.teal}20`;
  if (type === "hydration") return `${Brand.teal}15`;
  return `${Brand.gold}25`;
}

function groupByDay(notifs: Notification[]): Array<{ label: string; items: Notification[] }> {
  const groups: Record<string, Notification[]> = {};
  const now = Date.now();
  notifs.forEach((n) => {
    const delta = now - n.ts;
    let label: string;
    if (delta < 24 * 60 * 60 * 1000) label = "Today";
    else if (delta < 48 * 60 * 60 * 1000) label = "Yesterday";
    else {
      const d = new Date(n.ts);
      label = d.toLocaleDateString([], { month: "long", day: "numeric" });
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });
  return Object.entries(groups).map(([label, items]) => ({ label, items }));
}

export default function NotificationsScreen() {
  const scheme = useColorScheme() ?? "light";
  const t = Theme[scheme];
  const [activeTab, setActiveTab] = useState<NotifType>("all");
  const [notifications, setNotifications] = useState<Notification[]>(MOCK);

  const filtered = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const groups = groupByDay(filtered);

  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifications",
          headerStyle: { backgroundColor: Brand.cream },
          headerTitleStyle: { fontFamily: Fonts.serif, color: t.text, fontSize: 18 },
          headerTintColor: t.teal,
          headerShadowVisible: false,
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/settings" as any)}
              style={{ padding: 8, marginRight: 4 }}
              accessibilityLabel="Notification settings"
            >
              <Settings size={18} color={t.teal} />
            </Pressable>
          ),
        }}
      />
      <SafeAreaView style={[s.root, { backgroundColor: Brand.cream }]} edges={["bottom"]}>
        {/* Tab bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={s.tabBar}
          contentContainerStyle={s.tabBarContent}
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                s.tab,
                activeTab === tab.key ? { backgroundColor: Brand.teal } : { backgroundColor: t.surface, borderWidth: 1, borderColor: `${t.text}15` },
              ]}
            >
              <Text
                style={[
                  s.tabLabel,
                  { fontFamily: Fonts.sansBold, color: activeTab === tab.key ? "#fff" : t.textMuted },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Unread + mark all */}
        {unreadCount > 0 && (
          <View style={s.unreadRow}>
            <Text style={[s.unreadText, { fontFamily: Fonts.sans, color: t.textMuted }]}>
              {unreadCount} unread
            </Text>
            <Pressable onPress={markAllRead}>
              <Text style={[s.markAll, { fontFamily: Fonts.sansBold, color: Brand.red }]}>
                Mark all read
              </Text>
            </Pressable>
          </View>
        )}

        <ScrollView style={{ flex: 1 }} contentContainerStyle={s.list}>
          {groups.length === 0 ? (
            <View style={s.emptyState}>
              <View style={[s.emptyIcon, { backgroundColor: t.surface }]}>
                <Bell size={28} color={`${t.text}40`} />
              </View>
              <Text style={[s.emptyTitle, { fontFamily: Fonts.serif, color: t.textMuted }]}>
                No notifications
              </Text>
              <Text style={[s.emptyBody, { fontFamily: Fonts.sans, color: `${t.textMuted}80` }]}>
                {activeTab === "all" ? "You're all caught up." : `No ${activeTab} alerts yet.`}
              </Text>
            </View>
          ) : (
            groups.map(({ label, items }) => (
              <View key={label}>
                <Text style={[s.dayLabel, { fontFamily: Fonts.sansBold, color: `${t.text}60` }]}>
                  {label}
                </Text>
                {items.map((notif) => (
                  <Pressable
                    key={notif.id}
                    onPress={() => markRead(notif.id)}
                    style={[
                      s.card,
                      { backgroundColor: t.surface, borderColor: notif.read ? `${t.text}10` : `${Brand.red}25` },
                    ]}
                  >
                    <View style={[s.iconCircle, { backgroundColor: iconBg(notif.type) }]}>
                      <NotifIcon type={notif.type} />
                    </View>
                    <View style={s.cardBody}>
                      <View style={s.cardTopRow}>
                        <Text
                          style={[
                            s.cardTitle,
                            { fontFamily: notif.read ? Fonts.sansBold : Fonts.sansBold, color: t.text },
                          ]}
                          numberOfLines={1}
                        >
                          {notif.title}
                        </Text>
                        <Text style={[s.cardTime, { fontFamily: Fonts.sans, color: `${t.text}50` }]}>
                          {notif.time}
                        </Text>
                      </View>
                      <Text style={[s.cardBody2, { fontFamily: Fonts.sans, color: `${t.text}70` }]} numberOfLines={2}>
                        {notif.body}
                      </Text>
                    </View>
                    {!notif.read && (
                      <View style={[s.unreadDot, { backgroundColor: Brand.red }]} />
                    )}
                  </Pressable>
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },
  tabBar: { maxHeight: 56, flexGrow: 0 },
  tabBarContent: { flexDirection: "row", gap: 8, paddingHorizontal: 16, paddingVertical: 10 },
  tab: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20 },
  tabLabel: { fontSize: 11 },
  unreadRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 6 },
  unreadText: { fontSize: 12 },
  markAll: { fontSize: 12 },
  list: { paddingHorizontal: 16, paddingBottom: 32, gap: 4 },
  dayLabel: { fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", marginTop: 16, marginBottom: 8, paddingHorizontal: 4 },
  card: { flexDirection: "row", alignItems: "flex-start", borderRadius: 20, borderWidth: 1, padding: 14, marginBottom: 4, gap: 12 },
  iconCircle: { width: 38, height: 38, borderRadius: 14, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardBody: { flex: 1 },
  cardTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 },
  cardTitle: { fontSize: 13, flex: 1, marginRight: 8 },
  cardTime: { fontSize: 10, flexShrink: 0 },
  cardBody2: { fontSize: 12, lineHeight: 17 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, marginTop: 4, flexShrink: 0 },
  emptyState: { alignItems: "center", justifyContent: "center", paddingTop: 80 },
  emptyIcon: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", marginBottom: 16 },
  emptyTitle: { fontSize: 17, marginBottom: 6 },
  emptyBody: { fontSize: 13, textAlign: "center" },
});
