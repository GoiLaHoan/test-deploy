// import { FC } from 'react'
// import dynamic from 'next/dynamic'
//
// import { MARKET_VIEWS } from '$types/index'
//
// import Layout from '~/src/components/Layout/Layout'
// import MarketNewsTabs from '~/src/components/MarketNewsTabs/MarketNewsTabs'
//
// import styles from '~/src/styles/pages/MarketNews.module.scss'
// import { NewsArticle } from '~/src/generated'
// import GoldNewsContent from '~/src/components/LatestNewsMobile/GoldNewsContent/GoldNewsContent'
//
// const BarchartThumbnail = dynamic(
//   async () => await import('~/src/components/BarchartThumbnail/BarchartThumbnail'),
//   { ssr: false }
// )
//
// const TODAY_YESTERDAY = gql`
//   query ListDayAll($limit: Int, $offset: Int) {
//     today: nodeList(
//       limit: $limit
//       offset: $offset
//       day: Today
//       bundles: [NewsArticle, VideoArticle, AudioArticle]
//     ) {
//       total
//       items {
//         ... on NewsArticle {
//           id
//           changed
//           title
//           urlAlias
//           source
//           category {
//             id
//             name
//           }
//         }
//         ... on VideoArticle {
//           id
//           changed
//           title
//           urlAlias
//           category {
//             name
//           }
//         }
//         ... on AudioArticle {
//           id
//           changed
//           title
//           urlAlias
//           category {
//             name
//           }
//         }
//       }
//     }
//
//     yesterday: nodeList(
//       limit: $limit
//       offset: $offset
//       day: Yesterday
//       bundles: [NewsArticle, VideoArticle, AudioArticle]
//     ) {
//       total
//       items {
//         ... on NewsArticle {
//           id
//           changed
//           title
//           urlAlias
//           source
//           category {
//             id
//             name
//           }
//         }
//         ... on VideoArticle {
//           id
//           changed
//           title
//           urlAlias
//           category {
//             id
//             name
//           }
//         }
//         ... on AudioArticle {
//           id
//           changed
//           title
//           urlAlias
//           category {
//             id
//             name
//           }
//         }
//       }
//     }
//   }
// `
//
const MarketNewsGold = () => {
  // const variables = { limit: 25, offset: 0 }
  //
  // const { data } = useQuery(TODAY_YESTERDAY, {
  //   variables,
  // })
  //
  // const today = data?.today?.items as NewsArticle[]
  // const yesterday = data?.yesterday?.items as NewsArticle[]

  return (
    <div>
      TODO: does this page still exist?
      {/* <Layout title="Market News"> */}
      {/*   <div className="layout-cols-2"> */}
      {/*     <div> */}
      {/*       <MarketNewsTabs currentView={MARKET_VIEWS.GOLD} /> */}
      {/*       <section> */}
      {/*         <h2 className={styles.sectionTitle}>Today&#39;s Gold News</h2> */}
      {/*         <GoldNewsContent data={today} /> */}
      {/*       </section> */}
      {/*       <div className={styles.divider} /> */}
      {/*       <section> */}
      {/*         <h2 className={styles.sectionTitle}>Yesterday&#39;s Gold News</h2> */}
      {/*         <GoldNewsContent data={yesterday} /> */}
      {/*       </section> */}
      {/*     </div> */}
      {/*     <div> */}
      {/*       <BarchartThumbnail symbol="^XAUUSD" title="Gold" /> */}
      {/*       <BarchartThumbnail symbol="^XAGUSD" title="Silver" /> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </Layout> */}
    </div>
  );
};

export default MarketNewsGold;
