import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { M as MobileAppShell } from "./MobileAppShell-o-1rb7vr.js";
import { S as SubPageHeader } from "./SubPageHeader-bz5RHVOt.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { I as Input } from "./input-BdT5cO17.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { a as useToast } from "./AppRouter-yFV4k-aY.js";
import { u as useLocalStorage, A as AMBULANCE_KEY } from "./localPrefs-DxdGpGlb.js";
import { am as pF1 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
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
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-DkPu60F3.js";
import "./router-BY6ex80A.js";
const ambulanceImg = "/assets/ambulance-CVkfhEBa.png";
function Ambulance() {
  const [stored, setStored] = useLocalStorage(AMBULANCE_KEY, "");
  const [value, setValue] = reactExports.useState(stored || "");
  const { toast } = useToast();
  const save = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    setStored(trimmed);
    toast({ title: trimmed ? "Ambulance number saved" : "Ambulance number cleared" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SubPageHeader, { title: "Ambulance number", back: "/settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center pt-2 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: ambulanceImg, alt: "Ambulance", className: "w-32 h-32 object-contain mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs leading-relaxed", children: "Set your local ambulance phone number so we can help you quickly in an emergency." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Ambulance phone number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-muted/60 rounded-xl p-3.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(pF1, { size: 16, className: "text-muted-foreground mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "This number is saved locally on your device and will only be used when you need help." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "xl", className: "w-full", children: "Save number" })
      ] })
    ] })
  ] });
}
export {
  Ambulance as default
};
