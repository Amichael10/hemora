import { jsx, jsxs } from "react/jsx-runtime";
function HealthIcon({
  outline: Outline,
  filled: Filled,
  width,
  height,
  size,
  color,
  className = "",
  active = false
}) {
  const resolvedSize = size ?? width ?? height ?? 24;
  const px = typeof resolvedSize === "number" ? resolvedSize : parseInt(String(resolvedSize), 10) || 24;
  if (active) {
    return /* @__PURE__ */ jsx(Filled, { size: px, color, className });
  }
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: "group/icon relative inline-flex shrink-0",
      style: { width: px, height: px },
      children: [
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover/icon:opacity-0", children: /* @__PURE__ */ jsx(Outline, { size: px, color, className }) }),
        /* @__PURE__ */ jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/icon:opacity-100", children: /* @__PURE__ */ jsx(Filled, { size: px, color, className }) })
      ]
    }
  );
}
export {
  HealthIcon as H
};
