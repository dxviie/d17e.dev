import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getAllArticles, getArticleBySlug } from "../../services/ContentApi";
import { ParsedUrlQuery } from "querystring";
import { ArticleDTO } from "../../services/ContentTypes";
import ReactMarkdown from "react-markdown";
import ArticleCover from "../../components/content/blog/ArticleCover";
import ArticleHeader from "../../components/content/blog/ArticleHeader";
import { Stack, useColorModeValue, VStack } from "@chakra-ui/react";
import ArticleFooter from "../../components/content/blog/ArticleFooter";
import {
  BG_COLOR_DARK,
  BG_COLOR_LIGHT,
  COLOR_DARK,
  COLOR_LIGHT,
} from "../../styles/d17eTheme";
import { bodyFont } from "../../styles/fonts";

const Blog = (props: { article: ArticleDTO }) => {
  const color = useColorModeValue(COLOR_LIGHT, COLOR_DARK);
  const bg = useColorModeValue(BG_COLOR_LIGHT, BG_COLOR_DARK);
  const article = props.article as ArticleDTO;
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (!article.slug) {
    router.push("/404");
  }
  return (
    <Stack width={"100vw"} padding={"0 1.7rem"} maxWidth={"45rem"}>
      <ArticleCover article={article}></ArticleCover>
      <ArticleHeader article={article}></ArticleHeader>

      <VStack
        paddingTop={"1rem"}
        alignItems={"flex-start"}
        fontFamily={bodyFont.style.fontFamily}
      >
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </VStack>

      <ArticleFooter article={article}></ArticleFooter>
    </Stack>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const articles = await getAllArticles();
  const paths = articles.map((article) => ({
    params: { slug: article.slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const article = await getArticleBySlug(slug);
  return { props: { article: article } };
};

export default Blog;
