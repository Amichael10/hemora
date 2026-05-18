import { jsxs, jsx } from "react/jsx-runtime";
import { useLocation } from "wouter";
import { AltArrowLeftLinear } from "solar-icon-set";
function SubPageHeader({ title, back, right }) {
  const [, setLocation] = useLocation();
  return /* @__PURE__ */ jsxs("header", { className: "flex items-center justify-between px-5 pt-11 pb-4 bg-background sticky top-0 z-30", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => back ? setLocation(back) : window.history.back(),
        "aria-label": "Back",
        className: "w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-card border border-border/60 hover:bg-muted transition-colors",
        children: /* @__PURE__ */ jsx(AltArrowLeftLinear, { size: 18 })
      }
    ),
    /* @__PURE__ */ jsx("h1", { className: "font-serif font-semibold text-[17px] text-foreground tracking-[-0.3px] truncate max-w-[60%]", children: title }),
    /* @__PURE__ */ jsx("div", { className: "w-9 h-9 flex items-center justify-center", children: right })
  ] });
}
export {
  SubPageHeader as S
};
