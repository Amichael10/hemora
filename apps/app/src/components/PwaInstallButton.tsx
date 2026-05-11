import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { isIosSafari, isStandalonePwa } from "@/lib/push-client";
import { Download } from "lucide-react";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

interface Props {
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
  label?: string;
}

export function PwaInstallButton({ variant = "default", size = "default", className, label = "Install Hemora" }: Props) {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const ios = typeof window !== "undefined" && isIosSafari();
  const standalone = typeof window !== "undefined" && isStandalonePwa();

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onPrompt(e: Event) {
      e.preventDefault();
      setDeferred(e as BIPEvent);
    }
    function onInstalled() {
      setInstalled(true);
      setDeferred(null);
    }
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (standalone || installed) return null;
  // Show on iOS even without event (instructions modal). On other platforms, only show if event captured.
  if (!deferred && !ios) return null;

  async function handleClick() {
    if (deferred) {
      await deferred.prompt();
      try { await deferred.userChoice; } catch {}
      setDeferred(null);
      return;
    }
    if (ios) setIosOpen(true);
  }

  return (
    <>
      <Button onClick={handleClick} variant={variant} size={size} className={className}>
        <Download className="size-4 mr-2" />
        {label}
      </Button>
      <Dialog open={iosOpen} onOpenChange={setIosOpen}>
        <DialogContent className="max-w-sm rounded-3xl">
          <DialogHeader>
            <DialogTitle>Add Hemora to Home Screen</DialogTitle>
            <DialogDescription>
              In Safari, tap the <strong>Share</strong> button at the bottom of the screen, then choose
              <strong> Add to Home Screen</strong>. Open Hemora from the new icon to enable notifications.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
