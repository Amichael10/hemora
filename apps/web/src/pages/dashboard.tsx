import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import { Droplet, Heart, FileText, Syringe, FlaskConical, Building2, NotebookPen } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  useGetProfile,
  useGetDashboardSummary,
  useListMedications,
  useListMedicationLogs,
  useListCareRecords,
  useCreateMedicationLog,
  CreateMedicationLogBodyStatus,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  SettingsLinear as Settings,
  AltArrowRightLinear as ArrowRight,
  PillBold as Pill,
  HeartPulseLinear as HeartPulse,
  AddCircleBold as Plus,
  ClockCircleLinear as Clock,
  CheckCircleBold as Check,
  StethoscopeLinear as Stethoscope,
  TestTubeBold as TransfusionIcon,
  UserLinear as UserIcon,
  UsersGroupRoundedLinear as FamilyIcon,
  BellLinear as Bell,
  DocumentTextBold as SummaryIcon,
  ShieldCheckBold as ShieldIcon,
  BookLinear as ResourcesIcon,
} from "solar-icon-set";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function getInitials(name?: string) {
  if (!name) return "K";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function formatTime(t?: string | null) {
  if (!t) return "—";
  const m = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!m) {
    const d = new Date(t);
    if (!isNaN(d.getTime())) return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    return t;
  }
  const h = parseInt(m[1], 10);
  const min = m[2];
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${min} ${ampm}`;
}

export default function Dashboard() {
  const { profileId, activeProfileId, setActiveProfileId, familyMembers } = useProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [markingTaken, setMarkingTaken] = useState<number | null>(null);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  const { data: profile, isLoading: loadingProfile } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId },
  });
  const activeMember = familyMembers.find(m => m.id === activeProfileId);

  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary(
    activeProfileId,
    { query: { queryKey: ["dashboard-summary", activeProfileId], enabled: !!activeProfileId } }
  );
  const { data: meds, isLoading: loadingMeds } = useListMedications(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medications", activeProfileId], enabled: !!activeProfileId } }
  );
  const { data: logs } = useListMedicationLogs(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medication-logs", activeProfileId], enabled: !!activeProfileId } }
  );

  const createLog = useCreateMedicationLog();

  const todayStr = new Date().toDateString();
  const takenTodayIds = new Set(
    (logs || [])
      .filter((l) => l.status === "taken" && new Date(l.scheduledAt).toDateString() === todayStr)
      .map((l) => l.medicationId)
  );

  const handleMarkTaken = (medId: number, medName: string) => {
    setMarkingTaken(medId);
    createLog.mutate(
      {
        data: {
          medicationId: medId,
          profileId,
          familyMemberId: activeProfileId,
          scheduledAt: new Date().toISOString(),
          status: CreateMedicationLogBodyStatus.taken,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["medication-logs", activeProfileId] });
          queryClient.invalidateQueries({ queryKey: ["dashboard-summary", activeProfileId] });
          toast({ title: `${medName} marked as taken` });
        },
        onSettled: () => setMarkingTaken(null),
      }
    );
  };

  const sortedMeds = useMemo(() => {
    if (!meds) return [];
    return [...meds].sort((a, b) => (a.reminderTime || "99:99").localeCompare(b.reminderTime || "99:99"));
  }, [meds]);

  const totalToday = sortedMeds.length;
  const doneToday = sortedMeds.filter((m) => takenTodayIds.has(m.id)).length;

  const firstName = activeMember?.fullName.split(" ")[0] || profile?.fullName?.split(" ")[0] || "Friend";

  const missingProfileFields = useMemo(() => {
    if (!profile) return [] as string[];
    const m: string[] = [];
    if (!profile.dateOfBirth) m.push("date of birth");
    if (!profile.gender) m.push("gender");
    if (!profile.genotype) m.push("genotype");
    if (!profile.country) m.push("location");
    return m;
  }, [profile]);

  // Today's hydration from summary vitals
  const hydrationToday = summary?.latestVitals ? 6 : 0; // fallback display
  const hydrationTarget = 8;
  const painLevel = summary?.recentCrisisLog ? 2 : 0;

  // Quick log items
  const quickLogItems = [
    { label: "Fever & Vitals", icon: <Stethoscope size={22} />, color: "bg-secondary/15 text-secondary", route: "/vitals" },
    { label: "Hydration", icon: <Droplet size={22} className="fill-current" />, color: "bg-primary/10 text-primary", route: "/hydration" },
    { label: "Pain", icon: <Heart size={22} className="fill-current" />, color: "bg-destructive/10 text-destructive", route: "/crisis" },
    { label: "Medications", icon: <Pill size={22} />, color: "bg-accent/15 text-accent", route: "/meds" },
    { label: "Transfusion", icon: <Syringe size={22} />, color: "bg-primary/10 text-primary", route: "/transfusion" },
    { label: "Iron & ferritin", icon: <FlaskConical size={22} />, color: "bg-secondary/15 text-secondary", route: "/iron-monitoring" },
    { label: "Hospital Visit", icon: <Building2 size={22} />, color: "bg-accent/15 text-accent", route: "/records" },
    { label: "Care Notes", icon: <NotebookPen size={22} />, color: "bg-muted text-foreground", route: "/records" },
  ];

  return (
    <MobileAppShell>
      <div className="flex flex-col min-h-full pb-24">

        {/* ── TOP BAR ──────────────────────────────────────── */}
        <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-md px-5 py-3 flex items-center justify-between border-b border-border/30">
          <Sheet open={isSwitcherOpen} onOpenChange={setIsSwitcherOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center gap-3 active:scale-95 transition-transform text-left">
                <Avatar className="w-9 h-9 ring-2 ring-primary/20">
                  <AvatarFallback className="font-serif font-bold text-xs bg-primary text-primary-foreground">
                    {getInitials(activeMember?.fullName || profile?.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-none mb-0.5">
                    {activeMember?.isSelf ? "My Profile" : activeMember?.relationship ?? "Care Profile"}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="font-serif font-semibold text-sm truncate max-w-[120px]">
                      {activeMember?.fullName || firstName}
                    </p>
                    <Plus size={10} className="rotate-45 text-muted-foreground/60" />
                  </div>
                </div>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-[32px] border-none px-6 pb-10 bg-background shadow-2xl">
              <SheetHeader className="mb-6">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-border mb-4" />
                <SheetTitle className="font-serif text-2xl text-left">Switch Care Profile</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3">
                {familyMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={() => {
                      setActiveProfileId(member.id);
                      setIsSwitcherOpen(false);
                      toast({
                        title: `Switched to ${member.fullName.split(" ")[0]}`,
                        description: member.isSelf ? "Main account active" : `Viewing ${member.relationship}'s care data`
                      });
                    }}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      activeProfileId === member.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary/10"
                        : "border-border/60 bg-card hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className={`${activeProfileId === member.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                          {getInitials(member.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{member.fullName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{member.relationship || "Self"}</p>
                      </div>
                    </div>
                    {activeProfileId === member.id && <Check size={18} className="text-primary" />}
                  </button>
                ))}
                <button
                  onClick={() => { setLocation("/family/add"); setIsSwitcherOpen(false); }}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-dashed border-border hover:border-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Plus size={20} />
                  </div>
                  <span className="text-sm font-semibold">Add family member</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLocation("/notifications")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-background" />
            </button>
            <button
              onClick={() => setLocation("/settings")}
              className="w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* ── WELCOME HEADER ───────────────────────────────── */}
        <section className="px-5 pt-6 pb-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {loadingProfile ? (
              <Skeleton className="h-8 w-44 rounded-xl mb-1" />
            ) : (
              <h1 className="font-serif text-[26px] text-foreground leading-tight tracking-tight">
                Welcome back,<br />
                <span className="text-primary">{firstName}</span>
              </h1>
            )}
            <p className="text-sm text-muted-foreground mt-1">{getGreeting()} — here's your care summary</p>
          </motion.div>
        </section>

        {/* ── TODAY'S CARE OVERVIEW ────────────────────────── */}
        <section className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-[1.5px] text-primary/60">Today's Care Overview</h2>
            <button onClick={() => setLocation("/crisis")} className="text-[11px] text-primary font-bold flex items-center gap-0.5 hover:underline">
              Details <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Hydration */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setLocation("/hydration")}
              className="bg-card rounded-[20px] p-3.5 flex flex-col items-center gap-2 border border-border/40 shadow-sm hover:border-primary/30 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                <Droplet size={18} className="text-primary fill-primary/40" />
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-base text-foreground leading-none">
                  {loadingSummary ? "—" : `${hydrationToday}/${hydrationTarget}`}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">cups</p>
              </div>
              <p className="text-[10px] font-semibold text-foreground/70 text-center">Hydration</p>
            </motion.button>

            {/* Pain Level */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setLocation("/crisis")}
              className="bg-card rounded-[20px] p-3.5 flex flex-col items-center gap-2 border border-border/40 shadow-sm hover:border-destructive/30 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                <Heart size={18} className="text-destructive fill-destructive/40" />
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-base text-foreground leading-none">
                  {loadingSummary ? "—" : `${painLevel}/10`}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">score</p>
              </div>
              <p className="text-[10px] font-semibold text-foreground/70 text-center">Pain Level</p>
            </motion.button>

            {/* Medications */}
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setLocation("/meds")}
              className="bg-card rounded-[20px] p-3.5 flex flex-col items-center gap-2 border border-border/40 shadow-sm hover:border-accent/30 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                <Pill size={18} className="text-accent" />
              </div>
              <div className="text-center">
                <p className="font-serif font-bold text-base text-foreground leading-none">
                  {loadingMeds ? "—" : `${doneToday}/${totalToday}`}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">taken</p>
              </div>
              <p className="text-[10px] font-semibold text-foreground/70 text-center">Medications</p>
            </motion.button>
          </div>
        </section>

        {/* ── QUICK LOG ────────────────────────────────────── */}
        <section className="px-5 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[1.5px] text-primary/60 mb-3">Quick Log</h2>

          <div className="grid grid-cols-4 gap-2">
            {quickLogItems.map((item) => (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.92 }}
                onClick={() => setLocation(item.route)}
                className="flex flex-col items-center gap-1.5 active:opacity-80 transition-opacity"
              >
                <div className={`w-14 h-14 rounded-[18px] ${item.color} flex items-center justify-center shadow-sm`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold text-foreground/80 text-center leading-tight">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ── TODAY'S SCHEDULE ─────────────────────────────── */}
        <section className="px-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-[1.5px] text-primary/60">Today's Schedule</h2>
            <Link href="/meds" className="text-[11px] font-bold text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight size={12} />
            </Link>
          </div>

          {loadingMeds ? (
            <div className="space-y-2.5">
              <Skeleton className="h-[72px] w-full rounded-2xl" />
              <Skeleton className="h-[72px] w-full rounded-2xl" />
            </div>
          ) : sortedMeds.length === 0 ? (
            <div className="bg-card border border-dashed border-border/60 rounded-2xl p-6 text-center">
              <Pill size={28} className="mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground font-medium mb-2">No medications scheduled today.</p>
              <Button variant="link" onClick={() => setLocation("/meds")} className="text-primary font-bold text-sm p-0 h-auto">
                Add Medication
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {sortedMeds.slice(0, 3).map((med) => {
                const done = takenTodayIds.has(med.id);
                return (
                  <motion.div
                    key={med.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`px-4 py-3 rounded-2xl border flex items-center gap-3 transition-all ${
                      done ? "bg-muted/30 border-transparent opacity-60" : "bg-card border-border/40 shadow-sm"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      done ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                    }`}>
                      {done ? <Check size={18} /> : <Pill size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <Clock size={11} className="text-muted-foreground" />
                        <span className="text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
                          {formatTime(med.reminderTime)}
                        </span>
                      </div>
                      <p className={`font-semibold text-sm leading-tight ${done ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {med.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{med.dose}</p>
                    </div>
                    {!done && (
                      <button
                        onClick={() => handleMarkTaken(med.id, med.name)}
                        disabled={markingTaken === med.id}
                        className="h-9 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider text-primary-foreground bg-primary shadow-sm active:scale-95 transition-all disabled:opacity-50"
                      >
                        {markingTaken === med.id ? "…" : "Take"}
                      </button>
                    )}
                  </motion.div>
                );
              })}
              {sortedMeds.length > 3 && (
                <button onClick={() => setLocation("/meds")} className="text-center text-xs text-primary font-bold py-2 hover:underline">
                  +{sortedMeds.length - 3} more medications
                </button>
              )}
            </div>
          )}
        </section>

        {/* ── CARE SUMMARY ─────────────────────────────────── */}
        <section className="px-5 mb-6">
          <div className="bg-card border border-border/40 rounded-[24px] p-5 shadow-sm relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-primary/5 rounded-full blur-2xl" />
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <SummaryIcon size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-foreground">Care Summary</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  Generate a summary for your next clinic visit.
                </p>
              </div>
            </div>
            <Button
              className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-sm"
              onClick={() => setLocation("/crisis-insights")}
            >
              Generate Summary <ArrowRight size={14} className="ml-1.5" />
            </Button>
          </div>
        </section>

        {/* ── SECONDARY TOOLKIT CHIPS ──────────────────────── */}
        <section className="mb-6">
          <div className="px-5 mb-3">
            <h2 className="text-xs font-bold uppercase tracking-[1.5px] text-primary/60">More Tools</h2>
          </div>
          <div className="flex gap-2.5 overflow-x-auto px-5 pb-1 scrollbar-hide">
            {[
              { label: "Directory", icon: <ResourcesIcon size={15} className="text-secondary" />, route: "/directory" },
              { label: "Genotype Check", icon: <ShieldIcon size={15} className="text-primary" />, route: "/genotype-checker" },
              { label: "Family Tree", icon: <FamilyIcon size={15} className="text-accent" />, route: "/family" },
              { label: "Resources", icon: <ResourcesIcon size={15} className="text-secondary" />, route: "/resources" },
              { label: "Emergency", icon: <Heart size={15} className="text-destructive fill-destructive" />, route: "/emergency" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setLocation(item.route)}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-card border border-border/40 shadow-sm active:scale-95 transition-all hover:border-primary/30"
              >
                {item.icon}
                <span className="text-xs font-semibold whitespace-nowrap text-foreground">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── FINISH PROFILE BANNER ────────────────────────── */}
        <AnimatePresence>
          {missingProfileFields.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="px-5 mb-4"
            >
              <button
                onClick={() => setLocation("/profile/edit")}
                className="w-full relative overflow-hidden rounded-[24px] p-5 text-left border border-accent/30 group"
              >
                <div className="absolute inset-0 bg-accent/5 transition-colors group-hover:bg-accent/10" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20 shrink-0">
                    <UserIcon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm mb-0.5">Complete your care profile</h4>
                    <p className="text-[11px] text-muted-foreground leading-tight">
                      Add {missingProfileFields.slice(0, 2).join(" & ")} for personalized insights.
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-accent shrink-0" />
                </div>
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </MobileAppShell>
  );
}
