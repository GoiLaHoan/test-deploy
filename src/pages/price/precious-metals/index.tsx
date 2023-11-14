import type { NextPage } from "next";

import dayjs from "dayjs";
import clsx from "clsx";

import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { metals } from "~/src/lib/metals-factory.lib";
import { markets } from "~/src/lib/markets-factory.lib";
import { news } from "~/src/lib/news-factory.lib";

import Layout from "~/src/components/Layout/Layout";
import GoldRatiosCell from "~/src/components-metals/GoldRatiosCell/GoldRatiosCell";
import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import LondonFixCell from "~/src/components-metals/LondonFixCell/LondonFixCell";
import MarketIndicesCell from "~/src/components-markets/MarketIndicesCell/MarketIndicesCell";
import OtherIndicesCell from "~/src/components-markets/OtherIndicesCell/OtherIndicesCell";
import AllMetalQuotesCell from "~/src/components-metals/AllMetalQuotesCell/AllMetalQuotesCell";
import ShanghaiGold from "~/src/components-metals/ShanghaiGold/ShanghaiGold";
import GoldSilverNews from "~/src/components/gold-silver-news/gold-silver-news.component";
import { NewsMiningTrendsCell } from "~/src/components/news-mining-trends/news-mining-trends.component";
import { GoldIndicators } from "~/src/components/gold-indicators/gold-indicators.component";
import { InvestmentTrends } from "~/src/components/investment-trends/investment-trends.component";
import Divider from "~/src/components/Divider/Divider";

import styles from "./all-metal-quotes.module.scss";
import gridAreas from "~/src/styles/gridAreas.module.scss";

export const getServerSideProps = async () => {
  const ssrTimestamp = Math.floor(dayjs().unix() / 30) * 30;
  const { dehydratedState } = await ssrQueries({
    queries: [
      metals.allMetalsQuote({
        variables: {
          timestamp: ssrTimestamp,
          currency: "USD",
        },
      }),
      metals.shanghaiFix({
        variables: {
          timestamp: ssrTimestamp,
          symbol: "SHAU",
          currency: "USD",
        },
      }),
      markets.barchartsGoldIndicators({
        variables: {
          symbols: "$TTGD,$XAU,$HUI",
          timestamp: ssrTimestamp,
        },
      }),
      markets.regionIndices({
        variables: {
          timestamp: ssrTimestamp,
        },
      }),
      metals.londonFix({
        variables: {
          yesterday:
            Math.floor(
              dayjs().subtract(1, "day").minute(0).hour(0).second(0).unix() /
                30,
            ) * 30,
          today: ssrTimestamp,
        },
      }),
      news.nodeListQueue({
        variables: {
          limit: 10,
          offset: 0,
          queueId: "latest_news",
        },
      }),
      news.newsByCategoryGeneric({
        variables: {
          limit: 6,
          offset: 0,
          urlAlias: "/news/category/mining",
          includeRelatedCategories: true,
        },
      }),
      news.sponsoredContent({
        variables: {
          limit: 4,
          offset: 0,
        },
      }),
      metals.goldRatios({
        variables: {
          timestamp: ssrTimestamp,
          symbols: "$XAU,$HUI,$SPX,$DOWI",
        },
      }),
    ],
  });
  return {
    props: {
      ssrTimestamp,
      dehydratedState,
    },
  };
};

const AllMetalQuotes: NextPage<{ ssrTimestamp: number }> = ({
  ssrTimestamp,
}) => {
  return (
    <Layout title="All Metal Quotes">
      <div className={clsx("px-2", styles.tabletGridOrder)}>
        <div
          className={clsx("hidden lg:flex lg:flex-col lg:gap-5 lg:w-[200px]")}
        >
          <MarketIndicesCell />
          <ShanghaiGold ssrTimestamp={ssrTimestamp} />
          <GoldIndicators />
          <OtherIndicesCell />
        </div>
        <div className={clsx("contents lg:flex lg:flex-col lg:gap-5")}>
          <AllMetalQuotesCell title="New York Spot Price" />
          <LondonFixCell ssrTimestamp={ssrTimestamp} />
          <AllMetalQuotesCell title="World Spot Price" />
          <GoldRatiosCell ssrTimestamp={ssrTimestamp} />
          <Divider />
          <div
            className={clsx(
              "flex flex-col lg:grid grid-cols-7 gap-10 pb-5",
              gridAreas.ll,
            )}
          >
            <div className="col-span-4">
              <NewsMiningTrendsCell />
            </div>
            <div className="col-span-3">
              <InvestmentTrends />
            </div>
          </div>
          <Divider className="hidden lg:block" />
          <GoldSilverNews />
        </div>
        <div className={clsx("hidden lg:flex lg:flex-col lg:gap-5")}>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default AllMetalQuotes;
