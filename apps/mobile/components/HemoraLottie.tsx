import LottieView from "lottie-react-native";
import type { LottieViewProps } from "lottie-react-native";

/** Native / default — Metro uses `HemoraLottie.web.tsx` on web. */
export default function HemoraLottie(props: LottieViewProps) {
  return <LottieView {...props} />;
}
