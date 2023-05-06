import { formatDate } from "./DateTimeFormatter";
import readingTime from "reading-time";

export const formatPublishedDetails = (
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  compact?: boolean | false
): string => {
  if (compact) {
    return publishedAt ? formatDate(publishedAt) : formatDate(createdAt);
  }
  return (
    "published " +
    (publishedAt ? formatDate(publishedAt) : formatDate(createdAt)) +
    " " +
    (updatedAt ? ", last edited " + formatDate(updatedAt) : "")
  );
};

export const formatReadingTime = (content: string): string => {
  const stats = readingTime(content);
  return "" + (stats.minutes < 1 ? "< 1" : stats.minutes) + " minute read";
};
