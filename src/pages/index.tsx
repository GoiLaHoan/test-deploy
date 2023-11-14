import React from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";

import { TimestampProvider } from "~/src/utils/ctxTimestamp";
import { BsPlusSquareFill } from "react-icons/bs";

import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { news } from "../lib/news-factory.lib";

import { Link } from "react-aria-components";
import dates from "~/src/utils/dates";
import { LondonFixSidebar } from "../components-metals/LondonFixSidebar/LondonFixSidebar";

import Layout from "../components/Layout/Layout";
import { BreakingNews } from "~/src/components/breaking-news/breaking-news.component";

import MarketIndicesCell from "~/src/components-markets/MarketIndicesCell/MarketIndicesCell";

import AdvertBlock from "~/src/components/AdvertBlock/AdvertBlock";
import Divider from "~/src/components/Divider/Divider";
import ShanghaiGold from "~/src/components-metals/ShanghaiGold/ShanghaiGold";
import { VideoNewsOutter } from "~/src/components/video-news-outter-shell/video-news-outter-shell.component";

import MetalMonthAnnualCell from "~/src/components-metals/MetalMonthAnnualCell/MetalMonthAnnualCell";
import SilverPricePGMCell from "~/src/components-metals/SilverPricePGMCell/SilverPricePGMCell";
import { NewsMiningTrendsCell } from "~/src/components/news-mining-trends/news-mining-trends.component";

import { NewsHomepageCommentaries } from "~/src/components/news-home-page/news-home-page-commentaries.component";
import { NewsHomepageDesktop } from "~/src/components/news-home-page/news-home-page-desktop.component";

import { GoldIndicators } from "~/src/components/gold-indicators/gold-indicators.component";
import { GoldRatiosSidebar } from "~/src/components/gold-ratios-sidebar/gold-ratios-sidebar.component";
import { InvestmentTrends } from "~/src/components/investment-trends/investment-trends.component";
import { PressReleases } from "~/src/components/press-releases/press-releases.component";
import { TopFiveEquities } from "~/src/components/top-five-equities/top-five-equities.component";

import HomePageChartCell from "../features/home-page/HomePageChartCell";
import { MiningBanner } from "../components-news/MiningBanner/MiningBanner";
import { CryptosTable } from "../components-cryptos/CryptosTable/CryptosTable";

import styles from "./home-page.module.scss";
import gridAreas from "~/src/styles/gridAreas.module.scss";
import { Barcharts } from "../features/bar-charts/barcharts";

import CryptoMarkets from "../components/CryptoMarkets/CryptoMarkets";

import InvestorInformation from "../components/InvestorInformation/InvestorInformation";

const ExchangeRates = dynamic(
  async () =>
    await import("~/src/components/ExchangeRatesTable/ExchangeRatesTable"),
  { ssr: false },
);

const TradingViewCalendar = dynamic(
  async () =>
    await import("~/src/components/trading-view-iframes").then(
      (mod) => mod.TradingViewCalendar,
    ),
  { ssr: false },
);

const ExitModalContainer = dynamic(
  async () =>
    await import("~/src/components/ExitModalContainer/ExitModalContainer").then(
      (mod) => mod.default,
    ),
  { ssr: false },
);

export const getServerSideProps = async ({ res }) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: res,
    queries: [
      news.nodeListQueue({
        variables: { limit: 15, offset: 0, queueId: "latest_news" },
      }),
      news.marketNews({
        variables: { limit: 15, offset: 0 },
      }),
      news.streetNews({
        variables: { limit: 15, offset: 0 },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
    },
  };
};

