import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useGetProfile } from "@workspace/api-client-react";
import { PenNewSquareLinear as EditIcon, DownloadLinear as DownloadIcon } from "solar-icon-set";
import { Link } from "wouter";
import { exportProfileToPdf } from "@/lib/profilePdf";
import { useToast } from "@/hooks/use-toast";

function getInitials(name?: string) {
  if (!name) return "K";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-border/60 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground text-right max-w-[60%] truncate">
        {value ?? "—"}
      </span>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const { profileId } = useProfile();
  const { toast } = useToast();

  const { data: profile, isLoading } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId },
  });

  const handleExport = () => {
    if (!profile) return;
    try {
      exportProfileToPdf(profile, user?.email);
    } catch (e: any) {
      toast({ title: "Export failed", description: e?.message ?? "Try again", variant: "destructive" });
    }
  };

  return (
    <MobileAppShell>
      <SubPageHeader title="Profile" back="/settings" />
      <div className="flex flex-col min-h-full">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center pt-2 pb-6 px-5">
          <Avatar className="w-20 h-20 mb-3 border border-border/60">
            {(user?.user_metadata?.avatar_url || user?.user_metadata?.picture) && (
              <AvatarImage src={user.user_metadata.avatar_url || user.user_metadata.picture} alt={profile?.fullName ?? "Profile"} />
            )}
            <AvatarFallback className="font-serif font-semibold text-xl bg-muted text-foreground">
              {getInitials(profile?.fullName)}
            </AvatarFallback>
          </Avatar>
          {isLoading ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <h1 className="font-serif font-semibold text-[20px] text-foreground tracking-[-0.3px]">
              {profile?.fullName || "Friend"}
            </h1>
          )}
          {user?.email && (
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          )}
          <div className="mt-4 flex gap-2">
            <Link href="/profile/edit">
              <Button size="sm" className="rounded-full px-5">
                <EditIcon size={14} />
                Edit profile
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="rounded-full px-5" onClick={handleExport} disabled={!profile}>
              <DownloadIcon size={14} />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Details */}
        <div className="px-4 pb-6 space-y-4">
          <div className="bg-card rounded-2xl shadow-sm border border-border/60 overflow-hidden">
            <p className="eyebrow px-4 pt-4 pb-2">Personal</p>
            <Row label="Full name" value={profile?.fullName} />
            <Row label="Date of birth" value={profile?.dateOfBirth} />
            <Row label="Sex" value={profile?.gender ?? profile?.sex} />
            <Row label="Country" value={profile?.country} />
            <Row label="State" value={profile?.state} />
          </div>

          <div className="bg-card rounded-2xl shadow-sm border border-border/60 overflow-hidden">
            <p className="eyebrow px-4 pt-4 pb-2">Medical</p>
            <Row label="Blood type" value={profile?.bloodType} />
            <Row label="Genotype" value={profile?.genotype} />
            <Row label="Height" value={profile?.heightCm ? `${profile.heightCm} cm` : null} />
            <Row label="Weight" value={profile?.weightKg ? `${profile.weightKg} kg` : null} />
            <Row label="Allergies" value={profile?.allergies} />
            <Row label="Conditions" value={profile?.conditions} />
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}