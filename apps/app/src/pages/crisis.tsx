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
import { ClockCircleLinear as Clock, CheckCircleBold as Check, AddCircleLinear as Plus, AltArrowLeftLinear as ChevronLeft } from "solar-icon-set";
import { ChartSquareLinear as Chart, ShareLinear as ShareIcon } from "solar-icon-set";
import Lottie from "lottie-react";
import emojiMild from "@/assets/images/emoji-mild.png";
import emojiModerate from "@/assets/images/emoji-moderate.png";
import emojiSevere from "@/assets/images/emoji-severe.png";
import emojiWorst from "@/assets/images/emoji-worst.png";
import lottieMild from "@/assets/lottie/1f60a.json";
import lottieModerate from "@/assets/lottie/1f614.json";
import lottieSevere from "@/assets/lottie/1f613.json";
import lottieWorst from "@/assets/lottie/1f621.json";
import lottieCold from "@/assets/lottie/1f976.json";
import lottieStress from "@/assets/lottie/1f629.json";
import lottieInfection from "@/assets/lottie/1f92e.json";
import lottieDehydration from "@/assets/lottie/1f4a7.json";
import lottieExertion from "@/assets/lottie/1f624.json";
import lottieMissed from "@/assets/lottie/23f0.json";
import lottieOther from "@/assets/lottie/1fa7a.json";
import lottieRest from "@/assets/lottie/1f634.json";
import lottieFluids from "@/assets/lottie/1f4a7.json";
import lottieMeds from "@/assets/lottie/1f917.json";
import lottieBath from "@/assets/lottie/2668.json";
import lottieMassage from "@/assets/lottie/1f64c.json";
import lottieNothing from "@/assets/lottie/1f615.json";
import { useToast } from "@/hooks/use-toast";
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
  const [step, setStep] = useState<Step>("history");
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
  const [otherTriggerText, setOtherTriggerText] = useState("");

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
    const finalTriggers = triggers.includes("Other") && otherTriggerText.trim()
      ? [...triggers.filter(t => t !== "Other"), `Other: ${otherTriggerText.trim()}`]
      : triggers;
    createLog.mutate(
      { data: { profileId, occurredAt: new Date().toISOString(), painLevel, painLocations: finalLocations, triggers: finalTriggers, whatHelped, hospitalVisit: hospitalVisit || false } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListCrisisLogsQueryKey({ profileId }) });
          toast({ title: "Log saved", description: "Thanks for tracking — it helps you see patterns." });
          // reset + go back to history
          setPainLevel(null); setLocations([]); setTriggers([]); setWhatHelped([]); setHospitalVisit(null); setOtherLocationText(""); setOtherTriggerText("");
          setStep("history");
        },
        onError: (e: any) => toast({ title: "Couldn't save log", description: e?.message ?? "Please try again", variant: "destructive" }),
      }
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
      <div className={`min-h-full flex flex-col ${flowStepHideNav ? "" : "pb-8"}`}>
        <AnimatePresence mode="wait">

          {step === "entry" && (
            <motion.div key="entry" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col flex-1 p-6 items-center justify-center text-center min-h-[70vh] relative">
              <button
                onClick={() => setStep("history")}
                aria-label="Back"
                className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-foreground bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
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
                <button
                  type="button"
                  onClick={() => setStep("history")}
                  aria-label="Back"
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm z-20"
                >
                  <ChevronLeft size={18} />
                </button>
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
                        <p className="text-base text-white/70 italic mb-2">Tap a face below to start</p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Emoji + label picker row */}
                <div className="grid grid-cols-4 gap-2 mb-10">
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

          {step === "triggers" && (() => {
            const TRIGGERS = [
              { key: "Cold Weather", anim: lottieCold,        bg: "#3B7FB8", caption: "Cold can constrict blood flow" },
              { key: "Stress",       anim: lottieStress,      bg: "#7A5CA8", caption: "Stress takes a toll on the body" },
              { key: "Infection",    anim: lottieInfection,   bg: "#5C9B5C", caption: "Infections can trigger crises" },
              { key: "Dehydration",  anim: lottieDehydration, bg: "#3FA6B8", caption: "Hydration helps cells flow" },
              { key: "Exertion",     anim: lottieExertion,    bg: "#C97A4A", caption: "Push gentle, rest often" },
              { key: "Missed meds",  anim: lottieMissed,      bg: "#A85C7A", caption: "Routine matters — set a reminder" },
              { key: "Other",        anim: lottieOther,       bg: "#3D6B6B", caption: "Note it for your team" },
            ] as const;
            const DEFAULT_BG = "#3D6B6B";
            const lastKey = triggers[triggers.length - 1];
            const focused = TRIGGERS.find(t => t.key === lastKey) ?? null;
            const bgColor = focused?.bg ?? DEFAULT_BG;
            const showOtherInput = triggers.includes("Other");
            return (
              <motion.div
                key="triggers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, backgroundColor: bgColor }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ backgroundColor: { duration: 0.5, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                className="flex-1 flex flex-col px-6 pt-10 pb-8 z-10 relative min-h-[100dvh]"
                style={{ backgroundColor: bgColor }}
              >
                <motion.div
                  aria-hidden
                  animate={{ backgroundColor: bgColor }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-x-0 -bottom-40 h-40 -z-10 pointer-events-none"
                  style={{ backgroundColor: bgColor }}
                />
                <button
                  type="button"
                  onClick={() => setStep("location")}
                  aria-label="Back"
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm z-20"
                >
                  <ChevronLeft size={18} />
                </button>
                <StepDots current={3} total={5} onDark onStepClick={goToStep} />
                <h2 className="font-serif text-[1.75rem] font-semibold text-center text-white tracking-[-0.5px] leading-[1.15] mb-2">
                  Any known triggers?
                </h2>
                <p className="text-center text-white/75 text-sm">Tap all that apply</p>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    key={focused?.key ?? "empty"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: focused ? 1 : 0.55 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="w-44 h-44 flex items-center justify-center mb-2"
                    style={{ filter: focused ? "drop-shadow(0 12px 24px rgba(0,0,0,0.25))" : "none" }}
                  >
                    <Lottie
                      animationData={focused?.anim ?? lottieOther}
                      loop
                      autoplay
                      className="w-full h-full"
                      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                    />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={focused?.key ?? "empty-cap"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-center text-white/85 text-sm italic"
                    >
                      {focused ? `"${focused.caption}"` : "Tap a trigger below"}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  {TRIGGERS.map(t => {
                    const isSelected = triggers.includes(t.key);
                    return (
                      <button
                        key={t.key}
                        onClick={() => toggleArrayItem(setTriggers, t.key)}
                        className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-2xl transition-all"
                        style={{
                          background: isSelected ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                          border: `1.5px solid ${isSelected ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
                          transform: isSelected ? "translateY(-2px)" : "translateY(0)",
                        }}
                      >
                        <div className="w-9 h-9">
                          <Lottie animationData={t.anim} loop autoplay className="w-full h-full" />
                        </div>
                        <span
                          className="text-[11px] font-semibold tracking-wide text-center"
                          style={{ color: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.75)" }}
                        >
                          {t.key}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showOtherInput && (
                    <motion.div
                      key="other-input"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mb-4 overflow-hidden"
                    >
                      <input
                        type="text"
                        value={otherTriggerText}
                        onChange={(e) => setOtherTriggerText(e.target.value)}
                        placeholder="Describe your trigger..."
                        className="w-full px-4 py-3 rounded-xl bg-white/15 border border-white/30 text-white placeholder:text-white/60 text-sm focus:outline-none focus:bg-white/20 focus:border-white/50 backdrop-blur-sm"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  size="xl"
                  className="w-full bg-white text-foreground hover:bg-white/95 shadow-lg"
                  onClick={() => setStep("relief")}
                >
                  <span className="flex items-center gap-2">Next <Check size={16} /></span>
                </Button>
              </motion.div>
            );
          })()}

          {step === "relief" && (() => {
            const RELIEFS = [
              { key: "Rest",        anim: lottieRest,    bg: "#5C7A9B", caption: "Rest helps your body recover" },
              { key: "Fluids",      anim: lottieFluids,  bg: "#3FA6B8", caption: "Hydration keeps cells flowing" },
              { key: "Pain meds",   anim: lottieMeds,    bg: "#7A5CA8", caption: "Take your meds as prescribed" },
              { key: "Warm bath",   anim: lottieBath,    bg: "#C97A4A", caption: "Warmth eases the muscles" },
              { key: "Massage",     anim: lottieMassage, bg: "#A85C7A", caption: "Gentle touch can soothe pain" },
              { key: "Nothing yet", anim: lottieNothing, bg: "#3D6B6B", caption: "It's okay — let's keep tracking" },
            ] as const;
            const DEFAULT_BG = "#3D6B6B";
            const lastKey = whatHelped[whatHelped.length - 1];
            const focused = RELIEFS.find(r => r.key === lastKey) ?? null;
            const bgColor = focused?.bg ?? DEFAULT_BG;
            return (
              <motion.div
                key="relief"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, backgroundColor: bgColor }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ backgroundColor: { duration: 0.5, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
                className="flex-1 flex flex-col px-6 pt-10 pb-8 z-10 relative min-h-[100dvh]"
                style={{ backgroundColor: bgColor }}
              >
                <motion.div
                  aria-hidden
                  animate={{ backgroundColor: bgColor }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-x-0 -bottom-40 h-40 -z-10 pointer-events-none"
                  style={{ backgroundColor: bgColor }}
                />
                <button
                  type="button"
                  onClick={() => setStep("triggers")}
                  aria-label="Back"
                  className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm z-20"
                >
                  <ChevronLeft size={18} />
                </button>
                <StepDots current={4} total={5} onDark onStepClick={goToStep} />
                <h2 className="font-serif text-[1.75rem] font-semibold text-center text-white tracking-[-0.5px] leading-[1.15] mb-2">
                  What has helped so far?
                </h2>
                <p className="text-center text-white/75 text-sm">Tap all that apply</p>

                <div className="flex-1 flex flex-col items-center justify-center">
                  <motion.div
                    key={focused?.key ?? "empty"}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: focused ? 1 : 0.55 }}
                    transition={{ type: "spring", stiffness: 220, damping: 16 }}
                    className="w-44 h-44 flex items-center justify-center mb-2"
                    style={{ filter: focused ? "drop-shadow(0 12px 24px rgba(0,0,0,0.25))" : "none" }}
                  >
                    <Lottie
                      animationData={focused?.anim ?? lottieRest}
                      loop
                      autoplay
                      className="w-full h-full"
                      rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
                    />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={focused?.key ?? "empty-cap"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="text-center text-white/85 text-sm italic"
                    >
                      {focused ? `"${focused.caption}"` : "Tap what has helped below"}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-6">
                  {RELIEFS.map(r => {
                    const isSelected = whatHelped.includes(r.key);
                    return (
                      <button
                        key={r.key}
                        onClick={() => toggleArrayItem(setWhatHelped, r.key)}
                        className="flex flex-col items-center gap-1 py-2.5 px-2 rounded-2xl transition-all"
                        style={{
                          background: isSelected ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)",
                          border: `1.5px solid ${isSelected ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.12)"}`,
                          transform: isSelected ? "translateY(-2px)" : "translateY(0)",
                        }}
                      >
                        <div className="w-9 h-9">
                          <Lottie animationData={r.anim} loop autoplay className="w-full h-full" />
                        </div>
                        <span
                          className="text-[11px] font-semibold tracking-wide text-center"
                          style={{ color: isSelected ? "#FFFFFF" : "rgba(255,255,255,0.75)" }}
                        >
                          {r.key}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <Button
                  size="xl"
                  className="w-full bg-white text-foreground hover:bg-white/95 shadow-lg"
                  onClick={() => setStep("hospital")}
                >
                  <span className="flex items-center gap-2">Next <Check size={16} /></span>
                </Button>
              </motion.div>
            );
          })()}

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

          {/* success step removed — toast shown instead */}

          {step === "history" && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col flex-1 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h1 className="h-page">Crisis</h1>
                  <p className="text-sm text-muted-foreground mt-1">You're not alone. We're here to help.</p>
                </div>
                {logs && logs.length > 0 && (
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => setLocation("/crisis/insights")}
                      aria-label="Insights"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted transition-colors"
                    >
                      <Chart size={16} />
                    </button>
                    <button
                      onClick={() => setLocation("/crisis/share")}
                      aria-label="Share history"
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted transition-colors"
                    >
                      <ShareIcon size={16} />
                    </button>
                  </div>
                )}
              </div>

              {/* Hero "In a crisis?" card */}
              <div
                className="relative overflow-hidden rounded-3xl p-5 mt-5 mb-6 text-white shadow-md"
                style={{ background: "linear-gradient(135deg, #8c2a3a 0%, #a8324a 100%)" }}
              >
                <h3 className="font-serif text-xl font-semibold tracking-[-0.3px] mb-3">In a crisis?</h3>
                <ol className="space-y-1.5 text-sm leading-snug text-white/95 mb-4 max-w-[78%]">
                  <li>1. Stay calm and follow your plan</li>
                  <li>2. Take your pain medication</li>
                  <li>3. Hydrate and rest</li>
                  <li>4. Seek medical help if needed</li>
                </ol>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-white/15 border-white/30 text-white hover:bg-white/25 backdrop-blur-sm rounded-full"
                  onClick={() => setLocation("/emergency")}
                >
                  View Action Plan
                </Button>
                <div className="absolute -right-3 -bottom-2 w-28 h-28 opacity-90 pointer-events-none">
                  <Lottie animationData={lottieMeds} loop autoplay className="w-full h-full" />
                </div>
              </div>

              {/* Recent header */}
              {logs && logs.length > 0 && (
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-serif text-base font-semibold text-foreground tracking-tight">Recent Crisis Logs</h2>
                </div>
              )}

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
              ) : !logs || logs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-2"
                >
                  <div className="surface-soft p-6 text-center">
                    <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                         style={{ background: "var(--gradient-warm)" }}>
                      <HealthIcon
                        outline={HeartbeatOutline}
                        filled={HeartbeatFilled}
                        width="32"
                        height="32"
                        active
                      />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1.5 tracking-tight">
                      No crises logged — that's a good thing.
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-[280px] mx-auto">
                      When pain shows up, log it here. Over time you'll see patterns — triggers, what helped, when to call your team.
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-5 text-left">
                      {[
                        { n: "1", t: "Tap Start log" },
                        { n: "2", t: "Rate the pain" },
                        { n: "3", t: "Note what helped" },
                      ].map((s) => (
                        <div key={s.n} className="rounded-xl bg-card/70 border border-border/40 p-2.5">
                          <div className="text-[10px] font-bold text-accent mb-0.5">STEP {s.n}</div>
                          <div className="text-[11px] font-medium text-foreground leading-tight">{s.t}</div>
                        </div>
                      ))}
                    </div>

                    <Button size="lg" className="w-full" onClick={() => setStep("entry")} data-testid="btn-empty-start-log">
                      <Plus size={16} /> Log your first crisis
                    </Button>
                    <button
                      onClick={() => setLocation("/emergency")}
                      className="mt-3 text-xs font-semibold text-accent hover:underline"
                    >
                      In a crisis right now? Get urgent care →
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {logs?.map((log, idx) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.25 }}
                    >
                      <div onClick={() => setLocation(`/crisis/${log.id}`)} className="cursor-pointer">
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
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Sticky bottom CTA */}
              {logs && logs.length > 0 && (
                <div className="sticky bottom-3 mt-6">
                  <Button size="xl" className="w-full shadow-lg" onClick={() => setStep("entry")} data-testid="btn-start-log-history">
                    <Plus size={18} /> Start New Crisis Log
                  </Button>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </MobileAppShell>
  );
}
