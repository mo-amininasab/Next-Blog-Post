export const sortByData = (a, b) => {
  return new Date(b.frontMatter.date) - new Date(a.frontMatter.date);
};
