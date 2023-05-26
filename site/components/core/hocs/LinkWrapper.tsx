import { Box } from "@chakra-ui/react";
import useThemeColors from "../hooks/useThemeColors";
import WithLink from "./WithLink";
import React from "react";

export default function LinkWrapper({
  link,
  children,
  target,
  color,
}: {
  link: string;
  children?: React.ReactNode;
  target?: string | "_self";
  color?: string;
}) {
  const colors = useThemeColors();
  return (
    <>
      <WithLink link={link} target={target}>
        <Box
          cursor={"pointer"}
          display={"inline"}
          textDecoration={"dashed"}
          color={color || colors.accentColor}
          borderBottomWidth={"1px"}
          borderStyle={"dashed"}
          borderColor={colors.bgColor}
          sx={{
            _hover: {
              color: colors.accentColor,
              borderBottomWidth: "1px",
              borderStyle: "dashed",
              borderColor: colors.accentColor,
            },
          }}
        >
          {children}
        </Box>
      </WithLink>
    </>
  );
}
