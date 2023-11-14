import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";

import Layout from "~/src/components/Layout/Layout";
import NivoThumbChart from "~/src/components/NivoThumbChart/NivoThumbChart";
import ShanghaiLatestPrice from "~/src/components-metals/ShanghaiLatestPrice/ShanghaiLatestPrice";
import ShanghaiTitleBlock from "~/src/components-metals/ShanghaiTitleBlock/ShanghaiTitleBlock";

import PageLayoutTwoColumns from "~/src/components/PageLayoutTwoColumns/PageLayoutTwoColumns";
import { Timescales } from "~/src/utils/ctxTimestamp";
import { currentTimestamp } from "~/src/utils/current-timestamp";

import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

import { useMemo } from "react";
import styles from "~/src/styles/shanghaiFixPage.module.scss";
import { GetServerSideProps } from "next";
import { useCurrencyCNYReadOnlyAtom } from "~/src/components/CurrencySelect/CurrencySelect";

export const getServerSideProps: GetServerSideProps = async (c) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: c.res,
    queries: [
      metals.shanghaiFix({
        variables: {
          timestamp: currentTimestamp(),
          currency: "USD",
          symbol: "SHAU",
        },
      }),
    ],
  });

  return {
    props: { dehydratedState },
  };
};

const ShanghaiFix = () => {
  const currency = useCurrencyCNYReadOnlyAtom();

  const { data, isFetching } = useQuery(
    metals.shanghaiFix({
      variables: {
        timestamp: currentTimestamp(),
        currency: currency.symbol,
        symbol: "SHAU",
      },
      options: {
        refetchInterval: 30 * 1000,
        keepPreviousData: true,
      },
    }),
  );

  const formedData = useMemo(() => {
    return data?.GetShanghaiFix?.results?.map(({ pm, timestamp }) => {
      return {
        x: timestamp,
        y: pm,
      };
    });
  }, [data, currency.symbol]);

  return (
    <Layout title="Shanghai Gold Exchange">
      <PageLayoutTwoColumns>
        <main>
          <ShanghaiTitleBlock />
          <div></div>
          <div style={{ height: "400px" }}>
            <NivoThumbChart data={formedData} timescale={Timescales.ONE_DAY} />
          </div>
          <div className={styles.block}>
            <ShanghaiLatestPrice data={data} isLoading={isFetching} />
          </div>
        </main>
        <aside className="rightColumn">
          <LatestNewsCell />
        </aside>
      </PageLayoutTwoColumns>
    </Layout>
  );
};

export default ShanghaiFix;
