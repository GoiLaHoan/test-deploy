import cs from "~/src/utils/cs";
import React from "react";

import { AdditionalForexQuotesBlock } from "~/src/components/AdditionalForexQuotesBlock/AdditionalForexQuotesBlock";
import ForexPageTitle from "~/src/components/ForexPageTitle/ForexPageTitle";
import Layout from "~/src/components/Layout/Layout";
import PlaceholderBlock from "~/src/components/PlaceholderBlock/PlaceholderBlock";
import {
  TradingViewCryptoQuotes,
  TradingViewForexChart,
  TradingViewForexMajorRates,
} from "~/src/components/trading-view-iframes";

import styles from "./index.module.scss";

const Forex = () => {
  return (
    <Layout
      title={
        "Forex | Foreign Exchange | FX Markets | Currencies | Currency converter"
      }
    >
      <div className={styles.container}>
        <main>
          <section className={styles.section}>
            <ForexPageTitle
              title={"Forex Major Rates"}
              subtitle={"Forex Charts and Quotes by TradingView"}
            />
            <TradingViewForexMajorRates />
          </section>
          <section className={cs([styles.section, styles.twoColumn])}>
            <div>
              <ForexPageTitle title={"Additional Forex Quotes"} />
              <AdditionalForexQuotesBlock />
            </div>
            <div>
              <div>
                <ForexPageTitle title={"Forex Charts"} />
                <section className={styles.section}>
                  <div className={styles.block}>
                    <TradingViewForexChart symbol={"USDCAD"} />
                  </div>
                  <div className={styles.block}>
                    <TradingViewForexChart symbol={"USDEUR"} />
                  </div>
                  <div className={styles.block}>
                    <TradingViewForexChart symbol={"USDGBP"} />
                  </div>
                </section>
              </div>
              <div>
                <ForexPageTitle title={"Live Cryptocurrency Quotes"} />
                <section className={styles.section}>
                  <TradingViewCryptoQuotes />
                </section>
              </div>
            </div>
          </section>
        </main>
        <aside>
          <PlaceholderBlock />
          <PlaceholderBlock />
          <PlaceholderBlock />
          <PlaceholderBlock />
          <PlaceholderBlock />
          <PlaceholderBlock />
          <PlaceholderBlock />
          <PlaceholderBlock />
        </aside>
      </div>
    </Layout>
  );
};

export default Forex;
