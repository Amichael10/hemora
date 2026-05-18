import { e as useRouter, c as reactExports, C as isRedirect, q as jsxRuntimeExports, T as TSS_SERVER_FUNCTION, D as getServerFnById, z as createServerFn } from "../server.js";
import { _ as useControllableState, af as Presence, a8 as Portal$1, a2 as Primitive, a7 as composeEventHandlers, a9 as createContextScope, a0 as useComposedRefs, ab as DismissableLayer, ac as createSlot, ag as createContext2, ah as X, z as cn, a as useToast, u as useLocation, L as Link } from "./AppRouter-yFV4k-aY.js";
import { u as useId } from "./index-CJIBj5JK.js";
import { h as hideOthers, R as ReactRemoveScroll, u as useFocusGuards, F as FocusScope } from "./Combination-BEb72fQw.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { V as VAPID_PUBLIC_KEY, o as objectType, d as stringType, e as booleanType } from "./push.server-DA3L-NAE.js";
import { r as requireSupabaseAuth } from "./auth-middleware-C0ZeJ0gn.js";
import { af as pJ1, ah as Q11, Y as Y91, w as w81, l as L91, S as S61, O as OM1, x as om1, W as WN1, T as T50 } from "./index-D2ZfvGdl.js";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.state.location;
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription$1.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Trigger = DialogTrigger;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription$1;
var Close = DialogClose;
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}
function arrayBufferToBase64(buf) {
  if (!buf) return "";
  const bytes = new Uint8Array(buf);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}
