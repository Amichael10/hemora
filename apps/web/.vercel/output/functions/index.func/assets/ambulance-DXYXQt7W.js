import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { L as Label } from "./label-CBNEkC10.js";
import { u as useToast } from "./AppRouter-B_BCS-Zy.js";
import { u as useLocalStorage, A as AMBULANCE_KEY } from "./localPrefs-DBg6jxYs.js";
import { ShieldCheckLinear } from "solar-icon-set";
import "wouter";
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
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-label";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
const ambulanceImg = "/assets/ambulance-CVkfhEBa.png";
function Ambulance() {
  const [stored, setStored] = useLocalStorage(AMBULANCE_KEY, "");
  const [value, setValue] = useState(stored || "");
  const { toast } = useToast();
  const save = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    setStored(trimmed);
    toast({ title: trimmed ? "Ambulance number saved" : "Ambulance number cleared" });
  };
  return /* @__PURE__ */ jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Ambulance number", back: "/settings" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center pt-2 pb-6", children: [
        /* @__PURE__ */ jsx("img", { src: ambulanceImg, alt: "Ambulance", className: "w-32 h-32 object-contain mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "Set your local ambulance phone number so we can help you quickly in an emergency." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: save, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx(Label, { children: "Ambulance phone number" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "tel",
              inputMode: "tel",
              placeholder: "e.g. 112 or +233 24 123 4567",
              value,
              onChange: (e) => setValue(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 bg-muted/60 rounded-xl p-3.5", children: [
          /* @__PURE__ */ jsx(ShieldCheckLinear, { size: 16, className: "text-muted-foreground mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "This number is saved locally on your device and will only be used when you need help." })
        ] }),
        /* @__PURE__ */ jsx(Button, { type: "submit", size: "xl", className: "w-full", children: "Save number" })
      ] })
    ] })
  ] });
}
export {
  Ambulance as default
};
