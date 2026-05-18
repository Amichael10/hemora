import { q as jsxRuntimeExports } from "../server.js";
import { u as useLocation } from "./AppRouter-yFV4k-aY.js";
import { R as R4 } from "./index-D2ZfvGdl.js";
function SubPageHeader({ title, back, right }) {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-5 pt-11 pb-4 bg-background sticky top-0 z-30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => back ? setLocation(back) : window.history.back(),
        "aria-label": "Back",
        className: "w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(R4, { size: 18 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif font-semibold text-[17px] text-foreground tracking-[-0.3px] truncate max-w-[60%]", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 flex items-center justify-center", children: right })
  ] });
}
export {
  SubPageHeader as S
};
