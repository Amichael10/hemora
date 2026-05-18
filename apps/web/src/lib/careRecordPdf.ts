import jsPDF from "jspdf";
import logoUrl from "@/assets/brand/Logo.png";

type ProfileLike = Record<string, any> | null | undefined;

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

function fmtDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export interface HealthSummaryInput {
  profile: ProfileLike;
  careRecords?: any[];
  vitals?: any[];
  transfusions?: any[];
  appointments?: any[];
}

export async function exportHealthSummaryToPdf(input: HealthSummaryInput) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const BRAND: [number, number, number] = [15, 65, 45];
  const CREAM: [number, number, number] = [248, 244, 236];
  const INK: [number, number, number] = [22, 28, 26];
  const MUTED: [number, number, number] = [120, 120, 116];
  let y = 0;

  const ensureSpace = (need: number) => {
    if (y + need > pageH - 60) {
      doc.addPage();
      y = 64;
    }
  };

  const sectionTitle = (label: string) => {
    ensureSpace(40);
    doc.setFillColor(...BRAND);
    doc.rect(marginX, y - 6, 18, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...BRAND);
    doc.text(label.toUpperCase(), marginX + 26, y);
    y += 18;
  };

  const renderRows = (rows: [string, string][]) => {
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
  doc.text("Health Records Summary", marginX + 52, 76);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }),
    pageW - marginX, 60, { align: "right" });
  doc.text("Confidential", pageW - marginX, 76, { align: "right" });

  // Patient card
  const cardY = 102;
  doc.setFillColor(...CREAM);
  doc.roundedRect(marginX, cardY, pageW - marginX * 2, 70, 10, 10, "F");
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(input.profile?.fullName || "Friend", marginX + 20, cardY + 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const sub = [input.profile?.scdStatus, input.profile?.genotype].filter(Boolean).join("  ·  ");
  if (sub) doc.text(sub, marginX + 20, cardY + 46);

  y = cardY + 70 + 28;

  // ---- Care Records ----
  if (input.careRecords && input.careRecords.length > 0) {
    sectionTitle("Care Records (Visits, Labs, Imaging)");
    input.careRecords.forEach((record) => {
      renderRows([
        ["Title", record.documentTitle || "Care Record"],
        ["Type", record.type || "—"],
        ["Hospital", record.hospitalClinic || "—"],
        ["Date", fmtDate(record.dateOfRecord)],
        ["Status", record.status || "—"],
      ]);
      y += 6;
    });
  }

  // ---- Vitals ----
  if (input.vitals && input.vitals.length > 0) {
    sectionTitle("Recent Vitals");
    input.vitals.slice(0, 10).forEach((vital) => {
      renderRows([
        ["Type", vital.type || "—"],
        ["Value", `${vital.value}${vital.unit || ""}`],
        ["Date", fmtDate(vital.occurredAt)],
        ["Notes", vital.notes || "—"],
      ]);
      y += 6;
    });
  }

  // ---- Transfusions ----
  if (input.transfusions && input.transfusions.length > 0) {
    sectionTitle("Blood Transfusions");
    input.transfusions.forEach((trans) => {
      renderRows([
        ["Hospital", trans.hospital || "—"],
        ["Volume", `${trans.volumeMl} ml`],
        ["Date", fmtDate(trans.occurredAt)],
        ["Reaction", trans.reaction ? "Yes" : "No"],
        ["Notes", trans.notes || "—"],
      ]);
      y += 6;
    });
  }

  // ---- Appointments ----
  if (input.appointments && input.appointments.length > 0) {
    sectionTitle("Medical Appointments");
    input.appointments.forEach((app) => {
      renderRows([
        ["Title", app.title || "—"],
        ["Doctor", app.doctorName || "—"],
        ["Hospital", app.hospital || "—"],
        ["Scheduled", fmtDate(app.scheduledAt)],
        ["Status", app.status || "—"],
      ]);
      y += 6;
    });
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

  const safe = (input.profile?.fullName || "patient").replace(/[^\w\-]+/g, "_");
  doc.save(`Hemora-Health-Summary-${safe}.pdf`);
}
