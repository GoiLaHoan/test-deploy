import React, { type FC, Fragment } from "react";
import { useQuery } from "react-query";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import {
  TeaserTextWithAuthor,
  TeaserTextWithAuthorNoSummary,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import GlobalMeta from "~/src/components/GlobalMeta/GlobalMeta";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { NewsByCategoryGenericQuery } from "~/src/generated";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import useScreenSize from "~/src/utils/useScreenSize";

export type TVariables = {
  urlAlias: string;
  limit: number;
  offset: number;
};

export async function getServerSideProps({ res }) {
  const variables = {
    urlAlias: "/news/category/off-the-wire",
    limit: 50,
    offset: 0,
  };

  const { dehydratedState } = await ssrQueries({
    ctxRes: res,
    queries: [
      news.newsByCategoryGeneric({ variables }),
      news.newsCategoriesTree(),
      news.newsOffTheWire({
        variables: {
          limit: 50,
          urlAlias: "/news/category/off-the-wire",
          offset: 0,
        },
      }),
    ],
  });

  return {
    props: {
      dehydratedState,
      variables,
    },
  };
}

type Data = NewsByCategoryGenericQuery["nodeListByCategory"]["items"];

const OffTheWirePage: FC<{ variables: TVariables }> = ({ variables }) => {
  const { data } = useQuery(news.newsOffTheWire({ variables }));
  const items = data?.nodeListByCategory?.items as Data;

  return (
    <LayoutNewsLanding title="Aggregated financial and geopolitical stories from the world | KITCO">
      <GlobalMeta />
      <div className="px-[20px] mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1080px]">
        <h1 className="uppercase text-[32px] md:text-[48px] leading-[57.6px] text-[#111111]">
          OFF THE WIRE
        </h1>
        <Spacer className="h-5" />
        <ContentOffTheWirePage data={items} />
      </div>
    </LayoutNewsLanding>
  );
};
export default OffTheWirePage;

const ContentOffTheWirePage: FC<{ data: Data }> = ({ data }) => {
  const AdsOnDesktop = () => {
    const { isDesktop } = useScreenSize();

    if (!isDesktop) return null;

    return (
      <>
        <div className="w-[300px]">
          <AdvertisingSlot
            id={"right-rail-1"}
            className={"h-[250px] w-[300px] bg-red-400 mx-auto top-4 mb-[30px]"}
            viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
          />
          <div className="text-sm font-normal leading-[21px] p-5 border border-[#E5E5E5] mb-[30px]">
            Kitco News features Reuter&apos;s top financial, economic and
            geopolitical news making headlines around the world.
          </div>

          <AdvertisingSlot
            id={"right-rail-lg"}
            className={"h-[600px] w-[300px] bg-red-400 mx-auto sticky top-4"}
            viewportsEnabled={{ mobile: false, tablet: false, desktop: true }}
          />
        </div>
      </>
    );
  };

  return (
    <Fragment>
      <div className="flex gap-10 md:pt-5">
        <div>
          <FirstSection data={data?.slice(0, 5)} />
          <SecondSection data={data?.slice(5)} />
        </div>
        <AdsOnDesktop />
      </div>
    </Fragment>
  );
};

const FirstSection: FC<{ data: any }> = ({ data }) => {
  const { isMobile } = useScreenSize();

  if (isMobile) {
    return (
      <div className="flex">
        <div>
          {data?.map((node: any, idx: number) => (
            <Fragment key={idx}>
              <div className="border-b border-ktc-borders mb-[15px] pb-[15px]">
                <TeaserTextWithAuthorNoSummary
                  node={node}
                  size="lg"
                  aspectRatio="16x9"
                  key={node.id}
                  hideCategory={true}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex pb-[50px]">
      <div>
        {data?.map((node: any, idx: number) => (
          <Fragment key={idx}>
            <TeaserTextWithAuthor
              node={node}
              size="lg"
              aspectRatio="16x9"
              key={node.id}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const SecondSection: FC<{ data: any }> = ({ data }) => {
  const arrayIndexShowAds = [4, 14, 24, 34, 44, 54]; // Array of index keys show Ads
  return (
    <div className="justify-between pb-[80px]">
      {data?.map((node: any, idx: number) => (
        <Fragment key={idx}>
          <div className="border-b border-ktc-borders mb-[15px] pb-[15px]">
            <TeaserTextWithAuthorNoSummary
              node={node}
              size="lg"
              aspectRatio="16x9"
              key={node.id}
              hideCategory={true}
            />
          </div>
          {arrayIndexShowAds.includes(idx) && (
            <div key={idx + "adv"}>
              <AdvertisingSlot
                id={`banner-${idx}`}
                className={
                  "w-[320px] h-[100px] md:w-[728px] md:h-[90px] bg-red-400 mx-auto my-[19px] md:my-10"
                }
                viewportsEnabled={{
                  mobile: true,
                  tablet: false,
                  desktop: false,
                }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
