import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(isToday);

export const articleDate = function (date: string) {
  let formatted: string = dayjs(date).format("MMM DD, YYYY - h:mm A");
  if (dayjs(date).isToday()) {
    formatted = dayjs(date).format("HH:mm");
  }
  return formatted;
};
