import { PostDTO } from "../../../services/ContentTypes";
import { Box } from "@chakra-ui/react";
import ArrowLink from "../../core/interactive/ArrowLink";
import Markdown from "../../core/elements/Markdown";

export default function PostBody({ post }: { post: PostDTO }) {
  return (
    <>
      <Box paddingTop={"1rem"}>
        <Markdown markdown={post.message} />
        {post.link ? (
          <>
            <Box marginTop={"1rem"}>
              <ArrowLink link={post.link} arrow={"right"}></ArrowLink>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
