import Link from "next/link";
import React, { FC } from "react";

import {
  CurrencySelect,
  useCurrencyReadOnlyAtom,
} from "../CurrencySelect/CurrencySelect";

import HomePageChartButtons from "~/src/components/HomePageChartButtons/HomePageChartButtons";
import NivoThumbChart from "~/src/components/NivoThumbChart/NivoThumbChart";
import { Timescales, useTimestampCtx } from "~/src/utils/ctxTimestamp";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import dayjs from "dayjs";
import { roundTimestampFromArg } from "~/src/types/globals";

import styles from "./metal-chart-card.module.scss";
import { useQuery } from "react-query";
import { metals } from "~/src/lib/metals-factory.lib";

interface Props {
  symbol: "AU" | "AG" | "PT" | "PD";
  href: string;
  name: string;
}

export const MetalChartCard: FC<Props> = ({ symbol, name, href }) => {
  const currency = useCurrencyReadOnlyAtom();
  const { timescale, setTimescale } = useTimestampCtx(Timescales.FIVE_MIN);

  const { data } = useQuery(
    metals.nivoChartData({
      variables: {
        symbol,
        currency: currency?.symbol ?? "USD",
        startTime: roundTimestampFromArg(dayjs().subtract(6, "month").unix()),
        endTime: currentTimestamp(),
        groupBy: timescale,
        limit: 20,
        offset: 0,
      },
      options: {
        refetchInterval: 30 * 1000,
        keepPreviousData: true,
      },
    }),
  );

  const formedData = data?.history?.results?.map(({ close, timestamp }) => {
    return {
      x: timestamp,
      y: close,
    };
  });

  return (
    <div className="border border-gray-300 rounded-lg pt-4">
      <div className="flex items-center justify-between mx-4">
        <Link href="/charts/[commodity]" as={`/charts/${name.toLowerCase()}`}>
          <>
            <h4 className="mr-4 text-2xl font-bold text-gray-700 capitalize">
              {name}
            </h4>
          </>
        </Link>
        <CurrencySelect classNamesListbox={styles.listbox} />
      </div>
      <div style={{ height: "300px" }}>
        <NivoThumbChart data={formedData} timescale={timescale} />
      </div>
      <HomePageChartButtons timescale={timescale} setTimescale={setTimescale} />
      <div className={styles.linkContainer}>
        <Link className={styles.viewLink} href="/charts/[commodity]" as={href}>
          + View {name}
        </Link>
      </div>
    </div>
  );
};
