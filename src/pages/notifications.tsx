import { useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function Item({ id, label, desc, defaultOn = true }: { id: string; label: string; desc: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-4 border-b border-border/60 last:border-0">
      <div className="flex-1 min-w-0">
        <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
      <Switch id={id} checked={on} onCheckedChange={setOn} />
    </div>
  );
}

export default function Notifications() {
  return (
    <MobileAppShell>
      <SubPageHeader title="Notifications" back="/settings" />
      <div className="px-5 pb-10">
        <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
          <Item id="med" label="Medication reminders" desc="Get notified when it's time to take a dose." />
          <Item id="adh" label="Daily adherence summary" desc="A short recap each evening." defaultOn={false} />
          <Item id="crisis" label="Crisis follow-ups" desc="Check-ins after a logged crisis." />
          <Item id="updates" label="Product updates" desc="New features and announcements." defaultOn={false} />
        </div>
        <p className="text-[11px] text-muted-foreground/70 px-2 mt-3">Notification preferences are saved on this device.</p>
      </div>
    </MobileAppShell>
  );
}