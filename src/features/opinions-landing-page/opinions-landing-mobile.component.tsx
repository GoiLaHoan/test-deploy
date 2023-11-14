import { FC, Fragment } from "react";
import React from "react";
import type { Commentary } from "~/src/generated";

import { TeaserTextOnlyWithAuthor } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";

import { NewsContentWrapper } from "~/src/components/news-content-wrapper/news-content-wrapper.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
// TODO: fix
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import { NewsCategoryTitle } from "~/src/components/news-category/news-category.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import clsx from "clsx";
import Link from "next/link";

export const OpinionsLandingMobile: FC<any> = () => {
  const { params, incrementParams } = useParams(10);
  const { data } = useQuery(
    news.newsCommentaries({
      variables: { ...params },
      options: { enabled: true },
    }),
  );
  const { ref, items, loading } = useInfinite({
    items: data?.commentaries?.items,
    incrementParams,
    total: data?.commentaries?.total,
  });

  const fetched = items as Commentary[];

  // Fetch 4 element
  const topOpinions = fetched?.slice(0, 4);

  // Fetch the rest Todo: get more results from the API
  const allOpinions = fetched?.slice(4);

  return (
    <LayoutNewsLanding title="Opinions">
      <NewsContentWrapper>
        <NewsCategoryTitle />
      </NewsContentWrapper>

      <NewsContentWrapper>
        <Spacer className="h-2.5" />
        <FirstSectionMobile topOpinions={topOpinions} />
      </NewsContentWrapper>
      <NewsContentWrapper>
        <SecondSectionMobile
          allOpinions={allOpinions}
          refScroll={ref}
          loading={loading}
        />
      </NewsContentWrapper>
    </LayoutNewsLanding>
  );
};

const FirstSectionMobile: FC<{ topOpinions: Commentary[] }> = ({
  topOpinions,
}) => {
  return (
    <div className="flex flex-col border-t border-t-ktc-borders pt-5">
      <div className="w-full pl-0 flex flex-col lg:w-1/2 lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="block">
          {topOpinions.map((x) => (
            <div
              className="flex gap-5 border-b border-b-ktc-borders pb-5 mb-5"
              key={x.id}
            >
              <div className="flex-initial w-[120px]">
                <Link href={x?.urlAlias ?? "/"}>
                  <ImageMS
                    src={
                      x?.image?.detail?.default?.srcset ??
                      x?.legacyThumbnailImageUrl
                    }
                    alt={`${x?.title} teaser image`}
                    priority={true}
                    width={400}
                    height={340}
                    service="icms"
                    className={clsx(
                      "w-full",
                      "relative",
                      "rounded-lg aspect-[4/3] mb-2.5",
                    )}
                  />
                </Link>
              </div>
              <div className="flex-initial w-[calc(100%_-_140px)]">
                <TeaserTextOnlyWithAuthor
                  node={x as any}
                  size="sm"
                  hideCategory={true}
                  hideSummary={true}
                  classTitle="mt-[-3px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdvertisingSlot
        id={`banner-0`}
        className={"h-[250px] w-[300px] bg-red-400 mx-auto"}
        viewportsEnabled={{
          mobile: true,
          tablet: false,
          desktop: false,
        }}
      />
    </div>
  );
};

const SecondSectionMobile: FC<{
  allOpinions: Commentary[];
  refScroll: (node?: Element) => void;
  loading: boolean;
}> = ({ allOpinions, refScroll, loading }) => {
  let adCounter = 1;

  function advertInjector(idx: number) {
    if (idx === 4 || ((idx - 4) % 5 === 0 && idx !== 0)) {
      adCounter++;
      return true;
    }
  }

  return (
    <div className="flex flex-col pt-5">
      {!allOpinions ? (
        <h2>loading</h2>
      ) : (
        <>
          {allOpinions.map((x, idx) => (
            <Fragment key={idx}>
              <div
                className="flex gap-5 border-t border-t-ktc-borders pt-5 mb-5"
                key={x.id}
              >
                <div className="flex-initial w-[120px]">
                  <Link href={x?.urlAlias ?? "/"}>
                    <ImageMS
                      src={
                        x?.image?.detail?.default?.srcset ??
                        x?.legacyThumbnailImageUrl
                      }
                      alt={`${x?.title} teaser image`}
                      priority={true}
                      width={400}
                      height={340}
                      service="icms"
                      className={clsx(
                        "w-full",
                        "relative",
                        "rounded-lg aspect-[4/3] mb-2.5",
                      )}
                    />
                  </Link>
                </div>
                <div className="flex-initial w-[calc(100%_-_140px)]">
                  <TeaserTextOnlyWithAuthor
                    node={x as any}
                    size="sm"
                    hideCategory={true}
                    hideSummary={true}
                    classTitle="mt-[-3px]"
                  />
                </div>
              </div>
              {advertInjector(idx) && (
                <AdvertisingSlot
                  id={`banner-${adCounter}`}
                  className={"h-[250px] w-[300px] bg-red-400 mx-auto mb-5"}
                  viewportsEnabled={{
                    mobile: true,
                    tablet: false,
                    desktop: false,
                  }}
                />
              )}
            </Fragment>
          ))}
        </>
      )}
      <div ref={refScroll}>{loading && <div>Loading...</div>}</div>
    </div>
  );
};
