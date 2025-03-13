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

const projects = defineCollection({
  // @ts-ignore
  loader: async () => {
    try {
      await directus.login(getSecret('DIRECTUS_LOGIN') || '', getSecret('DIRECTUS_PASS') || '');
      console.debug('Logged in');
      let projects = await directus.request(readItems('Projects', {
        fields: ['*', 'cover.*'],
        limit: -1
      })) || [{id: '1'}];
      console.debug('Loaded Projects: ', projects.length);
      return projects;
    } catch (error) {
      console.error('Directus error:', error);
      return [{id: '1'}];
    }
  },
  schema: z.object({
    id: z.string(),
    dateCreated: z.coerce.date().optional(),
    dateUpdated: z.coerce.date().optional(),
    name: z.string(),
    body: z.string(),
    link: z.string().nullable().optional(),
    linkDescription: z.string().nullable().optional(),
    slug: z.string(),
    startDate: z.coerce.date().nullable().optional(),
    endDate: z.coerce.date().nullable().optional(),
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

const landingPages = defineCollection({
  // @ts-ignore
  loader: async () => {
    try {
      await directus.login(getSecret('DIRECTUS_LOGIN') || '', getSecret('DIRECTUS_PASS') || '');
      console.debug('Logged in');

      // Get landing page data with related posts and articles
      const pageData = await directus.request(readItems('LandingPage', {
        fields: [
          '*',
          'color',
          'bgColor',
          'insetMin',
          'insetMax',
          'radiusMin',
          'radiusMax',
          'name',
          'palette'
        ],
        limit: -1
      })) || [{id: '1'}];
      console.debug('Loaded LandingPages:', pageData.length);

      // Process each landing page
      const pages = await Promise.all(pageData.map(async pd => {
        // @ts-ignore
        let featuredPosts = [];
        // @ts-ignore
        if (pd.Posts && pd.Posts.length > 0) {
          featuredPosts = await directus.request(readItems('Posts', {
            fields: ['*', 'cover.*'],
            filter: {
              id: {
                // @ts-ignore
                _in: pd.Posts
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
        if (pd.Articles && pd.Articles.length > 0) {
          featuredArticles = await directus.request(readItems('Articles', {
            fields: ['*', 'cover.*'],
            filter: {
              id: {
                // @ts-ignore
                _in: pd.Articles
              }
            },
            limit: -1
          })) || [];

          featuredArticles = featuredArticles.map(a => ({...a, id: a.uuid}));
        }

        console.debug('Loaded featured Posts:', featuredPosts.length);
        console.debug('Loaded featured Articles:', featuredArticles.length);
        let palette = [];
        if (pd.palette) {
          // @ts-ignore
          palette = pd.palette.map(p => p.color);
        }

        return {
          id: pd.id || '1',
          name: pd.name || 'Default',
          color: pd.color || 'black',
          bgColor: pd.bgColor || 'white',
          insetMin: pd.insetMin || 1,
          insetMax: pd.insetMax || 4,
          radiusMin: pd.radiusMin || 0,
          radiusMax: pd.radiusMax || 2,
          //@ts-ignore
          Posts: featuredPosts,
          //@ts-ignore
          Articles: featuredArticles,
          palette: palette
        };
      }));


      return pages;

    } catch (error) {
      console.error('Directus error:', error);
      return [{
        id: '1',
        name: 'Default',
        color: 'black',
        bgColor: 'white',
        insetMin: 1,
        insetMax: 4,
        radiusMin: 0,
        radiusMax: 2,
        Posts: [],
        Articles: [],
        palette: []
      }];
    }
  },
  schema: z.object({
    id: z.string(),
    name: z.string(),

    // Add the new attributes to the schema
    color: z.string().default('black'),
    bgColor: z.string().default('white'),
    insetMin: z.number().default(1),
    insetMax: z.number().default(4),
    radiusMin: z.number().default(0),
    radiusMax: z.number().default(2),
    palette: z.array(z.string()),

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

// Export the collections
export const collections = {
  posts,
  articles,
  projects,
  landingPages,
};