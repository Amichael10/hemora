import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  useGetMedication,
  useCreateMedication,
  useUpdateMedication,
  useDeleteMedication,
  CreateMedicationBodyStatus,
} from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";

const FREQUENCIES = [
  "Once daily", "Twice daily", "Three times daily", "Four times daily",
  "Every morning", "Every evening", "Every 8 hours", "Every 12 hours",
  "As needed", "Weekly", "Other",
];

function to24h(hour12: string, minute: string, period: "AM" | "PM"): string {
  if (!hour12) return "";
  let h = parseInt(hour12, 10);
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${minute}`;
}
function from24h(t: string): { h: string; m: string; p: "AM" | "PM" } {
  if (!t || !/^\d{1,2}:\d{2}/.test(t)) return { h: "8", m: "00", p: "AM" };
  const [hh, mm] = t.split(":");
  const h24 = parseInt(hh, 10);
  const p: "AM" | "PM" = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12; if (h12 === 0) h12 = 12;
  return { h: String(h12), m: mm.slice(0, 2), p };
}

export default function MedForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/meds/:id");
  const id = params?.id && params.id !== "new" ? params.id : undefined;
  const isEdit = !!id;
  const { profileId } = useProfile();
  const { toast } = useToast();

  const { data: med, isLoading } = useGetMedication(id);
  const createMed = useCreateMedication();
  const updateMed = useUpdateMedication();
  const deleteMed = useDeleteMedication();

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("Once daily");
  const [hour, setHour] = useState("8");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (med) {
      setName(med.name ?? "");
      setDose(med.dose ?? "");
      setFrequency(med.frequency ?? "Once daily");
      const { h, m, p } = from24h(med.reminderTime ?? "");
      setHour(h); setMinute(m); setPeriod(p);
      setNotes(med.notes ?? "");
    }
  }, [med]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reminderTime = to24h(hour, minute, period);
    const data = { name, dose, frequency, reminderTime, notes, profileId, status: CreateMedicationBodyStatus.ongoing, reminderEnabled: true };
    if (isEdit) {
      updateMed.mutate({ id, data }, {
        onSuccess: () => { toast({ title: "Medication updated" }); setLocation("/meds"); },
        onError: (e: any) => toast({ title: "Couldn't save", description: e?.message, variant: "destructive" }),
      });
    } else {
      createMed.mutate({ data }, {
        onSuccess: () => { toast({ title: "Medication added" }); setLocation("/meds"); },
        onError: (e: any) => toast({ title: "Couldn't save", description: e?.message, variant: "destructive" }),
      });
    }
  };

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this medication?")) return;
    deleteMed.mutate({ id }, {
      onSuccess: () => { toast({ title: "Deleted" }); setLocation("/meds"); },
    });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title={isEdit ? "Edit medication" : "Add medication"} back="/meds" />
      <div className="px-6 pb-10">
        {isEdit && isLoading ? (
          <div className="space-y-3"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Hydroxyurea"
                className="h-12 text-base rounded-xl bg-card border-border/60" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Dose</Label>
              <Input value={dose} onChange={(e) => setDose(e.target.value)} placeholder="e.g. 500 mg"
                className="h-12 text-base rounded-xl bg-card border-border/60" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Frequency</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="h-12 rounded-xl bg-card border-border/60 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FREQUENCIES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Reminder time</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select value={hour} onValueChange={setHour}>
                  <SelectTrigger className="h-12 rounded-xl bg-card border-border/60 text-base"><SelectValue placeholder="Hour" /></SelectTrigger>
                  <SelectContent>{Array.from({length:12},(_,i)=>String(i+1)).map(h=><SelectItem key={h} value={h}>{h}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={minute} onValueChange={setMinute}>
                  <SelectTrigger className="h-12 rounded-xl bg-card border-border/60 text-base"><SelectValue placeholder="Min" /></SelectTrigger>
                  <SelectContent>{["00","05","10","15","20","25","30","35","40","45","50","55"].map(m=><SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={period} onValueChange={(v) => setPeriod(v as "AM" | "PM")}>
                  <SelectTrigger className="h-12 rounded-xl bg-card border-border/60 text-base font-semibold"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xs text-muted-foreground">Pick the hour, minute, and AM or PM</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Notes</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional"
                className="min-h-[88px] rounded-xl bg-card border-border/60 text-base" />
            </div>
            <Button type="submit" size="xl" className="w-full mt-6" disabled={createMed.isPending || updateMed.isPending}>
              {isEdit ? "Save changes" : "Add medication"}
            </Button>
            {isEdit && (
              <Button type="button" variant="crisis" size="xl" className="w-full" onClick={handleDelete} disabled={deleteMed.isPending}>
                Delete medication
              </Button>
            )}
          </form>
        )}
      </div>
    </MobileAppShell>
  );
}