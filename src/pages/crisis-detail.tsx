import { useRoute, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useGetCrisisLog, useDeleteCrisisLog } from "@workspace/api-client-react";

function Section({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex flex-col gap-1 py-3 border-b border-border/60 last:border-0">
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</span>
      <span className="text-sm text-foreground">{value || "—"}</span>
    </div>
  );
}

export default function CrisisDetail() {
  const [, params] = useRoute("/crisis/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const id = params?.id;
  const { data: log, isLoading } = useGetCrisisLog(id);
  const del = useDeleteCrisisLog();

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this crisis log?")) return;
    del.mutate({ id }, { onSuccess: () => { toast({ title: "Deleted" }); setLocation("/crisis"); } });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Crisis log" back="/crisis" />
      <div className="px-6 pb-10">
        {isLoading ? (
          <div className="space-y-3"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-20 w-full" /></div>
        ) : !log ? (
          <p className="text-center text-muted-foreground py-12">Log not found.</p>
        ) : (
          <>
            <div className="bg-card rounded-2xl border border-border/60 px-4">
              <Section label="When" value={log.occurredAt ? new Date(log.occurredAt).toLocaleString() : null} />
              <Section label="Pain level" value={log.painLevel} />
              <Section label="Pain locations" value={(log.painLocations || []).join(", ")} />
              <Section label="Triggers" value={(log.triggers || []).join(", ")} />
              <Section label="What helped" value={(log.whatHelped || []).join(", ")} />
              <Section label="Hospital visit" value={log.hospitalVisit ? "Yes" : "No"} />
            </div>
            <Button variant="crisis" size="xl" className="w-full mt-6" onClick={handleDelete} disabled={del.isPending}>
              Delete log
            </Button>
          </>
        )}
      </div>
    </MobileAppShell>
  );
}