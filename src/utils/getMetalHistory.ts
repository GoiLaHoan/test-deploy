import dayjs from "dayjs";
import { request } from "graphql-request";

const METALS_RANGE_QUERY = `
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
        high
        low
        open
        close
        ask
        mid
        bid
      }
    }
  }
`;

interface HistoryParams {
  symbol: string;
  activeBarTime: number;
  endTime: number;
  groupBy?: string;
  currency?: string;
  offset?: number;
  limit?: number;
}

const BASE_URL = `https://kdb-gw.dev.kitco.com/graphql`;

export const getMetalHistory = async ({
  symbol,
  activeBarTime,
  endTime,
  groupBy,
  currency,
  offset,
  limit,
}: HistoryParams): Promise<any> => {
  const variables = {
    currency: currency || "USD",
    symbol,
    startTime: activeBarTime,
    endTime: endTime || dayjs().add(30, "day").unix(),

    groupBy: groupBy || "1d",
    offset: offset || 0,
    limit: limit || 200,
  };

  return request(BASE_URL, METALS_RANGE_QUERY, variables);
};
