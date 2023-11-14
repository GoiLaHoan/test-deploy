import { type Args, graphs } from "./react-query-fetcher";

import { gql } from "graphql-request";
import {
  forexFragment,
  londonQuoteFragment,
  metalFragment,
  metalQuoteFragment,
} from "./metals-fragments.graphql";

import type {
  AllMetalsQuoteQuery,
  AllMetalsQuoteQueryVariables,
  BaseMetalsQuery,
  BaseMetalsQueryVariables,
  ExchangeRatesTableQueryQuery,
  GetNivoDataQuery,
  GetNivoDataQueryVariables,
  GoldRatiosQuery,
  GoldRatiosQueryVariables,
  GoldSilverPlatinumPalladiumHistoryQuery,
  GoldSilverPlatinumPalladiumHistoryQueryVariables,
  GoldSilverPlatinumPalladiumQuery,
  GoldSilverPlatinumPalladiumQueryVariables,
  LondonFixAndShanghaiFixQuery,
  LondonFixAndShanghaiFixQueryVariables,
  LondonFixDynamicQuery,
  LondonFixDynamicQueryVariables,
  LondonFixQuery,
  LondonFixQueryVariables,
  MetalAndCurrenciesQuery,
  MetalAndCurrenciesQueryVariables,
  MetalHistoryQuery,
  MetalHistoryQueryVariables,
  MetalMonthAnnualQuery,
  MetalMonthAnnualQueryVariables,
  MetalPointsInTimeQuery,
  MetalPointsInTimeQueryVariables,
  MetalQuoteQuery,
  MetalQuoteQueryVariables,
  ShanghaiFixQuery,
  ShanghaiFixQueryVariables,
  SilverPgmQuery,
  SilverPgmQueryVariables,
} from "~/src/generated";
import { excludeTimestampFromCacheKey } from "../utils/exclude-timestamp-from-cache-key.util";

