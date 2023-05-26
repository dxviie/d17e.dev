import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import useThemeColors from "../hooks/useThemeColors";

export default function ColorModeToggle() {
  const colors = useThemeColors();
  const colorModeContext = useColorMode();
  return (
    <>
      <Button
        onClick={() => colorModeContext.toggleColorMode()}
        bg={"transparent"}
      >
        {colorModeContext.colorMode === "light" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </>
  );
}
