import { jsx, jsxs } from "react/jsx-runtime";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { A as Avatar, b as AvatarImage, a as AvatarFallback } from "./avatar-DCUvaQ8E.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { S as Skeleton } from "./skeleton-Cb_T373O.js";
import { d as useAuth, b as useProfile, u as useToast, e as useGetProfile } from "./AppRouter-B_BCS-Zy.js";
import { AltArrowLeftLinear, PenNewSquareLinear, DownloadLinear, UserLinear, CalendarLinear, HeartLinear, MapPointLinear, HeartPulseLinear, ClipboardCheckLinear, InfoCircleLinear } from "solar-icon-set";
import { Link } from "wouter";
import { a as exportProfileToPdf } from "./profilePdf-RGgcTAFP.js";
import "react";
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
import "./push.server-BMx5QtSF.js";
import "web-push";
import "@supabase/supabase-js";
import "zod";
import "./auth-middleware-CfCTPg1S.js";
import "./createMiddleware-BvN2ghIY.js";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "jspdf";
import "./Logo-qOo-96Vk.js";
function getInitials(name) {
  if (!name) return "H";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}
function getGenotypeBadgeStyles(genotype) {
  if (!genotype) return "bg-muted text-muted-foreground";
  const g = genotype.toUpperCase();
  if (g === "AA") return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
  if (g === "AS" || g === "AC") return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
  return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
}
function ProfileRow({
  icon: Icon,
  label,
  value,
  isGenotype = false
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors", children: [
    /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center shrink-0 border border-secondary/10", children: /* @__PURE__ */ jsx(Icon, { size: 16 }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-wider", children: label }),
      isGenotype && value ? /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 mt-0.5", children: /* @__PURE__ */ jsx("span", { className: `text-xs px-2 py-0.5 rounded-full font-serif font-bold ${getGenotypeBadgeStyles(String(value))}`, children: value }) }) : /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold mt-0.5 text-foreground truncate", children: value ?? "—" })
    ] })
  ] });
}
function Profile() {
  const { user } = useAuth();
  const { profileId } = useProfile();
  const { toast } = useToast();
  const { data: profile, isLoading } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId }
  });
  const handleExport = () => {
    if (!profile) return;
    try {
      exportProfileToPdf(profile, user?.email);
    } catch (e) {
      toast({ title: "Export failed", description: e?.message ?? "Try again", variant: "destructive" });
    }
  };
  const locationValue = (() => {
    if (!profile?.country && !profile?.state) return null;
    return [profile.state, profile.country].filter(Boolean).join(", ");
  })();
  const metricsValue = (() => {
    const h = profile?.heightCm ? `${profile.heightCm} cm` : "";
    const w = profile?.weightKg ? `${profile.weightKg} kg` : "";
    if (!h && !w) return null;
    return [h, w].filter(Boolean).join("  ·  ");
  })();
  return /* @__PURE__ */ jsx(MobileAppShell, { hideNav: true, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col min-h-full pb-24 bg-background", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground pb-8 pt-6 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-accent/20 blur-[60px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-[-10%] left-[-15%] w-36 h-36 rounded-full bg-primary/25 blur-[50px]" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center relative z-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx(Link, { href: "/settings", children: /* @__PURE__ */ jsx("button", { className: "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-white/20 active:scale-[0.95] transition-all", children: /* @__PURE__ */ jsx(AltArrowLeftLinear, { size: 18 }) }) }),
          /* @__PURE__ */ jsx("h2", { className: "font-serif font-semibold text-lg text-white", children: "Profile Details" }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative mb-3 mt-1", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-accent/30 blur-[6px] scale-[1.06]" }),
          /* @__PURE__ */ jsxs(Avatar, { className: "w-24 h-24 ring-4 ring-offset-4 ring-offset-secondary ring-accent border-0 shadow-xl", children: [
            profile?.avatarUrl && /* @__PURE__ */ jsx(AvatarImage, { src: profile.avatarUrl, alt: profile?.fullName ?? "Profile" }),
            /* @__PURE__ */ jsx(AvatarFallback, { className: "font-serif font-bold text-2xl bg-accent text-accent-foreground", children: getInitials(profile?.fullName) })
          ] })
        ] }),
        isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-36 bg-white/20 mt-2 rounded-full" }) : /* @__PURE__ */ jsx("h1", { className: "font-serif font-bold text-2xl text-white tracking-tight", children: profile?.fullName || "Friend" }),
        user?.email && /* @__PURE__ */ jsx("div", { className: "mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10", children: /* @__PURE__ */ jsx("p", { className: "text-[10px] font-medium font-mono text-accent/90 uppercase tracking-wider", children: user.email }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3 w-full justify-center max-w-[320px]", children: [
          /* @__PURE__ */ jsx(Link, { href: "/profile/edit", className: "flex-1", children: /* @__PURE__ */ jsxs(Button, { className: "w-full bg-accent hover:bg-accent/95 text-accent-foreground font-serif font-bold rounded-2xl h-11 shadow-md shadow-accent/15 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 border border-accent/25", children: [
            /* @__PURE__ */ jsx(PenNewSquareLinear, { size: 14 }),
            "Edit Profile"
          ] }) }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "flex-1 bg-white/10 hover:bg-white/15 text-white border-white/20 font-serif font-semibold rounded-2xl h-11 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5",
              onClick: handleExport,
              disabled: !profile,
              children: [
                /* @__PURE__ */ jsx(DownloadLinear, { size: 14 }),
                "Export PDF"
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 mt-6 space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[2rem] p-5 border border-border/50 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "eyebrow flex items-center gap-2 mb-2 font-serif", children: [
          /* @__PURE__ */ jsx(UserLinear, { size: 14, className: "text-primary/60" }),
          "Personal File"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "divide-y divide-border/30", children: [
          /* @__PURE__ */ jsx(ProfileRow, { icon: UserLinear, label: "Full name", value: profile?.fullName }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: CalendarLinear, label: "Date of birth", value: profile?.dateOfBirth }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: HeartLinear, label: "Gender", value: profile?.gender ?? profile?.sex }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: MapPointLinear, label: "Location", value: locationValue })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-[2rem] p-5 border border-border/50 shadow-sm space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "eyebrow flex items-center gap-2 mb-2 font-serif", children: [
          /* @__PURE__ */ jsx(HeartPulseLinear, { size: 14, className: "text-primary/60" }),
          "Medical File"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "divide-y divide-border/30", children: [
          /* @__PURE__ */ jsx(ProfileRow, { icon: HeartPulseLinear, label: "Genotype", value: profile?.genotype, isGenotype: true }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: HeartLinear, label: "Blood type", value: profile?.bloodType }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: ClipboardCheckLinear, label: "Body Metrics", value: metricsValue }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: InfoCircleLinear, label: "Allergies", value: profile?.allergies }),
          /* @__PURE__ */ jsx(ProfileRow, { icon: InfoCircleLinear, label: "Conditions", value: profile?.conditions })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Profile as default
};
