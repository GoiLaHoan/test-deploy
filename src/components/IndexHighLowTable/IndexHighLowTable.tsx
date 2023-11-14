import cs from "~/src/utils/cs";
import Link from "next/link";
import type { FC } from "react";
import type { BarchartsQuotesQuery } from "~/src/generated";

import Table from "~/src/components/Table/Table";
import dates from "~/src/utils/dates";
import styles from "./IndexHighLowTable.module.scss";
// import isNegative from '../../utils/isNegative'

const IndexHighLowTable: FC<{ data: BarchartsQuotesQuery }> = ({ data }) => {
  // const colorize = (n: number) => {
  //   if (isNegative(n)) {
  //     return cs([styles.colorRed, styles.bold])
  //   }
  //   return cs([styles.colorGreen, styles.bold])
  // }

  const { format } = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const howManyLoaders = [1];

  return (
    <Table title={"Today" + " — " + dates.dayTime()}>
      <ul>
        <li className={cs([styles.item, styles.titles])}>
          <p>High</p>
          <p>Low</p>
          <p>Open</p>
          <p className="hidden md:block lg:block">Volume</p>
        </li>
        {!data
          ? howManyLoaders.map((x) => (
              <li key={x} className={cs([styles.item, styles.loading])}>
                <p>-</p>
                <p>-</p>
                <p>-</p>
                <p className="hidden md:block lg:block">-</p>
              </li>
            ))
          : data?.GetBarchartQuotes?.results.map((x) => (
              <li className={styles.item} key={x.symbol}>
                <Link
                  href="/markets/indices/[symbol]"
                  as={`/markets/indices/${x.symbol}`}
                >
                  <>
                    <p className={styles.bold}>{format(x.high)}</p>
                    <p className={styles.bold}>{format(x.low)}</p>
                    <p className={styles.bold}>{format(x.open)}</p>
                    <div className="hidden md:block lg:block">
                      <p className={styles.bold}>{x.volume}</p>
                    </div>
                  </>
                </Link>
              </li>
            ))}
      </ul>
    </Table>
  );
};

export default IndexHighLowTable;
