import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useListProviders,
  useGetProfile,
  useUpdateProfile,
  useUpdateProvider,
  useCreateProvider,
  getListProvidersQueryKey,
  getGetProfileQueryKey,
  type ListProvidersParams,
  type CreateProviderBody,
} from "@workspace/api-client-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useProfile } from "@/context/ProfileContext";
import { COUNTRIES, DEFAULT_COUNTRY, statesFor } from "@workspace/regions";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MagniferLinear as Search,
  CheckCircleBold as CheckCircle2,
  ArrowRightUpLinear as ArrowUpRight,
  PhoneBold as PhoneFilled,
  HospitalBold as HospitalFilled,
  UsersGroupTwoRoundedBold as CommunityFilled,
  TestTubeBold as BioFilled,
  ChatRoundDotsBold as MedAdviceFilled,
  PhoneLinear as PhoneOutline,
  MapPointLinear as GeoOutline,
  MapPointWaveLinear as NearMeOutline,
  HospitalLinear as HospitalOutline,
  UsersGroupTwoRoundedLinear as CommunityOutline,
  TestTubeLinear as BioOutline,
  ChatRoundDotsLinear as MedAdviceOutline,
  CloseCircleLinear as ClearIcon,
  BookmarkBold as BookmarkFilled,
  BookmarkLinear as BookmarkOutline,
  AddCircleLinear as AddIcon,
  GlobalLinear as GlobeIcon,
} from "solar-icon-set";

type Coords = { lat: number; lng: number };
type LocationStatus = "idle" | "requesting" | "granted" | "denied" | "unsupported";

