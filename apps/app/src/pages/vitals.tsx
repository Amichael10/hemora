import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HealthIcon } from "@/components/ui/health-icon";
import { useProfile } from "@/context/ProfileContext";
import {
  useListVitalsLogs,
  getListVitalsLogsQueryKey,
} from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCircleLinear as Plus, CalendarLinear as Calendar, HeartLinear as Heart, ThermometerLinear as Temp, WindLinear as Oxygen } from "solar-icon-set";
import {
  HeartBold as HeartFilled,
  ThermometerBold as TempFilled,
  WindBold as OxygenFilled,
} from "solar-icon-set";
import { Droplet } from "lucide-react";

export default function Vitals() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const [hydration, setHydration] = useState(750); // mock initial value in ml
  const hydrationGoal = 2500; // ml

  const { data: vitals, isLoading } = useListVitalsLogs(
    { profileId },
    { query: { queryKey: getListVitalsLogsQueryKey({ profileId }), enabled: !!profileId } }
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <HealthIcon outline={Temp} filled={TempFilled} width="16" height="16" />;
      case 'spo2': return <HealthIcon outline={Oxygen} filled={OxygenFilled} width="16" height="16" />;
      default: return <HealthIcon outline={Heart} filled={HeartFilled} width="16" height="16" />;
    }
  };

  const getUnitSuffix = (type: string) => {
    switch (type) {
      case 'temperature': return "°C";
      case 'spo2': return "%";
      case 'blood_pressure': return "mmHg";
      case 'heart_rate': return "bpm";
      default: return "";
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'temperature': return "Temperature";
      case 'spo2': return "SpO2 (Oxygen)";
      case 'blood_pressure': return "Blood Pressure";
      case 'heart_rate': return "Heart Rate";
      default: return type;
    }
  };

  return (
    <MobileAppShell>
      <div className="p-6 pb-24 bg-background min-h-screen">
        <div className="flex items-center justify-between mb-8 mt-2">
          <div>
            <h1 className="text-[28px] font-serif text-foreground mb-2 leading-tight">Vitals & Monitoring</h1>
            <p className="text-sm text-muted-foreground font-sans max-w-[85%]">Track your vitals to identify trends and stay ahead of crises.</p>
          </div>
          <Button size="icon" className="bg-secondary hover:bg-secondary/90 text-white rounded-full w-10 h-10 shadow-sm shrink-0" onClick={() => setLocation("/vitals/new")}>
            <Plus size={20} />
          </Button>
        </div>

        {/* Hydration Tracker */}
        <div className="bg-card rounded-[24px] p-5 mb-8 border border-border shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-background">
                <Droplet size={16} className="text-primary" fill="currentColor" />
              </div>
              <h2 className="font-bold text-foreground">Daily Hydration</h2>
            </div>
            <span className="text-sm font-bold text-foreground">{hydration} <span className="text-xs font-medium text-muted-foreground">/ {hydrationGoal} ml</span></span>
          </div>
          
          <div className="h-4 w-full bg-background rounded-full overflow-hidden mb-5 border border-border">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${Math.min(100, (hydration / hydrationGoal) * 100)}%` }}
            >
               <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1 h-12 rounded-xl border-border text-foreground font-medium hover:bg-muted"
              onClick={() => setHydration(h => h + 250)}
            >
              + 250ml
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 h-12 rounded-xl border-border text-foreground font-medium hover:bg-muted"
              onClick={() => setHydration(h => h + 500)}
            >
              + 500ml
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-serif text-foreground">Recent vitals</h2>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="border border-border shadow-sm rounded-2xl bg-card">
                <CardContent className="p-4 flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !vitals || vitals.length === 0 ? (
          <div className="mt-2">
            <div className="bg-card p-8 text-center rounded-[24px] border border-border shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="mx-auto w-20 h-20 rounded-[20px] flex items-center justify-center mb-6 shadow-lg shadow-secondary/10 relative z-10 bg-secondary">
                <HealthIcon
                  outline={Temp}
                  filled={TempFilled}
                  width="36"
                  height="36"
                  active
                  className="text-white"
                />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">No vitals logged yet</h3>
              <p className="text-sm text-muted-foreground mb-8 max-w-[260px] mx-auto">
                Tracking your vitals like temperature and oxygen levels can help you identify trends and stay ahead of crisis.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8 text-left relative z-10">
                {[
                  { icon: <Temp size={16} />, label: "Temperature" },
                  { icon: <Oxygen size={16} />, label: "Oxygen Levels" },
                  { icon: <Heart size={16} />, label: "Heart Rate" },
                  { icon: <Calendar size={16} />, label: "Health Trends" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 rounded-2xl bg-background border border-border">
                    <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center text-foreground shadow-sm border border-border/5">
                      {item.icon}
                    </div>
                    <span className="text-xs font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white text-base font-bold shadow-md relative z-10" onClick={() => setLocation("/vitals/new")}>
                <Plus size={18} className="mr-2" /> Log your first vitals
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {vitals.map((log) => (
              <Card key={log.id} className="border border-border shadow-sm overflow-hidden rounded-[20px] bg-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-background text-foreground flex items-center justify-center shrink-0 border border-border/40 shadow-sm">
                        {getIcon(log.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground text-sm">
                            {getLabel(log.type)}
                          </h3>
                          <Badge className="bg-[#F0FDF4] text-[#15803d] hover:bg-[#F0FDF4] text-[10px] px-1.5 py-0 h-5 border border-[#15803d]/20 rounded-md font-bold">
                            {log.value}{getUnitSuffix(log.type)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                          <Calendar size={12} />
                          {new Date(log.occurredAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  {log.notes && (
                    <div className="mt-4 pt-3 border-t border-border/40">
                      <p className="text-xs text-foreground/80 italic">
                        "{log.notes}"
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}
