import {
  ArticleDTO,
  AuthorDTO,
  defaultAuthor,
  defaultMedia,
  defaultTag,
  LandingPageDTO,
  MediaDTO,
  PostDTO,
  TagDTO,
} from "./ContentTypes";
import { GraphQLClient } from "graphql-request";
import {
  ArticleEntity,
  ArticleEntityResponse,
  ArticleEntityResponseCollection,
  AuthorEntity,
  LandingPageEntityResponse,
  Maybe,
  PostEntity,
  PostEntityResponseCollection,
  TagEntity,
  UploadFileEntity,
} from "../strapi/graphql/codegen/graphql";
import {
  GET_ARTICLE_BY_ID,
  GET_ARTICLE_BY_SLUG,
  GET_ARTICLES_QUERY,
} from "../strapi/graphql/queries/articles";
import { ID } from "graphql-ws";
import { CONTENT_BASE_URL, GRAPHQL_API_ENDPOINT } from "./Constants";
import {
  GET_POST_BY_SLUG,
  GET_POSTS_QUERY,
} from "../strapi/graphql/queries/posts";
import { GET_LANDING_PAGE_QUERY } from "../strapi/graphql/queries/landingPage";

/*****************************************************************
 * NextJS image loader for strapi-hosted resources & blurhash formatter
 *****************************************************************/
export const imageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string => {
  console.debug("unused parameter quality: ", quality);
  let filePath = src.startsWith("/")
    ? src.toLowerCase()
    : "/" + src.toLowerCase();
  if (filePath.endsWith(".jpg") || filePath.endsWith(".png")) {
    const sizePrefix =
      width <= 155
        ? "thumbnail_"
        : width <= 500
        ? "small_"
        : width <= 750
        ? "medium_"
        : "";
    const lastPathIndex = filePath.lastIndexOf("/");
    const path = filePath.slice(0, lastPathIndex);
    const file = filePath.slice(lastPathIndex + 1);
    filePath = path + "/" + sizePrefix + file;
  }
  return `${CONTENT_BASE_URL}${filePath}`;
};

/*****************************************************************
 * GraphQL client & fetchers
 *****************************************************************/
const graphQLClient = new GraphQLClient(GRAPHQL_API_ENDPOINT);
const articlesFetcher = (query: string) =>
  graphQLClient.request<{ articles: ArticleEntityResponseCollection }>(query);
const articleByIdFetcher = (query: string, id: ID) =>
  graphQLClient.request<{ article: ArticleEntityResponse }>(query, { id: id });
const articleBySlugFetcher = (query: string, slug: string) =>
  graphQLClient.request<{ articles: ArticleEntityResponseCollection }>(query, {
    slug: slug,
  });
const postsFetcher = (query: string) =>
  graphQLClient.request<{ posts: PostEntityResponseCollection }>(query);
const postBySlugFetcher = (query: string, slug: string) =>
  graphQLClient.request<{ posts: PostEntityResponseCollection }>(query, {
    slug: slug,
  });
const landingPageFetcher = (query: string) =>
  graphQLClient.request<{ landingPage: LandingPageEntityResponse }>(query);

/******************************************************************
 * Content APIs -- Landing Page
 *****************************************************************/
export const getLandingPage = async (): Promise<LandingPageDTO> => {
  const landingPageRaw = await landingPageFetcher(GET_LANDING_PAGE_QUERY);
  if (!landingPageRaw.landingPage || !landingPageRaw.landingPage.data) {
    throw new Error("Fetching landing page returned nothing...");
  }
  return mapLandingPage(landingPageRaw.landingPage);
};
/******************************************************************
 * Content APIs -- Articles
 *****************************************************************/
export const getAllArticles = async (): Promise<ArticleDTO[]> => {
  const articlesRaw = await articlesFetcher(GET_ARTICLES_QUERY);
  if (!articlesRaw.articles || !articlesRaw.articles.data) {
    throw Error("Fetching articles returned nothing...");
  }
  return articlesRaw.articles.data.map(mapArticle);
};

export const getArticleById = async (id: ID): Promise<ArticleDTO> => {
  const articleRaw = await articleByIdFetcher(GET_ARTICLE_BY_ID, id);
  if (!articleRaw.article || !articleRaw.article.data) {
    throw Error("No article available for id " + id);
  }
  return mapArticle(articleRaw.article.data);
};

export const getArticleBySlug = async (slug: string): Promise<ArticleDTO> => {
  const articleRaw = await articleBySlugFetcher(GET_ARTICLE_BY_SLUG, slug);
  if (
    !articleRaw.articles ||
    !articleRaw.articles.data ||
    !articleRaw.articles.data[0]
  ) {
    throw Error("No article available for slug " + slug);
  }
  return mapArticle(articleRaw.articles.data[0]);
};

