/**
 * Solar icons ([saoudi-h/solar-icons](https://github.com/saoudi-h/solar-icons)) for React Native via `@solar-icons/react-native`.
 * Keeps the same export names as the web app so screens can share imports.
 */
import type { ComponentType } from "react";
import {
  AddCircle as AddCircleBoldIcon,
  ChatRound as ChatRoundBoldIcon,
  ChatRoundDots as ChatRoundDotsBoldIcon,
  CheckCircle as CheckCircleBoldIcon,
  ClockCircle as ClockCircleBoldIcon,
  HeartPulse as HeartPulseBoldIcon,
  HeartPulse2 as HeartPulse2BoldIcon,
  HomeSmile as HomeSmileBoldIcon,
  Hospital as HospitalBoldIcon,
  Notebook as NotebookBoldIcon,
  Pen as PenBoldIcon,
  Phone as PhoneBoldIcon,
  Pill as PillBoldIcon,
  Pills2 as Pills2BoldIcon,
  Stethoscope as StethoscopeBoldIcon,
  TestTube as TestTubeBoldIcon,
  UsersGroupRounded as UsersGroupRoundedBoldIcon,
  Bookmark as BookmarkBoldIcon,
  Folder2 as Folder2BoldIcon,
} from "@solar-icons/react-native/Bold";
import {
  AddCircle as AddCircleLinearIcon,
  AddSquare as AddSquareLinearIcon,
  AltArrowDown as AltArrowDownLinearIcon,
  AltArrowLeft as AltArrowLeftLinearIcon,
  AltArrowRight as AltArrowRightLinearIcon,
  Bookmark as BookmarkLinearIcon,
  Calendar as CalendarLinearIcon,
  Chart as ChartLinearIcon,
  ChartSquare as ChartSquareLinearIcon,
  CloseCircle as CloseCircleLinearIcon,
  DocumentText as DocumentTextLinearIcon,
  EyeClosed as EyeClosedLinearIcon,
  Folder2 as Folder2LinearIcon,
  Global as GlobalLinearIcon,
  HeartPulse as HeartPulseLinearIcon,
  HeartPulse2 as HeartPulse2LinearIcon,
  HomeSmile as HomeSmileLinearIcon,
  Hospital as HospitalLinearIcon,
  Magnifer as MagniferLinearIcon,
  MapPoint as MapPointLinearIcon,
  Notebook as NotebookLinearIcon,
  Phone as PhoneLinearIcon,
  Pill as PillLinearIcon,
  Pills2 as Pills2LinearIcon,
  Settings as SettingsLinearIcon,
  Share as ShareLinearIcon,
  SquareArrowRightUp as SquareArrowRightUpLinearIcon,
  Stethoscope as StethoscopeLinearIcon,
  TestTube as TestTubeLinearIcon,
  UploadSquare as UploadSquareLinearIcon,
  UsersGroupRounded as UsersGroupRoundedLinearIcon,
} from "@solar-icons/react-native/Linear";

export type SolarIconProps = {
  size?: number;
  color?: string;
  /** @deprecated Solar web prop; ignored on RN */
  className?: string;
};

type SolarIconComponent = ComponentType<{
  size?: number;
  color?: string;
  mirrored?: boolean;
}>;

function bind(Icon: SolarIconComponent) {
  return function SolarIconBound({ size = 24, color = "#000" }: SolarIconProps) {
    return <Icon size={size} color={color} />;
  };
}

/** Tab bar — Home */
export const HomeSmileLinear = bind(HomeSmileLinearIcon);
export const HomeSmileBold = bind(HomeSmileBoldIcon);

/** Tab bar — Crisis */
export const HeartPulse2Linear = bind(HeartPulse2LinearIcon);
export const HeartPulse2Bold = bind(HeartPulse2BoldIcon);

/** Tab bar — Meds */
export const Pills2Linear = bind(Pills2LinearIcon);
export const Pills2Bold = bind(Pills2BoldIcon);

/** Tab bar — Records */
export const NotebookLinear = bind(NotebookLinearIcon);
export const NotebookBold = bind(NotebookBoldIcon);

/** Tab bar — Directory */
export const UsersGroupRoundedLinear = bind(UsersGroupRoundedLinearIcon);
export const UsersGroupRoundedBold = bind(UsersGroupRoundedBoldIcon);

/** Dashboard & screens */
export const SettingsLinear = bind(SettingsLinearIcon);
export const EyeClosedLinear = bind(EyeClosedLinearIcon);
export const AltArrowLeftLinear = bind(AltArrowLeftLinearIcon);
export const AltArrowDownLinear = bind(AltArrowDownLinearIcon);
export const AltArrowRightLinear = bind(AltArrowRightLinearIcon);
export const PillBold = bind(PillBoldIcon);
export const PillLinear = bind(PillLinearIcon);
export const HeartPulseLinear = bind(HeartPulseLinearIcon);
export const DocumentTextLinear = bind(DocumentTextLinearIcon);
export const AddCircleBold = bind(AddCircleBoldIcon);
export const AddCircleLinear = bind(AddCircleLinearIcon);
export const ClockCircleBold = bind(ClockCircleBoldIcon);
export const CheckCircleBold = bind(CheckCircleBoldIcon);
export const ChartLinear = bind(ChartLinearIcon);
export const ChartSquareLinear = bind(ChartSquareLinearIcon);

export const ShareLinear = bind(ShareLinearIcon);

export const CalendarLinear = bind(CalendarLinearIcon);
export const UploadSquareLinear = bind(UploadSquareLinearIcon);

export const MagniferLinear = bind(MagniferLinearIcon);
export const PhoneLinear = bind(PhoneLinearIcon);
export const PhoneBold = bind(PhoneBoldIcon);
export const MapPointLinear = bind(MapPointLinearIcon);
export const HospitalLinear = bind(HospitalLinearIcon);
export const HospitalBold = bind(HospitalBoldIcon);
export const TestTubeLinear = bind(TestTubeLinearIcon);
export const TestTubeBold = bind(TestTubeBoldIcon);
export const StethoscopeLinear = bind(StethoscopeLinearIcon);
export const StethoscopeBold = bind(StethoscopeBoldIcon);
export const Folder2Linear = bind(Folder2LinearIcon);
export const Folder2Bold = bind(Folder2BoldIcon);
export const BookmarkLinear = bind(BookmarkLinearIcon);
export const BookmarkBold = bind(BookmarkBoldIcon);
export const ChatRoundDotsBold = bind(ChatRoundDotsBoldIcon);
export const ChatRoundBold = bind(ChatRoundBoldIcon);
export const PenBold = bind(PenBoldIcon);
export const SquareArrowRightUpLinear = bind(SquareArrowRightUpLinearIcon);
export const GlobalLinear = bind(GlobalLinearIcon);
export const CloseCircleLinear = bind(CloseCircleLinearIcon);
export const AddIcon = bind(AddCircleLinearIcon);

/** Small “+” actions (meds header, etc.) */
export const PlusLinear = bind(AddSquareLinearIcon);
