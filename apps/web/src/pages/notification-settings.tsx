import { useEffect, useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Bell,
  Sparkles,
  HeartPulse,
  ClipboardCheck,
  ShieldAlert,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  ArrowLeft
} from "lucide-react";
import {
  isPushSupported,
  subscribeBrowser,
  unsubscribeBrowser,
  getCurrentEndpoint,
  isIosSafari,
  isStandalonePwa,
} from "@/lib/push-client";
import { PwaInstallButton } from "@/components/PwaInstallButton";

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

export default function NotificationSettings() {
  const { toast } = useToast();

  const fetchPrefs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { data, error } = await supabase
      .from("profiles")
      .select("notify_med_reminders, notify_daily_summary, notify_crisis_followups, notify_product_updates")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) throw error;
    return data ?? {};
  };

  const savePrefs = async (payload: { data: Partial<Prefs> }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { error } = await supabase
      .from("profiles")
      .update(payload.data)
      .eq("user_id", user.id);
    if (error) throw error;
    return { ok: true };
  };

  const subscribe = async (payload: { data: any }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { error } = await supabase.from("push_subscriptions").upsert({
      user_id: user.id,
      endpoint: payload.data.endpoint,
      p256dh: payload.data.p256dh,
      auth: payload.data.auth,
      user_agent: payload.data.userAgent ?? navigator.userAgent,
      last_seen_at: new Date().toISOString(),
    }, { onConflict: "endpoint" });
    if (error) throw error;

    if (payload.data.timezone) {
      await supabase
        .from("profiles")
        .update({ timezone: payload.data.timezone })
        .eq("user_id", user.id);
    }
    return { ok: true };
  };

  const unsubscribe = async (payload: { data: { endpoint: string } }) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No authenticated user");
    const { error } = await supabase
      .from("push_subscriptions")
      .delete()
      .eq("user_id", user.id)
      .eq("endpoint", payload.data.endpoint);
    if (error) throw error;
    return { ok: true };
  };

  const sendTest = async () => {
    if (Notification.permission === "granted") {
      new Notification("Hemora test notification", {
        body: "If you can read this, push notifications are working 🎉",
        icon: "/favicon.ico",
      });
      return { sent: 1, removed: 0 };
    } else {
      return { sent: 0, removed: 0 };
    }
  };

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
  }, []);

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
      <div className="p-6 pb-24 bg-background min-h-screen text-foreground space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center gap-3 mt-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="w-10 h-10 rounded-full border-border bg-card shadow-sm flex items-center justify-center hover:bg-muted"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="text-foreground" />
          </Button>
          <div>
            <h1 className="text-2xl font-serif text-foreground font-bold">Notification Settings</h1>
            <p className="text-xs text-muted-foreground font-sans">Customize reminders and clinical check-ins.</p>
          </div>
        </div>

        {/* Premium Header Banner Card */}
        <div className="bg-gradient-to-br from-secondary to-primary text-white p-6 rounded-[28px] relative overflow-hidden shadow-md space-y-4">
          <div className="absolute top-0 right-0 w-36 h-36 bg-accent/20 rounded-full -mr-12 -mt-12 blur-2xl animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Bell size={20} className="text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">Push Reminders</h3>
              <p className="text-[11px] text-white/70">Timely health alerts support optimal care consistency.</p>
            </div>
          </div>
        </div>

        {/* PWA Install Button */}
        <PwaInstallButton className="w-full h-14 rounded-2xl text-sm font-bold border border-border shadow-sm bg-card hover:bg-muted" size="lg" />

        {/* iOS Push Hint Card */}
        {showIosHint && (
          <div className="bg-card border border-border rounded-[24px] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Smartphone size={18} />
              <strong className="text-sm font-serif font-bold">iPhone Setup Required</strong>
            </div>
            <p className="text-xs text-foreground/80 leading-normal">
              iOS requires web apps to be installed to the Home Screen to receive push notifications.
            </p>
            <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal pl-4">
              <li>Open Safari and tap the <strong className="font-bold">Share</strong> button.</li>
              <li>Select <strong className="font-bold">Add to Home Screen</strong>.</li>
              <li>Launch Hemora from your Home Screen to enable reminders.</li>
            </ol>
          </div>
        )}

        {/* Permissions / Blocked Card */}
        {permission === "denied" && (
          <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-4 flex gap-3 text-xs text-destructive leading-normal">
            <ShieldAlert size={18} className="shrink-0 mt-0.5" />
            <div>
              <strong className="block mb-0.5 font-bold">Notifications Blocked</strong>
              Please enable notification permissions in your browser/device settings to receive medication and hydration prompts.
            </div>
          </div>
        )}

        {/* Device Status Bento */}
        <div className="bg-card border border-border rounded-[28px] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Device Sync Status</span>
            
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  subscribed ? "bg-accent" : "bg-primary"
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  subscribed ? "bg-accent" : "bg-primary"
                }`} />
              </span>
              <span className="text-xs font-bold text-foreground/80">
                {subscribed ? "Active & Synced" : "Pending Setup"}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-normal">
            {subscribed
              ? "This device is registered to receive secure push notifications from your Care Circle."
              : "Set up push prompts on this device to get alerts for scheduled care events."}
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <Button 
              onClick={handleTest} 
              disabled={busy || permission === "unsupported"}
              className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-sm transition-all"
            >
              Send Test Notification
            </Button>
            
            {subscribed && (
              <Button 
                variant="ghost" 
                onClick={handleDisable} 
                disabled={busy}
                className="w-full h-12 rounded-xl hover:bg-destructive/5 hover:text-destructive text-xs font-bold border border-dashed border-border transition-all"
              >
                Disable on this device
              </Button>
            )}
          </div>
        </div>

        {/* Preference Categories */}
        <div className="space-y-6">
          
          {/* CATEGORY 1: Care & Monitoring */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-2">Care & Monitoring</h3>
            
            <div className="space-y-3">
              {/* Med Reminders Card */}
              <div className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shrink-0">
                    <HeartPulse size={18} />
                  </div>
                  <div>
                    <Label htmlFor="notify_med_reminders" className="text-sm font-bold text-foreground cursor-pointer">
                      Medication Reminders
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">
                      Get real-time browser alerts when a dose is due.
                    </p>
                  </div>
                </div>
                <Switch
                  id="notify_med_reminders"
                  checked={prefs.notify_med_reminders}
                  disabled={!loaded || busy}
                  onCheckedChange={(v) => togglePref("notify_med_reminders", v)}
                  className="mt-1"
                />
              </div>

              {/* Crisis Followups Card */}
              <div className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <Label htmlFor="notify_crisis_followups" className="text-sm font-bold text-foreground cursor-pointer">
                      Crisis Follow-ups
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">
                      Receive supportive check-ins and resolution prompts after crisis logging.
                    </p>
                  </div>
                </div>
                <Switch
                  id="notify_crisis_followups"
                  checked={prefs.notify_crisis_followups}
                  disabled={!loaded || busy}
                  onCheckedChange={(v) => togglePref("notify_crisis_followups", v)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY 2: Summaries & Updates */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-2">Logs & Insights</h3>
            
            <div className="space-y-3">
              {/* Daily Summary Card */}
              <div className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-foreground shrink-0">
                    <ClipboardCheck size={18} />
                  </div>
                  <div>
                    <Label htmlFor="notify_daily_summary" className="text-sm font-bold text-foreground cursor-pointer">
                      Daily Adherence Summary
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">
                      A visual daily digest of your logged medications and goals sent each evening.
                    </p>
                  </div>
                </div>
                <Switch
                  id="notify_daily_summary"
                  checked={prefs.notify_daily_summary}
                  disabled={!loaded || busy}
                  onCheckedChange={(v) => togglePref("notify_daily_summary", v)}
                  className="mt-1"
                />
              </div>

              {/* Product Updates Card */}
              <div className="bg-card rounded-2xl p-4 border border-border shadow-sm flex items-start justify-between gap-4 hover:border-primary/20 transition-all">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-foreground shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <Label htmlFor="notify_product_updates" className="text-sm font-bold text-foreground cursor-pointer">
                      System Updates
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1 leading-normal">
                      Tips, updates, and reminders to optimize your care flow.
                    </p>
                  </div>
                </div>
                <Switch
                  id="notify_product_updates"
                  checked={prefs.notify_product_updates}
                  disabled={!loaded || busy}
                  onCheckedChange={(v) => togglePref("notify_product_updates", v)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Clinical Note card */}
        <div className="bg-card p-5 rounded-[24px] border border-border flex gap-4 items-start shadow-inner">
          <HelpCircle size={20} className="text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="font-serif font-bold text-xs text-foreground">Clinical Note</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed mt-1">
              Consistency is key. Active browser notifications are critical to support your adherence and prevent sudden vaso-occlusion events.
            </p>
          </div>
        </div>

      </div>
    </MobileAppShell>
  );
}