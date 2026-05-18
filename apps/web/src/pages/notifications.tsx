import { useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import {
  Bell as BellOutline,
  HeartPulse,
  Pill as Pills,
  Droplet as Cup,
  CheckCircle as Check,
  Settings as SettingsIcon,
  BellOff,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NotifCategory = "all" | "crisis" | "meds" | "hydration" | "system";

interface Notification {
  id: string;
  type: "crisis" | "meds" | "hydration" | "system";
  title: string;
  body: string;
  time: string; // human-readable
  ts: number;   // unix ms for sorting
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
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
    body: "New: Transfusion & Iron Log is now live. Track ferritin directly in the app.",
    time: "3 days ago",
    ts: Date.now() - 72 * 60 * 60 * 1000,
    read: true,
  },
  {
    id: "n7",
    type: "crisis",
    title: "Crisis Episode Logged",
    body: "Your May 14 vaso-occlusive episode was saved. Sharing with your care team.",
    time: "4 days ago",
    ts: Date.now() - 4 * 24 * 60 * 60 * 1000,
    read: true,
  },
];

const TABS: { key: NotifCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "crisis", label: "Crisis" },
  { key: "meds", label: "Meds" },
  { key: "hydration", label: "Hydration" },
  { key: "system", label: "System" },
];

function typeIcon(type: Notification["type"]) {
  switch (type) {
    case "crisis": return <HeartPulse size={18} />;
    case "meds": return <Pills size={18} />;
    case "hydration": return <Cup size={18} />;
    case "system": return <Check size={18} />;
  }
}

function typeBg(type: Notification["type"]) {
  switch (type) {
    case "crisis": return "bg-primary/10 text-primary";
    case "meds": return "bg-secondary/15 text-secondary";
    case "hydration": return "bg-accent/15 text-accent";
    case "system": return "bg-accent/15 text-accent";
  }
}

function groupByDay(notifs: Notification[]): Array<{ label: string; items: Notification[] }> {
  const groups: Record<string, Notification[]> = {};
  const now = Date.now();
  notifs.forEach((n) => {
    const delta = now - n.ts;
    let label: string;
    if (delta < 24 * 60 * 60 * 1000) {
      label = "Today";
    } else if (delta < 48 * 60 * 60 * 1000) {
      label = "Yesterday";
    } else {
      const d = new Date(n.ts);
      label = d.toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" });
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });
  return Object.entries(groups).map(([label, items]) => ({ label, items }));
}

export default function NotificationsInbox() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<NotifCategory>("all");
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const filtered = activeTab === "all" ? notifications : notifications.filter((n) => n.type === activeTab);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const groups = groupByDay(filtered);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <MobileAppShell>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border px-5 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLocation("/dashboard")}
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
              >
                <ArrowLeft size={17} className="text-foreground" />
              </button>
              <div>
                <h1 className="text-2xl font-serif text-foreground leading-tight">
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <p className="text-xs text-muted-foreground font-sans">
                    {unreadCount} unread
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-bold text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setLocation("/settings/notifications")}
                className="w-9 h-9 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors"
                title="Notification settings"
              >
                <SettingsIcon size={16} className="text-foreground" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 mt-3 scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex-shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition-all",
                  activeTab === tab.key
                    ? "bg-primary text-white shadow-sm"
                    : "bg-card text-foreground/75 border border-border hover:bg-muted"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notification List */}
        <div className="px-5 py-4 pb-24 space-y-6">
          {groups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4 shadow-sm">
                <BellOff size={28} className="text-muted-foreground/40" />
              </div>
              <p className="text-sm font-serif text-muted-foreground">No notifications here</p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                {activeTab === "all" ? "You're all caught up." : `No ${activeTab} alerts yet.`}
              </p>
            </div>
          ) : (
            groups.map(({ label, items }) => (
              <div key={label}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground pl-1 mb-3">
                  {label}
                </div>
                <div className="space-y-2">
                  {items.map((notif) => (
                    <button
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className={cn(
                        "w-full text-left rounded-[20px] p-4 border transition-all",
                        notif.read
                          ? "bg-card border-border hover:border-primary/20"
                          : "bg-card border-primary/20 shadow-sm"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5",
                          typeBg(notif.type)
                        )}>
                          {typeIcon(notif.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className={cn(
                              "text-sm font-bold text-foreground leading-snug",
                              !notif.read && "font-extrabold"
                            )}>
                              {notif.title}
                            </span>
                            <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                              {notif.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                            {notif.body}
                          </p>
                        </div>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Settings Link Banner */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-[390px]">
          <button
            onClick={() => setLocation("/settings/notifications")}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white text-xs font-bold py-3.5 rounded-2xl shadow-lg hover:bg-primary/90 transition-colors"
          >
            <SettingsIcon size={16} />
            Manage Notification Settings
          </button>
        </div>
      </div>
    </MobileAppShell>
  );
}