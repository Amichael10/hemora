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

const RELATIONSHIPS = ["Self", "Partner", "Mother", "Father", "Child", "Sibling", "Grandparent", "Other"];

function MemberCard({ m, onDelete }: { m: FamilyMember; onDelete: () => void }) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4 flex items-center gap-3">
      <div className="w-11 h-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-serif font-semibold">
        {m.fullName.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm truncate">{m.fullName}</p>
          {m.genotype && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">{m.genotype}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{m.relationship || "Family"}</p>
      </div>
      <button onClick={onDelete} className="text-muted-foreground hover:text-destructive p-2"><TrashIcon size={16} /></button>
    </div>
  );
}

function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ fullName: "", relationship: "", genotype: "", dateOfBirth: "" });
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
      setForm({ fullName: "", relationship: "", genotype: "", dateOfBirth: "" });
      setOpen(false);
      toast({ title: "Family member added" });
    } catch (e: any) {
      toast({ title: "Couldn't add", description: e.message, variant: "destructive" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full"><PlusIcon size={16} /> Add family member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Add family member</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Full name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></div>
          <div><Label>Relationship</Label>
            <Select value={form.relationship} onValueChange={(v) => setForm({ ...form, relationship: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{RELATIONSHIPS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Genotype (optional)</Label>
            <Select value={form.genotype} onValueChange={(v) => setForm({ ...form, genotype: v })}>
              <SelectTrigger><SelectValue placeholder="Unknown" /></SelectTrigger>
              <SelectContent>{GENOTYPES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div><Label>Date of birth (optional)</Label><Input type="date" value={form.dateOfBirth} onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })} /></div>
          <Button className="w-full" onClick={submit} disabled={create.isPending}>{create.isPending ? "Saving…" : "Add"}</Button>
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
    <div className="bg-card border border-border/60 rounded-xl px-3 py-2 min-w-[110px] text-center shadow-sm">
      <p className="text-[12px] font-semibold truncate">{m.fullName.split(" ")[0]}</p>
      <p className="text-[10px] text-muted-foreground">{m.relationship || "—"}</p>
      {m.genotype && <span className="inline-block mt-1 text-[10px] font-bold text-primary bg-primary/10 px-1.5 rounded">{m.genotype}</span>}
    </div>
  );

  return (
    <div className="bg-secondary/30 rounded-2xl p-5 space-y-4">
      {parents.length > 0 && (
        <>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {parents.slice(0, 2).map((m, i) => (
              <div key={m.id} className="flex items-center gap-2">
                <Node m={m} />
                {i === 0 && parents.length > 1 && <HeartIcon size={16} color="hsl(var(--accent))" />}
              </div>
            ))}
          </div>
          {children.length > 0 && <div className="flex justify-center"><div className="w-px h-4 bg-border" /></div>}
        </>
      )}
      {children.length > 0 && (
        <div className="flex justify-center gap-2 flex-wrap">
          {children.map((m) => <Node key={m.id} m={m} />)}
        </div>
      )}
      {others.length > 0 && (
        <div className="pt-3 border-t border-border/60 flex justify-center gap-2 flex-wrap">
          {others.map((m) => <Node key={m.id} m={m} />)}
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
        <Link href="/genotype-checker"><Button variant="outline" size="sm">Open checker</Button></Link>
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
            <SelectTrigger><SelectValue placeholder={label} /></SelectTrigger>
            <SelectContent>
              {withGeno.map((m) => <SelectItem key={m.id} value={m.id}>{m.fullName.split(" ")[0]} ({m.genotype})</SelectItem>)}
            </SelectContent>
          </Select>
        ))}
      </div>
      {outcomes && (
        <div className="bg-card rounded-2xl border border-border/60 p-4 grid grid-cols-3 gap-2">
          {outcomes.map((o) => (
            <div key={o.genotype} className="text-center p-2 rounded-lg bg-secondary/40">
              <div className="text-xl font-serif font-bold">{o.percent}%</div>
              <div className="text-xs font-semibold">{o.genotype}</div>
              <div className="text-[10px] text-muted-foreground leading-tight mt-1">{o.label}</div>
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

  return (
    <MobileAppShell>
      <SubPageHeader title="Family" back="/dashboard" />
      <div className="px-5 pb-32 space-y-5">
        <Tabs defaultValue="tree">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="tree">Family tree</TabsTrigger>
            <TabsTrigger value="risk">Risk checker</TabsTrigger>
          </TabsList>
          <TabsContent value="tree" className="space-y-4 mt-4">
            <FamilyTree members={members} />
            {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
              <div className="space-y-2">
                {members.map((m) => (
                  <MemberCard key={m.id} m={m} onDelete={() => del.mutate(m.id)} />
                ))}
              </div>
            )}
            <Link href="/family/add">
              <Button size="lg" className="w-full"><PlusIcon size={16} /> Add family member</Button>
            </Link>
          </TabsContent>
          <TabsContent value="risk" className="mt-4 space-y-4">
            <p className="text-sm text-muted-foreground">Pick two members to see possible outcomes for each pregnancy.</p>
            <RiskChecker members={members} />
            <Link href="/genotype-checker">
              <Button variant="outline" className="w-full">Use standalone checker</Button>
            </Link>
          </TabsContent>
        </Tabs>
      </div>
    </MobileAppShell>
  );
}