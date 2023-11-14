// These functions are just a way to consistently produce dates

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export enum Timezones {
  NY = "America/New_York",
  UK = "Europe/London",
  IS = "Asia/Kolkata",
  HK = "Asia/Hong_Kong",
}

const EST = "America/New_York";

const day = () => {
  return dayjs().tz(EST).format("MMM DD, YYYY");
};

const dayTime = (date?: string) => {
  if (date) {
    return dayjs(date).tz(EST).format("MMM DD, YYYY h:mm A");
  }
  return dayjs().tz(EST).format("MMM DD, YYYY h:mm A");
};

const fmtUnix = (date: number, fmt?: string) => {
  return dayjs
    .unix(date)
    .tz(EST)
    .format(!fmt ? "MMM DD, YYYY" : fmt);
};

const yesterday = () => {
  return Math.floor(dayjs().subtract(1, "day").unix() / 15) * 15;
};

const timeNow = (fmt?: string) =>
  dayjs()
    .tz(EST)
    .format(!fmt ? "h:mm A" : fmt);

const timeThen = (then: string) => dayjs(then).tz(EST).format("h:mm A");
const timeThenZone = (stamp: number, zone: Timezones) =>
  dayjs.unix(stamp).tz(zone).format("h:mm A");

const unixNow = () => {
  return dayjs().unix();
};

const clock = (zone: Timezones, time?: number) => {
  const huh = dayjs.unix(time).tz(zone);
  return huh.format("h:mm A");
};

// DO NOT TOUCH
// DO NOT TOUCH EVER
// HOW THIS WORKS IS BEYOND ME
const tenAMunix = (timezone: Timezones): number => {
  const produceISO8601 = dayjs()
    .tz(timezone, false)
    .hour(10)
    .minute(0)
    .second(0)
    .format();

  return dayjs(produceISO8601).unix();
};

// used for startTime in historical queries to prevent ssr / client mismatch
const midnight = (): number => {
  return dayjs().tz(EST).hour(0).minute(0).second(0).unix();
};

export const seconds = (secs: number): number => secs * 1000;

const dates = {
  day,
  dayTime,
  clock,
  fmtUnix,
  tenAMunix,
  timeNow,
  timeThen,
  timeThenZone,
  unixNow,
  yesterday,
  midnight,
};

export default dates;
