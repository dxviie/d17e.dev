import React from "react";
import useThemeColors from "../../../styles/useThemeColors";
import { Text } from "@chakra-ui/react";
import { headerFont } from "../../../styles/fonts";

export default function Header({
  level,
  children,
}: {
  level: number;
  children?: React.ReactNode;
}) {
  const colors = useThemeColors();
  const size =
    level === 1
      ? "xx-large"
      : level === 2
      ? "x-large"
      : level === 3
      ? "large"
      : "normal";
  const text = (
    <Text
      fontFamily={headerFont.style.fontFamily}
      fontWeight={"bold"}
      display={"inline"}
      fontSize={size}
      marginTop={"1rem"}
    >
      {children}
    </Text>
  );
  switch (level) {
    case 1:
      return <h1>{text}</h1>;
    case 2:
      return <h2>{text}</h2>;
    case 3:
      return <h3>{text}</h3>;
    default:
      return <h4>{text}</h4>;
  }
}
