import cs from "~/src/utils/cs";
import dayjs from "dayjs";
import { FC } from "react";

import styles from "./CommodityHistory.module.scss";

interface Props {
  data: any[];
}
const CommodityHistory: FC<Props> = ({ data }) => {
  return (
    <ul>
      <li
        className={`grid grid-cols-3 border-t px-6 py-2 bg-gray-100 md:grid md:grid-cols-5`}
      >
        <p className="font-semibold uppercase">Date</p>
        <p className={styles.titles}>High</p>
        <p className={styles.titles}>Low</p>
        <p className={cs([styles.titles, styles.mobilize])}>Open</p>
        <p className={cs([styles.titles, styles.mobilize])}>Close</p>
      </li>
      {data &&
        data.map((x, idx) => (
          <li
            className={`grid grid-cols-3 border-t px-6 py-2 md:grid-cols-5 ${
              idx % 2 && "bg-gray-100"
            }`}
            key={idx}
          >
            <p className="font-semibold">
              {dayjs.unix(x.timestamp).format("MMM D, YYYY")}
            </p>
            <p className={cs([styles.values])}>${x.high.toFixed(2)}</p>
            <p className={cs([styles.values])}>${x.low.toFixed(2)}</p>
            <p className={cs([styles.values, styles.mobilize])}>
              ${x.open.toFixed(2)}
            </p>
            <p className={cs([styles.values, styles.mobilize])}>
              ${x.close.toFixed(2)}
            </p>
          </li>
        ))}
    </ul>
  );
};

export default CommodityHistory;
