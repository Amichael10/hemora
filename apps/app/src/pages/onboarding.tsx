import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Baby } from "lucide-react";
import {
  PhoneBold as Phone,
  LetterBold as Mail,
  LockBold as Lock,
  ArrowLeftLinear as ArrowLeft,
  ArrowRightLinear as ArrowRight,
  HeartBold as Heart,
  UserBold as User,
  UsersGroupTwoRoundedBold as Users,
  UsersGroupRoundedBold as UsersRound,
  StarsBold as Sparkles,
  CheckCircleBold as CheckCircle2,
} from "solar-icon-set";
import { FaGoogle } from "react-icons/fa";
import { useCreateProfile, CreateProfileBodySetupFor } from "@workspace/api-client-react";
import { COUNTRIES, statesFor } from "@workspace/regions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import kindredWordmark from "@assets/Wordmark_1778055009011.png";
import botanical from "@/assets/images/botanical-illustration.png";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import { useAuth } from "@/context/AuthContext";
import { authRedirectUrl } from "@/lib/supabase";

type SetupFor = CreateProfileBodySetupFor;

interface FormData {
  setupFor: SetupFor;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  scdStatus: string;
  country: string;
  state: string;
}

const SETUP_OPTIONS: { id: SetupFor; label: string; sub: string; Icon: typeof User }[] = [
  { id: CreateProfileBodySetupFor.myself, label: "Myself", sub: "I live with sickle cell", Icon: User },
  { id: CreateProfileBodySetupFor.my_child, label: "My child", sub: "I'm caring for my little one", Icon: Baby },
  { id: CreateProfileBodySetupFor.someone_i_care_for, label: "Someone I care for", sub: "A loved one or family member", Icon: Heart },
  { id: CreateProfileBodySetupFor.partner_and_i, label: "My partner and I", sub: "We're navigating this together", Icon: UsersRound },
];

const GENOTYPES = ["HbSS", "HbSC", "HbS\u03B2", "AS (Trait)", "Not sure", "Prefer not to say"];

