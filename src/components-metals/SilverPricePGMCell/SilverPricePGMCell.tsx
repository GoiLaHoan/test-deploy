import SilverPricePGMBlock from "~/src/components-metals/SilverPricePGMBlock/SilverPricePGMBlock";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import { roundTimestamp } from "~/src/types/globals";

export default function SilverPricePGMCell() {
  const { data } = useQuery(
    metals.silverPGM({
      variables: {
        currency: "USD",
        timestamp: roundTimestamp(),
      },
      options: {
        refetchOnWindowFocus: false,
      },
    }),
  );

  return <SilverPricePGMBlock data={data} />;
}
