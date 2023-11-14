import type { MetalMonthAnnualQuery } from "~/src/generated";
import dates from "~/src/utils/dates";
import React, { FC } from "react";
import BlockShell from "../BlockShell/BlockShell";

import styles from "./MetalMonthHomePage.module.scss";
// import colorize from '~/src/utils/colorize'

interface Props {
  data: MetalMonthAnnualQuery;
}

const ValuesRow = ({ title, valueLeft, valueRight, altBg }) => (
  <div className={`px-2 border-t border-gray-200 ${altBg && "bg-gray-100"}`}>
    <div className={`flex justify-between`}>
      <p className={"text-gray-600  text-xs capitalize"}>
        {title.toUpperCase()}
      </p>
      <div>
        <span className="text-xs font-semibold mr-2">{valueLeft || "-"}</span>
        <span className="text-xs font-semibold">{valueRight || "-"}</span>
      </div>
    </div>
  </div>
);

const MetalMonthHomePage: FC<Props> = ({ data }) => {
  const d = data?.GetHistoricalPoints;
  return (
    <div className={styles.wrap}>
      <BlockShell title={"Live Spot Gold"}>
        <div className={styles.market}>
          <h4 className={styles.green}>SPOT MARKET IS OPEN</h4>
          <div>
            <small>closes in 5 hrs. 11 mins.</small>
          </div>
          <div>
            <small className={styles.bold}>{dates.dayTime()} NY Time</small>
          </div>
        </div>

        <div className={styles.table}>
          {/* BID ASK*/}
          <ValuesRow
            title={"Bid / Ask"}
            valueLeft={d?.now?.bid?.toFixed(2)}
            valueRight={d?.now?.ask?.toFixed(2)}
            altBg={true}
          />

          {/* HIGH LOW*/}
          <ValuesRow
            title={"Low / High"}
            valueLeft={d?.now?.low?.toFixed(2)}
            valueRight={d?.now?.high?.toFixed(2)}
            altBg={false}
          />

          {/* CHANGE */}
          <ValuesRow
            title={"Change"}
            valueLeft={d?.now?.change?.toFixed(2)}
            valueRight={
              !d?.now?.changePercentage
                ? "-"
                : `(${d?.now?.changePercentage?.toFixed(2)}%)`
            }
            altBg={true}
          />

          <ValuesRow
            title={"30daychg"}
            valueLeft={d?.thirtyDay?.change?.toFixed(2)}
            valueRight={
              !d?.thirtyDay?.changePercentage
                ? "-"
                : `(${d?.thirtyDay?.changePercentage}%)`
            }
            altBg={false}
          />

          <ValuesRow
            title={"30daychg"}
            valueLeft={d?.oneYear?.change?.toFixed(2)}
            valueRight={
              !d?.oneYear?.changePercentage
                ? "-"
                : `(${d?.oneYear?.changePercentage}%)`
            }
            altBg={false}
          />
        </div>
        <footer className={styles.footer}>
          <button>Alerts</button>
          <button>Charts</button>
        </footer>
      </BlockShell>
    </div>
  );
};

export default MetalMonthHomePage;
