import {GetStaticPaths, GetStaticProps} from "next";
import {getAllArticles, getArticleBySlug} from "../../services/ContentApi";
import {ParsedUrlQuery} from "querystring";
import {ArticleDTO} from "../../services/ContentTypes";
import ArticleCover from "../../components/content/blog/ArticleCover";
import ArticleHeader from "../../components/content/blog/ArticleHeader";
import {Box, Stack, Text} from "@chakra-ui/react";
import ArticleBody from "../../components/content/blog/ArticleBody";
import ArticlePrevNext from "../../components/content/blog/ArticlePrevNext";
import {sortArticlesNewestFirst} from "../../services/ContentUtils";
import EmailSubscriptionFooter from "../../components/core/interactive/EmailSubscriptionFooter";
import {bodyFont} from "../../styles/fonts";
import Head from "next/head";
import {DIRECTUS_URL} from "../../services/Constants";

const Blog = (props: {
  article: ArticleDTO;
  prevArticle?: ArticleDTO;
  nextArticle?: ArticleDTO;
}) => {
  const article = props.article as ArticleDTO;
  const prevArticle = props.prevArticle as ArticleDTO;
  const nextArticle = props.nextArticle as ArticleDTO;
  return (
    <>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.description}/>
        <meta property="og:title" content={article.title}/>
        <meta property="og:type" content="article"/>
        <meta property="og:description" content={article.description}/>
        <meta property="og:image" content={DIRECTUS_URL + article.cover.url}/>
        <meta property="og:url" content={`https://www.d17e.dev/blog/${article.slug}`}/>
      </Head>
      <Stack width={"100vw"} padding={"0 1.7rem"} maxWidth={"45rem"}>
        <ArticleCover article={article}/>
        <ArticleHeader article={article}/>
        <Box height={".5rem"}/>
        <hr/>
        <Text alignItems={"flex-start"}
              fontFamily={bodyFont.style.fontFamily}
              style={{wordWrap: "break-word"}}
              fontStyle={"italic"}>
          {article.description}
        </Text>
        <hr/>
        {/*<Box height={"0.3rem"}/>*/}
        <ArticleBody article={article}/>
        <ArticlePrevNext nextArticle={nextArticle} prevArticle={prevArticle}/>
        <EmailSubscriptionFooter/>
      </Stack>
    </>
  );
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const articles = await getAllArticles();
  const paths = articles.map((article) => ({
    params: {slug: article.slug},
  }));
  return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async (context) => {
  const {slug} = context.params as IParams;
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
  return {props: {article: article, prevArticle: prev, nextArticle: next}};
};

export default Blog;
