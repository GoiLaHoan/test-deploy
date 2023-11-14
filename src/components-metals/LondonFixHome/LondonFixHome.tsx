import type { LondonFixQuery } from "~/src/generated";

import BlockShell from "~/src/components/BlockShell/BlockShell";
import Link from "next/link";
import { FC } from "react";

function classAltenator(idx: number): string {
  if (idx % 2) {
    return "grid grid-cols-3 p-2 bg-[#f5f5f5]";
  }
  return "grid grid-cols-3 p-2";
}

const LondonFixHome: FC<{ data: LondonFixQuery }> = ({ data }) => {
  return (
    <BlockShell title="London Fix Gold">
      <div className="grid grid-cols-3 mx-2 py-2 border-b border-gray-300">
        <div className="text-gray-600">CURRENCY</div>
        <div className="text-right text-gray-600">AM</div>
        <div className="text-right text-gray-600">PM</div>
      </div>
      {!data && <Loaders />}
      {data &&
        Object.entries(data).map((x: any, idx) => (
          <div key={idx} className={classAltenator(idx)}>
            <div>
              {(idx === 0 && "USD") ||
                (idx === 1 && "EUR") ||
                (idx === 2 && "GBP")}
            </div>
            <div className="text-right font-semibold">
              {x[1]?.results[0]?.goldAM.toFixed(2) || "-"}
            </div>
            <div className="text-right font-semibold">
              {x[1]?.results[0]?.goldPM.toFixed(2) || "-"}
            </div>
          </div>
        ))}

      <div className="border-t border-gray-300 mx-2 pt-2 mb-2 flex justify-center">
        <Link
          className="text-center mx-auto font-semibold"
          href="/allmetalquotes/londonfix"
        >
          Historical London Fix
        </Link>
      </div>
    </BlockShell>
  );
};

export default LondonFixHome;

const howManyLoaders = [1, 2, 3];
const Loaders = () => (
  <>
    {howManyLoaders.map((x: number) => (
      <div className={classAltenator(x)} key={x}>
        <div>
          {(x === 0 && "USD") || (x === 1 && "EUR") || (x === 2 && "GBP")}
        </div>
        <div className="text-right font-semibold">-</div>
        <div className="text-right font-semibold">-</div>
      </div>
    ))}
  </>
);
