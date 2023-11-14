import { createContext, FC, useContext, useEffect, useState } from "react";

const TimestampCtx = createContext(null);

interface Props {
  timestamp: number;
  children: any;
}

enum Timescales {
  ONE_MIN = "1m",
  THREE_MIN = "3m",
  FIVE_MIN = "5m",
  FIFTEEN_MIN = "15m",
  THIRTY_MIN = "30m",
  ONE_HOUR = "1h",
  ONE_DAY = "1d",
  SEVEN_DAY = "7d",
  THIRTY_DAY = "30d",
  ONE_YEAR = "365d",
}

const scaleToSeconds = {
  ONE_MIN: 60,
  THREE_MIN: 180,
  FIVE_MIN: 300,
  FIFTEEN_MIN: 900,
  THIRTY_MIN: 1800,
  ONE_HOUR: 3600,
  ONE_DAY: 86400,
  SEVEN_DAY: 604800,
  THIRTY_DAY: 2592000,
  ONE_YEAR: 31536000,
} as const;

type ScaleToSeconds = typeof scaleToSeconds;

function roundDownTimestamp(
  toSeconds: ScaleToSeconds[keyof ScaleToSeconds],
): number {
  return Math.floor(Math.floor(Date.now() / 1000) / toSeconds) * toSeconds;
}

export function produceRoundedDownStamp(scale: Timescales): number {
  switch (scale) {
    case Timescales.ONE_MIN:
      return roundDownTimestamp(scaleToSeconds.ONE_MIN);
    case Timescales.THREE_MIN:
      return roundDownTimestamp(scaleToSeconds.THREE_MIN);
    case Timescales.FIVE_MIN:
      return roundDownTimestamp(scaleToSeconds.FIVE_MIN);
    case Timescales.FIFTEEN_MIN:
      return roundDownTimestamp(scaleToSeconds.FIFTEEN_MIN);
    case Timescales.THIRTY_MIN:
      return roundDownTimestamp(scaleToSeconds.THIRTY_MIN);
    case Timescales.ONE_DAY:
      return roundDownTimestamp(scaleToSeconds.ONE_DAY);
    case Timescales.SEVEN_DAY:
      return roundDownTimestamp(scaleToSeconds.SEVEN_DAY);
    case Timescales.THIRTY_DAY:
      return roundDownTimestamp(scaleToSeconds.THIRTY_DAY);
    case Timescales.ONE_YEAR:
      return roundDownTimestamp(scaleToSeconds.ONE_YEAR);
    default:
      return roundDownTimestamp(scaleToSeconds.ONE_MIN);
  }
}

const TimestampProvider: FC<Props> = ({ timestamp, children }) => {
  return (
    <TimestampCtx.Provider value={{ timestamp }}>
      {children}
    </TimestampCtx.Provider>
  );
};

function useTimestampCtx(scale?: Timescales): {
  /** A rounded down timestamp based on the input scale **/
  timestamp: number;
  /** 5m, 1h, 1d, etc.. **/
  timescale: Timescales;
  /** timescale setter **/
  setTimescale: (scale: Timescales) => void;
} {
  const ctx = useContext(TimestampCtx);
  const initialStamp = ctx?.timestamp || produceRoundedDownStamp(scale);
  const [timescale, setTimescale] = useState<Timescales>(scale);
  const [timestamp] = useState<number>(initialStamp);

  // useEffect(() => {
  //   const autoUpdateTimestamp = setInterval(() => {
  //     setTimestamp(roundTimestamp())
  //   }, 1000)
  //
  //   return () => window.clearInterval(autoUpdateTimestamp)
  // }, [timescale, timestamp, ctx])

  return { timestamp, timescale, setTimescale };
}

function roundDownStartTime(
  toSeconds: ScaleToSeconds[keyof ScaleToSeconds],
): number {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const startOfDayTimestamp = currentDate.getTime() / 1000;

  return Math.floor(startOfDayTimestamp / toSeconds) * toSeconds - toSeconds;
}

export function produceRoundedDownStartTime(scale: Timescales): number {
  switch (scale) {
    case Timescales.ONE_MIN:
      return roundDownStartTime(scaleToSeconds.ONE_MIN);
    case Timescales.THREE_MIN:
      return roundDownStartTime(scaleToSeconds.THREE_MIN);
    case Timescales.FIVE_MIN:
      return roundDownStartTime(scaleToSeconds.FIVE_MIN);
    case Timescales.FIFTEEN_MIN:
      return roundDownStartTime(scaleToSeconds.FIFTEEN_MIN);
    case Timescales.THIRTY_MIN:
      return roundDownStartTime(scaleToSeconds.THIRTY_MIN);
    case Timescales.ONE_HOUR:
      return roundDownStartTime(scaleToSeconds.ONE_HOUR);
    case Timescales.ONE_DAY:
      // @ts-ignore TODO: fix this
      return roundDownStartTime(scaleToSeconds.ONE_DAY * 5);
    case Timescales.SEVEN_DAY:
      return roundDownStartTime(scaleToSeconds.SEVEN_DAY);
    case Timescales.THIRTY_DAY:
      return roundDownStartTime(scaleToSeconds.THIRTY_DAY);
    case Timescales.ONE_YEAR:
      return roundDownStartTime(scaleToSeconds.ONE_YEAR);
    default:
      return roundDownStartTime(scaleToSeconds.ONE_MIN);
  }
}

function useTimestampGoldChart(scale?: Timescales): {
  /** A rounded down timestamp based on the input scale **/
  timestamp: number;
  /** 5m, 1h, 1d, etc.. **/
  timescale: Timescales;
  /** timescale setter **/
  setTimescale: (scale: Timescales) => void;
} {
  const ctx = useContext(TimestampCtx);
  const initialStamp = ctx?.timestamp || produceRoundedDownStartTime(scale);
  const [timescale, setTimescale] = useState<Timescales>(scale);
  const [timestamp, setTimeStamp] = useState<number>(initialStamp);

  useEffect(() => {
    setTimeStamp(initialStamp);
  }, [initialStamp]);

  return { timestamp, timescale, setTimescale };
}

export {
  Timescales,
  TimestampProvider,
  useTimestampCtx,
  useTimestampGoldChart,
};
