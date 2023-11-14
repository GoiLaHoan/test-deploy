import {
  CurrencySelectCNY,
  useCurrencyCNYReadOnlyAtom,
} from "~/src/components/CurrencySelect/CurrencySelect";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import BlockShell from "~/src/components/BlockShell/BlockShell";
import styles from "./ShanghaiGold.module.scss";

const ShanghaiGold = (props: { ssrTimestamp?: number }) => {
  const currency = useCurrencyCNYReadOnlyAtom();

  const { data } = useQuery(
    metals.shanghaiFix({
      variables: {
        timestamp: props?.ssrTimestamp ?? currentTimestamp(),
        symbol: "SHAU",
        currency: currency.symbol ?? "USD",
      },
      options: {
        refetchInterval: 30 * 1000,
      },
    }),
  );

  const quoteDate = data && data.GetShanghaiFix?.results?.[0]?.timestamp;

  return (
    <BlockShell title={"Shanghai Gold Benchmark Price"}>
      <div className={styles.wrapper}>
        <div className={styles.contents}>
          <div className="flex justify-between items-stretch pb-4 flex-col">
            <CurrencySelectCNY />
            <p className="h-7 flex items-center">
              {quoteDate ? dayjs.unix(quoteDate).format("MMM DD, YYYY") : ""}
            </p>
          </div>
          <div className={styles.gridTwoColumn}>
            <div className={styles.amOrPm}>
              <span>AM</span>
            </div>
            <div className={styles.price}>
              {data?.GetShanghaiFix?.results?.[0]?.am}
            </div>
          </div>
          <div className={styles.gridTwoColumn}>
            <div className={styles.amOrPm}>
              <span>PM</span>
            </div>
            <div className={styles.price}>
              <span>{data?.GetShanghaiFix?.results?.[0]?.pm}</span>
            </div>
          </div>
          <div className={styles.historicalButtonContainer}>
            <Link href="/price/shanghai-benchmark">Historical SGE Fix</Link>
          </div>
        </div>
      </div>
    </BlockShell>
  );
};

export default ShanghaiGold;
