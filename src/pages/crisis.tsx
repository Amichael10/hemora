import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HealthIcon } from "@/components/ui/health-icon";
import { useProfile } from "@/context/ProfileContext";
import {
  useListCrisisLogs,
  useCreateCrisisLog,
  useGetProfile,
  getListCrisisLogsQueryKey,
} from "@workspace/api-client-react";
import { BodyPainPicker } from "@/components/BodyPainPicker";
import { CrisisLogPainLevel } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { ClockCircleLinear as Clock, CheckCircleBold as Check, AddCircleLinear as Plus } from "solar-icon-set";
import Lottie from "lottie-react";
import botanicalImage from "@/assets/images/botanical-illustration.png";
import emojiMild from "@/assets/images/emoji-mild.png";
import emojiModerate from "@/assets/images/emoji-moderate.png";
import emojiSevere from "@/assets/images/emoji-severe.png";
import emojiWorst from "@/assets/images/emoji-worst.png";
import lottieMild from "@/assets/lottie/1f60a.json";
import lottieModerate from "@/assets/lottie/1f614.json";
import lottieSevere from "@/assets/lottie/1f613.json";
import lottieWorst from "@/assets/lottie/1f621.json";
import {
  HeartPulseBold as HeartCardiogramFilled,
  DangerTriangleBold as AccidentFilled,
  HeartPulse2Bold as HeartbeatFilled,
  HeartPulseLinear as HeartCardiogramOutline,
  DangerTriangleLinear as AccidentOutline,
  HeartPulse2Linear as HeartbeatOutline,
} from "solar-icon-set";

type Step = "entry" | "pain" | "location" | "triggers" | "relief" | "hospital" | "success" | "history";

