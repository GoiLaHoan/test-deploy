import Table from "~/src/components/Table/Table";
import { FC } from "react";

import cs from "~/src/utils/cs";
import styles from "./GoldRatiosTableMobile.module.scss";
import { CalculatedRatios } from "~/src/components-metals/GoldRatiosCell/GoldRatiosCell";

interface Props {
  data: CalculatedRatios;
}

const GoldRatiosTableMobile: FC<Props> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <Table title="Gold Ratios">
        <div className={cs([styles.grid, styles.titles])}>
          <div></div>
          <h6>Silver</h6>
          <h6>Platinum</h6>
          <h6>Palladium</h6>
        </div>
        <div className={cs([styles.grid, styles.values])}>
          <h6 className={styles.goldText}>Gold</h6>
          {data &&
            Object.values(data)
              .slice(0, 3)
              .map((x, idx) => (
                <span key={idx}>{!x ? "-" : x.toFixed(2)}</span>
              ))}
        </div>
      </Table>
    </div>
  );
};

export default GoldRatiosTableMobile;
