// break down articles to categories
// Due to some issues, it cannot be returned directly, so we have to create a const "count".
export const categoryOffset = (
  ignoredArticles: any[],
  cateName: string,
): number => {
  const count = ignoredArticles?.filter((item) => {
    return item?.category?.urlAlias.includes(cateName);
  }).length;

  return count;
};
