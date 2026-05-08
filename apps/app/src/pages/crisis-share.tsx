import { useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { useProfile } from "@/context/ProfileContext";
import {
  useListCrisisLogs,
  useGetProfile,
  getListCrisisLogsQueryKey,
} from "@workspace/api-client-react";
import { exportCrisisReportToPdf } from "@/lib/profilePdf";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ShareLinear as Share, DownloadLinear as Download } from "solar-icon-set";

type Period = "30" | "90" | "year" | "all";

export default function CrisisShare() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [period, setPeriod] = useState<Period>("year");
  const [details, setDetails] = useState(true);
  const [treatments, setTreatments] = useState(true);
  const [insights, setInsights] = useState(true);

  const { data: logs = [] } = useListCrisisLogs(
    { profileId },
    { query: { queryKey: getListCrisisLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: profile } = useGetProfile(profileId, { query: { enabled: !!profileId } });

  const filterLogs = () => {
    const now = Date.now();
    if (period === "all") return logs;
    if (period === "year") {
      const y = new Date().getFullYear();
      return logs.filter((l: any) => l.occurredAt && new Date(l.occurredAt).getFullYear() === y);
    }
    const days = parseInt(period, 10);
    return logs.filter((l: any) => l.occurredAt && (now - new Date(l.occurredAt).getTime()) <= days * 86400000);
  };

  const periodLabel = period === "year" ? `This year (${new Date().getFullYear()})`
    : period === "all" ? "All time"
    : `Last ${period} days`;

  const handleGenerate = async () => {
    const filtered = filterLogs();
    if (!filtered.length) { toast({ title: "Nothing to share yet", description: "No crises in this period.", variant: "destructive" }); return; }
    if (!details && !treatments && !insights) { toast({ title: "Pick at least one section", variant: "destructive" }); return; }
    await exportCrisisReportToPdf({
      patientName: profile?.fullName,
      periodLabel,
      include: { details, treatments, insights },
      logs: filtered,
    });
    toast({ title: "Report generated", description: "Saved to your downloads." });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Share with Care Team" back="/crisis" />
      <div className="px-5 pb-10">
        <div className="flex flex-col items-center text-center mb-6 mt-2">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-4">
            <Share size={32} />
          </div>
          <h2 className="font-serif text-xl font-semibold text-foreground tracking-[-0.3px] mb-2">
            Share your crisis history
          </h2>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            Help your doctor understand your pattern and provide better care.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Share period</label>
            <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
              <SelectTrigger className="bg-card h-12 rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="year">This year ({new Date().getFullYear()})</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">Include</label>
            <div className="bg-card border border-border/60 rounded-2xl px-4">
              {[
                { id: "details", label: "Crisis details", val: details, set: setDetails },
                { id: "treatments", label: "Treatments", val: treatments, set: setTreatments },
                { id: "insights", label: "Insights summary", val: insights, set: setInsights },
              ].map((opt, i, arr) => (
                <label key={opt.id} className={`flex items-center gap-3 py-3.5 cursor-pointer ${i < arr.length - 1 ? "border-b border-border/50" : ""}`}>
                  <Checkbox checked={opt.val} onCheckedChange={(v) => opt.set(!!v)} />
                  <span className="text-sm font-medium text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <Button size="xl" className="w-full mt-8" onClick={handleGenerate}>
          <Download size={18} /> Generate report
        </Button>
        <Button size="xl" variant="ghost" className="w-full mt-2" onClick={() => setLocation("/crisis")}>
          Cancel
        </Button>
      </div>
    </MobileAppShell>
  );
}
