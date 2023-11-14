import { clsx } from "clsx";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import type { FC } from "react";
import React from "react";

import { categoryOffset } from "~/src/features/news-landing-page/news-landing-page.util";
import {
  newsCategories,
  type NewsCategoriesValues,
} from "~/src/lib/news-categories.lib";

import { ContentWrapper } from "~/src/components-news/ContentWrapper/ContentWrapper.component";
import * as Teaser from "~/src/components-news/Teasers/Teasers";
import { ArticleMoreButtonNewsPages } from "~/src/components/article-more-button/article-more-button.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import NewsMeta from "~/src/components/news/meta";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { VideosSection } from "~/src/features/news-landing-page/section-videos.component";

import { useQuery } from "react-query";
import type {
  ArticleTeaserFragmentFragment,
  CommentaryTeaserFragmentFragment,
} from "~/src/generated";
import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

import fontStyles from "~/src/styles/news-typefaces.module.scss";
import { FeaturedArticle } from "~/src/components-news/Teasers/FeaturedArticle";
import { FeaturedNext } from "~/src/components-news/Teasers/FeaturedNext";
import { LatestItem } from "~/src/components-news/Teasers/LatestItem";
import useScreenSize from "~/src/utils/useScreenSize";

export const getServerSideProps = (async ({ res }) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: res,
    queries: [
      news.newsLandingPage({
        variables: {
          limit: 25,
          offset: 0,
        },
      }),
      news.newsTrending({
        variables: { limit: 10 },
      }),
      news.newsCommentaries({
        variables: { limit: 4, offset: 0 },
      }),
      news.newsCategoriesTree(),
    ],
  });

  return {
    props: {
      dehydratedState,
    },
  };
}) satisfies GetServerSideProps;

