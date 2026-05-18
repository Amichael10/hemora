import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Calendar, Droplet, CheckCircle2, Edit2, Share2, Syringe } from "lucide-react";

export default function TransfusionDetail() {
  const [, setLocation] = useLocation();

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Transfusion detail" back="/transfusion" />
      <div className="px-6 pb-10">
        <p className="text-sm text-muted-foreground mb-6">Recorded on May 16, 2025 at 8:00 PM</p>
        
        {/* Summary Card */}
        <h3 className="text-sm font-semibold text-foreground mb-3 ml-1">Summary</h3>
        <div className="bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Transfusion date</span>
            </div>
            <span className="text-sm font-medium text-foreground">May 16, 2025</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <Droplet size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Units received</span>
            </div>
            <span className="text-sm font-medium text-foreground">2 units</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5">H</span>
              <span className="text-sm text-foreground">Hospital / clinic</span>
            </div>
            <span className="text-sm font-medium text-foreground">LUTH Sickle Cell Clinic</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5">R</span>
              <span className="text-sm text-foreground">Reason</span>
            </div>
            <span className="text-sm font-medium text-foreground">Pain crisis</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5">B</span>
              <span className="text-sm text-foreground">Blood type / compatibility</span>
            </div>
            <span className="text-sm font-medium text-foreground">O+ (Compatible)</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border/20">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5">Hb</span>
              <span className="text-sm text-foreground">Pre-transfusion Hb</span>
            </div>
            <span className="text-sm font-medium text-foreground">8.2 g/dL</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-xs font-bold border border-border/40 rounded px-1.5 py-0.5">Rx</span>
              <span className="text-sm text-foreground">Reactions / notes</span>
            </div>
            <span className="text-sm font-medium text-foreground">Mild headache</span>
          </div>
        </div>

        {/* Iron & Chelation */}
        <h3 className="text-sm font-semibold text-foreground mb-3 ml-1">Iron & chelation</h3>
        <div className="bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Ferritin (May 16, 2025)</div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">842</span>
                <span className="text-xs font-medium text-foreground">ng/mL</span>
              </div>
            </div>
            <div className="bg-primary/10 px-2 py-1 rounded">
               <span className="text-xs font-bold text-primary">High</span>
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Chelation therapy</div>
              <div className="text-sm font-medium text-foreground">Deferasirox (Exjade)</div>
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Dose</div>
              <div className="text-sm font-medium text-foreground">1500 mg once daily</div>
            </div>
          </div>
        </div>

        {/* History Preview */}
        <h3 className="text-sm font-semibold text-foreground mb-3 ml-1">History</h3>
        <div className="bg-card rounded-[24px] p-5 mb-8 border border-border/40 shadow-sm">
          <div className="relative border-l border-border/40 ml-3 space-y-6">
            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full" />
              <div className="text-sm font-bold text-foreground mb-1">May 16, 2025 - Completed</div>
              <div className="text-xs text-muted-foreground">2 units • LUTH Sickle Cell Clinic</div>
            </div>
            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full opacity-50" />
              <div className="text-sm font-medium text-foreground mb-1">Apr 16, 2025 - Completed</div>
              <div className="text-xs text-muted-foreground">1 unit • LUTH Sickle Cell Clinic</div>
            </div>
            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full opacity-50" />
              <div className="text-sm font-medium text-foreground mb-1">Mar 18, 2025 - Completed</div>
              <div className="text-xs text-muted-foreground">2 units • LUTH Sickle Cell Clinic</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 px-2">
          <button className="flex flex-col items-center gap-2 flex-1" onClick={() => setLocation("/transfusion/new")}>
             <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors">
               <Edit2 size={20} className="text-foreground" />
             </div>
             <span className="text-xs font-medium text-foreground">Edit record</span>
          </button>
          <button className="flex flex-col items-center gap-2 flex-1" onClick={() => setLocation("/iron-monitoring")}>
             <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors">
               <Droplet size={20} className="text-foreground" />
             </div>
             <span className="text-xs font-medium text-foreground">Add ferritin</span>
          </button>
          <button className="flex flex-col items-center gap-2 flex-1">
             <div className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center bg-card hover:bg-border/10 transition-colors">
               <Share2 size={20} className="text-foreground" />
             </div>
             <span className="text-xs font-medium text-foreground">Share with doctor</span>
          </button>
        </div>

      </div>
    </MobileAppShell>
  );
}
