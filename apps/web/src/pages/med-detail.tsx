import { useMemo } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  useGetMedication,
  useListMedicationLogs,
  useCreateMedicationLog,
  CreateMedicationLogBodyStatus,
  getListMedicationLogsQueryKey,
} from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";
import { bottleForMedication } from "@/lib/medBottle";
import {
  BellLinear as BellIcon,
  RefreshCircleLinear as RefillIcon,
  PenNewSquareLinear as EditIcon,
  CheckCircleBold as CheckFilled,
  CloseCircleBold as SkipFilled,
} from "solar-icon-set";
import { cn } from "@/lib/utils";

function fmtTime(t?: string | null) {
  if (!t || !/^\d{1,2}:\d{2}/.test(t)) return "—";
  const [hh, mm] = t.split(":");
  const h24 = parseInt(hh, 10);
  const p = h24 >= 12 ? "PM" : "AM";
  let h12 = h24 % 12; if (h12 === 0) h12 = 12;
  return `${h12}:${mm.slice(0,2)} ${p}`;
}

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function MonthCalendar({ logs, medId }: { logs: any[]; medId: string }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Mon-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayStatus = useMemo(() => {
    const map = new Map<number, "taken" | "skipped" | "missed">();
    for (const l of logs) {
      if (l.medicationId !== medId) continue;
      const d = new Date(l.takenAt ?? l.scheduledAt);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        // taken wins over others
        if (l.status === "taken") map.set(day, "taken");
        else if (!map.has(day)) map.set(day, l.status);
      }
    }
    return map;
  }, [logs, medId, year, month]);

  const cells: Array<{ day?: number; status?: string; isToday?: boolean }> = [];
  for (let i = 0; i < startOffset; i++) cells.push({});
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      status: dayStatus.get(d),
      isToday: d === today.getDate(),
    });
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="text-[11px] text-muted-foreground text-center font-medium">{w}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((c, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {c.day && (
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium",
                  c.status === "taken" && "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
                  c.status === "skipped" && "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
                  c.status === "missed" && "bg-rose-100 text-rose-700 ring-1 ring-rose-200",
                  !c.status && "text-foreground/70",
                  c.isToday && "ring-2 ring-primary"
                )}
              >
                {c.day}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Taken</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Skipped</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" /> Not logged</span>
      </div>
    </div>
  );
}

