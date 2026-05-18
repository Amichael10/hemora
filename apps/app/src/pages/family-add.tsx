import { useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateFamilyMember } from "@/lib/family-api";
import { GENOTYPES } from "@/lib/genotype";
import { useToast } from "@/hooks/use-toast";
import { 
  UserLinear as UserIcon, 
  HeartLinear as HeartIcon, 
  CalendarLinear as CalendarIcon,
  NotesLinear as NotesIcon
} from "solar-icon-set";

const RELATIONSHIPS = [
  { value: "Self", label: "Self" },
  { value: "Partner", label: "Partner" },
  { value: "Mother", label: "Mother" },
  { value: "Father", label: "Father" },
  { value: "Child", label: "Child" },
  { value: "Sibling", label: "Sibling" },
  { value: "Grandparent", label: "Grandparent" },
  { value: "Other", label: "Other" }
];

const GENOTYPE_META: Record<string, { desc: string; badge: string }> = {
  AA: { desc: "No sickle cell trait", badge: "Normal" },
  AS: { desc: "Sickle cell trait (Carrier)", badge: "Carrier" },
  AC: { desc: "Hemoglobin C trait", badge: "Carrier" },
  SS: { desc: "Sickle cell disease (Anemia)", badge: "Affected" },
  SC: { desc: "Sickle cell disease (SC)", badge: "Affected" },
  CC: { desc: "Hemoglobin C disease", badge: "Mild Disease" },
};

export default function FamilyAdd() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const create = useCreateFamilyMember();

  const [form, setForm] = useState({
    fullName: "",
    relationship: "Child",
    genotype: "",
    dateOfBirth: "",
    notes: "",
  });

  const submit = async () => {
    if (!form.fullName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a full name for your family member.",
        variant: "destructive",
      });
      return;
    }

    try {
      await create.mutateAsync({
        fullName: form.fullName.trim(),
        relationship: form.relationship || null,
        genotype: form.genotype || null,
        dateOfBirth: form.dateOfBirth || null,
        notes: form.notes.trim() || null,
      });

      toast({
        title: "Family member added",
        description: `${form.fullName} has been added to your profile.`,
      });
      setLocation("/family");
    } catch (e: any) {
      toast({
        title: "Couldn't add family member",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Add family member" back="/family" />
      <div className="px-5 pb-36 space-y-6">
        
        {/* Intro Banner */}
        <div className="bg-secondary/40 rounded-3xl p-5 border border-border/40 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <HeartIcon size={20} />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-sm text-foreground">Genotype History</h3>
            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
              Add known family genotypes to generate a custom family risk chart.
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label className="font-semibold text-xs text-foreground/80 flex items-center gap-1.5">
              <UserIcon size={14} className="text-primary/60" />
              Full Name
            </Label>
            <Input 
              value={form.fullName} 
              onChange={(e) => setForm({ ...form, fullName: e.target.value })} 
              placeholder="e.g. Adanna Mensah"
              className="bg-card/50 border-border/60 focus:border-primary focus-visible:ring-primary/20 h-12"
            />
          </div>

          {/* Relationship Selection Pills */}
          <div className="space-y-2">
            <Label className="font-semibold text-xs text-foreground/80">Relationship</Label>
            <div className="grid grid-cols-4 gap-2">
              {RELATIONSHIPS.map((r) => {
                const active = form.relationship === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm({ ...form, relationship: r.value })}
                    className={`py-2 px-1 text-xs rounded-xl border text-center transition-all duration-200 font-medium ${
                      active 
                        ? "bg-secondary text-secondary-foreground border-secondary shadow-sm scale-[1.02]" 
                        : "bg-card/40 border-border/60 hover:border-border text-muted-foreground"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Genotype Grid Selection */}
          <div className="space-y-2">
            <Label className="font-semibold text-xs text-foreground/80">Genotype <span className="text-muted-foreground/60 font-normal">(optional)</span></Label>
            <div className="grid grid-cols-3 gap-2">
              {GENOTYPES.map((g) => {
                const active = form.genotype === g;
                const meta = GENOTYPE_META[g];
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setForm({ ...form, genotype: active ? "" : g })}
                    className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                      active 
                        ? "bg-primary/5 border-primary shadow-sm scale-[1.02] ring-1 ring-primary/20" 
                        : "bg-card/40 border-border/60 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-serif font-bold text-base ${active ? "text-primary" : "text-foreground"}`}>{g}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        meta.badge === "Normal" ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                        meta.badge === "Carrier" ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400" :
                        "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}>
                        {meta.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-snug mt-1.5 truncate">
                      {meta.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label className="font-semibold text-xs text-foreground/80 flex items-center gap-1.5">
              <CalendarIcon size={14} className="text-primary/60" />
              Date of Birth <span className="text-muted-foreground/60 font-normal">(optional)</span>
            </Label>
            <Input 
              type="date"
              value={form.dateOfBirth} 
              onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} 
              className="bg-card/50 border-border/60 focus:border-primary focus-visible:ring-primary/20 h-12"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="font-semibold text-xs text-foreground/80 flex items-center gap-1.5">
              <NotesIcon size={14} className="text-primary/60" />
              Notes <span className="text-muted-foreground/60 font-normal">(optional)</span>
            </Label>
            <Textarea 
              value={form.notes} 
              onChange={(e) => setForm({ ...form, notes: e.target.value })} 
              placeholder="e.g. Any specific health patterns, drug reactions, or other details..."
              rows={3}
              className="bg-card/50 border-border/60 focus:border-primary focus-visible:ring-primary/20 p-3 rounded-2xl resize-none"
            />
          </div>
        </div>
      </div>

      {/* Floating Save Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 pb-safe bg-background/95 backdrop-blur border-t border-border/60 z-40">
        <Button 
          size="xl" 
          className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-serif font-semibold text-base rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all" 
          onClick={submit} 
          disabled={create.isPending}
        >
          {create.isPending ? "Adding Member..." : "Add Family Member"}
        </Button>
      </div>
    </MobileAppShell>
  );
}
