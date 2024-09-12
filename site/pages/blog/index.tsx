import {GetStaticProps} from "next";
import {getAllArticles, getIdeasPage} from "../../services/ContentApi";
import {ArticleDTO, IdeasPageDTO} from "../../services/ContentTypes";
import {Box, Flex, HStack, SimpleGrid, Text, VStack} from "@chakra-ui/react";
import ArticleListItem from "../../components/content/blog/ArticleListItem";
import {headerFont} from "../../styles/fonts";
import Markdown from "../../components/core/elements/Markdown";
import EmailSubscriptionFooter from "../../components/core/interactive/EmailSubscriptionFooter";
import {sortArticlesNewestFirst} from "../../services/ContentUtils";
import AuthorFooter from "../../components/content/AuthorFooter";

export default function BlogOverview(props: {
  articles: ArticleDTO[];
  page: IdeasPageDTO;
}) {
  const articles = props.articles as ArticleDTO[];
  const page = props.page as IdeasPageDTO;
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
  const articles = await getAllArticles();
  let sortedArticles = articles.sort(sortArticlesNewestFirst);
  const ideasPage = await getIdeasPage();
  return {props: {articles: sortedArticles, page: ideasPage}};
};
