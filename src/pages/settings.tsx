import { Link, useLocation } from "wouter";
import { MobileAppShell } from "@/components/layout/MobileAppShell";
import { SubPageHeader } from "@/components/layout/SubPageHeader";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
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
} from "solar-icon-set";

function Row({ icon, label, href, onClick, danger }: { icon: React.ReactNode; label: string; href?: string; onClick?: () => void; danger?: boolean }) {
  const content = (
    <div className={`flex items-center gap-3 px-4 py-3.5 ${danger ? "text-destructive" : "text-foreground"}`}>
      <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">{icon}</span>
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
  const { signOut } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out" });
    setLocation("/");
  };

  return (
    <MobileAppShell>
      <SubPageHeader title="Settings" back="/dashboard" />
      <div className="px-5 pb-10 space-y-5">
        <Group>
          <Row icon={<UserIcon size={16} />} label="Profile" href="/profile" />
          <Row icon={<PhoneIcon size={16} />} label="Emergency contacts" href="/settings/contacts" />
          <Row icon={<BellIcon size={16} />} label="Notifications" href="/settings/notifications" />
          <Row icon={<ShieldIcon size={16} />} label="Privacy" href="/privacy" />
        </Group>

        <Group>
          <Row icon={<HelpIcon size={16} />} label="Help & support" href="/help" />
          <Row icon={<InfoIcon size={16} />} label="About Kindred" href="/about" />
          <Row icon={<DocIcon size={16} />} label="Terms of service" href="/terms" />
        </Group>

        <Group>
          <Row icon={<LogOut size={16} />} label="Sign out" onClick={handleLogout} danger />
        </Group>

        <p className="text-center text-[11px] text-muted-foreground/70">Kindred · v1.0.0</p>
      </div>
    </MobileAppShell>
  );
}