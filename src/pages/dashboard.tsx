import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  BellLinear as Bell,
  CheckCircleBold as Check,
  PillBold as Pill,
  ClockCircleLinear as Clock,
  AltArrowRightLinear as ArrowRight,
  HeartPulseLinear as HeartPulse,
  DocumentTextLinear as DocText,
} from "solar-icon-set";
import { bottleForMedication } from "@/lib/medBottle";

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
  // Accept "HH:MM" or ISO; render as "8:00 AM"
  const m = /^(\d{1,2}):(\d{2})/.exec(t);
  if (!m) {
    const d = new Date(t);
    if (!isNaN(d.getTime())) {
      return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    }
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

  // Sort today's schedule by reminderTime
  const sortedMeds = useMemo(() => {
    if (!meds) return [];
    return [...meds].sort((a, b) => {
      const ta = a.reminderTime || "99:99";
      const tb = b.reminderTime || "99:99";
      return ta.localeCompare(tb);
    });
  }, [meds]);

  const totalToday = sortedMeds.length;
  const doneToday = sortedMeds.filter((m) => takenTodayIds.has(m.id)).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

  return (
    <MobileAppShell>
      <div className="flex flex-col min-h-full -mb-20 pb-24 bg-background">
        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex justify-between items-center px-5 pt-12 pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[1.5px] text-muted-foreground">
              {getGreeting()}
            </p>
            {loadingProfile ? (
              <Skeleton className="h-8 w-32 mt-1.5" />
            ) : (
              <h1
                className="font-serif font-semibold text-[26px] leading-tight tracking-[-0.5px] mt-1 text-foreground"
                data-testid="dashboard-greeting"
              >
                {firstName}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-foreground/70 bg-secondary hover:bg-secondary/70 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <Link href="/profile">
              <Avatar
                className="w-10 h-10 cursor-pointer ring-2 ring-secondary"
                data-testid="avatar-dashboard"
              >
                <AvatarFallback className="font-serif font-semibold text-sm text-primary bg-primary/10">
                  {getInitials(profile?.fullName)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-7 px-5"
        >
          {/* ── HERO: Next medication ───────────────────────── */}
          <motion.section variants={itemVariants}>
            <div className="flex items-end justify-between mb-3">
              <p className="eyebrow">Next dose</p>
              {totalToday > 0 && (
                <p className="text-[11px] font-semibold text-muted-foreground">
                  {doneToday} of {totalToday} taken today
                </p>
              )}
            </div>

            {loadingSummary ? (
              <Skeleton className="h-44 w-full rounded-3xl" />
            ) : nextMed ? (
              <div className="relative overflow-hidden rounded-3xl bg-card border border-border/60 shadow-[0_8px_32px_-12px_rgba(15,40,55,0.08)]">
                {/* Subtle teal corner accent */}
                <div
                  className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-60 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, hsl(var(--brand-teal-soft)) 0%, transparent 70%)",
                  }}
                />
                <img
                  src={bottleForMedication(nextMed.name)}
                  alt=""
                  aria-hidden="true"
                  className="absolute pointer-events-none select-none"
                  style={{
                    right: -8,
                    top: 8,
                    height: 150,
                    width: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 12px 20px rgba(15,40,55,0.18))",
                    transform: "rotate(-18deg)",
                    zIndex: 0,
                  }}
                  data-testid="img-med-bottle"
                />

                <div className="relative p-6 pr-32">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Clock size={14} />
                    <span className="text-[12px] font-semibold tracking-wide">
                      {formatTime(nextMed.reminderTime) || "Scheduled"}
                    </span>
                  </div>
                  <p className="font-serif font-semibold text-[28px] leading-tight tracking-[-0.5px] mt-2 text-foreground">
                    {nextMed.name}
                  </p>
                  <p className="text-[14px] text-muted-foreground mt-0.5">{nextMed.dose}</p>

                  <div className="flex items-center gap-2 mt-5">
                    <button
                      className="h-11 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                      onClick={() => handleMarkTaken(nextMed.id, nextMed.name)}
                      disabled={markingTaken === nextMed.id || takenTodayIds.has(nextMed.id)}
                      data-testid="btn-mark-taken"
                    >
                      {takenTodayIds.has(nextMed.id)
                        ? "Taken ✓"
                        : markingTaken === nextMed.id
                          ? "Saving…"
                          : "Mark taken"}
                    </button>
                    <button
                      className="h-11 px-4 rounded-full text-sm font-semibold text-foreground/70 hover:bg-secondary transition-colors"
                      onClick={() => setLocation("/meds")}
                      data-testid="btn-snooze"
                    >
                      Snooze
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-card border border-border/60 p-8 flex flex-col items-center gap-3 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Pill size={22} />
                </div>
                <p className="text-sm font-medium text-foreground">No medications scheduled</p>
                <Link
                  href="/meds"
                  className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center"
                >
                  Add medication
                </Link>
              </div>
            )}
          </motion.section>

          {/* ── Today's Schedule (timeline) ─────────────────── */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center justify-between mb-3">
              <p className="eyebrow">Today's schedule</p>
              <Link
                href="/meds"
                className="text-[12px] font-semibold text-primary inline-flex items-center gap-0.5 hover:underline"
              >
                See all <ArrowRight size={12} />
              </Link>
            </div>

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
              <ol className="relative">
                {/* vertical timeline rail */}
                <div className="absolute left-[15px] top-3 bottom-3 w-px bg-border/70" />
                {sortedMeds.slice(0, 5).map((med) => {
                  const done = takenTodayIds.has(med.id);
                  return (
                    <li key={med.id} className="relative pl-10 py-2.5">
                      {/* dot */}
                      <span
                        className={`absolute left-[8px] top-[18px] w-[15px] h-[15px] rounded-full border-2 ${
                          done
                            ? "bg-primary border-primary"
                            : "bg-background border-border"
                        } flex items-center justify-center`}
                      >
                        {done && <Check size={9} color="white" />}
                      </span>

                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-card border transition-colors ${
                          done ? "border-border/40" : "border-border/60 hover:border-primary/40"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p
                              className={`text-[10px] font-bold tracking-wider uppercase ${
                                done ? "text-muted-foreground" : "text-primary"
                              }`}
                            >
                              {formatTime(med.reminderTime) || med.frequency}
                            </p>
                          </div>
                          <p
                            className={`text-[15px] font-semibold mt-0.5 truncate ${
                              done
                                ? "text-muted-foreground line-through decoration-muted-foreground/40"
                                : "text-foreground"
                            }`}
                          >
                            {med.name}
                          </p>
                          <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
                            {med.dose}
                          </p>
                        </div>
                        {!done && (
                          <button
                            onClick={() => handleMarkTaken(med.id, med.name)}
                            disabled={markingTaken === med.id}
                            className="shrink-0 h-9 px-3.5 rounded-full text-[12px] font-semibold text-primary bg-primary/10 hover:bg-primary/15 transition-colors disabled:opacity-50"
                          >
                            {markingTaken === med.id ? "…" : "Take"}
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </motion.section>

          {/* ── Quick links ─────────────────────────────────── */}
          <motion.section variants={itemVariants} className="grid grid-cols-2 gap-3">
            <Link
              href="/crisis"
              className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-destructive/40 transition-colors"
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
                  <p className="font-serif font-semibold text-[16px] text-foreground mt-1">
                    {new Date(recentCrisis.occurredAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 capitalize truncate">
                    {recentCrisis.painLevel}
                    {recentCrisis.painLocations?.length
                      ? ` · ${recentCrisis.painLocations[0]}`
                      : ""}
                  </p>
                </>
              ) : (
                <p className="font-serif font-semibold text-[16px] text-foreground mt-1">
                  None logged
                </p>
              )}
            </Link>

            <Link
              href="/records"
              className="group p-4 rounded-2xl bg-card border border-border/60 hover:border-primary/40 transition-colors"
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
                <p className="font-serif font-semibold text-[20px] text-foreground mt-1">
                  {records.length}
                  <span className="text-[12px] font-normal text-muted-foreground ml-1.5">
                    saved
                  </span>
                </p>
              )}
            </Link>
          </motion.section>

          {/* ── Adherence footer ────────────────────────────── */}
          <motion.section variants={itemVariants} className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-semibold text-foreground">Monthly adherence</p>
              <p className="text-[12px] font-bold text-primary">{adherencePct}%</p>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${adherencePct}%` }}
              />
            </div>
          </motion.section>
        </motion.div>
      </div>
    </MobileAppShell>
  );
}
