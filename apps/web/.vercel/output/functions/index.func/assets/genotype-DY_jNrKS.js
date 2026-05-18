const GENOTYPES = ["AA", "AS", "AC", "SS", "SC", "CC"];
const ALLELES = {
  AA: ["A", "A"],
  AS: ["A", "S"],
  AC: ["A", "C"],
  SS: ["S", "S"],
  SC: ["S", "C"],
  CC: ["C", "C"]
};
const norm = (a, b) => {
  const order = "ASC";
  const [x, y] = [a, b].sort((p, q) => order.indexOf(p) - order.indexOf(q));
  return x + y;
};
const META = {
  AA: { label: "No sickle cell trait", tone: "ok" },
  AS: { label: "Sickle cell trait", tone: "warn" },
  AC: { label: "Hemoglobin C trait", tone: "warn" },
  SS: { label: "Sickle cell disease", tone: "bad" },
  SC: { label: "Sickle cell disease (SC)", tone: "bad" },
  CC: { label: "Hemoglobin C disease", tone: "warn" }
};
function offspringOutcomes(p1, p2) {
  const [a1, a2] = ALLELES[p1];
  const [b1, b2] = ALLELES[p2];
  const counts = /* @__PURE__ */ new Map();
  for (const x of [a1, a2]) for (const y of [b1, b2]) {
    const g = norm(x, y);
    counts.set(g, (counts.get(g) ?? 0) + 1);
  }
  const total = 4;
  return Array.from(counts.entries()).map(([genotype, c]) => ({
    genotype,
    percent: Math.round(c / total * 100),
    label: META[genotype].label,
    tone: META[genotype].tone
  })).sort((a, b) => b.percent - a.percent);
}
export {
  GENOTYPES as G,
  offspringOutcomes as o
};
