import clsx from "clsx";
import type { FC } from "react";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";

export const MarketStatus: FC = () => {
  const { data } = useQuery(markets.marketStatus());
  const { status } = data?.GetMarketStatus || {};
  const isClosed = status === "CLOSED";

  return (
    <div className="block min-w-[150px]">
      <div
        className={clsx(
          "flex items-center uppercase my-1 px-2 rounded-sm",
          isClosed ? "bg-red-200" : "bg-green-200",
        )}
      >
        <p className="w-full text-center">
          Market is{" "}
          <span
            className={clsx(
              "font-semibold leading-1",
              isClosed ? "text-red-600" : "text-green-700",
            )}
          >
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};
