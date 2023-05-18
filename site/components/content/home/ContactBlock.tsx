import { Text, VStack } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";

export default function ContactBlock() {
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
        <Text>Get in touch!</Text>
      </VStack>
    </>
  );
}
