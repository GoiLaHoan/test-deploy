import { gql } from "graphql-request";
import { type Args, graphs } from "./react-query-fetcher";

import type {
  BarchartsFuturesByExchangeQuery,
  BarchartsFuturesByExchangeQueryVariables,
  BarchartsGoldIndicatorsQuery,
  BarchartsGoldIndicatorsQueryVariables,
  BarchartsLeadersQuery,
  BarchartsLeadersQueryVariables,
  BarchartsQuotesQuery,
  BarchartsQuotesQueryVariables,
  MarketStatusQuery,
  MarketStatusQueryVariables,
  RegionIndicesQuery,
  RegionIndicesQueryVariables,
} from "~/src/generated";
import { barchartFragment } from "./metals-fragments.graphql";
import { excludeTimestampFromCacheKey } from "../utils/exclude-timestamp-from-cache-key.util";

export const markets = {
  marketStatus: (
    args?: Args<MarketStatusQuery, MarketStatusQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: [`marketStatus`],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query MarketStatus {
              GetMarketStatus {
                status
                next
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  barchartsGoldIndicators: (
    args?: Args<
      BarchartsGoldIndicatorsQuery,
      BarchartsGoldIndicatorsQueryVariables
    >,
  ) => {
    return {
      ...args?.options,
      queryKey: [`barchartsGoldIndicators`, args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            ${barchartFragment}
            query BarchartsGoldIndicators($symbols: String!, $timestamp: Int!) {
              GetBarchartQuotes(symbols: $symbols, timestamp: $timestamp) {
                results {
                  ...BarchartFragment
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  barchartsQuotes: (
    args?: Args<BarchartsQuotesQuery, BarchartsQuotesQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: [`barchartsQuotes`, args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query BarchartsQuotes($timestamp: Int!, $symbols: String!) {
              GetBarchartQuotes(symbols: $symbols, timestamp: $timestamp) {
                timestamp
                symbols
                results {
                  high
                  lastPrice
                  low
                  name
                  netChange
                  open
                  percentChange
                  serverTimestamp
                  symbol
                  volume
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  barchartsLeaders: (
    args?: Args<BarchartsLeadersQuery, BarchartsLeadersQueryVariables>,
  ) => {
    return {
      ...args?.options,
      queryKey: [`barchartsLeaders`, args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query BarchartsLeaders($leaderType: String!, $limit: Int!) {
              leaders: GetBarchartLeaders(
                maxRecords: $limit
                leaderboardType: $leaderType
                exchanges: "NYSE,AMEX,NASDAQ"
                assetType: "STK"
              ) {
                exchanges
                timestamp
                results {
                  symbol
                  symbolName
                  priceNetChange
                  pricePercentChange
                  lastPrice
                  timestamp
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  regionIndices: (
    args?: Args<RegionIndicesQuery, RegionIndicesQueryVariables>,
  ) => {
    const cacheKey = excludeTimestampFromCacheKey(args.variables);
    return {
      ...args?.options,
      queryKey: [`barchartsLeaders`, cacheKey],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query RegionIndices($timestamp: Int!) {
              USquotes: GetBarchartQuotes(
                symbols: "$NASX,$DOWI,$SPX"
                timestamp: $timestamp
              ) {
                timestamp
                symbols
                results {
                  lastPrice
                  name
                  netChange
                  percentChange
                  serverTimestamp
                  symbol
                }
              }

              EUquotes: GetBarchartQuotes(
                symbols: "$CAC,$SSMI,$DAX,"
                timestamp: $timestamp
              ) {
                timestamp
                symbols
                results {
                  lastPrice
                  name
                  netChange
                  percentChange
                  serverTimestamp
                  symbol
                }
              }

              ASIAquotes: GetBarchartQuotes(
                symbols: "$NKY,$HSI,$AXJO,"
                timestamp: $timestamp
              ) {
                timestamp
                symbols
                results {
                  lastPrice
                  name
                  netChange
                  percentChange
                  serverTimestamp
                  symbol
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },

  futuresByExchange: (
    args?: Args<
      BarchartsFuturesByExchangeQuery,
      BarchartsFuturesByExchangeQueryVariables
    >,
  ) => {
    return {
      ...args?.options,
      queryKey: [`futuresByExchange`, args?.variables],
      queryFn: async () =>
        await graphs.pricesFetch(
          gql`
            query BarchartsFuturesByExchange(
              $exchange: String!
              $category: String!
            ) {
              GetBarchartFuturesByExchange(
                exchange: $exchange
                category: $category
              ) {
                timestamp
                exchange
                results {
                  name
                  lastPrice
                  percentChange
                  netChange
                  symbol
                  close
                  low
                  high
                }
              }
            }
          `,
          args?.variables,
        ),
    };
  },
};
