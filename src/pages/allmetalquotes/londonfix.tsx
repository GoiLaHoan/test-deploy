import dayjs from "dayjs";
import type { FC } from "react";

import LondonFixPageCell from "~/src/components-metals/LondonFixPageCell/LondonFixPageCell";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { metals } from "~/src/lib/metals-factory.lib";

import { currentTimestamp } from "~/src/utils/current-timestamp";
import { roundTimestampFromArg } from "~/src/types/globals";

export const getServerSideProps = async () => {
  const { dehydratedState } = await ssrQueries({
    queries: [
      metals.londonFixDynamic({
        variables: {
          currency: "USD",
          startTime: roundTimestampFromArg(
            dayjs(currentTimestamp()).subtract(1, "week").unix(),
          ),
          endTime: currentTimestamp(),
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
    },
  };
};

const LondonFix: FC = () => <LondonFixPageCell />;

export default LondonFix;
