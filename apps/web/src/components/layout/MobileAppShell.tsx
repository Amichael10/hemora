import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NotifyEnablePrompt } from "@/components/NotifyEnablePrompt";
import {
  HomeSmileBold as HomeAltFilled,
  HeartPulse2Bold as HeartbeatFilled,
  Pills2Bold as MedicinesFilled,
  NotebookBold as MedicalRecordsFilled,
  UsersGroupRoundedBold as CommunityFilled,
  HomeSmileLinear as HomeAltOutline,
  HeartPulse2Linear as HeartbeatOutline,
  Pills2Linear as MedicinesOutline,
  NotebookLinear as MedicalRecordsOutline,
  UsersGroupRoundedLinear as CommunityOutline,
} from "solar-icon-set";

interface MobileAppShellProps {
  children: ReactNode;
  hideNav?: boolean;
}

const navItems = [
  { label: "Home", path: "/dashboard", Outline: HomeAltOutline, Filled: HomeAltFilled },
  { label: "Crisis", path: "/crisis", Outline: HeartbeatOutline, Filled: HeartbeatFilled, activeColor: "text-accent" },
  { label: "Meds", path: "/meds", Outline: MedicinesOutline, Filled: MedicinesFilled },
  { label: "Records", path: "/records", Outline: MedicalRecordsOutline, Filled: MedicalRecordsFilled },
  { label: "Directory", path: "/directory", Outline: CommunityOutline, Filled: CommunityFilled },
];

export function MobileAppShell({ children, hideNav = false }: MobileAppShellProps) {
  const [location] = useLocation();

  return (
    <div className="min-h-[100dvh] w-full bg-secondary flex justify-center">
      <div className="w-full max-w-[430px] bg-background min-h-[100dvh] flex flex-col relative shadow-xl">
        <main className={cn("flex-1", hideNav ? "" : "pb-20")}>
          {children}
        </main>

        {!hideNav && (
        <nav className="sticky bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/60 px-2 py-2 pb-safe flex justify-between items-center z-50 shadow-[rgba(0,0,0,0.03)_0px_-4px_24px]">
          {navItems.map(({ label, path, Outline, Filled, activeColor }) => {
            const isActive = location.startsWith(path);
            const color = activeColor || "text-primary";
            return (
              <Link key={path} href={path} className="flex-1">
                <button
                  data-testid={`nav-${label.toLowerCase()}`}
                  className={cn(
                    "group w-full flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl transition-colors",
                    isActive ? color : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <Filled size={22} />
                  ) : (
                    <span className="relative inline-flex shrink-0" style={{ width: 22, height: 22 }}>
                      <span className="absolute inset-0 transition-opacity duration-150 group-hover:opacity-0">
                        <Outline size={22} />
                      </span>
                      <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                        <Filled size={22} />
                      </span>
                    </span>
                  )}
                  <span className={cn("text-[10px] tracking-tight", isActive ? "font-semibold" : "font-medium")}>
                    {label}
                  </span>
                </button>
              </Link>
            );
          })}
        </nav>
        )}
      </div>
    </div>
  );
}
