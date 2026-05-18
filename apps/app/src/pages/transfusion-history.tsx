import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Filter, Download, Share2 } from "lucide-react";

export default function TransfusionHistory() {
  const [, setLocation] = useLocation();

  return (
    <MobileAppShell hideNav>
      <div className="flex items-center justify-between px-4 pt-6 bg-background">
        <SubPageHeader title="History & export" back="/transfusion" className="pt-0 pb-0" />
        <button className="p-2 mr-2 rounded-full hover:bg-[#193B3F]/5">
           <Filter size={20} className="text-[#193B3F]" />
        </button>
      </div>
      <div className="px-6 pb-10 bg-background min-h-screen">
        <p className="text-sm text-muted-foreground mb-6">Review your history and share a summary with your care team.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-1 rounded-full border border-[#193B3F]/10">
          <button className="flex-1 py-2 px-4 rounded-full bg-[#193B3F] text-white text-xs font-bold shadow-sm">Transfusions</button>
          <button className="flex-1 py-2 px-4 rounded-full text-[#193B3F]/70 text-xs font-semibold hover:bg-[#193B3F]/5">Ferritin</button>
          <button className="flex-1 py-2 px-4 rounded-full text-[#193B3F]/70 text-xs font-semibold hover:bg-[#193B3F]/5">Chelation</button>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-[#193B3F]/20 ml-3 space-y-8 mb-10">
          {/* May 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-[#193B3F]/60 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">May 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-[#15803d] rounded-full ring-4 ring-background" />
            <div className="bg-white rounded-2xl p-4 border border-[#193B3F]/10 shadow-sm" onClick={() => setLocation("/transfusion/detail")}>
               <div className="flex justify-between items-start mb-1">
                 <div className="text-sm font-bold text-[#193B3F]">May 16, 2025</div>
                 <div className="bg-[#F0FDF4] px-2 py-0.5 rounded flex items-center gap-1 border border-[#15803d]/20">
                    <span className="text-[10px] font-bold text-[#15803d]">Completed</span>
                 </div>
               </div>
               <div className="text-xs text-[#193B3F]/70 mb-2">2 units • LUTH Sickle Cell Clinic</div>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-medium text-[#193B3F]">Ferritin: 842 ng/mL</span>
                 <div className="bg-[#FFE5E5] px-1.5 py-0.5 rounded">
                    <span className="text-[10px] font-bold text-[#D93025]">High</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Apr 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-[#193B3F]/60 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">Apr 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-[#15803d] rounded-full ring-4 ring-background" />
            <div className="bg-white rounded-2xl p-4 border border-[#193B3F]/10 shadow-sm">
               <div className="flex justify-between items-start mb-1">
                 <div className="text-sm font-bold text-[#193B3F]">Apr 16, 2025</div>
                 <div className="bg-[#F0FDF4] px-2 py-0.5 rounded flex items-center gap-1 border border-[#15803d]/20">
                    <span className="text-[10px] font-bold text-[#15803d]">Completed</span>
                 </div>
               </div>
               <div className="text-xs text-[#193B3F]/70 mb-2">1 unit • LUTH Sickle Cell Clinic</div>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-medium text-[#193B3F]">Ferritin: 765 ng/mL</span>
                 <div className="bg-[#FFE5E5] px-1.5 py-0.5 rounded">
                    <span className="text-[10px] font-bold text-[#D93025]">High</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Mar 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-[#193B3F]/60 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">Mar 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-[#15803d] rounded-full ring-4 ring-background" />
            <div className="bg-white rounded-2xl p-4 border border-[#193B3F]/10 shadow-sm">
               <div className="flex justify-between items-start mb-1">
                 <div className="text-sm font-bold text-[#193B3F]">Mar 18, 2025</div>
                 <div className="bg-[#F0FDF4] px-2 py-0.5 rounded flex items-center gap-1 border border-[#15803d]/20">
                    <span className="text-[10px] font-bold text-[#15803d]">Completed</span>
                 </div>
               </div>
               <div className="text-xs text-[#193B3F]/70 mb-2">2 units • LUTH Sickle Cell Clinic</div>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-medium text-[#193B3F]">Ferritin: 690 ng/mL</span>
                 <div className="bg-orange-100 px-1.5 py-0.5 rounded">
                    <span className="text-[10px] font-bold text-orange-800">Moderate</span>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Feb 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-[#193B3F]/60 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">Feb 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-[#15803d] rounded-full ring-4 ring-background" />
            <div className="bg-white rounded-2xl p-4 border border-[#193B3F]/10 shadow-sm">
               <div className="flex justify-between items-start mb-1">
                 <div className="text-sm font-bold text-[#193B3F]">Feb 12, 2025</div>
                 <div className="bg-[#F0FDF4] px-2 py-0.5 rounded flex items-center gap-1 border border-[#15803d]/20">
                    <span className="text-[10px] font-bold text-[#15803d]">Completed</span>
                 </div>
               </div>
               <div className="text-xs text-[#193B3F]/70 mb-2">1 unit • LUTH Sickle Cell Clinic</div>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-medium text-[#193B3F]">Ferritin: 620 ng/mL</span>
                 <div className="bg-orange-100 px-1.5 py-0.5 rounded">
                    <span className="text-[10px] font-bold text-orange-800">Moderate</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full h-14 rounded-2xl bg-[#193B3F] hover:bg-[#11292b] text-white text-base font-bold shadow-md mb-3" 
        >
          <Download size={18} className="mr-2" />
          Export summary
        </Button>
        <Button 
          variant="outline"
          className="w-full h-14 rounded-2xl text-[#193B3F] border-[#193B3F]/20 hover:bg-[#193B3F]/5 font-bold text-base bg-transparent"
        >
          <Share2 size={18} className="mr-2" />
          Share with doctor
        </Button>
      </div>
    </MobileAppShell>
  );
}
