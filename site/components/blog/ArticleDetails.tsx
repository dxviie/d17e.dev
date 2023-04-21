import { HStack, Text } from "@chakra-ui/react";
import {
  formatPublishedDetails,
  formatReadingTime,
} from "../../services/ContentDetailFormatter";
import { ArticleDTO } from "../../services/ContentTypes";

export default function ArticleDetails({ article }: { article: ArticleDTO }) {
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <HStack>
        <Text fontWeight={"bold"} fontSize={"small"}>
          {formatReadingTime(article.body)}
        </Text>
        <Text fontStyle={"italic"} fontSize={"small"}>
          {" - "}
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
