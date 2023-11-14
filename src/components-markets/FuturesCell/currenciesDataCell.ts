import { useQuery } from "react-query";
import { BarchartsFuturesByExchangeQuery } from "~/src/generated";
import { markets } from "~/src/lib/markets-factory.lib";

enum Money {
  Bitcoin = "Bitcoin CME Futures",
  BritishPound = "British Pound",
  CanadianDollar = "Canadian Dollar",
  JapaneseYen = "Japanese Yen",
  SwissFranc = "Swiss Franc",
  EuroFX = "Euro FX",
  AustralianDollar = "Australian Dollar",
  MexicanPeso = "Mexican Peso",
  NewZealandDollar = "New Zealand Dollar",
  SouthAfricanRand = "South African Rand",
  BrazilianReal = "Brazilian Real",
  RussianRuble = "Russian Ruble",
}

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
          category: "Currencies",
        };
      }
    }

    Object.keys(hashMap).map((name) => {
      switch (name) {
        case Money.Bitcoin:
          data = [...data, hashMap[Money.Bitcoin]];
          break;
        case Money.BritishPound:
          data = [...data, hashMap[Money.BritishPound]];
          break;
        case Money.CanadianDollar:
          data = [...data, hashMap[Money.CanadianDollar]];
          break;
        case Money.JapaneseYen:
          data = [...data, hashMap[Money.JapaneseYen]];
          break;
        case Money.SwissFranc:
          data = [...data, hashMap[Money.SwissFranc]];
          break;
        case Money.EuroFX:
          data = [...data, hashMap[Money.EuroFX]];
          break;
        case Money.AustralianDollar:
          data = [...data, hashMap[Money.AustralianDollar]];
          break;
        case Money.MexicanPeso:
          data = [...data, hashMap[Money.MexicanPeso]];
          break;
        case Money.NewZealandDollar:
          data = [...data, hashMap[Money.NewZealandDollar]];
          break;
        case Money.SouthAfricanRand:
          data = [...data, hashMap[Money.SouthAfricanRand]];
          break;
        case Money.BrazilianReal:
          data = [...data, hashMap[Money.BrazilianReal]];
          break;
        case Money.RussianRuble:
          data = [...data, hashMap[Money.RussianRuble]];
          break;
        default:
          return;
      }
    });
  }

  return data;
}

const useFuturesCurrencies = () => {
  const { data: cme } = useQuery(
    markets.futuresByExchange({
      variables: {
        category: "Currencies",
        exchange: "CME",
      },
    }),
  );

  const data = dataProcessor(cme);

  return [data];
};

export default useFuturesCurrencies;
