export const isAtHomePage = (path: string): boolean => {
  let nakedPath = path;
  const indexOf = path.indexOf("#");
  if (indexOf > -1) {
    nakedPath = path.substring(0, indexOf);
  }
  return nakedPath === "/";
};

export const isInternalPageRef = (path: string): boolean => {
  return path.indexOf("#") > -1;
};
