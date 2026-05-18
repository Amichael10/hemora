import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useMemo, useRef, useState, useCallback, useEffect, forwardRef } from "react";
import { Link } from "wouter";
import { M as MobileAppShell } from "./MobileAppShell-BM8wQJAz.js";
import { S as SubPageHeader } from "./SubPageHeader-pHjD0lGr.js";
import { B as Button } from "./button-CVyzTRqg.js";
import { b as useProfile, u as useToast, k as useListCrisisLogs, n as getListCrisisLogsQueryKey, e as useGetProfile } from "./AppRouter-B_BCS-Zy.js";
import { e as exportCrisisReportToPdf } from "./profilePdf-RGgcTAFP.js";
import { DownloadLinear } from "solar-icon-set";
import { p as pickAxisType, a as pickAxisId, i as itemAxisPredicate, s as selectBaseAxis, c as combineGraphicalItemsSettings, b as combineGraphicalItemsData, d as selectChartDataAndAlwaysIgnoreIndexes, e as combineDisplayedData, f as combineAppliedValues, g as getValueByDataKey, h as selectAllErrorBarSettings, j as selectChartDataSliceIgnoringIndexes, k as combineDomainOfAllAppliedNumericalValuesIncludingErrorValues, l as selectDomainDefinition, m as selectDomainFromUserPreference, n as selectChartLayout, o as combineNumericalDomain, q as selectStackOffsetType, r as combineAxisDomain, t as selectRenderableAxisSettings, u as selectRealScaleType, v as combineNiceTicks, w as combineAxisDomainWithNiceTicks, x as combineCheckedDomain, y as getTooltipNameProp, z as selectChartOffsetInternal, A as resolveDefaultProps, B as svgPropertiesNoEvents, R as RegisterGraphicalItemId, S as SetPolarGraphicalItem, D as DefaultZIndexes, C as findAllByType, E as useAppSelector, F as SetPolarLegendPayload, L as Layer, Z as ZIndexLayer, G as SetTooltipEntrySettings, H as useAnimationId, J as JavascriptAnimate, I as interpolate, K as Cell, P as PolarLabelListContextProvider, M as selectActiveTooltipIndex, N as selectActiveTooltipDataKey, O as selectActiveTooltipGraphicalItemId, Q as useMouseEnterItemDispatch, T as useMouseLeaveItemDispatch, U as useMouseClickItemDispatch, V as DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME, W as DATA_ITEM_INDEX_ATTRIBUTE_NAME, X as adaptEventsOfChild, Y as Shape, _ as LabelListFromLabelProp, $ as isNumber, a0 as mathSign, a1 as svgPropertiesNoEventsFromUnknown, a2 as polarToCartesian, a3 as getMaxRadius, a4 as getPercentValue, a5 as Curve, a6 as getClassNameFromUnknown, a7 as Text, a8 as useAppDispatch, a9 as updatePolarOptions, aa as RechartsStoreProvider, ab as ChartDataContextProvider, ac as ReportMainChartProps, ad as ReportEventSettings, ae as ReportChartProps, af as CategoricalChart, ag as initialEventSettingsState, ah as arrayTooltipSearcher, ai as ResponsiveContainer, aj as Tooltip } from "./CategoricalChart-DJedIoBC.js";
import get from "es-toolkit/compat/get";
import { clsx } from "clsx";
import { createSelector } from "reselect";
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
import "@radix-ui/react-toast";
import "tailwind-merge";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "jspdf";
import "./Logo-qOo-96Vk.js";
import "react-dom";
import "es-toolkit/compat/sortBy";
import "es-toolkit/compat/uniqBy";
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
var selectUnfilteredPolarItems = (state) => state.graphicalItems.polarItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var selectPolarItemsSettings = createSelector([selectUnfilteredPolarItems, selectBaseAxis, selectAxisPredicate], combineGraphicalItemsSettings);
var selectPolarGraphicalItemsData = createSelector([selectPolarItemsSettings], combineGraphicalItemsData);
var selectPolarDisplayedData = createSelector([selectPolarGraphicalItemsData, selectChartDataAndAlwaysIgnoreIndexes], combineDisplayedData);
var selectPolarAppliedValues = createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings], combineAppliedValues);
createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings], (data, axisSettings, items) => {
  if (items.length > 0) {
    return data.flatMap((entry) => {
      return items.flatMap((item) => {
        var _axisSettings$dataKey;
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        return {
          value: valueByDataKey,
          errorDomain: []
          // polar charts do not have error bars
        };
      });
    }).filter(Boolean);
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey),
      errorDomain: []
    }));
  }
  return data.map((entry) => ({
    value: entry,
    errorDomain: []
  }));
});
var unsupportedInPolarChart = () => void 0;
var selectDomainOfAllPolarAppliedNumericalValues = createSelector([selectPolarDisplayedData, selectBaseAxis, selectPolarItemsSettings, selectAllErrorBarSettings, pickAxisType, selectChartDataSliceIgnoringIndexes], combineDomainOfAllAppliedNumericalValuesIncludingErrorValues);
var selectPolarNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainFromUserPreference, unsupportedInPolarChart, selectDomainOfAllPolarAppliedNumericalValues, unsupportedInPolarChart, selectChartLayout, pickAxisType], combineNumericalDomain);
var selectPolarAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectPolarDisplayedData, selectPolarAppliedValues, selectStackOffsetType, pickAxisType, selectPolarNumericalDomain], combineAxisDomain);
var selectPolarNiceTicks = createSelector([selectPolarAxisDomain, selectRenderableAxisSettings, selectRealScaleType], combineNiceTicks);
var selectPolarAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectPolarAxisDomain, selectPolarNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
createSelector([selectRealScaleType, selectPolarAxisDomainIncludingNiceTicks], combineCheckedDomain);
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
var pickId = (_state, id) => id;
var selectSynchronisedPieSettings = createSelector([selectUnfilteredPolarItems, pickId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "pie").find((item) => item.id === id));
var emptyArray = [];
var pickCells = (_state, _id, cells) => {
  if ((cells === null || cells === void 0 ? void 0 : cells.length) === 0) {
    return emptyArray;
  }
  return cells;
};
var selectDisplayedData = createSelector([selectChartDataAndAlwaysIgnoreIndexes, selectSynchronisedPieSettings, pickCells], (_ref, pieSettings, cells) => {
  var {
    chartData
  } = _ref;
  if (pieSettings == null) {
    return void 0;
  }
  var displayedData;
  if ((pieSettings === null || pieSettings === void 0 ? void 0 : pieSettings.data) != null && pieSettings.data.length > 0) {
    displayedData = pieSettings.data;
  } else {
    displayedData = chartData;
  }
  if ((!displayedData || !displayedData.length) && cells != null) {
    displayedData = cells.map((cell) => _objectSpread$3(_objectSpread$3({}, pieSettings.presentationProps), cell.props));
  }
  if (displayedData == null) {
    return void 0;
  }
  return displayedData;
});
var selectPieLegend = createSelector([selectDisplayedData, selectSynchronisedPieSettings, pickCells], (displayedData, pieSettings, cells) => {
  if (displayedData == null || pieSettings == null) {
    return void 0;
  }
  return displayedData.map((entry, i) => {
    var _cells$i;
    var name = getValueByDataKey(entry, pieSettings.nameKey, pieSettings.name);
    var color;
    if (cells !== null && cells !== void 0 && (_cells$i = cells[i]) !== null && _cells$i !== void 0 && (_cells$i = _cells$i.props) !== null && _cells$i !== void 0 && _cells$i.fill) {
      color = cells[i].props.fill;
    } else if (typeof entry === "object" && entry != null && "fill" in entry) {
      color = entry.fill;
    } else {
      color = pieSettings.fill;
    }
    return {
      value: getTooltipNameProp(name, pieSettings.dataKey),
      color,
      // @ts-expect-error Legend payload.payload says it wants objects but our data can be unknown
      payload: entry,
      type: pieSettings.legendType
    };
  });
});
var selectPieSectors = createSelector([selectDisplayedData, selectSynchronisedPieSettings, pickCells, selectChartOffsetInternal], (displayedData, pieSettings, cells, offset) => {
  if (pieSettings == null || displayedData == null) {
    return void 0;
  }
  return computePieSectors({
    offset,
    pieSettings,
    displayedData,
    cells
  });
});
var _excluded$1 = ["key"], _excluded2 = ["onMouseEnter", "onClick", "onMouseLeave"], _excluded3 = ["id"], _excluded4 = ["id"];
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
function SetPiePayloadLegend(props) {
  var cells = useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var legendPayload = useAppSelector((state) => selectPieLegend(state, props.id, cells));
  if (legendPayload == null) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(SetPolarLegendPayload, {
    legendPayload
  });
}
function getActiveShapeFill(activeShape) {
  if (activeShape == null || typeof activeShape === "boolean" || typeof activeShape === "function") {
    return void 0;
  }
  if (/* @__PURE__ */ React.isValidElement(activeShape)) {
    var _activeShape$props;
    var _fill = (_activeShape$props = activeShape.props) === null || _activeShape$props === void 0 ? void 0 : _activeShape$props.fill;
    return typeof _fill === "string" ? _fill : void 0;
  }
  var {
    fill
  } = activeShape;
  return typeof fill === "string" ? fill : void 0;
}
var SetPieTooltipEntrySettings = /* @__PURE__ */ React.memo((_ref) => {
  var {
    dataKey,
    nameKey,
    sectors,
    stroke,
    strokeWidth,
    fill,
    name,
    hide,
    tooltipType,
    id,
    activeShape
  } = _ref;
  var activeShapeFill = getActiveShapeFill(activeShape);
  var tooltipDataDefinedOnItem = sectors.map((sector) => {
    var sectorTooltipPayload = sector.tooltipPayload;
    if (activeShapeFill == null || sectorTooltipPayload == null) {
      return sectorTooltipPayload;
    }
    return sectorTooltipPayload.map((item) => _objectSpread$2(_objectSpread$2({}, item), {}, {
      color: activeShapeFill,
      fill: activeShapeFill
    }));
  });
  var tooltipEntrySettings = {
    dataDefinedOnItem: tooltipDataDefinedOnItem,
    getPosition: (index) => {
      var _sectors$Number;
      return (_sectors$Number = sectors[Number(index)]) === null || _sectors$Number === void 0 ? void 0 : _sectors$Number.tooltipPosition;
    },
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: tooltipType,
      color: fill,
      unit: "",
      // why doesn't Pie support unit?
      graphicalItemId: id
    }
  };
  return /* @__PURE__ */ React.createElement(SetTooltipEntrySettings, {
    tooltipEntrySettings
  });
});
var getTextAnchor = (x, cx) => {
  if (x > cx) {
    return "start";
  }
  if (x < cx) {
    return "end";
  }
  return "middle";
};
var getOuterRadius = (dataPoint, outerRadius, maxPieRadius) => {
  if (typeof outerRadius === "function") {
    return getPercentValue(outerRadius(dataPoint), maxPieRadius, maxPieRadius * 0.8);
  }
  return getPercentValue(outerRadius, maxPieRadius, maxPieRadius * 0.8);
};
var parseCoordinateOfPie = (pieSettings, offset, dataPoint) => {
  var {
    top,
    left,
    width,
    height
  } = offset;
  var maxPieRadius = getMaxRadius(width, height);
  var cx = left + getPercentValue(pieSettings.cx, width, width / 2);
  var cy = top + getPercentValue(pieSettings.cy, height, height / 2);
  var innerRadius = getPercentValue(pieSettings.innerRadius, maxPieRadius, 0);
  var outerRadius = getOuterRadius(dataPoint, pieSettings.outerRadius, maxPieRadius);
  var maxRadius = pieSettings.maxRadius || Math.sqrt(width * width + height * height) / 2;
  return {
    cx,
    cy,
    innerRadius,
    outerRadius,
    maxRadius
  };
};
var parseDeltaAngle = (startAngle, endAngle) => {
  var sign = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign * deltaAngle;
};
var renderLabelLineItem = (option, props) => {
  if (/* @__PURE__ */ React.isValidElement(option)) {
    return /* @__PURE__ */ React.cloneElement(option, props);
  }
  if (typeof option === "function") {
    return option(props);
  }
  var className = clsx("recharts-pie-label-line", typeof option !== "boolean" ? option.className : "");
  var {
    key
  } = props, otherProps = _objectWithoutProperties$1(props, _excluded$1);
  return /* @__PURE__ */ React.createElement(Curve, _extends$1({}, otherProps, {
    type: "linear",
    className
  }));
};
var renderLabelItem = (option, props, value) => {
  if (/* @__PURE__ */ React.isValidElement(option)) {
    return /* @__PURE__ */ React.cloneElement(option, props);
  }
  var label = value;
  if (typeof option === "function") {
    label = option(props);
    if (/* @__PURE__ */ React.isValidElement(label)) {
      return label;
    }
  }
  var className = clsx("recharts-pie-label-text", getClassNameFromUnknown(option));
  return /* @__PURE__ */ React.createElement(Text, _extends$1({}, props, {
    alignmentBaseline: "middle",
    className
  }), label);
};
function PieLabels(_ref2) {
  var {
    sectors,
    props,
    showLabels
  } = _ref2;
  var {
    label,
    labelLine,
    dataKey
  } = props;
  if (!showLabels || !label || !sectors) {
    return null;
  }
  var pieProps = svgPropertiesNoEvents(props);
  var customLabelProps = svgPropertiesNoEventsFromUnknown(label);
  var customLabelLineProps = svgPropertiesNoEventsFromUnknown(labelLine);
  var offsetRadius = typeof label === "object" && "offsetRadius" in label && typeof label.offsetRadius === "number" && label.offsetRadius || 20;
  var labels = sectors.map((entry, i) => {
    var midAngle = (entry.startAngle + entry.endAngle) / 2;
    var endPoint = polarToCartesian(entry.cx, entry.cy, entry.outerRadius + offsetRadius, midAngle);
    var labelProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, pieProps), entry), {}, {
      // @ts-expect-error customLabelProps is contributing unknown props
      stroke: "none"
    }, customLabelProps), {}, {
      index: i,
      textAnchor: getTextAnchor(endPoint.x, entry.cx)
    }, endPoint);
    var lineProps = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, pieProps), entry), {}, {
      // @ts-expect-error customLabelLineProps is contributing unknown props
      fill: "none",
      // @ts-expect-error customLabelLineProps is contributing unknown props
      stroke: entry.fill
    }, customLabelLineProps), {}, {
      index: i,
      points: [polarToCartesian(entry.cx, entry.cy, entry.outerRadius, midAngle), endPoint],
      key: "line"
    });
    return /* @__PURE__ */ React.createElement(ZIndexLayer, {
      zIndex: DefaultZIndexes.label,
      key: "label-".concat(entry.startAngle, "-").concat(entry.endAngle, "-").concat(entry.midAngle, "-").concat(i)
    }, /* @__PURE__ */ React.createElement(Layer, null, labelLine && renderLabelLineItem(labelLine, lineProps), renderLabelItem(label, labelProps, getValueByDataKey(entry, dataKey))));
  });
  return /* @__PURE__ */ React.createElement(Layer, {
    className: "recharts-pie-labels"
  }, labels);
}
function PieLabelList(_ref3) {
  var {
    sectors,
    props,
    showLabels
  } = _ref3;
  var {
    label
  } = props;
  if (typeof label === "object" && label != null && "position" in label) {
    return /* @__PURE__ */ React.createElement(LabelListFromLabelProp, {
      label
    });
  }
  return /* @__PURE__ */ React.createElement(PieLabels, {
    sectors,
    props,
    showLabels
  });
}
function PieSectors(props) {
  var {
    sectors,
    activeShape,
    inactiveShape: inactiveShapeProp,
    allOtherPieProps,
    shape,
    id
  } = props;
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
  var activeGraphicalItemId = useAppSelector(selectActiveTooltipGraphicalItemId);
  var {
    onMouseEnter: onMouseEnterFromProps,
    onClick: onItemClickFromProps,
    onMouseLeave: onMouseLeaveFromProps
  } = allOtherPieProps, restOfAllOtherProps = _objectWithoutProperties$1(allOtherPieProps, _excluded2);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, allOtherPieProps.dataKey, id);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, allOtherPieProps.dataKey, id);
  if (sectors == null || sectors.length === 0) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, sectors.map((entry, i) => {
    if ((entry === null || entry === void 0 ? void 0 : entry.startAngle) === 0 && (entry === null || entry === void 0 ? void 0 : entry.endAngle) === 0 && sectors.length !== 1) return null;
    var graphicalItemMatches = activeGraphicalItemId == null || activeGraphicalItemId === id;
    var isActive = String(i) === activeIndex && (activeDataKey == null || allOtherPieProps.dataKey === activeDataKey) && graphicalItemMatches;
    var inactiveShape = activeIndex ? inactiveShapeProp : null;
    var sectorOptions = activeShape && isActive ? activeShape : inactiveShape;
    var sectorProps = _objectSpread$2(_objectSpread$2({}, entry), {}, {
      stroke: entry.stroke,
      tabIndex: -1,
      [DATA_ITEM_INDEX_ATTRIBUTE_NAME]: i,
      [DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME]: id
    });
    return /* @__PURE__ */ React.createElement(Layer, _extends$1({
      key: "sector-".concat(entry === null || entry === void 0 ? void 0 : entry.startAngle, "-").concat(entry === null || entry === void 0 ? void 0 : entry.endAngle, "-").concat(entry.midAngle, "-").concat(i),
      tabIndex: -1,
      className: "recharts-pie-sector"
    }, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
      onMouseEnter: onMouseEnterFromContext(entry, i),
      onMouseLeave: onMouseLeaveFromContext(entry, i),
      onClick: onClickFromContext(entry, i)
    }), /* @__PURE__ */ React.createElement(Shape, _extends$1({
      option: shape !== null && shape !== void 0 ? shape : sectorOptions,
      index: i,
      shapeType: "sector",
      isActive
    }, sectorProps)));
  }));
}
function computePieSectors(_ref4) {
  var _pieSettings$paddingA;
  var {
    pieSettings,
    displayedData,
    cells,
    offset
  } = _ref4;
  var {
    cornerRadius,
    startAngle,
    endAngle,
    dataKey,
    nameKey,
    tooltipType
  } = pieSettings;
  var minAngle = Math.abs(pieSettings.minAngle);
  var deltaAngle = parseDeltaAngle(startAngle, endAngle);
  var absDeltaAngle = Math.abs(deltaAngle);
  var paddingAngle = displayedData.length <= 1 ? 0 : (_pieSettings$paddingA = pieSettings.paddingAngle) !== null && _pieSettings$paddingA !== void 0 ? _pieSettings$paddingA : 0;
  var notZeroItemCount = displayedData.filter((entry) => getValueByDataKey(entry, dataKey, 0) !== 0).length;
  var totalPaddingAngle = (absDeltaAngle >= 360 ? notZeroItemCount : notZeroItemCount - 1) * paddingAngle;
  var sum = displayedData.reduce((result, entry) => {
    var val = getValueByDataKey(entry, dataKey, 0);
    return result + (isNumber(val) ? val : 0);
  }, 0);
  var needsMinAngleAdjustment = minAngle > 0 && sum > 0 && displayedData.some((entry) => {
    var val = getValueByDataKey(entry, dataKey, 0);
    var percent = (isNumber(val) ? val : 0) / sum;
    return val !== 0 && percent * absDeltaAngle < minAngle;
  });
  var effectiveMinAngle = needsMinAngleAdjustment ? minAngle : 0;
  var realTotalAngle = absDeltaAngle - notZeroItemCount * effectiveMinAngle - totalPaddingAngle;
  var sectors;
  if (sum > 0) {
    var prev;
    sectors = displayedData.map((entry, i) => {
      var val = getValueByDataKey(entry, dataKey, 0);
      var name = getValueByDataKey(entry, nameKey, i);
      var coordinate = parseCoordinateOfPie(pieSettings, offset, entry);
      var percent = (isNumber(val) ? val : 0) / sum;
      var tempStartAngle;
      var entryWithCellInfo = _objectSpread$2(_objectSpread$2({}, entry), cells && cells[i] && cells[i].props);
      var sectorColor = entryWithCellInfo != null && "fill" in entryWithCellInfo && typeof entryWithCellInfo.fill === "string" ? entryWithCellInfo.fill : pieSettings.fill;
      if (i) {
        tempStartAngle = prev.endAngle + mathSign(deltaAngle) * paddingAngle * (val !== 0 ? 1 : 0);
      } else {
        tempStartAngle = startAngle;
      }
      var tempEndAngle = tempStartAngle + mathSign(deltaAngle) * ((val !== 0 ? effectiveMinAngle : 0) + percent * realTotalAngle);
      var midAngle = (tempStartAngle + tempEndAngle) / 2;
      var middleRadius = (coordinate.innerRadius + coordinate.outerRadius) / 2;
      var tooltipPayload = [{
        name,
        value: val,
        payload: entryWithCellInfo,
        dataKey,
        type: tooltipType,
        color: sectorColor,
        fill: sectorColor,
        graphicalItemId: pieSettings.id
      }];
      var tooltipPosition = polarToCartesian(coordinate.cx, coordinate.cy, middleRadius, midAngle);
      prev = _objectSpread$2(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, pieSettings.presentationProps), {}, {
        percent,
        cornerRadius: typeof cornerRadius === "string" ? parseFloat(cornerRadius) : cornerRadius,
        name,
        tooltipPayload,
        midAngle,
        middleRadius,
        tooltipPosition
      }, entryWithCellInfo), coordinate), {}, {
        value: val,
        dataKey,
        startAngle: tempStartAngle,
        endAngle: tempEndAngle,
        payload: entryWithCellInfo,
        paddingAngle: val !== 0 ? mathSign(deltaAngle) * paddingAngle : 0
      });
      return prev;
    });
  }
  return sectors;
}
function PieLabelListProvider(_ref5) {
  var {
    showLabels,
    sectors,
    children
  } = _ref5;
  var labelListEntries = useMemo(() => {
    if (!showLabels || !sectors) {
      return [];
    }
    return sectors.map((entry) => ({
      value: entry.value,
      payload: entry.payload,
      clockWise: false,
      parentViewBox: void 0,
      viewBox: {
        cx: entry.cx,
        cy: entry.cy,
        innerRadius: entry.innerRadius,
        outerRadius: entry.outerRadius,
        startAngle: entry.startAngle,
        endAngle: entry.endAngle,
        clockWise: false
      },
      fill: entry.fill
    }));
  }, [sectors, showLabels]);
  return /* @__PURE__ */ React.createElement(PolarLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function SectorsWithAnimation(_ref6) {
  var {
    props,
    previousSectorsRef,
    id
  } = _ref6;
  var {
    sectors,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    activeShape,
    inactiveShape,
    onAnimationStart,
    onAnimationEnd
  } = props;
  var animationId = useAnimationId(props, "recharts-pie-");
  var prevSectors = previousSectorsRef.current;
  var [isAnimating, setIsAnimating] = useState(false);
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
  return /* @__PURE__ */ React.createElement(PieLabelListProvider, {
    showLabels: !isAnimating,
    sectors
  }, /* @__PURE__ */ React.createElement(JavascriptAnimate, {
    animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationStart: handleAnimationStart,
    onAnimationEnd: handleAnimationEnd,
    key: animationId
  }, (t) => {
    var _first$startAngle;
    var stepData = [];
    var first = sectors && sectors[0];
    var curAngle = (_first$startAngle = first === null || first === void 0 ? void 0 : first.startAngle) !== null && _first$startAngle !== void 0 ? _first$startAngle : 0;
    sectors === null || sectors === void 0 || sectors.forEach((entry, index) => {
      var prev = prevSectors && prevSectors[index];
      var paddingAngle = index > 0 ? get(entry, "paddingAngle", 0) : 0;
      if (prev) {
        var angle = interpolate(prev.endAngle - prev.startAngle, entry.endAngle - entry.startAngle, t);
        var latest = _objectSpread$2(_objectSpread$2({}, entry), {}, {
          startAngle: curAngle + paddingAngle,
          endAngle: curAngle + angle + paddingAngle
        });
        stepData.push(latest);
        curAngle = latest.endAngle;
      } else {
        var {
          endAngle,
          startAngle
        } = entry;
        var deltaAngle = interpolate(0, endAngle - startAngle, t);
        var _latest = _objectSpread$2(_objectSpread$2({}, entry), {}, {
          startAngle: curAngle + paddingAngle,
          endAngle: curAngle + deltaAngle + paddingAngle
        });
        stepData.push(_latest);
        curAngle = _latest.endAngle;
      }
    });
    previousSectorsRef.current = stepData;
    return /* @__PURE__ */ React.createElement(Layer, null, /* @__PURE__ */ React.createElement(PieSectors, {
      sectors: stepData,
      activeShape,
      inactiveShape,
      allOtherPieProps: props,
      shape: props.shape,
      id
    }));
  }), /* @__PURE__ */ React.createElement(PieLabelList, {
    showLabels: !isAnimating,
    sectors,
    props
  }), props.children);
}
var defaultPieProps = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  cx: "50%",
  cy: "50%",
  dataKey: "value",
  endAngle: 360,
  fill: "#808080",
  hide: false,
  innerRadius: 0,
  isAnimationActive: "auto",
  label: false,
  labelLine: true,
  legendType: "rect",
  minAngle: 0,
  nameKey: "name",
  outerRadius: "80%",
  paddingAngle: 0,
  rootTabIndex: 0,
  startAngle: 0,
  stroke: "#fff",
  zIndex: DefaultZIndexes.area
};
function PieImpl(props) {
  var {
    id
  } = props, propsWithoutId = _objectWithoutProperties$1(props, _excluded3);
  var {
    hide,
    className,
    rootTabIndex
  } = props;
  var cells = useMemo(() => findAllByType(props.children, Cell), [props.children]);
  var sectors = useAppSelector((state) => selectPieSectors(state, id, cells));
  var previousSectorsRef = useRef(null);
  var layerClass = clsx("recharts-pie", className);
  if (hide || sectors == null) {
    previousSectorsRef.current = null;
    return /* @__PURE__ */ React.createElement(Layer, {
      tabIndex: rootTabIndex,
      className: layerClass
    });
  }
  return /* @__PURE__ */ React.createElement(ZIndexLayer, {
    zIndex: props.zIndex
  }, /* @__PURE__ */ React.createElement(SetPieTooltipEntrySettings, {
    dataKey: props.dataKey,
    nameKey: props.nameKey,
    sectors,
    stroke: props.stroke,
    strokeWidth: props.strokeWidth,
    fill: props.fill,
    name: props.name,
    hide: props.hide,
    tooltipType: props.tooltipType,
    id,
    activeShape: props.activeShape
  }), /* @__PURE__ */ React.createElement(Layer, {
    tabIndex: rootTabIndex,
    className: layerClass
  }, /* @__PURE__ */ React.createElement(SectorsWithAnimation, {
    props: _objectSpread$2(_objectSpread$2({}, propsWithoutId), {}, {
      sectors
    }),
    previousSectorsRef,
    id
  })));
}
function PieFn(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultPieProps);
  var {
    id: externalId
  } = props, propsWithoutId = _objectWithoutProperties$1(props, _excluded4);
  var presentationProps = svgPropertiesNoEvents(propsWithoutId);
  return /* @__PURE__ */ React.createElement(RegisterGraphicalItemId, {
    id: externalId,
    type: "pie"
  }, (id) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SetPolarGraphicalItem, {
    type: "pie",
    id,
    data: propsWithoutId.data,
    dataKey: propsWithoutId.dataKey,
    hide: propsWithoutId.hide,
    angleAxisId: 0,
    radiusAxisId: 0,
    name: propsWithoutId.name,
    nameKey: propsWithoutId.nameKey,
    tooltipType: propsWithoutId.tooltipType,
    legendType: propsWithoutId.legendType,
    fill: propsWithoutId.fill,
    cx: propsWithoutId.cx,
    cy: propsWithoutId.cy,
    startAngle: propsWithoutId.startAngle,
    endAngle: propsWithoutId.endAngle,
    paddingAngle: propsWithoutId.paddingAngle,
    minAngle: propsWithoutId.minAngle,
    innerRadius: propsWithoutId.innerRadius,
    outerRadius: propsWithoutId.outerRadius,
    cornerRadius: propsWithoutId.cornerRadius,
    presentationProps,
    maxRadius: props.maxRadius
  }), /* @__PURE__ */ React.createElement(SetPiePayloadLegend, _extends$1({}, propsWithoutId, {
    id
  })), /* @__PURE__ */ React.createElement(PieImpl, _extends$1({}, propsWithoutId, {
    id
  }))));
}
var Pie = PieFn;
Pie.displayName = "Pie";
function ReportPolarOptions(props) {
  var dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updatePolarOptions(props));
  }, [dispatch, props]);
  return null;
}
var _excluded = ["layout"];
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
var defaultMargin = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};
var defaultPolarChartProps = _objectSpread$1({
  accessibilityLayer: true,
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: defaultMargin,
  reverseStackOrder: false,
  syncMethod: "index",
  layout: "radial",
  responsive: false,
  cx: "50%",
  cy: "50%",
  innerRadius: 0,
  outerRadius: "80%"
}, initialEventSettingsState);
var PolarChart = /* @__PURE__ */ forwardRef(function PolarChart2(props, ref) {
  var _polarChartProps$id;
  var polarChartProps = resolveDefaultProps(props.categoricalChartProps, defaultPolarChartProps);
  var {
    layout
  } = polarChartProps, otherCategoricalProps = _objectWithoutProperties(polarChartProps, _excluded);
  var {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher
  } = props;
  var options = {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ React.createElement(RechartsStoreProvider, {
    preloadedState: {
      options
    },
    reduxStoreName: (_polarChartProps$id = polarChartProps.id) !== null && _polarChartProps$id !== void 0 ? _polarChartProps$id : chartName
  }, /* @__PURE__ */ React.createElement(ChartDataContextProvider, {
    chartData: polarChartProps.data
  }), /* @__PURE__ */ React.createElement(ReportMainChartProps, {
    layout,
    margin: polarChartProps.margin
  }), /* @__PURE__ */ React.createElement(ReportEventSettings, {
    throttleDelay: polarChartProps.throttleDelay,
    throttledEvents: polarChartProps.throttledEvents
  }), /* @__PURE__ */ React.createElement(ReportChartProps, {
    baseValue: void 0,
    accessibilityLayer: polarChartProps.accessibilityLayer,
    barCategoryGap: polarChartProps.barCategoryGap,
    maxBarSize: polarChartProps.maxBarSize,
    stackOffset: polarChartProps.stackOffset,
    barGap: polarChartProps.barGap,
    barSize: polarChartProps.barSize,
    syncId: polarChartProps.syncId,
    syncMethod: polarChartProps.syncMethod,
    className: polarChartProps.className,
    reverseStackOrder: polarChartProps.reverseStackOrder
  }), /* @__PURE__ */ React.createElement(ReportPolarOptions, {
    cx: polarChartProps.cx,
    cy: polarChartProps.cy,
    startAngle: polarChartProps.startAngle,
    endAngle: polarChartProps.endAngle,
    innerRadius: polarChartProps.innerRadius,
    outerRadius: polarChartProps.outerRadius
  }), /* @__PURE__ */ React.createElement(CategoricalChart, _extends({}, otherCategoricalProps, {
    ref
  })));
});
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
var allowedTooltipTypes = ["item"];
var defaultPieChartProps = _objectSpread(_objectSpread({}, defaultPolarChartProps), {}, {
  layout: "centric",
  startAngle: 0,
  endAngle: 360
});
var PieChart = /* @__PURE__ */ forwardRef((props, ref) => {
  var propsWithDefaults = resolveDefaultProps(props, defaultPieChartProps);
  return /* @__PURE__ */ React.createElement(PolarChart, {
    chartName: "PieChart",
    defaultTooltipEventType: "item",
    validateTooltipEventTypes: allowedTooltipTypes,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: propsWithDefaults,
    ref
  });
});
const COLORS = ["#a8324a", "#c9a35a", "#0f412d", "#7a5ca8", "#3fa6b8"];
function CrisisInsights() {
  const { profileId } = useProfile();
  const [tab, setTab] = useState("overview");
  const { toast } = useToast();
  const { data: logs = [] } = useListCrisisLogs(
    { profileId },
    { query: { queryKey: getListCrisisLogsQueryKey({ profileId }), enabled: !!profileId } }
  );
  const { data: profile } = useGetProfile(profileId, { query: { enabled: !!profileId } });
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const { total, hospital, daysAffected, types, triggers } = useMemo(() => {
    const yearLogs = logs.filter((l) => l.occurredAt && new Date(l.occurredAt).getFullYear() === year);
    const total2 = yearLogs.length;
    const hospital2 = yearLogs.filter((l) => l.hospitalVisit).length;
    const daysAffected2 = new Set(yearLogs.map((l) => new Date(l.occurredAt).toDateString())).size;
    const typeMap = {};
    yearLogs.forEach((l) => {
      const key = l.hospitalVisit ? "Acute chest syndrome" : "Pain crisis";
      typeMap[key] = (typeMap[key] || 0) + 1;
    });
    const types2 = Object.entries(typeMap).map(([name, value]) => ({ name, value }));
    const trigMap = {};
    yearLogs.forEach((l) => (l.triggers || []).forEach((t) => {
      trigMap[t] = (trigMap[t] || 0) + 1;
    }));
    const triggers2 = Object.entries(trigMap).sort((a, b) => b[1] - a[1]).slice(0, 6);
    return { total: total2, hospital: hospital2, daysAffected: daysAffected2, types: types2, triggers: triggers2 };
  }, [logs, year]);
  const handleDownload = async () => {
    await exportCrisisReportToPdf({
      patientName: profile?.fullName,
      periodLabel: `This year (${year})`,
      include: { details: false, treatments: true, insights: true },
      logs
    });
    toast({ title: "Insights downloaded" });
  };
  const totalForPct = types.reduce((s, t) => s + t.value, 0) || 1;
  return /* @__PURE__ */ jsxs(MobileAppShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(SubPageHeader, { title: "Crisis Insights", back: "/crisis" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pb-10", children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 p-1 bg-muted rounded-full mb-6", children: ["overview", "trends"].map((t) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setTab(t),
          className: `py-2 text-sm font-semibold rounded-full transition-all capitalize ${tab === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`,
          children: t
        },
        t
      )) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3", children: [
          "This Year (",
          year,
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [
          { n: total, l: "Total crises" },
          { n: hospital, l: "Hospital visits" },
          { n: daysAffected, l: "Days in total" }
        ].map((s) => /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border/60 rounded-2xl p-3 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "font-serif text-2xl font-bold text-primary", children: s.n }),
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-1", children: s.l })
        ] }, s.l)) }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Crisis types" }),
        /* @__PURE__ */ jsx("div", { className: "bg-card border border-border/60 rounded-2xl p-4 mb-6", children: types.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No data yet" }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-32 h-32", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(PieChart, { children: [
            /* @__PURE__ */ jsx(Pie, { data: types, dataKey: "value", innerRadius: 36, outerRadius: 56, paddingAngle: 2, children: types.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
            /* @__PURE__ */ jsx(Tooltip, {})
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 space-y-2", children: types.map((t, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full", style: { background: COLORS[i % COLORS.length] } }),
              /* @__PURE__ */ jsx("span", { className: "text-foreground", children: t.name })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground font-medium", children: [
              Math.round(t.value / totalForPct * 100),
              "% (",
              t.value,
              ")"
            ] })
          ] }, t.name)) })
        ] }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-foreground mb-3", children: "Common triggers" }),
        /* @__PURE__ */ jsx("div", { className: "bg-card border border-border/60 rounded-2xl px-4 py-2 mb-6", children: triggers.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "No triggers logged yet" }) : triggers.map(([name, count]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-3 border-b border-border/50 last:border-0", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm text-foreground", children: name }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-muted-foreground", children: count })
        ] }, name)) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-6 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-foreground/80 leading-snug flex-1", children: "Share these insights with your care team to get better support." }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "sm", variant: "outline", className: "border-accent text-accent", children: /* @__PURE__ */ jsx(Link, { to: "/crisis/share", children: "Share" }) })
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "xl", className: "w-full", onClick: handleDownload, children: [
          /* @__PURE__ */ jsx(DownloadLinear, { size: 18 }),
          " Download PDF"
        ] })
      ] })
    ] })
  ] });
}
export {
  CrisisInsights as default
};