function StepDots({
  current,
  total,
  onDark = false,
  onStepClick,
}: {
  current: number;
  total: number;
  onDark?: boolean;
  onStepClick?: (stepIndex: number) => void;
}) {
  const activeBg = onDark ? "bg-white" : "bg-primary";
  const inactiveBg = onDark ? "bg-white/30" : "bg-muted";
  return (
    <div className="flex gap-2 mb-8 justify-center">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i < current;
        const canNavigate = onStepClick && i < current - 1;
        return (
          <button
            key={i}
            type="button"
            disabled={!canNavigate}
            onClick={() => canNavigate && onStepClick(i)}
            aria-label={`Go to step ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${isActive ? `w-6 ${activeBg}` : `w-2 ${inactiveBg}`} ${canNavigate ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
          />
        );
      })}
    </div>
  );
}

export default function Crisis() {
  const { profileId } = useProfile();
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<Step>("entry");
  const queryClient = useQueryClient();

  const { data: logs, isLoading: isLoadingLogs } = useListCrisisLogs(
    { profileId },
    { query: { queryKey: getListCrisisLogsQueryKey({ profileId }), enabled: !!profileId } }
  );

  const { data: profile } = useGetProfile(profileId, { query: { queryKey: ["profile", profileId], enabled: !!profileId } });
  const createLog = useCreateCrisisLog();
  const [painLevel, setPainLevel] = useState<CrisisLogPainLevel | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [whatHelped, setWhatHelped] = useState<string[]>([]);
  const [hospitalVisit, setHospitalVisit] = useState<boolean | null>(null);
  const [otherLocationText, setOtherLocationText] = useState("");

  const FLOW_STEPS: Step[] = ["pain", "location", "triggers", "relief", "hospital"];
  const goToStep = (idx: number) => {
    const target = FLOW_STEPS[idx];
    if (target) setStep(target);
  };
  const flowStepHideNav = ["pain", "location", "triggers", "relief", "hospital"].includes(step);

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleSave = () => {
    if (!painLevel) return;
    const finalLocations = locations.includes("Other") && otherLocationText.trim()
      ? [...locations.filter(l => l !== "Other"), `Other: ${otherLocationText.trim()}`]
      : locations;
    createLog.mutate(
      { data: { profileId, occurredAt: new Date().toISOString(), painLevel, painLocations: finalLocations, triggers, whatHelped, hospitalVisit: hospitalVisit || false } },
      { onSuccess: () => { queryClient.invalidateQueries({ queryKey: getListCrisisLogsQueryKey({ profileId }) }); setStep("success"); } }
    );
  };

  const getPainColor = (level: string) => {
    switch (level) {
      case "mild": return "bg-green-500/10 text-green-700 border-green-200";
      case "moderate": return "bg-yellow-500/10 text-yellow-700 border-yellow-200";
      case "severe": return "bg-orange-500/10 text-orange-700 border-orange-200";
      case "worst": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPainEmoji = (level: string) => {
    switch (level) {
      case "mild": return emojiMild;
      case "moderate": return emojiModerate;
      case "severe": return emojiSevere;
      case "worst": return emojiWorst;
      default: return emojiMild;
    }
  };

  const getPainAccent = (level: string) => {
    switch (level) {
      case "mild": return "border-l-green-500";
      case "moderate": return "border-l-yellow-500";
      case "severe": return "border-l-orange-500";
      case "worst": return "border-l-destructive";
      default: return "border-l-border";
    }
  };

  return (
    <MobileAppShell hideNav={flowStepHideNav}>
      <div className="min-h-full flex flex-col pb-8">
        <AnimatePresence mode="wait">

          {step === "entry" && (
            <motion.div key="entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col flex-1 p-6 items-center justify-center text-center min-h-[70vh]">
              <div className="w-20 h-20 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <HealthIcon outline={HeartCardiogramOutline} filled={HeartCardiogramFilled} width="40" height="40" />
              </div>
              <h1 className="h-display text-primary mb-3">
                You're doing your best.<br />We're here with you.
              </h1>
              <p className="body-md mb-12">Log what you're feeling so we can help you track patterns.</p>
              <div className="w-full space-y-3">
                <Button size="xl" className="w-full" onClick={() => setStep("pain")} data-testid="btn-start-log">Start log</Button>
                <Button size="xl" variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/5" onClick={() => setLocation("/emergency")} data-testid="btn-urgent-care">Need urgent care?</Button>
                <Button variant="ghost" className="mt-2 text-muted-foreground" onClick={() => setStep("history")}>View History</Button>
              </div>
            </motion.div>
          )}

          {step === "pain" && (() => {
            const PAIN_FACES = [
              { level: CrisisLogPainLevel.mild,     img: emojiMild,     anim: lottieMild,     bg: "#5C9B85", label: "Mild",     caption: "I can manage this" },
              { level: CrisisLogPainLevel.moderate, img: emojiModerate, anim: lottieModerate, bg: "#C9A24A", label: "Moderate", caption: "It's noticeable" },
              { level: CrisisLogPainLevel.severe,   img: emojiSevere,   anim: lottieSevere,   bg: "#C97A4A", label: "Severe",   caption: "It's hard to bear" },
              { level: CrisisLogPainLevel.worst,    img: emojiWorst,    anim: lottieWorst,    bg: "#8C2A3A", label: "Worst",    caption: "I need help now" },
            ] as const;
            const DEFAULT_BG = "#3D6B6B"; // muted teal placeholder
            const selectedIdx = PAIN_FACES.findIndex(f => f.level === painLevel);
            const selected = selectedIdx >= 0 ? PAIN_FACES[selectedIdx] : null;
            const bgColor = selected?.bg ?? DEFAULT_BG;
            const display = selected ?? PAIN_FACES[1];

            return (
              <motion.div
                key="pain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, backgroundColor: bgColor }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ backgroundColor: { duration: 0.5, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                className="flex-1 flex flex-col px-6 pt-10 pb-8 z-10"
                style={{ backgroundColor: bgColor }}
              >
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, backgroundColor: bgColor }}
                  exit={{ opacity: 0 }}
                  transition={{ backgroundColor: { duration: 0.5, ease: "easeInOut" } }}
                  className="absolute inset-0 -z-10 pointer-events-none"
                  style={{ backgroundColor: bgColor }}
                />
                <StepDots current={1} total={5} onDark onStepClick={goToStep} />

                <h2 className="font-serif text-[1.75rem] font-semibold text-center text-white tracking-[-0.5px] leading-[1.15] mb-2">
                  How severe is<br />the pain right now?
                </h2>
                <p className="text-center text-white/75 text-sm">
                  Take a breath. Choose the face that fits.
                </p>

                {/* Big animated face */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    key={selected?.level ?? "empty"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: selected ? 1 : 0.55 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="w-52 h-52 flex items-center justify-center mb-6"
                    style={{ filter: selected ? "drop-shadow(0 12px 24px rgba(0,0,0,0.25))" : "none" }}
                  >
                    <Lottie
                      animationData={display.anim}
                      loop
                      autoplay
                      className="w-full h-full"
                      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                    />
                  </motion.div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selected?.level ?? "empty-cap"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-center"
                    >
                      {selected ? (
                        <>
                          <p className="font-serif text-2xl font-semibold text-white tracking-[-0.3px]">
                            I'm feeling {selected.label.toLowerCase()} pain
                          </p>
                          <p className="text-sm text-white/80 mt-1.5 italic">"{selected.caption}"</p>
                        </>
                      ) : (
                        <p className="text-base text-white/70 italic">Tap a dot below</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Emoji + label picker row */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {PAIN_FACES.map((face) => {
                    const isActive = painLevel === face.level;
                    return (
                      <button
                        key={face.level}
                        onClick={() => setPainLevel(face.level)}
                        data-testid={`btn-pain-${face.level}`}
                        aria-label={face.label}
                        className="flex flex-col items-center gap-1.5 py-2.5 rounded-2xl transition-all"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.18)" : "transparent",
                          border: `1.5px solid ${isActive ? "rgba(255,255,255,0.35)" : "transparent"}`,
                          transform: isActive ? "translateY(-2px)" : "translateY(0)",
                        }}
                      >
                        <motion.img
                          src={face.img}
                          alt={face.label}
                          draggable={false}
                          animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : 0.7 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          className="w-9 h-9 object-contain select-none pointer-events-none"
                        />
                        <span
                          className="text-[11px] font-semibold tracking-wide"
                          style={{ color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)" }}
                        >
                          {face.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <Button
                  size="xl"
                  className="w-full bg-white text-foreground hover:bg-white/95 shadow-lg"
                  disabled={!painLevel}
                  onClick={() => setStep("location")}
                  data-testid="btn-pain-continue"
                >
                  <span className="flex items-center gap-2">
                    Continue
                    <Check size={16} />
                  </span>
                </Button>
              </motion.div>
            );
          })()}

          {step === "location" && (
            <motion.div key="location" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col flex-1 p-6 pt-12">
              <StepDots current={2} total={5} onStepClick={goToStep} />
              <h2 className="h-page text-center mb-2">Where does it hurt?</h2>
              <p className="text-center body-md mb-4">Tap the area on the body</p>
              <div className="flex-1 flex items-start justify-center">
                <BodyPainPicker
                  gender={profile?.gender ?? null}
                  selected={locations}
                  onToggle={(label) => toggleArrayItem(setLocations, label)}
                  otherText={otherLocationText}
                  onOtherChange={setOtherLocationText}
                />
              </div>
              <Button size="xl" className="w-full mt-6" onClick={() => setStep("triggers")}>Next</Button>
            </motion.div>
          )}

          {step === "triggers" && (
            <motion.div key="triggers" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col flex-1 p-6 pt-12">
              <StepDots current={3} total={5} onStepClick={goToStep} />
              <h2 className="h-page text-center mb-2">Any known triggers?</h2>
              <p className="text-center body-md mb-8">Select all that apply</p>
              <div className="flex flex-wrap gap-2 justify-center mb-auto">
                {["Cold Weather", "Stress", "Infection", "Dehydration", "Exertion", "Missed meds", "Other"].map(trig => {
                  const isSelected = triggers.includes(trig);
                  return (
                    <Button key={trig} size="pill" variant={isSelected ? "default" : "outline"} className={isSelected ? "" : "bg-card"} onClick={() => toggleArrayItem(setTriggers, trig)}>{trig}</Button>
                  );
                })}
              </div>
              <Button size="xl" className="w-full mt-8" onClick={() => setStep("relief")}>Next</Button>
            </motion.div>
          )}

          {step === "relief" && (
            <motion.div key="relief" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col flex-1 p-6 pt-12">
              <StepDots current={4} total={5} onStepClick={goToStep} />
              <h2 className="h-page text-center mb-2">What has helped so far?</h2>
              <p className="text-center body-md mb-8">Select all that apply</p>
              <div className="flex flex-wrap gap-2 justify-center mb-auto">
                {["Rest", "Fluids", "Pain meds", "Warm bath", "Massage", "Nothing yet"].map(help => {
                  const isSelected = whatHelped.includes(help);
                  return (
                    <Button key={help} size="pill" variant={isSelected ? "default" : "outline"} className={isSelected ? "" : "bg-card"} onClick={() => toggleArrayItem(setWhatHelped, help)}>{help}</Button>
                  );
                })}
              </div>
              <Button size="xl" className="w-full mt-8" onClick={() => setStep("hospital")}>Next</Button>
            </motion.div>
          )}

          {step === "hospital" && (
            <motion.div key="hospital" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col flex-1 p-6 pt-12">
              <StepDots current={5} total={5} onStepClick={goToStep} />
              <h2 className="h-page text-center mb-8">Did this require a hospital visit?</h2>
              <div className="space-y-3 mb-auto">
                <Button size="xl" variant={hospitalVisit === true ? "default" : "outline"} className="w-full justify-between" onClick={() => setHospitalVisit(true)}>
                  <span className="font-medium">Yes, visited hospital</span>
                  {hospitalVisit === true && <Check size={20} />}
                </Button>
                <Button size="xl" variant={hospitalVisit === false ? "default" : "outline"} className="w-full justify-between" onClick={() => setHospitalVisit(false)}>
                  <span className="font-medium">No, managed at home</span>
                  {hospitalVisit === false && <Check size={20} />}
                </Button>
              </div>
              <Button size="xl" className="w-full mt-8" disabled={hospitalVisit === null || createLog.isPending} onClick={handleSave}>
                {createLog.isPending ? "Saving..." : "Save Log"}
              </Button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col flex-1 p-6 items-center justify-center text-center bg-primary/[0.03] min-h-[70vh]">
              <img src={botanicalImage} alt="Botanical" className="w-48 h-48 mb-8 object-contain opacity-70" />
              <h2 className="h-display text-primary mb-3">Log saved.</h2>
              <p className="body-md mb-10 px-4">
                Thank you for recording this. Keeping track helps you understand patterns and get better care.
              </p>
              <Button size="xl" className="w-full" onClick={() => setStep("history")}>View History</Button>
            </motion.div>
          )}

          {step === "history" && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1 p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="h-page">Crisis History</h1>
                <Button size="icon" variant="soft" onClick={() => setStep("entry")}>
                  <Plus size={16} />
                </Button>
              </div>

              {isLoadingLogs ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Card key={i} className="border-none shadow-sm">
                      <CardContent className="p-4">
                        <Skeleton className="h-5 w-1/3 mb-2" />
                        <Skeleton className="h-4 w-2/3" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : logs?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="text-primary/20 flex justify-center mb-4">
                    <HealthIcon outline={HeartbeatOutline} filled={HeartbeatFilled} width="48" height="48" />
                  </div>
                  <p className="text-sm">No crisis logs recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {logs?.map((log, idx) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                    >
                      <Card
                        className={`bg-card border border-border border-l-4 ${getPainAccent(log.painLevel)} rounded-none shadow-none hover:bg-muted/30 transition-colors`}
                        data-testid={`crisis-card-${log.id}`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                              <img
                                src={getPainEmoji(log.painLevel)}
                                alt={log.painLevel}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <p className="font-serif font-semibold text-foreground capitalize tracking-tight">
                                  {log.painLevel} pain
                                </p>
                                <Badge
                                  variant="outline"
                                  className={`border-none text-[10px] px-2 py-0.5 font-medium ${getPainColor(log.painLevel)}`}
                                >
                                  {log.painLevel}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-3">
                                <Clock size={12} />
                                {new Date(log.occurredAt).toLocaleDateString(undefined, {
                                  month: 'short', day: 'numeric', year: 'numeric',
                                })}
                                <span>·</span>
                                {new Date(log.occurredAt).toLocaleTimeString(undefined, {
                                  hour: 'numeric', minute: '2-digit',
                                })}
                              </div>

                              {log.painLocations && log.painLocations.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-1.5">
                                  {log.painLocations.slice(0, 4).map((loc: string) => (
                                    <span
                                      key={loc}
                                      className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-foreground/80"
                                    >
                                      {loc}
                                    </span>
                                  ))}
                                  {log.painLocations.length > 4 && (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                      +{log.painLocations.length - 4}
                                    </span>
                                  )}
                                </div>
                              )}

                              {log.triggers && log.triggers.length > 0 && (
                                <p className="text-[11px] text-muted-foreground">
                                  <span className="font-medium text-foreground/80">Triggers: </span>
                                  {log.triggers.join(", ")}
                                </p>
                              )}

                              {log.hospitalVisit && (
                                <div className="flex gap-1.5 items-center text-accent mt-2.5 font-semibold text-xs bg-accent/10 px-2 py-1 rounded-lg w-fit">
                                  <HealthIcon outline={AccidentOutline} filled={AccidentFilled} width="14" height="14" active />
                                  Hospital visit required
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </MobileAppShell>
  );
}
