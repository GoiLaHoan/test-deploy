import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

enum Energies {
  Crude = "Crude Oil WTI",
  Harbor = "ULSD NY Harbor",
  Brent = "Crude Oil Brent (F)",
  Rbob = "Gasoline RBOB",
  Natural = "Natural Gas",
  Ethanol = "Ethanol Futures",
}

function dataProcessor(
  cbot: BarchartsFuturesByExchangeQuery,
  nymex: BarchartsFuturesByExchangeQuery,
) {
  let data = [];

  if (nymex && cbot) {
    const hashMap = {};
    const nymexRes = nymex?.GetBarchartFuturesByExchange?.results;
    const cbotRes = cbot?.GetBarchartFuturesByExchange?.results;

    for (let i = 0; i < cbotRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, cbotRes[i].name)) {
        hashMap[cbotRes[i].name] = {
          ...cbotRes[i],
          exchange: "CBOT",
          category: "Energies",
        };
      }
    }

    for (let i = 0; i < nymexRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, nymexRes[i].name)) {
        hashMap[nymexRes[i].name] = {
          ...nymexRes[i],
          exchange: "NYMEX",
          category: "Energies",
        };
      }
    }

    Object.keys(hashMap).map((x) => {
      switch (x) {
        case Energies.Crude:
          data = [...data, hashMap[Energies.Crude]];
          break;
        case Energies.Harbor:
          data = [...data, hashMap[Energies.Harbor]];
          break;
        case Energies.Brent:
          data = [...data, hashMap[Energies.Brent]];
          break;
        case Energies.Rbob:
          data = [...data, hashMap[Energies.Rbob]];
          break;
        case Energies.Natural:
          data = [...data, hashMap[Energies.Natural]];
          break;
        case Energies.Ethanol:
          data = [...data, hashMap[Energies.Ethanol]];
          break;
        default:
          return;
      }
    });
  }

  return data;
}

const useFuturesEnergies = () => {
  const { data: cbot } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Energies",
        exchange: "CBOT",
      },
    }),
  );

  const { data: nymex } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Energies",
        exchange: "NYMEX",
      },
    }),
  );

  const data = dataProcessor(cbot, nymex);

  return [data];
};

export default useFuturesEnergies;
