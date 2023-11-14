import React from "react";
import styles from "./trading-view-iframes.module.scss";

export const TradingViewForexMajorRates = () => {
  return (
    <div className={styles.container}>
      <iframe
        src="https://s.tradingview.com/embed-widget/forex-cross-rates/?locale=en#%7B%22currencies%22%3A%5B%22USD%22%2C%22AUD%22%2C%22CAD%22%2C%22EUR%22%2C%22GBP%22%2C%22JPY%22%2C%22CHF%22%5D%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22https%3A%2F%2Fwww.kitco.com%2Fforex%2F%22%2C%22whitelabel%22%3Atrue%2C%22utm_source%22%3A%22www.kitco.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22forex-cross-rates%22%7D"
        frameBorder="0"
      />
    </div>
  );
};
