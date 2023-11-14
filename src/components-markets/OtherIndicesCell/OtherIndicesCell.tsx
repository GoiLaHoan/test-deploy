import MarketIndicators from "~/src/components/MarketIndicators/MarketIndicators";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { FC } from "react";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";

const OtherIndicesCell: FC = () => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols: "$DOWI,$NASX,$SPX,$NYA,$GVZ,$DXY,$NKY,$TXCX,$DXY",
      },
    }),
  );

  return (
    <div>
      <MarketIndicators title="Other indicators" data={data} />
    </div>
  );
};
export default OtherIndicesCell;
