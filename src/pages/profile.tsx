import { useLocation, Link } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useGetProfile } from "@workspace/api-client-react";
import { ArrowLeftLinear as ArrowLeft, LogoutLinear as LogOut } from "solar-icon-set";

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
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const { profileId } = useProfile();

  const { data: profile, isLoading } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId },
  });

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out" });
    setLocation("/");
  };

  return (
    <MobileAppShell>
      <div className="flex flex-col min-h-full">
        {/* Header */}
        <div
          className="px-5 pt-11 pb-8 relative"
          style={{ background: "var(--gradient-brand)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <Link href="/dashboard">
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-white bg-white/20 hover:bg-white/25 transition-colors"
                aria-label="Back"
              >
                <ArrowLeft size={18} />
              </button>
            </Link>
            <p className="eyebrow-on-dark">Profile</p>
            <div className="w-9 h-9" />
          </div>

          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-20 h-20 border-2 border-white/40">
              <AvatarFallback className="font-serif font-bold text-xl text-white bg-white/25">
                {getInitials(profile?.fullName)}
              </AvatarFallback>
            </Avatar>
            {isLoading ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <h1 className="font-serif font-bold text-[22px] text-white drop-shadow">
                {profile?.fullName || "Friend"}
              </h1>
            )}
            {user?.email && (
              <p className="text-xs text-white/85 font-medium">{user.email}</p>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="px-4 -mt-4 pb-6 space-y-4">
          <div className="bg-card rounded-2xl shadow-sm border border-border/60 overflow-hidden">
            <p className="eyebrow px-4 pt-4 pb-2">Personal</p>
            <Row label="Full name" value={profile?.fullName} />
            <Row label="Date of birth" value={profile?.dateOfBirth} />
            <Row label="Sex" value={profile?.sex} />
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

          <Button
            variant="crisis"
            size="xl"
            className="w-full"
            onClick={handleLogout}
            data-testid="btn-logout"
          >
            <LogOut size={18} />
            Log out
          </Button>
        </div>
      </div>
    </MobileAppShell>
  );
}