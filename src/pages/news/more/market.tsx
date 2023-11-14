import { FC } from "react";

import { MARKET_VIEWS } from "~/src/types/index";

import Layout from "~/src/components/Layout/Layout";
import MarketNewsTabs from "~/src/components/MarketNewsTabs/MarketNewsTabs";

import styles from "~/src/styles/pages/MarketNews.module.scss";
// import { useListDayMarketNewsQuery } from '~/gql/lists/listDayMarketNews.generated'
// import { NewsArticle } from '~/src/generated'
// import GoldNewsContent from '~/src/components/LatestNewsMobile/GoldNewsContent/GoldNewsContent'
import { gql } from "graphql-request";
// import { BarchartThumbnailLazy, useBarcharts } from "~/src/features/bar-charts";

// TODO: Find a proper home for this query
gql`
  query ListDayMarketNews($limit: Int, $offset: Int) {
    today: marketNews(day: Today, limit: $limit, offset: $offset) {
      total
      items {
        ... on NewsArticle {
          id
          title
          source {
            ...SourceFragment
          }
          urlAlias
        }
      }
    }
    yesterday: marketNews(day: Yesterday, limit: $limit, offset: $offset) {
      total
      items {
        ... on NewsArticle {
          id
          title
          source {
            ...SourceFragment
          }
          urlAlias
        }
      }
    }
  }
`;

const MarketNewsGold: FC = () => {
  // useBarcharts();
  // const variables = { limit: 25, offset: 0 }

  // const { data } = useListDayMarketNewsQuery(variables)

  // const today = data?.today?.items as NewsArticle[]
  // const yesterday = data?.yesterday?.items as NewsArticle[]

  return (
    <Layout title="Market News">
      <div className="layout-cols-2">
        <div>
          <MarketNewsTabs currentView={MARKET_VIEWS.MARKET} />
          <section>
            <h2 className={styles.sectionTitle}>Today&#39;s Market News</h2>
            {/* <GoldNewsContent data={today} /> */}
          </section>
          <div className={styles.divider} />
          <section>
            <h2 className={styles.sectionTitle}>Yesterday&#39;s Market News</h2>
            {/* <GoldNewsContent data={yesterday} /> */}
          </section>
        </div>
        <div>
          {/* <BarchartThumbnailLazy symbol="^XAUUSD" title="Gold" href={``} />
          <BarchartThumbnailLazy symbol="^XAGUSD" title="Silver" /> */}
        </div>
      </div>
    </Layout>
  );
};

export default MarketNewsGold;
