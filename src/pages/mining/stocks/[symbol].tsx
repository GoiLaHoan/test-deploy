import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import MarketPageIndicesCell from "~/src/components-markets/MarketPageIndicesCell/MarketPageIndicesCell";
import type { FC } from "react";

import IndexDetailTitleBlock from "~/src/components/IndexDetailTitleBlock/IndexDetailTitleBlock";
import IndexHighLowTable from "~/src/components/IndexHighLowTable/IndexHighLowTable";
import Layout from "~/src/components/Layout/Layout";

import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import styles from "~/src/styles/markets-symbol-page.module.scss";
import { markets } from "~/src/lib/markets-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: ctx.res,
    queries: [
      markets.barchartsQuotes({
        variables: {
          symbols: ctx.query.symbol as any,
          timestamp: currentTimestamp(),
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
      symbol: ctx.query.symbol,
    },
  };
};

const StockSymbol: FC<{ symbol: any }> = ({ symbol }) => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        symbols: symbol,
        timestamp: currentTimestamp(),
      },
    }),
  );

  return (
    <Layout title={symbol}>
      <div className="grid gap-8 lg:grid-cols-layout-2 lg:px-0 sm:grid-cols-1 sm:px-8">
        <div>
          <IndexDetailTitleBlock data={data} />
          <section className={styles.chartBlock}>
            <Barcharts symbol={symbol} />
          </section>
          <section className={styles.infoBlock}>
            <IndexHighLowTable data={data} />
          </section>
          <section className={styles.infoBlock}>
            <MarketPageIndicesCell />
          </section>
        </div>
        <div>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default StockSymbol;
