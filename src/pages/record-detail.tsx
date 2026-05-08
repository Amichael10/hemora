import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { HealthIcon } from "@/components/ui/health-icon";
import { useGetCareRecord, useDeleteCareRecord } from "@workspace/api-client-react";
import { supabase } from "@/integrations/supabase/client";
import {
  PenNewSquareLinear as EditIcon,
  CalendarLinear as Calendar,
  HospitalLinear as HospitalIcon,
  DocumentTextLinear as FileIcon,
  DownloadLinear as DownloadIcon,
  TrashBinTrashLinear as TrashIcon,
  NotebookBold as MedicalRecordsFilled,
  StethoscopeBold as StethoscopeFilled,
  TestTubeBold as TestTubesFilled,
  Folder2Bold as UiFolderFilled,
  NotebookLinear as MedicalRecordsOutline,
  StethoscopeLinear as StethoscopeOutline,
  TestTubeLinear as TestTubesOutline,
  Folder2Linear as UiFolderOutline,
} from "solar-icon-set";

const TYPE_META: Record<string, { label: string; outline: any; filled: any }> = {
  visit:   { label: "Hospital visit", outline: StethoscopeOutline, filled: StethoscopeFilled },
  lab:     { label: "Lab result",     outline: TestTubesOutline,   filled: TestTubesFilled },
  imaging: { label: "Imaging / scan", outline: UiFolderOutline,    filled: UiFolderFilled },
  other:   { label: "Other record",   outline: MedicalRecordsOutline, filled: MedicalRecordsFilled },
};

const STATUS_COLOR: Record<string, string> = {
  saved: "bg-blue-500/10 text-blue-700",
  normal: "bg-green-500/10 text-green-700",
  follow_up: "bg-orange-500/10 text-orange-700",
  reviewed: "bg-blue-500/10 text-blue-700",
  pending: "bg-muted text-muted-foreground",
  completed: "bg-green-500/10 text-green-700",
};

export default function RecordDetail() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/records/:id");
  const id = params?.id;
  const { toast } = useToast();

  const { data: rec, isLoading } = useGetCareRecord(id);
  const deleteRec = useDeleteCareRecord();
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const path = (rec as any)?.fileUrl;
    if (!path) { setSignedUrl(null); return; }
    (async () => {
      const { data, error } = await supabase.storage
        .from("care-record-files")
        .createSignedUrl(path, 60 * 60);
      if (!cancelled && !error) setSignedUrl(data?.signedUrl ?? null);
    })();
    return () => { cancelled = true; };
  }, [rec]);

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this record?")) return;
    deleteRec.mutate({ id }, {
      onSuccess: () => { toast({ title: "Deleted" }); setLocation("/records"); },
      onError: (e: any) => toast({ title: "Couldn't delete", description: e?.message, variant: "destructive" }),
    });
  };

  if (isLoading || !rec) {
    return (
      <MobileAppShell hideNav>
        <SubPageHeader title="Record" back="/records" />
        <div className="px-5 space-y-3">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </MobileAppShell>
    );
  }

  const meta = TYPE_META[rec.type] ?? TYPE_META.other;
  const isImage = signedUrl && /\.(png|jpe?g|gif|webp)$/i.test((rec as any).fileUrl ?? "");
  const isPdf = signedUrl && /\.pdf$/i.test((rec as any).fileUrl ?? "");

  return (
    <MobileAppShell hideNav>
      <SubPageHeader
        title={meta.label}
        back="/records"
        right={
          <button
            onClick={() => setLocation(`/records/${id}/edit`)}
            aria-label="Edit"
            className="w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors"
          >
            <EditIcon size={16} />
          </button>
        }
      />

      <div className="px-5 pb-10 space-y-4">
        {/* Hero */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <HealthIcon outline={meta.outline} filled={meta.filled} width="24" height="24" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif font-semibold text-[20px] tracking-[-0.5px] text-foreground">
                  {rec.documentTitle || meta.label}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <Badge variant="secondary" className="rounded-full text-[11px] font-medium px-2.5 py-0.5 capitalize">
                    {meta.label}
                  </Badge>
                  {rec.status && (
                    <Badge className={`rounded-full text-[11px] font-medium px-2.5 py-0.5 border-none capitalize ${STATUS_COLOR[rec.status] ?? "bg-muted text-muted-foreground"}`}>
                      {String(rec.status).replace("_", " ")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                  <Calendar size={11} /> Date
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {rec.dateOfRecord ? new Date(rec.dateOfRecord).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "—"}
                </p>
              </div>
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                  <HospitalIcon size={11} /> Hospital / clinic
                </p>
                <p className="text-sm font-semibold text-foreground mt-1 truncate">
                  {rec.hospitalClinic || "—"}
                </p>
              </div>
              {rec.type === "lab" && (
                <div className="bg-muted/40 rounded-xl p-3 col-span-2">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Lab</p>
                  <p className="text-sm font-semibold text-foreground mt-1">{(rec as any).labName || "—"}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        {(rec as any).notes && (
          <Card className="border-none shadow-sm">
            <CardContent className="p-5">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Notes</p>
              <p className="text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed">{(rec as any).notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Attachment */}
        {(rec as any).fileUrl && (
          <Card className="border-none shadow-sm overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Attachment</p>
                {signedUrl && (
                  <a
                    href={signedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
                  >
                    <DownloadIcon size={12} /> Open
                  </a>
                )}
              </div>
              {isImage ? (
                <a href={signedUrl!} target="_blank" rel="noreferrer" className="block">
                  <img src={signedUrl!} alt="attachment" className="w-full rounded-xl border border-border/40" />
                </a>
              ) : isPdf ? (
                <a href={signedUrl!} target="_blank" rel="noreferrer"
                   className="flex items-center gap-3 p-4 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><FileIcon size={18} /></div>
                  <div className="text-sm font-medium text-foreground">View PDF</div>
                </a>
              ) : (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/40">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><FileIcon size={18} /></div>
                  <div className="text-sm text-muted-foreground">{signedUrl ? "Tap Open above" : "Loading…"}</div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <Button size="lg" variant="soft" className="rounded-xl" onClick={() => setLocation(`/records/${id}/edit`)}>
            <EditIcon size={16} /> Edit
          </Button>
          <Button size="lg" variant="crisis" className="rounded-xl" onClick={handleDelete} disabled={deleteRec.isPending}>
            <TrashIcon size={16} /> Delete
          </Button>
        </div>
      </div>
    </MobileAppShell>
  );
}