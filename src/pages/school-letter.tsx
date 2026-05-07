import { useEffect, useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import { useGetProfile } from "@workspace/api-client-react";
import { exportSchoolLetterToPdf } from "@/lib/profilePdf";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_ACCOMMODATIONS = [
  "Rest breaks when needed",
  "Free access to water and hydration",
  "Permission to use the restroom freely",
  "Avoid extreme heat or extended outdoor exertion",
  "Permission to take prescribed medication on time",
  "Notify parents at the first sign of pain or fever",
];

export default function SchoolLetter() {
  const { profileId } = useProfile();
  const { user } = useAuth();
  const { data: profile } = useGetProfile(profileId, { query: { queryKey: ["profile", profileId], enabled: !!profileId } });
  const { toast } = useToast();

  const [form, setForm] = useState({
    childName: "",
    childAge: "",
    genotype: "",
    schoolName: "",
    schoolAddress: "",
    additionalNotes: "",
    parentName: "",
    parentContact: "",
  });
  const [picked, setPicked] = useState<string[]>(DEFAULT_ACCOMMODATIONS);

  useEffect(() => {
    if (!profile) return;
    setForm((s) => ({
      ...s,
      childName: s.childName || profile.fullName || "",
      genotype: s.genotype || profile.genotype || "",
      parentContact: s.parentContact || user?.email || "",
    }));
  }, [profile, user]);

  const toggle = (item: string) =>
    setPicked((p) => (p.includes(item) ? p.filter((x) => x !== item) : [...p, item]));

  const onExport = async () => {
    if (!form.childName || !form.schoolName) {
      toast({ title: "Please fill child name and school", variant: "destructive" });
      return;
    }
    try {
      await exportSchoolLetterToPdf({
        childName: form.childName,
        childAge: form.childAge,
        genotype: form.genotype,
        schoolName: form.schoolName,
        schoolAddress: form.schoolAddress,
        accommodations: picked,
        additionalNotes: form.additionalNotes,
        parentName: form.parentName,
        parentContact: form.parentContact,
      });
      toast({ title: "Letter downloaded" });
    } catch (e: any) {
      toast({ title: "Export failed", description: e?.message, variant: "destructive" });
    }
  };

  const set = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v });

  return (
    <MobileAppShell>
      <SubPageHeader title="School accommodation letter" back="/dashboard" />
      <div className="px-5 pb-32 space-y-5">
        <p className="text-sm text-muted-foreground">
          A letter you can send to your child's school requesting reasonable accommodations for sickle cell.
        </p>

        <section className="space-y-3">
          <p className="eyebrow">Student details</p>
          <div><Label>Child's full name</Label><Input value={form.childName} onChange={(e) => set("childName", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Age</Label><Input value={form.childAge} onChange={(e) => set("childAge", e.target.value)} /></div>
            <div><Label>Genotype</Label><Input value={form.genotype} onChange={(e) => set("genotype", e.target.value)} /></div>
          </div>
        </section>

        <section className="space-y-3">
          <p className="eyebrow">School</p>
          <div><Label>School name</Label><Input value={form.schoolName} onChange={(e) => set("schoolName", e.target.value)} /></div>
          <div><Label>School address</Label><Textarea rows={2} value={form.schoolAddress} onChange={(e) => set("schoolAddress", e.target.value)} /></div>
        </section>

        <section className="space-y-2">
          <p className="eyebrow">Key support needs</p>
          <div className="bg-card rounded-2xl border border-border/60 divide-y divide-border/60">
            {DEFAULT_ACCOMMODATIONS.map((item) => (
              <label key={item} className="flex items-start gap-3 p-3 cursor-pointer">
                <Checkbox checked={picked.includes(item)} onCheckedChange={() => toggle(item)} />
                <span className="text-sm leading-snug">{item}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div><Label>Additional notes (optional)</Label><Textarea rows={3} value={form.additionalNotes} onChange={(e) => set("additionalNotes", e.target.value)} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Parent name</Label><Input value={form.parentName} onChange={(e) => set("parentName", e.target.value)} /></div>
            <div><Label>Contact</Label><Input value={form.parentContact} onChange={(e) => set("parentContact", e.target.value)} /></div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-background border-t border-border/60">
        <Button size="xl" className="w-full" onClick={onExport}>Download letter PDF</Button>
      </div>
    </MobileAppShell>
  );
}