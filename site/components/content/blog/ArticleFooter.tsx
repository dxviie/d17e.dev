import { HStack } from "@chakra-ui/react";
import { ArticleDTO } from "../../../services/ContentTypes";
import useThemeColors from "../../core/hooks/useThemeColors";
import Avatar from "../../core/elements/Avatar";

export default function ArticleFooter({ article }: { article: ArticleDTO }) {
  const colors = useThemeColors();
  if (!article) {
    // don't try to render missing article
    return <></>;
  }
  return (
    <>
      <HStack justifyContent={"flex-end"}>
        {article.author.name && article.author.avatar ? (
          <>
            <Avatar author={article.author} />
          </>
        ) : (
          <></>
        )}
      </HStack>
    </>
  );
}
