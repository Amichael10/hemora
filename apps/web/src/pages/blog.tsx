import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import hemoraLogo from "@/assets/brand/Logo.png";
import { BookBold as BookIcon, ArrowRightLinear as ArrowRight } from "solar-icon-set";

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
          <a href="/blog" className="text-foreground transition">Blog</a>
          <a href="https://app.hemora.xyz/resources" className="hover:text-foreground transition">Resources</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild><a href="https://app.hemora.xyz/login">Sign in</a></Button>
          <Button size="sm" asChild><a href="https://app.hemora.xyz/signup">Get started</a></Button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-10 text-sm border-x border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={hemoraLogo} alt="Hemora" className="w-7 h-7" />
          <span className="font-serif text-lg">Hemora</span>
        </div>
        <div className="flex flex-wrap gap-5 text-secondary-foreground/80">
          <a href="/" className="hover:text-accent">Home</a>
          <a href="/about" className="hover:text-accent">About</a>
          <a href="/blog" className="hover:text-accent">Blog</a>
          <a href="/privacy" className="hover:text-accent">Privacy</a>
          <a href="/terms" className="hover:text-accent">Terms</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 text-xs text-secondary-foreground/60">
          © {new Date().getFullYear()} Hemora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default function Blog() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground antialiased">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 sm:px-10 border-x border-border">
        <section className="py-20 lg:py-28 max-w-2xl">
          <div className="text-xs uppercase tracking-[0.18em] text-accent font-semibold">Hemora Blog</div>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-secondary leading-tight tracking-[-0.02em]">
            Stories & insights,<br />
            <span className="italic text-muted-foreground">written with care.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Family stories, plain-language care guides, and clear explainers on living
            well with sickle cell. We're putting the first pieces together — check back soon.
          </p>

          <div className="mt-10 rounded-3xl border border-border bg-card p-8 sm:p-10 flex flex-col items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary grid place-items-center">
              <BookIcon size={22} />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-secondary">No posts yet</h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md">
                Our first articles are on the way. In the meantime, explore the Resources
                Library for curated reads on sickle cell care.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full mt-2">
              <a href="https://app.hemora.xyz/resources">Browse Resources <ArrowRight size={16} /></a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
