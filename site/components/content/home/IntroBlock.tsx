import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../../../styles/fonts";
import D17eLogo from "../../icons/D17eLogo";
import useThemeColors from "../../../styles/useThemeColors";
import WithLink from "../../core/hocs/WithLink";

export default function IntroBlock() {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
        justifyContent={"center"}
        scrollSnapAlign={"start"}
      >
        <Flex
          width={"80vw"}
          maxWidth={["20rem", "25rem", "35rem"]}
          direction={"column"}
          align={"center"}
          fontFamily={bodyFont.style.fontFamily}
        >
          <D17eLogo />
          <Text
            fontSize={["x-large", "xx-large", "xxx-large"]}
            borderBottomWidth={"1px"}
            borderBottomColor={colors.color}
            fontFamily={headerFont.style.fontFamily}
            display={"flex"}
          >
            <WithLink link={"#code"}>
              <Box>code.</Box>
            </WithLink>
            <WithLink link={"#art"}>
              <Box marginLeft={"1rem"}>art.</Box>
            </WithLink>
            <WithLink link={"#ideas"}>
              <Box marginLeft={"1rem"}>ideas.</Box>
            </WithLink>
          </Text>
        </Flex>
      </VStack>
    </>
  );
}
