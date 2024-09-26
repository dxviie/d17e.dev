import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPosts, getPostBySlug} from "../../services/ContentApi";
import {ParsedUrlQuery} from "querystring";
import {PostDTO} from "../../services/ContentTypes";
import {HStack, Spacer, Stack} from "@chakra-ui/react";
import PostCover from "../../components/content/posts/PostCover";
import PostHeader from "../../components/content/posts/PostHeader";
import PostBody from "../../components/content/posts/PostBody";
import {sortPostsNewestFirst} from "../../services/ContentUtils";
import PostPrevNext from "../../components/content/posts/PostPrevNext";
import EmailSubscriptionFooter from "../../components/core/interactive/EmailSubscriptionFooter";
import Head from "next/head";
import ArrowLink from "../../components/core/interactive/ArrowLink";

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
        <meta property="og:type" content={"article"}/>
        <meta property="og:description" content={post.message}/>
        <meta
          property="og:image"
          content={post.content.url}
        />
        <meta
          property="og:url"
          content={`https://www.d17e.dev/posts/${post.slug}`}
        />
      </Head>
      <Stack
        width={"100vw"}
        padding={["0 1.2rem", "0 1.7rem"]}
        maxWidth={"45rem"}
        minH={"50svh"}
      >
        <Spacer/>
        <PostHeader post={post}/>
        <Spacer minH={"1rem"}/>
        <HStack position={"relative"} width={"110%"} left={"-5%"}>
          {nextPost ? <ArrowLink link={nextPost.slug} arrowOnly={true} arrow={"left"}/> : <></>}
          <PostCover post={post}/>
          {prevPost ? <ArrowLink link={prevPost.slug} arrowOnly={true} arrow={"right"}/> : <></>}
        </HStack>
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
    const index = sortedPosts.findIndex((value) => value.slug === post.slug);
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
