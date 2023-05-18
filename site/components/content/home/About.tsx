import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { bodyFont } from "../../../styles/fonts";
import useThemeColors from "../../../styles/useThemeColors";

export default function About() {
  const colors = useThemeColors();
  return (
    <>
      <Image
        mt={"2rem"}
        width={"80vw"}
        maxWidth={"30rem"}
        src={"d17e.dev-logo.svg"}
        alt={"d17e.dev logo"}
      ></Image>
      <Flex
        direction={"column"}
        align={"center"}
        fontFamily={bodyFont.style.fontFamily}
      >
        <Text
          fontSize={"xx-large"}
          borderBottomWidth={"1px"}
          borderBottomColor={"black"}
          // fontFamily={headerFont.style.fontFamily}
          // fontWeight={"bold"}
        >
          code. art. ideas.
        </Text>
        <Box mt={"2rem"} textAlign={"center"} maxWidth={"22rem"}>
          <Text fontSize={"lg"}>
            I used to build other people&apos;s dreams.
            <br />
            Now I build my own.*
            <br />
            <br />
            I&apos;m excited! Are you?
            <br />{" "}
            <Link
              href={"https://tally.so/r/npePpB"}
              color={colors.accentColor}
              target={"_self"}
              className={"umami--click--mailing-form"}
            >
              Drop your email
            </Link>{" "}
            and stay tuned.
          </Text>
          <Text mt={"3rem"} mb={"2rem"} fontSize={"sm"}>
            *I still build stuff for others some of my time so if you have a
            project where you think I can make a difference, please do{" "}
            <Link
              href={"https://tally.so/r/mDqALj"}
              color={colors.accentColor}
              target={"_self"}
              className={"umami--click--contact-form"}
            >
              get in touch
            </Link>
            .
          </Text>
        </Box>
      </Flex>
    </>
  );
}
