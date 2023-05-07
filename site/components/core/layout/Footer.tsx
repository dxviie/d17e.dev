import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { HeartIcon } from "../../icons/HeartIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import { GitHubIcon } from "../../icons/GitHubIcon";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../../styles/d17eTheme";

export default function Footer() {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  return (
    <>
      <HStack
        width={"100%"}
        bg={color}
        color={bg}
        padding={"1rem"}
        fontSize={"sm"}
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
