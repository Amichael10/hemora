import * as React from "react";
import { isValidElement, forwardRef, createContext, useContext, useMemo, useState, useCallback, useRef, useImperativeHandle, useEffect, useLayoutEffect, cloneElement, createElement, Children, memo } from "react";
import { createPortal } from "react-dom";
import sortBy$1 from "es-toolkit/compat/sortBy";
import { clsx } from "clsx";
import uniqBy from "es-toolkit/compat/uniqBy";
import get from "es-toolkit/compat/get";
import { isFragment } from "react-is";
import isPlainObject from "es-toolkit/compat/isPlainObject";
import { symbol, symbolWye, symbolTriangle, symbolStar, symbolSquare, symbolDiamond, symbolCross, symbolCircle, stack, stackOrderNone, stackOffsetNone, stackOffsetWiggle, stackOffsetSilhouette, stackOffsetExpand, area, line, curveStepBefore, curveStepAfter, curveStep, curveNatural, curveMonotoneY, curveMonotoneX, curveLinear, curveLinearClosed, curveBumpY, curveBumpX, curveBasis, curveBasisOpen, curveBasisClosed } from "victory-vendor/d3-shape";
import { shallowEqual, Provider } from "react-redux";
import { createSlice, prepareAutoBatched, current, createListenerMiddleware, createAction, configureStore, autoBatchEnhancer, combineReducers } from "@reduxjs/toolkit";
import { castDraft } from "immer";
import { useSyncExternalStoreWithSelector } from "use-sync-external-store/shim/with-selector";
import { createSelector } from "reselect";
import throttle from "es-toolkit/compat/throttle";
import range from "es-toolkit/compat/range";
import * as d3Scales from "victory-vendor/d3-scale";
import Decimal from "decimal.js-light";
import EventEmitter from "eventemitter3";
var EventKeys = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function isEventKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  var allowedEventKeys = EventKeys;
  return allowedEventKeys.includes(key);
}
var SVGElementPropKeys = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
];
var SVGElementPropKeySet = new Set(SVGElementPropKeys);
function isSvgElementPropKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  return SVGElementPropKeySet.has(key);
}
function isDataAttribute(key) {
  return typeof key === "string" && key.startsWith("data-");
}
function svgPropertiesNoEvents(obj) {
  if (typeof obj !== "object" || obj === null) {
    return {};
  }
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isSvgElementPropKey(key) || isDataAttribute(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
function svgPropertiesNoEventsFromUnknown(input) {
  if (input == null) {
    return null;
  }
  if (/* @__PURE__ */ isValidElement(input) && typeof input.props === "object" && input.props !== null) {
    var p = input.props;
    return svgPropertiesNoEvents(p);
  }
  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesNoEvents(input);
  }
  return null;
}
function svgPropertiesAndEvents(obj) {
  var result = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (isSvgElementPropKey(key) || isDataAttribute(key) || isEventKey(key)) {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
function svgPropertiesAndEventsFromUnknown(input) {
  if (input == null) {
    return null;
  }
  if (/* @__PURE__ */ isValidElement(input)) {
    return svgPropertiesAndEvents(input.props);
  }
  if (typeof input === "object" && !Array.isArray(input)) {
    return svgPropertiesAndEvents(input);
  }
  return null;
}
var _excluded$b = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function _extends$f() {
  return _extends$f = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$f.apply(null, arguments);
}
function _objectWithoutProperties$b(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$b(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$b(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Surface = /* @__PURE__ */ forwardRef((props, ref) => {
  var {
    children,
    width,
    height,
    viewBox,
    className,
    style,
    title,
    desc
  } = props, others = _objectWithoutProperties$b(props, _excluded$b);
  var svgView = viewBox || {
    width,
    height,
    x: 0,
    y: 0
  };
  var layerClass = clsx("recharts-surface", className);
  return /* @__PURE__ */ React.createElement("svg", _extends$f({}, svgPropertiesAndEvents(others), {
    className: layerClass,
    width,
    height,
    style,
    viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
    ref
  }), /* @__PURE__ */ React.createElement("title", null, title), /* @__PURE__ */ React.createElement("desc", null, desc), children);
});
var _excluded$a = ["children", "className"];
function _extends$e() {
  return _extends$e = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$e.apply(null, arguments);
}
function _objectWithoutProperties$a(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$a(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$a(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var Layer = /* @__PURE__ */ React.forwardRef((props, ref) => {
  var {
    children,
    className
  } = props, others = _objectWithoutProperties$a(props, _excluded$a);
  var layerClass = clsx("recharts-layer", className);
  return /* @__PURE__ */ React.createElement("g", _extends$e({
    className: layerClass
  }, svgPropertiesAndEvents(others), {
    ref
  }), children);
});
var LegendPortalContext = /* @__PURE__ */ createContext(null);
var defaultRoundPrecision = 4;
function round(num) {
  var roundPrecision = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultRoundPrecision;
  var factor = 10 ** roundPrecision;
  var rounded = Math.round(num * factor) / factor;
  if (Object.is(rounded, -0)) {
    return 0;
  }
  return rounded;
}
function roundTemplateLiteral(strings) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  return strings.reduce((result, string, i) => {
    var value = values[i - 1];
    if (typeof value === "string") {
      return result + value + string;
    }
    if (value !== void 0) {
      return result + round(value) + string;
    }
    return result + string;
  }, "");
}
var mathSign = (value) => {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }
  return -1;
};
var isNan = (value) => {
  return typeof value == "number" && value != +value;
};
var isPercent = (value) => typeof value === "string" && value.indexOf("%") === value.length - 1;
var isNumber = (value) => (typeof value === "number" || value instanceof Number) && !isNan(value);
var isNumOrStr = (value) => isNumber(value) || typeof value === "string";
var idCounter = 0;
var uniqueId = (prefix) => {
  var id = ++idCounter;
  return "".concat(prefix || "").concat(id);
};
var getPercentValue = function getPercentValue2(percent, totalValue) {
  var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (!isNumber(percent) && typeof percent !== "string") {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    if (totalValue == null) {
      return defaultValue;
    }
    var index = percent.indexOf("%");
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if (isNan(value)) {
    value = defaultValue;
  }
  if (validate && totalValue != null && value > totalValue) {
    value = totalValue;
  }
  return value;
};
var hasDuplicate = (ary) => {
  if (!Array.isArray(ary)) {
    return false;
  }
  var len = ary.length;
  var cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[String(ary[i])]) {
      cache[String(ary[i])] = true;
    } else {
      return true;
    }
  }
  return false;
};
function interpolate(start, end, t) {
  if (isNumber(start) && isNumber(end)) {
    return round(start + t * (end - start));
  }
  return end;
}
function findEntryInArray(ary, specifiedKey, specifiedValue) {
  if (!ary || !ary.length) {
    return void 0;
  }
  return ary.find((entry) => entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : get(entry, specifiedKey)) === specifiedValue);
}
var isNullish = (value) => {
  return value === null || typeof value === "undefined";
};
var upperFirst = (value) => {
  if (isNullish(value)) {
    return value;
  }
  return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
function isNotNil(value) {
  return value != null;
}
function noop$1() {
}
var _excluded$9 = ["type", "size", "sizeType"];
function _extends$d() {
  return _extends$d = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$d.apply(null, arguments);
}
function ownKeys$t(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$t(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$t(Object(t), true).forEach(function(r2) {
      _defineProperty$v(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$t(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$v(e, r, t) {
  return (r = _toPropertyKey$v(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$v(t) {
  var i = _toPrimitive$v(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$v(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$9(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$9(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$9(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var symbolFactories = {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
};
var RADIAN$1 = Math.PI / 180;
var getSymbolFactory = (type) => {
  var name = "symbol".concat(upperFirst(type));
  return symbolFactories[name] || symbolCircle;
};
var calculateAreaSize = (size, sizeType, type) => {
  if (sizeType === "area") {
    return size;
  }
  switch (type) {
    case "cross":
      return 5 * size * size / 9;
    case "diamond":
      return 0.5 * size * size / Math.sqrt(3);
    case "square":
      return size * size;
    case "star": {
      var angle = 18 * RADIAN$1;
      return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * size * size / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;
    default:
      return Math.PI * size * size / 4;
  }
};
var registerSymbol = (key, factory) => {
  symbolFactories["symbol".concat(upperFirst(key))] = factory;
};
var Symbols = (_ref2) => {
  var {
    type = "circle",
    size = 64,
    sizeType = "area"
  } = _ref2, rest = _objectWithoutProperties$9(_ref2, _excluded$9);
  var props = _objectSpread$t(_objectSpread$t({}, rest), {}, {
    type,
    size,
    sizeType
  });
  var realType = "circle";
  if (typeof type === "string") {
    realType = type;
  }
  var getPath2 = () => {
    var symbolFactory = getSymbolFactory(realType);
    var symbol$1 = symbol().type(symbolFactory).size(calculateAreaSize(size, sizeType, realType));
    var s = symbol$1();
    if (s === null) {
      return void 0;
    }
    return s;
  };
  var {
    className,
    cx,
    cy
  } = props;
  var filteredProps = svgPropertiesAndEvents(props);
  if (isNumber(cx) && isNumber(cy) && isNumber(size)) {
    return /* @__PURE__ */ React.createElement("path", _extends$d({}, filteredProps, {
      className: clsx("recharts-symbols", className),
      transform: "translate(".concat(cx, ", ").concat(cy, ")"),
      d: getPath2()
    }));
  }
  return null;
};
Symbols.registerSymbol = registerSymbol;
var isPolarCoordinate = (c) => {
  return "radius" in c && "startAngle" in c && "endAngle" in c;
};
var adaptEventHandlers = (props, newHandler) => {
  if (!props || typeof props === "function" || typeof props === "boolean") {
    return null;
  }
  var inputProps = props;
  if (/* @__PURE__ */ isValidElement(props)) {
    inputProps = props.props;
  }
  if (typeof inputProps !== "object" && typeof inputProps !== "function") {
    return null;
  }
  var out = {};
  Object.keys(inputProps).forEach((key) => {
    if (isEventKey(key) && typeof inputProps[key] === "function") {
      out[key] = ((e) => inputProps[key](inputProps, e));
    }
  });
  return out;
};
var getEventHandlerOfChild = (originalHandler, data, index) => (e) => {
  originalHandler(data, index, e);
  return null;
};
var adaptEventsOfChild = (props, data, index) => {
  if (props === null || typeof props !== "object" && typeof props !== "function") {
    return null;
  }
  var out = null;
  Object.keys(props).forEach((key) => {
    var item = props[key];
    if (isEventKey(key) && typeof item === "function") {
      if (!out) out = {};
      out[key] = getEventHandlerOfChild(item, data, index);
    }
  });
  return out;
};
function ownKeys$s(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$s(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$s(Object(t), true).forEach(function(r2) {
      _defineProperty$u(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$s(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$u(e, r, t) {
  return (r = _toPropertyKey$u(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$u(t) {
  var i = _toPrimitive$u(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$u(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function resolveDefaultProps(realProps, defaultProps) {
  var resolvedProps = _objectSpread$s({}, realProps);
  var dp = defaultProps;
  var keys = Object.keys(defaultProps);
  var withDefaults = keys.reduce((acc, key) => {
    if (acc[key] === void 0 && dp[key] !== void 0) {
      acc[key] = dp[key];
    }
    return acc;
  }, resolvedProps);
  return withDefaults;
}
function getUniqPayload(payload, option, defaultUniqBy2) {
  if (option === true) {
    return uniqBy(payload, defaultUniqBy2);
  }
  if (typeof option === "function") {
    return uniqBy(payload, option);
  }
  return payload;
}
var RechartsReduxContext = /* @__PURE__ */ createContext(null);
var noopDispatch = (a) => a;
var useAppDispatch = () => {
  var context = useContext(RechartsReduxContext);
  if (context) {
    return context.store.dispatch;
  }
  return noopDispatch;
};
var noop = () => {
};
var addNestedSubNoop = () => noop;
var refEquality = (a, b) => a === b;
function useAppSelector(selector) {
  var context = useContext(RechartsReduxContext);
  var outOfContextSelector = useMemo(() => {
    if (!context) {
      return noop;
    }
    return (state) => {
      if (state == null) {
        return void 0;
      }
      return selector(state);
    };
  }, [context, selector]);
  return useSyncExternalStoreWithSelector(context ? context.subscription.addNestedSub : addNestedSubNoop, context ? context.store.getState : noop, context ? context.store.getState : noop, outOfContextSelector, refEquality);
}
var selectLegendSettings = (state) => state.legend.settings;
var selectLegendSize = (state) => state.legend.size;
var selectAllLegendPayload2DArray = (state) => state.legend.payload;
createSelector([selectAllLegendPayload2DArray, selectLegendSettings], (payloads, _ref2) => {
  var {
    itemSorter
  } = _ref2;
  var flat = payloads.flat(1);
  return itemSorter ? sortBy$1(flat, itemSorter) : flat;
});
var EPS = 1;
function useElementOffset() {
  var extraDependencies = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var [lastBoundingBox, setLastBoundingBox] = useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  });
  var updateBoundingBox = useCallback(
    (node) => {
      if (node != null) {
        var rect = node.getBoundingClientRect();
        var box = {
          height: rect.height,
          left: rect.left,
          top: rect.top,
          width: rect.width
        };
        if (Math.abs(box.height - lastBoundingBox.height) > EPS || Math.abs(box.left - lastBoundingBox.left) > EPS || Math.abs(box.top - lastBoundingBox.top) > EPS || Math.abs(box.width - lastBoundingBox.width) > EPS) {
          setLastBoundingBox({
            height: box.height,
            left: box.left,
            top: box.top,
            width: box.width
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastBoundingBox.width, lastBoundingBox.height, lastBoundingBox.top, lastBoundingBox.left, ...extraDependencies]
  );
  return [lastBoundingBox, updateBoundingBox];
}
var initialState$d = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
};
var chartLayoutSlice = createSlice({
  name: "chartLayout",
  initialState: initialState$d,
  reducers: {
    setLayout(state, action) {
      state.layoutType = action.payload;
    },
    setChartSize(state, action) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setMargin(state, action) {
      var _action$payload$top, _action$payload$right, _action$payload$botto, _action$payload$left;
      state.margin.top = (_action$payload$top = action.payload.top) !== null && _action$payload$top !== void 0 ? _action$payload$top : 0;
      state.margin.right = (_action$payload$right = action.payload.right) !== null && _action$payload$right !== void 0 ? _action$payload$right : 0;
      state.margin.bottom = (_action$payload$botto = action.payload.bottom) !== null && _action$payload$botto !== void 0 ? _action$payload$botto : 0;
      state.margin.left = (_action$payload$left = action.payload.left) !== null && _action$payload$left !== void 0 ? _action$payload$left : 0;
    },
    setScale(state, action) {
      state.scale = action.payload;
    }
  }
});
var {
  setMargin,
  setLayout,
  setChartSize,
  setScale
} = chartLayoutSlice.actions;
var chartLayoutReducer = chartLayoutSlice.reducer;
function getSliced(arr, startIndex, endIndex) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (arr && startIndex + endIndex !== 0) {
    return arr.slice(startIndex, endIndex + 1);
  }
  return arr;
}
function isWellBehavedNumber(n) {
  return Number.isFinite(n);
}
function isPositiveNumber(n) {
  return typeof n === "number" && n > 0 && Number.isFinite(n);
}
function ownKeys$r(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$r(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$r(Object(t), true).forEach(function(r2) {
      _defineProperty$t(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$r(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$t(e, r, t) {
  return (r = _toPropertyKey$t(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$t(t) {
  var i = _toPrimitive$t(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$t(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
  if (isNullish(obj) || isNullish(dataKey)) {
    return defaultValue;
  }
  if (isNumOrStr(dataKey)) {
    return get(obj, dataKey, defaultValue);
  }
  if (typeof dataKey === "function") {
    return dataKey(obj);
  }
  return defaultValue;
}
var appendOffsetOfLegend = (offset, legendSettings, legendSize) => {
  if (legendSettings && legendSize) {
    var {
      width: boxWidth,
      height: boxHeight
    } = legendSize;
    var {
      align,
      verticalAlign,
      layout
    } = legendSettings;
    if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) {
      return _objectSpread$r(_objectSpread$r({}, offset), {}, {
        [align]: offset[align] + (boxWidth || 0)
      });
    }
    if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) {
      return _objectSpread$r(_objectSpread$r({}, offset), {}, {
        [verticalAlign]: offset[verticalAlign] + (boxHeight || 0)
      });
    }
  }
  return offset;
};
var isCategoricalAxis = (layout, axisType) => layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
var getCoordinatesOfGrid = (ticks, minValue, maxValue, syncWithTicks) => {
  if (syncWithTicks) {
    return ticks.map((entry) => entry.coordinate);
  }
  var hasMin, hasMax;
  var values = ticks.map((entry) => {
    if (entry.coordinate === minValue) {
      hasMin = true;
    }
    if (entry.coordinate === maxValue) {
      hasMax = true;
    }
    return entry.coordinate;
  });
  if (!hasMin) {
    values.push(minValue);
  }
  if (!hasMax) {
    values.push(maxValue);
  }
  return values;
};
var getTicksOfAxis = (axis, isGrid, isAll) => {
  if (!axis) {
    return null;
  }
  var {
    duplicateDomain,
    type,
    range: range2,
    scale,
    realScaleType,
    isCategorical,
    categoricalDomain,
    tickCount,
    ticks,
    niceTicks,
    axisType
  } = axis;
  if (!scale) {
    return null;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 && range2.length >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (ticks || niceTicks) {
    var result = (ticks || niceTicks || []).map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      var scaled = scale.map(scaleContent);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scaled + offset,
        value: entry,
        offset,
        index
      };
    }).filter(isNotNil);
    return result;
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks && true && tickCount != null) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as an index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var truncateByDomain = (value, domain) => {
  if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) {
    return value;
  }
  var minValue = Math.min(domain[0], domain[1]);
  var maxValue = Math.max(domain[0], domain[1]);
  var result = [value[0], value[1]];
  if (!isNumber(value[0]) || value[0] < minValue) {
    result[0] = minValue;
  }
  if (!isNumber(value[1]) || value[1] > maxValue) {
    result[1] = maxValue;
  }
  if (result[0] > maxValue) {
    result[0] = maxValue;
  }
  if (result[1] < minValue) {
    result[1] = minValue;
  }
  return result;
};
var offsetSign = (series) => {
  var _series$;
  var n = series.length;
  if (n <= 0) {
    return;
  }
  var m = (_series$ = series[0]) === null || _series$ === void 0 ? void 0 : _series$.length;
  if (m == null || m <= 0) {
    return;
  }
  for (var j = 0; j < m; ++j) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < n; ++i) {
      var row = series[i];
      var col = row === null || row === void 0 ? void 0 : row[j];
      if (col == null) {
        continue;
      }
      var series1 = col[1];
      var series0 = col[0];
      var value = isNan(series1) ? series0 : series1;
      if (value >= 0) {
        col[0] = positive;
        positive += value;
        col[1] = positive;
      } else {
        col[0] = negative;
        negative += value;
        col[1] = negative;
      }
    }
  }
};
var offsetPositive = (series) => {
  var _series$2;
  var n = series.length;
  if (n <= 0) {
    return;
  }
  var m = (_series$2 = series[0]) === null || _series$2 === void 0 ? void 0 : _series$2.length;
  if (m == null || m <= 0) {
    return;
  }
  for (var j = 0; j < m; ++j) {
    var positive = 0;
    for (var i = 0; i < n; ++i) {
      var row = series[i];
      var col = row === null || row === void 0 ? void 0 : row[j];
      if (col == null) {
        continue;
      }
      var value = isNan(col[1]) ? col[0] : col[1];
      if (value >= 0) {
        col[0] = positive;
        positive += value;
        col[1] = positive;
      } else {
        col[0] = 0;
        col[1] = 0;
      }
    }
  }
};
var STACK_OFFSET_MAP = {
  sign: offsetSign,
  // @ts-expect-error definitelytyped types are incorrect
  expand: stackOffsetExpand,
  // @ts-expect-error definitelytyped types are incorrect
  none: stackOffsetNone,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: stackOffsetSilhouette,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: stackOffsetWiggle,
  positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType) => {
  var _STACK_OFFSET_MAP$off;
  var offsetAccessor = (_STACK_OFFSET_MAP$off = STACK_OFFSET_MAP[offsetType]) !== null && _STACK_OFFSET_MAP$off !== void 0 ? _STACK_OFFSET_MAP$off : stackOffsetNone;
  var stack$1 = stack().keys(dataKeys).value((d, key) => Number(getValueByDataKey(d, key, 0))).order(stackOrderNone).offset(offsetAccessor);
  var result = stack$1(data);
  result.forEach((series, seriesIndex) => {
    series.forEach((point, pointIndex) => {
      var value = getValueByDataKey(data[pointIndex], dataKeys[seriesIndex], 0);
      if (Array.isArray(value) && value.length === 2 && isNumber(value[0]) && isNumber(value[1])) {
        point[0] = value[0];
        point[1] = value[1];
      }
    });
  });
  return result;
};
function getNormalizedStackId(publicStackId) {
  return publicStackId == null ? void 0 : String(publicStackId);
}
function getCateCoordinateOfLine(_ref2) {
  var {
    axis,
    ticks,
    bandSize,
    entry,
    index,
    dataKey
  } = _ref2;
  if (axis.type === "category") {
    if (!axis.allowDuplicatedCategory && axis.dataKey && !isNullish(entry[axis.dataKey])) {
      var matchedTick = findEntryInArray(ticks, "value", entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks !== null && ticks !== void 0 && ticks[index] ? ticks[index].coordinate + bandSize / 2 : null;
  }
  var value = getValueByDataKey(entry, !isNullish(dataKey) ? dataKey : axis.dataKey);
  var scaled = axis.scale.map(value);
  if (!isNumber(scaled)) {
    return null;
  }
  return scaled;
}
var getCateCoordinateOfBar = (_ref2) => {
  var {
    axis,
    ticks,
    offset,
    bandSize,
    entry,
    index
  } = _ref2;
  if (axis.type === "category") {
    return ticks[index] ? ticks[index].coordinate + offset : null;
  }
  var value = getValueByDataKey(entry, axis.dataKey, axis.scale.domain()[index]);
  if (isNullish(value)) {
    return null;
  }
  var scaled = axis.scale.map(value);
  if (!isNumber(scaled)) {
    return null;
  }
  return scaled - bandSize / 2 + offset;
};
var getBaseValueOfBar = (_ref3) => {
  var {
    numericAxis
  } = _ref3;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var minValue = Math.min(domain[0], domain[1]);
    var maxValue = Math.max(domain[0], domain[1]);
    if (minValue <= 0 && maxValue >= 0) {
      return 0;
    }
    if (maxValue < 0) {
      return maxValue;
    }
    return minValue;
  }
  return domain[0];
};
var getDomainOfSingle = (data) => {
  var flat = data.flat(2).filter(isNumber);
  return [Math.min(...flat), Math.max(...flat)];
};
var makeDomainFinite = (domain) => {
  return [domain[0] === Infinity ? 0 : domain[0], domain[1] === -Infinity ? 0 : domain[1]];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => {
  if (stackGroups == null) {
    return void 0;
  }
  return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId) => {
    var group = stackGroups[stackId];
    if (!group) {
      return result;
    }
    var {
      stackedData
    } = group;
    var domain = stackedData.reduce((res, entry) => {
      var sliced = getSliced(entry, startIndex, endIndex);
      var s = getDomainOfSingle(sliced);
      if (!isWellBehavedNumber(s[0]) || !isWellBehavedNumber(s[1])) {
        return res;
      }
      return [Math.min(res[0], s[0]), Math.max(res[1], s[1])];
    }, [Infinity, -Infinity]);
    return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
  }, [Infinity, -Infinity]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var getBandSizeOfAxis = (axis, ticks, isBar) => {
  if (axis && axis.scale && axis.scale.bandwidth) {
    var bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks && ticks.length >= 2) {
    var orderedTicks = sortBy$1(ticks, (o) => o.coordinate);
    var bandSize = Infinity;
    for (var i = 1, len = orderedTicks.length; i < len; i++) {
      var cur = orderedTicks[i];
      var prev = orderedTicks[i - 1];
      bandSize = Math.min(((cur === null || cur === void 0 ? void 0 : cur.coordinate) || 0) - ((prev === null || prev === void 0 ? void 0 : prev.coordinate) || 0), bandSize);
    }
    return bandSize === Infinity ? 0 : bandSize;
  }
  return isBar ? void 0 : 0;
};
function getTooltipEntry(_ref4) {
  var {
    tooltipEntrySettings,
    dataKey,
    payload,
    value,
    name
  } = _ref4;
  return _objectSpread$r(_objectSpread$r({}, tooltipEntrySettings), {}, {
    dataKey,
    payload,
    value,
    name
  });
}
function getTooltipNameProp(nameFromItem, dataKey) {
  if (nameFromItem) {
    return String(nameFromItem);
  }
  if (typeof dataKey === "string") {
    return dataKey;
  }
  return void 0;
}
var calculateCartesianTooltipPos = (coordinate, layout) => {
  if (layout === "horizontal") {
    return coordinate.relativeX;
  }
  if (layout === "vertical") {
    return coordinate.relativeY;
  }
  return void 0;
};
var calculatePolarTooltipPos = (rangeObj, layout) => {
  if (layout === "centric") {
    return rangeObj.angle;
  }
  return rangeObj.radius;
};
var selectChartWidth = (state) => state.layout.width;
var selectChartHeight = (state) => state.layout.height;
var selectContainerScale = (state) => state.layout.scale;
var selectMargin = (state) => state.layout.margin;
var selectAllXAxes = createSelector((state) => state.cartesianAxis.xAxis, (xAxisMap) => {
  return Object.values(xAxisMap);
});
var selectAllYAxes = createSelector((state) => state.cartesianAxis.yAxis, (yAxisMap) => {
  return Object.values(yAxisMap);
});
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = "data-recharts-item-index";
var DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME = "data-recharts-item-id";
var DEFAULT_Y_AXIS_WIDTH = 60;
function ownKeys$q(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$q(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$q(Object(t), true).forEach(function(r2) {
      _defineProperty$s(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$q(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$s(e, r, t) {
  return (r = _toPropertyKey$s(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$s(t) {
  var i = _toPrimitive$s(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$s(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var selectBrushHeight = (state) => state.brush.height;
function selectLeftAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "left" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectRightAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "right" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectTopAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "top" && !entry.mirror && !entry.hide) {
      return result + entry.height;
    }
    return result;
  }, 0);
}
function selectBottomAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "bottom" && !entry.mirror && !entry.hide) {
      return result + entry.height;
    }
    return result;
  }, 0);
}
var selectChartOffsetInternal = createSelector([selectChartWidth, selectChartHeight, selectMargin, selectBrushHeight, selectLeftAxesOffset, selectRightAxesOffset, selectTopAxesOffset, selectBottomAxesOffset, selectLegendSettings, selectLegendSize], (chartWidth, chartHeight, margin, brushHeight, leftAxesOffset, rightAxesOffset, topAxesOffset, bottomAxesOffset, legendSettings, legendSize) => {
  var offsetH = {
    left: (margin.left || 0) + leftAxesOffset,
    right: (margin.right || 0) + rightAxesOffset
  };
  var offsetV = {
    top: (margin.top || 0) + topAxesOffset,
    bottom: (margin.bottom || 0) + bottomAxesOffset
  };
  var offset = _objectSpread$q(_objectSpread$q({}, offsetV), offsetH);
  var brushBottom = offset.bottom;
  offset.bottom += brushHeight;
  offset = appendOffsetOfLegend(offset, legendSettings, legendSize);
  var offsetWidth = chartWidth - offset.left - offset.right;
  var offsetHeight = chartHeight - offset.top - offset.bottom;
  return _objectSpread$q(_objectSpread$q({
    brushBottom
  }, offset), {}, {
    // never return negative values for height and width
    width: Math.max(offsetWidth, 0),
    height: Math.max(offsetHeight, 0)
  });
});
var selectChartViewBox = createSelector(selectChartOffsetInternal, (offset) => ({
  x: offset.left,
  y: offset.top,
  width: offset.width,
  height: offset.height
}));
var selectAxisViewBox = createSelector(selectChartWidth, selectChartHeight, (width, height) => ({
  x: 0,
  y: 0,
  width,
  height
}));
var PanoramaContext = /* @__PURE__ */ createContext(null);
var useIsPanorama = () => useContext(PanoramaContext) != null;
var selectBrushSettings = (state) => state.brush;
var selectBrushDimensions = createSelector([selectBrushSettings, selectChartOffsetInternal, selectMargin], (brushSettings, offset, margin) => ({
  height: brushSettings.height,
  x: isNumber(brushSettings.x) ? brushSettings.x : offset.left,
  y: isNumber(brushSettings.y) ? brushSettings.y : offset.top + offset.height + offset.brushBottom - ((margin === null || margin === void 0 ? void 0 : margin.bottom) || 0),
  width: isNumber(brushSettings.width) ? brushSettings.width : offset.width
}));
var warn = function warn2(condition, format) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
  if (typeof console !== "undefined" && console.warn) {
    if (format === void 0) {
      console.warn("LogUtils requires an error message argument");
    }
    if (!condition) {
      if (format === void 0) {
        console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
      } else {
        var argIndex = 0;
        console.warn(format.replace(/%s/g, () => args[argIndex++]));
      }
    }
  }
};
var defaultResponsiveContainerProps = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
};
var calculateChartDimensions = (containerWidth, containerHeight, props) => {
  var {
    width = defaultResponsiveContainerProps.width,
    height = defaultResponsiveContainerProps.height,
    aspect,
    maxHeight
  } = props;
  var calculatedWidth = isPercent(width) ? containerWidth : Number(width);
  var calculatedHeight = isPercent(height) ? containerHeight : Number(height);
  if (aspect && aspect > 0) {
    if (calculatedWidth) {
      calculatedHeight = calculatedWidth / aspect;
    } else if (calculatedHeight) {
      calculatedWidth = calculatedHeight * aspect;
    }
    if (maxHeight && calculatedHeight != null && calculatedHeight > maxHeight) {
      calculatedHeight = maxHeight;
    }
  }
  return {
    calculatedWidth,
    calculatedHeight
  };
};
var bothOverflow = {
  width: 0,
  height: 0,
  overflow: "visible"
};
var overflowX = {
  width: 0,
  overflowX: "visible"
};
var overflowY = {
  height: 0,
  overflowY: "visible"
};
var noStyle = {};
var getInnerDivStyle = (props) => {
  var {
    width,
    height
  } = props;
  var isWidthPercent = isPercent(width);
  var isHeightPercent = isPercent(height);
  if (isWidthPercent && isHeightPercent) {
    return bothOverflow;
  }
  if (isWidthPercent) {
    return overflowX;
  }
  if (isHeightPercent) {
    return overflowY;
  }
  return noStyle;
};
function getDefaultWidthAndHeight(_ref2) {
  var {
    width,
    height,
    aspect
  } = _ref2;
  var calculatedWidth = width;
  var calculatedHeight = height;
  if (calculatedWidth === void 0 && calculatedHeight === void 0) {
    calculatedWidth = defaultResponsiveContainerProps.width;
    calculatedHeight = defaultResponsiveContainerProps.height;
  } else if (calculatedWidth === void 0) {
    calculatedWidth = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.width;
  } else if (calculatedHeight === void 0) {
    calculatedHeight = aspect && aspect > 0 ? void 0 : defaultResponsiveContainerProps.height;
  }
  return {
    width: calculatedWidth,
    height: calculatedHeight
  };
}
function _extends$c() {
  return _extends$c = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$c.apply(null, arguments);
}
function ownKeys$p(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$p(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$p(Object(t), true).forEach(function(r2) {
      _defineProperty$r(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$p(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$r(e, r, t) {
  return (r = _toPropertyKey$r(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$r(t) {
  var i = _toPrimitive$r(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$r(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ResponsiveContainerContext = /* @__PURE__ */ createContext(defaultResponsiveContainerProps.initialDimension);
function isAcceptableSize(size) {
  return isPositiveNumber(size.width) && isPositiveNumber(size.height);
}
function ResponsiveContainerContextProvider(_ref2) {
  var {
    children,
    width,
    height
  } = _ref2;
  var size = useMemo(() => ({
    width,
    height
  }), [width, height]);
  if (!isAcceptableSize(size)) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(ResponsiveContainerContext.Provider, {
    value: size
  }, children);
}
var useResponsiveContainerContext = () => useContext(ResponsiveContainerContext);
var SizeDetectorContainer = /* @__PURE__ */ forwardRef((_ref2, ref) => {
  var {
    aspect,
    initialDimension = defaultResponsiveContainerProps.initialDimension,
    width,
    height,
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth = defaultResponsiveContainerProps.minWidth,
    minHeight,
    maxHeight,
    children,
    debounce = defaultResponsiveContainerProps.debounce,
    id,
    className,
    onResize,
    style = {}
  } = _ref2;
  var containerRef = useRef(null);
  var onResizeRef = useRef();
  onResizeRef.current = onResize;
  useImperativeHandle(ref, () => containerRef.current);
  var [sizes, setSizes] = useState({
    containerWidth: initialDimension.width,
    containerHeight: initialDimension.height
  });
  var setContainerSize = useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  useEffect(() => {
    if (containerRef.current == null || typeof ResizeObserver === "undefined") {
      return noop$1;
    }
    var callback = (entries) => {
      var _onResizeRef$current;
      var entry = entries[0];
      if (entry == null) {
        return;
      }
      var {
        width: containerWidth3,
        height: containerHeight3
      } = entry.contentRect;
      setContainerSize(containerWidth3, containerHeight3);
      (_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth3, containerHeight3);
    };
    if (debounce > 0) {
      callback = throttle(callback, debounce, {
        trailing: true,
        leading: false
      });
    }
    var observer = new ResizeObserver(callback);
    var {
      width: containerWidth2,
      height: containerHeight2
    } = containerRef.current.getBoundingClientRect();
    setContainerSize(containerWidth2, containerHeight2);
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [setContainerSize, debounce]);
  var {
    containerWidth,
    containerHeight
  } = sizes;
  warn(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
  var {
    calculatedWidth,
    calculatedHeight
  } = calculateChartDimensions(containerWidth, containerHeight, {
    width,
    height,
    aspect,
    maxHeight
  });
  warn(calculatedWidth != null && calculatedWidth > 0 || calculatedHeight != null && calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
  return /* @__PURE__ */ React.createElement("div", {
    id: id ? "".concat(id) : void 0,
    className: clsx("recharts-responsive-container", className),
    style: _objectSpread$p(_objectSpread$p({}, style), {}, {
      width,
      height,
      minWidth,
      minHeight,
      maxHeight
    }),
    ref: containerRef
  }, /* @__PURE__ */ React.createElement("div", {
    style: getInnerDivStyle({
      width,
      height
    })
  }, /* @__PURE__ */ React.createElement(ResponsiveContainerContextProvider, {
    width: calculatedWidth,
    height: calculatedHeight
  }, children)));
});
var ResponsiveContainer = /* @__PURE__ */ forwardRef((props, ref) => {
  var responsiveContainerContext = useResponsiveContainerContext();
  if (isPositiveNumber(responsiveContainerContext.width) && isPositiveNumber(responsiveContainerContext.height)) {
    return props.children;
  }
  var {
    width,
    height
  } = getDefaultWidthAndHeight({
    width: props.width,
    height: props.height,
    aspect: props.aspect
  });
  var {
    calculatedWidth,
    calculatedHeight
  } = calculateChartDimensions(void 0, void 0, {
    width,
    height,
    aspect: props.aspect,
    maxHeight: props.maxHeight
  });
  if (isNumber(calculatedWidth) && isNumber(calculatedHeight)) {
    return /* @__PURE__ */ React.createElement(ResponsiveContainerContextProvider, {
      width: calculatedWidth,
      height: calculatedHeight
    }, props.children);
  }
  return /* @__PURE__ */ React.createElement(SizeDetectorContainer, _extends$c({}, props, {
    width,
    height,
    ref
  }));
});
function cartesianViewBoxToTrapezoid(box) {
  if (!box) {
    return void 0;
  }
  return {
    x: box.x,
    y: box.y,
    upperWidth: "upperWidth" in box ? box.upperWidth : box.width,
    lowerWidth: "lowerWidth" in box ? box.lowerWidth : box.width,
    width: box.width,
    height: box.height
  };
}
var useViewBox = () => {
  var _useAppSelector;
  var panorama = useIsPanorama();
  var rootViewBox = useAppSelector(selectChartViewBox);
  var brushDimensions = useAppSelector(selectBrushDimensions);
  var brushPadding = (_useAppSelector = useAppSelector(selectBrushSettings)) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
  if (!panorama || !brushDimensions || !brushPadding) {
    return rootViewBox;
  }
  return {
    width: brushDimensions.width - brushPadding.left - brushPadding.right,
    height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
    x: brushPadding.left,
    y: brushPadding.top
  };
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
};
var useOffsetInternal = () => {
  var _useAppSelector2;
  return (_useAppSelector2 = useAppSelector(selectChartOffsetInternal)) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
var useChartWidth = () => {
  return useAppSelector(selectChartWidth);
};
var useChartHeight = () => {
  return useAppSelector(selectChartHeight);
};
var selectChartLayout = (state) => state.layout.layoutType;
var useChartLayout = () => useAppSelector(selectChartLayout);
var useCartesianChartLayout = () => {
  var layout = useChartLayout();
  if (layout === "horizontal" || layout === "vertical") {
    return layout;
  }
  return void 0;
};
var selectPolarChartLayout = (state) => {
  var layout = state.layout.layoutType;
  if (layout === "centric" || layout === "radial") {
    return layout;
  }
  return void 0;
};
var useIsInChartContext = () => {
  var layout = useChartLayout();
  return layout !== void 0;
};
var ReportChartSize = (props) => {
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var {
    width: widthFromProps,
    height: heightFromProps
  } = props;
  var responsiveContainerCalculations = useResponsiveContainerContext();
  var width = widthFromProps;
  var height = heightFromProps;
  if (responsiveContainerCalculations) {
    width = responsiveContainerCalculations.width > 0 ? responsiveContainerCalculations.width : widthFromProps;
    height = responsiveContainerCalculations.height > 0 ? responsiveContainerCalculations.height : heightFromProps;
  }
  useEffect(() => {
    if (!isPanorama && isPositiveNumber(width) && isPositiveNumber(height)) {
      dispatch(setChartSize({
        width,
        height
      }));
    }
  }, [dispatch, isPanorama, width, height]);
  return null;
};
var initialState$c = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "middle",
    itemSorter: "value"
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
};
var legendSlice = createSlice({
  name: "legend",
  initialState: initialState$c,
  reducers: {
    setLegendSize(state, action) {
      state.size.width = action.payload.width;
      state.size.height = action.payload.height;
    },
    setLegendSettings(state, action) {
      state.settings.align = action.payload.align;
      state.settings.layout = action.payload.layout;
      state.settings.verticalAlign = action.payload.verticalAlign;
      state.settings.itemSorter = action.payload.itemSorter;
    },
    addLegendPayload: {
      reducer(state, action) {
        state.payload.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceLegendPayload: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        var index = current(state).payload.indexOf(castDraft(prev));
        if (index > -1) {
          state.payload[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeLegendPayload: {
      reducer(state, action) {
        var index = current(state).payload.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.payload.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var {
  setLegendSize,
  setLegendSettings,
  addLegendPayload,
  replaceLegendPayload,
  removeLegendPayload
} = legendSlice.actions;
var legendReducer = legendSlice.reducer;
var propsToShallowCompare = /* @__PURE__ */ new Set([
  "axisLine",
  "tickLine",
  "activeBar",
  "activeDot",
  "activeLabel",
  "activeShape",
  "allowEscapeViewBox",
  "background",
  "cursor",
  "dot",
  "label",
  "line",
  "margin",
  "padding",
  "position",
  "shape",
  "style",
  "tick",
  "wrapperStyle",
  // radius can be an array of 4 numbers, easy to compare shallowly
  "radius",
  "throttledEvents"
]);
function sameValueZero(x, y) {
  if (x == null && y == null) {
    return true;
  }
  if (typeof x === "number" && typeof y === "number") {
    return x === y || x !== x && y !== y;
  }
  return x === y;
}
function propsAreEqual(prevProps, nextProps) {
  var allKeys = /* @__PURE__ */ new Set([...Object.keys(prevProps), ...Object.keys(nextProps)]);
  for (var key of allKeys) {
    if (propsToShallowCompare.has(key)) {
      if (prevProps[key] == null && nextProps[key] == null) {
        continue;
      }
      if (!shallowEqual(prevProps[key], nextProps[key])) {
        return false;
      }
    } else if (!sameValueZero(prevProps[key], nextProps[key])) {
      return false;
    }
  }
  return true;
}
function _extends$b() {
  return _extends$b = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$b.apply(null, arguments);
}
function ownKeys$o(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$o(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$o(Object(t), true).forEach(function(r2) {
      _defineProperty$q(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$o(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$q(e, r, t) {
  return (r = _toPropertyKey$q(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$q(t) {
  var i = _toPrimitive$q(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$q(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function defaultFormatter(value) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
var defaultDefaultTooltipContentProps = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000"
  },
  labelStyle: {},
  accessibilityLayer: false
};
function lodashLikeSortBy(array, itemSorter) {
  if (itemSorter == null) {
    return array;
  }
  return sortBy$1(array, itemSorter);
}
var DefaultTooltipContent = (props) => {
  var {
    separator = defaultDefaultTooltipContentProps.separator,
    contentStyle,
    itemStyle,
    labelStyle = defaultDefaultTooltipContentProps.labelStyle,
    payload,
    formatter,
    itemSorter,
    wrapperClassName,
    labelClassName,
    label,
    labelFormatter,
    accessibilityLayer = defaultDefaultTooltipContentProps.accessibilityLayer
  } = props;
  var renderContent2 = () => {
    if (payload && payload.length) {
      var listStyle = {
        padding: 0,
        margin: 0
      };
      var sortedPayload = lodashLikeSortBy(payload, itemSorter);
      var items = sortedPayload.map((entry, i) => {
        if (!entry || entry.type === "none") {
          return null;
        }
        var finalFormatter = entry.formatter || formatter || defaultFormatter;
        var {
          value,
          name
        } = entry;
        var finalValue = value;
        var finalName = name;
        if (finalFormatter) {
          var formatted = finalFormatter(value, name, entry, i, payload);
          if (Array.isArray(formatted)) {
            [finalValue, finalName] = formatted;
          } else if (formatted != null) {
            finalValue = formatted;
          } else {
            return null;
          }
        }
        var finalItemStyle = _objectSpread$o(_objectSpread$o({}, defaultDefaultTooltipContentProps.itemStyle), {}, {
          color: entry.color || defaultDefaultTooltipContentProps.itemStyle.color
        }, itemStyle);
        return /* @__PURE__ */ React.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(i),
          style: finalItemStyle
        }, isNumOrStr(finalName) ? /* @__PURE__ */ React.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, finalName) : null, isNumOrStr(finalName) ? /* @__PURE__ */ React.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, separator) : null, /* @__PURE__ */ React.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, finalValue), /* @__PURE__ */ React.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, entry.unit || ""));
      });
      return /* @__PURE__ */ React.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: listStyle
      }, items);
    }
    return null;
  };
  var finalStyle = _objectSpread$o(_objectSpread$o({}, defaultDefaultTooltipContentProps.contentStyle), contentStyle);
  var finalLabelStyle = _objectSpread$o({
    margin: 0
  }, labelStyle);
  var hasLabel = !isNullish(label);
  var finalLabel = hasLabel ? label : "";
  var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
  var labelCN = clsx("recharts-tooltip-label", labelClassName);
  if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  var accessibilityAttributes = accessibilityLayer ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ React.createElement("div", _extends$b({
    className: wrapperCN,
    style: finalStyle
  }, accessibilityAttributes), /* @__PURE__ */ React.createElement("p", {
    className: labelCN,
    style: finalLabelStyle
  }, /* @__PURE__ */ React.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent2());
};
var CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
var TOOLTIP_HIDDEN = {
  visibility: "hidden"
};
function getTooltipCSSClassName(_ref2) {
  var {
    coordinate,
    translateX,
    translateY
  } = _ref2;
  return clsx(CSS_CLASS_PREFIX, {
    ["".concat(CSS_CLASS_PREFIX, "-right")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-left")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-bottom")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
    ["".concat(CSS_CLASS_PREFIX, "-top")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y
  });
}
function getTooltipTranslateXY(_ref2) {
  var {
    allowEscapeViewBox,
    coordinate,
    key,
    offset,
    position,
    reverseDirection,
    tooltipDimension,
    viewBox,
    viewBoxDimension
  } = _ref2;
  if (position && isNumber(position[key])) {
    return position[key];
  }
  var negative = coordinate[key] - tooltipDimension - (offset > 0 ? offset : 0);
  var positive = coordinate[key] + offset;
  if (allowEscapeViewBox[key]) {
    return reverseDirection[key] ? negative : positive;
  }
  var viewBoxKey = viewBox[key];
  if (viewBoxKey == null) {
    return 0;
  }
  if (reverseDirection[key]) {
    var _tooltipBoundary = negative;
    var _viewBoxBoundary = viewBoxKey;
    if (_tooltipBoundary < _viewBoxBoundary) {
      return Math.max(positive, viewBoxKey);
    }
    return Math.max(negative, viewBoxKey);
  }
  if (viewBoxDimension == null) {
    return 0;
  }
  var tooltipBoundary = positive + tooltipDimension;
  var viewBoxBoundary = viewBoxKey + viewBoxDimension;
  if (tooltipBoundary > viewBoxBoundary) {
    return Math.max(negative, viewBoxKey);
  }
  return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
  var {
    translateX,
    translateY,
    useTranslate3d
  } = _ref3;
  return {
    transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)")
  };
}
function getTooltipTranslate(_ref4) {
  var {
    allowEscapeViewBox,
    coordinate,
    offsetTop,
    offsetLeft,
    position,
    reverseDirection,
    tooltipBox,
    useTranslate3d,
    viewBox
  } = _ref4;
  var cssProperties, translateX, translateY;
  if (tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
    translateX = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "x",
      offset: offsetLeft,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.width,
      viewBox,
      viewBoxDimension: viewBox.width
    });
    translateY = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "y",
      offset: offsetTop,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.height,
      viewBox,
      viewBoxDimension: viewBox.height
    });
    cssProperties = getTransformStyle({
      translateX,
      translateY,
      useTranslate3d
    });
  } else {
    cssProperties = TOOLTIP_HIDDEN;
  }
  return {
    cssProperties,
    cssClasses: getTooltipCSSClassName({
      translateX,
      translateY,
      coordinate
    })
  };
}
var parseIsSsrByDefault = () => !(typeof window !== "undefined" && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
  isSsr: parseIsSsrByDefault()
};
function usePrefersReducedMotion() {
  var [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (Global.isSsr) {
      return false;
    }
    if (!window.matchMedia) {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    if (!window.matchMedia) {
      return;
    }
    var mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    var handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
  return prefersReducedMotion;
}
function ownKeys$n(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$n(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$n(Object(t), true).forEach(function(r2) {
      _defineProperty$p(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$n(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$p(e, r, t) {
  return (r = _toPropertyKey$p(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$p(t) {
  var i = _toPrimitive$p(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$p(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function resolveTransitionProperty(args) {
  if (args.prefersReducedMotion && args.isAnimationActive === "auto") {
    return void 0;
  }
  if (args.isAnimationActive && args.active) {
    return "transform ".concat(args.animationDuration, "ms ").concat(args.animationEasing);
  }
  return void 0;
}
function TooltipBoundingBoxImpl(props) {
  var _props$coordinate3, _props$coordinate4, _props$coordinate$x2, _props$coordinate5, _props$coordinate$y2, _props$coordinate6;
  var prefersReducedMotion = usePrefersReducedMotion();
  var [state, setState] = React.useState(() => ({
    dismissed: false,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  }));
  React.useEffect(() => {
    var handleKeyDown = (event) => {
      if (event.key === "Escape") {
        var _props$coordinate$x, _props$coordinate, _props$coordinate$y, _props$coordinate2;
        setState({
          dismissed: true,
          dismissedAtCoordinate: {
            x: (_props$coordinate$x = (_props$coordinate = props.coordinate) === null || _props$coordinate === void 0 ? void 0 : _props$coordinate.x) !== null && _props$coordinate$x !== void 0 ? _props$coordinate$x : 0,
            y: (_props$coordinate$y = (_props$coordinate2 = props.coordinate) === null || _props$coordinate2 === void 0 ? void 0 : _props$coordinate2.y) !== null && _props$coordinate$y !== void 0 ? _props$coordinate$y : 0
          }
        });
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [(_props$coordinate3 = props.coordinate) === null || _props$coordinate3 === void 0 ? void 0 : _props$coordinate3.x, (_props$coordinate4 = props.coordinate) === null || _props$coordinate4 === void 0 ? void 0 : _props$coordinate4.y]);
  if (state.dismissed && (((_props$coordinate$x2 = (_props$coordinate5 = props.coordinate) === null || _props$coordinate5 === void 0 ? void 0 : _props$coordinate5.x) !== null && _props$coordinate$x2 !== void 0 ? _props$coordinate$x2 : 0) !== state.dismissedAtCoordinate.x || ((_props$coordinate$y2 = (_props$coordinate6 = props.coordinate) === null || _props$coordinate6 === void 0 ? void 0 : _props$coordinate6.y) !== null && _props$coordinate$y2 !== void 0 ? _props$coordinate$y2 : 0) !== state.dismissedAtCoordinate.y)) {
    setState(_objectSpread$n(_objectSpread$n({}, state), {}, {
      dismissed: false
    }));
  }
  var {
    cssClasses,
    cssProperties
  } = getTooltipTranslate({
    allowEscapeViewBox: props.allowEscapeViewBox,
    coordinate: props.coordinate,
    offsetLeft: typeof props.offset === "number" ? props.offset : props.offset.x,
    offsetTop: typeof props.offset === "number" ? props.offset : props.offset.y,
    position: props.position,
    reverseDirection: props.reverseDirection,
    tooltipBox: {
      height: props.lastBoundingBox.height,
      width: props.lastBoundingBox.width
    },
    useTranslate3d: props.useTranslate3d,
    viewBox: props.viewBox
  });
  var positionStyle = props.hasPortalFromProps ? {} : _objectSpread$n(_objectSpread$n({
    transition: resolveTransitionProperty({
      prefersReducedMotion,
      isAnimationActive: props.isAnimationActive,
      active: props.active,
      animationDuration: props.animationDuration,
      animationEasing: props.animationEasing
    })
  }, cssProperties), {}, {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0
  });
  var outerStyle = _objectSpread$n(_objectSpread$n({}, positionStyle), {}, {
    visibility: !state.dismissed && props.active && props.hasPayload ? "visible" : "hidden"
  }, props.wrapperStyle);
  return /* @__PURE__ */ React.createElement("div", {
    // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: cssClasses,
    style: outerStyle,
    ref: props.innerRef
  }, props.children);
}
var TooltipBoundingBox = /* @__PURE__ */ React.memo(TooltipBoundingBoxImpl);
var useAccessibilityLayer = () => {
  var _useAppSelector;
  return (_useAppSelector = useAppSelector((state) => state.rootProps.accessibilityLayer)) !== null && _useAppSelector !== void 0 ? _useAppSelector : true;
};
function _extends$a() {
  return _extends$a = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$a.apply(null, arguments);
}
function ownKeys$m(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$m(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$m(Object(t), true).forEach(function(r2) {
      _defineProperty$o(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$m(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$o(e, r, t) {
  return (r = _toPropertyKey$o(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$o(t) {
  var i = _toPrimitive$o(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$o(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var CURVE_FACTORIES = {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveBumpX,
  curveBumpY,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore
};
var defined = (p) => isWellBehavedNumber(p.x) && isWellBehavedNumber(p.y);
var areaDefined = (d) => d.base != null && defined(d.base) && defined(d);
var getX = (p) => p.x;
var getY = (p) => p.y;
var getCurveFactory = (type, layout) => {
  if (typeof type === "function") {
    return type;
  }
  var name = "curve".concat(upperFirst(type));
  if ((name === "curveMonotone" || name === "curveBump") && layout) {
    var factory = CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
    if (factory) {
      return factory;
    }
  }
  return CURVE_FACTORIES[name] || curveLinear;
};
var defaultCurveProps = {
  connectNulls: false,
  type: "linear"
};
var getPath$1 = (_ref2) => {
  var {
    type = defaultCurveProps.type,
    points = [],
    baseLine,
    layout,
    connectNulls = defaultCurveProps.connectNulls
  } = _ref2;
  var curveFactory = getCurveFactory(type, layout);
  var formatPoints = connectNulls ? points.filter(defined) : points;
  if (Array.isArray(baseLine)) {
    var _lineFunction;
    var areaPoints = points.map((entry, index) => _objectSpread$m(_objectSpread$m({}, entry), {}, {
      base: baseLine[index]
    }));
    if (layout === "vertical") {
      _lineFunction = area().y(getY).x1(getX).x0((d) => d.base.x);
    } else {
      _lineFunction = area().x(getX).y1(getY).y0((d) => d.base.y);
    }
    var _nullableLineFunction = _lineFunction.defined(areaDefined).curve(curveFactory);
    var finalPoints = connectNulls ? areaPoints.filter(areaDefined) : areaPoints;
    return _nullableLineFunction(finalPoints);
  }
  var lineFunction;
  if (layout === "vertical" && isNumber(baseLine)) {
    lineFunction = area().y(getY).x1(getX).x0(baseLine);
  } else if (isNumber(baseLine)) {
    lineFunction = area().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = line().x(getX).y(getY);
  }
  var nullableLineFunction = lineFunction.defined(defined).curve(curveFactory);
  return nullableLineFunction(formatPoints);
};
var Curve = (props) => {
  var {
    className,
    points,
    path,
    pathRef
  } = props;
  var layout = useChartLayout();
  if ((!points || !points.length) && !path) {
    return null;
  }
  var getPathInput = {
    type: props.type,
    points: props.points,
    baseLine: props.baseLine,
    layout: props.layout || layout,
    connectNulls: props.connectNulls
  };
  var realPath = points && points.length ? getPath$1(getPathInput) : path;
  return /* @__PURE__ */ React.createElement("path", _extends$a({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
    className: clsx("recharts-curve", className),
    d: realPath === null ? void 0 : realPath,
    ref: pathRef
  }));
};
var _excluded$8 = ["x", "y", "top", "left", "width", "height", "className"];
function _extends$9() {
  return _extends$9 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$9.apply(null, arguments);
}
function ownKeys$l(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$l(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$l(Object(t), true).forEach(function(r2) {
      _defineProperty$n(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$l(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$n(e, r, t) {
  return (r = _toPropertyKey$n(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$n(t) {
  var i = _toPrimitive$n(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$n(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$8(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$8(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$8(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var getPath = (x, y, width, height, top, left) => {
  return "M".concat(x, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y, "h").concat(width);
};
var Cross = (_ref2) => {
  var {
    x = 0,
    y = 0,
    top = 0,
    left = 0,
    width = 0,
    height = 0,
    className
  } = _ref2, rest = _objectWithoutProperties$8(_ref2, _excluded$8);
  var props = _objectSpread$l({
    x,
    y,
    top,
    left,
    width,
    height
  }, rest);
  if (!isNumber(x) || !isNumber(y) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("path", _extends$9({}, svgPropertiesAndEvents(props), {
    className: clsx("recharts-cross", className),
    d: getPath(x, y, width, height, top, left)
  }));
};
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
  var halfSize = tooltipAxisBandSize / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + 0.5,
    y: layout === "horizontal" ? offset.top + 0.5 : activeCoordinate.y - halfSize,
    width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
    height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
  };
}
function ownKeys$k(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$k(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$k(Object(t), true).forEach(function(r2) {
      _defineProperty$m(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$k(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$m(e, r, t) {
  return (r = _toPropertyKey$m(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$m(t) {
  var i = _toPrimitive$m(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$m(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getDashCase = (name) => name.replace(/([A-Z])/g, (v) => "-".concat(v.toLowerCase()));
var getTransitionVal = (props, duration, easing) => props.map((prop) => "".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing)).join(",");
var getIntersectionKeys = (preObj, nextObj) => [Object.keys(preObj), Object.keys(nextObj)].reduce((a, b) => a.filter((c) => b.includes(c)));
var mapObject = (fn, obj) => Object.keys(obj).reduce((res, key) => _objectSpread$k(_objectSpread$k({}, res), {}, {
  [key]: fn(key, obj[key])
}), {});
function ownKeys$j(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$j(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$j(Object(t), true).forEach(function(r2) {
      _defineProperty$l(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$j(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$l(e, r, t) {
  return (r = _toPropertyKey$l(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$l(t) {
  var i = _toPrimitive$l(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$l(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var alpha = (begin, end, k) => begin + (end - begin) * k;
var needContinue = (_ref2) => {
  var {
    from: from2,
    to: to2
  } = _ref2;
  return from2 !== to2;
};
var calStepperVals = (easing, preVals, steps) => {
  var nextStepVals = mapObject((key, val) => {
    if (needContinue(val)) {
      var [newX, newV] = easing(val.from, val.to, val.velocity);
      return _objectSpread$j(_objectSpread$j({}, val), {}, {
        from: newX,
        velocity: newV
      });
    }
    return val;
  }, preVals);
  if (steps < 1) {
    return mapObject((key, val) => {
      if (needContinue(val) && nextStepVals[key] != null) {
        return _objectSpread$j(_objectSpread$j({}, val), {}, {
          velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
          from: alpha(val.from, nextStepVals[key].from, steps)
        });
      }
      return val;
    }, preVals);
  }
  return calStepperVals(easing, nextStepVals, steps - 1);
};
function createStepperUpdate(from2, to2, easing, interKeys, render, timeoutController) {
  var preTime;
  var stepperStyle = interKeys.reduce((res, key) => _objectSpread$j(_objectSpread$j({}, res), {}, {
    [key]: {
      from: from2[key],
      velocity: 0,
      to: to2[key]
    }
  }), {});
  var getCurrStyle = () => mapObject((key, val) => val.from, stepperStyle);
  var shouldStopAnimation = () => !Object.values(stepperStyle).filter(needContinue).length;
  var stopAnimation = null;
  var stepperUpdate = (now) => {
    if (!preTime) {
      preTime = now;
    }
    var deltaTime = now - preTime;
    var steps = deltaTime / easing.dt;
    stepperStyle = calStepperVals(easing, stepperStyle, steps);
    render(_objectSpread$j(_objectSpread$j(_objectSpread$j({}, from2), to2), getCurrStyle()));
    preTime = now;
    if (!shouldStopAnimation()) {
      stopAnimation = timeoutController.setTimeout(stepperUpdate);
    }
  };
  return () => {
    stopAnimation = timeoutController.setTimeout(stepperUpdate);
    return () => {
      var _stopAnimation;
      (_stopAnimation = stopAnimation) === null || _stopAnimation === void 0 || _stopAnimation();
    };
  };
}
function createTimingUpdate(from2, to2, easing, duration, interKeys, render, timeoutController) {
  var stopAnimation = null;
  var timingStyle = interKeys.reduce((res, key) => {
    var fromElement = from2[key];
    var toElement = to2[key];
    if (fromElement == null || toElement == null) {
      return res;
    }
    return _objectSpread$j(_objectSpread$j({}, res), {}, {
      [key]: [fromElement, toElement]
    });
  }, {});
  var beginTime;
  var timingUpdate = (now) => {
    if (!beginTime) {
      beginTime = now;
    }
    var t = (now - beginTime) / duration;
    var currStyle = mapObject((key, val) => alpha(...val, easing(t)), timingStyle);
    render(_objectSpread$j(_objectSpread$j(_objectSpread$j({}, from2), to2), currStyle));
    if (t < 1) {
      stopAnimation = timeoutController.setTimeout(timingUpdate);
    } else {
      var finalStyle = mapObject((key, val) => alpha(...val, easing(1)), timingStyle);
      render(_objectSpread$j(_objectSpread$j(_objectSpread$j({}, from2), to2), finalStyle));
    }
  };
  return () => {
    stopAnimation = timeoutController.setTimeout(timingUpdate);
    return () => {
      var _stopAnimation2;
      (_stopAnimation2 = stopAnimation) === null || _stopAnimation2 === void 0 || _stopAnimation2();
    };
  };
}
const configUpdate = (from2, to2, easing, duration, render, timeoutController) => {
  var interKeys = getIntersectionKeys(from2, to2);
  if (easing == null) {
    return () => {
      render(_objectSpread$j(_objectSpread$j({}, from2), to2));
      return () => {
      };
    };
  }
  return easing.isStepper === true ? createStepperUpdate(from2, to2, easing, interKeys, render, timeoutController) : createTimingUpdate(from2, to2, easing, duration, interKeys, render, timeoutController);
};
var ACCURACY = 1e-4;
var cubicBezierFactor = (c1, c2) => [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
var evaluatePolynomial = (params, t) => params.map((param, i) => param * t ** i).reduce((pre, curr) => pre + curr);
var cubicBezier = (c1, c2) => (t) => {
  var params = cubicBezierFactor(c1, c2);
  return evaluatePolynomial(params, t);
};
var derivativeCubicBezier = (c1, c2) => (t) => {
  var params = cubicBezierFactor(c1, c2);
  var newParams = [...params.map((param, i) => param * i).slice(1), 0];
  return evaluatePolynomial(newParams, t);
};
var parseCubicBezier = (easing) => {
  var _easingParts$;
  var easingParts = easing.split("(");
  if (easingParts.length !== 2 || easingParts[0] !== "cubic-bezier") {
    return null;
  }
  var numbers = (_easingParts$ = easingParts[1]) === null || _easingParts$ === void 0 || (_easingParts$ = _easingParts$.split(")")[0]) === null || _easingParts$ === void 0 ? void 0 : _easingParts$.split(",");
  if (numbers == null || numbers.length !== 4) {
    return null;
  }
  var coords = numbers.map((x) => parseFloat(x));
  return [coords[0], coords[1], coords[2], coords[3]];
};
var getBezierCoordinates = function getBezierCoordinates2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    switch (args[0]) {
      case "linear":
        return [0, 0, 1, 1];
      case "ease":
        return [0.25, 0.1, 0.25, 1];
      case "ease-in":
        return [0.42, 0, 1, 1];
      case "ease-out":
        return [0.42, 0, 0.58, 1];
      case "ease-in-out":
        return [0, 0, 0.58, 1];
      default: {
        var easing = parseCubicBezier(args[0]);
        if (easing) {
          return easing;
        }
      }
    }
  }
  if (args.length === 4) {
    return args;
  }
  return [0, 0, 1, 1];
};
var createBezierEasing = (x1, y1, x2, y2) => {
  var curveX = cubicBezier(x1, x2);
  var curveY = cubicBezier(y1, y2);
  var derCurveX = derivativeCubicBezier(x1, x2);
  var rangeValue = (value) => {
    if (value > 1) {
      return 1;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  };
  var bezier = (_t) => {
    var t = _t > 1 ? 1 : _t;
    var x = t;
    for (var i = 0; i < 8; ++i) {
      var evalT = curveX(x) - t;
      var derVal = derCurveX(x);
      if (Math.abs(evalT - t) < ACCURACY || derVal < ACCURACY) {
        return curveY(x);
      }
      x = rangeValue(x - evalT / derVal);
    }
    return curveY(x);
  };
  bezier.isStepper = false;
  return bezier;
};
var configBezier = function configBezier2() {
  return createBezierEasing(...getBezierCoordinates(...arguments));
};
var configSpring = function configSpring2() {
  var config = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var {
    stiff = 100,
    damping = 8,
    dt = 17
  } = config;
  var stepper = (currX, destX, currV) => {
    var FSpring = -(currX - destX) * stiff;
    var FDamping = currV * damping;
    var newV = currV + (FSpring - FDamping) * dt / 1e3;
    var newX = currV * dt / 1e3 + currX;
    if (Math.abs(newX - destX) < ACCURACY && Math.abs(newV) < ACCURACY) {
      return [destX, 0];
    }
    return [newX, newV];
  };
  stepper.isStepper = true;
  stepper.dt = dt;
  return stepper;
};
var configEasing = (easing) => {
  if (typeof easing === "string") {
    switch (easing) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return configBezier(easing);
      case "spring":
        return configSpring();
      default:
        if (easing.split("(")[0] === "cubic-bezier") {
          return configBezier(easing);
        }
    }
  }
  if (typeof easing === "function") {
    return easing;
  }
  return null;
};
function createAnimateManager(timeoutController) {
  var currStyle;
  var handleChange = () => null;
  var shouldStop = false;
  var cancelTimeout = null;
  var setStyle = (_style) => {
    if (shouldStop) {
      return;
    }
    if (Array.isArray(_style)) {
      if (!_style.length) {
        return;
      }
      var styles = _style;
      var [curr, ...restStyles] = styles;
      if (typeof curr === "number") {
        cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles), curr);
        return;
      }
      setStyle(curr);
      cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles));
      return;
    }
    if (typeof _style === "string") {
      currStyle = _style;
      handleChange(currStyle);
    }
    if (typeof _style === "object") {
      currStyle = _style;
      handleChange(currStyle);
    }
    if (typeof _style === "function") {
      _style();
    }
  };
  return {
    stop: () => {
      shouldStop = true;
    },
    start: (style) => {
      shouldStop = false;
      if (cancelTimeout) {
        cancelTimeout();
        cancelTimeout = null;
      }
      setStyle(style);
    },
    subscribe: (_handleChange) => {
      handleChange = _handleChange;
      return () => {
        handleChange = () => null;
      };
    },
    getTimeoutController: () => timeoutController
  };
}
class RequestAnimationFrameTimeoutController {
  setTimeout(callback) {
    var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var startTime = performance.now();
    var requestId = null;
    var executeCallback = (now) => {
      if (now - startTime >= delay) {
        callback(now);
      } else if (typeof requestAnimationFrame === "function") {
        requestId = requestAnimationFrame(executeCallback);
      }
    };
    requestId = requestAnimationFrame(executeCallback);
    return () => {
      if (requestId != null) {
        cancelAnimationFrame(requestId);
      }
    };
  }
}
function createDefaultAnimationManager() {
  return createAnimateManager(new RequestAnimationFrameTimeoutController());
}
var AnimationManagerContext = /* @__PURE__ */ createContext(createDefaultAnimationManager);
function useAnimationManager(animationId, animationManagerFromProps) {
  var contextAnimationManager = useContext(AnimationManagerContext);
  return useMemo(() => animationManagerFromProps !== null && animationManagerFromProps !== void 0 ? animationManagerFromProps : contextAnimationManager(animationId), [animationId, animationManagerFromProps, contextAnimationManager]);
}
var defaultJavascriptAnimateProps = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: true,
  canBegin: true,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
};
var from = {
  t: 0
};
var to = {
  t: 1
};
function JavascriptAnimate(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultJavascriptAnimateProps);
  var {
    isActive: isActiveProp,
    canBegin,
    duration,
    easing,
    begin,
    onAnimationEnd,
    onAnimationStart,
    children
  } = props;
  var prefersReducedMotion = usePrefersReducedMotion();
  var isActive = isActiveProp === "auto" ? !Global.isSsr && !prefersReducedMotion : isActiveProp;
  var animationManager = useAnimationManager(props.animationId, props.animationManager);
  var [style, setStyle] = useState(isActive ? from : to);
  var stopJSAnimation = useRef(null);
  useEffect(() => {
    if (!isActive) {
      setStyle(to);
    }
  }, [isActive]);
  useEffect(() => {
    if (!isActive || !canBegin) {
      return noop$1;
    }
    var startAnimation = configUpdate(from, to, configEasing(easing), duration, setStyle, animationManager.getTimeoutController());
    var onAnimationActive = () => {
      stopJSAnimation.current = startAnimation();
    };
    animationManager.start([onAnimationStart, begin, onAnimationActive, duration, onAnimationEnd]);
    return () => {
      animationManager.stop();
      if (stopJSAnimation.current) {
        stopJSAnimation.current();
      }
      onAnimationEnd();
    };
  }, [isActive, canBegin, duration, easing, begin, onAnimationStart, onAnimationEnd, animationManager]);
  return children(style.t);
}
function useAnimationId(input) {
  var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-";
  var animationId = useRef(uniqueId(prefix));
  var prevProps = useRef(input);
  if (prevProps.current !== input) {
    animationId.current = uniqueId(prefix);
    prevProps.current = input;
  }
  return animationId.current;
}
var _excluded$7 = ["radius"], _excluded2$3 = ["radius"];
var _templateObject$2, _templateObject2$2, _templateObject3$2, _templateObject4$2, _templateObject5$2, _templateObject6$1, _templateObject7$1, _templateObject8, _templateObject9, _templateObject0;
function ownKeys$i(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$i(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$i(Object(t), true).forEach(function(r2) {
      _defineProperty$k(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$i(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$k(e, r, t) {
  return (r = _toPropertyKey$k(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$k(t) {
  var i = _toPrimitive$k(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$k(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$8() {
  return _extends$8 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$8.apply(null, arguments);
}
function _objectWithoutProperties$7(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$7(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$7(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _taggedTemplateLiteral$2(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getRectanglePath = (x, y, width, height, radius) => {
  var roundedWidth = round(width);
  var roundedHeight = round(height);
  var maxRadius = Math.min(Math.abs(roundedWidth) / 2, Math.abs(roundedHeight) / 2);
  var ySign = roundedHeight >= 0 ? 1 : -1;
  var xSign = roundedWidth >= 0 ? 1 : -1;
  var clockWise = roundedHeight >= 0 && roundedWidth >= 0 || roundedHeight < 0 && roundedWidth < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && Array.isArray(radius)) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      var _radius$i;
      var r = (_radius$i = radius[i]) !== null && _radius$i !== void 0 ? _radius$i : 0;
      newRadius[i] = r > maxRadius ? maxRadius : r;
    }
    path = roundTemplateLiteral(_templateObject$2 || (_templateObject$2 = _taggedTemplateLiteral$2(["M", ",", ""])), x, y + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += roundTemplateLiteral(_templateObject2$2 || (_templateObject2$2 = _taggedTemplateLiteral$2(["A ", ",", ",0,0,", ",", ",", ""])), newRadius[0], newRadius[0], clockWise, x + xSign * newRadius[0], y);
    }
    path += roundTemplateLiteral(_templateObject3$2 || (_templateObject3$2 = _taggedTemplateLiteral$2(["L ", ",", ""])), x + width - xSign * newRadius[1], y);
    if (newRadius[1] > 0) {
      path += roundTemplateLiteral(_templateObject4$2 || (_templateObject4$2 = _taggedTemplateLiteral$2(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[1], newRadius[1], clockWise, x + width, y + ySign * newRadius[1]);
    }
    path += roundTemplateLiteral(_templateObject5$2 || (_templateObject5$2 = _taggedTemplateLiteral$2(["L ", ",", ""])), x + width, y + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += roundTemplateLiteral(_templateObject6$1 || (_templateObject6$1 = _taggedTemplateLiteral$2(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[2], newRadius[2], clockWise, x + width - xSign * newRadius[2], y + height);
    }
    path += roundTemplateLiteral(_templateObject7$1 || (_templateObject7$1 = _taggedTemplateLiteral$2(["L ", ",", ""])), x + xSign * newRadius[3], y + height);
    if (newRadius[3] > 0) {
      path += roundTemplateLiteral(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral$2(["A ", ",", ",0,0,", ",\n        ", ",", ""])), newRadius[3], newRadius[3], clockWise, x, y + height - ySign * newRadius[3]);
    }
    path += "Z";
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = roundTemplateLiteral(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral$2(["M ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", "\n            L ", ",", "\n            A ", ",", ",0,0,", ",", ",", " Z"])), x, y + ySign * _newRadius, _newRadius, _newRadius, clockWise, x + xSign * _newRadius, y, x + width - xSign * _newRadius, y, _newRadius, _newRadius, clockWise, x + width, y + ySign * _newRadius, x + width, y + height - ySign * _newRadius, _newRadius, _newRadius, clockWise, x + width - xSign * _newRadius, y + height, x + xSign * _newRadius, y + height, _newRadius, _newRadius, clockWise, x, y + height - ySign * _newRadius);
  } else {
    path = roundTemplateLiteral(_templateObject0 || (_templateObject0 = _taggedTemplateLiteral$2(["M ", ",", " h ", " v ", " h ", " Z"])), x, y, width, height, -width);
  }
  return path;
};
var defaultRectangleProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
};
var Rectangle = (rectangleProps) => {
  var props = resolveDefaultProps(rectangleProps, defaultRectangleProps);
  var pathRef = useRef(null);
  var [totalLength, setTotalLength] = useState(-1);
  useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (_unused) {
      }
    }
  }, []);
  var {
    x,
    y,
    width,
    height,
    radius,
    className
  } = props;
  var {
    animationEasing,
    animationDuration,
    animationBegin,
    isAnimationActive,
    isUpdateAnimationActive
  } = props;
  var prevWidthRef = useRef(width);
  var prevHeightRef = useRef(height);
  var prevXRef = useRef(x);
  var prevYRef = useRef(y);
  var animationIdInput = useMemo(() => ({
    x,
    y,
    width,
    height,
    radius
  }), [x, y, width, height, radius]);
  var animationId = useAnimationId(animationIdInput, "rectangle-");
  if (x !== +x || y !== +y || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx("recharts-rectangle", className);
  if (!isUpdateAnimationActive) {
    var _svgPropertiesAndEven = svgPropertiesAndEvents(props), {
      radius: _
    } = _svgPropertiesAndEven, otherPathProps = _objectWithoutProperties$7(_svgPropertiesAndEven, _excluded$7);
    return /* @__PURE__ */ React.createElement("path", _extends$8({}, otherPathProps, {
      x: round(x),
      y: round(y),
      width: round(width),
      height: round(height),
      radius: typeof radius === "number" ? radius : void 0,
      className: layerClass,
      d: getRectanglePath(x, y, width, height, radius)
    }));
  }
  var prevWidth = prevWidthRef.current;
  var prevHeight = prevHeightRef.current;
  var prevX = prevXRef.current;
  var prevY = prevYRef.current;
  var from2 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
  var to2 = "".concat(totalLength, "px ").concat(totalLength, "px");
  var transition = getTransitionVal(["strokeDasharray"], animationDuration, typeof animationEasing === "string" ? animationEasing : defaultRectangleProps.animationEasing);
  return /* @__PURE__ */ React.createElement(JavascriptAnimate, {
    animationId,
    key: animationId,
    canBegin: totalLength > 0,
    duration: animationDuration,
    easing: animationEasing,
    isActive: isUpdateAnimationActive,
    begin: animationBegin
  }, (t) => {
    var currWidth = interpolate(prevWidth, width, t);
    var currHeight = interpolate(prevHeight, height, t);
    var currX = interpolate(prevX, x, t);
    var currY = interpolate(prevY, y, t);
    if (pathRef.current) {
      prevWidthRef.current = currWidth;
      prevHeightRef.current = currHeight;
      prevXRef.current = currX;
      prevYRef.current = currY;
    }
    var animationStyle;
    if (!isAnimationActive) {
      animationStyle = {
        strokeDasharray: to2
      };
    } else if (t > 0) {
      animationStyle = {
        transition,
        strokeDasharray: to2
      };
    } else {
      animationStyle = {
        strokeDasharray: from2
      };
    }
    var _svgPropertiesAndEven2 = svgPropertiesAndEvents(props), {
      radius: _2
    } = _svgPropertiesAndEven2, otherPathProps2 = _objectWithoutProperties$7(_svgPropertiesAndEven2, _excluded2$3);
    return /* @__PURE__ */ React.createElement("path", _extends$8({}, otherPathProps2, {
      radius: typeof radius === "number" ? radius : void 0,
      className: layerClass,
      d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
      ref: pathRef,
      style: _objectSpread$i(_objectSpread$i({}, animationStyle), props.style)
    }));
  });
};
function ownKeys$h(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$h(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$h(Object(t), true).forEach(function(r2) {
      _defineProperty$j(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$h(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$j(e, r, t) {
  return (r = _toPropertyKey$j(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$j(t) {
  var i = _toPrimitive$j(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$j(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var RADIAN = Math.PI / 180;
var radianToDegree = (angleInRadian) => angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle) => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius
});
var getMaxRadius = function getMaxRadius2(width, height) {
  var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point, anotherPoint) => {
  var {
    x: x1,
    y: y1
  } = point;
  var {
    x: x2,
    y: y2
  } = anotherPoint;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref2, _ref22) => {
  var {
    x,
    y
  } = _ref2;
  var {
    cx,
    cy
  } = _ref22;
  var radius = distanceBetweenPoints({
    x,
    y
  }, {
    x: cx,
    y: cy
  });
  if (radius <= 0) {
    return {
      radius,
      angle: 0
    };
  }
  var cos = (x - cx) / radius;
  var angleInRadian = Math.acos(cos);
  if (y > cy) {
    angleInRadian = 2 * Math.PI - angleInRadian;
  }
  return {
    radius,
    angle: radianToDegree(angleInRadian),
    angleInRadian
  };
};
var formatAngleOfSector = (_ref3) => {
  var {
    startAngle,
    endAngle
  } = _ref3;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min = Math.min(startCnt, endCnt);
  return {
    startAngle: startAngle - min * 360,
    endAngle: endAngle - min * 360
  };
};
var reverseFormatAngleOfSector = (angle, _ref4) => {
  var {
    startAngle,
    endAngle
  } = _ref4;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min = Math.min(startCnt, endCnt);
  return angle + min * 360;
};
var inRangeOfSector = (_ref5, viewBox) => {
  var {
    relativeX: x,
    relativeY: y
  } = _ref5;
  var {
    radius,
    angle
  } = getAngleOfPoint({
    x,
    y
  }, viewBox);
  var {
    innerRadius,
    outerRadius
  } = viewBox;
  if (radius < innerRadius || radius > outerRadius) {
    return null;
  }
  if (radius === 0) {
    return null;
  }
  var {
    startAngle,
    endAngle
  } = formatAngleOfSector(viewBox);
  var formatAngle = angle;
  var inRange;
  if (startAngle <= endAngle) {
    while (formatAngle > endAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < startAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= startAngle && formatAngle <= endAngle;
  } else {
    while (formatAngle > startAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < endAngle) {
      formatAngle += 360;
    }
    inRange = formatAngle >= endAngle && formatAngle <= startAngle;
  }
  if (inRange) {
    return _objectSpread$h(_objectSpread$h({}, viewBox), {}, {
      radius,
      angle: reverseFormatAngleOfSector(formatAngle, viewBox)
    });
  }
  return null;
};
function getRadialCursorPoints(activeCoordinate) {
  var {
    cx,
    cy,
    radius,
    startAngle,
    endAngle
  } = activeCoordinate;
  var startPoint = polarToCartesian(cx, cy, radius, startAngle);
  var endPoint = polarToCartesian(cx, cy, radius, endAngle);
  return {
    points: [startPoint, endPoint],
    cx,
    cy,
    radius,
    startAngle,
    endAngle
  };
}
var _templateObject$1, _templateObject2$1, _templateObject3$1, _templateObject4$1, _templateObject5$1, _templateObject6, _templateObject7;
function _extends$7() {
  return _extends$7 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$7.apply(null, arguments);
}
function _taggedTemplateLiteral$1(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getDeltaAngle$1 = (startAngle, endAngle) => {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
  return sign * deltaAngle;
};
var getTangentCircle = (_ref2) => {
  var {
    cx,
    cy,
    radius,
    angle,
    sign,
    isExternal,
    cornerRadius,
    cornerIsExternal
  } = _ref2;
  var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
  var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
  var centerAngle = cornerIsExternal ? angle : angle + sign * theta;
  var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
  var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
  var lineTangencyAngle = cornerIsExternal ? angle - sign * theta : angle;
  var lineTangency = polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle);
  return {
    center,
    circleTangency,
    lineTangency,
    theta
  };
};
var getSectorPath = (_ref2) => {
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  } = _ref2;
  var angle = getDeltaAngle$1(startAngle, endAngle);
  var tempEndAngle = startAngle + angle;
  var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
  var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
  var path = roundTemplateLiteral(_templateObject$1 || (_templateObject$1 = _taggedTemplateLiteral$1(["M ", ",", "\n    A ", ",", ",0,\n    ", ",", ",\n    ", ",", "\n  "])), outerStartPoint.x, outerStartPoint.y, outerRadius, outerRadius, +(Math.abs(angle) > 180), +(startAngle > tempEndAngle), outerEndPoint.x, outerEndPoint.y);
  if (innerRadius > 0) {
    var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
    var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
    path += roundTemplateLiteral(_templateObject2$1 || (_templateObject2$1 = _taggedTemplateLiteral$1(["L ", ",", "\n            A ", ",", ",0,\n            ", ",", ",\n            ", ",", " Z"])), innerEndPoint.x, innerEndPoint.y, innerRadius, innerRadius, +(Math.abs(angle) > 180), +(startAngle <= tempEndAngle), innerStartPoint.x, innerStartPoint.y);
  } else {
    path += roundTemplateLiteral(_templateObject3$1 || (_templateObject3$1 = _taggedTemplateLiteral$1(["L ", ",", " Z"])), cx, cy);
  }
  return path;
};
var getSectorWithCorner = (_ref3) => {
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    cornerRadius,
    forceCornerRadius,
    cornerIsExternal,
    startAngle,
    endAngle
  } = _ref3;
  var sign = mathSign(endAngle - startAngle);
  var {
    circleTangency: soct,
    lineTangency: solt,
    theta: sot
  } = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: startAngle,
    sign,
    cornerRadius,
    cornerIsExternal
  });
  var {
    circleTangency: eoct,
    lineTangency: eolt,
    theta: eot
  } = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: endAngle,
    sign: -sign,
    cornerRadius,
    cornerIsExternal
  });
  var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return roundTemplateLiteral(_templateObject4$1 || (_templateObject4$1 = _taggedTemplateLiteral$1(["M ", ",", "\n        a", ",", ",0,0,1,", ",0\n        a", ",", ",0,0,1,", ",0\n      "])), solt.x, solt.y, cornerRadius, cornerRadius, cornerRadius * 2, cornerRadius, cornerRadius, -cornerRadius * 2);
    }
    return getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  var path = roundTemplateLiteral(_templateObject5$1 || (_templateObject5$1 = _taggedTemplateLiteral$1(["M ", ",", "\n    A", ",", ",0,0,", ",", ",", "\n    A", ",", ",0,", ",", ",", ",", "\n    A", ",", ",0,0,", ",", ",", "\n  "])), solt.x, solt.y, cornerRadius, cornerRadius, +(sign < 0), soct.x, soct.y, outerRadius, outerRadius, +(outerArcAngle > 180), +(sign < 0), eoct.x, eoct.y, cornerRadius, cornerRadius, +(sign < 0), eolt.x, eolt.y);
  if (innerRadius > 0) {
    var {
      circleTangency: sict,
      lineTangency: silt,
      theta: sit
    } = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: startAngle,
      sign,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    });
    var {
      circleTangency: eict,
      lineTangency: eilt,
      theta: eit
    } = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: endAngle,
      sign: -sign,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    });
    var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
    if (innerArcAngle < 0 && cornerRadius === 0) {
      return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
    }
    path += roundTemplateLiteral(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral$1(["L", ",", "\n      A", ",", ",0,0,", ",", ",", "\n      A", ",", ",0,", ",", ",", ",", "\n      A", ",", ",0,0,", ",", ",", "Z"])), eilt.x, eilt.y, cornerRadius, cornerRadius, +(sign < 0), eict.x, eict.y, innerRadius, innerRadius, +(innerArcAngle > 180), +(sign > 0), sict.x, sict.y, cornerRadius, cornerRadius, +(sign < 0), silt.x, silt.y);
  } else {
    path += roundTemplateLiteral(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral$1(["L", ",", "Z"])), cx, cy);
  }
  return path;
};
var defaultSectorProps = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: false,
  cornerIsExternal: false
};
var Sector = (sectorProps) => {
  var props = resolveDefaultProps(sectorProps, defaultSectorProps);
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    cornerRadius,
    forceCornerRadius,
    cornerIsExternal,
    startAngle,
    endAngle,
    className
  } = props;
  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }
  var layerClass = clsx("recharts-sector", className);
  var deltaRadius = outerRadius - innerRadius;
  var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
  var path;
  if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
    path = getSectorWithCorner({
      cx,
      cy,
      innerRadius,
      outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius,
      cornerIsExternal,
      startAngle,
      endAngle
    });
  } else {
    path = getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  return /* @__PURE__ */ React.createElement("path", _extends$7({}, svgPropertiesAndEvents(props), {
    className: layerClass,
    d: path
  }));
};
function getCursorPoints(layout, activeCoordinate, offset) {
  if (layout === "horizontal") {
    return [{
      x: activeCoordinate.x,
      y: offset.top
    }, {
      x: activeCoordinate.x,
      y: offset.top + offset.height
    }];
  }
  if (layout === "vertical") {
    return [{
      x: offset.left,
      y: activeCoordinate.y
    }, {
      x: offset.left + offset.width,
      y: activeCoordinate.y
    }];
  }
  if (isPolarCoordinate(activeCoordinate)) {
    if (layout === "centric") {
      var {
        cx,
        cy,
        innerRadius,
        outerRadius,
        angle
      } = activeCoordinate;
      var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
      var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
      return [{
        x: innerPoint.x,
        y: innerPoint.y
      }, {
        x: outerPoint.x,
        y: outerPoint.y
      }];
    }
    return getRadialCursorPoints(activeCoordinate);
  }
  return void 0;
}
var selectChartDataWithIndexes = (state) => state.chartData;
var selectChartDataAndAlwaysIgnoreIndexes = createSelector([selectChartDataWithIndexes], (dataState) => {
  var dataEndIndex = dataState.chartData != null ? dataState.chartData.length - 1 : 0;
  return {
    chartData: dataState.chartData,
    computedData: dataState.computedData,
    dataEndIndex,
    dataStartIndex: 0
  };
});
var selectChartDataWithIndexesIfNotInPanoramaPosition4 = (state, _unused1, _unused2, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
var selectChartDataWithIndexesIfNotInPanoramaPosition3 = (state, _unused1, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
var selectChartDataSliceIfNotInPanorama = createSelector([selectChartDataWithIndexesIfNotInPanoramaPosition4], (_ref2) => {
  var {
    chartData,
    dataStartIndex,
    dataEndIndex
  } = _ref2;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
var selectChartDataSliceIgnoringIndexes = createSelector([selectChartDataAndAlwaysIgnoreIndexes], (_ref2) => {
  var {
    chartData,
    dataStartIndex,
    dataEndIndex
  } = _ref2;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
var selectChartDataSliceWithIndexes = createSelector([selectChartDataWithIndexes], (_ref3) => {
  var {
    chartData,
    dataStartIndex,
    dataEndIndex
  } = _ref3;
  return chartData != null ? chartData.slice(dataStartIndex, dataEndIndex + 1) : [];
});
function isWellFormedNumberDomain(v) {
  if (Array.isArray(v) && v.length === 2) {
    var [min, max] = v;
    if (isWellBehavedNumber(min) && isWellBehavedNumber(max)) {
      return true;
    }
  }
  return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
  if (allowDataOverflow) {
    return providedDomain;
  }
  return [Math.min(providedDomain[0], boundaryDomain[0]), Math.max(providedDomain[1], boundaryDomain[1])];
}
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
  if (!allowDataOverflow) {
    return void 0;
  }
  if (typeof userDomain === "function") {
    return void 0;
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var [providedMin, providedMax] = userDomain;
    var finalMin, finalMax;
    if (isWellBehavedNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      return void 0;
    }
    if (isWellBehavedNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      return void 0;
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      return candidate;
    }
  }
  return void 0;
}
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
  if (!allowDataOverflow && dataDomain == null) {
    return void 0;
  }
  if (typeof userDomain === "function" && dataDomain != null) {
    try {
      var result = userDomain(dataDomain, allowDataOverflow);
      if (isWellFormedNumberDomain(result)) {
        return extendDomain(result, dataDomain, allowDataOverflow);
      }
    } catch (_unused) {
    }
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var [providedMin, providedMax] = userDomain;
    var finalMin, finalMax;
    if (providedMin === "auto") {
      if (dataDomain != null) {
        finalMin = Math.min(...dataDomain);
      }
    } else if (isNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      try {
        if (dataDomain != null) {
          finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
        }
      } catch (_unused2) {
      }
    } else if (typeof providedMin === "string" && MIN_VALUE_REG.test(providedMin)) {
      var match = MIN_VALUE_REG.exec(providedMin);
      if (match == null || match[1] == null || dataDomain == null) {
        finalMin = void 0;
      } else {
        var value = +match[1];
        finalMin = dataDomain[0] - value;
      }
    } else {
      finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
    }
    if (providedMax === "auto") {
      if (dataDomain != null) {
        finalMax = Math.max(...dataDomain);
      }
    } else if (isNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      try {
        if (dataDomain != null) {
          finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
        }
      } catch (_unused3) {
      }
    } else if (typeof providedMax === "string" && MAX_VALUE_REG.test(providedMax)) {
      var _match = MAX_VALUE_REG.exec(providedMax);
      if (_match == null || _match[1] == null || dataDomain == null) {
        finalMax = void 0;
      } else {
        var _value = +_match[1];
        finalMax = dataDomain[1] + _value;
      }
    } else {
      finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      if (dataDomain == null) {
        return candidate;
      }
      return extendDomain(candidate, dataDomain, allowDataOverflow);
    }
  }
  return void 0;
}
function getDigitCount(value) {
  var result;
  if (value === 0) {
    result = 1;
  } else {
    result = Math.floor(new Decimal(value).abs().log(10).toNumber()) + 1;
  }
  return result;
}
function rangeStep(start, end, step) {
  var num = new Decimal(start);
  var i = 0;
  var result = [];
  while (num.lt(end) && i < 1e5) {
    result.push(num.toNumber());
    num = num.add(step);
    i++;
  }
  return result;
}
var getValidInterval = (_ref2) => {
  var [min, max] = _ref2;
  var [validMin, validMax] = [min, max];
  if (min > max) {
    [validMin, validMax] = [max, min];
  }
  return [validMin, validMax];
};
var getAdaptiveStep = (roughStep, allowDecimals, correctionFactor) => {
  if (roughStep.lte(0)) {
    return new Decimal(0);
  }
  var digitCount = getDigitCount(roughStep.toNumber());
  var digitCountValue = new Decimal(10).pow(digitCount);
  var stepRatio = roughStep.div(digitCountValue);
  var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
  var amendStepRatio = new Decimal(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? new Decimal(formatStep.toNumber()) : new Decimal(Math.ceil(formatStep.toNumber()));
};
var getSnap125Step = (roughStep, allowDecimals, correctionFactor) => {
  var _NICE_STEPS$niceIdx;
  if (roughStep.lte(0)) {
    return new Decimal(0);
  }
  var NICE_STEPS = [1, 2, 2.5, 5];
  var roughNum = roughStep.toNumber();
  var exponent = Math.floor(new Decimal(roughNum).abs().log(10).toNumber());
  var magnitude = new Decimal(10).pow(exponent);
  var normalized = roughStep.div(magnitude).toNumber();
  var niceIdx = NICE_STEPS.findIndex((s) => s >= normalized - 1e-10);
  if (niceIdx === -1) {
    magnitude = magnitude.mul(10);
    niceIdx = 0;
  }
  niceIdx += correctionFactor;
  if (niceIdx >= NICE_STEPS.length) {
    var extraMag = Math.floor(niceIdx / NICE_STEPS.length);
    niceIdx %= NICE_STEPS.length;
    magnitude = magnitude.mul(new Decimal(10).pow(extraMag));
  }
  var niceStep = (_NICE_STEPS$niceIdx = NICE_STEPS[niceIdx]) !== null && _NICE_STEPS$niceIdx !== void 0 ? _NICE_STEPS$niceIdx : 1;
  var formatStep = new Decimal(niceStep).mul(magnitude);
  return allowDecimals ? formatStep : new Decimal(Math.ceil(formatStep.toNumber()));
};
var getTickOfSingleValue = (value, tickCount, allowDecimals) => {
  var step = new Decimal(1);
  var middle = new Decimal(value);
  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);
    if (absVal < 1) {
      step = new Decimal(10).pow(getDigitCount(value) - 1);
      middle = new Decimal(Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      middle = new Decimal(Math.floor(value));
    }
  } else if (value === 0) {
    middle = new Decimal(Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new Decimal(Math.floor(value));
  }
  var middleIndex = Math.floor((tickCount - 1) / 2);
  var ticks = [];
  for (var i = 0; i < tickCount; i++) {
    ticks.push(middle.add(new Decimal(i - middleIndex).mul(step)).toNumber());
  }
  return ticks;
};
var _calculateStep = function calculateStep(min, max, tickCount, allowDecimals) {
  var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  var stepFn = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : getAdaptiveStep;
  if (!Number.isFinite((max - min) / (tickCount - 1))) {
    return {
      step: new Decimal(0),
      tickMin: new Decimal(0),
      tickMax: new Decimal(0)
    };
  }
  var step = stepFn(new Decimal(max).sub(min).div(tickCount - 1), allowDecimals, correctionFactor);
  var middle;
  if (min <= 0 && max >= 0) {
    middle = new Decimal(0);
  } else {
    middle = new Decimal(min).add(max).div(2);
    middle = middle.sub(new Decimal(middle).mod(step));
  }
  var belowCount = Math.ceil(middle.sub(min).div(step).toNumber());
  var upCount = Math.ceil(new Decimal(max).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;
  if (scaleCount > tickCount) {
    return _calculateStep(min, max, tickCount, allowDecimals, correctionFactor + 1, stepFn);
  }
  if (scaleCount < tickCount) {
    upCount = max > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }
  return {
    step,
    tickMin: middle.sub(new Decimal(belowCount).mul(step)),
    tickMax: middle.add(new Decimal(upCount).mul(step))
  };
};
var getNiceTickValues = function getNiceTickValues2(_ref2) {
  var [min, max] = _ref2;
  var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
  var count = Math.max(tickCount, 2);
  var [cormin, cormax] = getValidInterval([min, max]);
  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin, ...Array(tickCount - 1).fill(Infinity)] : [...Array(tickCount - 1).fill(-Infinity), cormax];
    return min > max ? _values.reverse() : _values;
  }
  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  }
  var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
  var {
    step,
    tickMin,
    tickMax
  } = _calculateStep(cormin, cormax, count, allowDecimals, 0, stepFn);
  var values = rangeStep(tickMin, tickMax.add(new Decimal(0.1).mul(step)), step);
  return min > max ? values.reverse() : values;
};
var getTickValuesFixedDomain = function getTickValuesFixedDomain2(_ref3, tickCount) {
  var [min, max] = _ref3;
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var niceTicksMode = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto";
  var [cormin, cormax] = getValidInterval([min, max]);
  if (cormin === -Infinity || cormax === Infinity) {
    return [min, max];
  }
  if (cormin === cormax) {
    return [cormin];
  }
  var stepFn = niceTicksMode === "snap125" ? getSnap125Step : getAdaptiveStep;
  var count = Math.max(tickCount, 2);
  var step = stepFn(new Decimal(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
  var values = [...rangeStep(new Decimal(cormin), new Decimal(cormax), step), cormax];
  if (allowDecimals === false) {
    values = values.map((value) => Math.round(value));
  }
  return min > max ? values.reverse() : values;
};
var selectRootMaxBarSize = (state) => state.rootProps.maxBarSize;
var selectBarGap = (state) => state.rootProps.barGap;
var selectBarCategoryGap = (state) => state.rootProps.barCategoryGap;
var selectRootBarSize = (state) => state.rootProps.barSize;
var selectStackOffsetType = (state) => state.rootProps.stackOffset;
var selectReverseStackOrder = (state) => state.rootProps.reverseStackOrder;
var selectChartName = (state) => state.options.chartName;
var selectSyncId = (state) => state.rootProps.syncId;
var selectSyncMethod = (state) => state.rootProps.syncMethod;
var selectEventEmitter = (state) => state.options.eventEmitter;
var selectChartBaseValue = (state) => state.rootProps.baseValue;
var DefaultZIndexes = {
  /**
   * CartesianGrid and PolarGrid
   */
  grid: -100,
  /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */
  barBackground: -50,
  /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */
  /**
   * Area, Pie, Radar, and ReferenceArea
   */
  area: 100,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */
  cursorRectangle: 200,
  /**
   * Bar and RadialBar
   */
  bar: 300,
  /**
   * Line and ReferenceLine, and ErrorBor
   */
  line: 400,
  /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */
  axis: 500,
  /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */
  scatter: 600,
  /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */
  activeBar: 1e3,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */
  cursorLine: 1100,
  /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */
  activeDot: 1200,
  /**
   * LabelList and Label, including Axis labels
   */
  label: 2e3
};
var defaultPolarAngleAxisProps = {
  allowDecimals: false,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: false,
  angleAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  type: "auto"
};
var defaultPolarRadiusAxisProps = {
  allowDataOverflow: false,
  allowDecimals: false,
  allowDuplicatedCategory: true,
  includeHidden: false,
  radiusAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  type: "auto"
};
var combineAxisRangeWithReverse = (axisSettings, axisRange) => {
  if (!axisSettings || !axisRange) {
    return void 0;
  }
  if (axisSettings !== null && axisSettings !== void 0 && axisSettings.reversed) {
    return [axisRange[1], axisRange[0]];
  }
  return axisRange;
};
function getAxisTypeBasedOnLayout(layout, axisType, axisDomainType) {
  if (axisDomainType !== "auto") {
    return axisDomainType;
  }
  if (layout == null) {
    return void 0;
  }
  return isCategoricalAxis(layout, axisType) ? "category" : "number";
}
function ownKeys$g(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$g(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$g(Object(t), true).forEach(function(r2) {
      _defineProperty$i(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$g(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$i(e, r, t) {
  return (r = _toPropertyKey$i(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$i(t) {
  var i = _toPrimitive$i(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$i(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var implicitAngleAxis = {
  allowDataOverflow: defaultPolarAngleAxisProps.allowDataOverflow,
  allowDecimals: defaultPolarAngleAxisProps.allowDecimals,
  allowDuplicatedCategory: false,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarAngleAxisProps.angleAxisId,
  includeHidden: false,
  name: void 0,
  reversed: defaultPolarAngleAxisProps.reversed,
  scale: defaultPolarAngleAxisProps.scale,
  tick: defaultPolarAngleAxisProps.tick,
  tickCount: void 0,
  ticks: void 0,
  type: defaultPolarAngleAxisProps.type,
  unit: void 0,
  niceTicks: "auto"
};
var implicitRadiusAxis = {
  allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
  allowDecimals: defaultPolarRadiusAxisProps.allowDecimals,
  allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarRadiusAxisProps.radiusAxisId,
  includeHidden: defaultPolarRadiusAxisProps.includeHidden,
  name: void 0,
  reversed: defaultPolarRadiusAxisProps.reversed,
  scale: defaultPolarRadiusAxisProps.scale,
  tick: defaultPolarRadiusAxisProps.tick,
  tickCount: defaultPolarRadiusAxisProps.tickCount,
  ticks: void 0,
  type: defaultPolarRadiusAxisProps.type,
  unit: void 0,
  niceTicks: "auto"
};
var selectAngleAxisNoDefaults = (state, angleAxisId) => {
  if (angleAxisId == null) {
    return void 0;
  }
  return state.polarAxis.angleAxis[angleAxisId];
};
var selectAngleAxis = createSelector([selectAngleAxisNoDefaults, selectPolarChartLayout], (angleAxisSettings, layout) => {
  var _getAxisTypeBasedOnLa;
  if (angleAxisSettings != null) {
    return angleAxisSettings;
  }
  var evaluatedType = (_getAxisTypeBasedOnLa = getAxisTypeBasedOnLayout(layout, "angleAxis", implicitAngleAxis.type)) !== null && _getAxisTypeBasedOnLa !== void 0 ? _getAxisTypeBasedOnLa : "category";
  return _objectSpread$g(_objectSpread$g({}, implicitAngleAxis), {}, {
    type: evaluatedType
  });
});
var selectRadiusAxisNoDefaults = (state, radiusAxisId) => {
  return state.polarAxis.radiusAxis[radiusAxisId];
};
var selectRadiusAxis = createSelector([selectRadiusAxisNoDefaults, selectPolarChartLayout], (radiusAxisSettings, layout) => {
  var _getAxisTypeBasedOnLa2;
  if (radiusAxisSettings != null) {
    return radiusAxisSettings;
  }
  var evaluatedType = (_getAxisTypeBasedOnLa2 = getAxisTypeBasedOnLayout(layout, "radiusAxis", implicitRadiusAxis.type)) !== null && _getAxisTypeBasedOnLa2 !== void 0 ? _getAxisTypeBasedOnLa2 : "category";
  return _objectSpread$g(_objectSpread$g({}, implicitRadiusAxis), {}, {
    type: evaluatedType
  });
});
var selectPolarOptions = (state) => state.polarOptions;
var selectMaxRadius = createSelector([selectChartWidth, selectChartHeight, selectChartOffsetInternal], getMaxRadius);
var selectInnerRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.innerRadius, maxRadius, 0);
});
var selectOuterRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.outerRadius, maxRadius, maxRadius * 0.8);
});
var combineAngleAxisRange = (polarOptions) => {
  if (polarOptions == null) {
    return [0, 0];
  }
  var {
    startAngle,
    endAngle
  } = polarOptions;
  return [startAngle, endAngle];
};
var selectAngleAxisRange = createSelector([selectPolarOptions], combineAngleAxisRange);
createSelector([selectAngleAxis, selectAngleAxisRange], combineAxisRangeWithReverse);
var selectRadiusAxisRange = createSelector([selectMaxRadius, selectInnerRadius, selectOuterRadius], (maxRadius, innerRadius, outerRadius) => {
  if (maxRadius == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  return [innerRadius, outerRadius];
});
createSelector([selectRadiusAxis, selectRadiusAxisRange], combineAxisRangeWithReverse);
var selectPolarViewBox = createSelector([selectChartLayout, selectPolarOptions, selectInnerRadius, selectOuterRadius, selectChartWidth, selectChartHeight], (layout, polarOptions, innerRadius, outerRadius, width, height) => {
  if (layout !== "centric" && layout !== "radial" || polarOptions == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  var {
    cx,
    cy,
    startAngle,
    endAngle
  } = polarOptions;
  return {
    cx: getPercentValue(cx, width, width / 2),
    cy: getPercentValue(cy, height, height / 2),
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise: false
    // this property look useful, why not use it?
  };
});
var pickAxisType = (_state, axisType) => axisType;
var pickAxisId = (_state, _axisType, axisId) => axisId;
function getStackSeriesIdentifier(graphicalItem) {
  return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
function combineDisplayedStackedData(stackedGraphicalItems, _ref2, tooltipAxisSettings) {
  var {
    chartData = []
  } = _ref2;
  var {
    allowDuplicatedCategory,
    dataKey: tooltipDataKey
  } = tooltipAxisSettings;
  var knownItemsByDataKey = /* @__PURE__ */ new Map();
  stackedGraphicalItems.forEach((item) => {
    var _item$data;
    var resolvedData = (_item$data = item.data) !== null && _item$data !== void 0 ? _item$data : chartData;
    if (resolvedData == null || resolvedData.length === 0) {
      return;
    }
    var stackIdentifier = getStackSeriesIdentifier(item);
    resolvedData.forEach((entry, index) => {
      var tooltipValue = tooltipDataKey == null || allowDuplicatedCategory ? index : String(getValueByDataKey(entry, tooltipDataKey, null));
      var numericValue = getValueByDataKey(entry, item.dataKey, 0);
      var curr;
      if (knownItemsByDataKey.has(tooltipValue)) {
        curr = knownItemsByDataKey.get(tooltipValue);
      } else {
        curr = {};
      }
      Object.assign(curr, {
        [stackIdentifier]: numericValue
      });
      knownItemsByDataKey.set(tooltipValue, curr);
    });
  });
  return Array.from(knownItemsByDataKey.values());
}
function isStacked(graphicalItem) {
  return "stackId" in graphicalItem && graphicalItem.stackId != null && graphicalItem.dataKey != null;
}
var numberDomainEqualityCheck = (a, b) => {
  if (a === b) {
    return true;
  }
  if (a == null || b == null) {
    return false;
  }
  return a[0] === b[0] && a[1] === b[1];
};
function emptyArraysAreEqualCheck(a, b) {
  if (Array.isArray(a) && Array.isArray(b) && a.length === 0 && b.length === 0) {
    return true;
  }
  return a === b;
}
function arrayContentsAreEqualCheck(a, b) {
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var selectTooltipAxisType = (state) => {
  var layout = selectChartLayout(state);
  if (layout === "horizontal") {
    return "xAxis";
  }
  if (layout === "vertical") {
    return "yAxis";
  }
  if (layout === "centric") {
    return "angleAxis";
  }
  return "radiusAxis";
};
var selectTooltipAxisId = (state) => state.tooltip.settings.axisId;
function rechartsScaleFactory(d3Scale) {
  if (d3Scale == null) {
    return void 0;
  }
  var ticksFn = d3Scale.ticks;
  var bandwidthFn = d3Scale.bandwidth;
  var d3Range = d3Scale.range();
  var range2 = [Math.min(...d3Range), Math.max(...d3Range)];
  return {
    domain: () => d3Scale.domain(),
    range: (function(_range) {
      function range3() {
        return _range.apply(this, arguments);
      }
      range3.toString = function() {
        return _range.toString();
      };
      return range3;
    })(() => range2),
    rangeMin: () => range2[0],
    rangeMax: () => range2[1],
    isInRange(value) {
      var first = range2[0];
      var last = range2[1];
      return first <= last ? value >= first && value <= last : value >= last && value <= first;
    },
    bandwidth: bandwidthFn ? () => bandwidthFn.call(d3Scale) : void 0,
    ticks: ticksFn ? (count) => ticksFn.call(d3Scale, count) : void 0,
    map: (input, options) => {
      var baseValue = d3Scale(input);
      if (baseValue == null) {
        return void 0;
      }
      if (d3Scale.bandwidth && options !== null && options !== void 0 && options.position) {
        var bandWidth = d3Scale.bandwidth();
        switch (options.position) {
          case "middle":
            baseValue += bandWidth / 2;
            break;
          case "end":
            baseValue += bandWidth;
            break;
        }
      }
      return baseValue;
    }
  };
}
var combineCheckedDomain = (realScaleType, axisDomain) => {
  if (axisDomain == null) {
    return void 0;
  }
  switch (realScaleType) {
    case "linear": {
      if (!isWellFormedNumberDomain(axisDomain)) {
        var min, max;
        for (var i = 0; i < axisDomain.length; i++) {
          var value = axisDomain[i];
          if (!isWellBehavedNumber(value)) {
            continue;
          }
          if (min === void 0 || value < min) {
            min = value;
          }
          if (max === void 0 || value > max) {
            max = value;
          }
        }
        if (min !== void 0 && max !== void 0) {
          return [min, max];
        }
        return void 0;
      }
      return axisDomain;
    }
    default:
      return axisDomain;
  }
};
function getD3ScaleFromType(realScaleType) {
  var scales = d3Scales;
  if (realScaleType in scales && typeof scales[realScaleType] === "function") {
    return scales[realScaleType]();
  }
  var name = "scale".concat(upperFirst(realScaleType));
  if (name in scales && typeof scales[name] === "function") {
    return scales[name]();
  }
  return void 0;
}
function combineConfiguredScaleInternal(scale, axisDomain, axisRange) {
  if (typeof scale === "function") {
    return scale.copy().domain(axisDomain).range(axisRange);
  }
  if (scale == null) {
    return void 0;
  }
  var d3ScaleFunction = getD3ScaleFromType(scale);
  if (d3ScaleFunction == null) {
    return void 0;
  }
  d3ScaleFunction.domain(axisDomain).range(axisRange);
  return d3ScaleFunction;
}
function combineConfiguredScale(axis, realScaleType, axisDomain, axisRange) {
  if (axisDomain == null || axisRange == null) {
    return void 0;
  }
  if (typeof axis.scale === "function") {
    return combineConfiguredScaleInternal(axis.scale, axisDomain, axisRange);
  }
  return combineConfiguredScaleInternal(realScaleType, axisDomain, axisRange);
}
function getD3ScaleName(name) {
  return "scale".concat(upperFirst(name));
}
function isSupportedScaleName(name) {
  return getD3ScaleName(name) in d3Scales;
}
var combineRealScaleType = (axisConfig, hasBar, chartType) => {
  if (axisConfig == null) {
    return void 0;
  }
  var {
    scale,
    type
  } = axisConfig;
  if (scale === "auto") {
    if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) {
      return "point";
    }
    if (type === "category") {
      return "band";
    }
    return "linear";
  }
  if (typeof scale === "string") {
    return isSupportedScaleName(scale) ? scale : "point";
  }
  return void 0;
};
function bisect(haystack, needle) {
  var lo = 0;
  var hi = haystack.length;
  var ascending = haystack[0] < haystack[haystack.length - 1];
  while (lo < hi) {
    var mid = Math.floor((lo + hi) / 2);
    if (ascending ? haystack[mid] < needle : haystack[mid] > needle) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
function createCategoricalInverse(scale, allDataPointsOnAxis) {
  if (!scale) {
    return void 0;
  }
  var domain = allDataPointsOnAxis !== null && allDataPointsOnAxis !== void 0 ? allDataPointsOnAxis : scale.domain();
  var pixelPositions = domain.map((d) => {
    var _scale;
    return (_scale = scale(d)) !== null && _scale !== void 0 ? _scale : 0;
  });
  var range2 = scale.range();
  if (domain.length === 0 || range2.length < 2) {
    return void 0;
  }
  return (pixelValue) => {
    var _pixelPositions, _pixelPositions$index;
    var index = bisect(pixelPositions, pixelValue);
    if (index <= 0) {
      return domain[0];
    }
    if (index >= domain.length) {
      return domain[domain.length - 1];
    }
    var leftPixel = (_pixelPositions = pixelPositions[index - 1]) !== null && _pixelPositions !== void 0 ? _pixelPositions : 0;
    var rightPixel = (_pixelPositions$index = pixelPositions[index]) !== null && _pixelPositions$index !== void 0 ? _pixelPositions$index : 0;
    if (Math.abs(pixelValue - leftPixel) <= Math.abs(pixelValue - rightPixel)) {
      return domain[index - 1];
    }
    return domain[index];
  };
}
function combineInverseScaleFunction(configuredScale) {
  if (configuredScale == null) {
    return void 0;
  }
  if ("invert" in configuredScale && typeof configuredScale.invert === "function") {
    return configuredScale.invert.bind(configuredScale);
  }
  return createCategoricalInverse(configuredScale, void 0);
}
function ownKeys$f(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$f(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$f(Object(t), true).forEach(function(r2) {
      _defineProperty$h(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$f(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$h(e, r, t) {
  return (r = _toPropertyKey$h(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$h(t) {
  var i = _toPrimitive$h(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$h(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultNumericDomain = [0, "auto"];
var implicitXAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0,
  niceTicks: "auto"
};
var selectXAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.xAxis[axisId];
};
var selectXAxisSettings = (state, axisId) => {
  var axis = selectXAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitXAxis;
  }
  return axis;
};
var implicitYAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: defaultNumericDomain,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  niceTicks: "auto",
  width: DEFAULT_Y_AXIS_WIDTH
};
var selectYAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.yAxis[axisId];
};
var selectYAxisSettings = (state, axisId) => {
  var axis = selectYAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitYAxis;
  }
  return axis;
};
var implicitZAxis = {
  domain: [0, "auto"],
  includeHidden: false,
  reversed: false,
  allowDataOverflow: false,
  allowDuplicatedCategory: false,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
};
var selectZAxisSettings = (state, axisId) => {
  var axis = state.cartesianAxis.zAxis[axisId];
  if (axis == null) {
    return implicitZAxis;
  }
  return axis;
};
var selectBaseAxis = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "zAxis": {
      return selectZAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectCartesianAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectRenderableAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectHasBar = (state) => state.graphicalItems.cartesianItems.some((item) => item.type === "bar") || state.graphicalItems.polarItems.some((item) => item.type === "radialBar");
function itemAxisPredicate(axisType, axisId) {
  return (item) => {
    switch (axisType) {
      case "xAxis":
        return "xAxisId" in item && item.xAxisId === axisId;
      case "yAxis":
        return "yAxisId" in item && item.yAxisId === axisId;
      case "zAxis":
        return "zAxisId" in item && item.zAxisId === axisId;
      case "angleAxis":
        return "angleAxisId" in item && item.angleAxisId === axisId;
      case "radiusAxis":
        return "radiusAxisId" in item && item.radiusAxisId === axisId;
      default:
        return false;
    }
  };
}
var selectUnfilteredCartesianItems = (state) => state.graphicalItems.cartesianItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var combineGraphicalItemsSettings = (graphicalItems, axisSettings, axisPredicate) => graphicalItems.filter(axisPredicate).filter((item) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.includeHidden) === true) {
    return true;
  }
  return !item.hide;
});
var selectCartesianItemsSettings = createSelector([selectUnfilteredCartesianItems, selectBaseAxis, selectAxisPredicate], combineGraphicalItemsSettings, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectStackedCartesianItemsSettings = createSelector([selectCartesianItemsSettings], (cartesianItems) => {
  return cartesianItems.filter((item) => item.type === "area" || item.type === "bar").filter(isStacked);
});
var filterGraphicalNotStackedItems = (cartesianItems) => cartesianItems.filter((item) => !("stackId" in item) || item.stackId === void 0);
var selectCartesianItemsSettingsExceptStacked = createSelector([selectCartesianItemsSettings], filterGraphicalNotStackedItems);
var combineGraphicalItemsData = (cartesianItems) => cartesianItems.map((item) => item.data).filter(Boolean).flat(1);
var selectAnyCartesianItemsUsesChartData = createSelector([selectCartesianItemsSettings], (items) => items.some((item) => !item.data));
var selectCartesianGraphicalItemsData = createSelector([selectCartesianItemsSettings], combineGraphicalItemsData, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var combineDisplayedData = (graphicalItemsData, _ref2) => {
  var {
    chartData = [],
    dataStartIndex,
    dataEndIndex
  } = _ref2;
  if (graphicalItemsData.length > 0) {
    return graphicalItemsData;
  }
  return chartData.slice(dataStartIndex, dataEndIndex + 1);
};
var selectDisplayedData = createSelector([selectCartesianGraphicalItemsData, selectChartDataWithIndexesIfNotInPanoramaPosition4], combineDisplayedData);
var combineAppliedValues = (data, axisSettings, items) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    }));
  }
  if (items.length > 0) {
    return items.map((item) => item.dataKey).flatMap((dataKey) => data.map((entry) => ({
      value: getValueByDataKey(entry, dataKey)
    })));
  }
  return data.map((entry) => ({
    value: entry
  }));
};
var combineAllAppliedValues = (displayedData, axisSettings, items, _ref2, anyItemUsesChartData, graphicalItemsData) => {
  var {
    chartData = [],
    dataStartIndex,
    dataEndIndex
  } = _ref2;
  var appliedValues = combineAppliedValues(displayedData, axisSettings, items);
  if (anyItemUsesChartData && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && graphicalItemsData.length > 0) {
    var chartDataSlice2 = chartData.slice(dataStartIndex, dataEndIndex + 1);
    var chartAppliedValues = chartDataSlice2.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    })).filter((av) => av.value != null);
    return [...chartAppliedValues, ...appliedValues];
  }
  return appliedValues;
};
var selectAllAppliedValues = createSelector([selectDisplayedData, selectBaseAxis, selectCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectAnyCartesianItemsUsesChartData, selectCartesianGraphicalItemsData], combineAllAppliedValues);
function makeNumber(val) {
  if (isNumOrStr(val) || val instanceof Date) {
    var n = Number(val);
    if (isWellBehavedNumber(n)) {
      return n;
    }
  }
  return void 0;
}
function makeDomain(val) {
  if (Array.isArray(val)) {
    var attempt = [makeNumber(val[0]), makeNumber(val[1])];
    if (isWellFormedNumberDomain(attempt)) {
      return attempt;
    }
    return void 0;
  }
  var n = makeNumber(val);
  if (n == null) {
    return void 0;
  }
  return [n, n];
}
function onlyAllowNumbers(data) {
  return data.map(makeNumber).filter(isNotNil);
}
function sortBy(a, b) {
  var aNum = makeNumber(a);
  var bNum = makeNumber(b);
  if (aNum == null && bNum == null) {
    return 0;
  }
  if (aNum == null) {
    return -1;
  }
  if (bNum == null) {
    return 1;
  }
  return aNum - bNum;
}
var selectSortedDataPoints = createSelector([selectAllAppliedValues], (appliedData) => {
  return appliedData === null || appliedData === void 0 ? void 0 : appliedData.map((item) => item.value).sort(sortBy);
});
function isErrorBarRelevantForAxisType(axisType, errorBar) {
  switch (axisType) {
    case "xAxis":
      return errorBar.direction === "x";
    case "yAxis":
      return errorBar.direction === "y";
    default:
      return false;
  }
}
function getErrorDomainByDataKey(entry, appliedValue, relevantErrorBars) {
  if (!relevantErrorBars) {
    return [];
  }
  if (!relevantErrorBars.length) {
    return [];
  }
  var appliedNumericValue;
  if (typeof appliedValue === "number" && !isNan(appliedValue)) {
    appliedNumericValue = appliedValue;
  } else if (Array.isArray(appliedValue)) {
    var numericRangeValues = onlyAllowNumbers(appliedValue);
    if (numericRangeValues.length > 0) {
      appliedNumericValue = Math.max(...numericRangeValues);
    }
  }
  if (appliedNumericValue == null) {
    return [];
  }
  return onlyAllowNumbers(relevantErrorBars.flatMap((eb) => {
    var errorValue = getValueByDataKey(entry, eb.dataKey);
    var lowBound, highBound;
    if (Array.isArray(errorValue)) {
      [lowBound, highBound] = errorValue;
    } else {
      lowBound = highBound = errorValue;
    }
    if (!isWellBehavedNumber(lowBound) || !isWellBehavedNumber(highBound)) {
      return void 0;
    }
    return [appliedNumericValue - lowBound, appliedNumericValue + highBound];
  }));
}
var selectTooltipAxis = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  return selectRenderableAxisSettings(state, axisType, axisId);
};
var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], (axis) => axis === null || axis === void 0 ? void 0 : axis.dataKey);
var selectDisplayedStackedData = createSelector([selectStackedCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanoramaPosition4, selectTooltipAxis], combineDisplayedStackedData);
var combineStackGroups = (displayedData, items, stackOffsetType, reverseStackOrder) => {
  var initialItemsGroups = {};
  var itemsGroup = items.reduce((acc, item) => {
    if (item.stackId == null) {
      return acc;
    }
    var stack2 = acc[item.stackId];
    if (stack2 == null) {
      stack2 = [];
    }
    stack2.push(item);
    acc[item.stackId] = stack2;
    return acc;
  }, initialItemsGroups);
  return Object.fromEntries(Object.entries(itemsGroup).map((_ref3) => {
    var [stackId, graphicalItems] = _ref3;
    var orderedGraphicalItems = reverseStackOrder ? [...graphicalItems].reverse() : graphicalItems;
    var dataKeys = orderedGraphicalItems.map(getStackSeriesIdentifier);
    return [stackId, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: getStackedData(displayedData, dataKeys, stackOffsetType),
      graphicalItems: orderedGraphicalItems
    }];
  }));
};
var selectStackGroups = createSelector([selectDisplayedStackedData, selectStackedCartesianItemsSettings, selectStackOffsetType, selectReverseStackOrder], combineStackGroups);
var combineDomainOfStackGroups = (stackGroups, _ref4, axisType, domainFromUserPreference) => {
  var {
    dataStartIndex,
    dataEndIndex
  } = _ref4;
  if (domainFromUserPreference != null) {
    return void 0;
  }
  if (axisType === "zAxis") {
    return void 0;
  }
  var domainOfStackGroups = getDomainOfStackGroups(stackGroups, dataStartIndex, dataEndIndex);
  if (domainOfStackGroups != null && domainOfStackGroups[0] === 0 && domainOfStackGroups[1] === 0) {
    return void 0;
  }
  return domainOfStackGroups;
};
var selectAllowsDataOverflow = createSelector([selectBaseAxis], (axisSettings) => axisSettings.allowDataOverflow);
var getDomainDefinition = (axisSettings) => {
  var _axisSettings$domain;
  if (axisSettings == null || !("domain" in axisSettings)) {
    return defaultNumericDomain;
  }
  if (axisSettings.domain != null) {
    return axisSettings.domain;
  }
  if ("ticks" in axisSettings && axisSettings.ticks != null) {
    if (axisSettings.type === "number") {
      var allValues = onlyAllowNumbers(axisSettings.ticks);
      return [Math.min(...allValues), Math.max(...allValues)];
    }
    if (axisSettings.type === "category") {
      return axisSettings.ticks.map(String);
    }
  }
  return (_axisSettings$domain = axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.domain) !== null && _axisSettings$domain !== void 0 ? _axisSettings$domain : defaultNumericDomain;
};
var selectDomainDefinition = createSelector([selectBaseAxis], getDomainDefinition);
var selectDomainFromUserPreference = createSelector([selectDomainDefinition, selectAllowsDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectDomainOfStackGroups = createSelector([selectStackGroups, selectChartDataWithIndexes, pickAxisType, selectDomainFromUserPreference], combineDomainOfStackGroups, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectAllErrorBarSettings = (state) => state.errorBars;
var combineRelevantErrorBarSettings = (cartesianItemsSettings, allErrorBarSettings, axisType) => {
  return cartesianItemsSettings.flatMap((item) => {
    return allErrorBarSettings[item.id];
  }).filter(Boolean).filter((e) => {
    return isErrorBarRelevantForAxisType(axisType, e);
  });
};
var mergeDomains = function mergeDomains2() {
  for (var _len = arguments.length, domains = new Array(_len), _key = 0; _key < _len; _key++) {
    domains[_key] = arguments[_key];
  }
  var allDomains = domains.filter(Boolean);
  if (allDomains.length === 0) {
    return void 0;
  }
  var allValues = allDomains.flat();
  var min = Math.min(...allValues);
  var max = Math.max(...allValues);
  return [min, max];
};
var combineDomainOfAllAppliedNumericalValuesIncludingErrorValues = function combineDomainOfAllAppliedNumericalValuesIncludingErrorValues2(displayedData, axisSettings, items, errorBars, axisType) {
  var chartDataSlice2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
  var lowerEnd, upperEnd;
  if (items.length > 0) {
    items.forEach((item) => {
      var _errorBars$item$id;
      var itemData = item.data != null ? [...item.data] : chartDataSlice2;
      var relevantErrorBars = (_errorBars$item$id = errorBars[item.id]) === null || _errorBars$item$id === void 0 ? void 0 : _errorBars$item$id.filter((errorBar) => isErrorBarRelevantForAxisType(axisType, errorBar));
      itemData.forEach((entry) => {
        var _axisSettings$dataKey;
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        var errorDomain = getErrorDomainByDataKey(entry, valueByDataKey, relevantErrorBars);
        if (errorDomain.length >= 2) {
          var localLower = Math.min(...errorDomain);
          var localUpper = Math.max(...errorDomain);
          if (lowerEnd == null || localLower < lowerEnd) {
            lowerEnd = localLower;
          }
          if (upperEnd == null || localUpper > upperEnd) {
            upperEnd = localUpper;
          }
        }
        var dataValueDomain = makeDomain(valueByDataKey);
        if (dataValueDomain != null) {
          lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
          upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
        }
      });
    });
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null && items.length === 0) {
    displayedData.forEach((item) => {
      var dataValueDomain = makeDomain(getValueByDataKey(item, axisSettings.dataKey));
      if (dataValueDomain != null) {
        lowerEnd = lowerEnd == null ? dataValueDomain[0] : Math.min(lowerEnd, dataValueDomain[0]);
        upperEnd = upperEnd == null ? dataValueDomain[1] : Math.max(upperEnd, dataValueDomain[1]);
      }
    });
  }
  if (isWellBehavedNumber(lowerEnd) && isWellBehavedNumber(upperEnd)) {
    return [lowerEnd, upperEnd];
  }
  return void 0;
};
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1 = createSelector([selectDisplayedData, selectBaseAxis, selectCartesianItemsSettingsExceptStacked, selectAllErrorBarSettings, pickAxisType, selectChartDataSliceIfNotInPanorama], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
function onlyAllowNumbersAndStringsAndDates(item) {
  var {
    value
  } = item;
  if (isNumOrStr(value) || value instanceof Date) {
    return value;
  }
  return void 0;
}
var computeDomainOfTypeCategory = (allDataSquished, axisSettings, isCategorical) => {
  var categoricalDomain = allDataSquished.map(onlyAllowNumbersAndStringsAndDates).filter((v) => v != null);
  if (isCategorical && (axisSettings.dataKey == null || axisSettings.allowDuplicatedCategory && hasDuplicate(categoricalDomain))) {
    return range(0, allDataSquished.length);
  }
  if (axisSettings.allowDuplicatedCategory) {
    return categoricalDomain;
  }
  return Array.from(new Set(categoricalDomain));
};
var selectReferenceDots = (state) => state.referenceElements.dots;
var filterReferenceElements = (elements, axisType, axisId) => {
  return elements.filter((el) => el.ifOverflow === "extendDomain").filter((el) => {
    if (axisType === "xAxis") {
      return el.xAxisId === axisId;
    }
    return el.yAxisId === axisId;
  });
};
var selectReferenceDotsByAxis = createSelector([selectReferenceDots, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceAreas = (state) => state.referenceElements.areas;
var selectReferenceAreasByAxis = createSelector([selectReferenceAreas, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceLines = (state) => state.referenceElements.lines;
var selectReferenceLinesByAxis = createSelector([selectReferenceLines, pickAxisType, pickAxisId], filterReferenceElements);
var combineDotsDomain = (dots, axisType) => {
  if (dots == null) {
    return void 0;
  }
  var allCoords = onlyAllowNumbers(dots.map((dot) => axisType === "xAxis" ? dot.x : dot.y));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceDotsDomain = createSelector(selectReferenceDotsByAxis, pickAxisType, combineDotsDomain);
var combineAreasDomain = (areas, axisType) => {
  if (areas == null) {
    return void 0;
  }
  var allCoords = onlyAllowNumbers(areas.flatMap((area2) => [axisType === "xAxis" ? area2.x1 : area2.y1, axisType === "xAxis" ? area2.x2 : area2.y2]));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceAreasDomain = createSelector([selectReferenceAreasByAxis, pickAxisType], combineAreasDomain);
function extractXCoordinates(line2) {
  var _line$segment;
  if (line2.x != null) {
    return onlyAllowNumbers([line2.x]);
  }
  var segmentCoordinates = (_line$segment = line2.segment) === null || _line$segment === void 0 ? void 0 : _line$segment.map((s) => s.x);
  if (segmentCoordinates == null || segmentCoordinates.length === 0) {
    return [];
  }
  return onlyAllowNumbers(segmentCoordinates);
}
function extractYCoordinates(line2) {
  var _line$segment2;
  if (line2.y != null) {
    return onlyAllowNumbers([line2.y]);
  }
  var segmentCoordinates = (_line$segment2 = line2.segment) === null || _line$segment2 === void 0 ? void 0 : _line$segment2.map((s) => s.y);
  if (segmentCoordinates == null || segmentCoordinates.length === 0) {
    return [];
  }
  return onlyAllowNumbers(segmentCoordinates);
}
var combineLinesDomain = (lines, axisType) => {
  if (lines == null) {
    return void 0;
  }
  var allCoords = lines.flatMap((line2) => axisType === "xAxis" ? extractXCoordinates(line2) : extractYCoordinates(line2));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceLinesDomain = createSelector([selectReferenceLinesByAxis, pickAxisType], combineLinesDomain);
var selectReferenceElementsDomain = createSelector(selectReferenceDotsDomain, selectReferenceLinesDomain, selectReferenceAreasDomain, (dotsDomain, linesDomain, areasDomain) => {
  return mergeDomains(dotsDomain, areasDomain, linesDomain);
});
var combineNumericalDomain = (axisSettings, domainDefinition, domainFromUserPreference, domainOfStackGroups, dataAndErrorBarsDomain, referenceElementsDomain, layout, axisType) => {
  if (domainFromUserPreference != null) {
    return domainFromUserPreference;
  }
  var shouldIncludeDomainOfStackGroups = layout === "vertical" && axisType === "xAxis" || layout === "horizontal" && axisType === "yAxis";
  var mergedDomains = shouldIncludeDomainOfStackGroups ? mergeDomains(domainOfStackGroups, referenceElementsDomain, dataAndErrorBarsDomain) : mergeDomains(referenceElementsDomain, dataAndErrorBarsDomain);
  return parseNumericalUserDomain(domainDefinition, mergedDomains, axisSettings.allowDataOverflow);
};
var selectNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainFromUserPreference, selectDomainOfStackGroups, selectDomainOfAllAppliedNumericalValuesIncludingErrorValues$1, selectReferenceElementsDomain, selectChartLayout, pickAxisType], combineNumericalDomain, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var expandDomain = [0, 1];
var combineAxisDomain = (axisSettings, layout, displayedData, allAppliedValues, stackOffsetType, axisType, numericalDomain) => {
  if ((axisSettings == null || displayedData == null || displayedData.length === 0) && numericalDomain === void 0) {
    return void 0;
  }
  var {
    dataKey,
    type
  } = axisSettings;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && dataKey == null) {
    var _displayedData$length;
    return range(0, (_displayedData$length = displayedData === null || displayedData === void 0 ? void 0 : displayedData.length) !== null && _displayedData$length !== void 0 ? _displayedData$length : 0);
  }
  if (type === "category") {
    return computeDomainOfTypeCategory(allAppliedValues, axisSettings, isCategorical);
  }
  if (stackOffsetType === "expand" && !isCategorical) {
    return expandDomain;
  }
  return numericalDomain;
};
var selectAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectDisplayedData, selectAllAppliedValues, selectStackOffsetType, pickAxisType, selectNumericalDomain], combineAxisDomain);
var selectRealScaleType = createSelector([selectBaseAxis, selectHasBar, selectChartName], combineRealScaleType);
var combineNiceTicks = (axisDomain, axisSettings, realScaleType) => {
  var {
    niceTicks
  } = axisSettings;
  if (niceTicks === "none") {
    return void 0;
  }
  var domainDefinition = getDomainDefinition(axisSettings);
  var hasDomainAutoKeyword = Array.isArray(domainDefinition) && (domainDefinition[0] === "auto" || domainDefinition[1] === "auto");
  if ((niceTicks === "snap125" || niceTicks === "adaptive") && axisSettings != null && axisSettings.tickCount && isWellFormedNumberDomain(axisDomain)) {
    if (hasDomainAutoKeyword) {
      return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
    }
    if (axisSettings.type === "number") {
      return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, niceTicks);
    }
  }
  if (niceTicks === "auto" && realScaleType === "linear" && axisSettings != null && axisSettings.tickCount) {
    if (hasDomainAutoKeyword && isWellFormedNumberDomain(axisDomain)) {
      return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
    }
    if (axisSettings.type === "number" && isWellFormedNumberDomain(axisDomain)) {
      return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals, "adaptive");
    }
  }
  return void 0;
};
var selectNiceTicks = createSelector([selectAxisDomain, selectRenderableAxisSettings, selectRealScaleType], combineNiceTicks);
var combineAxisDomainWithNiceTicks = (axisSettings, domain, niceTicks, axisType) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    axisType !== "angleAxis" && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.type) === "number" && isWellFormedNumberDomain(domain) && Array.isArray(niceTicks) && niceTicks.length > 0
  ) {
    var _niceTicks$, _niceTicks;
    var minFromDomain = domain[0];
    var minFromTicks = (_niceTicks$ = niceTicks[0]) !== null && _niceTicks$ !== void 0 ? _niceTicks$ : 0;
    var maxFromDomain = domain[1];
    var maxFromTicks = (_niceTicks = niceTicks[niceTicks.length - 1]) !== null && _niceTicks !== void 0 ? _niceTicks : 0;
    return [Math.min(minFromDomain, minFromTicks), Math.max(maxFromDomain, maxFromTicks)];
  }
  return domain;
};
var selectAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectAxisDomain, selectNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
var selectSmallestDistanceBetweenValues = createSelector(selectAllAppliedValues, selectBaseAxis, (allDataSquished, axisSettings) => {
  if (!axisSettings || axisSettings.type !== "number") {
    return void 0;
  }
  var smallestDistanceBetweenValues = Infinity;
  var sortedValues = Array.from(onlyAllowNumbers(allDataSquished.map((d) => d.value))).sort((a, b) => a - b);
  var first = sortedValues[0];
  var last = sortedValues[sortedValues.length - 1];
  if (first == null || last == null) {
    return Infinity;
  }
  var diff = last - first;
  if (diff === 0) {
    return Infinity;
  }
  for (var i = 0; i < sortedValues.length - 1; i++) {
    var curr = sortedValues[i];
    var next = sortedValues[i + 1];
    if (curr == null || next == null) {
      continue;
    }
    var distance = next - curr;
    smallestDistanceBetweenValues = Math.min(smallestDistanceBetweenValues, distance);
  }
  return smallestDistanceBetweenValues / diff;
});
var selectCalculatedPadding = createSelector(selectSmallestDistanceBetweenValues, selectChartLayout, selectBarCategoryGap, selectChartOffsetInternal, (_1, _2, _3, _4, padding) => padding, (smallestDistanceInPercent, layout, barCategoryGap, offset, padding) => {
  if (!isWellBehavedNumber(smallestDistanceInPercent)) {
    return 0;
  }
  var rangeWidth = layout === "vertical" ? offset.height : offset.width;
  if (padding === "gap") {
    return smallestDistanceInPercent * rangeWidth / 2;
  }
  if (padding === "no-gap") {
    var gap = getPercentValue(barCategoryGap, smallestDistanceInPercent * rangeWidth);
    var halfBand = smallestDistanceInPercent * rangeWidth / 2;
    return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
  }
  return 0;
});
var selectCalculatedXAxisPadding = (state, axisId, isPanorama) => {
  var xAxisSettings = selectXAxisSettings(state, axisId);
  if (xAxisSettings == null || typeof xAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "xAxis", axisId, isPanorama, xAxisSettings.padding);
};
var selectCalculatedYAxisPadding = (state, axisId, isPanorama) => {
  var yAxisSettings = selectYAxisSettings(state, axisId);
  if (yAxisSettings == null || typeof yAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "yAxis", axisId, isPanorama, yAxisSettings.padding);
};
var selectXAxisPadding = createSelector(selectXAxisSettings, selectCalculatedXAxisPadding, (xAxisSettings, calculated) => {
  var _padding$left, _padding$right;
  if (xAxisSettings == null) {
    return {
      left: 0,
      right: 0
    };
  }
  var {
    padding
  } = xAxisSettings;
  if (typeof padding === "string") {
    return {
      left: calculated,
      right: calculated
    };
  }
  return {
    left: ((_padding$left = padding.left) !== null && _padding$left !== void 0 ? _padding$left : 0) + calculated,
    right: ((_padding$right = padding.right) !== null && _padding$right !== void 0 ? _padding$right : 0) + calculated
  };
});
var selectYAxisPadding = createSelector(selectYAxisSettings, selectCalculatedYAxisPadding, (yAxisSettings, calculated) => {
  var _padding$top, _padding$bottom;
  if (yAxisSettings == null) {
    return {
      top: 0,
      bottom: 0
    };
  }
  var {
    padding
  } = yAxisSettings;
  if (typeof padding === "string") {
    return {
      top: calculated,
      bottom: calculated
    };
  }
  return {
    top: ((_padding$top = padding.top) !== null && _padding$top !== void 0 ? _padding$top : 0) + calculated,
    bottom: ((_padding$bottom = padding.bottom) !== null && _padding$bottom !== void 0 ? _padding$bottom : 0) + calculated
  };
});
var selectXAxisRange = createSelector([selectChartOffsetInternal, selectXAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, padding, brushDimensions, _ref5, isPanorama) => {
  var {
    padding: brushPadding
  } = _ref5;
  if (isPanorama) {
    return [brushPadding.left, brushDimensions.width - brushPadding.right];
  }
  return [offset.left + padding.left, offset.left + offset.width - padding.right];
});
var selectYAxisRange = createSelector([selectChartOffsetInternal, selectChartLayout, selectYAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, layout, padding, brushDimensions, _ref6, isPanorama) => {
  var {
    padding: brushPadding
  } = _ref6;
  if (isPanorama) {
    return [brushDimensions.height - brushPadding.bottom, brushPadding.top];
  }
  if (layout === "horizontal") {
    return [offset.top + offset.height - padding.bottom, offset.top + padding.top];
  }
  return [offset.top + padding.top, offset.top + offset.height - padding.bottom];
});
var selectAxisRange = (state, axisType, axisId, isPanorama) => {
  var _selectZAxisSettings;
  switch (axisType) {
    case "xAxis":
      return selectXAxisRange(state, axisId, isPanorama);
    case "yAxis":
      return selectYAxisRange(state, axisId, isPanorama);
    case "zAxis":
      return (_selectZAxisSettings = selectZAxisSettings(state, axisId)) === null || _selectZAxisSettings === void 0 ? void 0 : _selectZAxisSettings.range;
    case "angleAxis":
      return selectAngleAxisRange(state);
    case "radiusAxis":
      return selectRadiusAxisRange(state, axisId);
    default:
      return void 0;
  }
};
var selectAxisRangeWithReverse = createSelector([selectBaseAxis, selectAxisRange], combineAxisRangeWithReverse);
var selectCheckedAxisDomain = createSelector([selectRealScaleType, selectAxisDomainIncludingNiceTicks], combineCheckedDomain);
var selectConfiguredScale = createSelector([selectBaseAxis, selectRealScaleType, selectCheckedAxisDomain, selectAxisRangeWithReverse], combineConfiguredScale);
var combineCategoricalDomain = (layout, appliedValues, axis, axisType) => {
  if (axis == null || axis.dataKey == null) {
    return void 0;
  }
  var {
    type,
    scale
  } = axis;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && (type === "number" || scale !== "auto")) {
    return appliedValues.map((d) => d.value);
  }
  return void 0;
};
var selectCategoricalDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectRenderableAxisSettings, pickAxisType], combineCategoricalDomain);
var selectAxisScale = createSelector([selectConfiguredScale], rechartsScaleFactory);
createSelector([selectConfiguredScale], combineInverseScaleFunction);
createSelector([selectConfiguredScale, selectSortedDataPoints], createCategoricalInverse);
createSelector([selectCartesianItemsSettings, selectAllErrorBarSettings, pickAxisType], combineRelevantErrorBarSettings);
function compareIds(a, b) {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
}
var pickAxisOrientation = (_state, orientation) => orientation;
var pickMirror = (_state, _orientation, mirror) => mirror;
var selectAllXAxesWithOffsetType = createSelector(selectAllXAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var selectAllYAxesWithOffsetType = createSelector(selectAllYAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var getXAxisSize = (offset, axisSettings) => {
  return {
    width: offset.width,
    height: axisSettings.height
  };
};
var getYAxisSize = (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
};
var selectXAxisSize = createSelector(selectChartOffsetInternal, selectXAxisSettings, getXAxisSize);
var combineXAxisPositionStartingPoint = (offset, orientation, chartHeight) => {
  switch (orientation) {
    case "top":
      return offset.top;
    case "bottom":
      return chartHeight - offset.bottom;
    default:
      return 0;
  }
};
var combineYAxisPositionStartingPoint = (offset, orientation, chartWidth) => {
  switch (orientation) {
    case "left":
      return offset.left;
    case "right":
      return chartWidth - offset.right;
    default:
      return 0;
  }
};
var selectAllXAxesOffsetSteps = createSelector(selectChartHeight, selectChartOffsetInternal, selectAllXAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartHeight, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getXAxisSize(offset, axis);
    if (position == null) {
      position = combineXAxisPositionStartingPoint(offset, orientation, chartHeight);
    }
    var needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.height;
    position += (needSpace ? -1 : 1) * axisSize.height;
  });
  return steps;
});
var selectAllYAxesOffsetSteps = createSelector(selectChartWidth, selectChartOffsetInternal, selectAllYAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartWidth, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getYAxisSize(offset, axis);
    if (position == null) {
      position = combineYAxisPositionStartingPoint(offset, orientation, chartWidth);
    }
    var needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.width;
    position += (needSpace ? -1 : 1) * axisSize.width;
  });
  return steps;
});
var selectXAxisOffsetSteps = (state, axisId) => {
  var axisSettings = selectXAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  return selectAllXAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectXAxisPosition = createSelector([selectChartOffsetInternal, selectXAxisSettings, selectXAxisOffsetSteps, (_, axisId) => axisId], (offset, axisSettings, allSteps, axisId) => {
  if (axisSettings == null) {
    return void 0;
  }
  var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: offset.left,
      y: 0
    };
  }
  return {
    x: offset.left,
    y: stepOfThisAxis
  };
});
var selectYAxisOffsetSteps = (state, axisId) => {
  var axisSettings = selectYAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  return selectAllYAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
};
var selectYAxisPosition = createSelector([selectChartOffsetInternal, selectYAxisSettings, selectYAxisOffsetSteps, (_, axisId) => axisId], (offset, axisSettings, allSteps, axisId) => {
  if (axisSettings == null) {
    return void 0;
  }
  var stepOfThisAxis = allSteps === null || allSteps === void 0 ? void 0 : allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: 0,
      y: offset.top
    };
  }
  return {
    x: stepOfThisAxis,
    y: offset.top
  };
});
var selectYAxisSize = createSelector(selectChartOffsetInternal, selectYAxisSettings, (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
});
var selectCartesianAxisSize = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSize(state, axisId).width;
    }
    case "yAxis": {
      return selectYAxisSize(state, axisId).height;
    }
    default: {
      return void 0;
    }
  }
};
var combineDuplicateDomain = (chartLayout, appliedValues, axis, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var {
    allowDuplicatedCategory,
    type,
    dataKey
  } = axis;
  var isCategorical = isCategoricalAxis(chartLayout, axisType);
  var allData = appliedValues.map((av) => av.value);
  var validData = allData.filter((v) => v != null);
  if (dataKey && isCategorical && type === "category" && allowDuplicatedCategory && hasDuplicate(validData)) {
    return allData;
  }
  return void 0;
};
var selectDuplicateDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectBaseAxis, pickAxisType], combineDuplicateDomain);
var selectAxisPropsNeededForCartesianGridTicksGenerator = createSelector([selectChartLayout, selectCartesianAxisSettings, selectRealScaleType, selectAxisScale, selectDuplicateDomain, selectCategoricalDomain, selectAxisRange, selectNiceTicks, pickAxisType], (layout, axis, realScaleType, scale, duplicateDomain, categoricalDomain, axisRange, niceTicks, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  return {
    angle: axis.angle,
    interval: axis.interval,
    minTickGap: axis.minTickGap,
    orientation: axis.orientation,
    tick: axis.tick,
    tickCount: axis.tickCount,
    tickFormatter: axis.tickFormatter,
    ticks: axis.ticks,
    type: axis.type,
    unit: axis.unit,
    axisType,
    categoricalDomain,
    duplicateDomain,
    isCategorical,
    niceTicks,
    range: axisRange,
    realScaleType,
    scale
  };
});
var combineAxisTicks = (layout, axis, realScaleType, scale, niceTicks, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var {
    type,
    ticks,
    tickCount
  } = axis;
  var offsetForBand = (
    // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
    realScaleType === "scaleBand" && typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 2
  );
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && axisRange != null && axisRange.length >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  var ticksOrNiceTicks = ticks || niceTicks;
  if (ticksOrNiceTicks) {
    return ticksOrNiceTicks.map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      var scaled = scale.map(scaleContent);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        index,
        coordinate: scaled + offset,
        value: entry,
        offset
      };
    }).filter(isNotNil);
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTicksOfAxis = createSelector([selectChartLayout, selectRenderableAxisSettings, selectRealScaleType, selectAxisScale, selectNiceTicks, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineAxisTicks);
var combineGraphicalItemTicks = (layout, axis, scale, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null || axisRange == null || axisRange[0] === axisRange[1]) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var {
    tickCount
  } = axis;
  var offset = 0;
  offset = axisType === "angleAxis" && (axisRange === null || axisRange === void 0 ? void 0 : axisRange.length) >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use unknown as index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTicksOfGraphicalItem = createSelector([selectChartLayout, selectRenderableAxisSettings, selectAxisScale, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineGraphicalItemTicks);
var selectAxisWithScale = createSelector(selectBaseAxis, selectAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$f(_objectSpread$f({}, axis), {}, {
    scale
  });
});
var selectZAxisConfiguredScale = createSelector([selectBaseAxis, selectRealScaleType, selectAxisDomain, selectAxisRangeWithReverse], combineConfiguredScale);
var selectZAxisScale = createSelector([selectZAxisConfiguredScale], rechartsScaleFactory);
createSelector((state, _axisType, axisId) => selectZAxisSettings(state, axisId), selectZAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$f(_objectSpread$f({}, axis), {}, {
    scale
  });
});
var selectChartDirection = createSelector([selectChartLayout, selectAllXAxes, selectAllYAxes], (layout, allXAxes, allYAxes) => {
  switch (layout) {
    case "horizontal": {
      return allXAxes.some((axis) => axis.reversed) ? "right-to-left" : "left-to-right";
    }
    case "vertical": {
      return allYAxes.some((axis) => axis.reversed) ? "bottom-to-top" : "top-to-bottom";
    }
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial": {
      return "left-to-right";
    }
    default: {
      return void 0;
    }
  }
});
var selectRenderedTicksOfAxis = (state, axisType, axisId) => {
  var _state$renderedTicks$;
  return (_state$renderedTicks$ = state.renderedTicks[axisType]) === null || _state$renderedTicks$ === void 0 ? void 0 : _state$renderedTicks$[axisId];
};
createSelector([selectRenderedTicksOfAxis], (ticks) => {
  if (!ticks || ticks.length === 0) {
    return void 0;
  }
  return (pixelValue) => {
    var _closestTick;
    var minDistance = Infinity;
    var closestTick = ticks[0];
    for (var tick of ticks) {
      var distance = Math.abs(tick.coordinate - pixelValue);
      if (distance < minDistance) {
        minDistance = distance;
        closestTick = tick;
      }
    }
    return (_closestTick = closestTick) === null || _closestTick === void 0 ? void 0 : _closestTick.value;
  };
});
var selectDefaultTooltipEventType = (state) => state.options.defaultTooltipEventType;
var selectValidateTooltipEventTypes = (state) => state.options.validateTooltipEventTypes;
function combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes) {
  if (shared == null) {
    return defaultTooltipEventType;
  }
  var eventType = shared ? "axis" : "item";
  if (validateTooltipEventTypes == null) {
    return defaultTooltipEventType;
  }
  return validateTooltipEventTypes.includes(eventType) ? eventType : defaultTooltipEventType;
}
function selectTooltipEventType$1(state, shared) {
  var defaultTooltipEventType = selectDefaultTooltipEventType(state);
  var validateTooltipEventTypes = selectValidateTooltipEventTypes(state);
  return combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes);
}
function useTooltipEventType(shared) {
  return useAppSelector((state) => selectTooltipEventType$1(state, shared));
}
var combineActiveLabel = (tooltipTicks, activeIndex) => {
  var _tooltipTicks$n;
  var n = Number(activeIndex);
  if (isNan(n) || activeIndex == null) {
    return void 0;
  }
  return n >= 0 ? tooltipTicks === null || tooltipTicks === void 0 || (_tooltipTicks$n = tooltipTicks[n]) === null || _tooltipTicks$n === void 0 ? void 0 : _tooltipTicks$n.value : void 0;
};
var selectTooltipSettings = (state) => state.tooltip.settings;
var noInteraction = {
  active: false,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
};
var initialState$b = {
  itemInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  axisInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  keyboardInteraction: noInteraction,
  syncInteraction: {
    active: false,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0,
    graphicalItemId: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: false,
    defaultIndex: void 0
  }
};
var tooltipSlice = createSlice({
  name: "tooltip",
  initialState: initialState$b,
  reducers: {
    addTooltipEntrySettings: {
      reducer(state, action) {
        state.tooltipItemPayloads.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceTooltipEntrySettings: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        var index = current(state).tooltipItemPayloads.indexOf(castDraft(prev));
        if (index > -1) {
          state.tooltipItemPayloads[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeTooltipEntrySettings: {
      reducer(state, action) {
        var index = current(state).tooltipItemPayloads.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.tooltipItemPayloads.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    setTooltipSettingsState(state, action) {
      state.settings = action.payload;
    },
    setActiveMouseOverItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.keyboardInteraction.active = false;
      state.itemInteraction.hover.active = true;
      state.itemInteraction.hover.index = action.payload.activeIndex;
      state.itemInteraction.hover.dataKey = action.payload.activeDataKey;
      state.itemInteraction.hover.graphicalItemId = action.payload.activeGraphicalItemId;
      state.itemInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    mouseLeaveChart(state) {
      state.itemInteraction.hover.active = false;
      state.axisInteraction.hover.active = false;
    },
    mouseLeaveItem(state) {
      state.itemInteraction.hover.active = false;
    },
    setActiveClickItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.itemInteraction.click.active = true;
      state.keyboardInteraction.active = false;
      state.itemInteraction.click.index = action.payload.activeIndex;
      state.itemInteraction.click.dataKey = action.payload.activeDataKey;
      state.itemInteraction.click.graphicalItemId = action.payload.activeGraphicalItemId;
      state.itemInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.axisInteraction.hover.active = true;
      state.keyboardInteraction.active = false;
      state.axisInteraction.hover.index = action.payload.activeIndex;
      state.axisInteraction.hover.dataKey = action.payload.activeDataKey;
      state.axisInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.syncInteraction.sourceViewBox = void 0;
      state.keyboardInteraction.active = false;
      state.axisInteraction.click.active = true;
      state.axisInteraction.click.index = action.payload.activeIndex;
      state.axisInteraction.click.dataKey = action.payload.activeDataKey;
      state.axisInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setSyncInteraction(state, action) {
      state.syncInteraction = action.payload;
    },
    setKeyboardInteraction(state, action) {
      state.keyboardInteraction.active = action.payload.active;
      state.keyboardInteraction.index = action.payload.activeIndex;
      state.keyboardInteraction.coordinate = action.payload.activeCoordinate;
    }
  }
});
var {
  addTooltipEntrySettings,
  replaceTooltipEntrySettings,
  removeTooltipEntrySettings,
  setTooltipSettingsState,
  setActiveMouseOverItemIndex,
  mouseLeaveItem,
  mouseLeaveChart,
  setActiveClickItemIndex,
  setMouseOverAxisIndex,
  setMouseClickAxisIndex,
  setSyncInteraction,
  setKeyboardInteraction
} = tooltipSlice.actions;
var tooltipReducer = tooltipSlice.reducer;
function ownKeys$e(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$e(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$e(Object(t), true).forEach(function(r2) {
      _defineProperty$g(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$e(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$g(e, r, t) {
  return (r = _toPropertyKey$g(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$g(t) {
  var i = _toPrimitive$g(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$g(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger) {
  if (tooltipEventType === "axis") {
    if (trigger === "click") {
      return tooltipState.axisInteraction.click;
    }
    return tooltipState.axisInteraction.hover;
  }
  if (trigger === "click") {
    return tooltipState.itemInteraction.click;
  }
  return tooltipState.itemInteraction.hover;
}
function hasBeenActivePreviously(tooltipInteractionState) {
  return tooltipInteractionState.index != null;
}
var combineTooltipInteractionState = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType == null) {
    return noInteraction;
  }
  var appropriateMouseInteraction = chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger);
  if (appropriateMouseInteraction == null) {
    return noInteraction;
  }
  if (appropriateMouseInteraction.active) {
    return appropriateMouseInteraction;
  }
  if (tooltipState.keyboardInteraction.active) {
    return tooltipState.keyboardInteraction;
  }
  if (tooltipState.syncInteraction.active && tooltipState.syncInteraction.index != null) {
    return tooltipState.syncInteraction;
  }
  var activeFromProps = tooltipState.settings.active === true;
  if (hasBeenActivePreviously(appropriateMouseInteraction)) {
    if (activeFromProps) {
      return _objectSpread$e(_objectSpread$e({}, appropriateMouseInteraction), {}, {
        active: true
      });
    }
  } else if (defaultIndex != null) {
    return {
      active: true,
      coordinate: void 0,
      dataKey: void 0,
      index: defaultIndex,
      graphicalItemId: void 0
    };
  }
  return _objectSpread$e(_objectSpread$e({}, noInteraction), {}, {
    coordinate: appropriateMouseInteraction.coordinate
  });
};
function toFiniteNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : void 0;
  }
  if (value instanceof Date) {
    var numericValue = value.valueOf();
    return Number.isFinite(numericValue) ? numericValue : void 0;
  }
  var parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : void 0;
}
function isValueWithinNumberDomain(value, domain) {
  var numericValue = toFiniteNumber(value);
  var lowerBound = domain[0];
  var upperBound = domain[1];
  if (numericValue === void 0) {
    return false;
  }
  var min = Math.min(lowerBound, upperBound);
  var max = Math.max(lowerBound, upperBound);
  return numericValue >= min && numericValue <= max;
}
function isValueWithinDomain(entry, axisDataKey, domain) {
  if (domain == null || axisDataKey == null) {
    return true;
  }
  var value = getValueByDataKey(entry, axisDataKey);
  if (value == null) {
    return true;
  }
  if (!isWellFormedNumberDomain(domain)) {
    return true;
  }
  return isValueWithinNumberDomain(value, domain);
}
var combineActiveTooltipIndex = (tooltipInteraction, chartData, axisDataKey, domain) => {
  var desiredIndex = tooltipInteraction === null || tooltipInteraction === void 0 ? void 0 : tooltipInteraction.index;
  if (desiredIndex == null) {
    return null;
  }
  var indexAsNumber = Number(desiredIndex);
  if (!isWellBehavedNumber(indexAsNumber)) {
    return desiredIndex;
  }
  var lowerLimit = 0;
  var upperLimit = Infinity;
  if (chartData.length > 0) {
    upperLimit = chartData.length - 1;
  }
  var clampedIndex = Math.max(lowerLimit, Math.min(indexAsNumber, upperLimit));
  var entry = chartData[clampedIndex];
  if (entry == null) {
    return String(clampedIndex);
  }
  if (!isValueWithinDomain(entry, axisDataKey, domain)) {
    return null;
  }
  return String(clampedIndex);
};
var combineCoordinateForDefaultIndex = (width, height, layout, offset, tooltipTicks, defaultIndex, tooltipConfigurations) => {
  if (defaultIndex == null) {
    return void 0;
  }
  var firstConfiguration = tooltipConfigurations[0];
  var maybePosition = firstConfiguration === null || firstConfiguration === void 0 ? void 0 : firstConfiguration.getPosition(defaultIndex);
  if (maybePosition != null) {
    return maybePosition;
  }
  var tick = tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks[Number(defaultIndex)];
  if (!tick) {
    return void 0;
  }
  switch (layout) {
    case "horizontal": {
      return {
        x: tick.coordinate,
        y: (offset.top + height) / 2
      };
    }
    default: {
      return {
        x: (offset.left + width) / 2,
        y: tick.coordinate
      };
    }
  }
};
var combineTooltipPayloadConfigurations = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType === "axis") {
    return tooltipState.tooltipItemPayloads;
  }
  if (tooltipState.tooltipItemPayloads.length === 0) {
    return [];
  }
  var filterByGraphicalItemId;
  if (trigger === "hover") {
    filterByGraphicalItemId = tooltipState.itemInteraction.hover.graphicalItemId;
  } else {
    filterByGraphicalItemId = tooltipState.itemInteraction.click.graphicalItemId;
  }
  if (tooltipState.syncInteraction.active && filterByGraphicalItemId == null) {
    return tooltipState.tooltipItemPayloads;
  }
  if (filterByGraphicalItemId == null && (defaultIndex != null || tooltipState.keyboardInteraction.active)) {
    var firstItemPayload = tooltipState.tooltipItemPayloads[0];
    if (firstItemPayload != null) {
      return [firstItemPayload];
    }
    return [];
  }
  return tooltipState.tooltipItemPayloads.filter((tpc) => {
    var _tpc$settings;
    return ((_tpc$settings = tpc.settings) === null || _tpc$settings === void 0 ? void 0 : _tpc$settings.graphicalItemId) === filterByGraphicalItemId;
  });
};
var selectTooltipPayloadSearcher = (state) => state.options.tooltipPayloadSearcher;
var selectTooltipState = (state) => state.tooltip;
function ownKeys$d(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$d(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$d(Object(t), true).forEach(function(r2) {
      _defineProperty$f(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$d(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$f(e, r, t) {
  return (r = _toPropertyKey$f(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$f(t) {
  var i = _toPrimitive$f(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$f(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function parseName(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  return void 0;
}
function parseUnit(value) {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return void 0;
}
function parseDataKey(value) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }
  if (typeof value === "function") {
    return (obj) => value(obj);
  }
  return void 0;
}
function parseColor(value) {
  if (typeof value === "string") {
    return value;
  }
  return void 0;
}
function parseTooltipPayloadItem(item) {
  if (item == null || typeof item !== "object") {
    return void 0;
  }
  var name = "name" in item ? parseName(item.name) : void 0;
  var unit = "unit" in item ? parseUnit(item.unit) : void 0;
  var dataKey = "dataKey" in item ? parseDataKey(item.dataKey) : void 0;
  var payload = "payload" in item ? item.payload : void 0;
  var color = "color" in item ? parseColor(item.color) : void 0;
  var fill = "fill" in item ? parseColor(item.fill) : void 0;
  return {
    name,
    unit,
    dataKey,
    payload,
    color,
    fill
  };
}
function selectFinalData(dataDefinedOnItem, dataDefinedOnChart) {
  if (dataDefinedOnItem != null) {
    return dataDefinedOnItem;
  }
  return dataDefinedOnChart;
}
var combineTooltipPayload = (tooltipPayloadConfigurations, activeIndex, chartDataState, tooltipAxisDataKey, activeLabel, tooltipPayloadSearcher, tooltipEventType) => {
  if (activeIndex == null || tooltipPayloadSearcher == null) {
    return void 0;
  }
  var {
    chartData,
    computedData,
    dataStartIndex,
    dataEndIndex
  } = chartDataState;
  var init = [];
  return tooltipPayloadConfigurations.reduce((agg, _ref2) => {
    var _settings$dataKey;
    var {
      dataDefinedOnItem,
      settings
    } = _ref2;
    var finalData = selectFinalData(dataDefinedOnItem, chartData);
    var sliced = Array.isArray(finalData) ? getSliced(finalData, dataStartIndex, dataEndIndex) : finalData;
    var finalDataKey = (_settings$dataKey = settings === null || settings === void 0 ? void 0 : settings.dataKey) !== null && _settings$dataKey !== void 0 ? _settings$dataKey : tooltipAxisDataKey;
    var finalNameKey = settings === null || settings === void 0 ? void 0 : settings.nameKey;
    var tooltipPayload;
    if (tooltipAxisDataKey && Array.isArray(sliced) && /*
     * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
     * as tooltip payloads and findEntryInArray is not prepared to handle that.
     * Sad but also ScatterChart only allows 'item' tooltipEventType
     * and also this is only a problem if there are multiple Scatters and each has its own data array
     * so let's fix that some other time.
     */
    !Array.isArray(sliced[0]) && /*
     * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
     * because thanks to allowDuplicatedCategory=false, the order of elements in the array
     * no longer matches the order of elements in the original data
     * and so we need to search by the active dataKey + label rather than by index.
     *
     * The same happens if multiple graphical items are present in the chart
     * and each of them has its own data array. Those arrays get concatenated
     * and again the tooltip index no longer matches the original data.
     *
     * On the other hand the tooltipEventType 'item' should always search by index
     * because we get the index from interacting over the individual elements
     * which is always accurate, irrespective of the allowDuplicatedCategory setting.
     */
    tooltipEventType === "axis") {
      tooltipPayload = findEntryInArray(sliced, tooltipAxisDataKey, activeLabel);
    } else {
      tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
    }
    if (Array.isArray(tooltipPayload)) {
      tooltipPayload.forEach((item) => {
        var _parsedItem$color, _parsedItem$fill;
        var parsedItem = parseTooltipPayloadItem(item);
        var itemName = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.name;
        var itemDataKey = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.dataKey;
        var itemPayload = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.payload;
        var newSettings = _objectSpread$d(_objectSpread$d({}, settings), {}, {
          name: itemName,
          unit: parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.unit,
          // Preserve item-level color/fill from graphical items.
          color: (_parsedItem$color = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.color) !== null && _parsedItem$color !== void 0 ? _parsedItem$color : settings === null || settings === void 0 ? void 0 : settings.color,
          fill: (_parsedItem$fill = parsedItem === null || parsedItem === void 0 ? void 0 : parsedItem.fill) !== null && _parsedItem$fill !== void 0 ? _parsedItem$fill : settings === null || settings === void 0 ? void 0 : settings.fill
        });
        agg.push(getTooltipEntry({
          tooltipEntrySettings: newSettings,
          dataKey: itemDataKey,
          payload: itemPayload,
          value: getValueByDataKey(itemPayload, itemDataKey),
          name: itemName == null ? void 0 : String(itemName)
        }));
      });
    } else {
      var _getValueByDataKey;
      agg.push(getTooltipEntry({
        tooltipEntrySettings: settings,
        dataKey: finalDataKey,
        payload: tooltipPayload,
        // getValueByDataKey does not validate the output type
        value: getValueByDataKey(tooltipPayload, finalDataKey),
        // getValueByDataKey does not validate the output type
        name: (_getValueByDataKey = getValueByDataKey(tooltipPayload, finalNameKey)) !== null && _getValueByDataKey !== void 0 ? _getValueByDataKey : settings === null || settings === void 0 ? void 0 : settings.name
      }));
    }
    return agg;
  }, init);
};
var selectTooltipAxisRealScaleType = createSelector([selectTooltipAxis, selectHasBar, selectChartName], combineRealScaleType);
var selectAllUnfilteredGraphicalItems = createSelector([(state) => state.graphicalItems.cartesianItems, (state) => state.graphicalItems.polarItems], (cartesianItems, polarItems) => [...cartesianItems, ...polarItems]);
var selectTooltipAxisPredicate = createSelector([selectTooltipAxisType, selectTooltipAxisId], itemAxisPredicate);
var selectAllGraphicalItemsSettings = createSelector([selectAllUnfilteredGraphicalItems, selectTooltipAxis, selectTooltipAxisPredicate], combineGraphicalItemsSettings, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectAllStackedGraphicalItemsSettings = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipGraphicalItemsData = createSelector([selectAllGraphicalItemsSettings], combineGraphicalItemsData, {
  memoizeOptions: {
    resultEqualityCheck: emptyArraysAreEqualCheck
  }
});
var selectAnyTooltipItemUsesChartData = createSelector([selectAllGraphicalItemsSettings], (items) => items.some((item) => !item.data));
var selectTooltipDisplayedData = createSelector([selectTooltipGraphicalItemsData, selectChartDataWithIndexes], combineDisplayedData);
var selectTooltipStackedData = createSelector([selectAllStackedGraphicalItemsSettings, selectChartDataWithIndexes, selectTooltipAxis], combineDisplayedStackedData);
var selectAllTooltipAppliedValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectAllGraphicalItemsSettings, selectChartDataWithIndexes, selectAnyTooltipItemUsesChartData, selectTooltipGraphicalItemsData], combineAllAppliedValues);
var selectTooltipAxisDomainDefinition = createSelector([selectTooltipAxis], getDomainDefinition);
var selectTooltipDataOverflow = createSelector([selectTooltipAxis], (axisSettings) => axisSettings.allowDataOverflow);
var selectTooltipDomainFromUserPreferences = createSelector([selectTooltipAxisDomainDefinition, selectTooltipDataOverflow], numericalDomainSpecifiedWithoutRequiringData);
var selectAllStackedGraphicalItems = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipStackGroups = createSelector([selectTooltipStackedData, selectAllStackedGraphicalItems, selectStackOffsetType, selectReverseStackOrder], combineStackGroups);
var selectTooltipDomainOfStackGroups = createSelector([selectTooltipStackGroups, selectChartDataWithIndexes, selectTooltipAxisType, selectTooltipDomainFromUserPreferences], combineDomainOfStackGroups);
var selectTooltipItemsSettingsExceptStacked = createSelector([selectAllGraphicalItemsSettings], filterGraphicalNotStackedItems);
var selectDomainOfAllAppliedNumericalValuesIncludingErrorValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectTooltipItemsSettingsExceptStacked, selectAllErrorBarSettings, selectTooltipAxisType, selectChartDataSliceWithIndexes], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, {
  memoizeOptions: {
    resultEqualityCheck: numberDomainEqualityCheck
  }
});
var selectReferenceDotsByTooltipAxis = createSelector([selectReferenceDots, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceDotsDomain = createSelector([selectReferenceDotsByTooltipAxis, selectTooltipAxisType], combineDotsDomain);
var selectReferenceAreasByTooltipAxis = createSelector([selectReferenceAreas, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceAreasDomain = createSelector([selectReferenceAreasByTooltipAxis, selectTooltipAxisType], combineAreasDomain);
var selectReferenceLinesByTooltipAxis = createSelector([selectReferenceLines, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceLinesDomain = createSelector([selectReferenceLinesByTooltipAxis, selectTooltipAxisType], combineLinesDomain);
var selectTooltipReferenceElementsDomain = createSelector([selectTooltipReferenceDotsDomain, selectTooltipReferenceLinesDomain, selectTooltipReferenceAreasDomain], mergeDomains);
var selectTooltipNumericalDomain = createSelector([selectTooltipAxis, selectTooltipAxisDomainDefinition, selectTooltipDomainFromUserPreferences, selectTooltipDomainOfStackGroups, selectDomainOfAllAppliedNumericalValuesIncludingErrorValues, selectTooltipReferenceElementsDomain, selectChartLayout, selectTooltipAxisType], combineNumericalDomain);
var selectTooltipAxisDomain = createSelector([selectTooltipAxis, selectChartLayout, selectTooltipDisplayedData, selectAllTooltipAppliedValues, selectStackOffsetType, selectTooltipAxisType, selectTooltipNumericalDomain], combineAxisDomain);
var selectTooltipNiceTicks = createSelector([selectTooltipAxisDomain, selectTooltipAxis, selectTooltipAxisRealScaleType], combineNiceTicks);
var selectTooltipAxisDomainIncludingNiceTicks = createSelector([selectTooltipAxis, selectTooltipAxisDomain, selectTooltipNiceTicks, selectTooltipAxisType], combineAxisDomainWithNiceTicks);
var selectTooltipAxisRange = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  var isPanorama = false;
  return selectAxisRange(state, axisType, axisId, isPanorama);
};
var selectTooltipAxisRangeWithReverse = createSelector([selectTooltipAxis, selectTooltipAxisRange], combineAxisRangeWithReverse);
var selectTooltipConfiguredScale = createSelector([selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisDomainIncludingNiceTicks, selectTooltipAxisRangeWithReverse], combineConfiguredScale);
var selectTooltipAxisScale = createSelector([selectTooltipConfiguredScale], rechartsScaleFactory);
var selectTooltipDuplicateDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineDuplicateDomain);
var selectTooltipCategoricalDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineCategoricalDomain);
var combineTicksOfTooltipAxis = (layout, axis, realScaleType, scale, range2, duplicateDomain, categoricalDomain, axisType) => {
  if (!axis) {
    return void 0;
  }
  var {
    type
  } = axis;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (!scale) {
    return void 0;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 != null && (range2 === null || range2 === void 0 ? void 0 : range2.length) >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => {
      var scaled = scale.map(entry);
      if (!isWellBehavedNumber(scaled)) {
        return null;
      }
      return {
        coordinate: scaled + offset,
        value: entry,
        index,
        offset
      };
    }).filter(isNotNil);
  }
  return scale.domain().map((entry, index) => {
    var scaled = scale.map(entry);
    if (!isWellBehavedNumber(scaled)) {
      return null;
    }
    return {
      coordinate: scaled + offset,
      // @ts-expect-error can't use Date as an index
      value: duplicateDomain ? duplicateDomain[entry] : entry,
      index,
      offset
    };
  }).filter(isNotNil);
};
var selectTooltipAxisTicks = createSelector([selectChartLayout, selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisScale, selectTooltipAxisRange, selectTooltipDuplicateDomain, selectTooltipCategoricalDomain, selectTooltipAxisType], combineTicksOfTooltipAxis);
var selectTooltipEventType = createSelector([selectDefaultTooltipEventType, selectValidateTooltipEventTypes, selectTooltipSettings], (defaultTooltipEventType, validateTooltipEventType, settings) => combineTooltipEventType(settings.shared, defaultTooltipEventType, validateTooltipEventType));
var selectTooltipTrigger = (state) => state.tooltip.settings.trigger;
var selectDefaultIndex = (state) => state.tooltip.settings.defaultIndex;
var selectTooltipInteractionState$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipInteractionState);
var selectActiveTooltipIndex = createSelector([selectTooltipInteractionState$1, selectTooltipDisplayedData, selectTooltipAxisDataKey, selectTooltipAxisDomain], combineActiveTooltipIndex);
var selectActiveLabel$1 = createSelector([selectTooltipAxisTicks, selectActiveTooltipIndex], combineActiveLabel);
var selectActiveTooltipDataKey = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.dataKey;
});
var selectActiveTooltipGraphicalItemId = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.graphicalItemId;
});
var selectTooltipPayloadConfigurations$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipPayloadConfigurations);
var selectTooltipCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, selectDefaultIndex, selectTooltipPayloadConfigurations$1], combineCoordinateForDefaultIndex);
var selectActiveTooltipCoordinate = createSelector([selectTooltipInteractionState$1, selectTooltipCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  if (tooltipInteractionState !== null && tooltipInteractionState !== void 0 && tooltipInteractionState.coordinate) {
    return tooltipInteractionState.coordinate;
  }
  return defaultIndexCoordinate;
});
var selectIsTooltipActive$1 = createSelector([selectTooltipInteractionState$1], (tooltipInteractionState) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState === null || tooltipInteractionState === void 0 ? void 0 : tooltipInteractionState.active) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : false;
});
var selectActiveTooltipPayload = createSelector([selectTooltipPayloadConfigurations$1, selectActiveTooltipIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel$1, selectTooltipPayloadSearcher, selectTooltipEventType], combineTooltipPayload);
var selectActiveTooltipDataPoints = createSelector([selectActiveTooltipPayload], (payload) => {
  if (payload == null) {
    return void 0;
  }
  var dataPoints = payload.map((p) => p.payload).filter((p) => p != null);
  return Array.from(new Set(dataPoints));
});
function ownKeys$c(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$c(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$c(Object(t), true).forEach(function(r2) {
      _defineProperty$e(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$c(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$e(e, r, t) {
  return (r = _toPropertyKey$e(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$e(t) {
  var i = _toPrimitive$e(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$e(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var useTooltipAxis = () => useAppSelector(selectTooltipAxis);
var useTooltipAxisBandSize = () => {
  var tooltipAxis = useTooltipAxis();
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var tooltipAxisScale = useAppSelector(selectTooltipAxisScale);
  if (!tooltipAxis || !tooltipAxisScale) {
    return getBandSizeOfAxis(void 0, tooltipTicks);
  }
  return getBandSizeOfAxis(_objectSpread$c(_objectSpread$c({}, tooltipAxis), {}, {
    scale: tooltipAxisScale
  }), tooltipTicks);
};
function ownKeys$b(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$b(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$b(Object(t), true).forEach(function(r2) {
      _defineProperty$d(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$b(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$d(e, r, t) {
  return (r = _toPropertyKey$d(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$d(t) {
  var i = _toPrimitive$d(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$d(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getActiveCartesianCoordinate = (layout, tooltipTicks, activeIndex, pointer) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "horizontal") {
      return {
        x: entry.coordinate,
        y: pointer.relativeY
      };
    }
    if (layout === "vertical") {
      return {
        x: pointer.relativeX,
        y: entry.coordinate
      };
    }
  }
  return {
    x: 0,
    y: 0
  };
};
var getActivePolarCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "centric") {
      var _angle = entry.coordinate;
      var {
        radius: _radius
      } = rangeObj;
      return _objectSpread$b(_objectSpread$b(_objectSpread$b({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
        angle: _angle,
        radius: _radius
      });
    }
    var radius = entry.coordinate;
    var {
      angle
    } = rangeObj;
    return _objectSpread$b(_objectSpread$b(_objectSpread$b({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
      angle,
      radius
    });
  }
  return {
    angle: 0,
    clockWise: false,
    cx: 0,
    cy: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    radius: 0,
    startAngle: 0,
    x: 0,
    y: 0
  };
};
function isInCartesianRange(pointer, offset) {
  var {
    relativeX: x,
    relativeY: y
  } = pointer;
  return x >= offset.left && x <= offset.left + offset.width && y >= offset.top && y <= offset.top + offset.height;
}
var calculateActiveTickIndex = (coordinate, ticks, unsortedTicks, axisType, range2) => {
  var _ticks$length;
  var len = (_ticks$length = ticks === null || ticks === void 0 ? void 0 : ticks.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
  if (len <= 1 || coordinate == null) {
    return 0;
  }
  if (axisType === "angleAxis" && range2 != null && Math.abs(Math.abs(range2[1] - range2[0]) - 360) <= 1e-6) {
    for (var i = 0; i < len; i++) {
      var _unsortedTicks, _unsortedTicks2, _unsortedTicks$i, _unsortedTicks$, _unsortedTicks3;
      var before = i > 0 ? (_unsortedTicks = unsortedTicks[i - 1]) === null || _unsortedTicks === void 0 ? void 0 : _unsortedTicks.coordinate : (_unsortedTicks2 = unsortedTicks[len - 1]) === null || _unsortedTicks2 === void 0 ? void 0 : _unsortedTicks2.coordinate;
      var cur = (_unsortedTicks$i = unsortedTicks[i]) === null || _unsortedTicks$i === void 0 ? void 0 : _unsortedTicks$i.coordinate;
      var after = i >= len - 1 ? (_unsortedTicks$ = unsortedTicks[0]) === null || _unsortedTicks$ === void 0 ? void 0 : _unsortedTicks$.coordinate : (_unsortedTicks3 = unsortedTicks[i + 1]) === null || _unsortedTicks3 === void 0 ? void 0 : _unsortedTicks3.coordinate;
      var sameDirectionCoord = void 0;
      if (before == null || cur == null || after == null) {
        continue;
      }
      if (mathSign(cur - before) !== mathSign(after - cur)) {
        var diffInterval = [];
        if (mathSign(after - cur) === mathSign(range2[1] - range2[0])) {
          sameDirectionCoord = after;
          var curInRange = cur + range2[1] - range2[0];
          diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
          diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          var afterInRange = after + range2[1] - range2[0];
          diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
          diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
        }
        var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
        if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
          var _unsortedTicks$i2;
          return (_unsortedTicks$i2 = unsortedTicks[i]) === null || _unsortedTicks$i2 === void 0 ? void 0 : _unsortedTicks$i2.index;
        }
      } else {
        var minValue = Math.min(before, after);
        var maxValue = Math.max(before, after);
        if (coordinate > (minValue + cur) / 2 && coordinate <= (maxValue + cur) / 2) {
          var _unsortedTicks$i3;
          return (_unsortedTicks$i3 = unsortedTicks[i]) === null || _unsortedTicks$i3 === void 0 ? void 0 : _unsortedTicks$i3.index;
        }
      }
    }
  } else if (ticks) {
    for (var _i = 0; _i < len; _i++) {
      var curr = ticks[_i];
      if (curr == null) {
        continue;
      }
      var next = ticks[_i + 1];
      var prev = ticks[_i - 1];
      if (_i === 0 && next != null && coordinate <= (curr.coordinate + next.coordinate) / 2) {
        return curr.index;
      }
      if (_i === len - 1 && prev != null && coordinate > (curr.coordinate + prev.coordinate) / 2) {
        return curr.index;
      }
      if (_i > 0 && _i < len - 1 && prev != null && next != null && coordinate > (curr.coordinate + prev.coordinate) / 2 && coordinate <= (curr.coordinate + next.coordinate) / 2) {
        return curr.index;
      }
    }
  }
  return -1;
};
var useChartName = () => {
  return useAppSelector(selectChartName);
};
var pickTooltipEventType = (_state, tooltipEventType) => tooltipEventType;
var pickTrigger = (_state, _tooltipEventType, trigger) => trigger;
var pickDefaultIndex = (_state, _tooltipEventType, _trigger, defaultIndex) => defaultIndex;
var selectOrderedTooltipTicks = createSelector(selectTooltipAxisTicks, (ticks) => sortBy$1(ticks, (o) => o.coordinate));
var selectTooltipInteractionState = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipInteractionState);
var selectActiveIndex = createSelector([selectTooltipInteractionState, selectTooltipDisplayedData, selectTooltipAxisDataKey, selectTooltipAxisDomain], combineActiveTooltipIndex);
var selectTooltipDataKey = (state, tooltipEventType, trigger) => {
  if (tooltipEventType == null) {
    return void 0;
  }
  var tooltipState = selectTooltipState(state);
  if (tooltipEventType === "axis") {
    if (trigger === "hover") {
      return tooltipState.axisInteraction.hover.dataKey;
    }
    return tooltipState.axisInteraction.click.dataKey;
  }
  if (trigger === "hover") {
    return tooltipState.itemInteraction.hover.dataKey;
  }
  return tooltipState.itemInteraction.click.dataKey;
};
var selectTooltipPayloadConfigurations = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipPayloadConfigurations);
var selectCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, pickDefaultIndex, selectTooltipPayloadConfigurations], combineCoordinateForDefaultIndex);
var selectActiveCoordinate = createSelector([selectTooltipInteractionState, selectCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState.coordinate) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : defaultIndexCoordinate;
});
var selectActiveLabel = createSelector([selectTooltipAxisTicks, selectActiveIndex], combineActiveLabel);
var selectTooltipPayload = createSelector([selectTooltipPayloadConfigurations, selectActiveIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel, selectTooltipPayloadSearcher, pickTooltipEventType], combineTooltipPayload);
var selectIsTooltipActive = createSelector([selectTooltipInteractionState, selectActiveIndex], (tooltipInteractionState, activeIndex) => {
  return {
    isActive: tooltipInteractionState.active && activeIndex != null,
    activeIndex
  };
});
var combineActiveCartesianProps = (chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  if (!isInCartesianRange(chartEvent, offset)) {
    return void 0;
  }
  var pos = calculateCartesianTooltipPos(chartEvent, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActiveCartesianCoordinate(layout, tooltipTicks, activeIndex, chartEvent);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
var combineActivePolarProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks) => {
  if (!chartEvent || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks || !polarViewBox) {
    return void 0;
  }
  var rangeObj = inRangeOfSector(chartEvent, polarViewBox);
  if (!rangeObj) {
    return void 0;
  }
  var pos = calculatePolarTooltipPos(rangeObj, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActivePolarCoordinate(layout, tooltipTicks, activeIndex, rangeObj);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
var combineActiveProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !layout || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  if (layout === "horizontal" || layout === "vertical") {
    return combineActiveCartesianProps(chartEvent, layout, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset);
  }
  return combineActivePolarProps(chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks);
};
var selectZIndexPortalElement = createSelector((state) => state.zIndex.zIndexMap, (_, zIndex) => zIndex, (_, _zIndex, isPanorama) => isPanorama, (zIndexMap, zIndex, isPanorama) => {
  if (zIndex == null) {
    return void 0;
  }
  var entry = zIndexMap[zIndex];
  if (entry == null) {
    return void 0;
  }
  if (isPanorama) {
    return entry.panoramaElement;
  }
  return entry.element;
});
var selectAllRegisteredZIndexes = createSelector((state) => state.zIndex.zIndexMap, (zIndexMap) => {
  var allNumbers = Object.keys(zIndexMap).map((zIndexStr) => parseInt(zIndexStr, 10)).concat(Object.values(DefaultZIndexes));
  var uniqueNumbers = Array.from(new Set(allNumbers));
  return uniqueNumbers.sort((a, b) => a - b);
}, {
  memoizeOptions: {
    resultEqualityCheck: arrayContentsAreEqualCheck
  }
});
function ownKeys$a(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$a(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$a(Object(t), true).forEach(function(r2) {
      _defineProperty$c(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$a(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$c(e, r, t) {
  return (r = _toPropertyKey$c(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$c(t) {
  var i = _toPrimitive$c(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$c(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var seed = {};
var initialState$a = {
  zIndexMap: Object.values(DefaultZIndexes).reduce((acc, current2) => _objectSpread$a(_objectSpread$a({}, acc), {}, {
    [current2]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), seed)
};
var defaultZIndexSet = new Set(Object.values(DefaultZIndexes));
function isDefaultZIndex(zIndex) {
  return defaultZIndexSet.has(zIndex);
}
var zIndexSlice = createSlice({
  name: "zIndex",
  initialState: initialState$a,
  reducers: {
    registerZIndexPortal: {
      reducer: (state, action) => {
        var {
          zIndex
        } = action.payload;
        if (state.zIndexMap[zIndex]) {
          state.zIndexMap[zIndex].consumers += 1;
        } else {
          state.zIndexMap[zIndex] = {
            consumers: 1,
            element: void 0,
            panoramaElement: void 0
          };
        }
      },
      prepare: prepareAutoBatched()
    },
    unregisterZIndexPortal: {
      reducer: (state, action) => {
        var {
          zIndex
        } = action.payload;
        if (state.zIndexMap[zIndex]) {
          state.zIndexMap[zIndex].consumers -= 1;
          if (state.zIndexMap[zIndex].consumers <= 0 && !isDefaultZIndex(zIndex)) {
            delete state.zIndexMap[zIndex];
          }
        }
      },
      prepare: prepareAutoBatched()
    },
    registerZIndexPortalElement: {
      reducer: (state, action) => {
        var {
          zIndex,
          element,
          isPanorama
        } = action.payload;
        if (state.zIndexMap[zIndex]) {
          if (isPanorama) {
            state.zIndexMap[zIndex].panoramaElement = castDraft(element);
          } else {
            state.zIndexMap[zIndex].element = castDraft(element);
          }
        } else {
          state.zIndexMap[zIndex] = {
            consumers: 0,
            element: isPanorama ? void 0 : castDraft(element),
            panoramaElement: isPanorama ? castDraft(element) : void 0
          };
        }
      },
      prepare: prepareAutoBatched()
    },
    unregisterZIndexPortalElement: {
      reducer: (state, action) => {
        var {
          zIndex
        } = action.payload;
        if (state.zIndexMap[zIndex]) {
          if (action.payload.isPanorama) {
            state.zIndexMap[zIndex].panoramaElement = void 0;
          } else {
            state.zIndexMap[zIndex].element = void 0;
          }
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var {
  registerZIndexPortal,
  unregisterZIndexPortal,
  registerZIndexPortalElement,
  unregisterZIndexPortalElement
} = zIndexSlice.actions;
var zIndexReducer = zIndexSlice.reducer;
function ZIndexLayer(_ref2) {
  var {
    zIndex,
    children
  } = _ref2;
  var isInChartContext = useIsInChartContext();
  var shouldRenderInPortal = isInChartContext && zIndex !== void 0 && zIndex !== 0;
  var isPanorama = useIsPanorama();
  var lastPortalElementRef = useRef(void 0);
  var registeredZIndexesRef = useRef(/* @__PURE__ */ new Set());
  var dispatch = useAppDispatch();
  var portalElement = useAppSelector((state) => selectZIndexPortalElement(state, zIndex, isPanorama));
  useLayoutEffect(() => {
    if (!shouldRenderInPortal) {
      var registered = registeredZIndexesRef.current;
      registered.forEach((z) => {
        dispatch(unregisterZIndexPortal({
          zIndex: z
        }));
      });
      registered.clear();
      lastPortalElementRef.current = void 0;
      return;
    }
    if (!registeredZIndexesRef.current.has(zIndex)) {
      dispatch(registerZIndexPortal({
        zIndex
      }));
      registeredZIndexesRef.current.add(zIndex);
    }
    if (portalElement) {
      lastPortalElementRef.current = portalElement;
      var _registered = registeredZIndexesRef.current;
      _registered.forEach((z) => {
        if (z !== zIndex) {
          dispatch(unregisterZIndexPortal({
            zIndex: z
          }));
          _registered.delete(z);
        }
      });
    }
  }, [dispatch, zIndex, shouldRenderInPortal, portalElement]);
  useLayoutEffect(() => {
    var registered = registeredZIndexesRef.current;
    return () => {
      registered.forEach((z) => {
        dispatch(unregisterZIndexPortal({
          zIndex: z
        }));
      });
      registered.clear();
    };
  }, [dispatch]);
  if (!shouldRenderInPortal) {
    return children;
  }
  var targetElement = portalElement !== null && portalElement !== void 0 ? portalElement : lastPortalElementRef.current;
  if (!targetElement) {
    return null;
  }
  return /* @__PURE__ */ createPortal(children, targetElement);
}
function _extends$6() {
  return _extends$6 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$6.apply(null, arguments);
}
function ownKeys$9(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$9(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$9(Object(t), true).forEach(function(r2) {
      _defineProperty$b(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$9(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$b(e, r, t) {
  return (r = _toPropertyKey$b(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$b(t) {
  var i = _toPrimitive$b(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$b(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function RenderCursor(_ref2) {
  var {
    cursor,
    cursorComp,
    cursorProps
  } = _ref2;
  if (/* @__PURE__ */ isValidElement(cursor)) {
    return /* @__PURE__ */ cloneElement(cursor, cursorProps);
  }
  return /* @__PURE__ */ createElement(cursorComp, cursorProps);
}
function CursorInternal(props) {
  var _props$zIndex;
  var {
    coordinate,
    payload,
    index,
    offset,
    tooltipAxisBandSize,
    layout,
    cursor,
    tooltipEventType,
    chartName
  } = props;
  var activeCoordinate = coordinate;
  var activePayload = payload;
  var activeTooltipIndex = index;
  if (!cursor || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") {
    return null;
  }
  var restProps, cursorComp, preferredZIndex;
  if (chartName === "ScatterChart") {
    restProps = activeCoordinate;
    cursorComp = Cross;
    preferredZIndex = DefaultZIndexes.cursorLine;
  } else if (chartName === "BarChart") {
    restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
    cursorComp = Rectangle;
    preferredZIndex = DefaultZIndexes.cursorRectangle;
  } else if (layout === "radial" && isPolarCoordinate(activeCoordinate)) {
    var {
      cx,
      cy,
      radius,
      startAngle,
      endAngle
    } = getRadialCursorPoints(activeCoordinate);
    restProps = {
      cx,
      cy,
      startAngle,
      endAngle,
      innerRadius: radius,
      outerRadius: radius
    };
    cursorComp = Sector;
    preferredZIndex = DefaultZIndexes.cursorLine;
  } else {
    restProps = {
      points: getCursorPoints(layout, activeCoordinate, offset)
    };
    cursorComp = Curve;
    preferredZIndex = DefaultZIndexes.cursorLine;
  }
  var extraClassName = typeof cursor === "object" && "className" in cursor ? cursor.className : void 0;
  var cursorProps = _objectSpread$9(_objectSpread$9(_objectSpread$9(_objectSpread$9({
    stroke: "#ccc",
    pointerEvents: "none"
  }, offset), restProps), svgPropertiesNoEventsFromUnknown(cursor)), {}, {
    payload: activePayload,
    payloadIndex: activeTooltipIndex,
    className: clsx("recharts-tooltip-cursor", extraClassName)
  });
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex: (_props$zIndex = props.zIndex) !== null && _props$zIndex !== void 0 ? _props$zIndex : preferredZIndex
  }, /* @__PURE__ */ React.createElement(RenderCursor, {
    cursor,
    cursorComp,
    cursorProps
  }));
}
function Cursor(props) {
  var tooltipAxisBandSize = useTooltipAxisBandSize();
  var offset = useOffsetInternal();
  var layout = useChartLayout();
  var chartName = useChartName();
  if (tooltipAxisBandSize == null || offset == null || layout == null || chartName == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(CursorInternal, _extends$6({}, props, {
    offset,
    layout,
    tooltipAxisBandSize,
    chartName
  }));
}
var TooltipPortalContext = /* @__PURE__ */ createContext(null);
var useTooltipPortal = () => useContext(TooltipPortalContext);
var eventCenter = new EventEmitter();
var TOOLTIP_SYNC_EVENT = "recharts.syncEvent.tooltip";
var BRUSH_SYNC_EVENT = "recharts.syncEvent.brush";
var arrayTooltipSearcher = (data, strIndex) => {
  if (!strIndex) return void 0;
  if (!Array.isArray(data)) return void 0;
  var numIndex = Number.parseInt(strIndex, 10);
  if (isNan(numIndex)) {
    return void 0;
  }
  return data[numIndex];
};
var initialState$9 = {
  chartName: "",
  tooltipPayloadSearcher: () => void 0,
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
};
var optionsSlice = createSlice({
  name: "options",
  initialState: initialState$9,
  reducers: {
    createEventEmitter: (state) => {
      if (state.eventEmitter == null) {
        state.eventEmitter = /* @__PURE__ */ Symbol("rechartsEventEmitter");
      }
    }
  }
});
var optionsReducer = optionsSlice.reducer;
var {
  createEventEmitter
} = optionsSlice.actions;
function selectSynchronisedTooltipState(state) {
  return state.tooltip.syncInteraction;
}
var initialChartDataState = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
};
var chartDataSlice = createSlice({
  name: "chartData",
  initialState: initialChartDataState,
  reducers: {
    setChartData(state, action) {
      state.chartData = castDraft(action.payload);
      if (action.payload == null) {
        state.dataStartIndex = 0;
        state.dataEndIndex = 0;
        return;
      }
      if (action.payload.length > 0 && state.dataEndIndex !== action.payload.length - 1) {
        state.dataEndIndex = action.payload.length - 1;
      }
    },
    setComputedData(state, action) {
      state.computedData = action.payload;
    },
    setDataStartEndIndexes(state, action) {
      var {
        startIndex,
        endIndex
      } = action.payload;
      if (startIndex != null) {
        state.dataStartIndex = startIndex;
      }
      if (endIndex != null) {
        state.dataEndIndex = endIndex;
      }
    }
  }
});
var {
  setChartData,
  setDataStartEndIndexes,
  setComputedData
} = chartDataSlice.actions;
var chartDataReducer = chartDataSlice.reducer;
var _excluded$6 = ["x", "y"];
function ownKeys$8(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$8(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$8(Object(t), true).forEach(function(r2) {
      _defineProperty$a(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$8(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$a(e, r, t) {
  return (r = _toPropertyKey$a(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$a(t) {
  var i = _toPrimitive$a(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$a(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _objectWithoutProperties$6(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$6(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$6(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function useTooltipSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var layout = useChartLayout();
  var viewBox = useViewBox();
  var className = useAppSelector((state) => state.rootProps.className);
  useEffect(() => {
    if (mySyncId == null) {
      return noop$1;
    }
    var listener = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId !== incomingSyncId) {
        return;
      }
      if (action.payload.active === false) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: void 0,
          graphicalItemId: void 0
        }));
        return;
      }
      if (syncMethod === "index") {
        var _action$payload;
        if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate && action.payload.sourceViewBox) {
          var _action$payload$coord = action.payload.coordinate, {
            x: _x,
            y: _y
          } = _action$payload$coord, otherCoordinateProps = _objectWithoutProperties$6(_action$payload$coord, _excluded$6);
          var {
            x: sourceX,
            y: sourceY,
            width: sourceWidth,
            height: sourceHeight
          } = action.payload.sourceViewBox;
          var scaledCoordinate = _objectSpread$8(_objectSpread$8({}, otherCoordinateProps), {}, {
            x: viewBox.x + (sourceWidth ? (_x - sourceX) / sourceWidth : 0) * viewBox.width,
            y: viewBox.y + (sourceHeight ? (_y - sourceY) / sourceHeight : 0) * viewBox.height
          });
          dispatch(_objectSpread$8(_objectSpread$8({}, action), {}, {
            payload: _objectSpread$8(_objectSpread$8({}, action.payload), {}, {
              coordinate: scaledCoordinate
            })
          }));
        } else {
          dispatch(action);
        }
        return;
      }
      if (tooltipTicks == null) {
        return;
      }
      var activeTick;
      if (typeof syncMethod === "function") {
        var syncMethodParam = {
          activeTooltipIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          isTooltipActive: action.payload.active,
          activeIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          activeLabel: action.payload.label,
          activeDataKey: action.payload.dataKey,
          activeCoordinate: action.payload.coordinate
        };
        var activeTooltipIndex = syncMethod(tooltipTicks, syncMethodParam);
        activeTick = tooltipTicks[activeTooltipIndex];
      } else if (syncMethod === "value") {
        activeTick = tooltipTicks.find((tick) => String(tick.value) === action.payload.label);
      }
      var {
        coordinate
      } = action.payload;
      if (coordinate == null || viewBox == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: void 0,
          graphicalItemId: void 0
        }));
        return;
      }
      if (activeTick == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0,
          sourceViewBox: action.payload.sourceViewBox,
          graphicalItemId: void 0
        }));
        return;
      }
      var {
        x,
        y
      } = coordinate;
      var validateChartX = Math.min(x, viewBox.x + viewBox.width);
      var validateChartY = Math.min(y, viewBox.y + viewBox.height);
      var activeCoordinate = {
        x: layout === "horizontal" ? activeTick.coordinate : validateChartX,
        y: layout === "horizontal" ? validateChartY : activeTick.coordinate
      };
      var syncAction = setSyncInteraction({
        active: action.payload.active,
        coordinate: activeCoordinate,
        dataKey: action.payload.dataKey,
        index: String(activeTick.index),
        label: action.payload.label,
        sourceViewBox: action.payload.sourceViewBox,
        graphicalItemId: action.payload.graphicalItemId
      });
      dispatch(syncAction);
    };
    eventCenter.on(TOOLTIP_SYNC_EVENT, listener);
    return () => {
      eventCenter.off(TOOLTIP_SYNC_EVENT, listener);
    };
  }, [className, dispatch, myEventEmitter, mySyncId, syncMethod, tooltipTicks, layout, viewBox]);
}
function useBrushSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  useEffect(() => {
    if (mySyncId == null) {
      return noop$1;
    }
    var listener = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId === incomingSyncId) {
        dispatch(setDataStartEndIndexes(action));
      }
    };
    eventCenter.on(BRUSH_SYNC_EVENT, listener);
    return () => {
      eventCenter.off(BRUSH_SYNC_EVENT, listener);
    };
  }, [dispatch, myEventEmitter, mySyncId]);
}
function useSynchronisedEventsFromOtherCharts() {
  var dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(createEventEmitter());
  }, [dispatch]);
  useTooltipSyncEventsListener();
  useBrushSyncEventsListener();
}
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
  var activeDataKey = useAppSelector((state) => selectTooltipDataKey(state, tooltipEventType, trigger));
  var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
  var eventEmitterSymbol = useAppSelector(selectEventEmitter);
  var syncId = useAppSelector(selectSyncId);
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipState = useAppSelector(selectSynchronisedTooltipState);
  var isReceivingSynchronisation = (tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.sourceViewBox) != null;
  var viewBox = useViewBox();
  useEffect(() => {
    if (isReceivingSynchronisation) {
      return;
    }
    if (syncId == null) {
      return;
    }
    if (eventEmitterSymbol == null) {
      return;
    }
    var syncAction = setSyncInteraction({
      active: isTooltipActive,
      coordinate: activeCoordinate,
      dataKey: activeDataKey,
      index: activeIndex,
      label: typeof activeLabel === "number" ? String(activeLabel) : activeLabel,
      sourceViewBox: viewBox,
      graphicalItemId: activeGraphicalItemId
    });
    eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId, syncAction, eventEmitterSymbol);
  }, [isReceivingSynchronisation, activeCoordinate, activeDataKey, activeGraphicalItemId, activeIndex, activeLabel, eventEmitterSymbol, syncId, syncMethod, isTooltipActive, viewBox]);
}
function ownKeys$7(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$7(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$7(Object(t), true).forEach(function(r2) {
      _defineProperty$9(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$7(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$9(e, r, t) {
  return (r = _toPropertyKey$9(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$9(t) {
  var i = _toPrimitive$9(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function defaultUniqBy(entry) {
  return entry.dataKey;
}
function renderContent(content, props) {
  if (/* @__PURE__ */ React.isValidElement(content)) {
    return /* @__PURE__ */ React.cloneElement(content, props);
  }
  if (typeof content === "function") {
    return /* @__PURE__ */ React.createElement(content, props);
  }
  return /* @__PURE__ */ React.createElement(DefaultTooltipContent, props);
}
var emptyPayload = [];
var defaultTooltipProps = {
  allowEscapeViewBox: {
    x: false,
    y: false
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: true,
  filterNull: true,
  includeHidden: false,
  isAnimationActive: "auto",
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: false,
    y: false
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: false,
  wrapperStyle: {}
};
function Tooltip(outsideProps) {
  var _useAppSelector, _ref2;
  var props = resolveDefaultProps(outsideProps, defaultTooltipProps);
  var {
    active: activeFromProps,
    allowEscapeViewBox,
    animationDuration,
    animationEasing,
    content,
    filterNull,
    isAnimationActive,
    offset,
    payloadUniqBy,
    position,
    reverseDirection,
    useTranslate3d,
    wrapperStyle,
    cursor,
    shared,
    trigger,
    defaultIndex,
    portal: portalFromProps,
    axisId
  } = props;
  var dispatch = useAppDispatch();
  var defaultIndexAsString = typeof defaultIndex === "number" ? String(defaultIndex) : defaultIndex;
  useEffect(() => {
    dispatch(setTooltipSettingsState({
      shared,
      trigger,
      axisId,
      active: activeFromProps,
      defaultIndex: defaultIndexAsString
    }));
  }, [dispatch, shared, trigger, axisId, activeFromProps, defaultIndexAsString]);
  var viewBox = useViewBox();
  var accessibilityLayer = useAccessibilityLayer();
  var tooltipEventType = useTooltipEventType(shared);
  var {
    activeIndex,
    isActive
  } = (_useAppSelector = useAppSelector((state) => selectIsTooltipActive(state, tooltipEventType, trigger, defaultIndexAsString))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
  var payloadFromRedux = useAppSelector((state) => selectTooltipPayload(state, tooltipEventType, trigger, defaultIndexAsString));
  var labelFromRedux = useAppSelector((state) => selectActiveLabel(state, tooltipEventType, trigger, defaultIndexAsString));
  var coordinate = useAppSelector((state) => selectActiveCoordinate(state, tooltipEventType, trigger, defaultIndexAsString));
  var payload = payloadFromRedux;
  var tooltipPortalFromContext = useTooltipPortal();
  var finalIsActive = (_ref2 = activeFromProps !== null && activeFromProps !== void 0 ? activeFromProps : isActive) !== null && _ref2 !== void 0 ? _ref2 : false;
  var [lastBoundingBox, updateBoundingBox] = useElementOffset([payload, finalIsActive]);
  var finalLabel = tooltipEventType === "axis" ? labelFromRedux : void 0;
  useTooltipChartSynchronisation(tooltipEventType, trigger, coordinate, finalLabel, activeIndex, finalIsActive);
  var tooltipPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : tooltipPortalFromContext;
  if (tooltipPortal == null || viewBox == null || tooltipEventType == null) {
    return null;
  }
  var finalPayload = payload !== null && payload !== void 0 ? payload : emptyPayload;
  if (!finalIsActive) {
    finalPayload = emptyPayload;
  }
  if (filterNull && finalPayload.length) {
    finalPayload = getUniqPayload(finalPayload.filter((entry) => entry.value != null && (entry.hide !== true || props.includeHidden)), payloadUniqBy, defaultUniqBy);
  }
  var hasPayload = finalPayload.length > 0;
  var tooltipContentProps = _objectSpread$7(_objectSpread$7({}, props), {}, {
    payload: finalPayload,
    label: finalLabel,
    active: finalIsActive,
    activeIndex,
    coordinate,
    accessibilityLayer
  });
  var tooltipElement = /* @__PURE__ */ React.createElement(TooltipBoundingBox, {
    allowEscapeViewBox,
    animationDuration,
    animationEasing,
    isAnimationActive,
    active: finalIsActive,
    coordinate,
    hasPayload,
    offset,
    position,
    reverseDirection,
    useTranslate3d,
    viewBox,
    wrapperStyle,
    lastBoundingBox,
    innerRef: updateBoundingBox,
    hasPortalFromProps: Boolean(portalFromProps)
  }, renderContent(content, tooltipContentProps));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ createPortal(tooltipElement, tooltipPortal), finalIsActive && /* @__PURE__ */ React.createElement(Cursor, {
    cursor,
    tooltipEventType,
    coordinate,
    payload: finalPayload,
    index: activeIndex
  }));
}
var Cell = (_props) => null;
Cell.displayName = "Cell";
function _defineProperty$8(e, r, t) {
  return (r = _toPropertyKey$8(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$8(t) {
  var i = _toPrimitive$8(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
class LRUCache {
  constructor(maxSize) {
    _defineProperty$8(this, "cache", /* @__PURE__ */ new Map());
    this.maxSize = maxSize;
  }
  get(key) {
    var value = this.cache.get(key);
    if (value !== void 0) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      var firstKey = this.cache.keys().next().value;
      if (firstKey != null) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$7(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$7(e, r, t) {
  return (r = _toPropertyKey$7(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$7(t) {
  var i = _toPrimitive$7(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultConfig = {
  cacheSize: 2e3,
  enableCache: true
};
var currentConfig = _objectSpread$6({}, defaultConfig);
var stringCache = new LRUCache(currentConfig.cacheSize);
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var MEASUREMENT_SPAN_ID = "recharts_measurement_span";
function createCacheKey(text, style) {
  var fontSize = style.fontSize || "";
  var fontFamily = style.fontFamily || "";
  var fontWeight = style.fontWeight || "";
  var fontStyle = style.fontStyle || "";
  var letterSpacing = style.letterSpacing || "";
  var textTransform = style.textTransform || "";
  return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
var measureTextWithDOM = (text, style) => {
  try {
    var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (!measurementSpan) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    Object.assign(measurementSpan.style, SPAN_STYLE, style);
    measurementSpan.textContent = "".concat(text);
    var rect = measurementSpan.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  } catch (_unused) {
    return {
      width: 0,
      height: 0
    };
  }
};
var getStringSize = function getStringSize2(text) {
  var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (text === void 0 || text === null || Global.isSsr) {
    return {
      width: 0,
      height: 0
    };
  }
  if (!currentConfig.enableCache) {
    return measureTextWithDOM(text, style);
  }
  var cacheKey = createCacheKey(text, style);
  var cachedResult = stringCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  var result = measureTextWithDOM(text, style);
  stringCache.set(cacheKey, result);
  return result;
};
var _DecimalCSS;
function _defineProperty$6(e, r, t) {
  return (r = _toPropertyKey$6(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
};
var FIXED_CSS_LENGTH_UNITS = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function isSupportedUnit(unit) {
  return FIXED_CSS_LENGTH_UNITS.includes(unit);
}
var STR_NAN = "NaN";
function convertToPx(value, unit) {
  return value * CONVERSION_RATES[unit];
}
class DecimalCSS {
  static parse(str) {
    var _NUM_SPLIT_REGEX$exec;
    var [, numStr, unit] = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [];
    if (numStr == null) {
      return DecimalCSS.NaN;
    }
    return new DecimalCSS(parseFloat(numStr), unit !== null && unit !== void 0 ? unit : "");
  }
  constructor(num, unit) {
    this.num = num;
    this.unit = unit;
    this.num = num;
    this.unit = unit;
    if (isNan(num)) {
      this.unit = "";
    }
    if (unit !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit)) {
      this.num = NaN;
      this.unit = "";
    }
    if (isSupportedUnit(unit)) {
      this.num = convertToPx(num, unit);
      this.unit = "px";
    }
  }
  add(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num + other.num, this.unit);
  }
  subtract(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num - other.num, this.unit);
  }
  multiply(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num * other.num, this.unit || other.unit);
  }
  divide(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num / other.num, this.unit || other.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return isNan(this.num);
  }
}
_DecimalCSS = DecimalCSS;
_defineProperty$6(DecimalCSS, "NaN", new _DecimalCSS(NaN, ""));
function calculateArithmetic(expr) {
  if (expr == null || expr.includes(STR_NAN)) {
    return STR_NAN;
  }
  var newExpr = expr;
  while (newExpr.includes("*") || newExpr.includes("/")) {
    var _MULTIPLY_OR_DIVIDE_R;
    var [, leftOperand, operator, rightOperand] = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [];
    var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
    var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
    var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
    if (result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
  }
  while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
    var _ADD_OR_SUBTRACT_REGE;
    var [, _leftOperand, _operator, _rightOperand] = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [];
    var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
    var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
    var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
    if (_result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
  }
  return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
  var newExpr = expr;
  var match;
  while ((match = PARENTHESES_REGEX.exec(newExpr)) != null) {
    var [, parentheticalExpression] = match;
    newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
  }
  return newExpr;
}
function evaluateExpression(expression) {
  var newExpr = expression.replace(/\s+/g, "");
  newExpr = calculateParentheses(newExpr);
  newExpr = calculateArithmetic(newExpr);
  return newExpr;
}
function safeEvaluateExpression(expression) {
  try {
    return evaluateExpression(expression);
  } catch (_unused) {
    return STR_NAN;
  }
}
function reduceCSSCalc(expression) {
  var result = safeEvaluateExpression(expression.slice(5, -1));
  if (result === STR_NAN) {
    return "";
  }
  return result;
}
var _excluded$5 = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], _excluded2$2 = ["dx", "dy", "angle", "className", "breakAll"];
function _extends$5() {
  return _extends$5 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$5.apply(null, arguments);
}
function _objectWithoutProperties$5(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$5(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$5(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = (_ref2) => {
  var {
    children,
    breakAll,
    style
  } = _ref2;
  try {
    var words = [];
    if (!isNullish(children)) {
      if (breakAll) {
        words = children.toString().split("");
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    var wordsWithComputedWidth = words.map((word) => ({
      word,
      width: getStringSize(word, style).width
    }));
    var spaceWidth = breakAll ? 0 : getStringSize(" ", style).width;
    return {
      wordsWithComputedWidth,
      spaceWidth
    };
  } catch (_unused) {
    return null;
  }
};
function isValidTextAnchor(value) {
  return value === "start" || value === "middle" || value === "end" || value === "inherit";
}
function isRenderableText(val) {
  return isNullish(val) || typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
var calculate = (words, lineWidth, spaceWidth, scaleToFit) => words.reduce((result, _ref2) => {
  var {
    word,
    width
  } = _ref2;
  var currentLine = result[result.length - 1];
  if (currentLine && width != null && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
    currentLine.words.push(word);
    currentLine.width += width + spaceWidth;
  } else {
    var newLine = {
      words: [word],
      width
    };
    result.push(newLine);
  }
  return result;
}, []);
var findLongestLine = (words) => words.reduce((a, b) => a.width > b.width ? a : b);
var suffix = "…";
var checkOverflow = (text, index, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit) => {
  var tempText = text.slice(0, index);
  var words = calculateWordWidths({
    breakAll,
    style,
    children: tempText + suffix
  });
  if (!words) {
    return [false, []];
  }
  var result = calculate(words.wordsWithComputedWidth, lineWidth, spaceWidth, scaleToFit);
  var doesOverflow = result.length > maxLines || findLongestLine(result).width > Number(lineWidth);
  return [doesOverflow, result];
};
var calculateWordsByLines = (_ref3, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
  var {
    maxLines,
    children,
    style,
    breakAll
  } = _ref3;
  var shouldLimitLines = isNumber(maxLines);
  var text = String(children);
  var originalResult = calculate(initialWordsWithComputedWith, lineWidth, spaceWidth, scaleToFit);
  if (!shouldLimitLines || scaleToFit) {
    return originalResult;
  }
  var overflows = originalResult.length > maxLines || findLongestLine(originalResult).width > Number(lineWidth);
  if (!overflows) {
    return originalResult;
  }
  var start = 0;
  var end = text.length - 1;
  var iterations = 0;
  var trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    var middle = Math.floor((start + end) / 2);
    var prev = middle - 1;
    var [doesPrevOverflow, result] = checkOverflow(text, prev, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit);
    var [doesMiddleOverflow] = checkOverflow(text, middle, breakAll, style, maxLines, lineWidth, spaceWidth, scaleToFit);
    if (!doesPrevOverflow && !doesMiddleOverflow) {
      start = middle + 1;
    }
    if (doesPrevOverflow && doesMiddleOverflow) {
      end = middle - 1;
    }
    if (!doesPrevOverflow && doesMiddleOverflow) {
      trimmedResult = result;
      break;
    }
    iterations++;
  }
  return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = (children) => {
  var words = !isNullish(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words,
    width: void 0
  }];
};
var getWordsByLines = (_ref4) => {
  var {
    width,
    scaleToFit,
    children,
    style,
    breakAll,
    maxLines
  } = _ref4;
  if ((width || scaleToFit) && !Global.isSsr) {
    var wordsWithComputedWidth, spaceWidth;
    var wordWidths = calculateWordWidths({
      breakAll,
      children,
      style
    });
    if (wordWidths) {
      var {
        wordsWithComputedWidth: wcw,
        spaceWidth: sw
      } = wordWidths;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll,
      children,
      maxLines,
      style
    }, wordsWithComputedWidth, spaceWidth, width, Boolean(scaleToFit));
  }
  return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = "#808080";
var textDefaultProps = {
  angle: 0,
  breakAll: false,
  // Magic number from d3
  capHeight: "0.71em",
  fill: DEFAULT_FILL,
  lineHeight: "1em",
  scaleToFit: false,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
};
var Text = /* @__PURE__ */ forwardRef((outsideProps, ref) => {
  var _resolveDefaultProps = resolveDefaultProps(outsideProps, textDefaultProps), {
    x: propsX,
    y: propsY,
    lineHeight,
    capHeight,
    fill,
    scaleToFit,
    textAnchor,
    verticalAnchor
  } = _resolveDefaultProps, props = _objectWithoutProperties$5(_resolveDefaultProps, _excluded$5);
  var wordsByLines = useMemo(() => {
    return getWordsByLines({
      breakAll: props.breakAll,
      children: props.children,
      maxLines: props.maxLines,
      scaleToFit,
      style: props.style,
      width: props.width
    });
  }, [props.breakAll, props.children, props.maxLines, scaleToFit, props.style, props.width]);
  var {
    dx,
    dy,
    angle,
    className,
    breakAll
  } = props, textProps = _objectWithoutProperties$5(props, _excluded2$2);
  if (!isNumOrStr(propsX) || !isNumOrStr(propsY) || wordsByLines.length === 0) {
    return null;
  }
  var x = Number(propsX) + (isNumber(dx) ? dx : 0);
  var y = Number(propsY) + (isNumber(dy) ? dy : 0);
  if (!isWellBehavedNumber(x) || !isWellBehavedNumber(y)) {
    return null;
  }
  var startDy;
  switch (verticalAnchor) {
    case "start":
      startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
      break;
    case "middle":
      startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
      break;
    default:
      startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
      break;
  }
  var transforms = [];
  var firstLine = wordsByLines[0];
  if (scaleToFit && firstLine != null) {
    var lineWidth = firstLine.width;
    var {
      width
    } = props;
    transforms.push("scale(".concat(isNumber(width) && isNumber(lineWidth) ? width / lineWidth : 1, ")"));
  }
  if (angle) {
    transforms.push("rotate(".concat(angle, ", ").concat(x, ", ").concat(y, ")"));
  }
  if (transforms.length) {
    textProps.transform = transforms.join(" ");
  }
  return /* @__PURE__ */ React.createElement("text", _extends$5({}, svgPropertiesAndEvents(textProps), {
    ref,
    x,
    y,
    className: clsx("recharts-text", className),
    textAnchor,
    fill: fill.includes("url") ? DEFAULT_FILL : fill
  }), wordsByLines.map((line2, index) => {
    var words = line2.words.join(breakAll ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ React.createElement("tspan", {
        x,
        dy: index === 0 ? startDy : lineHeight,
        key: "".concat(words, "-").concat(index)
      }, words)
    );
  }));
});
Text.displayName = "Text";
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$5(e, r, t) {
  return (r = _toPropertyKey$5(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getCartesianPosition = (options) => {
  var {
    viewBox,
    position,
    offset = 0,
    parentViewBox: parentViewBoxFromOptions
  } = options;
  var {
    x,
    y,
    height,
    upperWidth,
    lowerWidth
  } = cartesianViewBoxToTrapezoid(viewBox);
  var upperX = x;
  var lowerX = x + (upperWidth - lowerWidth) / 2;
  var middleX = (upperX + lowerX) / 2;
  var midHeightWidth = (upperWidth + lowerWidth) / 2;
  var centerX = upperX + upperWidth / 2;
  var verticalSign = height >= 0 ? 1 : -1;
  var verticalOffset = verticalSign * offset;
  var verticalEnd = verticalSign > 0 ? "end" : "start";
  var verticalStart = verticalSign > 0 ? "start" : "end";
  var horizontalSign = upperWidth >= 0 ? 1 : -1;
  var horizontalOffset = horizontalSign * offset;
  var horizontalEnd = horizontalSign > 0 ? "end" : "start";
  var horizontalStart = horizontalSign > 0 ? "start" : "end";
  var parentViewBox = parentViewBoxFromOptions;
  if (position === "top") {
    var result = {
      x: upperX + upperWidth / 2,
      y: y - verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalEnd
    };
    if (parentViewBox) {
      result.height = Math.max(y - parentViewBox.y, 0);
      result.width = upperWidth;
    }
    return result;
  }
  if (position === "bottom") {
    var _result = {
      x: lowerX + lowerWidth / 2,
      y: y + height + verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalStart
    };
    if (parentViewBox) {
      _result.height = Math.max(parentViewBox.y + parentViewBox.height - (y + height), 0);
      _result.width = lowerWidth;
    }
    return _result;
  }
  if (position === "left") {
    var _result2 = {
      x: middleX - horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: "middle"
    };
    if (parentViewBox) {
      _result2.width = Math.max(_result2.x - parentViewBox.x, 0);
      _result2.height = height;
    }
    return _result2;
  }
  if (position === "right") {
    var _result3 = {
      x: middleX + midHeightWidth + horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalStart,
      verticalAnchor: "middle"
    };
    if (parentViewBox) {
      _result3.width = Math.max(parentViewBox.x + parentViewBox.width - _result3.x, 0);
      _result3.height = height;
    }
    return _result3;
  }
  var sizeAttrs = parentViewBox ? {
    width: midHeightWidth,
    height
  } : {};
  if (position === "insideLeft") {
    return _objectSpread$5({
      x: middleX + horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalStart,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideRight") {
    return _objectSpread$5({
      x: middleX + midHeightWidth - horizontalOffset,
      y: y + height / 2,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideTop") {
    return _objectSpread$5({
      x: upperX + upperWidth / 2,
      y: y + verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottom") {
    return _objectSpread$5({
      x: lowerX + lowerWidth / 2,
      y: y + height - verticalOffset,
      horizontalAnchor: "middle",
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideTopLeft") {
    return _objectSpread$5({
      x: upperX + horizontalOffset,
      y: y + verticalOffset,
      horizontalAnchor: horizontalStart,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideTopRight") {
    return _objectSpread$5({
      x: upperX + upperWidth - horizontalOffset,
      y: y + verticalOffset,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottomLeft") {
    return _objectSpread$5({
      x: lowerX + horizontalOffset,
      y: y + height - verticalOffset,
      horizontalAnchor: horizontalStart,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideBottomRight") {
    return _objectSpread$5({
      x: lowerX + lowerWidth - horizontalOffset,
      y: y + height - verticalOffset,
      horizontalAnchor: horizontalEnd,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (!!position && typeof position === "object" && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) {
    return _objectSpread$5({
      x: x + getPercentValue(position.x, midHeightWidth),
      y: y + getPercentValue(position.y, height),
      horizontalAnchor: "end",
      verticalAnchor: "end"
    }, sizeAttrs);
  }
  return _objectSpread$5({
    x: centerX,
    y: y + height / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, sizeAttrs);
};
var _excluded$4 = ["labelRef"], _excluded2$1 = ["content"];
function _objectWithoutProperties$4(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$4(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$4(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(e, r, t) {
  return (r = _toPropertyKey$4(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _extends$4() {
  return _extends$4 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$4.apply(null, arguments);
}
var CartesianLabelContext = /* @__PURE__ */ createContext(null);
var CartesianLabelContextProvider = (_ref2) => {
  var {
    x,
    y,
    upperWidth,
    lowerWidth,
    width,
    height,
    children
  } = _ref2;
  var viewBox = useMemo(() => ({
    x,
    y,
    upperWidth,
    lowerWidth,
    width,
    height
  }), [x, y, upperWidth, lowerWidth, width, height]);
  return /* @__PURE__ */ React.createElement(CartesianLabelContext.Provider, {
    value: viewBox
  }, children);
};
var useCartesianLabelContext = () => {
  var labelChildContext = useContext(CartesianLabelContext);
  var chartContext = useViewBox();
  return labelChildContext || (chartContext ? cartesianViewBoxToTrapezoid(chartContext) : void 0);
};
var PolarLabelContext = /* @__PURE__ */ createContext(null);
var usePolarLabelContext = () => {
  var labelChildContext = useContext(PolarLabelContext);
  var chartContext = useAppSelector(selectPolarViewBox);
  return labelChildContext || chartContext;
};
var getLabel = (props) => {
  var {
    value,
    formatter
  } = props;
  var label = isNullish(props.children) ? value : props.children;
  if (typeof formatter === "function") {
    return formatter(label);
  }
  return label;
};
var isLabelContentAFunction = (content) => {
  return content != null && typeof content === "function";
};
var getDeltaAngle = (startAngle, endAngle) => {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
var renderRadialLabel = (labelProps, position, label, attrs, viewBox) => {
  var {
    offset,
    className
  } = labelProps;
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise
  } = viewBox;
  var radius = (innerRadius + outerRadius) / 2;
  var deltaAngle = getDeltaAngle(startAngle, endAngle);
  var sign = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;
  switch (position) {
    case "insideStart":
      labelAngle = startAngle + sign * offset;
      direction = clockWise;
      break;
    case "insideEnd":
      labelAngle = endAngle - sign * offset;
      direction = !clockWise;
      break;
    case "end":
      labelAngle = endAngle + sign * offset;
      direction = clockWise;
      break;
    default:
      throw new Error("Unsupported position ".concat(position));
  }
  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
  var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
  var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
  var id = isNullish(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
  return /* @__PURE__ */ React.createElement("text", _extends$4({}, attrs, {
    dominantBaseline: "central",
    className: clsx("recharts-radial-bar-label", className)
  }), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("path", {
    id,
    d: path
  })), /* @__PURE__ */ React.createElement("textPath", {
    xlinkHref: "#".concat(id)
  }, label));
};
var getAttrsOfPolarLabel = (viewBox, offset, position) => {
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  } = viewBox;
  var midAngle = (startAngle + endAngle) / 2;
  if (position === "outside") {
    var {
      x: _x,
      y: _y
    } = polarToCartesian(cx, cy, outerRadius + offset, midAngle);
    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (position === "center") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  }
  if (position === "centerTop") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  }
  if (position === "centerBottom") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  }
  var r = (innerRadius + outerRadius) / 2;
  var {
    x,
    y
  } = polarToCartesian(cx, cy, r, midAngle);
  return {
    x,
    y,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
};
var isPolar = (viewBox) => viewBox != null && "cx" in viewBox && isNumber(viewBox.cx);
var defaultLabelProps = {
  angle: 0,
  offset: 5,
  zIndex: DefaultZIndexes.label,
  position: "middle",
  textBreakAll: false
};
function polarViewBoxToTrapezoid(viewBox) {
  if (!isPolar(viewBox)) {
    return viewBox;
  }
  var {
    cx,
    cy,
    outerRadius
  } = viewBox;
  var diameter = outerRadius * 2;
  return {
    x: cx - outerRadius,
    y: cy - outerRadius,
    width: diameter,
    upperWidth: diameter,
    lowerWidth: diameter,
    height: diameter
  };
}
function Label(outerProps) {
  var props = resolveDefaultProps(outerProps, defaultLabelProps);
  var {
    viewBox: viewBoxFromProps,
    parentViewBox,
    position,
    value,
    children,
    content,
    className = "",
    textBreakAll,
    labelRef
  } = props;
  var polarViewBox = usePolarLabelContext();
  var cartesianViewBox = useCartesianLabelContext();
  var resolvedViewBox = position === "center" ? cartesianViewBox : polarViewBox !== null && polarViewBox !== void 0 ? polarViewBox : cartesianViewBox;
  var viewBox, label, positionAttrs;
  if (viewBoxFromProps == null) {
    viewBox = resolvedViewBox;
  } else if (isPolar(viewBoxFromProps)) {
    viewBox = viewBoxFromProps;
  } else {
    viewBox = cartesianViewBoxToTrapezoid(viewBoxFromProps);
  }
  var cartesianBox = polarViewBoxToTrapezoid(viewBox);
  if (!viewBox || isNullish(value) && isNullish(children) && !/* @__PURE__ */ isValidElement(content) && typeof content !== "function") {
    return null;
  }
  var propsWithViewBox = _objectSpread$4(_objectSpread$4({}, props), {}, {
    viewBox
  });
  if (/* @__PURE__ */ isValidElement(content)) {
    var {
      labelRef: _
    } = propsWithViewBox, propsWithoutLabelRef = _objectWithoutProperties$4(propsWithViewBox, _excluded$4);
    return /* @__PURE__ */ cloneElement(content, propsWithoutLabelRef);
  }
  if (typeof content === "function") {
    var {
      content: _2
    } = propsWithViewBox, propsForContent = _objectWithoutProperties$4(propsWithViewBox, _excluded2$1);
    label = /* @__PURE__ */ createElement(content, propsForContent);
    if (/* @__PURE__ */ isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  var attrs = svgPropertiesAndEvents(props);
  if (isPolar(viewBox)) {
    if (position === "insideStart" || position === "insideEnd" || position === "end") {
      return renderRadialLabel(props, position, label, attrs, viewBox);
    }
    positionAttrs = getAttrsOfPolarLabel(viewBox, props.offset, props.position);
  } else {
    if (!cartesianBox) {
      return null;
    }
    var cartesianResult = getCartesianPosition({
      viewBox: cartesianBox,
      position,
      offset: props.offset,
      parentViewBox: isPolar(parentViewBox) ? void 0 : parentViewBox
    });
    positionAttrs = _objectSpread$4(_objectSpread$4({
      x: cartesianResult.x,
      y: cartesianResult.y,
      textAnchor: cartesianResult.horizontalAnchor,
      verticalAnchor: cartesianResult.verticalAnchor
    }, cartesianResult.width !== void 0 ? {
      width: cartesianResult.width
    } : {}), cartesianResult.height !== void 0 ? {
      height: cartesianResult.height
    } : {});
  }
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ React.createElement(Text, _extends$4({
    ref: labelRef,
    className: clsx("recharts-label", className)
  }, attrs, positionAttrs, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: isValidTextAnchor(attrs.textAnchor) ? attrs.textAnchor : positionAttrs.textAnchor,
    breakAll: textBreakAll
  }), label));
}
Label.displayName = "Label";
var parseLabel = (label, viewBox, labelRef) => {
  if (!label) {
    return null;
  }
  var commonProps = {
    viewBox,
    labelRef
  };
  if (label === true) {
    return /* @__PURE__ */ React.createElement(Label, _extends$4({
      key: "label-implicit"
    }, commonProps));
  }
  if (isNumOrStr(label)) {
    return /* @__PURE__ */ React.createElement(Label, _extends$4({
      key: "label-implicit",
      value: label
    }, commonProps));
  }
  if (/* @__PURE__ */ isValidElement(label)) {
    if (label.type === Label) {
      return /* @__PURE__ */ cloneElement(label, _objectSpread$4({
        key: "label-implicit"
      }, commonProps));
    }
    return /* @__PURE__ */ React.createElement(Label, _extends$4({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (isLabelContentAFunction(label)) {
    return /* @__PURE__ */ React.createElement(Label, _extends$4({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (label && typeof label === "object") {
    return /* @__PURE__ */ React.createElement(Label, _extends$4({}, label, {
      key: "label-implicit"
    }, commonProps));
  }
  return null;
};
function CartesianLabelFromLabelProp(_ref3) {
  var {
    label,
    labelRef
  } = _ref3;
  var viewBox = useCartesianLabelContext();
  return parseLabel(label, viewBox, labelRef) || null;
}
var _excluded$3 = ["valueAccessor"], _excluded2 = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$3.apply(null, arguments);
}
function _objectWithoutProperties$3(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose$3(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$3(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
var defaultAccessor = (entry) => {
  var val = Array.isArray(entry.value) ? entry.value[entry.value.length - 1] : entry.value;
  if (isRenderableText(val)) {
    return val;
  }
  return void 0;
};
var CartesianLabelListContext = /* @__PURE__ */ createContext(void 0);
var CartesianLabelListContextProvider = CartesianLabelListContext.Provider;
var PolarLabelListContext = /* @__PURE__ */ createContext(void 0);
var PolarLabelListContextProvider = PolarLabelListContext.Provider;
function useCartesianLabelListContext() {
  return useContext(CartesianLabelListContext);
}
function usePolarLabelListContext() {
  return useContext(PolarLabelListContext);
}
function LabelList(_ref2) {
  var {
    valueAccessor = defaultAccessor
  } = _ref2, restProps = _objectWithoutProperties$3(_ref2, _excluded$3);
  var {
    dataKey,
    clockWise,
    id,
    textBreakAll,
    zIndex
  } = restProps, others = _objectWithoutProperties$3(restProps, _excluded2);
  var cartesianData = useCartesianLabelListContext();
  var polarData = usePolarLabelListContext();
  var data = cartesianData || polarData;
  if (!data || !data.length) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex: zIndex !== null && zIndex !== void 0 ? zIndex : DefaultZIndexes.label
  }, /* @__PURE__ */ React.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map((entry, index) => {
    var _restProps$fill;
    var value = isNullish(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry.payload, dataKey);
    var idProps = isNullish(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return /* @__PURE__ */ React.createElement(Label, _extends$3({
      key: "label-".concat(index)
    }, svgPropertiesAndEvents(entry), others, idProps, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (_restProps$fill = restProps.fill) !== null && _restProps$fill !== void 0 ? _restProps$fill : entry.fill,
      parentViewBox: entry.parentViewBox,
      value,
      textBreakAll,
      viewBox: entry.viewBox,
      index,
      zIndex: 0
    }));
  })));
}
LabelList.displayName = "LabelList";
function LabelListFromLabelProp(_ref2) {
  var {
    label
  } = _ref2;
  if (!label) {
    return null;
  }
  if (label === true) {
    return /* @__PURE__ */ React.createElement(LabelList, {
      key: "labelList-implicit"
    });
  }
  if (/* @__PURE__ */ React.isValidElement(label) || isLabelContentAFunction(label)) {
    return /* @__PURE__ */ React.createElement(LabelList, {
      key: "labelList-implicit",
      content: label
    });
  }
  if (typeof label === "object") {
    return /* @__PURE__ */ React.createElement(LabelList, _extends$3({
      key: "labelList-implicit"
    }, label, {
      type: String(label.type)
    }));
  }
  return null;
}
var initialState$8 = {
  radiusAxis: {},
  angleAxis: {}
};
var polarAxisSlice = createSlice({
  name: "polarAxis",
  initialState: initialState$8,
  reducers: {
    addRadiusAxis(state, action) {
      state.radiusAxis[action.payload.id] = castDraft(action.payload);
    },
    removeRadiusAxis(state, action) {
      delete state.radiusAxis[action.payload.id];
    },
    addAngleAxis(state, action) {
      state.angleAxis[action.payload.id] = castDraft(action.payload);
    },
    removeAngleAxis(state, action) {
      delete state.angleAxis[action.payload.id];
    }
  }
});
var {
  addRadiusAxis,
  removeRadiusAxis,
  addAngleAxis,
  removeAngleAxis
} = polarAxisSlice.actions;
var polarAxisReducer = polarAxisSlice.reducer;
function getClassNameFromUnknown(u) {
  if (u && typeof u === "object" && "className" in u && typeof u.className === "string") {
    return u.className;
  }
  return "";
}
var getDisplayName = (Comp) => {
  if (typeof Comp === "string") {
    return Comp;
  }
  if (!Comp) {
    return "";
  }
  return Comp.displayName || Comp.name || "Component";
};
var lastChildren = null;
var lastResult = null;
var toArray = (children) => {
  if (children === lastChildren && Array.isArray(lastResult)) {
    return lastResult;
  }
  var result = [];
  Children.forEach(children, (child) => {
    if (isNullish(child)) return;
    if (isFragment(child)) {
      result = result.concat(toArray(child.props.children));
    } else {
      result.push(child);
    }
  });
  lastResult = result;
  lastChildren = children;
  return result;
};
function findAllByType(children, type) {
  var result = [];
  var types = [];
  if (Array.isArray(type)) {
    types = type.map((t) => getDisplayName(t));
  } else {
    types = [getDisplayName(type)];
  }
  toArray(children).forEach((child) => {
    var childType = get(child, "type.displayName") || get(child, "type.name");
    if (childType && types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });
  return result;
}
var isClipDot = (dot) => {
  if (dot && typeof dot === "object" && "clipDot" in dot) {
    return Boolean(dot.clipDot);
  }
  return true;
};
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
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
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var getTrapezoidPath = (x, y, upperWidth, lowerWidth, height) => {
  var widthGap = upperWidth - lowerWidth;
  var path;
  path = roundTemplateLiteral(_templateObject || (_templateObject = _taggedTemplateLiteral(["M ", ",", ""])), x, y);
  path += roundTemplateLiteral(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["L ", ",", ""])), x + upperWidth, y);
  path += roundTemplateLiteral(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["L ", ",", ""])), x + upperWidth - widthGap / 2, y + height);
  path += roundTemplateLiteral(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["L ", ",", ""])), x + upperWidth - widthGap / 2 - lowerWidth, y + height);
  path += roundTemplateLiteral(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["L ", ",", " Z"])), x, y);
  return path;
};
var defaultTrapezoidProps = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
};
var Trapezoid = (outsideProps) => {
  var trapezoidProps = resolveDefaultProps(outsideProps, defaultTrapezoidProps);
  var {
    x,
    y,
    upperWidth,
    lowerWidth,
    height,
    className
  } = trapezoidProps;
  var {
    animationEasing,
    animationDuration,
    animationBegin,
    isUpdateAnimationActive
  } = trapezoidProps;
  var pathRef = useRef(null);
  var [totalLength, setTotalLength] = useState(-1);
  var prevUpperWidthRef = useRef(upperWidth);
  var prevLowerWidthRef = useRef(lowerWidth);
  var prevHeightRef = useRef(height);
  var prevXRef = useRef(x);
  var prevYRef = useRef(y);
  var animationId = useAnimationId(outsideProps, "trapezoid-");
  useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (_unused) {
      }
    }
  }, []);
  if (x !== +x || y !== +y || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx("recharts-trapezoid", className);
  if (!isUpdateAnimationActive) {
    return /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("path", _extends$2({}, svgPropertiesAndEvents(trapezoidProps), {
      className: layerClass,
      d: getTrapezoidPath(x, y, upperWidth, lowerWidth, height)
    })));
  }
  var prevUpperWidth = prevUpperWidthRef.current;
  var prevLowerWidth = prevLowerWidthRef.current;
  var prevHeight = prevHeightRef.current;
  var prevX = prevXRef.current;
  var prevY = prevYRef.current;
  var from2 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
  var to2 = "".concat(totalLength, "px ").concat(totalLength, "px");
  var transition = getTransitionVal(["strokeDasharray"], animationDuration, animationEasing);
  return /* @__PURE__ */ React.createElement(JavascriptAnimate, {
    animationId,
    key: animationId,
    canBegin: totalLength > 0,
    duration: animationDuration,
    easing: animationEasing,
    isActive: isUpdateAnimationActive,
    begin: animationBegin
  }, (t) => {
    var currUpperWidth = interpolate(prevUpperWidth, upperWidth, t);
    var currLowerWidth = interpolate(prevLowerWidth, lowerWidth, t);
    var currHeight = interpolate(prevHeight, height, t);
    var currX = interpolate(prevX, x, t);
    var currY = interpolate(prevY, y, t);
    if (pathRef.current) {
      prevUpperWidthRef.current = currUpperWidth;
      prevLowerWidthRef.current = currLowerWidth;
      prevHeightRef.current = currHeight;
      prevXRef.current = currX;
      prevYRef.current = currY;
    }
    var animationStyle = t > 0 ? {
      transition,
      strokeDasharray: to2
    } : {
      strokeDasharray: from2
    };
    return /* @__PURE__ */ React.createElement("path", _extends$2({}, svgPropertiesAndEvents(trapezoidProps), {
      className: layerClass,
      d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
      ref: pathRef,
      style: _objectSpread$3(_objectSpread$3({}, animationStyle), trapezoidProps.style)
    }));
  });
};
var _excluded$2 = ["option", "shapeType", "activeClassName", "inActiveClassName"];
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
function defaultPropTransformer(option, props) {
  return _objectSpread$2(_objectSpread$2({}, props), option);
}
function isSymbolsProps(shapeType, _elementProps) {
  return shapeType === "symbols";
}
function ShapeSelector(_ref2) {
  var {
    shapeType,
    elementProps
  } = _ref2;
  switch (shapeType) {
    case "rectangle":
      return /* @__PURE__ */ React.createElement(Rectangle, elementProps);
    case "trapezoid":
      return /* @__PURE__ */ React.createElement(Trapezoid, elementProps);
    case "sector":
      return /* @__PURE__ */ React.createElement(Sector, elementProps);
    case "symbols":
      if (isSymbolsProps(shapeType)) {
        return /* @__PURE__ */ React.createElement(Symbols, elementProps);
      }
      break;
    case "curve":
      return /* @__PURE__ */ React.createElement(Curve, elementProps);
    default:
      return null;
  }
}
function getPropsFromShapeOption(option) {
  if (/* @__PURE__ */ isValidElement(option)) {
    return option.props;
  }
  return option;
}
function Shape(_ref2) {
  var {
    option,
    shapeType,
    activeClassName = "recharts-active-shape",
    inActiveClassName = "recharts-shape"
  } = _ref2, props = _objectWithoutProperties$2(_ref2, _excluded$2);
  var shape;
  if (/* @__PURE__ */ isValidElement(option)) {
    shape = /* @__PURE__ */ cloneElement(option, _objectSpread$2(_objectSpread$2({}, props), getPropsFromShapeOption(option)));
  } else if (typeof option === "function") {
    shape = option(props, props.index);
  } else if (isPlainObject(option) && typeof option !== "boolean") {
    var nextProps = defaultPropTransformer(option, props);
    shape = /* @__PURE__ */ React.createElement(ShapeSelector, {
      shapeType,
      elementProps: nextProps
    });
  } else {
    var elementProps = props;
    shape = /* @__PURE__ */ React.createElement(ShapeSelector, {
      shapeType,
      elementProps
    });
  }
  if (props.isActive) {
    return /* @__PURE__ */ React.createElement(Layer, {
      className: activeClassName
    }, shape);
  }
  return /* @__PURE__ */ React.createElement(Layer, {
    className: inActiveClassName
  }, shape);
}
var useMouseEnterItemDispatch = (onMouseEnterFromProps, dataKey, graphicalItemId) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseEnterFromProps === null || onMouseEnterFromProps === void 0 || onMouseEnterFromProps(data, index, event);
    dispatch(setActiveMouseOverItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition,
      activeGraphicalItemId: graphicalItemId
    }));
  };
};
var useMouseLeaveItemDispatch = (onMouseLeaveFromProps) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseLeaveFromProps === null || onMouseLeaveFromProps === void 0 || onMouseLeaveFromProps(data, index, event);
    dispatch(mouseLeaveItem());
  };
};
var useMouseClickItemDispatch = (onMouseClickFromProps, dataKey, graphicalItemId) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseClickFromProps === null || onMouseClickFromProps === void 0 || onMouseClickFromProps(data, index, event);
    dispatch(setActiveClickItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition,
      activeGraphicalItemId: graphicalItemId
    }));
  };
};
function SetTooltipEntrySettings(_ref2) {
  var {
    tooltipEntrySettings
  } = _ref2;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var prevSettingsRef = useRef(null);
  useLayoutEffect(() => {
    if (isPanorama) {
      return;
    }
    if (prevSettingsRef.current === null) {
      dispatch(addTooltipEntrySettings(tooltipEntrySettings));
    } else if (prevSettingsRef.current !== tooltipEntrySettings) {
      dispatch(replaceTooltipEntrySettings({
        prev: prevSettingsRef.current,
        next: tooltipEntrySettings
      }));
    }
    prevSettingsRef.current = tooltipEntrySettings;
  }, [tooltipEntrySettings, dispatch, isPanorama]);
  useLayoutEffect(() => {
    return () => {
      if (prevSettingsRef.current) {
        dispatch(removeTooltipEntrySettings(prevSettingsRef.current));
        prevSettingsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function SetLegendPayload(_ref2) {
  var {
    legendPayload
  } = _ref2;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  var prevPayloadRef = useRef(null);
  useLayoutEffect(() => {
    if (isPanorama) {
      return;
    }
    if (prevPayloadRef.current === null) {
      dispatch(addLegendPayload(legendPayload));
    } else if (prevPayloadRef.current !== legendPayload) {
      dispatch(replaceLegendPayload({
        prev: prevPayloadRef.current,
        next: legendPayload
      }));
    }
    prevPayloadRef.current = legendPayload;
  }, [dispatch, isPanorama, legendPayload]);
  useLayoutEffect(() => {
    return () => {
      if (prevPayloadRef.current) {
        dispatch(removeLegendPayload(prevPayloadRef.current));
        prevPayloadRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function SetPolarLegendPayload(_ref2) {
  var {
    legendPayload
  } = _ref2;
  var dispatch = useAppDispatch();
  var layout = useAppSelector(selectChartLayout);
  var prevPayloadRef = useRef(null);
  useLayoutEffect(() => {
    if (layout !== "centric" && layout !== "radial") {
      return;
    }
    if (prevPayloadRef.current === null) {
      dispatch(addLegendPayload(legendPayload));
    } else if (prevPayloadRef.current !== legendPayload) {
      dispatch(replaceLegendPayload({
        prev: prevPayloadRef.current,
        next: legendPayload
      }));
    }
    prevPayloadRef.current = legendPayload;
  }, [dispatch, layout, legendPayload]);
  useLayoutEffect(() => {
    return () => {
      if (prevPayloadRef.current) {
        dispatch(removeLegendPayload(prevPayloadRef.current));
        prevPayloadRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
var _ref;
var useIdFallback = () => {
  var [id] = React.useState(() => uniqueId("uid-"));
  return id;
};
var useId = (_ref = React["useId".toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
function useUniqueId(prefix, customId) {
  var generatedId = useId();
  if (customId) {
    return customId;
  }
  return prefix ? "".concat(prefix, "-").concat(generatedId) : generatedId;
}
var GraphicalItemIdContext = /* @__PURE__ */ createContext(void 0);
var RegisterGraphicalItemId = (_ref2) => {
  var {
    id,
    type,
    children
  } = _ref2;
  var resolvedId = useUniqueId("recharts-".concat(type), id);
  return /* @__PURE__ */ React.createElement(GraphicalItemIdContext.Provider, {
    value: resolvedId
  }, children(resolvedId));
};
var initialState$7 = {
  cartesianItems: [],
  polarItems: []
};
var graphicalItemsSlice = createSlice({
  name: "graphicalItems",
  initialState: initialState$7,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(state, action) {
        state.cartesianItems.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    replaceCartesianGraphicalItem: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        var index = current(state).cartesianItems.indexOf(castDraft(prev));
        if (index > -1) {
          state.cartesianItems[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeCartesianGraphicalItem: {
      reducer(state, action) {
        var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.cartesianItems.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    addPolarGraphicalItem: {
      reducer(state, action) {
        state.polarItems.push(castDraft(action.payload));
      },
      prepare: prepareAutoBatched()
    },
    removePolarGraphicalItem: {
      reducer(state, action) {
        var index = current(state).polarItems.indexOf(castDraft(action.payload));
        if (index > -1) {
          state.polarItems.splice(index, 1);
        }
      },
      prepare: prepareAutoBatched()
    },
    replacePolarGraphicalItem: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        var index = current(state).polarItems.indexOf(castDraft(prev));
        if (index > -1) {
          state.polarItems[index] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    }
  }
});
var {
  addCartesianGraphicalItem,
  replaceCartesianGraphicalItem,
  removeCartesianGraphicalItem,
  addPolarGraphicalItem,
  removePolarGraphicalItem,
  replacePolarGraphicalItem
} = graphicalItemsSlice.actions;
var graphicalItemsReducer = graphicalItemsSlice.reducer;
var SetCartesianGraphicalItemImpl = (props) => {
  var dispatch = useAppDispatch();
  var prevPropsRef = useRef(null);
  useLayoutEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addCartesianGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replaceCartesianGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  useLayoutEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removeCartesianGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
};
var SetCartesianGraphicalItem = /* @__PURE__ */ memo(SetCartesianGraphicalItemImpl);
var SetPolarGraphicalItemImpl = (props) => {
  var dispatch = useAppDispatch();
  var prevPropsRef = useRef(null);
  useLayoutEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addPolarGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replacePolarGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  useLayoutEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removePolarGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
};
var SetPolarGraphicalItem = /* @__PURE__ */ memo(SetPolarGraphicalItemImpl);
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
var defaultAxisId = 0;
var initialState$6 = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
};
var cartesianAxisSlice = createSlice({
  name: "cartesianAxis",
  initialState: initialState$6,
  reducers: {
    addXAxis: {
      reducer(state, action) {
        state.xAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceXAxis: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        if (state.xAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.xAxis[prev.id];
          }
          state.xAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeXAxis: {
      reducer(state, action) {
        delete state.xAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    addYAxis: {
      reducer(state, action) {
        state.yAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceYAxis: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        if (state.yAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.yAxis[prev.id];
          }
          state.yAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeYAxis: {
      reducer(state, action) {
        delete state.yAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    addZAxis: {
      reducer(state, action) {
        state.zAxis[action.payload.id] = castDraft(action.payload);
      },
      prepare: prepareAutoBatched()
    },
    replaceZAxis: {
      reducer(state, action) {
        var {
          prev,
          next
        } = action.payload;
        if (state.zAxis[prev.id] !== void 0) {
          if (prev.id !== next.id) {
            delete state.zAxis[prev.id];
          }
          state.zAxis[next.id] = castDraft(next);
        }
      },
      prepare: prepareAutoBatched()
    },
    removeZAxis: {
      reducer(state, action) {
        delete state.zAxis[action.payload.id];
      },
      prepare: prepareAutoBatched()
    },
    updateYAxisWidth(state, action) {
      var {
        id,
        width
      } = action.payload;
      var axis = state.yAxis[id];
      if (axis) {
        var _history$;
        var history = axis.widthHistory || [];
        if (history.length === 3 && history[0] === history[2] && width === history[1] && width !== axis.width && Math.abs(width - ((_history$ = history[0]) !== null && _history$ !== void 0 ? _history$ : 0)) <= 1) {
          return;
        }
        var newHistory = [...history, width].slice(-3);
        state.yAxis[id] = _objectSpread$1(_objectSpread$1({}, axis), {}, {
          width,
          widthHistory: newHistory
        });
      }
    }
  }
});
var {
  addXAxis,
  replaceXAxis,
  removeXAxis,
  addYAxis,
  replaceYAxis,
  removeYAxis,
  addZAxis,
  replaceZAxis,
  removeZAxis,
  updateYAxisWidth
} = cartesianAxisSlice.actions;
var cartesianAxisReducer = cartesianAxisSlice.reducer;
var selectChartOffset = createSelector([selectChartOffsetInternal], (offsetInternal) => {
  return {
    top: offsetInternal.top,
    bottom: offsetInternal.bottom,
    left: offsetInternal.left,
    right: offsetInternal.right
  };
});
var selectPlotArea = createSelector([selectChartOffset, selectChartWidth, selectChartHeight], (offset, chartWidth, chartHeight) => {
  if (!offset || chartWidth == null || chartHeight == null) {
    return void 0;
  }
  return {
    x: offset.left,
    y: offset.top,
    width: Math.max(0, chartWidth - offset.left - offset.right),
    height: Math.max(0, chartHeight - offset.top - offset.bottom)
  };
});
var usePlotArea = () => {
  return useAppSelector(selectPlotArea);
};
var useActiveTooltipDataPoints = () => {
  return useAppSelector(selectActiveTooltipDataPoints);
};
var ChartDataContextProvider = (props) => {
  var {
    chartData
  } = props;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  useEffect(() => {
    if (isPanorama) {
      return () => {
      };
    }
    dispatch(setChartData(chartData));
    return () => {
      dispatch(setChartData(void 0));
    };
  }, [chartData, dispatch, isPanorama]);
  return null;
};
var initialState$5 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};
var brushSlice = createSlice({
  name: "brush",
  initialState: initialState$5,
  reducers: {
    setBrushSettings(_state, action) {
      if (action.payload == null) {
        return initialState$5;
      }
      return action.payload;
    }
  }
});
var {
  setBrushSettings
} = brushSlice.actions;
var brushReducer = brushSlice.reducer;
var initialState$4 = {
  dots: [],
  areas: [],
  lines: []
};
var referenceElementsSlice = createSlice({
  name: "referenceElements",
  initialState: initialState$4,
  reducers: {
    addDot: (state, action) => {
      state.dots.push(action.payload);
    },
    removeDot: (state, action) => {
      var index = current(state).dots.findIndex((dot) => dot === action.payload);
      if (index !== -1) {
        state.dots.splice(index, 1);
      }
    },
    addArea: (state, action) => {
      state.areas.push(action.payload);
    },
    removeArea: (state, action) => {
      var index = current(state).areas.findIndex((area2) => area2 === action.payload);
      if (index !== -1) {
        state.areas.splice(index, 1);
      }
    },
    addLine: (state, action) => {
      state.lines.push(castDraft(action.payload));
    },
    removeLine: (state, action) => {
      var index = current(state).lines.findIndex((line2) => line2 === action.payload);
      if (index !== -1) {
        state.lines.splice(index, 1);
      }
    }
  }
});
var {
  addDot,
  removeDot,
  addArea,
  removeArea,
  addLine,
  removeLine
} = referenceElementsSlice.actions;
var referenceElementsReducer = referenceElementsSlice.reducer;
var ClipPathIdContext = /* @__PURE__ */ createContext(void 0);
var ClipPathProvider = (_ref2) => {
  var {
    children
  } = _ref2;
  var [clipPathId] = useState("".concat(uniqueId("recharts"), "-clip"));
  var plotArea = usePlotArea();
  if (plotArea == null) {
    return null;
  }
  var {
    x,
    y,
    width,
    height
  } = plotArea;
  return /* @__PURE__ */ React.createElement(ClipPathIdContext.Provider, {
    value: clipPathId
  }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
    id: clipPathId
  }, /* @__PURE__ */ React.createElement("rect", {
    x,
    y,
    height,
    width
  }))), children);
};
var initialState$3 = {
  xAxis: {},
  yAxis: {}
};
var renderedTicksSlice = createSlice({
  name: "renderedTicks",
  initialState: initialState$3,
  reducers: {
    setRenderedTicks: (state, action) => {
      var {
        axisType,
        axisId,
        ticks
      } = action.payload;
      state[axisType][axisId] = castDraft(ticks);
    },
    removeRenderedTicks: (state, action) => {
      var {
        axisType,
        axisId
      } = action.payload;
      delete state[axisType][axisId];
    }
  }
});
var {
  setRenderedTicks,
  removeRenderedTicks
} = renderedTicksSlice.actions;
var renderedTicksReducer = renderedTicksSlice.reducer;
var initialState$2 = {};
var errorBarSlice = createSlice({
  name: "errorBars",
  initialState: initialState$2,
  reducers: {
    addErrorBar: (state, action) => {
      var {
        itemId,
        errorBar
      } = action.payload;
      if (!state[itemId]) {
        state[itemId] = [];
      }
      state[itemId].push(errorBar);
    },
    replaceErrorBar: (state, action) => {
      var {
        itemId,
        prev,
        next
      } = action.payload;
      if (state[itemId]) {
        state[itemId] = state[itemId].map((e) => e.dataKey === prev.dataKey && e.direction === prev.direction ? next : e);
      }
    },
    removeErrorBar: (state, action) => {
      var {
        itemId,
        errorBar
      } = action.payload;
      if (state[itemId]) {
        state[itemId] = state[itemId].filter((e) => e.dataKey !== errorBar.dataKey || e.direction !== errorBar.direction);
      }
    }
  }
});
var {
  addErrorBar,
  replaceErrorBar,
  removeErrorBar
} = errorBarSlice.actions;
var errorBarReducer = errorBarSlice.reducer;
var pickChartPointer = (_state, chartPointer) => chartPointer;
var selectActivePropsFromChartPointer = createSelector([pickChartPointer, selectChartLayout, selectPolarViewBox, selectTooltipAxisType, selectTooltipAxisRangeWithReverse, selectTooltipAxisTicks, selectOrderedTooltipTicks, selectChartOffsetInternal], combineActiveProps);
function isSvgPointer(pointer) {
  return "getBBox" in pointer.currentTarget && typeof pointer.currentTarget.getBBox === "function";
}
function getRelativeCoordinate(event) {
  var rect = event.currentTarget.getBoundingClientRect();
  var scaleX, scaleY;
  if (isSvgPointer(event)) {
    var bbox = event.currentTarget.getBBox();
    scaleX = bbox.width > 0 ? rect.width / bbox.width : 1;
    scaleY = bbox.height > 0 ? rect.height / bbox.height : 1;
  } else {
    var element = event.currentTarget;
    scaleX = element.offsetWidth > 0 ? rect.width / element.offsetWidth : 1;
    scaleY = element.offsetHeight > 0 ? rect.height / element.offsetHeight : 1;
  }
  var getCoordinates = (clientX, clientY) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((clientX - rect.left) / scaleX),
    relativeY: Math.round((clientY - rect.top) / scaleY)
  });
  if ("touches" in event) {
    return Array.from(event.touches).map((touch) => getCoordinates(touch.clientX, touch.clientY));
  }
  return getCoordinates(event.clientX, event.clientY);
}
var mouseClickAction = createAction("mouseClick");
var mouseClickMiddleware = createListenerMiddleware();
mouseClickMiddleware.startListening({
  actionCreator: mouseClickAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var activeProps = selectActivePropsFromChartPointer(listenerApi.getState(), getRelativeCoordinate(mousePointer));
    if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
      listenerApi.dispatch(setMouseClickAxisIndex({
        activeIndex: activeProps.activeIndex,
        activeDataKey: void 0,
        activeCoordinate: activeProps.activeCoordinate
      }));
    }
  }
});
var mouseMoveAction = createAction("mouseMove");
var mouseMoveMiddleware = createListenerMiddleware();
var rafId$2 = null;
var timeoutId$2 = null;
var latestChartPointer = null;
mouseMoveMiddleware.startListening({
  actionCreator: mouseMoveAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var state = listenerApi.getState();
    var {
      throttleDelay,
      throttledEvents
    } = state.eventSettings;
    var isThrottled = throttledEvents === "all" || (throttledEvents === null || throttledEvents === void 0 ? void 0 : throttledEvents.includes("mousemove"));
    if (rafId$2 !== null) {
      cancelAnimationFrame(rafId$2);
      rafId$2 = null;
    }
    if (timeoutId$2 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId$2);
      timeoutId$2 = null;
    }
    latestChartPointer = getRelativeCoordinate(mousePointer);
    var callback = () => {
      var currentState = listenerApi.getState();
      var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
      if (!latestChartPointer) {
        rafId$2 = null;
        timeoutId$2 = null;
        return;
      }
      if (tooltipEventType === "axis") {
        var activeProps = selectActivePropsFromChartPointer(currentState, latestChartPointer);
        if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
          listenerApi.dispatch(setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: void 0,
            activeCoordinate: activeProps.activeCoordinate
          }));
        } else {
          listenerApi.dispatch(mouseLeaveChart());
        }
      }
      rafId$2 = null;
      timeoutId$2 = null;
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId$2 = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId$2 === null) {
        timeoutId$2 = setTimeout(callback, throttleDelay);
      }
    }
  }
});
function reduxDevtoolsJsonStringifyReplacer(key, value) {
  if (value instanceof HTMLElement) {
    return "HTMLElement <".concat(value.tagName, ' class="').concat(value.className, '">');
  }
  if (value === window) {
    return "global.window";
  }
  if (key === "children" && typeof value === "object" && value !== null) {
    return "<<CHILDREN>>";
  }
  return value;
}
var initialState$1 = {
  accessibilityLayer: true,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: false
};
var rootPropsSlice = createSlice({
  name: "rootProps",
  initialState: initialState$1,
  reducers: {
    updateOptions: (state, action) => {
      var _action$payload$barGa;
      state.accessibilityLayer = action.payload.accessibilityLayer;
      state.barCategoryGap = action.payload.barCategoryGap;
      state.barGap = (_action$payload$barGa = action.payload.barGap) !== null && _action$payload$barGa !== void 0 ? _action$payload$barGa : initialState$1.barGap;
      state.barSize = action.payload.barSize;
      state.maxBarSize = action.payload.maxBarSize;
      state.stackOffset = action.payload.stackOffset;
      state.syncId = action.payload.syncId;
      state.syncMethod = action.payload.syncMethod;
      state.className = action.payload.className;
      state.baseValue = action.payload.baseValue;
      state.reverseStackOrder = action.payload.reverseStackOrder;
    }
  }
});
var rootPropsReducer = rootPropsSlice.reducer;
var {
  updateOptions
} = rootPropsSlice.actions;
var initialState = null;
var reducers = {
  updatePolarOptions: (state, action) => {
    if (state === null) {
      return action.payload;
    }
    state.startAngle = action.payload.startAngle;
    state.endAngle = action.payload.endAngle;
    state.cx = action.payload.cx;
    state.cy = action.payload.cy;
    state.innerRadius = action.payload.innerRadius;
    state.outerRadius = action.payload.outerRadius;
    return state;
  }
};
var polarOptionsSlice = createSlice({
  name: "polarOptions",
  initialState,
  reducers
});
var {
  updatePolarOptions
} = polarOptionsSlice.actions;
var polarOptionsReducer = polarOptionsSlice.reducer;
var keyDownAction = createAction("keyDown");
var focusAction = createAction("focus");
var blurAction = createAction("blur");
var keyboardEventsMiddleware = createListenerMiddleware();
var rafId$1 = null;
var timeoutId$1 = null;
var latestKeyboardActionPayload = null;
keyboardEventsMiddleware.startListening({
  actionCreator: keyDownAction,
  effect: (action, listenerApi) => {
    latestKeyboardActionPayload = action.payload;
    if (rafId$1 !== null) {
      cancelAnimationFrame(rafId$1);
      rafId$1 = null;
    }
    var state = listenerApi.getState();
    var {
      throttleDelay,
      throttledEvents
    } = state.eventSettings;
    var isThrottled = throttledEvents === "all" || throttledEvents.includes("keydown");
    if (timeoutId$1 !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId$1);
      timeoutId$1 = null;
    }
    var callback = () => {
      try {
        var currentState = listenerApi.getState();
        var accessibilityLayerIsActive = currentState.rootProps.accessibilityLayer !== false;
        if (!accessibilityLayerIsActive) {
          return;
        }
        var {
          keyboardInteraction
        } = currentState.tooltip;
        var key = latestKeyboardActionPayload;
        if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Enter") {
          return;
        }
        var resolvedIndex = combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(currentState), selectTooltipAxisDataKey(currentState), selectTooltipAxisDomain(currentState));
        var currentIndex = resolvedIndex == null ? -1 : Number(resolvedIndex);
        var isOutsideDomain = !Number.isFinite(currentIndex) || currentIndex < 0;
        var tooltipTicks = selectTooltipAxisTicks(currentState);
        var displayedData = selectTooltipDisplayedData(currentState);
        var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
        if (key === "Enter") {
          if (isOutsideDomain) {
            return;
          }
          var _coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(keyboardInteraction.index));
          listenerApi.dispatch(setKeyboardInteraction({
            active: !keyboardInteraction.active,
            activeIndex: keyboardInteraction.index,
            activeCoordinate: _coordinate
          }));
          return;
        }
        var direction = selectChartDirection(currentState);
        var directionMultiplier = direction === "left-to-right" ? 1 : -1;
        var movement = key === "ArrowRight" ? 1 : -1;
        var nextIndex;
        if (isOutsideDomain) {
          var axisDataKey = selectTooltipAxisDataKey(currentState);
          var domain = selectTooltipAxisDomain(currentState);
          var effectiveMovement = movement * directionMultiplier;
          var mkInteraction = (i2) => ({
            active: false,
            index: String(i2),
            dataKey: void 0,
            graphicalItemId: void 0,
            coordinate: void 0
          });
          nextIndex = -1;
          if (effectiveMovement > 0) {
            for (var i = 0; i < displayedData.length; i++) {
              if (combineActiveTooltipIndex(mkInteraction(i), displayedData, axisDataKey, domain) != null) {
                nextIndex = i;
                break;
              }
            }
          } else {
            for (var _i = displayedData.length - 1; _i >= 0; _i--) {
              if (combineActiveTooltipIndex(mkInteraction(_i), displayedData, axisDataKey, domain) != null) {
                nextIndex = _i;
                break;
              }
            }
          }
          if (nextIndex < 0) {
            return;
          }
        } else {
          nextIndex = currentIndex + movement * directionMultiplier;
          var dataLength = (tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks.length) || displayedData.length;
          if (dataLength === 0 || nextIndex >= dataLength || nextIndex < 0) {
            return;
          }
        }
        var coordinate = selectCoordinateForDefaultIndex(currentState, tooltipEventType, "hover", String(nextIndex));
        listenerApi.dispatch(setKeyboardInteraction({
          active: true,
          activeIndex: nextIndex.toString(),
          activeCoordinate: coordinate
        }));
      } finally {
        rafId$1 = null;
        timeoutId$1 = null;
      }
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId$1 = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId$1 === null) {
        callback();
        latestKeyboardActionPayload = null;
        timeoutId$1 = setTimeout(() => {
          if (latestKeyboardActionPayload) {
            callback();
          } else {
            timeoutId$1 = null;
            rafId$1 = null;
          }
        }, throttleDelay);
      }
    }
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: focusAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var {
      keyboardInteraction
    } = state.tooltip;
    if (keyboardInteraction.active) {
      return;
    }
    if (keyboardInteraction.index == null) {
      var nextIndex = "0";
      var tooltipEventType = selectTooltipEventType$1(state, state.tooltip.settings.shared);
      var coordinate = selectCoordinateForDefaultIndex(state, tooltipEventType, "hover", String(nextIndex));
      listenerApi.dispatch(setKeyboardInteraction({
        active: true,
        activeIndex: nextIndex,
        activeCoordinate: coordinate
      }));
    }
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: blurAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var {
      keyboardInteraction
    } = state.tooltip;
    if (keyboardInteraction.active) {
      listenerApi.dispatch(setKeyboardInteraction({
        active: false,
        activeIndex: keyboardInteraction.index,
        activeCoordinate: keyboardInteraction.coordinate
      }));
    }
  }
});
function createEventProxy(reactEvent) {
  reactEvent.persist();
  var {
    currentTarget
  } = reactEvent;
  return new Proxy(reactEvent, {
    get: (target, prop) => {
      if (prop === "currentTarget") {
        return currentTarget;
      }
      var value = Reflect.get(target, prop);
      if (typeof value === "function") {
        return value.bind(target);
      }
      return value;
    }
  });
}
var externalEventAction = createAction("externalEvent");
var externalEventsMiddleware = createListenerMiddleware();
var rafIdMap = /* @__PURE__ */ new Map();
var timeoutIdMap = /* @__PURE__ */ new Map();
var latestEventMap = /* @__PURE__ */ new Map();
externalEventsMiddleware.startListening({
  actionCreator: externalEventAction,
  effect: (action, listenerApi) => {
    var {
      handler,
      reactEvent
    } = action.payload;
    if (handler == null) {
      return;
    }
    var eventType = reactEvent.type;
    var eventProxy = createEventProxy(reactEvent);
    latestEventMap.set(eventType, {
      handler,
      reactEvent: eventProxy
    });
    var existingRafId = rafIdMap.get(eventType);
    if (existingRafId !== void 0) {
      cancelAnimationFrame(existingRafId);
      rafIdMap.delete(eventType);
    }
    var state = listenerApi.getState();
    var {
      throttleDelay,
      throttledEvents
    } = state.eventSettings;
    var eventListAsString = throttledEvents;
    var isThrottled = eventListAsString === "all" || (eventListAsString === null || eventListAsString === void 0 ? void 0 : eventListAsString.includes(eventType));
    var existingTimeoutId = timeoutIdMap.get(eventType);
    if (existingTimeoutId !== void 0 && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(existingTimeoutId);
      timeoutIdMap.delete(eventType);
    }
    var callback = () => {
      var latestAction = latestEventMap.get(eventType);
      try {
        if (!latestAction) {
          return;
        }
        var {
          handler: latestHandler,
          reactEvent: latestEvent
        } = latestAction;
        var currentState = listenerApi.getState();
        var nextState = {
          activeCoordinate: selectActiveTooltipCoordinate(currentState),
          activeDataKey: selectActiveTooltipDataKey(currentState),
          activeIndex: selectActiveTooltipIndex(currentState),
          activeLabel: selectActiveLabel$1(currentState),
          activeTooltipIndex: selectActiveTooltipIndex(currentState),
          isTooltipActive: selectIsTooltipActive$1(currentState)
        };
        if (latestHandler) {
          latestHandler(nextState, latestEvent);
        }
      } finally {
        rafIdMap.delete(eventType);
        timeoutIdMap.delete(eventType);
        latestEventMap.delete(eventType);
      }
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      var rafId2 = requestAnimationFrame(callback);
      rafIdMap.set(eventType, rafId2);
    } else if (typeof throttleDelay === "number") {
      if (!timeoutIdMap.has(eventType)) {
        callback();
        var timeoutId2 = setTimeout(callback, throttleDelay);
        timeoutIdMap.set(eventType, timeoutId2);
      }
    } else {
      callback();
    }
  }
});
var selectAllTooltipPayloadConfiguration = createSelector([selectTooltipState], (tooltipState) => tooltipState.tooltipItemPayloads);
var selectTooltipCoordinate = createSelector([selectAllTooltipPayloadConfiguration, (_state, tooltipIndex) => tooltipIndex, (_state, _tooltipIndex, graphicalItemId) => graphicalItemId], (allTooltipConfigurations, tooltipIndex, graphicalItemId) => {
  if (tooltipIndex == null) {
    return void 0;
  }
  var mostRelevantTooltipConfiguration = allTooltipConfigurations.find((tooltipConfiguration) => {
    return tooltipConfiguration.settings.graphicalItemId === graphicalItemId;
  });
  if (mostRelevantTooltipConfiguration == null) {
    return void 0;
  }
  var {
    getPosition
  } = mostRelevantTooltipConfiguration;
  if (getPosition == null) {
    return void 0;
  }
  return getPosition(tooltipIndex);
});
var touchEventAction = createAction("touchMove");
var touchEventMiddleware = createListenerMiddleware();
var rafId = null;
var timeoutId = null;
var latestChartPointers = null;
var latestTouchEvent = null;
touchEventMiddleware.startListening({
  actionCreator: touchEventAction,
  effect: (action, listenerApi) => {
    var touchEvent = action.payload;
    if (touchEvent.touches == null || touchEvent.touches.length === 0) {
      return;
    }
    latestTouchEvent = createEventProxy(touchEvent);
    var state = listenerApi.getState();
    var {
      throttleDelay,
      throttledEvents
    } = state.eventSettings;
    var isThrottled = throttledEvents === "all" || throttledEvents.includes("touchmove");
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    if (timeoutId !== null && (typeof throttleDelay !== "number" || !isThrottled)) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    latestChartPointers = Array.from(touchEvent.touches).map((touch) => getRelativeCoordinate({
      clientX: touch.clientX,
      clientY: touch.clientY,
      currentTarget: touchEvent.currentTarget
    }));
    var callback = () => {
      if (latestTouchEvent == null) {
        return;
      }
      var currentState = listenerApi.getState();
      var tooltipEventType = selectTooltipEventType$1(currentState, currentState.tooltip.settings.shared);
      if (tooltipEventType === "axis") {
        var _latestChartPointers;
        var latestTouchPointer = (_latestChartPointers = latestChartPointers) === null || _latestChartPointers === void 0 ? void 0 : _latestChartPointers[0];
        if (latestTouchPointer == null) {
          rafId = null;
          timeoutId = null;
          return;
        }
        var activeProps = selectActivePropsFromChartPointer(currentState, latestTouchPointer);
        if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
          listenerApi.dispatch(setMouseOverAxisIndex({
            activeIndex: activeProps.activeIndex,
            activeDataKey: void 0,
            activeCoordinate: activeProps.activeCoordinate
          }));
        }
      } else if (tooltipEventType === "item") {
        var _target$getAttribute;
        var touch = latestTouchEvent.touches[0];
        if (document.elementFromPoint == null || touch == null) {
          return;
        }
        var target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (!target || !target.getAttribute) {
          return;
        }
        var itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME);
        var graphicalItemId = (_target$getAttribute = target.getAttribute(DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME)) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : void 0;
        var settings = selectAllGraphicalItemsSettings(currentState).find((item) => item.id === graphicalItemId);
        if (itemIndex == null || settings == null || graphicalItemId == null) {
          return;
        }
        var {
          dataKey
        } = settings;
        var coordinate = selectTooltipCoordinate(currentState, itemIndex, graphicalItemId);
        listenerApi.dispatch(setActiveMouseOverItemIndex({
          activeDataKey: dataKey,
          activeIndex: itemIndex,
          activeCoordinate: coordinate,
          activeGraphicalItemId: graphicalItemId
        }));
      }
      rafId = null;
      timeoutId = null;
    };
    if (!isThrottled) {
      callback();
      return;
    }
    if (throttleDelay === "raf") {
      rafId = requestAnimationFrame(callback);
    } else if (typeof throttleDelay === "number") {
      if (timeoutId === null) {
        callback();
        latestTouchEvent = null;
        timeoutId = setTimeout(() => {
          if (latestTouchEvent) {
            callback();
          } else {
            timeoutId = null;
            rafId = null;
          }
        }, throttleDelay);
      }
    }
  }
});
var initialEventSettingsState = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
};
var eventSettingsSlice = createSlice({
  name: "eventSettings",
  initialState: initialEventSettingsState,
  reducers: {
    setEventSettings: (state, action) => {
      if (action.payload.throttleDelay != null) {
        state.throttleDelay = action.payload.throttleDelay;
      }
      if (action.payload.throttledEvents != null) {
        state.throttledEvents = castDraft(action.payload.throttledEvents);
      }
    }
  }
});
var {
  setEventSettings
} = eventSettingsSlice.actions;
var eventSettingsReducer = eventSettingsSlice.reducer;
var rootReducer = combineReducers({
  brush: brushReducer,
  cartesianAxis: cartesianAxisReducer,
  chartData: chartDataReducer,
  errorBars: errorBarReducer,
  eventSettings: eventSettingsReducer,
  graphicalItems: graphicalItemsReducer,
  layout: chartLayoutReducer,
  legend: legendReducer,
  options: optionsReducer,
  polarAxis: polarAxisReducer,
  polarOptions: polarOptionsReducer,
  referenceElements: referenceElementsReducer,
  renderedTicks: renderedTicksReducer,
  rootProps: rootPropsReducer,
  tooltip: tooltipReducer,
  zIndex: zIndexReducer
});
var createRechartsStore = function createRechartsStore2(preloadedState) {
  var chartName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return configureStore({
    reducer: rootReducer,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (getDefaultMiddleware) => {
      var _process$env$NODE_ENV;
      return getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: !["commonjs", "es6", "production"].includes((_process$env$NODE_ENV = "es6") !== null && _process$env$NODE_ENV !== void 0 ? _process$env$NODE_ENV : "")
      }).concat([mouseClickMiddleware.middleware, mouseMoveMiddleware.middleware, keyboardEventsMiddleware.middleware, externalEventsMiddleware.middleware, touchEventMiddleware.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (getDefaultEnhancers) => {
      var enhancers = getDefaultEnhancers;
      if (typeof getDefaultEnhancers === "function") {
        enhancers = getDefaultEnhancers();
      }
      return enhancers.concat(autoBatchEnhancer({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: reduxDevtoolsJsonStringifyReplacer
      },
      name: "recharts-".concat(chartName)
    }
  });
};
function RechartsStoreProvider(_ref2) {
  var {
    preloadedState,
    children,
    reduxStoreName
  } = _ref2;
  var isPanorama = useIsPanorama();
  var storeRef = useRef(null);
  if (isPanorama) {
    return children;
  }
  if (storeRef.current == null) {
    storeRef.current = createRechartsStore(preloadedState, reduxStoreName);
  }
  var nonNullContext = RechartsReduxContext;
  return /* @__PURE__ */ React.createElement(Provider, {
    context: nonNullContext,
    store: storeRef.current
  }, children);
}
function ReportMainChartPropsImpl(_ref2) {
  var {
    layout,
    margin
  } = _ref2;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  useEffect(() => {
    if (!isPanorama) {
      dispatch(setLayout(layout));
      dispatch(setMargin(margin));
    }
  }, [dispatch, isPanorama, layout, margin]);
  return null;
}
var ReportMainChartProps = /* @__PURE__ */ memo(ReportMainChartPropsImpl, propsAreEqual);
function ReportChartProps(props) {
  var dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateOptions(props));
  }, [dispatch, props]);
  return null;
}
var ReportEventSettingsImpl = (props) => {
  var dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setEventSettings(props));
  }, [dispatch, props]);
  return null;
};
var ReportEventSettings = /* @__PURE__ */ memo(ReportEventSettingsImpl, propsAreEqual);
function ZIndexSvgPortal(_ref2) {
  var {
    zIndex,
    isPanorama
  } = _ref2;
  var ref = useRef(null);
  var dispatch = useAppDispatch();
  useLayoutEffect(() => {
    if (ref.current) {
      dispatch(registerZIndexPortalElement({
        zIndex,
        element: ref.current,
        isPanorama
      }));
    }
    return () => {
      dispatch(unregisterZIndexPortalElement({
        zIndex,
        isPanorama
      }));
    };
  }, [dispatch, zIndex, isPanorama]);
  return /* @__PURE__ */ React.createElement("g", {
    tabIndex: -1,
    ref,
    className: "recharts-zIndex-layer_".concat(zIndex)
  });
}
function AllZIndexPortals(_ref2) {
  var {
    children,
    isPanorama
  } = _ref2;
  var allRegisteredZIndexes = useAppSelector(selectAllRegisteredZIndexes);
  if (!allRegisteredZIndexes || allRegisteredZIndexes.length === 0) {
    return children;
  }
  var allNegativeZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex < 0);
  var allPositiveZIndexes = allRegisteredZIndexes.filter((zIndex) => zIndex > 0);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, allNegativeZIndexes.map((zIndex) => /* @__PURE__ */ React.createElement(ZIndexSvgPortal, {
    key: zIndex,
    zIndex,
    isPanorama
  })), children, allPositiveZIndexes.map((zIndex) => /* @__PURE__ */ React.createElement(ZIndexSvgPortal, {
    key: zIndex,
    zIndex,
    isPanorama
  })));
}
var _excluded$1 = ["children"];
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
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends$1.apply(null, arguments);
}
var FULL_WIDTH_AND_HEIGHT = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
};
var MainChartSurface = /* @__PURE__ */ forwardRef((props, ref) => {
  var width = useChartWidth();
  var height = useChartHeight();
  var hasAccessibilityLayer = useAccessibilityLayer();
  if (!isPositiveNumber(width) || !isPositiveNumber(height)) {
    return null;
  }
  var {
    children,
    otherAttributes,
    title,
    desc
  } = props;
  var tabIndex, role;
  if (otherAttributes != null) {
    if (typeof otherAttributes.tabIndex === "number") {
      tabIndex = otherAttributes.tabIndex;
    } else {
      tabIndex = hasAccessibilityLayer ? 0 : void 0;
    }
    if (typeof otherAttributes.role === "string") {
      role = otherAttributes.role;
    } else {
      role = hasAccessibilityLayer ? "application" : void 0;
    }
  }
  return /* @__PURE__ */ React.createElement(Surface, _extends$1({}, otherAttributes, {
    title,
    desc,
    role,
    tabIndex,
    width,
    height,
    style: FULL_WIDTH_AND_HEIGHT,
    ref
  }), children);
});
var BrushPanoramaSurface = (_ref2) => {
  var {
    children
  } = _ref2;
  var brushDimensions = useAppSelector(selectBrushDimensions);
  if (!brushDimensions) {
    return null;
  }
  var {
    width,
    height,
    y,
    x
  } = brushDimensions;
  return /* @__PURE__ */ React.createElement(Surface, {
    width,
    height,
    x,
    y
  }, children);
};
var RootSurface = /* @__PURE__ */ forwardRef((_ref2, ref) => {
  var {
    children
  } = _ref2, rest = _objectWithoutProperties$1(_ref2, _excluded$1);
  var isPanorama = useIsPanorama();
  if (isPanorama) {
    return /* @__PURE__ */ React.createElement(BrushPanoramaSurface, null, /* @__PURE__ */ React.createElement(AllZIndexPortals, {
      isPanorama: true
    }, children));
  }
  return /* @__PURE__ */ React.createElement(MainChartSurface, _extends$1({
    ref
  }, rest), /* @__PURE__ */ React.createElement(AllZIndexPortals, {
    isPanorama: false
  }, children));
});
function useReportScale() {
  var dispatch = useAppDispatch();
  var [ref, setRef] = useState(null);
  var scale = useAppSelector(selectContainerScale);
  useEffect(() => {
    if (ref == null) {
      return;
    }
    var rect = ref.getBoundingClientRect();
    var newScale = rect.width / ref.offsetWidth;
    if (isWellBehavedNumber(newScale) && newScale !== scale) {
      dispatch(setScale(newScale));
    }
  }, [ref, dispatch, scale]);
  return setRef;
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
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
var EventSynchronizer = () => {
  useSynchronisedEventsFromOtherCharts();
  return null;
};
function getNumberOrZero(value) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    var parsed = parseFloat(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return 0;
}
var ResponsiveDiv = /* @__PURE__ */ forwardRef((props, ref) => {
  var _props$style, _props$style2;
  var observerRef = useRef(null);
  var [sizes, setSizes] = useState({
    containerWidth: getNumberOrZero((_props$style = props.style) === null || _props$style === void 0 ? void 0 : _props$style.width),
    containerHeight: getNumberOrZero((_props$style2 = props.style) === null || _props$style2 === void 0 ? void 0 : _props$style2.height)
  });
  var setContainerSize = useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  var innerRef = useCallback((node) => {
    if (typeof ref === "function") {
      ref(node);
    }
    if (observerRef.current != null) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (node != null && typeof ResizeObserver !== "undefined") {
      var {
        width: containerWidth,
        height: containerHeight
      } = node.getBoundingClientRect();
      setContainerSize(containerWidth, containerHeight);
      var callback = (entries) => {
        var entry = entries[0];
        if (entry == null) {
          return;
        }
        var {
          width,
          height
        } = entry.contentRect;
        setContainerSize(width, height);
      };
      var observer = new ResizeObserver(callback);
      observer.observe(node);
      observerRef.current = observer;
    }
  }, [ref, setContainerSize]);
  useEffect(() => {
    return () => {
      var observer = observerRef.current;
      if (observer != null) {
        observer.disconnect();
      }
    };
  }, [setContainerSize]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
    width: sizes.containerWidth,
    height: sizes.containerHeight
  }), /* @__PURE__ */ React.createElement("div", _extends({
    ref: innerRef
  }, props)));
});
var ReadSizeOnceDiv = /* @__PURE__ */ forwardRef((props, ref) => {
  var {
    width,
    height
  } = props;
  var [sizes, setSizes] = useState({
    containerWidth: getNumberOrZero(width),
    containerHeight: getNumberOrZero(height)
  });
  var setContainerSize = useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  var innerRef = useCallback((node) => {
    if (typeof ref === "function") {
      ref(node);
    }
    if (node != null) {
      var {
        width: containerWidth,
        height: containerHeight
      } = node.getBoundingClientRect();
      setContainerSize(containerWidth, containerHeight);
    }
  }, [ref, setContainerSize]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
    width: sizes.containerWidth,
    height: sizes.containerHeight
  }), /* @__PURE__ */ React.createElement("div", _extends({
    ref: innerRef
  }, props)));
});
var StaticDiv = /* @__PURE__ */ forwardRef((props, ref) => {
  var {
    width,
    height
  } = props;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
    width,
    height
  }), /* @__PURE__ */ React.createElement("div", _extends({
    ref
  }, props)));
});
var NonResponsiveDiv = /* @__PURE__ */ forwardRef((props, ref) => {
  var {
    width,
    height
  } = props;
  if (typeof width === "string" || typeof height === "string") {
    return /* @__PURE__ */ React.createElement(ReadSizeOnceDiv, _extends({}, props, {
      ref
    }));
  }
  if (typeof width === "number" && typeof height === "number") {
    return /* @__PURE__ */ React.createElement(StaticDiv, _extends({}, props, {
      width,
      height,
      ref
    }));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
    width,
    height
  }), /* @__PURE__ */ React.createElement("div", _extends({
    ref
  }, props)));
});
function getWrapperDivComponent(responsive) {
  return responsive ? ResponsiveDiv : NonResponsiveDiv;
}
var RechartsWrapper = /* @__PURE__ */ forwardRef((props, ref) => {
  var {
    children,
    className,
    height: heightFromProps,
    onClick,
    onContextMenu,
    onDoubleClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    style,
    width: widthFromProps,
    responsive,
    dispatchTouchEvents = true
  } = props;
  var containerRef = useRef(null);
  var dispatch = useAppDispatch();
  var [tooltipPortal, setTooltipPortal] = useState(null);
  var [legendPortal, setLegendPortal] = useState(null);
  var setScaleRef = useReportScale();
  var responsiveContainerCalculations = useResponsiveContainerContext();
  var width = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.width) > 0 ? responsiveContainerCalculations.width : widthFromProps;
  var height = (responsiveContainerCalculations === null || responsiveContainerCalculations === void 0 ? void 0 : responsiveContainerCalculations.height) > 0 ? responsiveContainerCalculations.height : heightFromProps;
  var innerRef = useCallback((node) => {
    setScaleRef(node);
    if (typeof ref === "function") {
      ref(node);
    }
    setTooltipPortal(node);
    setLegendPortal(node);
    if (node != null) {
      containerRef.current = node;
    }
  }, [setScaleRef, ref, setTooltipPortal, setLegendPortal]);
  var myOnClick = useCallback((e) => {
    dispatch(mouseClickAction(e));
    dispatch(externalEventAction({
      handler: onClick,
      reactEvent: e
    }));
  }, [dispatch, onClick]);
  var myOnMouseEnter = useCallback((e) => {
    dispatch(mouseMoveAction(e));
    dispatch(externalEventAction({
      handler: onMouseEnter,
      reactEvent: e
    }));
  }, [dispatch, onMouseEnter]);
  var myOnMouseLeave = useCallback((e) => {
    dispatch(mouseLeaveChart());
    dispatch(externalEventAction({
      handler: onMouseLeave,
      reactEvent: e
    }));
  }, [dispatch, onMouseLeave]);
  var myOnMouseMove = useCallback((e) => {
    dispatch(mouseMoveAction(e));
    dispatch(externalEventAction({
      handler: onMouseMove,
      reactEvent: e
    }));
  }, [dispatch, onMouseMove]);
  var onFocus = useCallback(() => {
    dispatch(focusAction());
  }, [dispatch]);
  var onBlur = useCallback(() => {
    dispatch(blurAction());
  }, [dispatch]);
  var onKeyDown = useCallback((e) => {
    dispatch(keyDownAction(e.key));
  }, [dispatch]);
  var myOnContextMenu = useCallback((e) => {
    dispatch(externalEventAction({
      handler: onContextMenu,
      reactEvent: e
    }));
  }, [dispatch, onContextMenu]);
  var myOnDoubleClick = useCallback((e) => {
    dispatch(externalEventAction({
      handler: onDoubleClick,
      reactEvent: e
    }));
  }, [dispatch, onDoubleClick]);
  var myOnMouseDown = useCallback((e) => {
    dispatch(externalEventAction({
      handler: onMouseDown,
      reactEvent: e
    }));
  }, [dispatch, onMouseDown]);
  var myOnMouseUp = useCallback((e) => {
    dispatch(externalEventAction({
      handler: onMouseUp,
      reactEvent: e
    }));
  }, [dispatch, onMouseUp]);
  var myOnTouchStart = useCallback((e) => {
    dispatch(externalEventAction({
      handler: onTouchStart,
      reactEvent: e
    }));
  }, [dispatch, onTouchStart]);
  var myOnTouchMove = useCallback((e) => {
    if (dispatchTouchEvents) {
      dispatch(touchEventAction(e));
    }
    dispatch(externalEventAction({
      handler: onTouchMove,
      reactEvent: e
    }));
  }, [dispatch, dispatchTouchEvents, onTouchMove]);
  var myOnTouchEnd = useCallback((e) => {
    dispatch(externalEventAction({
      handler: onTouchEnd,
      reactEvent: e
    }));
  }, [dispatch, onTouchEnd]);
  var WrapperDiv = getWrapperDivComponent(responsive);
  return /* @__PURE__ */ React.createElement(TooltipPortalContext.Provider, {
    value: tooltipPortal
  }, /* @__PURE__ */ React.createElement(LegendPortalContext.Provider, {
    value: legendPortal
  }, /* @__PURE__ */ React.createElement(WrapperDiv, {
    width: width !== null && width !== void 0 ? width : style === null || style === void 0 ? void 0 : style.width,
    height: height !== null && height !== void 0 ? height : style === null || style === void 0 ? void 0 : style.height,
    className: clsx("recharts-wrapper", className),
    style: _objectSpread({
      position: "relative",
      cursor: "default",
      width,
      height
    }, style),
    onClick: myOnClick,
    onContextMenu: myOnContextMenu,
    onDoubleClick: myOnDoubleClick,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseDown: myOnMouseDown,
    onMouseEnter: myOnMouseEnter,
    onMouseLeave: myOnMouseLeave,
    onMouseMove: myOnMouseMove,
    onMouseUp: myOnMouseUp,
    onTouchEnd: myOnTouchEnd,
    onTouchMove: myOnTouchMove,
    onTouchStart: myOnTouchStart,
    ref: innerRef
  }, /* @__PURE__ */ React.createElement(EventSynchronizer, null), children)));
});
var _excluded = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
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
var CategoricalChart = /* @__PURE__ */ forwardRef((props, ref) => {
  var {
    width,
    height,
    responsive,
    children,
    className,
    style,
    compact,
    title,
    desc
  } = props, others = _objectWithoutProperties(props, _excluded);
  var attrs = svgPropertiesNoEvents(others);
  if (compact) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(ReportChartSize, {
      width,
      height
    }), /* @__PURE__ */ React.createElement(RootSurface, {
      otherAttributes: attrs,
      title,
      desc
    }, children));
  }
  return /* @__PURE__ */ React.createElement(RechartsWrapper, {
    className,
    style,
    width,
    height,
    responsive: responsive !== null && responsive !== void 0 ? responsive : false,
    onClick: props.onClick,
    onMouseLeave: props.onMouseLeave,
    onMouseEnter: props.onMouseEnter,
    onMouseMove: props.onMouseMove,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onContextMenu: props.onContextMenu,
    onDoubleClick: props.onDoubleClick,
    onTouchStart: props.onTouchStart,
    onTouchMove: props.onTouchMove,
    onTouchEnd: props.onTouchEnd
  }, /* @__PURE__ */ React.createElement(RootSurface, {
    otherAttributes: attrs,
    title,
    desc,
    ref
  }, /* @__PURE__ */ React.createElement(ClipPathProvider, null, children)));
});
export {
  isNumber as $,
  resolveDefaultProps as A,
  svgPropertiesNoEvents as B,
  findAllByType as C,
  DefaultZIndexes as D,
  useAppSelector as E,
  SetPolarLegendPayload as F,
  SetTooltipEntrySettings as G,
  useAnimationId as H,
  interpolate as I,
  JavascriptAnimate as J,
  Cell as K,
  Layer as L,
  selectActiveTooltipIndex as M,
  selectActiveTooltipDataKey as N,
  selectActiveTooltipGraphicalItemId as O,
  PolarLabelListContextProvider as P,
  useMouseEnterItemDispatch as Q,
  RegisterGraphicalItemId as R,
  SetPolarGraphicalItem as S,
  useMouseLeaveItemDispatch as T,
  useMouseClickItemDispatch as U,
  DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME as V,
  DATA_ITEM_INDEX_ATTRIBUTE_NAME as W,
  adaptEventsOfChild as X,
  Shape as Y,
  ZIndexLayer as Z,
  LabelListFromLabelProp as _,
  pickAxisId as a,
  replaceXAxis as a$,
  mathSign as a0,
  svgPropertiesNoEventsFromUnknown as a1,
  polarToCartesian as a2,
  getMaxRadius as a3,
  getPercentValue as a4,
  Curve as a5,
  getClassNameFromUnknown as a6,
  Text as a7,
  useAppDispatch as a8,
  updatePolarOptions as a9,
  usePlotArea as aA,
  defaultAxisId as aB,
  selectAxisViewBox as aC,
  selectChartDataWithIndexesIfNotInPanoramaPosition3 as aD,
  selectAxisWithScale as aE,
  selectTicksOfGraphicalItem as aF,
  getBandSizeOfAxis as aG,
  selectUnfilteredCartesianItems as aH,
  selectRootMaxBarSize as aI,
  selectBarGap as aJ,
  selectBarCategoryGap as aK,
  selectStackGroups as aL,
  selectRootBarSize as aM,
  selectCartesianAxisSize as aN,
  getNormalizedStackId as aO,
  propsAreEqual as aP,
  useIsPanorama as aQ,
  SetLegendPayload as aR,
  SetCartesianGraphicalItem as aS,
  useChartLayout as aT,
  getBaseValueOfBar as aU,
  truncateByDomain as aV,
  getCateCoordinateOfBar as aW,
  CartesianLabelListContextProvider as aX,
  isNan as aY,
  useCartesianChartLayout as aZ,
  addXAxis as a_,
  RechartsStoreProvider as aa,
  ChartDataContextProvider as ab,
  ReportMainChartProps as ac,
  ReportEventSettings as ad,
  ReportChartProps as ae,
  CategoricalChart as af,
  initialEventSettingsState as ag,
  arrayTooltipSearcher as ah,
  ResponsiveContainer as ai,
  Tooltip as aj,
  isStacked as ak,
  isNullish as al,
  isWellBehavedNumber as am,
  getStackSeriesIdentifier as an,
  Global as ao,
  getStringSize as ap,
  CartesianLabelContextProvider as aq,
  CartesianLabelFromLabelProp as ar,
  isValidTextAnchor as as,
  noop$1 as at,
  setRenderedTicks as au,
  removeRenderedTicks as av,
  selectXAxisSettings as aw,
  selectYAxisSettings as ax,
  implicitXAxis as ay,
  implicitYAxis as az,
  combineGraphicalItemsData as b,
  removeXAxis as b0,
  selectTicksOfAxis as b1,
  selectXAxisSize as b2,
  selectXAxisPosition as b3,
  selectXAxisSettingsNoDefaults as b4,
  getAxisTypeBasedOnLayout as b5,
  addYAxis as b6,
  replaceYAxis as b7,
  removeYAxis as b8,
  selectYAxisSize as b9,
  selectYAxisPosition as ba,
  selectYAxisSettingsNoDefaults as bb,
  isLabelContentAFunction as bc,
  updateYAxisWidth as bd,
  adaptEventHandlers as be,
  isClipDot as bf,
  svgPropertiesAndEventsFromUnknown as bg,
  useActiveTooltipDataPoints as bh,
  useChartWidth as bi,
  useChartHeight as bj,
  useOffsetInternal as bk,
  selectAxisPropsNeededForCartesianGridTicksGenerator as bl,
  isPositiveNumber as bm,
  warn as bn,
  getCoordinatesOfGrid as bo,
  getTicksOfAxis as bp,
  selectChartBaseValue as bq,
  isCategoricalAxis as br,
  useChartName as bs,
  getCateCoordinateOfLine as bt,
  svgPropertiesAndEvents as bu,
  combineGraphicalItemsSettings as c,
  selectChartDataAndAlwaysIgnoreIndexes as d,
  combineDisplayedData as e,
  combineAppliedValues as f,
  getValueByDataKey as g,
  selectAllErrorBarSettings as h,
  itemAxisPredicate as i,
  selectChartDataSliceIgnoringIndexes as j,
  combineDomainOfAllAppliedNumericalValuesIncludingErrorValues as k,
  selectDomainDefinition as l,
  selectDomainFromUserPreference as m,
  selectChartLayout as n,
  combineNumericalDomain as o,
  pickAxisType as p,
  selectStackOffsetType as q,
  combineAxisDomain as r,
  selectBaseAxis as s,
  selectRenderableAxisSettings as t,
  selectRealScaleType as u,
  combineNiceTicks as v,
  combineAxisDomainWithNiceTicks as w,
  combineCheckedDomain as x,
  getTooltipNameProp as y,
  selectChartOffsetInternal as z
};
