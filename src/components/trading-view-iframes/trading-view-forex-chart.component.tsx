import React from "react";
import styles from "./trading-view-iframes.module.scss";

interface Props {
  symbol: string;
}

export const TradingViewForexChart: React.FC<Props> = ({ symbol }) => {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://s.tradingview.com/mediumwidgetembed/?symbols=FX_IDC%3A${symbol}%7C1d&locale=en&trendLineColor=%234bafe9&underLineColor=%23dbeffb&fontColor=%2383888D&gridLineColor=%23e9e9ea&width=100%25&height=100%25&colorTheme=undefined&utm_source=www.kitco.com&utm_medium=widget&utm_campaign=symbol-overview`}
        frameBorder="0"
      />
    </div>
  );
};