const News: FC = () => {
  const { isDesktop, isTablet, isMobile } = useScreenSize();
  const { data } = useQuery(
    news.newsLandingPage({
      variables: {
        limit: 25,
        offset: 0,
      },
      options: {
        select: React.useCallback((d) => {
          const short = d?.queue;
          return {
            queue: {
              ...short,
              items: short?.items?.filter((x: any) => {
                if (x?.featured === undefined) {
                  return x;
                } else {
                  if (x?.featured === true) {
                    return x;
                  }
                }
              }),
            },
          };
        }, []),
      },
    }),
  );

  const topSection = data?.queue?.items?.slice(
    1,
    4,
  ) as ArticleTeaserFragmentFragment[];
  const latestNewsSidebar = data?.queue?.items?.slice(
    4,
    9,
  ) as ArticleTeaserFragmentFragment[];
  const secondSection = data?.queue?.items?.slice(
    9,
    13,
  ) as ArticleTeaserFragmentFragment[];

  const ignoredArticles = topSection?.concat(latestNewsSidebar, secondSection);

  function videoSlidesCount(): number {
    if (isDesktop) return 4;
    if (isTablet) return 3;
    if (isMobile) return 1.5;
    return 3;
  }

  return (
    <LayoutNewsLanding title="Latest News, Video News, Analysis and Opinions | KITCO NEWS">
      <NewsMeta />
      <div className="block max-w-full">
        {/* top section */}
        <ContentWrapper
          className={clsx(
            "block !max-w-full",
            "lg:grid lg:grid-cols-[1fr_320px]",
            "!px-0 lg:!px-5",
          )}
        >
          <div className={clsx("mr-0 lg:mr-5", "px-5 lg:px-0")}>
            <FeaturedArticle
              data={data?.queue?.items?.[0] as ArticleTeaserFragmentFragment}
            />

            {/* articles underneath featured */}
            <div
              className={clsx(
                "grid md:grid-cols-3",
                "divide-x-0 md:divide-x divide-ktc-borders",
              )}
            >
              {topSection?.map((data) => (
                <FeaturedNext key={data.id} data={data} />
              ))}
            </div>
            {/* TODO: fix responsiveness, this fixed width one breaks fluidity */}
            <AdvertisingSlot
              id={"banner-2"}
              className={
                "hidden lg:block h-[90px] w-[728px] mt-10 mx-auto bg-red-400"
              }
              viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
            />
          </div>

          {/* latest news */}
          <SidebarContainer>
            <SidebarLeftBorder>
              <SidebarTitle>Latest News</SidebarTitle>
              <div className="flex flex-col gap-[27px] h-full">
                {latestNewsSidebar?.map(
                  (data: ArticleTeaserFragmentFragment) => (
                    <LatestItem key={data.id} data={data} />
                  ),
                )}
              </div>
            </SidebarLeftBorder>
            <div className="hidden md:block lg:hidden">
              <div className="h-[600px] w-[300px] mx-auto bg-red-500" />
            </div>
          </SidebarContainer>
        </ContentWrapper>
        {/* end top section */}

        <HR className="opacity-0 lg:opacity-1 my-10" />

        {/* second row three columns */}
        <ContentWrapper
          className={clsx(
            "grid",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_320px]",
            "md:divide-x md:divide-ktc-borders pb-10",
          )}
        >
          <Teaser.CtxProvider
            node={secondSection?.[0]}
            className="pr-0 pb-[30px] md:pb-0 md:pr-[30px]"
          >
            <Teaser.Image
              height={508}
              width={808}
              className="max-w-full md:max-w-[400px]"
            />
            <Teaser.Category />
            <Teaser.TitleLink className="text-[20px] leading-[130%] my-2" />
            <Teaser.Summary className="mb-2 line-clamp-2 md:line-clamp-3" />
            <Teaser.DateTime />
          </Teaser.CtxProvider>
          <div className="flex flex-col gap-[14px]">
            {secondSection?.slice(1, 4)?.map((x) => (
              <Teaser.CtxProvider
                key={x.id}
                node={x}
                className="px-0 md:px-[30px] flex"
              >
                <Teaser.Image
                  width={240}
                  height={180}
                  className="min-w-[120px] w-[120px]"
                  aspectRatio="aspect-[4/3]"
                />
                <div className="pl-4">
                  <Teaser.Category className="mb-[2px]" />
                  <div className="flex flex-col">
                    <Teaser.TitleLink className="mb-1 text-[16px] leading-[130%] line-clamp-3" />
                    <Teaser.DateTime />
                  </div>
                </div>
              </Teaser.CtxProvider>
            ))}
          </div>
          <div className="hidden lg:block w-full pl-5 justify-between">
            <AdvertisingSlot
              id={"right-rail-1"}
              className={"h-[250px] w-[300px] bg-red-400 mx-auto"}
              viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
            />
          </div>
        </ContentWrapper>
        {/* end second row three columns */}

        {/* videos section */}
        <VideosSection slidesToShow={videoSlidesCount()} />
        {/* end videos section */}

        {/* advert above trending and opinions */}
        <AdvertisingSlot
          id={"banner-3"}
          className={
            "hidden md:block h-[90px] w-[728px] bg-red-400 mt-10 mx-auto lg:w-[970px] lg:h-[250px]"
          }
          viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
        />
        {/* end advert above trending and opinions */}

        {/* trending and opinions */}
        <ContentWrapper
          className={clsx(
            "grid lg:grid-cols-[1fr_320px] pt-10",
            "!px-0 lg:px-6",
          )}
        >
          <TrendingNowSection />
          <OpinionsSection />
        </ContentWrapper>
        {/* end trending and opinions */}

        <HR className="hidden lg:block my-10" />

        {/* categories */}
        <ContentWrapper
          className={clsx("pt-10 block lg:grid lg:grid-cols-[1fr_320px] ")}
        >
          <div className="grid md:grid-cols-3 gap-5 pr-0 lg:pr-[34px]">
            <CategorySection
              title="Commodities"
              urlAlias={newsCategories.commodities}
              offset={categoryOffset(
                ignoredArticles,
                newsCategories.commodities,
              )}
            />
            <CategorySection
              title="Cryptocurrencies"
              urlAlias={newsCategories.cryptocurrencies}
              offset={categoryOffset(
                ignoredArticles,
                newsCategories.cryptocurrencies,
              )}
            />
            <CategorySection
              title="Mining"
              urlAlias={newsCategories.mining}
              offset={categoryOffset(ignoredArticles, newsCategories.mining)}
            />
            <CategorySection
              title="Economy"
              urlAlias={newsCategories.economy}
              offset={categoryOffset(ignoredArticles, newsCategories.economy)}
            />
            <CategorySection
              title="Conferences"
              urlAlias={newsCategories.conferences}
              offset={categoryOffset(
                ignoredArticles,
                newsCategories.conferences,
              )}
            />
            <CategorySection
              title="Off The Wire"
              urlAlias="/news/category/off-the-wire"
            />
          </div>
          <div className="hidden lg:block pl-[30px]">
            <AdvertisingSlot
              viewportsEnabled={{
                mobile: false,
                tablet: false,
                desktop: true,
              }}
              id={"right-rail-lg"}
              className={
                "col-span-1 min-h-[1050px] w-[300px] mx-auto bg-red-400 mb-6"
              }
            />
          </div>
        </ContentWrapper>
      </div>
      {/* end categories */}
    </LayoutNewsLanding>
  );
};

export default News;

const SidebarTitle: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <h2
      className={clsx(
        fontStyles.titles,
        "text-xl text-[21px] font-bold uppercase pb-2 mb-2",
        "border-b border-ktc-borders",
      )}
    >
      <span>{children}</span>
    </h2>
  );
};

const HR: FC<{ className?: string }> = ({ className }) => (
  <hr
    className={clsx(
      "h1 bg-ktc-borders",
      "mx-auto w-full lg:w-[1240px]",
      className,
    )}
  />
);

const SidebarLeftBorder: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className={clsx(
      "pl-0 border-l-0",
      "lg:pl-[30px] lg:border-l lg:border-ktc-borders",
    )}
  >
    {children}
  </div>
);

const SidebarContainer: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className={clsx(
      "w-full lg:w-[320px]",
      "bg-[#F8F8F8] lg:bg-white",
      "grid gap-2.5 md:grid-cols-2 lg:block",
      "py-10 px-5 mt-10 lg:p-0 lg:mt-0",
    )}
  >
    {children}
  </div>
);

