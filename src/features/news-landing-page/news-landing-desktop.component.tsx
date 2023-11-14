import { type FC, useCallback } from "react";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import {
  ArticleTeaserFragmentFragment,
  NewsIndexPageQueryQuery,
} from "~/src/generated";

import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import {
  TeaserBigWide,
  TeaserCardForNewLanding,
  TeaserLabelTitleDate,
  TeaserTextOnly,
  TeaserWide,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { ArticleMoreButtonNewsPages } from "~/src/components/article-more-button/article-more-button.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { CategorySection } from "./section-category.component";
import { OpinionsSection } from "./section-opinions.component";
import { TrendingNowSection } from "./section-trending.component";
import { VideosSection } from "./section-videos.component";

import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";

import cs from "~/src/utils/cs";
import NewsMeta from "~/src/components/news/meta";
import fontStyles from "~/src/styles/news-typefaces.module.scss";
import { newsCategories } from "~/src/lib/news-categories.lib";
import { categoryOffset } from "./news-landing-page.util";

const NewsLandingDesktop: FC = () => {
  const { data } = useQuery(
    news.newsLandingPage({
      variables: {
        limit: 25,
        offset: 0,
      },
      options: {
        select: useCallback((d) => {
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

  const topSection = data?.queue?.items?.slice(0, 4);
  const latestNewsSidebar = data?.queue?.items?.slice(4, 9);
  const secondSection = data?.queue?.items?.slice(9, 13);

  const ignoredArticles = topSection?.concat(latestNewsSidebar, secondSection);

  return (
    <LayoutNewsLanding title="Latest News, Video News, Analysis and Opinions | KITCO NEWS">
      <NewsMeta></NewsMeta>
      <div>
        <ContentWrapper>
          <div className="flex border-b border-b-ktc-borders pb-10">
            <TopSection data={topSection} />
            <LatestNewsLandingSidebar data={latestNewsSidebar} />
          </div>
        </ContentWrapper>
        <SecondSection data={secondSection} />
        <VideosSection slidesToShow={4} />
        <AdvertisingSlot
          id={"banner-3"}
          className={
            "h-[90px] w-[728px] bg-red-400 mt-10 mx-auto lg:w-[970px] lg:h-[250px]"
          }
          viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
        />
        <ContentWrapper className="flex py-10 border-b border-b-ktc-borders">
          <TrendingNowSection />
          <OpinionsWrapper />
        </ContentWrapper>
        <ContentWrapper>
          <div className="flex mt-10">
            <div className="w-[calc(100%_-_320px)] pr-[34px] grid grid-cols-3 gap-5 pb-10">
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
              {/* <CategorySection */}
              {/*   title="Off The Wire" */}
              {/*   urlAlias="/news/category/off-the-wire" */}
              {/* /> */}
            </div>
            <div className="w-[320px] pl-5">
              <AdvertisingSlot
                viewportsEnabled={{
                  mobile: true,
                  tablet: true,
                  desktop: false,
                }}
                id={"right-rail-lg"}
                className={
                  "col-span-1 min-h-[1050px] w-[300px] mx-auto bg-red-400 mb-6"
                }
              />
            </div>
          </div>
        </ContentWrapper>
      </div>
    </LayoutNewsLanding>
  );
};

export default NewsLandingDesktop;

const ContentWrapper: FC<{
  children: any;
  className?: string;
}> = ({ children, className }) => (
  <div className={cs([className, "mx-auto w-[1240px]"])}>{children}</div>
);

const TopSection: FC<{ data: NewsIndexPageQueryQuery["queue"]["items"] }> = ({
  data,
}) => {
  return (
    <div className="w-[calc(100%_-_320px)] pr-5">
      {data?.slice(0, 1).map((x: ArticleTeaserFragmentFragment) => (
        <TeaserBigWide size="xl" aspectRatio="16x9" node={x} key={x.id} />
      ))}
      <Spacer className="h-5" />
      <div className=" grid grid-cols-3">
        {data?.slice(1, 4).map((x: ArticleTeaserFragmentFragment, idx) => (
          <div
            key={x.id}
            className={cs([
              "h-full py-2.5",
              idx > 0
                ? "pl-5 pr-8 border-l border-l-ktc-borders ml-[-15px]"
                : "pr-8",
              idx > 0 && idx === 2 ? "ml-[-9px]" : "",
            ])}
          >
            <TeaserTextOnly
              size="sm"
              node={x}
              key={x?.id}
              lineClamp="line-clamp-2"
            />
          </div>
        ))}
      </div>

      <AdvertisingSlot
        id={"banner-2"}
        className={"h-[90px] w-[728px] mt-10 mx-auto bg-red-400"}
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
      />
    </div>
  );
};

const LatestNewsLandingSidebar = ({
  data,
}: {
  data: NewsIndexPageQueryQuery["queue"]["items"];
}) => {
  return (
    <div className="w-[320px]">
      <div className="pl-[30px] border-l border-l-ktc-borders">
        <h2
          className={cs([
            fontStyles.titles,
            "text-xl text-[21px] font-bold uppercase mb-2",
          ])}
        >
          <span>Latest News</span>
        </h2>
        <Spacer className="bg-ktc-borders h-[1px] mb-4" />
        <div className="flex flex-col gap-[27px] h-full">
          {data?.map((x: ArticleTeaserFragmentFragment, idx) => (
            <TeaserLabelTitleDate size="md" key={x?.id || idx} node={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

const SecondSection: FC<{
  data: NewsIndexPageQueryQuery["queue"]["items"];
}> = ({ data }) => {
  return (
    <ContentWrapper className="py-10">
      <div className="flex divide-x divider-divide-gray-200">
        <div className="w-[calc(100%_-_320px)] grid grid-cols-2 mr-[20px] gap-[30px]">
          <div className="pr-[30px] border-r border-r-ktc-borders">
            {data?.slice(0, 1).map((x: ArticleTeaserFragmentFragment) => (
              <TeaserCardForNewLanding key={x.id} node={x} hideSummary={true} />
            ))}
          </div>
          {/* start middle column*/}
          <div className="flex flex-col">
            {data?.slice(1, 4).map((x: ArticleTeaserFragmentFragment) => (
              <TeaserWide
                key={x?.id}
                node={x}
                size="md"
                aspectRatio="16x9"
                spaceBottom="mb-[14px]"
              />
            ))}
          </div>
        </div>
        {/* end middle column*/}
        <div className="w-[320px] pl-5 justify-between">
          <AdvertisingSlot
            id={"right-rail-1"}
            className={"h-[250px] w-[300px] bg-red-400 mx-auto"}
            viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

const OpinionsWrapper: FC = () => {
  return (
    <div className="w-[320px]">
      <div className="pl-[20px] border-l border-l-ktc-borders">
        <div className="px-2.5">
          <h2
            className={cs([
              fontStyles.titles,
              "text-xl font-bold uppercase mb-2",
            ])}
          >
            <span>Latest Opinions</span>
          </h2>
          <Spacer className="bg-ktc-borders h-[1px] mb-3" />
          <OpinionsSection />
          <ArticleMoreButtonNewsPages label="More Opinions" href="/opinions" />
        </div>
        <div className="mt-12 h-[250px] w-[300px] bg-ktc-borders">
          Advert 300x250
        </div>
      </div>
    </div>
  );
};
