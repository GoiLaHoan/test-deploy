import marketsMiningTabLinks from "~/src/lib/marketsMiningTabLinks";
import colorize from "~/src/utils/colorize";
import React, { FC } from "react";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import TabLinks from "~/src/components/TabLinks/TabLinks";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

const MiningLanding: FC = () => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols:
          "NGD,AAU,DRD,GLDG,SA,GFI,KGC,BTG,THM,VGZ,LODE,AGI,EQX,NG,AUY,EGO,OR,KOR,GOLD,AEM",
      },
    }),
  );

  const { data: sectorData } = useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols: "-MIGL",
      },
    }),
  );

  return (
    <Layout title="Mining Stocks">
      <div className="grid gap-8 lg:grid-cols-layout-2 lg:px-0 sm:grid-cols-1 px-8">
        <div>
          <div className="mb-8">
            <TabLinks items={marketsMiningTabLinks} />
          </div>
          {sectorData?.GetBarchartQuotes?.results?.length && (
            <div className="mb-8 grid lg:grid-cols-2 gap-6 sm:grid-cols-1 sm:gap-0">
              <Barcharts
                symbol={sectorData?.GetBarchartQuotes?.results[0].symbol}
                title={sectorData?.GetBarchartQuotes?.results[0].name}
                href={`/markets/mining/${sectorData?.GetBarchartQuotes?.results[0].symbol}`}
              />
              {sectorData?.GetBarchartQuotes?.results.map((x, idx) => (
                <div key={idx}>
                  <h4 className="mb-2 text-base font-semibold">
                    Sector price today ({x.symbol})
                  </h4>
                  <ul className="divide-y">
                    <li className="flex justify-between p-2">
                      <p>High price todyy</p>
                      <span className="font-semibold">{x.high.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between p-2">
                      <p>Low price today</p>
                      <span className="font-semibold">{x.low.toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between p-2">
                      <p>Last price today</p>
                      <span className="font-semibold">
                        {x.lastPrice.toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between p-2">
                      <p>Net change</p>
                      <span className={colorize(x.netChange)}>
                        {x.netChange.toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between p-2">
                      <p>Percent Change</p>
                      <span className={colorize(x.percentChange)}>
                        {x.percentChange}%
                      </span>
                    </li>
                    <li className="flex justify-between p-2">
                      <p>Volume</p>
                      <span className="font-semibold">{x.volume}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          )}
          <QuotesTable
            title="Gold"
            section="stocks"
            data={data?.GetBarchartQuotes?.results}
          />
        </div>
        <div>
          <LatestNewsCell />
        </div>
      </div>
    </Layout>
  );
};

export default MiningLanding;
