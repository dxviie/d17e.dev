import useThemeColors from "../../../styles/useThemeColors";
import { Text, VStack } from "@chakra-ui/react";

export default function CodeBlock() {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        bg={colors.color}
        color={colors.bgColor}
        scrollSnapAlign={"start"}
      >
        <Text>All I do is code...</Text>
      </VStack>
    </>
  );
}
