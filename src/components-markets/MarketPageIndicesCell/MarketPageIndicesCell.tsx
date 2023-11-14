import React, { FC } from "react";

import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";

export const indicesSymbols = "$DOWI,$NASX,$SPX,$NYA,$GVZ";
export const indices = [
  { symbol: "$DOWI", name: "Dow Jones" },
  { symbol: "$NASX", name: "Nasdaq" },
  { symbol: "$SPX", name: "S&P 500" },
  { symbol: "$NYA", name: "NYSE" },
  { symbol: "$GVZ", name: "Gold Volatility Index" },
];

const MarketPageIndicesCell: FC = () => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        symbols: "$DOWI,$NASX,$SPX,$NYA,$GVZ",
        timestamp: currentTimestamp(),
      },
    }),
  );

  // const titles = ['symbol', 'name', 'high', 'low', 'last', 'change', 'volume']

  // if (props.test) {
  //   return (
  //     <DataTable title="Market Indices">
  //       <DataTitles titles={titles} />
  //       {data?.indices?.results?.map((x, idx) => (
  //         <DataItem
  //           altBG={!(idx % 2)}
  //           symbol={x.symbol}
  //           name={x.name}
  //           high={x.high}
  //           low={x.low}
  //           last={x.lastPrice}
  //           change={x.netChange}
  //           changePercent={x.percentChange}
  //           volume={x.volume}
  //           href={`/markets/indices/${x.symbol}`}
  //         />
  //       ))}
  //     </DataTable>
  //   )
  // }

  return (
    <QuotesTable
      title="Market Indices"
      section="indices"
      data={data?.GetBarchartQuotes?.results}
    />
  );
};
export default MarketPageIndicesCell;
