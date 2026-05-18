import { useState } from "react";
import { useLocation, useSearch } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateVitalsLog } from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";

export default function VitalsForm() {
  const [, setLocation] = useLocation();
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createVitals = useCreateVitalsLog();

  const search = useSearch();
  const queryParams = new URLSearchParams(search);
  const initialType = queryParams.get("type") || "temperature";

  const [type, setType] = useState<string>(initialType);
  const [value, setValue] = useState("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState("");
  const [showFeverAlert, setShowFeverAlert] = useState(false);

  const getUnit = (t: string) => {
    switch (t) {
      case 'temperature': return "°C";
      case 'spo2': return "%";
      case 'heart_rate': return "bpm";
      case 'blood_pressure': return "mmHg";
      default: return "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tempValue = type === 'temperature' ? parseFloat(value) : null;
    
    createVitals.mutate({
      data: {
        profileId,
        type,
        value,
        unit: getUnit(type),
        occurredAt: new Date(date).toISOString(),
        notes: notes || null,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Vitals logged" });
        if (tempValue !== null && tempValue >= 38.0) {
          setShowFeverAlert(true);
        } else {
          setLocation("/vitals");
        }
      },
      onError: (err: any) => {
        toast({ title: "Failed to log", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader 
        title={type === 'temperature' ? "Log Fever" : "Log Vitals"} 
        back="/vitals" 
      />
      <div className="px-6 pb-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground/70 ml-1">Vitals Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'temperature', label: 'Temp' },
                { id: 'spo2', label: 'Oxygen' },
                { id: 'heart_rate', label: 'Heart' },
                { id: 'blood_pressure', label: 'BP' },
              ].map((t) => (
                <Button 
                  key={t.id} 
                  type="button" 
                  variant="outline" 
                  onClick={() => setType(t.id)}
                  className={`h-12 rounded-xl text-sm font-medium transition-all ${
                    type === t.id 
                      ? "bg-[#193B3F] text-white border-[#193B3F] shadow-md scale-[1.02] hover:bg-[#193B3F] hover:text-white" 
                      : "bg-[#FBF5E7] border-[#193B3F]/10 text-[#193B3F] hover:bg-white"
                  }`}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="value" className="text-sm font-semibold text-foreground/70 ml-1">
              Value ({getUnit(type)})
            </Label>
            <Input 
              id="value"
              type="text" 
              inputMode="decimal"
              value={value} 
              onChange={(e) => setValue(e.target.value)} 
              required 
              placeholder={type === 'blood_pressure' ? "120/80" : "Enter value"}
              className="h-14 text-lg font-medium rounded-2xl bg-card border-border/40 focus:ring-2 focus:ring-primary/20 transition-shadow"
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
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="notes" className="text-sm font-semibold text-foreground/70 ml-1">Notes (Optional)</Label>
            <Textarea 
              id="notes"
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="How are you feeling? Any symptoms?"
              className="min-h-[100px] rounded-2xl bg-card border-border/40 text-base p-4 resize-none" 
            />
          </div>

          <Button 
            type="submit" 
            size="xl" 
            className="w-full mt-4 h-14 rounded-2xl bg-[#193B3F] hover:bg-[#11292b] shadow-lg shadow-[#193B3F]/20 text-white text-lg font-bold" 
            disabled={createVitals.isPending}
          >
            {createVitals.isPending ? "Logging..." : "Save Vitals"}
          </Button>
        </form>
      </div>

      <Dialog open={showFeverAlert} onOpenChange={setShowFeverAlert}>
        <DialogContent className="w-[90vw] max-w-md rounded-[32px] p-8 border-none shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-[#A8324A]/10 flex items-center justify-center animate-pulse">
              <Stethoscope className="w-8 h-8 text-[#A8324A]" />
            </div>
            <DialogTitle className="text-2xl font-serif text-center text-[#A8324A]">
              Emergency Alert
            </DialogTitle>
            <DialogDescription className="text-base text-center leading-relaxed text-foreground">
              A temperature of <span className="font-bold">{value}°C</span> is considered a fever.
              <br /><br />
              <span className="font-bold text-[#7E2438]">In Sickle Cell Disease, a fever is a medical emergency.</span>
              <br /><br />
              Please contact your hematologist or visit the nearest Emergency Room immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-3 mt-4 sm:flex-col">
            <Button 
              className="w-full h-14 rounded-2xl bg-[#A8324A] hover:bg-[#7E2438] text-lg font-bold shadow-lg shadow-[#A8324A]/20"
              onClick={() => setLocation("/emergency")}
            >
              View Emergency Plan
            </Button>
            <Button 
              variant="ghost" 
              className="w-full h-12 rounded-xl text-muted-foreground"
              onClick={() => setLocation("/vitals")}
            >
              I'm already at the hospital
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileAppShell>
  );
}
