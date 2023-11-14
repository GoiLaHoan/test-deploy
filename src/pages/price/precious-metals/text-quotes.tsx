import dayjs from "dayjs";

import type { FC } from "react";
import { metals } from "~/src/lib/metals-factory.lib";
import { currentTimestamp } from "~/src/utils/current-timestamp";
import Layout from "~/src/components/Layout/Layout";
import { AiOutlinePrinter } from "react-icons/ai";
import Head from "next/head";
import priceFormatter from "~/src/utils/priceFormatter";
import dates from "~/src/utils/dates";
import { ssrGetMarketStatus } from "~/src/utils/market-status.util";

export async function getServerSideProps() {
  const data = await metals
    .allMetalsQuote({
      variables: {
        currency: "USD",
        timestamp: Math.floor(Date.now() / 1000),
      },
    })
    .queryFn();

  const dataLDFix = await metals
    .londonFix({
      variables: {
        yesterday: Math.floor(dayjs().subtract(2, "day").unix() / 30) * 30,
        today: currentTimestamp(),
      },
    })
    .queryFn();

  const status = await ssrGetMarketStatus();

  const timeCreateFile = dates.timeNow("h:mm:ss A EST on ddd MMMM D YYYY");

  return {
    props: {
      metalData: data,
      londonData: dataLDFix,
      marketStatus: status,
      timeCreateFile,
    },
  };
}

const TextQuotes: FC<any> = ({
  metalData,
  londonData,
  marketStatus,
  timeCreateFile,
}) => {
  const handlePrint = () => {
    if (window.print) {
      window.print();
    }
  };

  // yes. this is indeed kitco's doing. data kings.
  return (
    <Layout title="Text Only Market Page">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .space-mono-font {
            font-family: 'Space Mono', monospace !important;
          }
      `}</style>
      </Head>
      <main className="relative space-mono-font w-full xl:w-[767px] px-[20px] xl:px-0 page-print">
        <a
          className="text-kitco-black text-center inline-block absolute right-[20px] xl:right-[-150px] no-print"
          onClick={handlePrint}
        >
          <AiOutlinePrinter size={40} />
          Print
        </a>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold pb-1 mr-[45px]">
            KITCO Metals Inc.
          </h1>
          <h2 className="text-xl md:text-2xl pb-8 mr-[45px]">
            Text Only Precious Metals Quotes
          </h2>
          <h3 className="text-xl">Spot Price</h3>
          <h4 className="text-xs md:text-sm tracking-tighter md:tracking-normal">
            <span className="uppercase mr-2">{marketStatus?.statusString}</span>
            <span>{marketStatus?.timeToNextStatusString}</span>
          </h4>
          <NYSpot metalData={metalData} updatedAt={timeCreateFile} />
          <LDFix londonData={londonData} timeCreateFile={timeCreateFile} />
          <div className="pt-10">
            <img
              src="/image-text-quotes.png"
              className="w-full md:w-[430px] banner-print"
              alt="Text Only Market Page"
            />
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TextQuotes;

const NYSpot = ({ metalData, updatedAt }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide scrolling-table-size">
      <div className="mt-8 min-w-[19cm]">
        <div className="py-2 border-t border-b border-gray-500 border-dashed grid grid-cols-7">
          <span>Metals</span>
          <span className="text-right">Bid</span>
          <span className="text-right">Ask</span>
          <span className="text-right">Change ($)</span>
          <span className="text-right">Change (%)</span>
          <span className="text-right">High</span>
          <span className="text-right">Low</span>
        </div>
        {Object.entries(metalData).map((x: any, idx) => (
          <div key={idx} className="my-2 grid grid-cols-7">
            <span className="capitalize">{x[0]}</span>
            <span className="text-right">
              {priceFormatter(x[1].results[0].bid)}
            </span>
            <span className="text-right">
              {priceFormatter(x[1]?.results[0].ask)}
            </span>
            <span className="text-right">
              {priceFormatter(x[1]?.results[0].change)}
            </span>
            <span className="text-right">
              {priceFormatter(x[1]?.results[0].changePercentage)}%
            </span>
            <span className="text-right">
              {priceFormatter(x[1]?.results[0].high)}
            </span>
            <span className="text-right">
              {priceFormatter(x[1]?.results[0].low)}
            </span>
          </div>
        ))}
        <div className="py-2 border-t border-b border-gray-500 border-dashed">
          <span>Last Update on {updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

const LDFix = ({ londonData, timeCreateFile }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide scrolling-table-size">
      <div className="mt-10 md:mt-16 min-w-[19cm]">
        <h3 className="text-xl mb-8">London Fix</h3>
        <div className="pt-2 border-t border-gray-500 border-dashed grid grid-cols-layout-5 gap-4">
          <span>&nbsp;</span>
          <span className="text-center">GOLD</span>
          <span className="text-center">SILVER</span>
          <span className="text-center">PLATINUM</span>
          <span className="text-center">PALLADIUM</span>
        </div>
        <div className="pb-2 border-b border-gray-500 border-dashed grid grid-cols-layout-5 gap-4">
          <span className="text-center">Date</span>
          <div className="grid grid-cols-2">
            <span className="text-center">AM</span>
            <span className="text-center">PM</span>
          </div>
          <span className="text-center">-</span>
          <div className="grid grid-cols-2">
            <span className="text-center">AM</span>
            <span className="text-center">PM</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-center">AM</span>
            <span className="text-center">PM</span>
          </div>
        </div>
        {londonData?.londonFixUSD?.results.map((x: any, idx) => (
          <div key={idx} className="py-1 grid grid-cols-layout-5 gap-4">
            <span className="text-center">
              {dayjs.unix(x?.timestamp).format("MMM DD, YYYY")}
            </span>
            <div className="grid grid-cols-2 gap-4">
              <span className="text-center">{priceFormatter(x?.goldAM)}</span>
              <span className="text-center">{priceFormatter(x?.goldPM)}</span>
            </div>
            <span className="text-center">{priceFormatter(x?.silver, 4)}</span>
            <div className="grid grid-cols-2 gap-4">
              <span className="text-center">
                {priceFormatter(x?.platinumAM)}
              </span>
              <span className="text-center">
                {priceFormatter(x?.platinumPM)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <span className="text-center">
                {priceFormatter(x?.palladiumAM)}
              </span>
              <span className="text-center">
                {priceFormatter(x?.palladiumPM)}
              </span>
            </div>
          </div>
        ))}
        <div className="pt-10 border-t border-gray-500 border-dashed">
          <span>File created at {timeCreateFile}</span>
        </div>
      </div>
    </div>
  );
};
