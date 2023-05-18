// noinspection JSUnusedLocalSymbols

import { defineStyleConfig, extendTheme } from "@chakra-ui/react";
import { bodyFont } from "./fonts";
import { mode } from "@chakra-ui/theme-tools";

const warmNeutrals = ["#D9B99B", "#A97D5D", "#8F6A48", "#624F3B", "#F6F3F1"];
const softPastels = ["#F2D2D8", "#B0CDEA", "#C7BFE6", "#E1E1E1", "#F2F2F2"];
const navyAndMustard = ["#00293C", "#F9A602", "#F7E4BE", "#B4B4B4", "#EFEFEF"];
const oliveAndRust = ["#8A8665", "#BC5C58", "#F2E8C4", "#E9D9B9", "#D8C8A7"];
const grayAndPlum = ["#747B81", "#4A4C4E", "#B67A7E", "#DBD5D0", "#E5E5E5"];

export const COLOR_LIGHT = "black"; //"gray.800";
export const COLOR_DARK = "white"; //"whiteAlpha.900";
export const BG_COLOR_LIGHT = "white"; //"gray.200";
export const BG_COLOR_DARK = "black"; //"gray.800";
export const ACCENT_COLOR_LIGHT = "orange.500";
export const ACCENT_COLOR_DARK = "orange.300";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "purple.500",
      color: "purple.500",
    },
    solid: {
      bg: "purple.500",
      color: "white",
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "outline",
  },
});

const Card = defineStyleConfig({
  variants: {},
});

const styles = {
  global: (props: Record<string, any>) => ({
    body: {
      fontFamily: bodyFont.style.fontFamily,
      color: mode(COLOR_LIGHT, COLOR_DARK)(props),
      bg: mode(BG_COLOR_LIGHT, BG_COLOR_DARK)(props),
      lineHeight: "1.5",
    },
    "*::placeholder": {
      // color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      // color: "orange",
      // borderColor: mode("gray.200", "whiteAlpha.300")(props),
      wordWrap: "break-word",
    },
    components: { Button: Button, Card },
  }),
};

// fixes theme initialization (without: invisible controls)
const d17eTheme = extendTheme({
  styles: styles,
  useSystemColorMode: "true",
});

export default d17eTheme;
