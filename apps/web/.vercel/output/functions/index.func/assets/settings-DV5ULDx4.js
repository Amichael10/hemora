import { q as jsxRuntimeExports } from "../server.js";
import { u as useLocation, e as useAuth, d as useProfile, f as useGetProfile, a as useToast, L as Link } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-MBD_DGz_.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { u as useIsAdmin } from "./useIsAdmin-ELOgEwNl.js";
import { n as G, X as X50, a7 as Y50, a4 as L41, t as t81, ad as bj1, b as Nq1, h as hm1, ai as nF1, M as Ma1, aj as s11, ae as u11, ak as gm1, al as _H1, c as b4 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./router-BY6ex80A.js";
import "./push.server-DA3L-NAE.js";
import "buffer";
import "url";
import "https";
import "net";
import "tls";
import "assert";
import "tty";
import "os";
import "http";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-CnJpvqzT.js";
import "./index-DkPu60F3.js";
function getInitials(name) {
  if (!name) return "H";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}
function Row({ icon, label, href, onClick, danger }) {
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 px-4 py-3.5 ${danger ? "text-destructive" : "text-foreground"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-8 h-8 rounded-lg flex items-center justify-center ${danger ? "bg-destructive/10" : "bg-muted text-foreground"}`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm font-medium", children: label }),
    !danger && /* @__PURE__ */ jsxRuntimeExports.jsx(b4, { size: 14, color: "rgba(115,115,115,0.5)" })
  ] });
  if (href) return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href, children: content });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full text-left", onClick, children: content });
}
function Group({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60", children });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Settings", back: "/dashboard" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-10 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center pt-2 pb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-20 h-20 mb-3 border border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "font-serif font-semibold text-xl bg-muted text-foreground", children: getInitials(profile?.fullName) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-[20px] font-semibold text-foreground tracking-[-0.3px]", children: profile?.fullName || "Friend" }),
        user?.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: "/profile/edit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "mt-4 rounded-full px-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(G, { size: 14 }),
          "Edit profile"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(X50, { size: 16 }), label: "Profile", href: "/profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Y50, { size: 16 }), label: "Family management", href: "/family" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(L41, { size: 16 }), label: "Emergency contacts", href: "/settings/contacts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(t81, { size: 16 }), label: "Ambulance number", href: "/settings/ambulance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(bj1, { size: 16 }), label: "Hospital checklist", href: "/settings/hospital-checklist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Nq1, { size: 16 }), label: "Notifications", href: "/settings/notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(hm1, { size: 16 }), label: "Resources Library", href: "/resources" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(hm1, { size: 16 }), label: "Blog", href: "/blog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(nF1, { size: 16 }), label: "Privacy", href: "/privacy" })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Ma1, { size: 16 }), label: "Admin dashboard", href: "/admin" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(s11, { size: 16 }), label: "Help & support", href: "/help" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(u11, { size: 16 }), label: "About Hemora", href: "/about" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(gm1, { size: 16 }), label: "Terms of service", href: "/terms" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(_H1, { size: 16 }), label: "Sign out", onClick: handleLogout, danger: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] text-muted-foreground/70", children: "Hemora · v1.0.0" })
    ] })
  ] });
}
export {
  Settings as default
};
