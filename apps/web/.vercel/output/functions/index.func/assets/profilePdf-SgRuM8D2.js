import { j as jsPDF } from "./jspdf.node.min-Ba6FWgAB.js";
import { h as hemoraLogo } from "./Logo-qOo-96Vk.js";
function fmtRow(label, value) {
  if (value === null || value === void 0 || value === "") return [label, "—"];
  return [label, String(value)];
}
async function loadImage(src) {
  const res = await fetch(src);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}
async function exportProfileToPdf(profile, email) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const BRAND = [15, 65, 45];
  const CREAM = [248, 244, 236];
  const INK = [22, 28, 26];
  const MUTED = [120, 120, 116];
  let y = 0;
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageW, 140, "F");
  try {
    const dataUrl = await loadImage(hemoraLogo);
    doc.addImage(dataUrl, "PNG", marginX, 38, 44, 44);
  } catch {
  }
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("Hemora", marginX + 56, 68);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(220, 220, 200);
  doc.text("Personal health profile", marginX + 56, 84);
  doc.setFontSize(9);
  doc.setTextColor(220, 220, 200);
  doc.text(
    (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" }),
    pageW - marginX,
    68,
    { align: "right" }
  );
  doc.text("Confidential", pageW - marginX, 84, { align: "right" });
  const cardY = 112;
  doc.setFillColor(...CREAM);
  doc.roundedRect(marginX, cardY, pageW - marginX * 2, 80, 10, 10, "F");
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(profile?.fullName || "Friend", marginX + 22, cardY + 32);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const sub = [email, profile?.country, profile?.dateOfBirth].filter(Boolean).join("  ·  ");
  if (sub) doc.text(sub, marginX + 22, cardY + 52);
  if (profile?.scdStatus) {
    doc.setFillColor(...BRAND);
    const tag = String(profile.scdStatus);
    const tagW = doc.getTextWidth(tag) + 18;
    doc.roundedRect(pageW - marginX - tagW - 16, cardY + 22, tagW, 22, 11, 11, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(tag, pageW - marginX - tagW - 16 + 9, cardY + 37);
  }
  y = cardY + 80 + 36;
  const sections = [
    {
      title: "Personal",
      rows: [
        fmtRow("Full name", profile?.fullName),
        fmtRow("Date of birth", profile?.dateOfBirth),
        fmtRow("Sex", profile?.sex),
        fmtRow("Gender", profile?.gender),
        fmtRow("Country", profile?.country),
        fmtRow("State", profile?.state),
        fmtRow("Setting up for", profile?.setupFor)
      ]
    },
    {
      title: "Medical",
      rows: [
        fmtRow("SCD status", profile?.scdStatus),
        fmtRow("Genotype", profile?.genotype),
        fmtRow("Blood type", profile?.bloodType),
        fmtRow("Height", profile?.heightCm ? `${profile.heightCm} cm` : null),
        fmtRow("Weight", profile?.weightKg ? `${profile.weightKg} kg` : null),
        fmtRow("Allergies", profile?.allergies),
        fmtRow("Conditions", profile?.conditions)
      ]
    }
  ];
  const ensureSpace = (need) => {
    if (y + need > pageH - 60) {
      doc.addPage();
      y = 64;
    }
  };
  for (const section of sections) {
    ensureSpace(60);
    doc.setFillColor(...BRAND);
    doc.rect(marginX, y - 6, 18, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND);
    doc.text(section.title.toUpperCase(), marginX + 26, y);
    y += 18;
    const rowH = 28;
    const cardH = section.rows.length * rowH + 16;
    doc.setFillColor(252, 250, 246);
    doc.roundedRect(marginX, y, pageW - marginX * 2, cardH, 8, 8, "F");
    let ry = y + 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    section.rows.forEach(([label, value], i) => {
      doc.setTextColor(...MUTED);
      doc.text(label, marginX + 18, ry);
      doc.setTextColor(...INK);
      doc.setFont("helvetica", "bold");
      const lines = doc.splitTextToSize(String(value), pageW - marginX * 2 - 200);
      doc.text(lines, marginX + 180, ry);
      doc.setFont("helvetica", "normal");
      if (i < section.rows.length - 1) {
        doc.setDrawColor(232, 226, 214);
        doc.line(marginX + 18, ry + 10, pageW - marginX - 18, ry + 10);
      }
      ry += rowH;
    });
    y += cardH + 24;
  }
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(232, 226, 214);
    doc.line(marginX, pageH - 44, pageW - marginX, pageH - 44);
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text("Hemora · hemora.xyz", marginX, pageH - 26);
    doc.text(`Page ${i} of ${pageCount}`, pageW - marginX, pageH - 26, { align: "right" });
  }
  const safeName = (profile?.fullName || "profile").replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-${safeName}.pdf`);
}
async function exportSchoolLetterToPdf(input) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 64;
  const BRAND = [15, 65, 45];
  const INK = [22, 28, 26];
  const MUTED = [120, 120, 116];
  try {
    const dataUrl = await loadImage(hemoraLogo);
    doc.addImage(dataUrl, "PNG", marginX, 48, 36, 36);
  } catch {
  }
  doc.setTextColor(...BRAND);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Hemora", marginX + 46, 72);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("Care notice  ·  School accommodation request", marginX + 46, 86);
  doc.setDrawColor(...BRAND);
  doc.setLineWidth(1.5);
  doc.line(marginX, 108, pageW - marginX, 108);
  doc.setLineWidth(1);
  let y = 142;
  doc.setTextColor(...MUTED);
  doc.setFontSize(10);
  doc.text(input.date || (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" }), marginX, y);
  y += 28;
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(input.schoolName, marginX, y);
  y += 14;
  if (input.schoolAddress) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    const lines = doc.splitTextToSize(input.schoolAddress, pageW - marginX * 2);
    doc.text(lines, marginX, y);
    y += lines.length * 13;
  }
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(...INK);
  doc.text("Re: Reasonable accommodations for " + input.childName, marginX, y);
  y += 26;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  const intro = `Dear School Administrator,

This letter is to kindly request reasonable accommodations for ${input.childName}${input.childAge ? `, age ${input.childAge}` : ""}, who lives with sickle cell disease${input.genotype ? ` (genotype ${input.genotype})` : ""}. With the right support at school, ${input.childName.split(" ")[0]} can learn safely and thrive alongside peers.`;
  const introLines = doc.splitTextToSize(intro, pageW - marginX * 2);
  doc.text(introLines, marginX, y);
  y += introLines.length * 15 + 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Recommended accommodations", marginX, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  for (const item of input.accommodations) {
    if (y > pageH - 120) {
      doc.addPage();
      y = 80;
    }
    doc.setFillColor(...BRAND);
    doc.circle(marginX + 4, y - 3, 2.2, "F");
    const lines = doc.splitTextToSize(item, pageW - marginX * 2 - 18);
    doc.text(lines, marginX + 16, y);
    y += lines.length * 14 + 4;
  }
  if (input.additionalNotes) {
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Additional notes", marginX, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const ln = doc.splitTextToSize(input.additionalNotes, pageW - marginX * 2);
    doc.text(ln, marginX, y);
    y += ln.length * 14;
  }
  y += 18;
  if (y > pageH - 140) {
    doc.addPage();
    y = 80;
  }
  doc.setFontSize(11);
  doc.text("Thank you for partnering with us to support " + input.childName.split(" ")[0] + "'s wellbeing and learning.", marginX, y, { maxWidth: pageW - marginX * 2 });
  y += 36;
  doc.text("Sincerely,", marginX, y);
  y += 16;
  doc.setFont("helvetica", "bold");
  doc.text(input.parentName || "Parent / Guardian", marginX, y);
  y += 14;
  if (input.parentContact) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.setFontSize(10);
    doc.text(input.parentContact, marginX, y);
  }
  doc.setDrawColor(232, 226, 214);
  doc.line(marginX, pageH - 44, pageW - marginX, pageH - 44);
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("Generated with Hemora · hemora.xyz", marginX, pageH - 26);
  const safe = input.childName.replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-School-Letter-${safe}.pdf`);
}
function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
}
async function exportCrisisReportToPdf(input) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const BRAND = [15, 65, 45];
  const CREAM = [248, 244, 236];
  const INK = [22, 28, 26];
  const MUTED = [120, 120, 116];
  const ACCENT = [168, 50, 74];
  let y = 0;
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageW, 130, "F");
  try {
    const dataUrl = await loadImage(hemoraLogo);
    doc.addImage(dataUrl, "PNG", marginX, 36, 40, 40);
  } catch {
  }
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Hemora", marginX + 52, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(220, 220, 200);
  doc.text("Crisis report  ·  Care team summary", marginX + 52, 76);
  doc.setFontSize(9);
  doc.text(
    (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" }),
    pageW - marginX,
    60,
    { align: "right" }
  );
  doc.text("Confidential", pageW - marginX, 76, { align: "right" });
  const cardY = 102;
  doc.setFillColor(...CREAM);
  doc.roundedRect(marginX, cardY, pageW - marginX * 2, 70, 10, 10, "F");
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(input.patientName || "Friend", marginX + 20, cardY + 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const sub = [input.email, `Period: ${input.periodLabel}`].filter(Boolean).join("  ·  ");
  if (sub) doc.text(sub, marginX + 20, cardY + 46);
  y = cardY + 70 + 28;
  const ensureSpace = (need) => {
    if (y + need > pageH - 60) {
      doc.addPage();
      y = 64;
    }
  };
  const sectionTitle = (label) => {
    ensureSpace(40);
    doc.setFillColor(...BRAND);
    doc.rect(marginX, y - 6, 18, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND);
    doc.text(label.toUpperCase(), marginX + 26, y);
    y += 18;
  };
  const renderRows = (rows) => {
    const rowH = 26;
    const cardH = rows.length * rowH + 16;
    ensureSpace(cardH + 8);
    doc.setFillColor(252, 250, 246);
    doc.roundedRect(marginX, y, pageW - marginX * 2, cardH, 8, 8, "F");
    let ry = y + 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    rows.forEach(([label, value], i) => {
      doc.setTextColor(...MUTED);
      doc.text(label, marginX + 18, ry);
      doc.setTextColor(...INK);
      doc.setFont("helvetica", "bold");
      const lines = doc.splitTextToSize(String(value || "—"), pageW - marginX * 2 - 200);
      doc.text(lines, marginX + 180, ry);
      doc.setFont("helvetica", "normal");
      if (i < rows.length - 1) {
        doc.setDrawColor(232, 226, 214);
        doc.line(marginX + 18, ry + 9, pageW - marginX - 18, ry + 9);
      }
      ry += rowH;
    });
    y += cardH + 18;
  };
  if (input.include.insights) {
    const total = input.logs.length;
    const hospital = input.logs.filter((l) => l.hospitalVisit).length;
    const allTriggers = input.logs.flatMap((l) => l.triggers || []);
    const triggerCounts = allTriggers.reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
    const topTriggers = Object.entries(triggerCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const allHelped = input.logs.flatMap((l) => l.whatHelped || []);
    const helpedCounts = allHelped.reduce((acc, t) => {
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
    const topHelped = Object.entries(helpedCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    sectionTitle("Insights");
    const tileW = (pageW - marginX * 2 - 16) / 3;
    const stats = [
      { n: total, l: "Total crises" },
      { n: hospital, l: "Hospital visits" },
      { n: new Set(allTriggers).size, l: "Unique triggers" }
    ];
    ensureSpace(70);
    stats.forEach((s, i) => {
      const x = marginX + i * (tileW + 8);
      doc.setFillColor(...CREAM);
      doc.roundedRect(x, y, tileW, 60, 8, 8, "F");
      doc.setTextColor(...ACCENT);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text(String(s.n), x + 14, y + 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...MUTED);
      doc.text(s.l, x + 14, y + 48);
    });
    y += 78;
    if (topTriggers.length) {
      sectionTitle("Most common triggers");
      renderRows(topTriggers.map(([k, v]) => [k, `${v} time${v > 1 ? "s" : ""}`]));
    }
    if (topHelped.length) {
      sectionTitle("What's helped most");
      renderRows(topHelped.map(([k, v]) => [k, `${v} time${v > 1 ? "s" : ""}`]));
    }
  }
  if (input.include.details) {
    sectionTitle(input.logs.length > 1 ? "Crisis log entries" : "Crisis details");
    input.logs.forEach((log, idx) => {
      ensureSpace(140);
      doc.setFillColor(...CREAM);
      doc.roundedRect(marginX, y, pageW - marginX * 2, 24, 6, 6, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...INK);
      doc.text(fmtDate(log.occurredAt), marginX + 14, y + 16);
      if (log.hospitalVisit) {
        doc.setFillColor(...ACCENT);
        doc.roundedRect(pageW - marginX - 92, y + 5, 80, 14, 7, 7, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text("Hospital visit", pageW - marginX - 86, y + 14);
      }
      y += 32;
      renderRows([
        ["Pain level", log.painLevel || "—"],
        ["Locations", (log.painLocations || []).join(", ")],
        ["Triggers", (log.triggers || []).join(", ")],
        ["What helped", (log.whatHelped || []).join(", ")]
      ]);
      if (idx < input.logs.length - 1) y += 6;
    });
  }
  if (input.include.treatments) {
    sectionTitle("Treatments noted");
    const treats = input.logs.flatMap((l) => l.whatHelped || []);
    const unique = Array.from(new Set(treats));
    renderRows(unique.length ? unique.map((t) => [t, "Used by patient"]) : [["—", "No treatments recorded"]]);
  }
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(232, 226, 214);
    doc.line(marginX, pageH - 44, pageW - marginX, pageH - 44);
    doc.setFontSize(8.5);
    doc.setTextColor(...MUTED);
    doc.text("Hemora · hemora.xyz", marginX, pageH - 26);
    doc.text(`Page ${i} of ${pageCount}`, pageW - marginX, pageH - 26, { align: "right" });
  }
  const safe = (input.patientName || "patient").replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-Crisis-Report-${safe}.pdf`);
}
export {
  exportProfileToPdf as a,
  exportSchoolLetterToPdf as b,
  exportCrisisReportToPdf as e
};
