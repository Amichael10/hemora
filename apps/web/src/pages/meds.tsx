import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthIcon } from "@/components/ui/health-icon";
import { useProfile } from "@/context/ProfileContext";
import {
  useListMedications,
  getListMedicationsQueryKey,
  useListMedicationLogs,
  getListMedicationLogsQueryKey,
} from "@workspace/api-client-react";
import { AltArrowRightLinear as ChevronRight, AddCircleLinear as Plus } from "solar-icon-set";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pills2Bold as MedicinesFilled,
  PillBold as BlisterFilled,
  Pills2Linear as MedicinesOutline,
  PillLinear as BlisterOutline,
} from "solar-icon-set";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

function AdherenceReport({ logs, isLoading }: { logs: any[] | undefined; isLoading: boolean }) {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const buckets = days.map((d) => {
    const next = new Date(d); next.setDate(d.getDate() + 1);
    const todays = (logs ?? []).filter((l) => {
      const t = new Date(l.takenAt ?? l.scheduledAt);
      return t >= d && t < next;
    });
    const taken = todays.filter((l) => l.status === "taken").length;
    const total = todays.length;
    return {
      day: d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1),
      pct: total ? Math.round((taken / total) * 100) : 0,
      taken, total,
    };
  });
  const totalTaken = buckets.reduce((s, b) => s + b.taken, 0);
  const totalAll = buckets.reduce((s, b) => s + b.total, 0);
  const overall = totalAll ? Math.round((totalTaken / totalAll) * 100) : 0;
  const streak = (() => {
    let s = 0;
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].total > 0 && buckets[i].pct === 100) s++;
      else if (buckets[i].total > 0) break;
    }
    return s;
  })();

  return (
    <div className="p-5">
      <div className="flex items-end justify-between mb-1">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Last 7 days</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-bold tracking-[-1.5px] text-primary">{overall}%</span>
            <span className="text-xs text-muted-foreground">adherence</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Streak</p>
          <p className="text-lg font-semibold text-foreground">{streak} {streak === 1 ? "day" : "days"}</p>
        </div>
      </div>
      <div className="h-32 mt-3">
        {isLoading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={buckets} margin={{ top: 8, right: 4, bottom: 0, left: -28 }}>
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted)/0.4)" }}
                contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", fontSize: 12 }}
                formatter={(v: any, _n, p: any) => [`${v}% (${p.payload.taken}/${p.payload.total})`, "Taken"]}
              />
              <Bar dataKey="pct" radius={[8, 8, 4, 4]}>
                {buckets.map((b, i) => (
                  <Cell key={i} fill={b.total === 0 ? "hsl(var(--muted))" : b.pct >= 80 ? "hsl(var(--brand-teal))" : b.pct >= 50 ? "hsl(var(--brand-teal)/0.6)" : "hsl(var(--destructive)/0.6)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-1">
        {totalAll === 0 ? "Log your meds to see your report here." : `${totalTaken} of ${totalAll} doses taken this week`}
      </p>
    </div>
  );
}

export default function Meds() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();

  const { data: meds, isLoading: isLoadingMeds } = useListMedications(
    { profileId },
    { query: { queryKey: getListMedicationsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: medLogs, isLoading: isLoadingLogs } = useListMedicationLogs(
    { profileId },
    { query: { queryKey: getListMedicationLogsQueryKey({ profileId }), enabled: !!profileId } }
  );

  return (
    <MobileAppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="h-page">Medications</h1>
          <Button size="icon" variant="soft" data-testid="btn-add-med" onClick={() => setLocation("/meds/new")}>
            <Plus size={16} />
          </Button>
        </div>

        <Card className="border-none shadow-sm bg-card mb-6 overflow-hidden">
          <CardContent className="p-0">
            <AdherenceReport logs={medLogs} isLoading={isLoadingLogs} />
          </CardContent>
        </Card>

        <h2 className="eyebrow mb-4">Current Routine</h2>

        {isLoadingMeds ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="h-12 w-12 rounded-2xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : meds?.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-primary/20 flex justify-center mb-4">
              <HealthIcon outline={MedicinesOutline} filled={MedicinesFilled} width="48" height="48" />
            </div>
            <p className="text-sm mb-4">No medications added yet.</p>
            <Button variant="soft" onClick={() => setLocation("/meds/new")}>Add Medication</Button>
          </div>
        ) : (
          <div>
            {meds?.map((med) => (
              <Link key={med.id} href={`/meds/${med.id}`} className="block my-[6px]">
              <Card className="group border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer" data-testid={`med-card-${med.id}`}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      med.status === 'paused' ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'
                    }`}>
                      <span className="relative inline-flex shrink-0" style={{ width: 22, height: 22 }}>
                        <span className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0">
                          <BlisterOutline size={22} />
                        </span>
                        <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                          <BlisterFilled size={22} />
                        </span>
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-semibold text-foreground text-sm tracking-[-0.01em]">{med.name}</h3>
                        {med.status === 'paused' && (
                          <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4 opacity-70">Paused</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{med.dose}</span>
                        <span>{med.frequency}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={16} color="rgba(115,115,115,0.5)" />
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
