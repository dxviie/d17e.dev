import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props: Record<string, any>) => ({
    body: {
      fontFamily: "body",
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "blue")(props),
      lineHeight: "base",
    },
    "*::placeholder": {
      color: mode("gray.400", "whiteAlpha.400")(props),
    },
    "*, *::before, &::after": {
      color: "orange",
      borderColor: mode("gray.200", "whiteAlpha.300")(props),
      wordWrap: "break-word",
    },
  }),
};

// fixes theme initialization (without: invisible controls)
const theme = extendTheme({
  config: {
    styles: styles,
    useSystemColorMode: "true",
  },
});

export default theme;
