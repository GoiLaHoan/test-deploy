import colorize from "~/src/utils/colorize";
import cs from "~/src/utils/cs";
import { pf } from "~/src/utils/priceFormatter";
import Link from "next/link";
import React, { FC } from "react";

import Table from "~/src/components/Table/Table";

interface DataTableProps {
  title: string;
  children: any;
}

export const DataTable: FC<DataTableProps> = ({ children, title }) => (
  <Table title={title}>
    <table className="table-auto w-full">{children}</table>
  </Table>
);

export const DataTitles: FC<{ titles: string[] }> = ({ titles }) => {
  return (
    <thead className="px-4">
      <tr>
        {titles.map((title: string, idx: number) => (
          <th
            key={idx}
            className={cs([
              idx >= 2 ? "text-right" : "text-left",
              idx === 0 && "pl-4",
              idx === titles.length - 1 && "pr-4",
              "px-2 py-2 uppercase text-gray-400 font-normal",
            ])}
          >
            {title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

function symbolSanitizer(symbol: string): string {
  const splitter = symbol.split("");
  if (splitter.includes("$") || splitter.includes("^")) {
    return symbol.substring(1);
  }
  return symbol;
}

interface DataItemProps {
  altBG: boolean;
  symbol: string;
  name: string;
  high: number;
  low: number;
  last: number;
  change: number;
  changePercent: number;
  volume: number;
  href: string;
}

export const DataItem: FC<DataItemProps> = (p) => {
  return (
    <tbody className={!p.altBG ? "bg-white" : "bg-alt-row"}>
      <Link className="table-row text-gray-900 text-xs" href={p.href}>
        <>
          <span className="pl-4 py-3 font-semibold table-cell">
            {symbolSanitizer(p.symbol)}
          </span>
          <span className="px-2 table-cell">{p.name}</span>
          <span className="px-2 text-right table-cell">{pf(p.high)}</span>
          <span className="px-2 text-right table-cell">{pf(p.low)}</span>
          <span className="px-2 text-right table-cell">{pf(p.last)}</span>
          <span
            className={cs([
              colorize(p.change),
              "px-2 text-right font-normal table-cell",
            ])}
          >
            {`${pf(p.change)} (${p.changePercent}%)`}
          </span>
          <span className="px-2 pr-4 text-right table-cell">{p.volume}</span>
        </>
      </Link>
    </tbody>
  );
};
