import styles from "./CryptoOverview.module.scss";

interface Props {
  name: string;
  symbol: string;
}

const CryptoOverview = ({ name, symbol }: Props) => {
  const symbolWithoutCurrency = symbol.split("USD");
  return (
    <div className={styles.wrapper}>
      <h1>{name} in various currencies</h1>
      <iframe
        scrolling="no"
        frameBorder="no"
        src={`https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22www.kitco.com%2Fcryptocurrencies%2Finteractive-charts%22%2C%22plotLineColorGrowing%22%3A%22rgba(60%2C%20188%2C%20152%2C%201)%22%2C%22plotLineColorFalling%22%3A%22rgba(255%2C%2074%2C%20104%2C%201)%22%2C%22gridLineColor%22%3A%22rgba(233%2C%20233%2C%20234%2C%201)%22%2C%22scaleFontColor%22%3A%22rgba(0%2C%200%2C%200%2C%201)%22%2C%22belowLineFillColorGrowing%22%3A%22rgba(60%2C%20188%2C%20152%2C%200.05)%22%2C%22belowLineFillColorFalling%22%3A%22rgba(255%2C%2074%2C%20104%2C%200.05)%22%2C%22symbolActiveColor%22%3A%22rgba(242%2C%20250%2C%20254%2C%201)%22%2C%22whitelabel%22%3Atrue%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Ripple%20in%20US%20Dollar%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22KRAKEN%3A${symbolWithoutCurrency[0]}USD%22%2C%22d%22%3A%22Ripple%20in%20US%20Dollar%22%7D%2C%7B%22s%22%3A%22KRAKEN%3A${symbolWithoutCurrency[0]}CAD%22%2C%22d%22%3A%22Ripple%20in%20Canadian%20Dollar%22%7D%2C%7B%22s%22%3A%22KRAKEN%3A${symbolWithoutCurrency[0]}EUR%22%2C%22d%22%3A%22Ripple%20in%20Euro%22%7D%2C%7B%22s%22%3A%22KRAKEN%3A${symbolWithoutCurrency[0]}JPY%22%2C%22d%22%3A%22Ripple%20in%20Japanese%20Yen%22%7D%5D%7D%5D%2C%22utm_source%22%3A%22www.kitco.com%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22market-overview%22%7D`}
        // style="box-sizing: border-box; height: calc(100% - 32px); width: 100%;"
        style={{
          boxSizing: "border-box",
          height: "calc(100% - 32px)",
          width: "100%",
        }}
      ></iframe>
    </div>
  );
};

export default CryptoOverview;
