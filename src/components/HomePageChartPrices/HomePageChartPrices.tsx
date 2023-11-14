import type { FC } from "react";
import currency from "currency.js";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";

import isNegative from "~/src/utils/isNegative";
import { useChartJs } from "~/src/features/home-page/use-chart-js";

import clsx from "clsx";

const HomePageChartPrices: FC<{
  nowData: ReturnType<typeof useChartJs>["nowData"];
}> = ({ nowData }) => {
  const prices = nowData?.results?.[0];

  return (
    <div className="h-full flex-col">
      <div>
        <h6 className={clsx("text-xs text-black/40")}>BID</h6>
        <h3 className={clsx("font-bold text-xl")}>
          {currency(prices?.bid, { symbol: "" }).format()}
        </h3>
      </div>
      <div className="mt-1 justify-self-end">
        <h3
          className={clsx(
            isNegative(prices?.change) ? "text-red-500" : "text-green-600",
            "text-xs font-semibold",
            "flex items-center",
          )}
        >
          {isNegative(prices?.change) ? (
            <HiArrowNarrowDown />
          ) : (
            <HiArrowNarrowUp />
          )}
          {currency(prices?.change, { symbol: "" }).format()} (
          {prices?.changePercentage}%)
        </h3>
      </div>
    </div>
  );
};

export default HomePageChartPrices;
