import { GetStaticProps } from "next";
import { getAllArticles } from "../../services/ContentApi";
import Link from "next/link";
import { ArticleDTO } from "../../services/ContentTypes";
import { useRouter } from "next/router";

export default function BlogOverview(props: { articles: ArticleDTO[] }) {
  const articles = props.articles as ArticleDTO[];
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <Link key={article.slug} href={"blog/" + article.slug}>
          {article.title + "-->"}
        </Link>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllArticles();
  return { props: { articles: articles } };
};
