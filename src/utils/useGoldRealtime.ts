import { gql, useSubscription } from "@apollo/client";

export interface GoldRealtimeValues {
  ask: number;
  bid: number;
  change: number;
  changePercentage: number;
  mid: number;
  low: number;
  high: number;
}

export interface GoldRealtime {
  data: {
    RealtimeGold: GoldRealtimeValues;
  };
  error: any;
}

const GOLDEN_SHOWER = gql`
  subscription RealtimeGold($currency: String!) {
    RealtimeGold(currency: $currency) {
      bid
      ask
      change
      changePercentage
      unit
      mid
      low
      high
    }
  }
`;

const useGoldRealtime = (currency?: string): GoldRealtime => {
  const query = useSubscription(GOLDEN_SHOWER, {
    variables: { currency: !currency ? "USD" : currency },
  });
  const realtime = query as GoldRealtime;
  return { data: realtime.data, error: realtime.error };
};

export default useGoldRealtime;