const TOTAL_STEPS = 7;
const PROGRESS_STEPS = [1, 2, 3, 4, 5, 6];

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createProfile = useCreateProfile();
  const { setProfileId } = useProfile();
  const { user, signInWithGoogle, signUpWithPassword } = useAuth();

  const initialStep = (() => {
    if (typeof window === "undefined") return 0;
    const sp = new URLSearchParams(window.location.search);
    const s = Number(sp.get("step"));
    return Number.isFinite(s) && s >= 0 && s <= TOTAL_STEPS ? s : 0;
  })();

  const [step, setStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [authMode, setAuthMode] = useState<"choose" | "email">("choose");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const redirectUrl = typeof window !== "undefined" ? authRedirectUrl() : "";
  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname.startsWith("127.") ||
      window.location.hostname.endsWith(".lovable.app"));

  // If user lands here already signed in, skip past auth.
  useEffect(() => {
    if (user && step === 0) {
      setDirection(1);
      setStep(1);
    }
  }, [user, step]);
  const [data, setData] = useState<FormData>({
    setupFor: CreateProfileBodySetupFor.myself,
    fullName: "",
    dateOfBirth: "",
    gender: "",
    scdStatus: "",
    country: "",
    state: "",
  });

  const next = () => { setDirection(1); setStep((s) => Math.min(s + 1, TOTAL_STEPS)); };
  const back = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)); };
  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => setData((d) => ({ ...d, [k]: v }));

  const handleFinish = () => {
    createProfile.mutate(
      {
        data: {
          ...data,
          dateOfBirth: data.dateOfBirth || null,
          gender: data.gender || null,
          scdStatus: data.scdStatus || null,
          country: data.country || null,
          state: data.state || null,
          supabaseUserId: user?.id ?? null,
          email: user?.email ?? null,
        },
      },
      {
        onSuccess: (newProfile) => {
          setProfileId(newProfile.id);
          setLocation("/dashboard");
        },
        onError: () => toast({ title: "Something went wrong", description: "Please try again in a moment.", variant: "destructive" }),
      }
    );
  };

  const handleGoogle = async () => {
    setAuthError(null);
    setAuthBusy(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setAuthError(error);
        toast({ title: "Couldn't start Google sign-in", description: error, variant: "destructive" });
      }
      // On success, browser redirects away; no further action needed.
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setAuthError(msg);
      toast({ title: "Couldn't start Google sign-in", description: msg, variant: "destructive" });
    } finally {
      setAuthBusy(false);
    }
  };

  const handleEmailSubmit = async () => {
    setAuthError(null);
    const trimmed = emailInput.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setAuthError("Please enter a valid email address.");
      return;
    }
    if (passwordInput.length < 8) {
      setAuthError("Password must be at least 8 characters.");
      return;
    }
    setAuthBusy(true);
    try {
      const { error } = await signUpWithPassword(trimmed, passwordInput);
      if (error) {
        setAuthError(error);
        toast({ title: "Couldn't create account", description: error, variant: "destructive" });
        return;
      }
      // Auto-confirm is on; the auth listener will set `user` and useEffect advances to step 1.
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setAuthError(msg);
      toast({ title: "Couldn't create account", description: msg, variant: "destructive" });
    } finally {
      setAuthBusy(false);
    }
  };

  const slide = {
    initial: (dir: number) => ({ opacity: 0, x: dir * 40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.3 } }),
  };

  const canAdvance = (() => {
    if (step === 1) return !!data.setupFor;
    if (step === 2) return data.fullName.trim().length >= 2;
    if (step === 3) return true; // dob optional
    if (step === 4) return true; // gender optional
    if (step === 5) return true; // scd optional
    if (step === 6) return true; // country/state optional
    return true;
  })();

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl">

        {/* ── Header: back + progress dots ─────────────────────── */}
        {step > 0 && step < TOTAL_STEPS && (
          <div className="flex items-center justify-between px-5 pt-12 pb-2 z-10">
            <button
              onClick={back}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors text-primary"
              aria-label="Back"
              data-testid="btn-onboarding-back"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-1.5">
              {PROGRESS_STEPS.map((s) => (
                <motion.div
                  key={s}
                  className="rounded-full"
                  animate={{
                    width: s === step ? 22 : 6,
                    height: 6,
                    backgroundColor: s <= step ? "var(--primary)" : "var(--border)",
                    opacity: s <= step ? (s === step ? 1 : 0.4) : 0.5,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <div className="w-10" />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>

            {/* ── STEP 0: Auth / welcome ──────────────────────── */}
            {step === 0 && (
              <motion.div
                key="auth"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col p-6 pt-16"
              >
                <div className="flex justify-center mb-10">
                  <img src={kindredWordmark} alt="Kindred" className="h-8" />
                </div>

                <div className="flex-1 flex flex-col justify-center items-center text-center -mt-4">
                  <motion.img
                    src={botanical}
                    alt=""
                    className="w-32 h-32 mb-8 opacity-90"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.9, scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <h1 className="font-serif text-[1.875rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px] max-w-[300px]">
                    Welcome to your family's companion.
                  </h1>
                  <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                    A gentle place to track care, log moments, and find support — together.
                  </p>
                </div>

                <div className="space-y-2.5 mt-8">
                  {authMode === "choose" && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full h-[3.25rem] text-[15px] border-primary/20 hover:bg-primary/5 text-primary flex items-center justify-start px-5 gap-4 rounded-2xl"
                        onClick={() => toast({ title: "Phone sign-in coming soon", description: "Please continue with email or Google for now." })}
                        data-testid="button-auth-phone"
                      >
                        <span className="shrink-0 inline-flex"><Phone size={18} /></span>
                        Continue with Phone
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-[3.25rem] text-[15px] border-primary/20 hover:bg-primary/5 text-primary flex items-center justify-start px-5 gap-4 rounded-2xl"
                        onClick={() => setAuthMode("email")}
                        data-testid="button-auth-email"
                      >
                        <span className="shrink-0 inline-flex"><Mail size={18} /></span>
                        Continue with Email
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-[3.25rem] text-[15px] border-primary/20 hover:bg-primary/5 text-primary flex items-center justify-start px-5 gap-4 rounded-2xl"
                        onClick={handleGoogle}
                        disabled={authBusy}
                        data-testid="button-auth-google"
                      >
                        <FaGoogle className="w-[18px] h-[18px] shrink-0" />
                        {authBusy ? "Opening Google…" : "Continue with Google"}
                      </Button>
                    </>
                  )}

                  {authMode === "email" && (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground text-center">Create your account with a password.</p>
                      <Input
                        type="email"
                        inputMode="email"
                        autoFocus
                        placeholder="you@example.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="h-[3.25rem] text-[15px] rounded-2xl border-primary/20 px-5"
                        data-testid="input-auth-email"
                      />
                      <Input
                        type="password"
                        autoComplete="new-password"
                        placeholder="Password (min 8 chars)"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleEmailSubmit(); }}
                        className="h-[3.25rem] text-[15px] rounded-2xl border-primary/20 px-5"
                        data-testid="input-auth-password"
                        minLength={8}
                      />
                      <Button
                        className="w-full h-[3.25rem] text-[15px] rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={handleEmailSubmit}
                        disabled={authBusy}
                        data-testid="button-auth-email-send"
                      >
                        {authBusy ? "Creating…" : "Create account"}
                      </Button>
                      {authError && (
                        <p
                          className="text-xs text-destructive text-center px-2"
                          data-testid="text-auth-error"
                        >
                          {authError}
                        </p>
                      )}
                      <button
                        className="w-full text-xs text-muted-foreground hover:text-primary pt-1"
                        onClick={() => { setAuthMode("choose"); setEmailInput(""); setPasswordInput(""); setAuthError(null); }}
                      >
                        Use a different method
                      </button>
                    </div>
                  )}

                  {isDev && redirectUrl && (
                    <div className="mt-4 p-3 rounded-md border border-dashed border-border bg-muted/40 text-left">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                        Auth diagnostics (dev only)
                      </p>
                      <p className="text-xs font-mono break-all text-foreground/80">
                        {redirectUrl}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Add this URL to the URI allow list below.
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-5 mb-2">
                  <Lock size={12} />
                  <p>Your health data is securely encrypted.</p>
                </div>
              </motion.div>
            )}

            {/* ── STEP 1: Who are you setting up for? ────────── */}
            {step === 1 && (
              <motion.div
                key="who"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-2 pb-6"
              >
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[2px] text-primary/50 font-semibold mb-3">Step One</p>
                  <h2 className="font-serif text-[1.625rem] text-primary font-semibold leading-[1.2] tracking-[-0.5px]">
                    Who are you setting up Kindred for?
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {SETUP_OPTIONS.map((opt) => {
                    const selected = data.setupFor === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => { update("setupFor", opt.id); setTimeout(next, 220); }}
                        className="w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 border"
                        style={{
                          background: selected ? "var(--primary)" : "var(--background)",
                          borderColor: selected ? "var(--primary)" : "var(--border)",
                          color: selected ? "var(--primary-foreground)" : "var(--foreground)",
                          transform: selected ? "scale(1.01)" : "scale(1)",
                        }}
                        data-testid={`option-setup-${opt.id}`}
                      >
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: selected ? "rgba(255,255,255,0.15)" : "var(--secondary)",
                            color: selected ? "#fff" : "var(--primary)",
                          }}
                        >
                          <opt.Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[15px]">{opt.label}</p>
                          <p
                            className="text-xs mt-0.5"
                            style={{ color: selected ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)" }}
                          >
                            {opt.sub}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: What's your name? ─────────────────── */}
            {step === 2 && (
              <motion.div
                key="name"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-2 pb-6"
              >
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[2px] text-primary/50 font-semibold mb-3">Step Two</p>
                  <h2 className="font-serif text-[1.75rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px]">
                    {data.setupFor === CreateProfileBodySetupFor.myself ? "What should we call you?" :
                     data.setupFor === CreateProfileBodySetupFor.my_child ? "What's your child's name?" :
                     "What's their name?"}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    We'll use this to personalize your experience.
                  </p>
                </div>

                <div className="flex-1 flex flex-col">
                  <Input
                    autoFocus
                    placeholder="Full name"
                    value={data.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && canAdvance) next(); }}
                    className="h-14 text-lg font-serif border-0 border-b-2 border-primary/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/40 placeholder:font-sans placeholder:text-base bg-transparent"
                    data-testid="input-full-name"
                  />
                </div>

                <Button
                  onClick={next}
                  disabled={!canAdvance}
                  className="w-full h-14 rounded-2xl text-base font-semibold mt-6 shadow-sm gap-2"
                  data-testid="btn-step-name-continue"
                >
                  Continue <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}

            {/* ── STEP 3: Date of birth ─────────────────────── */}
            {step === 3 && (
              <motion.div
                key="dob"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-2 pb-6"
              >
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[2px] text-primary/50 font-semibold mb-3">Step Three</p>
                  <h2 className="font-serif text-[1.75rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px]">
                    When {data.setupFor === CreateProfileBodySetupFor.myself ? "were you" : "were they"} born?
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Helps us tailor age-appropriate guidance. You can skip this for now.
                  </p>
                </div>

                <div className="flex-1 flex flex-col">
                  <Input
                    type="date"
                    autoFocus
                    value={data.dateOfBirth}
                    onChange={(e) => update("dateOfBirth", e.target.value)}
                    className="h-14 text-lg font-serif border-0 border-b-2 border-primary/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary bg-transparent"
                    data-testid="input-dob"
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={next}
                    className="flex-1 h-14 rounded-2xl text-base font-medium text-muted-foreground"
                    data-testid="btn-skip-dob"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={next}
                    className="flex-[2] h-14 rounded-2xl text-base font-semibold shadow-sm gap-2"
                    data-testid="btn-step-dob-continue"
                  >
                    Continue <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: Gender ─────────────────────────────── */}
            {step === 4 && (
              <motion.div
                key="gender"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-2 pb-6"
              >
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-[2px] text-primary/50 font-semibold mb-3">Step Four</p>
                  <h2 className="font-serif text-[1.75rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px]">
                    {data.setupFor === CreateProfileBodySetupFor.myself ? "How do you identify?" : "How do they identify?"}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Optional — skip if you'd rather not say.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {["Female", "Male", "Non-binary", "Prefer not to say"].map((g) => {
                    const selected = data.gender === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => { update("gender", g); setTimeout(next, 220); }}
                        className="rounded-2xl p-4 text-sm font-semibold transition-all border text-center"
                        style={{
                          background: selected ? "var(--primary)" : "var(--background)",
                          borderColor: selected ? "var(--primary)" : "var(--border)",
                          color: selected ? "var(--primary-foreground)" : "var(--foreground)",
                        }}
                        data-testid={`option-gender-${g.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── STEP 5: SCD genotype ───────────────────────── */}
            {step === 5 && (
              <motion.div
                key="scd"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-2 pb-6"
              >
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[2px] text-primary/50 font-semibold mb-3">Step Five</p>
                  <h2 className="font-serif text-[1.75rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px]">
                    Sickle cell genotype
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    If you know it, share it — it helps us personalize care guidance. If not, that's okay.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {GENOTYPES.map((g) => {
                    const selected = data.scdStatus === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => update("scdStatus", g)}
                        className="px-4 py-2.5 rounded-full text-sm font-semibold transition-all border"
                        style={{
                          background: selected ? "var(--primary)" : "var(--background)",
                          borderColor: selected ? "var(--primary)" : "var(--border)",
                          color: selected ? "var(--primary-foreground)" : "var(--foreground)",
                        }}
                        data-testid={`option-scd-${g.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>

                <div className="flex-1" />

                <Button
                  onClick={next}
                  className="w-full h-14 rounded-2xl text-base font-semibold shadow-sm gap-2"
                  data-testid="btn-step-scd-continue"
                >
                  Continue <ArrowRight size={16} />
                </Button>
              </motion.div>
            )}

            {/* ── STEP 6: Where are you based? ───────────────── */}
            {step === 6 && (
              <motion.div
                key="location"
                custom={direction}
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-1 flex flex-col px-6 pt-2 pb-6"
              >
                <div className="mb-8">
                  <p className="text-xs uppercase tracking-[2px] text-primary/50 font-semibold mb-3">Step Six</p>
                  <h2 className="font-serif text-[1.75rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px]">
                    Where are you based?
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    We'll show specialists and clinics near you first. You can change this anytime.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs uppercase tracking-[1.5px] text-primary/50 font-semibold mb-2 block">
                      Country
                    </label>
                    <Select
                      value={data.country}
                      onValueChange={(v) => {
                        update("country", v);
                        update("state", "");
                      }}
                    >
                      <SelectTrigger
                        className="h-12 rounded-2xl border-primary/20 bg-background text-[15px]"
                        data-testid="select-onboarding-country"
                      >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => (
                          <SelectItem key={c.code} value={c.name}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[1.5px] text-primary/50 font-semibold mb-2 block">
                      State / Region
                    </label>
                    <Select
                      value={data.state}
                      onValueChange={(v) => update("state", v)}
                      disabled={!data.country || statesFor(data.country).length === 0}
                    >
                      <SelectTrigger
                        className="h-12 rounded-2xl border-primary/20 bg-background text-[15px]"
                        data-testid="select-onboarding-state"
                      >
                        <SelectValue placeholder={data.country ? "Select your state or region" : "Pick a country first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {statesFor(data.country).map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex-1" />

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={next}
                    className="flex-1 h-14 rounded-2xl text-base font-medium text-muted-foreground"
                    data-testid="btn-skip-location"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={next}
                    className="flex-[2] h-14 rounded-2xl text-base font-semibold shadow-sm gap-2"
                    data-testid="btn-step-location-continue"
                  >
                    Continue <ArrowRight size={16} />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 7: Welcome reveal ─────────────────────── */}
            {step === 7 && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.6 } }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center text-center px-6 pt-16 pb-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                    className="mb-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: "linear-gradient(140deg, #39839F 0%, #256680 100%)" }}
                  >
                    <Sparkles size={22} className="text-white" />
                  </motion.div>

                  <p className="text-xs uppercase tracking-[3px] text-primary/50 font-semibold mb-3">All set</p>
                  <h2 className="font-serif text-[2rem] text-primary font-semibold leading-[1.15] tracking-[-0.5px] max-w-[320px]">
                    Welcome, {data.fullName.split(" ")[0] || "friend"}.
                  </h2>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-[300px]">
                    Your space is ready. We're honored to walk this journey with you.
                  </p>
                </motion.div>

                <div className="mb-auto" />

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="w-full"
                >
                  <Button
                    onClick={handleFinish}
                    disabled={createProfile.isPending}
                    className="w-full h-14 rounded-2xl text-base font-semibold shadow-md gap-2"
                    data-testid="btn-enter-kindred"
                  >
                    {createProfile.isPending ? "Setting up your space..." : "Enter Kindred"}
                    {!createProfile.isPending && <ArrowRight size={16} />}
                  </Button>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
