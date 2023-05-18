import { GetStaticProps } from "next";
import IntroBlock from "../components/content/home/IntroBlock";
import ArtBlock from "../components/content/home/ArtBlock";
import WritingBlock from "../components/content/home/WritingBlock";
import ContactBlock from "../components/content/home/ContactBlock";
import { getAllArticles, getAllPosts } from "../services/ContentApi";
import {
  sortArticlesNewestFirst,
  sortPostsNewestFirst,
} from "../services/ContentUtils";
import { ArticleDTO, PostDTO } from "../services/ContentTypes";
import CodeBlock from "../components/content/home/CodeBlock";

export default function Home({
  posts,
  articles,
}: {
  posts: PostDTO[];
  articles: ArticleDTO[];
}) {
  return (
    <>
      <IntroBlock />
      <CodeBlock />
      <ArtBlock posts={posts} />
      <WritingBlock articles={articles} />
      <ContactBlock />
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
  return { props: { articles: featuredArticles, posts: featuredPosts } };
};
