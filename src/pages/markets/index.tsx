import React from "react";

import BarchartsLeadersCell from "~/src/components-markets/BarchartsLeadersCell/BarchartsLeadersCell";
import FutureForexCell from "~/src/components-markets/FutureForexCell/FutureForexCell";
import MarketPageIndicesCell, {
  // indicesSymbols,
  // componentData as indicesData,
  indices,
} from "~/src/components-markets/MarketPageIndicesCell/MarketPageIndicesCell";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import AdvertBlock from "~/src/components/AdvertBlock/AdvertBlock";
import Layout from "~/src/components/Layout/Layout";
import MarketNewsBlock from "~/src/components/MarketNewsBlock/MarketNewsBlock";
import PageLayoutTwoColumns from "~/src/components/PageLayoutTwoColumns/PageLayoutTwoColumns";
import PlaceholderBlock from "~/src/components/PlaceholderBlock/PlaceholderBlock";

import useFuturesMetals from "~/src/components-markets/FuturesCell/metalsDataCell";
import FutureForexTable from "~/src/components/FutureForexTable/FutureForexTable";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

import styles from "./index.module.scss";

const MarketsPage = () => {
  const [metals] = useFuturesMetals();

  // https://frontend.dev.kitco.com/markets/indices/$NASX
  // https://frontend.dev.kitco.com/markets/indices/$NASX

  return (
    <Layout title={"Stock Markets | DJIA, DOW, NASDAQ, S&P 500, NYSE"}>
      <PageLayoutTwoColumns>
        <main>
          <h1 className="font-bold text-4xl mb-8">All Markets</h1>
          <section className={styles.block}>
            <div className={styles.chartGrid}>
              {indices.map((x, idx) => (
                <div key={idx} className={idx > 2 ? "mt-12 mr-2" : "mr-2"}>
                  <Barcharts
                    symbol={`${x.symbol}`}
                    title={x.name}
                    href={`/markets/indices/${x.symbol}`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className={styles.block}>
            <MarketPageIndicesCell />
          </section>

          <section className={styles.block}>
            <BarchartsLeadersCell leaderType="active" showMore={true} />
          </section>

          <section className={styles.block}>
            <BarchartsLeadersCell leaderType="gainers" showMore={true} />
          </section>
          <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            <FutureForexTable
              title="Metal Futures"
              data={metals}
              showMore={true}
            />
            <FutureForexCell title="forex" />
          </section>
        </main>
        <aside>
          <div className={styles.block}>
            <AdvertBlock />
          </div>
          <div className={styles.block}>
            <LatestNewsCell />
          </div>
          <div className={styles.block}>
            <PlaceholderBlock />
          </div>
          <div className={styles.block}>
            <MarketNewsBlock />
          </div>
        </aside>
      </PageLayoutTwoColumns>
    </Layout>
  );
};

export default MarketsPage;
