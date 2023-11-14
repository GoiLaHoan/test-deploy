import { useEffect, type FC, useCallback, useState } from "react";
import { useQuery } from "react-query";

import {
  ArticleTeaserFragmentFragment,
  NewsIndexPageQueryQuery,
} from "~/src/generated";

import {
  TeaserBigWide,
  TeaserCard,
  TeaserLabelTitleDate,
  TeaserTextOnly,
  TeaserWide,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { NewsContentWrapper } from "~/src/components/news-content-wrapper/news-content-wrapper.component";
import NewsMeta from "~/src/components/news/meta";
import { news } from "~/src/lib/news-factory.lib";
import { ArticleMoreButtonNewsPages } from "~/src/components/article-more-button/article-more-button.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import cs from "~/src/utils/cs";
import AdvertisingSlot from "../advertising/AdvertisingSlot";
import { CategorySection } from "./section-category.component";
import { OpinionsSection } from "./section-opinions.component";
import { TrendingNowSection } from "./section-trending.component";
import { VideosSection } from "./section-videos.component";
import { newsCategories } from "~/src/lib/news-categories.lib";
import { categoryOffset } from "./news-landing-page.util";

export const NewsLandingTablet: FC = () => {
  const [offSet, setOffSet] = useState(0);
  const [dataDisplay, setDataDisplay] = useState<any>({ items: [] });

  const { data } = useQuery(
    news.newsLandingPage({
      variables: {
        limit: 80,
        offset: offSet,
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

  useEffect(() => {
    const dataItems = data?.queue?.items;
    const totalItems = data?.queue?.total;

    if (offSet < totalItems && dataDisplay?.items?.length < 20) {
      setDataDisplay((pre: any) => {
        const filteredData = { items: [...pre.items, ...dataItems] };
        if (filteredData?.items?.length < 20) {
          setOffSet(offSet + 20);
        }
        return filteredData;
      });
    }
  }, [data, offSet]);

  const topSection = dataDisplay?.items.slice(0, 4);
  const latestNewsSidebar = dataDisplay?.items.slice(4, 9); // only ever news articles, videos, audios
  const secondSection = dataDisplay?.items?.slice(9, 13);

  const ignoredArticles = topSection?.concat(latestNewsSidebar, secondSection);

  return (
    <LayoutNewsLanding title="Latest News, Video News, Analysis and Opinions | KITCO NEWS">
      <NewsMeta></NewsMeta>
      <NewsContentWrapper>
        <TopSection data={topSection} />
      </NewsContentWrapper>
      <Spacer className="h-10" />
      <LatestNewsLandingSidebar data={latestNewsSidebar} />
      <NewsContentWrapper>
        <SecondSection data={secondSection} />
      </NewsContentWrapper>
      <Spacer className="h-10" />
      <VideosSection slidesToShow={3} />
      <NewsContentWrapper>
        <Spacer className="h-10" />
        <TrendingNowSection />
        <Spacer className="h-5" />
      </NewsContentWrapper>
      <OpinionsAndAdvert />
      <div className="grid grid-cols-3 gap-5 mt-10 px-10">
        <CategorySection
          title="Commodities"
          urlAlias={newsCategories.commodities}
          offset={categoryOffset(ignoredArticles, newsCategories.commodities)}
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
          offset={categoryOffset(ignoredArticles, newsCategories.conferences)}
        />
      </div>
    </LayoutNewsLanding>
  );
};

const TopSection: FC<{ data: NewsIndexPageQueryQuery["queue"]["items"] }> = ({
  data,
}) => {
  return (
    <div className="col-span-2 mt-5">
      {data?.slice(0, 1).map((x: ArticleTeaserFragmentFragment) => (
        <TeaserBigWide size="xl" aspectRatio="16x9" node={x} key={x.id} />
      ))}

      <div className="pt-5 mt-5 grid grid-cols-3">
        {data?.slice(1, 4).map((x: ArticleTeaserFragmentFragment, idx) => (
          <div
            key={x.id}
            className={cs([
              "h-full",
              idx > 0
                ? "px-5 border-l border-l-ktc-borders ml-[-10px]"
                : "pr-5",
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
        className={"h-[90px] w-[728px] mt-10 mx-auto bg-red-500"}
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
      />
    </div>
  );
};

const LatestNewsLandingSidebar: FC<{
  data: NewsIndexPageQueryQuery["queue"]["items"];
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2.5 bg-[#f8f8f8] p-10">
      <div className="col-span-1">
        <h2
          className={cs([
            "text-xl font-bold uppercase mb-5 border-b border-b-ktc-borders pb-2.5 text-[21px] leading-7",
          ])}
        >
          <span>Latest News</span>
        </h2>
        <div className="flex flex-col gap-[30px] h-full">
          {data?.map((x: ArticleTeaserFragmentFragment) => (
            <TeaserLabelTitleDate size="md" key={x.id} node={x} />
          ))}
        </div>
      </div>
      <AdvertisingSlot
        id={"banner-2"}
        className={"h-[600px] w-[300px] mx-auto bg-red-500"}
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
      />
    </div>
  );
};

const SecondSection: FC<{
  data: NewsIndexPageQueryQuery["queue"]["items"];
}> = ({ data }) => {
  return (
    <>
      <div className="mt-10 grid grid-cols-2 divide-x divider-divide-gray-200">
        <div className="pr-[30px]">
          {data?.slice(0, 1).map((x: ArticleTeaserFragmentFragment) => (
            <TeaserCard key={x.id} node={x} size="md" hideSummary={true} />
          ))}
        </div>
        {/* start middle column*/}
        <div className="flex flex-col pl-[30px]">
          {data?.slice(1, 4).map((x: ArticleTeaserFragmentFragment) => (
            <TeaserWide
              key={x?.id}
              node={x}
              size="md"
              aspectRatio="16x9"
              lineClampTitle="line-clamp-2"
            />
          ))}
        </div>
      </div>
      <AdvertisingSlot
        id={"banner-2"}
        className={"h-[90px] w-[728px] mt-10 mx-auto bg-red-500 self-center"}
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
      />
    </>
  );
};

const OpinionsAndAdvert: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 bg-[#f8f8f8] p-10">
      <div className="col-span-1 px-2.5">
        <h2 className="text-xl font-bold uppercase mb-5 border-b border-b-ktc-borders pb-2.5 font-mulish text-[21px] leading-7">
          <span>Latest Opinions</span>
        </h2>
        <OpinionsSection />
        <ArticleMoreButtonNewsPages label="More Opinions" href="/opinions" />
      </div>
      <AdvertisingSlot
        id={"banner-2"}
        className={"h-[600px] w-[300px] mx-auto bg-red-500"}
        viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
      />
    </div>
  );
};
