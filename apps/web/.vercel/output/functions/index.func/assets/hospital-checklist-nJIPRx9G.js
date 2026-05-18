import { jsxs, jsx } from "react/jsx-runtime";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { u as useLocalStorage, D as DEFAULT_HOSPITAL_CHECKLIST, H as HOSPITAL_CHECKLIST_KEY } from "./localPrefs-DBg6jxYs.js";
import jsPDF from "jspdf";
import { h as hemoraLogo } from "./Logo-qOo-96Vk.js";
import { HospitalLinear, CheckCircleBold, InfoCircleLinear, ShareLinear } from "solar-icon-set";
import "wouter";
import "./AppRouter-B_BCS-Zy.js";
import "react";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@tanstack/router-core";
import "../server.js";
import "node:async_hooks";
import "h3-v2";
import "tiny-invariant";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/router-core/isServer";
import "@tanstack/react-store";
import "tiny-warning";
import "node:stream";
import "react-dom/server";
import "isbot";
import "@radix-ui/react-dialog";
import "./button-CVyzTRqg.js";
import "@radix-ui/react-slot";
import "./push.server-BMx5QtSF.js";
import "web-push";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
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
async function exportHospitalChecklistToPdf(input) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 56;
  const BRAND = [15, 65, 45];
  const CREAM = [248, 244, 236];
  const INK = [22, 28, 26];
  const MUTED = [120, 120, 116];
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
  doc.text("Hospital bag checklist", marginX + 52, 76);
  doc.setFontSize(9);
  doc.text(
    (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, { year: "numeric", month: "long", day: "numeric" }),
    pageW - marginX,
    60,
    { align: "right" }
  );
  doc.text("For caregiver / hospital", pageW - marginX, 76, { align: "right" });
  const completed = input.items.filter((i) => input.checked[i.id]).length;
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
  const barX = marginX + 20;
  const barY = cardY + 56;
  const barW = pageW - marginX * 2 - 40;
  doc.setFillColor(232, 226, 214);
  doc.roundedRect(barX, barY, barW, 8, 4, 4, "F");
  doc.setFillColor(...BRAND);
  const pct = total > 0 ? completed / total : 0;
  if (pct > 0) doc.roundedRect(barX, barY, Math.max(8, barW * pct), 8, 4, 4, "F");
  let y = cardY + 78 + 32;
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
function HospitalChecklist() {
  const [checked, setChecked] = useLocalStorage(HOSPITAL_CHECKLIST_KEY, {});
  const items = DEFAULT_HOSPITAL_CHECKLIST;
  const completedCount = items.filter((i) => checked[i.id]).length;
  const progressPct = items.length > 0 ? Math.round(completedCount / items.length * 100) : 0;
  const toggle = (id) => setChecked({ ...checked, [id]: !checked[id] });
  return /* @__PURE__ */ jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Hospital checklist", back: "/settings" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center pt-2 pb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx(HospitalLinear, { size: 36 }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "Use this checklist to prepare for your hospital visit. Check off items as you complete them." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3 px-1", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Checklist" }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
          completedCount,
          " / ",
          items.length,
          " completed"
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 px-1", children: /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-primary transition-all duration-300", style: { width: `${progressPct}%` } }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60 mb-5", children: items.map((item) => {
        const isOn = !!checked[item.id];
        return /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => toggle(item.id),
            className: "w-full flex items-center gap-3 p-4 text-left hover:bg-muted/40 transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `w-6 h-6 rounded-md flex items-center justify-center shrink-0 border transition-colors ${isOn ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground/30 bg-background"}`,
                  children: isOn && /* @__PURE__ */ jsx(CheckCircleBold, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsx("span", { className: `block text-sm font-medium ${isOn ? "text-foreground" : "text-foreground"}`, children: item.label }),
                /* @__PURE__ */ jsx("span", { className: "block text-xs text-muted-foreground mt-0.5", children: item.description })
              ] })
            ]
          },
          item.id
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 bg-primary/5 border border-primary/15 rounded-xl p-3.5", children: [
        /* @__PURE__ */ jsx(InfoCircleLinear, { size: 16, className: "text-primary mt-0.5 shrink-0" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-foreground leading-relaxed", children: "Bring this checklist with you to your appointment." })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => exportHospitalChecklistToPdf({ items, checked }),
          className: "mt-5 w-full h-12 rounded-xl bg-primary text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors",
          children: [
            /* @__PURE__ */ jsx(ShareLinear, { size: 16 }),
            " Share as PDF"
          ]
        }
      )
    ] })
  ] });
}
export {
  HospitalChecklist as default
};
