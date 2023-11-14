import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

function dataProcessor(cme: BarchartsFuturesByExchangeQuery) {
  let data = [];

  if (cme) {
    const hashMap = {};
    const results = cme?.GetBarchartFuturesByExchange?.results;

    for (let i = 0; i < results.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, results[i].name)) {
        hashMap[results[i].name] = {
          ...results[i],
          exchange: "CME",
          category: "Softs",
        };
      }
    }

    Object.keys(hashMap).map((x) => {
      if (x === "Lumber") {
        data = [...data, hashMap["Lumber"]];
      }
    });
  }
  return data;
}

const useFuturesSofts = () => {
  const { data: cme } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Softs",
        exchange: "CME",
      },
    }),
  );

  const data = dataProcessor(cme);

  return [data];
};

export default useFuturesSofts;
