import React, { FC } from "react";
import useSWR from "swr";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";
import MetalStocksTable from "~/src/components/MetalStocksTable/MetalStocksTable";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

const fetcher = (url) => fetch(url).then((r) => r.json());

const MetalsLanding: FC = () => {
  const { data } = useSWR("/api/metalsgainers", fetcher);
  const { data: etf } = useSWR("/api/getQuote/SLV,IAU,GLD,PPLT,PALL", fetcher);

  return (
    <Layout title="Metals">
      <div className="grid gap-8 px-4 lg:grid-cols-layout-2 lg:px-0 sm:grid-cols-1 sm:px-8">
        <section>
          <div className="mb-8 grid lg:grid-cols-2 gap-6 sm:grid-cols-1 sm:gap-0">
            <Barcharts
              symbol="^XAUUSD"
              title="Gold"
              href="/markets/futures/^XAUUSD"
            />
            <div className="hidden md:block lg:block">
              <Barcharts
                symbol="^XAGUSD"
                title="Silver"
                href="/markets/futures/^XAUUSD"
              />
            </div>
          </div>
          <div className="mb-8">
            <MetalStocksTable
              title="Metals and Mining Gainers"
              data={data?.gainers}
            />
          </div>
          <div className="mb-8">
            <MetalStocksTable
              title="Metals and Mining Losers"
              data={data?.losers}
            />
          </div>
          <div className="mb-8">
            <MetalStocksTable
              title="Metals and Mining 52 Week Gainers"
              data={data?.fiftytwowkgainers}
            />
          </div>
          <div className="mb-8">
            <MetalStocksTable
              title="Metals and Mining 52 Week Losers"
              data={data?.fiftytwowklosers}
            />
          </div>
          <div className="mb-8">
            <QuotesTable
              title="Metal ETFs"
              section="stocks"
              data={etf?.results}
            />
          </div>
        </section>
        <div>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default MetalsLanding;