const Home = ({ ssrTimestamp }) => {
  return (
    <TimestampProvider timestamp={ssrTimestamp}>
      <Layout title="Home">
        <div className={styles.breakingNewsContainer}>
          <BreakingNews />
        </div>
        <ExitModalContainer />
        <div className={clsx("block px-3 gap-5", styles.tabletGridOrder)}>
          <div
            className={clsx(
              "contents max-w-full",
              "lg:flex lg:flex-col lg:gap-5 lg:w-[200px]",
            )}
          >
            <div className={clsx(gridAreas.aa)}>
              <MetalMonthAnnualCell />
            </div>
            <div className={clsx(gridAreas.bb)}>
              <SilverPricePGMCell />
            </div>
            <div className={clsx(gridAreas.cc)}>
              <MarketIndicesCell />
            </div>
            <div className={clsx(gridAreas.dd)}>
              <LondonFixSidebar />
            </div>
            <div className={clsx(gridAreas.ee)}>
              <ShanghaiGold />
            </div>
            <div className={clsx("hidden lg:block", gridAreas.ff)}>
              <InvestorInformation />
            </div>
            <div className={clsx(gridAreas.gg)}>
              <h2 className="font-bold">XAU Index</h2>
              <Barcharts symbol="$XAU" href="/markets/indices/$XAU" />
            </div>
            <div className={clsx(gridAreas.hh)}>
              <h2 className="font-bold">HUI Index</h2>
              <Barcharts symbol="$HUI" href="/markets/indices/$HUI" />
            </div>
          </div>

          <div className={clsx("contents", "lg:flex lg:flex-col lg:gap-5")}>
            <div className={clsx(gridAreas.ii)}>
              {/* TODO: this breaks mobile responsive */}
              <NewsHomepageDesktop />
            </div>
            <Divider className={clsx("hidden lg:block")} />
            <div className={clsx(styles.miningBannerContainer)}>
              <MiningBanner />
            </div>
            <div className={clsx("hidden lg:block", gridAreas.kk)}>
              <NewsHomepageCommentaries />
            </div>
            <Divider className={clsx("hidden lg:block")} />

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
            <div className={clsx(gridAreas.mm)}>
              <PressReleases />
            </div>
            <div className={clsx("block md:hidden", gridAreas.tt)}>
              <CryptoMarkets />
            </div>
            <Divider className={clsx("lg:block")} />
            <div className={clsx(styles.miningBannerContainer)}>
              <MiningBanner />
            </div>
            <div className={clsx(gridAreas.nn)}>
              <TopFiveEquities />
            </div>
            <div className={clsx(gridAreas.oo)}>
              <ExchangeRates />
            </div>
            <div className={clsx(gridAreas.pp)}>
              <div>
                <Link href="/price/crypto" className="text-2xl font-semibold">
                  Crypto Market Live Quotes
                </Link>
              </div>
              <Divider className="hidden lg:block" />
              <div className="py-4">
                <span className="text-xs text-black/60">
                  Prices as of {dates.dayTime()} NY Time
                </span>
              </div>
              <div className="border border-ktc-date-gray/40">
                <CryptosTable />
              </div>
              <div
                className={clsx(
                  "flex justify-center items-center",
                  "w-full border border-t-0 border-ktc-date-gray/30 py-2",
                )}
              >
                <Link
                  href="/price/crypto"
                  className={clsx(
                    "flex items-center gap-2 opacity-70",
                    "hover:opacity-100",
                  )}
                >
                  <BsPlusSquareFill className="mt-[.10rem]" />
                  <span className="underline font-bold">More coins...</span>
                </Link>
              </div>
            </div>
          </div>

          <div
            className={clsx(
              "contents lg:flex lg:flex-col lg:gap-5 lg:w-[280px]",
            )}
          >
            <div className={clsx(gridAreas.qq, "max-w-full")}>
              <HomePageChartCell />
            </div>
            <div className={clsx("hidden lg:block", gridAreas.rr)}>
              <AdvertBlock />
            </div>
            <div className={clsx("hidden lg:block", gridAreas.ss)}>
              <VideoNewsOutter />
            </div>
            <div className={clsx("hidden md:block", gridAreas.tt)}>
              <CryptoMarkets />
            </div>
            <div className={clsx("hidden lg:block", gridAreas.uu)}>
              <GoldIndicators />
            </div>
            <div className={clsx("hidden lg:block", gridAreas.vv)}>
              <GoldRatiosSidebar />
            </div>
            <div className={clsx(gridAreas.vv, "hidden lg:block max-w-full")}>
              <TradingViewCalendar />
            </div>
          </div>
        </div>
      </Layout>
    </TimestampProvider>
  );
};

export default Home;
