import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { isValidElement, cloneElement, PureComponent, useRef, useMemo, useState, useCallback, forwardRef, useEffect } from "react";
import { useLocation } from "wouter";
import { B as Button } from "./button-CVyzTRqg.js";
import { I as Input } from "./input-BYwlJ-Hq.js";
import { T as Textarea } from "./textarea-DwZULfBx.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D4ZL-bNu.js";
import { B as Badge } from "./badge-CbJr40wT.js";
import { c as createLucideIcon, w as cn, U as HemoraLoader, G as supabase, u as useToast } from "./AppRouter-B_BCS-Zy.js";
import { u as useIsAdmin } from "./useIsAdmin-DffT3IS4.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription } from "./card-DUll-XNs.js";
import { $ as isNumber, be as adaptEventHandlers, B as svgPropertiesNoEvents, D as DefaultZIndexes, bf as isClipDot, bg as svgPropertiesAndEventsFromUnknown, Z as ZIndexLayer, L as Layer, E as useAppSelector, M as selectActiveTooltipIndex, bh as useActiveTooltipDataPoints, al as isNullish, a1 as svgPropertiesNoEventsFromUnknown, bi as useChartWidth, bj as useChartHeight, bk as useOffsetInternal, A as resolveDefaultProps, aQ as useIsPanorama, bl as selectAxisPropsNeededForCartesianGridTicksGenerator, bm as isPositiveNumber, bn as warn, bo as getCoordinatesOfGrid, bp as getTicksOfAxis, n as selectChartLayout, aD as selectChartDataWithIndexesIfNotInPanoramaPosition3, bq as selectChartBaseValue, aE as selectAxisWithScale, aF as selectTicksOfGraphicalItem, an as getStackSeriesIdentifier, br as isCategoricalAxis, aG as getBandSizeOfAxis, aH as selectUnfilteredCartesianItems, aL as selectStackGroups, aP as propsAreEqual, R as RegisterGraphicalItemId, aR as SetLegendPayload, aS as SetCartesianGraphicalItem, aO as getNormalizedStackId, y as getTooltipNameProp, G as SetTooltipEntrySettings, at as noop, aT as useChartLayout, bs as useChartName, aA as usePlotArea, g as getValueByDataKey, bt as getCateCoordinateOfLine, H as useAnimationId, aZ as useCartesianChartLayout, J as JavascriptAnimate, I as interpolate, aY as isNan, _ as LabelListFromLabelProp, aX as CartesianLabelListContextProvider, bu as svgPropertiesAndEvents, a5 as Curve, am as isWellBehavedNumber, ah as arrayTooltipSearcher, ai as ResponsiveContainer, aj as Tooltip, K as Cell } from "./CategoricalChart-DJedIoBC.js";
import { C as Clock } from "./clock-B_eR6ahH.js";
import { A as ArrowUpRight } from "./arrow-up-right-7tyOEiAv.js";
import { P as Pill } from "./pill-0M61oejH.js";
import { B as Building2 } from "./building-2-Q1QiLhh2.js";
import { g as getTicks, d as defaultCartesianAxisProps, s as selectXAxisIdFromGraphicalItemId, b as selectYAxisIdFromGraphicalItemId, u as useNeedsClip, G as GraphicalItemClipPath, C as CartesianChart, X as XAxis, Y as YAxis, B as BarChart, a as Bar } from "./BarChart-KQihFzjw.js";
import { clsx } from "clsx";
import { createSelector } from "reselect";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-tabs";
import "@radix-ui/react-toast";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@supabase/supabase-js";
import "@tanstack/react-query";
import "react-dom";
import "es-toolkit/compat/sortBy";
import "es-toolkit/compat/uniqBy";
import "es-toolkit/compat/get";
import "react-is";
import "es-toolkit/compat/isPlainObject";
import "victory-vendor/d3-shape";
import "react-redux";
import "@reduxjs/toolkit";
import "immer";
import "use-sync-external-store/shim/with-selector";
import "es-toolkit/compat/throttle";
import "es-toolkit/compat/range";
import "victory-vendor/d3-scale";
import "decimal.js-light";
import "eventemitter3";
import "tiny-invariant";
const __iconNode$5 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$3.apply(null, arguments);
}
var Dot = (props) => {
  var {
    cx,
    cy,
    r,
    className
  } = props;
  var layerClass = clsx("recharts-dot", className);
  if (isNumber(cx) && isNumber(cy) && isNumber(r)) {
    return /* @__PURE__ */ React.createElement("circle", _extends$3({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
      className: layerClass,
      cx,
      cy,
      r
    }));
  }
  return null;
};
var _excluded$2 = ["points"];
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$2.apply(null, arguments);
}
function _objectWithoutProperties$2(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$2(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$2(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function DotItem(_ref) {
  var {
    option,
    dotProps,
    className
  } = _ref;
  if (/* @__PURE__ */ isValidElement(option)) {
    return /* @__PURE__ */ cloneElement(option, dotProps);
  }
  if (typeof option === "function") {
    return option(dotProps);
  }
  var finalClassName = clsx(className, typeof option !== "boolean" ? option.className : "");
  var _ref2 = dotProps !== null && dotProps !== void 0 ? dotProps : {}, {
    points
  } = _ref2, props = _objectWithoutProperties$2(_ref2, _excluded$2);
  return /* @__PURE__ */ React.createElement(Dot, _extends$2({}, props, {
    className: finalClassName
  }));
}
function shouldRenderDots(points, dot) {
  if (points == null) {
    return false;
  }
  if (dot) {
    return true;
  }
  return points.length === 1;
}
function Dots(_ref3) {
  var {
    points,
    dot,
    className,
    dotClassName,
    dataKey,
    baseProps,
    needClip,
    clipPathId,
    zIndex = DefaultZIndexes.scatter
  } = _ref3;
  if (!shouldRenderDots(points, dot)) {
    return null;
  }
  var clipDot = isClipDot(dot);
  var customDotProps = svgPropertiesAndEventsFromUnknown(dot);
  var dots = points.map((entry, i) => {
    var _entry$x, _entry$y;
    var dotProps = _objectSpread$3(_objectSpread$3(_objectSpread$3({
      r: 3
    }, baseProps), customDotProps), {}, {
      index: i,
      cx: (_entry$x = entry.x) !== null && _entry$x !== void 0 ? _entry$x : void 0,
      cy: (_entry$y = entry.y) !== null && _entry$y !== void 0 ? _entry$y : void 0,
      dataKey,
      value: entry.value,
      payload: entry.payload,
      points
    });
    return /* @__PURE__ */ React.createElement(DotItem, {
      key: "dot-".concat(i),
      option: dot,
      dotProps,
      className: dotClassName
    });
  });
  var layerProps = {};
  if (needClip && clipPathId != null) {
    layerProps.clipPath = "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")");
  }
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex
  }, /* @__PURE__ */ React.createElement(Layer, _extends$2({
    className
  }, layerProps), dots));
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ActivePoint = (_ref) => {
  var {
    point,
    childIndex,
    mainColor,
    activeDot,
    dataKey,
    clipPath
  } = _ref;
  if (activeDot === false || point.x == null || point.y == null) {
    return null;
  }
  var dotPropsTyped = {
    index: childIndex,
    dataKey,
    cx: point.x,
    cy: point.y,
    r: 4,
    fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: point.payload,
    value: point.value
  };
  var dotProps = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, dotPropsTyped), svgPropertiesNoEventsFromUnknown(activeDot)), adaptEventHandlers(activeDot));
  var dot;
  if (/* @__PURE__ */ isValidElement(activeDot)) {
    dot = /* @__PURE__ */ cloneElement(activeDot, dotProps);
  } else if (typeof activeDot === "function") {
    dot = activeDot(dotProps);
  } else {
    dot = /* @__PURE__ */ React.createElement(Dot, dotProps);
  }
  return /* @__PURE__ */ React.createElement(Layer, {
    className: "recharts-active-dot",
    clipPath
  }, dot);
};
function ActivePoints(_ref2) {
  var {
    points,
    mainColor,
    activeDot,
    itemDataKey,
    clipPath,
    zIndex = DefaultZIndexes.activeDot
  } = _ref2;
  var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataPoints = useActiveTooltipDataPoints();
  if (points == null || activeDataPoints == null) {
    return null;
  }
  var activePoint = points.find((p) => activeDataPoints.includes(p.payload));
  if (isNullish(activePoint)) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex
  }, /* @__PURE__ */ React.createElement(ActivePoint, {
    point: activePoint,
    childIndex: Number(activeTooltipIndex),
    mainColor,
    dataKey: itemDataKey,
    activeDot,
    clipPath
  }));
}
var _excluded$1 = ["x1", "y1", "x2", "y2", "key"], _excluded2$1 = ["offset"], _excluded3 = ["xAxisId", "yAxisId"], _excluded4 = ["xAxisId", "yAxisId"];
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
function _objectWithoutProperties$1(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$1(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Background = (props) => {
  var {
    fill
  } = props;
  if (!fill || fill === "none") {
    return null;
  }
  var {
    fillOpacity,
    x,
    y,
    width,
    height,
    ry
  } = props;
  return /* @__PURE__ */ React.createElement("rect", {
    x,
    y,
    ry,
    width,
    height,
    stroke: "none",
    fill,
    fillOpacity,
    className: "recharts-cartesian-grid-bg"
  });
};
function LineItem(_ref) {
  var {
    option,
    lineItemProps
  } = _ref;
  var lineItem;
  if (/* @__PURE__ */ React.isValidElement(option)) {
    lineItem = /* @__PURE__ */ React.cloneElement(option, lineItemProps);
  } else if (typeof option === "function") {
    lineItem = option(lineItemProps);
  } else {
    var _svgPropertiesNoEvent;
    var {
      x1,
      y1,
      x2,
      y2,
      key
    } = lineItemProps, others = _objectWithoutProperties$1(lineItemProps, _excluded$1);
    var _ref2 = (_svgPropertiesNoEvent = svgPropertiesNoEvents(others)) !== null && _svgPropertiesNoEvent !== void 0 ? _svgPropertiesNoEvent : {}, {
      offset: __
    } = _ref2, restOfFilteredProps = _objectWithoutProperties$1(_ref2, _excluded2$1);
    lineItem = /* @__PURE__ */ React.createElement("line", _extends$1({}, restOfFilteredProps, {
      x1,
      y1,
      x2,
      y2,
      fill: "none",
      key
    }));
  }
  return lineItem;
}
function HorizontalGridLines(props) {
  var {
    x,
    width,
    horizontal = true,
    horizontalPoints
  } = props;
  if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
    return null;
  }
  var {
    xAxisId,
    yAxisId
  } = props, otherLineItemProps = _objectWithoutProperties$1(props, _excluded3);
  var items = horizontalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$1(_objectSpread$1({}, otherLineItemProps), {}, {
      x1: x,
      y1: entry,
      x2: x + width,
      y2: entry,
      key: "line-".concat(i),
      index: i
    });
    return /* @__PURE__ */ React.createElement(LineItem, {
      key: "line-".concat(i),
      option: horizontal,
      lineItemProps
    });
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, items);
}
function VerticalGridLines(props) {
  var {
    y,
    height,
    vertical = true,
    verticalPoints
  } = props;
  if (!vertical || !verticalPoints || !verticalPoints.length) {
    return null;
  }
  var {
    xAxisId,
    yAxisId
  } = props, otherLineItemProps = _objectWithoutProperties$1(props, _excluded4);
  var items = verticalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$1(_objectSpread$1({}, otherLineItemProps), {}, {
      x1: entry,
      y1: y,
      x2: entry,
      y2: y + height,
      key: "line-".concat(i),
      index: i
    });
    return /* @__PURE__ */ React.createElement(LineItem, {
      option: vertical,
      lineItemProps,
      key: "line-".concat(i)
    });
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, items);
}
function HorizontalStripes(props) {
  var {
    horizontalFill,
    fillOpacity,
    x,
    y,
    width,
    height,
    horizontalPoints,
    horizontal = true
  } = props;
  if (!horizontal || !horizontalFill || !horizontalFill.length || horizontalPoints == null) {
    return null;
  }
  var roundedSortedHorizontalPoints = horizontalPoints.map((e) => Math.round(e + y - y)).sort((a, b) => a - b);
  if (y !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  var items = roundedSortedHorizontalPoints.map((entry, i) => {
    var nextPoint = roundedSortedHorizontalPoints[i + 1];
    var lastStripe = nextPoint == null;
    var lineHeight = lastStripe ? y + height - entry : nextPoint - entry;
    if (lineHeight <= 0) {
      return null;
    }
    var colorIndex = i % horizontalFill.length;
    return /* @__PURE__ */ React.createElement("rect", {
      key: "react-".concat(i),
      y: entry,
      x,
      height: lineHeight,
      width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, items);
}
function VerticalStripes(props) {
  var {
    vertical = true,
    verticalFill,
    fillOpacity,
    x,
    y,
    width,
    height,
    verticalPoints
  } = props;
  if (!vertical || !verticalFill || !verticalFill.length) {
    return null;
  }
  var roundedSortedVerticalPoints = verticalPoints.map((e) => Math.round(e + x - x)).sort((a, b) => a - b);
  if (x !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  var items = roundedSortedVerticalPoints.map((entry, i) => {
    var nextPoint = roundedSortedVerticalPoints[i + 1];
    var lastStripe = nextPoint == null;
    var lineWidth = lastStripe ? x + width - entry : nextPoint - entry;
    if (lineWidth <= 0) {
      return null;
    }
    var colorIndex = i % verticalFill.length;
    return /* @__PURE__ */ React.createElement("rect", {
      key: "react-".concat(i),
      x: entry,
      y,
      width: lineWidth,
      height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref3, syncWithTicks) => {
  var {
    xAxis,
    width,
    height,
    offset
  } = _ref3;
  return getCoordinatesOfGrid(getTicks(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, defaultCartesianAxisProps), xAxis), {}, {
    ticks: getTicksOfAxis(xAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref4, syncWithTicks) => {
  var {
    yAxis,
    width,
    height,
    offset
  } = _ref4;
  return getCoordinatesOfGrid(getTicks(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, defaultCartesianAxisProps), yAxis), {}, {
    ticks: getTicksOfAxis(yAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultCartesianGridProps = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0,
  syncWithTicks: false,
  zIndex: DefaultZIndexes.grid
};
function CartesianGrid(props) {
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  var offset = useOffsetInternal();
  var propsIncludingDefaults = _objectSpread$1(_objectSpread$1({}, resolveDefaultProps(props, defaultCartesianGridProps)), {}, {
    x: isNumber(props.x) ? props.x : offset.left,
    y: isNumber(props.y) ? props.y : offset.top,
    width: isNumber(props.width) ? props.width : offset.width,
    height: isNumber(props.height) ? props.height : offset.height
  });
  var {
    xAxisId,
    yAxisId,
    x,
    y,
    width,
    height,
    syncWithTicks,
    horizontalValues,
    verticalValues
  } = propsIncludingDefaults;
  var isPanorama = useIsPanorama();
  var xAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "xAxis", xAxisId, isPanorama));
  var yAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "yAxis", yAxisId, isPanorama));
  if (!isPositiveNumber(width) || !isPositiveNumber(height) || !isNumber(x) || !isNumber(y)) {
    return null;
  }
  var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
  var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
  var {
    horizontalPoints,
    verticalPoints
  } = propsIncludingDefaults;
  if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === "function") {
    var isHorizontalValues = horizontalValues && horizontalValues.length;
    var generatorResult = horizontalCoordinatesGenerator({
      yAxis: yAxis ? _objectSpread$1(_objectSpread$1({}, yAxis), {}, {
        ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
      }) : void 0,
      width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
      height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
      offset
    }, isHorizontalValues ? true : syncWithTicks);
    warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
    if (Array.isArray(generatorResult)) {
      horizontalPoints = generatorResult;
    }
  }
  if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === "function") {
    var isVerticalValues = verticalValues && verticalValues.length;
    var _generatorResult = verticalCoordinatesGenerator({
      xAxis: xAxis ? _objectSpread$1(_objectSpread$1({}, xAxis), {}, {
        ticks: isVerticalValues ? verticalValues : xAxis.ticks
      }) : void 0,
      width: chartWidth !== null && chartWidth !== void 0 ? chartWidth : width,
      height: chartHeight !== null && chartHeight !== void 0 ? chartHeight : height,
      offset
    }, isVerticalValues ? true : syncWithTicks);
    warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
    if (Array.isArray(_generatorResult)) {
      verticalPoints = _generatorResult;
    }
  }
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex: propsIncludingDefaults.zIndex
  }, /* @__PURE__ */ React.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ React.createElement(Background, {
    fill: propsIncludingDefaults.fill,
    fillOpacity: propsIncludingDefaults.fillOpacity,
    x: propsIncludingDefaults.x,
    y: propsIncludingDefaults.y,
    width: propsIncludingDefaults.width,
    height: propsIncludingDefaults.height,
    ry: propsIncludingDefaults.ry
  }), /* @__PURE__ */ React.createElement(HorizontalStripes, _extends$1({}, propsIncludingDefaults, {
    horizontalPoints
  })), /* @__PURE__ */ React.createElement(VerticalStripes, _extends$1({}, propsIncludingDefaults, {
    verticalPoints
  })), /* @__PURE__ */ React.createElement(HorizontalGridLines, _extends$1({}, propsIncludingDefaults, {
    offset,
    horizontalPoints,
    xAxis,
    yAxis
  })), /* @__PURE__ */ React.createElement(VerticalGridLines, _extends$1({}, propsIncludingDefaults, {
    offset,
    verticalPoints,
    xAxis,
    yAxis
  }))));
}
CartesianGrid.displayName = "CartesianGrid";
function getRadiusAndStrokeWidthFromDot(dot) {
  var props = svgPropertiesNoEventsFromUnknown(dot);
  var defaultR = 3;
  var defaultStrokeWidth = 2;
  if (props != null) {
    var {
      r,
      strokeWidth
    } = props;
    var realR = Number(r);
    var realStrokeWidth = Number(strokeWidth);
    if (Number.isNaN(realR) || realR < 0) {
      realR = defaultR;
    }
    if (Number.isNaN(realStrokeWidth) || realStrokeWidth < 0) {
      realStrokeWidth = defaultStrokeWidth;
    }
    return {
      r: realR,
      strokeWidth: realStrokeWidth
    };
  }
  return {
    r: defaultR,
    strokeWidth: defaultStrokeWidth
  };
}
var selectXAxisWithScale = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectXAxisTicks = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", selectXAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisWithScale = (state, graphicalItemId, isPanorama) => selectAxisWithScale(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectYAxisTicks = (state, graphicalItemId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", selectYAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectBandSize = createSelector([selectChartLayout, selectXAxisWithScale, selectYAxisWithScale, selectXAxisTicks, selectYAxisTicks], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
  if (isCategoricalAxis(layout, "xAxis")) {
    return getBandSizeOfAxis(xAxis, xAxisTicks, false);
  }
  return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, id) => id;
var selectSynchronisedAreaSettings = createSelector([selectUnfilteredCartesianItems, pickAreaId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "area").find((item) => item.id === id));
var selectNumericalAxisType = (state) => {
  var layout = selectChartLayout(state);
  var isXAxisCategorical = isCategoricalAxis(layout, "xAxis");
  return isXAxisCategorical ? "yAxis" : "xAxis";
};
var selectNumericalAxisIdFromGraphicalItemId = (state, graphicalItemId) => {
  var axisType = selectNumericalAxisType(state);
  if (axisType === "yAxis") {
    return selectYAxisIdFromGraphicalItemId(state, graphicalItemId);
  }
  return selectXAxisIdFromGraphicalItemId(state, graphicalItemId);
};
var selectNumericalAxisStackGroups = (state, graphicalItemId, isPanorama) => selectStackGroups(state, selectNumericalAxisType(state), selectNumericalAxisIdFromGraphicalItemId(state, graphicalItemId), isPanorama);
var selectGraphicalItemStackedData = createSelector([selectSynchronisedAreaSettings, selectNumericalAxisStackGroups], (areaSettings, stackGroups) => {
  var _stackGroups$stackId;
  if (areaSettings == null || stackGroups == null) {
    return void 0;
  }
  var {
    stackId
  } = areaSettings;
  var stackSeriesIdentifier = getStackSeriesIdentifier(areaSettings);
  if (stackId == null || stackSeriesIdentifier == null) {
    return void 0;
  }
  var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
  var found = groups === null || groups === void 0 ? void 0 : groups.find((v) => v.key === stackSeriesIdentifier);
  if (found == null) {
    return void 0;
  }
  return found.map((item) => [item[0], item[1]]);
});
var selectArea = createSelector([selectChartLayout, selectXAxisWithScale, selectYAxisWithScale, selectXAxisTicks, selectYAxisTicks, selectGraphicalItemStackedData, selectChartDataWithIndexesIfNotInPanoramaPosition3, selectBandSize, selectSynchronisedAreaSettings, selectChartBaseValue], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref, bandSize, areaSettings, chartBaseValue) => {
  var {
    chartData,
    dataStartIndex,
    dataEndIndex
  } = _ref;
  if (areaSettings == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) {
    return void 0;
  }
  var {
    data
  } = areaSettings;
  var displayedData;
  if (data && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeArea({
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataStartIndex,
    areaSettings,
    stackedData,
    displayedData,
    chartBaseValue,
    bandSize
  });
});
var _excluded = ["id"], _excluded2 = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getLegendItemColor(stroke, fill) {
  return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props) => {
  var {
    dataKey,
    name,
    stroke,
    fill,
    legendType,
    hide
  } = props;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: getLegendItemColor(stroke, fill),
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
var SetAreaTooltipEntrySettings = /* @__PURE__ */ React.memo((_ref) => {
  var {
    dataKey,
    data,
    stroke,
    strokeWidth,
    fill,
    name,
    hide,
    unit,
    tooltipType,
    id
  } = _ref;
  var tooltipEntrySettings = {
    dataDefinedOnItem: data,
    getPosition: noop,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: getLegendItemColor(stroke, fill),
      unit,
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ React.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
function AreaDotsWrapper(_ref2) {
  var {
    clipPathId,
    points,
    props
  } = _ref2;
  var {
    needClip,
    dot,
    dataKey
  } = props;
  var areaProps = svgPropertiesNoEvents(props);
  return /* @__PURE__ */ React.createElement(Dots, {
    points,
    dot,
    className: "recharts-area-dots",
    dotClassName: "recharts-area-dot",
    dataKey,
    baseProps: areaProps,
    needClip,
    clipPathId
  });
}
function AreaLabelListProvider(_ref3) {
  var {
    showLabels,
    children,
    points
  } = _ref3;
  var labelListEntries = points.map((point) => {
    var _point$x, _point$y;
    var viewBox = {
      x: (_point$x = point.x) !== null && _point$x !== void 0 ? _point$x : 0,
      y: (_point$y = point.y) !== null && _point$y !== void 0 ? _point$y : 0,
      width: 0,
      lowerWidth: 0,
      upperWidth: 0,
      height: 0
    };
    return _objectSpread(_objectSpread({}, viewBox), {}, {
      value: point.value,
      payload: point.payload,
      parentViewBox: void 0,
      viewBox,
      fill: void 0
    });
  });
  return /* @__PURE__ */ React.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function StaticArea(_ref4) {
  var {
    points,
    baseLine,
    needClip,
    clipPathId,
    props
  } = _ref4;
  var {
    layout,
    type,
    stroke,
    connectNulls,
    isRange
  } = props;
  var {
    id
  } = props, propsWithoutId = _objectWithoutProperties(props, _excluded);
  var allOtherProps = svgPropertiesNoEvents(propsWithoutId);
  var propsWithEvents = svgPropertiesAndEvents(propsWithoutId);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ React.createElement(Layer, {
    clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
  }, /* @__PURE__ */ React.createElement(Curve, _extends({}, propsWithEvents, {
    id,
    points,
    connectNulls,
    type,
    baseLine,
    layout,
    stroke: "none",
    className: "recharts-area-area"
  })), stroke !== "none" && /* @__PURE__ */ React.createElement(Curve, _extends({}, allOtherProps, {
    className: "recharts-area-curve",
    layout,
    type,
    connectNulls,
    fill: "none",
    points
  })), stroke !== "none" && isRange && Array.isArray(baseLine) && /* @__PURE__ */ React.createElement(Curve, _extends({}, allOtherProps, {
    className: "recharts-area-curve",
    layout,
    type,
    connectNulls,
    fill: "none",
    points: baseLine
  }))), /* @__PURE__ */ React.createElement(AreaDotsWrapper, {
    points,
    props: propsWithoutId,
    clipPathId
  }));
}
function VerticalRect(_ref5) {
  var _points$, _points;
  var {
    alpha,
    baseLine,
    points,
    strokeWidth
  } = _ref5;
  var startY = (_points$ = points[0]) === null || _points$ === void 0 ? void 0 : _points$.y;
  var endY = (_points = points[points.length - 1]) === null || _points === void 0 ? void 0 : _points.y;
  if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) {
    return null;
  }
  var height = alpha * Math.abs(startY - endY);
  var maxX = Math.max(...points.map((entry) => entry.x || 0));
  if (isNumber(baseLine)) {
    maxX = Math.max(baseLine, maxX);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxX = Math.max(...baseLine.map((entry) => entry.x || 0), maxX);
  }
  if (isNumber(maxX)) {
    return /* @__PURE__ */ React.createElement("rect", {
      x: 0,
      y: startY < endY ? startY : startY - height,
      width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
      height: Math.floor(height)
    });
  }
  return null;
}
function HorizontalRect(_ref6) {
  var _points$2, _points2;
  var {
    alpha,
    baseLine,
    points,
    strokeWidth
  } = _ref6;
  var startX = (_points$2 = points[0]) === null || _points$2 === void 0 ? void 0 : _points$2.x;
  var endX = (_points2 = points[points.length - 1]) === null || _points2 === void 0 ? void 0 : _points2.x;
  if (!isWellBehavedNumber(startX) || !isWellBehavedNumber(endX)) {
    return null;
  }
  var width = alpha * Math.abs(startX - endX);
  var maxY = Math.max(...points.map((entry) => entry.y || 0));
  if (isNumber(baseLine)) {
    maxY = Math.max(baseLine, maxY);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxY = Math.max(...baseLine.map((entry) => entry.y || 0), maxY);
  }
  if (isNumber(maxY)) {
    return /* @__PURE__ */ React.createElement("rect", {
      x: startX < endX ? startX : startX - width,
      y: 0,
      width,
      height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
    });
  }
  return null;
}
function ClipRect(_ref7) {
  var {
    alpha,
    layout,
    points,
    baseLine,
    strokeWidth
  } = _ref7;
  if (layout === "vertical") {
    return /* @__PURE__ */ React.createElement(VerticalRect, {
      alpha,
      points,
      baseLine,
      strokeWidth
    });
  }
  return /* @__PURE__ */ React.createElement(HorizontalRect, {
    alpha,
    points,
    baseLine,
    strokeWidth
  });
}
function AreaWithAnimation(_ref8) {
  var {
    needClip,
    clipPathId,
    props,
    previousPointsRef,
    previousBaselineRef
  } = _ref8;
  var {
    points,
    baseLine,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart,
    onAnimationEnd
  } = props;
  var animationInput = useMemo(() => ({
    points,
    baseLine
  }), [points, baseLine]);
  var animationId = useAnimationId(animationInput, "recharts-area-");
  var layout = useCartesianChartLayout();
  var [isAnimating, setIsAnimating] = useState(false);
  var showLabels = !isAnimating;
  var handleAnimationEnd = useCallback(() => {
    if (typeof onAnimationEnd === "function") {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  var handleAnimationStart = useCallback(() => {
    if (typeof onAnimationStart === "function") {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  if (layout == null) {
    return null;
  }
  var prevPoints = previousPointsRef.current;
  var prevBaseLine = previousBaselineRef.current;
  return /* @__PURE__ */ React.createElement(AreaLabelListProvider, {
    showLabels,
    points
  }, props.children, /* @__PURE__ */ React.createElement(JavascriptAnimate, {
    animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    key: animationId
  }, (t) => {
    if (prevPoints) {
      var prevPointsDiffFactor = prevPoints.length / points.length;
      var stepPoints = (
        /*
         * Here it is important that at the very end of the animation, on the last frame,
         * we render the original points without any interpolation.
         * This is needed because the code above is checking for reference equality to decide if the animation should run
         * and if we create a new array instance (even if the numbers were the same)
         * then we would break animations.
         */
        t === 1 ? points : points.map((entry, index) => {
          var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
          if (prevPoints[prevPointIndex]) {
            var prev = prevPoints[prevPointIndex];
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: interpolate(prev.x, entry.x, t),
              y: interpolate(prev.y, entry.y, t)
            });
          }
          return entry;
        })
      );
      var stepBaseLine;
      if (isNumber(baseLine)) {
        stepBaseLine = interpolate(prevBaseLine, baseLine, t);
      } else if (isNullish(baseLine) || isNan(baseLine)) {
        stepBaseLine = interpolate(prevBaseLine, 0, t);
      } else {
        stepBaseLine = baseLine.map((entry, index) => {
          var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
          if (Array.isArray(prevBaseLine) && prevBaseLine[prevPointIndex]) {
            var prev = prevBaseLine[prevPointIndex];
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: interpolate(prev.x, entry.x, t),
              y: interpolate(prev.y, entry.y, t)
            });
          }
          return entry;
        });
      }
      if (t > 0) {
        previousPointsRef.current = stepPoints;
        previousBaselineRef.current = stepBaseLine;
      }
      return /* @__PURE__ */ React.createElement(StaticArea, {
        points: stepPoints,
        baseLine: stepBaseLine,
        needClip,
        clipPathId,
        props
      });
    }
    if (t > 0) {
      previousPointsRef.current = points;
      previousBaselineRef.current = baseLine;
    }
    return /* @__PURE__ */ React.createElement(Layer, null, isAnimationActive && /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
      id: "animationClipPath-".concat(clipPathId)
    }, /* @__PURE__ */ React.createElement(ClipRect, {
      alpha: t,
      points,
      baseLine,
      layout,
      strokeWidth: props.strokeWidth
    }))), /* @__PURE__ */ React.createElement(Layer, {
      clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
    }, /* @__PURE__ */ React.createElement(StaticArea, {
      points,
      baseLine,
      needClip,
      clipPathId,
      props
    })));
  }), /* @__PURE__ */ React.createElement(LabelListFromLabelProp, {
    label: props.label
  }));
}
function RenderArea(_ref9) {
  var {
    needClip,
    clipPathId,
    props
  } = _ref9;
  var previousPointsRef = useRef(null);
  var previousBaselineRef = useRef();
  return /* @__PURE__ */ React.createElement(AreaWithAnimation, {
    needClip,
    clipPathId,
    props,
    previousPointsRef,
    previousBaselineRef
  });
}
class AreaWithState extends PureComponent {
  render() {
    var {
      hide,
      dot,
      points,
      className,
      top,
      left,
      needClip,
      xAxisId,
      yAxisId,
      width,
      height,
      id,
      baseLine,
      zIndex
    } = this.props;
    if (hide) {
      return null;
    }
    var layerClass = clsx("recharts-area", className);
    var clipPathId = id;
    var {
      r,
      strokeWidth
    } = getRadiusAndStrokeWidthFromDot(dot);
    var clipDot = isClipDot(dot);
    var dotSize = r * 2 + strokeWidth;
    var activePointsClipPath = needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0;
    return /* @__PURE__ */ React.createElement(ZIndexLayer, {
      zIndex
    }, /* @__PURE__ */ React.createElement(Layer, {
      className: layerClass
    }, needClip && /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    }), !clipDot && /* @__PURE__ */ React.createElement("clipPath", {
      id: "clipPath-dots-".concat(clipPathId)
    }, /* @__PURE__ */ React.createElement("rect", {
      x: left - dotSize / 2,
      y: top - dotSize / 2,
      width: width + dotSize,
      height: height + dotSize
    }))), /* @__PURE__ */ React.createElement(RenderArea, {
      needClip,
      clipPathId,
      props: this.props
    })), /* @__PURE__ */ React.createElement(ActivePoints, {
      points,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: activePointsClipPath
    }), this.props.isRange && Array.isArray(baseLine) && /* @__PURE__ */ React.createElement(ActivePoints, {
      points: baseLine,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot,
      clipPath: activePointsClipPath
    }));
  }
}
var defaultAreaProps = {
  activeDot: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: false,
  dot: false,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: false,
  isAnimationActive: "auto",
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  type: "linear",
  label: false,
  xAxisId: 0,
  yAxisId: 0,
  zIndex: DefaultZIndexes.area
};
function AreaImpl(props) {
  var _useAppSelector;
  var {
    activeDot,
    animationBegin,
    animationDuration,
    animationEasing,
    connectNulls,
    dot,
    fill,
    fillOpacity,
    hide,
    isAnimationActive,
    legendType,
    stroke,
    xAxisId,
    yAxisId
  } = props, everythingElse = _objectWithoutProperties(props, _excluded2);
  var layout = useChartLayout();
  var chartName = useChartName();
  var {
    needClip
  } = useNeedsClip(xAxisId, yAxisId);
  var isPanorama = useIsPanorama();
  var {
    points,
    isRange,
    baseLine
  } = (_useAppSelector = useAppSelector((state) => selectArea(state, props.id, isPanorama))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
  var plotArea = usePlotArea();
  if (layout !== "horizontal" && layout !== "vertical" || plotArea == null) {
    return null;
  }
  if (chartName !== "AreaChart" && chartName !== "ComposedChart") {
    return null;
  }
  var {
    height,
    width,
    x: left,
    y: top
  } = plotArea;
  if (!points || !points.length) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(AreaWithState, _extends({}, everythingElse, {
    activeDot,
    animationBegin,
    animationDuration,
    animationEasing,
    baseLine,
    connectNulls,
    dot,
    fill,
    fillOpacity,
    height,
    hide,
    layout,
    isAnimationActive,
    isRange,
    legendType,
    needClip,
    points,
    stroke,
    width,
    left,
    top,
    xAxisId,
    yAxisId
  }));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis) => {
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue)) {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
};
function computeArea(_ref0) {
  var {
    areaSettings: {
      connectNulls,
      baseValue: itemBaseValue,
      dataKey
    },
    stackedData,
    layout,
    chartBaseValue,
    xAxis,
    yAxis,
    displayedData,
    dataStartIndex,
    xAxisTicks,
    yAxisTicks,
    bandSize
  } = _ref0;
  var hasStack = stackedData && stackedData.length;
  var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map((entry, index) => {
    var _valueAsArray$, _valueAsArray, _xAxis$scale$map;
    var valueAsArray;
    if (hasStack) {
      valueAsArray = stackedData[dataStartIndex + index];
    } else {
      var rawValue = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(rawValue)) {
        valueAsArray = [baseValue, rawValue];
      } else {
        valueAsArray = rawValue;
        isRange = true;
      }
    }
    var value1 = (_valueAsArray$ = (_valueAsArray = valueAsArray) === null || _valueAsArray === void 0 ? void 0 : _valueAsArray[1]) !== null && _valueAsArray$ !== void 0 ? _valueAsArray$ : null;
    var isBreakPoint = value1 == null || hasStack && !connectNulls && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      var _yAxis$scale$map;
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : (_yAxis$scale$map = yAxis.scale.map(value1)) !== null && _yAxis$scale$map !== void 0 ? _yAxis$scale$map : null,
        value: valueAsArray,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : (_xAxis$scale$map = xAxis.scale.map(value1)) !== null && _xAxis$scale$map !== void 0 ? _xAxis$scale$map : null,
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value: valueAsArray,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map((entry) => {
      var _xAxis$scale$map2;
      var x = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        var _yAxis$scale$map2;
        return {
          x: entry.x,
          y: x != null && entry.y != null ? (_yAxis$scale$map2 = yAxis.scale.map(x)) !== null && _yAxis$scale$map2 !== void 0 ? _yAxis$scale$map2 : null : null,
          payload: entry.payload
        };
      }
      return {
        x: x != null ? (_xAxis$scale$map2 = xAxis.scale.map(x)) !== null && _xAxis$scale$map2 !== void 0 ? _xAxis$scale$map2 : null : null,
        y: entry.y,
        payload: entry.payload
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale.map(baseValue) : xAxis.scale.map(baseValue);
  }
  return {
    points,
    baseLine: baseLine !== null && baseLine !== void 0 ? baseLine : 0,
    isRange
  };
}
function AreaFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultAreaProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ React.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "area"
  }, (id) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromAreaData(props)
  }), /* @__PURE__ */ React.createElement(SetAreaTooltipEntrySettings, {
    dataKey: props.dataKey,
    data: props.data,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    unit: props.unit,
    tooltipType: props.tooltipType,
    id
  }), /* @__PURE__ */ React.createElement(SetCartesianGraphicalItem, {
    type: "area",
    id,
    data: props.data,
    dataKey: props.dataKey,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    stackId: getNormalizedStackId(props.stackId),
    hide: props.hide,
    barSize: void 0,
    baseValue: props.baseValue,
    isPanorama,
    connectNulls: props.connectNulls
  }), /* @__PURE__ */ React.createElement(AreaImpl, _extends({}, props, {
    id
  }))));
}
var Area = /* @__PURE__ */ React.memo(AreaFn, propsAreEqual);
Area.displayName = "Area";
var allowedTooltipTypes = ["axis"];
var AreaChart = /* @__PURE__ */ forwardRef((props, ref) => {
  return /* @__PURE__ */ React.createElement(CartesianChart, {
    chartName: "AreaChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
const THEMES = { light: "", dark: ".dark" };
const ChartContext = React.createContext(null);
function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsx(ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, config2]) => config2.theme || config2.color);
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltipContent = React.forwardRef(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart();
    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
      if (labelFormatter) {
        return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      }
      if (!value) {
        return null;
      }
      return /* @__PURE__ */ jsx("div", { className: cn("font-medium", labelClassName), children: value });
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
    if (!active || !payload?.length) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        ),
        children: [
          !nestLabel ? tooltipLabel : null,
          /* @__PURE__ */ jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                ),
                children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  itemConfig?.icon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: cn(
                        "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                        {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ jsxs("div", { className: "grid gap-1.5", children: [
                          nestLabel ? tooltipLabel : null,
                          /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                        ] }),
                        item.value && /* @__PURE__ */ jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              item.dataKey
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegendContent = React.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          item.value
        );
      })
    }
  );
});
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
function slugify(s) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").slice(0, 80);
}
function BlogTab() {
  const { toast } = useToast();
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("blog_posts").select("*").order("updated_at", { ascending: false });
    if (error) toast({ title: "Failed to load posts", description: error.message, variant: "destructive" });
    setPosts(data || []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const save = async () => {
    if (!editing?.title) return toast({ title: "Title required" });
    const slug = editing.slug || slugify(editing.title);
    const payload = {
      title: editing.title,
      slug,
      excerpt: editing.excerpt ?? null,
      body_markdown: editing.body_markdown ?? "",
      cover_url: editing.cover_url ?? null,
      status: editing.status ?? "draft",
      published_at: editing.status === "published" ? editing.published_at || (/* @__PURE__ */ new Date()).toISOString() : null
    };
    const { error } = editing.id ? await supabase.from("blog_posts").update(payload).eq("id", editing.id) : await supabase.from("blog_posts").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: editing.id ? "Post updated" : "Post created" });
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete this post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    toast({ title: "Deleted" });
    load();
  };
  if (editing) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Title",
          value: editing.title || "",
          onChange: (e) => setEditing({ ...editing, title: e.target.value })
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Slug (auto from title)",
          value: editing.slug || "",
          onChange: (e) => setEditing({ ...editing, slug: e.target.value })
        }
      ),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          placeholder: "Excerpt (short summary)",
          value: editing.excerpt || "",
          onChange: (e) => setEditing({ ...editing, excerpt: e.target.value }),
          rows: 2
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Cover image URL",
          value: editing.cover_url || "",
          onChange: (e) => setEditing({ ...editing, cover_url: e.target.value })
        }
      ),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          placeholder: "Body (Markdown supported)",
          value: editing.body_markdown || "",
          onChange: (e) => setEditing({ ...editing, body_markdown: e.target.value }),
          rows: 14,
          className: "font-mono text-sm"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["draft", "published", "archived"].map((s) => /* @__PURE__ */ jsx(
        Button,
        {
          size: "sm",
          variant: editing.status === s ? "default" : "outline",
          onClick: () => setEditing({ ...editing, status: s }),
          children: s
        },
        s
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsx(Button, { onClick: save, className: "flex-1", children: "Save" }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditing(null), children: "Cancel" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(Button, { onClick: () => setEditing({ status: "draft", body_markdown: "" }), className: "w-full", children: "+ New post" }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Loading…" }) : posts.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No posts yet." }) : posts.map((p) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl border border-border/60 p-3 space-y-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-sm truncate", children: p.title }),
        /* @__PURE__ */ jsx(Badge, { variant: p.status === "published" ? "default" : "secondary", children: p.status })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
        "/",
        p.slug
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-1", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => setEditing(p), children: "Edit" }),
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive", onClick: () => remove(p.id), children: "Delete" })
      ] })
    ] }, p.id))
  ] });
}
function ProvidersTab() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("providers").select("id,name,type,city,state,country,phone,verified,user_id").is("user_id", null).order("name");
    if (error) toast({ title: "Failed", description: error.message, variant: "destructive" });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const save = async () => {
    if (!editing?.name) return toast({ title: "Name required" });
    const payload = {
      name: editing.name,
      type: editing.type || "hospital",
      city: editing.city || null,
      state: editing.state || null,
      country: editing.country || "Nigeria",
      phone: editing.phone || null,
      verified: editing.verified ?? true,
      user_id: null
    };
    const { error } = editing.id ? await supabase.from("providers").update(payload).eq("id", editing.id) : await supabase.from("providers").insert(payload);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Saved" });
    setEditing(null);
    load();
  };
  const remove = async (id) => {
    if (!confirm("Delete provider?")) return;
    const { error } = await supabase.from("providers").delete().eq("id", id);
    if (error) return toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    load();
  };
  if (editing) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx(Input, { placeholder: "Name", value: editing.name || "", onChange: (e) => setEditing({ ...editing, name: e.target.value }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Type (hospital, clinic, doctor…)", value: editing.type || "", onChange: (e) => setEditing({ ...editing, type: e.target.value }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "City", value: editing.city || "", onChange: (e) => setEditing({ ...editing, city: e.target.value }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "State", value: editing.state || "", onChange: (e) => setEditing({ ...editing, state: e.target.value }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Country", value: editing.country || "Nigeria", onChange: (e) => setEditing({ ...editing, country: e.target.value }) }),
      /* @__PURE__ */ jsx(Input, { placeholder: "Phone", value: editing.phone || "", onChange: (e) => setEditing({ ...editing, phone: e.target.value }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsx(Button, { onClick: save, className: "flex-1", children: "Save" }),
        /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => setEditing(null), children: "Cancel" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(Button, { onClick: () => setEditing({ verified: true, country: "Nigeria", type: "hospital" }), className: "w-full", children: "+ New provider" }),
    loading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Loading…" }) : items.map((p) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl border border-border/60 p-3", children: [
      /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: p.name }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: [p.type, p.city, p.state].filter(Boolean).join(" · ") }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", onClick: () => setEditing(p), children: "Edit" }),
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive", onClick: () => remove(p.id), children: "Delete" })
      ] })
    ] }, p.id))
  ] });
}
function SuggestionsTab() {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from("provider_suggestions").select("*").eq("status", "pending").order("created_at", { ascending: false });
    setItems(data || []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  const approve = async (s) => {
    const { error: insErr } = await supabase.from("providers").insert({
      name: s.name,
      type: s.type || "hospital",
      city: s.city,
      state: s.state,
      country: s.country,
      phone: s.phone,
      email: s.email,
      website: s.website,
      verified: true,
      user_id: null
    });
    if (insErr) return toast({ title: "Approve failed", description: insErr.message, variant: "destructive" });
    await supabase.from("provider_suggestions").update({ status: "approved" }).eq("id", s.id);
    toast({ title: "Approved" });
    load();
  };
  const reject = async (id) => {
    await supabase.from("provider_suggestions").update({ status: "rejected" }).eq("id", id);
    load();
  };
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Loading…" });
  if (!items.length) return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No pending suggestions." });
  return /* @__PURE__ */ jsx("div", { className: "space-y-3", children: items.map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl border border-border/60 p-3", children: [
    /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: s.name }),
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: [s.type, s.city, s.state, s.country].filter(Boolean).join(" · ") }),
    s.phone && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: s.phone }),
    s.notes && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1", children: s.notes }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 pt-2", children: [
      /* @__PURE__ */ jsx(Button, { size: "sm", onClick: () => approve(s), children: "Approve" }),
      /* @__PURE__ */ jsx(Button, { size: "sm", variant: "ghost", className: "text-destructive", onClick: () => reject(s.id), children: "Reject" })
    ] })
  ] }, s.id)) });
}
function UsersTab() {
  useToast();
  const [users, setUsers] = useState([]);
  const [adminIds, setAdminIds] = useState(/* @__PURE__ */ new Set());
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    const [{ data: profs }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("user_id, full_name, created_at").order("created_at", { ascending: false }).limit(200),
      supabase.from("user_roles").select("user_id, role").eq("role", "admin")
    ]);
    setUsers(profs || []);
    setAdminIds(new Set((roles || []).map((r) => r.user_id)));
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);
  if (loading) return /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "Loading…" });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
      users.length,
      " users · ",
      adminIds.size,
      " admins"
    ] }),
    users.map((u) => /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-xl border border-border/60 p-3 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium truncate", children: u.full_name || "Unnamed" }),
        /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground truncate", children: u.user_id })
      ] }),
      adminIds.has(u.user_id) ? /* @__PURE__ */ jsx(Badge, { children: "admin" }) : /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "user" })
    ] }, u.user_id)),
    /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground pt-2", children: "Role changes require backend access — contact dev." })
  ] });
}
function DashboardTab() {
  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    crises: 0,
    meds: 0,
    providers: 0,
    userGrowth: [],
    activityData: [],
    recentActivity: [],
    regionalData: []
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const [u, p, c, m, pr, recentUsers, recentPosts] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("blog_posts").select("*", { count: "exact", head: true }),
        supabase.from("crisis_logs").select("*", { count: "exact", head: true }),
        supabase.from("medications").select("*", { count: "exact", head: true }),
        supabase.from("providers").select("*", { count: "exact", head: true }).is("user_id", null),
        supabase.from("profiles").select("full_name, created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("blog_posts").select("title, status, updated_at").order("updated_at", { ascending: false }).limit(5)
      ]);
      const growthData = [
        { name: "Jan", users: 12, crisis: 45, meds: 88, spark: [10, 15, 12, 18, 22] },
        { name: "Feb", users: 18, crisis: 52, meds: 104, spark: [18, 22, 20, 25, 28] },
        { name: "Mar", users: 25, crisis: 61, meds: 132, spark: [25, 28, 26, 32, 35] },
        { name: "Apr", users: 32, crisis: 58, meds: 156, spark: [32, 35, 30, 38, 42] },
        { name: "May", users: 45, crisis: 85, meds: 198, spark: [45, 48, 42, 52, 55] },
        { name: "Jun", users: 54, crisis: 92, meds: 245, spark: [54, 58, 52, 62, 65] }
      ];
      const regionalDistribution = [
        { state: "Lagos", count: 124 },
        { state: "Abuja", count: 86 },
        { state: "Kano", count: 42 },
        { state: "Rivers", count: 38 },
        { state: "Oyo", count: 32 }
      ];
      setStats({
        users: u.count ?? 0,
        posts: p.count ?? 0,
        crises: c.count ?? 0,
        meds: m.count ?? 0,
        providers: pr.count ?? 0,
        userGrowth: growthData,
        activityData: [],
        regionalData: regionalDistribution,
        recentActivity: [
          ...recentUsers?.data?.map((u2) => ({ type: "user", label: "New user joined", name: u2.full_name, date: u2.created_at, status: "completed" })) || [],
          ...recentPosts?.data?.map((p2) => ({ type: "post", label: "Blog updated", name: p2.title, date: p2.updated_at, status: "synced" })) || []
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8)
      });
      setLoading(false);
    })();
  }, []);
  const kpis = [
    { label: "Community Size", value: stats.users, icon: Users, color: "text-primary", bg: "bg-primary/5", trend: "+12.5%", sub: "Active members" },
    { label: "Knowledge Base", value: stats.posts, icon: FileText, color: "text-accent", bg: "bg-accent/5", trend: "+4", sub: "Published entries" },
    { label: "Crisis Response", value: stats.crises, icon: TriangleAlert, color: "text-amber-600", bg: "bg-amber-500/5", trend: "Alerting", sub: "Logs recorded" },
    { label: "Med Adherence", value: stats.meds, icon: Pill, color: "text-blue-600", bg: "bg-blue-500/5", trend: "Stable", sub: "Units tracked" },
    { label: "Health Network", value: stats.providers, icon: Building2, color: "text-emerald-600", bg: "bg-emerald-500/5", trend: "Verified", sub: "Resource nodes" }
  ];
  if (loading) return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(Card, { className: "h-40 animate-pulse bg-muted/20 border-none shadow-none" }, i)) });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4", children: kpis.map((kpi) => /* @__PURE__ */ jsx(Card, { className: "border-none shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] bg-card overflow-hidden group hover:scale-[1.02] transition-all duration-300", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: `p-2.5 rounded-xl ${kpi.bg}`, children: /* @__PURE__ */ jsx(kpi.icon, { className: `w-5 h-5 ${kpi.color}` }) }),
        /* @__PURE__ */ jsx(Badge, { variant: "outline", className: "text-[9px] font-bold border-none bg-muted/50 uppercase tracking-[0.15em] px-2.5 py-0.5", children: kpi.trend })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold tracking-tight text-foreground", children: kpi.value.toLocaleString() }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground font-bold uppercase tracking-[1px]", children: kpi.label }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground/60 italic", children: kpi.sub })
      ] })
    ] }) }, kpi.label)) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 border-none shadow-sm bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-6 border-b border-border/40 bg-muted/5", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-serif", children: "Community Vitality" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Engagement trends across users and healthcare resources" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex bg-muted/50 p-1 rounded-xl", children: ["Daily", "Weekly", "Monthly"].map((t) => /* @__PURE__ */ jsx(Button, { variant: t === "Monthly" ? "default" : "ghost", size: "sm", className: "h-7 text-[9px] font-bold uppercase tracking-widest px-4 rounded-lg", children: t }, t)) })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-[400px] pt-10 px-2", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: stats.userGrowth, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            /* @__PURE__ */ jsxs("linearGradient", { id: "colorUsers", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "hsl(var(--primary))", stopOpacity: 0.2 }),
              /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "hsl(var(--primary))", stopOpacity: 0 })
            ] }),
            /* @__PURE__ */ jsxs("linearGradient", { id: "colorMeds", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: "hsl(var(--accent))", stopOpacity: 0.2 }),
              /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: "hsl(var(--accent))", stopOpacity: 0 })
            ] })
          ] }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "hsl(var(--border) / 0.4)" }),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "name",
              axisLine: false,
              tickLine: false,
              tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 700 },
              dy: 10
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              axisLine: false,
              tickLine: false,
              tick: { fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 700 }
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              content: /* @__PURE__ */ jsx(ChartTooltipContent, { indicator: "dot" }),
              cursor: { stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "4 4" }
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              type: "monotone",
              dataKey: "users",
              stroke: "hsl(var(--primary))",
              strokeWidth: 3,
              fillOpacity: 1,
              fill: "url(#colorUsers)"
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              type: "monotone",
              dataKey: "meds",
              stroke: "hsl(var(--accent))",
              strokeWidth: 3,
              fillOpacity: 1,
              fill: "url(#colorMeds)"
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-6 border-b border-border/40 bg-muted/5", children: [
          /* @__PURE__ */ jsx(CardTitle, { className: "text-xl font-serif", children: "Regional Reach" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Provider density by location" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { className: "h-[400px] pt-10", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: stats.regionalData, layout: "vertical", margin: { left: -20, right: 30 }, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", horizontal: false, stroke: "hsl(var(--border) / 0.4)" }),
          /* @__PURE__ */ jsx(XAxis, { type: "number", hide: true }),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              dataKey: "state",
              type: "category",
              axisLine: false,
              tickLine: false,
              tick: { fontSize: 11, fill: "hsl(var(--foreground))", fontWeight: 600 }
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              cursor: { fill: "hsl(var(--muted) / 0.3)" },
              contentStyle: { borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }
            }
          ),
          /* @__PURE__ */ jsx(
            Bar,
            {
              dataKey: "count",
              radius: [0, 4, 4, 0],
              barSize: 20,
              children: stats.regionalData.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: index % 2 === 0 ? "hsl(var(--primary))" : "hsl(var(--secondary))" }, `cell-${index}`))
            }
          )
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 border-none shadow-sm bg-card overflow-hidden", children: [
        /* @__PURE__ */ jsx(CardHeader, { className: "pb-4 border-b border-border/40", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { className: "text-lg font-serif", children: "Live Operations" }),
            /* @__PURE__ */ jsx(CardDescription, { children: "Real-time audit of platform interactions" })
          ] }),
          /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1.5 font-bold", children: [
            /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" }),
            "Live Stream"
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsx("div", { className: "divide-y divide-border/30", children: stats.recentActivity.map((act, i) => /* @__PURE__ */ jsx("div", { className: "px-6 py-4 hover:bg-muted/10 transition-all group cursor-default", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx("div", { className: `w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.type === "user" ? "bg-primary/10" : "bg-accent/10"}`, children: act.type === "user" ? /* @__PURE__ */ jsx(UserPlus, { className: "w-5 h-5 text-primary" }) : /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-accent" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-0.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-foreground truncate", children: act.name || "System" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-muted-foreground uppercase tracking-widest", children: act.status })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: act.label })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right shrink-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold text-foreground mb-0.5", children: new Date(act.date).toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" }) }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground", children: new Date(act.date).toLocaleDateString(void 0, { month: "short", day: "numeric" }) })
          ] })
        ] }) }, i)) }) }),
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-muted/5 text-center", children: /* @__PURE__ */ jsxs(Button, { variant: "link", className: "text-[10px] font-bold uppercase tracking-[2px] text-primary h-auto p-0", children: [
          "Access Full Archive ",
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-3 h-3 ml-1" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm bg-secondary text-secondary-foreground p-6 rounded-3xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center", children: /* @__PURE__ */ jsx(Activity, { className: "w-6 h-6 text-primary animate-pulse" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] font-bold uppercase tracking-[2px] opacity-60", children: "System Status" }),
              /* @__PURE__ */ jsx("h3", { className: "font-serif text-lg italic", children: "Operating Optimally" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [
            { label: "Database Latency", value: "42ms", status: "Healthy" },
            { label: "Uptime (30d)", value: "99.98%", status: "Stable" },
            { label: "Sync Status", value: "Complete", status: "Healthy" }
          ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2 border-b border-white/5 last:border-0", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest opacity-60", children: item.label }),
            /* @__PURE__ */ jsx("div", { className: "text-right", children: /* @__PURE__ */ jsx("p", { className: "text-xs font-bold", children: item.value }) })
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "border-none shadow-sm bg-card p-6 rounded-3xl border border-border/40", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[10px] font-bold uppercase tracking-[2px] text-muted-foreground mb-4", children: "Quick Actions" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: [
            { label: "Broadcast", icon: TriangleAlert, bg: "bg-amber-500/10", text: "text-amber-600" },
            { label: "Sync API", icon: Clock, bg: "bg-blue-500/10", text: "text-blue-600" },
            { label: "User Report", icon: Users, bg: "bg-emerald-500/10", text: "text-emerald-600" },
            { label: "Export Data", icon: ArrowUpRight, bg: "bg-muted", text: "text-foreground" }
          ].map((action) => /* @__PURE__ */ jsxs(Button, { variant: "outline", className: `h-auto py-4 flex flex-col gap-2 rounded-2xl border-none ${action.bg} hover:brightness-95 transition-all`, children: [
            /* @__PURE__ */ jsx(action.icon, { className: `w-5 h-5 ${action.text}` }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest", children: action.label })
          ] }, action.label)) })
        ] })
      ] })
    ] })
  ] });
}
function AdminPage() {
  const { isAdmin, loading } = useIsAdmin();
  const [, setLocation] = useLocation();
  if (loading) return /* @__PURE__ */ jsx(HemoraLoader, {});
  if (!isAdmin) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md space-y-6", children: [
      /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsx(Shield, { className: "w-10 h-10 text-primary" }) }),
      /* @__PURE__ */ jsx("h1", { className: "h-display", children: "Restricted Area" }),
      /* @__PURE__ */ jsx("p", { className: "body-md", children: "You do not have the necessary privileges to access the Hemora Admin Console. If you believe this is an error, contact your system administrator." }),
      /* @__PURE__ */ jsx(Button, { className: "rounded-full px-8 hover-elevate", onClick: () => setLocation("/dashboard"), children: "Return to Dashboard" })
    ] }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background w-full", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto pt-12 pb-24 px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-widest text-primary mb-2 block", children: "System Console" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl md:text-5xl font-serif tracking-tight", children: "Admin Dashboard" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "rounded-full px-5 hover:shadow-md transition-all", onClick: () => window.location.reload(), children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 mr-2" }),
          " Refresh"
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", className: "rounded-full px-5 shadow-sm hover:shadow-md transition-all", children: [
          /* @__PURE__ */ jsx(ArrowUpRight, { className: "w-4 h-4 mr-2" }),
          " Export Logs"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "dashboard", className: "space-y-8", children: [
      /* @__PURE__ */ jsx("div", { className: "sticky top-0 z-40 bg-background/80 backdrop-blur-md py-4 border-b border-border/40", children: /* @__PURE__ */ jsxs(TabsList, { className: "bg-muted/40 p-1.5 rounded-2xl h-auto flex flex-wrap sm:inline-flex overflow-x-auto max-w-full justify-start", children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "dashboard", className: "rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap", children: "Overview" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "blog", className: "rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap", children: "Blog" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "prov", className: "rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap", children: "Providers" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "sugg", className: "rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap", children: "Suggestions" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "users", className: "rounded-xl px-6 py-2.5 data-[state=active]:bg-card data-[state=active]:shadow-md font-bold uppercase text-[10px] tracking-widest transition-all whitespace-nowrap", children: "Users" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
        /* @__PURE__ */ jsx(TabsContent, { value: "dashboard", className: "outline-none focus:ring-0 animate-in fade-in duration-500", children: /* @__PURE__ */ jsx(DashboardTab, {}) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "blog", className: "outline-none focus:ring-0 animate-in fade-in duration-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsx(BlogTab, {}) }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "prov", className: "outline-none focus:ring-0 animate-in fade-in duration-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsx(ProvidersTab, {}) }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "sugg", className: "outline-none focus:ring-0 animate-in fade-in duration-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsx(SuggestionsTab, {}) }) }),
        /* @__PURE__ */ jsx(TabsContent, { value: "users", className: "outline-none focus:ring-0 animate-in fade-in duration-500", children: /* @__PURE__ */ jsx("div", { className: "max-w-5xl mx-auto", children: /* @__PURE__ */ jsx(UsersTab, {}) }) })
      ] })
    ] })
  ] }) });
}
export {
  AdminPage as default
};
