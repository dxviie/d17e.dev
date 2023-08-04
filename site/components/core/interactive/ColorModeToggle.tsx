import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, useColorMode } from "@chakra-ui/react";
import useThemeColors from "../hooks/useThemeColors";

export default function ColorModeToggle() {
  const colors = useThemeColors();
  const colorModeContext = useColorMode();
  return (
    <>
      <Flex
        onClick={() => colorModeContext.toggleColorMode()}
        padding={"1rem"}
        cursor={"pointer"}
        className={"push-button"}
      >
        {colorModeContext.colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </Flex>
    </>
  );
}
