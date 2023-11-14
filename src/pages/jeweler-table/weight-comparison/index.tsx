import React from "react";
import type { FC } from "react";
import { useQuery } from "react-query";
import { BasicTableTwo } from "~/src/components/BasicTable/BasicTable";
import LayoutJewelers from "~/src/components/LayoutJewelers/LayoutJewelers";
import { JewelryTitle } from "~/src/components/JewelryTitle/JewelryTitle.component";
import styles from "./weight-comparison.module.scss";
import { news } from "~/src/lib/news-factory.lib";
import { ArticleTeaserFragmentFragment } from "~/src/generated";
import { TeaserTextOnly } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import cs from "~/src/utils/cs";

const HEADER = [
  "",
  "Pt.",
  "F.G.",
  "22kt",
  "18kt",
  "14kt",
  "10kt",
  "9kt",
  "F.S.",
  "Stg",
];

const DATA = [
  [
    "Pt.",
    "1.00",
    "0.90",
    "0.82",
    "0.70",
    "0.60",
    "0.53",
    "0.53",
    "0.49",
    "0.48",
  ],
  [
    "F.G.",
    "1.11",
    "1.00",
    "0.91",
    "0.78",
    "0.67",
    "0.59",
    "0.58",
    "0.54",
    "0.54",
  ],
  [
    "22kt",
    "1.22",
    "1.10",
    "1.00",
    "0.86",
    "0.73",
    "0.65",
    "0.65",
    "0.60",
    "0.59",
  ],
  [
    "18kt",
    "1.42",
    "1.28",
    "1.16",
    "1.00",
    "0.85",
    "0.76",
    "0.75",
    "0.69",
    "0.68",
  ],
  [
    "14kt",
    "1.66",
    "1.50",
    "1.36",
    "1.17",
    "1.00",
    "0.89",
    "0.88",
    "0.81",
    "0.80",
  ],
  [
    "10kt",
    "1.88",
    "1.69",
    "1.54",
    "1.32",
    "1.13",
    "1.00",
    "0.99",
    "0.92",
    "0.90",
  ],
  [
    "9kt",
    "1.90",
    "1.71",
    "1.56",
    "1.34",
    "1.14",
    "1.01",
    "1.00",
    "0.93",
    "0.92",
  ],
  [
    "F.S.",
    "2.04",
    "1.84",
    "1.68",
    "1.44",
    "1.23",
    "1.09",
    "1.08",
    "1.00",
    "0.99",
  ],
  [
    "Stg",
    "2.07",
    "1.87",
    "1.70",
    "1.46",
    "1.25",
    "1.11",
    "1.09",
    "1.01",
    "1.00",
  ],
];

const WeightComparison = () => {
  return (
    <LayoutJewelers title="Jeweler Resources - Weight Comparison - Kitco">
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <JewelryTitle />
        <div
          className={cs([styles.container, "gap-5 mt-2.5 mb-20 md:mb-[120px]"])}
        >
          <main>
            <HowToWeightComparison />
            <TableWeightComparison />
          </main>
          <LeftContent />
        </div>
      </div>
    </LayoutJewelers>
  );
};

export default WeightComparison;

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

const HowToWeightComparison = (): JSX.Element => {
  return (
    <section className={styles.block}>
      <h3 className="text-[20px] leading-[26px] tracking-[0.0075em] mb-3">
        To find the weight of an article in a metal different from that in which
        it is now made:
      </h3>
      <ol>
        <li className="font-normal text-[15px] leading-6 pb-[15px]">
          Find the present metal in the first vertical column.
        </li>
        <li className="font-normal text-[15px] leading-6 pb-[15px]">
          Multiply the present weight by the factor in the same horizontal row
          under the new metal. Example: A sterling silver ring weighs 8 grams,
          what will it weigh in 14kt.
        </li>
        <li className="font-normal text-[15px] leading-6 pb-[15px]">
          Along the horizontal row marked Stg in the first column under the
          heading 14 Kt we find 1.25 x 8 = 10 grams, weight in 14 Kt.
        </li>
      </ol>
    </section>
  );
};

const TableWeightComparison = () => {
  return (
    <div className={cs(["overflow-y-scroll", styles.wrapper])}>
      <section className={cs(["min-w-[635px]", styles.block])}>
        <h3 className={styles.tableTitle}>Weight Comparison Chart</h3>
        <BasicTableTwo headers={HEADER} data={DATA} />
      </section>
    </div>
  );
};

const LeftContent = () => {
  return (
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
  );
};
