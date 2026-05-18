import { useRoute, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Droplet, Edit2, Share2 } from "lucide-react";
import { useGetTransfusionLog } from "@workspace/api-client-react";

export default function TransfusionDetail() {
  const [, params] = useRoute("/transfusion/:id");
  const [, setLocation] = useLocation();
  const id = params?.id;

  const isMock = id && id.startsWith("mock-");
  const { data: realLog, isLoading } = useGetTransfusionLog(isMock ? undefined : id);

  const mockLogs: Record<string, any> = {
    "mock-1": {
      occurredAt: "2025-05-16T20:00:00.000Z",
      unitsCount: 2,
      hospital: "LUTH Sickle Cell Clinic",
      reason: "Pain crisis",
      bloodType: "O+ (Compatible)",
      hemoglobinPre: "8.2 g/dL",
      reaction: true,
      reactionNotes: "Mild headache"
    },
    "mock-2": {
      occurredAt: "2025-04-16T15:00:00.000Z",
      unitsCount: 1,
      hospital: "LUTH Sickle Cell Clinic",
      reason: "Severe anemia",
      bloodType: "O+ (Compatible)",
      hemoglobinPre: "7.1 g/dL",
      reaction: false,
      reactionNotes: null
    },
    "mock-3": {
      occurredAt: "2025-03-18T10:00:00.000Z",
      unitsCount: 2,
      hospital: "LUTH Sickle Cell Clinic",
      reason: "Routine chronic transfusion",
      bloodType: "O+ (Compatible)",
      hemoglobinPre: "8.0 g/dL",
      reaction: false,
      reactionNotes: null
    },
    "mock-4": {
      occurredAt: "2025-02-12T11:00:00.000Z",
      unitsCount: 1,
      hospital: "LUTH Sickle Cell Clinic",
      reason: "Acute chest syndrome",
      bloodType: "O+ (Compatible)",
      hemoglobinPre: "7.8 g/dL",
      reaction: false,
      reactionNotes: null
    }
  };

  const log = isMock ? mockLogs[id || "mock-1"] : realLog;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Transfusion detail" back="/transfusion" />
      <div className="px-6 pb-10 bg-background min-h-screen">
        {isLoading ? (
          <div className="space-y-4 pt-6">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-40 w-full rounded-[24px]" />
            <Skeleton className="h-40 w-full rounded-[24px]" />
          </div>
        ) : !log ? (
          <p className="text-center text-muted-foreground py-12">Log not found.</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">Recorded on {formatDate(log.occurredAt)}</p>
            
            {/* Summary Card */}
            <h3 className="text-sm font-semibold text-[#193B3F] mb-3 ml-1">Summary</h3>
            <div className="bg-white rounded-[24px] p-5 mb-8 border border-[#193B3F]/10 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#193B3F]/5">
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-[#193B3F]/60" />
                  <span className="text-sm text-[#193B3F]">Transfusion date</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{new Date(log.occurredAt).toLocaleDateString([], { dateStyle: 'medium' })}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#193B3F]/5">
                <div className="flex items-center gap-3">
                  <Droplet size={16} className="text-[#193B3F]/60" />
                  <span className="text-sm text-[#193B3F]">Units received</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{log.unitsCount} unit{log.unitsCount > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#193B3F]/5">
                <div className="flex items-center gap-3">
                  <span className="text-[#193B3F]/60 text-xs font-bold border border-[#193B3F]/40 rounded px-1">H</span>
                  <span className="text-sm text-[#193B3F]">Hospital / clinic</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{log.hospital || "—"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#193B3F]/5">
                <div className="flex items-center gap-3">
                  <span className="text-[#193B3F]/60 text-xs font-bold border border-[#193B3F]/40 rounded px-1">R</span>
                  <span className="text-sm text-[#193B3F]">Reason</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{log.reason || "—"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#193B3F]/5">
                <div className="flex items-center gap-3">
                  <span className="text-[#193B3F]/60 text-xs font-bold border border-[#193B3F]/40 rounded px-1">B</span>
                  <span className="text-sm text-[#193B3F]">Blood type / compatibility</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{log.bloodType || "—"}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[#193B3F]/5">
                <div className="flex items-center gap-3">
                  <span className="text-[#193B3F]/60 text-xs font-bold border border-[#193B3F]/40 rounded px-1">Hb</span>
                  <span className="text-sm text-[#193B3F]">Pre-transfusion Hb</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{log.hemoglobinPre || "—"}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-[#193B3F]/60 text-xs font-bold border border-[#193B3F]/40 rounded px-1">Rx</span>
                  <span className="text-sm text-[#193B3F]">Reactions / notes</span>
                </div>
                <span className="text-sm font-medium text-[#193B3F]">{log.reaction ? log.reactionNotes || "Reaction logged" : "None"}</span>
              </div>
            </div>

            {/* Iron & Chelation */}
            <h3 className="text-sm font-semibold text-[#193B3F] mb-3 ml-1">Iron & chelation</h3>
            <div className="bg-white rounded-[24px] p-5 mb-8 border border-[#193B3F]/10 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="text-xs font-medium text-[#193B3F]/60 mb-1">Ferritin (May 16, 2025)</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#193B3F]">842</span>
                    <span className="text-xs font-medium text-[#193B3F]">ng/mL</span>
                  </div>
                </div>
                <div className="bg-[#FFE5E5] px-2 py-1 rounded">
                   <span className="text-xs font-bold text-[#D93025]">High</span>
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <div className="text-xs font-medium text-[#193B3F]/60 mb-1">Chelation therapy</div>
                  <div className="text-sm font-medium text-[#193B3F]">Deferasirox (Exjade)</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-[#193B3F]/60 mb-1">Dose</div>
                  <div className="text-sm font-medium text-[#193B3F]">1500 mg once daily</div>
                </div>
              </div>
            </div>

            {/* History Preview */}
            <h3 className="text-sm font-semibold text-[#193B3F] mb-3 ml-1">History</h3>
            <div className="bg-white rounded-[24px] p-5 mb-8 border border-[#193B3F]/10 shadow-sm">
              <div className="relative border-l border-[#193B3F]/20 ml-3 space-y-6">
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-[#15803d] rounded-full" />
                  <div className="text-sm font-bold text-[#193B3F] mb-1">May 16, 2025 - Completed</div>
                  <div className="text-xs text-[#193B3F]/70">2 units • LUTH Sickle Cell Clinic</div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-[#15803d] rounded-full opacity-50" />
                  <div className="text-sm font-medium text-[#193B3F] mb-1">Apr 16, 2025 - Completed</div>
                  <div className="text-xs text-[#193B3F]/70">1 unit • LUTH Sickle Cell Clinic</div>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-[#15803d] rounded-full opacity-50" />
                  <div className="text-sm font-medium text-[#193B3F] mb-1">Mar 18, 2025 - Completed</div>
                  <div className="text-xs text-[#193B3F]/70">2 units • LUTH Sickle Cell Clinic</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 px-2">
              <button className="flex flex-col items-center gap-2 flex-1" onClick={() => setLocation("/transfusion/new")}>
                 <div className="w-12 h-12 rounded-full border border-[#193B3F]/20 flex items-center justify-center">
                   <Edit2 size={20} className="text-[#193B3F]" />
                 </div>
                 <span className="text-xs font-medium text-[#193B3F]">Edit record</span>
              </button>
              <button className="flex flex-col items-center gap-2 flex-1" onClick={() => setLocation("/iron-monitoring")}>
                 <div className="w-12 h-12 rounded-full border border-[#193B3F]/20 flex items-center justify-center">
                   <Droplet size={20} className="text-[#193B3F]" />
                 </div>
                 <span className="text-xs font-medium text-[#193B3F]">Add ferritin result</span>
              </button>
              <button className="flex flex-col items-center gap-2 flex-1">
                 <div className="w-12 h-12 rounded-full border border-[#193B3F]/20 flex items-center justify-center">
                   <Share2 size={20} className="text-[#193B3F]" />
                 </div>
                 <span className="text-xs font-medium text-[#193B3F]">Share with doctor</span>
              </button>
            </div>
          </>
        )}
      </div>
    </MobileAppShell>
  );
}
