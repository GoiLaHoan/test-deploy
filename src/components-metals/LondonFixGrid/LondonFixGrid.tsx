import type { LondonFixQuery } from "~/src/generated";

import dayjs from "dayjs";
import React, { FC } from "react";
import BlockHeader from "~/src/components/BlockHeader/BlockHeader";
import styles from "./LondonFixGrid.module.scss";

const LondonFixGrid: FC<{ data: LondonFixQuery }> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <BlockHeader title={"London Fix Price"} />
      <DatesRow />
      <MiddleRowAndColumnNames />
      {/* column values */}
      <ul className={styles.listify}>
        {data &&
          Object.entries(data).map((x: any, idx) => (
            <div key={idx} className={styles.gridify}>
              <h4 className={styles.bold}>
                {(idx === 0 && "USD") ||
                  (idx === 1 && "EUR") ||
                  (idx === 2 && "GBP")}
              </h4>

              <h4>{x[1]?.results[0]?.goldAM?.toFixed(2) || "-"}</h4>
              <h4>{x[1]?.results[0]?.goldPM?.toFixed(2) || "-"}</h4>
              <h4>{x[1]?.results[0]?.silver?.toFixed(2) || "-"}</h4>
              <h4>{x[1]?.results[0]?.platinumAM?.toFixed(2) || "-"}</h4>
              <h4>{x[1]?.results[0]?.platinumPM?.toFixed(2) || "-"}</h4>
              <h4>{x[1]?.results[0]?.palladiumAM?.toFixed(2) || "-"}</h4>
              <h4>{x[1]?.results[0]?.palladiumPM?.toFixed(2) || "-"}</h4>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default LondonFixGrid;

const DatesRow = () => {
  return (
    <div className={styles.gridify}>
      <p>London Fix</p>
      <p className={styles.blank}>
        <span className={styles.dates}>
          Quotes as of {dayjs().format("MMM D, YYYY")}
        </span>
      </p>
      <p className={styles.blank}></p>
      <p></p>
      <p className={styles.blank}>
        <span className={styles.datesTwo}>
          Quotes as of {dayjs().format("MMM D, YYYY")}
        </span>
      </p>
      <p className={styles.blank}></p>
      <p className={styles.blank}></p>
      <p></p>
    </div>
  );
};

const MiddleRowAndColumnNames = () => {
  return (
    <div className={styles.gridify}>
      <p></p>
      <p className={styles.blank}>
        <span className={styles.forceText}>
          Gold
          <br />
          AM/PM
        </span>
      </p>
      <p></p>
      <p className="text-center">
        Silver
        <br />
        Noon
      </p>
      <p className={styles.blank}>
        <span className={styles.forceText}>
          Platinum
          <br />
          AM/PM
        </span>
      </p>
      <p></p>
      <p className={styles.blank}>
        <span className={styles.forceText}>
          Palladium
          <br />
          AM/PM
        </span>
      </p>
      <p></p>
    </div>
  );
};
