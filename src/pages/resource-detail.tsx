import { useRoute } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Badge } from "@/components/ui/badge";
import { getResource } from "@/lib/resources";

export default function ResourceDetail() {
  const [, params] = useRoute("/resources/:id");
  const r = params?.id ? getResource(params.id) : undefined;

  if (!r) {
    return (
      <MobileAppShell hideNav>
        <SubPageHeader title="Resource" back="/resources" />
        <div className="px-6 py-12 text-center text-sm text-muted-foreground">Resource not found.</div>
      </MobileAppShell>
    );
  }

  return (
    <MobileAppShell hideNav>
      <SubPageHeader title={r.kind} back="/resources" />
      <article className="px-6 pb-16">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="rounded-full text-[10px] font-semibold px-2.5 py-0.5">
            {r.category}
          </Badge>
          <span className="text-[11px] text-muted-foreground">
            {r.readMinutes} min {r.kind === "Video" ? "" : "read"}
          </span>
        </div>
        <h1 className="font-serif text-[26px] leading-tight tracking-[-0.5px] text-foreground">
          {r.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{r.summary}</p>
        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
          {r.body.split(/\n\n+/).map((p, i) => (
            <p key={i} className="whitespace-pre-line">{p}</p>
          ))}
        </div>
        {r.source && (
          <p className="mt-8 text-[11px] text-muted-foreground">
            Source:{" "}
            {r.sourceUrl ? (
              <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="underline hover:text-foreground">
                {r.source}
              </a>
            ) : (
              r.source
            )}
          </p>
        )}
        <p className="mt-6 text-[11px] text-muted-foreground italic">
          For learning only — not a substitute for medical advice.
        </p>
      </article>
    </MobileAppShell>
  );
}