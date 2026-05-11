import { useState } from "react";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { GENOTYPES, Genotype, offspringOutcomes } from "@/lib/genotype";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { exportGenotypeReportToPdf } from "@/lib/profilePdf";
import { useToast } from "@/hooks/use-toast";
import { PenNewSquareLinear as Pencil } from "solar-icon-set";

function GenotypePicker({
  label,
  value,
  onChange,
  onLabelChange,
}: {
  label: string;
  value: Genotype | null;
  onChange: (g: Genotype) => void;
  onLabelChange: (v: string) => void;
}) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 p-4">
      <label className="flex items-center gap-2 mb-3 cursor-text group">
        <input
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          className="eyebrow bg-transparent outline-none border-b border-transparent focus:border-primary/40 flex-1 min-w-0"
          aria-label="Edit name"
        />
        <Pencil size={12} className="text-muted-foreground opacity-60 group-hover:opacity-100" />
      </label>
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
  const [name1, setName1] = useState("You / Partner 1");
  const [name2, setName2] = useState("Partner 2");
  const [exporting, setExporting] = useState(false);
  const { toast } = useToast();
  const outcomes = p1 && p2 ? offspringOutcomes(p1, p2) : null;

  const onExport = async () => {
    if (!p1 || !p2 || !outcomes) return;
    try {
      setExporting(true);
      await exportGenotypeReportToPdf({
        partner1Name: name1.trim() || "Partner 1",
        partner1Genotype: p1,
        partner2Name: name2.trim() || "Partner 2",
        partner2Genotype: p2,
        outcomes,
      });
      toast({ title: "Report downloaded" });
    } catch (e: any) {
      toast({ title: "Export failed", description: e?.message, variant: "destructive" });
    } finally {
      setExporting(false);
    }
  };

  return (
    <MobileAppShell>
      <SubPageHeader title="Genotype risk checker" back="/dashboard" />
      <div className="px-5 pb-32 space-y-5">
        <p className="text-sm text-muted-foreground">
          Tap each name to edit it, then pick both genotypes to see possible outcomes for each pregnancy.
        </p>

        <GenotypePicker label={name1} value={p1} onChange={setP1} onLabelChange={setName1} />
        <GenotypePicker label={name2} value={p2} onChange={setP2} onLabelChange={setName2} />

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
            <Button className="w-full" onClick={onExport} disabled={exporting}>
              {exporting ? "Preparing PDF…" : "Export results as PDF"}
            </Button>
          </div>
        )}
      </div>
    </MobileAppShell>
  );
}