import dayjs from "dayjs";
import { gql, request } from "graphql-request";

const BASE_URL = `https://kdb-gw.dev.kitco.com/graphql`;

interface FetcherArgs {
  symbol: string;
  activeBarTime: number;
  groupBy: any;
}

const METALS_RANGE_QUERY = gql`
  query GetMetalHistory(
    $currency: String!
    $startTime: Int!
    $endTime: Int!
    $groupBy: String!
    $limit: Int!
    $offset: Int!
    $symbol: String!
  ) {
    GetMetalHistory(
      currency: $currency
      startTime: $startTime
      endTime: $endTime
      groupBy: $groupBy
      limit: $limit
      offset: $offset
      symbol: $symbol
    ) {
      symbol
      results {
        timestamp
        high
        low
        open
        close
      }
    }
  }
`;

function groupByProcessor(groupBy: string): string {
  switch (groupBy) {
    case "1D":
      return "1d";
    case "60":
      return "1h";
    case "120":
      return "2h";
    case "180":
      return "3h";
    case "240":
      return "4h";
    default:
      return groupBy + "m";
  }
}

export const getMetalBars = async ({
  symbol,
  activeBarTime,
  groupBy,
}: FetcherArgs) => {
  const resolution = groupByProcessor(groupBy);

  const variables = {
    currency: "USD",
    symbol,
    startTime: dayjs().subtract(1000, "day").unix(),
    endTime: activeBarTime,
    groupBy: resolution,
    offset: 0,
    limit: 600,
  };

  return request(BASE_URL, METALS_RANGE_QUERY, variables).then((data) => {
    const results = data.GetMetalHistory.results;

    const bars = results.map((x: any, idx: number) => {
      const lastBarIdx = results.length - 1;
      const milliseconds = JSON.parse(x.timestamp + "000");

      return {
        time: milliseconds,
        close: x.close,
        open: x.open,
        high: x.high,
        low: x.low,
        volume: 0,
        isLastBar: lastBarIdx !== idx ? false : true,
        isBarClosed: lastBarIdx !== idx ? true : false,
      };
    });

    return bars;
  });
};

const CRYPTO_RANGE_QUERY = gql`
  query GetCryptoHistory(
    $symbol: String!
    $currency: String!
    $startTime: Int!
    $endTime: Int
    $groupBy: String!
    $limit: Int
    $offset: Int
  ) {
    GetCryptoHistory(
      symbol: $symbol
      currency: $currency
      startTime: $startTime
      endTime: $endTime
      groupBy: $groupBy
      limit: $limit
      offset: $offset
    ) {
      results {
        high
        low
        open
        close
        timestamp
      }
    }
  }
`;
export const getCryptoBars = async ({
  symbol,
  activeBarTime,
}: // groupBy,
FetcherArgs) => {
  // const resolution = groupByProcessor(groupBy)
  const variables = {
    currency: "USD",
    symbol,
    startTime: dayjs().subtract(1000, "day").unix(),
    endTime: activeBarTime,
    groupBy: "day",
    offset: 0,
    limit: 600,
  };

  return request(BASE_URL, CRYPTO_RANGE_QUERY, variables).then((data) => {
    const bars = data.GetCryptoHistory[0].results.map((x: any, idx: number) => {
      const lastBarIdx = data.GetCryptoHistory[0].results.length - 1;
      const milliseconds = JSON.parse(x.timestamp + "000");

      return {
        time: milliseconds,
        close: x.close,
        open: x.open,
        high: x.high,
        low: x.low,
        volume: 0,
        isLastBar: lastBarIdx !== idx ? false : true,
        isBarClosed: lastBarIdx !== idx ? true : false,
      };
    });

    return bars;
  });
};
