import { FC } from "react";

import { MARKET_VIEWS } from "~/src/types/index";

import Layout from "~/src/components/Layout/Layout";
import MarketNewsTabs from "~/src/components/MarketNewsTabs/MarketNewsTabs";
// import StreetNewsContent from '~/src/components/LatestNewsBlock/StreetNewsContent/StreetNewsContent'

import styles from "~/src/styles/pages/MarketNews.module.scss";
// import { useListDayStreetTalkQuery } from '~/gql/lists/listDayStreetTalk.generated'
// import { StreetTalk } from '~/src/generated'
import { gql } from "graphql-request";
// import { BarchartThumbnailLazy } from "~/src/features/bar-charts";
// import { ListDayStreetTalkDocument, StreetTalk } from '~/src/generated'

// this query is only used here
gql`
  query ListDayStreetTalk($limit: Int, $offset: Int) {
    today: nodeList(
      day: Today
      limit: $limit
      offset: $offset
      bundles: [StreetTalk]
    ) {
      total
      items {
        ... on StreetTalk {
          id
          title
          source
          createdAt
          updatedAt
          url
        }
      }
    }

    yesterday: nodeList(
      day: Yesterday
      limit: $limit
      offset: $offset
      bundles: [StreetTalk]
    ) {
      total
      items {
        ... on StreetTalk {
          id
          title
          source
          createdAt
          updatedAt
          url
        }
      }
    }
  }
`;

const MoreNewsStreetTalk: FC = () => {
  // const { data } = useGQL({
  // query: ListDayStreetTalkDocument,
  // variables: {
  //
  //   limit: 25,
  //   offset: 0,
  // }
  // })

  // const today = data?.today?.items as StreetTalk[]
  // const yesterday = data?.yesterday?.items as StreetTalk[]

  return (
    <Layout title="Street Talk">
      <div className="layout-cols-2">
        <div>
          <MarketNewsTabs currentView={MARKET_VIEWS.STREET} />
          <section>
            <h2 className={styles.sectionTitle}>Today&#39;s Street Talk</h2>
            {/* <StreetNewsContent data={today} /> */}
          </section>
          <div className={styles.divider} />
          <section>
            <h2 className={styles.sectionTitle}>Yesterday&#39;s Street Talk</h2>
            {/* <StreetNewsContent data={yesterday} /> */}
          </section>
        </div>
        <div>
          {/* <BarchartThumbnailLazy symbol="^XAUUSD" title="Gold" /> */}
          {/* <BarchartThumbnailLazy symbol="^XAGUSD" title="Silver" /> */}
        </div>
      </div>
    </Layout>
  );
};

export default MoreNewsStreetTalk;
