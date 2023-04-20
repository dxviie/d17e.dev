import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import {
  getAllArticles,
  getArticleBySlug,
  imageLoader,
} from "../../services/ContentApi";
import { ParsedUrlQuery } from "querystring";
import { ArticleDTO } from "../../services/ContentTypes";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Cover from "../../components/blog/Cover";
import Title from "../../components/blog/Title";
import { Stack } from "@chakra-ui/react";
import PublishDetails from "../../components/blog/PublishDetails";
import ReadingTime from "../../components/blog/ReadingTime";

const Blog = (props: { article: ArticleDTO }) => {
  const article = props.article as ArticleDTO;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Stack>
      <Cover
        url={article.cover.url}
        alternativeText={article.cover.alternativeText}
      ></Cover>
      <Title title={article.title}></Title>
      <PublishDetails
        createdAt={article.createdAt}
        updatedAt={article.updatedAt}
        publishedAt={article.publishDtm}
      >
        <ReadingTime content={article.body}></ReadingTime>
      </PublishDetails>

      <p>{article.description}</p>
      <ReactMarkdown>{article.body}</ReactMarkdown>
      <div>
        <h3>Tags</h3>
        <ul>
          {article.tags.map((tag) => (
            <li key={tag.name}>{tag.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Author</h3>
        {article.author.name}
        <Image
          loader={imageLoader}
          src={article.author.avatar.url}
          width={100}
          height={100}
          alt={article.author.avatar.alternativeText}
        />
      </div>
      <div>
        <h3>Gallery</h3>
        {article.gallery.map((image) => (
          <Image
            key={image.url}
            loader={imageLoader}
            src={image.url}
            width={100}
            height={100}
            alt={image.alternativeText}
          />
        ))}
      </div>
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
