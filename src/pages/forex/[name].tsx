import React from "react";
import ForexPageTitle from "~/src/components/ForexPageTitle/ForexPageTitle";
import Layout from "~/src/components/Layout/Layout";
import PlaceholderBlock from "~/src/components/PlaceholderBlock/PlaceholderBlock";
import {
  TradingViewForexChartLazy,
  TradingViewForexQuotes,
} from "~/src/components/trading-view-iframes";
import { FOREX_PATHS_MAP } from "~/src/lib/map-forex-paths";
import styles from "./[name].module.scss";

export async function getStaticPaths() {
  const keys = Object.keys(FOREX_PATHS_MAP);
  const paths = keys.map((key) => ({
    params: {
      name: key,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      name: params?.name,
    },
  };
}

const ForexSingle: React.FC<{ name: string }> = ({ name }) => {
  const title = FOREX_PATHS_MAP[name]?.title;
  const symbol = FOREX_PATHS_MAP[name]?.symbol;
  return (
    <Layout title={`${title} | Live Forex Charts and Quotes`}>
      <div className={styles.container}>
        <main>
          <section className={styles.section}>
            <ForexPageTitle
              title={title}
              subtitle={`${symbol} charts and quotes by TradingView`}
            />
            {/* <TradingViewChart symbol={symbol} /> */}
          </section>
          <div className={styles.twoColumn}>
            <div className={styles.block}>
              <TradingViewForexChartLazy symbol={symbol} />
            </div>
            <div className={styles.block}>
              <TradingViewForexQuotes />
            </div>
          </div>
        </main>
        <aside>
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

export default ForexSingle;
