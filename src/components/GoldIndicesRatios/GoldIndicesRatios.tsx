import Table from "~/src/components/Table/Table";
import { FC } from "react";

import cs from "~/src/utils/cs";
import styles from "./GoldIndicesRatios.module.scss";
import { CalculatedRatios } from "~/src/components-metals/GoldRatiosCell/GoldRatiosCell";

interface Props {
  data: CalculatedRatios;
}

const GoldIndicesRatios: FC<Props> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <Table title="Gold Indices Ratios">
        <div className={cs([styles.grid, styles.titles])}>
          <div></div>
          <h6>XAU</h6>
          <h6>HUI</h6>
          <h6>S&amp;P 500</h6>
          <h6>DJIA</h6>
          <h6>Crude Oil</h6>
        </div>
        <div className={cs([styles.grid, styles.values])}>
          <h6 className={styles.goldText}>Gold</h6>
          {data &&
            Object.values(data)
              .slice(3)
              .map((x, idx) => (
                <span key={idx} className={idx % 2 ? "" : styles.isEven}>
                  {!x ? "-" : idx !== 4 ? x.toFixed(4) : x.toFixed(2)}
                </span>
              ))}
        </div>
      </Table>
    </div>
  );
};

export default GoldIndicesRatios;
