import { GetStaticProps } from "next";
import { getAllArticles } from "../../services/ContentApi";
import { ArticleDTO } from "../../services/ContentTypes";
import { SimpleGrid, Text, VStack } from "@chakra-ui/react";
import ArticleListItem from "../../components/content/blog/ArticleListItem";
import { headerFont } from "../../styles/fonts";

export default function BlogOverview(props: { articles: ArticleDTO[] }) {
  const articles = props.articles as ArticleDTO[];
  return (
    <>
      <VStack>
        <Text
          fontFamily={headerFont.style.fontFamily}
          fontSize={"xx-large"}
          margin={"1rem"}
        >
          Hello,...
          <br /> Sometimes, I write
        </Text>
        <SimpleGrid
          columns={1}
          maxWidth={"45rem"}
          spacingY={"2rem"}
          padding={"1.7rem"}
        >
          {articles.map((article) => (
            <ArticleListItem
              key={article.slug}
              article={article}
            ></ArticleListItem>
          ))}
        </SimpleGrid>
      </VStack>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();
  return { props: { articles: articles } };
};
