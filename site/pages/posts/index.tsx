import { GetStaticProps } from "next";
import { getAllPosts, getArtPage } from "../../services/ContentApi";
import { ArtPageDTO, PostDTO } from "../../services/ContentTypes";
import { Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import WithLink from "../../components/core/hocs/WithLink";
import PostCard from "../../components/content/posts/PostCard";
import { headerFont } from "../../styles/fonts";
import { sortPostsNewestFirst } from "../../services/ContentUtils";
import Avatar from "../../components/core/elements/Avatar";
import Markdown from "../../components/core/elements/Markdown";

export default function PostOverview(props: {
  posts: PostDTO[];
  page: ArtPageDTO;
}) {
  const posts = props.posts.sort(sortPostsNewestFirst) as PostDTO[];
  const page = props.page as ArtPageDTO;
  return (
    <>
      <VStack>
        <HStack>
          <Text
            fontFamily={headerFont.style.fontFamily}
            fontSize={"xx-large"}
            margin={"1rem"}
          >
            {page.title}
          </Text>
          <Avatar author={page.author} size={"5rem"} />
        </HStack>
        <Flex
          fontFamily={headerFont.style.fontFamily}
          fontSize={"large"}
          margin={"1rem"}
        >
          <Markdown markdown={page.description} />
        </Flex>
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
  const artPage = await getArtPage();
  return { props: { posts: posts, page: artPage } };
};
