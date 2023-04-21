/******************************************************************
 * DTO types
 *****************************************************************/
export declare type MediaDTO = {
  name: string;
  alternativeText: string;
  url: string;
  blurhash: string;
};

export declare type TagDTO = {
  name: string;
  color: string;
};

export declare type AuthorDTO = {
  name: string;
  avatar: MediaDTO;
};

export declare type ArticleDTO = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  cover: MediaDTO;
  gallery: MediaDTO[];
  tags: TagDTO[];
  author: AuthorDTO;
  createdAt: string;
  updatedAt: string;
  publishDtm: string;
};

/******************************************************************
 * Default DTOs
 *****************************************************************/
export const defaultTag = (): TagDTO => {
  return {
    color: "",
    name: "",
  };
};

export const defaultMedia = (): MediaDTO => {
  return {
    alternativeText: "",
    name: "",
    url: "",
    blurhash: "",
  };
};

export const defaultAuthor = (): AuthorDTO => {
  return {
    avatar: defaultMedia(),
    name: "",
  };
};

export const defaultArticle = (): ArticleDTO => {
  return {
    id: "",
    slug: "",
    title: "",
    description: "",
    body: "",
    author: defaultAuthor(),
    cover: defaultMedia(),
    gallery: [],
    tags: [],
    createdAt: "",
    updatedAt: "",
    publishDtm: "",
  };
};
