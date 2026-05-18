import { useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle, Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateTransfusionLog } from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";

export default function TransfusionForm() {
  const [, setWouterLocation] = useLocation();
  const { profileId } = useProfile();
  const { toast } = useToast();
  const createTransfusion = useCreateTransfusionLog();

  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [units, setUnits] = useState(2);
  const [hbPre, setHbPre] = useState("");
  
  const [reaction, setReaction] = useState(false);
  const [reactionNotes, setReactionNotes] = useState("");
  const [showReactionAlert, setShowReactionAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (units <= 0) {
      toast({ title: "Error", description: "Units must be greater than 0", variant: "destructive" });
      return;
    }

    const combinedNotes = [
      reason ? `Reason: ${reason}` : null,
      bloodType ? `Blood Type: ${bloodType}` : null,
      hbPre ? `Pre-transfusion Hb: ${hbPre}` : null,
    ].filter(Boolean).join(" | ");

    createTransfusion.mutate({
      data: {
        profileId,
        unitsCount: units,
        hospital: hospital || null,
        occurredAt: new Date(date).toISOString(),
        reaction,
        reactionNotes: reaction ? reactionNotes || null : null,
        notes: combinedNotes || null,
      }
    }, {
      onSuccess: () => {
        toast({ title: "Transfusion logged" });
        if (reaction) {
          setShowReactionAlert(true);
        } else {
          setWouterLocation("/iron-monitoring");
        }
      },
      onError: (err: any) => {
        toast({ title: "Failed to log", description: err.message, variant: "destructive" });
      }
    });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Add transfusion" back="/transfusion" />
      <div className="px-6 pb-10">
        <p className="text-sm text-muted-foreground mb-6">Add details to keep an accurate record of your care.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="date" className="text-sm font-semibold text-foreground/70 ml-1">Date of transfusion</Label>
            <Input 
              id="date"
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="hospital" className="text-sm font-semibold text-foreground/70 ml-1">Hospital / clinic</Label>
            <Input 
              id="hospital"
              value={hospital} 
              onChange={(e) => setHospital(e.target.value)} 
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="reason" className="text-sm font-semibold text-foreground/70 ml-1">Reason for transfusion</Label>
            <Input 
              id="reason"
              value={reason} 
              onChange={(e) => setReason(e.target.value)} 
              placeholder="e.g. Pain crisis"
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="bloodType" className="text-sm font-semibold text-foreground/70 ml-1">Blood type / compatibility note</Label>
            <Input 
              id="bloodType"
              value={bloodType} 
              onChange={(e) => setBloodType(e.target.value)} 
              placeholder="e.g. O+ (Compatible)"
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground/70 ml-1">Units received</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-between bg-card border border-border/40 rounded-2xl h-14 w-32 px-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-xl"
                  onClick={() => setUnits(Math.max(1, units - 1))}
                >
                  <Minus size={16} />
                </Button>
                <span className="text-lg font-bold">{units}</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-xl"
                  onClick={() => setUnits(units + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
              <span className="text-muted-foreground font-medium">units</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="hbPre" className="text-sm font-semibold text-foreground/70 ml-1">Pre-transfusion hemoglobin <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input 
              id="hbPre"
              value={hbPre} 
              onChange={(e) => setHbPre(e.target.value)} 
              placeholder="e.g. 8.2 g/dL"
              className="h-14 text-base rounded-2xl bg-card border-border/40" 
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-card border border-border/40">
            <div className="space-y-0.5">
              <Label htmlFor="reaction" className="text-base font-bold">Any reaction?</Label>
              <p className="text-xs text-muted-foreground">Toggle if you experienced any adverse effects</p>
            </div>
            <Switch 
              id="reaction"
              checked={reaction}
              onCheckedChange={setReaction}
            />
          </div>

          {reaction && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <Label htmlFor="reaction-notes" className="text-sm font-semibold text-[#A8324A] ml-1">Reaction Details / Notes <span className="font-normal text-[#A8324A]/70">(optional)</span></Label>
              <Textarea 
                id="reaction-notes"
                value={reactionNotes} 
                onChange={(e) => setReactionNotes(e.target.value)} 
                placeholder="e.g., mild headache, chills"
                className="min-h-[100px] rounded-2xl bg-rose-50/30 border-rose-200 text-base p-4" 
              />
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full mt-4 h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground text-base font-bold shadow-md" 
            disabled={createTransfusion.isPending}
          >
            {createTransfusion.isPending ? "Saving..." : "Save & continue"}
          </Button>
        </form>
      </div>

      <Dialog open={showReactionAlert} onOpenChange={(open) => {
        setShowReactionAlert(open);
        if (!open) setWouterLocation("/iron-monitoring");
      }}>
        <DialogContent className="w-[90vw] max-w-md rounded-[32px] p-8 border-none shadow-2xl">
          <DialogHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center animate-pulse">
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
            <DialogTitle className="text-2xl font-serif text-center text-orange-700">
              Reaction Logged
            </DialogTitle>
            <DialogDescription className="text-base text-center leading-relaxed text-foreground">
              You reported a reaction during or after this transfusion.
              <br /><br />
              <span className="font-bold text-orange-800">Transfusion reactions can be serious.</span>
              <br /><br />
              Please notify your care team immediately if you haven't already. Watch for worsening symptoms like shortness of breath or back pain.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-8 flex flex-col gap-3 sm:flex-col">
            <Button 
              className="w-full h-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg"
              onClick={() => {
                setShowReactionAlert(false);
              }}
            >
              I understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MobileAppShell>
  );
}
