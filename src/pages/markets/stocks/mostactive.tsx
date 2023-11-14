import React from "react";

import BarchartsLeadersCell from "~/src/components-markets/BarchartsLeadersCell/BarchartsLeadersCell";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";
import { Barcharts } from "~/src/features/bar-charts/barcharts";
import { markets } from "~/src/lib/markets-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

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

const StocksMostActive = () => {
  return (
    <Layout title="Most Active Stocks">
      <div className="lg:layout-cols-2 sm:layout-cols-1">
        <div className="left">
          <div className="grid gap-8 grid-cols-2 mb-12">
            <Barcharts
              symbol="$DOWI"
              title="Dow Jones Industrial Average"
              href="/markets/stocks/$DOWI"
            />
            <Barcharts
              symbol="$SPX"
              title="S&P 500"
              href="/markets/indices/$SPX"
            />
          </div>
          <div className="mb-6">
            <BarchartsLeadersCell leaderType="active" limit={20} />
          </div>
        </div>
        <div className="right">
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default StocksMostActive;
