import Link from "next/link";

import {
  CurrencySelect,
  useCurrencyReadOnlyAtom,
} from "~/src/components/CurrencySelect/CurrencySelect";
import HomePageChartPrices from "~/src/components/HomePageChartPrices/HomePageChartPrices";
import {
  MetalSelect,
  useMetalReadOnlyAtom,
} from "~/src/components/MetalSelect/MetalSelect";
import Table from "~/src/components/Table/Table";

import { ScalesUnion, useChartJs } from "./use-chart-js";
import { CanvasChart } from "./home-chart";
import clsx from "clsx";

const HomePageChartCell = () => {
  const metal = useMetalReadOnlyAtom();
  const currency = useCurrencyReadOnlyAtom();

  const { formedData, nowData, scale, setRange } = useChartJs({
    symbol: metal?.symbol ?? "AU",
    currency: currency.symbol,
  });

  const buttonScales: Array<{ id: number; scale: ScalesUnion; label: string }> =
    [
      { id: 1, scale: "5m", label: "5 Minute" },
      { id: 2, scale: "1h", label: "1 Hour" },
      { id: 3, scale: "1d", label: "1 Day" },
    ];

  return (
    <Table title={`Live ${metal.name}`}>
      <div className="grid grid-cols-2 gap-4 py-1 mx-2 my-2">
        <HomePageChartPrices nowData={nowData} />
        <div className="flex flex-col justify-end items-end">
          <div className="w-full">
            <MetalSelect alignment="right" />
          </div>

          <div className="w-full mt-1">
            <CurrencySelect />
          </div>
        </div>
      </div>
      <div className="py-8">
        <CanvasChart data={formedData} scale={scale} />
      </div>
      <div className="flex justify-between items-center gap-2 px-2">
        {buttonScales.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setRange(x.scale)}
            className={clsx(
              "w-full py-1 text-xs",
              "bg-transparent border border-black/20 rounded-[4px]",
              scale === x.scale && "bg-[#f0b310] border-[#f0b310]",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>
      <div className="p-2 w-full">
        <Link
          href={`/charts/${metal.name.toLowerCase()}`}
          className={clsx(
            "block py-1 w-full text-center",
            "text-center text-white text-xs",
            "bg-[#0A4E8D] rounded-[4px]",
            "border border-[#0A4E8D]",
          )}
        >
          + View {metal?.name}
        </Link>
      </div>
    </Table>
  );
};

export default HomePageChartCell;
