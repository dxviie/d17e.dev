import { Box, Flex, HStack, Link, Spacer, Text } from "@chakra-ui/react";
import { HeartIcon } from "../../icons/HeartIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { GitHubIcon } from "../../icons/GitHubIcon";
import { useRouter } from "next/router";
import useThemeColors from "../../../styles/useThemeColors";

export default function Footer() {
  const colors = useThemeColors();
  const router = useRouter();
  const scrollSnapping = "/" === router.asPath ? "end" : "none";
  return (
    <>
      <HStack
        width={"100%"}
        bg={colors.color}
        color={colors.bgColor}
        padding={"1rem"}
        fontSize={"sm"}
        scrollSnapAlign={scrollSnapping}
      >
        <Flex direction={"column"}>
          <Text>
            made with{" "}
            <HeartIcon color={"orangered"} ml={".2rem"} mr={".2rem"} /> by David
            Vandenbogaerde
          </Text>
          <Box alignContent={"center"} justifyContent={"center"}>
            <LinkedInIcon />{" "}
            <Link href={"https://www.linkedin.com/in/d16de/"} target={"_blank"}>
              d16de
            </Link>{" "}
            -
            <GitHubIcon ml={".3rem"} />{" "}
            <Link href={"https://github.com/dxviie"} target={"_blank"}>
              dxviie
            </Link>
          </Box>
        </Flex>

        <Spacer />
        <Flex direction={"column"}>
          <span>KVK - 87650770</span>
          <span>BTW - NL004463884B92</span>
        </Flex>
      </HStack>
    </>
  );
}
