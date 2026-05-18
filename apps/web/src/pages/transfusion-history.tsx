import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { Filter, Download, Share2 } from "lucide-react";

export default function TransfusionHistory() {
  const [, setLocation] = useLocation();

  return (
    <MobileAppShell hideNav>
      <div className="flex items-center justify-between px-4 pt-6">
        <SubPageHeader title="History & export" back="/transfusion" className="pt-0 pb-0" />
        <button className="p-2 mr-2 rounded-full hover:bg-muted transition-colors">
          <Filter size={20} className="text-foreground" />
        </button>
      </div>
      <div className="px-6 pb-10">
        <p className="text-sm text-muted-foreground mb-6">Review your history and share a summary with your care team.</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-card p-1 rounded-full border border-border">
          <button className="flex-1 py-2 px-4 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm transition-all">Transfusions</button>
          <button className="flex-1 py-2 px-4 rounded-full text-muted-foreground text-xs font-semibold hover:bg-muted transition-all">Ferritin</button>
          <button className="flex-1 py-2 px-4 rounded-full text-muted-foreground text-xs font-semibold hover:bg-muted transition-all">Chelation</button>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-border ml-3 space-y-8 mb-10">
          {/* May 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">May 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" />
            <div className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => setLocation("/transfusion/detail")}>
              <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-bold text-foreground">May 16, 2025</div>
                <div className="bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30">
                  <span className="text-[10px] font-bold text-accent">Completed</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">2 units • LUTH Sickle Cell Clinic</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">Ferritin: 842 ng/mL</span>
                <div className="bg-primary/10 px-1.5 py-0.5 rounded">
                  <span className="text-[10px] font-bold text-primary">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Apr 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">Apr 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" />
            <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-bold text-foreground">Apr 16, 2025</div>
                <div className="bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30">
                  <span className="text-[10px] font-bold text-accent">Completed</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">1 unit • LUTH Sickle Cell Clinic</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">Ferritin: 765 ng/mL</span>
                <div className="bg-primary/10 px-1.5 py-0.5 rounded">
                  <span className="text-[10px] font-bold text-primary">High</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mar 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">Mar 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" />
            <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-bold text-foreground">Mar 18, 2025</div>
                <div className="bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30">
                  <span className="text-[10px] font-bold text-accent">Completed</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">2 units • LUTH Sickle Cell Clinic</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">Ferritin: 690 ng/mL</span>
                <div className="bg-accent/15 px-1.5 py-0.5 rounded">
                  <span className="text-[10px] font-bold text-accent">Moderate</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feb 2025 */}
          <div className="relative pl-6">
            <div className="text-xs font-semibold text-muted-foreground/80 mb-3 uppercase tracking-wider -ml-6 bg-background inline-block pr-2">Feb 2025</div>
            <div className="absolute left-[-5px] top-[28px] w-2.5 h-2.5 bg-secondary rounded-full ring-4 ring-background" />
            <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-bold text-foreground">Feb 12, 2025</div>
                <div className="bg-accent/15 px-2 py-0.5 rounded flex items-center gap-1 border border-accent/30">
                  <span className="text-[10px] font-bold text-accent">Completed</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-2">1 unit • LUTH Sickle Cell Clinic</div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">Ferritin: 620 ng/mL</span>
                <div className="bg-accent/15 px-1.5 py-0.5 rounded">
                  <span className="text-[10px] font-bold text-accent">Moderate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Button 
          size="xl"
          className="w-full rounded-2xl shadow-md mb-3" 
        >
          <Download size={18} className="mr-2" />
          Export summary
        </Button>
        <Button 
          variant="outline"
          size="xl"
          className="w-full rounded-2xl"
        >
          <Share2 size={18} className="mr-2" />
          Share with doctor
        </Button>
      </div>
    </MobileAppShell>
  );
}
