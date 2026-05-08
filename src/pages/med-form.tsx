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

const REFILL_OPTIONS = [
  { value: "0", label: "Off" },
  { value: "1", label: "1 day before" },
  { value: "3", label: "3 days before" },
  { value: "5", label: "5 days before" },
  { value: "7", label: "1 week before" },
  { value: "14", label: "2 weeks before" },
];

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

/** Default start date = today if the first scheduled time has already passed today, else tomorrow. */
function defaultStartDate(reminder24: string): string {
  if (!reminder24 || !/^\d{1,2}:\d{2}/.test(reminder24)) return todayISO();
  const [hh, mm] = reminder24.split(":").map((s) => parseInt(s, 10));
  const now = new Date();
  const scheduled = new Date(); scheduled.setHours(hh, mm, 0, 0);
  const d = scheduled.getTime() <= now.getTime() ? now : new Date(now.getTime() + 86400000);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

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
  const [matchEdit, editParams] = useRoute("/meds/:id/edit");
  const id = matchEdit ? editParams?.id : undefined;
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
  const [refillDays, setRefillDays] = useState<string>("3");
  const [startDate, setStartDate] = useState<string>(todayISO());
  const [startDateTouched, setStartDateTouched] = useState(false);
  const [nextRefillDate, setNextRefillDate] = useState<string>("");

  useEffect(() => {
    if (med) {
      setName(med.name ?? "");
      setDose(med.dose ?? "");
      setFrequency(med.frequency ?? "Once daily");
      const { h, m, p } = from24h(med.reminderTime ?? "");
      setHour(h); setMinute(m); setPeriod(p);
      setNotes(med.notes ?? "");
      setRefillDays(med.refillReminderDays != null ? String(med.refillReminderDays) : "3");
      if (med.startDate) { setStartDate(med.startDate); setStartDateTouched(true); }
      if (med.nextRefillDate) setNextRefillDate(med.nextRefillDate);
    }
  }, [med]);

  // Keep start date in sync with the time picker until the user edits it manually
  useEffect(() => {
    if (isEdit || startDateTouched) return;
    setStartDate(defaultStartDate(to24h(hour, minute, period)));
  }, [hour, minute, period, isEdit, startDateTouched]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reminderTime = to24h(hour, minute, period);
    const refillNum = parseInt(refillDays, 10);
    const data = {
      name, dose, frequency, reminderTime, notes, profileId,
      status: CreateMedicationBodyStatus.ongoing,
      reminderEnabled: true,
      refillReminderDays: refillNum > 0 ? refillNum : null,
      startDate: startDate || null,
      nextRefillDate: nextRefillDate || null,
    };
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
              <Label className="text-sm font-medium">Start date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setStartDateTouched(true); }}
                className="h-12 text-base rounded-xl bg-card border-border/60"
              />
              <p className="text-xs text-muted-foreground">
                Defaults to today if your first dose time has already passed, otherwise tomorrow. You can change it.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Refill reminder</Label>
              <Select value={refillDays} onValueChange={setRefillDays}>
                <SelectTrigger className="h-12 rounded-xl bg-card border-border/60 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {REFILL_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">We'll nudge you this many days before you're due to run out.</p>
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