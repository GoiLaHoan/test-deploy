import React from "react";
import styles from "./trading-view-iframes.module.scss";

export const TradingViewForexQuotes = () => {
  return (
    <div className={styles.container}>
      <iframe
        src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22whitelabel%22%3Atrue%2C%22showChart%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22www.kitco.com%2Fforex%2F%22%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Forex%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX_IDC%3AUSDAUD%22%2C%22d%22%3A%22USD%20%2F%20Australian%20Dollar%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDCAD%22%2C%22d%22%3A%22USD%20%2F%20Canadian%20Dollar%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDEUR%22%2C%22d%22%3A%22USD%20%2F%20Euro%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDJPY%22%2C%22d%22%3A%22USD%20%2F%20Japanese%20Yen%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDCHF%22%2C%22d%22%3A%22USD%20%2F%20Swiss%20Franc%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDCNY%22%2C%22d%22%3A%22USD%20%2F%20Chinese%20Yuan%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDHKD%22%2C%22d%22%3A%22USD%20%2F%20Hong%20Kong%20Dollar%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDBRL%22%2C%22d%22%3A%22USD%20%2F%20Brazilian%20Real%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDINR%22%2C%22d%22%3A%22USD%20%2F%20Indian%20Rupee%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDMXN%22%2C%22d%22%3A%22USD%20%2F%20Mexican%20Peso%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDRUB%22%2C%22d%22%3A%22USD%20%2F%20Russian%20Ruble%22%7D%2C%7B%22s%22%3A%22FX_IDC%3AUSDZAR%22%2C%22d%22%3A%22USD%20%2F%20South%20African%20Rand%22%7D%5D%7D%5D%2C%22utm_source%22%3A%22www.kitco.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%7D"
        frameBorder="0"
      />
    </div>
  );
};
