import { CalculatedRatios } from "~/src/components-metals/GoldRatiosCell/GoldRatiosCell";
import type { FC } from "react";
import BlockHeader from "~/src/components/BlockHeader/BlockHeader";
import styles from "./GoldRatiosTable.module.scss";
import cs from "~/src/utils/cs";

interface Props {
  data: CalculatedRatios;
}

const GoldRatiosTable: FC<Props> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <BlockHeader title={"Gold Ratios"} />

      <div className={styles.gridify}>
        <p></p>
        <p>Silver</p>
        <p>Platinum</p>
        <p>Palladium</p>
        <p>XAU</p>
        <p>HUI</p>
        <p>S&amp;P 500</p>
        <p>DJIA</p>
        <p>Crude Oil</p>
      </div>

      <ul>
        <li>
          <div className={styles.gridify}>
            <span className={cs([styles.fatTextBois, styles.isEven])}>
              GOLD
            </span>
            {data &&
              Object.values(data)
                .slice(0, 5)
                .map((x, idx) => (
                  <span key={idx} className={!(idx % 2) ? "" : styles.isEven}>
                    {!x ? "-" : x.toFixed(2)}
                  </span>
                ))}
            {data &&
              Object.values(data)
                .slice(5)
                .map((x, idx) => (
                  <span key={idx} className={idx % 2 ? "" : styles.isEven}>
                    {!x ? "-" : idx !== 2 ? x.toFixed(4) : x.toFixed(2)}
                  </span>
                ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GoldRatiosTable;
