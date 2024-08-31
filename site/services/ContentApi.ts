// @ts-nocheck
import {
  ArticleDTO,
  ArtPageDTO,
  AuthorDTO,
  defaultAuthor,
  defaultLink,
  defaultMedia,
  defaultTag,
  FindMeOnLinkListDTO,
  IdeasPageDTO,
  LandingPageDTO,
  LinkDTO,
  MediaDTO,
  PostDTO,
  TagDTO,
} from "./ContentTypes";
import {GraphQLClient} from "graphql-request";
import {
  ArticleEntityResponse,
  ArticleEntityResponseCollection,
  ArtPageEntityResponse,
  AuthorEntity,
  FindMeOnLinkListEntityResponse,
  IdeasPageEntityResponse,
  LandingPageEntityResponse,
  LinkEntity,
  Maybe,
  TagEntity,
  UploadFileEntity,
} from "../strapi/graphql/codegen/graphql";
import {ID} from "graphql-ws";
import {ASSETS_ROOT_URL, DIRECTUS_URL, GRAPHQL_API_ENDPOINT} from "./Constants";
import {GET_LANDING_PAGE_QUERY} from "../strapi/graphql/queries/landingPage";
import {GET_ART_PAGE_QUERY} from "../strapi/graphql/queries/artPage";
import {GET_IDEAS_PAGE_QUERY} from "../strapi/graphql/queries/ideaPage";
import {GET_FIND_ME_ON_LINK_LIST_QUERY} from "../strapi/graphql/queries/findMeOnLinkList";
import {Directus} from "@directus/sdk";

// noinspection JSUnusedLocalSymbols
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
  const parts = src.split(".");
  const ext = parts.pop();
  const fileName = parts.join(".");
  const filePath = fileName + '?width=' + width + "&quality=" + (quality || 75) + "&format=webp";
  return filePath;
};

/*****************************************************************
 * GraphQL client & fetchers
 *****************************************************************/
const graphQLClient = new GraphQLClient(GRAPHQL_API_ENDPOINT);
const articlesFetcher = (query: string) =>
  graphQLClient.request<{ articles: ArticleEntityResponseCollection }>(query);
// noinspection JSUnusedLocalSymbols
const articleByIdFetcher = (query: string, id: ID) =>
  graphQLClient.request<{ article: ArticleEntityResponse }>(query, {id: id});
const articleBySlugFetcher = (query: string, slug: string) =>
  graphQLClient.request<{ articles: ArticleEntityResponseCollection }>(query, {
    slug: slug,
  });
const landingPageFetcher = (query: string) =>
  graphQLClient.request<{ landingPage: LandingPageEntityResponse }>(query);
const artPageFetcher = (query: string) =>
  graphQLClient.request<{ artPage: ArtPageEntityResponse }>(query);
const ideasPageFetcher = (query: string) =>
  graphQLClient.request<{ ideasPage: IdeasPageEntityResponse }>(query);
const findMeOnLinkListFetcher = (query: string) =>
  graphQLClient.request<{ findMeOnLinkList: FindMeOnLinkListEntityResponse }>(
    query,
  );

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
 * Content APIs -- Art Page
 *****************************************************************/
export const getArtPage = async (): Promise<ArtPageDTO> => {
  const artPageRaw = await artPageFetcher(GET_ART_PAGE_QUERY);
  if (!artPageRaw.artPage || !artPageRaw.artPage.data) {
    throw new Error("Fetching landing page returned nothing...");
  }
  return mapArtPage(artPageRaw.artPage);
};

/******************************************************************
 * Content APIs -- Ideas Page
 *****************************************************************/
export const getIdeasPage = async (): Promise<IdeasPageDTO> => {
  const ideasPageRaw = await ideasPageFetcher(GET_IDEAS_PAGE_QUERY);
  if (!ideasPageRaw.ideasPage || !ideasPageRaw.ideasPage.data) {
    throw new Error("Fetching landing page returned nothing...");
  }
  return mapIdeasPage(ideasPageRaw.ideasPage);
};

/******************************************************************
 * Content APIs -- Find me on links
 *****************************************************************/
export const getFindMeOnLinks = async (): Promise<FindMeOnLinkListDTO> => {
  const linkListRaw = await findMeOnLinkListFetcher(
    GET_FIND_ME_ON_LINK_LIST_QUERY,
  );
  if (!linkListRaw.findMeOnLinkList || !linkListRaw.findMeOnLinkList.data) {
    throw new Error("Fetching find me on links returned nothing...");
  }
  return mapFindMeOnLinkList(linkListRaw.findMeOnLinkList);
};

/******************************************************************
 * Content APIs -- Articles
 *****************************************************************/
