import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HealthIcon } from "@/components/ui/health-icon";
import { useLocation } from "wouter";
import { useProfile } from "@/context/ProfileContext";
import { useListEmergencyContacts, getListEmergencyContactsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AMBULANCE_KEY,
  HOSPITAL_CHECKLIST_KEY,
  DEFAULT_HOSPITAL_CHECKLIST,
  useLocalStorage,
} from "@/lib/localPrefs";
import { exportHospitalChecklistToPdf } from "@/lib/hospitalChecklistPdf";
import {
  AltArrowLeftLinear as ChevronLeft,
  AddCircleLinear as Plus,
  HeartPulseBold as AmbulanceFilled,
  PhoneBold as PhoneFilled,
  DangerTriangleBold as AccidentFilled,
  HeartPulseLinear as AmbulanceOutline,
  PhoneLinear as PhoneOutline,
  DangerTriangleLinear as AccidentOutline,
  SettingsLinear as SettingsIcon,
  ShareLinear as ShareIcon,
} from "solar-icon-set";

export default function Emergency() {
  const [, setLocation] = useLocation();
  const { profileId } = useProfile();
  const [ambulance] = useLocalStorage<string>(AMBULANCE_KEY, "");
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>(HOSPITAL_CHECKLIST_KEY, {});
  const ambulanceNumber = (ambulance || "").trim() || "112";

  const completedCount = DEFAULT_HOSPITAL_CHECKLIST.filter((i) => checked[i.id]).length;
  const totalCount = DEFAULT_HOSPITAL_CHECKLIST.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const { data: contacts, isLoading } = useListEmergencyContacts(
    { profileId },
    { query: { queryKey: getListEmergencyContactsQueryKey({ profileId }), enabled: !!profileId } }
  );

  return (
    <MobileAppShell>
      <div className="p-6">
        <button onClick={() => setLocation("/crisis")} className="flex items-center text-xs font-medium text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ChevronLeft size={16} /> Back to Crisis Log
        </button>

        <div className="bg-destructive/[0.06] border border-destructive/15 rounded-2xl p-5 mb-8 shadow-sm">
          <h1 className="font-serif text-[1.5rem] text-destructive font-semibold mb-2 tracking-[-0.5px]">Emergency Support</h1>
          <p className="text-sm text-destructive/70 mb-6 leading-relaxed">
            If you're experiencing severe pain, shortness of breath, or fever, seek immediate care.
          </p>
          <div className="space-y-3">
            <a href={`tel:${ambulanceNumber}`} className="block">
            <Button asChild={false} className="group/amb w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-base shadow-md gap-2">
              <span className="relative inline-flex shrink-0" style={{ width: 22, height: 22 }}>
                <span className="absolute inset-0 transition-opacity duration-150 group-hover/amb:opacity-0">
                  <AmbulanceOutline size={22} />
                </span>
                <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/amb:opacity-100">
                  <AmbulanceFilled size={22} />
                </span>
              </span>
              Call Ambulance ({ambulanceNumber})
            </Button>
            </a>
            {!ambulance && (
              <button
                onClick={() => setLocation("/settings/ambulance")}
                className="text-[11px] text-destructive/70 hover:text-destructive flex items-center gap-1 mx-auto"
              >
                <SettingsIcon size={12} /> Set your local ambulance number
              </button>
            )}
            {isLoading ? (
              <Skeleton className="w-full h-14 rounded-xl" />
            ) : contacts && contacts.length > 0 ? (
              <a href={`tel:${contacts[0].phone}`} className="block">
              <Button variant="outline" className="group/call w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2">
                <span className="relative inline-flex shrink-0" style={{ width: 20, height: 20 }}>
                  <span className="absolute inset-0 transition-opacity duration-150 group-hover/call:opacity-0">
                    <PhoneOutline size={20} />
                  </span>
                  <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/call:opacity-100">
                    <PhoneFilled size={20} />
                  </span>
                </span>
                Call {contacts[0].fullName}
              </Button>
              </a>
            ) : (
              <Button
                variant="outline"
                onClick={() => setLocation("/settings/contacts")}
                className="w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2"
              >
                <Plus size={20} /> Add Caregiver
              </Button>
            )}
          </div>
        </div>

        <h2 className="font-semibold text-xs text-primary mb-4 uppercase tracking-widest opacity-60">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {["Stay calm & breathe", "Drink water", "Take pain meds", "Find nearest clinic"].map((action, i) => (
            <div key={i} className="bg-card rounded-xl p-4 shadow-sm border border-border/40 flex items-center justify-center text-center">
              <span className="text-sm font-medium text-foreground leading-tight">{action}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-xs text-primary uppercase tracking-widest opacity-60 flex items-center gap-2">
            <HealthIcon outline={AccidentOutline} filled={AccidentFilled} width="16" height="16" className="text-accent" active />
            Hospital Bag Checklist
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                exportHospitalChecklistToPdf({
                  items: DEFAULT_HOSPITAL_CHECKLIST,
                  checked,
                })
              }
              className="text-[11px] font-medium text-primary/70 hover:text-primary inline-flex items-center gap-1"
            >
              <ShareIcon size={12} /> Share PDF
            </button>
            <button
              onClick={() => setLocation("/settings/hospital-checklist")}
              className="text-[11px] font-medium text-primary/70 hover:text-primary"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-muted-foreground">{completedCount} of {totalCount} packed</span>
            <span className="text-xs font-medium text-primary">{progressPct}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <Card className="border-none shadow-sm bg-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {DEFAULT_HOSPITAL_CHECKLIST.map((item) => {
                const isOn = !!checked[item.id];
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChecked({ ...checked, [item.id]: !isOn })}
                    className="w-full flex items-center p-4 gap-3 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded-md shrink-0 border flex items-center justify-center ${
                        isOn ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/25"
                      }`}
                    >
                      {isOn && <span className="text-[11px] leading-none">✓</span>}
                    </div>
                    <span className="flex-1 min-w-0">
                      <span className={`block text-sm ${isOn ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.label}</span>
                      {item.description && (
                        <span className="block text-[11px] text-muted-foreground mt-0.5">{item.description}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileAppShell>
  );
}
