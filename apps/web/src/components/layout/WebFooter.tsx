import { useLocation } from "wouter";
import hemoraLogo from "@/assets/brand/Logo.png";
import { Linkedin } from "lucide-react";

export function WebFooter() {
  const [, setLocation] = useLocation();
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-14 grid md:grid-cols-4 gap-8 text-sm border-x border-white/10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation("/")}>
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
            <li><button onClick={() => setLocation("/")} className="hover:text-accent">Features</button></li>
            <li><button onClick={() => setLocation("/")} className="hover:text-accent">How it works</button></li>
            <li><a href="https://app.hemora.xyz/download" className="hover:text-accent">Download</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-accent mb-3">Company</div>
          <ul className="space-y-2 text-secondary-foreground/80">
            <li><a href="/about" className="hover:text-accent">About</a></li>
            <li><button onClick={() => setLocation("/blog")} className="hover:text-accent">Blog</button></li>
            <li><a href="/privacy" className="hover:text-accent">Privacy</a></li>
            <li><a href="/terms" className="hover:text-accent">Terms</a></li>
            <li><a href="/brand" className="hover:text-accent">Brand</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 text-xs text-secondary-foreground/60 flex flex-wrap justify-between items-center gap-4">
          <span>© {new Date().getFullYear()} Hemora. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a 
              href="https://linkedin.com/company/hemorax" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors flex items-center gap-1.5"
            >
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
            <span>Made with care.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