export const TrendingNowSection: FC = () => {
  const { data } = useQuery(news.newsTrending({ variables: { limit: 10 } }));

  return (
    <div className="w-full flex flex-col px-4 lg:pr-5 lg:px-0">
      <h2 className={clsx("text-[24px] md:text-[32px] pb-6")}>
        <span>Now Trending</span>
      </h2>
      <div className="flex flex-col gap-[1.875rem]">
        {data?.nodeListTrending
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment, idx: number) => {
            if (idx === 0) {
              return (
                <Teaser.CtxProvider key={x.id} node={x} className="flex">
                  <Teaser.Image
                    width={600}
                    height={340}
                    className={clsx(
                      "hidden md:block md:w-[325px] md:min-w-[325px]",
                    )}
                  />
                  <div className="flex flex-col pl-0 md:pl-5 mb-0 md:mb-5">
                    <Teaser.Category className="mb-1" />
                    <div className="flex flex-col">
                      <Teaser.Title
                        className={clsx(
                          "text-[20px] leading-[130%] line-clamp-3 md:text-[24px] md:line-clamp-2 mb-2",
                        )}
                      />
                      <Teaser.Summary className="hidden md:block mb-2" />
                      <Teaser.DateTime className="justify-self-end" />
                    </div>
                  </div>
                </Teaser.CtxProvider>
              );
            }
            return (
              <Teaser.CtxProvider key={x.id} node={x} className="flex">
                <Teaser.Image
                  width={304}
                  height={170}
                  className={clsx(
                    "hidden md:block md:min-w-[152px] md:w-[152px] relative",
                  )}
                />
                <div className="flex flex-col pl-0 md:pl-5">
                  <Teaser.Category className="mb-1" />
                  <Teaser.TitleLink className="text-[20px] leading-[130%] line-clamp-3 mb-2 md:mb-0" />
                  <Teaser.DateTime className="justify-self-end" />
                </div>
              </Teaser.CtxProvider>
            );
          })}
      </div>
    </div>
  );
};

export const OpinionsSection: FC = () => {
  const { data } = useQuery(
    news.newsCommentaries({
      variables: { limit: 4, offset: 0 },
    }),
  );
  return (
    <SidebarContainer>
      <SidebarLeftBorder>
        <SidebarTitle>Opinions</SidebarTitle>
        <div className="flex flex-col gap-3">
          {data?.commentaries?.items?.map(
            (x: CommentaryTeaserFragmentFragment) => (
              <Teaser.CtxProvider
                node={x}
                key={x.id}
                className="border-b border-ktc-borders last:border-0"
              >
                <Teaser.Title className="text-[16px] leading-[130%] mb-2" />
                <Teaser.AuthorDates />
              </Teaser.CtxProvider>
            ),
          )}
        </div>
        <ArticleMoreButtonNewsPages label="More Opinions" href="/opinions" />
      </SidebarLeftBorder>
      <div
        className={clsx(
          "mt-12 h-[250px] w-[300px] bg-red-500",
          "mx-auto lg:mx-0",
        )}
      >
        Advert 300x250
      </div>
    </SidebarContainer>
  );
};

export const CategorySection: FC<{
  title: string;
  urlAlias: NewsCategoriesValues;
  offset?: number;
}> = ({ title, urlAlias, offset = 0 }) => {
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
        select: React.useCallback((d) => {
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
    <div className="pb-10">
      <HeaderSectionCategory title={title} urlAlias={urlAlias} />
      <div className="divide-y divide-ktc-borders">
        {data?.nodeListByCategory?.items?.map(
          (x: ArticleTeaserFragmentFragment, idx: number) => (
            <div className="py-[18px] last:pb-0 md:relative" key={x.id}>
              {idx === 0 ? (
                <Teaser.CtxProvider node={x} className="flex flex-col">
                  <Teaser.Image width={304} height={170} />
                  <Teaser.TitleLink className="mt-3 md:min-h-[44px] text-[20px] md:text-[17px] leading-[130%]" />
                  <Teaser.Summary className="my-2 summary md:min-h-[60px]" />
                  <Teaser.DateTime />
                </Teaser.CtxProvider>
              ) : (
                <Teaser.CtxProvider node={x} className="flex flex-col gap-2">
                  <Teaser.TitleLink className="md:min-h-[44px] text-[20px] md:text-[17px] leading-[130%]" />
                  <Teaser.DateTime />
                </Teaser.CtxProvider>
              )}
            </div>
          ),
        )}
      </div>
      <div className="block md:hidden">
        <ArticleMoreButtonNewsPages label="See More" href={urlAlias} />
      </div>
    </div>
  );
};

const HeaderSectionCategory = ({ title, urlAlias }) => {
  return (
    <h2>
      <Link href={urlAlias}>
        <span className="font-bold text-[#373737] hover:underline text-xl uppercase text-[21px] leading-[27px] inline-block mt-[-5px]">
          {title}
        </span>
      </Link>
    </h2>
  );
};
