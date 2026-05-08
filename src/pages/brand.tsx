import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import hemoraLogo from "@/assets/brand/Logo.png";
import { DownloadMinimalisticLinear as DownloadIcon } from "solar-icon-set";

type FileLink = { label: string; href: string };
type LogoVariant = {
  name: string;
  description: string;
  bg: string;
  preview: string;
  files: FileLink[];
};

const LOGO_VARIANTS: LogoVariant[] = [
  {
    name: "Colored",
    description: "Default mark for cream and warm-light backgrounds.",
    bg: "bg-[#f4ead8]",
    preview: "/brand/logos/hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/hemora-icon.svg" },
      { label: "Icon PNG", href: "/brand/logos/hemora-icon.png" },
      { label: "Wordmark SVG", href: "/brand/logos/hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/hemora-wordmark.png" },
    ],
  },
  {
    name: "Black",
    description: "For light, neutral, or photographic backgrounds.",
    bg: "bg-white",
    preview: "/brand/logos/black-hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/black-hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/black-hemora-icon.svg" },
      { label: "Wordmark SVG", href: "/brand/logos/black-hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/black-hemora-wordmark.png" },
    ],
  },
  {
    name: "White",
    description: "For dark, deep teal, or oxblood backgrounds.",
    bg: "bg-[#193b3f]",
    preview: "/brand/logos/white-hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/white-hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/white-hemora-icon.svg" },
      { label: "Icon PNG", href: "/brand/logos/white-hemora-icon.png" },
      { label: "Wordmark SVG", href: "/brand/logos/white-hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/white-hemora-wordmark.png" },
    ],
  },
  {
    name: "Green",
    description: "Single-color mark for tonal or partner contexts.",
    bg: "bg-[#f4ead8]",
    preview: "/brand/logos/green-hemora-logo.svg",
    files: [
      { label: "Logo SVG", href: "/brand/logos/green-hemora-logo.svg" },
      { label: "Icon SVG", href: "/brand/logos/green-hemora-icon.svg" },
      { label: "Icon PNG", href: "/brand/logos/green-hemora-icon.png" },
      { label: "Wordmark SVG", href: "/brand/logos/green-hemora-wordmark.svg" },
      { label: "Wordmark PNG", href: "/brand/logos/green-hemora-wordmark.png" },
    ],
  },
];

const COLORS = [
  { name: "Cream", hex: "#F4EAD8", role: "Canvas / background", className: "bg-[#F4EAD8] text-[#193b3f]" },
  { name: "Cream Card", hex: "#FBF5E7", role: "Surfaces / cards", className: "bg-[#FBF5E7] text-[#193b3f]" },
  { name: "Deep Teal", hex: "#193B3F", role: "Headings / dark surfaces", className: "bg-[#193B3F] text-white" },
  { name: "Teal Bright", hex: "#34696E", role: "Secondary surfaces", className: "bg-[#34696E] text-white" },
  { name: "Sickle Red", hex: "#A8324A", role: "Primary CTA / urgent", className: "bg-[#A8324A] text-white" },
  { name: "Red Deep", hex: "#7E2438", role: "Hover / pressed states", className: "bg-[#7E2438] text-white" },
  { name: "Gold", hex: "#C9A35A", role: "Accent / highlights", className: "bg-[#C9A35A] text-[#193b3f]" },
  { name: "Gold Soft", hex: "#F2DEB3", role: "Subtle accent surfaces", className: "bg-[#F2DEB3] text-[#193b3f]" },
];

const USAGE = [
  "Essentials Pouch.png",
  "Hoodie.png",
  "Mug.png",
  "Pill counter.png",
  "Scarf.png",
  "Tote bag.png",
  "Water Bottle.png",
  "Weekly Pill Organizer.png",
].map((f) => ({ name: f.replace(/\.png$/, ""), href: `/brand/usage/${encodeURIComponent(f)}` }));

const SOCIALS = Array.from({ length: 9 }, (_, i) => ({
  name: `Socials ${i + 1}`,
  href: `/brand/socials/${encodeURIComponent(`Socials ${i + 1}.png`)}`,
}));

function Nav() {
  const [, setLocation] = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between border-x border-border">
        <button onClick={() => setLocation("/")} className="flex items-center gap-2">
          <img src={hemoraLogo} alt="Hemora" className="w-8 h-8" />
          <span className="font-serif text-xl text-secondary">Hemora</span>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground transition">Home</a>
          <a href="/about" className="hover:text-foreground transition">About</a>
          <a href="/resources" className="hover:text-foreground transition">Resources</a>
          <span className="text-foreground font-medium">Brand</span>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/login")}>Sign in</Button>
          <Button size="sm" onClick={() => setLocation("/signup")}>Get started</Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-10 text-xs text-secondary-foreground/60 flex flex-wrap justify-between gap-2">
        <span>© {new Date().getFullYear()} Hemora. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="/about" className="hover:text-accent">About</a>
          <a href="/privacy" className="hover:text-accent">Privacy</a>
          <a href="/terms" className="hover:text-accent">Terms</a>
          <a href="/brand" className="hover:text-accent">Brand</a>
        </div>
      </div>
    </footer>
  );
}

