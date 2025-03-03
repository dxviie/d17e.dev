import {defineCollection, z} from 'astro:content';
import {authentication, createDirectus, readItems, rest} from "@directus/sdk";
import {getSecret} from "astro:env/server";

const directus = createDirectus(getSecret('DIRECTUS_URL') || '').with(authentication('json')).with(rest());

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
      console.debug('Loaded Posts: ', posts.length);
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
    publishDate: z.coerce.date().optional(),
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
      console.debug('Loaded Articles:', articles.length);
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
    publishDate: z.coerce.date().optional(),
    title: z.string(),
    body: z.string(),
    description: z.string().nullable().optional(),
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

const landingPage = defineCollection({
  // @ts-ignore
  loader: async () => {
    try {
      await directus.login(getSecret('DIRECTUS_LOGIN') || '', getSecret('DIRECTUS_PASS') || '');
      console.debug('Logged in');

      // Get landing page data with related posts and articles
      const pageData = await directus.request(readItems('LandingPage', {
        fields: [
          '*'
        ],
        limit: 1
      })) || [{id: '1'}];

      // Fetch the actual Posts based on IDs
      // @ts-ignore
      let featuredPosts = [];
      // @ts-ignore
      if (pageData.Posts && pageData.Posts.length > 0) {
        featuredPosts = await directus.request(readItems('Posts', {
          fields: ['*', 'cover.*'],
          filter: {
            id: {
              // @ts-ignore
              _in: pageData.Posts
            },
            status: {
              _eq: 'published'
            }
          },
          limit: -1
        })) || [];

        featuredPosts = featuredPosts.map(p => ({...p, id: p.uuid}));
      }

      // Fetch the actual Articles based on IDs
      // @ts-ignore
      let featuredArticles = [];
      // @ts-ignore
      if (pageData.Articles && pageData.Articles.length > 0) {
        featuredArticles = await directus.request(readItems('Articles', {
          fields: ['*', 'cover.*'],
          filter: {
            id: {
              // @ts-ignore
              _in: pageData.Articles
            },
            status: {
              _eq: 'published'
            }
          },
          limit: -1
        })) || [];

        featuredArticles = featuredArticles.map(a => ({...a, id: a.uuid}));
      }

      console.debug('Loaded featured Posts:', featuredPosts.length);
      console.debug('Loaded featured Articles:', featuredArticles.length);
      // @ts-ignore
      return [{id: '1', Posts: featuredPosts, Articles: featuredArticles}];
    } catch (error) {
      console.error('Directus error:', error);
      return {id: '1', Posts: [], Articles: []};
    }
  },
  schema: z.object({
    id: z.string(),

    // Define the related Posts collection
    Posts: z.array(z.object({
      id: z.string(),
      status: z.string(),
      dateCreated: z.coerce.date().optional(),
      dateUpdated: z.coerce.date().optional(),
      publishDate: z.coerce.date().optional(),
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
    })),

    // Define the related Articles collection
    Articles: z.array(z.object({
      id: z.string(),
      status: z.string(),
      dateCreated: z.coerce.date().optional(),
      dateUpdated: z.coerce.date().optional(),
      publishDate: z.coerce.date().optional(),
      title: z.string(),
      body: z.string(),
      description: z.string().nullable().optional(),
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
    })),
  }),
});

// Don't forget to export the new collection along with existing ones
export const collections = {
  posts,
  articles,
  landingPage,
};
