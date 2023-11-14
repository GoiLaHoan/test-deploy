import { useEffect, type FC, useCallback, useState } from "react";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

import {
  ArticleTeaserFragmentFragment,
  NewsIndexPageQueryQuery,
} from "~/src/generated";

import {
  TeaserCard,
  TeaserLabelTitleDate,
  TeaserWide,
  TeaserWideTwo,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { NewsContentWrapper } from "~/src/components/news-content-wrapper/news-content-wrapper.component";
import NewsMeta from "~/src/components/news/meta";
import { ArticleMoreButtonNewsPages } from "~/src/components/article-more-button/article-more-button.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import cs from "~/src/utils/cs";
import { CategorySection } from "./section-category.component";
import { OpinionsSection } from "./section-opinions.component";
import { TrendingNowMobile } from "./section-trending.component";
import { VideosSection } from "./section-videos.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { newsCategories } from "~/src/lib/news-categories.lib";
import { categoryOffset } from "./news-landing-page.util";

export const NewsLandingMobile: FC = () => {
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
      <LatestNewsLandingSidebar data={latestNewsSidebar} />

      <Spacer className="h-5" />
      <NewsContentWrapper>
        <SecondSection data={secondSection} />
      </NewsContentWrapper>
      <AdvertisingSlot
        viewportsEnabled={{ mobile: true, tablet: true, desktop: false }}
        id={"mid_banner_one"}
        className={"min-h-[250px] w-[300px] mx-auto mt-5 mb-10 bg-red-500"}
      />
      <VideosSection slidesToShow={1.5} />
      <NewsContentWrapper>
        <Spacer className="h-10" />
        <TrendingNowMobile />
      </NewsContentWrapper>
      <OpinionsAndAdvert />
      <div className="grid gap-5 mt-[46px] px-5">
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
    <div>
      {data?.slice(0, 1).map((x: ArticleTeaserFragmentFragment) => (
        <TeaserCard size="lg" node={x} key={x.id} />
      ))}

      <Spacer className="h-[30px]" />
      {data?.slice(1, 4).map((x: ArticleTeaserFragmentFragment) => (
        <TeaserWideTwo aspectRatio="16x9" size="md" node={x} key={x?.id} />
      ))}
    </div>
  );
};

const LatestNewsLandingSidebar: FC<{
  data: NewsIndexPageQueryQuery["queue"]["items"];
}> = ({ data }) => {
  return (
    <div className="bg-[#f8f8f8] py-10 px-5">
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

      <AdvertisingSlot
        id={"native-example"}
        className={"h-[250px] w-[300px] bg-red-500 my-5 m-auto"}
        viewportsEnabled={{
          mobile: true,
          tablet: false,
          desktop: false,
        }}
      />
    </div>
  );
};

const SecondSection: FC<{
  data: NewsIndexPageQueryQuery["queue"]["items"];
}> = ({ data }) => {
  return (
    <div className="">
      {data?.slice(0, 1).map((x: ArticleTeaserFragmentFragment) => (
        <TeaserCard key={x.id} node={x} size="md" />
      ))}
      <Spacer className="h-[30px]" />
      <div className="flex flex-col justify-between">
        {data?.slice(1, 4).map((x: ArticleTeaserFragmentFragment) => (
          <TeaserWide key={x?.id} node={x} size="md" aspectRatio="16x9" />
        ))}
      </div>
    </div>
  );
};

const OpinionsAndAdvert: FC = () => {
  return (
    <div className="bg-[#f8f8f8] p-10 px-5">
      <h2
        className={cs([
          "text-xl font-bold uppercase mb-5 border-b border-b-ktc-borders pb-2.5 font-mulish text-[21px] leading-7",
        ])}
      >
        <span>Latest Opinions</span>
      </h2>
      <OpinionsSection />
      <ArticleMoreButtonNewsPages href="/opinions" label="More opinions" />
      <AdvertisingSlot
        id={"native-example"}
        className={"h-[250px] w-[300px] bg-red-500 mt-10 m-auto"}
        viewportsEnabled={{
          mobile: true,
          tablet: false,
          desktop: false,
        }}
      />
    </div>
  );
};
