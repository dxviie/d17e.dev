import { useEffect, useState } from "react";
import { Components } from "react-markdown/lib/ast-to-react";
import BlockQuote from "./BlockQuote";
import LinkWrapper from "../hocs/LinkWrapper";
import Header from "./Header";
import ReactMarkdown from "react-markdown";

export default function Markdown({
  markdown,
  invertedColors = false,
}: {
  markdown: string;
  invertedColors?: boolean;
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const components: Components = hydrated
    ? {
        blockquote: ({ children, ...props }) => (
          <BlockQuote>{children}</BlockQuote>
        ),
        a: ({ children, href, ...props }) => (
          <LinkWrapper link={href || ""} invertedColors={invertedColors}>
            {children}
          </LinkWrapper>
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
        p: ({ children, ...props }) => (
          //   modified lineHeight based on https://www.thegoodlineheight.com/
          <div
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-line",
              lineHeight: "22pt",
              marginTop: "1rem",
            }}
          >
            {children}
          </div>
        ),
      }
    : {};
  return (
    <ReactMarkdown className={"d17e-markdown"} components={components}>
      {markdown}
    </ReactMarkdown>
  );
}