import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import kindredLogo from "@/assets/brand/Logo.png";
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
  PhoneBold as Phone,
} from "solar-icon-set";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Nav() {
  const [, setLocation] = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/75 border-b border-border/50">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <button onClick={() => setLocation("/")} className="flex items-center gap-2">
          <img src={kindredLogo} alt="Kindred" className="w-8 h-8" />
          <span className="font-serif text-xl tracking-tight text-secondary">Kindred</span>
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

/** A small, decorative phone mockup that mirrors the in-app dashboard hero. */
function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: 280 }}>
      {/* Glow */}
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[3rem] blur-3xl opacity-60"
        style={{ background: "var(--gradient-warm)" }}
      />
      <div className="relative rounded-[2.4rem] p-2 bg-secondary shadow-2xl border border-secondary/40">
        <div className="rounded-[2rem] overflow-hidden bg-background aspect-[9/19] flex flex-col">
          {/* Status bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-medium text-secondary">
            <span>9:41</span>
            <span className="w-16 h-4 rounded-full bg-secondary/90" />
            <span>100%</span>
          </div>
          {/* Screen */}
          <div className="flex-1 px-4 py-3 space-y-3 overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] text-muted-foreground">Good morning</div>
                <div className="font-serif text-base text-secondary leading-tight">Amara</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/30" />
            </div>

            {/* Hero card */}
            <div
              className="rounded-2xl p-3 text-white relative overflow-hidden"
              style={{ background: "var(--gradient-brand)" }}
            >
              <div className="text-[10px] opacity-80">Today's plan</div>
              <div className="font-serif text-lg leading-tight mt-0.5">Feeling steady</div>
              <div className="mt-2 flex gap-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-accent" />
                <div className="flex-1 h-1.5 rounded-full bg-white/30" />
                <div className="flex-1 h-1.5 rounded-full bg-white/30" />
              </div>
              <img src={dashboardEmoji} alt="" className="absolute -right-2 -bottom-2 w-16 h-16 opacity-90" />
            </div>

            {/* Med tile */}
            <div className="rounded-xl bg-card p-2.5 flex items-center gap-2.5 border border-border/60">
              <div className="w-8 h-8 rounded-lg bg-accent/20 grid place-items-center">
                <Pills size={16} color="hsl(var(--accent))" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-secondary">Hydroxyurea</div>
                <div className="text-[9px] text-muted-foreground">8:00 AM · Taken</div>
              </div>
              <Check size={16} color="hsl(var(--accent))" />
            </div>
            <div className="rounded-xl bg-card p-2.5 flex items-center gap-2.5 border border-border/60">
              <div className="w-8 h-8 rounded-lg bg-primary/15 grid place-items-center">
                <HeartPulse size={16} color="hsl(var(--primary))" />
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-secondary">Log a crisis</div>
                <div className="text-[9px] text-muted-foreground">Track what helped</div>
              </div>
              <ArrowRight size={14} color="hsl(var(--muted-foreground))" />
            </div>

            {/* Mini chart */}
            <div className="rounded-xl bg-card p-3 border border-border/60">
              <div className="text-[10px] text-muted-foreground mb-1.5">Pain · last 7 days</div>
              <div className="flex items-end gap-1 h-10">
                {[3, 5, 2, 6, 4, 2, 1].map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
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
    <section className="relative overflow-hidden">
      {/* Soft cream base + subtle gold halo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 0%, hsl(var(--brand-gold) / 0.18), transparent 60%), radial-gradient(50% 60% at 0% 30%, hsl(var(--brand-teal) / 0.10), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <motion.div {...fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full bg-card border border-border/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            For families touched by sickle cell
          </div>
          <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-secondary">
            Care that stays with you,{" "}
            <span className="italic text-primary">between appointments.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Kindred helps you log crises, stay on top of meds, keep records in one place,
            and find sickle-cell-aware care — on your phone, anywhere.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setLocation("/signup")}>
              Open the app <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#download"><Phone size={16} /> Download for mobile</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><Shield size={14} color="hsl(var(--accent))" /> Private by default</div>
            <div className="flex items-center gap-1.5"><Check size={14} color="hsl(var(--accent))" /> Works offline</div>
            <div className="flex items-center gap-1.5"><Star size={14} color="hsl(var(--accent))" /> Family-friendly</div>
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
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
    <section id="features" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">What's inside</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight">
            Everything you need.<br />
            <span className="italic text-muted-foreground">Nothing you don't.</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            const tone =
              f.tone === "primary"
                ? "bg-primary/10 text-primary"
                : f.tone === "accent"
                ? "bg-accent/20 text-accent-foreground"
                : "bg-secondary/10 text-secondary";
            return (
              <motion.div
                key={f.title}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className="group rounded-2xl bg-card border border-border/60 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl grid place-items-center ${tone}`}>
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-serif text-xl text-secondary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Set up your profile", body: "Tell us who you're caring for — yourself, a child, or a loved one." },
    { n: "02", title: "Track day to day", body: "Log meds, crises, and care visits in seconds. Most entries take under 30." },
    { n: "03", title: "Share when it matters", body: "Export a clean summary for appointments — or carry it on your phone for the ER." },
  ];
  return (
    <section id="how" className="py-20 lg:py-28 bg-secondary text-secondary-foreground relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(40% 60% at 100% 0%, hsl(var(--brand-gold) / 0.4), transparent 60%), radial-gradient(40% 50% at 0% 100%, hsl(var(--brand-red) / 0.2), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">How it works</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
            A calmer way to manage{" "}
            <span className="italic">a complicated condition.</span>
          </h2>
        </motion.div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 p-6 bg-white/[0.04] backdrop-blur-sm"
            >
              <div className="font-serif text-3xl text-accent">{s.n}</div>
              <h3 className="mt-3 font-serif text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-secondary-foreground/70 leading-relaxed">{s.body}</p>
            </motion.div>
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
    <section id="stories" className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Stories</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-secondary leading-tight">
            Built with families,<br />
            <span className="italic text-muted-foreground">for families.</span>
          </h2>
        </motion.div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {quotes.map((t, i) => (
            <motion.figure
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.06 }}
              className="rounded-2xl bg-card border border-border/60 p-6 flex flex-col"
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
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Download() {
  const [, setLocation] = useLocation();
  return (
    <section id="download" className="py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-3xl p-10 sm:p-14 text-center"
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
              Take Kindred with you.
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
        </motion.div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Is Kindred free to use?", a: "Yes — the core experience (crisis logging, meds, records, directory) is free. Premium care features are coming later." },
    { q: "Is my health data private?", a: "Your data is yours. It's stored securely and never sold. You decide what to share, with whom, and when." },
    { q: "Does it work offline?", a: "Yes. Kindred is a Progressive Web App, so you can log entries without signal and they'll sync when you reconnect." },
    { q: "Do you have iOS and Android apps?", a: "Native apps are rolling out. In the meantime, you can install Kindred to your home screen on any modern phone." },
    { q: "Can caregivers use it for someone else?", a: "Absolutely. During setup you can choose to track for yourself, a child, or another loved one." },
  ];
  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted/40">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <motion.div {...fadeUp} className="text-center">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">FAQ</div>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-secondary">
            Still wondering?
          </h2>
        </motion.div>
        <div className="mt-10 divide-y divide-border/60 rounded-2xl bg-card border border-border/60">
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
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 grid md:grid-cols-4 gap-8 text-sm">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={kindredLogo} alt="Kindred" className="w-9 h-9" />
            <span className="font-serif text-2xl">Kindred</span>
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
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5 text-xs text-secondary-foreground/60 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Kindred. All rights reserved.</span>
          <span>Made with care.</span>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
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