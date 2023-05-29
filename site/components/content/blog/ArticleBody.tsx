import { ArticleDTO } from "../../../services/ContentTypes";
import { bodyFont } from "../../../styles/fonts";
import { Text, VStack } from "@chakra-ui/react";
import Markdown from "../../core/elements/Markdown";

const getBlockQuote = (props: any) => {
  return <Text>{props.children}</Text>;
};

export default function ArticleBody({ article }: { article: ArticleDTO }) {
  return (
    <>
      <VStack
        alignItems={"flex-start"}
        fontFamily={bodyFont.style.fontFamily}
        style={{ wordWrap: "break-word" }}
      >
        <Markdown markdown={article.body} />
      </VStack>
    </>
  );
}
