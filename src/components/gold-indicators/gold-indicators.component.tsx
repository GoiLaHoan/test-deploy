import { FC } from "react";
import { HiArrowSmDown, HiArrowSmUp } from "react-icons/hi";

import BlockShell from "~/src/components/BlockShell/BlockShell";

import colorize from "~/src/utils/colorize";
import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import styles from "./gold-indicators.module.scss";

export const GoldIndicators: FC = () => {
  const { data } = useQuery(
    markets.barchartsGoldIndicators({
      variables: {
        symbols: "$TTGD,$XAU,$HUI",
        timestamp: currentTimestamp(),
      },
    }),
  );

  const arrowUpOrDown = (v: number) => {
    if (!isNegative(v)) {
      return "up";
    }
    return "down";
  };

  return (
    <BlockShell title="Gold Indicators">
      {data &&
        data?.GetBarchartQuotes?.results.map((x, idx: number) => (
          <div
            className={
              !(idx % 2)
                ? styles.indexContainer
                : cs([styles.indexContainer, styles.isOdd])
            }
            key={idx}
          >
            <h5 className="flex items-center">
              {arrowUpOrDown(x.percentChange) === "up" ? (
                <HiArrowSmUp className="text-green-500" />
              ) : (
                <HiArrowSmDown className="text-red-500" />
              )}
              &nbsp;
              {
                {
                  $HUI: "HUI",
                  $TTGD: "TSX",
                  $XAU: "XAU",
                }[x.symbol]
              }
            </h5>
            <div className={styles.currentChangeFlex}>
              <p className={colorize(x.percentChange)}>{x.lastPrice}</p>
              <p className={colorize(x.percentChange)}>{x.percentChange}%</p>
            </div>
          </div>
        ))}
    </BlockShell>
  );
};
