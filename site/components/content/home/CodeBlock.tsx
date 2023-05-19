import useThemeColors from "../../../styles/useThemeColors";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { headerFont } from "../../../styles/fonts";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { GitHubIcon } from "../../icons/GitHubIcon";
import LinkWrapper from "../../core/hocs/LinkWrapper";

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
          <Text>
            Most of my -almost 2 decade long- career has revolved around code in
            one way or the other.
          </Text>
          <Text>
            Currently I'm working on some projects that I'm excited to share
            more about in the near future.
          </Text>
          <Text>
            For now if you want to know more about my experience, you can check
            out
          </Text>
          <Flex
            width={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
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
