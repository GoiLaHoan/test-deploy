import { FC } from "react";

import MarketIndices from "~/src/components/MarketIndices/MarketIndices";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";

const IndicesCell: FC<any> = () => {
  const { data } = useQuery(
    markets.regionIndices({
      variables: {
        timestamp: currentTimestamp(),
      },
    }),
  );

  return (
    <div>
      <MarketIndices data={data} />
    </div>
  );
};

export default IndicesCell;
