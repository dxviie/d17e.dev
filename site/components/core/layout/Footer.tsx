import {Box, Flex, Spacer, Text} from "@chakra-ui/react";
import {HeartIcon} from "../../icons/HeartIcon";
import {useRouter} from "next/router";
import useThemeColors from "../hooks/useThemeColors";
import {isAtHomePage} from "../../../services/RouterUtils";
import LinkWrapper from "../hocs/LinkWrapper";

export default function Footer() {
  const colors = useThemeColors();
  const router = useRouter();
  const scrollSnapping = isAtHomePage(router.asPath) ? "end" : "none";
  const year = new Date().getFullYear();
  return (
    <>
      <Flex
        width={"100%"}
        bg={colors.color}
        color={colors.bgColor}
        padding={"1rem"}
        fontSize={"sm"}
        scrollSnapAlign={scrollSnapping}
        direction={["column", "row"]}
        alignItems={"center"}
      >
        <Flex direction={"column"} alignItems={["center", "flex-start"]}>
          <Text textAlign={"center"}>
            made with{" "}
            <HeartIcon color={colors.accentColor} ml={".2rem"} mr={".2rem"}/>{" "}
            by David Vandenbogaerde
          </Text>
          <Box
            alignSelf={["center", "flex-start"]}
            display={"flex"}
            fontSize={"small"}
          >
            <LinkWrapper
              link={"https://creativecommons.org/licenses/by-nc/4.0/"}
              color={colors.bgColor}
              target={"_blank"}
            >
              © CC BY-NC 4.0
            </LinkWrapper>
            <Text marginLeft={".5rem"}>| 2022 - {year}</Text>
          </Box>
        </Flex>

        <Spacer/>
        <Flex
          direction={"column"}
          alignItems={["center", "flex-start"]}
          marginTop={["1rem", "0"]}
        >
          <span>KvK - 87650770</span>
          <span>BTW - NL004463884B92</span>
        </Flex>
      </Flex>
    </>
  );
}
