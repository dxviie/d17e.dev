import readingTime from "reading-time";
import { useFormattedDate } from "./useFormattedDate";

export const usePublishedDetails = (
  createdAt: string,
  updatedAt: string,
  compact?: boolean | false,
): string => {
  const formattedCreationDate = useFormattedDate(createdAt);
  const formattedUpdateDate = useFormattedDate(updatedAt);
  if (compact) {
    return formattedCreationDate;
  }
  return (
    formattedCreationDate +
    " " +
    (updatedAt ? ", last edited " + formattedUpdateDate : "")
  );
};

export const formatReadingTime = (content: string): string => {
  const stats = readingTime(content);
  return (
    "" + (stats.minutes < 1 ? "< 1" : stats.minutes.toFixed(0)) + " minute read"
  );
};
