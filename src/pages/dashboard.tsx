import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
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
import { BellLinear as Bell, CheckCircleBold as Check, PillBold as Pill } from "solar-icon-set";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

  return (
    <MobileAppShell>
      <div className="flex flex-col min-h-full -mb-20 pb-20" style={{ background: "var(--gradient-brand)" }}>

        {/* ── Slim header (on gradient) ────────────────────────── */}
        <div className="flex justify-between items-center px-5 pt-11 pb-4 relative">
          <div>
            <p className="text-xs font-semibold text-white/85 drop-shadow-sm">{getGreeting()}</p>
            {loadingProfile ? (
              <Skeleton className="h-7 w-28 mt-1" />
            ) : (
              <h1
                className="font-serif font-bold text-[22px] leading-tight tracking-[-0.5px] mt-0.5 text-white drop-shadow"
                data-testid="dashboard-greeting"
              >
                {firstName}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/20 hover:bg-white/25 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>
            <Link href="/profile">
              <Avatar
                className="w-10 h-10 border-2 border-white/40 cursor-pointer"
                data-testid="avatar-dashboard"
              >
                <AvatarFallback className="font-serif font-bold text-sm text-white bg-white/25">
                  {getInitials(profile?.fullName)}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 pb-6"
        >
          {/* ── Hero medication (on gradient, no card) ───────── */}
          <motion.div variants={itemVariants} className="px-6 pt-2 pb-4 relative">
            {loadingSummary ? (
              <Skeleton className="h-40 w-full rounded-3xl" />
            ) : nextMed ? (
              <div className="relative">
                {/* Decorative rings */}
                <div className="absolute pointer-events-none rounded-full bg-white/10"
                  style={{ right: -40, top: -10, width: 180, height: 180 }} />
                <div className="absolute pointer-events-none rounded-full bg-white/10"
                  style={{ right: 10, top: 30, width: 90, height: 90 }} />

                {/* Medication bottle */}
                <img
                  src={bottleForMedication(nextMed.name)}
                  alt=""
                  aria-hidden="true"
                  className="absolute pointer-events-none select-none"
                  style={{
                    right: 12,
                    top: 0,
                    height: 168,
                    width: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.25))",
                    transform: "rotate(-26deg)",
                    transformOrigin: "center",
                    zIndex: 0,
                  }}
                  data-testid="img-med-bottle"
                />

                <p className="eyebrow-on-dark relative">Next dose</p>
                <p className="font-serif font-bold text-[32px] leading-tight tracking-[-0.5px] mt-2 relative text-white">
                  {nextMed.name}
                </p>
                <p className="text-[15px] font-medium mt-1 relative text-white/85">
                  {nextMed.dose} · due at {nextMed.reminderTime || "scheduled time"}
                </p>

                <div className="flex items-center gap-2.5 mt-5 relative">
                  <button
                    className="glass-pill"
                    onClick={() => handleMarkTaken(nextMed.id, nextMed.name)}
                    disabled={markingTaken === nextMed.id || takenTodayIds.has(nextMed.id)}
                    data-testid="btn-mark-taken"
                  >
                    {takenTodayIds.has(nextMed.id) ? "Taken today" : markingTaken === nextMed.id ? "Saving..." : "Mark taken"}
                  </button>
                  <button
                    className="glass-pill-ghost"
                    onClick={() => setLocation("/meds")}
                    data-testid="btn-snooze"
                  >
                    Snooze
                  </button>
                </div>

                {/* Adherence progress bar */}
                <div className="flex items-center gap-2.5 mt-4 relative">
                  <div className="flex-1 h-1 rounded-full bg-white/25">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-white/90"
                      style={{ width: `${adherencePct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-white/80">
                    {adherencePct}% this month
                  </span>
                </div>
              </div>
            ) : (
              /* No medication state */
              <div className="flex flex-col items-center gap-3 py-4">
                <Pill size={28} color="rgba(255,255,255,0.7)" />
                <p className="text-sm font-medium text-center text-white">No medications scheduled</p>
                <Link href="/meds" className="glass-pill">
                  Add medication
                </Link>
              </div>
            )}
          </motion.div>

          {/* ── Today's schedule ─────────────────────────────── */}
          <motion.div variants={itemVariants} className="mx-4">
            <p className="eyebrow mb-2.5">Today's Schedule</p>
            {loadingMeds ? (
              <div className="space-y-2">
                <Skeleton className="h-14 w-full rounded-[14px]" />
                <Skeleton className="h-14 w-full rounded-[14px]" />
              </div>
            ) : !meds || meds.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">No medications added yet.</p>
            ) : (
              <div className="space-y-2">
                {meds.slice(0, 4).map((med) => {
                  const done = takenTodayIds.has(med.id);
                  return (
                    <div
                      key={med.id}
                      className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-card shadow-sm border ${done ? "border-emerald-200/60" : "border-primary/15"}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${done ? "bg-emerald-100 text-emerald-600" : "bg-primary/10 text-primary"}`}>
                        {done ? <Check size={16} /> : <Pill size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {med.name} · {med.dose}
                        </p>
                        <p className="text-[11px] mt-0.5 text-muted-foreground">
                          {done ? "Taken today" : med.reminderTime || med.frequency}
                        </p>
                      </div>
                      {!done && (
                        <Button
                          variant="soft"
                          size="sm"
                          onClick={() => handleMarkTaken(med.id, med.name)}
                          disabled={markingTaken === med.id}
                        >
                          {markingTaken === med.id ? "..." : "Take"}
                        </Button>
                      )}
                    </div>
                  );
                })}
                {(meds?.length ?? 0) > 4 && (
                  <Link href="/meds" className="block text-center text-xs font-semibold py-2 text-primary/70 hover:text-primary">
                    +{(meds?.length ?? 0) - 4} more
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* ── Crisis + records strip ───────────────────────── */}
          <motion.div variants={itemVariants} className="mx-4 flex gap-2.5">
            <Link
              href="/crisis"
              className="flex-[2] p-3.5 rounded-2xl hover:opacity-90 transition-opacity bg-[hsl(var(--brand-oxblood))]/[0.06] border border-[hsl(var(--brand-oxblood))]/15"
              data-testid="btn-crisis-strip"
            >
              <p className="text-[10px] font-bold tracking-[1px] uppercase mb-1 text-[hsl(var(--brand-oxblood))]/70">
                Last Crisis
              </p>
              {loadingSummary ? (
                <Skeleton className="h-5 w-20 mt-1" />
              ) : recentCrisis ? (
                <>
                  <p className="font-serif font-bold text-[15px] text-[hsl(var(--brand-oxblood))]">
                    {new Date(recentCrisis.occurredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
                  <p className="text-[11px] mt-0.5 capitalize text-[hsl(var(--brand-oxblood))]/70">
                    {recentCrisis.painLevel}
                    {recentCrisis.painLocations?.length ? ` · ${recentCrisis.painLocations[0]}` : ""}
                  </p>
                </>
              ) : (
                <p className="font-serif font-bold text-[15px] text-[hsl(var(--brand-oxblood))]">None logged</p>
              )}
            </Link>

            <Link
              href="/records"
              className="flex-1 p-3.5 surface-soft hover:opacity-90 transition-opacity"
              data-testid="btn-records-strip"
            >
              <p className="text-[10px] font-bold tracking-[1px] uppercase mb-1 text-primary/70">
                Records
              </p>
              {records === undefined ? (
                <Skeleton className="h-6 w-10 mt-1" />
              ) : (
                <p className="font-serif font-bold text-[22px] text-primary">
                  {records.length}
                </p>
              )}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </MobileAppShell>
  );
}
