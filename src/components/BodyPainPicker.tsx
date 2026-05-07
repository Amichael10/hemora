import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MaleBodyPaths, MALE_VIEW_W, MALE_VIEW_H, PAIN_FILL } from "./MaleBody";
import { FemaleBodyPaths, FEMALE_VIEW_W, FEMALE_VIEW_H } from "./FemaleBody";

type CalloutAnchor = { x: number; y: number; side: "left" | "right"; label: string };

const ALL_CHIPS = ["Head", "Chest", "Abdomen", "Arms", "Legs", "Back", "Joints", "Other"] as const;

export function BodyPainPicker({
  gender,
  selected,
  onToggle,
  otherText = "",
  onOtherChange,
}: {
  gender: string | null | undefined;
  selected: string[];
  onToggle: (label: string) => void;
  otherText?: string;
  onOtherChange?: (text: string) => void;
}) {
  const isMale = gender === "Male";
  const [callout, setCallout] = useState<CalloutAnchor | null>(null);
  const isSelected = (label: string) => selected.includes(label);
  const otherActive = isSelected("Other");

  const handleTap = (label: string, anchor: { x: number; y: number; side: "left" | "right" }) => {
    setCallout({ ...anchor, label });
    onToggle(label);
  };

  const calloutVisible = callout && isSelected(callout.label) ? callout : null;

  const viewW = isMale ? MALE_VIEW_W : FEMALE_VIEW_W;
  const viewH = isMale ? MALE_VIEW_H : FEMALE_VIEW_H;
  const calloutWidth = (label: string) => Math.max(54, label.length * 9 + 18);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative" style={{ height: "min(60vh, 520px)", aspectRatio: `${viewW} / ${viewH}` }}>
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          {isMale ? (
            <MaleBodyPaths isSelected={isSelected} onTap={handleTap} />
          ) : (
            <FemaleBodyPaths isSelected={isSelected} onTap={handleTap} />
          )}

          {/* Callout label */}
          <AnimatePresence>
            {calloutVisible && (
              <motion.g
                key={`${calloutVisible.label}-${calloutVisible.x}-${calloutVisible.y}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{ transformOrigin: `${calloutVisible.x}px ${calloutVisible.y}px` }}
              >
                <rect
                  x={calloutVisible.x}
                  y={calloutVisible.y}
                  rx={28}
                  ry={28}
                  width={calloutWidth(calloutVisible.label) * 2.4}
                  height={56}
                  fill="white"
                  stroke={PAIN_FILL}
                  strokeOpacity={0.25}
                  strokeWidth={2}
                  filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))"
                />
                <text
                  x={calloutVisible.x + calloutWidth(calloutVisible.label) * 1.2}
                  y={calloutVisible.y + 36}
                  textAnchor="middle"
                  fontSize={28}
                  fontWeight={600}
                  fill={PAIN_FILL}
                  fontFamily="Inter, sans-serif"
                >
                  {calloutVisible.label}
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Selectable pills — mirror body region state, also work as standalone toggles */}
      <div className="flex flex-wrap gap-2 justify-center mt-5 w-full px-2">
        {ALL_CHIPS.map((chip) => {
          const active = isSelected(chip);
          return (
            <button
              key={chip}
              onClick={() => onToggle(chip)}
              aria-pressed={active}
              data-testid={`chip-loc-${chip}`}
              className="rounded-full h-9 px-4 text-xs font-semibold border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#7B2335]"
              style={{
                background: active ? PAIN_FILL : "white",
                color: active ? "white" : "var(--foreground)",
                borderColor: active ? PAIN_FILL : "var(--border)",
              }}
            >
              {chip}
            </button>
          );
        })}
      </div>

      {/* "Other" text input — appears only when Other chip is active */}
      <AnimatePresence>
        {otherActive && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full px-2 overflow-hidden"
          >
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 px-1">
              Where else does it hurt?
            </label>
            <textarea
              value={otherText}
              onChange={(e) => onOtherChange?.(e.target.value)}
              placeholder="Describe in your own words…"
              rows={2}
              data-testid="input-other-pain"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-[#7B2335]/30 focus:border-[#7B2335]/40 resize-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
