import { useMemo, useState } from "react";
import { Link } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Input } from "@/components/ui/input";
import { RESOURCES, type ResourceCategory } from "@/lib/resources";
import {
  MagniferLinear as SearchIcon,
  BookLinear as BookIcon,
  HeartLinear as HeartIcon,
  PillLinear as PillIcon,
  PlayCircleLinear as PlayIcon,
  AltArrowRightLinear as ArrowRight,
} from "solar-icon-set";
import { cn } from "@/lib/utils";

const FILTERS: Array<"All" | ResourceCategory> = ["All", "Learn", "Lifestyle", "Treatment"];

function kindIcon(kind: string) {
  if (kind === "Video") return <PlayIcon size={18} />;
  if (kind === "Guide") return <BookIcon size={18} />;
  return <BookIcon size={18} />;
}

function categoryTone(c: ResourceCategory) {
  if (c === "Learn") return "bg-primary/10 text-primary";
  if (c === "Lifestyle") return "bg-accent/20 text-accent-foreground";
  return "bg-secondary/10 text-secondary";
}

export default function Resources() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const term = q.trim().toLowerCase();
    return RESOURCES.filter((r) => filter === "All" || r.category === filter).filter(
      (r) => !term || r.title.toLowerCase().includes(term) || r.summary.toLowerCase().includes(term)
    );
  }, [filter, q]);

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title="Resources Library" back="/settings" />
      <div className="px-5 pb-12 space-y-4">
        <div className="relative">
          <SearchIcon size={16} color="hsl(var(--muted-foreground))" className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <Input
            placeholder="Search resources"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="h-11 pl-9 rounded-full bg-muted/40 border-transparent focus-visible:bg-card"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto -mx-5 px-5 pb-1 no-scrollbar">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground/70 border-border/60 hover:bg-muted/40"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="space-y-2.5">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">No resources match your search.</p>
          ) : (
            items.map((r) => (
              <Link key={r.id} href={`/resources/${r.id}`}>
                <div className="group flex items-center gap-3 rounded-2xl bg-card border border-border/60 p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className={cn("w-11 h-11 rounded-xl shrink-0 grid place-items-center", categoryTone(r.category))}>
                    {kindIcon(r.kind)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{r.title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {r.kind} · {r.readMinutes} min {r.kind === "Video" ? "" : "read"}
                    </p>
                  </div>
                  <ArrowRight size={14} color="rgba(115,115,115,0.5)" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </MobileAppShell>
  );
}