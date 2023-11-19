import { ArticleDTO, PostDTO } from "./ContentTypes";
import moment from "moment";

export const sortPostsNewestFirst = (a: PostDTO, b: PostDTO): number => {
  const ma = moment(a.createdAt);
  const mb = moment(b.createdAt);
  return ma.isBefore(mb) ? 1 : ma.isSame(mb) ? 0 : -1;
};

export const sortArticlesNewestFirst = (
  a: ArticleDTO,
  b: ArticleDTO,
): number => {
  const ma = moment(a.createdAt);
  const mb = moment(b.createdAt);
  return ma.isBefore(mb) ? 1 : ma.isSame(mb) ? 0 : -1;
};
