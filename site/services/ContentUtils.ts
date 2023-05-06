import { PostDTO } from "./ContentTypes";
import moment from "moment";

export const sortPostsNewestFirst = (a: PostDTO, b: PostDTO): number => {
  const ma = moment(a.createdAt);
  const mb = moment(b.createdAt);
  console.log(ma, mb, ma.isBefore(mb) ? 1 : ma.isSame(mb) ? 0 : -1);
  return ma.isBefore(mb) ? 1 : ma.isSame(mb) ? 0 : -1;
};
