import Link from "next/link";

import colorize from "~/src/utils/colorize";
import cs from "~/src/utils/cs";

import Table from "~/src/components/Table/Table";

import dates from "~/src/utils/dates";
import { BarchartQuote } from "~/src/generated";
import styles from "./FutureForexTable.module.scss";

interface Props {
  title: string;
  data: Array<BarchartQuote | any>;
  showMore?: boolean;
}

const FutureForexTable = ({ data, title, showMore = true }: Props) => {
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

  const itemStyles = (idx: number): string => {
    if (idx % 2) {
      return styles.item;
    }
    return cs([styles.item, styles.altBg]);
  };

  return (
    <Table title={title + " — " + dates.dayTime()}>
      <ul>
        <li className={cs([styles.item, styles.titles])}>
          <p className="hidden md:block lg:block">Symbol</p>
          <p>Name</p>
          <p className="text-right">Last</p>
          <p className="text-right">Change</p>
        </li>
        {data?.length < 1 ? (
          <Loading />
        ) : (
          <>
            {data?.map((x, idx) => (
              <li className={itemStyles(idx)} key={x.symbol}>
                <Link
                  href="/markets/futures/[symbol]"
                  as={`/markets/futures/${x.symbol}_${x?.category}_${x?.exchange}`}
                >
                  <>
                    <div className="hidden md:block lg:block">
                      <p className="font-medium">
                        {symbolSanitizer(x?.symbol)}
                      </p>
                    </div>
                    <p className="text-xs mt-1">{x?.name}</p>
                    <p className="font-medium text-right">
                      {format(x.lastPrice)}
                    </p>
                    <p
                      className={cs([colorize(x.percentChange), "text-right"])}
                    >
                      {x.percentChange}&#37;
                    </p>{" "}
                  </>
                </Link>
              </li>
            ))}
          </>
        )}
        {showMore && (
          <li className={styles.itemMoreLink}>
            <div className="flex justify-center mx-auto flex-shrink-1 max-w-xs">
              <Link className="moreLink" href={`/markets/futures`}>
                More&nbsp;futures&nbsp;+
              </Link>
            </div>
          </li>
        )}
      </ul>
    </Table>
  );
};

export default FutureForexTable;

const Loading = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((x) => (
        <li key={x} className={cs([styles.item, styles.loading])}>
          <p className="hidden md:block lg:block">-</p>
          <p>-</p>
          <p>-</p>
          <p>-</p>
        </li>
      ))}
    </>
  );
};
