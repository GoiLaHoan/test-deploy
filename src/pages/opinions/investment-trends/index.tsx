import { FC } from "react";
import dynamic from "next/dynamic";
import { useQuery } from "react-query";

import { news } from "~/src/lib/news-factory.lib";
import { TeasersUnion } from "~/src/types/types";
import { Sponsored, SponsoredContentQuery } from "~/src/generated";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import {
  TeaserTextOnly,
  TeaserWide,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { GenericNewsList } from "~/src/components/generic-news-list/generic-news-list.component";
import { NewsCategoryTitle } from "~/src/components/news-category/news-category.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import useScreenSize from "~/src/utils/useScreenSize";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { GetServerSideProps } from "next";

const TeaserCard = dynamic(
  async () =>
    await import(
      "~/src/components-news/ArticleTeasers/teasers-from-figma.component"
    ).then((mod) => mod.TeaserCard),
  { ssr: false },
);
export { TeaserCard };

export const getServerSideProps: GetServerSideProps<any> = async (c) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: c.res,
    queries: [
      news.sponsoredContent({ variables: { limit: 10, offset: 0 } }),
      news.newsCategoriesTree(),
    ],
  });
  return {
    props: { dehydratedState },
  };
};

const OpinionsInvestmentTrends: FC<any> = () => {
  const { params, incrementParams } = useParams(10);
  const { data } = useQuery(
    news.sponsoredContent({
      variables: { ...params },
      options: { enabled: true },
    }),
  );

  const { ref, items, loading } = useInfinite({
    items: data?.nodeList?.items as Sponsored[],
    incrementParams,
    total: data?.nodeList?.total,
  });

  const dataMap =
    items?.map((item: any) => {
      return {
        ...item,
        teaserSnippet:
          item?.teaserSnippet ?? item?.bodyWithEmbeddedMedia?.value,
      };
    }) ?? [];

  const { isMobile } = useScreenSize();

  return (
    <LayoutNewsLanding title="Investment Trends">
      <div className="px-[20px] mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <NewsCategoryTitle />
        <FirstSection isMobile={isMobile} data={dataMap?.slice(0, 4)} />
        <Spacer className="h-5" />
        <GenericNewsList
          data={dataMap?.slice(4)}
          hideCategory={true}
          layoutSecond={true}
        />
        <div ref={ref}>{loading && <div>Loading...</div>}</div>
      </div>
    </LayoutNewsLanding>
  );
};

export default OpinionsInvestmentTrends;

type Data = SponsoredContentQuery["nodeList"]["items"];

const FirstSection: FC<{ isMobile: boolean; data: Data }> = ({
  isMobile,
  data,
}) => {
  if (!isMobile) return <FirstSectionDesktop data={data} />;

  return (
    <>
      <Spacer className="h-2.5 border-b border-ktc-borders" />
      <FirstSectionMobile data={data} />
    </>
  );
};

const FirstSectionDesktop: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex flex-col pb-10 border-b border-ktc-borders lg:flex-row">
      <div className="w-full border-0 border-ktc-borders lg:w-[53.4%] lg:pr-[40px] md:pb-[40px] lg:pb-0 md:border-b lg:border-0">
        <TeaserCard
          node={data?.[0] as TeasersUnion}
          size="xl"
          hideCategory={true}
        />
      </div>
      <div className="w-full pl-0 mt-10 flex flex-col lg:w-[calc(100%_-_53.4%_+_40px)] lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="block">
          {data
            ?.slice(1, data?.length)
            .map((node: TeasersUnion, idx: number) => (
              <div className="mb-10" key={node.id ?? idx}>
                <TeaserTextOnly
                  node={node}
                  key={node.id}
                  size="md"
                  hideCategory={true}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const FirstSectionMobile: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex flex-col">
      <div className="w-full pl-0 flex flex-col lg:w-1/2 lg:pl-[40px] lg:mt-0 border-l-ktc-borders lg:border-l">
        <div className="block">
          {data
            ?.slice(0, data?.length)
            .map((node: TeasersUnion, idx: number) => (
              <div
                className="pt-5 border-b border-ktc-borders"
                key={node.id ?? idx}
              >
                <TeaserWide
                  node={node}
                  size="md"
                  aspectRatio="16x9"
                  key={node.id}
                  hideCategory={true}
                />
              </div>
            ))}
        </div>
      </div>
      <AdvertisingSlot
        id={`banner-0`}
        className={"h-[250px] w-[300px] bg-red-400 mx-auto my-5"}
        viewportsEnabled={{
          mobile: true,
          tablet: false,
          desktop: false,
        }}
      />
    </div>
  );
};
