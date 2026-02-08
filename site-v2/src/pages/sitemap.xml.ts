import type {APIRoute} from 'astro';
import {getCollection} from 'astro:content';
import {countTagOccurrences} from '../utils/tagUtils';

// Helper function to format the date as required by sitemaps
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async ({site}) => {
  const base = site?.href?.replace(/\/$/, '') || 'https://d17e.dev';

  const [posts, articles, projects] = await Promise.all([
    getCollection('posts'),
    getCollection('articles'),
    getCollection('projects'),
  ]);

  const pages = [
    {url: '', lastModified: new Date(), priority: 1.0},
    {url: 'about', lastModified: new Date(), priority: 0.8},
    {url: 'posts', lastModified: new Date(), priority: 0.8},
    {url: 'blog', lastModified: new Date(), priority: 0.8},
    {url: 'projects', lastModified: new Date(), priority: 0.8},
    {url: 'tags', lastModified: new Date(), priority: 0.7},
    {url: 'bento', lastModified: new Date(), priority: 0.6},
  ];

  const postEntries = posts.map((post) => ({
    url: `posts/${post.data.slug}`,
    lastModified: post.data.dateUpdated || post.data.publishDate || new Date(),
    priority: 0.7,
  }));

  const articleEntries = articles.map((article) => ({
    url: `blog/${article.data.slug}`,
    lastModified: article.data.dateUpdated || article.data.publishDate || new Date(),
    priority: 0.7,
  }));

  const projectEntries = projects.map((project) => ({
    url: `projects/${project.data.slug}`,
    lastModified: project.data.dateUpdated || project.data.dateCreated || new Date(),
    priority: 0.7,
  }));

  const projectPostEntries: {url: string; lastModified: Date; priority: number}[] = [];
  for (const project of projects) {
    const relatedPosts = project.data.relatedPosts ?? [];
    for (const post of relatedPosts) {
      projectPostEntries.push({
        url: `projects/${project.data.slug}/posts/${post.slug}`,
        lastModified: post.dateUpdated || post.publishDate || new Date(),
        priority: 0.6,
      });
    }
  }

  const allContent = [
    ...projects.map((p) => ({body: p.data.body || ''})),
    ...articles.map((a) => ({body: a.data.body || ''})),
    ...posts.map((p) => ({body: p.data.body || ''})),
  ];
  const tagCounts = countTagOccurrences(allContent);
  const tagSlugs = Array.from(tagCounts.keys());
  const tagEntries = tagSlugs.map((tag) => ({
    url: `tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const allEntries = [
    ...pages,
    ...postEntries,
    ...articleEntries,
    ...projectEntries,
    ...projectPostEntries,
    ...tagEntries,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries
    .map(
      (entry) => `  <url>
    <loc>${base}/${entry.url}</loc>
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