export const getAllArticles = async (): Promise<ArticleDTO[]> => {
  try {
    const client = await createDirectusClient();
    const result = await client.items('Articles').readByQuery({
      fields: ['*', 'cover.*'],
    });
    return result.data.map(mapArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const getArticleBySlug = async (slug: string): Promise<ArticleDTO> => {
  return getAllArticles().then(articles => articles.find(article => article.slug === slug));
};
/******************************************************************
 * Directus Client
 *****************************************************************/
const createDirectusClient = async () => {
  const client = new Directus(DIRECTUS_URL);
  // Authenticate
  await client.auth.login({
    email: process.env.DIRECTUS_EMAIL,
    password: process.env.DIRECTUS_PASS
  });
  return client;
}
/******************************************************************
 * Content APIs -- Posts
 *****************************************************************/
export const getAllPosts = async (): Promise<PostDTO[]> => {
  try {
    const client = await createDirectusClient();
    const result = await client.items('Posts').readByQuery({
      fields: ['*', 'cover.*'],
    });
    return result.data.map(mapPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostBySlug = async (slug: string): Promise<PostDTO> => {
  return getAllPosts().then(posts => posts.find(post => post.slug === slug));
};

/*****************************************************************
 * Object mappers
 *****************************************************************/
const mapPost = (directusPost: any): PostDTO => {
  return {
    slug: directusPost?.slug || "",
    title: directusPost?.title || "",
    message: directusPost?.body || "",
    link: directusPost?.link || "",
    linkDescription: directusPost?.linkDescription || "",
    createdAt: directusPost?.publishDate || directusPost?.date_created || 'null',
    content: {
      alternativeText: directusPost?.cover?.description || "",
      name: directusPost?.cover?.title || "",
      url: directusPost?.cover?.filename_disk ? `${ASSETS_ROOT_URL}${directusPost.cover.filename_disk}` : "",
      blurhash: "",
    }
  }
}

const mapArticle = (directusArticle: any): ArticleDTO => {
  return {
    slug: directusArticle?.slug || "",
    title: directusArticle?.title || "",
    description: directusArticle?.description || "",
    body: directusArticle?.body || "",
    cover: {
      alternativeText: directusArticle?.cover?.description || "",
      name: directusArticle?.cover?.title || "",
      url: directusArticle?.cover?.filename_disk ? `${ASSETS_ROOT_URL}${directusArticle.cover.filename_disk}` : "",
      blurhash: "",
    },
    createdAt:
      directusArticle?.publishDate || directusArticle?.date_created,
    updatedAt: directusArticle?.date_updated,
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
  galleryRaw: Maybe<UploadFileEntity[]> | undefined,
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

const mapLinks = (linksRaw: Maybe<LinkEntity[]> | undefined): LinkDTO[] => {
  if (!linksRaw) return [];
  return linksRaw.map(mapLink);
};

const mapLink = (linkRaw: Maybe<LinkEntity> | undefined): LinkDTO => {
  if (!linkRaw) return defaultLink();
  return {
    title: linkRaw.attributes?.title || "",
    description: linkRaw.attributes?.description || "",
    link: linkRaw.attributes?.link || "",
    icon: mapMedia(linkRaw.attributes?.icon?.data),
    tags: mapTags(linkRaw.attributes?.tags?.data),
  };
};

const mapLandingPage = (
  landingPageRaw: Maybe<LandingPageEntityResponse>,
): LandingPageDTO => {
  return {
    codeDescription: landingPageRaw?.data?.attributes?.codeDescription || "",
    artDescription: landingPageRaw?.data?.attributes?.artDescription || "",
    ideasDescription: landingPageRaw?.data?.attributes?.ideasDescription || "",
    contactDescription:
      landingPageRaw?.data?.attributes?.contactDescription || "",
    featuredArtPostSlugs:
      landingPageRaw?.data?.attributes?.featuredArtPosts?.data.map(
        (value) => value.attributes?.slug || "",
      ) || [],
    featuredIdeaArticleSlugs:
      landingPageRaw?.data?.attributes?.featuredIdeaArticles?.data.map(
        (value) => value.attributes?.slug || "",
      ) || [],
    author: mapAuthor(
      landingPageRaw?.data?.attributes?.author?.data || undefined,
    ),
  };
};

const mapArtPage = (artPageRaw: Maybe<ArtPageEntityResponse>): ArtPageDTO => {
  return {
    title: artPageRaw?.data?.attributes?.title || "",
    description: artPageRaw?.data?.attributes?.description || "",
    author: mapAuthor(artPageRaw?.data?.attributes?.author?.data),
  };
};

const mapIdeasPage = (
  ideasPageRaw: Maybe<IdeasPageEntityResponse>,
): IdeasPageDTO => {
  return {
    title: ideasPageRaw?.data?.attributes?.title || "",
    description: ideasPageRaw?.data?.attributes?.description || "",
    author: mapAuthor(ideasPageRaw?.data?.attributes?.author?.data),
  };
};

const mapFindMeOnLinkList = (
  linkListRaw: Maybe<FindMeOnLinkListEntityResponse>,
): FindMeOnLinkListDTO => {
  return {
    links: mapLinks(linkListRaw?.data?.attributes?.links?.data),
  };
};
