import { ReactNode } from "react";
import { useLocation } from "wouter";
import { AltArrowLeftLinear as ChevronLeft } from "solar-icon-set";

interface Props {
  title: string;
  back?: string;
  right?: ReactNode;
}

export function SubPageHeader({ title, back, right }: Props) {
  const [, setLocation] = useLocation();
  return (
    <header className="flex items-center justify-between px-5 pt-11 pb-4 bg-background sticky top-0 z-30">
      <button
        onClick={() => (back ? setLocation(back) : window.history.back())}
        aria-label="Back"
        className="w-9 h-9 rounded-full flex items-center justify-center text-foreground bg-secondary hover:bg-secondary/80 transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <h1 className="font-serif font-semibold text-[17px] text-foreground tracking-[-0.3px] truncate max-w-[60%]">{title}</h1>
      <div className="w-9 h-9 flex items-center justify-center">{right}</div>
    </header>
  );
}