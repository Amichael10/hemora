import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export default function RecordForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/records/:id");
  const id = params?.id && params.id !== "new" ? params.id : undefined;
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

  useEffect(() => {
    if (rec) {
      setTitle(rec.documentTitle ?? "");
      setHospital(rec.hospitalClinic ?? "");
      setType((rec.type as CreateCareRecordBodyType) ?? CreateCareRecordBodyType.visit);
      if (rec.dateOfRecord) setDate(new Date(rec.dateOfRecord).toISOString().slice(0, 10));
    }
  }, [rec]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      profileId, documentTitle: title, hospitalClinic: hospital, type,
      status: CreateCareRecordBodyStatus.saved,
      dateOfRecord: new Date(date).toISOString(),
    };
    if (isEdit) {
      updateRec.mutate({ id, data }, { onSuccess: () => { toast({ title: "Record updated" }); setLocation("/records"); } });
    } else {
      createRec.mutate({ data }, { onSuccess: () => { toast({ title: "Record added" }); setLocation("/records"); } });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5"><Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. Blood Work" /></div>
            <div className="space-y-1.5"><Label>Hospital / Clinic</Label>
              <Input value={hospital} onChange={(e) => setHospital(e.target.value)} placeholder="e.g. General Hospital" /></div>
            <div className="space-y-1.5"><Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>Type</Label>
              <div className="flex gap-2">
                {(["visit", "lab", "imaging", "other"] as CreateCareRecordBodyType[]).map((t) => (
                  <Button key={t} type="button" variant={type === t ? "default" : "outline"} onClick={() => setType(t)} className="flex-1 capitalize">{t}</Button>
                ))}
              </div>
            </div>
            <Button type="submit" size="xl" className="w-full mt-6" disabled={createRec.isPending || updateRec.isPending}>
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