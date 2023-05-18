import { Text, VStack } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import useThemeColors from "../../../styles/useThemeColors";

export default function WritingBlock({ articles }: { articles: ArticleDTO[] }) {
  const colors = useThemeColors();
  return (
    <>
      <VStack
        height={"100vh"}
        width={"100%"}
        justifyContent={"center"}
        scrollSnapAlign={"start"}
        color={colors.bgColor}
        bgColor={colors.color}
      >
        <Text>I write</Text>
      </VStack>
    </>
  );
}
