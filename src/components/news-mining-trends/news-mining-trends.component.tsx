import Link from "next/link";
import { type FC, useCallback } from "react";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import ListItemSmallPicture from "~/src/components-news/ArticleListItems/ListItemSmallPicture/ListItemSmallPicture";
import ListItemTwoLine from "~/src/components-news/ArticleListItems/ListItemTwoLine/index";
import ArticleMoreButton from "~/src/components/article-more-button/article-more-button.component";

import type { ArticleTeaserFragmentFragment } from "~/src/generated";
import styles from "./news-mining-trends.module.scss";

export const NewsMiningTrendsCell: FC = () => {
  const { data: miningNews } = useQuery(
    news.newsByCategoryGeneric({
      variables: {
        limit: 6,
        offset: 0,
        urlAlias: "/news/category/mining",
        includeRelatedCategories: true,
      },
      options: {
        enabled: true,
        select: useCallback((d) => {
          const short = d?.nodeListByCategory;
          return {
            nodeListByCategory: {
              ...short,
              items: short?.items?.filter(
                (x) => x?.__typename !== "Commentary",
              ),
            },
          };
        }, []),
      },
    }),
  );

  return (
    <div className={styles.wrap}>
      <img src="/kitco_mining_logo.png" alt="Kitco Mining" />
      <div className={styles.lineTitle} />
      <div className={styles.dividerLight} />
      {miningNews?.nodeListByCategory?.items
        ?.slice(0, 1)
        ?.map((x: ArticleTeaserFragmentFragment) => (
          <Link className={styles.firstArticle} href={x.urlAlias} key={x.id}>
            <ListItemSmallPicture
              date={x.updatedAt}
              summary={x.teaserSnippet}
              image={
                x?.image.detail?.default?.srcset ?? x?.legacyThumbnailImageUrl
              }
              source={x.source?.name}
              title={x?.teaserHeadline ?? x.title}
            />
          </Link>
        ))}
      <div className={styles.dividerLight} />
      <ul className={styles.articleList}>
        {!miningNews?.nodeListByCategory?.items?.length ? (
          <li>
            <ListItemTwoLine.Loading howMany={5} />
          </li>
        ) : (
          miningNews.nodeListByCategory.items
            ?.slice(1)
            ?.map((x: ArticleTeaserFragmentFragment) => (
              <li key={x.id}>
                <ListItemTwoLine.Data
                  title={x.teaserHeadline ?? x.title}
                  date={x.updatedAt}
                  source={x.source?.name}
                  url={x?.urlAlias}
                />
              </li>
            ))
        )}
      </ul>
      <div className="pt-5">
        <ArticleMoreButton
          title={"More from Kitco Mining"}
          href="/news/category/mining"
        />
      </div>
    </div>
  );
};
