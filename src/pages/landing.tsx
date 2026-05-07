import { useLocation } from "wouter";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import hemoraLogo from "@/assets/brand/Logo.png";
import hemoraWordmark from "@/assets/brand/Wordmark.png";
import heroFamily from "@/assets/hero/family-hero.webp";
import dashboardEmoji from "@/assets/images/emoji-mild.png";
import {
  HeartPulse2Bold as HeartPulse,
  Pills2Bold as Pills,
  NotebookBold as Notebook,
  UsersGroupRoundedBold as Users,
  ShieldCheckBold as Shield,
  BellBold as Bell,
  ChartSquareBold as Chart,
  ArrowRightLinear as ArrowRight,
  CheckCircleBold as Check,
  StarBold as Star,
} from "solar-icon-set";
import { FaApple, FaGooglePlay } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

/**
 * Section wrapper that draws continuous vertical guide rails (Dub-style),
 * a faint dotted background, and "+" markers at the four corners where the
 * section's top/bottom horizontal rules meet the vertical rails.
 */
function Section({
  id,
  className = "",
  innerClassName = "",
  dotted = true,
  topRule = true,
  bottomRule = true,
  children,
}: {
  id?: string;
  className?: string;
  innerClassName?: string;
  dotted?: boolean;
  topRule?: boolean;
  bottomRule?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`relative ${className}`}>
      {/* Dotted grid background */}
      {dotted && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(hsl(var(--foreground) / 0.18) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 85%)",
          }}
        />
      )}
      {/* Continuous frame: vertical rails + top/bottom rules + corner "+" */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mx-auto h-full max-w-7xl relative">
          {/* vertical rails */}
          <div className="absolute inset-y-0 left-0 w-px bg-border" />
          <div className="absolute inset-y-0 right-0 w-px bg-border" />
          {/* horizontal rules */}
          {topRule && (
            <div className="absolute top-0 inset-x-0 h-px bg-border" />
          )}
          {bottomRule && (
            <div className="absolute bottom-0 inset-x-0 h-px bg-border" />
          )}
          {/* corner plus markers */}
          {topRule && <Plus className="absolute -top-2 -left-2" />}
          {topRule && <Plus className="absolute -top-2 -right-2" />}
          {bottomRule && <Plus className="absolute -bottom-2 -left-2" />}
          {bottomRule && <Plus className="absolute -bottom-2 -right-2" />}
        </div>
      </div>
      <div className={`relative mx-auto max-w-7xl ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

function Plus({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block w-4 h-4 text-border ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(currentColor,currentColor),linear-gradient(currentColor,currentColor)",
        backgroundSize: "100% 1px, 1px 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "hsl(var(--border))",
      }}
    />
  );
}

function Nav() {
  const [, setLocation] = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between border-x border-border">
        <button onClick={() => setLocation("/")} className="flex items-center gap-2">
          <img src={hemoraLogo} alt="Hemora" className="w-8 h-8" />
          <img src={hemoraWordmark} alt="Hemora" className="h-6 w-auto" />
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#how" className="hover:text-foreground transition">How it works</a>
          <a href="#stories" className="hover:text-foreground transition">Stories</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/login")}>Sign in</Button>
          <Button size="sm" onClick={() => setLocation("/signup")}>Get started</Button>
        </div>
      </div>
    </header>
  );
}

/** A desktop browser-style mockup of the in-app dashboard (Dub-style hero visual). */
function DesktopMockup() {
  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div
        aria-hidden
        className="absolute -inset-12 rounded-[3rem] blur-3xl opacity-50"
        style={{ background: "var(--gradient-warm)" }}
      />
      <div className="relative rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-muted/40">
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="w-2.5 h-2.5 rounded-full bg-secondary/40" />
          <div className="flex-1 mx-4 h-6 rounded-md bg-background border border-border flex items-center justify-center text-[10px] text-muted-foreground">
            hemora.xyz/dashboard
          </div>
        </div>
        {/* App body */}
        <div className="grid grid-cols-[180px_1fr] min-h-[420px]">
          {/* Sidebar */}
          <aside className="border-r border-border bg-secondary/[0.04] p-4 space-y-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={hemoraLogo} alt="" className="w-6 h-6" />
              <span className="font-serif text-sm text-secondary">Hemora</span>
            </div>
            {[
              { Icon: HeartPulse, label: "Dashboard", active: true },
              { Icon: Pills, label: "Medications" },
              { Icon: Notebook, label: "Records" },
              { Icon: Users, label: "Directory" },
              { Icon: Bell, label: "Reminders" },
              { Icon: Chart, label: "Insights" },
            ].map(({ Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                <Icon size={13} />
                {label}
              </div>
            ))}
          </aside>
          {/* Main */}
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground">Good morning</div>
                <div className="font-serif text-lg text-secondary leading-tight">Amara</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/30" />
            </div>
            <div
              className="rounded-xl p-4 text-white relative overflow-hidden"
              style={{ background: "var(--gradient-brand)" }}
            >
              <div className="text-[10px] opacity-80">Today's plan</div>
              <div className="font-serif text-xl leading-tight mt-0.5">Feeling steady</div>
              <div className="mt-3 flex gap-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-accent" />
                <div className="flex-1 h-1.5 rounded-full bg-white/30" />
                <div className="flex-1 h-1.5 rounded-full bg-white/30" />
              </div>
              <img src={dashboardEmoji} alt="" className="absolute -right-2 -bottom-2 w-20 h-20 opacity-90" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-background p-3 flex items-center gap-2.5 border border-border">
                <div className="w-8 h-8 rounded-lg bg-accent/20 grid place-items-center">
                  <Pills size={16} color="hsl(var(--accent))" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-secondary">Hydroxyurea</div>
                  <div className="text-[9px] text-muted-foreground">8:00 AM · Taken</div>
                </div>
                <Check size={16} color="hsl(var(--accent))" />
              </div>
              <div className="rounded-xl bg-background p-3 flex items-center gap-2.5 border border-border">
                <div className="w-8 h-8 rounded-lg bg-primary/15 grid place-items-center">
                  <HeartPulse size={16} color="hsl(var(--primary))" />
                </div>
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-secondary">Log a crisis</div>
                  <div className="text-[9px] text-muted-foreground">Track what helped</div>
                </div>
                <ArrowRight size={14} color="hsl(var(--muted-foreground))" />
              </div>
            </div>
            <div className="rounded-xl bg-background p-4 border border-border">
              <div className="text-[10px] text-muted-foreground mb-2">Pain · last 7 days</div>
              <div className="flex items-end gap-1.5 h-16">
                {[3, 5, 2, 6, 4, 2, 1].map((v, i) => (
                  <div
                    key={i}
                    data-anim="bar"
                    className="flex-1 rounded-md"
                    style={{ height: `${v * 14}%`, background: "hsl(var(--accent))" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const [, setLocation] = useLocation();
  return (
    <Section className="overflow-hidden" topRule={false}>
      {/* Full-bleed hero image */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <img
          src={heroFamily}
          alt=""
          width={1600}
          height={900}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-right"
        />
        {/* Left-side fade so text stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background) / 0.92) 35%, hsl(var(--background) / 0.55) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: "hsl(var(--background) / 0.7)" }}
        />
      </div>
      <div className="relative z-10 px-6 sm:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          <div className="text-center lg:text-left">
            <div data-anim="hero-badge" className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-3 py-1 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              For families touched by sickle cell
            </div>
            <h1 data-anim="hero-title" className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-secondary">
              <span className="inline-block">Care that stays with you,</span>{" "}
              <span className="inline-block italic text-primary">between appointments.</span>
            </h1>
            <p data-anim="hero-sub" className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hemora helps you log crises, stay on top of meds, keep records in one place,
              and find sickle-cell-aware care — on your phone, anywhere.
            </p>

            <div data-anim="hero-cta" className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
              <Button size="lg" onClick={() => setLocation("/signup")}>
                Open the app <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#download">Download for mobile</a>
              </Button>
            </div>

            <div data-anim="hero-trust" className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Shield size={14} color="hsl(var(--accent))" /> Private by default</div>
              <div className="flex items-center gap-1.5"><Check size={14} color="hsl(var(--accent))" /> Works offline</div>
              <div className="flex items-center gap-1.5"><Star size={14} color="hsl(var(--accent))" /> Family-friendly</div>
            </div>
          </div>

          {/* Right column intentionally empty — image is full-bleed background */}
          <div aria-hidden />
        </div>
      </div>
    </Section>
  );
}

function ProductPreview() {
  return (
    <Section dotted={false}>
      <div className="px-6 sm:px-10 py-20 lg:py-28">
        <div data-reveal className="max-w-2xl mx-auto text-center mb-12">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">A look inside</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-secondary leading-tight">
            Your day, gently organized.
          </h2>
        </div>
        <div data-anim="hero-mockup">
          <DesktopMockup />
        </div>
      </div>
    </Section>
  );
}

function Context() {
  const stats = [
    { value: 75, prefix: "", suffix: "%", n: "75%", label: "of all sickle cell births globally happen in sub-Saharan Africa.", source: "WHO" },
    { value: 300, prefix: "", suffix: "K+", n: "300K+", label: "babies are born with sickle cell disease in Africa each year.", source: "WHO" },
    { value: 0, prefix: "", suffix: "", n: "1 in 4", label: "Nigerians carries the sickle cell trait — the highest burden worldwide.", source: "WHO Africa" },
  ];
  return (
    <Section className="bg-muted/40 overflow-hidden">
      <div className="px-6 sm:px-10 py-20 lg:py-24">
        <div data-reveal className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Why Hemora exists</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-secondary leading-tight">
            Africa carries the heaviest weight — <span className="italic text-muted-foreground">and the strongest community.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Hemora is built for families across Lagos, Accra, Nairobi, Kampala — and everywhere the diaspora calls home.
          </p>
        </div>
        <div data-stagger className="mt-12 grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-y sm:border border-border bg-card">
          {stats.map((s, i) => (
            <div
              key={s.n}
              data-stagger-item
              className="p-8 text-center"
            >
              {s.value > 0 ? (
                <div
                  className="font-serif text-4xl sm:text-5xl text-primary tracking-tight"
                  data-counter={s.value}
                  data-counter-suffix={s.suffix}
                  data-counter-prefix={s.prefix}
                >
                  0{s.suffix}
                </div>
              ) : (
                <div className="font-serif text-4xl sm:text-5xl text-primary tracking-tight">{s.n}</div>
              )}
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.label}</p>
              <div className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground/70">Source: {s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

const features = [
  {
    icon: HeartPulse,
    title: "Crisis logging",
    body: "Capture pain, location, triggers, and what helped. Build a private history you can share with your care team.",
    tone: "primary" as const,
  },
  {
    icon: Pills,
    title: "Medication tracking",
    body: "Schedules, reminders, and a clean adherence chart for hydroxyurea, folic acid, and the rest of your routine.",
    tone: "accent" as const,
  },
  {
    icon: Notebook,
    title: "Care records",
    body: "Labs, hospital visits, transfusions — kept together so you don't dig through paper at the worst moments.",
    tone: "secondary" as const,
  },
  {
    icon: Users,
    title: "Sickle-cell directory",
    body: "Find clinics, specialists, and community organizations that actually understand the disease.",
    tone: "accent" as const,
  },
  {
    icon: Bell,
    title: "Gentle reminders",
    body: "Nudges that respect your day. Snooze, reschedule, or mark taken in a single tap.",
    tone: "primary" as const,
  },
  {
    icon: Chart,
    title: "Patterns over time",
    body: "See triggers, frequency, and what's improving — quietly, without judgment.",
    tone: "secondary" as const,
  },
];

function Features() {
  return (
    <Section id="features" dotted={false}>
      <div className="px-6 sm:px-10 py-20 lg:py-28">
        <div data-reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">What's inside</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight">
            Everything you need.<br />
            <span className="italic text-muted-foreground">Nothing you don't.</span>
          </h2>
        </div>

        <div data-stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 border-y border-l border-border bg-card">
          {features.map((f, i) => {
            const Icon = f.icon;
            const tone =
              f.tone === "primary"
                ? "bg-primary/10 text-primary"
                : f.tone === "accent"
                ? "bg-accent/20 text-accent-foreground"
                : "bg-secondary/10 text-secondary";
            return (
              <div
                key={f.title}
                data-stagger-item
                className="group p-7 border-r border-b border-border hover:bg-muted/40 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl grid place-items-center ${tone}`}>
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-serif text-xl text-secondary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Set up your profile", body: "Tell us who you're caring for — yourself, a child, or a loved one." },
    { n: "02", title: "Track day to day", body: "Log meds, crises, and care visits in seconds. Most entries take under 30." },
    { n: "03", title: "Share when it matters", body: "Export a clean summary for appointments — or carry it on your phone for the ER." },
  ];
  return (
    <section id="how" className="relative bg-secondary text-secondary-foreground overflow-hidden border-y border-secondary/40">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(40% 60% at 100% 0%, hsl(var(--brand-gold) / 0.4), transparent 60%), radial-gradient(40% 50% at 0% 100%, hsl(var(--brand-red) / 0.2), transparent 60%)",
        }}
      />
      {/* Frame on dark */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="mx-auto h-full max-w-7xl relative">
          <div className="absolute inset-y-0 left-0 w-px bg-white/10" />
          <div className="absolute inset-y-0 right-0 w-px bg-white/10" />
        </div>
      </div>
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 py-20 lg:py-28">
        <div data-reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">How it works</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
            A calmer way to manage{" "}
            <span className="italic">a complicated condition.</span>
          </h2>
        </div>
        <div data-stagger className="mt-12 grid md:grid-cols-3 border-y md:border border-white/10">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-stagger-item
              className="p-8 border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 bg-white/[0.03]"
            >
              <div className="font-serif text-3xl text-accent">{s.n}</div>
              <h3 className="mt-3 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-secondary-foreground/70 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const quotes = [
    {
      q: "I used to forget what triggered the last crisis. Now my doctor sees a real pattern.",
      name: "Amara O.",
      role: "Living with SCD",
    },
    {
      q: "The reminders are gentle — not nagging. My son actually takes his hydroxyurea on time.",
      name: "Grace M.",
      role: "Mother & caregiver",
    },
    {
      q: "Having all his records on my phone made the ER visit infinitely less terrifying.",
      name: "Daniel K.",
      role: "Caregiver",
    },
  ];
  return (
    <Section id="stories">
      <div className="px-6 sm:px-10 py-20 lg:py-28">
        <div data-reveal className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Stories</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight">
            Built with families,<br />
            <span className="italic text-muted-foreground">for families.</span>
          </h2>
        </div>
        <div data-stagger className="mt-12 grid md:grid-cols-3 border-y md:border border-border bg-card">
          {quotes.map((t, i) => (
            <figure
              key={i}
              data-stagger-item
              className="p-7 flex flex-col border-b md:border-b-0 md:border-r last:border-r-0 border-border"
            >
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} />)}
              </div>
              <blockquote className="mt-4 font-serif text-lg leading-snug text-secondary">
                "{t.q}"
              </blockquote>
              <figcaption className="mt-auto pt-5 text-sm">
                <div className="font-semibold text-secondary">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Download() {
  const [, setLocation] = useLocation();
  return (
    <Section id="download" dotted={false}>
      <div className="px-6 sm:px-10 py-20 lg:py-28">
        <div
          data-reveal
          className="relative overflow-hidden p-10 sm:p-16 text-center border border-border"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(40% 80% at 50% 0%, hsl(var(--brand-gold) / 0.4), transparent 70%)",
            }}
          />
          <div className="relative">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
              Take Hemora with you.
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Install it as a PWA on any phone, or grab the native app. Same care, anywhere.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="glass" onClick={() => setLocation("/signup")}>
                <FaApple size={18} /> App Store
              </Button>
              <Button size="lg" variant="glass" onClick={() => setLocation("/signup")}>
                <FaGooglePlay size={16} /> Google Play
              </Button>
              <Button size="lg" className="bg-accent text-secondary hover:bg-accent/90" onClick={() => setLocation("/signup")}>
                Install web app <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const items = [
    { q: "Is Hemora free to use?", a: "Yes — the core experience (crisis logging, meds, records, directory) is free. Premium care features are coming later." },
    { q: "Is my health data private?", a: "Your data is yours. It's stored securely and never sold. You decide what to share, with whom, and when." },
    { q: "Does it work offline?", a: "Yes. Hemora is a Progressive Web App, so you can log entries without signal and they'll sync when you reconnect." },
    { q: "Do you have iOS and Android apps?", a: "Native apps are rolling out. In the meantime, you can install Hemora to your home screen on any modern phone." },
    { q: "Can caregivers use it for someone else?", a: "Absolutely. During setup you can choose to track for yourself, a child, or another loved one." },
  ];
  return (
    <Section id="faq" className="bg-muted/40">
      <div className="px-6 sm:px-10 py-20 lg:py-28 max-w-3xl mx-auto">
        <div data-reveal className="text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">FAQ</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-secondary">
            Still wondering?
          </h2>
        </div>
        <div className="mt-10 divide-y divide-border bg-card border border-border">
          {items.map((it) => (
            <details key={it.q} className="group p-5 sm:p-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-medium text-secondary pr-4">{it.q}</span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-14 grid md:grid-cols-4 gap-8 text-sm border-x border-white/10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={hemoraLogo} alt="Hemora" className="w-9 h-9" />
            <span className="font-serif text-2xl">Hemora</span>
          </div>
          <p className="mt-3 text-secondary-foreground/70 max-w-sm leading-relaxed">
            Care that stays with you. For every family touched by sickle cell.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-accent mb-3">Product</div>
          <ul className="space-y-2 text-secondary-foreground/80">
            <li><a href="#features" className="hover:text-accent">Features</a></li>
            <li><a href="#how" className="hover:text-accent">How it works</a></li>
            <li><a href="#download" className="hover:text-accent">Download</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-accent mb-3">Company</div>
          <ul className="space-y-2 text-secondary-foreground/80">
            <li><a href="/about" className="hover:text-accent">About</a></li>
            <li><a href="/privacy" className="hover:text-accent">Privacy</a></li>
            <li><a href="/terms" className="hover:text-accent">Terms</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 text-xs text-secondary-foreground/60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Hemora. All rights reserved.</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const root = rootRef.current;
    const ctx = gsap.context(() => {
      // Hero entrance
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from("[data-anim='hero-badge']", { y: 14, opacity: 0, duration: 0.6 })
        .from("[data-anim='hero-title'] > *", { y: 28, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.3")
        .from("[data-anim='hero-sub']", { y: 18, opacity: 0, duration: 0.7 }, "-=0.5")
        .from("[data-anim='hero-cta'] > *", { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
        .from("[data-anim='hero-trust'] > *", { y: 10, opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.35")
        .from("[data-anim='hero-mockup']", { y: 60, opacity: 0, scale: 0.96, duration: 1.1, ease: "power4.out" }, "-=0.4");

      // Subtle floating glow on hero mockup
      gsap.to("[data-anim='hero-mockup']", {
        y: -10,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Generic scroll-triggered reveals
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Stagger groups
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-stagger-item]");
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: group, start: "top 80%" },
        });
      });

      // Animated stat counters
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.counter || "0");
        const suffix = el.dataset.counterSuffix || "";
        const prefix = el.dataset.counterPrefix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            const n = target >= 100 ? Math.round(obj.v) : obj.v.toFixed(0);
            el.textContent = `${prefix}${n}${suffix}`;
          },
        });
      });

      // Pain chart bars grow
      gsap.from("[data-anim='bar']", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: "[data-anim='bar']", start: "top 90%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-[100dvh] w-full bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <ProductPreview />
        <Context />
        <Features />
        <HowItWorks />
        <Stories />
        <Download />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}