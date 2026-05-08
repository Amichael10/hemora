import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Button } from "@/components/ui/button";
import { DownloadMinimalisticLinear as DownloadIcon } from "solar-icon-set";

type Variant = {
  name: string;
  bg: string;
  files: { label: string; href: string }[];
};

const LOGO_VARIANTS: { variant: string; bg: string; items: Variant[] }[] = [
  {
    variant: "Colored",
    bg: "bg-[#f4ead8]",
    items: [
      {
        name: "Colored",
        bg: "bg-[#f4ead8]",
        files: [
          { label: "Logo SVG", href: "/brand/logos/hemora-logo.svg" },
          { label: "Icon SVG", href: "/brand/logos/hemora-icon.svg" },
          { label: "Icon PNG", href: "/brand/logos/hemora-icon.png" },
          { label: "Wordmark SVG", href: "/brand/logos/hemora-wordmark.svg" },
          { label: "Wordmark PNG", href: "/brand/logos/hemora-wordmark.png" },
        ],
      },
    ],
  },
  {
    variant: "Black",
    bg: "bg-white",
    items: [
      {
        name: "Black",
        bg: "bg-white",
        files: [
          { label: "Logo SVG", href: "/brand/logos/black-hemora-logo.svg" },
          { label: "Icon SVG", href: "/brand/logos/black-hemora-icon.svg" },
          { label: "Wordmark SVG", href: "/brand/logos/black-hemora-wordmark.svg" },
          { label: "Wordmark PNG", href: "/brand/logos/black-hemora-wordmark.png" },
        ],
      },
    ],
  },
  {
    variant: "White",
    bg: "bg-[#193b3f]",
    items: [
      {
        name: "White",
        bg: "bg-[#193b3f]",
        files: [
          { label: "Logo SVG", href: "/brand/logos/white-hemora-logo.svg" },
          { label: "Icon SVG", href: "/brand/logos/white-hemora-icon.svg" },
          { label: "Icon PNG", href: "/brand/logos/white-hemora-icon.png" },
          { label: "Wordmark SVG", href: "/brand/logos/white-hemora-wordmark.svg" },
          { label: "Wordmark PNG", href: "/brand/logos/white-hemora-wordmark.png" },
        ],
      },
    ],
  },
  {
    variant: "Green",
    bg: "bg-[#f4ead8]",
    items: [
      {
        name: "Green",
        bg: "bg-[#f4ead8]",
        files: [
          { label: "Logo SVG", href: "/brand/logos/green-hemora-logo.svg" },
          { label: "Icon SVG", href: "/brand/logos/green-hemora-icon.svg" },
          { label: "Icon PNG", href: "/brand/logos/green-hemora-icon.png" },
          { label: "Wordmark SVG", href: "/brand/logos/green-hemora-wordmark.svg" },
          { label: "Wordmark PNG", href: "/brand/logos/green-hemora-wordmark.png" },
        ],
      },
    ],
  },
];

const USAGE = [
  "Essentials Pouch.png",
  "Hoodie.png",
  "Mug.png",
  "Pill counter.png",
  "Scarf.png",
  "Tote bag.png",
  "Water Bottle.png",
  "Weekly Pill Organizer.png",
].map((f) => ({ name: f.replace(/\.png$/, ""), href: `/brand/usage/${encodeURIComponent(f)}` }));

const SOCIALS = Array.from({ length: 9 }, (_, i) => ({
  name: `Socials ${i + 1}`,
  href: `/brand/socials/${encodeURIComponent(`Socials ${i + 1}.png`)}`,
}));

function LogoCard({ variant, bg, files, preview }: { variant: string; bg: string; files: { label: string; href: string }[]; preview: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden">
      <div className={`${bg} flex items-center justify-center p-8 h-44`}>
        <img src={preview} alt={`${variant} Hemora logo`} className="max-h-24 w-auto" />
      </div>
      <div className="p-4">
        <h3 className="font-serif font-semibold text-foreground text-[15px] mb-3">{variant}</h3>
        <div className="flex flex-wrap gap-2">
          {files.map((f) => (
            <a key={f.href} href={f.href} download>
              <Button size="sm" variant="outline" className="rounded-full text-xs h-8">
                <DownloadIcon size={12} />
                {f.label}
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Brand() {
  return (
    <MobileAppShell>
      <SubPageHeader title="Brand" back="/settings" />
      <div className="px-5 pb-12 space-y-8">
        <section>
          <p className="text-sm text-muted-foreground">
            Hemora's logos, brand visuals, and social templates. Logos are free to download for press, partners, and community use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-[18px] font-semibold text-foreground tracking-[-0.3px]">Logos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {LOGO_VARIANTS.map((v) => (
              <LogoCard
                key={v.variant}
                variant={v.variant}
                bg={v.bg}
                files={v.items[0].files}
                preview={v.items[0].files.find((f) => f.label === "Logo SVG")?.href ?? v.items[0].files[0].href}
              />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-[18px] font-semibold text-foreground tracking-[-0.3px]">Brand in use</h2>
          <p className="text-xs text-muted-foreground">Preview only — examples of how the brand shows up on physical goods.</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {USAGE.map((u) => (
              <div key={u.href} className="bg-card rounded-xl border border-border/60 overflow-hidden aspect-square">
                <img src={u.href} alt={u.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-[18px] font-semibold text-foreground tracking-[-0.3px]">Social templates</h2>
          <p className="text-xs text-muted-foreground">Preview only — used for Hemora's social media posts.</p>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
            {SOCIALS.map((s) => (
              <div key={s.href} className="bg-card rounded-xl border border-border/60 overflow-hidden aspect-square">
                <img src={s.href} alt={s.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
