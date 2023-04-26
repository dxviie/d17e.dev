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
import { Stack } from "@chakra-ui/react";
import blurHashToDataURL from "../../services/BlurHashTransformer";

const Post = (props: { post: PostDTO }) => {
  const post = props.post as PostDTO;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  // if (!post.slug && router.) {
  //   router.push("/404");
  // }
  return (
    <Stack>
      <Image
        loader={imageLoader}
        src={post.content.url}
        layout={"fill"}
        objectFit={"cover"}
        alt={post.content.alternativeText}
        placeholder={"blur"}
        blurDataURL={blurHashToDataURL(post.content.blurhash)}
      />
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
