import Lottie from "lottie-react";
import type { ReactElement } from "react";
import { View } from "react-native";
import type { LottieViewProps } from "lottie-react-native";

function animationDataFromSource(source: LottieViewProps["source"]): object | null {
  if (source == null) return null;
  if (typeof source === "string") return null;
  if (typeof source === "object" && "uri" in source) return null;
  const raw = source as { default?: object };
  if (raw && typeof raw === "object" && "default" in raw && raw.default != null && typeof raw.default === "object") {
    return raw.default;
  }
  return source as object;
}

/**
 * `lottie-react-native` uses a native codegen view that does not render JSON animations
 * reliably in the browser. On web we use `lottie-react` (lottie-web) instead.
 */
export default function HemoraLottie({ source, autoPlay = true, loop = true, style }: LottieViewProps): ReactElement {
  const animationData = animationDataFromSource(source);
  const ok = Boolean(animationData && typeof animationData === "object" && "v" in animationData);
  if (!ok) {
    return <View style={style} />;
  }

  return (
    <View style={style}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoPlay}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
