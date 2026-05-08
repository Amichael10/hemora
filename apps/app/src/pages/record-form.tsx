import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import {
  useGetCareRecord,
  useCreateCareRecord,
  useUpdateCareRecord,
  useDeleteCareRecord,
  CreateCareRecordBodyType,
  CreateCareRecordBodyStatus,
} from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";
import { supabase } from "@/integrations/supabase/client";
import { UploadSquareLinear as Upload } from "solar-icon-set";

export default function RecordForm() {
  const [, setLocation] = useLocation();
  const [, editParams] = useRoute("/records/:id/edit");
  const id = editParams?.id;
  const isEdit = !!id;
  const { profileId } = useProfile();
  const { toast } = useToast();

  const { data: rec, isLoading } = useGetCareRecord(id);
  const createRec = useCreateCareRecord();
  const updateRec = useUpdateCareRecord();
  const deleteRec = useDeleteCareRecord();

  const [title, setTitle] = useState("");
  const [hospital, setHospital] = useState("");
  const [type, setType] = useState<CreateCareRecordBodyType>(CreateCareRecordBodyType.visit);
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [labName, setLabName] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (rec) {
      setTitle(rec.documentTitle ?? "");
      setHospital(rec.hospitalClinic ?? "");
      setType((rec.type as CreateCareRecordBodyType) ?? CreateCareRecordBodyType.visit);
      if (rec.dateOfRecord) setDate(new Date(rec.dateOfRecord).toISOString().slice(0, 10));
      setLabName((rec as any).labName ?? "");
      setNotes((rec as any).notes ?? "");
      setFileUrl((rec as any).fileUrl ?? null);
    }
  }, [rec]);

  const uploadFile = async (): Promise<string | null> => {
    if (!file) return fileUrl;
    setUploading(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id;
      if (!uid) throw new Error("Not signed in");
      const path = `${uid}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { error } = await supabase.storage.from("care-record-files").upload(path, file);
      if (error) throw error;
      return path;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let savedFileUrl = fileUrl;
    try {
      savedFileUrl = await uploadFile();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
      return;
    }
    const data = {
      profileId, documentTitle: title, hospitalClinic: hospital, type,
      status: CreateCareRecordBodyStatus.saved,
      dateOfRecord: new Date(date).toISOString(),
      labName: type === "lab" ? labName || null : null,
      fileUrl: savedFileUrl,
      notes: type === "other" ? notes || null : null,
    };
    if (isEdit) {
      updateRec.mutate({ id, data }, {
        onSuccess: () => { toast({ title: "Record updated" }); setLocation("/records"); },
        onError: (e: any) => toast({ title: "Couldn't save", description: e?.message, variant: "destructive" }),
      });
    } else {
      createRec.mutate({ data }, {
        onSuccess: () => { toast({ title: "Record added" }); setLocation("/records"); },
        onError: (e: any) => toast({ title: "Couldn't save", description: e?.message, variant: "destructive" }),
      });
    }
  };

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this record?")) return;
    deleteRec.mutate({ id }, { onSuccess: () => { toast({ title: "Deleted" }); setLocation("/records"); } });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title={isEdit ? "Edit record" : "Add record"} back="/records" />
      <div className="px-6 pb-10">
        {isEdit && isLoading ? (
          <div className="space-y-3"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Type</Label>
              <div className="grid grid-cols-4 gap-2">
                {(["visit", "lab", "imaging", "other"] as CreateCareRecordBodyType[]).map((t) => (
                  <Button key={t} type="button" variant={type === t ? "default" : "outline"} onClick={() => setType(t)}
                    className={`h-11 capitalize text-xs rounded-xl ${type === t ? "" : "bg-card border-border/60"}`}>{t}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2"><Label className="text-sm font-medium">Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Blood Work"
                className="h-12 text-base rounded-xl bg-card border-border/60" /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Hospital / Clinic</Label>
              <Input value={hospital} onChange={(e) => setHospital(e.target.value)} placeholder="e.g. General Hospital"
                className="h-12 text-base rounded-xl bg-card border-border/60" /></div>
            <div className="space-y-2"><Label className="text-sm font-medium">Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                className="h-12 text-base rounded-xl bg-card border-border/60" /></div>

            {type === "lab" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Lab name <span className="text-muted-foreground font-normal">(optional)</span></Label>
                <Input value={labName} onChange={(e) => setLabName(e.target.value)} placeholder="e.g. Synlab, Clinix"
                  className="h-12 text-base rounded-xl bg-card border-border/60" />
              </div>
            )}

            {type === "imaging" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Upload image / scan</Label>
                <label htmlFor="rec-file" className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-border/60 bg-card cursor-pointer hover:border-primary/40 transition-colors">
                  <Upload size={22} />
                  <span className="text-sm text-muted-foreground">{file ? file.name : fileUrl ? "File attached — choose to replace" : "Tap to choose a file"}</span>
                  <input id="rec-file" type="file" accept="image/*,application/pdf" className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </label>
              </div>
            )}

            {type === "other" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Notes</Label>
                <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add any details about this record"
                  className="min-h-[120px] rounded-xl bg-card border-border/60 text-base" />
              </div>
            )}

            <Button type="submit" size="xl" className="w-full mt-6" disabled={createRec.isPending || updateRec.isPending || uploading}>
              {isEdit ? "Save changes" : "Add record"}
            </Button>
            {isEdit && (
              <Button type="button" variant="crisis" size="xl" className="w-full" onClick={handleDelete} disabled={deleteRec.isPending}>
                Delete record
              </Button>
            )}
          </form>
        )}
      </div>
    </MobileAppShell>
  );
}