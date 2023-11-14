import { useCurrencyReadOnlyAtom } from "~/src/components/CurrencySelect/CurrencySelect";

import { FC, memo } from "react";

import CommodityPrice from "~/src/components/CommodityPrice/CommodityPrice";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

export const componentData = (symbol: string) => {
  return {
    symbol: !symbol ? "AU" : symbol,
    currency: "USD",
    timestamp: currentTimestamp(),
  };
};

const MetalQuoteCell: FC<{ symbol: string }> = ({ symbol }) => {
  const currency = useCurrencyReadOnlyAtom();

  const { data } = useQuery(
    metals.metalQuote({
      variables: {
        symbol: !symbol ? "AU" : symbol,
        currency: currency.symbol ?? "USD",
        timestamp: currentTimestamp(),
      },
    }),
  );

  return (
    <div>
      {/* <LiveSpotGoldBlock
        subscriptionData={realtime?.data?.RealtimeGold}
        thirtyDay={thirtyDay}
        oneYear={oneYear}
      /> */}

      {/* <CommodityPageHeroValues
        currency={currency}
        setCurrency={setCurrency}
        commodity={name}
        data={data}
      /> */}

      <CommodityPrice symbol={symbol} currency={currency} data={data} />
    </div>
  );
};

export default memo(MetalQuoteCell);
