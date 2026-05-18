import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation, Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DCUvaQ8E.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { d as useAuth, b as useProfile, e as useGetProfile, u as useToast } from "./AppRouter-B_BCS-Zy.js";
import { u as useIsAdmin } from "./useIsAdmin-DffT3IS4.js";
import { PenNewSquareLinear, UserLinear, UsersGroupTwoRoundedLinear, PhoneLinear, HeartPulseLinear, ClipboardCheckLinear, BellLinear, BookLinear, ShieldUserLinear, SettingsLinear, QuestionCircleLinear, InfoCircleLinear, DocumentLinear, Logout3Linear, AltArrowRightLinear } from "solar-icon-set";
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
function getInitials(name) {
  if (!name) return "H";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}
function Row({ icon, label, href, onClick, danger }) {
  const content = /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 px-4 py-3.5 ${danger ? "text-destructive" : "text-foreground"}`, children: [
    /* @__PURE__ */ jsx("span", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${danger ? "bg-destructive/10" : "bg-muted text-foreground"}`, children: icon }),
    /* @__PURE__ */ jsx("span", { className: "flex-1 text-sm font-medium", children: label }),
    !danger && /* @__PURE__ */ jsx(AltArrowRightLinear, { size: 14, color: "rgba(115,115,115,0.5)" })
  ] });
  if (href) return /* @__PURE__ */ jsx(Link, { href, children: content });
  return /* @__PURE__ */ jsx("button", { className: "w-full text-left", onClick, children: content });
}
function Group({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60", children });
}
function Settings() {
  const [, setLocation] = useLocation();
  const { user, signOut } = useAuth();
  const { profileId } = useProfile();
  const { data: profile } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId }
  });
  const { toast } = useToast();
  const { isAdmin } = useIsAdmin();
  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out" });
    setLocation("/");
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Settings", back: "/dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center pt-2 pb-2", children: [
        /* @__PURE__ */ jsx(Avatar, { className: "w-20 h-20 mb-3 border border-border/60", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "font-serif font-semibold text-xl bg-muted text-foreground", children: getInitials(profile?.fullName) }) }),
        /* @__PURE__ */ jsx("h2", { className: "font-serif text-[20px] font-semibold text-foreground tracking-[-0.3px]", children: profile?.fullName || "Friend" }),
        user?.email && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: user.email }),
        /* @__PURE__ */ jsx(Link, { href: "/profile/edit", children: /* @__PURE__ */ jsxs(Button, { size: "sm", className: "mt-4 rounded-full px-5", children: [
          /* @__PURE__ */ jsx(PenNewSquareLinear, { size: 14 }),
          "Edit profile"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(UserLinear, { size: 16 }), label: "Profile", href: "/profile" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(UsersGroupTwoRoundedLinear, { size: 16 }), label: "Family management", href: "/family" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(PhoneLinear, { size: 16 }), label: "Emergency contacts", href: "/settings/contacts" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(HeartPulseLinear, { size: 16 }), label: "Ambulance number", href: "/settings/ambulance" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(ClipboardCheckLinear, { size: 16 }), label: "Hospital checklist", href: "/settings/hospital-checklist" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(BellLinear, { size: 16 }), label: "Notifications", href: "/settings/notifications" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(BookLinear, { size: 16 }), label: "Resources Library", href: "/resources" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(BookLinear, { size: 16 }), label: "Blog", href: "/blog" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(ShieldUserLinear, { size: 16 }), label: "Privacy", href: "/privacy" })
      ] }),
      isAdmin && /* @__PURE__ */ jsx(Group, { children: /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(SettingsLinear, { size: 16 }), label: "Admin dashboard", href: "/admin" }) }),
      /* @__PURE__ */ jsxs(Group, { children: [
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(QuestionCircleLinear, { size: 16 }), label: "Help & support", href: "/help" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(InfoCircleLinear, { size: 16 }), label: "About Hemora", href: "/about" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(DocumentLinear, { size: 16 }), label: "Terms of service", href: "/terms" })
      ] }),
      /* @__PURE__ */ jsx(Group, { children: /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Logout3Linear, { size: 16 }), label: "Sign out", onClick: handleLogout, danger: true }) }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-[11px] text-muted-foreground/70", children: "Hemora · v1.0.0" })
    ] })
  ] });
}
export {
  Settings as default
};
