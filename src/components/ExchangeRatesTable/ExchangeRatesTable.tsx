import type { FC } from "react";
import dayjs from "dayjs";

import colorize from "~/src/utils/colorize";
import cs from "~/src/utils/cs";
import { pf } from "~/src/utils/priceFormatter";
import Table from "../Table/Table";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";
import type { LiveSpotGoldRow } from "~/src/generated";
import styles from "./ExchangeRatesTable.module.scss";
import {
  Table as TableReponsive,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const ExchangeRatesTable: FC = () => {
  const { data } = useQuery(
    metals.exchangeRatesTable({
      options: {
        enabled: true,
      },
    }),
  );
  return (
    <Table title="Exchange Rates">
      <TableReponsive className={cs([styles.styleTable])}>
        <Thead className={styles.styleThead}>
          <Tr>
            <Th className="font-normal text-left w-[19.2%] py-[0.4em] pl-[0.25em]">
              Currencies
            </Th>
            <Th className="font-normal text-left w-[11.8%] py-[0.4em] pl-[0.25em]">
              NY Time
            </Th>
            <Th className="font-normal text-right w-[11.5%] py-[0.4em] pl-[0.25em]">
              X = 1 USD
            </Th>
            <Th className="font-normal text-right w-[11.5%] py-[0.4em] pl-[0.25em]">
              Change %
            </Th>
            <Th className="font-normal text-right w-[11.5%] py-[0.4em] pl-[0.25em]">
              X USD = 1
            </Th>
            <Th className="font-normal text-right w-[11.5%] py-[0.4em] pl-[0.25em]">
              Price / oz
            </Th>
            <Th className="font-normal text-right w-[11.5%] py-[0.4em] pl-[0.25em]">
              Change
            </Th>
            <Th className="font-normal text-right w-[11.5%] py-[0.4em] pl-[0.25em]">
              Change %
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.GetLiveSpotGoldTable?.Table?.length &&
            data?.GetLiveSpotGoldTable?.Table?.map(
              (x: LiveSpotGoldRow, idx: number) => {
                return (
                  <Tr key={idx} className={cs([styles.item, styles.loading])}>
                    <Td className="py-[0.25em] sm:py-0">
                      <div className={styles.name}>
                        <img
                          src={`/flags/${x.Currency}.png`}
                          className={styles.flag}
                        />
                        <h6>{x.Currency}</h6>
                      </div>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0">
                      <time dateTime={x?.Rate?.NYTime} className={styles.time}>
                        {x?.Rate?.NYTime
                          ? dayjs(x?.Rate?.NYTime).format("MM/DD - HH:mm:ss")
                          : "-"}
                      </time>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0 text-right">
                      <span>{x?.Rate.CurrencyToUsd?.toFixed(2)}</span>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0 text-right">
                      <span className={cs([colorize(x?.Rate.ChangePercent)])}>
                        {x?.Currency === "USD"
                          ? "-"
                          : x?.Rate?.ChangePercent?.toFixed(2) + "%"}{" "}
                      </span>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0 text-right">
                      <span className={cs([styles.lastItemMidColumn])}>
                        {pf(x?.Rate?.UsdToCurrency)}
                      </span>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0 text-right">
                      <span>{x?.Gold?.Price?.toFixed(2)}</span>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0 text-right">
                      <span className={cs([colorize(x?.Gold?.Change)])}>
                        {pf(x?.Gold?.Change)}
                      </span>
                    </Td>
                    <Td className="py-[0.25em] sm:py-0 text-right">
                      <span
                        className={cs([colorize(x?.Gold?.ChangePercent)])}
                        style={{ paddingRight: ".5em" }}
                      >
                        {x?.Gold?.ChangePercent?.toFixed(2)}
                        &#37;
                      </span>
                    </Td>
                  </Tr>
                );
              },
            )}
        </Tbody>
      </TableReponsive>
    </Table>
  );
};

export default ExchangeRatesTable;
