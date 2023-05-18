import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getAllArticles, getArticleBySlug } from "../../services/ContentApi";
import { ParsedUrlQuery } from "querystring";
import { ArticleDTO } from "../../services/ContentTypes";
import ArticleCover from "../../components/content/blog/ArticleCover";
import ArticleHeader from "../../components/content/blog/ArticleHeader";
import { Stack } from "@chakra-ui/react";
import ArticleFooter from "../../components/content/blog/ArticleFooter";
import ArticleBody from "../../components/content/blog/ArticleBody";
import Loading from "../../components/core/Loading";
import ArticlePrevNext from "../../components/content/blog/ArticlePrevNext";
import { sortArticlesNewestFirst } from "../../services/ContentUtils";
import useThemeColors from "../../styles/useThemeColors";

const Blog = (props: {
  article: ArticleDTO;
  prevArticle?: ArticleDTO;
  nextArticle?: ArticleDTO;
}) => {
  const colors = useThemeColors();
  const article = props.article as ArticleDTO;
  const prevArticle = props.prevArticle as ArticleDTO;
  const nextArticle = props.nextArticle as ArticleDTO;
  const router = useRouter();
  if (router.isFallback) {
    return <Loading />;
  }
  if (!article.slug) {
    // TODO: figure out what to do with this
    router.push("/404");
  }
  return (
    <Stack width={"100vw"} padding={"0 1.7rem"} maxWidth={"45rem"}>
      <ArticleCover article={article} />
      <ArticleHeader article={article} />
      <ArticleBody article={article} />
      <ArticleFooter article={article} />
      <ArticlePrevNext nextArticle={nextArticle} prevArticle={prevArticle} />
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
  let next = null,
    prev = null;
  const articles = await getAllArticles();
  if (articles) {
    const sortedArticles = articles.sort(sortArticlesNewestFirst);
    const index = sortedArticles.findIndex((value) => value.id === article.id);
    if (index >= 1) {
      next = articles[index - 1];
    }
    if (index > -1 && index < articles.length - 1) {
      prev = articles[index + 1];
    }
  }
  return { props: { article: article, prevArticle: prev, nextArticle: next } };
};

export default Blog;
