import { useEffect, useState } from "react";

import isNegative from "~/src/utils/isNegative";

export type ChangeState = {
  change: string;
  percentage: string;
  isUp: boolean | null;
};

export type TGoldRangeHistory = {
  thirtyDay: ChangeState;
  sixMonths: ChangeState;
  oneYear: ChangeState;
  fiveYear: ChangeState;
};

function calculator(nowMid: number, whenMid: number) {
  const baseChange = nowMid - whenMid;
  const percent = (baseChange / whenMid) * 100;
  const change = isNegative(baseChange)
    ? -Math.abs(baseChange)
    : Math.abs(baseChange);

  return { change, percent };
}

const defaultState = {
  change: "",
  percentage: "",
  isUp: null,
};

function useGoldRangeHistory(
  data: any, // refactor to type MetalPointsInTime
): TGoldRangeHistory {
  const [thirtyDay, setThirtyDay] = useState(defaultState);
  const [sixMonths, setSixMonths] = useState(defaultState);
  const [oneYear, setOneYear] = useState(defaultState);
  const [fiveYear, setFiveYear] = useState(defaultState);

  function setter() {
    if (data) {
      const nowMid = data.now?.results[0]?.mid;
      const thirtyDayMid = data.thirtyday?.results[0]?.mid;
      const sixMonthMid = data.sixmonths?.results[0]?.mid;
      const oneYearMid = data.oneyear?.results[0]?.mid;

      const thirtyday = calculator(nowMid, thirtyDayMid);
      setThirtyDay((p) => ({
        ...p,
        change: thirtyday.change.toFixed(2),
        percentage: thirtyday.percent.toFixed(2),
        isUp: nowMid > thirtyDayMid,
      }));

      const sixmonths = calculator(nowMid, sixMonthMid);
      setSixMonths((p) => ({
        ...p,
        change: sixmonths.change.toFixed(2),
        percentage: sixmonths.percent.toFixed(2),
        isUp: nowMid > sixMonthMid,
      }));

      const oneyear = calculator(nowMid, oneYearMid);
      setOneYear({
        change: oneyear.change.toFixed(2),
        percentage: oneyear.percent.toFixed(2),
        isUp: nowMid > oneYearMid,
      });

      // TODO: Five year calc; currently the data doesn't even go far
      // enough back in time to fetch one year
      setFiveYear({ change: "-", percentage: "-", isUp: null });

      return;
    }
  }

  useEffect(() => {
    setter();
  }, [data]);

  return { thirtyDay, sixMonths, oneYear, fiveYear };
}

export default useGoldRangeHistory;
