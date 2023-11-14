import dates from "~/src/utils/dates";
import React from "react";

import cs from "~/src/utils/cs";
import Link from "next/link";
import styles from "./CommodityDetailFixItem.module.scss";

const CommodityDetailFixItem = ({ name, timestamp, am, pm }) => {
  const isLondon = name === "London Fix";
  const href = !isLondon
    ? "/price/shanghai-benchmark"
    : "/allmetalquotes/londonfix";

  return (
    <Link
      className="flex justify-between my-4 text-gray-700 border-t-[1px] border-gray-300 pt-4"
      href={href}
    >
      <>
        <div className={styles.flagContainer}>
          <i
            className={cs([styles.flag, isLondon ? styles.uk : styles.shang])}
          ></i>
        </div>
        <div className="ml-4">
          <p className="font-bold">{name}</p>
          <p className="text-gray-600">{dates.fmtUnix(timestamp)}</p>
        </div>
        <div className="ml-4">
          <p>
            <span>AM&nbsp;</span>
            {am}
          </p>
          <p>
            <span>PM&nbsp;</span>
            {pm}
          </p>
        </div>
      </>
    </Link>
  );
};

export default CommodityDetailFixItem;
