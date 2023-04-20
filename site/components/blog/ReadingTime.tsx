import readingTime from "reading-time";

export default function ReadingTime({ content }: { content: string }) {
  if (!content) {
    return <></>;
  }
  const stats = readingTime(content);
  return <span>{stats.minutes < 1 ? "<1" : stats.minutes} minute read</span>;
}