function isPushSupported() {
  if (typeof window === "undefined") return false;
  return "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
}
function isPreviewOrIframe() {
  if (typeof window === "undefined") return true;
  try {
    if (window.self !== window.top) return true;
  } catch {
    return true;
  }
  const host = window.location.hostname;
  return host.includes("id-preview--");
}
async function ensureServiceWorker() {
  if (!isPushSupported() || isPreviewOrIframe()) return null;
  try {
    const existing = await navigator.serviceWorker.getRegistration("/sw.js");
    if (existing) return existing;
    return await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch (e) {
    console.warn("[push] sw register failed", e);
    return null;
  }
}
async function subscribeBrowser() {
  const reg = await ensureServiceWorker();
  if (!reg) return null;
  const permission = await Notification.requestPermission();
  if (permission !== "granted") return null;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });
  }
  return {
    endpoint: sub.endpoint,
    p256dh: arrayBufferToBase64(sub.getKey("p256dh")),
    auth: arrayBufferToBase64(sub.getKey("auth")),
    userAgent: navigator.userAgent.slice(0, 512),
    timezone: getBrowserTimezone()
  };
}
async function unsubscribeBrowser() {
  if (!isPushSupported() || isPreviewOrIframe()) return null;
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  if (!reg) return null;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return null;
  const endpoint = sub.endpoint;
  await sub.unsubscribe();
  return endpoint;
}
async function getCurrentEndpoint() {
  if (!isPushSupported() || isPreviewOrIframe()) return null;
  const reg = await navigator.serviceWorker.getRegistration("/sw.js");
  if (!reg) return null;
  const sub = await reg.pushManager.getSubscription();
  return sub?.endpoint ?? null;
}
function isIosSafari() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua);
}
function isStandalonePwa() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true;
}
function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || void 0;
  } catch {
    return void 0;
  }
}
var createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const SubscriptionSchema = objectType({
  endpoint: stringType().url().max(2048),
  p256dh: stringType().min(1).max(512),
  auth: stringType().min(1).max(512),
  userAgent: stringType().max(512).optional(),
  timezone: stringType().max(64).optional()
});
const subscribeToPush = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => SubscriptionSchema.parse(input)).handler(createSsrRpc("2e1ab3a05ddfeccbf7cb4d8a2420d1fdcf5f7d44e6ba3c167d872e1d222dee48"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  endpoint: stringType().url().max(2048)
}).parse(input)).handler(createSsrRpc("eeba9ae444a7e4479e167de361288b5564ac9a35c9644c3b3586cd211fad1f96"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("19fbe5f422daa21f53de02c4650dcb6774250d2d1b1396b38f281ca100286cfc"));
const PrefsSchema = objectType({
  notify_med_reminders: booleanType().optional(),
  notify_daily_summary: booleanType().optional(),
  notify_crisis_followups: booleanType().optional(),
  notify_product_updates: booleanType().optional()
});
createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("4934fdf2872d0779001bf8846e702ab736343795250c0396af45f6c412681345"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => PrefsSchema.parse(input)).handler(createSsrRpc("02fa8882595590cb3de1f07df4626fd043ff8da44d3a9df404debfbccac8bca5"));
const SHOWN_KEY = "hemora.notify-prompt.shown";
function maybeAskToEnableNotifications(reason) {
  if (typeof window === "undefined") return;
  try {
    if (localStorage.getItem(SHOWN_KEY)) return;
    if (typeof Notification !== "undefined" && Notification.permission !== "default") {
      localStorage.setItem(SHOWN_KEY, "1");
      return;
    }
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("hemora:ask-notifications", { detail: { reason } }));
    }, 600);
  } catch {
  }
}
function NotifyEnablePrompt() {
  const [open, setOpen] = reactExports.useState(false);
  const [reason, setReason] = reactExports.useState("first-med");
  const [busy, setBusy] = reactExports.useState(false);
  const subscribe = useServerFn(subscribeToPush);
  const { toast } = useToast();
  reactExports.useEffect(() => {
    function onAsk(e) {
      const detail = e.detail;
      if (detail?.reason) setReason(detail.reason);
      setOpen(true);
    }
    window.addEventListener("hemora:ask-notifications", onAsk);
    return () => window.removeEventListener("hemora:ask-notifications", onAsk);
  }, []);
  function dismiss() {
    try {
      localStorage.setItem(SHOWN_KEY, "1");
    } catch {
    }
    setOpen(false);
  }
  async function handleEnable() {
    if (isIosSafari() && !isStandalonePwa()) {
      toast({
        title: "Add Hemora to your Home Screen first",
        description: "iOS only sends push to installed web apps. Tap Share → Add to Home Screen, then come back."
      });
      dismiss();
      return;
    }
    if (!isPushSupported()) {
      toast({ title: "Notifications aren't supported on this device", variant: "destructive" });
      dismiss();
      return;
    }
    setBusy(true);
    try {
      const sub = await subscribeBrowser();
      if (!sub) {
        toast({ title: "Notifications not enabled", description: "You can turn them on later in Settings." });
        dismiss();
        return;
      }
      await subscribe({ data: sub });
      toast({ title: "Notifications enabled" });
      dismiss();
    } catch (e) {
      toast({ title: "Couldn't enable notifications", description: e?.message, variant: "destructive" });
      dismiss();
    } finally {
      setBusy(false);
    }
  }
  const title = reason === "first-crisis" ? "Get crisis follow-ups?" : "Never miss a dose?";
  const body = reason === "first-crisis" ? "We'll check in 24 hours after a crisis and send heads-ups when patterns suggest a tough day ahead." : "Turn on push notifications and Hemora will remind you when it's time to take this medication.";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => v ? setOpen(true) : dismiss(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm rounded-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: body })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex flex-col gap-2 sm:flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleEnable, disabled: busy, size: "lg", className: "w-full", children: busy ? "Enabling…" : "Turn on notifications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: dismiss, variant: "ghost", size: "lg", className: "w-full", children: "Not now" })
    ] })
  ] }) });
}
const navItems = [
  { label: "Home", path: "/dashboard", Outline: Q11, Filled: pJ1 },
  { label: "Crisis", path: "/crisis", Outline: w81, Filled: Y91, activeColor: "text-accent" },
  { label: "Meds", path: "/meds", Outline: S61, Filled: L91 },
  { label: "Records", path: "/records", Outline: om1, Filled: OM1 },
  { label: "Directory", path: "/directory", Outline: T50, Filled: WN1 }
];
function MobileAppShell({ children, hideNav = false, fullWidth = false }) {
  const [location] = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
    "min-h-[100dvh] w-full flex justify-center",
    fullWidth ? "bg-background" : "bg-secondary"
  ), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn(
      "w-full bg-background min-h-[100dvh] flex flex-col relative",
      fullWidth ? "max-w-none shadow-none" : "max-w-[430px] shadow-xl"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: cn("flex-1", hideNav ? "" : "pb-20", fullWidth ? "w-full" : ""), children }),
      !hideNav && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/60 px-2 py-2 pb-safe flex justify-between items-center z-50 shadow-[rgba(0,0,0,0.03)_0px_-4px_24px]", children: navItems.map(({ label, path, Outline, Filled, activeColor }) => {
        const isActive = location.startsWith(path);
        const color = activeColor || "text-primary";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { href: path, className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "data-testid": `nav-${label.toLowerCase()}`,
            className: cn(
              "group w-full flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors",
              isActive ? color : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(Filled, { size: 22 }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex shrink-0", style: { width: 22, height: 22 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover:opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outline, { size: 22 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Filled, { size: 22 }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-[10px] tracking-tight", isActive ? "font-semibold" : "font-medium"), children: label })
            ]
          }
        ) }, path);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NotifyEnablePrompt, {})
  ] });
}
export {
  Content as C,
  Dialog as D,
  MobileAppShell as M,
  Overlay as O,
  Portal as P,
  Root as R,
  Trigger as T,
  DialogContent as a,
  DialogHeader as b,
  DialogTitle as c,
  DialogDescription as d,
  DialogFooter as e,
  Close as f,
  Title as g,
  Description as h,
  isStandalonePwa as i,
  isIosSafari as j,
  isPushSupported as k,
  getCurrentEndpoint as l,
  maybeAskToEnableNotifications as m,
  subscribeBrowser as s,
  unsubscribeBrowser as u
};
