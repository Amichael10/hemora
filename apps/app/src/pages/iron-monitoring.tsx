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
import { Leaf } from "lucide-react";

export default function IronMonitoring() {
  const [, setWouterLocation] = useLocation();
  const { toast } = useToast();

  const [ferritin, setFerritin] = useState("842");
  const [date, setDate] = useState("2025-05-16");
  const [therapy, setTherapy] = useState("Deferasirox (Exjade)");
  const [dose, setDose] = useState("1500 mg once daily");
  const [adherence, setAdherence] = useState(true);
  const [notes, setNotes] = useState("Occasional stomach upset");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Iron monitoring saved" });
      setWouterLocation("/transfusion");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Iron monitoring" back="/transfusion" />
      <div className="px-6 pb-10 bg-background min-h-screen">
        <p className="text-sm text-muted-foreground mb-6">Track your ferritin levels and iron management.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="ferritin" className="text-sm font-semibold text-[#193B3F] ml-1">Ferritin level</Label>
            <div className="flex items-center bg-white border border-[#193B3F]/15 rounded-2xl h-14 overflow-hidden pr-4">
              <Input 
                id="ferritin"
                type="number"
                value={ferritin} 
                onChange={(e) => setFerritin(e.target.value)}
                className="h-full border-none shadow-none focus-visible:ring-0 text-base" 
              />
              <span className="text-[#193B3F] font-medium text-sm whitespace-nowrap">ng/mL</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="date" className="text-sm font-semibold text-[#193B3F] ml-1">Date tested</Label>
            <Input 
              id="date"
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="h-14 text-base rounded-2xl bg-white border-[#193B3F]/15" 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="therapy" className="text-sm font-semibold text-[#193B3F] ml-1">Chelation therapy</Label>
            <Input 
              id="therapy"
              value={therapy} 
              onChange={(e) => setTherapy(e.target.value)} 
              className="h-14 text-base rounded-2xl bg-white border-[#193B3F]/15" 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="dose" className="text-sm font-semibold text-[#193B3F] ml-1">Dose</Label>
            <Input 
              id="dose"
              value={dose} 
              onChange={(e) => setDose(e.target.value)} 
              className="h-14 text-base rounded-2xl bg-white border-[#193B3F]/15" 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#193B3F]/15">
            <div className="space-y-0.5">
              <Label htmlFor="adherence" className="text-base font-bold text-[#193B3F]">Adherence reminder</Label>
              <p className="text-xs text-[#193B3F]/70">Remind me to take my medication</p>
            </div>
            <Switch 
              id="adherence"
              checked={adherence}
              onCheckedChange={setAdherence}
              className="data-[state=checked]:bg-[#193B3F]"
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="notes" className="text-sm font-semibold text-[#193B3F] ml-1">Side effects / notes <span className="font-normal text-[#193B3F]/70">(optional)</span></Label>
            <Textarea 
              id="notes"
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              placeholder="e.g. Occasional stomach upset"
              className="min-h-[100px] rounded-2xl bg-white border-[#193B3F]/15 text-base p-4 resize-none" 
            />
          </div>

          <div className="flex gap-3 bg-[#193B3F]/5 p-4 rounded-2xl items-start mb-8">
             <Leaf size={24} className="text-[#193B3F] shrink-0 mt-0.5" />
             <p className="text-[13px] text-[#193B3F] leading-relaxed">
                Iron chelation helps remove excess iron and protect your organs. Keep going—your consistency makes a difference.
             </p>
          </div>

          <Button 
            type="submit" 
            className="w-full h-14 rounded-2xl bg-[#193B3F] hover:bg-[#11292b] text-white text-base font-bold shadow-md" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save ferritin result"}
          </Button>
        </form>
      </div>
    </MobileAppShell>
  );
}
