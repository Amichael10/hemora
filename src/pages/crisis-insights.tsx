import { useMemo, useState } from "react";
import { Link } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/context/ProfileContext";
import {
  useListCrisisLogs,
  useGetProfile,
  getListCrisisLogsQueryKey,
} from "@workspace/api-client-react";
import { exportCrisisReportToPdf } from "@/lib/profilePdf";
import { useToast } from "@/hooks/use-toast";
import { ShareLinear as Share, DownloadLinear as Download } from "solar-icon-set";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Tab = "overview" | "trends";

const COLORS = ["#a8324a", "#c9a35a", "#0f412d", "#7a5ca8", "#3fa6b8"];

export default function CrisisInsights() {
  const { profileId } = useProfile();
  const [tab, setTab] = useState<Tab>("overview");
  const { toast } = useToast();
  const { data: logs = [] } = useListCrisisLogs(
    { profileId },
    { query: { queryKey: getListCrisisLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: profile } = useGetProfile(profileId, { query: { enabled: !!profileId } });

  const year = new Date().getFullYear();
  const { total, hospital, daysAffected, types, triggers } = useMemo(() => {
    const yearLogs = logs.filter((l: any) => l.occurredAt && new Date(l.occurredAt).getFullYear() === year);
    const total = yearLogs.length;
    const hospital = yearLogs.filter((l: any) => l.hospitalVisit).length;
    const daysAffected = new Set(yearLogs.map((l: any) => new Date(l.occurredAt).toDateString())).size;
    const typeMap: Record<string, number> = {};
    yearLogs.forEach((l: any) => {
      const key = l.hospitalVisit ? "Acute chest syndrome" : "Pain crisis";
      typeMap[key] = (typeMap[key] || 0) + 1;
    });
    const types = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
    const trigMap: Record<string, number> = {};
    yearLogs.forEach((l: any) => (l.triggers || []).forEach((t: string) => { trigMap[t] = (trigMap[t] || 0) + 1; }));
    const triggers = Object.entries(trigMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return { total, hospital, daysAffected, types, triggers };
  }, [logs, year]);

  const handleDownload = async () => {
    await exportCrisisReportToPdf({
      patientName: profile?.fullName,
      periodLabel: `This year (${year})`,
      include: { details: false, treatments: true, insights: true },
      logs,
    });
    toast({ title: "Insights downloaded" });
  };

  const totalForPct = types.reduce((s, t) => s + t.value, 0) || 1;

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Crisis Insights" back="/crisis" />
      <div className="px-5 pb-10">
        {/* Tab switcher */}
        <div className="grid grid-cols-2 p-1 bg-muted rounded-full mb-6">
          {(["overview", "trends"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2 text-sm font-semibold rounded-full transition-all capitalize ${tab === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
            >{t}</button>
          ))}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">This Year ({year})</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { n: total, l: "Total crises" },
              { n: hospital, l: "Hospital visits" },
              { n: daysAffected, l: "Days in total" },
            ].map(s => (
              <div key={s.l} className="bg-card border border-border/60 rounded-2xl p-3 text-center">
                <div className="font-serif text-2xl font-bold text-primary">{s.n}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Crisis types</h3>
          <div className="bg-card border border-border/60 rounded-2xl p-4 mb-6">
            {types.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No data yet</p>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-32 h-32">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={types} dataKey="value" innerRadius={36} outerRadius={56} paddingAngle={2}>
                        {types.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2">
                  {types.map((t, i) => (
                    <div key={t.name} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                        <span className="text-foreground">{t.name}</span>
                      </span>
                      <span className="text-muted-foreground font-medium">
                        {Math.round((t.value / totalForPct) * 100)}% ({t.value})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h3 className="text-sm font-semibold text-foreground mb-3">Common triggers</h3>
          <div className="bg-card border border-border/60 rounded-2xl px-4 py-2 mb-6">
            {triggers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No triggers logged yet</p>
            ) : triggers.map(([name, count]) => (
              <div key={name} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <span className="text-sm text-foreground">{name}</span>
                <span className="text-sm font-semibold text-muted-foreground">{count}</span>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <div className="text-xs text-foreground/80 leading-snug flex-1">
              Share these insights with your care team to get better support.
            </div>
            <Button asChild size="sm" variant="outline" className="border-accent text-accent">
              <Link to="/crisis/share">Share</Link>
            </Button>
          </div>

          <Button size="xl" className="w-full" onClick={handleDownload}>
            <Download size={18} /> Download PDF
          </Button>
        </div>
      </div>
    </MobileAppShell>
  );
}
