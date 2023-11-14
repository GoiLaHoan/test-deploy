import { DocumentNode } from "graphql";

// global time interval to fetch new data
// and invalidate apollo cache
const INTERVAL = 30;
const pollInterval: number = INTERVAL * 1000;

export const roundTimestamp = (): number => {
  const rounder =
    Math.floor(Math.floor(Date.now() / 1000) / INTERVAL) * INTERVAL;
  const fallbackToNow = Math.floor(Date.now() / 1000);
  return rounder ?? fallbackToNow;
};

export const apolloTimestamp = (): number => {
  const rounder = roundTimestamp();
  return rounder;
};

export const roundTimestampFromArg = (stamp: number) => {
  const rounder = Math.floor(stamp / INTERVAL) * INTERVAL;
  return rounder;
};

export enum GLOBALS {
  TIME_NOW = roundTimestamp(),
  POLL_INTERVAL = pollInterval,
}

export interface CellDataQuery {
  query: DocumentNode | string | any;
  variables: object;
}
