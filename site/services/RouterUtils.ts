export const BLOG_PATH = "/blog";
export const POSTS_PATH = "/posts";
export const HOME_PATH = "/";

export const isAtHomePage = (path: string): boolean => {
  return getNakedPath(path) === HOME_PATH;
};

export const isAtBlogPage = (path: string): boolean => {
  return getNakedPath(path) === BLOG_PATH;
};

export const isAtPostsPage = (path: string): boolean => {
  return getNakedPath(path) === POSTS_PATH;
};

export const hasInternalPageRef = (path: string): boolean => {
  return path.indexOf("#") > -1;
};

const trimAllFromCharIncluding = (char: string, str: string): string => {
  const indexOf = str.indexOf(char);
  if (indexOf === -1) {
    return str;
  }
  return str.substring(0, indexOf);
};

const getNakedPath = (path: string): string => {
  let nakedPath = path;
  nakedPath = trimAllFromCharIncluding("?", nakedPath);
  nakedPath = trimAllFromCharIncluding("#", nakedPath);
  return nakedPath;
};
