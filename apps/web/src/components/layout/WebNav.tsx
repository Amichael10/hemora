import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import hemoraLogo from "@/assets/brand/Logo.png";

export function WebNav() {
  const [, setLocation] = useLocation();
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between border-x border-border">
        <button onClick={() => setLocation("/")} className="flex items-center gap-2">
          <img src={hemoraLogo} alt="Hemora" className="w-8 h-8" />
          <span className="font-serif text-xl text-secondary">Hemora</span>
        </button>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <button onClick={() => setLocation("/")} className="hover:text-foreground transition">Home</button>
          <button onClick={() => setLocation("/blog")} className="hover:text-foreground transition text-foreground">Blog</button>
          <a href="https://app.hemora.xyz/resources" className="hover:text-foreground transition">Resources</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild><a href="https://app.hemora.xyz">Sign in</a></Button>
          <Button size="sm" asChild><a href="https://app.hemora.xyz">Get started</a></Button>
        </div>
      </div>
    </header>
  );
}
