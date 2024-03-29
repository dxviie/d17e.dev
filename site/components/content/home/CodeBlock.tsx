import useThemeColors from "../../core/hooks/useThemeColors";
import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {headerFont} from "../../../styles/fonts";
import Markdown from "../../core/elements/Markdown";
import Avatar from "../../core/elements/Avatar";
import {AuthorDTO} from "../../../services/ContentTypes";

export default function CodeBlock({
                                    description,
                                    author,
                                  }: {
  description: string;
  author: AuthorDTO;
}) {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
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
              code.
            </Text>
            <Box
              paddingLeft={["10rem", "15rem"]}
              paddingBottom={["0", "3rem", "0"]}
              paddingTop={["2rem", "0", "0"]}
              position={"absolute"}
            >
              <Avatar
                author={author}
                size={["6rem", "8rem", "10rem"]}
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
