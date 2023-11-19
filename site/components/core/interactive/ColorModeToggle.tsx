import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, useColorMode } from "@chakra-ui/react";

export default function ColorModeToggle() {
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
