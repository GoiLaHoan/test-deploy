import React from "react";
import type { FC } from "react";
import { useQuery } from "react-query";
import BasicTable from "~/src/components/BasicTable/BasicTable";
import LayoutJewelers from "~/src/components/LayoutJewelers/LayoutJewelers";
import { JewelryTitle } from "~/src/components/JewelryTitle/JewelryTitle.component";
import styles from "./melting-point.module.scss";
import { news } from "~/src/lib/news-factory.lib";
import { ArticleTeaserFragmentFragment } from "~/src/generated";
import { TeaserTextOnly } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import cs from "~/src/utils/cs";

const HEADER = [
  "Metal",
  "Symbol",
  "Fahrenheit",
  "Celsius",
  "Gravity",
  "Weight",
];

const DATA = [
  ["Aluminum", "Al", "1220", "660", "2.70", "1.423"],
  ["Antimony", "Sb", "1167", "630", "6.62", "3.448"],
  ["Beryllium", "Be", "2340", "1280", "1.82", "0.959"],
  ["Bismuth", "Bi", "520", "271", "9.80", "5.163"],
  ["Cadmium", "Cd", "610", "321", "8.65", "4.557"],
  ["Carbon", "C", "-", "-", "2.22", "1.170"],
  ["Chromium", "Cr", "3430", "1890", "7.19", "3.788"],
  ["Cobalt", "Co", "2070", "1132.2", "8.9", "4.689"],
  ["Copper", "Cu", "1981", "1083", "8.96", "4.719"],
  ["Gold, 24K Pure", "Au", "1945", "1063", "19.32", "10.180"],
  ["Iridium", "Ir", "4449", "2454", "22.50", "11.849"],
  ["Iron", "Fe", "2802", "1539", "7.87", "4.145"],
  ["Lead", "Pb", "621", "327", "11.34", "5.973"],
  ["Magnesium", "Mg", "1202", "650", "1.75", "0.917"],
  ["Manganese", "Mn", "2273", "1245", "7.43", "3.914"],
  ["Molybdenum", "Mo", "4760", "2625", "10.20", "5.347"],
  ["Nickel", "Ni", "2651", "1455", "8.90", "4.691"],
  ["Osmium", "Os", "4892", "2700", "22.50", "11.854"],
  ["Palladium", "Pd", "2831", "1555", "12.00", "6.322"],
  ["Phosphorus", "P", "111", "44", "1.82", "0.959"],
  ["Platinum, Pure", "Pt", "3224", "1773", "21.45", "11.301"],
  ["15% Irid Plat", "-", "3310", "1821", "21.59", "11.301"],
  ["10% Irid Plat", "-", "3250", "1788", "21.54", "11.349"],
  ["5% Irid Plat", "-", "3235", "1779", "21.50", "11.325"],
  ["Rhodium", "Rh", "3571", "1966", "12.44", "6.553"],
  ["Ruthenium", "Ru", "4500", "2500", "12.20", "6.428"],
  ["Silicon", "Si", "2605", "1430", "2.33", "1.247"],
  ["Silver, Pure", "Ag", "1761", "961", "10.49", "5.525"],
  ["Silver, Sterling", "-", "1640", "893", "10.36", "5.457"],
  ["Silver, Coin", "-", "1615", "879", "10.31", "5.430"],
  ["Tin", "Sn", "450", "232", "7.30", "3.846"],
  ["Zinc", "Zn", "787", "419", "7.10", "3.7758"],
];

const Meltingpoints = () => {
  return (
    <LayoutJewelers title="Jeweler Resources - Melting Points - Kitco">
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <JewelryTitle />
        <div
          className={cs([
            styles.container,
            "gap-[20px] mt-2.5 mb-20 md:mb-[120px]",
          ])}
        >
          <main>
            <section className={styles.block}>
              <p>
                The specific gravity of a metal or alloy is merely the weight in
                grams of one cubic centimeter. When it is more convenient to
                work in troy weights, the number of ounces per cubic inch of any
                metal or alloy may be found by multiplying its specific gravity
                by the constant 0.52686.
              </p>
            </section>
            <div className={cs(["overflow-y-scroll", styles.wrapper])}>
              <section className={cs(["min-w-[635px]", styles.block])}>
                <h3 className={styles.tableTitle}>
                  Melting Point and Weights of Various Metals and Alloys
                </h3>
                <BasicTable headers={HEADER} data={DATA} />
              </section>
            </div>
          </main>
          <aside className="hidden lg:col-span-1 lg:block w-[300px]">
            <AdvertisingSlot
              viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
              id={"right-banner-2"}
              className={"min-h-[250px] w-[300px] mx-auto bg-red-500 mb-2.5"}
            />
            <div className="px-2.5">
              <LatestNewsSection />
            </div>
          </aside>
        </div>
      </div>
    </LayoutJewelers>
  );
};

export default Meltingpoints;

const LatestNewsSection: FC = () => {
  const { data } = useQuery(
    news.nodeListQueue({
      variables: { limit: 5, offset: 0, queueId: "latest_news" },
    }),
  );
  return (
    <div className="flex flex-col">
      <h2 className="text-[20px] pb-2.5 border-b border-ktc-borders uppercase">
        <span>Latest News</span>
      </h2>
      <div className="flex flex-grow flex-col">
        {data?.nodeListQueue?.items
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment) => {
            return (
              <div className="flex mt-5" key={x.id}>
                <TeaserTextOnly
                  key={x?.id}
                  node={x}
                  hideSummary={true}
                  size={"sm"}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
