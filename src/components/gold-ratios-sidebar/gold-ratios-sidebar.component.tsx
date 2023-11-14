import type { FC } from "react";
import { useEffect, useState } from "react";

import BlockShell from "~/src/components/BlockShell/BlockShell";
import cs from "~/src/utils/cs";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import styles from "./gold-ratios-sidebar.module.scss";

// TODO: FIX THIS
// overall this component takes the currenct price of gold
// and divide's it by the current price of the stock
// it is being compared to.
export const GoldRatiosSidebar: FC = () => {
  const [baseGold, setBaseGold] = useState<any>({});
  const [results, setResults] = useState([]);

  const { data } = useQuery(
    markets.barchartsGoldIndicators({
      variables: {
        symbols: "^XAUUSD,^XAGUSD,^XPTUSD,$XAU",
        timestamp: currentTimestamp(),
      },
    }),
  );

  function math() {
    if (data) {
      let items = [];
      for (const item of data?.GetBarchartQuotes?.results) {
        if (item.symbol === "^XAUUSD") {
          setBaseGold(item);
        } else {
          items = [...items, item];
        }
      }

      setResults(items);
    }
  }

  useEffect(() => {
    math();
  }, [data]);

  return (
    <BlockShell title="Gold Ratios">
      {results.map((x, idx) => (
        <div
          className={
            !(idx % 2)
              ? styles.indexContainer
              : cs([styles.indexContainer, styles.altBg])
          }
          key={idx}
        >
          <div className={styles.currentChangeFlex}>
            <p className="text-black">
              Gold/{x.symbol !== "$XAU" ? x.name : "XAU Ratio"}
            </p>
            <p className="text-black font-semibold">
              {(baseGold.close / x.close).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </BlockShell>
  );
};
