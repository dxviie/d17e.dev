// @ts-nocheck
import {ArticleDTO, PageDTO, PostDTO,} from "./ContentTypes";
import {ASSETS_ROOT_URL, DIRECTUS_URL} from "./Constants";
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
  return fileName + '?width=' + width + "&quality=" + (quality || 75) + "&format=jpg";
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
 * Content APIs -- Articles
 *****************************************************************/
export const getAllArticles = async (): Promise<ArticleDTO[]> => {
  try {
    const client = await createDirectusClient();
    let filter = {
      status: {
        _eq: 'published'
      }
    };
    if (process.env.NODE_ENV === 'development') {
      filter = {};
    }
    const result = await client.items('Articles').readByQuery({
      fields: ['*', 'cover.*'],
      filter: filter
    });
    return result.data.map(mapArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const getArticleBySlug = async (slug: string): Promise<ArticleDTO> => {
  try {
    const client = await createDirectusClient();
    const result = await client.items('Articles').readByQuery({
      fields: ['*', 'cover.*'],
      filter: {
        slug: {
          _eq: slug
        }
      }
    });
    return result.data.map(mapArticle).find(article => article.slug === slug);
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    throw error;
  }
};

/******************************************************************
 * Content APIs -- Posts
 *****************************************************************/
export const getAllPosts = async (): Promise<PostDTO[]> => {
  try {
    const client = await createDirectusClient();
    let filter = {
      status: {
        _eq: 'published'
      }
    };
    if (process.env.NODE_ENV === 'development') {
      filter = {};
    }
    const result = await client.items('Posts').readByQuery({
      fields: ['*', 'cover.*'],
      filter: filter
    });
    return result.data.map(mapPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostBySlug = async (slug: string): Promise<PostDTO> => {
  try {
    const client = await createDirectusClient();
    const result = await client.items('Posts').readByQuery({
      fields: ['*', 'cover.*'],
      filter: {
        slug: {
          _eq: slug
        }
      }
    });
    return result.data.map(mapPost).find(post => post.slug === slug);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    throw error;
  }
};

/******************************************************************
 * Content APIs -- Pages
 *****************************************************************/
export const getAllPages = async (): Promise<PageDTO[]> => {
  try {
    const client = await createDirectusClient();
    let filter = {
      status: {
        _eq: 'published'
      }
    };
    if (process.env.NODE_ENV === 'development') {
      filter = {};
    }
    const result = await client.items('Pages').readByQuery({
      fields: ['*'],
      filter: filter
    });
    return result.data.map(mapPage);
  } catch (error) {
    console.error('Error fetching pages:', error);
    throw error;
  }
};

export const getPageByTitle = async (title: string): Promise<PageDTO> => {
  try {
    const client = await createDirectusClient();
    const result = await client.items('Pages').readByQuery({
      fields: ['*', 'cover.*'],
      filter: {
        title: {
          _eq: title
        }
      }
    });
    return result.data.map(mapPage).find(page => page.title === title);
  } catch (error) {
    console.error('Error fetching page by title:', error);
    throw error;
  }
};

/*****************************************************************
 * Object mappers
 *****************************************************************/
const mapPost = (directusPost: any): PostDTO => {
  const base64 = "";//await getBlurHashFromImage(`${ASSETS_ROOT_URL}${directusPost.cover.filename_disk}`);
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
      blurhash: base64,
    }
  }
}

const mapArticle = (directusArticle: any): ArticleDTO => {
  const base64 = "";//await getBlurHashFromImage(`${ASSETS_ROOT_URL}${directusArticle.cover.filename_disk}`);
  return {
    slug: directusArticle?.slug || "",
    title: directusArticle?.title || "",
    description: directusArticle?.description || "",
    body: directusArticle?.body || "",
    cover: {
      alternativeText: directusArticle?.cover?.description || "",
      name: directusArticle?.cover?.title || "",
      url: directusArticle?.cover?.filename_disk ? `${ASSETS_ROOT_URL}${directusArticle.cover.filename_disk}` : "",
      blurhash: base64,
    },
    createdAt:
      directusArticle?.publishDate || directusArticle?.date_created,
    updatedAt: directusArticle?.date_updated,
  };
};

const mapPage = (directusPage: any): PageDTO => {
  return {
    title: directusPage?.title || "",
    description: directusPage?.description || "",
  };
}