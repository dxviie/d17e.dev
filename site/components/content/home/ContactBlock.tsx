import { Box, Text, VStack } from "@chakra-ui/react";
import useThemeColors from "../../../styles/useThemeColors";
import Link from "next/link";

export default function ContactBlock() {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        // bg={colors.color}
        // color={colors.bgColor}
        scrollSnapAlign={"start"}
        id={"contact"}
      >
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
      </VStack>
    </>
  );
}
