import { GetStaticProps } from "next";
import { getAllPosts } from "../../services/ContentApi";
import { PostDTO } from "../../services/ContentTypes";
import { useRouter } from "next/router";
import { Card, CardBody, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

export default function PostOverview(props: { posts: PostDTO[] }) {
  const posts = props.posts as PostDTO[];
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={5} padding={3}>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={"/posts/" + encodeURIComponent(post.slug)}
          >
            <Card key={post.slug} size={"sm"}>
              <CardBody>{post.title}</CardBody>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();
  return { props: { posts: posts } };
};
