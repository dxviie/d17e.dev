import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPosts, getPostBySlug} from "../../services/ContentApi";
import {ParsedUrlQuery} from "querystring";
import {PostDTO} from "../../services/ContentTypes";
import {Spacer, Stack} from "@chakra-ui/react";
import PostCover from "../../components/content/posts/PostCover";
import PostHeader from "../../components/content/posts/PostHeader";
import PostBody from "../../components/content/posts/PostBody";
import {sortPostsNewestFirst} from "../../services/ContentUtils";
import PostPrevNext from "../../components/content/posts/PostPrevNext";
import EmailSubscriptionFooter from "../../components/core/interactive/EmailSubscriptionFooter";
import Head from "next/head";
import {CONTENT_BASE_URL} from "../../services/Constants";

const Post = (props: {
  post: PostDTO;
  prevPost?: PostDTO;
  nextPost?: PostDTO;
}) => {
  const post = props.post as PostDTO;
  const prevPost = props.prevPost as PostDTO;
  const nextPost = props.nextPost as PostDTO;
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.message}/>
        <meta property="og:title" content={post.title}/>
        <meta property="og:description" content={post.message}/>
        <meta
          property="og:image"
          content={CONTENT_BASE_URL + post.content.url}
        />
        <meta
          property="og:url"
          content={`https://www.d17e.dev/posts/${post.slug}`}
        />
      </Head>
      <Stack
        width={"100vw"}
        padding={"0 1.7rem"}
        maxWidth={"45rem"}
        minH={"50vh"}
      >
        <Spacer/>
        <PostCover post={post}/>
        <PostHeader post={post}/>
        <PostBody post={post}/>
        <Spacer/>
        <PostPrevNext nextPost={nextPost} prevPost={prevPost}/>
        <EmailSubscriptionFooter/>
      </Stack>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: {slug: post.slug},
  }));
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as IParams;
  const post = await getPostBySlug(slug);
  let next = null,
    prev = null;
  const posts = await getAllPosts();
  if (posts) {
    const sortedPosts = posts.sort(sortPostsNewestFirst);
    const index = sortedPosts.findIndex((value) => value.id === post.id);
    if (index >= 1) {
      next = posts[index - 1];
    }
    if (index > -1 && index < posts.length - 1) {
      prev = posts[index + 1];
    }
  }

  return {props: {post: post, prevPost: prev, nextPost: next}};
};

export default Post;
