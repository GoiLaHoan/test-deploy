import type { FC } from "react";
import type { AllMetalsQuoteQuery } from "~/src/generated";

import BlockHeader from "~/src/components/BlockHeader/BlockHeader";
import colorize from "~/src/utils/colorize";
import cs from "~/src/utils/cs";
import { pf } from "~/src/utils/priceFormatter";
import Link from "next/link";
import { useRouter } from "next/router";

const Item = ({ name, bid, change, percentage, currentCommodityName }) => {
  if (currentCommodityName === name) {
    return <div />;
  }
  return (
    <div className="border-b border-gray-100 mt-2 pb-2">
      <Link
        className="text-gray-800"
        as={`/charts/${name}`}
        href="/charts/[alias]"
      >
        <>
          <p className="text-gray-600 uppercase">{name}</p>
          <div className="flex justify-between">
            <h5 className="mr-2 text-lg font-semibold">{bid}</h5>
            <p className={cs([colorize(change), "text-lg font-semibold"])}>
              <span>{change}</span>
              <span>({percentage}%)</span>
            </p>
          </div>
        </>
      </Link>
    </div>
  );
};

// This component is used on commodity detail page i.e [commodity].tsx
const RelatedMetals: FC<{
  data: AllMetalsQuoteQuery;
}> = ({ data }) => {
  const router = useRouter();

  return (
    <div>
      <BlockHeader title="Precious Metals" />
      <div className="p-6 border border-gray-300">
        {data &&
          Object.entries(data).map((x: any) => (
            <Item
              name={x[0]}
              bid={pf(x[1].results[0].bid)}
              change={x[1].results[0].change.toFixed(2)}
              percentage={x[1].results[0].changePercentage}
              currentCommodityName={router?.query?.commodity}
              key={x[1]}
            />
          ))}
      </div>
    </div>
  );
};

export default RelatedMetals;
