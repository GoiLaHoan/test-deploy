import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FC, useState } from "react";

import CommodityHistory from "~/src/components/CommodityHistory/CommodityHistory";
import DateRanger from "~/src/components/DateRanger/DateRanger";
import Table from "~/src/components/Table/Table";
// import {Currency} from '~/src/utils/currencies'
//
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import styles from "./commodity-history.module.scss";

// TODO: fix naming

interface Props {
  symbol: string;
  name: string;
  // currency: Currency
}

interface TimeState {
  start: number;
  end: number;
}

dayjs.extend(relativeTime);
export const CommodityHistoryCell: FC<Props> = ({ name, symbol }) => {
  const [times, setTimes] = useState<TimeState>({
    end: Math.floor(Date.now() / 1000),
    start: dayjs().subtract(5, "day").unix(),
  });

  const { data } = useQuery(
    metals.metalHistory({
      variables: {
        currency: "USD",
        symbol,
        startTime: times.start,
        endTime: times.end,
        groupBy: "1d",
        limit: dayjs.unix(times.end).diff(dayjs.unix(times.start), "day"),
        offset: 0,
      },
    }),
  );

  function setStartDate(val: Date): void {
    setTimes((prev) => ({ ...prev, start: dayjs(val).unix() }));
  }
  function setEndDate(val: string): void {
    setTimes((prev) => ({ ...prev, end: dayjs(val).unix() }));
  }

  return (
    <Table title={`${name} History`}>
      <div className={styles.contain}>
        <h1 className="text-lg font-semibold sm:w-full sm:text-center">
          Select a date range
        </h1>

        <DateRanger
          first={times.end}
          second={times.start}
          setFirstDate={setEndDate}
          setSecondDate={setStartDate}
        />
      </div>
      <CommodityHistory data={data?.GetMetalHistory?.results} />
    </Table>
  );
};
