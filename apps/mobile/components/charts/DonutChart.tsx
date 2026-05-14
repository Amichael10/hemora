import Svg, { Circle, G } from "react-native-svg";

type Props = {
  size?: number;
  strokeWidth?: number;
  /** 0–100 */
  percent: number;
  color: string;
  trackColor: string;
};

export function DonutChart({
  size = 120,
  strokeWidth = 14,
  percent,
  color,
  trackColor,
}: Props) {
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.min(100, Math.max(0, percent)) / 100;

  return (
    <Svg width={size} height={size}>
      <Circle cx={cx} cy={cy} r={r} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
      <G rotation="-90" origin={`${cx}, ${cy}`}>
        <Circle
          cx={cx}
          cy={cy}
          r={r}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${dash * c} ${c}`}
          strokeLinecap="round"
        />
      </G>
    </Svg>
  );
}
