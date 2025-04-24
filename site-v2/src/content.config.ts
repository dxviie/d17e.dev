import {defineCollection, z} from 'astro:content';
import {authentication, createDirectus, readItems, rest} from "@directus/sdk";
import {getSecret} from "astro:env/server";

// Check if we're in development mode
const isDev = process.env.NODE_ENV !== 'production';

// Log the mode we're running in
console.log(`Running in ${isDev ? 'DEVELOPMENT' : 'PRODUCTION'} mode - ${isDev ? 'ALL' : 'ONLY PUBLISHED'} content will be loaded`);

const directus = createDirectus(getSecret('DIRECTUS_URL') || '').with(authentication('json')).with(rest());

const posts = defineCollection({
  // @ts-ignore
  loader: async () => {
    try {
      await directus.login(getSecret('DIRECTUS_LOGIN') || '', getSecret('DIRECTUS_PASS') || '');
      console.debug('Logged in');
      // In development mode, fetch all posts regardless of status
      // In production mode, only fetch published posts
      const filter = isDev ? {} : {
        status: {
          _eq: 'published'
        }
      };

      let posts = await directus.request(readItems('Posts', {
        fields: ['*', 'cover.*'],
        filter,
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
      // In development mode, fetch all articles regardless of status
      // In production mode, only fetch published articles
      const filter = isDev ? {} : {
        status: {
          _eq: 'published'
        }
      };

      let articles = await directus.request(readItems('Articles', {
        fields: ['*', 'cover.*'],
        filter,
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

      // First fetch the projects with their main data
      let projects = await directus.request(readItems('Projects', {
        fields: ['*', 'cover.*', 'relatedPosts.*', 'relatedArticles.*'],
        limit: -1
      })) || [{id: '1'}];
      console.debug('Loaded Projects:', projects.length);

      // Process each project to fetch related content
      return await Promise.all(projects.map(async (project) => {
        try {
          //@ts-ignore
          let postIds = project.relatedPosts.map(rel => rel['Posts_id']);
          let relatedPosts: { id: any; }[] = [];
          if (postIds.length > 0) {
            // Create filter based on environment
            const filter = {
              id: {
                _in: postIds
              },
              // Only add status filter in production
              ...(isDev ? {} : {
                status: {
                  _eq: 'published'
                }
              })
            };

            const relatedPostsData = await directus.request(readItems('Posts', {
              fields: ['*', 'cover.*'],
              filter,
              limit: -1
            })) || [];
            relatedPosts = relatedPostsData.map(p => ({...p, id: p.uuid}));
          }

          //@ts-ignore
          let articleIds = project.relatedArticles.map(rel => rel['Articles_id']);
          let relatedArticles: { id: any; }[] = [];
          if (articleIds.length > 0) {
            // Create filter based on environment
            const filter = {
              id: {
                _in: articleIds
              },
              // Only add status filter in production
              ...(isDev ? {} : {
                status: {
                  _eq: 'published'
                }
              })
            };

            const relatedArticlesData = await directus.request(readItems('Articles', {
              fields: ['*', 'cover.*'],
              filter,
              limit: -1
            })) || [];
            relatedArticles = relatedArticlesData.map(a => ({...a, id: a.uuid}));
          }

          console.debug('Loaded related Posts:', relatedPosts.length, 'for Project', project.name);
          console.debug('Loaded related Articles:', relatedArticles.length, 'for Project', project.name);

          // Return the project with related content
          return {
            ...project,
            relatedPosts,
            relatedArticles
          };
        } catch (error) {
          console.error(`Error fetching related content for project ${project.id}:`, error);
          // Return the project without related content if there was an error
          return {
            ...project,
            relatedPosts: [],
            relatedArticles: []
          };
        }
      }));
    } catch (error) {
      console.error('Directus error:', error);
      return [{id: '1'}];
    }
  },
  schema: z.object({
    id: z.string(),
    dateCreated: z.coerce.date().optional(),
    dateUpdated: z.coerce.date().optional(),
    description: z.string().nullable().optional(),
    name: z.string(),
    body: z.string().optional(),
    link: z.string().nullable().optional(),
    linkDescription: z.string().nullable().optional(),
    slug: z.string(),
    rank: z.number().nullable().optional(),
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
    // Define related Posts
    relatedPosts: z.array(z.object({
      id: z.string(),
      status: z.string().optional(),
      dateCreated: z.coerce.date().optional(),
      dateUpdated: z.coerce.date().optional(),
      publishDate: z.coerce.date().optional(),
      title: z.string(),
      body: z.string().optional(),
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
      }).optional(),
    })).optional(),
    // Define related Articles
    relatedArticles: z.array(z.object({
      id: z.string(),
      status: z.string().optional(),
      dateCreated: z.coerce.date().optional(),
      dateUpdated: z.coerce.date().optional(),
      publishDate: z.coerce.date().optional(),
      title: z.string(),
      body: z.string().optional(),
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
      }).optional(),
    })).optional(),
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
          'palette',
          'blendMode'
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
          // Create filter based on environment
          const filter = {
            id: {
              // @ts-ignore
              _in: pd.Posts
            },
            // Only add status filter in production
            ...(isDev ? {} : {
              status: {
                _eq: 'published'
              }
            })
          };

          featuredPosts = await directus.request(readItems('Posts', {
            fields: ['*', 'cover.*'],
            filter,
            limit: -1
          })) || [];

          featuredPosts = featuredPosts.map(p => ({...p, id: p.uuid}));
        }

        // Fetch the actual Articles based on IDs
        // @ts-ignore
        let featuredArticles = [];
        // @ts-ignore
        if (pd.Articles && pd.Articles.length > 0) {
          // Create filter based on environment
          const filter = {
            id: {
              // @ts-ignore
              _in: pd.Articles
            },
            // Only add status filter in production
            ...(isDev ? {} : {
              status: {
                _eq: 'published'
              }
            })
          };

          featuredArticles = await directus.request(readItems('Articles', {
            fields: ['*', 'cover.*'],
            filter,
            limit: -1
          })) || [];

          featuredArticles = featuredArticles.map(a => ({...a, id: a.uuid}));
        }

        console.debug('Loaded featured Posts:', featuredPosts.length, 'for LP', pd.name);
        console.debug('Loaded featured Articles:', featuredArticles.length, 'for LP', pd.name);
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
          palette: palette,
          blendMode: pd.blendMode || 'normal'
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
    blendMode: z.string().optional(),

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