import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { d as useAuth, b as useProfile, Q as getProfileByUser, R as ApiError } from "./AppRouter-B_BCS-Zy.js";
import { B as Button } from "./button-CVyzTRqg.js";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
function AuthCallback() {
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();
  const { setProfileId } = useProfile();
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      setLocation("/onboarding");
      return;
    }
    let cancelled = false;
    setError(null);
    (async () => {
      try {
        const profile = await getProfileByUser(user.id);
        if (cancelled) return;
        setProfileId(String(profile.id));
        setLocation("/dashboard");
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError && err.status === 404) {
          setLocation("/onboarding?step=1");
          return;
        }
        const msg = err instanceof Error ? err.message : "We couldn't reach the server.";
        setError(msg);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loading, user?.id, retryKey]);
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] flex items-center justify-center bg-secondary p-6", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-4 max-w-sm", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-serif text-xl text-white", children: "Couldn't finish signing you in" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", "data-testid": "text-callback-error", children: error }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pt-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "bg-white text-secondary hover:bg-white/90",
            onClick: () => setRetryKey((k) => k + 1),
            "data-testid": "button-callback-retry",
            children: "Try again"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "outline",
            className: "border-white/30 text-white hover:bg-white/10",
            onClick: () => setLocation("/onboarding"),
            "data-testid": "button-callback-back",
            children: "Back to sign in"
          }
        )
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] flex items-center justify-center bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "text-center space-y-3", children: [
    /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mx-auto rounded-full border-4 border-white/20 border-t-white animate-spin" }),
    /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm", children: "Signing you in…" })
  ] }) });
}
export {
  AuthCallback as default
};
