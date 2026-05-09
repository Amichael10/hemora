import jsPDF from "jspdf";
import logoUrl from "@/assets/brand/Logo.png";

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

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
}

export interface HospitalChecklistPdfInput {
  patientName?: string;
  items: ChecklistItem[];
  checked: Record<string, boolean>;
}

export async function exportHospitalChecklistToPdf(input: HospitalChecklistPdfInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const BRAND: [number, number, number] = [15, 65, 45];
  const CREAM: [number, number, number] = [248, 244, 236];
  const INK: [number, number, number] = [22, 28, 26];
  const MUTED: [number, number, number] = [120, 120, 116];

  // Header band
  doc.setFillColor(...BRAND);
  doc.rect(0, 0, pageW, 130, "F");
  try {
    const dataUrl = await loadImage(logoUrl);
    doc.addImage(dataUrl, "PNG", marginX, 36, 40, 40);
  } catch {}
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Hemora", marginX + 52, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(220, 220, 200);
  doc.text("Hospital bag checklist", marginX + 52, 76);
  doc.setFontSize(9);
  doc.text(
    new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    pageW - marginX, 60, { align: "right" }
  );
  doc.text("For caregiver / hospital", pageW - marginX, 76, { align: "right" });

  // Patient + progress card
  const completed = input.items.filter(i => input.checked[i.id]).length;
  const total = input.items.length;
  const cardY = 102;
  doc.setFillColor(...CREAM);
  doc.roundedRect(marginX, cardY, pageW - marginX * 2, 78, 10, 10, "F");
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(input.patientName || "Hospital bag", marginX + 20, cardY + 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text(`${completed} of ${total} items packed`, marginX + 20, cardY + 46);

  // Progress bar
  const barX = marginX + 20;
  const barY = cardY + 56;
  const barW = pageW - marginX * 2 - 40;
  doc.setFillColor(232, 226, 214);
  doc.roundedRect(barX, barY, barW, 8, 4, 4, "F");
  doc.setFillColor(...BRAND);
  const pct = total > 0 ? completed / total : 0;
  if (pct > 0) doc.roundedRect(barX, barY, Math.max(8, barW * pct), 8, 4, 4, "F");

  let y = cardY + 78 + 32;

  // Items
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BRAND);
  doc.text("CHECKLIST", marginX, y);
  y += 14;

  const rowH = 38;
  for (const item of input.items) {
    if (y + rowH > pageH - 60) {
      doc.addPage();
      y = 64;
    }
    doc.setFillColor(252, 250, 246);
    doc.roundedRect(marginX, y, pageW - marginX * 2, rowH - 6, 8, 8, "F");

    const isOn = !!input.checked[item.id];
    // Checkbox
    const boxX = marginX + 14;
    const boxY = y + 9;
    doc.setLineWidth(1);
    if (isOn) {
      doc.setFillColor(...BRAND);
      doc.roundedRect(boxX, boxY, 14, 14, 3, 3, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("v", boxX + 4, boxY + 11);
    } else {
      doc.setDrawColor(180, 175, 165);
      doc.roundedRect(boxX, boxY, 14, 14, 3, 3, "S");
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    doc.text(item.label, boxX + 24, y + 16);
    if (item.description) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...MUTED);
      doc.text(item.description, boxX + 24, y + 28);
    }
    y += rowH;
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

  const safe = (input.patientName || "hospital-bag").replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-Hospital-Checklist-${safe}.pdf`);
}