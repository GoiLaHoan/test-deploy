import React from "react";

import BarchartsLeadersCell from "~/src/components-markets/BarchartsLeadersCell/BarchartsLeadersCell";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import BarchartChartGrid from "~/src/components-markets/BarchartChartGrid/BarchartChartGrid";
import Layout from "~/src/components/Layout/Layout";
import { markets } from "~/src/lib/markets-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

export async function getServerSideProps(ctx) {
  const { dehydratedState } = await ssrQueries({
    ctxRes: ctx.res,
    queries: [
      markets.barchartsLeaders({
        variables: {
          leaderType: "active",
          limit: 5,
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
    },
  };
}

const StocksLanding = () => {
  return (
    <Layout title="Stocks">
      <div className="lg:layout-cols-2 sm:layout-cols-1">
        <div className="left">
          <BarchartChartGrid columns={2}>
            <Barcharts
              symbol="$DOWI"
              href="/markets/indices/$DOWI"
              title="Dow Jones Industrial Average "
            />
            <div className="block mt-8 md:mt-0">
              <Barcharts
                symbol="$SPX"
                title="S&P 500"
                href="/markets/indices/$SPX"
              />
            </div>
          </BarchartChartGrid>
          <div className="mt-6 mb-6">
            <BarchartsLeadersCell leaderType="active" />
          </div>
          <div className="mb-6">
            <BarchartsLeadersCell leaderType="gainers" />
          </div>
          <div className="mb-6">
            <BarchartsLeadersCell leaderType="losers" />
          </div>
        </div>
        <div className="right">
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default StocksLanding;
