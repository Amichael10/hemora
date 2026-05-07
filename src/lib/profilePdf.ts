import jsPDF from "jspdf";

type ProfileLike = Record<string, any> | null | undefined;

function fmtRow(label: string, value: any): [string, string] {
  if (value === null || value === undefined || value === "") return [label, "—"];
  return [label, String(value)];
}

export function exportProfileToPdf(profile: ProfileLike, email?: string | null) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 48;
  let y = 64;

  // Header band
  doc.setFillColor(15, 65, 45);
  doc.rect(0, 0, pageW, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Hemora", marginX, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Personal health profile", marginX, 64);
  doc.setFontSize(9);
  doc.text(
    `Generated ${new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`,
    pageW - marginX,
    64,
    { align: "right" }
  );

  y = 130;
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(profile?.fullName || "Friend", marginX, y);
  if (email) {
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(email, marginX, y);
  }
  y += 28;

  const sections: Array<{ title: string; rows: [string, string][] }> = [
    {
      title: "Personal",
      rows: [
        fmtRow("Full name", profile?.fullName),
        fmtRow("Date of birth", profile?.dateOfBirth),
        fmtRow("Sex", profile?.sex),
        fmtRow("Gender", profile?.gender),
        fmtRow("Country", profile?.country),
        fmtRow("State", profile?.state),
        fmtRow("Setting up for", profile?.setupFor),
      ],
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
        fmtRow("Conditions", profile?.conditions),
      ],
    },
  ];

  const ensureSpace = (need: number) => {
    if (y + need > pageH - 60) {
      doc.addPage();
      y = 64;
    }
  };

  for (const section of sections) {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 65, 45);
    doc.text(section.title.toUpperCase(), marginX, y);
    y += 8;
    doc.setDrawColor(220, 220, 220);
    doc.line(marginX, y, pageW - marginX, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    for (const [label, value] of section.rows) {
      ensureSpace(22);
      doc.setTextColor(110, 110, 110);
      doc.text(label, marginX, y);
      doc.setTextColor(20, 20, 20);
      const lines = doc.splitTextToSize(String(value), pageW - marginX * 2 - 160);
      doc.text(lines, marginX + 160, y);
      y += Math.max(18, lines.length * 14);
    }
    y += 16;
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text(`Hemora · Page ${i} of ${pageCount}`, pageW / 2, pageH - 24, { align: "center" });
  }

  const safeName = (profile?.fullName || "profile").replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-${safeName}.pdf`);
}