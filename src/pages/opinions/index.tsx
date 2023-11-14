import useScreenSize from "~/src/utils/useScreenSize";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import type { Commentary, NewsTopContributorsQuery } from "~/src/generated";

import { TeaserTextOnlyWithAuthor } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import { NewsCategoryTitle } from "~/src/components/news-category/news-category.component";
import { GenericNewsListWithAuthor } from "~/src/components/generic-news-list/generic-news-list.component";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import clsx from "clsx";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: res,
    queries: [
      news.newsCommentaries({ variables: { limit: 10, offset: 0 } }),
      news.newsCommentaries({ variables: { limit: 7, offset: 0 } }),
      news.newsCategoriesTree(),
      news.topContributors(),
    ],
  });
  return {
    props: {
      dehydratedState,
    },
  };
};

const OpinionsLanding: FC = () => {
  const { params, incrementParams } = useParams(10);
  const { data } = useQuery(
    news.newsCommentaries({
      variables: { ...params },
      options: { enabled: true },
    }),
  );
  const { isMobile, isDesktop } = useScreenSize();

  const { ref, items, loading } = useInfinite({
    items: data?.commentaries?.items,
    incrementParams,
    total: data?.commentaries?.total,
  });

  const fetched = items as Commentary[];

  const { data: contributors } = useQuery(news.topContributors());

  // Fetch only the first one
  const heroOpinion = fetched?.[0];

  // Fetch the next 3
  const topSectionOpinions = fetched?.slice(1, 4);

  return (
    <LayoutNewsLanding title="Opinions">
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <NewsCategoryTitle />
        {!isMobile ? (
          <FirstSectionDesktop
            heroOpinion={heroOpinion}
            topSectionOpinions={topSectionOpinions}
          />
        ) : (
          <FirstSectionMobile topOpinions={fetched?.slice(0, 4)} />
        )}

        {isDesktop && <TopContributors contributors={contributors} />}

        <GenericNewsListWithAuthor data={fetched?.slice(4)} />
        <div ref={ref}>{loading && <div>Loading...</div>}</div>
      </div>
    </LayoutNewsLanding>
  );
};

export default OpinionsLanding;

const FirstSectionDesktop: FC<{
  heroOpinion: Commentary;
  topSectionOpinions: Commentary[];
}> = ({ heroOpinion, topSectionOpinions }) => {
  const { isTablet } = useScreenSize();

  return (
    <div className="flex flex-col pb-10 lg:pb-10 md:pb-0 border-b border-ktc-borders lg:flex-row">
      <div className="w-full border-0 border-ktc-borders lg:w-[53.4%] lg:pr-[40px] md:pb-[40px] lg:pb-0 md:border-b lg:border-0">
        <div className="mb-2 overflow-hidden">
          <Link href={heroOpinion?.urlAlias ?? "/"}>
            <ImageMS
              src={
                heroOpinion?.image?.detail?.default?.srcset ??
                heroOpinion?.legacyThumbnailImageUrl
              }
              alt={`${heroOpinion?.title} teaser image`}
              priority={true}
              width={1202}
              height={676}
              service="icms"
              className={clsx(
                "w-full",
                "relative",
                "rounded-lg aspect-video mb-2.5 object-cover",
              )}
            />
          </Link>
        </div>
        <TeaserTextOnlyWithAuthor
          node={heroOpinion as any}
          size="xl"
          hideCategory={true}
          hideSummary={false}
        />
      </div>
      <div className="w-full pl-0 mt-10 flex flex-col lg:w-[calc(100%_-_53.4%_+_40px)] lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="flex flex-col gap-10">
          {topSectionOpinions.map((x) => (
            <TeaserTextOnlyWithAuthor
              node={x as any}
              size="md"
              hideCategory={true}
              hideSummary={false}
              key={x?.id}
            />
          ))}
        </div>
        {isTablet && (
          <AdvertisingSlot
            id={`banner-1`}
            className={
              "h-[90px] w-[728px] bg-red-400 mx-auto my-[20px] md:my-10 lg:hidden block"
            }
            viewportsEnabled={{
              mobile: false,
              tablet: true,
              desktop: false,
            }}
          />
        )}
      </div>
    </div>
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

const TopContributors: FC<{ contributors: NewsTopContributorsQuery }> = ({
  contributors,
}) => {
  return (
    <>
      <h2 className="uppercase my-5 font-mulish text-[21px] leading-[27px]">
        Top Contributors
      </h2>

      <div className="flex border-b gap-5 border-b-ktc-borders pb-6">
        {!contributors ? (
          <h2>loading</h2>
        ) : (
          <>
            {contributors?.topContributors?.map((x) => (
              <Link
                className="flex flex-col items-center w-full max-w-[120px]"
                key={x.id}
                href={x.urlAlias ?? "#"}
              >
                <>
                  <div className="text-center mx-auto">
                    <Image
                      src={x.imageUrl ?? "/default-avatar.svg"}
                      alt={`Photo of ${x.name}`}
                      width={80}
                      height={80}
                      layout="fixed"
                      className="rounded-full"
                    />
                  </div>
                  <div className="mt-1 text-center font-normal italic text-sm text-black leading-[18px]">
                    {x.name}
                  </div>
                </>
              </Link>
            ))}
          </>
        )}
      </div>
    </>
  );
};
