import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  getNotificationPrefs,
  updateNotificationPrefs,
  subscribeToPush,
  unsubscribeFromPush,
  sendTestNotification,
} from "@/lib/push.functions";
import {
  isPushSupported,
  subscribeBrowser,
  unsubscribeBrowser,
  getCurrentEndpoint,
  isIosSafari,
  isStandalonePwa,
} from "@/lib/push-client";

type Prefs = {
  notify_med_reminders: boolean;
  notify_daily_summary: boolean;
  notify_crisis_followups: boolean;
  notify_product_updates: boolean;
};

const DEFAULT_PREFS: Prefs = {
  notify_med_reminders: true,
  notify_daily_summary: false,
  notify_crisis_followups: true,
  notify_product_updates: false,
};

const ITEMS: { key: keyof Prefs; label: string; desc: string }[] = [
  { key: "notify_med_reminders", label: "Medication reminders", desc: "Get notified when it's time to take a dose." },
  { key: "notify_daily_summary", label: "Daily adherence summary", desc: "A short recap each evening." },
  { key: "notify_crisis_followups", label: "Crisis follow-ups", desc: "Check-ins after a logged crisis." },
  { key: "notify_product_updates", label: "Product updates", desc: "New features and announcements." },
];

export default function Notifications() {
  const { toast } = useToast();
  const fetchPrefs = useServerFn(getNotificationPrefs);
  const savePrefs = useServerFn(updateNotificationPrefs);
  const subscribe = useServerFn(subscribeToPush);
  const unsubscribe = useServerFn(unsubscribeFromPush);
  const sendTest = useServerFn(sendTestNotification);

  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [loaded, setLoaded] = useState(false);
  const [busy, setBusy] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | "unsupported">("default");
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const p = (await fetchPrefs()) as Prefs;
        setPrefs({ ...DEFAULT_PREFS, ...p });
      } catch (e) {
        console.error(e);
      } finally {
        setLoaded(true);
      }
      if (!isPushSupported()) {
        setPermission("unsupported");
      } else {
        setPermission(Notification.permission);
        const ep = await getCurrentEndpoint();
        setSubscribed(!!ep);
      }
      if (isIosSafari() && !isStandalonePwa()) setShowIosHint(true);
    })();
  }, [fetchPrefs]);

  async function ensureSubscription(): Promise<boolean> {
    if (subscribed) return true;
    if (!isPushSupported()) {
      toast({ title: "Notifications aren't supported on this device", variant: "destructive" });
      return false;
    }
    if (isIosSafari() && !isStandalonePwa()) {
      setShowIosHint(true);
      toast({
        title: "Add Hemora to your Home Screen first",
        description: "iOS only allows notifications from installed web apps. Tap Share → Add to Home Screen.",
      });
      return false;
    }
    const sub = await subscribeBrowser();
    if (!sub) {
      toast({ title: "Notification permission denied", variant: "destructive" });
      setPermission(Notification.permission);
      return false;
    }
    await subscribe({ data: sub });
    setSubscribed(true);
    setPermission(Notification.permission);
    return true;
  }

  async function togglePref(key: keyof Prefs, value: boolean) {
    const prev = prefs;
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    setBusy(true);
    try {
      if (value) {
        const ok = await ensureSubscription();
        if (!ok) {
          setPrefs(prev);
          return;
        }
      }
      await savePrefs({ data: { [key]: value } });
    } catch (e) {
      console.error(e);
      setPrefs(prev);
      toast({ title: "Couldn't save preference", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  async function handleTest() {
    setBusy(true);
    try {
      const ok = await ensureSubscription();
      if (!ok) return;
      const res = (await sendTest()) as { sent: number; removed: number };
      if (res.sent > 0) {
        toast({ title: "Test notification sent", description: "It should arrive in a few seconds." });
      } else {
        toast({ title: "No active subscription found", variant: "destructive" });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Couldn't send test", variant: "destructive" });
    } finally {
      setBusy(false);
    }
  }

  async function handleDisable() {
    setBusy(true);
    try {
      const endpoint = await unsubscribeBrowser();
      if (endpoint) await unsubscribe({ data: { endpoint } });
      setSubscribed(false);
      toast({ title: "Notifications disabled on this device" });
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }

  return (
    <MobileAppShell>
      <SubPageHeader title="Notifications" back="/settings" />
      <div className="px-5 pb-10 space-y-4">
        {showIosHint && (
          <div className="bg-accent/15 border border-accent/30 rounded-2xl px-4 py-3 text-xs text-foreground">
            <strong className="block mb-1">iPhone users:</strong>
            To receive push notifications, add Hemora to your Home Screen first. In Safari, tap the Share button →
            <em> Add to Home Screen</em>, then open Hemora from the Home Screen.
          </div>
        )}

        {permission === "denied" && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-2xl px-4 py-3 text-xs text-foreground">
            Notifications are blocked in your browser settings. Enable them for this site to receive reminders.
          </div>
        )}

        <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
          {ITEMS.map((it, i) => (
            <div
              key={it.key}
              className="flex items-start justify-between gap-4 px-4 py-4 border-b border-border/60 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <Label htmlFor={it.key} className="text-sm font-medium">{it.label}</Label>
                <p className="text-xs text-muted-foreground mt-0.5">{it.desc}</p>
              </div>
              <Switch
                id={it.key}
                checked={prefs[it.key]}
                disabled={!loaded || busy}
                onCheckedChange={(v) => togglePref(it.key, v)}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={handleTest} disabled={busy || permission === "unsupported"}>
            Send test notification
          </Button>
          {subscribed && (
            <Button size="sm" variant="ghost" onClick={handleDisable} disabled={busy}>
              Disable on this device
            </Button>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground/70 px-2">
          {subscribed
            ? "Push is active on this device."
            : "Toggle a notification on (or send a test) to enable push on this device."}
        </p>
      </div>
    </MobileAppShell>
  );
}