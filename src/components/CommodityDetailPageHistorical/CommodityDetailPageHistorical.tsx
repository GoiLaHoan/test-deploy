import colorize from "~/src/utils/colorize";
import { pf } from "~/src/utils/priceFormatter";
import { FC } from "react";
import { MetalMonthAnnualQuery } from "~/src/generated";

const CommodityDetailPageHistorical: FC<{ data: MetalMonthAnnualQuery }> = ({
  data,
}) => {
  const itemClasses = "flex justify-between py-1 border-b";

  if (!data) {
    return <div></div>;
  }

  const { thirtyDay, sixtyDay, oneYear, fiveYear } = data?.GetHistoricalPoints;

  return (
    <div className="border rounded-sm p-4">
      <h3 className="text-lg font-bold capitalize">
        {"Silver"} Historical Performance
      </h3>
      <ul>
        <li className={itemClasses}>
          <span>30 Day Change</span>
          <div>
            <span className={colorize(thirtyDay?.change)}>
              {pf(thirtyDay?.change)} ({thirtyDay?.changePercentage}%)
            </span>
          </div>
        </li>
        <li className={itemClasses}>
          <span>Sixty Day Change</span>
          <div>
            <span className={colorize(sixtyDay?.change)}>
              {pf(sixtyDay?.change)} ({sixtyDay?.changePercentage}%)
            </span>
          </div>
        </li>
        <li className={itemClasses}>
          <span>One Year Change</span>
          <div>
            <span className={colorize(oneYear?.change)}>
              {pf(oneYear?.change)} ({oneYear?.changePercentage}%)
            </span>
          </div>
        </li>
        <li className={itemClasses + "border-b-0"}>
          <span>Five Year Change</span>
          <div>
            <span className={colorize(fiveYear?.change)}>
              {pf(fiveYear?.change)} ({fiveYear?.changePercentage}%)
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CommodityDetailPageHistorical;
