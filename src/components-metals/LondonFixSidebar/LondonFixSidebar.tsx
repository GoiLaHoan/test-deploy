import dayjs from "dayjs";

import { currentTimestamp } from "~/src/utils/current-timestamp";
import LondonFixHome from "~/src/components-metals/LondonFixHome/LondonFixHome";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

export function LondonFixSidebar({
  ssrTimestamp,
}: {
  display?: "sidebar";
  ssrTimestamp?: number;
}) {
  const { data } = useQuery(
    metals.londonFix({
      variables: {
        yesterday:
          Math.floor(
            dayjs().subtract(1, "day").minute(0).hour(0).second(0).unix() / 30,
          ) * 30,
        today: ssrTimestamp ?? currentTimestamp(),
      },
    }),
  );

  return <LondonFixHome data={data} />;
}
