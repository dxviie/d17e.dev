import { GetStaticProps } from "next";
import { getAllArticles } from "../../services/ContentApi";
import { ArticleDTO } from "../../services/ContentTypes";
import { useRouter } from "next/router";
import ArticleCard from "../../components/blog/ArticleCard";
import { SimpleGrid } from "@chakra-ui/react";

export default function BlogOverview(props: { articles: ArticleDTO[] }) {
  const articles = props.articles as ArticleDTO[];
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing={5} padding={3}>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article}></ArticleCard>
        ))}
      </SimpleGrid>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();
  return { props: { articles: articles } };
};