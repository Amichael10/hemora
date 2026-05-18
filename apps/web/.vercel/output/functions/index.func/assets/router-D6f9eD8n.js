import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { isDangerousProtocol, exactPathTest, removeTrailingSlash, deepEqual, functionalUpdate, preloadWarning, BaseRootRoute, BaseRoute, isModuleNotFoundError, RouterCore, escapeHtml } from "@tanstack/router-core";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import React__default, { createElement, createContext, useRef, useLayoutEffect, useEffect, useContext, useId, useCallback, useMemo, Fragment as Fragment$1, useInsertionEffect, forwardRef, Component } from "react";
import invariant from "tiny-invariant";
import { d as dummyMatchContext, m as matchContext, u as useRouterState, a as useRouter, b as useForwardedRef, c as useHydrated, e as useIntersectionObserver, r as reactUse, O as Outlet } from "../server.js";
import { flushSync } from "react-dom";
import { isServer } from "@tanstack/router-core/isServer";
import Lottie from "lottie-react";
import posthog from "posthog-js";
import { PostHogProvider as PostHogProvider$1 } from "posthog-js/react/dist/esm/index.js";
import { getFeatureDefinitions, setFeatureDefinitions, isMotionValue, isControllingVariants, isVariantLabel, isForcedMotionValue, buildHTMLStyles, buildSVGAttrs, isSVGTag, resolveMotionValue, isVariantNode, isAnimationControls, resolveVariantFromProps, scrapeHTMLMotionValuesFromProps, scrapeSVGMotionValuesFromProps, optimizedAppearDataAttribute, SVGVisualElement, HTMLVisualElement, Feature, createAnimationState, resolveVariant, isPrimaryPointer, addDomEvent, frameData, frame, cancelFrame, mixNumber, calcLength, createBox, eachAxis, measurePageBox, convertBoxToBoundingBox, convertBoundingBoxToBox, addValueToWillChange, animateMotionValue, setDragLock, percent, resize, isElementTextInput, globalProjectionState, microtask, HTMLProjectionNode, hover, press } from "motion-dom";
import { pipe, secondsToMilliseconds, millisecondsToSeconds, progress, clamp, invariant as invariant$1, noop } from "motion-utils";
import { Html, Head, Preview, Body, Container, Section, Row, Column, Img, Text, Heading, Link as Link$1, Button, render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { Webhook } from "standardwebhooks";
import { Resend } from "resend";
import { s as supabaseAdmin, a as sendPushToUser, b as sendToSubscriptions } from "./push.server-BMx5QtSF.js";
import { z } from "zod";
function useMatch(opts) {
  const nearestMatchId = React.useContext(
    opts.from ? dummyMatchContext : matchContext
  );
  const matchSelection = useRouterState({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      invariant(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}
function useLoaderData(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}
function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return useMatch({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}
function useParams(opts) {
  return useMatch({
    from: opts.from,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    strict: opts.strict,
    select: (match) => {
      const params = opts.strict === false ? match.params : match._strictParams;
      return opts.select ? opts.select(params) : params;
    }
  });
}
function useSearch(opts) {
  return useMatch({
    from: opts.from,
    strict: opts.strict,
    shouldThrow: opts.shouldThrow,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}
function useNavigate(_defaultOpts) {
  const router2 = useRouter();
  return React.useCallback(
    (options) => {
      return router2.navigate({
        ...options,
        from: options.from ?? _defaultOpts?.from
      });
    },
    [_defaultOpts?.from, router2]
  );
}
function useRouteContext(opts) {
  return useMatch({
    ...opts,
    select: (match) => opts.select ? opts.select(match.context) : match.context
  });
}
function useLinkProps(options, forwardedRef) {
  const router2 = useRouter();
  const innerRef = useForwardedRef(forwardedRef);
  const _isServer = isServer ?? router2.isServer;
  const {
    // custom props
    activeProps,
    inactiveProps,
    activeOptions,
    to,
    preload: userPreload,
    preloadDelay: userPreloadDelay,
    hashScrollIntoView,
    replace,
    startTransition,
    resetScroll,
    viewTransition,
    // element props
    children,
    target,
    disabled,
    style,
    className,
    onClick,
    onBlur,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    onTouchStart,
    ignoreBlocker,
    // prevent these from being returned
    params: _params,
    search: _search,
    hash: _hash,
    state: _state,
    mask: _mask,
    reloadDocument: _reloadDocument,
    unsafeRelative: _unsafeRelative,
    from: _from,
    _fromLocation,
    ...propsSafeToSpread
  } = options;
  if (_isServer) {
    const safeInternal = isSafeInternal(to);
    if (typeof to === "string" && !safeInternal && // Quick checks to avoid `new URL` in common internal-like cases
    to.indexOf(":") > -1) {
      try {
        new URL(to);
        if (isDangerousProtocol(to, router2.protocolAllowlist)) {
          if (false) ;
          return {
            ...propsSafeToSpread,
            ref: innerRef,
            href: void 0,
            ...children && { children },
            ...target && { target },
            ...disabled && { disabled },
            ...style && { style },
            ...className && { className }
          };
        }
        return {
          ...propsSafeToSpread,
          ref: innerRef,
          href: to,
          ...children && { children },
          ...target && { target },
          ...disabled && { disabled },
          ...style && { style },
          ...className && { className }
        };
      } catch {
      }
    }
    const next2 = router2.buildLocation({ ...options, from: options.from });
    const hrefOptionPublicHref2 = next2.maskedLocation ? next2.maskedLocation.publicHref : next2.publicHref;
    const hrefOptionExternal2 = next2.maskedLocation ? next2.maskedLocation.external : next2.external;
    const hrefOption2 = getHrefOption(
      hrefOptionPublicHref2,
      hrefOptionExternal2,
      router2.history,
      disabled
    );
    const externalLink2 = (() => {
      if (hrefOption2?.external) {
        if (isDangerousProtocol(hrefOption2.href, router2.protocolAllowlist)) {
          return void 0;
        }
        return hrefOption2.href;
      }
      if (safeInternal) return void 0;
      if (typeof to === "string" && to.indexOf(":") > -1) {
        try {
          new URL(to);
          if (isDangerousProtocol(to, router2.protocolAllowlist)) {
            if (false) ;
            return void 0;
          }
          return to;
        } catch {
        }
      }
      return void 0;
    })();
    const isActive2 = (() => {
      if (externalLink2) return false;
      const currentLocation = router2.state.location;
      const exact = activeOptions?.exact ?? false;
      if (exact) {
        const testExact = exactPathTest(
          currentLocation.pathname,
          next2.pathname,
          router2.basepath
        );
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = removeTrailingSlash(
          currentLocation.pathname,
          router2.basepath
        );
        const nextPathSplit = removeTrailingSlash(
          next2.pathname,
          router2.basepath
        );
        const pathIsFuzzyEqual = currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/");
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      const includeSearch = activeOptions?.includeSearch ?? true;
      if (includeSearch) {
        if (currentLocation.search !== next2.search) {
          const currentSearchEmpty = !currentLocation.search || typeof currentLocation.search === "object" && Object.keys(currentLocation.search).length === 0;
          const nextSearchEmpty = !next2.search || typeof next2.search === "object" && Object.keys(next2.search).length === 0;
          if (!(currentSearchEmpty && nextSearchEmpty)) {
            const searchTest = deepEqual(currentLocation.search, next2.search, {
              partial: !exact,
              ignoreUndefined: !activeOptions?.explicitUndefined
            });
            if (!searchTest) {
              return false;
            }
          }
        }
      }
      if (activeOptions?.includeHash) {
        return false;
      }
      return true;
    })();
    if (externalLink2) {
      return {
        ...propsSafeToSpread,
        ref: innerRef,
        href: externalLink2,
        ...children && { children },
        ...target && { target },
        ...disabled && { disabled },
        ...style && { style },
        ...className && { className }
      };
    }
    const resolvedActiveProps2 = isActive2 ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
    const resolvedInactiveProps2 = isActive2 ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
    const resolvedStyle2 = (() => {
      const baseStyle = style;
      const activeStyle = resolvedActiveProps2.style;
      const inactiveStyle = resolvedInactiveProps2.style;
      if (!baseStyle && !activeStyle && !inactiveStyle) {
        return void 0;
      }
      if (baseStyle && !activeStyle && !inactiveStyle) {
        return baseStyle;
      }
      if (!baseStyle && activeStyle && !inactiveStyle) {
        return activeStyle;
      }
      if (!baseStyle && !activeStyle && inactiveStyle) {
        return inactiveStyle;
      }
      return {
        ...baseStyle,
        ...activeStyle,
        ...inactiveStyle
      };
    })();
    const resolvedClassName2 = (() => {
      const baseClassName = className;
      const activeClassName = resolvedActiveProps2.className;
      const inactiveClassName = resolvedInactiveProps2.className;
      if (!baseClassName && !activeClassName && !inactiveClassName) {
        return "";
      }
      let out = "";
      if (baseClassName) {
        out = baseClassName;
      }
      if (activeClassName) {
        out = out ? `${out} ${activeClassName}` : activeClassName;
      }
      if (inactiveClassName) {
        out = out ? `${out} ${inactiveClassName}` : inactiveClassName;
      }
      return out;
    })();
    return {
      ...propsSafeToSpread,
      ...resolvedActiveProps2,
      ...resolvedInactiveProps2,
      href: hrefOption2?.href,
      ref: innerRef,
      disabled: !!disabled,
      target,
      ...resolvedStyle2 && { style: resolvedStyle2 },
      ...resolvedClassName2 && { className: resolvedClassName2 },
      ...disabled && STATIC_DISABLED_PROPS,
      ...isActive2 && STATIC_ACTIVE_PROPS
    };
  }
  const isHydrated = useHydrated();
  const currentLocationState = useRouterState({
    select: (s) => {
      const leaf = s.matches[s.matches.length - 1];
      return {
        search: leaf?.search,
        hash: s.location.hash,
        path: leaf?.pathname
        // path + params
      };
    },
    structuralSharing: true
  });
  const from = options.from;
  const _options = React.useMemo(
    () => {
      return { ...options, from };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      router2,
      currentLocationState,
      from,
      options._fromLocation,
      options.hash,
      options.to,
      options.search,
      options.params,
      options.state,
      options.mask,
      options.unsafeRelative
    ]
  );
  const next = React.useMemo(
    () => router2.buildLocation({ ..._options }),
    [router2, _options]
  );
  const hrefOptionPublicHref = next.maskedLocation ? next.maskedLocation.publicHref : next.publicHref;
  const hrefOptionExternal = next.maskedLocation ? next.maskedLocation.external : next.external;
  const hrefOption = React.useMemo(
    () => getHrefOption(
      hrefOptionPublicHref,
      hrefOptionExternal,
      router2.history,
      disabled
    ),
    [disabled, hrefOptionExternal, hrefOptionPublicHref, router2.history]
  );
  const externalLink = React.useMemo(() => {
    if (hrefOption?.external) {
      if (isDangerousProtocol(hrefOption.href, router2.protocolAllowlist)) {
        return void 0;
      }
      return hrefOption.href;
    }
    const safeInternal = isSafeInternal(to);
    if (safeInternal) return void 0;
    if (typeof to !== "string" || to.indexOf(":") === -1) return void 0;
    try {
      new URL(to);
      if (isDangerousProtocol(to, router2.protocolAllowlist)) {
        if (false) ;
        return void 0;
      }
      return to;
    } catch {
    }
    return void 0;
  }, [to, hrefOption, router2.protocolAllowlist]);
  const isActive = useRouterState({
    select: (s) => {
      if (externalLink) return false;
      if (activeOptions?.exact) {
        const testExact = exactPathTest(
          s.location.pathname,
          next.pathname,
          router2.basepath
        );
        if (!testExact) {
          return false;
        }
      } else {
        const currentPathSplit = removeTrailingSlash(
          s.location.pathname,
          router2.basepath
        );
        const nextPathSplit = removeTrailingSlash(
          next.pathname,
          router2.basepath
        );
        const pathIsFuzzyEqual = currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/");
        if (!pathIsFuzzyEqual) {
          return false;
        }
      }
      if (activeOptions?.includeSearch ?? true) {
        const searchTest = deepEqual(s.location.search, next.search, {
          partial: !activeOptions?.exact,
          ignoreUndefined: !activeOptions?.explicitUndefined
        });
        if (!searchTest) {
          return false;
        }
      }
      if (activeOptions?.includeHash) {
        return isHydrated && s.location.hash === next.hash;
      }
      return true;
    }
  });
  const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
  const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
  const resolvedClassName = [
    className,
    resolvedActiveProps.className,
    resolvedInactiveProps.className
  ].filter(Boolean).join(" ");
  const resolvedStyle = (style || resolvedActiveProps.style || resolvedInactiveProps.style) && {
    ...style,
    ...resolvedActiveProps.style,
    ...resolvedInactiveProps.style
  };
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const hasRenderFetched = React.useRef(false);
  const preload = options.reloadDocument || externalLink ? false : userPreload ?? router2.options.defaultPreload;
  const preloadDelay = userPreloadDelay ?? router2.options.defaultPreloadDelay ?? 0;
  const doPreload = React.useCallback(() => {
    router2.preloadRoute({ ..._options, _builtLocation: next }).catch((err) => {
      console.warn(err);
      console.warn(preloadWarning);
    });
  }, [router2, _options, next]);
  const preloadViewportIoCallback = React.useCallback(
    (entry) => {
      if (entry?.isIntersecting) {
        doPreload();
      }
    },
    [doPreload]
  );
  useIntersectionObserver(
    innerRef,
    preloadViewportIoCallback,
    intersectionObserverOptions,
    { disabled: !!disabled || !(preload === "viewport") }
  );
  React.useEffect(() => {
    if (hasRenderFetched.current) {
      return;
    }
    if (!disabled && preload === "render") {
      doPreload();
      hasRenderFetched.current = true;
    }
  }, [disabled, doPreload, preload]);
  const handleClick = (e) => {
    const elementTarget = e.currentTarget.getAttribute("target");
    const effectiveTarget = target !== void 0 ? target : elementTarget;
    if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
      e.preventDefault();
      flushSync(() => {
        setIsTransitioning(true);
      });
      const unsub = router2.subscribe("onResolved", () => {
        unsub();
        setIsTransitioning(false);
      });
      router2.navigate({
        ..._options,
        replace,
        resetScroll,
        hashScrollIntoView,
        startTransition,
        viewTransition,
        ignoreBlocker
      });
    }
  };
  if (externalLink) {
    return {
      ...propsSafeToSpread,
      ref: innerRef,
      href: externalLink,
      ...children && { children },
      ...target && { target },
      ...disabled && { disabled },
      ...style && { style },
      ...className && { className },
      ...onClick && { onClick },
      ...onBlur && { onBlur },
      ...onFocus && { onFocus },
      ...onMouseEnter && { onMouseEnter },
      ...onMouseLeave && { onMouseLeave },
      ...onTouchStart && { onTouchStart }
    };
  }
  const enqueueIntentPreload = (e) => {
    if (disabled || preload !== "intent") return;
    if (!preloadDelay) {
      doPreload();
      return;
    }
    const eventTarget = e.currentTarget;
    if (timeoutMap.has(eventTarget)) {
      return;
    }
    const id2 = setTimeout(() => {
      timeoutMap.delete(eventTarget);
      doPreload();
    }, preloadDelay);
    timeoutMap.set(eventTarget, id2);
  };
  const handleTouchStart = (_) => {
    if (disabled || preload !== "intent") return;
    doPreload();
  };
  const handleLeave = (e) => {
    if (disabled || !preload || !preloadDelay) return;
    const eventTarget = e.currentTarget;
    const id2 = timeoutMap.get(eventTarget);
    if (id2) {
      clearTimeout(id2);
      timeoutMap.delete(eventTarget);
    }
  };
  return {
    ...propsSafeToSpread,
    ...resolvedActiveProps,
    ...resolvedInactiveProps,
    href: hrefOption?.href,
    ref: innerRef,
    onClick: composeHandlers([onClick, handleClick]),
    onBlur: composeHandlers([onBlur, handleLeave]),
    onFocus: composeHandlers([onFocus, enqueueIntentPreload]),
    onMouseEnter: composeHandlers([onMouseEnter, enqueueIntentPreload]),
    onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
    onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
    disabled: !!disabled,
    target,
    ...resolvedStyle && { style: resolvedStyle },
    ...resolvedClassName && { className: resolvedClassName },
    ...disabled && STATIC_DISABLED_PROPS,
    ...isActive && STATIC_ACTIVE_PROPS,
    ...isHydrated && isTransitioning && STATIC_TRANSITIONING_PROPS
  };
}
const STATIC_EMPTY_OBJECT = {};
const STATIC_ACTIVE_OBJECT = { className: "active" };
const STATIC_DISABLED_PROPS = { role: "link", "aria-disabled": true };
const STATIC_ACTIVE_PROPS = { "data-status": "active", "aria-current": "page" };
const STATIC_TRANSITIONING_PROPS = { "data-transitioning": "transitioning" };
const timeoutMap = /* @__PURE__ */ new WeakMap();
const intersectionObserverOptions = {
  rootMargin: "100px"
};
const composeHandlers = (handlers) => (e) => {
  for (const handler of handlers) {
    if (!handler) continue;
    if (e.defaultPrevented) return;
    handler(e);
  }
};
function getHrefOption(publicHref, external, history, disabled) {
  if (disabled) return void 0;
  if (external) {
    return { href: publicHref, external: true };
  }
  return {
    href: history.createHref(publicHref) || "/",
    external: false
  };
}
function isSafeInternal(to) {
  if (typeof to !== "string") return false;
  const zero = to.charCodeAt(0);
  if (zero === 47) return to.charCodeAt(1) !== 47;
  return zero === 46;
}
const Link = React.forwardRef(
  (props2, ref) => {
    const { _asChild, ...rest } = props2;
    const { type: _type, ...linkProps } = useLinkProps(rest, ref);
    const children = typeof rest.children === "function" ? rest.children({
      isActive: linkProps["data-status"] === "active"
    }) : rest.children;
    if (!_asChild) {
      const { disabled: _, ...rest2 } = linkProps;
      return React.createElement("a", rest2, children);
    }
    return React.createElement(_asChild, linkProps, children);
  }
);
function isCtrlEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
let Route$9 = class Route extends BaseRoute {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({ ...opts, from: this.id });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React__default.forwardRef(
      (props2, ref) => {
        return /* @__PURE__ */ jsx(Link, { ref, from: this.fullPath, ...props2 });
      }
    );
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
};
function createRoute(options) {
  return new Route$9(
    // TODO: Help us TypeChris, you're our only hope!
    options
  );
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
class RootRoute extends BaseRootRoute {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
    this.useMatch = (opts) => {
      return useMatch({
        select: opts?.select,
        from: this.id,
        structuralSharing: opts?.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return useRouteContext({ ...opts, from: this.id });
    };
    this.useSearch = (opts) => {
      return useSearch({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return useParams({
        select: opts?.select,
        structuralSharing: opts?.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return useLoaderDeps({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return useLoaderData({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return useNavigate({ from: this.fullPath });
    };
    this.Link = React__default.forwardRef(
      (props2, ref) => {
        return /* @__PURE__ */ jsx(Link, { ref, from: this.fullPath, ...props2 });
      }
    );
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createFileRoute(path) {
  if (typeof path === "object") {
    return new FileRoute(path, {
      silent: true
    }).createRoute(path);
  }
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      const route = createRoute(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts?.silent;
  }
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return useMatch({
        select: opts2?.select,
        from: this.options.id,
        structuralSharing: opts2?.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return useRouteContext({ ...opts2, from: this.options.id });
    };
    this.useSearch = (opts2) => {
      return useSearch({
        select: opts2?.select,
        structuralSharing: opts2?.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return useParams({
        select: opts2?.select,
        structuralSharing: opts2?.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return useLoaderDeps({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return useLoaderData({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      const router2 = useRouter();
      return useNavigate({ from: router2.routesById[this.options.id].fullPath });
    };
    this.options = opts;
    this.$$typeof = /* @__PURE__ */ Symbol.for("react.memo");
  }
}
function createLazyFileRoute(id2) {
  if (typeof id2 === "object") {
    return new LazyRoute(id2);
  }
  return (opts) => new LazyRoute({ id: id2, ...opts });
}
function lazyRouteComponent(importer, exportName) {
  let loadPromise;
  let comp;
  let error;
  let reload;
  const load = () => {
    if (!loadPromise) {
      loadPromise = importer().then((res) => {
        loadPromise = void 0;
        comp = res[exportName];
      }).catch((err) => {
        error = err;
        if (isModuleNotFoundError(error)) {
          if (error instanceof Error && typeof window !== "undefined" && typeof sessionStorage !== "undefined") {
            const storageKey = `tanstack_router_reload:${error.message}`;
            if (!sessionStorage.getItem(storageKey)) {
              sessionStorage.setItem(storageKey, "1");
              reload = true;
            }
          }
        }
      });
    }
    return loadPromise;
  };
  const lazyComp = function Lazy(props2) {
    if (reload) {
      window.location.reload();
      throw new Promise(() => {
      });
    }
    if (error) {
      throw error;
    }
    if (!comp) {
      if (reactUse) {
        reactUse(load());
      } else {
        throw load();
      }
    }
    return React.createElement(comp, props2);
  };
  lazyComp.preload = load;
  return lazyComp;
}
const createRouter = (options) => {
  return new Router(options);
};
class Router extends RouterCore {
  constructor(options) {
    super(options);
  }
}
if (typeof globalThis !== "undefined") {
  globalThis.createFileRoute = createFileRoute;
  globalThis.createLazyFileRoute = createLazyFileRoute;
} else if (typeof window !== "undefined") {
  window.createFileRoute = createFileRoute;
  window.createLazyFileRoute = createLazyFileRoute;
}
function Asset({
  tag,
  attrs,
  children,
  nonce
}) {
  switch (tag) {
    case "title":
      return /* @__PURE__ */ jsx("title", { ...attrs, suppressHydrationWarning: true, children });
    case "meta":
      return /* @__PURE__ */ jsx("meta", { ...attrs, suppressHydrationWarning: true });
    case "link":
      return /* @__PURE__ */ jsx("link", { ...attrs, nonce, suppressHydrationWarning: true });
    case "style":
      return /* @__PURE__ */ jsx(
        "style",
        {
          ...attrs,
          dangerouslySetInnerHTML: { __html: children },
          nonce
        }
      );
    case "script":
      return /* @__PURE__ */ jsx(Script, { attrs, children });
    default:
      return null;
  }
}
function Script({
  attrs,
  children
}) {
  const router2 = useRouter();
  const hydrated = useHydrated();
  const dataScript = typeof attrs?.type === "string" && attrs.type !== "" && attrs.type !== "text/javascript" && attrs.type !== "module";
  React.useEffect(() => {
    if (dataScript) return;
    if (attrs?.src) {
      const normSrc = (() => {
        try {
          const base = document.baseURI || window.location.href;
          return new URL(attrs.src, base).href;
        } catch {
          return attrs.src;
        }
      })();
      const existingScript = Array.from(
        document.querySelectorAll("script[src]")
      ).find((el) => el.src === normSrc);
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      for (const [key, value] of Object.entries(attrs)) {
        if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) {
          script.setAttribute(
            key,
            typeof value === "boolean" ? "" : String(value)
          );
        }
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
    if (typeof children === "string") {
      const typeAttr = typeof attrs?.type === "string" ? attrs.type : "text/javascript";
      const nonceAttr = typeof attrs?.nonce === "string" ? attrs.nonce : void 0;
      const existingScript = Array.from(
        document.querySelectorAll("script:not([src])")
      ).find((el) => {
        if (!(el instanceof HTMLScriptElement)) return false;
        const sType = el.getAttribute("type") ?? "text/javascript";
        const sNonce = el.getAttribute("nonce") ?? void 0;
        return el.textContent === children && sType === typeAttr && sNonce === nonceAttr;
      });
      if (existingScript) {
        return;
      }
      const script = document.createElement("script");
      script.textContent = children;
      if (attrs) {
        for (const [key, value] of Object.entries(attrs)) {
          if (key !== "suppressHydrationWarning" && value !== void 0 && value !== false) {
            script.setAttribute(
              key,
              typeof value === "boolean" ? "" : String(value)
            );
          }
        }
      }
      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
    return void 0;
  }, [attrs, children, dataScript]);
  if (isServer ?? router2.isServer) {
    if (attrs?.src) {
      return /* @__PURE__ */ jsx("script", { ...attrs, suppressHydrationWarning: true });
    }
    if (typeof children === "string") {
      return /* @__PURE__ */ jsx(
        "script",
        {
          ...attrs,
          dangerouslySetInnerHTML: { __html: children },
          suppressHydrationWarning: true
        }
      );
    }
    return null;
  }
  if (dataScript && typeof children === "string") {
    return /* @__PURE__ */ jsx(
      "script",
      {
        ...attrs,
        suppressHydrationWarning: true,
        dangerouslySetInnerHTML: { __html: children }
      }
    );
  }
  if (!hydrated) {
    if (attrs?.src) {
      return /* @__PURE__ */ jsx("script", { ...attrs, suppressHydrationWarning: true });
    }
    if (typeof children === "string") {
      return /* @__PURE__ */ jsx(
        "script",
        {
          ...attrs,
          dangerouslySetInnerHTML: { __html: children },
          suppressHydrationWarning: true
        }
      );
    }
  }
  return null;
}
const useTags = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const routeMeta = useRouterState({
    select: (state) => {
      return state.matches.map((match) => match.meta).filter(Boolean);
    }
  });
  const meta = React.useMemo(() => {
    const resultMeta = [];
    const metaByAttribute = {};
    let title;
    for (let i = routeMeta.length - 1; i >= 0; i--) {
      const metas = routeMeta[i];
      for (let j = metas.length - 1; j >= 0; j--) {
        const m = metas[j];
        if (!m) continue;
        if (m.title) {
          if (!title) {
            title = {
              tag: "title",
              children: m.title
            };
          }
        } else if ("script:ld+json" in m) {
          try {
            const json = JSON.stringify(m["script:ld+json"]);
            resultMeta.push({
              tag: "script",
              attrs: {
                type: "application/ld+json"
              },
              children: escapeHtml(json)
            });
          } catch {
          }
        } else {
          const attribute = m.name ?? m.property;
          if (attribute) {
            if (metaByAttribute[attribute]) {
              continue;
            } else {
              metaByAttribute[attribute] = true;
            }
          }
          resultMeta.push({
            tag: "meta",
            attrs: {
              ...m,
              nonce
            }
          });
        }
      }
    }
    if (title) {
      resultMeta.push(title);
    }
    if (nonce) {
      resultMeta.push({
        tag: "meta",
        attrs: {
          property: "csp-nonce",
          content: nonce
        }
      });
    }
    resultMeta.reverse();
    return resultMeta;
  }, [routeMeta, nonce]);
  const links = useRouterState({
    select: (state) => {
      const constructed = state.matches.map((match) => match.links).filter(Boolean).flat(1).map((link) => ({
        tag: "link",
        attrs: {
          ...link,
          nonce
        }
      }));
      const manifest = router2.ssr?.manifest;
      const assets2 = state.matches.map((match) => manifest?.routes[match.routeId]?.assets ?? []).filter(Boolean).flat(1).filter((asset) => asset.tag === "link").map(
        (asset) => ({
          tag: "link",
          attrs: {
            ...asset.attrs,
            suppressHydrationWarning: true,
            nonce
          }
        })
      );
      return [...constructed, ...assets2];
    },
    structuralSharing: true
  });
  const preloadLinks = useRouterState({
    select: (state) => {
      const preloadLinks2 = [];
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach(
        (route) => router2.ssr?.manifest?.routes[route.id]?.preloads?.filter(Boolean).forEach((preload) => {
          preloadLinks2.push({
            tag: "link",
            attrs: {
              rel: "modulepreload",
              href: preload,
              nonce
            }
          });
        })
      );
      return preloadLinks2;
    },
    structuralSharing: true
  });
  const styles2 = useRouterState({
    select: (state) => state.matches.map((match) => match.styles).flat(1).filter(Boolean).map(({ children, ...attrs }) => ({
      tag: "style",
      attrs: {
        ...attrs,
        nonce
      },
      children
    })),
    structuralSharing: true
  });
  const headScripts = useRouterState({
    select: (state) => state.matches.map((match) => match.headScripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
      tag: "script",
      attrs: {
        ...script,
        nonce
      },
      children
    })),
    structuralSharing: true
  });
  return uniqBy(
    [
      ...meta,
      ...preloadLinks,
      ...links,
      ...styles2,
      ...headScripts
    ],
    (d) => {
      return JSON.stringify(d);
    }
  );
};
function uniqBy(arr, fn) {
  const seen = /* @__PURE__ */ new Set();
  return arr.filter((item) => {
    const key = fn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
function HeadContent() {
  const tags = useTags();
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  return /* @__PURE__ */ jsx(Fragment, { children: tags.map((tag) => /* @__PURE__ */ createElement(Asset, { ...tag, key: `tsr-meta-${JSON.stringify(tag)}`, nonce })) });
}
const Scripts = () => {
  const router2 = useRouter();
  const nonce = router2.options.ssr?.nonce;
  const assetScripts = useRouterState({
    select: (state) => {
      const assetScripts2 = [];
      const manifest = router2.ssr?.manifest;
      if (!manifest) {
        return [];
      }
      state.matches.map((match) => router2.looseRoutesById[match.routeId]).forEach(
        (route) => manifest.routes[route.id]?.assets?.filter((d) => d.tag === "script").forEach((asset) => {
          assetScripts2.push({
            tag: "script",
            attrs: { ...asset.attrs, nonce },
            children: asset.children
          });
        })
      );
      return assetScripts2;
    },
    structuralSharing: true
  });
  const { scripts } = useRouterState({
    select: (state) => ({
      scripts: state.matches.map((match) => match.scripts).flat(1).filter(Boolean).map(({ children, ...script }) => ({
        tag: "script",
        attrs: {
          ...script,
          suppressHydrationWarning: true,
          nonce
        },
        children
      }))
    }),
    structuralSharing: true
  });
  let serverBufferedScript = void 0;
  if (router2.serverSsr) {
    serverBufferedScript = router2.serverSsr.takeBufferedScripts();
  }
  const allScripts = [...scripts, ...assetScripts];
  if (serverBufferedScript) {
    allScripts.unshift(serverBufferedScript);
  }
  return /* @__PURE__ */ jsx(Fragment, { children: allScripts.map((asset, i) => /* @__PURE__ */ createElement(Asset, { ...asset, key: `tsr-scripts-${asset.tag}-${i}` })) });
};
const appCss = "/assets/styles-Dd_zWImM.css";
const LayoutGroupContext = createContext({});
function useConstant(init) {
  const ref = useRef(null);
  if (ref.current === null) {
    ref.current = init();
  }
  return ref.current;
}
const isBrowser = typeof window !== "undefined";
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;
const PresenceContext = /* @__PURE__ */ createContext(null);
const MotionConfigContext = createContext({
  transformPagePoint: (p) => p,
  isStatic: false,
  reducedMotion: "never"
});
function usePresence(subscribe = true) {
  const context = useContext(PresenceContext);
  if (context === null)
    return [true, null];
  const { isPresent, onExitComplete, register } = context;
  const id2 = useId();
  useEffect(() => {
    if (subscribe) {
      return register(id2);
    }
  }, [subscribe]);
  const safeToRemove = useCallback(() => subscribe && onExitComplete && onExitComplete(id2), [id2, onExitComplete, subscribe]);
  return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
const LazyContext = createContext({ strict: false });
const featureProps = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let isInitialized = false;
function initFeatureDefinitions() {
  if (isInitialized)
    return;
  const initialFeatureDefinitions = {};
  for (const key in featureProps) {
    initialFeatureDefinitions[key] = {
      isEnabled: (props2) => featureProps[key].some((name) => !!props2[name])
    };
  }
  setFeatureDefinitions(initialFeatureDefinitions);
  isInitialized = true;
}
function getInitializedFeatureDefinitions() {
  initFeatureDefinitions();
  return getFeatureDefinitions();
}
function loadFeatures(features) {
  const featureDefinitions = getInitializedFeatureDefinitions();
  for (const key in features) {
    featureDefinitions[key] = {
      ...featureDefinitions[key],
      ...features[key]
    };
  }
  setFeatureDefinitions(featureDefinitions);
}
const validMotionProps = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function isValidMotionProp(key) {
  return key.startsWith("while") || key.startsWith("drag") && key !== "draggable" || key.startsWith("layout") || key.startsWith("onTap") || key.startsWith("onPan") || key.startsWith("onLayout") || validMotionProps.has(key);
}
let shouldForward = (key) => !isValidMotionProp(key);
function loadExternalIsValidProp(isValidProp) {
  if (typeof isValidProp !== "function")
    return;
  shouldForward = (key) => key.startsWith("on") ? !isValidMotionProp(key) : isValidProp(key);
}
try {
  const emotionPkg = "@emotion/is-prop-valid";
  loadExternalIsValidProp(require(emotionPkg).default);
} catch {
}
function filterProps(props2, isDom, forwardMotionProps) {
  const filteredProps = {};
  for (const key in props2) {
    if (key === "values" && typeof props2.values === "object")
      continue;
    if (isMotionValue(props2[key]))
      continue;
    if (shouldForward(key) || forwardMotionProps === true && isValidMotionProp(key) || !isDom && !isValidMotionProp(key) || // If trying to use native HTML drag events, forward drag listeners
    props2["draggable"] && key.startsWith("onDrag")) {
      filteredProps[key] = props2[key];
    }
  }
  return filteredProps;
}
const MotionContext = /* @__PURE__ */ createContext({});
function getCurrentTreeVariants(props2, context) {
  if (isControllingVariants(props2)) {
    const { initial, animate } = props2;
    return {
      initial: initial === false || isVariantLabel(initial) ? initial : void 0,
      animate: isVariantLabel(animate) ? animate : void 0
    };
  }
  return props2.inherit !== false ? context : {};
}
function useCreateMotionContext(props2) {
  const { initial, animate } = getCurrentTreeVariants(props2, useContext(MotionContext));
  return useMemo(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
  return Array.isArray(prop) ? prop.join(" ") : prop;
}
const createHtmlRenderState = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function copyRawValuesOnly(target, source, props2) {
  for (const key in source) {
    if (!isMotionValue(source[key]) && !isForcedMotionValue(key, props2)) {
      target[key] = source[key];
    }
  }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
  return useMemo(() => {
    const state = createHtmlRenderState();
    buildHTMLStyles(state, visualState, transformTemplate);
    return Object.assign({}, state.vars, state.style);
  }, [visualState]);
}
function useStyle(props2, visualState) {
  const styleProp = props2.style || {};
  const style = {};
  copyRawValuesOnly(style, styleProp, props2);
  Object.assign(style, useInitialMotionValues(props2, visualState));
  return style;
}
function useHTMLProps(props2, visualState) {
  const htmlProps = {};
  const style = useStyle(props2, visualState);
  if (props2.drag && props2.dragListener !== false) {
    htmlProps.draggable = false;
    style.userSelect = style.WebkitUserSelect = style.WebkitTouchCallout = "none";
    style.touchAction = props2.drag === true ? "none" : `pan-${props2.drag === "x" ? "y" : "x"}`;
  }
  if (props2.tabIndex === void 0 && (props2.onTap || props2.onTapStart || props2.whileTap)) {
    htmlProps.tabIndex = 0;
  }
  htmlProps.style = style;
  return htmlProps;
}
const createSvgRenderState = () => ({
  ...createHtmlRenderState(),
  attrs: {}
});
function useSVGProps(props2, visualState, _isStatic, Component2) {
  const visualProps = useMemo(() => {
    const state = createSvgRenderState();
    buildSVGAttrs(state, visualState, isSVGTag(Component2), props2.transformTemplate, props2.style);
    return {
      ...state.attrs,
      style: { ...state.style }
    };
  }, [visualState]);
  if (props2.style) {
    const rawStyles = {};
    copyRawValuesOnly(rawStyles, props2.style, props2);
    visualProps.style = { ...rawStyles, ...visualProps.style };
  }
  return visualProps;
}
const lowercaseSVGElements = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function isSVGComponent(Component2) {
  if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component2 !== "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    Component2.includes("-")
  ) {
    return false;
  } else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    lowercaseSVGElements.indexOf(Component2) > -1 || /**
     * If it contains a capital letter, it's an SVG component
     */
    /[A-Z]/u.test(Component2)
  ) {
    return true;
  }
  return false;
}
function useRender(Component2, props2, ref, { latestValues }, isStatic, forwardMotionProps = false, isSVG) {
  const useVisualProps = isSVG ?? isSVGComponent(Component2) ? useSVGProps : useHTMLProps;
  const visualProps = useVisualProps(props2, latestValues, isStatic, Component2);
  const filteredProps = filterProps(props2, typeof Component2 === "string", forwardMotionProps);
  const elementProps = Component2 !== Fragment$1 ? { ...filteredProps, ...visualProps, ref } : {};
  const { children } = props2;
  const renderedChildren = useMemo(() => isMotionValue(children) ? children.get() : children, [children]);
  return createElement(Component2, {
    ...elementProps,
    children: renderedChildren
  });
}
function makeState({ scrapeMotionValuesFromProps, createRenderState }, props2, context, presenceContext) {
  const state = {
    latestValues: makeLatestValues(props2, context, presenceContext, scrapeMotionValuesFromProps),
    renderState: createRenderState()
  };
  return state;
}
function makeLatestValues(props2, context, presenceContext, scrapeMotionValues) {
  const values = {};
  const motionValues = scrapeMotionValues(props2, {});
  for (const key in motionValues) {
    values[key] = resolveMotionValue(motionValues[key]);
  }
  let { initial, animate } = props2;
  const isControllingVariants$1 = isControllingVariants(props2);
  const isVariantNode$1 = isVariantNode(props2);
  if (context && isVariantNode$1 && !isControllingVariants$1 && props2.inherit !== false) {
    if (initial === void 0)
      initial = context.initial;
    if (animate === void 0)
      animate = context.animate;
  }
  let isInitialAnimationBlocked = presenceContext ? presenceContext.initial === false : false;
  isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
  const variantToSet = isInitialAnimationBlocked ? animate : initial;
  if (variantToSet && typeof variantToSet !== "boolean" && !isAnimationControls(variantToSet)) {
    const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
    for (let i = 0; i < list.length; i++) {
      const resolved = resolveVariantFromProps(props2, list[i]);
      if (resolved) {
        const { transitionEnd, transition, ...target } = resolved;
        for (const key in target) {
          let valueTarget = target[key];
          if (Array.isArray(valueTarget)) {
            const index = isInitialAnimationBlocked ? valueTarget.length - 1 : 0;
            valueTarget = valueTarget[index];
          }
          if (valueTarget !== null) {
            values[key] = valueTarget;
          }
        }
        for (const key in transitionEnd) {
          values[key] = transitionEnd[key];
        }
      }
    }
  }
  return values;
}
const makeUseVisualState = (config) => (props2, isStatic) => {
  const context = useContext(MotionContext);
  const presenceContext = useContext(PresenceContext);
  const make = () => makeState(config, props2, context, presenceContext);
  return isStatic ? make() : useConstant(make);
};
const useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
  scrapeMotionValuesFromProps: scrapeHTMLMotionValuesFromProps,
  createRenderState: createHtmlRenderState
});
const useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
  scrapeMotionValuesFromProps: scrapeSVGMotionValuesFromProps,
  createRenderState: createSvgRenderState
});
const motionComponentSymbol = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function useMotionRef(visualState, visualElement, externalRef) {
  const externalRefContainer = useRef(externalRef);
  useInsertionEffect(() => {
    externalRefContainer.current = externalRef;
  });
  const refCleanup = useRef(null);
  return useCallback((instance) => {
    if (instance) {
      visualState.onMount?.(instance);
    }
    const ref = externalRefContainer.current;
    if (typeof ref === "function") {
      if (instance) {
        const cleanup = ref(instance);
        if (typeof cleanup === "function") {
          refCleanup.current = cleanup;
        }
      } else if (refCleanup.current) {
        refCleanup.current();
        refCleanup.current = null;
      } else {
        ref(instance);
      }
    } else if (ref) {
      ref.current = instance;
    }
    if (visualElement) {
      instance ? visualElement.mount(instance) : visualElement.unmount();
    }
  }, [visualElement]);
}
const SwitchLayoutGroupContext = createContext({});
function isRefObject(ref) {
  return ref && typeof ref === "object" && Object.prototype.hasOwnProperty.call(ref, "current");
}
function useVisualElement(Component2, visualState, props2, createVisualElement, ProjectionNodeConstructor, isSVG) {
  const { visualElement: parent } = useContext(MotionContext);
  const lazyContext = useContext(LazyContext);
  const presenceContext = useContext(PresenceContext);
  const motionConfig = useContext(MotionConfigContext);
  const reducedMotionConfig = motionConfig.reducedMotion;
  const skipAnimations = motionConfig.skipAnimations;
  const visualElementRef = useRef(null);
  const hasMountedOnce = useRef(false);
  createVisualElement = createVisualElement || lazyContext.renderer;
  if (!visualElementRef.current && createVisualElement) {
    visualElementRef.current = createVisualElement(Component2, {
      visualState,
      parent,
      props: props2,
      presenceContext,
      blockInitialAnimation: presenceContext ? presenceContext.initial === false : false,
      reducedMotionConfig,
      skipAnimations,
      isSVG
    });
    if (hasMountedOnce.current && visualElementRef.current) {
      visualElementRef.current.manuallyAnimateOnMount = true;
    }
  }
  const visualElement = visualElementRef.current;
  const initialLayoutGroupConfig = useContext(SwitchLayoutGroupContext);
  if (visualElement && !visualElement.projection && ProjectionNodeConstructor && (visualElement.type === "html" || visualElement.type === "svg")) {
    createProjectionNode(visualElementRef.current, props2, ProjectionNodeConstructor, initialLayoutGroupConfig);
  }
  const isMounted = useRef(false);
  useInsertionEffect(() => {
    if (visualElement && isMounted.current) {
      visualElement.update(props2, presenceContext);
    }
  });
  const optimisedAppearId = props2[optimizedAppearDataAttribute];
  const wantsHandoff = useRef(Boolean(optimisedAppearId) && typeof window !== "undefined" && !window.MotionHandoffIsComplete?.(optimisedAppearId) && window.MotionHasOptimisedAnimation?.(optimisedAppearId));
  useIsomorphicLayoutEffect(() => {
    hasMountedOnce.current = true;
    if (!visualElement)
      return;
    isMounted.current = true;
    window.MotionIsMounted = true;
    visualElement.updateFeatures();
    visualElement.scheduleRenderMicrotask();
    if (wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
  });
  useEffect(() => {
    if (!visualElement)
      return;
    if (!wantsHandoff.current && visualElement.animationState) {
      visualElement.animationState.animateChanges();
    }
    if (wantsHandoff.current) {
      queueMicrotask(() => {
        window.MotionHandoffMarkAsComplete?.(optimisedAppearId);
      });
      wantsHandoff.current = false;
    }
    visualElement.enteringChildren = void 0;
  });
  return visualElement;
}
function createProjectionNode(visualElement, props2, ProjectionNodeConstructor, initialPromotionConfig) {
  const { layoutId, layout: layout2, drag: drag2, dragConstraints, layoutScroll, layoutRoot, layoutAnchor, layoutCrossfade } = props2;
  visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props2["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(visualElement.parent));
  visualElement.projection.setOptions({
    layoutId,
    layout: layout2,
    alwaysMeasureLayout: Boolean(drag2) || dragConstraints && isRefObject(dragConstraints),
    visualElement,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof layout2 === "string" ? layout2 : "both",
    initialPromotionConfig,
    crossfade: layoutCrossfade,
    layoutScroll,
    layoutRoot,
    layoutAnchor
  });
}
function getClosestProjectingNode(visualElement) {
  if (!visualElement)
    return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
function createMotionComponent(Component2, { forwardMotionProps = false, type } = {}, preloadedFeatures, createVisualElement) {
  preloadedFeatures && loadFeatures(preloadedFeatures);
  const isSVG = type ? type === "svg" : isSVGComponent(Component2);
  const useVisualState = isSVG ? useSVGVisualState : useHTMLVisualState;
  function MotionDOMComponent(props2, externalRef) {
    let MeasureLayout2;
    const configAndProps = {
      ...useContext(MotionConfigContext),
      ...props2,
      layoutId: useLayoutId(props2)
    };
    const { isStatic } = configAndProps;
    const context = useCreateMotionContext(props2);
    const visualState = useVisualState(props2, isStatic);
    if (!isStatic && typeof window !== "undefined") {
      useStrictMode();
      const layoutProjection = getProjectionFunctionality(configAndProps);
      MeasureLayout2 = layoutProjection.MeasureLayout;
      context.visualElement = useVisualElement(Component2, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode, isSVG);
    }
    return jsxs(MotionContext.Provider, { value: context, children: [MeasureLayout2 && context.visualElement ? jsx(MeasureLayout2, { visualElement: context.visualElement, ...configAndProps }) : null, useRender(Component2, props2, useMotionRef(visualState, context.visualElement, externalRef), visualState, isStatic, forwardMotionProps, isSVG)] });
  }
  MotionDOMComponent.displayName = `motion.${typeof Component2 === "string" ? Component2 : `create(${Component2.displayName ?? Component2.name ?? ""})`}`;
  const ForwardRefMotionComponent = forwardRef(MotionDOMComponent);
  ForwardRefMotionComponent[motionComponentSymbol] = Component2;
  return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
  const layoutGroupId = useContext(LayoutGroupContext).id;
  return layoutGroupId && layoutId !== void 0 ? layoutGroupId + "-" + layoutId : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
  useContext(LazyContext).strict;
}
function getProjectionFunctionality(props2) {
  const featureDefinitions = getInitializedFeatureDefinitions();
  const { drag: drag2, layout: layout2 } = featureDefinitions;
  if (!drag2 && !layout2)
    return {};
  const combined = { ...drag2, ...layout2 };
  return {
    MeasureLayout: drag2?.isEnabled(props2) || layout2?.isEnabled(props2) ? combined.MeasureLayout : void 0,
    ProjectionNode: combined.ProjectionNode
  };
}
function createMotionProxy(preloadedFeatures, createVisualElement) {
  if (typeof Proxy === "undefined") {
    return createMotionComponent;
  }
  const componentCache = /* @__PURE__ */ new Map();
  const factory = (Component2, options) => {
    return createMotionComponent(Component2, options, preloadedFeatures, createVisualElement);
  };
  const deprecatedFactoryFunction = (Component2, options) => {
    return factory(Component2, options);
  };
  return new Proxy(deprecatedFactoryFunction, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (_target, key) => {
      if (key === "create")
        return factory;
      if (!componentCache.has(key)) {
        componentCache.set(key, createMotionComponent(key, void 0, preloadedFeatures, createVisualElement));
      }
      return componentCache.get(key);
    }
  });
}
const createDomVisualElement = (Component2, options) => {
  const isSVG = options.isSVG ?? isSVGComponent(Component2);
  return isSVG ? new SVGVisualElement(options) : new HTMLVisualElement(options, {
    allowProjection: Component2 !== Fragment$1
  });
};
class AnimationFeature extends Feature {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(node) {
    super(node);
    node.animationState || (node.animationState = createAnimationState(node));
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.node.getProps();
    if (isAnimationControls(animate)) {
      this.unmountControls = animate.subscribe(this.node);
    }
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate } = this.node.getProps();
    const { animate: prevAnimate } = this.node.prevProps || {};
    if (animate !== prevAnimate) {
      this.updateAnimationControlsSubscription();
    }
  }
  unmount() {
    this.node.animationState.reset();
    this.unmountControls?.();
  }
}
let id = 0;
class ExitAnimationFeature extends Feature {
  constructor() {
    super(...arguments);
    this.id = id++;
    this.isExitComplete = false;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent, onExitComplete } = this.node.presenceContext;
    const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || isPresent === prevIsPresent) {
      return;
    }
    if (isPresent && prevIsPresent === false) {
      if (this.isExitComplete) {
        const { initial, custom } = this.node.getProps();
        if (typeof initial === "string") {
          const resolved = resolveVariant(this.node, initial, custom);
          if (resolved) {
            const { transition, transitionEnd, ...target } = resolved;
            for (const key in target) {
              this.node.getValue(key)?.jump(target[key]);
            }
          }
        }
        this.node.animationState.reset();
        this.node.animationState.animateChanges();
      } else {
        this.node.animationState.setActive("exit", false);
      }
      this.isExitComplete = false;
      return;
    }
    const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
    if (onExitComplete && !isPresent) {
      exitAnimation.then(() => {
        this.isExitComplete = true;
        onExitComplete(this.id);
      });
    }
  }
  mount() {
    const { register, onExitComplete } = this.node.presenceContext || {};
    if (onExitComplete) {
      onExitComplete(this.id);
    }
    if (register) {
      this.unmount = register(this.id);
    }
  }
  unmount() {
  }
}
const animations = {
  animation: {
    Feature: AnimationFeature
  },
  exit: {
    Feature: ExitAnimationFeature
  }
};
function extractEventInfo(event) {
  return {
    point: {
      x: event.pageX,
      y: event.pageY
    }
  };
}
const addPointerInfo = (handler) => (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
const getContextWindow = ({ current }) => {
  return current ? current.ownerDocument.defaultView : null;
};
const distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
  const xDelta = distance(a.x, b.x);
  const yDelta = distance(a.y, b.y);
  return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}
const overflowStyles = /* @__PURE__ */ new Set(["auto", "scroll"]);
class PanSession {
  constructor(event, handlers, { transformPagePoint, contextWindow = window, dragSnapToOrigin = false, distanceThreshold = 3, element } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.lastRawMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = window;
    this.scrollPositions = /* @__PURE__ */ new Map();
    this.removeScrollListeners = null;
    this.onElementScroll = (event2) => {
      this.handleScroll(event2.target);
    };
    this.onWindowScroll = () => {
      this.handleScroll(window);
    };
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      if (this.lastRawMoveEventInfo) {
        this.lastMoveEventInfo = transformPoint(this.lastRawMoveEventInfo, this.transformPagePoint);
      }
      const info2 = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info2.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!isPanStarted && !isDistancePastThreshold)
        return;
      const { point: point2 } = info2;
      const { timestamp: timestamp2 } = frameData;
      this.history.push({ ...point2, timestamp: timestamp2 });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info2);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info2);
    };
    this.handlePointerMove = (event2, info2) => {
      this.lastMoveEvent = event2;
      this.lastRawMoveEventInfo = info2;
      this.lastMoveEventInfo = transformPoint(info2, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event2, info2) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin || !this.startEvent) {
        resumeAnimation && resumeAnimation();
      }
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const panInfo = getPanInfo(event2.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info2, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) {
        onEnd(event2, panInfo);
      }
      onSessionEnd && onSessionEnd(event2, panInfo);
    };
    if (!isPrimaryPointer(event))
      return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.distanceThreshold = distanceThreshold;
    this.contextWindow = contextWindow || window;
    const info = extractEventInfo(event);
    const initialInfo = transformPoint(info, this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{ ...point, timestamp }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
    if (element) {
      this.startScrollTracking(element);
    }
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(element) {
    let current = element.parentElement;
    while (current) {
      const style = getComputedStyle(current);
      if (overflowStyles.has(style.overflowX) || overflowStyles.has(style.overflowY)) {
        this.scrollPositions.set(current, {
          x: current.scrollLeft,
          y: current.scrollTop
        });
      }
      current = current.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    });
    window.addEventListener("scroll", this.onElementScroll, {
      capture: true
    });
    window.addEventListener("scroll", this.onWindowScroll);
    this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: true
      });
      window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(target) {
    const initial = this.scrollPositions.get(target);
    if (!initial)
      return;
    const isWindow = target === window;
    const current = isWindow ? { x: window.scrollX, y: window.scrollY } : {
      x: target.scrollLeft,
      y: target.scrollTop
    };
    const delta = { x: current.x - initial.x, y: current.y - initial.y };
    if (delta.x === 0 && delta.y === 0)
      return;
    if (isWindow) {
      if (this.lastMoveEventInfo) {
        this.lastMoveEventInfo.point.x += delta.x;
        this.lastMoveEventInfo.point.y += delta.y;
      }
    } else {
      if (this.history.length > 0) {
        this.history[0].x -= delta.x;
        this.history[0].y -= delta.y;
      }
    }
    this.scrollPositions.set(target, current);
    frame.update(this.updatePoint, true);
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    this.removeScrollListeners && this.removeScrollListeners();
    this.scrollPositions.clear();
    cancelFrame(this.updatePoint);
  }
}
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) {
    return { x: 0, y: 0 };
  }
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) {
      break;
    }
    i--;
  }
  if (!timestampedPoint) {
    return { x: 0, y: 0 };
  }
  if (timestampedPoint === history[0] && history.length > 2 && lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta) * 2) {
    timestampedPoint = history[1];
  }
  const time = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time === 0) {
    return { x: 0, y: 0 };
  }
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) {
    currentVelocity.x = 0;
  }
  if (currentVelocity.y === Infinity) {
    currentVelocity.y = 0;
  }
  return currentVelocity;
}
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) {
    point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
  } else if (max !== void 0 && point > max) {
    point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
  }
  return point;
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) {
    [min, max] = [max, min];
  }
  return { min, max };
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) {
    origin = progress(target.min, target.max - sourceLength, source.min);
  } else if (sourceLength > targetLength) {
    origin = progress(source.min, source.max - targetLength, target.min);
  }
  return clamp(0, 1, origin);
}
function rebaseAxisConstraints(layout2, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) {
    relativeConstraints.min = constraints.min - layout2.min;
  }
  if (constraints.max !== void 0) {
    relativeConstraints.max = constraints.max - layout2.min;
  }
  return relativeConstraints;
}
const defaultElastic = 0.35;
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) {
    dragElastic = 0;
  } else if (dragElastic === true) {
    dragElastic = defaultElastic;
  }
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
const elementDragControls = /* @__PURE__ */ new WeakMap();
class VisualElementDragControls {
  constructor(visualElement) {
    this.openDragLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = { x: 0, y: 0 };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.latestPointerEvent = null;
    this.latestPanInfo = null;
    this.visualElement = visualElement;
  }
  start(originEvent, { snapToCursor = false, distanceThreshold } = {}) {
    const { presenceContext } = this.visualElement;
    if (presenceContext && presenceContext.isPresent === false)
      return;
    const onSessionStart = (event) => {
      if (snapToCursor) {
        this.snapToCursor(extractEventInfo(event).point);
      }
      this.stopAnimation();
    };
    const onStart = (event, info) => {
      const { drag: drag2, dragPropagation, onDragStart } = this.getProps();
      if (drag2 && !dragPropagation) {
        if (this.openDragLock)
          this.openDragLock();
        this.openDragLock = setDragLock(drag2);
        if (!this.openDragLock)
          return;
      }
      this.latestPointerEvent = event;
      this.latestPanInfo = info;
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) {
              const length = calcLength(measuredAxis);
              current = length * (parseFloat(current) / 100);
            }
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) {
        frame.update(() => onDragStart(event, info), false, true);
      }
      addValueToWillChange(this.visualElement, "transform");
      const { animationState } = this.visualElement;
      animationState && animationState.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      this.latestPointerEvent = event;
      this.latestPanInfo = info;
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openDragLock)
        return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) {
          onDirectionLock && onDirectionLock(this.currentDirection);
        }
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      if (onDrag) {
        frame.update(() => onDrag(event, info), false, true);
      }
    };
    const onSessionEnd = (event, info) => {
      this.latestPointerEvent = event;
      this.latestPanInfo = info;
      this.stop(event, info);
      this.latestPointerEvent = null;
      this.latestPanInfo = null;
    };
    const resumeAnimation = () => {
      const { dragSnapToOrigin: snap } = this.getProps();
      if (snap || this.constraints) {
        this.startAnimation({ x: 0, y: 0 });
      }
    };
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      distanceThreshold,
      contextWindow: getContextWindow(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(event, panInfo) {
    const finalEvent = event || this.latestPointerEvent;
    const finalPanInfo = panInfo || this.latestPanInfo;
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging || !finalPanInfo || !finalEvent)
      return;
    const { velocity } = finalPanInfo;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) {
      frame.postRender(() => onDragEnd(finalEvent, finalPanInfo));
    }
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = false;
    const { projection, animationState } = this.visualElement;
    if (projection) {
      projection.isAnimationBlocked = false;
    }
    this.endPanSession();
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openDragLock) {
      this.openDragLock();
      this.openDragLock = null;
    }
    animationState && animationState.setActive("whileDrag", false);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end();
    this.panSession = void 0;
  }
  updateAxis(axis, _point, offset) {
    const { drag: drag2 } = this.getProps();
    if (!offset || !shouldDrag(axis, drag2, this.currentDirection))
      return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) {
      next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    }
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const layout2 = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isRefObject(dragConstraints)) {
      if (!this.constraints) {
        this.constraints = this.resolveRefConstraints();
      }
    } else {
      if (dragConstraints && layout2) {
        this.constraints = calcRelativeConstraints(layout2.layoutBox, dragConstraints);
      } else {
        this.constraints = false;
      }
    }
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && !isRefObject(dragConstraints) && layout2 && this.constraints && !this.hasMutatedConstraints) {
      eachAxis((axis) => {
        if (this.constraints !== false && this.getAxisMotionValue(axis)) {
          this.constraints[axis] = rebaseAxisConstraints(layout2.layoutBox[axis], this.constraints[axis]);
        }
      });
    }
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isRefObject(constraints))
      return false;
    const constraintsElement = constraints.current;
    invariant$1(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout)
      return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) {
        measuredConstraints = convertBoundingBoxToBox(userConstraints);
      }
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag: drag2, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, this.currentDirection)) {
        return;
      }
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin === true || dragSnapToOrigin === axis)
        transition = { min: 0, max: 0 };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props2 = this.visualElement.getProps();
    const externalMotionValue = props2[dragKey];
    return externalMotionValue ? externalMotionValue : this.visualElement.getValue(axis, (props2.initial ? props2.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag: drag2 } = this.getProps();
      if (!shouldDrag(axis, drag2, this.currentDirection))
        return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        const current = axisValue.get() || 0;
        axisValue.set(point[axis] - mixNumber(min, max, 0.5) + current);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: drag2, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isRefObject(dragConstraints) || !projection || !this.constraints)
      return;
    this.stopAnimation();
    const boxProgress = { x: 0, y: 0 };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({ min: latest, max: latest }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.visualElement.current.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.constraints = false;
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag2, null))
        return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber(min, max, boxProgress[axis]));
    });
    this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    elementDragControls.set(this.visualElement, this);
    const element = this.visualElement.current;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag: drag2, dragListener = true } = this.getProps();
      const target = event.target;
      const isClickingTextInputChild = target !== element && isElementTextInput(target);
      if (drag2 && dragListener && !isClickingTextInputChild) {
        this.start(event);
      }
    });
    let stopResizeObservers;
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isRefObject(dragConstraints) && dragConstraints.current) {
        this.constraints = this.resolveRefConstraints();
        if (!stopResizeObservers) {
          stopResizeObservers = startResizeObservers(element, dragConstraints.current, () => this.scalePositionWithinConstraints());
        }
      }
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame.read(measureDragConstraints);
    const stopResizeListener = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue = this.getAxisMotionValue(axis);
          if (!motionValue)
            return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue.set(motionValue.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    }));
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
      stopResizeObservers && stopResizeObservers();
    };
  }
  getProps() {
    const props2 = this.visualElement.getProps();
    const { drag: drag2 = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props2;
    return {
      ...props2,
      drag: drag2,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
}
function skipFirstCall(callback) {
  let isFirst = true;
  return () => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    callback();
  };
}
function startResizeObservers(element, constraintsElement, onResize) {
  const stopElement = resize(element, skipFirstCall(onResize));
  const stopContainer = resize(constraintsElement, skipFirstCall(onResize));
  return () => {
    stopElement();
    stopContainer();
  };
}
function shouldDrag(direction, drag2, currentDirection) {
  return (drag2 === true || drag2 === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) {
    direction = "y";
  } else if (Math.abs(offset.x) > lockThreshold) {
    direction = "x";
  }
  return direction;
}
class DragGesture extends Feature {
  constructor(node) {
    super(node);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(node);
  }
  mount() {
    const { dragControls } = this.node.getProps();
    if (dragControls) {
      this.removeGroupControls = dragControls.subscribe(this.controls);
    }
    this.removeListeners = this.controls.addListeners() || noop;
  }
  update() {
    const { dragControls } = this.node.getProps();
    const { dragControls: prevDragControls } = this.node.prevProps || {};
    if (dragControls !== prevDragControls) {
      this.removeGroupControls();
      if (dragControls) {
        this.removeGroupControls = dragControls.subscribe(this.controls);
      }
    }
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
    if (!this.controls.isDragging) {
      this.controls.endPanSession();
    }
  }
}
const asyncHandler = (handler) => (event, info) => {
  if (handler) {
    frame.update(() => handler(event, info), false, true);
  }
};
class PanGesture extends Feature {
  constructor() {
    super(...arguments);
    this.removePointerDownListener = noop;
  }
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: getContextWindow(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
    return {
      onSessionStart: asyncHandler(onPanSessionStart),
      onStart: asyncHandler(onPanStart),
      onMove: asyncHandler(onPan),
      onEnd: (event, info) => {
        delete this.session;
        if (onPanEnd) {
          frame.postRender(() => onPanEnd(event, info));
        }
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
}
let hasTakenAnySnapshot = false;
class MeasureLayoutWithContext extends Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
    const { projection } = visualElement;
    if (projection) {
      if (layoutGroup.group)
        layoutGroup.group.add(projection);
      if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
        switchLayoutGroup.register(projection);
      }
      if (hasTakenAnySnapshot) {
        projection.root.didUpdate();
      }
      projection.addEventListener("animationComplete", () => {
        this.safeToRemove();
      });
      projection.setOptions({
        ...projection.options,
        layoutDependency: this.props.layoutDependency,
        onExitComplete: () => this.safeToRemove()
      });
    }
    globalProjectionState.hasEverUpdated = true;
  }
  getSnapshotBeforeUpdate(prevProps) {
    const { layoutDependency, visualElement, drag: drag2, isPresent } = this.props;
    const { projection } = visualElement;
    if (!projection)
      return null;
    projection.isPresent = isPresent;
    if (prevProps.layoutDependency !== layoutDependency) {
      projection.setOptions({
        ...projection.options,
        layoutDependency
      });
    }
    hasTakenAnySnapshot = true;
    if (drag2 || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || prevProps.isPresent !== isPresent) {
      projection.willUpdate();
    } else {
      this.safeToRemove();
    }
    if (prevProps.isPresent !== isPresent) {
      if (isPresent) {
        projection.promote();
      } else if (!projection.relegate()) {
        frame.postRender(() => {
          const stack = projection.getStack();
          if (!stack || !stack.members.length) {
            this.safeToRemove();
          }
        });
      }
    }
    return null;
  }
  componentDidUpdate() {
    const { visualElement, layoutAnchor } = this.props;
    const { projection } = visualElement;
    if (projection) {
      projection.options.layoutAnchor = layoutAnchor;
      projection.root.didUpdate();
      microtask.postRender(() => {
        if (!projection.currentAnimation && projection.isLead()) {
          this.safeToRemove();
        }
      });
    }
  }
  componentWillUnmount() {
    const { visualElement, layoutGroup, switchLayoutGroup: promoteContext } = this.props;
    const { projection } = visualElement;
    hasTakenAnySnapshot = true;
    if (projection) {
      projection.scheduleCheckAfterUnmount();
      if (layoutGroup && layoutGroup.group)
        layoutGroup.group.remove(projection);
      if (promoteContext && promoteContext.deregister)
        promoteContext.deregister(projection);
    }
  }
  safeToRemove() {
    const { safeToRemove } = this.props;
    safeToRemove && safeToRemove();
  }
  render() {
    return null;
  }
}
function MeasureLayout(props2) {
  const [isPresent, safeToRemove] = usePresence();
  const layoutGroup = useContext(LayoutGroupContext);
  return jsx(MeasureLayoutWithContext, { ...props2, layoutGroup, switchLayoutGroup: useContext(SwitchLayoutGroupContext), isPresent, safeToRemove });
}
const drag = {
  pan: {
    Feature: PanGesture
  },
  drag: {
    Feature: DragGesture,
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
function handleHoverEvent(node, event, lifecycle) {
  const { props: props2 } = node;
  if (node.animationState && props2.whileHover) {
    node.animationState.setActive("whileHover", lifecycle === "Start");
  }
  const eventName = "onHover" + lifecycle;
  const callback = props2[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
class HoverGesture extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    this.unmount = hover(current, (_element, startEvent) => {
      handleHoverEvent(this.node, startEvent, "Start");
      return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
    });
  }
  unmount() {
  }
}
class FocusGesture extends Feature {
  constructor() {
    super(...arguments);
    this.isActive = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.node.current.matches(":focus-visible");
    } catch (e) {
      isFocusVisible = true;
    }
    if (!isFocusVisible || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", true);
    this.isActive = true;
  }
  onBlur() {
    if (!this.isActive || !this.node.animationState)
      return;
    this.node.animationState.setActive("whileFocus", false);
    this.isActive = false;
  }
  mount() {
    this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function handlePressEvent(node, event, lifecycle) {
  const { props: props2 } = node;
  if (node.current instanceof HTMLButtonElement && node.current.disabled) {
    return;
  }
  if (node.animationState && props2.whileTap) {
    node.animationState.setActive("whileTap", lifecycle === "Start");
  }
  const eventName = "onTap" + (lifecycle === "End" ? "" : lifecycle);
  const callback = props2[eventName];
  if (callback) {
    frame.postRender(() => callback(event, extractEventInfo(event)));
  }
}
class PressGesture extends Feature {
  mount() {
    const { current } = this.node;
    if (!current)
      return;
    const { globalTapTarget, propagate } = this.node.props;
    this.unmount = press(current, (_element, startEvent) => {
      handlePressEvent(this.node, startEvent, "Start");
      return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
    }, {
      useGlobalTarget: globalTapTarget,
      stopPropagation: propagate?.tap === false
    });
  }
  unmount() {
  }
}
const observerCallbacks = /* @__PURE__ */ new WeakMap();
const observers = /* @__PURE__ */ new WeakMap();
const fireObserverCallback = (entry) => {
  const callback = observerCallbacks.get(entry.target);
  callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
  entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
  const lookupRoot = root || document;
  if (!observers.has(lookupRoot)) {
    observers.set(lookupRoot, {});
  }
  const rootObservers = observers.get(lookupRoot);
  const key = JSON.stringify(options);
  if (!rootObservers[key]) {
    rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
  }
  return rootObservers[key];
}
function observeIntersection(element, options, callback) {
  const rootInteresectionObserver = initIntersectionObserver(options);
  observerCallbacks.set(element, callback);
  rootInteresectionObserver.observe(element);
  return () => {
    observerCallbacks.delete(element);
    rootInteresectionObserver.unobserve(element);
  };
}
const thresholdNames = {
  some: 0,
  all: 1
};
class InViewFeature extends Feature {
  constructor() {
    super(...arguments);
    this.hasEnteredView = false;
    this.isInView = false;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport = {} } = this.node.getProps();
    const { root, margin: rootMargin, amount = "some", once } = viewport;
    const options = {
      root: root ? root.current : void 0,
      rootMargin,
      threshold: typeof amount === "number" ? amount : thresholdNames[amount]
    };
    const onIntersectionUpdate = (entry) => {
      const { isIntersecting } = entry;
      if (this.isInView === isIntersecting)
        return;
      this.isInView = isIntersecting;
      if (once && !isIntersecting && this.hasEnteredView) {
        return;
      } else if (isIntersecting) {
        this.hasEnteredView = true;
      }
      if (this.node.animationState) {
        this.node.animationState.setActive("whileInView", isIntersecting);
      }
      const { onViewportEnter, onViewportLeave } = this.node.getProps();
      const callback = isIntersecting ? onViewportEnter : onViewportLeave;
      callback && callback(entry);
    };
    this.stopObserver = observeIntersection(this.node.current, options, onIntersectionUpdate);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver === "undefined")
      return;
    const { props: props2, prevProps } = this.node;
    const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props2, prevProps));
    if (hasOptionsChanged) {
      this.startObserver();
    }
  }
  unmount() {
    this.stopObserver?.();
    this.hasEnteredView = false;
    this.isInView = false;
  }
}
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
  return (name) => viewport[name] !== prevViewport[name];
}
const gestureAnimations = {
  inView: {
    Feature: InViewFeature
  },
  tap: {
    Feature: PressGesture
  },
  focus: {
    Feature: FocusGesture
  },
  hover: {
    Feature: HoverGesture
  }
};
const layout = {
  layout: {
    ProjectionNode: HTMLProjectionNode,
    MeasureLayout
  }
};
const featureBundle = {
  ...animations,
  ...gestureAnimations,
  ...drag,
  ...layout
};
const motion = /* @__PURE__ */ createMotionProxy(featureBundle, createDomVisualElement);
const v = "5.12.1";
const fr = 60;
const ip = 0;
const op = 229;
const w = 1024;
const h = 1024;
const nm = "emoji_u1fae0";
const ddd = 0;
const assets = [];
const layers = /* @__PURE__ */ JSON.parse('[{"ddd":0,"ind":1,"ty":3,"nm":"Null Y Pos","sr":1,"ks":{"o":{"a":0,"k":0,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":512,"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.496],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[498.431]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":12,"s":[415.29]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":24,"s":[427.866]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":40,"s":[424.431]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":46,"s":[424.431]},{"i":{"x":[0.901],"y":[0.729]},"o":{"x":[0.333],"y":[0]},"t":66,"s":[414.431]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.273],"y":[0.374]},"t":90,"s":[444.431]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"t":102,"s":[474.431]},{"t":150,"s":[498.431]}],"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"ip":0,"op":229,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"eye_L ","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.377],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":150,"s":[0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":198,"s":[52.293]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":217,"s":[52.293]},{"t":228,"s":[0]}],"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[-91.36]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":12,"s":[-145.86]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":66,"s":[-145.86]},{"i":{"x":[0.827],"y":[0.584]},"o":{"x":[0.333],"y":[0]},"t":126,"s":[-85.704]},{"i":{"x":[0.813],"y":[1]},"o":{"x":[0.472],"y":[0.268]},"t":150,"s":[-91.36]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":198,"s":[-139.36]},{"i":{"x":[0.524],"y":[1]},"o":{"x":[0.279],"y":[0.599]},"t":217,"s":[-139.36]},{"t":228,"s":[-91.36]}],"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[-138.831]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":12,"s":[-162.831]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":24,"s":[-123.331]},{"i":{"x":[0.716],"y":[1]},"o":{"x":[0.474],"y":[0]},"t":60,"s":[-123.331]},{"i":{"x":[0.809],"y":[0.123]},"o":{"x":[0.644],"y":[0]},"t":100,"s":[-189.671]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.338],"y":[0.266]},"t":150,"s":[-138.831]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":198,"s":[145.669]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"t":217,"s":[145.669]},{"t":228,"s":[-138.831]}],"ix":4}},"a":{"a":0,"k":[67.37,91.85,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":12,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":46,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":66,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":126,"s":[99.435,109.404,100]},{"i":{"x":[0.833,0.833,0.833],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":150,"s":[100,100,100]},{"t":228,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[7.56,7.46],[8.48,-10.88],[-9.36,-9.04],[-8.08,10.4]],"o":[[-6.289,-6.205],[-10.64,13.6],[9.36,9.04],[8.08,-10.4]],"v":[[17.2,-21.8],[-15.12,-15.4],[-18,19.16],[16.88,10.28]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":12,"s":[{"i":[[6.797,6.136],[4.982,-10.253],[-8.454,-5.61],[-4.982,10.253]],"o":[[-6.797,-6.136],[-3.827,8.015],[8.454,5.61],[3.827,-8.015]],"v":[[-5.693,-20.453],[-33.276,-10.778],[-28.944,13.05],[-1.361,3.374]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[6.797,6.136],[4.982,-10.253],[-8.454,-5.61],[-4.982,10.253]],"o":[[-6.797,-6.136],[-3.827,8.015],[8.454,5.61],[3.827,-8.015]],"v":[[-5.693,-20.453],[-33.276,-10.778],[-28.944,13.05],[-1.361,3.374]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":61,"s":[{"i":[[6.797,6.136],[4.982,-10.253],[-8.454,-5.61],[-4.982,10.253]],"o":[[-6.797,-6.136],[-3.827,8.015],[8.454,5.61],[3.827,-8.015]],"v":[[-5.693,-20.453],[-33.276,-10.778],[-28.944,13.05],[-1.361,3.374]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[6.797,6.551],[4.982,-10.946],[-8.454,-5.989],[-4.982,10.946]],"o":[[-6.797,-6.551],[-3.827,8.556],[8.454,5.989],[3.827,-8.556]],"v":[[-5.693,-24.236],[-33.276,-13.906],[-28.944,11.531],[-1.361,1.202]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[{"i":[[7.56,7.46],[8.48,-10.88],[-9.36,-9.04],[-8.08,10.4]],"o":[[-6.289,-6.205],[-10.64,13.6],[9.36,9.04],[8.08,-10.4]],"v":[[17.2,-21.8],[-15.12,-15.4],[-18,19.16],[16.88,10.28]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":198,"s":[{"i":[[9.594,3.914],[5.526,-15.041],[-8.931,-2.708],[-3.263,12.45]],"o":[[-6.61,-2.697],[-5.819,15.839],[10.448,3.168],[4.076,-15.554]],"v":[[-18.079,1.946],[-42.474,28.513],[-37.703,63.044],[-11.496,34.158]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[9.594,3.914],[5.526,-15.041],[-8.931,-2.708],[-3.263,12.45]],"o":[[-6.61,-2.697],[-5.819,15.839],[10.448,3.168],[4.076,-15.554]],"v":[[-18.079,1.946],[-42.474,28.513],[-37.703,63.044],[-11.496,34.158]],"c":true}]},{"t":228,"s":[{"i":[[7.56,7.46],[8.48,-10.88],[-9.36,-9.04],[-8.08,10.4]],"o":[[-6.289,-6.205],[-10.64,13.6],[9.36,9.04],[8.08,-10.4]],"v":[[17.2,-21.8],[-15.12,-15.4],[-18,19.16],[16.88,10.28]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.529411764706,0.376470618154,0.133333333333,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[70.97,53.09],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[30.16,9.28],[18.48,-42.56],[-33.2,-11.36],[-14.48,42.72]],"o":[[-30.8,-9.6],[-17.2,39.68],[35.44,12.16],[14.48,-42.56]],"v":[[32.24,-82],[-49.92,-28.08],[-31.44,79.44],[52.64,17.76]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":12,"s":[{"i":[[30.324,0.76],[0,-42.457],[-31.574,0.226],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[31.176,-0.223],[0,-42.385]],"v":[[0.434,-87.59],[-57.331,-19.572],[0.184,49.123],[58.199,-19.572]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[30.324,0.76],[0,-42.457],[-31.574,0.226],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[31.176,-0.223],[0,-42.385]],"v":[[0.434,-87.59],[-57.331,-19.572],[0.184,49.123],[58.199,-19.572]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":61,"s":[{"i":[[30.324,0.76],[0,-42.457],[-31.574,0.226],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[31.176,-0.223],[0,-42.385]],"v":[[0.434,-87.59],[-57.331,-19.572],[0.184,49.123],[58.199,-19.572]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[30.324,0.811],[0,-45.325],[-31.574,0.241],[0,45.248]],"o":[[-30.324,-0.811],[0,45.325],[31.176,-0.238],[0,-45.248]],"v":[[0.434,-93.289],[-57.331,-20.677],[0.184,52.659],[58.199,-20.677]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[{"i":[[30.16,9.28],[18.48,-42.56],[-33.2,-11.36],[-14.48,42.72]],"o":[[-30.8,-9.6],[-17.2,39.68],[35.44,12.16],[14.48,-42.56]],"v":[[32.24,-82],[-49.92,-28.08],[-31.44,79.44],[52.64,17.76]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":198,"s":[{"i":[[29.237,9.112],[17.888,-41.802],[-32.174,-11.182],[-14.084,41.932]],"o":[[-29.857,-9.427],[-16.673,38.963],[34.355,11.94],[14.037,-41.791]],"v":[[25.425,-74.838],[-47.678,-22.996],[-28.423,76.351],[52.553,14.427]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[29.237,9.112],[17.888,-41.802],[-32.174,-11.182],[-14.084,41.932]],"o":[[-29.857,-9.427],[-16.673,38.963],[34.355,11.94],[14.037,-41.791]],"v":[[25.425,-74.838],[-47.678,-22.996],[-28.423,76.351],[52.553,14.427]],"c":true}]},{"t":228,"s":[{"i":[[30.16,9.28],[18.48,-42.56],[-33.2,-11.36],[-14.48,42.72]],"o":[[-30.8,-9.6],[-17.2,39.68],[35.44,12.16],[14.48,-42.56]],"v":[[32.24,-82],[-49.92,-28.08],[-31.44,79.44],[52.64,17.76]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.254901960784,0.164705882353,0.050980395897,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[67.37,91.85],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":229,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"eye_R ","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":0,"s":[0]},{"i":{"x":[0.833],"y":[0.625]},"o":{"x":[0.333],"y":[0]},"t":78,"s":[0]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.107]},"t":102,"s":[2]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":126,"s":[9]},{"i":{"x":[0.67],"y":[0.436]},"o":{"x":[0.333],"y":[0]},"t":150,"s":[0]},{"i":{"x":[0],"y":[1]},"o":{"x":[0.329],"y":[0.077]},"t":162,"s":[2]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":209,"s":[58.904]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":217,"s":[58.904]},{"t":228,"s":[0]}],"ix":10},"p":{"s":true,"x":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":0,"s":[131.64]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":78,"s":[131.64]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":102,"s":[134.64]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":126,"s":[129.64]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":150,"s":[131.64]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":209,"s":[52.64]},{"i":{"x":[0.525],"y":[1]},"o":{"x":[0.213],"y":[0.524]},"t":217,"s":[52.64]},{"t":228,"s":[131.64]}],"ix":3},"y":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.167],"y":[0.167]},"t":0,"s":[21.209]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":16,"s":[-135.791]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":30,"s":[-121.791]},{"i":{"x":[0.653],"y":[0.63]},"o":{"x":[0.298],"y":[0]},"t":46,"s":[-121.791]},{"i":{"x":[0.82],"y":[0.778]},"o":{"x":[0.418],"y":[0.424]},"t":90,"s":[-63.114]},{"i":{"x":[0.816],"y":[0.637]},"o":{"x":[0.613],"y":[0.21]},"t":150,"s":[21]},{"i":{"x":[0.424],"y":[1]},"o":{"x":[0.14],"y":[0.451]},"t":167,"s":[106.996]},{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":209,"s":[237.209]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.333],"y":[0]},"t":217,"s":[237.209]},{"t":228,"s":[21.209]}],"ix":4}},"a":{"a":0,"k":[65.89,93.41,0],"ix":1,"l":2},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":0,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":16,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":46,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":66,"s":[100,100,100]},{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":126,"s":[97.929,108.724,100]},{"i":{"x":[0.833,0.833,0.833],"y":[1,1,1]},"o":{"x":[0.333,0.333,0.333],"y":[0,0,0]},"t":150,"s":[100,100,100]},{"t":228,"s":[100,100,100]}],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[8.16,7.92],[9.2,-12.64],[-10.16,-8.4],[-7.44,12.16]],"o":[[-9.76,-9.52],[-9.2,12.64],[10.16,8.4],[6.08,-9.92]],"v":[[18.24,-21],[-15.76,-13.56],[-16.24,22.12],[18,11.96]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":16,"s":[{"i":[[7.04,6.106],[4.74,-11.212],[-8.043,-6.134],[-4.74,11.212]],"o":[[-7.737,-6.71],[-3.641,8.764],[8.043,6.134],[3.641,-8.764]],"v":[[-0.893,-23.54],[-28.386,-13.71],[-24.264,12.346],[2.479,2.015]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":30,"s":[{"i":[[6.797,6.136],[4.982,-10.253],[-8.454,-5.61],[-4.982,10.253]],"o":[[-6.797,-6.136],[-3.827,8.015],[8.454,5.61],[3.827,-8.015]],"v":[[0.147,-22.134],[-27.436,-12.458],[-23.104,11.37],[4.479,1.694]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[6.797,6.136],[4.982,-10.253],[-8.454,-5.61],[-4.982,10.253]],"o":[[-6.797,-6.136],[-3.827,8.015],[8.454,5.61],[3.827,-8.015]],"v":[[0.147,-22.134],[-27.436,-12.458],[-23.104,11.37],[4.479,1.694]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[7.04,6.106],[4.74,-11.212],[-8.043,-6.134],[-4.74,11.212]],"o":[[-7.737,-6.71],[-3.641,8.764],[8.043,6.134],[3.641,-8.764]],"v":[[-0.893,-23.54],[-28.386,-13.71],[-24.264,12.346],[2.479,2.015]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[{"i":[[8.16,7.92],[9.2,-12.64],[-10.16,-8.4],[-7.44,12.16]],"o":[[-9.76,-9.52],[-9.2,12.64],[10.16,8.4],[6.08,-9.92]],"v":[[18.24,-21],[-15.76,-13.56],[-16.24,22.12],[18,11.96]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":209,"s":[{"i":[[10.118,5.189],[5.83,-13.869],[-12.184,-5.034],[-4.671,13.468]],"o":[[-12.132,-6.222],[-6.058,14.412],[12.184,5.034],[4.256,-12.272]],"v":[[-14.622,-1.921],[-44.166,22.669],[-40.337,60.451],[-10.066,32.369]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[10.118,5.189],[5.83,-13.869],[-12.184,-5.034],[-4.671,13.468]],"o":[[-12.132,-6.222],[-6.058,14.412],[12.184,5.034],[4.256,-12.272]],"v":[[-14.622,-1.921],[-44.166,22.669],[-40.337,60.451],[-10.066,32.369]],"c":true}]},{"t":228,"s":[{"i":[[8.16,7.92],[9.2,-12.64],[-10.16,-8.4],[-7.44,12.16]],"o":[[-9.76,-9.52],[-9.2,12.64],[10.16,8.4],[6.08,-9.92]],"v":[[18.24,-21],[-15.76,-13.56],[-16.24,22.12],[18,11.96]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.529411764706,0.376470618154,0.133333333333,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[65.13,54.77],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false},{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[23.92,6.64],[16.8,-52.72],[-25.52,-7.68],[-13.2,53.36]],"o":[[-27.52,-7.6],[-16.8,52.72],[27.2,8.16],[13.2,-53.36]],"v":[[26.2,-85.56],[-48.84,-20.36],[-25.16,85],[52.44,11.8]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":16,"s":[{"i":[[30.324,0.76],[0,-42.457],[-34.554,0.047],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[39.214,-0.053],[0,-42.385]],"v":[[0.914,-94.4],[-57.101,-21.132],[-0.836,54.813],[58.429,-21.132]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":30,"s":[{"i":[[30.324,0.76],[0,-42.457],[-31.574,0.226],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[31.176,-0.223],[0,-42.385]],"v":[[1.914,-89.15],[-55.851,-21.132],[1.664,47.563],[59.679,-21.132]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[30.324,0.76],[0,-42.457],[-31.574,0.226],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[31.176,-0.223],[0,-42.385]],"v":[[1.914,-89.15],[-55.851,-21.132],[1.664,47.563],[59.679,-21.132]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[30.324,0.76],[0,-42.457],[-34.554,0.047],[0,42.385]],"o":[[-30.324,-0.76],[0,42.457],[39.214,-0.053],[0,-42.385]],"v":[[0.914,-94.4],[-57.101,-21.132],[-0.836,54.813],[58.429,-21.132]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[{"i":[[23.92,6.64],[16.8,-52.72],[-25.52,-7.68],[-13.2,53.36]],"o":[[-27.52,-7.6],[-16.8,52.72],[27.2,8.16],[13.2,-53.36]],"v":[[26.2,-85.56],[-48.84,-20.36],[-25.16,85],[52.44,11.8]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":209,"s":[{"i":[[23.753,7.214],[15.887,-46.956],[-24.626,-10.188],[-18.854,51.634]],"o":[[-29.004,-8.809],[-16.521,48.827],[25.767,10.66],[18.929,-51.837]],"v":[[24.352,-83.463],[-58.678,-22.199],[-30.385,67.881],[54.011,10.744]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[23.753,7.214],[15.887,-46.956],[-24.626,-10.188],[-18.854,51.634]],"o":[[-29.004,-8.809],[-16.521,48.827],[25.767,10.66],[18.929,-51.837]],"v":[[24.352,-83.463],[-58.678,-22.199],[-30.385,67.881],[54.011,10.744]],"c":true}]},{"t":228,"s":[{"i":[[23.92,6.64],[16.8,-52.72],[-25.52,-7.68],[-13.2,53.36]],"o":[[-27.52,-7.6],[-16.8,52.72],[27.2,8.16],[13.2,-53.36]],"v":[[26.2,-85.56],[-48.84,-20.36],[-25.16,85],[52.44,11.8]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.254901960784,0.164705882353,0.050980395897,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[65.89,93.41],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 2","np":2,"cix":2,"bm":0,"ix":2,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":229,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"mouth 11","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":221,"s":[{"i":[[9.267,1.352],[18.225,-4.584],[0.713,-21.35],[-55.966,-25.35],[-158.313,31.04],[21.714,10.96],[202.092,-17.25],[23.783,11.002],[0.731,16.895],[-5.494,5.552],[0.644,5.325]],"o":[[-16.938,-2.471],[-46.53,11.703],[-0.516,15.465],[54.295,24.593],[186.763,-36.618],[-21.713,-10.96],[-137.542,11.74],[-20.32,-9.4],[-0.546,-12.617],[6.748,-6.82],[-0.751,-6.205]],"v":[[117.318,298.206],[60.405,301.319],[1.417,351.085],[59.596,428.585],[378.443,446.695],[584.843,322.695],[350.172,412.495],[128.45,390.635],[97.399,354.84],[121.882,324.555],[135.663,309.021]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":224,"s":[{"i":[[5.672,-5.3],[3.054,-7.057],[15.15,-24.35],[-12.514,-17.1],[-99.438,16.121],[15.52,9.296],[132.081,-5.357],[18.554,10.1],[0.078,13.664],[-0.718,20.377],[6.911,6.79]],"o":[[-5.177,4.837],[-5.878,13.584],[-11.563,18.584],[36.626,50.049],[135.027,-18.659],[-12.437,-6.773],[-104.543,4.24],[-10.078,-5.486],[-0.1,-17.468],[0.756,-21.439],[-4.416,-4.339]],"v":[[147.67,261.254],[140.229,278.381],[93.98,330.085],[98.12,389.335],[366.944,437.695],[545.843,360.195],[346.673,408.495],[181.076,375.635],[160.73,340.703],[176.874,296.174],[165.219,261.445]],"c":true}]},{"t":228,"s":[{"i":[[5.769,-7.752],[-15.186,-14.186],[-15.71,-81.516],[-16.649,-18.137],[-17.133,-1.483],[3.891,7.896],[41.452,5.978],[14.229,14.768],[3.982,23.491],[28.682,24.443],[64.66,37.483]],"o":[[-6.045,8.122],[69.379,64.807],[6.827,35.425],[29.283,31.9],[41.157,3.563],[-4.392,-8.914],[-28.893,-4.167],[-15.32,-15.9],[-9.233,-54.469],[-28.727,-24.481],[-20.052,-11.624]],"v":[[43.712,71.865],[55.751,106.928],[199.84,273.25],[229.347,353.335],[314.507,389.884],[411.964,380.844],[334.638,362.021],[272.95,330.135],[257.363,254.204],[201.857,160.216],[87.47,85.252]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":221,"s":[118.102,337.606],"to":[0,0],"ti":[0,0]},{"t":228,"s":[223.055,226.653]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":221,"s":[665.043,412.82],"to":[0,0],"ti":[0,0]},{"t":228,"s":[222.398,419.727]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[295.729,379.076],"ix":2},"a":{"a":0,"k":[295.729,379.076],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":221,"op":229,"st":37,"ct":1,"bm":0},{"ddd":0,"ind":5,"ty":4,"nm":"mouth 4","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.34,"y":1},"o":{"x":0.167,"y":0.167},"t":186,"s":[{"i":[[21.67,-1.141],[-1.597,-35.065],[-94.975,-13.17],[-87.418,17.256],[21.713,10.96],[202.093,-17.25],[23.783,11.002],[-0.149,12.624],[0.259,9.578]],"o":[[-42.328,2.229],[2.183,47.941],[63.483,8.803],[186.717,-36.857],[-21.714,-10.96],[-137.542,11.74],[-20.32,-9.4],[0.231,-19.605],[-0.311,-11.492]],"v":[[52.588,304.697],[-48.553,356.294],[148.105,452.405],[378.443,446.695],[584.844,322.695],[350.172,412.495],[98.45,390.635],[56.899,353.34],[113.941,316.227]],"c":true}]},{"i":{"x":0.34,"y":1},"o":{"x":0.167,"y":0},"t":209,"s":[{"i":[[26.042,0.038],[-2.817,-38.059],[-94.975,-13.17],[-105.634,30.86],[16.287,8.54],[211.958,-23.26],[24.368,9.639],[3.37,12.167],[0.259,9.578]],"o":[[-42.387,-0.063],[3.542,47.86],[63.483,8.803],[152.187,-44.46],[-17.58,-9.218],[-137.219,15.058],[-28.82,-11.4],[-3.769,-13.605],[-0.311,-11.492]],"v":[[21.088,316.697],[-49.053,359.794],[156.105,453.905],[426.943,433.195],[609.843,292.695],[357.172,410.495],[107.45,388.135],[57.899,355.84],[70.441,331.227]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0},"t":217,"s":[{"i":[[26.042,0.038],[-2.817,-38.059],[-94.975,-13.17],[-105.634,30.86],[16.287,8.54],[211.958,-23.26],[24.368,9.639],[3.37,12.167],[0.259,9.578]],"o":[[-42.387,-0.063],[3.542,47.86],[63.483,8.803],[152.187,-44.46],[-17.58,-9.218],[-137.219,15.058],[-28.82,-11.4],[-3.769,-13.605],[-0.311,-11.492]],"v":[[21.088,316.697],[-49.053,359.794],[156.105,453.905],[426.943,433.195],[609.843,292.695],[357.172,410.495],[107.45,388.135],[57.899,355.84],[70.441,331.227]],"c":true}]},{"t":221,"s":[{"i":[[26.542,-3.962],[-1.597,-35.065],[-94.975,-13.17],[-87.418,17.256],[21.714,10.96],[202.093,-17.25],[23.783,11.002],[-0.149,12.624],[8.189,10.508]],"o":[[-41.922,6.257],[2.183,47.941],[63.483,8.803],[186.716,-36.857],[-21.713,-10.96],[-137.542,11.74],[-20.32,-9.4],[0.231,-19.605],[-7.067,-9.068]],"v":[[72.588,299.697],[1.447,356.294],[148.105,452.405],[378.443,446.695],[584.843,322.695],[350.172,412.495],[128.45,390.635],[96.899,353.34],[133.941,306.227]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[223.055,226.653],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":165,"s":[221.867,329.34],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":186,"s":[118.102,337.606],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":209,"s":[121.828,338.723],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[121.828,338.723],"to":[0,0],"ti":[0,0]},{"t":221,"s":[118.102,337.606]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[222.398,419.727],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":165,"s":[220.695,425.746],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":186,"s":[665.043,412.82],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":209,"s":[639.035,285.266],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[639.035,285.266],"to":[0,0],"ti":[0,0]},{"t":221,"s":[665.043,412.82]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[270.751,381.853],"ix":2},"a":{"a":0,"k":[270.751,381.853],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":186,"op":221,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":6,"ty":4,"nm":"mouth 3","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":165,"s":[{"i":[[7.822,-9.559],[-45.585,-25.602],[-1.168,-9.316],[19.045,-1.722],[51.213,-7.1],[-33.157,-29.435],[-36.562,0.202],[9.326,7.632],[87.074,1.773],[-6.32,25.6],[-21.416,0.255],[-17.386,2.704],[-0.677,11.765],[33.747,14.584]],"o":[[-7.822,9.559],[16.174,9.084],[1.23,9.816],[-19.045,1.722],[-45.528,6.312],[65.784,58.4],[83.337,-0.46],[-3.161,-2.586],[-135.543,-2.76],[2.888,-11.698],[69.672,-0.831],[33.272,-5.175],[1.072,-18.61],[-37.132,-16.047]],"v":[[125.452,195.676],[196.715,269.337],[242.4,304.419],[217.175,320.513],[12.917,321.085],[-23.654,372.335],[355.443,428.695],[506.843,397.695],[343.173,404.495],[61.95,360.635],[154.458,351.566],[302.358,340.41],[350.807,317.47],[282.211,266.782]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":177,"s":[{"i":[[0.922,-0.194],[-5.841,-4.301],[5.432,-0.561],[79.841,-1.652],[20.287,-11.65],[-53.216,-27.6],[-99.438,16.121],[15.52,9.296],[132.042,-6.24],[6.725,2.873],[-6.702,0.968],[-17.509,0.87],[-29.905,6.765],[0.689,10.189]],"o":[[-5.42,1.143],[5.729,4.218],[-48.039,4.962],[-22.17,0.459],[-20.287,11.65],[78.088,40.5],[135.027,-18.659],[-12.437,-6.773],[-132.042,6.24],[-17.32,-7.4],[6.702,-0.968],[48.798,-2.426],[21.552,-4.876],[-0.821,-12.145]],"v":[[213.926,301.787],[216.971,314.036],[207.169,319.773],[41.289,319.387],[-20.083,330.085],[-4.654,385.835],[366.943,437.695],[545.843,360.195],[346.672,408.495],[71.95,371.135],[69.428,354.203],[126.332,352.161],[221.078,342.611],[248.951,318.38]],"c":true}]},{"t":186,"s":[{"i":[[9.23,1.587],[5.098,0.5],[10.691,-2.891],[20.772,-8.474],[1.463,-9.35],[-66.966,-27.85],[-162.314,32.04],[21.714,10.96],[202.093,-17.25],[23.783,11.002],[7.238,10.344],[-6.364,3.5],[-7.084,3.29],[0.267,5.357]],"o":[[-10.78,-1.854],[-5.098,-0.5],[-11,2.975],[-20.772,8.474],[-2.391,15.288],[55.035,22.888],[186.716,-36.857],[-21.714,-10.96],[-137.542,11.74],[-20.32,-9.4],[-11.269,-16.105],[10.324,-5.677],[7.032,-3.266],[-0.311,-6.242]],"v":[[95.463,306.835],[74.978,304.235],[29.439,306.626],[-15.348,318.511],[-48.583,349.585],[25.596,421.585],[378.443,446.695],[584.843,322.695],[350.172,412.495],[98.45,390.635],[60.899,362.84],[70.806,336.912],[98.348,327.188],[113.941,316.227]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[223.055,226.653],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":165,"s":[358.18,231.645],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":172,"s":[294.965,197.028],"to":[0,0],"ti":[0,0]},{"t":186,"s":[118.102,337.606]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[222.398,419.727],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":165,"s":[374.797,449.363],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":172,"s":[357.883,485.346],"to":[0,0],"ti":[0,0]},{"t":186,"s":[665.043,412.82]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[234.282,311.73],"ix":2},"a":{"a":0,"k":[234.282,311.73],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":165,"op":186,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":7,"ty":4,"nm":"mouth 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[{"i":[[1.443,-0.722],[-2,-12.8],[-60.8,-64.24],[-51.84,-11.28],[-7.6,-2.16],[21.44,-4.24],[29.44,-7.36],[-21.36,-22.48],[-11.84,1.76],[3.04,7.68],[13.48,0.114],[-5.617,18.722],[-33.405,-0.232],[-6.987,0.054],[-14.24,6.48],[23.12,12.959],[52.64,16.72],[36.48,26.96],[13.68,20.16],[5.137,0.001]],"o":[[-8.48,4.24],[2,12.8],[64.48,68.16],[51.84,11.28],[14.56,4.16],[-29.44,5.92],[-25.44,6.4],[21.36,22.48],[11.84,-1.76],[-0.941,-2.352],[-23.201,-0.196],[3.45,-11.545],[6.87,0.048],[27.76,-0.24],[38.64,-17.52],[-23.12,-12.96],[-57.92,-18.4],[-85.68,-63.44],[-6.957,-10.285],[-1.656,0]],"v":[[8.73,1.375],[2.57,33.695],[76.33,187.855],[272.57,288.575],[386.17,312.575],[381.53,335.615],[246.65,344.335],[225.93,396.335],[307.85,413.695],[340.41,397.695],[314.687,395.557],[267.45,375.135],[334.007,364.054],[354.89,364.095],[423.93,354.415],[433.21,287.695],[309.61,248.095],[166.57,174.495],[31.61,14.415],[13.381,0.25]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":158,"s":[{"i":[[1.443,-0.722],[-2,-12.8],[-60.8,-64.24],[-51.84,-11.28],[-7.6,-2.16],[21.44,-4.24],[29.44,-7.36],[-21.36,-22.48],[-11.968,0.202],[3.04,7.68],[25.439,0.114],[-5.617,18.722],[-33.405,-0.232],[-6.987,0.054],[-14.24,6.48],[23.12,12.959],[52.64,16.72],[36.48,26.96],[13.68,20.16],[5.137,0.001]],"o":[[-8.48,4.24],[2,12.8],[64.48,68.16],[51.84,11.28],[14.56,4.16],[-29.44,5.92],[-25.44,6.4],[21.36,22.48],[27.28,-0.46],[-0.941,-2.352],[-43.784,-0.196],[3.45,-11.545],[6.87,0.048],[27.76,-0.24],[38.64,-17.52],[-23.12,-12.96],[-57.92,-18.4],[-85.68,-63.44],[-6.957,-10.285],[-1.656,0]],"v":[[19.73,45.375],[13.57,77.695],[81.33,193.855],[272.57,297.575],[346.17,312.575],[341.53,335.615],[216.65,344.335],[195.93,396.335],[330.85,414.695],[380.41,397.695],[333.274,395.557],[237.45,375.135],[294.007,364.054],[314.89,364.095],[383.93,354.415],[393.21,287.695],[309.61,257.095],[167.57,184.495],[42.61,58.415],[24.381,44.25]],"c":true}]},{"t":165,"s":[{"i":[[0.906,-0.273],[-2.284,-4.457],[-15.988,-12.354],[-23.835,-14.352],[-5.02,-7.934],[13.745,-3.698],[51.213,-7.1],[-33.157,-29.435],[-36.562,0.202],[9.326,7.632],[87.074,1.773],[-6.32,25.6],[-21.41,0.562],[-16.474,0.386],[-16.832,5.125],[14.822,11.302],[33.747,14.584],[22.668,10.705],[15.817,8.62],[3.224,0]],"o":[[-5.322,1.606],[5.544,10.817],[16.265,12.568],[15.892,9.569],[5.355,8.463],[-18.874,5.163],[-45.528,6.312],[65.784,58.4],[83.337,-0.46],[-3.161,-2.586],[-135.543,-2.76],[2.888,-11.698],[31.672,-0.831],[37.034,-0.867],[31.772,-9.675],[-14.823,-11.303],[-37.132,-16.047],[-33.112,-15.637],[-5.138,-2.8],[-1.039,0]],"v":[[128.952,194.676],[126.836,205.668],[161.865,244.167],[213.715,278.337],[240.9,299.419],[228.175,320.013],[12.917,321.085],[-23.654,372.335],[355.443,428.695],[506.843,397.695],[343.173,404.495],[61.95,360.635],[154.458,351.566],[234.096,349.602],[325.358,336.91],[338.307,296.97],[282.211,266.782],[223.242,239.622],[146.813,197.865],[131.871,194.25]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[223.055,226.653],"to":[0,0],"ti":[0,0]},{"t":165,"s":[358.18,231.645]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[222.398,419.727],"to":[0,0],"ti":[0,0]},{"t":165,"s":[374.797,449.363]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[213.881,226.906],"ix":2},"a":{"a":0,"k":[213.881,226.906],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":150,"op":165,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":8,"ty":4,"nm":"mouth 8","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":126,"s":[{"i":[[1.43,-0.815],[-1.981,-14.463],[-60.22,-72.599],[-51.724,-11.802],[-7.6,-2.16],[21.44,-4.24],[16.441,-0.745],[7.852,-2.305],[-2.949,-2.935],[-10.157,-1.451],[-6.808,-0.542],[-20.377,-0.095],[-6.88,1.218],[-14.24,6.48],[23.12,12.959],[57.52,17.93],[45.622,39.508],[13.521,22.798],[5.089,0]],"o":[[-8.401,4.791],[1.981,14.463],[63.882,77.014],[54.56,12.45],[14.56,4.16],[-29.44,5.92],[-16.441,0.745],[-5.926,1.74],[2.84,2.827],[11.952,1.708],[11.024,0.878],[6.87,0.032],[9.24,-1.636],[38.64,-17.52],[-23.12,-12.96],[-58.019,-18.085],[-88.778,-76.88],[-6.893,-11.621],[-1.641,0]],"v":[[10.531,-65.704],[4.429,-29.186],[77.505,169.001],[272.57,291.575],[396.17,322.792],[388.53,348.18],[301.133,354.021],[249.541,358.331],[243.329,365.034],[268.678,370.817],[302.106,375.646],[359.257,379.619],[391.64,377.16],[423.93,368.98],[433.21,301.999],[309.61,253.095],[160.908,168.905],[33.199,-50.97],[15.139,-66.975]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":133,"s":[{"i":[[1.438,-0.761],[-1.992,-13.493],[-58.543,-69.532],[-51.792,-11.498],[-7.6,-2.16],[21.44,-4.24],[28.972,-6.186],[0.804,-5.557],[-5.06,-0.346],[-5.525,2.522],[-17.24,1.791],[-27.977,-0.175],[-6.942,0.539],[-14.24,6.48],[23.12,12.959],[54.673,17.224],[39.423,33.297],[13.614,21.259],[5.117,0.001]],"o":[[-8.447,4.469],[1.992,13.493],[62.102,73.76],[52.973,11.767],[14.56,4.16],[-29.44,5.92],[-28.972,6.186],[-0.804,5.557],[5.06,0.346],[5.525,-2.523],[17.24,-1.791],[6.87,0.041],[20.043,-0.822],[38.64,-17.52],[-23.12,-12.96],[-57.961,-18.269],[-84.969,-71.601],[-6.93,-10.842],[-1.65,0]],"v":[[9.481,-62.408],[3.344,-28.339],[76.714,175.491],[272.57,289.825],[390.337,322.082],[384.447,343.767],[250.851,352.788],[219.434,375.917],[226.57,387.378],[238.355,382.059],[261.89,374.265],[344.528,373.456],[370.203,372.456],[423.93,363.401],[433.21,298.322],[309.61,250.178],[164.441,170.418],[32.272,-48.662],[14.114,-63.594]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":138,"s":[{"i":[[1.443,-0.722],[-2,-12.8],[-57.345,-67.342],[-51.84,-11.28],[-7.6,-2.16],[21.44,-4.24],[29.44,-7.36],[-9.8,-16.897],[-8.97,-3.257],[-2.221,2.591],[-5.07,12.053],[-33.405,-0.232],[-6.987,0.054],[-14.24,6.48],[23.12,12.959],[52.64,16.72],[34.996,28.86],[13.68,20.16],[5.137,0.001]],"o":[[-8.48,4.24],[2,12.8],[60.831,71.435],[51.84,11.28],[14.56,4.16],[-29.44,5.92],[-25.44,6.4],[2.833,4.885],[6.436,2.337],[4.72,-5.507],[4.672,-11.107],[6.87,0.048],[27.76,-0.24],[38.64,-17.52],[-23.12,-12.96],[-57.92,-18.4],[-82.249,-67.829],[-6.957,-10.285],[-1.656,0]],"v":[[8.73,-48.625],[2.57,-16.305],[76.149,180.127],[272.57,288.575],[386.17,321.575],[381.53,340.615],[246.65,349.335],[221.93,395.335],[238.6,410.195],[254.41,409.695],[267.45,380.135],[334.007,369.054],[354.89,369.095],[423.93,359.415],[433.21,295.695],[309.61,248.095],[166.964,171.5],[31.61,-35.585],[13.381,-49.75]],"c":true}]},{"t":150,"s":[{"i":[[1.443,-0.722],[-2,-12.8],[-60.8,-64.24],[-51.84,-11.28],[-7.6,-2.16],[21.44,-4.24],[29.44,-7.36],[-21.36,-22.48],[-11.84,1.76],[3.04,7.68],[-8.88,29.6],[-33.405,-0.232],[-6.987,0.054],[-14.24,6.48],[23.12,12.959],[52.64,16.72],[36.48,26.96],[13.68,20.16],[5.137,0.001]],"o":[[-8.48,4.24],[2,12.8],[64.48,68.16],[51.84,11.28],[14.56,4.16],[-29.44,5.92],[-25.44,6.4],[21.36,22.48],[11.84,-1.76],[-2.56,-6.4],[3.45,-11.545],[6.87,0.048],[27.76,-0.24],[38.64,-17.52],[-23.12,-12.96],[-57.92,-18.4],[-85.68,-63.44],[-6.957,-10.285],[-1.656,0]],"v":[[8.73,1.375],[2.57,33.695],[76.33,187.855],[272.57,288.575],[386.17,312.575],[381.53,335.615],[246.65,344.335],[225.93,396.335],[307.85,413.695],[340.41,397.695],[267.45,375.135],[334.007,364.054],[354.89,364.095],[423.93,354.415],[433.21,287.695],[309.61,248.095],[166.57,174.495],[31.61,14.415],[13.381,0.25]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":0,"k":[223.055,226.653],"ix":5},"e":{"a":0,"k":[222.398,419.727],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[226.568,207.614],"ix":2},"a":{"a":0,"k":[226.568,207.614],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":126,"op":150,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":9,"ty":4,"nm":"mouth 7","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":78,"s":[{"i":[[1.209,-1.021],[-5.023,-10.936],[-29.568,-23.029],[-62.035,0.347],[-12.842,3.52],[-8.271,3.196],[-4.511,2.556],[1.013,6.015],[10.685,0.579],[21.099,0.179],[34.339,18.647],[17.982,14.512],[4.925,-1.335]],"o":[[-7.102,5.998],[5.023,10.936],[64.887,50.535],[34.31,-0.192],[12.188,-3.34],[7.686,-2.97],[4.511,-2.556],[-1.203,-7.148],[-10.685,-0.579],[-89.407,-0.757],[-42.039,-22.828],[-9.165,-7.397],[-1.588,0.43]],"v":[[40.163,70.384],[37.452,93.197],[94.198,155.764],[265.07,220.677],[326.972,213.715],[355.444,204.705],[373.619,195.791],[379.117,181.72],[363.315,170.314],[308.031,173.556],[148.791,137.588],[65.451,76.801],[44.349,68.169]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":90,"s":[{"i":[[1.432,-0.662],[-1.985,-11.745],[-55.202,-48.157],[-52.132,-7.368],[-12.936,-2.716],[-6.633,-4.475],[-7.262,3.239],[4.676,8.758],[10.906,5.192],[51.639,12.145],[40.143,23.118],[13.546,18.515],[5.098,0]],"o":[[-8.416,3.891],[1.985,11.745],[60.849,53.084],[42.06,5.945],[12.201,2.562],[6.634,4.475],[7.262,-3.239],[-3.002,-5.624],[-9.278,-4.418],[-58.468,-13.751],[-52.082,-29.994],[-6.905,-9.437],[-1.644,0]],"v":[[25.188,4.583],[18.075,27.552],[99.281,146.651],[272.57,225.79],[347.429,235.551],[383.55,244.889],[406.921,253.663],[409.632,231.237],[385.408,213.03],[305.821,187.768],[161.987,129.617],[47.897,17.361],[29.804,3.551]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":102,"s":[{"i":[[1.432,-0.734],[-1.984,-13.025],[-54.982,-57.473],[-63.786,-13.826],[-9.937,-2.25],[-0.918,-6.824],[-5.295,-0.975],[-4.862,7.688],[7.514,7.81],[58.33,15.266],[42.447,30.715],[13.542,20.531],[5.096,0]],"o":[[-8.413,4.314],[1.984,13.025],[61.952,64.994],[47.918,10.202],[12.747,2.991],[0.645,4.793],[5.295,0.975],[6.388,-10.101],[-7.576,-9.64],[-58.473,-15.144],[-70.283,-52.797],[-6.902,-10.466],[-1.643,0]],"v":[[17.774,-26.509],[10.226,0.222],[87.837,146.974],[273.32,249.29],[363.282,265.895],[385.735,276.156],[385.335,294.474],[406.492,282.049],[406.456,253.449],[306.965,213.943],[160.467,139.027],[40.472,-12.834],[22.388,-27.654]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":114,"s":[{"i":[[1.431,-0.806],[-1.983,-14.304],[-54.763,-66.79],[-75.44,-20.283],[-6.937,-1.784],[5.434,-4.105],[-3.119,-13.778],[-13.001,5.326],[2.973,10.812],[52.52,19.387],[44.751,38.313],[13.537,22.547],[5.094,0]],"o":[[-8.409,4.738],[1.983,14.304],[63.056,76.904],[53.775,14.458],[13.294,3.419],[-21.291,16.084],[1.559,6.889],[21.583,-8.81],[-5.875,-21.362],[-57.012,-21.045],[-88.483,-75.6],[-6.899,-11.494],[-1.642,0]],"v":[[10.36,-57.602],[2.377,-27.108],[76.393,147.296],[274.07,272.789],[379.136,296.239],[389.421,306.922],[337.749,328.784],[404.851,324.362],[427.505,293.868],[308.11,240.119],[158.947,148.437],[33.048,-43.029],[14.972,-58.859]],"c":true}]},{"t":126,"s":[{"i":[[1.431,-0.806],[-1.983,-14.304],[-60.275,-71.803],[-51.735,-11.753],[-6.835,-2.142],[40.459,-1.148],[-0.119,-8.26],[-67.471,6.663],[-0.32,25.863],[94.02,31.906],[44.751,38.312],[13.537,22.547],[5.094,0]],"o":[[-8.409,4.738],[1.983,14.304],[63.939,76.171],[54.301,12.338],[23.244,7.285],[-34.038,0.966],[0.099,6.88],[21.734,-2.146],[0.486,-39.214],[-57.549,-19.529],[-88.483,-75.601],[-6.899,-11.494],[-1.642,0]],"v":[[10.86,-66.602],[2.877,-36.108],[77.893,168.296],[272.57,290.289],[393.636,321.739],[366.171,351.922],[242.749,362.784],[390.851,376.862],[451.644,335.238],[307.61,252.619],[161.947,169.438],[33.548,-52.029],[15.472,-67.859]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":78,"s":[223.055,226.653],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":90,"s":[223.055,204.012],"to":[0,0],"ti":[0,0]},{"t":119,"s":[223.055,226.653]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":78,"s":[222.398,419.727],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":90,"s":[222.398,334.336],"to":[0,0],"ti":[0,0]},{"t":119,"s":[222.398,419.727]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[219.736,143.498],"ix":2},"a":{"a":0,"k":[219.736,143.498],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":78,"op":126,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":10,"ty":4,"nm":"mouth smile","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[0.333],"y":[0]},"t":24,"s":[0]},{"i":{"x":[0.635],"y":[-0.043]},"o":{"x":[0.333],"y":[0]},"t":46,"s":[0]},{"i":{"x":[0.833],"y":[0.833]},"o":{"x":[0.446],"y":[0.247]},"t":55.092,"s":[1]},{"t":78,"s":[14]}],"ix":10},"p":{"a":1,"k":[{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":24,"s":[-6.494,97.069,0],"to":[0,0,0],"ti":[0,0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[-6.494,97.069,0],"to":[0,0,0],"ti":[0,0,0]},{"t":78,"s":[-6.494,127.069,0]}],"ix":2,"l":2},"a":{"a":0,"k":[0.006,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[9.589,-0.629],[-9.352,-9.912],[-113.762,0],[-11.615,11.348],[11.579,0],[88.494,0]],"o":[[-11.248,0.738],[8.567,8.79],[105.781,0],[9.557,-9.606],[-12.164,0],[-98.506,0]],"v":[[-170.589,-48.371],[-180.571,-24.286],[0.006,48.371],[180.366,-24.049],[170.664,-48.366],[0.006,-2.668]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":55.092,"s":[{"i":[[9.589,-0.629],[-9.352,-9.912],[-113.762,0],[-11.615,11.348],[11.579,0],[88.494,0]],"o":[[-11.248,0.738],[8.567,8.79],[105.781,0],[9.557,-9.606],[-12.164,0],[-98.506,0]],"v":[[-170.589,-48.371],[-180.571,-24.286],[0.006,48.371],[180.366,-24.049],[170.664,-48.366],[0.006,-2.668]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":60.545,"s":[{"i":[[16.313,-1.199],[-9.352,-9.913],[-113.717,-3.214],[-9.838,12.918],[11.455,-1.686],[88.643,4.235]],"o":[[-11.242,0.827],[8.567,8.79],[103.422,2.923],[8.056,-10.895],[-12.034,1.772],[-98.394,-4.7]],"v":[[-175.405,-46.357],[-185.387,-22.272],[0.006,48.371],[173.338,-27.379],[160.197,-50.024],[0.006,-2.668]],"c":true}]},{"t":78,"s":[{"i":[[16.313,-1.199],[-9.352,-9.913],[-72.241,-23.991],[-51.108,39.16],[11.455,-1.686],[97.846,21.042]],"o":[[-11.242,0.827],[8.567,8.79],[110.9,36.83],[8.056,-10.895],[-12.034,1.772],[-75.55,-16.247]],"v":[[-200.249,-71.596],[-210.231,-47.511],[-102.567,17.262],[142.898,-24.427],[129.757,-47.072],[-76.257,-25.393]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.254901960784,0.164705882353,0.050980392157,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0.008,-0.003],"ix":2},"a":{"a":0,"k":[0.008,-0.003],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":24,"op":78,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":11,"ty":4,"nm":"mouth 1","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-3.72,150.367,0],"ix":2,"l":2},"a":{"a":0,"k":[231.41,209.533,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0.859,-1.324],[-7.943,-8.876],[-34.187,-36.883],[-21.691,-40.556],[-14.63,-5.107],[-8.002,-0.008],[-0.543,7.933],[17.887,2.184],[32.445,10.2],[3.309,24.966],[29.142,33.618],[21.334,8.437],[4.313,-2.719]],"o":[[-5.044,7.78],[7.943,8.876],[47.349,51.084],[19.266,36.022],[40.056,13.983],[8.002,0.008],[0.396,-5.781],[-13.703,-1.673],[-24.762,-7.785],[-7.892,-59.542],[-39.293,-45.327],[-10.874,-4.3],[-1.39,0.877]],"v":[[41.799,74.92],[48.031,98.143],[164.281,200.651],[216.321,333.791],[269.26,379.842],[373.656,390.261],[411.234,381.016],[374.833,367.908],[309.392,355.02],[262.32,301.269],[228.488,185.617],[67.823,73.617],[45.153,71.585]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":5,"s":[{"i":[[1.177,-0.956],[-4.633,-10.47],[-45.862,-43.147],[-32.782,-17.17],[-31.178,-4.782],[-12.633,-1.321],[-3.093,4.161],[10.804,6.618],[27.739,5.251],[35.246,20.03],[35.254,27.785],[17.007,14.036],[4.749,-1.209]],"o":[[-6.918,5.619],[4.633,10.47],[54.849,52.195],[32.782,17.17],[30.923,4.743],[12.633,1.321],[5.684,-7.648],[-11.932,-7.309],[-26,-4.922],[-35.246,-20.03],[-46.398,-36.809],[-8.669,-7.154],[-1.531,0.39]],"v":[[37.571,51.844],[36.389,74.926],[110.17,177.651],[230.348,263.624],[325.207,293.551],[400.497,303.473],[427.946,304.442],[419.562,284.103],[359.391,267.543],[273.376,234.324],[170.209,156.617],[61.753,58.364],[41.626,49.788]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":9,"s":[{"i":[[1.275,-0.929],[-4.241,-11.131],[-45.151,-36.538],[-52.132,-7.368],[-12.937,-2.716],[-6.633,-4.475],[-7.262,3.239],[4.676,8.758],[10.906,5.192],[51.639,12.145],[40.143,23.118],[16.903,15.512],[5,-0.996]],"o":[[-7.494,5.46],[4.241,11.131],[62.771,50.797],[42.06,5.945],[12.201,2.562],[6.634,4.475],[7.262,-3.239],[-3.002,-5.624],[-9.278,-4.418],[-58.468,-13.751],[-52.082,-29.994],[-8.616,-7.906],[-1.612,0.321]],"v":[[39.16,48.56],[36.67,72.476],[99.281,146.651],[272.57,225.79],[347.429,235.551],[383.55,244.889],[406.921,253.663],[409.632,231.237],[385.408,213.03],[305.821,187.768],[161.987,129.617],[63.927,56.655],[43.485,46.646]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":12,"s":[{"i":[[0.693,-1.404],[-8.872,-7.884],[-44.39,-21.992],[-50.69,-0.034],[-15.68,0.434],[-5.484,-0.269],[-3.758,2.93],[1.358,4.525],[9.232,2.723],[50.296,6.213],[53.491,11.847],[11.047,4.76],[3.941,-3.168]],"o":[[-4.075,8.249],[8.872,7.884],[44.39,21.992],[25.814,0.017],[15.68,-0.434],[5.192,0.382],[5.353,-4.174],[-1.358,-4.525],[-9.232,-2.723],[-50.296,-6.213],[-42.809,-9.481],[-11.047,-4.76],[-1.27,1.021]],"v":[[42.679,71.684],[50.336,93.808],[115.24,138.707],[267.82,167.733],[339.45,168.133],[392.688,167.853],[409.277,162.873],[412.738,147.474],[396.112,137.172],[305.926,122.662],[151.139,102.352],[68.177,69.459],[45.602,68.015]],"c":true}]},{"t":24,"s":[{"i":[[0.909,-1.295],[-7.644,-9.295],[-34.813,-13.88],[-58.173,21.549],[-10.863,7.701],[-6.678,5.833],[-3.364,3.945],[3.009,5.305],[10.238,-3.112],[19.887,-7.051],[35.933,7.882],[21.086,9.451],[4.422,-2.546]],"o":[[-5.339,7.61],[7.644,9.295],[70.591,28.144],[32.174,-11.918],[10.31,-7.309],[6.206,-5.421],[3.364,-3.945],[-3.576,-6.305],[-10.238,3.112],[-84.271,29.878],[-46.726,-10.25],[-10.748,-4.817],[-1.426,0.821]],"v":[[47.03,113.801],[51.222,135.301],[121.039,182.591],[316.999,189.409],[372.784,161.69],[396.455,143.482],[410.484,128.887],[410.836,113.785],[392.085,108.473],[341.246,130.434],[169.197,148.353],[73.118,113.561],[50.513,110.592]],"c":true}]}],"ix":2},"nm":"Path 2","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":5,"k":{"a":0,"k":[0.28,0.255,0.165,0.051,0.41,0.378,0.261,0.088,0.54,0.502,0.357,0.125,0.71,0.616,0.449,0.143,0.88,0.729,0.541,0.161],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[223.055,226.653],"to":[0,0],"ti":[0,0]},{"t":24,"s":[223.055,226.653]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[222.398,419.727],"to":[0,0],"ti":[0,0]},{"t":24,"s":[222.398,419.727]}],"ix":6},"t":1,"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[225.323,230.275],"ix":2},"a":{"a":0,"k":[225.323,230.275],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":24,"st":-71,"ct":1,"bm":0},{"ddd":0,"ind":12,"ty":4,"nm":"base gradient 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-5.16,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[468.45,412.139,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":126,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-44.68,-14.53],[-0.449,-24.034],[-11.194,-12.881],[-8.84,-5.279],[-23.26,-5.932],[-27.441,-1.36],[-59.132,2.934],[-22.039,4.18],[-26.603,9.271],[-10.26,5.68],[-6.923,19.83],[-2.849,26.284],[-32.032,10.235],[0.28,9.1],[7.773,9.896],[6.346,13.883],[0.46,22.779],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[14.18,13.119],[54.397,17.691],[0.28,15],[10.54,12.129],[8.84,5.279],[42.568,10.855],[27.44,1.36],[65.3,-3.24],[27.964,-5.304],[22.27,-7.761],[16.102,-8.915],[5.9,-16.9],[3.44,-31.74],[26.1,-8.34],[-0.268,-8.722],[-4.43,-5.64],[-17.33,-37.91],[-0.52,-25.74],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-168.191],[-429.88,127.729],[-442.96,159.98],[-432.02,195.24],[-359.16,229.889],[-298.62,286.569],[-271.38,330.73],[-232.18,360.79],[-178.08,381.29],[-76.32,396.849],[54.86,399.809],[183.199,382.889],[262.14,361.869],[308.92,341.139],[351.76,302.219],[307.72,250.059],[425.56,199.909],[453.88,176.469],[438.84,146.959],[418.49,119.979],[402.68,9.809],[147.08,-385.311],[-31.405,-423.884]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":166,"s":[{"i":[[56.98,-116.137],[8.751,-7.674],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-3.567,-34.461],[12.403,-7.969],[-1.217,-15.273],[-34.874,-3.642],[-25.656,-3.551],[-102.141,2.418],[-36.183,6.05],[-33.271,3.684],[-8.964,19.259],[25.09,16.714],[0.512,31.635],[-24.62,6.347],[-0.96,18.158],[15.093,4.093],[9.925,24.465],[3.709,28.142],[150.378,74.653],[61.912,-0.652]],"o":[[-56.98,116.137],[-0.286,1.219],[-4.24,9.6],[16.16,13.84],[33.587,10.051],[1.823,24.049],[-13.809,9.234],[1.026,12.567],[41.643,4.954],[37.429,5.845],[102.14,-2.417],[33.219,-5.548],[33.271,-3.656],[8.306,-17.462],[-26.844,-19.264],[-0.186,-28.872],[33.334,-9.368],[0.708,-13.383],[-20.976,-5.688],[-6.466,-15.94],[-3.709,-28.142],[-69.145,-34.326],[-190.498,1.845]],"v":[[-375.86,-72.568],[-446.513,111.928],[-483.684,150.55],[-470.244,190.681],[-391.625,220.47],[-328.194,279.748],[-355.016,328.06],[-379.524,366.763],[-320.059,394.127],[-169.053,401.433],[63.493,434.89],[268.807,404.501],[386.786,399.074],[440.569,358.803],[411.162,304.208],[363.346,235.144],[439.582,184.94],[492.804,152.952],[459.136,130.257],[411.235,92.104],[393.869,16.711],[194.783,-257.084],[-27.301,-290.693]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":209,"s":[{"i":[[34.33,-46.736],[12.117,-5.151],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-6.374,-40.42],[10.855,-9.774],[-1.499,-17.73],[-40.704,-2.983],[-24.64,-4.799],[-99.441,2.61],[-49.413,8.357],[-22.921,6.65],[-9.205,24.155],[8.709,14.897],[0.86,23.771],[-11.773,4.801],[-1.091,22.826],[17.511,8.839],[27.78,8.03],[15.928,25.332],[78.71,30.671],[66.123,-1.021]],"o":[[-32.632,44.419],[0,0],[-4.24,9.6],[16.16,13.84],[21.501,6.435],[3.682,23.347],[-13.062,11.761],[1.337,15.807],[40.801,2.99],[43.12,8.4],[99.441,-2.61],[44.761,-7.57],[22.921,-6.65],[7.481,-19.63],[-10.874,-18.602],[-0.504,-13.922],[22.538,-9.191],[0.692,-14.478],[-15.399,-7.773],[-19.793,-5.721],[-42.12,-66.99],[-47.039,-18.33],[-186.937,2.886]],"v":[[-365.321,40.139],[-430.874,112.041],[-494.921,154.299],[-481.481,198.059],[-410.121,224.219],[-346.466,280.989],[-364.778,333.808],[-386.841,381.299],[-312.641,410.579],[-170.041,416.579],[60.72,449.179],[258.899,427.639],[417.24,402.718],[468.18,363.699],[452.452,311.672],[432.8,259.298],[462.122,226.26],[496.252,185.243],[477.559,146.842],[398.88,119.539],[349.28,73.559],[165.45,-77.851],[-24.963,-114.91]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[34.33,-46.736],[12.117,-5.151],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-6.374,-40.42],[10.855,-9.774],[-1.499,-17.73],[-40.704,-2.983],[-24.64,-4.799],[-99.441,2.61],[-49.413,8.357],[-22.921,6.65],[-9.205,24.155],[8.709,14.897],[0.861,23.771],[-11.773,4.801],[-1.091,22.826],[17.511,8.839],[27.78,8.03],[15.928,25.332],[78.71,30.671],[66.123,-1.021]],"o":[[-32.632,44.419],[0,0],[-4.24,9.6],[16.16,13.84],[21.501,6.435],[3.682,23.347],[-13.062,11.761],[1.337,15.807],[40.801,2.99],[43.12,8.4],[99.441,-2.61],[44.761,-7.57],[22.92,-6.65],[7.481,-19.63],[-10.875,-18.602],[-0.504,-13.922],[22.538,-9.191],[0.692,-14.478],[-15.399,-7.773],[-19.793,-5.721],[-42.12,-66.99],[-47.039,-18.33],[-186.937,2.886]],"v":[[-365.321,40.139],[-430.874,112.041],[-494.921,154.299],[-481.481,198.059],[-410.121,224.219],[-346.466,280.989],[-364.778,333.808],[-386.841,381.299],[-312.641,410.579],[-170.041,416.579],[60.719,449.179],[258.899,427.639],[417.24,402.718],[468.179,363.699],[452.452,311.672],[432.8,259.299],[462.122,226.26],[496.251,185.243],[477.559,146.842],[398.88,119.539],[349.28,73.559],[165.449,-77.851],[-24.963,-114.91]],"c":true}]},{"t":228,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.949,0.682,0.145,0.5,0.949,0.682,0.145,1,0.949,0.682,0.145,0.692,0,0.797,0.5,0.903,1,0.952,0.5,1,0],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.212,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[11.958,-579.804],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":209,"s":[8.536,-206.382],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[8.536,-206.382],"to":[0,0],"ti":[0,0]},{"t":228,"s":[11.958,-579.804]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.212,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[-2.966,328.231],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":209,"s":[4.093,435.188],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[4.093,435.188],"to":[0,0],"ti":[0,0]},{"t":228,"s":[-2.966,328.231]}],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[468.45,412.139],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":126,"op":229,"st":126,"ct":1,"bm":0},{"ddd":0,"ind":13,"ty":4,"nm":"gradient mask 2","parent":1,"td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,3.569,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,338.684],[551.605,338.684]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.584768317727,0.218993078494,0.876240808824,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1.605,-227.316],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":126,"op":229,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":14,"ty":4,"nm":"base gradient 1","parent":1,"tt":1,"tp":13,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-5.16,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[468.45,412.139,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":126,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-44.68,-14.53],[-0.449,-24.034],[-11.194,-12.881],[-8.84,-5.279],[-23.26,-5.932],[-27.441,-1.36],[-59.132,2.934],[-22.039,4.18],[-26.603,9.271],[-10.26,5.68],[-6.923,19.83],[-2.849,26.284],[-32.032,10.235],[0.28,9.1],[7.773,9.896],[6.346,13.883],[0.46,22.779],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[14.18,13.119],[54.397,17.691],[0.28,15],[10.54,12.129],[8.84,5.279],[42.568,10.855],[27.44,1.36],[65.3,-3.24],[27.964,-5.304],[22.27,-7.761],[16.102,-8.915],[5.9,-16.9],[3.44,-31.74],[26.1,-8.34],[-0.268,-8.722],[-4.43,-5.64],[-17.33,-37.91],[-0.52,-25.74],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-168.191],[-429.88,127.729],[-442.96,159.98],[-432.02,195.24],[-359.16,229.889],[-298.62,286.569],[-271.38,330.73],[-232.18,360.79],[-178.08,381.29],[-76.32,396.849],[54.86,399.809],[183.199,382.889],[262.14,361.869],[308.92,341.139],[351.76,302.219],[307.72,250.059],[425.56,199.909],[453.88,176.469],[438.84,146.959],[418.49,119.979],[402.68,9.809],[147.08,-385.311],[-31.405,-423.884]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":166,"s":[{"i":[[56.98,-116.137],[8.751,-7.674],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-3.567,-34.461],[12.403,-7.969],[-1.217,-15.273],[-34.874,-3.642],[-25.656,-3.551],[-102.141,2.418],[-36.183,6.05],[-33.271,3.684],[-8.964,19.259],[25.09,16.714],[0.512,31.635],[-24.62,6.347],[-0.96,18.158],[15.093,4.093],[9.925,24.465],[3.709,28.142],[150.378,74.653],[61.912,-0.652]],"o":[[-56.98,116.137],[-0.286,1.219],[-4.24,9.6],[16.16,13.84],[33.587,10.051],[1.823,24.049],[-13.809,9.234],[1.026,12.567],[41.643,4.954],[37.429,5.845],[102.14,-2.417],[33.219,-5.548],[33.271,-3.656],[8.306,-17.462],[-26.844,-19.264],[-0.186,-28.872],[33.334,-9.368],[0.708,-13.383],[-20.976,-5.688],[-6.466,-15.94],[-3.709,-28.142],[-69.145,-34.326],[-190.498,1.845]],"v":[[-375.86,-72.568],[-446.513,111.928],[-483.684,150.55],[-470.244,190.681],[-391.625,220.47],[-328.194,279.748],[-355.016,328.06],[-379.524,366.763],[-320.059,394.127],[-169.053,401.433],[63.493,434.89],[268.807,404.501],[386.786,399.074],[440.569,358.803],[411.162,304.208],[363.346,235.144],[439.582,184.94],[492.804,152.952],[459.136,130.257],[411.235,92.104],[393.869,16.711],[194.783,-257.084],[-27.301,-290.693]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":209,"s":[{"i":[[34.33,-46.736],[12.117,-5.151],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-6.374,-40.42],[10.855,-9.774],[-1.499,-17.73],[-40.704,-2.983],[-24.64,-4.799],[-99.441,2.61],[-49.413,8.357],[-22.921,6.65],[-9.205,24.155],[8.709,14.897],[0.86,23.771],[-11.773,4.801],[-1.091,22.826],[17.511,8.839],[27.78,8.03],[15.928,25.332],[78.71,30.671],[66.123,-1.021]],"o":[[-32.632,44.419],[0,0],[-4.24,9.6],[16.16,13.84],[21.501,6.435],[3.682,23.347],[-13.062,11.761],[1.337,15.807],[40.801,2.99],[43.12,8.4],[99.441,-2.61],[44.761,-7.57],[22.921,-6.65],[7.481,-19.63],[-10.874,-18.602],[-0.504,-13.922],[22.538,-9.191],[0.692,-14.478],[-15.399,-7.773],[-19.793,-5.721],[-42.12,-66.99],[-47.039,-18.33],[-186.937,2.886]],"v":[[-365.321,40.139],[-430.874,112.041],[-494.921,154.299],[-481.481,198.059],[-410.121,224.219],[-346.466,280.989],[-364.778,333.808],[-386.841,381.299],[-312.641,410.579],[-170.041,416.579],[60.72,449.179],[258.899,427.639],[417.24,402.718],[468.18,363.699],[452.452,311.672],[432.8,259.298],[462.122,226.26],[496.252,185.243],[477.559,146.842],[398.88,119.539],[349.28,73.559],[165.45,-77.851],[-24.963,-114.91]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[34.33,-46.736],[12.117,-5.151],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-6.374,-40.42],[10.855,-9.774],[-1.499,-17.73],[-40.704,-2.983],[-24.64,-4.799],[-99.441,2.61],[-49.413,8.357],[-22.921,6.65],[-9.205,24.155],[8.709,14.897],[0.861,23.771],[-11.773,4.801],[-1.091,22.826],[17.511,8.839],[27.78,8.03],[15.928,25.332],[78.71,30.671],[66.123,-1.021]],"o":[[-32.632,44.419],[0,0],[-4.24,9.6],[16.16,13.84],[21.501,6.435],[3.682,23.347],[-13.062,11.761],[1.337,15.807],[40.801,2.99],[43.12,8.4],[99.441,-2.61],[44.761,-7.57],[22.92,-6.65],[7.481,-19.63],[-10.875,-18.602],[-0.504,-13.922],[22.538,-9.191],[0.692,-14.478],[-15.399,-7.773],[-19.793,-5.721],[-42.12,-66.99],[-47.039,-18.33],[-186.937,2.886]],"v":[[-365.321,40.139],[-430.874,112.041],[-494.921,154.299],[-481.481,198.059],[-410.121,224.219],[-346.466,280.989],[-364.778,333.808],[-386.841,381.299],[-312.641,410.579],[-170.041,416.579],[60.719,449.179],[258.899,427.639],[417.24,402.718],[468.179,363.699],[452.452,311.672],[432.8,259.299],[462.122,226.26],[496.251,185.243],[477.559,146.842],[398.88,119.539],[349.28,73.559],[165.449,-77.851],[-24.963,-114.91]],"c":true}]},{"t":228,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.933,0.686,0.173,0.5,0.933,0.686,0.173,1,0.933,0.686,0.173,0.806,0,0.855,0.5,0.903,1,0.952,0.5,1,0],"ix":9}},"s":{"a":0,"k":[-18.313,14.891],"ix":5},"e":{"a":0,"k":[440.25,11.195],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[468.45,412.139],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":126,"op":229,"st":126,"ct":1,"bm":0},{"ddd":0,"ind":15,"ty":4,"nm":"base 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-5.16,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[468.45,412.139,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":126,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-44.68,-14.53],[-0.449,-24.034],[-11.194,-12.881],[-8.84,-5.279],[-23.26,-5.931],[-27.441,-1.36],[-59.132,2.934],[-22.039,4.18],[-26.603,9.271],[-10.26,5.68],[-6.923,19.83],[-2.849,26.284],[-32.032,10.236],[0.28,9.1],[7.773,9.897],[6.346,13.883],[0.46,22.779],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[14.18,13.118],[54.397,17.691],[0.28,15],[10.54,12.129],[8.84,5.279],[42.568,10.855],[27.44,1.36],[65.3,-3.24],[27.964,-5.304],[22.27,-7.761],[16.102,-8.915],[5.9,-16.9],[3.44,-31.74],[26.1,-8.34],[-0.268,-8.722],[-4.43,-5.64],[-17.33,-37.91],[-0.52,-25.74],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-168.191],[-429.88,127.729],[-442.96,159.98],[-432.02,195.24],[-359.16,229.889],[-298.62,286.569],[-271.38,330.73],[-232.18,360.79],[-178.08,381.29],[-76.32,396.849],[54.86,399.809],[183.199,382.889],[262.14,361.869],[308.92,341.139],[351.76,302.219],[307.72,250.059],[425.56,199.909],[453.88,176.469],[438.84,146.959],[418.49,119.979],[402.68,9.809],[147.08,-385.311],[-31.405,-423.884]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":166,"s":[{"i":[[56.98,-116.137],[8.751,-7.674],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-3.567,-34.461],[12.403,-7.969],[-1.217,-15.273],[-34.874,-3.642],[-25.656,-3.551],[-102.141,2.418],[-36.183,6.05],[-33.271,3.684],[-8.964,19.259],[25.09,16.714],[0.512,31.635],[-24.62,6.347],[-0.96,18.158],[15.093,4.093],[9.925,24.465],[3.709,28.142],[150.378,74.653],[61.912,-0.652]],"o":[[-56.98,116.137],[-0.286,1.219],[-4.24,9.6],[16.16,13.84],[33.587,10.051],[1.823,24.049],[-13.809,9.234],[1.026,12.567],[41.643,4.954],[37.429,5.845],[102.14,-2.417],[33.219,-5.548],[33.271,-3.656],[8.306,-17.462],[-26.844,-19.264],[-0.186,-28.872],[33.334,-9.368],[0.708,-13.383],[-20.976,-5.688],[-6.466,-15.94],[-3.709,-28.142],[-69.145,-34.326],[-190.498,1.845]],"v":[[-375.86,-72.568],[-446.513,111.928],[-483.684,150.55],[-470.244,190.681],[-391.625,220.47],[-328.194,279.748],[-355.016,328.06],[-379.524,366.763],[-320.059,394.127],[-169.053,401.433],[63.493,434.89],[268.807,404.501],[386.786,399.074],[440.569,358.803],[411.162,304.208],[363.346,235.144],[439.582,184.94],[492.804,152.952],[459.136,130.257],[411.235,92.104],[393.869,16.711],[194.783,-257.084],[-27.301,-290.693]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0},"t":209,"s":[{"i":[[34.33,-46.736],[12.117,-5.151],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-6.374,-40.42],[10.855,-9.774],[-1.499,-17.73],[-40.704,-2.983],[-24.64,-4.799],[-99.441,2.61],[-49.413,8.357],[-22.921,6.65],[-9.205,24.155],[8.709,14.897],[0.86,23.771],[-11.773,4.801],[-1.091,22.826],[17.511,8.839],[27.78,8.03],[15.928,25.333],[78.71,30.671],[66.123,-1.021]],"o":[[-32.632,44.419],[0,0],[-4.24,9.6],[16.16,13.84],[21.501,6.435],[3.682,23.347],[-13.062,11.761],[1.337,15.807],[40.801,2.99],[43.12,8.4],[99.441,-2.61],[44.761,-7.57],[22.921,-6.65],[7.481,-19.63],[-10.874,-18.602],[-0.504,-13.922],[22.538,-9.191],[0.692,-14.478],[-15.399,-7.773],[-19.793,-5.721],[-42.12,-66.99],[-47.039,-18.33],[-186.937,2.886]],"v":[[-365.321,40.139],[-430.874,112.041],[-494.921,154.299],[-481.481,198.059],[-410.121,224.219],[-346.466,280.989],[-364.778,333.808],[-386.841,381.299],[-312.641,410.579],[-170.041,416.579],[60.719,449.179],[258.899,427.639],[417.24,402.718],[468.179,363.699],[452.451,311.672],[432.8,259.299],[462.122,226.26],[496.251,185.243],[477.559,146.842],[398.88,119.539],[349.28,73.559],[165.449,-77.851],[-24.963,-114.91]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[34.33,-46.736],[12.117,-5.151],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[-6.374,-40.42],[10.855,-9.774],[-1.499,-17.73],[-40.704,-2.983],[-24.64,-4.799],[-99.441,2.61],[-49.413,8.357],[-22.921,6.65],[-9.205,24.155],[8.709,14.897],[0.861,23.771],[-11.773,4.801],[-1.091,22.826],[17.511,8.839],[27.78,8.03],[15.928,25.332],[78.71,30.671],[66.123,-1.021]],"o":[[-32.632,44.419],[0,0],[-4.24,9.6],[16.16,13.84],[21.501,6.435],[3.682,23.347],[-13.062,11.761],[1.337,15.807],[40.801,2.99],[43.12,8.4],[99.441,-2.61],[44.761,-7.57],[22.92,-6.65],[7.481,-19.63],[-10.875,-18.602],[-0.504,-13.922],[22.538,-9.191],[0.692,-14.478],[-15.399,-7.773],[-19.793,-5.721],[-42.12,-66.99],[-47.039,-18.33],[-186.937,2.886]],"v":[[-365.321,40.139],[-430.874,112.041],[-494.921,154.299],[-481.481,198.059],[-410.121,224.219],[-346.466,280.989],[-364.778,333.808],[-386.841,381.299],[-312.641,410.579],[-170.041,416.579],[60.719,449.179],[258.899,427.639],[417.24,402.718],[468.179,363.699],[452.452,311.672],[432.8,259.299],[462.122,226.26],[496.251,185.243],[477.559,146.842],[398.88,119.539],[349.28,73.559],[165.449,-77.851],[-24.963,-114.91]],"c":true}]},{"t":228,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0.294,0.992,0.863,0.184,0.531,0.984,0.814,0.176,0.768,0.976,0.765,0.169],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0.212,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[-8.677,25.509],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":209,"s":[-17.661,176.65],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[-17.661,176.65],"to":[0,0],"ti":[0,0]},{"t":228,"s":[-8.677,25.509]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0.212,"y":1},"o":{"x":0.333,"y":0},"t":150,"s":[541.501,93.866],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":0.667},"o":{"x":0.333,"y":0.333},"t":209,"s":[467.923,123.006],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[467.923,123.006],"to":[0,0],"ti":[0,0]},{"t":228,"s":[541.501,93.866]}],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[468.45,412.139],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":126,"op":229,"st":126,"ct":1,"bm":0},{"ddd":0,"ind":16,"ty":4,"nm":"base round gradient 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-2,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":24,"s":[{"i":[[72.359,0],[28.494,4.937],[19.454,6.016],[35.919,26.053],[21.514,29.959],[11.442,40.39],[0,43.512],[-199.329,0],[-75.731,-66.443],[0,-120.741],[10.508,-33.714],[18.414,-27.996],[34.109,-26.316],[22.184,-11.444]],"o":[[-27.883,0],[-19.854,-3.44],[-41.982,-12.981],[-28.665,-20.791],[-21.735,-30.266],[-9.986,-35.25],[0,-274.346],[110.738,0],[82.161,72.873],[0,37.258],[-10.104,32.417],[-23.301,35.426],[-19.396,14.965],[-59.211,30.545]],"v":[[-10,363.373],[-94.988,356.076],[-154.093,341.929],[-272.38,283.746],[-348.379,207.807],[-398.897,102.016],[-414.376,-16],[0,-415.373],[288.635,-312.493],[398.377,-15],[382.227,91.773],[339.105,182.673],[252.293,275.854],[189.795,315.572]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[72.359,0],[28.494,4.937],[19.454,6.016],[35.919,26.053],[21.514,29.959],[11.442,40.39],[0,43.512],[-199.329,0],[-75.731,-66.443],[0,-120.741],[10.508,-33.714],[18.414,-27.996],[34.109,-26.316],[22.184,-11.444]],"o":[[-27.883,0],[-19.854,-3.44],[-41.982,-12.981],[-28.665,-20.791],[-21.735,-30.266],[-9.986,-35.25],[0,-274.346],[110.738,0],[82.161,72.873],[0,37.258],[-10.104,32.417],[-23.301,35.426],[-19.396,14.965],[-59.211,30.545]],"v":[[-10,363.373],[-94.988,356.076],[-154.093,341.929],[-272.38,283.746],[-348.379,207.807],[-398.897,102.016],[-414.376,-16],[0,-415.373],[288.635,-312.493],[398.377,-15],[382.227,91.773],[339.105,182.673],[252.293,275.854],[189.795,315.572]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":102,"s":[{"i":[[69.899,0],[47.993,10.241],[29.736,13.789],[17.114,8.776],[21.988,25.547],[0.557,43.105],[0,35.544],[-199.329,0],[-75.731,-66.443],[0,-120.741],[6.076,-34.342],[-2.526,-33.039],[13.978,-11.48],[22.238,-10.319]],"o":[[-25.978,0],[-33.441,-7.136],[-67.012,-31.074],[-37.898,-19.433],[-22.238,-25.838],[-0.392,-30.324],[0,-274.346],[110.738,0],[82.161,72.873],[0,36.297],[-6.305,35.633],[1.501,19.63],[-17.399,14.29],[-59.356,27.542]],"v":[[0,348.373],[-119.692,334.032],[-217.412,302.991],[-300.114,249.794],[-388.762,207.407],[-408.557,113.464],[-412.376,-38],[0,-432.373],[288.635,-329.493],[408.377,-32],[390.609,98.323],[384.526,201.608],[319.022,243.049],[203.687,308.632]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":114,"s":[{"i":[[112.637,0.127],[44.725,5.58],[26.04,11.325],[17.114,8.776],[21.988,25.547],[0.557,43.105],[0,35.544],[-199.329,0],[-75.731,-66.443],[0,-120.741],[-6.609,-36.754],[8.776,-18.389],[37.708,-27.03],[22.175,-12.646]],"o":[[-25.978,-0.029],[-31.163,-3.888],[-67.737,-29.459],[-37.898,-19.433],[-22.238,-25.838],[-0.392,-30.324],[0,-274.346],[110.738,0],[82.161,72.873],[0,36.297],[6.404,35.616],[-9.526,19.961],[-30.022,21.52],[-58.283,33.239]],"v":[[6.001,344.373],[-108.687,338.837],[-197.412,316.991],[-305.114,261.794],[-431.762,205.407],[-430.557,126.464],[-432.376,3],[-20,-424.373],[282.635,-313.493],[401.377,-24],[400.609,97.323],[438.526,201.608],[341.022,239.049],[270.825,299.216]],"c":true}]},{"t":126,"s":[{"i":[[112.58,3.576],[46.844,13.178],[27.309,17.214],[14.725,12.372],[27.158,39.583],[-0.105,43.109],[-0.546,35.54],[-199.306,-3.059],[-74.702,-67.598],[1.853,-120.727],[-8.151,-29.883],[9.058,-18.252],[12.159,-44.773],[49.747,-36.887]],"o":[[-58.627,-1.862],[-41.016,-11.539],[-51.099,-32.21],[-35.434,-29.772],[-19.286,-28.11],[0.074,-30.327],[4.211,-274.313],[110.725,1.7],[81.033,74.126],[-0.557,36.293],[9.523,34.911],[-9.832,19.812],[-7.444,27.409],[-53.896,39.963]],"v":[[-3.1,400.336],[-177.021,382.516],[-266.509,332.902],[-309.066,258.043],[-440.619,185.629],[-432.279,111.804],[-432.879,8.322],[-25.867,-424.854],[290.783,-293.099],[401.19,-5.877],[407.204,97.547],[450.807,183.512],[304.296,248.325],[325.87,328.219]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.949,0.682,0.145,0.5,0.949,0.682,0.145,1,0.949,0.682,0.145,0.692,0,0.797,0.5,0.903,1,0.952,0.5,1,0],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[11.958,-579.804],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.333,"y":0.333},"t":24,"s":[2.001,-53.041],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[2.001,-53.041],"to":[0,0],"ti":[0,0]},{"t":119,"s":[11.958,-579.804]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[-2.966,328.231],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.333,"y":0.333},"t":24,"s":[-9.274,464.89],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[-9.274,464.89],"to":[0,0],"ti":[0,0]},{"t":119,"s":[-2.966,328.231]}],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":24,"op":126,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":17,"ty":4,"nm":"gradient mask","parent":1,"td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,3.569,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,338.684],[551.605,338.684]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":24,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,618.896],[551.605,618.896]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,618.896],[551.605,618.896]],"c":true}]},{"t":119,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,338.684],[551.605,338.684]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.584768317727,0.218993078494,0.876240808824,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1.605,-227.316],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":24,"op":126,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":18,"ty":4,"nm":"base round gradient 1","parent":1,"tt":1,"tp":17,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-2,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":24,"s":[{"i":[[72.359,0],[28.494,4.937],[19.454,6.016],[35.919,26.053],[21.514,29.959],[11.442,40.39],[0,43.512],[-199.329,0],[-75.731,-66.443],[0,-120.741],[10.508,-33.714],[18.414,-27.996],[34.109,-26.316],[22.184,-11.444]],"o":[[-27.883,0],[-19.854,-3.44],[-41.982,-12.981],[-28.665,-20.791],[-21.735,-30.266],[-9.986,-35.25],[0,-274.346],[110.738,0],[82.161,72.873],[0,37.258],[-10.104,32.417],[-23.301,35.426],[-19.396,14.965],[-59.211,30.545]],"v":[[-10,363.373],[-94.988,356.076],[-154.093,341.929],[-272.38,283.746],[-348.379,207.807],[-398.897,102.016],[-414.376,-16],[0,-415.373],[288.635,-312.493],[398.377,-15],[382.227,91.773],[339.105,182.673],[252.293,275.854],[189.795,315.572]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[72.359,0],[28.494,4.937],[19.454,6.016],[35.919,26.053],[21.514,29.959],[11.442,40.39],[0,43.512],[-199.329,0],[-75.731,-66.443],[0,-120.741],[10.508,-33.714],[18.414,-27.996],[34.109,-26.316],[22.184,-11.444]],"o":[[-27.883,0],[-19.854,-3.44],[-41.982,-12.981],[-28.665,-20.791],[-21.735,-30.266],[-9.986,-35.25],[0,-274.346],[110.738,0],[82.161,72.873],[0,37.258],[-10.104,32.417],[-23.301,35.426],[-19.396,14.965],[-59.211,30.545]],"v":[[-10,363.373],[-94.988,356.076],[-154.093,341.929],[-272.38,283.746],[-348.379,207.807],[-398.897,102.016],[-414.376,-16],[0,-415.373],[288.635,-312.493],[398.377,-15],[382.227,91.773],[339.105,182.673],[252.293,275.854],[189.795,315.572]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":102,"s":[{"i":[[69.899,0],[47.993,10.241],[29.736,13.789],[17.114,8.776],[21.988,25.547],[0.557,43.105],[0,35.544],[-199.329,0],[-75.731,-66.443],[0,-120.741],[6.076,-34.342],[-2.526,-33.039],[13.978,-11.48],[22.238,-10.319]],"o":[[-25.978,0],[-33.441,-7.136],[-67.012,-31.074],[-37.898,-19.433],[-22.238,-25.838],[-0.392,-30.324],[0,-274.346],[110.738,0],[82.161,72.873],[0,36.297],[-6.305,35.633],[1.501,19.63],[-17.399,14.29],[-59.356,27.542]],"v":[[0,348.373],[-119.692,334.032],[-217.412,302.991],[-300.114,249.794],[-388.762,207.407],[-408.557,113.464],[-412.376,-38],[0,-432.373],[288.635,-329.493],[408.377,-32],[390.609,98.323],[384.526,201.608],[319.022,243.049],[203.687,308.632]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":114,"s":[{"i":[[112.637,0.127],[44.725,5.58],[26.04,11.325],[17.114,8.776],[21.988,25.547],[0.557,43.105],[0,35.544],[-199.329,0],[-75.731,-66.443],[0,-120.741],[-6.609,-36.754],[8.776,-18.389],[37.708,-27.03],[22.175,-12.646]],"o":[[-25.978,-0.029],[-31.163,-3.888],[-67.737,-29.459],[-37.898,-19.433],[-22.238,-25.838],[-0.392,-30.324],[0,-274.346],[110.738,0],[82.161,72.873],[0,36.297],[6.404,35.616],[-9.526,19.961],[-30.022,21.52],[-58.283,33.239]],"v":[[6.001,344.373],[-108.687,338.837],[-197.412,316.991],[-305.114,261.794],[-431.762,205.407],[-430.557,126.464],[-432.376,3],[-20,-424.373],[282.635,-313.493],[401.377,-24],[400.609,97.323],[438.526,201.608],[341.022,239.049],[270.825,299.216]],"c":true}]},{"t":126,"s":[{"i":[[112.58,3.576],[46.844,13.178],[27.309,17.214],[14.725,12.372],[27.158,39.583],[-0.105,43.109],[-0.546,35.54],[-199.306,-3.059],[-74.702,-67.598],[1.853,-120.727],[-8.151,-29.883],[9.058,-18.252],[12.159,-44.773],[49.747,-36.887]],"o":[[-58.627,-1.862],[-41.016,-11.539],[-51.099,-32.21],[-35.434,-29.772],[-19.286,-28.11],[0.074,-30.327],[4.211,-274.313],[110.725,1.7],[81.033,74.126],[-0.557,36.293],[9.523,34.911],[-9.832,19.812],[-7.444,27.409],[-53.896,39.963]],"v":[[-3.1,400.336],[-177.021,382.516],[-266.509,332.902],[-309.066,258.043],[-440.619,185.629],[-432.279,111.804],[-432.879,8.322],[-25.867,-424.854],[290.783,-293.099],[401.19,-5.877],[407.204,97.547],[450.807,183.512],[304.296,248.325],[325.87,328.219]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.933,0.686,0.173,0.5,0.933,0.686,0.173,1,0.933,0.686,0.173,0.806,0,0.855,0.5,0.903,1,0.952,0.5,1,0],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[-18.313,14.891],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.333,"y":0.333},"t":24,"s":[-1.865,-16.756],"to":[0,0],"ti":[0,0]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":46,"s":[-1.865,-16.756],"to":[0,0],"ti":[0,0]},{"t":119,"s":[-18.313,14.891]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0,"y":0},"o":{"x":0.167,"y":0.167},"t":0,"s":[440.25,11.195],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.167,"y":0.167},"t":24,"s":[440.25,11.195],"to":[0,0],"ti":[0,0]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":46,"s":[440.25,11.195],"to":[0,0],"ti":[0,0]},{"t":119,"s":[440.25,11.195]}],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":24,"op":126,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":19,"ty":4,"nm":"base round","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-2,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":24,"s":[{"i":[[72.359,0],[28.494,4.937],[19.454,6.016],[35.919,26.053],[21.514,29.959],[11.442,40.39],[0,43.512],[-199.329,0],[-75.731,-66.443],[0,-120.741],[10.508,-33.714],[18.414,-27.996],[34.109,-26.316],[22.184,-11.444]],"o":[[-27.883,0],[-19.854,-3.44],[-41.982,-12.981],[-28.665,-20.791],[-21.735,-30.266],[-9.986,-35.25],[0,-274.346],[110.738,0],[82.161,72.873],[0,37.258],[-10.104,32.417],[-23.301,35.426],[-19.396,14.965],[-59.211,30.545]],"v":[[-10,363.373],[-94.988,356.076],[-154.093,341.929],[-272.38,283.746],[-348.379,207.807],[-398.897,102.016],[-414.376,-16],[0,-415.373],[288.635,-312.493],[398.377,-15],[382.227,91.773],[339.105,182.673],[252.293,275.854],[189.795,315.572]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":78,"s":[{"i":[[72.359,0],[28.494,4.937],[19.454,6.016],[35.919,26.053],[21.514,29.959],[11.442,40.39],[0,43.512],[-199.329,0],[-75.731,-66.443],[0,-120.741],[10.508,-33.714],[18.414,-27.996],[34.109,-26.316],[22.184,-11.444]],"o":[[-27.883,0],[-19.854,-3.44],[-41.982,-12.981],[-28.665,-20.791],[-21.735,-30.266],[-9.986,-35.25],[0,-274.346],[110.738,0],[82.161,72.873],[0,37.258],[-10.104,32.417],[-23.301,35.426],[-19.396,14.965],[-59.211,30.545]],"v":[[-10,363.373],[-94.988,356.076],[-154.093,341.929],[-272.38,283.746],[-348.379,207.807],[-398.897,102.016],[-414.376,-16],[0,-415.373],[288.635,-312.493],[398.377,-15],[382.227,91.773],[339.105,182.673],[252.293,275.854],[189.795,315.572]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":102,"s":[{"i":[[69.899,0],[47.993,10.241],[29.736,13.789],[17.114,8.776],[21.988,25.547],[0.557,43.105],[0,35.544],[-199.329,0],[-75.731,-66.443],[0,-120.741],[6.076,-34.342],[-2.526,-33.039],[13.978,-11.48],[22.238,-10.319]],"o":[[-25.978,0],[-33.441,-7.136],[-67.012,-31.074],[-37.898,-19.433],[-22.238,-25.838],[-0.392,-30.324],[0,-274.346],[110.738,0],[82.161,72.873],[0,36.297],[-6.305,35.633],[1.501,19.63],[-17.399,14.29],[-59.356,27.542]],"v":[[0,348.373],[-119.692,334.032],[-217.412,302.991],[-300.114,249.794],[-388.762,207.407],[-408.557,113.464],[-412.376,-38],[0,-432.373],[288.635,-329.493],[408.377,-32],[390.609,98.323],[384.526,201.608],[319.022,243.049],[203.687,308.632]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":114,"s":[{"i":[[112.637,0.127],[44.725,5.58],[26.04,11.325],[17.114,8.776],[21.988,25.547],[0.557,43.105],[0,35.544],[-199.329,0],[-75.731,-66.443],[0,-120.741],[-6.609,-36.754],[8.776,-18.389],[37.708,-27.03],[22.175,-12.646]],"o":[[-25.978,-0.029],[-31.163,-3.888],[-67.737,-29.459],[-37.898,-19.433],[-22.238,-25.838],[-0.392,-30.324],[0,-274.346],[110.738,0],[82.161,72.873],[0,36.297],[6.404,35.616],[-9.526,19.961],[-30.022,21.52],[-58.283,33.239]],"v":[[6.001,344.373],[-108.687,338.837],[-197.412,316.991],[-305.114,261.794],[-431.762,205.407],[-430.557,126.464],[-432.376,3],[-20,-424.373],[282.635,-313.493],[401.377,-24],[400.609,97.323],[438.526,201.608],[341.022,239.049],[270.825,299.216]],"c":true}]},{"t":126,"s":[{"i":[[112.58,3.576],[46.844,13.178],[27.309,17.214],[14.725,12.372],[27.158,39.583],[-0.105,43.109],[-0.546,35.54],[-199.306,-3.059],[-74.702,-67.598],[1.853,-120.727],[-8.151,-29.883],[9.058,-18.252],[12.159,-44.773],[49.747,-36.887]],"o":[[-58.627,-1.862],[-41.016,-11.539],[-51.099,-32.21],[-35.434,-29.772],[-19.286,-28.11],[0.074,-30.327],[4.211,-274.313],[110.725,1.7],[81.033,74.126],[-0.557,36.293],[9.523,34.911],[-9.832,19.812],[-7.444,27.409],[-53.896,39.963]],"v":[[-3.1,400.336],[-177.021,382.516],[-266.509,332.902],[-309.066,258.043],[-440.619,185.629],[-432.279,111.804],[-432.879,8.322],[-25.867,-424.854],[290.783,-293.099],[401.19,-5.877],[407.204,97.547],[450.807,183.512],[304.296,248.325],[325.87,328.219]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0.294,0.992,0.863,0.184,0.531,0.984,0.814,0.176,0.768,0.976,0.765,0.169],"ix":9}},"s":{"a":0,"k":[-8.677,25.509],"ix":5},"e":{"a":0,"k":[541.501,93.866],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":24,"op":126,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":20,"ty":4,"nm":"base gradient 2","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-5.16,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[468.45,412.139,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":12,"s":[{"i":[[53.465,-141.426],[-2.061,-11.6],[-5.922,-17.696],[-4.869,-11.512],[-9.059,-13.693],[-20.442,-17.959],[-14.949,-9.067],[-15.369,-7.287],[-7.177,-2.066],[-26.476,-4.709],[-53.714,1.257],[-12.402,3.262],[-18.554,6.918],[-6.485,3.361],[-18.614,14.954],[-16.14,20.932],[-6.806,11.187],[-2.242,5.646],[-2.719,7.983],[-2.022,8.003],[-1.535,13.572],[154.115,73.424],[78.387,-0.547]],"o":[[-45.415,120.133],[2.749,15.469],[4.591,13.719],[5.264,12.448],[13.15,19.876],[21.998,19.327],[17.323,10.507],[14.934,7.08],[12.56,3.615],[24.639,4.383],[61.059,-1.429],[22.169,-5.831],[22.502,-8.39],[15.478,-8.021],[14.14,-11.359],[15.261,-19.792],[6.467,-10.63],[3.588,-9.036],[3.009,-8.835],[3.607,-14.278],[18.505,-163.645],[-56.26,-26.804],[-192.572,1.344]],"v":[[-386.305,-167.005],[-402.526,82.35],[-388.918,130.765],[-374.911,165.393],[-356.74,210.693],[-304.398,258.778],[-249.913,299.562],[-202.399,324.801],[-156.785,342.02],[-106.229,355.061],[-0.899,363.998],[104.241,350.4],[157.714,332.651],[193.432,316.778],[255.274,278.365],[323.649,234.611],[350.466,170.132],[364.947,141.855],[374.026,120.529],[382.182,96.566],[398.155,23.214],[207.545,-365.355],[1.273,-412.384]],"c":true}]},{"t":24,"s":[{"i":[[53.465,-141.426],[-2.061,-11.6],[-5.922,-17.696],[-4.869,-11.512],[-9.059,-13.693],[-20.442,-17.959],[-14.949,-9.067],[-15.369,-7.287],[-7.177,-2.066],[-26.476,-4.709],[-53.714,1.257],[-12.402,3.262],[-18.554,6.918],[-6.485,3.361],[-18.614,14.954],[-16.14,20.932],[-6.806,11.187],[-2.242,5.646],[-2.719,7.983],[-2.022,8.003],[-1.535,13.572],[154.115,73.424],[78.387,-0.547]],"o":[[-45.415,120.133],[2.749,15.469],[4.591,13.719],[5.264,12.448],[13.15,19.876],[21.998,19.327],[17.323,10.507],[14.934,7.08],[12.56,3.615],[24.639,4.383],[61.059,-1.429],[22.169,-5.831],[22.502,-8.39],[15.478,-8.021],[14.14,-11.359],[15.261,-19.792],[6.467,-10.63],[3.588,-9.036],[3.009,-8.835],[3.607,-14.278],[18.505,-163.645],[-56.26,-26.804],[-192.572,1.344]],"v":[[-386.305,-167.005],[-402.526,82.35],[-388.918,130.765],[-374.911,165.393],[-357.74,198.693],[-304.398,258.778],[-249.913,299.562],[-202.399,324.801],[-156.785,342.02],[-106.229,355.061],[-0.899,363.998],[104.241,350.4],[157.714,332.651],[193.432,316.778],[255.274,278.365],[315.649,220.611],[350.466,170.132],[364.947,141.855],[374.026,120.529],[382.182,96.566],[398.155,23.214],[207.545,-365.355],[1.273,-412.384]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.949,0.682,0.145,0.5,0.949,0.682,0.145,1,0.949,0.682,0.145,0.692,0,0.797,0.5,0.903,1,0.952,0.5,1,0],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[11.958,-579.804],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.333,"y":0.333},"t":24,"s":[2.001,-53.041],"to":[0,0],"ti":[0,0]},{"t":46,"s":[2.001,-53.041]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[-2.966,328.231],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.333,"y":0.333},"t":24,"s":[-9.274,464.89],"to":[0,0],"ti":[0,0]},{"t":46,"s":[-9.274,464.89]}],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[468.45,412.139],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":25,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":21,"ty":4,"nm":"gradient mask","parent":1,"td":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,3.569,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,338.684],[551.605,338.684]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0},"t":24,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,618.896],[551.605,618.896]],"c":true}]},{"t":46,"s":[{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[551.605,-338.684],[-551.605,-338.684],[-551.605,618.896],[551.605,618.896]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.584768317727,0.218993078494,0.876240808824,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[1.605,-227.316],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Rectangle 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":25,"st":-126,"ct":1,"bm":0},{"ddd":0,"ind":22,"ty":4,"nm":"base gradient 1","parent":1,"tt":1,"tp":21,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-5.16,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[468.45,412.139,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":12,"s":[{"i":[[53.465,-141.426],[-2.061,-11.6],[-5.922,-17.696],[-4.869,-11.512],[-9.059,-13.693],[-20.442,-17.959],[-14.949,-9.067],[-15.369,-7.287],[-7.177,-2.066],[-26.476,-4.709],[-53.714,1.257],[-12.402,3.262],[-18.554,6.918],[-6.485,3.361],[-18.614,14.954],[-16.14,20.932],[-6.806,11.187],[-2.242,5.646],[-2.719,7.983],[-2.022,8.003],[-1.535,13.572],[154.115,73.424],[78.387,-0.547]],"o":[[-45.415,120.133],[2.749,15.469],[4.591,13.719],[5.264,12.448],[13.15,19.876],[21.998,19.327],[17.323,10.507],[14.934,7.08],[12.56,3.615],[24.639,4.383],[61.059,-1.429],[22.169,-5.831],[22.502,-8.39],[15.478,-8.021],[14.14,-11.359],[15.261,-19.792],[6.467,-10.63],[3.588,-9.036],[3.009,-8.835],[3.607,-14.278],[18.505,-163.645],[-56.26,-26.804],[-192.572,1.344]],"v":[[-386.305,-167.005],[-402.526,82.35],[-388.918,130.765],[-374.911,165.393],[-356.74,210.693],[-304.398,258.778],[-249.913,299.562],[-202.399,324.801],[-156.785,342.02],[-106.229,355.061],[-0.899,363.998],[104.241,350.4],[157.714,332.651],[193.432,316.778],[255.274,278.365],[323.649,234.611],[350.466,170.132],[364.947,141.855],[374.026,120.529],[382.182,96.566],[398.155,23.214],[207.545,-365.355],[1.273,-412.384]],"c":true}]},{"t":24,"s":[{"i":[[53.465,-141.426],[-2.061,-11.6],[-5.922,-17.696],[-4.869,-11.512],[-9.059,-13.693],[-20.442,-17.959],[-14.949,-9.067],[-15.369,-7.287],[-7.177,-2.066],[-26.476,-4.709],[-53.714,1.257],[-12.402,3.262],[-18.554,6.918],[-6.485,3.361],[-18.614,14.954],[-16.14,20.932],[-6.806,11.187],[-2.242,5.646],[-2.719,7.983],[-2.022,8.003],[-1.535,13.572],[154.115,73.424],[78.387,-0.547]],"o":[[-45.415,120.133],[2.749,15.469],[4.591,13.719],[5.264,12.448],[13.15,19.876],[21.998,19.327],[17.323,10.507],[14.934,7.08],[12.56,3.615],[24.639,4.383],[61.059,-1.429],[22.169,-5.831],[22.502,-8.39],[15.478,-8.021],[14.14,-11.359],[15.261,-19.792],[6.467,-10.63],[3.588,-9.036],[3.009,-8.835],[3.607,-14.278],[18.505,-163.645],[-56.26,-26.804],[-192.572,1.344]],"v":[[-386.305,-167.005],[-402.526,82.35],[-388.918,130.765],[-374.911,165.393],[-357.74,198.693],[-304.398,258.778],[-249.913,299.562],[-202.399,324.801],[-156.785,342.02],[-106.229,355.061],[-0.899,363.998],[104.241,350.4],[157.714,332.651],[193.432,316.778],[255.274,278.365],[315.649,220.611],[350.466,170.132],[364.947,141.855],[374.026,120.529],[382.182,96.566],[398.155,23.214],[207.545,-365.355],[1.273,-412.384]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0,0.933,0.686,0.173,0.5,0.933,0.686,0.173,1,0.933,0.686,0.173,0.806,0,0.855,0.5,0.903,1,0.952,0.5,1,0],"ix":9}},"s":{"a":1,"k":[{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":0,"s":[-18.313,14.891],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.333,"y":0.333},"t":24,"s":[-1.865,-16.756],"to":[0,0],"ti":[0,0]},{"t":46,"s":[-1.865,-16.756]}],"ix":5},"e":{"a":1,"k":[{"i":{"x":0,"y":0},"o":{"x":0.167,"y":0.167},"t":0,"s":[440.25,11.195],"to":[0,0],"ti":[0,0]},{"i":{"x":0,"y":0},"o":{"x":0.167,"y":0.167},"t":24,"s":[440.25,11.195],"to":[0,0],"ti":[0,0]},{"t":46,"s":[440.25,11.195]}],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[468.45,412.139],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":25,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":23,"ty":4,"nm":"base","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"s":true,"x":{"a":0,"k":-5.16,"ix":3},"y":{"a":0,"k":0,"ix":4}},"a":{"a":0,"k":[468.45,412.139,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[36.708,-102.294],[2.844,-12.101],[10.24,-23.28],[-14.88,-12.8],[-54.8,-16.48],[1.36,-24],[15.12,-4.8],[-0.72,-10.96],[-24.64,-4.8],[-27.441,-1.36],[-106.88,2.08],[-12.959,2],[-51.44,-1.52],[-3.28,6.72],[39.12,16.48],[-0.4,38.96],[-32.72,7.76],[-0.24,6.24],[7.84,3.68],[9.84,3.12],[-1.04,14],[296.4,124.96],[54.52,-0.005]],"o":[[-44.56,124.16],[-0.789,3.358],[-4.24,9.6],[16.16,13.84],[54.8,16.4],[-1.44,25.28],[-15.12,4.8],[0.48,6.88],[43.12,8.4],[27.44,1.36],[106.879,-2.08],[12.961,-2],[51.439,1.6],[4.88,-10.08],[-39.12,-16.48],[0.48,-49.2],[32.72,-7.76],[0.32,-8.72],[-7.84,-3.68],[-9.84,-3.12],[1.04,-14],[-64.313,-27.114],[-196.75,0.018]],"v":[[-394.36,-160.191],[-429.88,111.729],[-463.96,143.969],[-450.52,177.729],[-359.16,213.889],[-296.12,277.569],[-337.88,317.969],[-366.68,341.249],[-333.08,365.249],[-167.32,374.849],[68.36,409.809],[286.199,363.889],[363.64,362.369],[442.92,345.889],[406.76,297.969],[313.72,241.809],[427.56,179.409],[467.88,151.969],[448.84,134.209],[407.24,121.729],[404.68,71.809],[147.08,-373.311],[-31.405,-411.884]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":12,"s":[{"i":[[53.465,-141.426],[-2.061,-11.6],[-5.922,-17.696],[-4.869,-11.512],[-9.059,-13.693],[-20.442,-17.959],[-14.949,-9.067],[-15.369,-7.287],[-7.177,-2.066],[-26.476,-4.709],[-53.714,1.257],[-12.402,3.262],[-18.554,6.918],[-6.485,3.361],[-18.614,14.954],[-16.14,20.932],[-6.806,11.187],[-2.242,5.646],[-2.719,7.983],[-2.022,8.003],[-1.535,13.572],[154.115,73.424],[78.387,-0.547]],"o":[[-45.415,120.133],[2.749,15.469],[4.591,13.719],[5.264,12.448],[13.15,19.876],[21.998,19.327],[17.323,10.507],[14.934,7.08],[12.56,3.615],[24.639,4.383],[61.059,-1.429],[22.169,-5.831],[22.502,-8.39],[15.478,-8.021],[14.14,-11.359],[15.261,-19.792],[6.467,-10.63],[3.588,-9.036],[3.009,-8.835],[3.607,-14.278],[18.505,-163.645],[-56.26,-26.804],[-192.572,1.344]],"v":[[-386.305,-167.005],[-402.526,82.35],[-388.918,130.765],[-374.911,165.393],[-356.74,210.693],[-304.398,258.778],[-249.913,299.562],[-202.399,324.801],[-156.785,342.02],[-106.229,355.061],[-0.899,363.998],[104.241,350.4],[157.714,332.651],[193.432,316.778],[255.274,278.365],[323.649,234.611],[350.466,170.132],[364.947,141.855],[374.026,120.529],[382.182,96.566],[398.155,23.214],[207.545,-365.355],[1.273,-412.384]],"c":true}]},{"t":24,"s":[{"i":[[53.465,-141.426],[-2.061,-11.6],[-5.922,-17.696],[-4.869,-11.512],[-9.059,-13.693],[-20.442,-17.959],[-14.949,-9.067],[-15.369,-7.287],[-7.177,-2.066],[-26.476,-4.709],[-53.714,1.257],[-12.402,3.262],[-18.554,6.918],[-6.485,3.361],[-18.614,14.954],[-16.14,20.932],[-6.806,11.187],[-2.242,5.646],[-2.719,7.983],[-2.022,8.003],[-1.535,13.572],[154.115,73.424],[78.387,-0.547]],"o":[[-45.415,120.133],[2.749,15.469],[4.591,13.719],[5.264,12.448],[13.15,19.876],[21.998,19.327],[17.323,10.507],[14.934,7.08],[12.56,3.615],[24.639,4.383],[61.059,-1.429],[22.169,-5.831],[22.502,-8.39],[15.478,-8.021],[14.14,-11.359],[15.261,-19.792],[6.467,-10.63],[3.588,-9.036],[3.009,-8.835],[3.607,-14.278],[18.505,-163.645],[-56.26,-26.804],[-192.572,1.344]],"v":[[-386.305,-167.005],[-402.526,82.35],[-388.918,130.765],[-374.911,165.393],[-357.74,198.693],[-304.398,258.778],[-249.913,299.562],[-202.399,324.801],[-156.785,342.02],[-106.229,355.061],[-0.899,363.998],[104.241,350.4],[157.714,332.651],[193.432,316.778],[255.274,278.365],[315.649,220.611],[350.466,170.132],[364.947,141.855],[374.026,120.529],[382.182,96.566],[398.155,23.214],[207.545,-365.355],[1.273,-412.384]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"gf","o":{"a":0,"k":100,"ix":10},"r":1,"bm":0,"g":{"p":3,"k":{"a":0,"k":[0.294,0.992,0.863,0.184,0.531,0.984,0.814,0.176,0.768,0.976,0.765,0.169],"ix":9}},"s":{"a":0,"k":[-8.677,25.509],"ix":5},"e":{"a":0,"k":[541.501,93.866],"ix":6},"t":2,"h":{"a":0,"k":0,"ix":7},"a":{"a":0,"k":0,"ix":8},"nm":"Gradient Fill 1","mn":"ADBE Vector Graphic - G-Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[468.45,412.139],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Group 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":25,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":24,"ty":4,"nm":"bevel","parent":1,"sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[-2.333,-25.764,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":0,"s":[{"i":[[1.732,21.084],[9.84,3.12],[-1.04,14],[296.4,124.96],[46.88,-130.64],[2.272,-11.653],[13.086,-18.443],[-3.811,-21.839],[-39.76,-10.64],[-10.463,-32.253],[9.911,-35.436],[-42.871,-4.467],[-27.68,-3.52],[-122.8,0],[-42.96,4.4],[-20.16,7.04],[7.476,39.484],[34.344,14.197],[-40.812,5.053],[-29.92,9.92]],"o":[[-3.092,-37.647],[-9.84,-3.12],[1.04,-14],[-296.4,-124.96],[-44.56,124.16],[-2.272,11.653],[-7.181,9.35],[4.96,28.4],[39.76,10.64],[10.463,32.254],[-6.666,23.835],[34.011,3.544],[27.68,3.52],[122.8,0],[42.96,-4.4],[20.16,-7.04],[-4.309,-22.756],[-44.695,-18.476],[34.861,-4.316],[22.56,-7.52]],"v":[[479.425,196.48],[404.435,150.061],[401.666,97.76],[144.065,-347.36],[-370.013,-120.897],[-432.895,137.68],[-464.405,164.886],[-476.254,212.32],[-403.854,266.96],[-305.037,310.72],[-374,371.999],[-328.335,422.427],[-179.695,432.88],[57.505,472.32],[273.186,424.08],[407.345,417.04],[441.81,362.318],[344.028,312.309],[350.146,253.28],[445.905,238.24]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":12,"s":[{"i":[[-4.592,16.495],[-6.101,23.914],[-1.332,27.715],[203.268,85.835],[46.88,-130.64],[-6.211,-64.724],[-5.262,-15.412],[-5.948,-21.357],[-18.008,-12.915],[-11.052,-9.905],[-32.798,-16.05],[-40.637,-12.43],[-15.152,-1.445],[-37.173,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-14.37,6.139],[-10.298,13.062],[-3.322,16.985]],"o":[[4.436,-15.935],[4.354,-17.063],[4.767,-99.171],[-296.327,-125.131],[-44.56,124.16],[1.228,12.795],[3.628,10.627],[6.588,23.655],[24.654,17.68],[5.469,4.901],[29.102,14.242],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[24.772,-10.583],[10.688,-13.556],[3.598,-18.397]],"v":[[383.425,185.98],[400.935,115.061],[413.666,21.76],[188.065,-345.36],[-370.013,-120.897],[-402.395,122.68],[-391.905,161.886],[-380.963,211.451],[-352.117,273.591],[-298.75,305.565],[-220.869,359.525],[-141.03,391.905],[-78.801,406.511],[8.006,414.32],[102.186,403.08],[168.095,382.54],[240.309,347.318],[297.812,320.807],[346.146,290.531],[367.655,244.99]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":24,"s":[{"i":[[-6.247,16.113],[-6.101,23.914],[-0.67,29.65],[203.268,85.835],[46.88,-130.64],[-6.211,-64.724],[-5.262,-15.412],[-11.669,-23.899],[-16.688,-20.224],[-11.058,-9.898],[-29.156,-14.777],[-40.637,-12.43],[-14.177,-2.02],[-37.173,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-12.474,9.074],[-10.298,13.062],[-7.13,15.497]],"o":[[5.956,-15.389],[4.354,-17.063],[2.324,-99.243],[-296.327,-125.131],[-44.56,124.16],[1.228,12.795],[3.628,10.627],[11.669,23.899],[16.688,20.224],[12.828,11.477],[28.885,14.672],[20.233,6.19],[29.459,4.198],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[25.599,-19.406],[10.688,-13.556],[9.61,-19.85]],"v":[[381.108,182.339],[402.259,111.089],[413.003,18.781],[188.065,-345.36],[-370.013,-120.897],[-402.395,114.633],[-392.655,157.34],[-372.336,203.999],[-335.605,261.424],[-295.845,302.166],[-220.447,353.968],[-141.854,387.594],[-79.626,402.201],[7.182,409.51],[100.861,399.769],[166.771,379.229],[238.985,344.007],[290.86,310.214],[330.918,276.627],[357.393,235.059]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.333,"y":0},"t":35,"s":[{"i":[[-7.092,15.918],[-6.101,23.914],[-0.332,30.638],[203.268,85.835],[46.88,-130.64],[-6.211,-64.724],[-5.262,-15.412],[-11.703,-23.553],[-12.653,-18.193],[-11.062,-9.894],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.173,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-9.073,14.737]],"o":[[6.732,-15.11],[4.354,-17.063],[1.077,-99.28],[-296.327,-125.131],[-44.56,124.16],[1.228,12.795],[3.628,10.627],[10.927,21.99],[9.95,14.307],[16.584,14.833],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[12.678,-20.592]],"v":[[379.925,180.48],[402.935,109.061],[412.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-402.395,114.68],[-391.905,153.886],[-372.463,200.951],[-336.617,255.591],[-296.25,301.565],[-222.119,353.775],[-143.03,386.905],[-80.801,401.511],[6.006,409.32],[100.186,398.08],[166.095,377.54],[238.309,342.318],[287.312,304.807],[323.146,269.531],[352.155,229.99]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":46,"s":[{"i":[[-7.092,15.918],[-6.101,23.914],[-0.332,30.638],[203.268,85.835],[46.88,-130.64],[-6.211,-64.724],[-5.262,-15.412],[-11.703,-23.553],[-12.653,-18.193],[-11.062,-9.894],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.173,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-9.073,14.737]],"o":[[6.732,-15.11],[4.354,-17.063],[1.077,-99.28],[-296.327,-125.131],[-44.56,124.16],[1.228,12.795],[3.628,10.627],[10.927,21.99],[9.95,14.307],[16.584,14.833],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[12.678,-20.592]],"v":[[379.925,180.48],[402.935,109.061],[412.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-402.395,114.68],[-391.905,153.886],[-372.463,200.951],[-336.617,255.591],[-296.25,301.565],[-222.119,353.775],[-143.03,386.905],[-80.801,401.511],[6.006,409.32],[100.186,398.08],[166.095,377.54],[238.309,342.318],[287.312,304.807],[323.146,269.531],[352.155,229.99]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":54,"s":[{"i":[[-9.56,14.57],[0.648,34.292],[-0.332,30.638],[203.268,85.835],[46.88,-130.64],[-6.211,-64.724],[-5.262,-15.412],[-11.703,-23.553],[-12.653,-18.193],[-11.062,-9.894],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.173,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-3.822,3.363]],"o":[[16.158,-24.627],[-0.333,-17.606],[1.077,-99.28],[-296.327,-125.131],[-44.56,124.16],[1.228,12.795],[3.628,10.627],[10.927,21.99],[9.95,14.307],[16.584,14.833],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[7.213,-6.347]],"v":[[395.925,200.48],[406.935,113.811],[412.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-402.395,114.68],[-391.905,153.886],[-372.463,200.951],[-336.617,255.591],[-296.25,301.565],[-222.119,353.775],[-143.03,386.905],[-80.801,401.511],[6.006,409.32],[100.186,398.08],[166.095,377.54],[238.309,342.318],[287.312,304.807],[323.146,269.531],[350.655,234.49]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":66,"s":[{"i":[[-35.592,4.353],[-2.602,74.522],[-0.332,47.073],[203.268,85.835],[46.88,-130.64],[-6.211,-64.724],[-1.153,-16.244],[-17.245,-0.698],[-5.104,-0.155],[-28.332,-32.878],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.173,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-4.991,-1.004]],"o":[[29.236,-3.576],[0.614,-17.598],[0.701,-99.283],[-296.327,-125.131],[-44.56,124.16],[1.228,12.795],[1.238,17.447],[21.797,0.882],[7.95,0.242],[26.084,30.269],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[6.678,1.343]],"v":[[381.925,306.48],[397.435,182.311],[412.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-402.395,114.68],[-396.405,175.386],[-379.963,252.451],[-358.117,241.591],[-324.25,274.565],[-222.119,353.775],[-143.03,386.905],[-80.801,401.511],[6.006,409.32],[100.186,398.08],[166.095,377.54],[238.309,342.318],[287.312,304.807],[337.646,249.531],[357.655,231.99]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":68,"s":[{"i":[[-13.075,1.708],[-2.185,66.826],[-0.332,47.073],[203.268,85.835],[46.88,-130.64],[-6.447,-64.699],[-1.171,-18.075],[-19.335,-0.462],[-5.104,-0.155],[-26.513,-30.716],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.172,0.311],[-28.852,6.645],[-19.627,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-4.993,-0.679]],"o":[[13.075,-1.708],[0.522,-17.6],[0.701,-99.283],[-296.327,-125.131],[-44.56,124.16],[2.145,20.158],[1.167,17.451],[23.63,0.603],[7.95,0.242],[26.121,30.236],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.116,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[7.178,0.814]],"v":[[380.259,245.647],[400.018,177.561],[412.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-403.145,114.43],[-396.738,184.386],[-379.047,258.951],[-356.367,242.841],[-324.25,274.565],[-222.119,353.775],[-143.03,386.905],[-80.801,401.511],[6.006,409.32],[100.186,398.08],[166.095,377.54],[238.309,342.318],[287.312,304.807],[337.646,249.531],[359.155,229.407]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":78,"s":[{"i":[[-13.592,1.678],[-0.101,28.346],[-0.332,47.073],[203.268,85.835],[46.88,-130.64],[-7.625,-64.573],[-1.262,-27.229],[-29.783,0.72],[-5.104,-0.155],[-17.416,-19.907],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.173,0.311],[-28.852,6.645],[-19.628,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-5.002,0.947]],"o":[[29.232,-3.608],[0.063,-17.609],[0.7,-99.283],[-296.327,-125.131],[-44.56,124.16],[6.728,56.978],[0.81,17.472],[32.797,-0.793],[7.95,0.242],[26.31,30.073],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.327,-0.345],[27.115,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[9.678,-1.832]],"v":[[385.426,246.98],[412.935,172.811],[412.666,20.26],[188.065,-342.36],[-370.013,-117.897],[-406.895,116.18],[-398.405,232.386],[-374.463,294.451],[-347.617,252.091],[-324.25,277.565],[-222.119,356.775],[-143.03,389.905],[-80.801,404.511],[6.006,412.32],[100.186,401.08],[166.095,380.54],[238.309,345.318],[287.312,307.807],[337.646,252.531],[359.155,236.99]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":90,"s":[{"i":[[-9.592,0.853],[-0.101,28.347],[-0.332,47.073],[203.268,85.835],[46.88,-130.64],[-7.625,-64.573],[-1.262,-27.229],[-25.646,-6.039],[-14.218,-0.226],[-11.584,-9.769],[-27.298,-14.127],[-40.637,-12.43],[-15.152,-1.445],[-37.172,0.311],[-28.852,6.645],[-19.628,8.411],[-18.42,10.229],[-11.507,10.573],[-10.298,13.062],[-13.322,1.843]],"o":[[14.396,-1.281],[0.063,-17.609],[0.7,-99.283],[-296.327,-125.131],[-44.56,124.16],[6.728,56.978],[0.81,17.472],[21.797,5.132],[15.2,0.242],[11.584,9.769],[28.775,14.892],[20.233,6.19],[27.777,2.649],[41.328,-0.345],[27.115,-6.245],[23.488,-10.065],[15.024,-8.343],[26.021,-23.909],[10.688,-13.556],[11.983,-1.658]],"v":[[392.926,239.48],[412.935,183.811],[412.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-402.895,113.18],[-388.405,229.386],[-386.463,289.201],[-326.617,294.091],[-284.25,308.565],[-222.119,353.775],[-143.03,386.905],[-80.801,401.511],[6.005,409.32],[100.186,398.08],[166.095,377.54],[238.309,342.318],[287.312,304.807],[336.646,256.531],[366.655,239.49]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":102,"s":[{"i":[[-30.573,1.384],[6.858,27.505],[-0.332,47.073],[203.268,85.835],[46.88,-130.64],[-3.602,-64.922],[-1.262,-27.229],[-25.203,-18.868],[-24.05,-4.758],[-11.584,-9.769],[-27.949,-12.018],[-41.606,-10.576],[-15.513,-1.229],[-38.06,0.264],[-29.541,5.653],[-20.096,7.155],[-18.86,8.702],[-13.217,8.336],[-6.188,4.197],[-5.002,0.947]],"o":[[47.408,-2.147],[-6.602,-26.478],[0.7,-99.283],[-296.327,-125.131],[-44.56,124.16],[2.228,40.153],[0.81,17.472],[17.926,13.42],[14.913,2.95],[11.584,9.769],[29.461,12.668],[20.716,5.266],[28.44,2.254],[42.314,-0.294],[27.763,-5.313],[24.048,-8.562],[15.383,-7.097],[15.021,-9.474],[6.188,-4.197],[9.678,-1.832]],"v":[[420.926,269.48],[415.935,209.811],[416.666,17.26],[188.065,-345.36],[-370.013,-120.897],[-402.895,113.18],[-403.405,188.386],[-393.463,267.201],[-326.617,294.091],[-284.25,308.565],[-221.468,350.818],[-140.491,379.001],[-76.777,391.426],[12.102,398.069],[113.53,388.507],[186.013,371.034],[249.951,341.072],[299.312,310.807],[345.645,281.031],[369.655,273.49]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":114,"s":[{"i":[[-5.16,16.031],[15.977,24.769],[-0.417,80.281],[226.551,95.616],[46.88,-130.64],[-2.134,-51.605],[6.75,-21.608],[-14.198,-19.865],[-27.978,-6.229],[-22.78,-10.501],[-24.434,-13.186],[-31.535,-10.834],[-26.472,-2.397],[-53.265,0.61],[-38.257,5.44],[-19.455,6.111],[-12.918,12.279],[-6.092,12.078],[-18.437,10.635],[-11.232,3.19]],"o":[[7.283,-22.626],[-15.977,-24.769],[0.417,-80.281],[-296.346,-125.088],[-44.56,124.16],[1.103,33.028],[-6.976,16.73],[10.559,17.141],[21.125,4.873],[22.78,10.501],[24.434,13.186],[31.535,10.834],[38.946,3.391],[62.426,-0.715],[37.369,-5.314],[27.351,-8.858],[12.918,-12.279],[6.092,-12.079],[11.481,-4.227],[12.899,-3.254]],"v":[[442.551,237.23],[423.31,176.373],[393.916,43.885],[161.065,-341.86],[-370.013,-120.897],[-410.395,119.305],[-435.655,184.011],[-442.661,250.981],[-375.926,288.809],[-317.447,310.104],[-259.601,342.919],[-188.202,375.77],[-102.006,396.441],[23.953,402.004],[156.944,392.619],[242.846,374.626],[303.415,343.883],[328.741,310.183],[368.27,274.468],[401.718,262.678]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":126,"s":[{"i":[[-6.658,23.357],[27.659,39.553],[-0.686,30.537],[249.834,105.397],[46.88,-130.64],[-0.665,-38.288],[14.762,-15.987],[-3.192,-20.862],[-31.905,-7.699],[-11.023,-13.02],[-9.019,-23.727],[-40.026,-18.309],[-37.431,-5.53],[-68.47,1.428],[-46.975,9.671],[-18.815,10.075],[-5.692,24.093],[10.563,11.266],[-25.895,8.774],[-17.461,5.434]],"o":[[6.658,-23.357],[-17.352,-24.813],[0.87,-56.641],[-296.364,-125.046],[-44.56,124.16],[-0.022,25.903],[-14.762,15.987],[3.192,20.862],[27.336,6.795],[15.332,18.108],[11.397,18.251],[40.246,18.409],[49.453,7.306],[82.539,-1.722],[46.975,-9.671],[30.654,-16.414],[5.537,-14.927],[-14.837,-13.975],[19.274,-4.257],[16.119,-4.676]],"v":[[456.175,222.98],[418.685,150.936],[399.166,46.51],[150.065,-338.36],[-370.013,-120.897],[-417.895,125.43],[-439.905,179.636],[-451.859,228.761],[-381.236,277.526],[-314.644,309.642],[-297.734,361.409],[-231.912,420.214],[-127.236,449.153],[35.804,458.195],[200.358,441.294],[299.679,408.037],[356.88,346.695],[338.17,309.558],[348.895,267.405],[407.78,255.865]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":150,"s":[{"i":[[1.732,21.084],[9.84,3.12],[-1.04,14],[296.4,124.96],[46.88,-130.64],[2.272,-11.653],[13.086,-18.443],[-3.811,-21.839],[-39.76,-10.64],[-10.463,-32.253],[9.911,-35.436],[-42.871,-4.467],[-27.68,-3.52],[-122.8,0],[-42.96,4.4],[-20.16,7.04],[7.476,39.484],[34.344,14.197],[-40.812,5.053],[-29.92,9.92]],"o":[[-3.092,-37.647],[-9.84,-3.12],[1.04,-14],[-296.4,-124.96],[-44.56,124.16],[-2.272,11.653],[-7.181,9.35],[4.96,28.4],[39.76,10.64],[10.463,32.254],[-6.666,23.835],[34.011,3.544],[27.68,3.52],[122.8,0],[42.96,-4.4],[20.16,-7.04],[-4.309,-22.756],[-44.695,-18.476],[34.861,-4.316],[22.56,-7.52]],"v":[[479.425,196.48],[404.435,150.061],[401.666,97.76],[144.065,-347.36],[-370.013,-120.897],[-432.895,137.68],[-464.405,164.886],[-476.254,212.32],[-403.854,266.96],[-305.037,310.72],[-374,371.999],[-328.335,422.427],[-179.695,432.88],[57.505,472.32],[273.186,424.08],[407.345,417.04],[441.81,362.318],[344.028,312.309],[350.146,253.28],[445.905,238.24]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.167,"y":0.167},"t":166,"s":[{"i":[[1.732,21.084],[10.229,1.388],[19.668,21.573],[212.497,31.512],[33.611,-32.942],[22.228,-19.347],[13.086,-18.443],[-3.811,-21.839],[-39.76,-10.64],[-10.463,-32.253],[9.911,-35.436],[-42.871,-4.467],[-27.68,-3.52],[-122.8,0],[-42.96,4.4],[-31.012,16.293],[7.476,39.484],[25.302,15.024],[-7.117,6.161],[-29.92,9.92]],"o":[[-3.092,-37.647],[-20.102,-2.728],[-47.267,-51.847],[-212.497,-31.512],[-31.946,31.31],[-8.956,7.795],[-7.181,9.35],[4.96,28.4],[39.76,10.64],[10.463,32.253],[-6.666,23.835],[34.011,3.544],[27.68,3.52],[122.8,0],[42.96,-4.4],[18.904,-9.932],[-4.309,-22.756],[-17.558,-10.426],[16.111,-13.947],[22.56,-7.52]],"v":[[507.425,198.48],[434.435,150.061],[381.666,131.76],[52.836,-85.155],[-315.72,-28.047],[-449.895,144.68],[-484.405,168.886],[-496.254,212.32],[-423.854,266.96],[-345.037,320.72],[-382,388.999],[-333.335,444.427],[-179.695,452.88],[57.505,492.32],[273.186,460.08],[405.345,442.04],[441.81,372.318],[379.031,309.309],[390.222,263.28],[475.905,238.24]],"c":true}]},{"i":{"x":0,"y":1},"o":{"x":0.333,"y":0},"t":209,"s":[{"i":[[1.732,21.084],[10.229,1.388],[19.668,21.573],[143.497,17.488],[33.611,-32.942],[22.228,-19.347],[13.262,-20.448],[-3.811,-21.839],[-39.76,-10.64],[-10.463,-32.253],[7.802,-35.96],[-42.871,-4.466],[-27.68,-3.52],[-122.8,0],[-42.96,4.4],[-40.988,12.707],[-2.524,34.985],[12.302,26.024],[-1.783,9.244],[-17.428,6.907]],"o":[[-3.092,-37.647],[-20.102,-2.728],[-47.267,-51.847],[-147.227,-17.943],[-31.946,31.31],[-8.956,7.795],[-13.262,20.448],[4.96,28.4],[39.76,10.64],[10.463,32.254],[-7.666,35.334],[34.011,3.544],[27.68,3.52],[122.8,0],[42.96,-4.4],[40.988,-12.707],[2.524,-34.985],[-6.586,-13.932],[2.111,-10.948],[17.428,-6.907]],"v":[[499.425,212.48],[426.435,160.061],[341.666,151.76],[52.836,-35.155],[-275.72,41.953],[-427.895,148.68],[-494.405,178.886],[-503.254,231.32],[-428.854,281.96],[-350.037,330.721],[-394,402.999],[-343.335,462.426],[-190.695,472.88],[57.505,512.32],[273.185,483.08],[399.345,457.04],[466.81,394.318],[446.031,332.309],[441.222,294.281],[473.905,263.24]],"c":true}]},{"i":{"x":0.833,"y":0.833},"o":{"x":0.333,"y":0},"t":217,"s":[{"i":[[1.732,21.084],[10.229,1.388],[19.668,21.573],[143.497,17.488],[33.611,-32.942],[22.228,-19.347],[13.262,-20.448],[-3.811,-21.839],[-39.76,-10.64],[-10.463,-32.253],[7.802,-35.96],[-42.871,-4.466],[-27.68,-3.52],[-122.8,0],[-42.96,4.4],[-40.988,12.707],[-2.524,34.985],[12.302,26.024],[-1.783,9.244],[-17.428,6.907]],"o":[[-3.092,-37.647],[-20.102,-2.728],[-47.267,-51.847],[-147.227,-17.943],[-31.946,31.31],[-8.956,7.795],[-13.262,20.448],[4.96,28.4],[39.76,10.64],[10.463,32.254],[-7.666,35.334],[34.011,3.544],[27.68,3.52],[122.8,0],[42.96,-4.4],[40.988,-12.707],[2.524,-34.985],[-6.586,-13.932],[2.111,-10.948],[17.428,-6.907]],"v":[[499.425,212.48],[426.435,160.061],[341.666,151.76],[52.836,-35.155],[-275.72,41.953],[-427.895,148.68],[-494.405,178.886],[-503.254,231.32],[-428.854,281.96],[-350.037,330.721],[-394,402.999],[-343.335,462.426],[-190.695,472.88],[57.505,512.32],[273.185,483.08],[399.345,457.04],[466.81,394.318],[446.031,332.309],[441.222,294.281],[473.905,263.24]],"c":true}]},{"t":228,"s":[{"i":[[1.732,21.084],[9.84,3.12],[-1.04,14],[296.4,124.96],[46.88,-130.64],[2.272,-11.653],[13.086,-18.443],[-3.811,-21.839],[-39.76,-10.64],[-10.463,-32.253],[9.911,-35.436],[-42.871,-4.467],[-27.68,-3.52],[-122.8,0],[-42.96,4.4],[-20.16,7.04],[7.476,39.484],[34.344,14.197],[-40.812,5.053],[-29.92,9.92]],"o":[[-3.092,-37.647],[-9.84,-3.12],[1.04,-14],[-296.4,-124.96],[-44.56,124.16],[-2.272,11.653],[-7.181,9.35],[4.96,28.4],[39.76,10.64],[10.463,32.254],[-6.666,23.835],[34.011,3.544],[27.68,3.52],[122.8,0],[42.96,-4.4],[20.16,-7.04],[-4.309,-22.756],[-44.695,-18.476],[34.861,-4.316],[22.56,-7.52]],"v":[[479.425,196.48],[404.435,150.061],[401.666,97.76],[144.065,-347.36],[-370.013,-120.897],[-432.895,137.68],[-464.405,164.886],[-476.254,212.32],[-403.854,266.96],[-305.037,310.72],[-374,371.999],[-328.335,422.427],[-179.695,432.88],[57.505,472.32],[273.186,424.08],[407.345,417.04],[441.81,362.318],[344.028,312.309],[350.146,253.28],[445.905,238.24]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411764706,0.564705882353,0.01568627451,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":229,"st":0,"ct":1,"bm":0},{"ddd":0,"ind":25,"ty":4,"nm":"drop","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[512,512,0],"ix":2,"l":2},"a":{"a":0,"k":[0,0,0],"ix":1,"l":2},"s":{"a":0,"k":[100,100,100],"ix":6,"l":2}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":1,"k":[{"i":{"x":0.833,"y":0.833},"o":{"x":0.167,"y":0.167},"t":66,"s":[{"i":[[14.347,0],[0,-4.424],[-13.931,0],[0.105,6.118]],"o":[[-14.347,0],[0,6.873],[15.191,0],[-0.08,-4.612]],"v":[[377.566,152.5],[359,167.653],[376.934,184.5],[395.395,167.841]],"c":true}]},{"i":{"x":0.667,"y":1},"o":{"x":0.167,"y":0.167},"t":68,"s":[{"i":[[11.5,-0.5],[0.183,-8],[-14.847,0],[0.183,5.5]],"o":[[-11.5,0.5],[-0.183,8],[14.847,0],[-0.183,-5.5]],"v":[[383,133],[363.433,185.75],[381.579,207],[399.817,185.75]],"c":true}]},{"t":78,"s":[{"i":[[34,0],[0.5,-8],[-40.5,0],[0.5,5.5]],"o":[[-34,0],[-0.5,8],[40.5,0],[-0.5,-5.5]],"v":[[383,158],[332,193.25],[381.5,207],[431.25,193.25]],"c":true}]}],"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"fl","c":{"a":0,"k":[0.929411764706,0.564705882353,0.01568627451,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Shape 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":66,"op":102,"st":0,"ct":1,"bm":0}]');
const markers = [{ "tm": 150, "cm": "rest", "dr": 0 }];
const props = {};
const meltingFace = {
  v,
  fr,
  ip,
  op,
  w,
  h,
  nm,
  ddd,
  assets,
  layers,
  markers,
  props
};
if (typeof window !== "undefined") {
  posthog.init("phc_zqMsHTofRqDihVQ8E7q9nhbCtedSNAUmNqLe5spn6Mjj", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    // We'll handle this manually for more control
    persistence: "localStorage",
    autocapture: true
  });
}
function PostHogProvider({ children }) {
  useEffect(() => {
  }, []);
  return /* @__PURE__ */ jsx(PostHogProvider$1, { client: posthog, children });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-[100dvh] w-full bg-secondary flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl items-center text-center px-6 pt-20 pb-12", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "flex flex-col items-center flex-1 justify-center",
        children: [
          /* @__PURE__ */ jsx(Lottie, { animationData: meltingFace, loop: true, className: "w-56 h-56" }),
          /* @__PURE__ */ jsx("h1", { className: "text-[120px] leading-none font-bold text-primary tracking-tight mt-2", children: "404" }),
          /* @__PURE__ */ jsx("h2", { className: "h-display text-foreground mt-6 max-w-[280px]", children: "We couldn't find that page." }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 body-md text-muted-foreground max-w-[300px]", children: "The link may be broken, or the page may have been moved. Let's get you back on track." })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto w-full flex flex-col gap-3 pt-12", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Go home"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors",
          children: "Go back"
        }
      )
    ] })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hemora | Care that stays with you, between appointments." },
      { name: "description", content: "The sickle cell companion for African families. Track meds, log crises, keep records, and find care that understands the disease." },
      { name: "author", content: "Hemora" },
      { property: "og:title", content: "Hemora | Care that stays with you, between appointments." },
      { property: "og:description", content: "The sickle cell companion for African families. Track meds, log crises, keep records, and find care that understands the disease." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@HemoraApp" },
      { name: "twitter:title", content: "Hemora | Care that stays with you, between appointments." },
      { name: "twitter:description", content: "The sickle cell companion for African families. Track meds, log crises, keep records, and find care that understands the disease." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/eTJbxoiYG4MyJ8qM7G3yamJCQct1/social-images/social-1778187742363-3446cf5a-b364-4074-89e4-84b395eb4ff2.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/eTJbxoiYG4MyJ8qM7G3yamJCQct1/social-images/social-1778187742363-3446cf5a-b364-4074-89e4-84b395eb4ff2.webp" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  const router2 = useRouter();
  useEffect(() => {
    posthog.capture("$pageview");
  }, [router2.state.location.pathname]);
  return /* @__PURE__ */ jsx(PostHogProvider, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
const $$splitComponentImporter$1 = () => import("./_-Y31JCs97.js");
const Route$7 = createFileRoute("/$")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-hbrfEmyF.js");
const Route$6 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const brand = {
  cream: "#F7EEDC",
  creamLight: "#FFF8EC",
  deepTeal: "#073F42",
  oxblood: "#9B1E34",
  ink: "#132C2E",
  muted: "#6B706D",
  border: "#E7D9BD",
  bg: "#EFE4D1"
};
const HEMORA_ICON_URL = "https://hemora.xyz/brand/logos/hemora-icon.png";
const main = {
  backgroundColor: brand.bg,
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: "48px 20px"
};
const shell = {
  width: "100%",
  maxWidth: "680px",
  margin: "0 auto",
  backgroundColor: brand.creamLight,
  border: `1px solid ${brand.border}`,
  borderRadius: "32px",
  overflow: "hidden"
};
const header = {
  background: `linear-gradient(135deg, ${brand.creamLight} 0%, ${brand.cream} 100%)`,
  padding: "36px 44px 28px",
  borderBottom: `1px solid ${brand.border}`
};
const brandRow = {
  display: "flex",
  alignItems: "center",
  marginBottom: "34px"
};
const logoMark = {
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  marginRight: "14px"
};
const brandName = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "36px",
  color: brand.deepTeal,
  letterSpacing: "-0.02em",
  fontWeight: 500,
  margin: 0
};
const eyebrow = {
  color: brand.oxblood,
  fontSize: "13px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: 700,
  marginBottom: "14px"
};
const h1 = {
  fontFamily: "Georgia, 'Times New Roman', serif",
  fontSize: "44px",
  lineHeight: 1.05,
  letterSpacing: "-0.04em",
  color: brand.deepTeal,
  margin: "0 0 16px"
};
const headerCopy = {
  fontSize: "18px",
  color: brand.ink,
  margin: 0
};
const body = {
  padding: "40px 44px 34px",
  backgroundColor: brand.creamLight
};
const hello = {
  fontSize: "18px",
  margin: "0 0 14px",
  color: brand.deepTeal,
  fontWeight: 700
};
const bodyCopy = {
  fontSize: "16px",
  color: brand.ink,
  margin: "0 0 18px"
};
const buttonStyle = {
  display: "inline-block",
  backgroundColor: brand.oxblood,
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "18px",
  padding: "16px 26px",
  fontWeight: 800,
  fontSize: "16px",
  margin: "30px 0 24px"
};
({
  ...buttonStyle
});
const otpCard = {
  backgroundColor: brand.deepTeal,
  color: "#ffffff",
  borderRadius: "24px",
  padding: "26px 28px",
  textAlign: "center",
  margin: "28px 0"
};
const otpLabel = {
  fontSize: "13px",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#E4C37C",
  fontWeight: 700,
  marginBottom: "10px"
};
const otpCode = {
  fontSize: "42px",
  letterSpacing: "0.18em",
  fontWeight: 800
};
const detailCard = {
  backgroundColor: brand.creamLight,
  border: `1px solid ${brand.border}`,
  borderRadius: "18px",
  padding: "16px"
};
const detailLabel = {
  display: "block",
  color: brand.muted,
  fontSize: "13px",
  margin: "0 0 4px"
};
const detailValue = {
  color: brand.deepTeal,
  fontSize: "16px",
  fontWeight: 700,
  margin: 0
};
const footer = {
  padding: "26px 44px 36px",
  backgroundColor: "#F2E5CF",
  borderTop: `1px solid ${brand.border}`,
  color: brand.muted,
  fontSize: "13px"
};
const footerBrand = {
  color: brand.deepTeal,
  fontWeight: 800,
  marginBottom: "8px"
};
const footerLinks = {
  marginTop: "14px"
};
const footerLink = {
  color: brand.oxblood,
  textDecoration: "none",
  marginRight: "16px",
  fontWeight: 700
};
const styles = {
  hello,
  bodyCopy,
  button: buttonStyle,
  otpCard,
  otpLabel,
  otpCode,
  detailCard,
  detailLabel,
  detailValue,
  footerLink
};
const BrandLayout = ({
  preview,
  siteName,
  eyebrow: eyebrowText,
  heading,
  headerCopy: headerCopyText,
  children
}) => /* @__PURE__ */ jsxs(Html, { lang: "en", dir: "ltr", children: [
  /* @__PURE__ */ jsx(Head, {}),
  /* @__PURE__ */ jsx(Preview, { children: preview }),
  /* @__PURE__ */ jsx(Body, { style: main, children: /* @__PURE__ */ jsxs(Container, { style: shell, children: [
    /* @__PURE__ */ jsxs(Section, { style: header, children: [
      /* @__PURE__ */ jsxs(Row, { style: brandRow, children: [
        /* @__PURE__ */ jsx(Column, { width: "54", children: /* @__PURE__ */ jsx(
          Img,
          {
            src: HEMORA_ICON_URL,
            alt: "",
            width: "54",
            height: "54",
            style: logoMark
          }
        ) }),
        /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Text, { style: brandName, children: siteName }) })
      ] }),
      /* @__PURE__ */ jsx(Text, { style: eyebrow, children: eyebrowText }),
      /* @__PURE__ */ jsx(Heading, { as: "h1", style: h1, children: heading }),
      /* @__PURE__ */ jsx(Text, { style: headerCopy, children: headerCopyText })
    ] }),
    /* @__PURE__ */ jsx(Section, { style: body, children }),
    /* @__PURE__ */ jsxs(Section, { style: footer, children: [
      /* @__PURE__ */ jsx(Text, { style: footerBrand, children: siteName }),
      /* @__PURE__ */ jsx(Text, { style: { margin: 0 }, children: "Built for families. Guided by care." }),
      /* @__PURE__ */ jsxs(Section, { style: footerLinks, children: [
        /* @__PURE__ */ jsx(Link$1, { href: "https://hemora.xyz", style: footerLink, children: "hemora.xyz" }),
        /* @__PURE__ */ jsx(Link$1, { href: "https://hemora.xyz/support", style: footerLink, children: "Support" }),
        /* @__PURE__ */ jsx(Link$1, { href: "https://hemora.xyz/privacy", style: footerLink, children: "Privacy" })
      ] })
    ] })
  ] }) })
] });
const SignupEmail = ({
  siteName,
  recipient,
  confirmationUrl,
  otpCode: otpCode2
}) => /* @__PURE__ */ jsxs(
  BrandLayout,
  {
    preview: `Confirm your email address for ${siteName}`,
    siteName,
    eyebrow: "Email confirmation",
    heading: "Confirm your email address",
    headerCopy: "One quick step to keep your Hemora account secure.",
    children: [
      /* @__PURE__ */ jsx(Text, { style: styles.hello, children: "Hi there," }),
      /* @__PURE__ */ jsxs(Text, { style: styles.bodyCopy, children: [
        "Thanks for joining ",
        siteName,
        ". Please confirm your email address so we can protect your account and make sure important care updates reach you."
      ] }),
      /* @__PURE__ */ jsxs(Section, { style: styles.otpCard, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.otpLabel, children: "Your confirmation code" }),
        /* @__PURE__ */ jsx(Text, { style: styles.otpCode, children: otpCode2 })
      ] }),
      /* @__PURE__ */ jsxs(Text, { style: styles.bodyCopy, children: [
        "This code expires in ",
        /* @__PURE__ */ jsx("strong", { children: "15 minutes" }),
        ". If you did not create a ",
        siteName,
        " account, you can safely ignore this email."
      ] }),
      /* @__PURE__ */ jsx(Button, { style: styles.button, href: confirmationUrl, children: "Confirm email" }),
      /* @__PURE__ */ jsx(Text, { style: { ...styles.bodyCopy, fontSize: "14px", color: "#6B706D", marginTop: "18px" }, children: "If the button does not work, copy and paste this link into your browser:" }),
      /* @__PURE__ */ jsx(Text, { style: { color: "#9B1E34", fontSize: "14px", wordBreak: "break-all" }, children: confirmationUrl })
    ]
  }
);
const InviteEmail = ({ siteName, confirmationUrl }) => /* @__PURE__ */ jsxs(
  BrandLayout,
  {
    preview: `You’ve been invited to join ${siteName}`,
    siteName,
    eyebrow: "Invitation",
    heading: "You're invited",
    headerCopy: "Join a calm space for tracking sickle cell care.",
    children: [
      /* @__PURE__ */ jsx(Text, { style: styles.hello, children: "Hi there," }),
      /* @__PURE__ */ jsxs(Text, { style: styles.bodyCopy, children: [
        "Someone you trust invited you to join ",
        siteName,
        " — a community dedicated to better sickle cell care. Accept the invitation to set up your account and start managing your health journey."
      ] }),
      /* @__PURE__ */ jsx(Button, { style: styles.button, href: confirmationUrl, children: "Accept invitation" }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "If you didn't expect this invite, you can safely ignore this email." })
    ]
  }
);
const RecoveryEmail = ({ siteName, confirmationUrl }) => /* @__PURE__ */ jsxs(
  BrandLayout,
  {
    preview: `Reset your password for ${siteName}`,
    siteName,
    eyebrow: "Password reset",
    heading: "Reset your password",
    headerCopy: "Use the secure link below to create a new password.",
    children: [
      /* @__PURE__ */ jsx(Text, { style: styles.hello, children: "Hi there," }),
      /* @__PURE__ */ jsxs(Text, { style: styles.bodyCopy, children: [
        "We received a request to reset the password for your ",
        siteName,
        " account. Click the button below to choose a new password."
      ] }),
      /* @__PURE__ */ jsx(Button, { style: styles.button, href: confirmationUrl, children: "Reset password" }),
      /* @__PURE__ */ jsx(Section, { style: { margin: "24px 0" }, children: /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsxs(Column, { style: styles.detailCard, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.detailLabel, children: "Requested at" }),
          /* @__PURE__ */ jsx(Text, { style: styles.detailValue, children: "Just now" })
        ] }),
        /* @__PURE__ */ jsx(Column, { style: { width: "14px" } }),
        /* @__PURE__ */ jsxs(Column, { style: styles.detailCard, children: [
          /* @__PURE__ */ jsx(Text, { style: styles.detailLabel, children: "Link expires" }),
          /* @__PURE__ */ jsx(Text, { style: styles.detailValue, children: "60 minutes" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "If you did not request this password reset, you can ignore this email. Your current password will stay the same." }),
      /* @__PURE__ */ jsx(Text, { style: { ...styles.bodyCopy, fontSize: "14px", color: "#6B706D", marginTop: "18px" }, children: "If the button does not work, copy and paste this link into your browser:" }),
      /* @__PURE__ */ jsx(Text, { style: { color: brand.oxblood, fontSize: "14px", wordBreak: "break-all" }, children: confirmationUrl })
    ]
  }
);
const EmailChangeEmail = ({
  siteName,
  oldEmail,
  newEmail,
  confirmationUrl
}) => /* @__PURE__ */ jsxs(
  BrandLayout,
  {
    preview: `Confirm your new email for ${siteName}`,
    siteName,
    eyebrow: "Email change",
    heading: "Confirm your new email",
    headerCopy: "Verify your new email address to complete the change.",
    children: [
      /* @__PURE__ */ jsx(Text, { style: styles.hello, children: "Hi there," }),
      /* @__PURE__ */ jsxs(Text, { style: styles.bodyCopy, children: [
        "You've requested to change the email address for your ",
        siteName,
        " account from",
        " ",
        /* @__PURE__ */ jsx(Link$1, { style: styles.footerLink, href: `mailto:${oldEmail}`, children: oldEmail }),
        " to",
        " ",
        /* @__PURE__ */ jsx(Link$1, { style: styles.footerLink, href: `mailto:${newEmail}`, children: newEmail }),
        "."
      ] }),
      /* @__PURE__ */ jsx(Button, { style: styles.button, href: confirmationUrl, children: "Confirm new email" }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "If you did not request this change, please ignore this email or contact support if you're concerned about your account security." }),
      /* @__PURE__ */ jsx(Text, { style: { ...styles.bodyCopy, fontSize: "14px", color: "#6B706D", marginTop: "18px" }, children: "If the button does not work, copy and paste this link into your browser:" }),
      /* @__PURE__ */ jsx(Text, { style: { color: brand.oxblood, fontSize: "14px", wordBreak: "break-all" }, children: confirmationUrl })
    ]
  }
);
const ReauthenticationEmail = ({
  siteName,
  otpCode: otpCode2
}) => /* @__PURE__ */ jsxs(
  BrandLayout,
  {
    preview: "Your verification code",
    siteName,
    eyebrow: "Security check",
    heading: "Confirm it’s you",
    headerCopy: "Use the secure code below to verify your identity.",
    children: [
      /* @__PURE__ */ jsx(Text, { style: styles.hello, children: "Hi there," }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "To keep your account secure, we need to verify your identity. Please use the verification code below to continue." }),
      /* @__PURE__ */ jsxs(Section, { style: styles.otpCard, children: [
        /* @__PURE__ */ jsx(Text, { style: styles.otpLabel, children: "Your verification code" }),
        /* @__PURE__ */ jsx(Text, { style: styles.otpCode, children: otpCode2 })
      ] }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "This code expires shortly. If you didn’t request this verification, please contact our support team immediately." })
    ]
  }
);
const WelcomeEmail = ({
  siteName,
  siteUrl
}) => /* @__PURE__ */ jsxs(
  BrandLayout,
  {
    preview: `Welcome to ${siteName} — your account is ready`,
    siteName,
    eyebrow: "Account created",
    heading: "Your care companion is ready.",
    headerCopy: "You're now part of a community built for better sickle cell care.",
    children: [
      /* @__PURE__ */ jsx(Text, { style: styles.hello, children: "Hi there," }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "Welcome to Hemora. We're here to help you manage your health journey with clarity and confidence. Here is how you can get started:" }),
      /* @__PURE__ */ jsxs(Section, { style: { margin: "32px 0" }, children: [
        /* @__PURE__ */ jsxs(Row, { style: { marginBottom: "16px" }, children: [
          /* @__PURE__ */ jsx(Column, { width: "40", style: { verticalAlign: "top" }, children: /* @__PURE__ */ jsx(Text, { style: { fontSize: "24px", margin: 0 }, children: "💊" }) }),
          /* @__PURE__ */ jsxs(Column, { children: [
            /* @__PURE__ */ jsx(Text, { style: { fontSize: "16px", fontWeight: 700, color: brand.deepTeal, margin: "0 0 4px" }, children: "Track Medications" }),
            /* @__PURE__ */ jsx(Text, { style: { fontSize: "14px", color: brand.ink, margin: 0 }, children: "Never miss a dose with our intuitive reminder system." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Row, { style: { marginBottom: "16px" }, children: [
          /* @__PURE__ */ jsx(Column, { width: "40", style: { verticalAlign: "top" }, children: /* @__PURE__ */ jsx(Text, { style: { fontSize: "24px", margin: 0 }, children: "📝" }) }),
          /* @__PURE__ */ jsxs(Column, { children: [
            /* @__PURE__ */ jsx(Text, { style: { fontSize: "16px", fontWeight: 700, color: brand.deepTeal, margin: "0 0 4px" }, children: "Log Crisis Events" }),
            /* @__PURE__ */ jsx(Text, { style: { fontSize: "14px", color: brand.ink, margin: 0 }, children: "Document pain levels and triggers to share with your care team." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Row, { children: [
          /* @__PURE__ */ jsx(Column, { width: "40", style: { verticalAlign: "top" }, children: /* @__PURE__ */ jsx(Text, { style: { fontSize: "24px", margin: 0 }, children: "🏥" }) }),
          /* @__PURE__ */ jsxs(Column, { children: [
            /* @__PURE__ */ jsx(Text, { style: { fontSize: "16px", fontWeight: 700, color: brand.deepTeal, margin: "0 0 4px" }, children: "Manage Records" }),
            /* @__PURE__ */ jsx(Text, { style: { fontSize: "14px", color: brand.ink, margin: 0 }, children: "Keep your lab results and medical history in one secure place." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { style: styles.button, href: siteUrl, children: "Go to Dashboard" }),
      /* @__PURE__ */ jsx(Text, { style: styles.bodyCopy, children: "If you have any questions, our support team is just an email away. We're honored to be part of your care team." })
    ]
  }
);
const EMAIL_SUBJECTS = {
  signup: "Confirm your email",
  invite: "You've been invited",
  recovery: "Reset your password",
  email_change: "Confirm your new email",
  reauthentication: "Your verification code",
  welcome: "Welcome to Hemora"
};
const EMAIL_TEMPLATES$1 = {
  signup: SignupEmail,
  invite: InviteEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
  welcome: WelcomeEmail
};
const SITE_NAME$1 = "Hemora";
const SENDER_DOMAIN = "notify.hemora.xyz";
const ROOT_DOMAIN = "hemora.xyz";
const FROM_DOMAIN = "notify.hemora.xyz";
function redactEmail(email) {
  if (!email) return "***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}
const Route$5 = createFileRoute("/api/email/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.EMAIL_WEBHOOK_SECRET;
        if (!webhookSecret) {
          console.error("EMAIL_WEBHOOK_SECRET not configured");
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const run_id = crypto.randomUUID();
        const headers = Object.fromEntries(request.headers);
        const bodyText = await request.text();
        console.log("Webhook request received", {
          headerNames: Object.keys(headers),
          method: request.method,
          run_id
        });
        let payload;
        let isAuthorized = false;
        if (webhookSecret.startsWith("v1,whsec_")) {
          try {
            const wh = new Webhook(webhookSecret.replace("v1,whsec_", ""));
            payload = wh.verify(bodyText, headers);
            isAuthorized = true;
            console.log("Standard Webhook signature verified", { run_id });
          } catch (err) {
            console.error("Standard Webhook verification failed", { error: err instanceof Error ? err.message : String(err), run_id });
          }
        }
        if (!isAuthorized) {
          const authHeader = request.headers.get("Authorization")?.replace("Bearer ", "").trim();
          const supabaseSig = request.headers.get("x-supabase-signature")?.trim();
          if (authHeader && authHeader === webhookSecret.trim() || supabaseSig && supabaseSig === webhookSecret.trim()) {
            isAuthorized = true;
            try {
              payload = JSON.parse(bodyText);
            } catch (err) {
              console.error("Invalid JSON payload", { error: err, run_id });
              return Response.json({ error: "Invalid JSON" }, { status: 400 });
            }
          }
        }
        if (!isAuthorized) {
          console.error("Unauthorized webhook attempt", {
            run_id
          });
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const emailData = payload.email_data || payload.data || {};
        const userData = payload.user || {};
        const emailType = emailData.email_action_type || emailData.action_type || payload.type;
        if (!emailType) {
          console.error("Webhook payload missing email_action_type", { run_id, payload_keys: Object.keys(payload) });
          return Response.json(
            { error: "Invalid webhook payload: missing action_type" },
            { status: 400 }
          );
        }
        const recipientEmail = userData.email || emailData.email || payload.email;
        console.log("Received auth event", {
          emailType,
          email_redacted: redactEmail(recipientEmail),
          run_id
        });
        const EmailTemplate = EMAIL_TEMPLATES$1[emailType] || EMAIL_TEMPLATES$1["signup"];
        if (!EmailTemplate) {
          console.error("Unknown email type", { emailType, run_id });
          return Response.json(
            { error: `Unknown email type: ${emailType}` },
            { status: 400 }
          );
        }
        let confirmationUrl = emailData.url || emailData.redirect_to || `https://app.${ROOT_DOMAIN}/auth/callback`;
        if (!confirmationUrl.includes("token_hash=")) {
          try {
            const url = new URL(confirmationUrl);
            const tokenHash = emailData.token_hash || emailData.token_hash_new;
            if (tokenHash) {
              url.searchParams.set("token_hash", tokenHash);
              url.searchParams.set("type", emailType || "signup");
              confirmationUrl = url.toString();
            }
          } catch (e) {
            console.warn("Could not parse confirmation URL as object", { confirmationUrl, run_id });
          }
        }
        const templateProps = {
          siteName: SITE_NAME$1,
          siteUrl: `https://${ROOT_DOMAIN}`,
          recipient: recipientEmail,
          confirmationUrl,
          otpCode: emailData.token || emailData.token_new || emailData.token_hash,
          email: recipientEmail,
          oldEmail: emailData.old_email,
          newEmail: emailData.new_email
        };
        const element = React.createElement(EmailTemplate, templateProps);
        const html = await render(element);
        const text = await render(element, { plainText: true });
        const supabaseUrl = "https://lezinvbgdqehtffnxrti.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!supabaseServiceKey) {
          console.error("Missing Supabase environment variables", {
            has_url: true,
            has_key: !!supabaseServiceKey,
            run_id
          });
          return Response.json(
            { error: "Server configuration error: missing database credentials" },
            { status: 500 }
          );
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const messageId = crypto.randomUUID();
        const { data: logData, error: logError } = await supabase.from("email_send_log").insert({
          message_id: messageId,
          template_name: emailType,
          recipient_email: recipientEmail,
          status: "pending"
        }).select("id").single();
        const { error: enqueueError } = await supabase.rpc("enqueue_email", {
          queue_name: "auth_emails",
          payload: {
            logId: logData?.id,
            run_id,
            message_id: messageId,
            to: recipientEmail,
            from: `${SITE_NAME$1} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject: EMAIL_SUBJECTS[emailType] || "Notification",
            html,
            text,
            purpose: "transactional",
            label: emailType,
            queued_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        });
        if (enqueueError) {
          console.error("Failed to enqueue auth email", { error: enqueueError, run_id, emailType });
          await supabase.from("email_send_log").insert({
            message_id: messageId,
            template_name: emailType,
            recipient_email: recipientEmail,
            status: "failed",
            error_message: "Failed to enqueue email"
          });
          return Response.json(
            { error: "Failed to enqueue email" },
            { status: 500 }
          );
        }
        console.log("Auth email enqueued", {
          emailType,
          email_redacted: redactEmail(recipientEmail),
          run_id
        });
        return Response.json({ success: true, queued: true });
      }
    }
  }
});
const resend = new Resend(process.env.RESEND_API_KEY || process.env.HEMORA_API_KEY);
async function sendEmail({
  to,
  subject,
  html,
  from = "Hemora <hello@notify.hemora.xyz>",
  text
}) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
    text
  });
  if (error) {
    console.error("[resend] error:", error);
    throw error;
  }
  return data;
}
const MAX_RETRIES = 5;
const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_SEND_DELAY_MS = 200;
const DEFAULT_AUTH_TTL_MINUTES = 15;
const DEFAULT_TRANSACTIONAL_TTL_MINUTES = 60;
function isRateLimited(error) {
  if (error && typeof error === "object" && "name" in error) {
    return error.name === "rate_limit_exceeded";
  }
  return error instanceof Error && (error.message.includes("429") || error.message.toLowerCase().includes("rate limit"));
}
function isForbidden(error) {
  if (error && typeof error === "object" && "status" in error) {
    return error.status === 403;
  }
  return error instanceof Error && error.message.includes("403");
}
function getRetryAfterSeconds(error) {
  if (error && typeof error === "object" && "retryAfterSeconds" in error) {
    return error.retryAfterSeconds ?? 60;
  }
  return 60;
}
async function moveToDlq(supabase, queue, msg, reason) {
  const payload = msg.message;
  await supabase.from("email_send_log").insert({
    message_id: payload.message_id,
    template_name: payload.label || queue,
    recipient_email: payload.to,
    status: "dlq",
    error_message: reason
  });
  const { error } = await supabase.rpc("move_to_dlq", {
    source_queue: queue,
    dlq_name: `${queue}_dlq`,
    message_id: msg.msg_id,
    payload
  });
  if (error) {
    console.error("Failed to move message to DLQ", { queue, msg_id: msg.msg_id, reason, error });
  }
}
const Route$4 = createFileRoute("/api/email/process")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.RESEND_API_KEY || process.env.HEMORA_API_KEY;
        const supabaseUrl = "https://lezinvbgdqehtffnxrti.supabase.co";
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
          console.error("Missing required environment variables");
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice("Bearer ".length).trim();
        if (token !== supabaseServiceKey) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        const { data: state } = await supabase.from("email_send_state").select("retry_after_until, batch_size, send_delay_ms, auth_email_ttl_minutes, transactional_email_ttl_minutes").single();
        if (state?.retry_after_until && new Date(state.retry_after_until) > /* @__PURE__ */ new Date()) {
          return Response.json({ skipped: true, reason: "rate_limited" });
        }
        const batchSize = state?.batch_size ?? DEFAULT_BATCH_SIZE;
        const sendDelayMs = state?.send_delay_ms ?? DEFAULT_SEND_DELAY_MS;
        const ttlMinutes = {
          auth_emails: state?.auth_email_ttl_minutes ?? DEFAULT_AUTH_TTL_MINUTES,
          transactional_emails: state?.transactional_email_ttl_minutes ?? DEFAULT_TRANSACTIONAL_TTL_MINUTES
        };
        let totalProcessed = 0;
        for (const queue of ["auth_emails", "transactional_emails"]) {
          const { data: messages, error: readError } = await supabase.rpc("read_email_batch", {
            queue_name: queue,
            batch_size: batchSize,
            vt: 30
          });
          if (readError) {
            console.error("Failed to read email batch", { queue, error: readError });
            continue;
          }
          if (!messages?.length) continue;
          const messageIds = Array.from(
            new Set(
              messages.map(
                (msg) => msg?.message?.message_id && typeof msg.message.message_id === "string" ? msg.message.message_id : null
              ).filter((id2) => Boolean(id2))
            )
          );
          const failedAttemptsByMessageId = /* @__PURE__ */ new Map();
          if (messageIds.length > 0) {
            const { data: failedRows, error: failedRowsError } = await supabase.from("email_send_log").select("message_id").in("message_id", messageIds).eq("status", "failed");
            if (failedRowsError) {
              console.error("Failed to load failed-attempt counters", {
                queue,
                error: failedRowsError
              });
            } else {
              for (const row of failedRows ?? []) {
                const messageId = row?.message_id;
                if (typeof messageId !== "string" || !messageId) continue;
                failedAttemptsByMessageId.set(
                  messageId,
                  (failedAttemptsByMessageId.get(messageId) ?? 0) + 1
                );
              }
            }
          }
          for (let i = 0; i < messages.length; i++) {
            const msg = messages[i];
            const payload = msg.message;
            const failedAttempts = payload?.message_id && typeof payload.message_id === "string" ? failedAttemptsByMessageId.get(payload.message_id) ?? 0 : msg.read_ct ?? 0;
            const queuedAt = payload.queued_at ?? msg.enqueued_at;
            if (queuedAt) {
              const ageMs = Date.now() - new Date(queuedAt).getTime();
              const maxAgeMs = ttlMinutes[queue] * 60 * 1e3;
              if (ageMs > maxAgeMs) {
                console.warn("Email expired (TTL exceeded)", {
                  queue,
                  msg_id: msg.msg_id,
                  queued_at: queuedAt,
                  ttl_minutes: ttlMinutes[queue]
                });
                await moveToDlq(supabase, queue, msg, `TTL exceeded (${ttlMinutes[queue]} minutes)`);
                continue;
              }
            }
            if (failedAttempts >= MAX_RETRIES) {
              await moveToDlq(supabase, queue, msg, `Max retries (${MAX_RETRIES}) exceeded (attempted ${failedAttempts} times)`);
              continue;
            }
            if (payload.message_id) {
              const { data: alreadySent } = await supabase.from("email_send_log").select("id").eq("message_id", payload.message_id).eq("status", "sent").maybeSingle();
              if (alreadySent) {
                console.warn("Skipping duplicate send (already sent)", {
                  queue,
                  msg_id: msg.msg_id,
                  message_id: payload.message_id
                });
                const { error: dupDelError } = await supabase.rpc("delete_email", {
                  queue_name: queue,
                  message_id: msg.msg_id
                });
                if (dupDelError) {
                  console.error("Failed to delete duplicate message from queue", { queue, msg_id: msg.msg_id, error: dupDelError });
                }
                continue;
              }
            }
            try {
              await sendEmail({
                to: payload.to,
                from: payload.from || "Hemora <hello@notify.hemora.xyz>",
                subject: payload.subject,
                html: payload.html,
                text: payload.text
              });
              await supabase.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "sent"
              });
              const { error: delError } = await supabase.rpc("delete_email", {
                queue_name: queue,
                message_id: msg.msg_id
              });
              if (delError) {
                console.error("Failed to delete sent message from queue", { queue, msg_id: msg.msg_id, error: delError });
              }
              totalProcessed++;
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : String(error);
              console.error("Email send failed", {
                queue,
                msg_id: msg.msg_id,
                read_ct: msg.read_ct,
                failed_attempts: failedAttempts,
                error: errorMsg
              });
              if (isRateLimited(error)) {
                await supabase.from("email_send_log").insert({
                  message_id: payload.message_id,
                  template_name: payload.label || queue,
                  recipient_email: payload.to,
                  status: "failed",
                  error_message: errorMsg.slice(0, 1e3)
                });
                const retryAfterSecs = getRetryAfterSeconds(error);
                await supabase.from("email_send_state").update({
                  retry_after_until: new Date(
                    Date.now() + retryAfterSecs * 1e3
                  ).toISOString(),
                  updated_at: (/* @__PURE__ */ new Date()).toISOString()
                }).eq("id", 1);
                return Response.json({ processed: totalProcessed, stopped: "rate_limited" });
              }
              if (isForbidden(error)) {
                await moveToDlq(supabase, queue, msg, errorMsg.slice(0, 1e3));
                return Response.json({ processed: totalProcessed, stopped: "forbidden" });
              }
              await supabase.from("email_send_log").insert({
                message_id: payload.message_id,
                template_name: payload.label || queue,
                recipient_email: payload.to,
                status: "failed",
                error_message: errorMsg.slice(0, 1e3)
              });
              if (payload?.message_id && typeof payload.message_id === "string") {
                failedAttemptsByMessageId.set(payload.message_id, failedAttempts + 1);
              }
            }
            if (i < messages.length - 1) {
              await new Promise((r) => setTimeout(r, sendDelayMs));
            }
          }
        }
        return Response.json({ processed: totalProcessed });
      }
    }
  }
});
const EMAIL_TEMPLATES = {
  signup: SignupEmail,
  invite: InviteEmail,
  recovery: RecoveryEmail,
  email_change: EmailChangeEmail,
  reauthentication: ReauthenticationEmail,
  welcome: WelcomeEmail
};
const SITE_NAME = "Hemora";
const SAMPLE_PROJECT_URL = "https://hemora.xyz";
const SAMPLE_EMAIL = "user@example.test";
const SAMPLE_DATA = {
  signup: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL,
    recipient: SAMPLE_EMAIL,
    confirmationUrl: SAMPLE_PROJECT_URL,
    otpCode: "123456"
  },
  recovery: {
    siteName: SITE_NAME,
    confirmationUrl: SAMPLE_PROJECT_URL
  },
  invite: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL,
    confirmationUrl: SAMPLE_PROJECT_URL
  },
  email_change: {
    siteName: SITE_NAME,
    oldEmail: SAMPLE_EMAIL,
    email: SAMPLE_EMAIL,
    newEmail: "new-user@example.test",
    confirmationUrl: SAMPLE_PROJECT_URL
  },
  reauthentication: {
    siteName: SITE_NAME,
    otpCode: "654321"
  },
  welcome: {
    siteName: SITE_NAME,
    siteUrl: SAMPLE_PROJECT_URL
  }
};
const Route$3 = createFileRoute("/api/email/preview")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.EMAIL_WEBHOOK_SECRET;
        if (!apiKey) {
          return Response.json(
            { error: "Server configuration error" },
            { status: 500 }
          );
        }
        const authHeader = request.headers.get("Authorization");
        if (!authHeader || authHeader !== `Bearer ${apiKey}` && authHeader !== apiKey) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        let type;
        try {
          const body2 = await request.json();
          type = body2.type;
        } catch {
          return Response.json(
            { error: "Invalid JSON in request body" },
            { status: 400 }
          );
        }
        const EmailTemplate = EMAIL_TEMPLATES[type];
        if (!EmailTemplate) {
          return Response.json(
            { error: `Unknown email type: ${type}` },
            { status: 400 }
          );
        }
        const sampleData = SAMPLE_DATA[type] || {};
        const html = await render(React.createElement(EmailTemplate, sampleData));
        return new Response(html, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }
    }
  }
});
const DAILY_SUMMARY_LOCAL_HOUR = 20;
const FREQ_OFFSETS = {
  "Once daily": [0],
  "Twice daily": [0, 12],
  "Three times daily": [0, 8, 16],
  "Four times daily": [0, 6, 12, 18],
  "Every morning": [0],
  "Every evening": [0],
  "Every 8 hours": [0, 8, 16],
  "Every 12 hours": [0, 12],
  "Weekly": [0],
  "As needed": [],
  "Other": [0]
};
function doseTimesFor(baseHHMM, frequency) {
  const offsets = FREQ_OFFSETS[frequency ?? "Once daily"] ?? [0];
  if (offsets.length === 0) return [];
  const [hStr, mStr] = baseHHMM.split(":");
  const baseH = parseInt(hStr, 10);
  const baseM = parseInt(mStr, 10);
  if (Number.isNaN(baseH) || Number.isNaN(baseM)) return [];
  return offsets.map((off) => {
    const h2 = (baseH + off) % 24;
    return `${String(h2).padStart(2, "0")}:${String(baseM).padStart(2, "0")}`;
  });
}
function localPartsInTz(date, timeZone) {
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const parts = fmt.formatToParts(date).reduce((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
    const hh = parts.hour === "24" ? "00" : parts.hour;
    return { hh, mm: parts.minute, dateKey: `${parts.year}-${parts.month}-${parts.day}` };
  } catch {
    const hh = String(date.getUTCHours()).padStart(2, "0");
    const mm = String(date.getUTCMinutes()).padStart(2, "0");
    const dateKey = date.toISOString().slice(0, 10);
    return { hh, mm, dateKey };
  }
}
function authOk$1(request) {
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!expected) return true;
  const apikey = request.headers.get("apikey") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return apikey === expected;
}
const Route$2 = createFileRoute("/api/public/hooks/process-notifications")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!authOk$1(request)) return new Response("Unauthorized", { status: 401 });
        const result = {
          scheduled_sent: 0,
          med_reminders_sent: 0,
          daily_summaries_sent: 0,
          errors: []
        };
        const now = /* @__PURE__ */ new Date();
        try {
          const { data: due } = await supabaseAdmin.from("scheduled_notifications").select("id, user_id, kind, title, body, url, payload").lte("send_at", now.toISOString()).is("sent_at", null).limit(200);
          for (const row of due ?? []) {
            const { data: prof } = await supabaseAdmin.from("profiles").select("notify_crisis_followups, notify_product_updates").eq("user_id", row.user_id).maybeSingle();
            const optedIn = row.kind === "crisis_followup" ? prof?.notify_crisis_followups !== false : row.kind === "product_update" ? prof?.notify_product_updates !== false : true;
            if (optedIn) {
              const r = await sendPushToUser(row.user_id, {
                title: row.title,
                body: row.body,
                url: row.url || "/",
                tag: `${row.kind}-${row.id}`,
                data: row.payload ?? {}
              });
              if (r.sent > 0) result.scheduled_sent += r.sent;
            }
            await supabaseAdmin.from("scheduled_notifications").update({ sent_at: now.toISOString() }).eq("id", row.id);
          }
        } catch (e) {
          result.errors.push(`scheduled: ${e?.message ?? e}`);
        }
        const profileCache = /* @__PURE__ */ new Map();
        async function getProfile(userId) {
          if (profileCache.has(userId)) return profileCache.get(userId);
          const { data } = await supabaseAdmin.from("profiles").select("notify_med_reminders, notify_daily_summary, notify_crisis_followups, notify_product_updates, timezone").eq("user_id", userId).maybeSingle();
          profileCache.set(userId, data);
          return data;
        }
        try {
          const { data: meds } = await supabaseAdmin.from("medications").select("id, user_id, name, dose, dosage, frequency, reminder_time, schedule_time, reminder_enabled, status").eq("reminder_enabled", true).eq("status", "ongoing");
          for (const med of meds ?? []) {
            const rawTime = med.reminder_time || med.schedule_time;
            if (!rawTime) continue;
            const baseHM = String(rawTime).slice(0, 5);
            const times = doseTimesFor(baseHM, med.frequency);
            if (times.length === 0) continue;
            const prof = await getProfile(med.user_id);
            if (prof?.notify_med_reminders === false) continue;
            const tz = prof?.timezone || "UTC";
            const { hh, mm, dateKey } = localPartsInTz(now, tz);
            const target = `${hh}:${mm}`;
            if (!times.includes(target)) continue;
            const dose = med.dose || med.dosage || "";
            const r = await sendPushToUser(med.user_id, {
              title: `Time for your ${med.name}`,
              body: dose ? `Take ${dose} now. Tap to log it.` : "Tap to log this dose.",
              url: `/meds/${med.id}`,
              // Tag includes local date so each scheduled dose is unique per day.
              tag: `med-${med.id}-${dateKey}-${target}`,
              data: { medication_id: med.id }
            });
            result.med_reminders_sent += r.sent;
          }
        } catch (e) {
          result.errors.push(`med_reminders: ${e?.message ?? e}`);
        }
        try {
          const { data: optedInProfiles } = await supabaseAdmin.from("profiles").select("user_id, timezone").eq("notify_daily_summary", true);
          for (const p of optedInProfiles ?? []) {
            const tz = p.timezone || "UTC";
            const { hh, mm, dateKey } = localPartsInTz(now, tz);
            if (parseInt(hh, 10) !== DAILY_SUMMARY_LOCAL_HOUR || parseInt(mm, 10) >= 5) continue;
            const userId = p.user_id;
            const since = new Date(now.getTime() - 24 * 60 * 60 * 1e3).toISOString();
            const { data: logs } = await supabaseAdmin.from("medication_logs").select("status").eq("user_id", userId).gte("taken_at", since);
            const taken = logs?.filter((l) => l.status === "taken").length ?? 0;
            const missed = logs?.filter((l) => l.status === "missed").length ?? 0;
            const total = logs?.length ?? 0;
            if (total === 0) continue;
            const r = await sendPushToUser(userId, {
              title: "Your day in meds",
              body: `${taken} taken${missed ? `, ${missed} missed` : ""} today. Tap for details.`,
              url: "/meds",
              tag: `summary-${userId}-${dateKey}`
            });
            result.daily_summaries_sent += r.sent;
          }
        } catch (e) {
          result.errors.push(`daily_summary: ${e?.message ?? e}`);
        }
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
});
function authOk(request) {
  const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!expected) return true;
  const apikey = request.headers.get("apikey") || request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return apikey === expected;
}
async function aiBlurb(reason, fallback) {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAIKey = process.env.OPENAI_API_KEY;
  const grokKey = process.env.GROK_API_KEY;
  if (grokKey) {
    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${grokKey}` },
        body: JSON.stringify({
          model: "grok-2-latest",
          messages: [
            {
              role: "system",
              content: "You write short, warm, non-medical reminder messages (max 140 chars) for a sickle cell support app. No diagnosis, no medical advice, no emojis at start."
            },
            { role: "user", content: `Write a gentle heads-up notification body. Context: ${reason}` }
          ]
        })
      });
      if (!res.ok) return fallback;
      const json = await res.json();
      const text = json?.choices?.[0]?.message?.content?.trim();
      return text && text.length < 200 ? text : fallback;
    } catch {
      return fallback;
    }
  }
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You write short, warm, non-medical reminder messages (max 140 chars) for a sickle cell support app. No diagnosis, no medical advice, no emojis at start. Write a gentle heads-up notification body. Context: ${reason}`
                  }
                ]
              }
            ],
            generationConfig: { maxOutputTokens: 100, temperature: 0.7 }
          })
        }
      );
      if (!res.ok) return fallback;
      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      return text && text.length < 200 ? text : fallback;
    } catch {
      return fallback;
    }
  }
  if (openAIKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${openAIKey}` },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You write short, warm, non-medical reminder messages (max 140 chars) for a sickle cell support app. No diagnosis, no medical advice, no emojis at start."
            },
            { role: "user", content: `Write a gentle heads-up notification body. Context: ${reason}` }
          ]
        })
      });
      if (!res.ok) return fallback;
      const json = await res.json();
      const text = json?.choices?.[0]?.message?.content?.trim();
      return text && text.length < 200 ? text : fallback;
    } catch {
      return fallback;
    }
  }
  return fallback;
}
const Route$1 = createFileRoute("/api/public/hooks/predict-crisis")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!authOk(request)) return new Response("Unauthorized", { status: 401 });
        const result = { users_checked: 0, predictions_scheduled: 0, errors: [] };
        const tomorrow = /* @__PURE__ */ new Date();
        tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
        const tomorrowDom = tomorrow.getUTCDate();
        const tomorrowISO = tomorrow.toISOString().slice(0, 10);
        const sinceISO = new Date(Date.now() - 1e3 * 60 * 60 * 24 * 180).toISOString();
        try {
          const { data: logs, error } = await supabaseAdmin.from("crisis_logs").select("user_id, occurred_at, triggers, pain_level").gte("occurred_at", sinceISO).order("occurred_at", { ascending: false }).limit(2e3);
          if (error) throw error;
          const byUser = /* @__PURE__ */ new Map();
          for (const row of logs ?? []) {
            const arr = byUser.get(row.user_id) ?? [];
            arr.push(row);
            byUser.set(row.user_id, arr);
          }
          for (const [userId, rows] of byUser) {
            result.users_checked++;
            const monthsByDom = /* @__PURE__ */ new Map();
            const triggersByDom = /* @__PURE__ */ new Map();
            for (const r of rows) {
              const d = new Date(r.occurred_at);
              const dom = d.getUTCDate();
              const ym = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
              if (!monthsByDom.has(dom)) monthsByDom.set(dom, /* @__PURE__ */ new Set());
              monthsByDom.get(dom).add(ym);
              const t = Array.isArray(r.triggers) ? r.triggers : [];
              triggersByDom.set(dom, [...triggersByDom.get(dom) ?? [], ...t]);
            }
            const matchMonths = monthsByDom.get(tomorrowDom);
            if (!matchMonths || matchMonths.size < 2) continue;
            const tag = `crisis_prediction-${userId}-${tomorrowISO}`;
            const { data: existing } = await supabaseAdmin.from("scheduled_notifications").select("id").eq("user_id", userId).eq("kind", "crisis_prediction").gte("send_at", new Date(Date.now() - 1e3 * 60 * 60 * 6).toISOString()).lte("send_at", new Date(Date.now() + 1e3 * 60 * 60 * 30).toISOString()).limit(1);
            if (existing && existing.length > 0) continue;
            const { data: prof } = await supabaseAdmin.from("profiles").select("notify_crisis_followups").eq("user_id", userId).maybeSingle();
            if (prof?.notify_crisis_followups === false) continue;
            const triggers = Array.from(
              new Set((triggersByDom.get(tomorrowDom) ?? []).filter(Boolean))
            ).slice(0, 3);
            const reason = `User has had a crisis on day ${tomorrowDom} of the month in ${matchMonths.size} previous months${triggers.length ? `, common triggers: ${triggers.join(", ")}` : ""}. Tomorrow is day ${tomorrowDom}.`;
            const fallback = triggers.length ? `Heads up — past crises clustered around this date. Watch for ${triggers.join(", ")} and stay hydrated.` : "Heads up — past crises clustered around this date. Stay hydrated, rest well, and keep meds on hand.";
            const body2 = await aiBlurb(reason, fallback);
            const sendAt = new Date(tomorrow);
            sendAt.setUTCHours(6, 0, 0, 0);
            const { error: insErr } = await supabaseAdmin.from("scheduled_notifications").insert({
              user_id: userId,
              kind: "crisis_prediction",
              send_at: sendAt.toISOString(),
              title: "A gentle heads-up for tomorrow",
              body: body2,
              url: "/crisis",
              payload: { tag, day_of_month: tomorrowDom, prior_months: matchMonths.size }
            });
            if (insErr) {
              result.errors.push(`schedule ${userId}: ${insErr.message}`);
              continue;
            }
            result.predictions_scheduled++;
          }
        } catch (e) {
          result.errors.push(`predict: ${e?.message ?? e}`);
        }
        return new Response(JSON.stringify(result), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
});
const BodySchema = z.object({
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(400),
  url: z.string().max(2048).optional()
});
async function callerIsAdmin(request) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (token && token === process.env.SUPABASE_SERVICE_ROLE_KEY) return true;
  if (!token) return false;
  try {
    const { data: userData } = await supabaseAdmin.auth.getUser(token);
    const userId = userData?.user?.id;
    if (!userId) return false;
    const { data: roles } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId);
    return Array.isArray(roles) && roles.some((r) => r.role === "admin");
  } catch {
    return false;
  }
}
const Route2 = createFileRoute("/api/public/hooks/broadcast-product-update")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!await callerIsAdmin(request)) return new Response("Unauthorized", { status: 401 });
        let parsed;
        try {
          parsed = BodySchema.parse(await request.json());
        } catch (e) {
          return new Response(JSON.stringify({ error: e?.message ?? "Bad request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }
        const { data: rows, error } = await supabaseAdmin.from("push_subscriptions").select("id, endpoint, p256dh, auth, user_id, profiles!inner(notify_product_updates)").eq("profiles.notify_product_updates", true);
        if (error) {
          const { data: prof } = await supabaseAdmin.from("profiles").select("user_id").eq("notify_product_updates", true);
          const userIds = prof?.map((p) => p.user_id) ?? [];
          if (userIds.length === 0) {
            return new Response(JSON.stringify({ sent: 0, removed: 0, recipients: 0 }), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }
          const { data: subs2 } = await supabaseAdmin.from("push_subscriptions").select("id, endpoint, p256dh, auth").in("user_id", userIds);
          const r2 = await sendToSubscriptions(subs2 ?? [], {
            title: parsed.title,
            body: parsed.body,
            url: parsed.url || "/",
            tag: `update-${Date.now()}`
          });
          return new Response(JSON.stringify({ ...r2, recipients: subs2?.length ?? 0 }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }
        const r = await sendToSubscriptions(rows ?? [], {
          title: parsed.title,
          body: parsed.body,
          url: parsed.url || "/",
          tag: `update-${Date.now()}`
        });
        return new Response(JSON.stringify({ ...r, recipients: rows?.length ?? 0 }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
  }
});
const SplatRoute = Route$7.update({
  id: "/$",
  path: "/$",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const ApiEmailWebhookRoute = Route$5.update({
  id: "/api/email/webhook",
  path: "/api/email/webhook",
  getParentRoute: () => Route$8
});
const ApiEmailProcessRoute = Route$4.update({
  id: "/api/email/process",
  path: "/api/email/process",
  getParentRoute: () => Route$8
});
const ApiEmailPreviewRoute = Route$3.update({
  id: "/api/email/preview",
  path: "/api/email/preview",
  getParentRoute: () => Route$8
});
const ApiPublicHooksProcessNotificationsRoute = Route$2.update({
  id: "/api/public/hooks/process-notifications",
  path: "/api/public/hooks/process-notifications",
  getParentRoute: () => Route$8
});
const ApiPublicHooksPredictCrisisRoute = Route$1.update({
  id: "/api/public/hooks/predict-crisis",
  path: "/api/public/hooks/predict-crisis",
  getParentRoute: () => Route$8
});
const ApiPublicHooksBroadcastProductUpdateRoute = Route2.update({
  id: "/api/public/hooks/broadcast-product-update",
  path: "/api/public/hooks/broadcast-product-update",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  SplatRoute,
  ApiEmailPreviewRoute,
  ApiEmailProcessRoute,
  ApiEmailWebhookRoute,
  ApiPublicHooksBroadcastProductUpdateRoute,
  ApiPublicHooksPredictCrisisRoute,
  ApiPublicHooksProcessNotificationsRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  LayoutGroupContext as L,
  MotionConfigContext as M,
  PresenceContext as P,
  usePresence as a,
  useIsomorphicLayoutEffect as b,
  meltingFace as c,
  motion as m,
  router as r,
  useConstant as u
};
