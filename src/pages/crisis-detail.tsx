import { useRoute, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useGetCrisisLog, useDeleteCrisisLog, useGetProfile } from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";
import {
  TrashBinTrashLinear as Trash,
  ShareLinear as Share,
} from "solar-icon-set";

function Row({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );
}

function painLabel(level?: string) {
  if (!level) return "—";
  const map: Record<string, string> = { mild: "Mild (1-3)", moderate: "Moderate (4-6)", severe: "Severe (7-9)", worst: "Worst (10)" };
  return map[level] ?? level;
}

export default function CrisisDetail() {
  const [, params] = useRoute("/crisis/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { profileId } = useProfile();
  const id = params?.id;
  const { data: log, isLoading } = useGetCrisisLog(id);
  const { data: profile } = useGetProfile(profileId, { query: { enabled: !!profileId } });
  const del = useDeleteCrisisLog();

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this crisis log?")) return;
    del.mutate({ id }, { onSuccess: () => { toast({ title: "Deleted" }); setLocation("/crisis"); } });
  };

  const buildShareText = () => {
    if (!log) return "";
    const when = log.occurredAt ? new Date(log.occurredAt).toLocaleString() : "—";
    const lines = [
      `Hemora · Crisis log`,
      profile?.fullName ? `Patient: ${profile.fullName}` : null,
      `When: ${when}`,
      `Pain: ${painLabel(log.painLevel)}`,
      log.painLocations?.length ? `Location: ${log.painLocations.join(", ")}` : null,
      log.triggers?.length ? `Triggers: ${log.triggers.join(", ")}` : null,
      log.whatHelped?.length ? `Helped by: ${log.whatHelped.join(", ")}` : null,
      `Hospital visit: ${log.hospitalVisit ? "Yes" : "No"}`,
    ].filter(Boolean).join("\n");
    return lines;
  };

  const handleShare = async () => {
    const text = buildShareText();
    if (!text) return;
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ title: "Crisis log", text });
        return;
      }
    } catch { /* user cancelled */ }
    // Fallback: WhatsApp web
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Crisis Details" back="/crisis" />
      <div className="px-5 pb-10">
        {isLoading ? (
          <div className="space-y-3 mt-4"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-32 w-full" /></div>
        ) : !log ? (
          <p className="text-center text-muted-foreground py-12">Log not found.</p>
        ) : (
          <>
            {/* Headline card */}
            <div className="bg-card rounded-2xl border border-border/60 p-5 mb-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                {log.occurredAt ? new Date(log.occurredAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : ""}
              </p>
              <div className="flex items-center justify-between gap-3 mt-1">
                <h2 className="font-serif text-2xl font-semibold text-foreground tracking-[-0.3px]">Pain crisis</h2>
                {log.hospitalVisit && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                    Hospital visit
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-2xl border border-border/60 px-5 py-2 mb-4">
              <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold pt-3 pb-1">Summary</h3>
              <Row label="When" value={log.occurredAt ? new Date(log.occurredAt).toLocaleString() : null} />
              <Row label="Pain level" value={painLabel(log.painLevel)} />
              <Row label="Location" value={(log.painLocations || []).join(", ")} />
              <Row label="Triggers" value={(log.triggers || []).join(", ")} />
              <Row label="Helped by" value={(log.whatHelped || []).join(", ")} />
              <Row label="Hospital visit" value={log.hospitalVisit ? "Yes" : "No"} />
            </div>

            {/* Treatments */}
            {(log.whatHelped || []).length > 0 && (
              <div className="bg-card rounded-2xl border border-border/60 px-5 py-2 mb-4">
                <h3 className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold pt-3 pb-1">Treatment</h3>
                {(log.whatHelped || []).map((t: string) => (
                  <Row key={t} label={t} value="Used" />
                ))}
              </div>
            )}

            <Button size="xl" className="w-full mt-6" onClick={handleShare}>
              <Share size={18} /> Share this log
            </Button>
            <p className="text-[11px] text-muted-foreground text-center mt-2">
              Sends a quick summary via WhatsApp, Messages, or your share menu.
            </p>
            <Button variant="ghost" size="xl" className="w-full mt-2 text-destructive hover:bg-destructive/10" onClick={handleDelete} disabled={del.isPending}>
              <Trash size={18} /> Delete log
            </Button>
          </>
        )}
      </div>
    </MobileAppShell>
  );
}
