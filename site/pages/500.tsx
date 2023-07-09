import { Box, Center, VStack } from "@chakra-ui/react";
import { bodyFont, headerFont } from "../styles/fonts";
import ArrowLink from "../components/core/interactive/ArrowLink";

export default function Custom500() {
  return (
    <>
      <Center>
        <VStack>
          <Box fontFamily={bodyFont.style.fontFamily} fontSize={"6rem"}>
            500
          </Box>
          <Box fontFamily={headerFont.style.fontFamily} paddingBottom={"2rem"}>
            Computer says no... :(
          </Box>
          <Box fontFamily={headerFont.style.fontFamily} paddingBottom={"2rem"}>
            Don't worry. I'm on it!
          </Box>
          <Box height={"1rem"} />
          <ArrowLink
            link={"/"}
            arrow={"right"}
            description={"Let's go home?"}
          />
        </VStack>
      </Center>
    </>
  );
}
