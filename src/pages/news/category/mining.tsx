import type { NextPage } from "next";
import type { FC } from "react";

import { Fragment, useCallback } from "react";
import { useQuery } from "react-query";
import {
  TeaserCardForNewParent,
  TeaserTextOnly,
  TeaserWide,
  TeaserWideForSubCategory,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import {
  GenericNewsListLayoutNewParent,
  GenericNewsListMining,
} from "~/src/components/generic-news-list/generic-news-list.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { NewsCategoryTitle } from "~/src/components/news-category/news-category.component";
import { NewsByCategoryGenericQuery } from "~/src/generated";
import type { ArticlesUnion, TeasersUnion } from "~/src/types/types";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import useScreenSize from "~/src/utils/useScreenSize";
import { useInfinite, useParams } from "~/src/utils/infiniteScroll";
import { Spacer } from "~/src/components/spacer/spacer.component";
import StrippedString from "~/src/utils/strippedString";
import React from "react";
import { MiningBanner } from "~/src/components-news/MiningBanner/MiningBanner";

export type TVariables = {
  urlAlias: string;
  limit: number;
  offset: number;
};

export async function getServerSideProps({ res }) {
  const variables = {
    urlAlias: `/news/category/mining`,
    limit: 20,
    offset: 0,
    includeRelatedCategories: true,
  };

  const { dehydratedState } = await ssrQueries({
    ctxRes: res,
    queries: [
      news.newsByCategoryGeneric({ variables }),
      news.newsCategoriesTree(),
    ],
  });

  return {
    props: {
      dehydratedState,
      variables,
    },
  };
}

type Data = NewsByCategoryGenericQuery["nodeListByCategory"]["items"];

const CategoryAliasPage: NextPage<{ variables: TVariables }> = ({
  variables,
}) => {
  const { params, incrementParams } = useParams(20);
  const { data } = useQuery(
    news.newsByCategoryGeneric({
      variables: {
        ...params,
        urlAlias: variables?.urlAlias,
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

  const { ref, items, loading } = useInfinite({
    items: data?.nodeListByCategory?.items,
    incrementParams,
    total: data?.nodeListByCategory?.total,
  });

  const { isDesktop, isMobile, isTablet, isDesktopExtraLarge } =
    useScreenSize();

  let itemsOrData = !items?.length ? data?.nodeListByCategory?.items : items;
  // Filter and handle teaserSnippet field missing
  itemsOrData = itemsOrData?.map((item) => {
    if (!item.teaserSnippet) {
      const pFirst = StrippedString(item?.source?.description)?.replace(
        "&nbsp;",
        " ",
      );
      return { ...item, teaserSnippet: pFirst };
    }
    return { ...item };
  });

  return (
    <LayoutNewsLanding title="News">
      <div className="px-[20px] mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <NewsCategoryTitle />
        {isMobile && <CategoryAliasPageMobile data={itemsOrData} />}
        {isTablet && <CategoryAliasPageTablet data={itemsOrData} />}
        {(isDesktop || isDesktopExtraLarge) && (
          <CategoryAliasPageDesktop data={itemsOrData} />
        )}
        <div ref={ref}>{loading && <div>Loading...</div>}</div>
      </div>
    </LayoutNewsLanding>
  );
};

export default CategoryAliasPage;

const CategoryAliasPageDesktop: FC<{ data: Data }> = ({ data }) => {
  return (
    <Fragment>
      <FirstSectionDesktop data={data?.slice(0, 5)} />
      <SecondSectionDesktop data={data?.slice(5, 8)} />
      <MiningBanner className="mt-[22px] pt-[18px]" />
      <ThirdSectionDesktop data={data?.slice(8, 11)} />
      <Spacer className="h-5" />
      <GenericNewsListMining
        data={data?.slice(11, data?.length)}
        disableAdverts={true}
        hideCategory
      />
      <Spacer className="h-20" />
    </Fragment>
  );
};

const CategoryAliasPageTablet: FC<{ data: Data }> = ({ data }) => {
  return (
    <Fragment>
      <FirstSectionTablet data={data?.slice(0, 5)} />
      <SecondSectionTablet data={data?.slice(5, 8)} />
      <MiningBanner className="mt-[22px] pt-[18px]" />
      <ThirdSectionTablet data={data?.slice(8, 11)} />
      <GenericNewsListLayoutNewParent
        data={data?.slice(11, data?.length)}
        hideCategory
        classTitle="mt-[-7px]"
      />
    </Fragment>
  );
};

const CategoryAliasPageMobile: FC<{ data: Data }> = ({ data }) => {
  return (
    <Fragment>
      <GenericNewsListLayoutNewParent data={data} hideCategory />
    </Fragment>
  );
};

const FirstSectionDesktop: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex pb-8 border-b border-ktc-borders">
      <div className="w-6.5/10 pr-[40px] border-r border-ktc-borders">
        <TeaserCardForNewParent
          node={data?.[0] as ArticlesUnion}
          size="xl"
          hideCategory
        />
      </div>
      <div className="w-3.5/10 pl-[40px] flex flex-col">
        <div>
          {data
            ?.slice(1, data?.length)
            .map((node: TeasersUnion, idx: number) => {
              if (idx === 3) {
                return (
                  <Fragment key={node?.id}>
                    <div className="mb-[34px]">
                      <AdvertisingSlot
                        id={"news-native"}
                        className={"md:h-[90px] md:w-100 bg-red-400"}
                        viewportsEnabled={{
                          mobile: true,
                          tablet: true,
                          desktop: false,
                        }}
                      />
                    </div>
                    <div className="mb-[34px]" key={node.id ?? idx}>
                      <TeaserWide
                        node={node}
                        key={node.id}
                        size="md"
                        aspectRatio="auto"
                        hideCategory
                      />
                    </div>
                  </Fragment>
                );
              } else {
                return (
                  <div className="mb-[34px]" key={node.id ?? idx}>
                    <TeaserWide
                      node={node}
                      key={node.id}
                      size="md"
                      aspectRatio="auto"
                      hideCategory
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

const SecondSectionDesktop: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex justify-between py-10 border-b border-ktc-borders gap-10">
      <div className="w-1/3">
        <TeaserTextOnly
          node={data?.[0] as ArticlesUnion}
          size="md"
          hideCategory
        />
      </div>
      <div className="w-1/3">
        <TeaserTextOnly
          node={data?.[1] as ArticlesUnion}
          size="md"
          hideCategory
        />
      </div>
      <div className="w-1/3">
        <TeaserTextOnly
          node={data?.[2] as ArticlesUnion}
          size="md"
          hideCategory
        />
      </div>
    </div>
  );
};

const ThirdSectionDesktop: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-10 py-10 border-b border-ktc-borders">
      {data?.map((node: TeasersUnion) => (
        <TeaserCardForNewParent
          node={node}
          size="md"
          key={node.id}
          hideCategory
        />
      ))}
    </div>
  );
};

const ThirdSectionTablet: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-10 pt-10 pb-10 border-b border-ktc-borders">
      {data?.map((node: TeasersUnion) => (
        <TeaserCardForNewParent
          node={node}
          size="md"
          lineClamp="line-clamp-4"
          key={node.id}
          hideCategory
        />
      ))}
    </div>
  );
};

const FirstSectionTablet: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="border-b border-ktc-borders pb-1">
      <div className="pb-[48px]">
        <TeaserCardForNewParent
          node={data?.[0] as ArticlesUnion}
          size="xl"
          hideCategory
        />
      </div>
      <div className="flex flex-col pt-10 border-t border-ktc-borders">
        <div>
          {data
            ?.slice(1, data?.length)
            .map((node: TeasersUnion, idx: number) => {
              if (idx === 3) {
                return (
                  <Fragment key={node.id ?? idx}>
                    <div className="mb-[34px]">
                      <AdvertisingSlot
                        id={"banner-1"}
                        className={
                          "md:h-[90px] md:w-[728px] bg-red-400 mx-auto my-12"
                        }
                        viewportsEnabled={{
                          mobile: true,
                          tablet: true,
                          desktop: false,
                        }}
                      />
                    </div>
                    <div className="mb-8" key={node.id ?? idx}>
                      <TeaserWideForSubCategory
                        node={node}
                        key={node.id}
                        size="lg"
                        aspectRatio="16x9"
                        hideCategory
                      />
                    </div>
                  </Fragment>
                );
              } else {
                return (
                  <div className="mb-8" key={node.id ?? idx}>
                    <TeaserWideForSubCategory
                      node={node}
                      key={node.id}
                      size="lg"
                      aspectRatio="16x9"
                      hideCategory
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

const SecondSectionTablet: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex justify-between pt-10 pb-10 border-b border-ktc-borders gap-10">
      <div className="w-1/3">
        <TeaserTextOnly
          node={data?.[0] as ArticlesUnion}
          size="sm"
          lineClamp="line-clamp-2"
          hideCategory
        />
      </div>
      <div className="w-1/3">
        <TeaserTextOnly
          node={data?.[1] as ArticlesUnion}
          size="sm"
          lineClamp="line-clamp-2"
          hideCategory
        />
      </div>
      <div className="w-1/3">
        <TeaserTextOnly
          node={data?.[2] as ArticlesUnion}
          size="sm"
          lineClamp="line-clamp-2"
          hideCategory
        />
      </div>
    </div>
  );
};
