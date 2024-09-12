/******************************************************************
 * DTO types
 *****************************************************************/
export declare type PageDTO = {
  title: string;
  description: string;
};

export declare type MediaDTO = {
  name: string;
  alternativeText: string;
  url: string;
  blurhash: string;
  ratio: number;
};

export declare type ArticleDTO = {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  cover: MediaDTO;
  createdAt: string;
  updatedAt: string;
};

export declare type PostDTO = {
  id: string;
  slug: string;
  title: string;
  link: string;
  linkDescription: string;
  message: string;
  content: MediaDTO;
  createdAt: string;
};