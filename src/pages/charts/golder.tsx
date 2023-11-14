// import React, { useState, useCallback } from 'react'
// import dynamic from 'next/dynamic'
// import { Currency, currencies } from '~/src/utils/currencies'
// import {
//   GetMetalRatesDocument,
//   useGetMetalRatesLazyQuery,
// } from 'codegen/client'

// import AllMetalQuotesCell from '~/src/components-metals/AllMetalQuotesCell/AllMetalQuotesCell'
// import LatestNewsCell from '$cells/LatestNewsCell/LatestNewsCell'

import Layout from "~/src/components/Layout/Layout";
// import CommodityTitle from '~/src/components/CommodityTitle/CommodityTitle'
// import GoldGuide from '~/src/components/CommodityGuides/GoldGuide'
// // import FullChart from '~/src/components/TVFullChart/TVFullChart'
// import CommodityPriceValues from '~/src/components/CommodityPriceValues/CommodityPriceValues'
// import CommodityDetailPageFixesCell from '$containers/CommodityDetailPageFixesCell/CommodityDetailPageFixesCell'
// import CommodityDetailPageRatios from '~/src/components/CommodityDetailPageRatios/CommodityDetailPageRatios'

// import styles from '~/src/styles/commodity.module.scss'
// import CommodityHistoryCell from '$containers/CommodityHistoryCell/CommodityHistoryCell'
// import { addApolloState, initializeApollo } from '$lib/apollo'
// import MetalMonthlyAnnualCell from '$cells/MetalMonthlyAnnualCell/MetalMonthlyAnnualCell'

// const GoldSubscribeCell = dynamic(
//   () =>
//     import('$containers/GoldSubscribeCell/GoldSubscribeCell').then(
//       (mod) => mod.default
//     ),
//   { ssr: false }
// )

// const FullChart = dynamic(
//   async () => {
//     try {
//       return await import('~/src/components/TVFullChart/TVFullChart')
//     } catch (err) {
//       console.warn(err)
//     }
//   },
//   { ssr: false }
// )

// export async function getServerSideProps() {
//   const apollo = initializeApollo()

//   await apollo.query({
//     query: GetMetalRatesDocument,
//     variables: {
//       symbol: 'AU',
//       currency: 'USD',
//       timestamp: Math.floor(Date.now() / 1000),
//     },
//   })

//   return addApolloState(apollo, {
//     props: {
//       title: 'Gold',
//     },
//   })
// }

const Golder = () => {
  // const [currency, setCurrency] = useState<Currency>(currencies[0])

  // // this lazy query is just for currency switching
  // const [execCurrencyQuery, { data }] = useGetMetalRatesLazyQuery({
  //   variables: {
  //     symbol: 'AU',
  //     currency: currency.symbol,
  //     timestamp: Math.floor(Date.now() / 1000),
  //   },
  //   pollInterval: 15 * 1000,
  //   fetchPolicy: 'network-only',
  // })

  // const currencyHandler = useCallback(
  //   (value) => {
  //     const selectedCurrency = currencies.find((x) => x.symbol === value)
  //     setCurrency(selectedCurrency)

  //     if (value !== 'USD') {
  //       execCurrencyQuery()
  //     }
  //     return
  //   },
  //   [setCurrency]
  // )

  return (
    <Layout title="Charts &amp; Data">
      {/*<div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          {/* commodity title and icons
          <CommodityTitle
            commodity={'Gold'}
            currency={currency}
            currencyHandler={currencyHandler}
          />

          {currency.symbol !== 'USD' ? (
            <CommodityPriceValues
              currency={'USD'}
              setCurrency={() => console.warn('need to implement func')}
              commodity={'Gold'}
              ask={data?.GetMetalQuote?.results?.map((x) => x.ask)[0]}
              bid={data?.GetMetalQuote?.results?.map((x) => x.bid)[0]}
              change={data?.GetMetalQuote?.results?.map((x) => x.change)[0]}
              changePercentage={
                data?.GetMetalQuote?.results?.map((x) => x.changePercentage)[0]
              }
            />
          ) : (
            <GoldSubscribeCell currency={currency.symbol} />
          )}
          <div className={styles.chartContainer}>
            <FullChart symbol="AU" adapter="kitco" />
          </div>
          <div className={styles.infoBlockContainer}>
            <CommodityDetailPageFixesCell metal={'Gold'} />
            <MetalMonthlyAnnualCell componentAlias="commodityPageHistorical" />
            <CommodityDetailPageRatios metal={'Gold'} currency={currency} />
          </div>
          <div className="mt-8">
            <CommodityHistoryCell name="Gold" symbol="AU" />
          </div>
          <GoldGuide />
        </div>
        <div className={styles.rightColumn}>
          <LatestNewsCell />
          <div className="mt-8">
            <AllMetalQuotesCell componentAlias="relatedMetals" />
          </div>
        </div>
      </div> */}
      <div></div>
    </Layout>
  );
};

export default Golder;
