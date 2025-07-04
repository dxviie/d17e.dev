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
  // Remove HTML tags and markdown syntax
  const cleanContent = content ? content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image markdown
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove link markdown
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]*`/g, '') // Remove inline code
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*.*?\*\*/g, '') // Remove bold markdown
      .replace(/\*.*?\*/g, '') // Remove italic markdown
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim()
    : '';

  // Count words
  const words = cleanContent.split(' ').filter(word => word.length > 0);
  const wordCount = words.length;

  // Average reading speed is 200-250 words per minute
  // Using 225 as a middle ground
  const wordsPerMinute = 175;
  const readingTimeMinutes = Math.max(1, Math.round(wordCount / wordsPerMinute));

  return readingTimeMinutes;
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '🕓 1\'';
  }
  return `🕓 ${minutes}\'`;
}