import Link from "next/link";

import cs from "~/src/utils/cs";
import dates from "~/src/utils/dates";
import isNegative from "~/src/utils/isNegative";
import { pf } from "~/src/utils/priceFormatter";

import Table from "~/src/components/Table/Table";

import styles from "./KitcoTable.module.scss";

interface Props {
  title: string;
  data: any;
}

const Titles = () => (
  <li className={cs([styles.item, styles.titles])}>
    <p className="md:block lg:block">Metal</p>
    <p className="text-right md:block lg:block">Bid</p>
    <p className="hidden text-right md:block lg:block">Ask</p>
    <p className="text-right md:block lg:block">Change</p>
    <p className="hidden text-right md:block lg:block">High</p>
    <p className="hidden text-right md:block lg:block">Low</p>
  </li>
);

const KitcoTable = ({ data, title }: Props) => {
  const colorize = (n: number) => {
    if (isNegative(n)) {
      return cs([styles.colorRed, styles.bold]);
    }
    return cs([styles.colorGreen, styles.bold]);
  };

  const howManyLoaders = [1, 2, 3, 4, 5];

  function renderLoading() {
    return (
      <>
        {howManyLoaders.map((x) => (
          <li key={x} className={cs([styles.item, styles.loading])}>
            <p className="text-left">-</p>
            <p>-</p>
            <p>-</p>
            <p className="hidden md:block lg:block">-</p>
            <p className="hidden md:block lg:block">-</p>
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
        {!data.length && renderLoading()}
        {data.map((x, idx: number) => (
          <li
            className={
              !(idx % 2) ? styles.item : cs([styles.item, styles.altBg])
            }
            key={x?.symbol}
          >
            <Link
              href={`/charts/[commodity]`}
              as={`/charts/${x?.name?.toLowerCase()}`}
            >
              <>
                <div className="md:block lg:block">
                  <p className="font-semibold">{x?.name}</p>
                </div>
                <p className="font-semibold text-right">
                  {pf(x?.results[0]?.bid)}
                </p>
                <p className="hidden font-semibold text-right md:block lg:block">
                  {pf(x?.results[0]?.ask)}
                </p>
                <div className="md:block lg:block">
                  <p
                    className={cs([
                      colorize(x?.results?.[0].change),
                      "text-right",
                    ])}
                  >
                    {x?.results[0].change.toFixed(2)}
                    &nbsp;
                    {"("}
                    {x?.results[0].changePercentage?.toFixed(2)}
                    &#37;{")"}
                  </p>
                </div>
                <p className="hidden font-semibold text-right md:block lg:block">
                  {pf(x?.results[0]?.high)}
                </p>
                <p className="hidden font-semibold text-right md:block lg:block">
                  {pf(x?.results[0]?.low)}
                </p>
              </>
            </Link>
          </li>
        ))}
      </ul>
    </Table>
  );
};

export default KitcoTable;
