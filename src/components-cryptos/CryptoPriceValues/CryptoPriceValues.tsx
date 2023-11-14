import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";

import cs from "~/src/utils/cs";
import styles from "./CryptoPriceValues.module.scss";

interface Props {
  calculatedPrices: any;
  currency: string;
  high: number;
  low: number;
  change: number;
  changePercentage: number;
}

type BidAskState = {
  high: number;
  low: number;
};

const CommodityPriceValues: FC<Props> = ({
  currency,
  high,
  low,
  change,
  changePercentage,
}) => {
  const [previous, setPrevious] = useState<BidAskState>({ high, low });
  const [direction, setDirection] = useState<"down" | "up" | "reset">("reset");

  useEffect(() => {
    if (high !== previous.high) {
      setPrevious((p) => ({ ...p, high }));
    }

    if (high < previous.high) {
      setDirection("down");
    }

    if (high > previous.high) {
      setDirection("up");
    }

    const reset = setTimeout(() => {
      setDirection("reset");
    }, 1000);

    return () => window.clearTimeout(reset);
  }, [high]);

  const isUp = () => {
    if (!change) return;

    const test = change.toString();

    if (test.charAt(0) === "-") {
      return false;
    }
    return true;
  };

  const styleUpOrDown = !isUp() ? cs([styles.down]) : cs([styles.up]);

  // formula for converting
  // 1. get original value per ounce, high - change
  // 2. take that result multiply or divide by conversion value i.e. 32.15 for kilo
  // 3. get newest high price conversion
  // do some subraction

  const animationClass = () => {
    if (direction === "down") {
      return cs([styles.bidStyle, styles.animatedDown]);
    }

    if (direction === "up") {
      return cs([styles.bidStyle, styles.animatedUp]);
    }

    return cs([styles.bidStyle]);
  };

  return (
    <div className={styles.priceFlexSb}>
      <div className={styles.bidAskContainer}>
        <h1 className={animationClass()}>
          {high?.toFixed(2)}
          <span>HIGH</span>
        </h1>
        <h1 className={styles.askStyle}>
          {low?.toFixed(2)}
          <span>LOW</span>
        </h1>
        <div className={styles.currencyChangeDate}>
          <span className={styleUpOrDown}>
            {isUp() ? "+" : ""}
            {change?.toFixed(2)}&nbsp;
          </span>
          <span className={styleUpOrDown}>
            ({isUp() ? "+" : ""}
            {changePercentage?.toFixed(2)})
          </span>
          <span className={styles.currencyText}>{currency}</span>
          <span>{dayjs().format("MMM D, YYYY")}</span>
        </div>
      </div>
    </div>
  );
};

export default CommodityPriceValues;
