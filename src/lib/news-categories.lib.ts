// THESE ARE THE NEWS CATEGORIES FROM WITHIN DRUPAL
// GRANTED THERE ARE MORE BUT THIS NEEDED TO BE CONSISTENT
export const newsCategories = {
  commodities: "/news/category/commodities",
  economy: "/news/category/economy",
  politics: "/news/category/politics",
  conferences: "/news/category/conferences",
  mining: "/news/category/mining",
  cryptocurrencies: "/news/category/cryptocurrencies",
  offthewire: "/news/category/off-the-wire",
};

export type NewsCategoriesUnion = keyof typeof newsCategories;
export type NewsCategoriesValues = typeof newsCategories[NewsCategoriesUnion];
