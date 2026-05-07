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
  useGetMedication,
  useCreateMedication,
  useUpdateMedication,
  useDeleteMedication,
  CreateMedicationBodyStatus,
} from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";

export default function MedForm() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/meds/:id");
  const id = params?.id && params.id !== "new" ? params.id : undefined;
  const isEdit = !!id;
  const { profileId } = useProfile();
  const { toast } = useToast();

  const { data: med, isLoading } = useGetMedication(id);
  const createMed = useCreateMedication();
  const updateMed = useUpdateMedication();
  const deleteMed = useDeleteMedication();

  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [frequency, setFrequency] = useState("Once daily");
  const [reminderTime, setReminderTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (med) {
      setName(med.name ?? "");
      setDose(med.dose ?? "");
      setFrequency(med.frequency ?? "Once daily");
      setReminderTime(med.reminderTime ?? "");
      setNotes(med.notes ?? "");
    }
  }, [med]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, dose, frequency, reminderTime, notes, profileId, status: CreateMedicationBodyStatus.ongoing, reminderEnabled: true };
    if (isEdit) {
      updateMed.mutate({ id, data }, {
        onSuccess: () => { toast({ title: "Medication updated" }); setLocation("/meds"); },
      });
    } else {
      createMed.mutate({ data }, {
        onSuccess: () => { toast({ title: "Medication added" }); setLocation("/meds"); },
      });
    }
  };

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("Delete this medication?")) return;
    deleteMed.mutate({ id }, {
      onSuccess: () => { toast({ title: "Deleted" }); setLocation("/meds"); },
    });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title={isEdit ? "Edit medication" : "Add medication"} back="/meds" />
      <div className="px-6 pb-10">
        {isEdit && isLoading ? (
          <div className="space-y-3"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /></div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5"><Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Hydroxyurea" /></div>
            <div className="space-y-1.5"><Label>Dose</Label>
              <Input value={dose} onChange={(e) => setDose(e.target.value)} placeholder="e.g. 500mg" /></div>
            <div className="space-y-1.5"><Label>Frequency</Label>
              <Input value={frequency} onChange={(e) => setFrequency(e.target.value)} required /></div>
            <div className="space-y-1.5"><Label>Reminder time</Label>
              <Input type="time" value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Notes</Label>
              <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" /></div>
            <Button type="submit" size="xl" className="w-full mt-6" disabled={createMed.isPending || updateMed.isPending}>
              {isEdit ? "Save changes" : "Add medication"}
            </Button>
            {isEdit && (
              <Button type="button" variant="crisis" size="xl" className="w-full" onClick={handleDelete} disabled={deleteMed.isPending}>
                Delete medication
              </Button>
            )}
          </form>
        )}
      </div>
    </MobileAppShell>
  );
}