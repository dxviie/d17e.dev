import { ArticleDTO } from "../../../services/ContentTypes";
import { bodyFont } from "../../../styles/fonts";
import ReactMarkdown from "react-markdown";
import { VStack } from "@chakra-ui/react";

export default function ArticleBody({ article }: { article: ArticleDTO }) {
  return (
    <>
      <VStack
        paddingTop={"1rem"}
        alignItems={"flex-start"}
        fontFamily={bodyFont.style.fontFamily}
      >
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </VStack>
    </>
  );
}
