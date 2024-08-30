import {GetStaticProps} from "next";
import {getAllPosts, getArtPage} from "../../services/ContentApi";
import {ArtPageDTO, PostDTO} from "../../services/ContentTypes";
import {Box, Flex, HStack, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import WithLink from "../../components/core/hocs/WithLink";
import PostCard from "../../components/content/posts/PostCard";
import {headerFont} from "../../styles/fonts";
import {sortPostsNewestFirst} from "../../services/ContentUtils";
import Markdown from "../../components/core/elements/Markdown";
import EmailSubscriptionFooter from "../../components/core/interactive/EmailSubscriptionFooter";
import AuthorFooter from "../../components/content/AuthorFooter";

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
            paddingX={["1rem", "2.5rem"]}
          >
            {page.title}
          </Text>
        </HStack>
        <Flex
          fontFamily={headerFont.style.fontFamily}
          fontSize={"large"}
          paddingX={["1rem", "2.5rem"]}
          paddingY={"2rem"}
          maxWidth={"45rem"}
        >
          <Markdown markdown={page.description}/>
        </Flex>
        <SimpleGrid
          columns={[1, 1, 2, 3]}
          spacing={"2.3rem"}
          paddingY={"1.7rem"}
          paddingX={["1rem", "2.5rem"]}
        >
          {posts.map((post) => (
            <WithLink key={post.slug} link={"/posts/" + post.slug}>
              <PostCard post={post}></PostCard>
            </WithLink>
          ))}
        </SimpleGrid>
        <Box height={"2rem"}></Box>
        <AuthorFooter author={page.author}/>
        <Box padding={"1.7rem"}>
          <EmailSubscriptionFooter/>
        </Box>
      </VStack>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  let sortedPosts = posts.sort(sortPostsNewestFirst);
  const artPage = await getArtPage();
  return {props: {posts: sortedPosts, page: artPage}};
};
