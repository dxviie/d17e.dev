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
        p: ({ children, ...props }) => {
          const iFrameTag = getIFrameTag(children);
          if (iFrameTag) {
            console.log("Dangerously set iFrameTag", iFrameTag);
            return (
              <div
                className={"iframe-container"}
                dangerouslySetInnerHTML={{ __html: iFrameTag }}
              />
            );
          }
          const pWithIdTag = getPWithIdTag(children);
          if (pWithIdTag) {
            console.log("Dangerously set pWithIdTag", pWithIdTag);
            return (
              <div
                className={"p-with-id-container"}
                dangerouslySetInnerHTML={{ __html: pWithIdTag }}
              />
            );
          }
          const strikeThrough = replaceStrikethrough(children);
          if (strikeThrough) {
            console.log("Dangerously set strikeThrough", strikeThrough);
            return (
              <div
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-line",
                  lineHeight: "22pt",
                  marginTop: "1rem",
                }}
                dangerouslySetInnerHTML={{ __html: strikeThrough }}
              />
            );
          }
          return (
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
          );
        },
      }
    : {};
  return (
    <ReactMarkdown className={"d17e-markdown"} components={components}>
      {markdown}
    </ReactMarkdown>
  );
}

function getIFrameTag(node: any) {
  if (typeof node[0] !== "string") {
    return undefined;
  }
  const trimmedText = node[0].trim();
  const iframeRegex = /^<iframe\s+.*<\/iframe>$/i;
  if (iframeRegex.test(trimmedText)) {
    return trimmedText;
  }
  return undefined;
}

function getPWithIdTag(node: any) {
  // TODO make a TL;DR field for an article and add link + content if available
  if (typeof node[0] !== "string") {
    return undefined;
  }
  const trimmedText = node[0].trim();
  const pIdRegex = /^<p id=.*<\/p>$/i;
  if (pIdRegex.test(trimmedText)) {
    return trimmedText;
  }
  return undefined;
}

function replaceStrikethrough(node: any) {
  if (typeof node[0] !== "string") {
    return undefined;
  }
  const trimmedText = node[0].trim();
  const strikethroughRegex = /~(.*?)~/g;
  if (strikethroughRegex.test(trimmedText)) {
    return trimmedText.replace(/~(.*?)~/g, "<del>$1</del>");
  }
  return undefined;
}
