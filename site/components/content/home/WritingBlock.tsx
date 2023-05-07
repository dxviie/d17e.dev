import { Text, VStack } from "@chakra-ui/react";

export default function WritingBlock() {
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        scrollSnapAlign={"start"}
      >
        <Text>I write</Text>
      </VStack>
    </>
  );
}
