import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

enum Meats {
  LiveCattle = "Live Cattle",
  FeederCattle = "Feeder Cattle",
  LeanHogs = "Lean Hogs",
  PorkCutout = "Pork Cutout",
  Milk = "Class III Milk",
}

function dataProcessor(cme: BarchartsFuturesByExchangeQuery) {
  let meats = [];

  if (cme) {
    const hashMap = {};
    const { results } = cme?.GetBarchartFuturesByExchange;

    for (let i = 0; i < results.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, results[i].name)) {
        hashMap[results[i].name] = {
          ...results[i],
          exchange: "CME",
          category: "Meats",
        };
      }
    }

    Object.keys(hashMap).map((x) => {
      switch (x) {
        case Meats.LiveCattle:
          meats = [...meats, hashMap[Meats.LiveCattle]];
          break;
        case Meats.FeederCattle:
          meats = [...meats, hashMap[Meats.FeederCattle]];
          break;
        case Meats.LeanHogs:
          meats = [...meats, hashMap[Meats.LeanHogs]];
          break;
        case Meats.PorkCutout:
          meats = [...meats, hashMap[Meats.PorkCutout]];
          break;
        case Meats.Milk:
          meats = [...meats, hashMap[Meats.Milk]];
          break;
        default:
          return;
      }
    });
  }

  return meats;
}

const useFuturesMeats = () => {
  const { data: cme } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Meats",
        exchange: "CME",
      },
    }),
  );

  const data = dataProcessor(cme);

  return [data];
};

export default useFuturesMeats;
