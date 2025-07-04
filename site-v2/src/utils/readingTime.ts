/*
Common formulas:

200 WPM: Most popular (used by Medium, many WordPress plugins)
250 WPM: Slightly faster estimate
150-200 WPM: More conservative for complex content

Adjustments to consider:

Technical/complex content: Use 150-175 WPM
Simple, casual content: Use 225-250 WPM
Lists, headers, code blocks: Add extra time since people scan these differently
Images/diagrams: Add 10-15 seconds per image
 */

export function estimateReadingTime(content: string): number {
  if (!content) return 1;

  // Count images first (before removing them)
  const markdownImageMatches = content.match(/!\[.*?]\(.*?\)/g) || [];
  const figureMatches = content.match(/<figure[\s\S]*?<\/figure>/g) || [];
  const imageCount = markdownImageMatches.length + figureMatches.length;


  // Remove HTML tags and markdown syntax
  const cleanContent = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/!\[.*?]\(.*?\)/g, '') // Remove image markdown
    .replace(/\[.*?]\(.*?\)/g, '') // Remove link markdown
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*.*?\*\*/g, '') // Remove bold markdown
    .replace(/\*.*?\*/g, '') // Remove italic markdown
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  // Count words
  const words = cleanContent.split(' ').filter(word => word.length > 0);
  const wordCount = words.length;

  // Calculate base reading time (175 WPM)
  const wordsPerMinute = 175;
  const baseReadingTimeMinutes = wordCount / wordsPerMinute;

  // Add 15 seconds (0.25 minutes) for each image
  const imageTimeMinutes = imageCount * 0.25;

  // Total reading time
  const totalReadingTimeMinutes = baseReadingTimeMinutes + imageTimeMinutes;


  return Math.max(1, Math.round(totalReadingTimeMinutes));
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '🕓 1\'';
  }
  return `🕓 ${minutes}\'`;
}