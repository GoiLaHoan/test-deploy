import { FC } from "react";

import KitcoTable from "~/src/components/KitcoTable/KitcoTable";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

const BaseMetalsQuoteCell: FC = () => {
  const { data } = useQuery(
    metals.baseMetals({
      variables: {
        currency: "USD",
        timestamp: currentTimestamp(),
      },
    }),
  );

  const dataAsArray = !data
    ? []
    : [
        data?.AluminumPrice,
        data?.CopperPrice,
        data?.NickelPrice,
        data?.ZincPrice,
        data?.LeadPrice,
      ];

  return <KitcoTable data={dataAsArray} title="Kitco Base Metals" />;
};

export default BaseMetalsQuoteCell;
