import Link from "next/link";
import { FC } from "react";

import QuotesTableOG from "~/src/components/QuotesTableOG/QuotesTableOG";

import { allSymbols } from "~/src/lib/miningIndices";
import { QuoteObj } from "~/src/types/index";

import Table from "~/src/components/Table/Table";
import styles from "./top-five-equities.module.scss";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

export const getServerSideProps = async () => {
  const { dehydratedState } = await ssrQueries({
    queries: [
      markets.barchartsQuotes({
        variables: {
          timestamp: currentTimestamp(),
          symbols: allSymbols,
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
    },
  };
};

const useData = () => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols: allSymbols,
      },
    }),
  );

  let topFive: QuoteObj[] = [];

  if (data) {
    topFive =
      data.GetBarchartQuotes.results.length >= 1 &&
      data.GetBarchartQuotes.results
        .map((val: any) => val)
        .sort((a: { percentChange: number }, b: { percentChange: number }) =>
          a.percentChange < b.percentChange
            ? 1
            : a.percentChange > b.percentChange
            ? -1
            : 0,
        )
        .slice(0, 5);
  }

  return { topFive };
};

export const TopFiveEquities: FC = () => {
  const { topFive } = useData();

  return (
    <div className="overflow-x-auto scrollbar-hide scrolling-table-size">
      <div className="">
        <Table title={`Top 5 Performing Gold Equities`}>
          <QuotesTableOG section="stocks" data={topFive} />
        </Table>
        <Link href="/markets/stocks" as="/markets/stocks">
          <button className={styles.btnLink}>
            + More Gold Stocks and Equities
          </button>
        </Link>
      </div>
    </div>
  );
};
