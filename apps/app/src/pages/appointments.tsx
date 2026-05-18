import { useState } from "react";
import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HealthIcon } from "@/components/ui/health-icon";
import { useProfile } from "@/context/ProfileContext";
import {
  useListAppointments,
  getListAppointmentsQueryKey,
} from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AddCircleLinear as Plus, CalendarLinear as Calendar, UserSpeakLinear as Doctor, HospitalLinear as Clinic, ClockCircleLinear as Clock } from "solar-icon-set";
import {
  CalendarBold as CalendarFilled,
  UserSpeakBold as DoctorFilled,
} from "solar-icon-set";

export default function Appointments() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("upcoming");

  const { data: appointments, isLoading } = useListAppointments(
    { profileId },
    { query: { queryKey: getListAppointmentsQueryKey({ profileId }), enabled: !!profileId } }
  );

  const now = new Date();
  const upcoming = appointments?.filter(a => new Date(a.scheduledAt) >= now) || [];
  const past = appointments?.filter(a => new Date(a.scheduledAt) < now) || [];

  const displayList = activeTab === "upcoming" ? upcoming : past;

  return (
    <MobileAppShell>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="h-page">Appointments</h1>
          <Button size="icon" variant="soft" onClick={() => setLocation("/appointments/new")}>
            <Plus size={16} />
          </Button>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full bg-muted/50 rounded-2xl p-1.5 h-13 shadow-sm gap-1" style={{ height: 52 }}>
            <TabsTrigger value="upcoming" className="rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="rounded-xl text-sm font-semibold h-full data-[state=active]:bg-background data-[state=active]:shadow-md">Past</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="space-y-5">
            {[1, 2, 3].map(i => (
              <Card key={i} className="border-none shadow-sm">
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
        ) : displayList.length === 0 ? (
          <div className="mt-2">
            <div className="surface-soft p-8 text-center rounded-[32px] border border-border/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-primary/10 relative z-10"
                   style={{ background: "var(--gradient-ocean)" }}>
                <HealthIcon
                  outline={Calendar}
                  filled={CalendarFilled}
                  width="36"
                  height="36"
                  active
                  className="text-white"
                />
              </div>
              <h3 className="h-card mb-2">No {activeTab} appointments</h3>
              <p className="p-muted mb-8 max-w-[260px] mx-auto">
                {activeTab === "upcoming" 
                  ? "Schedule your next visit with your hematologist or specialist to stay on top of your health."
                  : "You don't have any past appointments recorded in your health history."}
              </p>

              {activeTab === "upcoming" && (
                <>
                  <div className="grid grid-cols-2 gap-3 mb-8 text-left relative z-10">
                    {[
                      { icon: <Doctor size={14} />, label: "Regular Checkups" },
                      { icon: <Clinic size={14} />, label: "Specialist Visits" },
                      { icon: <Clock size={14} />, label: "Set Reminders" },
                      { icon: <Plus size={14} />, label: "Care History" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 rounded-2xl bg-white/50 border border-white/20">
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                          {item.icon}
                        </div>
                        <span className="text-[11px] font-medium text-foreground/80">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <Button size="lg" className="w-full shadow-md" onClick={() => setLocation("/appointments/new")}>
                    <Plus size={18} className="mr-2" /> Schedule Appointment
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {displayList.map((app) => (
              <Card key={app.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base tracking-tight">
                          {app.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                          <Badge variant="soft" className="px-1.5 py-0 h-4 uppercase text-[9px] font-bold">
                            {app.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {app.status === 'pending' && (
                      <Badge className="bg-orange-500/10 text-orange-600 border-none capitalize text-[10px]">
                        Pending
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <Doctor size={16} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium">{app.doctorName || "Doctor not specified"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <Clinic size={16} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium line-clamp-1">{app.hospital || "Hospital not specified"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-muted-foreground" />
                      </div>
                      <span className="font-semibold text-primary">
                        {new Date(app.scheduledAt).toLocaleString([], { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>

                  {app.notes && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-xl border border-border/20">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {app.notes}
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
