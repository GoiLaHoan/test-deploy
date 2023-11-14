import React, { FC, useState } from "react";

import {
  ControlBar,
  MainPriceBlock,
  MainPriceBorder,
  MainPriceTitle,
  TitleBar,
  ZoneSwitcher,
} from "~/src/components-metals/KitcoFixPageBlocks/KitcoFixPageBlocks";
import { MetalHistoryCell } from "~/src/components-metals/MetalHistoryCell/MetalHistoryCell";
import Layout from "~/src/components/Layout/Layout";
import { Timezones } from "~/src/utils/dates";
import ShanghaiGold from "~/src/components-metals/ShanghaiGold/ShanghaiGold";
import MarketIndicesCell from "~/src/components-markets/MarketIndicesCell/MarketIndicesCell";
import LatestNewsCell from "~/src/components-news/LatestNewsCell/LatestNewsCell";
import { LondonFixSidebarGoldSilverPlatinumPalladium } from "~/src/components-metals/LondonFixCell/london-fix-sidebar-gold-plat-silver-palladium.component";

const KitcoFix: FC = () => {
  const [zone, setZone] = useState<Timezones>(Timezones.NY);

  const zoneHandler = (z: Timezones) => setZone(z);

  return (
    <Layout title="Kitco Gold and Precious Metals Fix">
      <main className="grid grid-cols-layout-2 gap-6">
        <div>
          <TitleBar />
          <ZoneSwitcher zone={zone} zoneHandler={zoneHandler} />
          <MainPriceBorder>
            <MainPriceTitle />
            <MainPriceBlock zone={zone} />
            <ControlBar zone={zone} />
          </MainPriceBorder>
          <MetalHistoryCell />
          <KitcoFixInfo />
        </div>
        <div className="flex flex-col gap-6">
          <LatestNewsCell />
          <LondonFixSidebarGoldSilverPlatinumPalladium />
          <ShanghaiGold />
          <MarketIndicesCell />
        </div>
      </main>
    </Layout>
  );
};

export default KitcoFix;

function KitcoFixInfo() {
  return (
    <div className="py-12">
      <header className="pb-6 pt-6 border-t-2 border-ktc-desc-gray flex items-center justify-between">
        <h3 className="uppercase text-2xl">
          About the kitco gold and precious metals fix
        </h3>
        <img
          src="/icons/kitco-circle-logo.svg"
          alt="Kitco Circle Logo"
          className="max-h-10"
        />
      </header>
      <div className="flex flex-col gap-4 text-base">
        <p>
          More than a century ago the first precious metals benchmarks were
          created. The fixing process involved a group of bankers sitting in a
          room haggling over the price of gold and silver. When demand matched
          with the supply the fixing price was set.
        </p>
        <p>
          For a 100 years this was the process to establish the benchmark price
          for gold, silver, platinum and palladium. The room was eventually
          replaced with a telephone auction process. However, the financial
          marketplace has since become more and more digital.
        </p>
        <p>
          The world is now in need of an inexpensive, reliable benchmark for
          gold, silver, platinum and palladium. Welcome to the Kitco Gold and
          Precious Metals Fix.
        </p>
        <p>
          The world’s leader in precious metals information is establishing the
          new benchmark for all precious metals. Through the liquid and reliable
          over-the-counter cash market, Kitco Metals is able to calculate a
          reliable fixing price for gold, silver, platinum and palladium.
        </p>
        <p>
          The fixing price will be released every day at 10 am and made
          available for free to Kitco users.
        </p>
      </div>
    </div>
  );
}
