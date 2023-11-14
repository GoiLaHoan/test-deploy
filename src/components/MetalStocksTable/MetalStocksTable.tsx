import Link from "next/link";

import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";

import Table from "~/src/components/Table/Table";

import dates from "~/src/utils/dates";
import styles from "./MetalStocksTable.module.scss";

interface Props {
  title: string;
  data: any;
}

const Titles = () => (
  <li className={cs([styles.item, styles.titles])}>
    <p className="hidden md:block lg:block">Symbol</p>
    <p>Name</p>
    <p className="text-right">Last</p>
    <p className="hidden text-right md:block lg:block">Change</p>
  </li>
);

const MetalStocksTable = ({ data, title }: Props) => {
  const colorize = (n: number) => {
    if (isNegative(n)) {
      return cs([styles.colorRed, styles.bold]);
    }
    return cs([styles.colorGreen, styles.bold]);
  };

  const { format } = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const symbolSanitizer = (symbol: string): string => {
    const splitter = symbol.split("");
    if (splitter.includes("$") || splitter.includes("^")) {
      return symbol.substring(1);
    }
    return symbol;
  };

  const howManyLoaders = [1, 2, 3, 4, 5];

  function renderLoading() {
    return (
      <>
        {howManyLoaders.map((x) => (
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
  }

  return (
    <Table title={title + " — " + dates.dayTime()}>
      <ul>
        <Titles />
        {!data && renderLoading()}
        {data?.map((x, idx) => (
          <li
            className={
              !(idx % 2) ? styles.item : cs([styles.item, styles.altBg])
            }
            key={x.symbol}
          >
            <Link
              href={`/markets/stocks/[symbol]`}
              as={`/markets/stocks/${x.symbol}`}
            >
              <>
                <div className="hidden md:block lg:block">
                  <p className="font-semibold">{symbolSanitizer(x.symbol)}</p>
                </div>
                <p className="mt-1 text-xs">{x?.name || x?.symbolName}</p>
                <p className="font-semibold text-right">{format(x.last)}</p>
                <div className="hidden md:block lg:block">
                  <p className={cs([colorize(x.change), "text-right"])}>
                    {x?.change}
                    &nbsp;
                    {"("}
                    {x?.pctchange}
                    {")"}
                  </p>
                </div>
              </>
            </Link>
          </li>
        ))}
      </ul>
    </Table>
  );
};

export default MetalStocksTable;
