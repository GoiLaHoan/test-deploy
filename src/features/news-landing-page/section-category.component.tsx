import { type FC, useCallback } from "react";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import {
  TeaserCardForCategorySection,
  TeaserTextOnlyNewPage,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { ArticleMoreButtonNewsPages } from "~/src/components/article-more-button/article-more-button.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { NewsCategoriesValues } from "~/src/lib/news-categories.lib";
import useScreenSize from "~/src/utils/useScreenSize";
import Link from "next/link";

export const CategorySection: FC<{
  title: string;
  urlAlias: NewsCategoriesValues;
  offset?: number;
}> = ({ title, urlAlias, offset = 0 }) => {
  const { isMobile } = useScreenSize();
  const { data } = useQuery(
    news.newsByCategoryGeneric({
      variables: {
        limit: 3,
        offset: offset,
        urlAlias,
        includeRelatedCategories: false,
        includeEntityQueues: false,
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
    <div>
      <h2>
        <HeaderSectionCategory title={title} urlAlias={urlAlias} />
      </h2>
      <div className="divide-y divide-ktc-borders">
        {data?.nodeListByCategory?.items?.map((x: any, idx: number) => (
          <div className="py-[18px] last:pb-0 md:relative" key={x.id}>
            {idx === 0 ? (
              <TeaserCardForCategorySection
                size="md"
                node={x}
                key={x.id}
                hideCategory={true}
              />
            ) : (
              <TeaserTextOnlyNewPage
                size="md"
                node={x}
                key={x.id}
                hideCategory={true}
                hideSummary={true}
              />
            )}
          </div>
        ))}
      </div>
      {isMobile && (
        <ArticleMoreButtonNewsPages label="See More" href={urlAlias} />
      )}
      <Spacer className="h-10" />
    </div>
  );
};

const HeaderSectionCategory = ({ title, urlAlias }) => {
  return (
    <Link href={urlAlias}>
      <span className="font-bold text-[#373737] hover:underline text-xl uppercase text-[21px] leading-[27px] inline-block mt-[-5px]">
        {title}
      </span>
    </Link>
  );
};
