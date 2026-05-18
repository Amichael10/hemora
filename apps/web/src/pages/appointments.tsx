import { useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useProfile } from "@/context/ProfileContext";
import { 
  CalendarLinear as Calendar,
  ClockCircleLinear as Clock,
  HospitalLinear as Hospital,
  BellLinear as Bell
} from "solar-icon-set";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAppointment } from "@workspace/api-client-react";

export default function AppointmentsPage() {
  const { profileId, activeProfileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [provider, setProvider] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!activeProfileId) return;
    if (!title || !date) {
      toast({ title: "Error", description: "Title and Date are required.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const appointmentDate = new Date(`${date}T${time || '00:00'}`);
      
      await createAppointment.mutateAsync({
        data: {
          familyMemberId: activeProfileId,
          title: title,
          description: provider, 
          appointmentAt: appointmentDate.toISOString(),
          status: "scheduled",
          notes: notes || undefined,
        }
      });

      toast({ title: "Scheduled", description: "Your appointment has been saved." });
      setLocation("/");
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to schedule appointment.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileAppShell title="New Appointment">
      <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <Calendar className="text-red-600 w-8 h-8" />
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">What is it for?</Label>
                <Input 
                  id="title" 
                  placeholder="e.g. Hematology Review" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <div className="relative">
                    <Input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="h-12 pl-10"
                    />
                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Time</Label>
                  <div className="relative">
                    <Input 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="h-12 pl-10"
                    />
                    <Clock className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Clinic / Provider</Label>
                <div className="relative">
                  <Input 
                    placeholder="e.g. Hematology Clinic" 
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                    className="h-12 pl-10"
                  />
                  <Hospital className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Preparation Notes</Label>
                <Textarea 
                  placeholder="e.g. Need to fast for 8 hours" 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Bell className="w-4 h-4" />
                  <span>Reminders set for 1 day and 2 hours before.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button 
          className="w-full h-14 text-lg bg-red-600 hover:bg-red-700 rounded-2xl"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </div>
    </MobileAppShell>
  );
}