function LogoCard({ variant }: { variant: LogoVariant }) {
  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col">
      <div className={`${variant.bg} flex items-center justify-center p-10 h-56`}>
        <img src={variant.preview} alt={`${variant.name} Hemora logo`} className="max-h-32 w-auto" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-xl font-semibold text-foreground tracking-[-0.3px]">{variant.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{variant.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {variant.files.map((f) => (
            <a key={f.href} href={f.href} download>
              <Button size="sm" variant="outline" className="rounded-full text-xs h-8">
                <DownloadIcon size={12} />
                {f.label}
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorSwatch({ name, hex, role, className }: { name: string; hex: string; role: string; className: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card">
      <div className={`${className} h-28 flex items-end p-4 font-serif text-lg`}>{name}</div>
      <div className="p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-mono text-foreground">{hex}</span>
          <button
            onClick={() => navigator.clipboard?.writeText(hex)}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{role}</p>
      </div>
    </div>
  );
}

export default function Brand() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20 border-x border-border">
          <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary/70">Brand</p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-1px] text-secondary max-w-3xl">
            The Hemora visual identity.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Logos, colors, and typography for press, partners, and community use.
            Please use these assets thoughtfully and don't recolor or distort the marks.
          </p>
        </div>
      </section>

      {/* Logos */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary/70">Logos</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2">
                Download the marks
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              SVG for web and print. PNG for raster contexts. Choose the variant with the strongest contrast against your background.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {LOGO_VARIANTS.map((v) => (
              <LogoCard key={v.name} variant={v} />
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary/70">Color</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2">
                Protective Crescent palette
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Cream as canvas. Deep teal for trust. Sickle red reserved for what matters most. Gold lights the way.
            </p>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {COLORS.map((c) => (
              <ColorSwatch key={c.hex} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary/70">Typography</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2">
                Two voices, one tone
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Fraunces speaks with warmth in headings. Inter holds the body steady. Together they feel like a kind hand on your shoulder.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-card border border-border p-8">
              <p className="text-xs uppercase tracking-[2px] text-accent">Display</p>
              <p className="font-serif text-2xl text-muted-foreground mt-2">Fraunces — serif</p>
              <p className="font-serif text-6xl font-semibold tracking-[-1px] text-secondary mt-4 leading-[0.95]">
                Care that stays with you.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div>Weights · 400 · 500 · 600 · 700</div>
                <div>Use for · Headings, hero, quotes</div>
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border p-8">
              <p className="text-xs uppercase tracking-[2px] text-accent">Body</p>
              <p className="font-sans text-2xl text-muted-foreground mt-2">Inter — sans</p>
              <p className="font-sans text-base text-foreground mt-4 leading-relaxed">
                Hemora is a gentle companion for families managing sickle cell — track medications,
                log crisis moments, save records, and keep care close. Inter keeps the day-to-day
                clear, calm, and easy on tired eyes.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div>Weights · 400 · 500 · 600 · 700</div>
                <div>Use for · Body, UI, labels</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-card border border-border p-8 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[2px] text-muted-foreground">H1 · Fraunces 600</p>
              <p className="font-serif text-5xl font-semibold tracking-[-0.5px] text-secondary">A gentle place for hard days.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[2px] text-muted-foreground">H2 · Fraunces 600</p>
              <p className="font-serif text-3xl font-semibold tracking-[-0.3px] text-secondary">Track meds. Log crises. Stay close.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[2px] text-muted-foreground">H3 · Fraunces 600</p>
              <p className="font-serif text-xl font-semibold text-secondary">Built with families, for families.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[2px] text-muted-foreground">Body · Inter 400</p>
              <p className="text-base text-foreground">For every family touched by sickle cell — Hemora is here.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[2px] text-muted-foreground">Caption · Inter 500</p>
              <p className="text-xs text-muted-foreground uppercase tracking-[2px]">Eyebrow · uppercase · 2px tracking</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand in use */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary/70">In use</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2">
                Brand in the world
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">Examples of how Hemora shows up beyond the screen. Preview only.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {USAGE.map((u) => (
              <div key={u.href} className="rounded-2xl border border-border bg-card overflow-hidden aspect-square">
                <img src={u.href} alt={u.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Socials */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-16 border-x border-border">
          <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary/70">Social</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-[-0.5px] text-secondary mt-2">
                Social templates
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">A peek at how Hemora speaks across social. Preview only.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {SOCIALS.map((s) => (
              <div key={s.href} className="rounded-2xl border border-border bg-card overflow-hidden aspect-square">
                <img src={s.href} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
