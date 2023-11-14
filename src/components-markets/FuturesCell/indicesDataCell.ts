import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

enum Index {
  Sp500 = "S&P 500 E-Mini",
  Nasdaq = "Nasdaq 100 E-Mini",
  Dow = "Dow Futures Mini",
  Russell = "Russell 2000 E-Mini",
  Midcap = "S&P Midcap E-Mini",
  SpGSCI = "S&P GSCI",
}
function dataProcessor(
  gblx: BarchartsFuturesByExchangeQuery,
  cbotm: BarchartsFuturesByExchangeQuery,
  cme: BarchartsFuturesByExchangeQuery,
) {
  let indices = [];

  if (gblx && cbotm && cme) {
    const hashMap = {};
    const gblxRes = gblx?.GetBarchartFuturesByExchange?.results;
    const cbotmRes = cbotm?.GetBarchartFuturesByExchange?.results;
    const cmeRes = cme?.GetBarchartFuturesByExchange?.results;

    for (let i = 0; i < gblxRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, gblxRes[i].name)) {
        hashMap[gblxRes[i].name] = {
          ...gblxRes[i],
          exchange: "GBLX",
          category: "Indices",
        };
      }
    }

    for (let i = 0; i < cbotmRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, cbotmRes[i].name)) {
        hashMap[cbotmRes[i].name] = {
          ...cbotmRes[i],
          exchange: "CBOTM",
          category: "Indices",
        };
      }
    }

    for (let i = 0; i < cmeRes.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(hashMap, cmeRes[i].name)) {
        hashMap[cmeRes[i].name] = {
          ...cmeRes[i],
          exchange: "CME",
          category: "Indices",
        };
      }
    }

    Object.keys(hashMap).map((x) => {
      switch (x) {
        case Index.Sp500:
          indices = [...indices, hashMap[Index.Sp500]];
          break;
        case Index.Nasdaq:
          indices = [...indices, hashMap[Index.Nasdaq]];
          break;
        case Index.Dow:
          indices = [...indices, hashMap[Index.Dow]];
          break;
        case Index.Russell:
          indices = [...indices, hashMap[Index.Russell]];
          break;
        case Index.Midcap:
          indices = [...indices, hashMap[Index.Midcap]];
          break;
        case Index.SpGSCI:
          indices = [...indices, hashMap[Index.SpGSCI]];
          break;
        default:
          return;
      }
    });
  }

  return indices;
}

const useFuturesIndices = () => {
  const { data: gblx } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Indices",
        exchange: "GBLX",
      },
    }),
  );

  const { data: cbotm } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Indices",
        exchange: "CBOTM",
      },
    }),
  );

  const { data: cme } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Indices",
        exchange: "CME",
      },
    }),
  );

  const data = dataProcessor(gblx, cbotm, cme);

  return [data];
};

export default useFuturesIndices;
