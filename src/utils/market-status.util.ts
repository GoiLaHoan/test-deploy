import { useQuery } from "react-query";
import { GetMarketStatusQuery } from "~/src/generated";
import { markets } from "../lib/markets-factory.lib";

// LOL:
// https://stackoverflow.com/questions/36098913/convert-seconds-to-days-hours-minutes-and-seconds
function convertNextStatusToFormat(next: number | undefined) {
  const h = Math.floor((next % (3600 * 24)) / 3600);
  const m = Math.floor((next % 3600) / 60);

  const hDisplay = h > 0 ? h + (h == 1 ? " hr. " : " hrs. ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " min. " : " mins. ") : "";
  return hDisplay + mDisplay;
}

export function useGetMarketStatus() {
  const { data } = useQuery(markets.marketStatus());

  const gst = data?.GetMarketStatus;
  const statusString = `Market is ${gst?.status}`;
  const invert = gst?.status === "OPEN" ? "CLOSE" : "OPEN";
  const timeToNextStatusString = `Will ${invert} in ${convertNextStatusToFormat(
    gst?.next,
  )}`;

  return {
    data,
    statusString,
    timeToNextStatusString,
  };
}

export async function ssrGetMarketStatus() {
  const data: GetMarketStatusQuery = await markets.marketStatus().queryFn();

  const gst = data?.GetMarketStatus;
  const statusString = `Market is ${gst?.status}`;
  const invert = gst?.status === "OPEN" ? "CLOSE" : "OPEN";
  const timeToNextStatusString = `Will ${invert} in ${convertNextStatusToFormat(
    gst?.next,
  )}`;

  return {
    data,
    statusString,
    timeToNextStatusString,
  };
}
