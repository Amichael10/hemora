import { useMemo, useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFamilyMembers, useCreateFamilyMember, useDeleteFamilyMember, FamilyMember } from "@/lib/family-api";
import { GENOTYPES, Genotype, offspringOutcomes } from "@/lib/genotype";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { AddCircleLinear as PlusIcon, TrashBinTrashLinear as TrashIcon, HeartLinear as HeartIcon } from "solar-icon-set";

const RELATIONSHIPS = ["Self (Me)", "Partner", "Mother", "Father", "Child", "Sibling", "Grandparent", "Other"];

function MemberCard({ m, onDelete }: { m: FamilyMember; onDelete: () => void }) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-secondary text-white flex items-center justify-center font-serif font-semibold shadow-sm relative">
        {m.fullName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()}
        {m.relationship === 'Self' && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-card flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm truncate">{m.fullName}</p>
          {m.genotype && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">{m.genotype}</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">
            {m.relationship === 'Self' ? 'Main Account' : m.relationship || "Family Member"}
          </p>
          {m.relationship === 'Child' && (
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          )}
          {m.relationship === 'Child' && (
            <span className="text-[10px] text-accent font-medium italic">Dependent</span>
          )}
        </div>
      </div>
      <button onClick={onDelete} className="text-muted-foreground hover:text-destructive p-2"><TrashIcon size={16} /></button>
    </div>
  );
}

