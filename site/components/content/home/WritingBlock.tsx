import { Text, VStack } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";

export default function WritingBlock({ articles }: { articles: ArticleDTO[] }) {
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
