import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

enum Metals {
  Aluminum = "Aluminum",
  Copper = "High Grade Copper",
  Platinum = "Platinum",
  Palladium = "Palladium",
  Gold = "Gold",
  Silver = "Silver",
}

function dataProcessor(
  comex: BarchartsFuturesByExchangeQuery,
  nymex: BarchartsFuturesByExchangeQuery,
) {
  let data = [];

  if (nymex && comex) {
    const hashMap = {};
    const nymexRes = nymex?.GetBarchartFuturesByExchange?.results;
    const comexRes = comex?.GetBarchartFuturesByExchange?.results;

    for (let i = 0; i < nymexRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, nymexRes[i].name)) {
        hashMap[nymexRes[i].name] = {
          ...nymexRes[i],
          exchange: "NYMEX",
          category: "Metals",
        };
      }
    }

    for (let i = 0; i < comexRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, comexRes[i].name)) {
        hashMap[comexRes[i].name] = {
          ...comexRes[i],
          exchange: "COMEX",
          category: "Metals",
        };
      }
    }

    Object.keys(hashMap).map((x) => {
      switch (x) {
        case Metals.Gold:
          data = [...data, hashMap[Metals.Gold]];
          break;
        case Metals.Silver:
          data = [...data, hashMap[Metals.Silver]];
          break;
        case Metals.Platinum:
          data = [...data, hashMap[Metals.Platinum]];
          break;
        case Metals.Palladium:
          data = [...data, hashMap[Metals.Palladium]];
          break;
        case Metals.Copper:
          data = [...data, hashMap[Metals.Copper]];
          break;
        case Metals.Aluminum:
          data = [...data, hashMap[Metals.Aluminum]];
          break;
        default:
          return;
      }
    });
  }

  return data;
}

const useFuturesMetals = () => {
  const { data: nymex } = useQuery(
    markets.futuresByExchange({
      variables: {
        exchange: "NYMEX",
        category: "Metals",
      },
    }),
  );

  const { data: comex } = useQuery(
    markets.futuresByExchange({
      variables: {
        exchange: "COMEX",
        category: "Metals",
      },
    }),
  );

  const data = dataProcessor(comex, nymex);

  return [data];
};

export default useFuturesMetals;
