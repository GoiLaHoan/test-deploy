import dayjs from "dayjs";

import { useCurrencyReadOnlyAtom } from "~/src/components/CurrencySelect/CurrencySelect";
import { roundTimestampFromArg } from "~/src/types/globals";

import LondonFixPage from "~/src/components-metals/LondonFixPage/LondonFixPage";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { FC } from "react";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

const LondonFixPageCell: FC = () => {
  const currency = useCurrencyReadOnlyAtom();

  const { data, isFetching } = useQuery(
    metals.londonFixDynamic({
      variables: {
        currency: currency.symbol ?? "USD",
        startTime: roundTimestampFromArg(
          dayjs(currentTimestamp()).subtract(1, "week").unix(),
        ),
        endTime: currentTimestamp(),
      },
      options: {
        keepPreviousData: true,
      },
    }),
  );

  return <LondonFixPage data={data} isLoading={isFetching} />;
};

export default LondonFixPageCell;
