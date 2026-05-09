import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { DEFAULT_HOSPITAL_CHECKLIST, HOSPITAL_CHECKLIST_KEY, useLocalStorage } from "@/lib/localPrefs";
import { CheckCircleBold as Check, InfoCircleLinear as Info, HospitalLinear as Hospital } from "solar-icon-set";

export default function HospitalChecklist() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(HOSPITAL_CHECKLIST_KEY, {});
  const items = DEFAULT_HOSPITAL_CHECKLIST;
  const completedCount = items.filter((i) => checked[i.id]).length;

  const toggle = (id: string) => setChecked({ ...checked, [id]: !checked[id] });

  return (
    <MobileAppShell>
      <SubPageHeader title="Hospital checklist" back="/settings" />
      <div className="px-5 pb-10">
        <div className="flex flex-col items-center text-center pt-2 pb-6">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Hospital size={36} />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Use this checklist to prepare for your hospital visit. Check off items as you complete them.
          </p>
        </div>

        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-sm font-semibold text-foreground">Checklist</h2>
          <span className="text-xs text-muted-foreground">{completedCount} / {items.length} completed</span>
        </div>

        <div className="bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60 mb-5">
          {items.map((item) => {
            const isOn = !!checked[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
              >
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-colors ${
                    isOn ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-background"
                  }`}
                >
                  {isOn && <Check size={16} />}
                </span>
                <span className="flex-1 min-w-0">
                  <span className={`block text-sm font-medium ${isOn ? "text-foreground" : "text-foreground"}`}>{item.label}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{item.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-start gap-2 bg-primary/5 border border-primary/15 rounded-xl p-3.5">
          <Info size={16} className="text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-foreground leading-relaxed">
            Bring this checklist with you to your appointment.
          </p>
        </div>
      </div>
    </MobileAppShell>
  );
}