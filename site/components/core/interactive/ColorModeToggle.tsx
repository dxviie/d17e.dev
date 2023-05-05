import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

export default function ColorModeToggle() {
  const colorModeContext = useColorMode();
  return (
    <>
      <Button onClick={() => colorModeContext.toggleColorMode()}>
        {colorModeContext.colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </>
  );
}
