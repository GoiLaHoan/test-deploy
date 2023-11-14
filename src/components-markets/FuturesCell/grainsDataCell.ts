import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

enum Names {
  Corn = "Corn",
  Hard = "Hard Red Wheat",
  Oats = "Oats",
  Spring = "Spring Wheat",
  Rice = "Rough Rice",
  Soybean = "Soybean",
  Meal = "Soybean Meal",
  Oil = "Soybean Oil",
  Wheat = "Wheat",
}

function dataProcessor(
  cbot: BarchartsFuturesByExchangeQuery,
  mgex: BarchartsFuturesByExchangeQuery,
  kcbt: BarchartsFuturesByExchangeQuery,
) {
  let data = [];

  if (cbot && mgex && kcbt) {
    const hashMap = {};
    const cbotRes = cbot?.GetBarchartFuturesByExchange?.results;
    const mgexRes = mgex?.GetBarchartFuturesByExchange?.results;
    const kcbtRes = kcbt?.GetBarchartFuturesByExchange?.results;

    for (let i = 0; i < cbotRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, cbotRes[i].name)) {
        hashMap[cbotRes[i].name] = {
          ...cbotRes[i],
          exchange: "CBOT",
          category: "Grains",
        };
      }
    }

    for (let i = 0; i < mgexRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, mgexRes[i].name)) {
        hashMap[mgexRes[i].name] = {
          ...mgexRes[i],
          exchange: "MGEX",
          category: "Grains",
        };
      }
    }

    for (let i = 0; i < kcbtRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, kcbtRes[i].name)) {
        hashMap[kcbtRes[i].name] = {
          ...kcbtRes[i],
          exchange: "KCBT",
          category: "Grains",
        };
      }
    }

    Object.keys(hashMap).map((name) => {
      switch (name) {
        case Names.Corn:
          data = [...data, hashMap[Names.Corn]];
          break;
        case Names.Hard:
          data = [...data, hashMap[Names.Hard]];
          break;
        case Names.Oats:
          data = [...data, hashMap[Names.Oats]];
          break;
        case Names.Spring:
          data = [...data, hashMap[Names.Spring]];
          break;
        case Names.Rice:
          data = [...data, hashMap[Names.Rice]];
          break;
        case Names.Soybean:
          data = [...data, hashMap[Names.Soybean]];
          break;
        case Names.Meal:
          data = [...data, hashMap[Names.Meal]];
          break;
        case Names.Oil:
          data = [...data, hashMap[Names.Oil]];
          break;
        case Names.Wheat:
          data = [...data, hashMap[Names.Wheat]];
          break;
        default:
          return;
      }
    });
  }
  return data;
}

const useFuturesGrains = () => {
  const { data: cbot } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Grains",
        exchange: "CBOT",
      },
    }),
  );

  const { data: kcbt } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Grains",
        exchange: "KCBT",
      },
    }),
  );

  const { data: mgex } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Grains",
        exchange: "MGEX",
      },
    }),
  );

  const data = dataProcessor(cbot, mgex, kcbt);

  return [data];
};

export default useFuturesGrains;
