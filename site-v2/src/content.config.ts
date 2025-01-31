import {glob} from 'astro/loaders';
import {defineCollection, z} from 'astro:content';
import {authentication, createDirectus, readItems, rest} from "@directus/sdk";
import {getSecret} from "astro:env/server";

const directus = createDirectus(getSecret('DIRECTUS_URL') || '').with(authentication('json')).with(rest());

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({base: './src/content/blog', pattern: '**/*.{md,mdx}'}),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const posts = defineCollection({
  // @ts-ignore
  loader: async () => {
    try {
      await directus.login(getSecret('DIRECTUS_LOGIN') || '', getSecret('DIRECTUS_PASS') || '');
      console.debug('Logged in');
      let posts = await directus.request(readItems('Posts', {
        fields: ['*', 'cover.*'],
        filter: {
          status: {
            _eq: 'published'
          }
        },
        limit: -1
      })) || [{id: '1'}];
      posts = posts.map(p => ({...p, id: p.uuid}));
      console.debug('Loaded Posts', posts.length, 'First Post: ', posts[0]);
      return posts;
    } catch (error) {
      console.error('Directus error:', error);
      return [{id: '1'}];
    }
  },
  schema: z.object({
    id: z.string(),
    status: z.string(),
    dateCreated: z.coerce.date().optional(),
    dateUpdated: z.coerce.date().optional(),
    publishedDate: z.coerce.date().optional(),
    title: z.string(),
    body: z.string(),
    link: z.string().nullable().optional(),
    linkDescription: z.string().nullable().optional(),
    slug: z.string(),
    cover: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable().optional(),
      filenameDownload: z.string().nullable().optional(),
      type: z.string(),
      width: z.number().nullable().optional(),
      height: z.number().nullable().optional(),
    }),
  }),
});

const articles = defineCollection({
  // @ts-ignore
  loader: async () => {
    try {
      await directus.login(getSecret('DIRECTUS_LOGIN') || '', getSecret('DIRECTUS_PASS') || '');
      console.debug('Logged in');
      let articles = await directus.request(readItems('Articles', {
        fields: ['*', 'cover.*'],
        filter: {
          status: {
            _eq: 'published'
          }
        },
        limit: -1
      })) || [{id: '1'}];
      articles = articles.map(a => ({...a, id: a.uuid}));
      console.debug('Loaded Article', articles.length, 'First Article: ', articles[0]);
      return articles;
    } catch (error) {
      console.error('Directus error:', error);
      return [{id: '1'}];
    }
  },
  schema: z.object({
    id: z.string(),
    status: z.string(),
    dateCreated: z.coerce.date().optional(),
    dateUpdated: z.coerce.date().optional(),
    publishedDate: z.coerce.date().optional(),
    title: z.string(),
    body: z.string(),
    slug: z.string(),
    cover: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable().optional(),
      filenameDownload: z.string().nullable().optional(),
      type: z.string(),
      width: z.number().nullable().optional(),
      height: z.number().nullable().optional(),
    }),
  }),
});

export const collections = {blog, posts, articles};
