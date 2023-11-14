import colorize from "~/src/utils/colorize";
import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";
import Link from "next/link";
import React, { FC } from "react";
import { BarchartsQuotesQuery } from "~/src/generated";
import BlockShell from "../BlockShell/BlockShell";
import Icon from "../Icon/Icon";
import styles from "./MarketIndicators.module.scss";

const MarketIndicators: FC<{
  title: string;
  data: BarchartsQuotesQuery;
}> = ({ title, data }) => {
  const arrowUpOrDown = (v: number) => {
    if (!isNegative(v)) {
      return "arrow-up";
    }
    return "arrow-down";
  };

  return (
    <BlockShell title={title}>
      {data?.GetBarchartQuotes?.results?.map((x, idx) => (
        <Link
          href="/markets/indices/[symbol]"
          as={`/markets/indices/${x.symbol}`}
          key={idx}
        >
          <>
            <div
              className={
                !(idx % 2)
                  ? styles.indexContainer
                  : cs([styles.indexContainer, styles.idxAltBg])
              }
              key={idx}
            >
              <h5 className="flex items-center text-gray-700">
                <Icon
                  icon={arrowUpOrDown(x.percentChange)}
                  size="12px"
                  color={!isNegative(x.percentChange) ? "green" : "red"}
                />
                &nbsp;
                {x.name}
              </h5>
              <div className={styles.currentChangeFlex}>
                <p className={colorize(x.percentChange)}>{x.lastPrice}</p>
                <p className={colorize(x.percentChange)}>{x.percentChange}%</p>
              </div>
            </div>
          </>
        </Link>
      ))}
    </BlockShell>
  );
};

export default MarketIndicators;
