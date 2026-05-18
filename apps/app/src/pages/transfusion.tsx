import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/context/ProfileContext";
import {
  useListTransfusionLogs,
  getListTransfusionLogsQueryKey,
} from "@workspace/api-client-react";
import { ArrowUpRight, Calendar, Droplet, Leaf, CheckCircle2 } from "lucide-react";

export default function Transfusion() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();

  const { data: transfusions, isLoading } = useListTransfusionLogs(
    { profileId },
    { query: { queryKey: getListTransfusionLogsQueryKey({ profileId }), enabled: !!profileId } }
  );

  const hasTransfusions = transfusions && transfusions.length > 0;
  const displayList = hasTransfusions ? transfusions.map(log => ({
    id: log.id,
    date: new Date(log.occurredAt).toLocaleDateString([], { dateStyle: 'medium' }),
    hospital: log.hospital || "Hospital / Clinic",
    units: `${log.unitsCount || 1} unit${(log.unitsCount ?? 1) > 1 ? 's' : ''}`
  })) : [
    { id: "mock-1", date: "May 14, 2025", hospital: "LUTH Sickle Cell Clinic", units: "2 units" },
    { id: "mock-2", date: "Apr 16, 2025", hospital: "LUTH Sickle Cell Clinic", units: "1 unit" },
    { id: "mock-3", date: "Mar 18, 2025", hospital: "LUTH Sickle Cell Clinic", units: "2 units" },
    { id: "mock-4", date: "Feb 12, 2025", hospital: "LUTH Sickle Cell Clinic", units: "1 unit" },
  ];

  return (
    <MobileAppShell>
      <div className="p-6 pb-24 bg-background min-h-screen">
        <div className="mb-8 mt-2">
           <h1 className="text-[28px] font-serif text-foreground mb-2 leading-tight">Transfusion & iron log</h1>
           <p className="text-sm text-muted-foreground font-sans max-w-[85%]">Track transfusions, ferritin levels, and iron management.</p>
        </div>

        {/* Ferritin Card */}
        <div className="bg-card rounded-[24px] p-5 mb-8 border border-border shadow-sm">
           <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full border-[4px] border-[#193B3F]/10 border-l-[#A8324A] flex items-center justify-center bg-card">
                 <Droplet className="text-primary" size={24} fill="currentColor" />
              </div>
              <div className="flex-1">
                 <div className="text-xs font-medium text-muted-foreground mb-1">Latest ferritin</div>
                 <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-[32px] font-bold text-foreground leading-none">842</span>
                    <span className="text-sm font-medium text-foreground">ng/mL</span>
                    <div className="bg-[#FFE5E5] px-1.5 py-0.5 rounded ml-1">
                       <span className="text-[10px] font-bold text-[#D93025]">High</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-1">
                    <ArrowUpRight size={14} className="text-foreground" />
                    <span className="text-xs font-medium text-foreground">Up 12% from last result</span>
                 </div>
              </div>
           </div>

           <div className="h-px bg-border mb-4" />

           <div className="flex justify-between">
              <div className="flex items-center gap-2.5">
                 <Calendar size={18} className="text-foreground" />
                 <div>
                    <div className="text-[10px] font-medium text-muted-foreground mb-0.5">Next follow-up</div>
                    <div className="text-xs font-medium text-foreground">June 10, 2025</div>
                 </div>
              </div>
              <div className="flex items-center gap-2.5">
                 <Leaf size={18} className="text-foreground" />
                 <div>
                    <div className="text-[10px] font-medium text-muted-foreground mb-0.5">On chelation</div>
                    <div className="text-xs font-medium text-foreground">Deferasirox</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Recent Transfusions */}
        <div className="flex justify-between items-center mb-4">
           <h2 className="text-[20px] font-serif text-foreground">Recent transfusions</h2>
           <button className="text-xs font-medium text-foreground/90" onClick={() => setLocation("/transfusion/history")}>View all</button>
        </div>

        <div className="mb-8">
           {displayList.map((item, i) => (
             <div key={i} className="flex items-center py-4 border-b border-border last:border-0 cursor-pointer" onClick={() => setLocation(`/transfusion/${item.id}`)}>
                <div className="flex-[2]">
                   <div className="text-sm font-medium text-foreground mb-0.5">{item.date}</div>
                   <div className="text-xs font-sans text-muted-foreground">{item.hospital}</div>
                </div>
                <div className="flex-1 items-start">
                   <div className="text-[13px] font-medium text-foreground">{item.units}</div>
                </div>
                <div className="flex-1 flex justify-end">
                   <div className="flex items-center gap-1 bg-[#F0FDF4] px-2 py-1 rounded-full">
                      <span className="text-[10px] font-medium text-[#15803d]">Completed</span>
                      <CheckCircle2 size={12} className="text-[#15803d]" strokeWidth={3} />
                   </div>
                </div>
             </div>
           ))}
        </div>

        <Button 
          className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white text-base font-bold shadow-md"
          onClick={() => setLocation("/transfusion/new")}
        >
          Add transfusion
        </Button>
      </div>
    </MobileAppShell>
  );
}
