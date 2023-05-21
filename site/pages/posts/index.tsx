import { GetStaticProps } from "next";
import { getAllPosts } from "../../services/ContentApi";
import { PostDTO } from "../../services/ContentTypes";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import WithLink from "../../components/core/hocs/WithLink";
import PostCard from "../../components/content/posts/PostCard";
import { headerFont } from "../../styles/fonts";
import { sortPostsNewestFirst } from "../../services/ContentUtils";

export default function PostOverview(props: { posts: PostDTO[] }) {
  const posts = props.posts.sort(sortPostsNewestFirst) as PostDTO[];
  return (
    <>
      <VStack>
        <Text
          fontFamily={headerFont.style.fontFamily}
          fontSize={"xx-large"}
          margin={"1rem"}
        >
          And sometimes, I make art
        </Text>
        <SimpleGrid
          columns={[1, 1, 2, 3]}
          spacing={"2.3rem"}
          paddingY={"1.7rem"}
          paddingX={"2.5rem"}
        >
          {posts.map((post) => (
            <WithLink key={post.slug} link={"/posts/" + post.slug}>
              <PostCard post={post}></PostCard>
            </WithLink>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return { props: { posts: posts } };
};
