import { Text, VStack } from "@chakra-ui/react";
import { ArticleDTO } from "../../services/ContentTypes";
import { formatReadingTime } from "../../services/ContentDetailFormatter";

export default function ArticleHeader({ article }: { article: ArticleDTO }) {
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <VStack alignItems={"flex-start"} spacing={"-2"}>
        <Text fontSize={"xxx-large"} fontWeight={"bold"}>
          {article.title}
        </Text>
        <Text fontWeight={"bold"} fontSize={"small"}>
          {formatReadingTime(article.body)}
        </Text>
      </VStack>
    </>
  );
}
