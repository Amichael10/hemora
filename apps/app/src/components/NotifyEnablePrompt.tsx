import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { isPushSupported, subscribeBrowser, isIosSafari, isStandalonePwa } from "@/lib/push-client";
import { subscribeToPush } from "@/lib/push.functions";

const SHOWN_KEY = "hemora.notify-prompt.shown";

export function maybeAskToEnableNotifications(reason: "first-med" | "first-crisis") {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(SHOWN_KEY)) return;
    if (typeof Notification !== "undefined" && Notification.permission !== "default") {
      localStorage.setItem(SHOWN_KEY, "1");
      return;
    }
    // Defer until after the success toast settles
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("hemora:ask-notifications", { detail: { reason } }));
    }, 600);
  } catch {}
}

export function NotifyEnablePrompt() {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<"first-med" | "first-crisis">("first-med");
  const [busy, setBusy] = useState(false);
  const subscribe = useServerFn(subscribeToPush);
  const { toast } = useToast();

  useEffect(() => {
    function onAsk(e: Event) {
      const detail = (e as CustomEvent).detail as { reason?: "first-med" | "first-crisis" };
      if (detail?.reason) setReason(detail.reason);
      setOpen(true);
    }
    window.addEventListener("hemora:ask-notifications", onAsk);
    return () => window.removeEventListener("hemora:ask-notifications", onAsk);
  }, []);

  function dismiss() {
    try { localStorage.setItem(SHOWN_KEY, "1"); } catch {}
    setOpen(false);
  }

  async function handleEnable() {
    if (isIosSafari() && !isStandalonePwa()) {
      toast({
        title: "Add Hemora to your Home Screen first",
        description: "iOS only sends push to installed web apps. Tap Share → Add to Home Screen, then come back.",
      });
      dismiss();
      return;
    }
    if (!isPushSupported()) {
      toast({ title: "Notifications aren't supported on this device", variant: "destructive" });
      dismiss();
      return;
    }
    setBusy(true);
    try {
      const sub = await subscribeBrowser();
      if (!sub) {
        toast({ title: "Notifications not enabled", description: "You can turn them on later in Settings." });
        dismiss();
        return;
      }
      await subscribe({ data: sub });
      toast({ title: "Notifications enabled" });
      dismiss();
    } catch (e: any) {
      toast({ title: "Couldn't enable notifications", description: e?.message, variant: "destructive" });
      dismiss();
    } finally {
      setBusy(false);
    }
  }

  const title = reason === "first-crisis" ? "Get crisis follow-ups?" : "Never miss a dose?";
  const body =
    reason === "first-crisis"
      ? "We'll check in 24 hours after a crisis and send heads-ups when patterns suggest a tough day ahead."
      : "Turn on push notifications and Hemora will remind you when it's time to take this medication.";

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : dismiss())}>
      <DialogContent className="max-w-sm rounded-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{body}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button onClick={handleEnable} disabled={busy} size="lg" className="w-full">
            {busy ? "Enabling…" : "Turn on notifications"}
          </Button>
          <Button onClick={dismiss} variant="ghost" size="lg" className="w-full">
            Not now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}