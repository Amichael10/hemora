import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import {
  useGetProfile,
  useGetDashboardSummary,
  useListMedications,
  useListMedicationLogs,
  useListCareRecords,
  useCreateMedicationLog,
  getListMedicationLogsQueryKey,
  getGetDashboardSummaryQueryKey,
  CreateMedicationLogBodyStatus,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  SettingsLinear as Settings,
  EyeClosedLinear as EyeOff,
  AltArrowRightLinear as ArrowRight,
  PillBold as Pill,
  HeartPulseLinear as HeartPulse,
  DocumentTextLinear as DocText,
  AddCircleBold as Plus,
  ClockCircleBold as Clock,
  CheckCircleBold as Check,
  ChartLinear as Chart,
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
  const { profileId } = useProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [markingTaken, setMarkingTaken] = useState<number | null>(null);
  const [hideStats, setHideStats] = useState(false);

  const { data: profile, isLoading: loadingProfile } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId },
  });
  const { data: summary, isLoading: loadingSummary } = useGetDashboardSummary(
    { profileId },
    { query: { queryKey: getGetDashboardSummaryQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: meds, isLoading: loadingMeds } = useListMedications(
    { profileId },
    { query: { queryKey: ["/api/medications", profileId], enabled: !!profileId } }
  );
  const { data: logs } = useListMedicationLogs(
    { profileId },
    { query: { queryKey: getListMedicationLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: records } = useListCareRecords(
    { profileId },
    { query: { queryKey: ["/api/care-records", profileId], enabled: !!profileId } }
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
          scheduledAt: new Date().toISOString(),
          status: CreateMedicationLogBodyStatus.taken,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListMedicationLogsQueryKey({ profileId }) });
          queryClient.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey({ profileId }) });
          toast({ title: `${medName} marked as taken` });
        },
        onSettled: () => setMarkingTaken(null),
      }
    );
  };

  const adherencePct = summary?.overallAdherencePercent ?? 0;
  const nextMed = summary?.nextMedication;
  const recentCrisis = summary?.recentCrisisLog;
  const firstName = profile?.fullName.split(" ")[0] || "Friend";

  const sortedMeds = useMemo(() => {
    if (!meds) return [];
    return [...meds].sort((a, b) => (a.reminderTime || "99:99").localeCompare(b.reminderTime || "99:99"));
  }, [meds]);

  const missingProfileFields = useMemo(() => {
    if (!profile) return [] as string[];
    const m: string[] = [];
    if (!profile.dateOfBirth) m.push("date of birth");
    if (!profile.gender) m.push("gender");
    if (!profile.genotype) m.push("genotype");
    if (!profile.country) m.push("location");
    return m;
  }, [profile]);

  const totalToday = sortedMeds.length;
  const doneToday = sortedMeds.filter((m) => takenTodayIds.has(m.id)).length;
  const activeMeds = meds?.length ?? 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <MobileAppShell>
      <div className="flex flex-col min-h-full -mb-20 pb-24 bg-background">
        {/* ── BLUE HERO SECTION ───────────────────────────── */}
        <section
          className="relative px-5 pt-12 pb-16 text-white rounded-b-[28px]"
          style={{ background: "var(--gradient-brand)" }}
        >
          {/* Header */}
          <header className="flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-3 group">
              <Avatar className="w-11 h-11 ring-2 ring-white/30" data-testid="avatar-dashboard">
                {profile?.avatarUrl && (
                  <AvatarImage
                    src={profile.avatarUrl}
                    alt={profile.fullName || "Profile photo"}
                    referrerPolicy="no-referrer"
                  />
                )}
                <AvatarFallback className="font-serif font-semibold text-sm text-primary bg-white">
                  {getInitials(profile?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[12px] text-white/75 leading-tight">{getGreeting()},</p>
                {loadingProfile ? (
                  <Skeleton className="h-5 w-24 mt-0.5 bg-white/20" />
                ) : (
                  <p className="font-serif font-semibold text-[18px] leading-tight tracking-[-0.3px]">
                    {firstName}
                  </p>
                )}
              </div>
            </Link>
            <button
              onClick={() => setLocation("/settings")}
              aria-label="Settings"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/15 transition-colors"
            >
              <Settings size={18} />
            </button>
          </header>

          {/* Adherence summary */}
          <div className="mt-7">
            <Link
              href="/meds"
              className="inline-flex items-center gap-1 text-[13px] text-white/85 hover:text-white"
            >
              Today's care
              <ArrowRight size={12} />
            </Link>
            <div className="flex items-end justify-between mt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-serif font-semibold text-[34px] leading-none tracking-[-1px]">
                  {hideStats ? "•••" : `${doneToday}/${totalToday || 0}`}
                </span>
                <span className="text-[14px] text-white/80 font-medium">doses</span>
              </div>
              <button
                onClick={() => setHideStats((v) => !v)}
                aria-label="Toggle privacy"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/85 hover:bg-white/10"
              >
                <EyeOff size={18} />
              </button>
            </div>

            {/* progress bar */}
            <div className="mt-3 h-1.5 rounded-full bg-white/15 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/90 transition-all duration-700"
                style={{ width: `${totalToday ? (doneToday / totalToday) * 100 : 0}%` }}
              />
            </div>
          </div>

          {/* Stat cards row (like the reference's two cards) */}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 backdrop-blur-md bg-white/12 border border-white/20">
              <div className="flex items-center justify-between">
                <Pill size={18} color="white" />
                <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">
                  Active
                </span>
              </div>
              <p className="text-[11px] text-white/75 mt-3">Medications</p>
              <p className="font-serif font-semibold text-[22px] tracking-[-0.5px] leading-tight">
                {hideStats ? "•••" : activeMeds}
              </p>
            </div>
            <div className="rounded-2xl p-4 backdrop-blur-md bg-white/12 border border-white/20">
              <div className="flex items-center justify-between">
                <Chart size={18} color="white" />
                <span className="text-[10px] text-white/70 font-semibold tracking-wider uppercase">
                  Month
                </span>
              </div>
              <p className="text-[11px] text-white/75 mt-3">Adherence</p>
              <p className="font-serif font-semibold text-[22px] tracking-[-0.5px] leading-tight">
                {hideStats ? "•••" : `${adherencePct}%`}
              </p>
            </div>
          </div>

          {/* Quick actions row */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            <button
              onClick={() => setLocation("/meds")}
              className="rounded-2xl bg-white text-primary py-3 px-2 flex flex-col items-center gap-1.5 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-transform"
            >
              <Plus size={20} />
              <span className="text-[12px] font-semibold">Log dose</span>
            </button>
            <button
              onClick={() => setLocation("/crisis")}
              className="rounded-2xl bg-white text-primary py-3 px-2 flex flex-col items-center gap-1.5 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-transform"
            >
              <HeartPulse size={20} />
              <span className="text-[12px] font-semibold">Crisis</span>
            </button>
            <button
              onClick={() => setLocation("/records")}
              className="rounded-2xl bg-white text-primary py-3 px-2 flex flex-col items-center gap-1.5 shadow-[0_4px_18px_-6px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-transform"
            >
              <DocText size={20} />
              <span className="text-[12px] font-semibold">Records</span>
            </button>
          </div>
        </section>

        {/* ── WHITE SHEET ────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="sheet-surface flex-1 -mt-7 relative z-10 px-5 pt-7 pb-8 flex flex-col gap-7"
        >
          {/* drag handle */}
          <div className="mx-auto w-10 h-1 rounded-full bg-border -mt-3" />

          {/* Complete-profile reminder */}
          {missingProfileFields.length > 0 && (
            <motion.button
              variants={itemVariants}
              onClick={() => setLocation("/profile/edit")}
              className="w-full text-left rounded-2xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3 hover:bg-primary/10 transition-colors"
              data-testid="banner-complete-profile"
            >
              <div className="w-10 h-10 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                <Plus size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground">Finish your profile</p>
                <p className="text-[12px] text-muted-foreground truncate">
                  Add your {missingProfileFields.slice(0, 2).join(" & ")}
                  {missingProfileFields.length > 2 ? " and more" : ""} for better guidance.
                </p>
              </div>
              <ArrowRight size={14} />
            </motion.button>
          )}

          {/* Personalised tools by setupFor */}
          <motion.section variants={itemVariants} className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLocation("/genotype-checker")}
              className="text-left rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors"
            >
              <p className="text-[13px] font-semibold">Genotype checker</p>
              <p className="text-[11px] text-muted-foreground mt-1">See pregnancy outcomes for any pairing.</p>
            </button>
            {profile?.setupFor === "my_child" ? (
              <button
                onClick={() => setLocation("/school-letter")}
                className="text-left rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <p className="text-[13px] font-semibold">School letter</p>
                <p className="text-[11px] text-muted-foreground mt-1">Request accommodations for your child.</p>
              </button>
            ) : (
              <button
                onClick={() => setLocation("/family")}
                className="text-left rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <p className="text-[13px] font-semibold">Family tree</p>
                <p className="text-[11px] text-muted-foreground mt-1">Add relatives and check shared risk.</p>
              </button>
            )}
          </motion.section>

          <motion.section variants={itemVariants}>
            <button
              onClick={() => setLocation("/resources")}
              className="w-full text-left rounded-2xl border border-border/60 bg-card p-4 hover:border-primary/40 transition-colors flex items-center justify-between gap-3"
            >
              <div>
                <p className="text-[13px] font-semibold">Resources Library</p>
                <p className="text-[11px] text-muted-foreground mt-1">Trusted reads on SCD, treatment, and daily life.</p>
              </div>
              <ArrowRight size={14} />
            </button>
          </motion.section>

          {/* Next dose */}
          <motion.section variants={itemVariants}>
            <div className="flex items-end justify-between mb-3">
              <p className="eyebrow">Next dose</p>
              <Link
                href="/meds"
                className="text-[12px] font-semibold text-primary inline-flex items-center gap-0.5 hover:underline"
              >
                See all <ArrowRight size={12} />
              </Link>
            </div>

            {loadingSummary ? (
              <Skeleton className="h-24 w-full rounded-2xl" />
            ) : nextMed ? (
              <div className="rounded-2xl bg-card border border-border/60 p-4 flex items-center gap-4 shadow-[0_8px_24px_-16px_rgba(15,40,55,0.12)]">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Pill size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Clock size={12} />
                    <span className="text-[11px] font-semibold tracking-wide">
                      {formatTime(nextMed.reminderTime) || "Scheduled"}
                    </span>
                  </div>
                  <p className="font-serif font-semibold text-[17px] leading-tight tracking-[-0.3px] mt-0.5 text-foreground truncate">
                    {nextMed.name}
                  </p>
                  <p className="text-[12px] text-muted-foreground truncate">{nextMed.dose}</p>
                </div>
                <button
                  onClick={() => handleMarkTaken(nextMed.id, nextMed.name)}
                  disabled={markingTaken === nextMed.id || takenTodayIds.has(nextMed.id)}
                  className="shrink-0 h-10 px-4 rounded-full bg-primary text-primary-foreground text-[12px] font-semibold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                  data-testid="btn-mark-taken"
                >
                  {takenTodayIds.has(nextMed.id) ? "Taken ✓" : markingTaken === nextMed.id ? "…" : "Take"}
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-card border border-border/60 p-6 flex flex-col items-center gap-3 text-center">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Pill size={20} />
                </div>
                <p className="text-sm font-medium text-foreground">No medications scheduled</p>
                <Link
                  href="/meds"
                  className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-[13px] font-semibold inline-flex items-center"
                >
                  Add medication
                </Link>
              </div>
            )}
          </motion.section>

          {/* Today's schedule */}
          <motion.section variants={itemVariants}>
            <p className="eyebrow mb-3">Today's schedule</p>
            {loadingMeds ? (
              <div className="space-y-3">
                <Skeleton className="h-16 w-full rounded-2xl" />
                <Skeleton className="h-16 w-full rounded-2xl" />
              </div>
            ) : sortedMeds.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center">
                <p className="text-sm text-muted-foreground">Nothing scheduled today.</p>
              </div>
            ) : (
              <ol className="space-y-2.5">
                {sortedMeds.slice(0, 5).map((med) => {
                  const done = takenTodayIds.has(med.id);
                  return (
                    <li
                      key={med.id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border transition-colors ${
                        done ? "border-border/40" : "border-border/60 hover:border-primary/40"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          done ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {done ? <Check size={16} /> : <Pill size={16} />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[10px] font-bold tracking-wider uppercase ${done ? "text-muted-foreground" : "text-primary"}`}>
                          {formatTime(med.reminderTime) || med.frequency}
                        </p>
                        <p className={`text-[14px] font-semibold mt-0.5 truncate ${done ? "text-muted-foreground line-through decoration-muted-foreground/40" : "text-foreground"}`}>
                          {med.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">{med.dose}</p>
                      </div>
                      {!done && (
                        <button
                          onClick={() => handleMarkTaken(med.id, med.name)}
                          disabled={markingTaken === med.id}
                          className="shrink-0 h-8 px-3 rounded-full text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/15 transition-colors disabled:opacity-50"
                        >
                          {markingTaken === med.id ? "…" : "Take"}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ol>
            )}
          </motion.section>

          {/* Recent activity */}
          <motion.section variants={itemVariants}>
            <p className="eyebrow mb-3">Recent</p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/crisis"
                className="p-4 rounded-2xl bg-card border border-border/60 hover:border-destructive/40 transition-colors"
                data-testid="btn-crisis-strip"
              >
                <div className="w-9 h-9 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mb-3">
                  <HeartPulse size={16} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground">
                  Last crisis
                </p>
                {loadingSummary ? (
                  <Skeleton className="h-5 w-20 mt-1.5" />
                ) : recentCrisis ? (
                  <>
                    <p className="font-serif font-semibold text-[15px] text-foreground mt-1">
                      {new Date(recentCrisis.occurredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 capitalize truncate">
                      {recentCrisis.painLevel}
                      {recentCrisis.painLocations?.length ? ` · ${recentCrisis.painLocations[0]}` : ""}
                    </p>
                  </>
                ) : (
                  <p className="font-serif font-semibold text-[15px] text-foreground mt-1">None logged</p>
                )}
              </Link>

              <Link
                href="/records"
                className="p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-colors"
                data-testid="btn-records-strip"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <DocText size={16} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-muted-foreground">
                  Records
                </p>
                {records === undefined ? (
                  <Skeleton className="h-6 w-10 mt-1.5" />
                ) : (
                  <p className="font-serif font-semibold text-[18px] text-foreground mt-1">
                    {records.length}
                    <span className="text-[11px] font-normal text-muted-foreground ml-1.5">saved</span>
                  </p>
                )}
              </Link>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </MobileAppShell>
  );
}
