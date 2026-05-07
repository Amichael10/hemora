import { useState } from "react";
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
import { BellLinear as Bell, CheckCircleBold as Check, PillBold as Pill } from "solar-icon-set";
import { bottleForMedication } from "@/lib/medBottle";

const TEAL = "#39839F";
const TEAL_DEEP = "#256680";
const SURFACE = "#E5EBF0";
const OXBLOOD = "#7B2335";
const ACCENT_SOFT = "#39839F";
const PAGE_GRADIENT = "linear-gradient(180deg, #39839F 0%, #4A95B0 18%, #8FB9C8 38%, #D6E2E8 55%, #F2F5F2 72%, #FFFFFF 90%)";

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
      <div className="flex flex-col min-h-full" style={{ background: PAGE_GRADIENT }}>

        {/* ── Slim header (on gradient) ────────────────────────── */}
        <div className="flex justify-between items-center px-5 pt-11 pb-4 relative">
          <div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.75)" }}>{getGreeting()}</p>
            {loadingProfile ? (
              <Skeleton className="h-7 w-28 mt-1" />
            ) : (
              <h1
                className="font-serif font-bold text-[22px] leading-tight tracking-[-0.5px] mt-0.5 text-white"
                data-testid="dashboard-greeting"
              >
                {firstName}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <button
              className="w-9 h-9 rounded-[18px] flex items-center justify-center text-white"
              style={{ background: "rgba(255,255,255,0.18)" }}
              aria-label="Notifications"
            >
              <Bell size={16} />
            </button>
            <Avatar
              className="w-10 h-10 border-2"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
              data-testid="avatar-dashboard"
            >
              <AvatarFallback
                className="font-serif font-bold text-sm text-white"
                style={{ background: "rgba(255,255,255,0.22)" }}
              >
                {getInitials(profile?.fullName)}
              </AvatarFallback>
            </Avatar>
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
                <div
                  className="absolute pointer-events-none"
                  style={{ right: -40, top: -10, width: 180, height: 180, borderRadius: 90, background: "rgba(255,255,255,0.08)" }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{ right: 10, top: 30, width: 90, height: 90, borderRadius: 45, background: "rgba(255,255,255,0.08)" }}
                />

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

                <p className="text-[11px] font-bold tracking-[1.5px] uppercase relative" style={{ color: "rgba(255,255,255,0.65)" }}>
                  Next dose
                </p>
                <p
                  className="font-serif font-bold text-[32px] leading-tight tracking-[-0.5px] mt-2 relative text-white"
                >
                  {nextMed.name}
                </p>
                <p className="text-[15px] font-medium mt-1 relative" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {nextMed.dose} · due at {nextMed.reminderTime || "scheduled time"}
                </p>

                <div className="flex items-center gap-2.5 mt-5 relative">
                  <button
                    className="rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50"
                    style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                    onClick={() => handleMarkTaken(nextMed.id, nextMed.name)}
                    disabled={markingTaken === nextMed.id || takenTodayIds.has(nextMed.id)}
                    data-testid="btn-mark-taken"
                  >
                    {takenTodayIds.has(nextMed.id) ? "Taken today" : markingTaken === nextMed.id ? "Saving..." : "Mark taken"}
                  </button>
                  <button
                    className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 text-white"
                    style={{ background: "rgba(255,255,255,0.12)" }}
                    onClick={() => setLocation("/meds")}
                    data-testid="btn-snooze"
                  >
                    Snooze
                  </button>
                </div>

                {/* Adherence progress bar */}
                <div className="flex items-center gap-2.5 mt-4 relative">
                  <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${adherencePct}%`, background: "rgba(255,255,255,0.9)" }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                    {adherencePct}% this month
                  </span>
                </div>
              </div>
            ) : (
              /* No medication state */
              <div className="flex flex-col items-center gap-3 py-4">
                <Pill size={28} color="rgba(255,255,255,0.7)" />
                <p className="text-sm font-medium text-center text-white">No medications scheduled</p>
                <Link
                  href="/meds"
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
                  style={{ background: "rgba(255,255,255,0.22)" }}
                >
                  Add medication
                </Link>
              </div>
            )}
          </motion.div>

          {/* ── Today's schedule ─────────────────────────────── */}
          <motion.div variants={itemVariants} className="mx-4">
            <p
              className="text-[11px] font-bold tracking-[2px] uppercase mb-2.5"
              style={{ color: TEAL, opacity: 0.45 }}
            >
              Today's Schedule
            </p>
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
                      className="flex items-center gap-3 px-3.5 py-3 rounded-[14px] bg-white"
                      style={{
                        border: `1px solid ${done ? "#e8f5e9" : `${TEAL}20`}`,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                        style={{
                          background: done ? "#e8f5e9" : `${TEAL}10`,
                          color: done ? "#4caf50" : TEAL,
                        }}
                      >
                        {done ? <Check size={16} /> : <Pill size={16} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold truncate"
                          style={{
                            color: done ? "#9a9489" : "#1a1a1a",
                            textDecoration: done ? "line-through" : "none",
                          }}
                        >
                          {med.name} · {med.dose}
                        </p>
                        <p className="text-[11px] mt-0.5" style={{ color: "#9a9489" }}>
                          {done ? "Taken today" : med.reminderTime || med.frequency}
                        </p>
                      </div>
                      {!done && (
                        <button
                          className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                          style={{ background: `${TEAL}10`, color: TEAL }}
                          onClick={() => handleMarkTaken(med.id, med.name)}
                          disabled={markingTaken === med.id}
                        >
                          {markingTaken === med.id ? "..." : "Take"}
                        </button>
                      )}
                    </div>
                  );
                })}
                {(meds?.length ?? 0) > 4 && (
                  <Link
                    href="/meds"
                    className="block text-center text-xs font-semibold py-2"
                    style={{ color: TEAL, opacity: 0.6 }}
                  >
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
              className="flex-[2] p-3.5 rounded-[14px] hover:opacity-90 transition-opacity"
              style={{ background: `${OXBLOOD}08`, border: `1px solid ${OXBLOOD}15` }}
              data-testid="btn-crisis-strip"
            >
              <p
                className="text-[10px] font-bold tracking-[1px] uppercase mb-1"
                style={{ color: OXBLOOD, opacity: 0.6 }}
              >
                Last Crisis
              </p>
              {loadingSummary ? (
                <Skeleton className="h-5 w-20 mt-1" />
              ) : recentCrisis ? (
                <>
                  <p className="font-serif font-bold text-[15px]" style={{ color: OXBLOOD }}>
                    {new Date(recentCrisis.occurredAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
                  <p className="text-[11px] mt-0.5 capitalize" style={{ color: `${OXBLOOD}80` }}>
                    {recentCrisis.painLevel}
                    {recentCrisis.painLocations?.length ? ` · ${recentCrisis.painLocations[0]}` : ""}
                  </p>
                </>
              ) : (
                <p className="font-serif font-bold text-[15px]" style={{ color: OXBLOOD }}>None logged</p>
              )}
            </Link>

            <Link
              href="/records"
              className="flex-1 p-3.5 rounded-[14px] hover:opacity-90 transition-opacity"
              style={{
                background: "linear-gradient(140deg, #E5EBF0 0%, #FFFFFF 100%)",
                border: `1px solid ${TEAL}25`,
              }}
              data-testid="btn-records-strip"
            >
              <p
                className="text-[10px] font-bold tracking-[1px] uppercase mb-1"
                style={{ color: TEAL, opacity: 0.7 }}
              >
                Records
              </p>
              {records === undefined ? (
                <Skeleton className="h-6 w-10 mt-1" />
              ) : (
                <p className="font-serif font-bold text-[22px]" style={{ color: TEAL }}>
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
