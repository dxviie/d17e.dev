import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug } from "../../services/ContentApi";
import { ParsedUrlQuery } from "querystring";
import { PostDTO } from "../../services/ContentTypes";
import { Spacer, Stack, useColorModeValue } from "@chakra-ui/react";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../styles/d17eTheme";
import PostCover from "../../components/content/posts/PostCover";
import PostHeader from "../../components/content/posts/PostHeader";
import PostBody from "../../components/content/posts/PostBody";

const Post = (props: { post: PostDTO }) => {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  const post = props.post as PostDTO;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  // if (!post.slug && router.) {
  //   router.push("/404");
  // }
  return (
    <Stack
      width={"100vw"}
      padding={"0 1.7rem"}
      maxWidth={"45rem"}
      minH={"50vh"}
    >
      <Spacer />
      <PostCover post={post} />
      <PostHeader post={post} />
      <PostBody post={post} />
      <Spacer></Spacer>
    </Stack>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const post = await getPostBySlug(slug);
  return { props: { post: post } };
};

export default Post;
