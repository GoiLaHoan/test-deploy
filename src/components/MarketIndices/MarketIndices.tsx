import React, { FC, useState } from "react";

import Icon from "../Icon/Icon";

import BlockShell from "../BlockShell/BlockShell";

import colorize from "~/src/utils/colorize";
import isNegative from "~/src/utils/isNegative";

import styles from "./MarketIndices.module.scss";
import type { RegionIndicesQuery } from "~/src/generated";

type Region = "US" | "EU" | "ASIA";

const MarketIndices: FC<{ data: RegionIndicesQuery }> = ({ data }) => {
  const [region, setRegion] = useState<Region>("US");

  const isUS = region === "US" ? styles.tabButtonActive : styles.tabButton;
  const isEU = region === "EU" ? styles.tabButtonActive : styles.tabButton;
  const isASIA = region === "ASIA" ? styles.tabButtonActive : styles.tabButton;

  return (
    <BlockShell title={"Market Indices"}>
      <div className={styles.wrapper}>
        <div className={styles.contentsContainer}>
          {/* tabs */}
          <div className={styles.tabsGrid}>
            <button className={isUS} onClick={() => setRegion("US")}>
              US
            </button>
            <button className={isEU} onClick={() => setRegion("EU")}>
              EUROPE
            </button>
            <button className={isASIA} onClick={() => setRegion("ASIA")}>
              ASIA
            </button>
          </div>

          {/* values lists */}
          <div>
            {region === "US" &&
              data?.USquotes?.results?.map((v, idx: number) => (
                <Items v={v} key={idx} />
              ))}
            {region === "EU" &&
              data?.EUquotes?.results?.map((v, idx: number) => (
                <Items v={v} key={idx} />
              ))}
            {region === "ASIA" &&
              data?.ASIAquotes?.results?.map((v, idx: number) => (
                <Items v={v} key={idx} />
              ))}
          </div>
          <p className={styles.delayText}>Index data delayed by 10 minutes</p>
        </div>
      </div>
    </BlockShell>
  );
};

export default MarketIndices;

const Items = ({ v }) => {
  const arrowUpOrDown = (v: number) => {
    if (!isNegative(v)) {
      return "arrow-up";
    }
    return "arrow-down";
  };
  return (
    <div className={styles.indexContainer}>
      <h5>
        <Icon
          icon={arrowUpOrDown(v.percentChange)}
          size="12px"
          color={!isNegative(v.percentChange) ? "green" : "red"}
        />
        &nbsp;
        {v.name}
      </h5>
      <div className={styles.currentChangeFlex}>
        <p className={colorize(v.percentChange)}>{v.lastPrice}</p>
        <p className={colorize(v.percentChange)}>{v.percentChange}%</p>
      </div>
    </div>
  );
};
