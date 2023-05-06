import { PostDTO } from "../../../services/ContentTypes";
import { Box, Text } from "@chakra-ui/react";
import ArrowLink from "../../core/interactive/ArrowLink";

export default function PostBody({ post }: { post: PostDTO }) {
  return (
    <>
      <Box paddingTop={"1rem"}>
        <Text>{post.message}</Text>
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
