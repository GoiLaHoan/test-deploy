import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";

import type {
  CryptoQuoteQuery,
  CryptoQuoteQueryVariables,
  CryptosBtcEthLtcXmrXrpQuery,
  CryptosBtcEthLtcXmrXrpQueryVariables,
  CryptosTableQuery,
  CryptosTableQueryVariables,
} from "~/src/generated";

export const cryptos = {
  cryptoQuote: (args: Args<CryptoQuoteQuery, CryptoQuoteQueryVariables>) => {
    return {
      ...args.options,
      queryKey: ["cryptoQuote", args.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query CryptoQuote(
              $symbol: String!
              $currency: String!
              $timestamp: Int
            ) {
              GetCryptoQuote(
                symbol: $symbol
                currency: $currency
                timestamp: $timestamp
              ) {
                symbol
                currency
                results {
                  high
                  low
                  open
                  close
                  change
                  changePercentage
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  cryptosBtcEthLtcXmrXrp: (
    args: Args<
      CryptosBtcEthLtcXmrXrpQuery,
      CryptosBtcEthLtcXmrXrpQueryVariables
    >,
  ) => ({
    ...args.options,
    queryKey: ["cryptosBtcEthLtcXmrXrp", args.variables],
    queryFn: async () =>
      await graphs.pricesFetch(
        gql`
          fragment CryptoRes on Crypto {
            ID
            symbol
            results {
              ID
              high
              low
              open
              close
              change
              changePercentage
            }
          }
          query CryptosBtcEthLtcXmrXrp($currency: String!, $timestamp: Int!) {
            BTC: GetCryptoQuote(
              symbol: "BTC"
              currency: $currency
              timestamp: $timestamp
            ) {
              ...CryptoRes
            }
            ETH: GetCryptoQuote(
              symbol: "ETH"
              currency: $currency
              timestamp: $timestamp
            ) {
              ...CryptoRes
            }
            LTC: GetCryptoQuote(
              symbol: "LTC"
              currency: $currency
              timestamp: $timestamp
            ) {
              ...CryptoRes
            }
            XMR: GetCryptoQuote(
              symbol: "XMR"
              currency: $currency
              timestamp: $timestamp
            ) {
              ...CryptoRes
            }
            XRP: GetCryptoQuote(
              symbol: "XRP"
              currency: $currency
              timestamp: $timestamp
            ) {
              ...CryptoRes
            }
          }
        `,
        args.variables,
      ),
  }),

  cryptosTable: (
    args: Args<CryptosTableQuery, CryptosTableQueryVariables>,
  ) => ({
    ...args.options,
    queryKey: ["cryptosTable", args.variables],
    queryFn: async () =>
      await graphs.pricesFetch(
        gql`
          query CryptosTable($symbols: String!, $currency: String!) {
            GetCryptoComparePriceFull(symbols: $symbols, currency: $currency) {
              price
              imageUrl
              mktCap
              volumeDay
              changePctHourCalculated
              changePct24HourCalculated
              changePct7DayCalculated
              fromSymbol
            }
          } 
        `,
        args.variables,
      ),
  }),
};
