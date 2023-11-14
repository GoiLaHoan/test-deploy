import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

// EASTERN STANDARD TIME
export const est = (stamp: string | number) => {
  return dayjs(stamp).tz("America/New_York");
};
