import { Text } from "@chakra-ui/react";
import React from "react";
import { handWrittenFont } from "../../../styles/fonts";
import useThemeColors from "../../../styles/useThemeColors";

export default function BlockQuote({
  children,
}: {
  children?: React.ReactNode;
}) {
  const colors = useThemeColors();
  return (
    <>
      <blockquote>
        <Text
          fontFamily={handWrittenFont.style.fontFamily}
          fontSize={"x-large"}
          marginTop={"1rem"}
          paddingLeft={"1.5rem"}
          paddingTop={"1px"}
          paddingBottom={"10px"}
          borderLeftWidth={"5px"}
          borderColor={colors.buttonBgColor}
        >
          {children}
        </Text>
      </blockquote>
    </>
  );
}
