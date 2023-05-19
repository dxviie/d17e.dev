import { Box } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";
import WithLink from "./WithLink";
import React from "react";

export default function LinkWrapper({
  link,
  children,
  color,
}: {
  link: string;
  children?: React.ReactNode;
  color?: string;
}) {
  const colors = useThemeColors();
  return (
    <>
      <WithLink link={link}>
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
