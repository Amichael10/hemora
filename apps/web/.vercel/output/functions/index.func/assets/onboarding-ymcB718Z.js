import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { c as createLucideIcon, u as useLocation, a as useToast, b as useCreateProfile, d as useProfile, e as useAuth, C as CreateProfileBodySetupFor } from "./AppRouter-yFV4k-aY.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as L4, N as N41, V as V1, Z as ZF1, F as FN1, K as Kb1, W as WN1, q as q4, p as pV } from "./index-D2ZfvGdl.js";
import { F as FaGoogle } from "./index-BTaan__n.js";
import { u as useCreateFamilyMember } from "./family-api-DiGCStl0.js";
import { C as COUNTRIES, s as statesFor } from "./index-BEVAgEKR.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-x5Uz1oRZ.js";
import { m as motion } from "./router-BY6ex80A.js";
import { A as AnimatePresence } from "./index-DsxiOxRd.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./push.server-DA3L-NAE.js";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "tty";
import "os";
import "http";
import "./index-BfrgU2eP.js";
import "./Combination-BEb72fQw.js";
import "./index-CJIBj5JK.js";
import "./index-D8DUTDeV.js";
import "./check-Dt55N_VK.js";
const __iconNode = [
  ["path", { d: "M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5", key: "1u7htd" }],
  ["path", { d: "M15 12h.01", key: "1k8ypt" }],
  [
    "path",
    {
      d: "M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1",
      key: "11xh7x"
    }
  ],
  ["path", { d: "M9 12h.01", key: "157uk2" }]
];
const Baby = createLucideIcon("baby", __iconNode);
const kindredWordmark = "/assets/Wordmark_1778055009011-k-AnRr7l.png";
const botanical = "/assets/botanical-illustration-C1A6FHH-.png";
const SETUP_OPTIONS = [
  { id: CreateProfileBodySetupFor.myself, label: "Myself", sub: "I live with sickle cell", Icon: FN1 },
  { id: CreateProfileBodySetupFor.my_child, label: "My child", sub: "I'm caring for my little one", Icon: Baby },
  { id: CreateProfileBodySetupFor.someone_i_care_for, label: "Someone I care for", sub: "A loved one or family member", Icon: Kb1 },
  { id: CreateProfileBodySetupFor.partner_and_i, label: "My partner and I", sub: "We're navigating this together", Icon: WN1 }
];
const GENOTYPES = ["HbSS", "HbSC", "HbSβ", "AS (Trait)", "Not sure", "Prefer not to say"];
const TOTAL_STEPS = 7;
const PROGRESS_STEPS = [1, 2, 3, 4, 5, 6];
function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createProfile = useCreateProfile();
  const createFamilyMember = useCreateFamilyMember();
  const { setProfileId, setActiveProfileId } = useProfile();
  const { user, signInWithGoogle, signUpWithPassword } = useAuth();
  const initialStep = (() => {
    if (typeof window === "undefined") return 0;
    const sp = new URLSearchParams(window.location.search);
    const s = Number(sp.get("step"));
    return Number.isFinite(s) && s >= 0 && s <= TOTAL_STEPS ? s : 0;
  })();
  const [step, setStep] = reactExports.useState(initialStep);
  const [direction, setDirection] = reactExports.useState(1);
  const [authMode, setAuthMode] = reactExports.useState("choose");
  const [emailInput, setEmailInput] = reactExports.useState("");
  const [passwordInput, setPasswordInput] = reactExports.useState("");
  const [authBusy, setAuthBusy] = reactExports.useState(false);
  const [authError, setAuthError] = reactExports.useState(null);
  typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname.startsWith("127."));
  reactExports.useEffect(() => {
    if (user && step === 0) {
      setDirection(1);
      setStep(1);
    }
  }, [user, step]);
  reactExports.useEffect(() => {
    if (!user) return;
    const meta = user.user_metadata ?? {};
    const googleName = meta.full_name || meta.name || [meta.given_name, meta.family_name].filter(Boolean).join(" ") || void 0;
    if (googleName) {
      setData((d) => d.fullName ? d : { ...d, fullName: googleName });
    }
  }, [user]);
  const [data, setData] = reactExports.useState({
    setupFor: CreateProfileBodySetupFor.myself,
    fullName: "",
    dateOfBirth: "",
    gender: "",
    scdStatus: "",
    country: "",
    state: ""
  });
  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };
  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };
  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const handleFinish = async () => {
    try {
      const profile = await createProfile.mutateAsync({
        data: {
          ...data,
          dateOfBirth: data.dateOfBirth || null,
          gender: data.gender || null,
          scdStatus: data.scdStatus || null,
          country: data.country || null,
          state: data.state || null,
          supabaseUserId: user?.id ?? null,
          email: user?.email ?? null
        }
      });
      const isSelf = data.setupFor === CreateProfileBodySetupFor.myself;
      const userMeta = user?.user_metadata || {};
      const userName = userMeta.full_name || userMeta.name || "Me";
      const selfMember = await createFamilyMember.mutateAsync({
        fullName: isSelf ? data.fullName : userName,
        relationship: "Self",
        isSelf: true,
        genotype: isSelf ? data.scdStatus : null
      });
      let targetMember = selfMember;
      if (!isSelf) {
        const relationship = data.setupFor === CreateProfileBodySetupFor.my_child ? "child" : data.setupFor === CreateProfileBodySetupFor.someone_i_care_for ? "dependent" : data.setupFor === CreateProfileBodySetupFor.partner_and_i ? "partner" : "other";
        targetMember = await createFamilyMember.mutateAsync({
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth || null,
          relationship,
          genotype: data.scdStatus,
          isSelf: false
        });
      }
      setProfileId(profile.id);
      setActiveProfileId(targetMember.id);
      setLocation("/dashboard");
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    }
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
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unexpected error";
      setAuthError(msg);
      toast({ title: "Couldn't create account", description: msg, variant: "destructive" });
    } finally {
      setAuthBusy(false);
    }
  };
  const slide = {
    initial: (dir) => ({ opacity: 0, x: dir * 40 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit: (dir) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.3 } })
  };
  const canAdvance = (() => {
    if (step === 1) return !!data.setupFor;
    if (step === 2) return data.fullName.trim().length >= 2;
    return true;
  })();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl", children: [
    step > 0 && step < TOTAL_STEPS && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-12 pb-2 z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: back,
          className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted/50 transition-colors text-foreground",
          "aria-label": "Back",
          "data-testid": "btn-onboarding-back",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(L4, { size: 18 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5", children: PROGRESS_STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "rounded-full",
          animate: {
            width: s === step ? 22 : 6,
            height: 6,
            backgroundColor: s <= step ? "var(--foreground)" : "var(--border)",
            opacity: s <= step ? s === step ? 1 : 0.4 : 0.5
          },
          transition: { duration: 0.3 }
        },
        s
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", custom: direction, children: [
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col p-6 pt-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: kindredWordmark, alt: "Kindred", className: "h-8" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col justify-center items-center text-center -mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.img,
                {
                  src: botanical,
                  alt: "",
                  className: "w-32 h-32 mb-8 opacity-90",
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 0.9, scale: 1 },
                  transition: { duration: 1.2, ease: "easeOut" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[1.875rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px] max-w-[300px]", children: "Welcome to your family's companion." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-sm leading-relaxed max-w-[280px]", children: "A gentle place to track care, log moments, and find support — together." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 mt-8", children: [
              authMode === "choose" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full h-[3.25rem] text-[15px] border-foreground/20 hover:bg-foreground/5 text-foreground flex items-center justify-start px-5 gap-4 rounded-2xl",
                    onClick: () => toast({ title: "Phone sign-in coming soon", description: "Please continue with email or Google for now." }),
                    "data-testid": "button-auth-phone",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(N41, { size: 18 }) }),
                      "Continue with Phone"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full h-[3.25rem] text-[15px] border-foreground/20 hover:bg-foreground/5 text-foreground flex items-center justify-start px-5 gap-4 rounded-2xl",
                    onClick: () => setAuthMode("email"),
                    "data-testid": "button-auth-email",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(V1, { size: 18 }) }),
                      "Continue with Email"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full h-[3.25rem] text-[15px] border-foreground/20 hover:bg-foreground/5 text-foreground flex items-center justify-start px-5 gap-4 rounded-2xl",
                    onClick: handleGoogle,
                    disabled: authBusy,
                    "data-testid": "button-auth-google",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FaGoogle, { className: "w-[18px] h-[18px] shrink-0" }),
                      authBusy ? "Opening Google…" : "Continue with Google"
                    ]
                  }
                )
              ] }),
              authMode === "email" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Create your account with a password." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "email",
                    inputMode: "email",
                    autoFocus: true,
                    placeholder: "you@example.com",
                    value: emailInput,
                    onChange: (e) => setEmailInput(e.target.value),
                    className: "h-[3.25rem] text-[15px] rounded-2xl border-foreground/20 px-5",
                    "data-testid": "input-auth-email"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    type: "password",
                    autoComplete: "new-password",
                    placeholder: "Password (min 8 chars)",
                    value: passwordInput,
                    onChange: (e) => setPasswordInput(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === "Enter") handleEmailSubmit();
                    },
                    className: "h-[3.25rem] text-[15px] rounded-2xl border-foreground/20 px-5",
                    "data-testid": "input-auth-password",
                    minLength: 8
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    className: "w-full h-[3.25rem] text-[15px] rounded-2xl bg-foreground text-white hover:bg-foreground/90",
                    onClick: handleEmailSubmit,
                    disabled: authBusy,
                    "data-testid": "button-auth-email-send",
                    children: authBusy ? "Creating…" : "Create account"
                  }
                ),
                authError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive text-center px-2", "data-testid": "text-auth-error", children: authError }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    className: "w-full text-xs text-muted-foreground hover:text-foreground pt-1",
                    onClick: () => {
                      setAuthMode("choose");
                      setEmailInput("");
                      setPasswordInput("");
                      setAuthError(null);
                    },
                    children: "Use a different method"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground mt-5 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ZF1, { size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Your health data is securely encrypted." })
            ] })
          ]
        },
        "auth"
      ),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col px-6 pt-2 pb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[2px] text-foreground/50 font-semibold mb-3", children: "Step One" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-[1.625rem] text-foreground font-semibold leading-[1.2] tracking-[-0.5px]", children: "Who are you setting up Kindred for?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: SETUP_OPTIONS.map((opt) => {
              const selected = data.setupFor === opt.id;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => {
                    update("setupFor", opt.id);
                    setTimeout(next, 220);
                  },
                  className: "w-full text-left rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 border",
                  style: {
                    background: selected ? "var(--secondary)" : "var(--background)",
                    borderColor: selected ? "var(--secondary)" : "var(--border)",
                    color: selected ? "var(--secondary-foreground)" : "var(--foreground)",
                    transform: selected ? "scale(1.01)" : "scale(1)"
                  },
                  "data-testid": `option-setup-${opt.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                        style: {
                          background: selected ? "rgba(255,255,255,0.15)" : "var(--secondary)",
                          color: "#fff",
                          border: `2px solid ${selected ? "#fff" : "transparent"}`
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(opt.Icon, { size: 20 })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-[15px]", children: opt.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "text-xs mt-0.5",
                          style: { color: selected ? "rgba(255,255,255,0.75)" : "var(--muted-foreground)" },
                          children: opt.sub
                        }
                      )
                    ] })
                  ]
                },
                opt.id
              );
            }) })
          ]
        },
        "who"
      ),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col px-6 pt-2 pb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[2px] text-foreground/50 font-semibold mb-3", children: "Step Two" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-[1.75rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px]", children: data.setupFor === CreateProfileBodySetupFor.myself ? "What should we call you?" : data.setupFor === CreateProfileBodySetupFor.my_child ? "What's your child's name?" : "What's their name?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "We'll use this to personalize your experience." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                autoFocus: true,
                placeholder: "Full name",
                value: data.fullName,
                onChange: (e) => update("fullName", e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter" && canAdvance) next();
                },
                className: "h-14 text-lg font-serif border-0 border-b-2 border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground placeholder:text-muted-foreground/40 placeholder:font-sans placeholder:text-base bg-transparent",
                "data-testid": "input-full-name"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: next,
                disabled: !canAdvance,
                className: "w-full h-14 rounded-2xl text-base font-semibold mt-6 shadow-sm gap-2",
                "data-testid": "btn-step-name-continue",
                children: [
                  "Continue ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(q4, { size: 16 })
                ]
              }
            )
          ]
        },
        "name"
      ),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col px-6 pt-2 pb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[2px] text-foreground/50 font-semibold mb-3", children: "Step Three" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-[1.75rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px]", children: [
                "When ",
                data.setupFor === CreateProfileBodySetupFor.myself ? "were you" : "were they",
                " born?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "Helps us tailor age-appropriate guidance. You can skip this for now." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "date",
                autoFocus: true,
                value: data.dateOfBirth,
                onChange: (e) => update("dateOfBirth", e.target.value),
                className: "h-14 text-lg font-serif border-0 border-b-2 border-foreground/20 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground bg-transparent",
                "data-testid": "input-dob"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  onClick: next,
                  className: "flex-1 h-14 rounded-2xl text-base font-medium text-muted-foreground",
                  "data-testid": "btn-skip-dob",
                  children: "Skip"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: next,
                  className: "flex-[2] h-14 rounded-2xl text-base font-semibold shadow-sm gap-2",
                  "data-testid": "btn-step-dob-continue",
                  children: [
                    "Continue ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(q4, { size: 16 })
                  ]
                }
              )
            ] })
          ]
        },
        "dob"
      ),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col px-6 pt-2 pb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[2px] text-foreground/50 font-semibold mb-3", children: "Step Four" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-[1.75rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px]", children: data.setupFor === CreateProfileBodySetupFor.myself ? "How do you identify?" : "How do they identify?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "Optional — skip if you'd rather not say." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2.5", children: ["Female", "Male", "Non-binary", "Prefer not to say"].map((g) => {
              const selected = data.gender === g;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    update("gender", g);
                    setTimeout(next, 220);
                  },
                  className: "rounded-2xl p-4 text-sm font-semibold transition-all border text-center",
                  style: {
                    background: selected ? "var(--secondary)" : "var(--background)",
                    borderColor: selected ? "var(--secondary)" : "var(--border)",
                    color: selected ? "var(--secondary-foreground)" : "var(--foreground)"
                  },
                  "data-testid": `option-gender-${g.toLowerCase().replace(/\s+/g, "-")}`,
                  children: g
                },
                g
              );
            }) })
          ]
        },
        "gender"
      ),
      step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col px-6 pt-2 pb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[2px] text-foreground/50 font-semibold mb-3", children: "Step Five" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-[1.75rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px]", children: "Sickle cell genotype" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "If you know it, share it — it helps us personalize care guidance. If not, that's okay." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: GENOTYPES.map((g) => {
              const selected = data.scdStatus === g;
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => update("scdStatus", g),
                  className: "px-4 py-2.5 rounded-full text-sm font-semibold transition-all border",
                  style: {
                    background: selected ? "var(--secondary)" : "var(--background)",
                    borderColor: selected ? "var(--secondary)" : "var(--border)",
                    color: selected ? "var(--secondary-foreground)" : "var(--foreground)"
                  },
                  "data-testid": `option-scd-${g.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`,
                  children: g
                },
                g
              );
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: next,
                className: "w-full h-14 rounded-2xl text-base font-semibold mt-6 shadow-sm gap-2",
                "data-testid": "btn-step-scd-continue",
                children: [
                  "Continue ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(q4, { size: 16 })
                ]
              }
            )
          ]
        },
        "scd"
      ),
      step === 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slide,
          initial: "initial",
          animate: "animate",
          exit: "exit",
          className: "flex-1 flex flex-col px-6 pt-2 pb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[2px] text-foreground/50 font-semibold mb-3", children: "Step Six" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-[1.75rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px]", children: "Where are you based?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground leading-relaxed", children: "We'll show specialists and clinics near you first. You can change this anytime." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[1.5px] text-foreground/50 font-semibold mb-2 block", children: "Country" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: data.country,
                    onValueChange: (v) => {
                      update("country", v);
                      update("state", "");
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-12 rounded-2xl border-foreground/20 bg-background text-[15px]",
                          "data-testid": "select-onboarding-country",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your country" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.name, children: c.name }, c.code)) })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-[1.5px] text-foreground/50 font-semibold mb-2 block", children: "State / Region" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: data.state,
                    onValueChange: (v) => update("state", v),
                    disabled: !data.country || statesFor(data.country).length === 0,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          className: "h-12 rounded-2xl border-foreground/20 bg-background text-[15px]",
                          "data-testid": "select-onboarding-state",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: data.country ? "Select your state or region" : "Pick a country first" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: statesFor(data.country).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  onClick: next,
                  className: "flex-1 h-14 rounded-2xl text-base font-medium text-muted-foreground",
                  "data-testid": "btn-skip-location",
                  children: "Skip"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  onClick: next,
                  className: "flex-[2] h-14 rounded-2xl text-base font-semibold shadow-sm gap-2",
                  "data-testid": "btn-step-location-continue",
                  children: [
                    "Continue ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(q4, { size: 16 })
                  ]
                }
              )
            ] })
          ]
        },
        "location"
      ),
      step === 7 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: 0.6 } },
          exit: { opacity: 0 },
          className: "flex-1 flex flex-col items-center text-center px-6 pt-16 pb-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.9, y: 10 },
                animate: { opacity: 1, scale: 1, y: 0 },
                transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
                className: "flex flex-col items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scale: 0, opacity: 0 },
                      animate: { scale: 1, opacity: 1 },
                      transition: { delay: 0.3, duration: 0.5, type: "spring" },
                      className: "mb-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg",
                      style: { background: "var(--gradient-brand)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(pV, { size: 22, className: "text-white" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[3px] text-foreground/50 font-semibold mb-3", children: "All set" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-[2rem] text-foreground font-semibold leading-[1.15] tracking-[-0.5px] max-w-[320px]", children: [
                    "Welcome, ",
                    data.fullName.split(" ")[0] || "friend",
                    "."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed max-w-[300px]", children: "Your space is ready. We're honored to walk this journey with you." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-auto" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.9, duration: 0.5 },
                className: "w-full",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: handleFinish,
                    disabled: createProfile.isPending,
                    className: "w-full h-14 rounded-2xl text-base font-semibold shadow-md gap-2",
                    "data-testid": "btn-enter-kindred",
                    children: [
                      createProfile.isPending ? "Setting up your space..." : "Enter Kindred",
                      !createProfile.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(q4, { size: 16 })
                    ]
                  }
                )
              }
            )
          ]
        },
        "welcome"
      )
    ] }) })
  ] }) });
}
export {
  Onboarding as default
};
