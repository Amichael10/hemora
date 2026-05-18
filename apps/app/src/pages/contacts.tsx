import { useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  useListEmergencyContacts,
  useCreateEmergencyContact,
  useDeleteEmergencyContact,
  getListEmergencyContactsQueryKey,
} from "@workspace/api-client-react";
import { useProfile } from "@/context/ProfileContext";
import { AddCircleLinear as Plus, TrashBinTrashLinear as Trash, PhoneLinear as Phone } from "solar-icon-set";

export default function Contacts() {
  const { profileId } = useProfile();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("");

  const { data: contacts, isLoading } = useListEmergencyContacts(
    { profileId },
    { query: { queryKey: getListEmergencyContactsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const create = useCreateEmergencyContact();
  const del = useDeleteEmergencyContact();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate({ data: { fullName: name, phone, relationship } }, {
      onSuccess: () => {
        toast({ title: "Contact added" });
        setOpen(false); setName(""); setPhone(""); setRelationship("");
      },
    });
  };

  return (
    <MobileAppShell>
      <SubPageHeader
        title="Emergency contacts"
        back="/settings"
        right={
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Add contact" className="w-9 h-9 rounded-full flex items-center justify-center bg-primary text-primary-foreground">
                <Plus size={16} />
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl sm:max-w-[430px] mx-auto">
              <SheetHeader><SheetTitle>Add contact</SheetTitle></SheetHeader>
              <form onSubmit={handleAdd} className="space-y-3 mt-4">
                <div className="space-y-1.5"><Label>Full name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div className="space-y-1.5"><Label>Phone</Label>
                  <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></div>
                <div className="space-y-1.5"><Label>Relationship</Label>
                  <Input value={relationship} onChange={(e) => setRelationship(e.target.value)} placeholder="e.g. Mother" /></div>
                <Button type="submit" size="xl" className="w-full" disabled={create.isPending}>Add contact</Button>
              </form>
            </SheetContent>
          </Sheet>
        }
      />
      <div className="px-5 pb-10">
        {isLoading ? (
          <div className="space-y-3"><Skeleton className="h-16 w-full rounded-2xl" /><Skeleton className="h-16 w-full rounded-2xl" /></div>
        ) : !contacts?.length ? (
          <div className="mt-2 px-1">
            <div className="surface-soft p-8 text-center rounded-[32px] border border-border/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-primary/10 relative z-10"
                   style={{ background: "var(--gradient-royal)" }}>
                <Phone size={36} className="text-white" />
              </div>
              <h3 className="h-card mb-2">No emergency contacts</h3>
              <p className="p-muted mb-8 max-w-[260px] mx-auto">
                Add your primary caregivers or family members so they can be reached quickly during a health crisis.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 text-left relative z-10">
                {[
                  { icon: <Phone size={14} />, label: "Quick Dial" },
                  { icon: <Plus size={14} />, label: "Care Network" },
                  { icon: <Plus size={14} />, label: "Family Alert" },
                  { icon: <Phone size={14} />, label: "Emergency SMS" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-2xl bg-white/50 border border-white/20">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-medium text-foreground/80">{item.label}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full shadow-md" onClick={() => setOpen(true)}>
                <Plus size={18} className="mr-2" /> Add your first contact
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="bg-card rounded-2xl border border-border/60 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{c.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {c.phone}{c.relationship ? ` · ${c.relationship}` : ""}
                  </p>
                </div>
                <button
                  aria-label="Delete"
                  className="text-muted-foreground hover:text-destructive p-2"
                  onClick={() => { if (confirm("Remove contact?")) del.mutate({ id: c.id }); }}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}