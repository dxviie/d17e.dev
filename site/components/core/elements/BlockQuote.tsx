import { Box } from "@chakra-ui/react";
import React from "react";
import { handWrittenFont } from "../../../styles/fonts";
import useThemeColors from "../hooks/useThemeColors";

export default function BlockQuote({
  children,
}: {
  children?: React.ReactNode;
}) {
  const colors = useThemeColors();
  return (
    <>
      <blockquote>
        <Box
          fontFamily={handWrittenFont.style.fontFamily}
          fontSize={"x-large"}
          marginTop={"1rem"}
          paddingLeft={"1.5rem"}
          paddingTop={"1px"}
          paddingBottom={"10px"}
          borderLeftWidth={"5px"}
          textAlign={"center"}
          borderColor={colors.buttonBgColor}
        >
          {children}
        </Box>
      </blockquote>
    </>
  );
}
