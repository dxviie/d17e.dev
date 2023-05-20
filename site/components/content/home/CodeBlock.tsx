import useThemeColors from "../../../styles/useThemeColors";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { headerFont } from "../../../styles/fonts";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { GitHubIcon } from "../../icons/GitHubIcon";
import LinkWrapper from "../../core/hocs/LinkWrapper";

export default function CodeBlock({ description }: { description: string }) {
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
        id={"code"}
      >
        <VStack
          width={"80vw"}
          maxWidth={"30rem"}
          fontSize={"large"}
          alignItems={"flex-start"}
        >
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
          {description.split("\n").map((line, index) => (
            <Text key={index}>{line}</Text>
          ))}
          <Flex
            width={"100%"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            fontSize={"1.5rem"}
            paddingTop={"1rem"}
          >
            <LinkWrapper
              link={"https://www.linkedin.com/in/d16de/"}
              color={colors.bgColor}
            >
              <LinkedInIcon /> LinkedIn
            </LinkWrapper>

            <LinkWrapper
              link={"https://github.com/dxviie"}
              color={colors.bgColor}
            >
              <GitHubIcon ml={".3rem"} /> GitHub
            </LinkWrapper>
          </Flex>
        </VStack>
      </VStack>
    </>
  );
}
