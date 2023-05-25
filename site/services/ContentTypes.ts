/******************************************************************
 * DTO types
 *****************************************************************/
export declare type LandingPageDTO = {
  codeDescription: string;
  artDescription: string;
  ideasDescription: string;
  contactDescription: string;
  featuredArtPostSlugs: string[];
  featuredIdeaArticleSlugs: string[];
  author: AuthorDTO;
};

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

export declare type PostDTO = {
  id: string;
  slug: string;
  title: string;
  link: string;
  author: AuthorDTO;
  message: string;
  content: MediaDTO;
  createdAt: string;
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

export const defaultPost = (): PostDTO => {
  return {
    id: "",
    slug: "",
    title: "",
    link: "",
    author: defaultAuthor(),
    message: "",
    content: defaultMedia(),
    createdAt: "",
  };
};
