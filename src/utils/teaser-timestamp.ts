import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isToday);
const EST = "America/New_York";

export function teaserTimestamp(isoOrUnixStamp: string | number, fmt?: string) {
  if (typeof isoOrUnixStamp === "number") {
    const unixToDayjs = dayjs.unix(isoOrUnixStamp);
    if (unixToDayjs.isToday()) {
      return unixToDayjs.tz(EST).fromNow();
    }
    return unixToDayjs.tz(EST).format(fmt ?? "MMM DD, YYYY - h:mm A");
  }

  const isoToDayJs = dayjs(isoOrUnixStamp);
  if (isoToDayJs.isToday()) {
    return isoToDayJs.tz(EST).fromNow();
  }
  return isoToDayJs.tz(EST).format(fmt ?? "MMM DD, YYYY - h:mm A");
}
