// import styles from './TradingViewCryptoNews.module.scss'

interface Props {
  symbol: string;
}

export const TradingViewCryptoNews = ({ symbol }: Props) => {
  return (
    <div>
      <iframe
        frameBorder="no"
        style={{ width: "100%", height: "820px" }}
        src={`https://s.tradingview.com/ideaswidgetembed/?utm_source=www.kitco.com&utm_medium=widget&utm_campaign=ideas-stream&id=tradingview_c1954&width=300px&height=400&symbol=COINBASE%3A${symbol}&username=&mode=integrate&publish_source=&sort=trending&stream=bitcoin&interval=all&time=day&s_count=1&bg_color=%23f2f5f8&h_color=%234BC2E9&borderColor=%23dce1e6&locale=en`}
      />
    </div>
  );
};
