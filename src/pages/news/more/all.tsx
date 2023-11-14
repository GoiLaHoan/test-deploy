// import { FC } from 'react'
// import dynamic from 'next/dynamic'
// import { MARKET_VIEWS } from '$types/index'
//
// import { gql, useQuery } from '@apollo/client'
//
// import Layout from '~/src/components/Layout/Layout'
// import MarketNewsTabs from '~/src/components/MarketNewsTabs/MarketNewsTabs'
// import GenericListContent from '~/src/components/GenericListContent/GenericListContent'
// const BarchartThumbnail = dynamic(
//   async () => await import('~/src/components/BarchartThumbnail/BarchartThumbnail'),
//   { ssr: false }
// )
//
// import styles from '~/src/styles/pages/MarketNews.module.scss'
//
// const TODAY_YESTERDAY = gql`
//   query ListDayAll($limit: Int, $offset: Int) {
//     today: nodeList(
//       limit: $limit
//       offset: $offset
//       day: Today
//       bundles: [NewsArticle, VideoArticle, AudioArticle, StreetTalk]
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
//         ... on StreetTalk {
//           id
//           title
//           url
//           source
//         }
//       }
//     }
//
//     yesterday: nodeList(
//       limit: $limit
//       offset: $offset
//       day: Yesterday
//       bundles: [NewsArticle, VideoArticle, AudioArticle, StreetTalk]
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
//         ... on StreetTalk {
//           id
//           title
//           source
//           url
//         }
//       }
//     }
//   }
// `

const MoreNewsAll = () => {
  // const variables = { limit: 25, offset: 0 }
  //
  // const { data } = useQuery(TODAY_YESTERDAY, { variables })
  //
  // const today = data?.today?.items
  // const yesterday = data?.yesterday?.items

  return (
    <div>
      TODO: Does this page still exist?
      {/* <Layout title="All News"> */}
      {/*   <div className="layout-cols-2"> */}
      {/*     <div> */}
      {/*       <MarketNewsTabs currentView={MARKET_VIEWS.ALL} /> */}
      {/*       <section> */}
      {/*         <h2 className={styles.sectionTitle}>Today&#39;s All News</h2> */}
      {/*         <GenericListContent data={today} /> */}
      {/*       </section> */}
      {/*       <div className={styles.divider} /> */}
      {/*       <section> */}
      {/*         <h2 className={styles.sectionTitle}>Yesterday&#39;s All News</h2> */}
      {/*         <GenericListContent data={yesterday} /> */}
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

export default MoreNewsAll;
