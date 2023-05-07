import About from "./About";
import { VStack } from "@chakra-ui/react";

export default function IntroBlock() {
  return (
    <>
      <VStack
        height={"100vh"}
        justifyContent={"center"}
        scrollSnapAlign={"start"}
      >
        <About />
      </VStack>
    </>
  );
}
