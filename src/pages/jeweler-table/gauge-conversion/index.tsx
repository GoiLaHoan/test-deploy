import React from "react";
import type { FC } from "react";
import { useQuery } from "react-query";
import BasicTable from "~/src/components/BasicTable/BasicTable";
import LayoutJewelers from "~/src/components/LayoutJewelers/LayoutJewelers";
import { JewelryTitle } from "~/src/components/JewelryTitle/JewelryTitle.component";
import styles from "./gauge-conversion.module.scss";
import { news } from "~/src/lib/news-factory.lib";
import { ArticleTeaserFragmentFragment } from "~/src/generated";
import { TeaserTextOnly } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import cs from "~/src/utils/cs";
import useScreenSize from "~/src/utils/useScreenSize";

const HEADER = [
  `B & S<br>Gauge`,
  `Inch<br>(Decimal)`,
  `Millimeter<br>(mm)`,
  `Inch<br>(Fraction)`,
];

const DATA_LEFT = [
  ["1", "0.289", "7.348", "."],
  ["2", "0.258", "6.543	", "."],
  [".", "0.250", "6.350", "1/4"],
  [".", "0.234", "5.953", "15/64"],
  ["3", "0.229", "5.827", "."],
  [".", "0.219", "5.556", "7/32"],
  ["4", "0.204", "5.189", "."],
  [".", "0.203", "0.203", "13/64"],
  [".", "0.188", "4.762", "3/16"],
  ["5", "0.182", "4.621", "."],
  [".", "0.172", "4.366", "11/64"],
  ["6", "0.162", "4.115", "."],
  [".", "0.156", "3.969", "5/32"],
  ["7", "0.144", "3.664", "."],
  [".", "0.141", "3.572", "9/64"],
  ["8", "0.128", "3.263", "."],
  [".", "0.125", "3.175", "1/8"],
  ["9", "0.114", "2.906", "."],
  [".", "0.109", "2.778", "7/64"],
  ["10", "0.102", "2.588", "."],
  [".", "0.094", "2.381", "3/32"],
  ["11", "0.091", "2.304", "."],
  ["12", "0.081", "2.052", "."],
  [".", "0.078", "3235", "5/64"],
  ["13", "0.072", "1.828", "."],
  ["14", "0.064", "1.628", "."],
  [".", "0.063", "1.588", "1/16"],
  ["15", "0.057", "1.449", "."],
  ["16", "0.051", "1.291", "."],
  [".", "0.047", "1.191", "3/64"],
];

const DATA_RIGHT = [
  ["17", "0.045", "1.149", "."],
  ["18", "0.040", "1.024", "."],
  ["19", "0.036", "0.912", "."],
  ["20", "0.032", "0.812", "."],
  [".", "0.031", "0.795", "1/32"],
  ["21", "0.028", "0.723", "."],
  ["22", "0.025", "0.644", "."],
  ["23", "0.023", "0.573", "."],
  ["24", "0.020", "0.511", "."],
  ["25", "0.018", "0.455", "."],
  ["26", "0.016", "0.405", "."],
  [".", "0.016", "0.396", "1/64"],
  ["27", "0.014", "0.360", "."],
  ["28", "0.013", "0.321", "."],
  ["29", "0.011", "0.286", "."],
  ["30", "0.010", "0.255", "."],
  ["31", "0.0089", "0.226", "."],
  ["32", "0.0080", "0.200", "."],
  ["33", "0.0071", "0.180", "."],
  ["34", "0.0063", "0.160", "."],
  ["35", "0.0056", "0.142", "."],
  ["36", "0.0050", "0.130", "."],
  ["37", "0.0045", "0.114", "."],
  ["38", "0.0040", "0.100", "."],
  [".", ".", ".", "."],
  [".", ".", ".", "."],
  [".", ".", ".", "."],
  [".", ".", ".", "."],
  [".", ".", ".", "."],
  [".", ".", ".", "."],
];

const GaugeConversion = () => {
  const { isMobile } = useScreenSize();
  const dataRightFilter = !isMobile ? DATA_RIGHT : DATA_RIGHT.slice(0, 24);

  return (
    <LayoutJewelers title="Jeweler Resources - Gauge/Inch/mm Conversion- Kitco">
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <JewelryTitle />
        <div
          className={cs([
            styles.container,
            "gap-[20px] mb-20 md:mb-[120px] mt-2.5 md:mt-4",
          ])}
        >
          <main>
            <div className={cs(["overflow-y-scroll", styles.wrapper])}>
              <section className={cs(["lg:min-w-[635px]", styles.block])}>
                <h3 className={styles.tableTitle}>
                  Gauge to Inches to Millimeters Conversion Table
                </h3>
                <div className="md:grid md:grid-cols-2 gap-3">
                  <BasicTable
                    headers={HEADER}
                    data={DATA_LEFT}
                    cellClassName="text-center sm:!p-2.5 !p-1"
                  />
                  <BasicTable
                    headers={HEADER}
                    data={dataRightFilter}
                    headerClassName="!hidden md:!grid"
                    cellClassName="text-center sm:!p-2.5 !p-1"
                  />
                </div>
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

export default GaugeConversion;

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
