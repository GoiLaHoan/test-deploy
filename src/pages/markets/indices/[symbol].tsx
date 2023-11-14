import React from "react";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import MarketPageIndicesCell from "~/src/components-markets/MarketPageIndicesCell/MarketPageIndicesCell";

import IndexDetailTitleBlock from "~/src/components/IndexDetailTitleBlock/IndexDetailTitleBlock";
import IndexHighLowTable from "~/src/components/IndexHighLowTable/IndexHighLowTable";
import Layout from "~/src/components/Layout/Layout";
import PageLayoutTwoColumns from "~/src/components/PageLayoutTwoColumns/PageLayoutTwoColumns";

import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import styles from "~/src/styles/markets-symbol-page.module.scss";
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

const IndexSymbol = ({ symbol }) => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        symbols: symbol as any,
        timestamp: currentTimestamp(),
      },
    }),
  );

  return (
    <Layout title={symbol}>
      <PageLayoutTwoColumns>
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
      </PageLayoutTwoColumns>
    </Layout>
  );
};

export default IndexSymbol;
