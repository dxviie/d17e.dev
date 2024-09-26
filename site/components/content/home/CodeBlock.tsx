import useThemeColors from "../../core/hooks/useThemeColors";
import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import Markdown from "../../core/elements/Markdown";
import Avatar from "../../core/elements/Avatar";
import {headerFont} from "../../../styles/fonts";

export default function CodeBlock({
                                    description
                                  }: {
  description: string;
}) {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        paddingTop={"4rem"}
        paddingBottom={"4rem"}
        minHeight={"110svh"}
        width={"100%"}
        justifyContent={"center"}
        bg={colors.color}
        color={colors.bgColor}
        id={"code"}
      >
        <VStack
          width={"80vw"}
          maxWidth={"30rem"}
          fontSize={["medium", "large"]}
          alignItems={"flex-start"}
        >
          <HStack>
            <Text
              fontFamily={headerFont.style.fontFamily}
              fontSize={"3rem"}
              bgColor={colors.bgColor}
              color={colors.color}
              padding={"0 1rem"}
              marginLeft={"-1rem"}
              marginBottom={"2rem"}
            >
              Hi!&nbsp;&nbsp;&nbsp;&nbsp;:)&nbsp;
            </Text>
            <Box
              paddingLeft={["12rem", "16rem", "17rem"]}
              paddingBottom={["2rem", "3rem", "4rem"]}
              position={"absolute"}
            >
              <Avatar
                size={["6rem", "9rem", "10rem"]}
                invertedColors={true}
              />
            </Box>
          </HStack>
          <Markdown markdown={description} invertedColors={true}/>
        </VStack>
      </VStack>
    </>
  );
}
