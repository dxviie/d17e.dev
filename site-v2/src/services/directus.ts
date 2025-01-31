import {createDirectus, rest,} from '@directus/sdk';

type Global = {
  title: string;
  description: string;
}

type Cover = {
  id: string;
  title: string;
  description?: string | null;
  filenameDownload?: string | null;
  type: string;
  width?: number | null;
  height?: number | null;
};

type Post = {
  id: string;
  status: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  publishedDate?: Date;
  title: string;
  body: string;
  link?: string | null;
  linkDescription?: string | null;
  slug: string;
  cover: Cover;
};

type Article = {
  id: string;
  status: string;
  dateCreated?: Date;
  dateUpdated?: Date;
  publishedDate?: Date;
  title: string;
  body: string;
  slug: string;
  cover: Cover;
};

type Schema = {
  posts: Post[];
  articles: Article[];
  global: Global;
}

const directus = createDirectus<Schema>('YOUR_DIRECTUS_URL').with(rest());

export default directus;