import { Text, useColorModeValue, VStack } from "@chakra-ui/react";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function ArtBlock() {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        bg={color}
        color={bg}
        scrollSnapAlign={"start"}
      >
        <Text>I&apos;m an art</Text>
      </VStack>
    </>
  );
}