function haversineKm(a: Coords, b: Coords): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m away`;
  if (km < 10) return `${km.toFixed(1)} km away`;
  return `${Math.round(km)} km away`;
}

const ALL_COUNTRIES = "__all_countries__";
const ALL_STATES = "__all_states__";

export default function Directory() {
  const { profileId } = useProfile();
  const { data: profile } = useGetProfile(profileId);
  const [, setLocation] = useLocation();

  const profileCountry = profile?.country ?? null;
  const defaultCountry = profileCountry ?? DEFAULT_COUNTRY;

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [savedOnly, setSavedOnly] = useState(false);
  const [country, setCountry] = useState<string>(defaultCountry);
  const [state, setState] = useState<string>(ALL_STATES);
  const [countryTouched, setCountryTouched] = useState(false);
  const [userCoords, setUserCoords] = useState<Coords | null>(null);
  const [locationStatus, setLocationStatus] = useState<LocationStatus>("idle");

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
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  };

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const updateProvider = useUpdateProvider();
  const updateProfile = useUpdateProfile();
  const [locationPromptDismissed, setLocationPromptDismissed] = useState(false);

  const showLocationPrompt =
    !!profile && !profileCountry && !locationPromptDismissed;

  const saveProfileLocation = () => {
    if (!profile) return;
    const body: { country?: string | null; state?: string | null } = {};
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
        },
      }
    );
  };

  // Once the profile loads, sync the country default if the user hasn't
  // explicitly chosen one yet.
  useEffect(() => {
    if (countryTouched) return;
    if (profileCountry && profileCountry !== country) {
      setCountry(profileCountry);
      setState(ALL_STATES);
    }
  }, [profileCountry, countryTouched]);

  const stateOptions = useMemo(
    () => (country === ALL_COUNTRIES ? [] : statesFor(country)),
    [country]
  );

  const queryParams: ListProvidersParams = useMemo(() => {
    const p: ListProvidersParams = {};
    if (country !== ALL_COUNTRIES) p.country = country;
    if (state !== ALL_STATES) p.state = state;
    if (activeFilter !== "all") p.type = activeFilter;
    if (savedOnly) p.saved = true;
    return p;
  }, [country, state, activeFilter, savedOnly]);

  const { data: providers, isLoading } = useListProviders(queryParams, {
    query: { queryKey: getListProvidersQueryKey(queryParams) },
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "hospital", label: "Hospitals" },
    { id: "counselling", label: "Counselling" },
    { id: "lab", label: "Labs" },
    { id: "support", label: "Support" },
  ];

  const handleToggleSaved = (id: number, name: string, currentlySaved: boolean) => {
    updateProvider.mutate(
      { id, data: { saved: !currentlySaved } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/directory"] });
          toast({
            title: currentlySaved ? `Removed ${name} from saved` : `Saved ${name}`,
          });
        },
        onError: () => {
          toast({ title: "Couldn't update saved providers", variant: "destructive" });
        },
      }
    );
  };

  const filteredProviders = useMemo(() => {
    if (!providers) return undefined;
    const matched = providers.filter((p) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.city ?? "").toLowerCase().includes(q) ||
        (p.state ?? "").toLowerCase().includes(q)
      );
    });

    if (!userCoords) return matched;

    // Decorate with distance and sort: nearest first, items without
    // coordinates fall to the bottom in alphabetical order.
    const decorated = matched.map((p) => {
      const distanceKm =
        p.latitude != null && p.longitude != null
          ? haversineKm(userCoords, { lat: p.latitude, lng: p.longitude })
          : null;
      return { ...p, distanceKm };
    });
    decorated.sort((a, b) => {
      if (a.distanceKm != null && b.distanceKm != null) {
        return a.distanceKm - b.distanceKm;
      }
      if (a.distanceKm != null) return -1;
      if (b.distanceKm != null) return 1;
      return a.name.localeCompare(b.name);
    });
    return decorated;
  }, [providers, search, userCoords]);

  const filtersActive =
    country !== defaultCountry ||
    state !== ALL_STATES ||
    activeFilter !== "all" ||
    savedOnly ||
    search !== "";

  const clearFilters = () => {
    setCountry(defaultCountry);
    setState(ALL_STATES);
    setActiveFilter("all");
    setSavedOnly(false);
    setSearch("");
    setCountryTouched(false);
  };

  const emptyMessage = (() => {
    const parts: string[] = [];
    if (state !== ALL_STATES) parts.push(state);
    if (country !== ALL_COUNTRIES) parts.push(country);
    const where = parts.length ? ` in ${parts.join(", ")}` : "";
    return `No providers found${where}.`;
  })();

  const getProviderIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return { outline: HospitalOutline, filled: HospitalFilled };
      case "lab":
        return { outline: BioOutline, filled: BioFilled };
      case "counselling":
        return { outline: MedAdviceOutline, filled: MedAdviceFilled };
      default:
        return { outline: CommunityOutline, filled: CommunityFilled };
    }
  };

  const [suggestOpen, setSuggestOpen] = useState(false);

  return (
    <MobileAppShell>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-6">
          <h1 className="font-serif text-[1.5rem] text-primary font-semibold tracking-[-0.5px]">
            Care Directory
          </h1>
          <Button
            variant="outline"
            className="h-9 rounded-xl bg-card border-none shadow-sm text-xs gap-1.5 text-primary"
            onClick={() => setSuggestOpen(true)}
            data-testid="btn-suggest-provider"
          >
            <AddIcon size={14} /> Suggest
          </Button>
        </div>

        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex text-muted-foreground">
            <Search size={16} />
          </span>
          <Input
            placeholder="Search specialists, clinics..."
            className="pl-9 h-11 rounded-xl bg-card border-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="directory-search"
          />
        </div>

        {showLocationPrompt && (
          <div
            className="mb-3 rounded-2xl bg-primary/5 border border-primary/15 p-4"
            data-testid="location-prompt"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <GlobeIcon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-primary leading-tight">
                  Tell us where you're based
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Pick your country (and optionally state) below — we'll save it to your
                  profile and show local providers first.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    onClick={saveProfileLocation}
                    disabled={updateProfile.isPending || country === ALL_COUNTRIES}
                    className="h-9 rounded-xl text-xs px-4"
                    data-testid="btn-save-profile-location"
                  >
                    {updateProfile.isPending
                      ? "Saving…"
                      : country === ALL_COUNTRIES
                      ? "Pick a country below"
                      : `Save ${country}${state !== ALL_STATES ? `, ${state}` : ""}`}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setLocationPromptDismissed(true)}
                    className="text-xs text-muted-foreground hover:text-primary px-2"
                    data-testid="btn-dismiss-location-prompt"
                  >
                    Not now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mb-3">
          <Select
            value={country}
            onValueChange={(v) => {
              setCountry(v);
              setState(ALL_STATES);
              setCountryTouched(true);
            }}
          >
            <SelectTrigger
              className="h-11 rounded-xl bg-card border-none shadow-sm text-xs"
              data-testid="directory-country"
            >
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_COUNTRIES}>All countries</SelectItem>
              {COUNTRIES.map((c) => (
                <SelectItem key={c.code} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={state}
            onValueChange={setState}
            disabled={country === ALL_COUNTRIES || stateOptions.length === 0}
          >
            <SelectTrigger
              className="h-11 rounded-xl bg-card border-none shadow-sm text-xs"
              data-testid="directory-state"
            >
              <SelectValue placeholder="State / Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_STATES}>All states</SelectItem>
              {stateOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 mb-2 flex-wrap">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              className={`rounded-xl h-9 whitespace-nowrap text-xs font-medium shadow-sm ${
                activeFilter !== filter.id
                  ? "bg-card border-none text-muted-foreground"
                  : ""
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
          <Button
            variant={savedOnly ? "default" : "outline"}
            className={`rounded-xl h-9 whitespace-nowrap text-xs font-medium shadow-sm gap-1.5 ${
              !savedOnly ? "bg-card border-none text-muted-foreground" : ""
            }`}
            onClick={() => setSavedOnly((v) => !v)}
            data-testid="filter-saved"
          >
            {savedOnly ? <BookmarkFilled size={14} /> : <BookmarkOutline size={14} />}
            Saved
          </Button>
        </div>

        <div className="flex items-center justify-between mb-4 mt-2 gap-2">
          {locationStatus === "granted" && userCoords ? (
            <span
              className="inline-flex items-center gap-1 text-xs text-primary"
              data-testid="directory-location-active"
            >
              <NearMeOutline size={12} /> Sorted by distance from you
            </span>
          ) : locationStatus === "denied" ? (
            <span
              className="text-xs text-muted-foreground"
              data-testid="directory-location-denied"
            >
              Location unavailable — showing alphabetical
            </span>
          ) : locationStatus === "unsupported" ? (
            <span className="text-xs text-muted-foreground">
              Location not supported on this device
            </span>
          ) : (
            <button
              type="button"
              onClick={requestLocation}
              disabled={locationStatus === "requesting"}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline disabled:opacity-60"
              data-testid="directory-use-location"
            >
              <NearMeOutline size={12} />
              {locationStatus === "requesting"
                ? "Finding you…"
                : "Sort by closest to me"}
            </button>
          )}

          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              data-testid="directory-clear-filters"
            >
              <ClearIcon size={12} /> Clear filters
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredProviders?.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <div className="flex justify-center mb-4 opacity-20">
              <Search size={48} />
            </div>
            <p className="text-sm" data-testid="directory-empty">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProviders?.map((provider) => {
              const { outline, filled } = getProviderIcon(provider.type);
              const distanceKm = "distanceKm" in provider ? (provider as { distanceKm: number | null }).distanceKm : null;
              return (
                <Card
                  key={provider.id}
                  className="group border-none shadow-sm"
                  data-testid={`provider-card-${provider.id}`}
                >
                  <CardContent className="p-5">
                    <button
                      type="button"
                      onClick={() => setLocation(`/directory/${provider.id}`)}
                      className="flex items-start gap-4 mb-4 w-full text-left cursor-pointer"
                      data-testid={`provider-link-${provider.id}`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <span
                          className="relative inline-flex shrink-0"
                          style={{ width: 22, height: 22 }}
                        >
                          <span className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0">
                            {(() => {
                              const O = outline;
                              return <O size={22} />;
                            })()}
                          </span>
                          <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                            {(() => {
                              const F = filled;
                              return <F size={22} />;
                            })()}
                          </span>
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold text-foreground text-sm leading-tight tracking-[-0.01em]">
                            {provider.name}
                          </h3>
                          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                            {provider.verified && (
                              <span className="text-green-600 inline-flex">
                                <CheckCircle2 size={16} />
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => handleToggleSaved(provider.id, provider.name, provider.saved)}
                              disabled={updateProvider.isPending}
                              aria-label={provider.saved ? `Remove ${provider.name} from saved` : `Save ${provider.name}`}
                              aria-pressed={provider.saved}
                              className={`inline-flex items-center justify-center w-7 h-7 -m-1 rounded-full transition-colors hover:bg-muted ${
                                provider.saved ? "text-primary" : "text-muted-foreground hover:text-primary"
                              }`}
                              data-testid={`btn-toggle-saved-${provider.id}`}
                            >
                              {provider.saved ? <BookmarkFilled size={18} /> : <BookmarkOutline size={18} />}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                          <span className="capitalize">{provider.type}</span>
                          {(provider.city || provider.state) && (
                            <>
                              <span>•</span>
                              <GeoOutline size={12} />
                              <span className="line-clamp-1">
                                {[provider.city, provider.state]
                                  .filter(Boolean)
                                  .join(", ")}
                              </span>
                            </>
                          )}
                        </div>
                        {distanceKm != null && (
                          <div
                            className="inline-flex items-center gap-1 text-[11px] text-primary font-medium mb-1"
                            data-testid={`provider-distance-${provider.id}`}
                          >
                            <NearMeOutline size={11} />
                            {formatDistance(distanceKm)}
                          </div>
                        )}
                        {provider.services && provider.services.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {provider.services.slice(0, 2).map((service: string, idx: number) => (
                              <span
                                key={idx}
                                className="text-[10px] bg-muted/40 px-2 py-0.5 rounded-md text-muted-foreground"
                              >
                                {service}
                              </span>
                            ))}
                            {provider.services.length > 2 && (
                              <span className="text-[10px] bg-muted/40 px-2 py-0.5 rounded-md text-muted-foreground">
                                +{provider.services.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        className="group/btn w-full text-xs h-9 bg-card border-border/60 hover:bg-muted shadow-sm gap-1.5"
                        asChild
                      >
                        <a href={provider.phone ? `tel:${provider.phone}` : "#"}>
                          <span
                            className="relative inline-flex shrink-0"
                            style={{ width: 14, height: 14 }}
                          >
                            <span className="absolute inset-0 transition-opacity duration-150 group-hover/btn:opacity-0">
                              <PhoneOutline size={14} />
                            </span>
                            <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/btn:opacity-100">
                              <PhoneFilled size={14} />
                            </span>
                          </span>
                          Call
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-xs h-9 bg-card border-border/60 hover:bg-muted shadow-sm gap-1.5"
                        asChild
                      >
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            [provider.name, provider.address, provider.city, provider.state, provider.country]
                              .filter(Boolean)
                              .join(", ")
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ArrowUpRight size={14} /> Directions
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <SuggestProviderDialog
        open={suggestOpen}
        onOpenChange={setSuggestOpen}
        defaultCountry={country !== ALL_COUNTRIES ? country : defaultCountry}
        defaultState={state !== ALL_STATES ? state : null}
      />
    </MobileAppShell>
  );
}

type SuggestProviderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultCountry: string;
  defaultState: string | null;
};

function SuggestProviderDialog({
  open,
  onOpenChange,
  defaultCountry,
  defaultState,
}: SuggestProviderDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const createProvider = useCreateProvider();

  const [name, setName] = useState("");
  const [type, setType] = useState<CreateProviderBody["type"]>("hospital");
  const [country, setCountry] = useState(defaultCountry);
  const [state, setState] = useState<string>(defaultState ?? "");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");

  const stateOpts = useMemo(() => statesFor(country), [country]);

  useEffect(() => {
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const body: CreateProviderBody = {
      name: name.trim(),
      type,
      country: country || null,
      state: state || null,
      city: city.trim() || null,
      phone: phone.trim() || null,
      about: about.trim() || null,
      services: [],
      verified: false,
      saved: false,
    };
    createProvider.mutate(
      { data: body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["/api/directory"] });
          toast({
            title: "Thank you for the suggestion",
            description: "We'll review and add it to the directory soon.",
          });
          reset();
          onOpenChange(false);
        },
        onError: () => {
          toast({
            title: "Couldn't submit suggestion",
            description: "Please check the details and try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-primary">
            Suggest a provider
          </DialogTitle>
          <DialogDescription className="text-xs">
            Help other families find clinics, counsellors, labs, and support
            groups you trust. We'll review before publishing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-3" data-testid="suggest-form">
          <div className="space-y-1.5">
            <Label htmlFor="suggest-name" className="text-xs">
              Name
            </Label>
            <Input
              id="suggest-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. LUTH Sickle Cell Clinic"
              required
              data-testid="suggest-name"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Type</Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as CreateProviderBody["type"])}
            >
              <SelectTrigger data-testid="suggest-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="counselling">Counselling</SelectItem>
                <SelectItem value="lab">Lab</SelectItem>
                <SelectItem value="support">Support group</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Country</Label>
              <Select
                value={country}
                onValueChange={(v) => {
                  setCountry(v);
                  setState("");
                }}
              >
                <SelectTrigger data-testid="suggest-country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">State / Region</Label>
              <Select
                value={state || "__none__"}
                onValueChange={(v) => setState(v === "__none__" ? "" : v)}
                disabled={stateOpts.length === 0}
              >
                <SelectTrigger data-testid="suggest-state">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">—</SelectItem>
                  {stateOpts.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1.5">
              <Label htmlFor="suggest-city" className="text-xs">
                City
              </Label>
              <Input
                id="suggest-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Lagos"
                data-testid="suggest-city"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="suggest-phone" className="text-xs">
                Phone
              </Label>
              <Input
                id="suggest-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234..."
                inputMode="tel"
                data-testid="suggest-phone"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="suggest-about" className="text-xs">
              Notes <span className="text-muted-foreground">(optional)</span>
            </Label>
            <Textarea
              id="suggest-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="What should families know about this provider?"
              rows={3}
              data-testid="suggest-about"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || createProvider.isPending}
              className="rounded-xl"
              data-testid="suggest-submit"
            >
              {createProvider.isPending ? "Submitting..." : "Submit suggestion"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