export const metals = {
  metalQuote: (args: Args<MetalQuoteQuery, MetalQuoteQueryVariables>) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["metalQuote", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query MetalQuote(
              $symbol: String!
              $currency: String!
              $timestamp: Int
            ) {
              GetMetalQuote(
                symbol: $symbol
                currency: $currency
                timestamp: $timestamp
              ) {
                ...MetalFragment
              }
            }
          `,
          args.variables,
        ),
    };
  },

  allMetalsQuote: (
    args: Args<AllMetalsQuoteQuery, AllMetalsQuoteQueryVariables>,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["allMetalsQuote", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query AllMetalsQuote($currency: String!, $timestamp: Int) {
              gold: GetMetalQuote(
                symbol: "AU"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              silver: GetMetalQuote(
                symbol: "AG"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              platinum: GetMetalQuote(
                symbol: "PT"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              palladium: GetMetalQuote(
                symbol: "PD"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              rhodium: GetMetalQuote(
                symbol: "RH"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }
            }
          `,
          args.variables,
        ),
    };
  },

  goldSilverPlatinumPalladium: (
    args: Args<
      GoldSilverPlatinumPalladiumQuery,
      GoldSilverPlatinumPalladiumQueryVariables
    >,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["goldSilverPlatinumPalladium", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query GoldSilverPlatinumPalladium(
              $currency: String!
              $timestamp: Int
            ) {
              gold: GetMetalQuote(
                symbol: "AU"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              silver: GetMetalQuote(
                symbol: "AG"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              platinum: GetMetalQuote(
                symbol: "PT"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              palladium: GetMetalQuote(
                symbol: "PD"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }
            }
          `,
          args.variables,
        ),
    };
  },

  baseMetals: (args: Args<BaseMetalsQuery, BaseMetalsQueryVariables>) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["baseMetals", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query BaseMetals($timestamp: Int, $currency: String!) {
              AluminumPrice: GetMetalQuote(
                symbol: "AL"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              CopperPrice: GetMetalQuote(
                symbol: "CU"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              NickelPrice: GetMetalQuote(
                symbol: "NI"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              ZincPrice: GetMetalQuote(
                symbol: "ZN"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              LeadPrice: GetMetalQuote(
                symbol: "PB"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }
            }
          `,
          args.variables,
        ),
    };
  },

  metalPointsInTime: (
    args: Args<MetalPointsInTimeQuery, MetalPointsInTimeQueryVariables>,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["metalPointsInTime", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query MetalPointsInTime(
              $now: Int
              $thirtyday: Int
              $oneyear: Int
              $sixmonths: Int
              $symbol: String!
            ) {
              now: GetMetalQuote(
                symbol: $symbol
                timestamp: $now
                currency: "USD"
              ) {
                ...MetalFragment
              }
              thirtyday: GetMetalQuote(
                symbol: $symbol
                timestamp: $thirtyday
                currency: "USD"
              ) {
                ...MetalFragment
              }
              sixmonths: GetMetalQuote(
                symbol: $symbol
                timestamp: $sixmonths
                currency: "USD"
              ) {
                ...MetalFragment
              }
              oneyear: GetMetalQuote(
                symbol: $symbol
                timestamp: $oneyear
                currency: "USD"
              ) {
                ...MetalFragment
              }
            }
          `,
          args.variables,
        ),
    };
  },

  metalHistory: (args: Args<MetalHistoryQuery, MetalHistoryQueryVariables>) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["metalHistory", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalQuoteFragment}
            query MetalHistory(
              $symbol: String!
              $startTime: Int!
              $endTime: Int!
              $groupBy: String
              $offset: Int
              $limit: Int
              $currency: String!
            ) {
              GetMetalHistory(
                symbol: $symbol
                startTime: $startTime
                endTime: $endTime
                groupBy: $groupBy
                limit: $limit
                offset: $offset
                currency: $currency
              ) {
                currency
                symbol
                name
                results {
                  ...MetalQuoteFragment
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  goldSilverPlatinumPalladiumHistory: (
    args: Args<
      GoldSilverPlatinumPalladiumHistoryQuery,
      GoldSilverPlatinumPalladiumHistoryQueryVariables
    >,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["goldSilverPlatinumPalladiumHistory", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalQuoteFragment}
            query GoldSilverPlatinumPalladiumHistory(
              $startTime: Int!
              $endTime: Int!
              $groupBy: String
              $limit: Int
              $currency: String!
            ) {
              gold: GetMetalHistory(
                symbol: "AU"
                startTime: $startTime
                endTime: $endTime
                groupBy: $groupBy
                limit: $limit
                currency: $currency
              ) {
                currency
                symbol
                name
                results {
                  ...MetalQuoteFragment
                }
              }
              silver: GetMetalHistory(
                symbol: "AG"
                startTime: $startTime
                endTime: $endTime
                groupBy: $groupBy
                limit: $limit
                currency: $currency
              ) {
                currency
                symbol
                name
                results {
                  ...MetalQuoteFragment
                }
              }
              platinum: GetMetalHistory(
                symbol: "PT"
                startTime: $startTime
                endTime: $endTime
                groupBy: $groupBy
                limit: $limit
                currency: $currency
              ) {
                currency
                symbol
                name
                results {
                  ...MetalQuoteFragment
                }
              }
              palladium: GetMetalHistory(
                symbol: "PD"
                startTime: $startTime
                endTime: $endTime
                groupBy: $groupBy
                limit: $limit
                currency: $currency
              ) {
                currency
                symbol
                name
                results {
                  ...MetalQuoteFragment
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  nivoChartData: (args: Args<GetNivoDataQuery, GetNivoDataQueryVariables>) => {
    return {
      ...args.options,
      queryKey: ["nivoChartData", args.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalQuoteFragment}
            query GetNivoData(
              $currency: String!
              $endTime: Int!
              $groupBy: String!
              $limit: Int
              $offset: Int
              $startTime: Int!
              $symbol: String!
            ) {
              now: GetMetalQuote(
                symbol: $symbol
                timestamp: $endTime
                currency: $currency
              ) {
                ID
                symbol
                currency
                name
                results {
                  ...MetalQuoteFragment
                }
              }

              history: GetMetalHistory(
                currency: $currency
                endTime: $endTime
                groupBy: $groupBy
                limit: $limit
                offset: $offset
                startTime: $startTime
                symbol: $symbol
              ) {
                symbol
                currency
                results {
                  ...MetalQuoteFragment
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  metalAndCurrencies: (
    args: Args<MetalAndCurrenciesQuery, MetalAndCurrenciesQueryVariables>,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["metalAndCurrencies", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${forexFragment}
            query MetalAndCurrencies($symbol: String!, $timestamp: Int) {
              metal: GetMetalQuote(
                symbol: $symbol
                currency: "USD"
                timestamp: $timestamp
              ) {
                results {
                  ask
                  bid
                  change
                  changePercentage
                  high
                  low
                  mid
                  unit
                }
              }

              AUD: GetForexQuote(symbol: "AUD", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              BRL: GetForexQuote(symbol: "BRL", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              GBP: GetForexQuote(symbol: "GBP", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              CAD: GetForexQuote(symbol: "CAD", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              CNY: GetForexQuote(symbol: "CNY", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              EURO: GetForexQuote(symbol: "EUR", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              HKD: GetForexQuote(symbol: "HKD", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              INR: GetForexQuote(symbol: "INR", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              JPY: GetForexQuote(symbol: "JPY", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              MXN: GetForexQuote(symbol: "MXN", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              RUB: GetForexQuote(symbol: "RUB", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              ZAR: GetForexQuote(symbol: "ZAR", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
              # SEK: GetForexQuote(symbol: "SEK", timestamp: $timestamp) {
              #    results {
              #      ...ForexFragment
              #    }
              #  }
              # USD: GetForexQuote(symbol: "USD", timestamp: $timestamp) {
              #   results {
              #     ...ForexFragment
              #   }
              # }
              CHF: GetForexQuote(symbol: "CHF", timestamp: $timestamp) {
                results {
                  ...ForexFragment
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  shanghaiFix: (args: Args<ShanghaiFixQuery, ShanghaiFixQueryVariables>) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["shanghaiFix", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query ShanghaiFix(
              $currency: String!
              $timestamp: Int!
              $symbol: String!
            ) {
              GetShanghaiFix(
                currency: $currency
                timestamp: $timestamp
                symbol: $symbol
              ) {
                ID
                currency
                symbol
                results {
                  ID
                  timestamp
                  am
                  pm
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  londonFix: (args: Args<LondonFixQuery, LondonFixQueryVariables>) => {
    return {
      ...args.options,
      queryKey: ["londonFix"], // dont use variables as cache key here
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${londonQuoteFragment}
            query LondonFix($yesterday: Int!, $today: Int!) {
              londonFixUSD: GetLondonFix(
                currency: "USD"
                startTime: $yesterday
                endTime: $today
              ) {
                currency
                startTime
                endTime
                results {
                  ...LondonQuoteFragment
                }
              }
              londonFixEUR: GetLondonFix(
                currency: "EUR"
                startTime: $yesterday
                endTime: $today
              ) {
                currency
                startTime
                endTime
                results {
                  ...LondonQuoteFragment
                }
              }
              londonFixGBP: GetLondonFix(
                currency: "GBP"
                startTime: $yesterday
                endTime: $today
              ) {
                currency
                startTime
                endTime
                results {
                  ...LondonQuoteFragment
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  londonFixDynamic: (
    args: Args<LondonFixDynamicQuery, LondonFixDynamicQueryVariables>,
  ) => {
    return {
      ...args.options,
      queryKey: ["londonFixDynamic", args.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${londonQuoteFragment}
            query LondonFixDynamic(
              $currency: String!
              $startTime: Int!
              $endTime: Int!
            ) {
              GetLondonFix(
                currency: $currency
                startTime: $startTime
                endTime: $endTime
              ) {
                ID
                currency
                results {
                  ...LondonQuoteFragment
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  londonFixAndShanghaiFix: (
    args: Args<
      LondonFixAndShanghaiFixQuery,
      LondonFixAndShanghaiFixQueryVariables
    >,
  ) => {
    return {
      ...args.options,
      queryKey: ["londonFixAndShanghaiFix", args.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${londonQuoteFragment}
            query LondonFixAndShanghaiFix(
              $currency: String!
              $yesterday: Int!
              $today: Int!
              $symbol: String!
            ) {
              londonFix: GetLondonFix(
                currency: $currency
                startTime: $yesterday
                endTime: $today
                limit: 1
              ) {
                ID
                currency
                startTime
                endTime
                results {
                  ...LondonQuoteFragment
                }
              }
              shanghaiFix: GetShanghaiFix(
                currency: $currency
                timestamp: $yesterday
                symbol: $symbol
              ) {
                ID
                currency
                symbol
                results {
                  ID
                  timestamp
                  am
                  pm
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  silverPGM: (args: Args<SilverPgmQuery, SilverPgmQueryVariables>) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["silverPGM", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query SilverPGM($currency: String!, $timestamp: Int) {
              silver: GetMetalQuote(
                symbol: "AG"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              platinum: GetMetalQuote(
                symbol: "PT"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              palladium: GetMetalQuote(
                symbol: "PD"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }

              rhodium: GetMetalQuote(
                symbol: "RH"
                timestamp: $timestamp
                currency: $currency
              ) {
                ...MetalFragment
              }
            }
          `,
          args.variables,
        ),
    };
  },

  metalMonthAnnual: (
    args: Args<MetalMonthAnnualQuery, MetalMonthAnnualQueryVariables>,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["metalMonthAnnual", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query MetalMonthAnnual(
              $symbol: String!
              $currency: String!
              $timestamp: Int!
            ) {
              GetHistoricalPoints(
                symbol: $symbol
                currency: $currency
                timestamp: $timestamp
              ) {
                ID
                now {
                  ID
                  bid
                  ask
                  low
                  high
                  change
                  changePercentage
                }
                thirtyDay {
                  ID
                  change
                  changePercentage
                }
                sixtyDay {
                  ID
                  change
                  changePercentage
                }
                oneYear {
                  ID
                  change
                  changePercentage
                }
                fiveYear {
                  ID
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

  goldRatios: (args: Args<GoldRatiosQuery, GoldRatiosQueryVariables>) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args.options,
      queryKey: ["goldRatios", cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${metalFragment}
            ${metalQuoteFragment}
            query GoldRatios($symbols: String!, $timestamp: Int!) {
              gold: GetMetalQuote(
                symbol: "AU"
                currency: "USD"
                timestamp: $timestamp
              ) {
                ...MetalFragment
              }
              silver: GetMetalQuote(
                symbol: "AG"
                currency: "USD"
                timestamp: $timestamp
              ) {
                ...MetalFragment
              }
              palladium: GetMetalQuote(
                symbol: "PD"
                currency: "USD"
                timestamp: $timestamp
              ) {
                ...MetalFragment
              }
              platinum: GetMetalQuote(
                symbol: "PT"
                currency: "USD"
                timestamp: $timestamp
              ) {
                ...MetalFragment
              }

              quotes: GetBarchartQuotes(
                symbols: $symbols
                timestamp: $timestamp
              ) {
                timestamp
                symbols
                results {
                  lastPrice
                  name
                  serverTimestamp
                  symbol
                }
              }

              # this actually returns a giant list of stuff well have to filter
              crudeOil: GetBarchartFuturesByExchange(
                exchange: "NYMEX"
                category: "Energies"
              ) {
                timestamp
                exchange
                results {
                  name
                  lastPrice
                  netChange
                  symbol
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },

  exchangeRatesTable: (args?: Args<ExchangeRatesTableQueryQuery, void>) => {
    return {
      ...args?.options,
      queryKey: ["exchangeRatesTable"],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query ExchangeRatesTableQuery {
              GetLiveSpotGoldTable {
                ID
                Symbol
                Table {
                  Currency
                  Rate {
                    CurrencyToUsd
                    UsdToCurrency
                    ChangePercent
                    NYTime
                  }
                  Gold {
                    Price
                    Change
                    ChangePercent
                  }
                }
              }
            }
          `,
          args.variables,
        ),
    };
  },
};
