import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useGetProfile } from "@workspace/api-client-react";
import { 
  UserLinear as UserIcon,
  CalendarLinear as CalendarIcon,
  MapPointLinear as LocationIcon,
  HeartLinear as HeartIcon,
  InfoCircleLinear as InfoIcon,
  ClipboardCheckLinear as ChecklistIcon,
  PenNewSquareLinear as EditIcon, 
  DownloadLinear as DownloadIcon,
  AltArrowLeftLinear as ChevronLeft,
  HeartPulseLinear as MedicalIcon
} from "solar-icon-set";
import { Link } from "wouter";
import { exportProfileToPdf } from "@/lib/profilePdf";
import { useToast } from "@/hooks/use-toast";

function getInitials(name?: string) {
  if (!name) return "H";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function getGenotypeBadgeStyles(genotype?: string | null) {
  if (!genotype) return "bg-muted text-muted-foreground";
  const g = genotype.toUpperCase();
  if (g === "AA") return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20";
  if (g === "AS" || g === "AC") return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/20";
  return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20";
}

function ProfileRow({ 
  icon: Icon, 
  label, 
  value, 
  isGenotype = false 
}: { 
  icon: React.ComponentType<any>; 
  label: string; 
  value?: string | number | null;
  isGenotype?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40 last:border-0 hover:bg-muted/10 transition-colors">
      <div className="w-9 h-9 rounded-xl bg-secondary/5 text-secondary flex items-center justify-center shrink-0 border border-secondary/10">
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
        {isGenotype && value ? (
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-xs px-2 py-0.5 rounded-full font-serif font-bold ${getGenotypeBadgeStyles(String(value))}`}>
              {value}
            </span>
          </div>
        ) : (
          <p className="text-sm font-semibold mt-0.5 text-foreground truncate">
            {value ?? "—"}
          </p>
        )}
      </div>
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

  const locationValue = (() => {
    if (!profile?.country && !profile?.state) return null;
    return [profile.state, profile.country].filter(Boolean).join(", ");
  })();

  const metricsValue = (() => {
    const h = profile?.heightCm ? `${profile.heightCm} cm` : "";
    const w = profile?.weightKg ? `${profile.weightKg} kg` : "";
    if (!h && !w) return null;
    return [h, w].filter(Boolean).join("  ·  ");
  })();

  return (
    <MobileAppShell hideNav>
      <div className="flex flex-col min-h-full pb-24 bg-background">
        
        {/* Immersive Header Banner */}
        <div className="bg-gradient-to-b from-secondary to-secondary/95 text-secondary-foreground pb-8 pt-6 px-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
          {/* Ambient background glows */}
          <div className="absolute top-[-20%] right-[-10%] w-48 h-48 rounded-full bg-accent/20 blur-[60px]" />
          <div className="absolute bottom-[-10%] left-[-15%] w-36 h-36 rounded-full bg-primary/25 blur-[50px]" />
          
          <div className="flex flex-col items-center text-center relative z-10">
            {/* Header Navigation */}
            <div className="w-full flex items-center justify-between mb-4">
              <Link href="/settings">
                <button className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-sm border border-white/10 hover:bg-white/20 active:scale-[0.95] transition-all">
                  <ChevronLeft size={18} />
                </button>
              </Link>
              <h2 className="font-serif font-semibold text-lg text-white">Profile Details</h2>
              <div className="w-10 h-10" />
            </div>

            {/* Avatar Group */}
            <div className="relative mb-3 mt-1">
              <div className="absolute inset-0 rounded-full bg-accent/30 blur-[6px] scale-[1.06]" />
              <Avatar className="w-24 h-24 ring-4 ring-offset-4 ring-offset-secondary ring-accent border-0 shadow-xl">
                {profile?.avatarUrl && (
                  <AvatarImage src={profile.avatarUrl} alt={profile?.fullName ?? "Profile"} />
                )}
                <AvatarFallback className="font-serif font-bold text-2xl bg-accent text-accent-foreground">
                  {getInitials(profile?.fullName)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Profile Info */}
            {isLoading ? (
              <Skeleton className="h-6 w-36 bg-white/20 mt-2 rounded-full" />
            ) : (
              <h1 className="font-serif font-bold text-2xl text-white tracking-tight">
                {profile?.fullName || "Friend"}
              </h1>
            )}
            {user?.email && (
              <div className="mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <p className="text-[10px] font-medium font-mono text-accent/90 uppercase tracking-wider">{user.email}</p>
              </div>
            )}

            {/* Actions Grid */}
            <div className="mt-6 flex gap-3 w-full justify-center max-w-[320px]">
              <Link href="/profile/edit" className="flex-1">
                <Button className="w-full bg-accent hover:bg-accent/95 text-accent-foreground font-serif font-bold rounded-2xl h-11 shadow-md shadow-accent/15 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5 border border-accent/25">
                  <EditIcon size={14} />
                  Edit Profile
                </Button>
              </Link>
              <Button 
                variant="outline"
                className="flex-1 bg-white/10 hover:bg-white/15 text-white border-white/20 font-serif font-semibold rounded-2xl h-11 backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5" 
                onClick={handleExport} 
                disabled={!profile}
              >
                <DownloadIcon size={14} />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Content Cards */}
        <div className="px-5 mt-6 space-y-6">
          
          {/* Personal Info Card */}
          <div className="bg-card rounded-[2rem] p-5 border border-border/50 shadow-sm space-y-4">
            <h3 className="eyebrow flex items-center gap-2 mb-2 font-serif">
              <UserIcon size={14} className="text-primary/60" /> 
              Personal File
            </h3>
            <div className="divide-y divide-border/30">
              <ProfileRow icon={UserIcon} label="Full name" value={profile?.fullName} />
              <ProfileRow icon={CalendarIcon} label="Date of birth" value={profile?.dateOfBirth} />
              <ProfileRow icon={HeartIcon} label="Gender" value={profile?.gender ?? profile?.sex} />
              <ProfileRow icon={LocationIcon} label="Location" value={locationValue} />
            </div>
          </div>

          {/* Medical Records Card */}
          <div className="bg-card rounded-[2rem] p-5 border border-border/50 shadow-sm space-y-4">
            <h3 className="eyebrow flex items-center gap-2 mb-2 font-serif">
              <MedicalIcon size={14} className="text-primary/60" /> 
              Medical File
            </h3>
            <div className="divide-y divide-border/30">
              <ProfileRow icon={MedicalIcon} label="Genotype" value={profile?.genotype} isGenotype />
              <ProfileRow icon={HeartIcon} label="Blood type" value={profile?.bloodType} />
              <ProfileRow icon={ChecklistIcon} label="Body Metrics" value={metricsValue} />
              <ProfileRow icon={InfoIcon} label="Allergies" value={profile?.allergies} />
              <ProfileRow icon={InfoIcon} label="Conditions" value={profile?.conditions} />
            </div>
          </div>
        </div>
      </div>
    </MobileAppShell>
  );
}