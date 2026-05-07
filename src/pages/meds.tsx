import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthIcon } from "@/components/ui/health-icon";
import { useProfile } from "@/context/ProfileContext";
import {
  useListMedications,
  useCreateMedication,
  getListMedicationsQueryKey
} from "@workspace/api-client-react";
import { CreateMedicationBodyStatus } from "@workspace/api-client-react";
import { AltArrowRightLinear as ChevronRight, AddCircleLinear as Plus } from "solar-icon-set";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Pills2Bold as MedicinesFilled,
  PillBold as BlisterFilled,
  Pills2Linear as MedicinesOutline,
  PillLinear as BlisterOutline,
} from "solar-icon-set";

function AdherenceHeart({ percent }: { percent: number }) {
  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative flex items-center justify-center" style={{ width: 192, height: 176 }}>
        <svg viewBox="0 0 48 48" width="192" height="176" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heartGradKindred" x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--brand-teal))" />
              <stop offset="100%" stopColor="hsl(var(--brand-teal-deep))" />
            </linearGradient>
            <filter id="heartShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="hsl(var(--brand-teal) / 0.3)" />
            </filter>
          </defs>
          <path
            d="M6 18.7241C6 12.6409 10.0359 7 15.5625 7C19.3976 7 22.2434 9.53088 24 13.1211C25.7565 9.53111 28.6022 7 32.4375 7C37.9647 7 42 12.6419 42 18.7241C42 31.7444 24 41 24 41C24 41 6 32.3045 6 18.7241Z"
            fill="url(#heartGradKindred)"
            filter="url(#heartShadow)"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center" style={{ marginTop: 10 }}>
          <span className="font-bold leading-none tracking-[-2px] text-white" style={{ fontSize: 36, textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
            {percent}%
          </span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-1 text-center">You're doing well this month</p>
    </div>
  );
}

export default function Meds() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const { data: meds, isLoading: isLoadingMeds } = useListMedications(
    { profileId },
    { query: { queryKey: getListMedicationsQueryKey({ profileId }), enabled: !!profileId } }
  );

  const createMed = useCreateMedication();
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("Once daily");
  const [reminderTime, setReminderTime] = useState("");

  const handleAddMed = (e: React.FormEvent) => {
    e.preventDefault();
    createMed.mutate({
      data: { profileId, name, dose, frequency, reminderTime, status: CreateMedicationBodyStatus.ongoing, reminderEnabled: true }
    }, {
      onSuccess: () => {
        toast({ title: "Medication added" });
        queryClient.invalidateQueries({ queryKey: getListMedicationsQueryKey({ profileId }) });
        setOpen(false);
        setName(""); setDose(""); setFrequency("Once daily"); setReminderTime("");
      }
    });
  };

  return (
    <MobileAppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="h-page">Medications</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="soft" data-testid="btn-add-med">
                <Plus size={16} />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl sm:max-w-[430px] mx-auto">
              <SheetHeader>
                <SheetTitle className="h-section text-primary">Add Medication</SheetTitle>
              </SheetHeader>
              <form onSubmit={handleAddMed} className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. Hydroxyurea" />
                </div>
                <div className="space-y-2">
                  <Label>Dose</Label>
                  <Input value={dose} onChange={e => setDose(e.target.value)} placeholder="e.g. 500mg" />
                </div>
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Input value={frequency} onChange={e => setFrequency(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Reminder Time</Label>
                  <Input type="time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} />
                </div>
                <Button type="submit" size="xl" className="w-full mt-4" disabled={createMed.isPending}>
                  {createMed.isPending ? "Adding..." : "Save Medication"}
                </Button>
              </form>
            </SheetContent>
          </Sheet>
        </div>

        <Card className="border-none shadow-sm bg-card mb-6 overflow-hidden">
          <CardContent className="p-0">
            <AdherenceHeart percent={85} />
          </CardContent>
        </Card>

        <h2 className="eyebrow mb-4">Current Routine</h2>

        {isLoadingMeds ? (
          <div className="space-y-3">
            {[1, 2].map(i => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-2xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : meds?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-primary/20 flex justify-center mb-4">
              <HealthIcon outline={MedicinesOutline} filled={MedicinesFilled} width="48" height="48" />
            </div>
            <p className="text-sm mb-4">No medications added yet.</p>
            <Button variant="soft" onClick={() => setOpen(true)}>Add Medication</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {meds?.map((med) => (
              <Card key={med.id} className="group border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-testid={`med-card-${med.id}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      med.status === 'paused' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <span className="relative inline-flex shrink-0" style={{ width: 22, height: 22 }}>
                        <span className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0">
                          <BlisterOutline size={22} />
                        </span>
                        <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                          <BlisterFilled size={22} />
                        </span>
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-foreground text-sm tracking-[-0.01em]">{med.name}</h3>
                        {med.status === 'paused' && (
                          <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4 opacity-70">Paused</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{med.dose}</span>
                        <span>{med.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="rgba(115,115,115,0.5)" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
