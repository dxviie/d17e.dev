import { ArticleDTO } from "../../../services/ContentTypes";
import { bodyFont } from "../../../styles/fonts";
import ReactMarkdown from "react-markdown";
import { Text, VStack } from "@chakra-ui/react";
import BlockQuote from "../../core/elements/BlockQuote";
import LinkWrapper from "../../core/hocs/LinkWrapper";
import Header from "../../core/elements/Header";

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
        <ReactMarkdown
          className={"d17e-markdown"}
          components={{
            blockquote: ({ children, ...props }) => (
              <BlockQuote>{children}</BlockQuote>
            ),
            a: ({ children, href, ...props }) => (
              <LinkWrapper link={href || ""}>{children}</LinkWrapper>
            ),
            h1: ({ level, children, ...props }) => (
              <Header level={level}>{children}</Header>
            ),
            h2: ({ level, children, ...props }) => (
              <Header level={level}>{children}</Header>
            ),
            h3: ({ level, children, ...props }) => (
              <Header level={level}>{children}</Header>
            ),
            h4: ({ level, children, ...props }) => (
              <Header level={level}>{children}</Header>
            ),
            h5: ({ level, children, ...props }) => (
              <Header level={level}>{children}</Header>
            ),
            h6: ({ level, children, ...props }) => (
              <Header level={level}>{children}</Header>
            ),
          }}
        >
          {article.body}
        </ReactMarkdown>
      </VStack>
    </>
  );
}
