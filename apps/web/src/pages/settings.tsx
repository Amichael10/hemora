import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useGetProfile } from "@workspace/api-client-react";
import {
  UserLinear as UserIcon,
  PhoneLinear as PhoneIcon,
  BellLinear as BellIcon,
  ShieldUserLinear as ShieldIcon,
  InfoCircleLinear as InfoIcon,
  DocumentLinear as DocIcon,
  QuestionCircleLinear as HelpIcon,
  Logout3Linear as LogOut,
  AltArrowRightLinear as ArrowRight,
  PenNewSquareLinear as EditIcon,
  BookLinear as BookIcon,
  HeartPulseLinear as AmbulanceIcon,
  ClipboardCheckLinear as ChecklistIcon,
  SettingsLinear as AdminIcon,
  UsersGroupTwoRoundedLinear as UsersRound,
} from "solar-icon-set";

function getInitials(name?: string | null) {
  if (!name) return "H";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function Row({ icon, label, href, onClick, danger }: { icon: React.ReactNode; label: string; href?: string; onClick?: () => void; danger?: boolean }) {
  const content = (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${danger ? "text-destructive" : "text-foreground"}`}>
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${danger ? "bg-destructive/10" : "bg-muted text-foreground"}`}>{icon}</span>
      <span className="flex-1 text-sm font-medium">{label}</span>
      {!danger && <ArrowRight size={14} color="rgba(115,115,115,0.5)" />}
    </div>
  );
  if (href) return <Link href={href}>{content}</Link>;
  return <button className="w-full text-left" onClick={onClick}>{content}</button>;
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="bg-card rounded-2xl border border-border/60 overflow-hidden divide-y divide-border/60">{children}</div>;
}

export default function Settings() {
  const [, setLocation] = useLocation();
  const { user, signOut } = useAuth();
  const { profileId } = useProfile();
  const { data: profile } = useGetProfile(profileId, {
    query: { queryKey: ["/api/profiles", profileId], enabled: !!profileId },
  });
  const { toast } = useToast();
  const { isAdmin } = useIsAdmin();

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out" });
    setLocation("/");
  };

  return (
    <MobileAppShell>
      <SubPageHeader title="Settings" back="/dashboard" />
      <div className="px-5 pb-10 space-y-5">
        {/* Profile card */}
        <div className="flex flex-col items-center text-center pt-2 pb-2">
          <Avatar className="w-20 h-20 mb-3 border border-border/60">
            <AvatarFallback className="font-serif font-semibold text-xl bg-muted text-foreground">
              {getInitials(profile?.fullName)}
            </AvatarFallback>
          </Avatar>
          <h2 className="font-serif text-[20px] font-semibold text-foreground tracking-[-0.3px]">
            {profile?.fullName || "Friend"}
          </h2>
          {user?.email && (
            <p className="text-xs text-muted-foreground mt-1">{user.email}</p>
          )}
          <Link href="/profile/edit">
            <Button size="sm" className="mt-4 rounded-full px-5">
              <EditIcon size={14} />
              Edit profile
            </Button>
          </Link>
        </div>

        <Group>
          <Row icon={<UserIcon size={16} />} label="Profile" href="/profile" />
          <Row icon={<UsersRound size={16} />} label="Family management" href="/family" />
          <Row icon={<PhoneIcon size={16} />} label="Emergency contacts" href="/settings/contacts" />
          <Row icon={<AmbulanceIcon size={16} />} label="Ambulance number" href="/settings/ambulance" />
          <Row icon={<ChecklistIcon size={16} />} label="Hospital checklist" href="/settings/hospital-checklist" />
          <Row icon={<BellIcon size={16} />} label="Notifications" href="/settings/notifications" />
          <Row icon={<BookIcon size={16} />} label="Resources Library" href="/resources" />
          <Row icon={<BookIcon size={16} />} label="Blog" href="/blog" />
          <Row icon={<ShieldIcon size={16} />} label="Privacy" href="/privacy" />
        </Group>

        {isAdmin && (
          <Group>
            <Row icon={<AdminIcon size={16} />} label="Admin dashboard" href="/admin" />
          </Group>
        )}

        <Group>
          <Row icon={<HelpIcon size={16} />} label="Help & support" href="/help" />
          <Row icon={<InfoIcon size={16} />} label="About Hemora" href="/about" />
          <Row icon={<DocIcon size={16} />} label="Terms of service" href="/terms" />
        </Group>

        <Group>
          <Row icon={<LogOut size={16} />} label="Sign out" onClick={handleLogout} danger />
        </Group>

        <p className="text-center text-[11px] text-muted-foreground/70">Hemora · v1.0.0</p>
      </div>
    </MobileAppShell>
  );
}