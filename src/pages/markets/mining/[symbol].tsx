import marketsMiningTabLinks from "~/src/lib/marketsMiningTabLinks";
import colorize from "~/src/utils/colorize";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import React, { FC } from "react";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import Layout from "~/src/components/Layout/Layout";
import PageLayoutTwoColumns from "~/src/components/PageLayoutTwoColumns/PageLayoutTwoColumns";
import QuotesTable from "~/src/components/QuotesTable/QuotesTable";
import TabLinks from "~/src/components/TabLinks/TabLinks";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { markets } from "~/src/lib/markets-factory.lib";
import { Barcharts } from "~/src/features/bar-charts/barcharts";

const allMiningStocks = [
  {
    name: "Gold",
    sectorSymbol: "-MIGL",
    symbols:
      "NGD,AAU,DRD,GLDG,SA,GFI,KGC,BTG,THM,VGZ,LODE,AGI,EQX,NG,AUY,EGO,OR,KOR,GOLD,AEM",
  },
  {
    name: "Silver",
    sectorSymbol: "-MISI",
    symbols: "FSM,HL,PAAS,MAG,ASM,AXU,EXK,AG,BVN",
  },
  {
    name: "Iron",
    sectorSymbol: "-MIIR",
    symbols: "VALE,MSB",
  },
  {
    name: "Base-Metals",
    sectorSymbol: "-MEPF",
    symbols: "HIHO,WOR,TKR,CIR,NNBR,CENX,MLI,AP,TRS,NWPX,KALU,EAF",
  },
  {
    name: "Non-Ferrous",
    sectorSymbol: "-MINF",
    symbols: "LEU,FX,SCCO,CDE,PZG,UUUU,ACH",
  },
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
  const sector = allMiningStocks.find(
    (x) => x.sectorSymbol === ctx?.query?.symbol,
  );

  const { dehydratedState } = await ssrQueries({
    ctxRes: ctx.res,
    queries: [
      markets.barchartsQuotes({
        variables: {
          timestamp: currentTimestamp(),
          symbols: sector.symbols,
        },
      }),
      markets.barchartsQuotes({
        variables: {
          timestamp: currentTimestamp(),
          symbols: sector.sectorSymbol,
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
      name: sector.name,
      symbol: sector.sectorSymbol,
      symbols: sector.symbols,
    },
  };
};

const MarketsMiningSymbol: FC<{
  name: string;
  symbol: string;
  symbols: string;
}> = ({ name, symbol, symbols }) => {
  const { data } = useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols,
      },
    }),
  );
  const { data: sectorData } = useQuery(
    markets.barchartsQuotes({
      variables: {
        timestamp: currentTimestamp(),
        symbols: symbol,
      },
    }),
  );

  return (
    <Layout title="Mining Stocks">
      <PageLayoutTwoColumns>
        <main>
          <div className="mb-8">
            <TabLinks items={marketsMiningTabLinks} />
          </div>
          <div>
            {sectorData?.GetBarchartQuotes?.results.length && (
              <div className="mb-8 grid lg:grid-cols-2 lg:gap-6 sm:grid-cols-1 sm:gap-0">
                <Barcharts
                  symbol={sectorData?.GetBarchartQuotes?.results[0].symbol}
                  title={sectorData?.GetBarchartQuotes?.results[0].name}
                  href={`/markets/mining/${sectorData?.GetBarchartQuotes?.results[0].symbol}`}
                />
                {sectorData?.GetBarchartQuotes?.results.map(
                  (x, idx: number) => (
                    <div key={idx}>
                      <h4 className="mb-2 text-base font-semibold">
                        Sector price today ({x.symbol})
                      </h4>
                      <ul className="divide-y">
                        <li className="flex justify-between p-2">
                          <p>High price today</p>
                          <span className="font-semibold">{x.high}</span>
                        </li>
                        <li className="flex justify-between p-2">
                          <p>Low price today</p>
                          <span className="font-semibold">{x.low}</span>
                        </li>
                        <li className="flex justify-between p-2">
                          <p>Last price today</p>
                          <span className="font-semibold">{x.lastPrice}</span>
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
                  ),
                )}
              </div>
            )}
          </div>
          <QuotesTable
            title={name}
            section="stocks"
            data={data?.GetBarchartQuotes?.results}
          />
        </main>
        <aside>
          <LatestNewsCell />
        </aside>
      </PageLayoutTwoColumns>
    </Layout>
  );
};

export default MarketsMiningSymbol;
