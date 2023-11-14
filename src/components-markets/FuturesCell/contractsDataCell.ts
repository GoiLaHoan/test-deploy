import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";

const useFuturesContracts = (
  // name: string,
  category: string,
  exchange: string,
) => {
  const { data: cme } = useQuery(
    markets.futuresByExchange({
      variables: {
        category,
        exchange: exchange ?? "CME",
      },
    }),
  );

  // const data = dataProcessor(cme, name)

  return [cme?.GetBarchartFuturesByExchange?.results];
};

export default useFuturesContracts;
