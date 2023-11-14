import Link from "next/link";
import { FC } from "react";

import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";

import Table from "~/src/components/Table/Table";

import dates from "~/src/utils/dates";
import styles from "./QuotesTable.module.scss";
import currency from "currency.js";

interface Props {
  title: string;
  section: "indices" | "stocks" | "futures";
  data: any;
  showMore?: boolean;
}

const QuotesTable: FC<Props> = ({ data, section, title, showMore }) => {
  const colorize = (n: number) => {
    if (isNegative(n)) {
      return cs([styles.colorRed, styles.bold]);
    }
    return cs([styles.colorGreen, styles.bold]);
  };

  const symbolSanitizer = (symbol: string): string => {
    const splitter = symbol.split("");
    if (splitter.includes("$") || splitter.includes("^")) {
      return symbol.substring(1);
    }
    return symbol;
  };

  return (
    <Table title={title + " — " + dates.dayTime()}>
      <ul>
        <Titles />
        {!data && <Loading />}
        {data?.map((x, idx: number) => (
          <li
            className={idx % 2 ? styles.item : cs([styles.item, styles.altBg])}
            key={x.symbol}
          >
            <Link
              href={`/markets/${section}/[symbol]`}
              as={`/markets/${section}/${x.symbol}`}
            >
              <>
                <div className="hidden md:block lg:block">
                  <p className="font-semibold">{symbolSanitizer(x.symbol)}</p>
                </div>
                <p className="mt-1 text-xs">{x?.name || x?.symbolName}</p>
                <p className="font-semibold text-right">
                  {currency(x?.lastPrice).format()}
                </p>
                <div className="hidden md:block lg:block">
                  <p
                    className={cs([
                      colorize(x?.netChange || x?.priceNetChange),
                      "text-right",
                    ])}
                  >
                    {currency(x?.netChange).format() ??
                      currency(x?.priceNetChange).format()}
                    &nbsp;
                    {"("}
                    {x?.percentChange?.toFixed(2) ||
                      x?.pricePercentChange?.toFixed(2)}
                    &#37;{")"}
                  </p>
                </div>
              </>
            </Link>
          </li>
        ))}
        {showMore && (
          <li className={styles.itemMoreLink}>
            <div className="flex justify-center mx-auto flex-shrink-1 max-w-xs">
              <Link href={`/markets/${section}`} className="moreLink">
                More&nbsp;{section}&nbsp;+
              </Link>
            </div>
          </li>
        )}
      </ul>
    </Table>
  );
};

export default QuotesTable;

const Titles = () => (
  <li className={cs([styles.item, styles.titles])}>
    <p className="hidden md:block lg:block">Symbol</p>
    <p>Name</p>
    <p className="text-right">Last</p>
    <p className="hidden text-right md:block lg:block">Change</p>
  </li>
);

const Loading = () => (
  <>
    {[1, 2, 3, 4, 5].map((x) => (
      <li key={x} className={cs([styles.item, styles.loading])}>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p className="hidden md:block lg:block">-</p>
      </li>
    ))}
  </>
);
