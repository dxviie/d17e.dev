import {GetStaticProps} from "next";
import {getAllArticles, getAllPosts, getLandingPage,} from "../services/ContentApi";
import {sortArticlesNewestFirst, sortPostsNewestFirst,} from "../services/ContentUtils";
import {ArticleDTO, LandingPageDTO, PostDTO} from "../services/ContentTypes";
import CodeBlock from "../components/content/home/CodeBlock";
import ContactBlock from "../components/content/home/ContactBlock";
import IntroBlock from "../components/content/home/IntroBlock";
import ArtBlock from "../components/content/home/ArtBlock";
import WritingBlock from "../components/content/home/WritingBlock";
import Head from "next/head";
/*
// TODO get rid of SVGs in our JS bundles: https://kurtextrem.de/posts/svg-in-js

   _ ___ ___         _
 _| |_  |_  |___   _| |___ _ _
| . |_| |_| | -_|_| . | -_| | |
|___|_____|_|___|_|___|___|\_/

     _ _ _____         _
  __| / |___  |__   __| | _____   __
 / _` | |  / / _ \ / _` |/ _ \ \ / /
| (_| | | / /  __/| (_| |  __/\ V /
 \__,_|_|/_/ \___(_)__,_|\___| \_/

       _ __ ______        _
     | /_ |____  |      | |
   __| || |   / /__   __| | _____   __
  / _` || |  / / _ \ / _` |/ _ \ \ / /
 | (_| || | / /  __/| (_| |  __/\ V /
  \__,_||_|/_/ \___(_)__,_|\___| \_/
 */

export default function Home({
                               landingPage,
                               posts,
                               articles,
                             }: {
  landingPage: LandingPageDTO;
  posts: PostDTO[];
  articles: ArticleDTO[];
}) {
  return (
    <>
      <Head>
        <meta property="og:title" content="d17e.dev - code. art. ideas."/>
        <meta property="og:type" content="website"/>
        <meta property="og:image" content="https://www.d17e.dev/avatar_me_vera_round.png"/>
        <meta property="og:url" content={`https://www.d17e.dev`}/>
      </Head>
      <IntroBlock/>
      <CodeBlock
        description={landingPage.codeDescription}
        author={landingPage.author}
      />
      <ArtBlock description={landingPage.artDescription} posts={posts}/>
      <WritingBlock
        description={landingPage.ideasDescription}
        articles={articles}
      />
      <ContactBlock description={landingPage.contactDescription}/>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const articles = await getAllArticles();
  let featuredArticles = null;
  if (articles) {
    featuredArticles = articles.sort(sortArticlesNewestFirst).slice(0, 3);
  }
  const posts = await getAllPosts();
  let featuredPosts = null;
  if (posts) {
    featuredPosts = posts.sort(sortPostsNewestFirst).slice(0, 3);
  }
  const landingPage = await getLandingPage();
  // TODO support for the featured posts/articles from the landing page
  return {
    props: {
      landingPage: landingPage,
      articles: featuredArticles,
      posts: featuredPosts,
    },
  };
};
