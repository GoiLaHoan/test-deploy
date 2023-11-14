import type { ShanghaiFixQuery } from "~/src/generated";
import type { FC } from "react";
import React from "react";

import Table from "~/src/components/Table/Table";
import dayjs from "dayjs";
import { CurrencySelectCNY } from "~/src/components/CurrencySelect/CurrencySelect";
import cs from "~/src/utils/cs";
import styles from "./ShanghaiLatestPrice.module.scss";

interface Props {
  data: ShanghaiFixQuery;
  isLoading: boolean;
}

const ColumnTitles = () => (
  <div className="px-2 py-1 grid grid-cols-3 border-b border-gray-200">
    <h4>DATE</h4>
    <h4>AM</h4>
    <h4>PM</h4>
  </div>
);

const Values = ({ timestamp, am, pm, idx, isLoading }) => (
  <div
    className={cs([
      `py-1 px-2 border-b border-gray-200 grid grid-cols-3 items-center ${
        !(idx % 2) && "bg-alt-row"
      }`,
      !isLoading ? "undefined" : "opacity-50",
    ])}
  >
    <h4 className="text-gray-600 lg:text-lg sm:text-sm">
      {timestamp ? dayjs.unix(timestamp).format("MMM DD, YYYY") : ""}
    </h4>
    <h3 className="text-gray-800 lg:text-lg sm:text-sm">{am?.toFixed(2)}</h3>
    <h3 className="text-gray-800 lg:text-lg sm:text-sm">{pm?.toFixed(2)}</h3>
  </div>
);

const ShanghaiLatestPrice: FC<Props> = ({ data, isLoading }) => {
  const results = data?.GetShanghaiFix?.results;

  return (
    <div>
      <div className="flex justify-end items-center mb-2">
        <CurrencySelectCNY classNamesListbox={styles.listbox} />
      </div>
      <Table title="Shanghai Fix Latest Price">
        <ColumnTitles />
        <Values
          timestamp={results?.[0]?.timestamp}
          am={results?.[0]?.am}
          pm={results?.[0]?.pm}
          idx={0}
          isLoading={isLoading}
        />
      </Table>
      <div className="mt-10"></div>
      <Table title="Shanghai Fix Historical Prices">
        <ColumnTitles />
        {data?.GetShanghaiFix?.results
          .slice(1, data.GetShanghaiFix?.results?.length)
          .map(({ timestamp, am, pm }, idx: number) => (
            <Values
              timestamp={timestamp}
              am={am}
              pm={pm}
              key={idx}
              idx={idx}
              isLoading={isLoading}
            />
          ))}
      </Table>
    </div>
  );
};

export default ShanghaiLatestPrice;
