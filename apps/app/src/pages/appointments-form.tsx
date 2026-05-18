import { useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useCreateAppointment } from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";

export default function AppointmentForm() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const initialTitle = searchParams.get("title") || "";
  
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();

  const [title, setTitle] = useState(initialTitle);
  const [doctor, setDoctor] = useState("");
  const [hospital, setHospital] = useState("");
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [urgent, setUrgent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) {
      toast({ title: "Required fields missing", description: "Please provide a title and date/time.", variant: "destructive" });
      return;
    }

    createAppointment.mutate({
      data: {
        profileId,
        title,
        doctorName: doctor || null,
        hospital: hospital || null,
        scheduledAt: new Date(date).toISOString(),
        notes: notes || null,
        status: urgent ? "urgent" : "scheduled",
      }
    }, {
      onSuccess: () => {
        toast({ title: "Appointment scheduled" });
        setLocation("/appointments");
      },
      onError: (err: any) => {
        toast({ title: "Failed to schedule", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Schedule Visit" back="/appointments" />
      <div className="px-6 pb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="title" className="text-sm font-semibold text-foreground/70 ml-1">Purpose of Visit</Label>
            <Input 
              id="title"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="e.g. Hematology Review, Routine Checkup"
              className="h-14 text-lg font-bold rounded-2xl bg-card border-border/40" 
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="date" className="text-sm font-semibold text-foreground/70 ml-1">Date & Time</Label>
            <Input 
              id="date"
              type="datetime-local" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
              required
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="doctor" className="text-sm font-semibold text-foreground/70 ml-1">Doctor Name</Label>
            <Input 
              id="doctor"
              value={doctor} 
              onChange={(e) => setDoctor(e.target.value)} 
              placeholder="Who are you seeing?"
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="hospital" className="text-sm font-semibold text-foreground/70 ml-1">Location / Hospital</Label>
            <Input 
              id="hospital"
              value={hospital} 
              onChange={(e) => setHospital(e.target.value)} 
              placeholder="Where is the visit?"
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40">
            <div className="space-y-0.5">
              <Label htmlFor="urgent" className="text-base font-bold">Urgent Visit?</Label>
              <p className="text-xs text-muted-foreground">Toggle if this is a high-priority or emergency visit</p>
            </div>
            <Switch 
              id="urgent"
              checked={urgent}
              onCheckedChange={setUrgent}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="notes" className="text-sm font-semibold text-foreground/70 ml-1">Questions / Notes</Label>
            <Textarea 
              id="notes"
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="List questions for your doctor or specific concerns to discuss..."
              className="min-h-[120px] rounded-2xl bg-card border-border/40 text-base p-4 resize-none" 
            />
          </div>

          <Button 
            type="submit" 
            size="xl" 
            className="w-full mt-4 h-14 rounded-2xl shadow-lg shadow-primary/20 text-lg font-bold" 
            disabled={createAppointment.isPending}
          >
            {createAppointment.isPending ? "Scheduling..." : "Schedule Appointment"}
          </Button>
        </form>
      </div>
    </MobileAppShell>
  );
}
