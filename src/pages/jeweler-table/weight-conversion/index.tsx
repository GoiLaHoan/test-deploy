import React from "react";
import type { FC } from "react";
import { useQuery } from "react-query";
import LayoutJewelers from "~/src/components/LayoutJewelers/LayoutJewelers";
import { JewelryTitle } from "~/src/components/JewelryTitle/JewelryTitle.component";
import styles from "./weight-conversion.module.scss";
import { news } from "~/src/lib/news-factory.lib";
import { ArticleTeaserFragmentFragment } from "~/src/generated";
import { TeaserTextOnly } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import cs from "~/src/utils/cs";
import DwtOzGramConverter from "~/src/components/DwtOzGramConverter/DwtOzGramConverter";
import DwtOzGramReferenceTable from "~/src/components/DwtOzGramReferenceTable/DwtOzGramReferenceTable";

const WeightConversion = () => {
  return (
    <LayoutJewelers title="Jeweler Resources - DWT/Oz/Gram Conversion - Kitco">
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <JewelryTitle />
        <div
          className={cs([
            styles.container,
            "gap-[20px] mt-2.5 md:mt-4 mb-20 md:mb-[120px]",
          ])}
        >
          <main className={styles.main}>
            <section className={cs([styles.block, styles.converter])}>
              <DwtOzGramConverter />
            </section>
            <h3 className={styles.tableTitle}>Reference table</h3>
            <div className={cs(["overflow-y-scroll", styles.wrapper])}>
              <section
                className={cs([styles.block, styles.referenceTable, "gap-3"])}
              >
                <DwtOzGramReferenceTable from={10} to={330} />
                <DwtOzGramReferenceTable from={340} to={660} />
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

export default WeightConversion;

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
