import {ArticleDTO, AuthorDTO, MediaDTO, TagDTO} from "./types";
import {GraphQLClient} from "graphql-request";
import {
    ArticleEntity, ArticleEntityResponse,
    ArticleEntityResponseCollection,
    AuthorEntity, Maybe, TagEntity,
    UploadFileEntity
} from "../strapi/graphql/codegen/graphql";
import {GET_ARTICLE_BY_ID, GET_ARTICLES_QUERY} from "../strapi/graphql/queries/articles";

const API_ENDPOINT = 'https://strapi.d17e.dev/graphql';
const graphQLClient = new GraphQLClient(API_ENDPOINT);
const articlesFetcher = (query: string) => graphQLClient.request<{ articles: ArticleEntityResponseCollection}>(query);
const articleFetcher = (query: string, id: string) => graphQLClient.request<{ article: ArticleEntityResponse}>(query, {id: id});

export const getAllArticles = async (): Promise<ArticleDTO[]> => {
    const articlesRaw = await articlesFetcher(GET_ARTICLES_QUERY);
    if (!articlesRaw.articles || !articlesRaw.articles.data) {
        throw new Error("No data available");
    }
    return articlesRaw.articles.data.map(mapArticle);
}

export const getArticleById = async (id: string): Promise<ArticleDTO> => {
    const articleRaw = await articleFetcher(GET_ARTICLE_BY_ID, id);
    if (!articleRaw.article || !articleRaw.article.data) {
        throw new Error("No article available for id " + id);
    }
    return mapArticle(articleRaw.article.data);
}

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
        createdAt: articleRaw.attributes?.createdAt || "",
        updatedAt: articleRaw.attributes?.updatedAt || "",
    };
}

const mapAuthor = (authorRaw: Maybe<AuthorEntity> | undefined): AuthorDTO | undefined => {
    if (!authorRaw) return undefined;
    return {
        avatar: mapMedia(authorRaw.attributes?.avatar.data),
        name: authorRaw.attributes?.name || ""
    };
}

const mapMedias = (galleryRaw: Maybe<UploadFileEntity[]> | undefined): (MediaDTO | undefined)[] => {
    if (!galleryRaw) return [];
    return galleryRaw.map(mapMedia);
}

const mapMedia = (mediaRaw: Maybe<UploadFileEntity> | undefined): MediaDTO | undefined => {
    if (!mediaRaw) return undefined;
    return {
        alternativeText: mediaRaw.attributes?.alternativeText || "",
        name: mediaRaw.attributes?.name || "",
        url: mediaRaw.attributes?.url || ""
    }
}

const mapTags = (tagsRaw: Maybe<TagEntity[]> | undefined): (TagDTO | undefined)[] => {
    if (!tagsRaw) return [];
    return tagsRaw.map(mapTag);
}

const mapTag = (tagRaw: Maybe<TagEntity> | undefined): TagDTO | undefined => {
    if (!tagRaw) return undefined;
    return {
        color: tagRaw.attributes?.color || "",
        name: tagRaw.attributes?.name || ""
    }
}