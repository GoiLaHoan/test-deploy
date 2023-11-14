import type { BarchartQuote, BarchartsQuotesQuery } from "~/src/generated";
import { FC, useState } from "react";

import FutureForexTable from "~/src/components/FutureForexTable/FutureForexTable";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";

export const defaultForex = "^USDAUD,^USDCAD,^USDCNY,^USDEUR,^USDGBP,^USDJPY";

interface BarchartQuoteExtended extends BarchartQuote {
  category: string;
  exchange: string;
}

function dataManufacturer(res: BarchartsQuotesQuery): BarchartQuoteExtended[] {
  let hash = {};
  const array = [];

  const results = res?.GetBarchartQuotes?.results ?? [];
  results.length &&
    results.map((x) => {
      hash = { ...x, category: "Currencies", exchange: "CME" };
      array.push(hash);
    });

  return array;
}

const FutureForexCell: FC<{ symbols?: string; title: "futures" | "forex" }> = ({
  symbols,
  title,
}) => {
  const [results, setResults] = useState<BarchartQuoteExtended[] | []>([]);

  useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols: symbols ?? defaultForex,
      },
      options: {
        onSuccess: (res) => setResults(() => dataManufacturer(res)),
      },
    }),
  );

  return (
    <FutureForexTable
      title={title !== "forex" ? "Futures" : "Forex"}
      data={results}
      showMore={false}
    />
  );
};

export default FutureForexCell;
