import { Text } from "@chakra-ui/react";
import { ArticleDTO } from "../../services/ContentTypes";

export default function ArticleTitle({ article }: { article: ArticleDTO }) {
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <Text fontSize={"xx-large"} fontWeight={"bold"}>
        {article.title}
      </Text>
    </>
  );
}
