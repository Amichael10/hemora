import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import { useGetProfile, useUpdateProfile } from "@workspace/api-client-react";

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const GENOTYPES = ["AA", "AS", "AC", "SS", "SC", "CC"];
const GENDERS = ["Female", "Male", "Non-binary", "Prefer not to say"];

const LOCAL_KEY = "hemora.profileDraft";

export default function ProfileEdit() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { profileId } = useProfile();
  const { data: profile, isLoading } = useGetProfile(profileId, {
    query: { queryKey: ["profile", profileId], enabled: !!profileId },
  });
  const update = useUpdateProfile();

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    state: "",
    bloodType: "",
    genotype: "",
    heightCm: "",
    weightKg: "",
    allergies: "",
    conditions: "",
  });

  useEffect(() => {
    if (!profile) return;
    const local = (() => {
      try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "null"); } catch { return null; }
    })();
    setForm((prev) => ({
      ...prev,
      fullName: profile.fullName ?? local?.fullName ?? "",
      dateOfBirth: profile.dateOfBirth ?? local?.dateOfBirth ?? "",
      gender: profile.gender ?? local?.gender ?? "",
      country: profile.country ?? local?.country ?? "",
      state: profile.state ?? local?.state ?? "",
      bloodType: profile.bloodType ?? local?.bloodType ?? "",
      genotype: profile.genotype ?? local?.genotype ?? "",
      heightCm: profile.heightCm != null ? String(profile.heightCm) : local?.heightCm ?? "",
      weightKg: profile.weightKg != null ? String(profile.weightKg) : local?.weightKg ?? "",
      allergies: profile.allergies ?? local?.allergies ?? "",
      conditions: profile.conditions ?? local?.conditions ?? "",
    }));
  }, [profile]);

  const set = (k: keyof typeof form, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const onSave = async () => {
    if (!profileId) return;
    try {
      const payload = {
        fullName: form.fullName.trim() || undefined,
        dateOfBirth: form.dateOfBirth || null,
        gender: form.gender || null,
        country: form.country.trim() || null,
        state: form.state.trim() || null,
        bloodType: form.bloodType || null,
        genotype: form.genotype || null,
        heightCm: form.heightCm ? Number(form.heightCm) : null,
        weightKg: form.weightKg ? Number(form.weightKg) : null,
        allergies: form.allergies.trim() || null,
        conditions: form.conditions.trim() || null,
      };
      await update.mutateAsync({ id: profileId, data: payload });
      try { localStorage.setItem(LOCAL_KEY, JSON.stringify(form)); } catch {}
      toast({ title: "Profile saved", description: "Your details are up to date." });
      setLocation("/profile");
    } catch (e: any) {
      toast({ title: "Couldn't save", description: e?.message ?? "Try again", variant: "destructive" });
    }
  };

  return (
    <MobileAppShell>
      <SubPageHeader title="Edit profile" back="/profile" />
      <div className="px-5 pb-32 space-y-6">
        {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

        <section className="space-y-3">
          <p className="eyebrow">Personal</p>

          <div className="space-y-1.5">
            <Label>Full name</Label>
            <Input value={form.fullName} onChange={(e) => set("fullName", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Date of birth</Label>
            <Input type="date" value={form.dateOfBirth ?? ""} onChange={(e) => set("dateOfBirth", e.target.value)} />
          </div>

          <div className="space-y-1.5">
            <Label>Gender</Label>
            <Select value={form.gender} onValueChange={(v) => set("gender", v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Country</Label>
              <Input value={form.country} onChange={(e) => set("country", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Input value={form.state} onChange={(e) => set("state", e.target.value)} />
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <p className="eyebrow">Medical <span className="text-muted-foreground/70 font-normal">· optional</span></p>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Blood type</Label>
              <Select value={form.bloodType} onValueChange={(v) => set("bloodType", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {BLOOD_TYPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Genotype</Label>
              <Select value={form.genotype} onValueChange={(v) => set("genotype", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {GENOTYPES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Height (cm)</Label>
              <Input type="number" inputMode="decimal" value={form.heightCm} onChange={(e) => set("heightCm", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Weight (kg)</Label>
              <Input type="number" inputMode="decimal" value={form.weightKg} onChange={(e) => set("weightKg", e.target.value)} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Allergies</Label>
            <Textarea rows={2} value={form.allergies} onChange={(e) => set("allergies", e.target.value)} placeholder="e.g. Penicillin" />
          </div>

          <div className="space-y-1.5">
            <Label>Other conditions</Label>
            <Textarea rows={2} value={form.conditions} onChange={(e) => set("conditions", e.target.value)} placeholder="e.g. Asthma" />
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-background border-t border-border/60">
        <Button size="xl" className="w-full" onClick={onSave} disabled={update.isPending}>
          {update.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </MobileAppShell>
  );
}