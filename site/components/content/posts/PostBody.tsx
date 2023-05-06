import { PostDTO } from "../../../services/ContentTypes";
import { Box, Text } from "@chakra-ui/react";
import ExternalLink from "../../core/interactive/ExternalLink";

export default function PostBody({ post }: { post: PostDTO }) {
  return (
    <>
      <Box paddingTop={"1rem"}>
        <Text>{post.message}</Text>
        {post.link ? (
          <>
            <Box marginTop={"1rem"}>
              <ExternalLink link={post.link}></ExternalLink>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