export default function MedDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/meds/:id");
  const id = params?.id;
  const { profileId, activeProfileId, familyMembers } = useProfile();
  const { toast } = useToast();

  const activeMember = familyMembers.find(m => m.id === activeProfileId);

  const { data: med, isLoading } = useGetMedication(id);
  const { data: logs } = useListMedicationLogs(
    { familyMemberId: activeProfileId },
    { query: { queryKey: ["medication-logs", activeProfileId], enabled: !!activeProfileId } }
  );
  const createLog = useCreateMedicationLog();

  const medLogs = (logs ?? []).filter((l: any) => l.medicationId === id);

  const monthStats = useMemo(() => {
    const now = new Date();
    const ym = `${now.getFullYear()}-${now.getMonth()}`;
    const inMonth = medLogs.filter((l) => {
      const d = new Date(l.takenAt ?? l.scheduledAt);
      return `${d.getFullYear()}-${d.getMonth()}` === ym;
    });
    const taken = inMonth.filter((l) => l.status === "taken").length;
    const total = inMonth.length;
    return { taken, total, pct: total ? Math.round((taken / total) * 100) : 0 };
  }, [medLogs]);

  const recent = [...medLogs]
    .sort((a, b) => new Date(b.takenAt ?? b.scheduledAt).getTime() - new Date(a.takenAt ?? a.scheduledAt).getTime())
    .slice(0, 5);

  const logDose = (status: "taken" | "skipped") => {
    if (!id) return;
    createLog.mutate(
      { data: { medicationId: id, status, scheduledAt: new Date().toISOString() } },
      {
        onSuccess: () => toast({ title: status === "taken" ? "Dose logged" : "Dose skipped" }),
        onError: (e: any) => toast({ title: "Couldn't log", description: e?.message, variant: "destructive" }),
      }
    );
  };

  if (isLoading || !med) {
    return (
      <MobileAppShell hideNav>
        <SubPageHeader title="Medication" back="/meds" />
        <div className="px-6 space-y-3">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </MobileAppShell>
    );
  }

  const bottle = bottleForMedication(med.name);
  const isPaused = med.status === "paused";
  const startedOn = (med as any).startDate ?? (med as any).createdAt ?? null;
  const refillDays = (med as any).refillReminderDays;
  const refillLabel =
    refillDays == null ? "Off" :
    refillDays === 1 ? "1 day before" :
    refillDays === 7 ? "1 week before" :
    refillDays === 14 ? "2 weeks before" :
    `${refillDays} days before`;

  return (
    <MobileAppShell hideNav>
      <SubPageHeader
        title={med.name}
        back="/meds"
        right={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-7 px-2 text-[10px] uppercase tracking-wider font-bold border-foreground/20 text-foreground bg-foreground/5">
              {activeMember?.fullName || "Self"}
            </Badge>
            <button
              onClick={() => setLocation(`/meds/${id}/edit`)}
              aria-label="Edit"
              className="w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors"
            >
              <EditIcon size={16} />
            </button>
          </div>
        }
      />

      <div className="px-5 pb-10 space-y-4">
        {/* Hero */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                <img src={bottle} alt="" className="w-12 h-12 object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif font-semibold text-[20px] tracking-[-0.5px] text-foreground truncate">
                  {med.name} {med.dose && <span className="text-foreground/80 font-normal">{med.dose}</span>}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    className={cn(
                      "rounded-full text-[11px] font-medium px-2.5 py-0.5 border-none",
                      isPaused ? "bg-muted text-muted-foreground" : "bg-emerald-100 text-emerald-700"
                    )}
                  >
                    <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5", isPaused ? "bg-muted-foreground" : "bg-emerald-500")} />
                    {isPaused ? "Paused" : "Active"}
                  </Badge>
                  <Badge variant="secondary" className="rounded-full text-[11px] font-medium px-2.5 py-0.5">
                    Ongoing
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Dose</p>
                <p className="text-sm font-semibold text-foreground mt-1">{med.dose || "—"}</p>
              </div>
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Frequency</p>
                <p className="text-sm font-semibold text-foreground mt-1">{med.frequency || "—"}</p>
              </div>
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Time</p>
                <p className="text-sm font-semibold text-foreground mt-1">{fmtTime(med.reminderTime)}</p>
              </div>
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Started on</p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {startedOn ? (() => {
                    const s = String(startedOn);
                    const d = /^\d{4}-\d{2}-\d{2}$/.test(s)
                      ? new Date(`${s}T00:00:00`)
                      : new Date(s);
                    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
                  })() : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reminder + refill */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="w-9 h-9 rounded-full bg-foreground/10 text-foreground flex items-center justify-center mb-2">
                <BellIcon size={16} />
              </div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Reminder</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{med.reminderEnabled === false ? "Off" : "On"}</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className="w-9 h-9 rounded-full bg-foreground/10 text-foreground flex items-center justify-center mb-2">
                <RefillIcon size={16} />
              </div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Refill reminder</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{refillLabel}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick log */}
        <div className="grid grid-cols-2 gap-3">
          <Button size="lg" onClick={() => logDose("taken")} disabled={createLog.isPending} className="rounded-xl">
            <CheckFilled size={16} /> Mark taken
          </Button>
          <Button size="lg" variant="soft" onClick={() => logDose("skipped")} disabled={createLog.isPending} className="rounded-xl">
            <SkipFilled size={16} /> Skip
          </Button>
        </div>

        {/* Adherence this month */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-end justify-between mb-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Adherence this month</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold tracking-[-1px] text-primary">{monthStats.pct}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {monthStats.taken} of {monthStats.total} doses taken
                </p>
              </div>
            </div>
            <Progress value={monthStats.pct} className="h-1.5 mb-5" />
            <MonthCalendar logs={logs ?? []} medId={id!} />
          </CardContent>
        </Card>

        {/* Recent doses */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Recent doses</h3>
            </div>
            {recent.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No doses logged yet.</p>
            ) : (
              <div className="space-y-2.5">
                {recent.map((l: any) => {
                  const d = new Date(l.takenAt ?? l.scheduledAt);
                  const isToday = d.toDateString() === new Date().toDateString();
                  const yest = new Date(); yest.setDate(yest.getDate() - 1);
                  const isYest = d.toDateString() === yest.toDateString();
                  const label = isToday ? "Today" : isYest ? "Yesterday" : d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
                  return (
                    <div key={l.id} className="flex items-center justify-between text-sm">
                      <span className="text-foreground/80">
                        {label}, {d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}
                      </span>
                      <span
                        className={cn(
                          "flex items-center gap-1 text-xs font-medium",
                          l.status === "taken" && "text-emerald-600",
                          l.status === "skipped" && "text-amber-600",
                          l.status === "missed" && "text-rose-600"
                        )}
                      >
                        {l.status === "taken" ? "Taken" : l.status === "skipped" ? "Skipped" : "Missed"}
                        {l.status === "taken" && <CheckFilled size={12} />}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileAppShell>
  );
}
