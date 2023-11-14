import { FC, memo } from "react";

import CommodityDetailPageHistorical from "~/src/components/CommodityDetailPageHistorical/CommodityDetailPageHistorical";
import MetalMonthHomePage from "~/src/components/MetalMonthHomePage/MetalMonthHomePage";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

const MetalMonthAnnualCell: FC<{
  componentAlias?: "commodityPageHistorical";
}> = ({ componentAlias }) => {
  const { data } = useQuery(
    metals.metalMonthAnnual({
      variables: {
        symbol: "AU",
        currency: "USD",
        timestamp: currentTimestamp(),
      },
    }),
  );

  if (componentAlias === "commodityPageHistorical") {
    return <CommodityDetailPageHistorical data={data} />;
  }

  return (
    <div>
      <MetalMonthHomePage data={data} />
    </div>
  );
};

export default memo(MetalMonthAnnualCell);
