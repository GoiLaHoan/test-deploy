import dates from "~/src/utils/dates";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useQuery } from "react-query";

import { GoldSilverPlatinumPalladiumHistoryQuery } from "~/src/generated";
import { metals } from "~/src/lib/metals-factory.lib";
import cs from "~/src/utils/cs";
import isOdd from "~/src/utils/isOdd";
import {
  TimeSelect,
  yearReadAtom,
} from "~/src/components/year-select/year-select.component";
import { useAtom } from "jotai";
import { useWeightAtomRead } from "~/src/components/WeightSelect/WeightSelect.component";
import { useCurrencyReadOnlyAtom } from "~/src/components/CurrencySelect/CurrencySelect";

export function MetalHistoryCell() {
  const currency = useCurrencyReadOnlyAtom();
  const [read] = useAtom(yearReadAtom);

  const { data, isFetching } = useQuery(
    metals.goldSilverPlatinumPalladiumHistory({
      variables: {
        currency: currency.symbol,
        startTime: read.all[read.selectedKey].startTime,
        endTime: read.all[read.selectedKey].endTime, // this needs to be 10am
        groupBy: "1d",
        limit: 365,
      },
      options: {
        keepPreviousData: true,
      },
    }),
  );
  return (
    <>
      <KitcoFixHistory isLoading={isFetching} data={data} />
    </>
  );
}

dayjs.extend(isoWeek);
function KitcoFixHistory({
  data,
  isLoading,
}: {
  isLoading: boolean;
  data: GoldSilverPlatinumPalladiumHistoryQuery;
}) {
  const weight = useWeightAtomRead();
  function isMonday(timestamp: number) {
    return dayjs.unix(timestamp).day() === 1;
  }

  // exclude saturdays and sundays
  function isSaturdayOrSunday(timestamp: number) {
    return (
      dayjs.unix(timestamp).day() === 0 || dayjs.unix(timestamp).day() === 6
    );
  }

  return (
    <>
      <section className="pt-10">
        <div className="grid grid-cols-5 ">
          <div
            className={cs([
              "flex justify-center items-center",
              "border border-t-0 border-ktc-date-gray",
              "font-semibold text-xl px-4",
            ])}
          >
            <TimeSelect />
          </div>
          {["Gold", "Silver", "Platinum", "Palladium"].map((x, idx) => (
            <div
              key={idx}
              className={cs([
                "border border-t-0 border-ktc-date-gray",
                "font-semibold text-xl flex items-center justify-center",
              ])}
            >
              <span>{x}</span>
            </div>
          ))}
        </div>

        <div
          className={cs([
            "grid grid-cols-5 text-lg",
            "h-[400px] overflow-y-scroll",
            !isLoading ? "undefined" : "opacity-50",
          ])}
        >
          <div className="col-span-2">
            {data?.gold?.results?.map((x, idx) =>
              isSaturdayOrSunday(x.ID) ? null : (
                <div
                  key={`gold:${x.ID}`}
                  className={cs([
                    "py-1",
                    "grid grid-cols-2 border-b border-ktc-date-gray",
                    isOdd(idx) ? "bg-ktc-date-gray/20" : "bg-transparent",
                    isMonday(x.ID) ? "border-b-8" : undefined,
                  ])}
                >
                  <div>
                    <time className="block text-sm w-[90px] mx-auto pt-1 text-ktc-desc-gray">
                      {dates.fmtUnix(x.ID, "MMM DD, YYYY")}
                    </time>
                  </div>
                  <div>
                    <span className="block mx-auto w-[70px]">
                      {weight.renderFn(x?.open)}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>

          <div>
            {data?.silver?.results?.map((x, idx) =>
              isSaturdayOrSunday(x.ID) ? null : (
                <DataCell
                  id={x.ID}
                  idx={idx}
                  key={`silver:${x.ID}`}
                  className="w-[50px]"
                >
                  {weight.renderFn(x.open)}
                </DataCell>
              ),
            )}
          </div>

          <div>
            {data?.platinum?.results?.map((x, idx) =>
              isSaturdayOrSunday(x.ID) ? null : (
                <DataCell id={x.ID} idx={idx} key={`platinum:${x.ID}`}>
                  {weight.renderFn(x.open)}
                </DataCell>
              ),
            )}
          </div>

          <div>
            {data?.palladium?.results?.map((x, idx) =>
              isSaturdayOrSunday(x.ID) ? null : (
                <DataCell id={x.ID} idx={idx} key={`palladium:${x.ID}`}>
                  {weight.renderFn(x.open)}
                </DataCell>
              ),
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function DataCell(props: {
  id: number;
  idx: number;
  className?: string;
  children: React.ReactNode;
}) {
  function isMonday(timestamp: number) {
    return dayjs.unix(timestamp).day() === 1;
  }

  return (
    <div
      className={cs([
        "py-1",
        "border-b border-ktc-date-gray",
        isOdd(props.idx) ? "bg-ktc-date-gray/20" : "bg-transparent",
        isMonday(props.id) ? "border-b-8" : undefined,
      ])}
    >
      <data
        className={cs([
          "mx-auto w-[70px] block",
          !props?.className ? undefined : props.className,
        ])}
      >
        {props.children || "-"}
      </data>
    </div>
  );
}
