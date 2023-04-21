import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const warmNeutrals = ["#D9B99B", "#A97D5D", "#8F6A48", "#624F3B", "#F6F3F1"];
const softPastels = ["#F2D2D8", "#B0CDEA", "#C7BFE6", "#E1E1E1", "#F2F2F2"];
const navyAndMustard = ["#00293C", "#F9A602", "#F7E4BE", "#B4B4B4", "#EFEFEF"];
const oliveAndRust = ["#8A8665", "#BC5C58", "#F2E8C4", "#E9D9B9", "#D8C8A7"];
const grayAndPlum = ["#747B81", "#4A4C4E", "#B67A7E", "#DBD5D0", "#E5E5E5"];

const styles = {
  global: (props: Record<string, any>) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.200", "gray.700")(props),
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
  }),
};

// fixes theme initialization (without: invisible controls)
const d17eTheme = extendTheme({
  styles: styles,
  useSystemColorMode: "true",
});

export default d17eTheme;
