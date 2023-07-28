import { Box } from "@chakra-ui/react";
import useThemeColors from "../hooks/useThemeColors";
import WithLink from "./WithLink";
import React from "react";

export default function LinkWrapper({
  link,
  children,
  target,
  color,
  invertedColors = false,
}: {
  link: string;
  children?: React.ReactNode;
  target?: string | "_self";
  color?: string;
  invertedColors?: boolean;
}) {
  const colors = useThemeColors();
  return (
    <>
      <WithLink link={link} target={target}>
        <Box
          cursor={"pointer"}
          display={"inline"}
          textDecoration={"dashed"}
          color={color || (invertedColors ? colors.bgColor : colors.color)}
          borderBottomWidth={"1px"}
          borderStyle={"dashed"}
          borderColor={
            color || (invertedColors ? colors.bgColor : colors.color)
          }
          sx={{
            _hover: {
              color: colors.accentColor,
              borderBottomWidth: "1px",
              borderStyle: "dashed",
              borderColor: colors.accentColor,
            },
            _visited: {
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
