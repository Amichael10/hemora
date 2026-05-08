import { ComponentType } from "react";

type IconComponent = ComponentType<{
  size?: number | string;
  color?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}>;

interface HealthIconProps {
  outline: IconComponent;
  filled: IconComponent;
  width?: string | number;
  height?: string | number;
  size?: number | string;
  color?: string;
  className?: string;
  active?: boolean;
}

export function HealthIcon({
  outline: Outline,
  filled: Filled,
  width,
  height,
  size,
  color,
  className = "",
  active = false,
}: HealthIconProps) {
  const resolvedSize = size ?? width ?? height ?? 24;
  const px = typeof resolvedSize === "number" ? resolvedSize : parseInt(String(resolvedSize), 10) || 24;

  if (active) {
    return <Filled size={px} color={color} className={className} />;
  }
  return (
    <span
      className="group/icon relative inline-flex shrink-0"
      style={{ width: px, height: px }}
    >
      <span className="absolute inset-0 transition-opacity duration-150 group-hover/icon:opacity-0">
        <Outline size={px} color={color} className={className} />
      </span>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-150 group-hover/icon:opacity-100">
        <Filled size={px} color={color} className={className} />
      </span>
    </span>
  );
}
