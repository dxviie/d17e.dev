import { ArticleDTO } from "../../../services/ContentTypes";
import { bodyFont } from "../../../styles/fonts";
import ReactMarkdown from "react-markdown";
import { VStack } from "@chakra-ui/react";

export default function ArticleBody({ article }: { article: ArticleDTO }) {
  return (
    <>
      <VStack
        alignItems={"flex-start"}
        fontFamily={bodyFont.style.fontFamily}
        style={{ wordWrap: "break-word" }}
      >
        <ReactMarkdown className={"d17e-markdown"}>
          {article.body}
        </ReactMarkdown>
      </VStack>
    </>
  );
}
