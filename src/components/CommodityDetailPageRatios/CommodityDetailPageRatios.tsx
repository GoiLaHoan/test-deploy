// TODO: this component needs to be refactored once we proxy barcharts into gql
// TODO: this component needs to be refactored once we proxy barcharts into gql
// TODO: this component needs to be refactored once we proxy barcharts into gql
// TODO: this component needs to be refactored once we proxy barcharts into gql
// TODO: this component needs to be refactored once we proxy barcharts into gql
import fetchers from "~/src/utils/fetchers";
import classNames from "classnames";
import { capitalize } from "lodash";
import { FC } from "react";
import useSWR from "swr";
import { RatioCommodity } from "~/src/types/index";

const QUERY = `
fragment MetalQuote on Quote {
  timestamp
  high
  low
  open
  close
  ask
  bid
  mid
  change
  changePercentage
  unit
}
query AllMetalQuotes($currency: String!, $timestamp: Int) {
  gold: GetMetalQuote(
    symbol: "AU"
    timestamp: $timestamp
    currency: $currency
  ) {
    symbol
    currency
    name
    results {
      ...MetalQuote
    }
  }

  silver: GetMetalQuote(
    symbol: "AG"
    timestamp: $timestamp
    currency: $currency
  ) {
    symbol
    currency
    name
    results {
      ...MetalQuote
    }
  }

  platinum: GetMetalQuote(
    symbol: "PT"
    timestamp: $timestamp
    currency: $currency
  ) {
    symbol
    currency
    name
    results {
      ...MetalQuote
    }
  }

  palladium: GetMetalQuote(
    symbol: "PD"
    timestamp: $timestamp
    currency: $currency
  ) {
    symbol
    currency
    name
    results {
      ...MetalQuote
    }
  }

  rhodium: GetMetalQuote(
    symbol: "RH"
    timestamp: $timestamp
    currency: $currency
  ) {
    symbol
    currency
    name
    results {
      ...MetalQuote
    }
  }
}
`;

const CommodityDetailPageRatios: FC<{
  metal: string;
  currency: any;
}> = ({ metal, currency }) => {
  const timestamp = Math.floor(Date.now() / 1000);

  const { data } = useSWR([QUERY, currency, timestamp], (query, c, t) =>
    fetchers.gateway(query, {
      currency: c,
      timestamp: t,
    }),
  );
  const { data: dataBarcharts } = useSWR("/api/getQuote/$XAU,$HUI");
  const allCommodities: RatioCommodity[] = [
    {
      name: "Gold",
      price: data?.gold?.results?.map((x) => x.bid)[0] || undefined,
    },
    {
      name: "Silver",
      price: data?.silver?.results?.map((x) => x.bid)[0] || undefined,
    },
    {
      name: "Platinum",
      price: data?.platinum?.results?.map((x) => x.bid)[0] || undefined,
    },
    {
      name: "Palladium",
      price: data?.palladium?.results?.map((x) => x.bid)[0] || undefined,
    },
    {
      name: "Rhodium",
      price: data?.rhodium?.results?.map((x) => x.bid)[0] || undefined,
    },
    {
      name: "XAU",
      price:
        dataBarcharts?.results.find((r) => r.symbol === "$XAU")?.lastPrice ||
        undefined,
    },
    {
      name: "HUI",
      price:
        dataBarcharts?.results.find((r) => r.symbol === "$HUI")?.lastPrice ||
        undefined,
    },
  ];

  // Define commodity A by the current page. All other commodities are part of the commodity B list.
  const commodityA: RatioCommodity = allCommodities.find(
    (a) => a.name === capitalize(metal),
  );
  const commodityBList: RatioCommodity[] = allCommodities.filter(
    (a) => a.name !== capitalize(metal),
  );

  function getRatio(
    commodityA: RatioCommodity,
    commodityB: RatioCommodity,
  ): string {
    if (!commodityA || !commodityB || !commodityA.price || !commodityB.price) {
      return "-";
    }
    return (commodityA.price / commodityB.price).toFixed(3);
  }

  const ratios = commodityBList.map((c, i, a) => {
    const itemClasses = "flex justify-between py-1 border-b";
    const classes = classNames(itemClasses, {
      "border-b-0": a.length - 1 === i,
    });
    return (
      <div key={i} className={classes}>
        <span>{c.name}</span>
        <span>{getRatio(commodityA, c)}</span>
      </div>
    );
  });

  return (
    <div className="border rounded-sm p-4">
      <h3 className="text-lg font-bold capitalize">{metal} Ratios</h3>
      {ratios}
    </div>
  );
};

export default CommodityDetailPageRatios;
