import { useColorModeValue } from "@chakra-ui/react";
import {
  ACCENT_COLOR_DARK,
  ACCENT_COLOR_LIGHT,
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  BUTTON_BG_COLOR_DARK,
  BUTTON_BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export interface ThemeColors {
  color: string;
  bgColor: string;
  accentColor: string;
  buttonColor: string;
  buttonBgColor: string;
}

export default function useThemeColors(): ThemeColors {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  const accent = useColorModeValue(ACCENT_COLOR_LIGHT, ACCENT_COLOR_DARK);
  const button = useColorModeValue(BUTTON_BG_COLOR_DARK, BUTTON_BG_COLOR_LIGHT);
  const buttonBg = useColorModeValue(
    BUTTON_BG_COLOR_LIGHT,
    BUTTON_BG_COLOR_DARK
  );

  return {
    color: color,
    bgColor: bg,
    accentColor: accent,
    buttonColor: button,
    buttonBgColor: buttonBg,
  };
}
