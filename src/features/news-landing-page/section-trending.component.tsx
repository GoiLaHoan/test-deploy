import type { FC } from "react";
import type { ArticleTeaserFragmentFragment } from "~/src/generated";

import { useQuery } from "react-query";

import {
  TeaserBigWide,
  TeaserWideTwo,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { news } from "~/src/lib/news-factory.lib";
import cs from "~/src/utils/cs";
import AdvertisingSlot from "../advertising/AdvertisingSlot";
import { Spacer } from "~/src/components/spacer/spacer.component";

export const TrendingNowSection: FC = () => {
  const { data } = useQuery(news.newsTrending({ variables: { limit: 10 } }));
  return (
    <div className="w-[100%] lg:w-[calc(100%_-_320px)] flex flex-col lg:pr-5">
      <h2 className={cs(["text-[24px] md:text-[32px] pb-6"])}>
        <span>Now Trending</span>
      </h2>
      <div className="flex flex-col gap-2.5">
        {data?.nodeListTrending
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment, idx: number) => {
            if (idx === 0) {
              return (
                <div className="flex" key={x.id}>
                  <TeaserBigWide size="lg" aspectRatio="16x9" node={x} />
                </div>
              );
            }
            return (
              <div className="flex" key={x.id}>
                <TeaserWideTwo
                  key={x?.id}
                  node={x}
                  size="lg"
                  aspectRatio="16x9"
                  hideSummary={true}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export const TrendingNowMobile: FC = () => {
  const { data } = useQuery(
    news.newsTrending({
      variables: { limit: 10 },
    }),
  );
  return (
    <div className="col-span-2 flex flex-col">
      <h2 className={cs(["mr-4 text-2xl pb-5"])}>
        <span>Now Trending</span>
      </h2>
      <div className="flex flex-grow flex-col justify-between">
        {data?.nodeListTrending
          ?.slice(0, 5)
          .map((x: ArticleTeaserFragmentFragment) => (
            <div className="flex" key={x.id}>
              <TeaserWideTwo
                key={x?.id}
                node={x}
                size="lg"
                aspectRatio="16x9"
                hideSummary={true}
                hideImage={true}
              />
            </div>
          ))}
        <AdvertisingSlot
          id={"native-example"}
          className={"h-[250px] w-[300px] bg-red-400 my-5 m-auto"}
          viewportsEnabled={{
            mobile: true,
            tablet: false,
            desktop: false,
          }}
        />
        <Spacer className="h-7" />
      </div>
    </div>
  );
};
