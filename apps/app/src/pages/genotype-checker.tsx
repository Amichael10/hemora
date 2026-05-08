import { useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { GENOTYPES, Genotype, offspringOutcomes } from "@/lib/genotype";
import { cn } from "@/lib/utils";

function GenotypePicker({ label, value, onChange }: { label: string; value: Genotype | null; onChange: (g: Genotype) => void }) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4">
      <p className="eyebrow mb-3">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {GENOTYPES.map((g) => {
          const active = value === g;
          return (
            <button
              key={g}
              type="button"
              onClick={() => onChange(g)}
              className={cn(
                "py-3 rounded-xl font-serif font-semibold text-lg border transition-colors",
                active
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/40"
              )}
            >
              {g}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const TONE: Record<string, string> = {
  ok: "bg-emerald-50 text-emerald-900 border-emerald-200",
  warn: "bg-amber-50 text-amber-900 border-amber-200",
  bad: "bg-rose-50 text-rose-900 border-rose-200",
};

export default function GenotypeChecker() {
  const [p1, setP1] = useState<Genotype | null>(null);
  const [p2, setP2] = useState<Genotype | null>(null);
  const outcomes = p1 && p2 ? offspringOutcomes(p1, p2) : null;

  return (
    <MobileAppShell>
      <SubPageHeader title="Genotype risk checker" back="/dashboard" />
      <div className="px-5 pb-32 space-y-5">
        <p className="text-sm text-muted-foreground">
          Pick both partners' genotypes to see possible outcomes for each pregnancy.
        </p>

        <GenotypePicker label="You / Partner 1" value={p1} onChange={setP1} />
        <GenotypePicker label="Partner 2" value={p2} onChange={setP2} />

        {outcomes && (
          <div className="bg-card rounded-2xl border border-border/60 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Possible outcomes</p>
              <span className="text-xs text-muted-foreground">{p1} + {p2}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {outcomes.map((o) => (
                <div key={o.genotype} className={cn("rounded-xl border p-3 text-center", TONE[o.tone])}>
                  <div className="text-2xl font-serif font-bold">{o.percent}%</div>
                  <div className="font-semibold text-sm mt-0.5">{o.genotype}</div>
                  <div className="text-[11px] mt-1 leading-tight opacity-80">{o.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Risk is the same for each pregnancy. Results are guidance, not a guarantee — speak with a counsellor for personal advice.
            </p>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}