import { currentTimestamp } from "~/src/utils/current-timestamp";
import useScreenSize from "~/src/utils/useScreenSize";
import { FC, useCallback } from "react";

import GoldRatiosTable from "~/src/components/GoldRatiosTable/GoldRatiosTable";
import GoldRatiosTableMobile from "~/src/components/GoldRatiosTable/GoldRatiosTableMobile";
import { useQuery } from "react-query";
import { GoldRatiosQuery } from "~/src/generated";
import { metals } from "~/src/lib/metals-factory.lib";
import GoldIndicesRatios from "~/src/components/GoldIndicesRatios/GoldIndicesRatios";
import dayjs from "dayjs";

const GoldRatiosCell: FC<{ ssrTimestamp?: number }> = ({ ssrTimestamp }) => {
  const { isDesktop } = useScreenSize();

  const { data } = useQuery(
    metals.goldRatios({
      variables: {
        timestamp: ssrTimestamp ?? currentTimestamp(),
        symbols: "$XAU,$HUI,$SPX,$DOWI",
      },
      options: {
        select: useCallback((d: GoldRatiosQuery) => {
          const transformCrudeOilName = d?.crudeOil?.results?.filter(
            (item: any) => item.name === "Crude Oil WTI",
          );
          return {
            ...d,
            crudeOil: { ...d.crudeOil, results: transformCrudeOilName },
          };
        }, []),
      },
    }),
  );

  return (
    <>
      {isDesktop ? (
        <GoldRatiosTable data={calculateRatios(data)} />
      ) : (
        <>
          <GoldRatiosTableMobile data={calculateRatios(data)} />
          <GoldIndicesRatios data={calculateRatios(data)} />
        </>
      )}
    </>
  );
};

export default GoldRatiosCell;

// HELPERS
function calculateRatios(data?: GoldRatiosQuery) {
  if (!data) return 0;

  const numerator = data?.gold?.results[0]?.bid;

  const quoteFinder = (s: string) =>
    data?.quotes?.results?.find(({ symbol }) => symbol === s)?.lastPrice;

  const crudeOilFinder = () =>
    data?.crudeOil?.results?.find(
      ({ symbol }) => symbol === getSymbolCurrentCrudeOil(),
    )?.lastPrice;

  const values = {
    silver: numerator / data?.silver?.results[0]?.bid,
    platinum: numerator / data?.platinum?.results[0]?.bid,
    palladium: numerator / data?.palladium?.results[0]?.bid,
    xau: numerator / quoteFinder("$XAU"),
    hui: numerator / quoteFinder("$HUI"),
    spx: numerator / quoteFinder("$SPX"),
    dowi: numerator / quoteFinder("$DOWI"),
    crudeOil: numerator / crudeOilFinder(),
  };

  return values;
}

// give ross headache to find the absolutely arbitrary ratio
// TODO: this whole query should prob be calculated on the server
// function findAbsolutelyArbitraryRatio(data?: GetGoldRatiosQuery) {
//   if (!data) return 0
//   return data?.crudeOil?.results?.filter((x) => x.name !== 'Crude Oil WTI')
// }

export type CalculatedRatios = ReturnType<typeof calculateRatios>;

const getSymbolCurrentCrudeOil = () => {
  const currentDate = dayjs();

  const nextMonthDate = currentDate.add(1, "month");

  // the letter corresponding to the month
  // refs: https://favish.atlassian.net/browse/KTCR-795?focusedCommentId=59437
  const symbols = "FGHJKMNQUVXZ";

  const nextActuallyMonth = symbols[nextMonthDate.month()];

  return `CL${nextActuallyMonth}${nextMonthDate.format("YY")}`;
};
