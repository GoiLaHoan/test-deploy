import dayjs from "dayjs";
import { useQuery } from "react-query";

import { currentTimestamp } from "~/src/utils/current-timestamp";
import { metals } from "~/src/lib/metals-factory.lib";

export function useLondonFixCurrencyData() {
  return useQuery(
    metals.londonFix({
      variables: {
        yesterday: Math.floor(dayjs().subtract(1, "day").unix() / 30) * 30,
        today: currentTimestamp(),
      },
    }),
  );
}
