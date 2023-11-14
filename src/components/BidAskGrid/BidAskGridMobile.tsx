import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import Link from "next/link";

import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";

import BlockHeader from "~/src/components/BlockHeader/BlockHeader";

import styles from "./BidAskGridMobile.module.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  title: string;
  values: any;
}

const BidAskGridMobile = ({ title, values }: Props) => {
  return (
    <div className={styles.borderWrapper}>
      <BlockHeader title={title} />
      <div className={cs([styles.gridder, styles.titlesBorder])}>
        <p>METAL</p>
        <p>LAST</p>
        <p>CHANGE</p>
      </div>
      <ul className={styles.listify}>
        {values.map((metal, idx: number) => (
          <li
            className={
              !(idx % 2) ? styles.item : cs([styles.item, styles.altBg])
            }
            key={idx}
          >
            <div className={styles.gridder}>
              <span className={styles.bold}>{metal.name}</span>
              <span>
                {!metal?.results
                  ? "-"
                  : metal?.results.map((x) => x.bid.toFixed(2))}
              </span>
              <div className={styles.changeRow}>
                <div className={styles.dollarChange}>
                  {!metal ? (
                    <span>- (-%)</span>
                  ) : (
                    <>
                      {metal?.results?.map((x, idx) => (
                        <span
                          key={idx}
                          className={cs([
                            isNegative(x.change)
                              ? styles.changeDown
                              : styles.changeUp,
                          ])}
                        >
                          {metal?.results.map((x) => x.change.toFixed(2))} {"("}
                          {metal?.results.map((x) => x.changePercentage)}
                          {"%"}
                          {")"}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.linkContainer}>
        <Link href="/charts">View Precious Metals</Link>
      </div>
    </div>
  );
};

export default BidAskGridMobile;
