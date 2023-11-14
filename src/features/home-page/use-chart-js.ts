import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import { useEffect, useMemo, useState } from "react";
import { roundTimestampFromArg } from "~/src/types/globals";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.extend(utc);
dayjs.extend(timezone);

export type ScalesUnion = "5m" | "1h" | "1d";

// helpers
const zone = (date: dayjs.Dayjs) => dayjs.tz(date, "America/New_York");
const newDay = dayjs()
  .set("hour", 0)
  .set("minute", 0)
  .set("second", 0)
  .set("millisecond", 0);
const endDay = dayjs()
  .set("hour", 24)
  .set("minute", 0)
  .set("second", 0)
  .set("millisecond", 0);

function createRange(start: dayjs.Dayjs, end: dayjs.Dayjs, x: number) {
  const stamps = new Map();
  stamps.set("current", start);
  stamps.set("all", [start]);

  while (stamps.get("current").isBefore(end)) {
    const incrementStamp = stamps.get("current").add(x, "minute");
    stamps.set("current", incrementStamp);
    stamps.get("all").push(incrementStamp);
  }

  return stamps.get("all").map((x) => x.unix());
}

export function useChartJs(args: { symbol: string; currency: string }) {
  const [scale, setScales] = useState<ScalesUnion>("5m");
  // a range of unix stamps created by the scale above
  const [range, setRangeState] = useState<number[]>([]);

  const { data } = useQuery(
    metals.nivoChartData({
      variables: {
        ...args,
        startTime: range.length
          ? range[0]
          : roundTimestampFromArg(zone(newDay).unix()),
        endTime: range.length ? range[range.length - 1] : zone(endDay).unix(),
        groupBy: scale,
        limit: range.length || 100,
      },
      options: {
        refetchInterval: 30 * 1000,
        keepPreviousData: true,
      },
    }),
  );

  const setTimescaleFiveMin = () => {
    const startDate = zone(newDay);
    const endDate = zone(endDay);
    setRangeState(() => createRange(startDate, endDate, 5));
  };

  const setTimescaleOneHour = () => {
    const newStartDate = zone(newDay.subtract(4, "day"));
    const newEndDate = zone(endDay.add(3, "day"));
    setRangeState(() => createRange(newStartDate, newEndDate, 60));
  };

  const setTimescaleOneDay = () => {
    const newStartDate = zone(newDay.subtract(15, "day"));
    const newEndDate = zone(endDay.add(15, "day"));
    setRangeState(() => createRange(newStartDate, newEndDate, 60 * 24));
  };

  useEffect(() => {
    setTimescaleFiveMin();
  }, []);

  function setRange(scale: ScalesUnion) {
    // scale === "1d" ? setScales("1h") : setScales(scale);
    setScales(scale);
    switch (scale) {
      case "5m":
        setTimescaleFiveMin();
        break;
      case "1h":
        setTimescaleOneHour();
        break;
      case "1d":
        setTimescaleOneDay();
        break;
    }
  }

  const formedData = useMemo(() => {
    const labels = range.filter((_, idx) => idx !== 0);

    const historicals = data?.history?.results?.reverse();
    const vals = new Map();
    vals.set("all", []);

    range.forEach((_, idx) => {
      if (historicals?.[idx]) {
        vals.get("all").push(historicals?.[idx].close);
      } else {
        vals.get("all").push(null);
      }
    });
    return { labels, values: vals.get("all") };
  }, [data, range]);

  return { formedData, nowData: data?.now, scale, setRange };
}