/******************************************************************
 * Content APIs -- Articles
 *****************************************************************/

export const getAllPosts = async (): Promise<PostDTO[]> => {
  const postsRaw = await postsFetcher(GET_POSTS_QUERY);
  if (!postsRaw.posts || !postsRaw.posts.data) {
    throw Error("Fetching posts returned nothing...");
  }
  return postsRaw.posts.data.map(mapPost);
};

export const getPostBySlug = async (slug: string): Promise<PostDTO> => {
  const postRaw = await postBySlugFetcher(GET_POST_BY_SLUG, slug);
  if (!postRaw.posts || !postRaw.posts.data || !postRaw.posts.data[0]) {
    throw Error("No post available for slug " + slug);
  }
  return mapPost(postRaw.posts.data[0]);
};

/*****************************************************************
 * Object mappers
 *****************************************************************/
const mapArticle = (articleRaw: ArticleEntity): ArticleDTO => {
  return {
    id: articleRaw.id || "",
    slug: articleRaw.attributes?.slug || "",
    title: articleRaw.attributes?.title || "",
    description: articleRaw.attributes?.description || "",
    body: articleRaw.attributes?.body || "",
    author: mapAuthor(articleRaw.attributes?.author?.data),
    cover: mapMedia(articleRaw.attributes?.cover?.data),
    gallery: mapMedias(articleRaw.attributes?.gallery?.data),
    tags: mapTags(articleRaw.attributes?.tags?.data),
    createdAt: articleRaw.attributes?.createdAt,
    updatedAt: articleRaw.attributes?.updatedAt,
    publishDtm: articleRaw.attributes?.publishDtm,
  };
};

const mapPost = (postRaw: PostEntity): PostDTO => {
  return {
    id: postRaw.id || "",
    slug: postRaw.attributes?.slug || "",
    title: postRaw.attributes?.title || "",
    message: postRaw.attributes?.message || "",
    link: postRaw.attributes?.link || "",
    author: mapAuthor(postRaw.attributes?.author?.data),
    createdAt: postRaw.attributes?.createdAt,
    content: mapMedia(postRaw.attributes?.content?.data),
  };
};

const mapAuthor = (authorRaw: Maybe<AuthorEntity> | undefined): AuthorDTO => {
  if (!authorRaw) return defaultAuthor();
  return {
    avatar: mapMedia(authorRaw.attributes?.avatar.data),
    name: authorRaw.attributes?.name || "",
  };
};

const mapMedias = (
  galleryRaw: Maybe<UploadFileEntity[]> | undefined
): MediaDTO[] => {
  if (!galleryRaw) return [];
  return galleryRaw.map(mapMedia);
};

const mapMedia = (mediaRaw: Maybe<UploadFileEntity> | undefined): MediaDTO => {
  if (!mediaRaw) return defaultMedia();
  return {
    alternativeText: mediaRaw.attributes?.alternativeText || "",
    name: mediaRaw.attributes?.name || "",
    url: mediaRaw.attributes?.url || "",
    blurhash: mediaRaw.attributes?.blurhash || "",
  };
};

const mapTags = (tagsRaw: Maybe<TagEntity[]> | undefined): TagDTO[] => {
  if (!tagsRaw) return [];
  return tagsRaw.map(mapTag);
};

const mapTag = (tagRaw: Maybe<TagEntity> | undefined): TagDTO => {
  if (!tagRaw) return defaultTag();
  return {
    color: tagRaw.attributes?.color || "",
    name: tagRaw.attributes?.name || "",
  };
};

const mapLandingPage = (
  landingPageRaw: Maybe<LandingPageEntityResponse>
): LandingPageDTO => {
  return {
    codeDescription: landingPageRaw?.data?.attributes?.codeDescription || "",
    artDescription: landingPageRaw?.data?.attributes?.artDescription || "",
    ideasDescription: landingPageRaw?.data?.attributes?.ideasDescription || "",
    featuredArtPostSlugs:
      landingPageRaw?.data?.attributes?.featuredArtPosts?.data.map(
        (value) => value.attributes?.slug || ""
      ) || [],
    featuredIdeaArticleSlugs:
      landingPageRaw?.data?.attributes?.featuredIdeaArticles?.data.map(
        (value) => value.attributes?.slug || ""
      ) || [],
    author: mapAuthor(
      landingPageRaw?.data?.attributes?.author?.data || undefined
    ),
  };
};
