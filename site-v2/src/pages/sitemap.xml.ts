import type {APIRoute} from 'astro';
import {getCollection} from 'astro:content';

// Helper function to format the date as required by sitemaps
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async ({site}) => {
  // Get all content collections
  const posts = await getCollection('posts');
  const articles = await getCollection('articles');
  const pages = [
    {
      url: 'about',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: '',
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: 'posts',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'articles',
      lastModified: new Date(),
      priority: 0.8,
    }
  ];

  // Map posts to sitemap entries
  //@ts-ignore
  const postEntries = posts.map((post) => ({
    url: `posts/${post.data.slug}`,
    lastModified: post.data.dateUpdated || post.data.publishDate || new Date(),
    priority: 0.7,
  }));

  // Map articles to sitemap entries
  //@ts-ignore
  const articleEntries = articles.map((article) => ({
    url: `articles/${article.data.slug}`,
    lastModified: article.data.dateUpdated || article.data.publishDate || new Date(),
    priority: 0.7,
  }));

  // Combine all entries
  const allEntries = [...pages, ...postEntries, ...articleEntries];

  // Generate the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
    .map(
      (entry) => `  <url>
    <loc>${site}${entry.url}</loc>
    <lastmod>${formatDate(entry.lastModified)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};