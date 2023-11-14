import cryptosList from "~/src/lib/cryptosList";
import { useCurrencyReadOnlyAtom } from "~/src/components/CurrencySelect/CurrencySelect";
import { TCrypto } from "~/src/types/index";

import CommodityTitle from "~/src/components/CommodityTitle/CommodityTitle";
import CryptoOverview from "~/src/components-cryptos/CryptoOverview/CryptoOverview";
import CryptoPriceValues from "~/src/components-cryptos/CryptoPriceValues/CryptoPriceValues";
import Layout from "~/src/components/Layout/Layout";
import {
  TradingViewCryptoNews,
  TradingViewCryptoVersus,
} from "~/src/components/trading-view-iframes";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import { useQuery } from "react-query";
import { cryptos } from "~/src/lib/cryptos-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import styles from "./[name].module.scss";
// import dynamic from 'next/dynamic'

// const TradingViewChart: any = dynamic(
//   () => import('../../components/TradingViewChart/TradingViewChart'),
//   { ssr: false }
// )

export async function getServerSideProps({ query }) {
  const bloodsAndCrypts = cryptosList.find((x) => x.name === query.name);

  return {
    props: {
      name: bloodsAndCrypts.name,
      symbol: bloodsAndCrypts.symbol,
    },
  };
}

const CryptoPage = ({ name, symbol }: TCrypto) => {
  const currency = useCurrencyReadOnlyAtom();

  const { data } = useQuery(
    cryptos.cryptoQuote({
      variables: {
        currency: currency.symbol,
        symbol,
        timestamp: currentTimestamp(),
      },
    }),
  );

  return (
    <Layout title={name}>
      <div className="layout-cols-1 lg:layout-cols-2">
        {/* crypto title and icons */}
        <div className={styles.leftColumn}>
          <CommodityTitle commodity={name} />
          <CryptoPriceValues
            calculatedPrices={null}
            currency={currency.symbol}
            high={data?.GetCryptoQuote?.results?.map((x) => x.high)[0]}
            low={data?.GetCryptoQuote?.results?.map((x) => x.low)[0]}
            change={data?.GetCryptoQuote?.results?.map((x) => x.change)[0]}
            changePercentage={
              data?.GetCryptoQuote?.results?.map((x) => x.changePercentage)[0]
            }
          />
          <div className="max-w-full">
            {/* <TradingViewChart symbol={symbol ?? 'AAPL'} /> */}
          </div>
          <div className="flex flex-wrap">
            <CryptoOverview name={name} symbol={symbol} />
            <TradingViewCryptoVersus name={name} symbol={symbol} />
          </div>
        </div>
        {/* test */}
        <div className={styles.rightColumn}>
          <div className="mb-6">
            <LatestNewsCell />
          </div>
          <div className={styles.soonToBeVideoComponent}>
            <TradingViewCryptoNews symbol={symbol} />
          </div>
        </div>
        {/* end test */}
        <div>
          <div className={styles.soonToBeAdvert}>soon to be advert</div>
          <div className={styles.soonToBeCommentsComponent}>
            soon to be comments section
          </div>
        </div>
        {/* {commodity === 'gold' && <GoldGuide />} */}
      </div>
    </Layout>
  );
};

export default CryptoPage;
