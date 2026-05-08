import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HealthIcon } from "@/components/ui/health-icon";
import { useLocation } from "wouter";
import { useProfile } from "@/context/ProfileContext";
import { useListEmergencyContacts, getListEmergencyContactsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AltArrowLeftLinear as ChevronLeft,
  AddCircleLinear as Plus,
  HeartPulseBold as AmbulanceFilled,
  PhoneBold as PhoneFilled,
  DangerTriangleBold as AccidentFilled,
  HeartPulseLinear as AmbulanceOutline,
  PhoneLinear as PhoneOutline,
  DangerTriangleLinear as AccidentOutline,
} from "solar-icon-set";

export default function Emergency() {
  const [, setLocation] = useLocation();
  const { profileId } = useProfile();

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
            <Button className="group/amb w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-semibold text-base shadow-md gap-2">
              <span className="relative inline-flex shrink-0" style={{ width: 22, height: 22 }}>
                <span className="absolute inset-0 transition-opacity duration-150 group-hover/amb:opacity-0">
                  <AmbulanceOutline size={22} />
                </span>
                <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/amb:opacity-100">
                  <AmbulanceFilled size={22} />
                </span>
              </span>
              Call Ambulance (112)
            </Button>
            {isLoading ? (
              <Skeleton className="w-full h-14 rounded-xl" />
            ) : contacts && contacts.length > 0 ? (
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
            ) : (
              <Button variant="outline" className="w-full h-14 border-destructive/20 text-destructive hover:bg-destructive/5 font-medium text-base shadow-sm gap-2">
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

        <h2 className="font-semibold text-xs text-primary mb-4 uppercase tracking-widest opacity-60 flex items-center gap-2">
          <HealthIcon outline={AccidentOutline} filled={AccidentFilled} width="16" height="16" className="text-accent" active />
          Hospital Bag Checklist
        </h2>
        <Card className="border-none shadow-sm bg-card">
          <CardContent className="p-0">
            <div className="divide-y divide-border/50">
              {["Health ID / Insurance Card", "Current Medications", "Comfortable Clothes", "Phone Charger", "Water Bottle"].map((item, i) => (
                <div key={i} className="flex items-center p-4 gap-3">
                  <div className="w-5 h-5 rounded-md border border-muted-foreground/25 shrink-0" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileAppShell>
  );
}
