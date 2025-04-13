/**
 * Utility functions for working with tags in markdown content
 */

// Extract hashtags from markdown content
export function extractTags(content: string): string[] {
  if (!content) return [];

  // Regex to match hashtags in markdown text
  const hashtagRegex = /#[a-zA-Z0-9._&+\-@#]+\b/g;
  const matches = content.match(hashtagRegex) || [];

  // Remove duplicates and sort
  const uniqueTags = Array.from(new Set(matches))
    .map(tag => tag.substring(1)); // Remove the # symbol

  return uniqueTags;
}

// Count tag occurrences across multiple content items
export function countTagOccurrences(allContent: { body: string }[]): Map<string, number> {
  const tagCounts = new Map<string, number>();

  allContent.forEach(item => {
    if (!item.body) return;

    const tags = extractTags(item.body);
    tags.forEach(tag => {
      const currentCount = tagCounts.get(tag.toLowerCase()) || 0;
      tagCounts.set(tag.toLowerCase(), currentCount + 1);
    });
  });

  return tagCounts;
}

// Get font size based on tag count (for tag cloud)
export function getTagFontSize(count: number, maxCount: number, minCount: number): number {
  // Calculate a size between 0.8rem and 2.2rem based on count
  const minSize = 0.8;
  const maxSize = 2.2;

  if (maxCount === minCount) return (minSize + maxSize) / 2;

  const sizeRange = maxSize - minSize;
  const countRange = maxCount - minCount;
  const sizeIncrement = sizeRange / countRange;

  return minSize + ((count - minCount) * sizeIncrement);
}

// Find all content related to a specific tag
export function findContentByTag(
  tag: string,
  projects: any[],
  articles: any[],
  posts: any[]
): { projects: any[], articles: any[], posts: any[] } {
  // Normalize the tag for comparison (lowercase)
  const normalizedTag = tag.toLowerCase();

  // Find matching content
  const matchedProjects = projects.filter(project =>
    project.data.body && extractTags(project.data.body).map(t => t.toLowerCase()).includes(normalizedTag)
  );

  const matchedArticles = articles.filter(article =>
    article.data.body && extractTags(article.data.body).map(t => t.toLowerCase()).includes(normalizedTag)
  );

  const matchedPosts = posts.filter(post =>
    post.data.body && extractTags(post.data.body).map(t => t.toLowerCase()).includes(normalizedTag)
  );

  return {
    projects: matchedProjects,
    articles: matchedArticles,
    posts: matchedPosts
  };
}