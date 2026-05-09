import { useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { AMBULANCE_KEY, useLocalStorage } from "@/lib/localPrefs";
import { ShieldCheckLinear as Shield, HeartPulseBold as AmbulanceIcon } from "solar-icon-set";

export default function Ambulance() {
  const [stored, setStored] = useLocalStorage<string>(AMBULANCE_KEY, "");
  const [value, setValue] = useState(stored || "");
  const { toast } = useToast();

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    setStored(trimmed);
    toast({ title: trimmed ? "Ambulance number saved" : "Ambulance number cleared" });
  };

  return (
    <MobileAppShell>
      <SubPageHeader title="Ambulance number" back="/settings" />
      <div className="px-5 pb-10">
        <div className="flex flex-col items-center text-center pt-2 pb-6">
          <div className="w-20 h-20 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
            <AmbulanceIcon size={36} />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Set your local ambulance phone number so we can help you quickly in an emergency.
          </p>
        </div>

        <form onSubmit={save} className="space-y-5">
          <div className="space-y-1.5">
            <Label>Ambulance phone number</Label>
            <Input
              type="tel"
              inputMode="tel"
              placeholder="e.g. 112 or +233 24 123 4567"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <div className="flex items-start gap-2 bg-muted/60 rounded-xl p-3.5">
            <Shield size={16} className="text-muted-foreground mt-0.5 shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This number is saved locally on your device and will only be used when you need help.
            </p>
          </div>

          <Button type="submit" size="xl" className="w-full">Save number</Button>
        </form>
      </div>
    </MobileAppShell>
  );
}