import {ArticleDTO, AuthorDTO, MediaDTO, TagDTO} from "./types";
import {GraphQLClient} from "graphql-request";
import {
    ArticleEntity, ArticleEntityResponse,
    ArticleEntityResponseCollection,
    AuthorEntity, Maybe, TagEntity,
    UploadFileEntity
} from "../strapi/graphql/codegen/graphql";
import {GET_ARTICLE_BY_ID, GET_ARTICLE_BY_SLUG, GET_ARTICLES_QUERY} from "../strapi/graphql/queries/articles";
import {ID} from "graphql-ws";

const API_ENDPOINT = 'https://strapi.d17e.dev/graphql';
const graphQLClient = new GraphQLClient(API_ENDPOINT);
const articlesFetcher = (query: string) => graphQLClient.request<{ articles: ArticleEntityResponseCollection}>(query);
const articleByIdFetcher = (query: string, id: ID) => graphQLClient.request<{ article: ArticleEntityResponse}>(query, {id: id});
const articleBySlugFetcher = (query: string, slug: string) => graphQLClient.request<{ articles: ArticleEntityResponseCollection}>(query, {slug: slug});

export const imageLoader = ({ src, width, quality}: {src: string, width: number, quality?: number}): string => {
    console.debug("Unused parameters width: ", width, ", quality: ", quality);
    const normalizedSrc = src.startsWith("/") ? src : "/" + src;
    return `https://strapi.d17e.dev${normalizedSrc}` // ?w=${width || 100}&q=${quality || 75}
}

export const getAllArticles = async (): Promise<ArticleDTO[]> => {
    try {
        const articlesRaw = await articlesFetcher(GET_ARTICLES_QUERY);
        if (!articlesRaw.articles || !articlesRaw.articles.data) {
            console.error("Fetching articles returned nothing...");
        }
        return articlesRaw.articles.data.map(mapArticle);
    }
    catch (e) {
        console.error("Problem fetching articles: " + e);
        return [];
    }
}

export const getArticleById = async (id: ID): Promise<ArticleDTO> => {
    try {
        const articleRaw = await articleByIdFetcher(GET_ARTICLE_BY_ID, id);
        if (!articleRaw.article || !articleRaw.article.data) {
            console.error("No article available for id " + id);
            return defaultArticle();
        }
        return mapArticle(articleRaw.article.data);
    }
    catch (e) {
        console.error("Problem fetching article: " + e);
        return defaultArticle();
    }
}

export const getArticleBySlug = async (slug: string): Promise<ArticleDTO> => {
    const articleRaw = await articleBySlugFetcher(GET_ARTICLE_BY_SLUG, slug);
    if (!articleRaw.articles || !articleRaw.articles.data) {
        throw new Error("No article available for slug " + slug);
    }
    return mapArticle(articleRaw.articles.data[0]);
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
        createdAt: articleRaw.attributes?.createdAt,
        updatedAt: articleRaw.attributes?.updatedAt,
        publishDtm: articleRaw.attributes?.publishDtm
    };
}

const mapAuthor = (authorRaw: Maybe<AuthorEntity> | undefined): AuthorDTO => {
    if (!authorRaw) return defaultAuthor();
    return {
        avatar: mapMedia(authorRaw.attributes?.avatar.data),
        name: authorRaw.attributes?.name || ""
    };
}

const mapMedias = (galleryRaw: Maybe<UploadFileEntity[]> | undefined): MediaDTO[] => {
    if (!galleryRaw) return [];
    return galleryRaw.map(mapMedia);
}

const mapMedia = (mediaRaw: Maybe<UploadFileEntity> | undefined): MediaDTO => {
    if (!mediaRaw) return defaultMedia();
    return {
        alternativeText: mediaRaw.attributes?.alternativeText || "",
        name: mediaRaw.attributes?.name || "",
        url: mediaRaw.attributes?.url || ""
    }
}

const mapTags = (tagsRaw: Maybe<TagEntity[]> | undefined): TagDTO[] => {
    if (!tagsRaw) return [];
    return tagsRaw.map(mapTag);
}

const mapTag = (tagRaw: Maybe<TagEntity> | undefined): TagDTO => {
    if (!tagRaw) return defaultTag();
    return {
        color: tagRaw.attributes?.color || "",
        name: tagRaw.attributes?.name || ""
    }
}

const defaultTag = (): TagDTO => {
    return {
        color: "",
        name: "-"
    }
}

const defaultMedia = (): MediaDTO => {
    return {
        alternativeText: "",
        name: "-",
        url: ""
    };
}

const defaultAuthor = (): AuthorDTO => {
    return {
        avatar: defaultMedia(),
        name: "-"
    };
}

const defaultArticle = (): ArticleDTO => {
    return {
        id: "",
        slug: "-",
        title: "-",
        description: "-",
        body: "",
        author: defaultAuthor(),
        cover: defaultMedia(),
        gallery: [],
        tags: [],
        createdAt: "",
        updatedAt: "",
        publishDtm: ""
    }
}