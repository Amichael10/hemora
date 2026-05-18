import { c as reactExports, q as jsxRuntimeExports } from "../server.js";
import { d as useProfile, f as useGetProfile, u as useLocation, a as useToast, K as useUpdateProvider, M as useUpdateProfile, N as useListProviders, O as getListProvidersQueryKey, P as getGetProfileQueryKey, Q as useCreateProviderSuggestion } from "./AppRouter-yFV4k-aY.js";
import { M as MobileAppShell, D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, e as DialogFooter } from "./MobileAppShell-o-1rb7vr.js";
import { B as Button } from "./button-Be3fVaAL.js";
import { C as Card, a as CardContent } from "./card-44hdj3L3.js";
import { I as Input } from "./input-BdT5cO17.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-x5Uz1oRZ.js";
import { L as Label } from "./label-oa-7Bv2h.js";
import { T as Textarea } from "./textarea-ZWvuJzjm.js";
import { u as useQueryClient } from "./router-BY6ex80A.js";
import { D as DEFAULT_COUNTRY, s as statesFor, C as COUNTRIES } from "./index-BEVAgEKR.js";
import { S as Skeleton } from "./skeleton-DZx3sViR.js";
import { i as p11, J as zK, P as Zr, _ as jM1, a0 as pm1, a1 as Jo, a2 as a11, a as FX1, a3 as $o, a4 as L41, N as N41, a5 as f4, a6 as HN1, a7 as Y50, a8 as r1, a9 as a, C as T91, $ as $61, aa as c40, E as l40 } from "./index-D2ZfvGdl.js";
import "node:async_hooks";
import "node:stream";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream/web";
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
import "./index-CJIBj5JK.js";
import "./Combination-BEb72fQw.js";
import "./auth-middleware-C0ZeJ0gn.js";
import "./createMiddleware-BvN2ghIY.js";
import "./index-BfrgU2eP.js";
import "./index-D8DUTDeV.js";
import "./check-Dt55N_VK.js";
import "./index-DkPu60F3.js";
function haversineKm(a2, b) {
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  const dLat = toRad(b.lat - a2.lat);
  const dLng = toRad(b.lng - a2.lng);
  const lat1 = toRad(a2.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1e3)} m away`;
  if (km < 10) return `${km.toFixed(1)} km away`;
  return `${Math.round(km)} km away`;
}
const ALL_COUNTRIES = "__all_countries__";
const ALL_STATES = "__all_states__";
function Directory() {
  const { profileId } = useProfile();
  const { data: profile } = useGetProfile(profileId);
  const [, setLocation] = useLocation();
  const profileCountry = profile?.country ?? null;
  const defaultCountry = profileCountry ?? DEFAULT_COUNTRY;
  const [search, setSearch] = reactExports.useState("");
  const [activeFilter, setActiveFilter] = reactExports.useState("all");
  const [savedOnly, setSavedOnly] = reactExports.useState(false);
  const [country, setCountry] = reactExports.useState(defaultCountry);
  const [state, setState] = reactExports.useState(ALL_STATES);
  const [countryTouched, setCountryTouched] = reactExports.useState(false);
  const [userCoords, setUserCoords] = reactExports.useState(null);
  const [locationStatus, setLocationStatus] = reactExports.useState("idle");
  const requestLocation = () => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }
    setLocationStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocationStatus("granted");
      },
      () => {
        setLocationStatus("denied");
      },
      { enableHighAccuracy: false, timeout: 1e4, maximumAge: 5 * 60 * 1e3 }
    );
  };
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const updateProvider = useUpdateProvider();
  const updateProfile = useUpdateProfile();
  const [locationPromptDismissed, setLocationPromptDismissed] = reactExports.useState(false);
  const showLocationPrompt = !!profile && !profileCountry && !locationPromptDismissed;
  const saveProfileLocation = () => {
    if (!profile) return;
    const body = {};
    if (country !== ALL_COUNTRIES) body.country = country;
    if (state !== ALL_STATES) body.state = state;
    if (!body.country) {
      toast({ title: "Pick a country first" });
      return;
    }
    updateProfile.mutate(
      { id: profile.id, data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey(profile.id) });
          toast({ title: `Saved ${body.country} as your home country` });
          setLocationPromptDismissed(true);
        },
        onError: () => {
          toast({ title: "Couldn't save your location", variant: "destructive" });
        }
      }
    );
  };
  reactExports.useEffect(() => {
    if (countryTouched) return;
    if (profileCountry && profileCountry !== country) {
      setCountry(profileCountry);
      setState(ALL_STATES);
    }
  }, [profileCountry, countryTouched]);
  const stateOptions = reactExports.useMemo(
    () => country === ALL_COUNTRIES ? [] : statesFor(country),
    [country]
  );
  const queryParams = reactExports.useMemo(() => {
    const p = {};
    if (country !== ALL_COUNTRIES) p.country = country;
    if (state !== ALL_STATES) p.state = state;
    if (activeFilter !== "all") p.type = activeFilter;
    if (savedOnly) p.saved = true;
    return p;
  }, [country, state, activeFilter, savedOnly]);
  const { data: providers, isLoading } = useListProviders(queryParams, {
    query: { queryKey: getListProvidersQueryKey(queryParams) }
  });
  const filters = [
    { id: "all", label: "All" },
    { id: "hospital", label: "Hospitals" },
    { id: "counselling", label: "Counselling" },
    { id: "lab", label: "Labs" },
    { id: "support", label: "Support" }
  ];
  const handleToggleSaved = (id, name, currentlySaved) => {
    updateProvider.mutate(
      { id, data: { saved: !currentlySaved } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/directory"] });
          toast({
            title: currentlySaved ? `Removed ${name} from saved` : `Saved ${name}`
          });
        },
        onError: () => {
          toast({ title: "Couldn't update saved providers", variant: "destructive" });
        }
      }
    );
  };
  const filteredProviders = reactExports.useMemo(() => {
    if (!providers) return void 0;
    const matched = providers.filter((p) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return p.name.toLowerCase().includes(q) || (p.city ?? "").toLowerCase().includes(q) || (p.state ?? "").toLowerCase().includes(q);
    });
    if (!userCoords) return matched;
    const decorated = matched.map((p) => {
      const distanceKm = p.latitude != null && p.longitude != null ? haversineKm(userCoords, { lat: p.latitude, lng: p.longitude }) : null;
      return { ...p, distanceKm };
    });
    decorated.sort((a2, b) => {
      if (a2.distanceKm != null && b.distanceKm != null) {
        return a2.distanceKm - b.distanceKm;
      }
      if (a2.distanceKm != null) return -1;
      if (b.distanceKm != null) return 1;
      return a2.name.localeCompare(b.name);
    });
    return decorated;
  }, [providers, search, userCoords]);
  const filtersActive = country !== defaultCountry || state !== ALL_STATES || activeFilter !== "all" || savedOnly || search !== "";
  const clearFilters = () => {
    setCountry(defaultCountry);
    setState(ALL_STATES);
    setActiveFilter("all");
    setSavedOnly(false);
    setSearch("");
    setCountryTouched(false);
  };
  const emptyMessage = (() => {
    const parts = [];
    if (state !== ALL_STATES) parts.push(state);
    if (country !== ALL_COUNTRIES) parts.push(country);
    const where = parts.length ? ` in ${parts.join(", ")}` : "";
    return `No providers found${where}.`;
  })();
  const getProviderIcon = (type) => {
    switch (type) {
      case "hospital":
        return { outline: l40, filled: c40 };
      case "lab":
        return { outline: $61, filled: T91 };
      case "counselling":
        return { outline: a, filled: r1 };
      default:
        return { outline: Y50, filled: HN1 };
    }
  };
  const [suggestOpen, setSuggestOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(MobileAppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-serif text-[1.5rem] text-primary font-semibold tracking-[-0.5px]", children: "Care Directory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            className: "h-9 rounded-xl bg-card border-none shadow-sm text-xs gap-1.5 text-primary",
            onClick: () => setSuggestOpen(true),
            "data-testid": "btn-suggest-provider",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(p11, { size: 14 }),
              " Suggest"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 inline-flex text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(zK, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search specialists, clinics...",
            className: "pl-9 h-11 rounded-xl bg-card border-none shadow-sm",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            "data-testid": "directory-search"
          }
        )
      ] }),
      showLocationPrompt && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mb-3 rounded-2xl bg-primary/5 border border-primary/15 p-4",
          "data-testid": "location-prompt",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zr, { size: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary leading-tight", children: "Tell us where you're based" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed", children: "Pick your country (and optionally state) below — we'll save it to your profile and show local providers first." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: saveProfileLocation,
                    disabled: updateProfile.isPending || country === ALL_COUNTRIES,
                    className: "h-9 rounded-xl text-xs px-4",
                    "data-testid": "btn-save-profile-location",
                    children: updateProfile.isPending ? "Saving…" : country === ALL_COUNTRIES ? "Pick a country below" : `Save ${country}${state !== ALL_STATES ? `, ${state}` : ""}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setLocationPromptDismissed(true),
                    className: "text-xs text-muted-foreground hover:text-primary px-2",
                    "data-testid": "btn-dismiss-location-prompt",
                    children: "Not now"
                  }
                )
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: country,
            onValueChange: (v) => {
              setCountry(v);
              setState(ALL_STATES);
              setCountryTouched(true);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-11 rounded-xl bg-card border-none shadow-sm text-xs",
                  "data-testid": "directory-country",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Country" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL_COUNTRIES, children: "All countries" }),
                COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.name, children: c.name }, c.code))
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: state,
            onValueChange: setState,
            disabled: country === ALL_COUNTRIES || stateOptions.length === 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-11 rounded-xl bg-card border-none shadow-sm text-xs",
                  "data-testid": "directory-state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "State / Region" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ALL_STATES, children: "All states" }),
                stateOptions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-2 flex-wrap", children: [
        filters.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: activeFilter === filter.id ? "default" : "outline",
            className: `rounded-xl h-9 whitespace-nowrap text-xs font-medium shadow-sm ${activeFilter !== filter.id ? "bg-card border-none text-muted-foreground" : ""}`,
            onClick: () => setActiveFilter(filter.id),
            children: filter.label
          },
          filter.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: savedOnly ? "default" : "outline",
            className: `rounded-xl h-9 whitespace-nowrap text-xs font-medium shadow-sm gap-1.5 ${!savedOnly ? "bg-card border-none text-muted-foreground" : ""}`,
            onClick: () => setSavedOnly((v) => !v),
            "data-testid": "filter-saved",
            children: [
              savedOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx(jM1, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(pm1, { size: 14 }),
              "Saved"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 mt-2 gap-2", children: [
        locationStatus === "granted" && userCoords ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-1 text-xs text-primary",
            "data-testid": "directory-location-active",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Jo, { size: 12 }),
              " Sorted by distance from you"
            ]
          }
        ) : locationStatus === "denied" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs text-muted-foreground",
            "data-testid": "directory-location-denied",
            children: "Location unavailable — showing alphabetical"
          }
        ) : locationStatus === "unsupported" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Location not supported on this device" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: requestLocation,
            disabled: locationStatus === "requesting",
            className: "inline-flex items-center gap-1 text-xs text-primary hover:underline disabled:opacity-60",
            "data-testid": "directory-use-location",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Jo, { size: 12 }),
              locationStatus === "requesting" ? "Finding you…" : "Sort by closest to me"
            ]
          }
        ),
        filtersActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: clearFilters,
            className: "inline-flex items-center gap-1 text-xs text-primary hover:underline",
            "data-testid": "directory-clear-filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(a11, { size: 12 }),
              " Clear filters"
            ]
          }
        )
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-none shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-12 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
        ] })
      ] }) }) }, i)) }) : filteredProviders?.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4 opacity-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(zK, { size: 48 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", "data-testid": "directory-empty", children: emptyMessage })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: filteredProviders?.map((provider) => {
        const { outline, filled } = getProviderIcon(provider.type);
        const distanceKm = "distanceKm" in provider ? provider.distanceKm : null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "group border-none shadow-sm",
            "data-testid": `provider-card-${provider.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  role: "link",
                  tabIndex: 0,
                  onClick: () => setLocation(`/directory/${provider.id}`),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLocation(`/directory/${provider.id}`);
                    }
                  },
                  className: "flex items-start gap-4 mb-4 w-full text-left cursor-pointer",
                  "data-testid": `provider-link-${provider.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "relative inline-flex shrink-0",
                        style: { width: 22, height: 22 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover:opacity-0", children: /* @__PURE__ */ (() => {
                            const O = outline;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(O, { size: 22 });
                          })() }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100", children: /* @__PURE__ */ (() => {
                            const F = filled;
                            return /* @__PURE__ */ jsxRuntimeExports.jsx(F, { size: 22 });
                          })() })
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm leading-tight tracking-[-0.01em]", children: provider.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0 mt-0.5", children: [
                          provider.verified && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600 inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FX1, { size: 16 }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: (e) => {
                                e.stopPropagation();
                                handleToggleSaved(provider.id, provider.name, provider.saved);
                              },
                              disabled: updateProvider.isPending,
                              "aria-label": provider.saved ? `Remove ${provider.name} from saved` : `Save ${provider.name}`,
                              "aria-pressed": provider.saved,
                              className: `inline-flex items-center justify-center w-7 h-7 -m-1 rounded-full transition-colors hover:bg-muted ${provider.saved ? "text-primary" : "text-muted-foreground hover:text-primary"}`,
                              "data-testid": `btn-toggle-saved-${provider.id}`,
                              children: provider.saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(jM1, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(pm1, { size: 18 })
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "capitalize", children: provider.type }),
                        (provider.city || provider.state) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx($o, { size: 12 }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-1", children: [provider.city, provider.state].filter(Boolean).join(", ") })
                        ] })
                      ] }),
                      distanceKm != null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "inline-flex items-center gap-1 text-[11px] text-primary font-medium mb-1",
                          "data-testid": `provider-distance-${provider.id}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Jo, { size: 11 }),
                            formatDistance(distanceKm)
                          ]
                        }
                      ),
                      provider.services && provider.services.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mt-2", children: [
                        provider.services.slice(0, 2).map((service, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-[10px] bg-muted/40 px-2 py-0.5 rounded-md text-muted-foreground",
                            children: service
                          },
                          idx
                        )),
                        provider.services.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-muted/40 px-2 py-0.5 rounded-md text-muted-foreground", children: [
                          "+",
                          provider.services.length - 2
                        ] })
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "group/btn w-full text-xs h-9 bg-card border-border/60 hover:bg-muted shadow-sm gap-1.5",
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: provider.phone ? `tel:${provider.phone}` : "#", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "relative inline-flex shrink-0",
                          style: { width: 14, height: 14 },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 transition-opacity duration-150 group-hover/btn:opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(L41, { size: 14 }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/btn:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(N41, { size: 14 }) })
                          ]
                        }
                      ),
                      "Call"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    className: "w-full text-xs h-9 bg-card border-border/60 hover:bg-muted shadow-sm gap-1.5",
                    asChild: true,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          [provider.name, provider.address, provider.city, provider.state, provider.country].filter(Boolean).join(", ")
                        )}`,
                        target: "_blank",
                        rel: "noreferrer",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(f4, { size: 14 }),
                          " Directions"
                        ]
                      }
                    )
                  }
                )
              ] })
            ] })
          },
          provider.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SuggestProviderDialog,
      {
        open: suggestOpen,
        onOpenChange: setSuggestOpen,
        defaultCountry: country !== ALL_COUNTRIES ? country : defaultCountry,
        defaultState: state !== ALL_STATES ? state : null
      }
    )
  ] });
}
function SuggestProviderDialog({
  open,
  onOpenChange,
  defaultCountry,
  defaultState
}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const createProvider = useCreateProviderSuggestion();
  const [name, setName] = reactExports.useState("");
  const [type, setType] = reactExports.useState("hospital");
  const [country, setCountry] = reactExports.useState(defaultCountry);
  const [state, setState] = reactExports.useState(defaultState ?? "");
  const [city, setCity] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [about, setAbout] = reactExports.useState("");
  const stateOpts = reactExports.useMemo(() => statesFor(country), [country]);
  reactExports.useEffect(() => {
    if (open) {
      setCountry(defaultCountry);
      setState(defaultState ?? "");
    }
  }, [open, defaultCountry, defaultState]);
  const reset = () => {
    setName("");
    setType("hospital");
    setCity("");
    setPhone("");
    setAbout("");
  };
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    const body = {
      name: name.trim(),
      type,
      country: country || null,
      state: state || null,
      city: city.trim() || null,
      phone: phone.trim() || null,
      about: about.trim() || null,
      services: [],
      verified: false,
      saved: false
    };
    createProvider.mutate(
      { data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/directory"] });
          toast({
            title: "Thank you for the suggestion",
            description: "We'll review and add it to the directory soon."
          });
          reset();
          onOpenChange(false);
        },
        onError: () => {
          toast({
            title: "Couldn't submit suggestion",
            description: "Please check the details and try again.",
            variant: "destructive"
          });
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-[400px] rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-serif text-primary", children: "Suggest a provider" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs", children: "Help other families find clinics, counsellors, labs, and support groups you trust. We'll review before publishing." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", "data-testid": "suggest-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "suggest-name", className: "text-xs", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "suggest-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "e.g. LUTH Sickle Cell Clinic",
            required: true,
            "data-testid": "suggest-name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: type,
            onValueChange: (v) => setType(v),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-testid": "suggest-type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "hospital", children: "Hospital" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "counselling", children: "Counselling" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "lab", children: "Lab" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "support", children: "Support group" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Country" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: country,
              onValueChange: (v) => {
                setCountry(v);
                setState("");
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-testid": "suggest-country", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: COUNTRIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.name, children: c.name }, c.code)) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "State / Region" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: state || "__none__",
              onValueChange: (v) => setState(v === "__none__" ? "" : v),
              disabled: stateOpts.length === 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "data-testid": "suggest-state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "__none__", children: "—" }),
                  stateOpts.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s))
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "suggest-city", className: "text-xs", children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "suggest-city",
              value: city,
              onChange: (e) => setCity(e.target.value),
              placeholder: "Lagos",
              "data-testid": "suggest-city"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "suggest-phone", className: "text-xs", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "suggest-phone",
              value: phone,
              onChange: (e) => setPhone(e.target.value),
              placeholder: "+234...",
              inputMode: "tel",
              "data-testid": "suggest-phone"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "suggest-about", className: "text-xs", children: [
          "Notes ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "(optional)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "suggest-about",
            value: about,
            onChange: (e) => setAbout(e.target.value),
            placeholder: "What should families know about this provider?",
            rows: 3,
            "data-testid": "suggest-about"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2 sm:gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: () => onOpenChange(false),
            className: "rounded-xl",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: !name.trim() || createProvider.isPending,
            className: "rounded-xl",
            "data-testid": "suggest-submit",
            children: createProvider.isPending ? "Submitting..." : "Submit suggestion"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  Directory as default
};
