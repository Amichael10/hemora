import { Link, useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProvider } from "@workspace/api-client-react";
import {
  ArrowLeftLinear as ArrowLeft,
  PhoneBold as PhoneIcon,
  GlobalLinear as GlobeIcon,
  MapPointLinear as MapPin,
  ArrowRightUpLinear as ArrowUpRight,
  CheckCircleBold as CheckCircle,
  LetterLinear as MailIcon,
} from "solar-icon-set";

export default function DirectoryDetail() {
  const [, params] = useRoute("/directory/:id");
  const id = params?.id;
  const { data: provider, isLoading } = useGetProvider(id);

  const fullAddress = provider
    ? [provider.name, provider.address, provider.city, provider.state, provider.country]
        .filter(Boolean)
        .join(", ")
    : "";

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

  return (
    <MobileAppShell>
      <div className="flex flex-col min-h-full">
        <div
          className="px-5 pt-11 pb-8 relative"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="flex items-center justify-between mb-5">
            <Link href="/directory">
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/20 hover:bg-white/25 transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
            </Link>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/80 font-semibold">
              Provider
            </span>
            <span className="w-9" />
          </div>

          {isLoading ? (
            <Skeleton className="h-7 w-2/3 bg-white/20" />
          ) : (
            <>
              <h1 className="font-serif text-white text-[1.6rem] font-semibold leading-tight tracking-[-0.5px]">
                {provider?.name}
                {provider?.verified && (
                  <span className="inline-flex ml-2 align-middle text-white/90">
                    <CheckCircle size={18} />
                  </span>
                )}
              </h1>
              <p className="text-white/85 text-sm mt-1 capitalize">
                {provider?.type}
                {provider?.specialty ? ` • ${provider.specialty}` : ""}
              </p>
            </>
          )}
        </div>

        <div className="px-5 -mt-4 pb-10 space-y-3">
          {isLoading || !provider ? (
            <Card className="border-none shadow-sm">
              <CardContent className="p-5 space-y-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-none shadow-sm">
                <CardContent className="p-5 space-y-3">
                  {provider.phone && (
                    <a
                      href={`tel:${provider.phone}`}
                      className="flex items-center gap-3 group"
                      data-testid="provider-phone"
                    >
                      <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <PhoneIcon size={16} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Phone
                        </p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary truncate">
                          {provider.phone}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.email && (
                    <a
                      href={`mailto:${provider.email}`}
                      className="flex items-center gap-3 group"
                    >
                      <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <MailIcon size={16} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Email
                        </p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary truncate">
                          {provider.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {provider.website && (
                    <a
                      href={provider.website}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 group"
                    >
                      <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <GlobeIcon size={16} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Website
                        </p>
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary truncate">
                          {provider.website.replace(/^https?:\/\//, "")}
                        </p>
                      </div>
                    </a>
                  )}

                  {(provider.address || provider.city || provider.state || provider.country) && (
                    <div className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <MapPin size={16} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          Address
                        </p>
                        <p className="text-sm font-semibold text-foreground leading-snug">
                          {[provider.address, provider.city, provider.state, provider.country]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {!provider.phone && !provider.email && !provider.website && !provider.address && (
                    <p className="text-sm text-muted-foreground">
                      No contact details available yet.
                    </p>
                  )}
                </CardContent>
              </Card>

              {fullAddress && (
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] w-full bg-muted">
                      <iframe
                        title={`Map of ${provider.name}`}
                        src={embedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        data-testid="provider-map"
                      />
                    </div>
                    <div className="p-4">
                      <Button asChild className="w-full rounded-xl gap-1.5">
                        <a href={mapsLink} target="_blank" rel="noreferrer">
                          <ArrowUpRight size={14} /> Open in Google Maps
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {provider.services?.length > 0 && (
                <Card className="border-none shadow-sm">
                  <CardContent className="p-5">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                      Services
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {provider.services.map((s: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs bg-muted/60 px-2.5 py-1 rounded-md text-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </MobileAppShell>
  );
}
