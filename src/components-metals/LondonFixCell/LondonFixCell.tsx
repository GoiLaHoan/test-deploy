import dayjs from "dayjs";

import { currentTimestamp } from "~/src/utils/current-timestamp";
import useScreenSize from "~/src/utils/useScreenSize";

import LondonFixGrid from "~/src/components-metals/LondonFixGrid/LondonFixGrid";
import LondonFixGridMobile from "~/src/components-metals/LondonFixGrid/LondonFixGridMobile";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

function LondonFixCell({ ssrTimestamp }: { ssrTimestamp?: number }) {
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

  const { isTablet, isMobile } = useScreenSize();

  if (isTablet || isMobile) {
    return <LondonFixGridMobile data={data} />;
  }

  return <LondonFixGrid data={data} />;
}

export default LondonFixCell;
