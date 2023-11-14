import Link from "next/link";
import { FC } from "react";

import cs from "~/src/utils/cs";
import isNegative from "~/src/utils/isNegative";
import { QuoteObj } from "~/src/types/index";
import styles from "./QuotesTableOG.module.scss";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

interface Props {
  section: "indices" | "stocks";
  data: QuoteObj[];
}

const QuotesTable: FC<Props> = ({ data, section }) => {
  const colorize = (n: number) => {
    if (isNegative(n)) {
      return cs([styles.colorRed, styles.bold]);
    }
    return cs([styles.colorGreen, styles.bold]);
  };

  const signValue = (value: number) => {
    const valueToFix = value.toFixed(2);

    if (isNegative(value)) {
      return valueToFix;
    }
    return `+` + valueToFix;
  };

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 2,
    });
    const formattedValue = formatter.format(value);
    const [currency, amount] = formattedValue.split(" ");

    return `${amount} ${currency}`;
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    };
    const outputString = date.toLocaleDateString("en-AU", options);

    return outputString;
  };

  const howManyLoaders = [1, 2, 3, 4, 5];

  return (
    <Table className={cs([styles.styleTable])}>
      <Thead className={styles.styleThead}>
        <Tr>
          <Th className="text-left w-[30%] py-[0.4em] pl-[0.6em]">Company</Th>
          <Th className="text-left w-[14%] py-[0.4em] pl-[0.6em]">Symbol</Th>
          <Th className="text-left w-[14%] py-[0.4em] pl-[0.6em]">Time(EST)</Th>
          <Th className="text-left w-[14%] py-[0.4em] pl-[0.6em]">Price</Th>
          <Th className="text-left w-[14%] py-[0.4em] pl-[0.6em]">Change $</Th>
          <Th className="text-left w-[14%] py-[0.4em] pl-[0.6em]">Change %</Th>
        </Tr>
      </Thead>
      <Tbody>
        {!data || data.length < 1
          ? howManyLoaders.map((x) => (
              <Tr key={x} className={cs([styles.item, styles.loading])}>
                <Td className="py-[0.4em] pl-[0.6em]">-</Td>
                <Td className="py-[0.4em] pl-[0.6em]">-</Td>
                <Td className="py-[0.4em] pl-[0.6em]">-</Td>
                <Td className="py-[0.4em] pl-[0.6em]">-</Td>
                <Td className="py-[0.4em] pl-[0.6em]">-</Td>
                <Td className="py-[0.4em] pl-[0.6em]">-</Td>
              </Tr>
            ))
          : data.map((x, idx) => (
              <Tr
                className={
                  idx % 2 ? styles.item : cs([styles.item, styles.isOdd])
                }
                key={x.symbol}
              >
                <Td className="py-[0.4em] pl-[0.6em] align-text-bottom">
                  <Link
                    href={`/markets/${section}/[symbol]`}
                    as={`/markets/${section}/${x.symbol}`}
                  >
                    {x.name}
                  </Link>
                </Td>
                <Td className="py-[0.4em] pl-[0.6em] align-text-bottom">
                  <Link
                    href={`/markets/${section}/[symbol]`}
                    as={`/markets/${section}/${x.symbol}`}
                  >
                    {x.symbol}
                  </Link>
                </Td>
                <Td className="py-[0.4em] pl-[0.6em] align-text-bottom">
                  {formatDate(x?.serverTimestamp)}
                </Td>
                <Td
                  className={cs([
                    styles.bold,
                    "py-[0.4em] pl-[0.6em] align-text-bottom",
                  ])}
                >
                  {formatCurrency(x.lastPrice)}
                </Td>
                <Td
                  className={cs([
                    colorize(x.netChange),
                    "py-[0.4em] pl-[0.6em] align-text-bottom",
                  ])}
                >
                  {signValue(x.netChange)}
                </Td>
                <Td
                  className={cs([
                    colorize(x.netChange),
                    "py-[0.4em] pl-[0.6em] align-text-bottom",
                  ])}
                >
                  {signValue(x.percentChange)}&#37;
                </Td>
              </Tr>
            ))}
      </Tbody>
    </Table>
  );
};

export default QuotesTable;
