import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  getAllPosts,
  getPostBySlug,
  imageLoader,
} from "../../services/ContentApi";
import { ParsedUrlQuery } from "querystring";
import { PostDTO } from "../../services/ContentTypes";
import Image from "next/image";
import { Box, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import blurHashToDataURL from "../../services/BlurHashTransformer";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../styles/d17eTheme";
import { headerFont } from "../../styles/fonts";
import ExternalLink from "../../components/core/interactive/ExternalLink";

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
      <Box position={"relative"} width={"100%"} style={{ aspectRatio: "1/1" }}>
        <Image
          loader={imageLoader}
          src={post.content.url}
          fill={true}
          style={{ objectFit: "contain" }}
          alt={post.content.alternativeText}
          placeholder={"blur"}
          blurDataURL={blurHashToDataURL(post.content.blurhash)}
        />
      </Box>

      <Box paddingTop={"1rem"}>
        <Text
          fontFamily={headerFont.style.fontFamily}
          fontSize={["large", "x-large"]}
          lineHeight={["1rem", "1.9rem"]}
          marginTop={"3rem"}
          marginLeft={"-1rem"}
          padding={"2px .5rem"}
          display={"inline"}
          color={bg}
          bg={color}
        >
          {post.title}
        </Text>
      </Box>

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