function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", relationship: "Child", genotype: "", dateOfBirth: "" });
  const create = useCreateFamilyMember();
  const { toast } = useToast();
  const submit = async () => {
    if (!form.fullName.trim()) return;
    try {
      await create.mutateAsync({
        fullName: form.fullName.trim(),
        relationship: form.relationship || null,
        genotype: form.genotype || null,
        dateOfBirth: form.dateOfBirth || null,
      });
      setForm({ fullName: "", relationship: "Child", genotype: "", dateOfBirth: "" });
      setOpen(false);
      toast({ title: "Family member added" });
    } catch (e: any) {
      toast({ title: "Couldn't add", description: e.message, variant: "destructive" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full bg-secondary text-white hover:bg-secondary/90 h-14 rounded-2xl shadow-md transition-all active:scale-[0.98]">
          <PlusIcon size={18} /> Add family member
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-[2rem] p-6 max-w-[400px]">
        <DialogHeader className="mb-4">
          <DialogTitle className="font-serif text-2xl text-primary">Add to your family</DialogTitle>
          <p className="text-sm text-muted-foreground">Track health records and manage care for a loved one.</p>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full name</Label>
            <Input 
              placeholder="e.g. Maya Doe"
              className="h-12 rounded-xl border-primary/20 focus:border-primary focus:ring-0"
              value={form.fullName} 
              onChange={(e) => setForm({ ...form, fullName: e.target.value })} 
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Relationship</Label>
            <Select value={form.relationship} onValueChange={(v) => setForm({ ...form, relationship: v })}>
              <SelectTrigger className="h-12 rounded-xl border-primary/20">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIPS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Genotype</Label>
              <Select value={form.genotype} onValueChange={(v) => setForm({ ...form, genotype: v })}>
                <SelectTrigger className="h-12 rounded-xl border-primary/20">
                  <SelectValue placeholder="Unknown" />
                </SelectTrigger>
                <SelectContent>
                  {GENOTYPES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date of birth</Label>
              <Input 
                type="date" 
                className="h-12 rounded-xl border-primary/20"
                value={form.dateOfBirth} 
                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} 
              />
            </div>
          </div>
          <Button 
            className="w-full h-14 rounded-2xl text-base font-semibold mt-4 shadow-lg shadow-primary/10" 
            onClick={submit} 
            disabled={create.isPending}
          >
            {create.isPending ? "Adding…" : "Add Member"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FamilyTree({ members }: { members: FamilyMember[] }) {
  const parents = members.filter((m) => ["Mother", "Father", "Partner", "Self"].includes(m.relationship || ""));
  const children = members.filter((m) => m.relationship === "Child");
  const others = members.filter((m) => !parents.includes(m) && !children.includes(m));

  const Node = ({ m }: { m: FamilyMember }) => (
    <div className={`bg-card border rounded-xl px-3 py-2 min-w-[110px] text-center shadow-sm ${m.relationship === 'Self' ? 'border-primary/40 ring-1 ring-primary/5' : 'border-border/60'}`}>
      <p className="text-[12px] font-semibold truncate">{m.fullName.split(" ")[0]}</p>
      <p className="text-[10px] text-muted-foreground">{m.relationship || "—"}</p>
      {m.genotype && <span className="inline-block mt-1 text-[10px] font-bold text-primary bg-primary/10 px-1.5 rounded">{m.genotype}</span>}
    </div>
  );

  return (
    <div className="bg-secondary/10 rounded-[2rem] p-6 space-y-6 border border-secondary/20">
      {parents.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-center text-muted-foreground/60 mb-4">Caregivers</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {parents.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2">
                <Node m={m} />
                {i === 0 && parents.length > 1 && <HeartIcon size={14} className="text-accent/60" />}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {(parents.length > 0 && children.length > 0) && (
        <div className="flex justify-center -my-2">
          <div className="w-px h-6 bg-secondary/30" />
        </div>
      )}

      {children.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-center text-muted-foreground/60 mb-4">Children</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {children.map((m) => <Node key={m.id} m={m} />)}
          </div>
        </div>
      )}
      
      {others.length > 0 && (
        <div className="pt-6 border-t border-secondary/10 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-center text-muted-foreground/60 mb-4">Extended Family</p>
          <div className="flex justify-center gap-3 flex-wrap">
            {others.map((m) => <Node key={m.id} m={m} />)}
          </div>
        </div>
      )}
      
      {members.length === 0 && <p className="text-center text-sm text-muted-foreground py-6">Add family members to see your tree.</p>}
    </div>
  );
}

function RiskChecker({ members }: { members: FamilyMember[] }) {
  const withGeno = useMemo(() => members.filter((m) => m.genotype), [members]);
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const ga = withGeno.find((m) => m.id === a)?.genotype as Genotype | undefined;
  const gb = withGeno.find((m) => m.id === b)?.genotype as Genotype | undefined;
  const outcomes = ga && gb ? offspringOutcomes(ga, gb) : null;

  if (withGeno.length < 2) {
    return (
      <div className="bg-card rounded-2xl border border-border/60 p-5 text-center space-y-3">
        <p className="text-sm text-muted-foreground">Add at least two family members with a known genotype, or use the standalone checker.</p>
        <Link href="/genotype-checker"><Button variant="outline" size="sm" className="rounded-xl">Open checker</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: a, set: setA, label: "Partner 1" },
          { v: b, set: setB, label: "Partner 2" },
        ].map(({ v, set, label }) => (
          <Select key={label} value={v} onValueChange={set as any}>
            <SelectTrigger className="h-12 rounded-xl border-primary/20"><SelectValue placeholder={label} /></SelectTrigger>
            <SelectContent>
              {withGeno.map((m) => <SelectItem key={m.id} value={m.id}>{m.fullName.split(" ")[0]} ({m.genotype})</SelectItem>)}
            </SelectContent>
          </Select>
        ))}
      </div>
      {outcomes && (
        <div className="bg-card rounded-2xl border border-border/60 p-5 grid grid-cols-3 gap-3 shadow-sm">
          {outcomes.map((o) => (
            <div key={o.genotype} className="text-center p-3 rounded-2xl bg-secondary/10 border border-secondary/10">
              <div className="text-2xl font-serif font-bold text-primary">{o.percent}%</div>
              <div className="text-[11px] font-bold text-secondary uppercase tracking-wider">{o.genotype}</div>
              <div className="text-[10px] text-muted-foreground leading-tight mt-1.5">{o.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Family() {
  const { data: members = [], isLoading } = useFamilyMembers();
  const del = useDeleteFamilyMember();

  const caregivers = members.filter((m) => ["Mother", "Father", "Partner", "Self"].includes(m.relationship || ""));
  const children = members.filter((m) => m.relationship === "Child");
  const others = members.filter((m) => !caregivers.includes(m) && !children.includes(m));

  return (
    <MobileAppShell>
      <SubPageHeader title="Family & Care" back="/dashboard" />
      <div className="px-5 pb-32 space-y-6">
        <Tabs defaultValue="tree" className="w-full">
          <TabsList className="grid grid-cols-2 w-full p-1 h-14 bg-muted/50 rounded-2xl">
            <TabsTrigger value="tree" className="rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Management</TabsTrigger>
            <TabsTrigger value="risk" className="rounded-xl h-full data-[state=active]:bg-white data-[state=active]:shadow-sm">Risk Tool</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tree" className="space-y-6 mt-6">
            <FamilyTree members={members} />
            
            <div className="space-y-6">
              {caregivers.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground ml-1">Caregivers</p>
                  <div className="space-y-2.5">
                    {caregivers.map((m) => (
                      <MemberCard key={m.id} m={m} onDelete={() => del.mutate(m.id)} />
                    ))}
                  </div>
                </div>
              )}

              {children.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground ml-1">Children & Dependents</p>
                  <div className="space-y-2.5">
                    {children.map((m) => (
                      <MemberCard key={m.id} m={m} onDelete={() => del.mutate(m.id)} />
                    ))}
                  </div>
                </div>
              )}

              {others.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted-foreground ml-1">Extended Family</p>
                  <div className="space-y-2.5">
                    {others.map((m) => (
                      <MemberCard key={m.id} m={m} onDelete={() => del.mutate(m.id)} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {isLoading && <p className="text-center text-sm text-muted-foreground py-10">Loading your family details…</p>}
            
            <div className="pt-4">
              <Link href="/family/add">
                <Button size="lg" className="w-full bg-secondary text-white hover:bg-secondary/90 h-14 rounded-2xl shadow-md transition-all active:scale-[0.98]">
                  <PlusIcon size={18} /> Add family member
                </Button>
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="risk" className="mt-6 space-y-6">
            <div className="bg-accent/5 rounded-[2rem] p-6 border border-accent/10">
               <h3 className="font-serif text-xl font-semibold text-primary mb-2">Genotype Risk Tool</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">Select two family members with known genotypes to calculate the statistical probability of sickle cell traits in offspring.</p>
            </div>
            <RiskChecker members={members} />
            <Link href="/genotype-checker">
              <Button variant="outline" className="w-full h-14 rounded-2xl border-primary/20 text-primary hover:bg-primary/5">Open Advanced Checker</Button>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </MobileAppShell>
  );
}