import jsPDF from "jspdf";
import logoUrl from "@/assets/brand/Logo.png";

type ProfileLike = Record<string, any> | null | undefined;

function fmtRow(label: string, value: any): [string, string] {
  if (value === null || value === undefined || value === "") return [label, "—"];
  return [label, String(value)];
}

async function loadImage(src: string): Promise<string> {
  const res = await fetch(src);
  const blob = await res.blob();
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

export async function exportProfileToPdf(profile: ProfileLike, email?: string | null) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const BRAND: [number, number, number] = [15, 65, 45];
  const CREAM: [number, number, number] = [248, 244, 236];
  const INK: [number, number, number] = [22, 28, 26];
  const MUTED: [number, number, number] = [120, 120, 116];
  let y = 0;

  // Header band
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageW, 140, "F");

  // Logo
  try {
    const dataUrl = await loadImage(logoUrl);
    doc.addImage(dataUrl, "PNG", marginX, 38, 44, 44);
  } catch {}

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
    new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    pageW - marginX, 68, { align: "right" }
  );
  doc.text("Confidential", pageW - marginX, 84, { align: "right" });

  // Name card overlapping the band
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
    ensureSpace(60);
    // Section eyebrow
    doc.setFillColor(...BRAND);
    doc.rect(marginX, y - 6, 18, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND);
    doc.text(section.title.toUpperCase(), marginX + 26, y);
    y += 18;

    // Rows in a soft card
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

  // Footer
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

// ---------- School accommodation letter ----------
export interface SchoolLetterInput {
  childName: string;
  childAge?: string | number;
  genotype?: string;
  schoolName: string;
  schoolAddress?: string;
  date?: string;
  accommodations: string[];
  additionalNotes?: string;
  parentName?: string;
  parentContact?: string;
}

export async function exportSchoolLetterToPdf(input: SchoolLetterInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 64;
  const BRAND: [number, number, number] = [15, 65, 45];
  const INK: [number, number, number] = [22, 28, 26];
  const MUTED: [number, number, number] = [120, 120, 116];

  // Header
  try {
    const dataUrl = await loadImage(logoUrl);
    doc.addImage(dataUrl, "PNG", marginX, 48, 36, 36);
  } catch {}
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
  doc.text(input.date || new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }), marginX, y);
  y += 28;

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(input.schoolName, marginX, y); y += 14;
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
  const intro = `Dear School Administrator,\n\nThis letter is to kindly request reasonable accommodations for ${input.childName}${input.childAge ? `, age ${input.childAge}` : ""}, who lives with sickle cell disease${input.genotype ? ` (genotype ${input.genotype})` : ""}. With the right support at school, ${input.childName.split(" ")[0]} can learn safely and thrive alongside peers.`;
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
    if (y > pageH - 120) { doc.addPage(); y = 80; }
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
    doc.text("Additional notes", marginX, y); y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const ln = doc.splitTextToSize(input.additionalNotes, pageW - marginX * 2);
    doc.text(ln, marginX, y); y += ln.length * 14;
  }

  y += 18;
  if (y > pageH - 140) { doc.addPage(); y = 80; }
  doc.setFontSize(11);
  doc.text("Thank you for partnering with us to support " + input.childName.split(" ")[0] + "'s wellbeing and learning.", marginX, y, { maxWidth: pageW - marginX * 2 });
  y += 36;
  doc.text("Sincerely,", marginX, y); y += 16;
  doc.setFont("helvetica", "bold");
  doc.text(input.parentName || "Parent / Guardian", marginX, y); y += 14;
  if (input.parentContact) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.setFontSize(10);
    doc.text(input.parentContact, marginX, y);
  }

  // Footer
  doc.setDrawColor(232, 226, 214);
  doc.line(marginX, pageH - 44, pageW - marginX, pageH - 44);
  doc.setFontSize(8.5);
  doc.setTextColor(...MUTED);
  doc.text("Generated with Hemora · hemora.xyz", marginX, pageH - 26);

  const safe = input.childName.replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-School-Letter-${safe}.pdf`);
}