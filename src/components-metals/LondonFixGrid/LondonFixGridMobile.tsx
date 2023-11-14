import type { LondonFixQuery } from "~/src/generated";

import dayjs from "dayjs";
import Link from "next/link";
import React, { FC } from "react";

import BlockHeader from "~/src/components/BlockHeader/BlockHeader";

import styles from "./LondonFixGridMobile.module.scss";

const LondonFixGridMobile: FC<{ data: LondonFixQuery }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <BlockHeader title={"London Fix Price"} />

      {/* dates section */}
      <h6 className={styles.date}>
        Quotes as of {dayjs().format("MMM D, YYYY")}
      </h6>
      {/* column names */}
      <div className={styles.gridTitles}>
        <p>Currency</p>
        <p>
          Gold <br />
          <span className={styles.amPm}>AM</span>
        </p>
        <p>
          Silver <br />
          <span className={styles.amPm}>NOON</span>
        </p>
        <p>
          Platinum <br />
          <span className={styles.amPm}>AM</span>
        </p>
        <p>
          Palladium <br />
          <span className={styles.amPm}>AM</span>
        </p>
      </div>
      {/* column values */}
      <ul className={styles.listify}>
        {data &&
          Object.entries(data).map((x: any, idx: number) => (
            <li className={!(idx % 2) ? styles.altBg : styles.blank} key={idx}>
              <h6 className={styles.currencyName}>{x[1]?.currency}</h6>
              <p className={styles.dataValues}>
                {x[1]?.results[0]?.goldAM.toFixed(2)}
              </p>
              <p className={styles.dataValues}>
                {x[1]?.results[0]?.silver.toFixed(2)}
              </p>
              <p className={styles.dataValues}>
                {x[1]?.results[0]?.platinumAM.toFixed(2)}
              </p>
              <p className={styles.dataValues}>
                {x[1]?.results[0]?.palladiumAM.toFixed(2)}
              </p>
            </li>
          ))}
      </ul>
      <div className={styles.linkContainer}>
        <Link href="/allmetalquotes/londonfix">View London Fix</Link>
      </div>
    </div>
  );
};

export default LondonFixGridMobile;
