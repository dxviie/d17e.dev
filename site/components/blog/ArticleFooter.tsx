import { HStack, Text } from "@chakra-ui/react";
import { formatPublishedDetails } from "../../services/ContentDetailFormatter";
import { ArticleDTO } from "../../services/ContentTypes";

export default function ArticleFooter({ article }: { article: ArticleDTO }) {
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <HStack>
        <Text fontStyle={"italic"} fontSize={"small"}>
          {formatPublishedDetails(
            article.createdAt,
            article.updatedAt,
            article.publishDtm
          )}
        </Text>
      </HStack>
    </>
  );
}
