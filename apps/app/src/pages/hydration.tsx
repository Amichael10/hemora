import { useState, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import {
  useListVitalsLogs,
  useCreateVitalsLog,
  getListVitalsLogsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Droplet,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Share2,
  ArrowLeft,
  Settings,
  Calendar,
  Clock,
  History,
  Plus,
  CheckCircle,
  AlertTriangle as Warning,
  Info as InfoIcon,
  ChevronRight as ArrowRight,
  User as UserIcon,
  CheckCircle2
} from "lucide-react";

type HydrationView = "dashboard" | "log" | "settings" | "history" | "summary";

export default function Hydration() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Navigation View
  const [currentView, setCurrentView] = useState<HydrationView>("dashboard");

  // Hydration Settings State
  const [targetGlasses, setTargetGlasses] = useState(10);
  const [preferredUnit, setPreferredUnit] = useState<"glasses" | "ml">("glasses");
  const [remindersEnabled, setRemindersEnabled] = useState({
    "9:00 AM": true,
    "1:00 PM": true,
    "6:00 PM": true,
  });
  const [higherTargetOverride, setHigherTargetOverride] = useState(false);

  // Quick logging state
  const [manualAmount, setManualAmount] = useState("");
  const [drinkType, setDrinkType] = useState("Water");
  const [logDate, setLogDate] = useState(() => new Date().toISOString().slice(0, 16));
  const [notes, setNotes] = useState("");

  // History time range state
  const [timeRange, setTimeRange] = useState<"7" | "30" | "90">("7");

  // Supabase integrations
  const { data: vitals, isLoading } = useListVitalsLogs(
    { profileId },
    { query: { queryKey: getListVitalsLogsQueryKey({ profileId }), enabled: !!profileId } }
  );

  const createVital = useCreateVitalsLog();

  // Filter logs for hydration
  const hydrationLogs = useMemo(() => {
    if (!vitals) return [];
    return vitals
      .filter((v) => v.type === "hydration")
      .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime());
  }, [vitals]);

  // Daily target calculation in mL (1 glass = 250 mL)
  const finalTargetMl = useMemo(() => {
    let multiplier = targetGlasses;
    if (higherTargetOverride) {
      multiplier += 2; // Suggest 2 more glasses during crisis recovery/heat
    }
    return multiplier * 250;
  }, [targetGlasses, higherTargetOverride]);

  // Today's total hydration
  const todayHydrationTotalMl = useMemo(() => {
    const today = new Date().toDateString();
    return hydrationLogs
      .filter((log) => new Date(log.occurredAt).toDateString() === today)
      .reduce((sum, log) => {
        const val = Number(log.value);
        if (log.unit === "glasses") {
          return sum + val * 250;
        }
        return sum + val;
      }, 0);
  }, [hydrationLogs]);

  const todayHydrationTotalGlasses = useMemo(() => {
    return Math.round((todayHydrationTotalMl / 250) * 10) / 10;
  }, [todayHydrationTotalMl]);

  // Log water intake handler
  const handleSaveIntake = (amountMl: number) => {
    if (!profileId) return;

    const valueStr = amountMl.toString();
    const finalUnit = preferredUnit === "glasses" ? "glasses" : "ml";
    const finalValue = preferredUnit === "glasses" ? (amountMl / 250).toString() : valueStr;

    createVital.mutate(
      {
        data: {
          profileId,
          type: "hydration",
          value: finalValue,
          unit: finalUnit,
          occurredAt: new Date(logDate).toISOString(),
          notes: notes || `${drinkType} intake`,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListVitalsLogsQueryKey({ profileId }) });
          toast({ title: "Water logged successfully!" });
          setNotes("");
          setManualAmount("");
          
          const newTotal = todayHydrationTotalMl + amountMl;
          if (newTotal >= finalTargetMl) {
            setCurrentView("summary");
          } else {
            setCurrentView("dashboard");
          }
        },
        onError: (err: any) => {
          toast({
            title: "Failed to log",
            description: err.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  // Quick add water intake helper
  const handleQuickAdd = (ml: number) => {
    handleSaveIntake(ml);
  };

  // Target percent
  const targetPercent = useMemo(() => {
    return Math.min(100, Math.round((todayHydrationTotalMl / finalTargetMl) * 100));
  }, [todayHydrationTotalMl, finalTargetMl]);

  // Weekly data generator for chart
  const weeklyChartData = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const results = days.map((day, idx) => {
      // Calculate day start
      const today = new Date();
      const currentDayIdx = today.getDay();
      const targetDate = new Date();
      targetDate.setDate(today.getDate() - (currentDayIdx - idx));
      const targetDateStr = targetDate.toDateString();

      const dayLogs = hydrationLogs.filter(
        (log) => new Date(log.occurredAt).toDateString() === targetDateStr
      );
      const totalMl = dayLogs.reduce((sum, log) => {
        const val = Number(log.value);
        if (log.unit === "glasses") {
          return sum + val * 250;
        }
        return sum + val;
      }, 0);

      return {
        day,
        ml: totalMl,
        glasses: totalMl / 250,
      };
    });
    return results;
  }, [hydrationLogs]);

  // Streak counter helper
  const hydrationStreak = useMemo(() => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      const checkDateStr = checkDate.toDateString();
      const hasIntake = hydrationLogs.some(
        (log) => new Date(log.occurredAt).toDateString() === checkDateStr
      );
      if (hasIntake) {
        streak++;
      } else {
        if (i > 0) break; // Break if missed day before today
      }
    }
    return streak;
  }, [hydrationLogs]);

  // Share summary handler
  const handleShareSummary = () => {
    const text = `💧 My Hydration Summary for today: ${todayHydrationTotalGlasses} / ${targetGlasses} glasses (${todayHydrationTotalMl} mL) completed! Streak: ${hydrationStreak} days. Logged on Hemora.`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Summary copied to clipboard!",
      description: "You can now share it with your care team or family.",
    });
  };

  return (
    <MobileAppShell>
      <div className="p-6 pb-24 bg-background min-h-screen text-foreground">
        
        {/* ── SCREEN 1: HYDRATION TRACKER DASHBOARD ────────────────── */}
        {currentView === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mt-2">
              <div>
                <h1 className="text-[28px] font-serif text-foreground mb-1 leading-tight">Hydration Tracker</h1>
                <p className="text-sm text-muted-foreground font-sans">
                  Staying hydrated supports your blood flow, energy, and overall well-being.
                </p>
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full border-border bg-card"
                onClick={() => setCurrentView("settings")}
              >
                <Settings size={20} className="text-foreground" />
              </Button>
            </div>


            {/* Circular Progress Ring */}
            <div className="bg-card rounded-[32px] p-6 border border-border shadow-sm flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
              
              <div className="relative w-48 h-48 flex items-center justify-center mt-2">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="transparent" stroke="hsl(var(--background))" strokeWidth="12" />
                  <circle 
                    cx="96" cy="96" r="80" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="12" 
                    strokeDasharray={502.4} 
                    strokeDashoffset={502.4 - (502.4 * targetPercent) / 100}
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <Droplet className="text-primary w-8 h-8 mb-1 animate-bounce" fill="currentColor" />
                  <span className="text-3xl font-serif font-bold text-foreground">
                    {todayHydrationTotalGlasses} <span className="text-sm font-sans font-medium text-muted-foreground">/ {targetGlasses}</span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">glasses</span>
                  <span className="text-[10px] font-semibold text-primary mt-0.5">({todayHydrationTotalMl} mL)</span>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-background">
                <div className="text-center border-r border-background pr-2">
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Today's Target</span>
                  <span className="text-sm font-bold mt-0.5 block">{targetGlasses} glasses ({finalTargetMl / 1000}L)</span>
                  <button onClick={() => setCurrentView("settings")} className="text-xs text-primary font-bold hover:underline mt-1">Edit Goal</button>
                </div>
                <div className="text-center pl-2">
                  <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Reminder Alarm</span>
                  <span className="text-sm font-bold mt-0.5 block">On - 3x per day</span>
                  <button onClick={() => setCurrentView("settings")} className="text-xs text-primary font-bold hover:underline mt-1">Configure</button>
                </div>
              </div>

              {/* Premium Direct CTAs */}
              <div className="w-full flex gap-3 mt-6">
                <Button 
                  onClick={() => handleQuickAdd(250)}
                  className="flex-[1.2] bg-primary hover:bg-primary/90 text-white text-sm font-extrabold h-12 rounded-xl shadow-sm flex items-center justify-center gap-1.5"
                >
                  I've taken 1 Glass
                </Button>
                <Button 
                  onClick={() => handleQuickAdd(500)}
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/5 text-xs font-bold h-12 rounded-xl flex items-center justify-center gap-1"
                >
                  Log 500mL Bottle
                </Button>
              </div>

              <button 
                onClick={() => setCurrentView("log")}
                className="text-xs text-muted-foreground font-semibold hover:underline mt-4 cursor-pointer"
              >
                Log custom amount or details
              </button>
            </div>

            {/* Quick stats buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={() => setCurrentView("history")} 
                className="h-16 rounded-2xl bg-card border-border text-foreground text-sm font-bold flex gap-2.5 shadow-sm hover:bg-background"
              >
                <History size={20} className="text-primary" />
                History & Trends
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView("summary")} 
                className="h-16 rounded-2xl bg-card border-border text-foreground text-sm font-bold flex gap-2.5 shadow-sm hover:bg-background"
              >
                <CheckCircle size={20} className="text-primary" />
                Daily Summary
              </Button>
            </div>

            {/* Recent Hydration Logs */}
            <div>
              <h2 className="text-lg font-serif mb-4 flex items-center gap-2">
                Recent Hydration Log
              </h2>

              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-2xl" />
                  <Skeleton className="h-16 w-full rounded-2xl" />
                </div>
              ) : hydrationLogs.length === 0 ? (
                <div className="bg-card border border-border rounded-[24px] p-8 text-center shadow-sm">
                  <Droplet className="text-muted-foreground/30 w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">No water logged today yet.</p>
                  <Button variant="link" onClick={() => setCurrentView("log")} className="text-primary font-bold p-0 mt-1 h-auto">Log intake now</Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {hydrationLogs.slice(0, 4).map((log) => (
                    <Card key={log.id} className="border border-border shadow-sm overflow-hidden rounded-[20px] bg-card">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center text-primary">
                            <Droplet size={18} fill="currentColor" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-foreground">
                              {log.value} {log.unit === "glasses" ? "glass" : "mL"} {Number(log.value) > 1 && log.unit === "glasses" ? "es" : ""}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{log.notes || "Water intake"}</p>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground font-semibold">
                          {new Date(log.occurredAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SCREEN 2: LOG WATER FORM ────────────────────────────── */}
        {currentView === "log" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mt-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full border-border bg-card"
                onClick={() => setCurrentView("dashboard")}
              >
                <ArrowLeft size={20} className="text-foreground" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif text-foreground">Log water</h1>
                <p className="text-xs text-muted-foreground">Add your intake to keep your progress on track.</p>
              </div>
            </div>

            <div className="bg-card rounded-[28px] p-6 border border-border shadow-sm space-y-6">
              
              {/* Quick Add Presets */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quick add presets</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "1 glass", desc: "250 mL", amount: 250 },
                    { label: "2 glasses", desc: "500 mL", amount: 500 },
                    { label: "500 mL bottle", desc: "500 mL", amount: 500 },
                    { label: "750 mL bottle", desc: "750 mL", amount: 750 },
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAdd(preset.amount)}
                      className="p-3 bg-background border border-border rounded-2xl flex flex-col items-center hover:border-primary active:scale-98 transition-all"
                    >
                      <span className="font-bold text-sm text-foreground">{preset.label}</span>
                      <span className="text-[10px] text-muted-foreground font-medium mt-0.5">{preset.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground/40 uppercase tracking-widest font-bold">
                <span className="h-[1px] bg-border flex-1 mr-4" />
                or enter manually
                <span className="h-[1px] bg-border flex-1 ml-4" />
              </div>

              {/* Custom manual amount */}
              <div className="space-y-3">
                <Label htmlFor="manualAmount" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Custom amount</Label>
                <div className="flex gap-2">
                  <Input
                    id="manualAmount"
                    type="number"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                    placeholder="e.g. 250, 500"
                    className="h-12 rounded-xl bg-background border-border text-sm font-semibold"
                  />
                  <span className="h-12 px-4 rounded-xl bg-background border border-border flex items-center justify-center text-xs font-bold uppercase tracking-wider text-muted-foreground shrink-0">
                    mL
                  </span>
                </div>
              </div>

              {/* Date and Time picker */}
              <div className="space-y-3">
                <Label htmlFor="logDate" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Date & Time</Label>
                <Input
                  id="logDate"
                  type="datetime-local"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="h-12 rounded-xl bg-background border-border text-sm font-semibold"
                />
              </div>

              {/* Drink Type */}
              <div className="space-y-3">
                <Label htmlFor="drinkType" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Drink Type</Label>
                <select
                  id="drinkType"
                  value={drinkType}
                  onChange={(e) => setDrinkType(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl bg-background border border-border text-sm font-semibold focus:outline-none focus:border-primary"
                >
                  <option>Water</option>
                  <option>Juice</option>
                  <option>Herbal Tea</option>
                  <option>Electrolyte Drink</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. with medication, after workout, etc."
                  className="min-h-[80px] rounded-2xl bg-background border-border text-sm p-4 resize-none"
                />
              </div>

              <div className="bg-background p-4 rounded-2xl flex gap-3 border border-border/40">
                <InfoIcon size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-normal">
                  Small sips add up. Every glass counts toward your daily hydration goal, supporting optimal blood flow.
                </p>
              </div>

              <Button
                onClick={() => {
                  const amount = manualAmount ? Number(manualAmount) : 250;
                  handleSaveIntake(amount);
                }}
                className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white text-base font-bold shadow-md"
              >
                Save intake
              </Button>
            </div>
          </div>
        )}

        {/* ── SCREEN 3: GOAL & REMINDERS SETTINGS ───────────────────── */}
        {currentView === "settings" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mt-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full border-border bg-card"
                onClick={() => setCurrentView("dashboard")}
              >
                <ArrowLeft size={20} className="text-foreground" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif text-foreground">Hydration goal & reminders</h1>
                <p className="text-xs text-muted-foreground">Set your goals and reminders that fit your care plan.</p>
              </div>
            </div>

            <div className="bg-card rounded-[28px] p-6 border border-border shadow-sm space-y-6">
              
              {/* Daily Target Stepper */}
              <div className="space-y-3 text-center">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block text-left">Daily Target Goal</Label>
                
                <div className="flex items-center justify-center gap-6 py-4">
                  <button 
                    onClick={() => setTargetGlasses(g => Math.max(4, g - 1))}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-background active:scale-95 transition-all text-foreground"
                  >
                    <MinusIcon size={18} />
                  </button>
                  
                  <div>
                    <span className="text-4xl font-serif font-bold text-foreground">{targetGlasses}</span>
                    <span className="text-xs font-bold uppercase text-muted-foreground block mt-1">glasses ({targetGlasses * 250} mL)</span>
                  </div>

                  <button 
                    onClick={() => setTargetGlasses(g => Math.min(24, g + 1))}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-background active:scale-95 transition-all text-foreground"
                  >
                    <PlusIcon size={18} />
                  </button>
                </div>
              </div>

              {/* Preferred Unit Segmented Control */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Preferred Unit</Label>
                <div className="grid grid-cols-2 p-1 bg-background rounded-xl border border-border">
                  <button 
                    onClick={() => setPreferredUnit("glasses")}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      preferredUnit === "glasses" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Glasses
                  </button>
                  <button 
                    onClick={() => setPreferredUnit("ml")}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      preferredUnit === "ml" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Milliliters (mL)
                  </button>
                </div>
              </div>

              {/* Reminder Toggles */}
              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Reminder times</Label>
                <div className="space-y-2">
                  {Object.entries(remindersEnabled).map(([time, enabled]) => (
                    <div 
                      key={time}
                      className="p-3.5 bg-background rounded-2xl border border-border/40 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Clock size={16} className="text-primary" />
                        <span className="text-sm font-bold">{time}</span>
                      </div>
                      <button
                        onClick={() => setRemindersEnabled(prev => ({ ...prev, [time]: !enabled }))}
                        className={`w-12 h-6 rounded-full p-0.5 transition-all ${
                          enabled ? "bg-secondary" : "bg-gray-200"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-card transition-transform ${enabled ? "translate-x-6" : ""}`} />
                      </button>
                    </div>
                  ))}
                  
                  <button className="w-full py-3 border border-dashed border-border rounded-xl text-xs font-bold text-primary hover:bg-background transition-colors mt-2">
                    + Add reminder
                  </button>
                </div>
              </div>

              {/* Sickle Cell / Hot weather override option */}
              <div className="p-4 bg-background rounded-3xl border border-border/40 flex gap-4 items-start">
                <input 
                  type="checkbox" 
                  id="override"
                  checked={higherTargetOverride}
                  onChange={(e) => setHigherTargetOverride(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-primary border-border rounded"
                />
                <div className="flex-1">
                  <label htmlFor="override" className="font-bold text-sm leading-tight block mb-1">
                    Higher target during recovery
                  </label>
                  <p className="text-xs text-muted-foreground leading-normal">
                    Automatically suggest +2 extra glasses daily during hot weather, fever, or crisis recovery when your body requires extra hydration support.
                  </p>
                </div>
              </div>

              <div className="flex gap-2.5 border-t border-background pt-4">
                <InfoIcon size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Follow your care team's guidance. Always match your fluid targets with your clinical care plan.
                </p>
              </div>

              <Button
                onClick={() => {
                  toast({ title: "Goal & Reminders updated!" });
                  setCurrentView("dashboard");

                  // Request Notification permission and trigger a native browser pop-up notification
                  if (typeof window !== "undefined" && "Notification" in window) {
                    Notification.requestPermission().then((permission) => {
                      if (permission === "granted") {
                        new Notification("Hydration Reminder", {
                          body: "It's time for your scheduled water break to support recovery & circulation.",
                          icon: "/brand/logo.png"
                        });
                      }
                    });
                  }
                }}
                className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white text-base font-bold shadow-md"
              >
                Save Settings
              </Button>
            </div>
          </div>
        )}

        {/* ── SCREEN 4: HISTORY & TRENDS ────────────────────────────── */}
        {currentView === "history" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mt-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full border-border bg-card"
                onClick={() => setCurrentView("dashboard")}
              >
                <ArrowLeft size={20} className="text-foreground" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif text-foreground">History & trends</h1>
                <p className="text-xs text-muted-foreground font-sans">See how hydration supports your health over time.</p>
              </div>
            </div>

            {/* Timeframe selector */}
            <div className="grid grid-cols-3 p-1 bg-card rounded-2xl border border-border">
              {["7", "30", "90"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range as any)}
                  className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                    timeRange === range ? "bg-background text-foreground border border-border/40 font-extrabold" : "text-muted-foreground"
                  }`}
                >
                  {range} Days
                </button>
              ))}
            </div>

            {/* Bar Chart Card */}
            <div className="bg-card rounded-[28px] p-6 border border-border shadow-sm space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Daily intake</h3>
                
                {/* Visual SVG bar chart */}
                <div className="h-48 w-full flex items-end justify-between px-2 pt-6 relative border-b border-border">
                  {/* Goal limit line */}
                  <div className="absolute left-0 right-0 border-t border-dashed border-primary/50 z-0 top-[35%]" />
                  <span className="absolute right-0 text-[9px] font-bold text-primary bg-card px-1 leading-none -mt-2 z-10 top-[35%]">
                    Goal
                  </span>

                  {weeklyChartData.map((data, idx) => {
                    const maxHeight = 120; // px
                    const height = Math.max(12, Math.min(maxHeight, (data.ml / finalTargetMl) * maxHeight));
                    
                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 z-10">
                        <div 
                          style={{ height: `${height}px` }}
                          className="w-4 rounded-t-full bg-primary relative overflow-hidden group transition-all duration-300 hover:brightness-95 flex justify-center"
                        >
                          <div className="absolute top-0 right-0 left-0 h-1 bg-white/20" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground mt-2 block">{data.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Streak info */}
              <div className="p-4 bg-background rounded-2xl flex items-center justify-between border border-border/40">
                <div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">7-day streak</span>
                  <span className="text-base font-serif font-bold text-foreground mt-0.5 block">{hydrationStreak} days - Keep it going!</span>
                </div>
                <div className="flex gap-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => {
                    const active = idx < hydrationStreak;
                    return (
                      <div 
                        key={idx}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          active ? "bg-primary text-white" : "bg-card border border-border text-muted-foreground/30"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-background border border-border/40 rounded-2xl text-center">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase block">Average Daily</span>
                  <span className="text-base font-serif font-bold mt-1 block">8.1gl</span>
                </div>
                <div className="p-3 bg-background border border-border/40 rounded-2xl text-center">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase block">Best Day</span>
                  <span className="text-base font-serif font-bold mt-1 block">11gl</span>
                </div>
                <div className="p-3 bg-background border border-border/40 rounded-2xl text-center">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase block">Below Target</span>
                  <span className="text-base font-serif font-bold mt-1 block">2d</span>
                </div>
              </div>

              <div className="bg-background p-4 rounded-2xl flex gap-3 border border-border/40">
                <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-normal">
                  Great consistency! Proper hydration plays a massive clinical role in preventing sickle-cell vaso-occlusion.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── SCREEN 5: TODAY'S HYDRATION SUMMARY ───────────────────── */}
        {currentView === "summary" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mt-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="w-10 h-10 rounded-full border-border bg-card"
                onClick={() => setCurrentView("dashboard")}
              >
                <ArrowLeft size={20} className="text-foreground" />
              </Button>
              <div>
                <h1 className="text-2xl font-serif text-foreground">Today's summary</h1>
                <p className="text-xs text-muted-foreground font-sans">Nice work! Here's how you did today.</p>
              </div>
            </div>

            <div className="bg-card rounded-[28px] p-6 border border-border shadow-sm space-y-6 text-center">
              
              {/* Goal Reached Status Card */}
              <div className="relative w-40 h-40 flex items-center justify-center mx-auto mt-2">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="64" fill="transparent" stroke="hsl(var(--background))" strokeWidth="10" />
                  <circle 
                    cx="80" cy="80" r="64" fill="transparent" stroke="hsl(var(--primary))" strokeWidth="10" 
                    strokeDasharray={401.92} 
                    strokeDashoffset={401.92 - (401.92 * targetPercent) / 100}
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <CheckCircle className="text-primary w-6 h-6 mb-0.5" fill="currentColor" />
                  <span className="text-2xl font-serif font-bold text-foreground">
                    {targetPercent}%
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground block mt-0.5">completed</span>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-serif font-bold text-foreground mt-2">
                  {targetPercent >= 100 ? "Goal Reached!" : "Keep Sipping!"}
                </h2>
                <p className="text-xs text-muted-foreground mt-1 max-w-[280px] mx-auto">
                  You've logged {todayHydrationTotalGlasses} / {targetGlasses} glasses today.
                  {targetPercent >= 80 ? " Excellent hydration progress!" : " Keep sipping to stay on track."}
                </p>
              </div>

              {/* Status card */}
              <div className="p-4 bg-background rounded-2xl border border-border/40 text-left space-y-1">
                <span className="text-[10px] font-bold text-primary block">Today's Intake</span>
                <span className="text-base font-serif font-bold text-foreground block">{todayHydrationTotalGlasses} glasses ({todayHydrationTotalMl} mL)</span>
                <p className="text-xs text-muted-foreground italic mt-2">
                  "Felt good staying on track today."
                </p>
              </div>

              {/* Clinical Warning */}
              <div className="p-4 bg-background rounded-2xl border border-border/40 flex gap-3 text-left">
                <Warning size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs">Low hydration can be a trigger</h4>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Dehydration triggers RBC sickling. Staying ahead is your most powerful tool to reduce pain and complications.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 h-12 rounded-xl border-border text-foreground"
                  onClick={() => setCurrentView("log")}
                >
                  Edit today
                </Button>
                <Button 
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold"
                  onClick={handleShareSummary}
                >
                  <Share2 size={16} className="mr-2" /> Share summary
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </MobileAppShell>
  );
}
