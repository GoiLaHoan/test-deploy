import type { FC } from "react";
import type { ArticleTeaserFragmentFragment } from "~/src/generated";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import useScreenSize from "~/src/utils/useScreenSize";
import {
  TeaserCard,
  TeaserCardMobile,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";

export const RelatedArticles: FC<{
  currentNodeCategory: string;
  currentNodeId: number;
}> = ({ currentNodeCategory, currentNodeId }) => {
  const { data } = useQuery(
    news.newsByCategoryGeneric({
      variables: {
        limit: 6,
        offset: 0,
        includeRelatedCategories: false,
        urlAlias: currentNodeCategory,
      },
      options: {
        enabled: true,
        // transform items returned by query
        select: (d) => {
          const filterItems = d?.nodeListByCategory?.items
            // filter commentaries
            ?.filter((x) => x?.__typename !== "Commentary")
            // filter current node
            ?.filter(
              (x: ArticleTeaserFragmentFragment) => x.id !== currentNodeId,
            )
            .slice(0, 3);
          const preserve = { ...d?.nodeListByCategory, items: filterItems };

          return { ...d, nodeListByCategory: preserve };
        },
      },
    }),
  );

  const { isMobile } = useScreenSize();

  const articles = data?.nodeListByCategory?.items ?? [];

  const classTeaserCard = !isMobile
    ? "grid grid-cols-3 gap-10"
    : "grid grid-row-3 gap-10";

  return (
    <aside>
      <h3 className="text-2xl border-b border-ktc-borders pb-2.5 mb-5 font-mulish">
        Related Articles
      </h3>
      {articles.length === 0 ? (
        <NoRelatedArticlesShowLatestNews
          currentNodeId={currentNodeId}
          classTeaserCard={classTeaserCard}
          isMobile={isMobile}
        />
      ) : (
        <div className={classTeaserCard}>
          {articles?.map((article: ArticleTeaserFragmentFragment) => {
            return !isMobile ? (
              <TeaserCard key={article.id} node={article} size="sm" />
            ) : (
              <TeaserCardMobile key={article.id} node={article} size="sm" />
            );
          })}
        </div>
      )}
    </aside>
  );
};

export function NoRelatedArticlesShowLatestNews(props: {
  currentNodeId: number;
  classTeaserCard: string;
  isMobile: boolean;
}) {
  // NOTE: trending is not a query, it's preserved state from the ssr query
  const { data } = useQuery(
    news.nodeListQueue({
      variables: {
        queueId: "latest_news",
        limit: 5,
        offset: 0,
      },
      options: {
        enabled: true,
        select: (d) => {
          const filterItems = d?.nodeListQueue?.items
            ?.filter((x) => x?.__typename !== "Commentary")
            ?.filter(
              (x: ArticleTeaserFragmentFragment) =>
                x.id !== props.currentNodeId,
            )
            .slice(0, 3);

          // this mostly just preserves the return type of the query
          const preserveDataModel = { ...d?.nodeListQueue, items: filterItems };

          return { ...d, nodeListQueue: preserveDataModel };
        },
      },
    }),
  );

  return (
    <div className={props.classTeaserCard}>
      {data?.nodeListQueue?.items?.map(
        (article: ArticleTeaserFragmentFragment) => {
          return !props.isMobile ? (
            <TeaserCard key={article.id} node={article} size="sm" />
          ) : (
            <TeaserCardMobile key={article.id} node={article} size="sm" />
          );
        },
      )}
    </div>
  );
}
