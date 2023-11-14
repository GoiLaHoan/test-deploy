import type { GetServerSideProps, NextPage } from "next";
import type { FC } from "react";
import type {
  ArticleTeaserFragmentFragment,
  NewsGenericByTagQuery,
  Tag,
} from "~/src/generated";

import { clsx } from "clsx";
import { IoChevronDownOutline } from "react-icons/io5";
import { useQuery } from "react-query";

import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";

import {
  TeaserCard,
  TeaserCardForNewParent,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { GenericNewsList } from "~/src/components/generic-news-list/generic-news-list.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { TrendingTags } from "~/src/components/trending-tags/trending-tags.component";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import useScreenSize from "~/src/utils/useScreenSize";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { dehydratedState } = await ssrQueries({
    ctxRes: ctx.res,
    queries: [
      news.tagByUrlAlias({
        variables: { urlAlias: `/news/tag/${ctx.query.urlAlias}` },
      }),
      news.nodeListByTag({
        variables: {
          urlAlias: `/news/tag/${ctx.query.urlAlias}`,
          limit: 8,
          offset: 0,
        },
      }),
      news.newsCategoriesTree(),
    ],
  });

  return {
    props: {
      dehydratedState,
      urlAlias: ctx.query.urlAlias,
    },
  };
};

const useData = (urlAlias: string) => {
  const { params, incrementParams } = useParams(8);
  const { data } = useQuery(
    news.nodeListByTag({
      variables: { ...params, urlAlias },
      options: { enabled: true },
    }),
  );

  const { items, isNextPage, fetchMore } = useInfinite({
    items: data?.nodeListByTag?.items,
    incrementParams,
    total: data?.nodeListByTag?.total,
  });

  return {
    data: data?.nodeListByTag?.items ?? items,
    loadMore: {
      isDisabled: !isNextPage,
      execute: fetchMore,
    },
  };
};

const NewsAliasPage: NextPage<{ urlAlias: string }> = ({ urlAlias }) => {
  const { isDesktop, isTablet, isMobile } = useScreenSize();
  const { data } = useQuery(
    news.tagByUrlAlias({
      variables: { urlAlias: `/news/tag/${urlAlias}` },
    }),
  );

  const tag = data?.tagByUrlAlias;

  return (
    <LayoutNewsLanding title="News">
      {isDesktop ? <TagAliasDesktop tag={tag} /> : null}
      {isTablet ? <TagAliasTablet tag={tag} /> : null}
      {isMobile ? <TagAliasMobile tag={tag} /> : null}
    </LayoutNewsLanding>
  );
};

export default NewsAliasPage;

const TagAliasDesktop: FC<{ tag: Tag }> = ({ tag }) => {
  const { data, loadMore } = useData(tag.urlAlias);
  return (
    <>
      <div className="w-[1240px] mx-auto">
        <TagTitle name={tag.name} />
        <ThreeColumn data={data?.slice(0, 3)} />
        <FiveColumn data={data?.slice(3)} />
        <LoadMore loadMore={loadMore} />
      </div>
      <TrendingTags />
      <div className="w-[1240px] mx-auto pt-10">
        <h2 className="font-semibold text-[32px] font-mulish leading-[42px]">
          Latest News
        </h2>
        <LatestNews />
      </div>
    </>
  );
};

const TagAliasTablet: FC<{ tag: Tag }> = ({ tag }) => {
  const { data, loadMore } = useData(tag.urlAlias);

  return (
    <>
      <div className="w-full mx-auto px-10">
        <TagTitle name={tag.name} />
        <FourColumn data={data?.slice(0, 4)} />
        <FourColumn data={data?.slice(4)} />
        <AdvertisingSlot
          id={"banner-2"}
          className={"md:h-[90px] md:w-[728px] bg-red-400 mx-auto"}
          viewportsEnabled={{
            mobile: true,
            tablet: false,
            desktop: false,
          }}
        />
        <LoadMore loadMore={loadMore} />
      </div>

      <TrendingTags />
      <div className="w-full mx-auto py-10 px-10">
        <h2 className="font-semibold text-[24px] font-mulish leading-[32px]">
          Latest News
        </h2>
        <LatestNews />
      </div>
    </>
  );
};

const TagAliasMobile: FC<{ tag: Tag }> = ({ tag }) => {
  const { data, loadMore } = useData(tag.urlAlias);

  return (
    <>
      <div className="w-full mx-auto px-5">
        <TagTitle name={tag.name} />
        <GenericNewsList data={data} disableAdverts={true} />
        <LoadMore loadMore={loadMore} />
      </div>
      <TrendingTags />
      <div className="p-5 pt-10 w-full mx-auto md:p-10 lg:p-10">
        <h2 className="font-semibold text-[24px] font-mulish leading-[32px] pb-5">
          Latest News
        </h2>
        <LatestNews />
      </div>
    </>
  );
};

const TagTitle: FC<{ name: string }> = ({ name }) => {
  return (
    <h1 className="uppercase text-[32px] md:text-[48px] leading-[38px] md:leading-[58px] md:mb-5">
      <span
        className="text-kitco-black text-opacity-20"
        style={{ fontFamily: "Bebas Neue" }}
      >
        TAG:&nbsp;
      </span>
      {name}
    </h1>
  );
};

const ThreeColumn: FC<{
  data: NewsGenericByTagQuery["nodeListByTag"]["items"];
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-10 pb-10">
      {data?.map((x: ArticleTeaserFragmentFragment) => (
        <TeaserCardForNewParent size="md" node={x} key={x.id} />
      ))}
    </div>
  );
};

const FourColumn: FC<{
  data: NewsGenericByTagQuery["nodeListByTag"]["items"];
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-4 gap-[22px] pb-10">
      {data?.map((x: ArticleTeaserFragmentFragment) => (
        <TeaserCard size="sm" node={x} key={x.id} sizeImg="md" />
      ))}
    </div>
  );
};

const FiveColumn: FC<{
  data: NewsGenericByTagQuery["nodeListByTag"]["items"];
}> = ({ data }) => {
  return (
    <div className="grid grid-cols-5 gap-10">
      {data?.map((x: ArticleTeaserFragmentFragment) => (
        <TeaserCard
          size="sm"
          node={x}
          key={x.id}
          sizeImg="md"
          lineClampTitle="line-clamp-2"
        />
      ))}
    </div>
  );
};

const LoadMore: FC<{ loadMore: ReturnType<typeof useData>["loadMore"] }> = ({
  loadMore,
}) => {
  return (
    <div className="pb-10 md:py-9">
      {!loadMore.isDisabled ? (
        <button
          className={clsx(
            "border border-ktc-borders py-2 rounded-md w-full text-base flex items-center justify-center gap-2",
          )}
          type="button"
          onClick={loadMore.execute}
        >
          <span className="text-[#111111] font-medium leading-5">
            Load More
          </span>
          <IoChevronDownOutline />
        </button>
      ) : null}
    </div>
  );
};

const LatestNews: FC = () => {
  const { params, incrementParams } = useParams(10);
  const { data } = useQuery(
    news.nodeListQueue({
      variables: { ...params, queueId: "latest_news" },
      options: {
        enabled: true,
      },
    }),
  );

  const { ref, items, loading } = useInfinite({
    items: data?.nodeListQueue?.items,
    incrementParams,
    total: data?.nodeListQueue?.total,
  });

  return (
    <div>
      <GenericNewsList
        data={!items.length ? data?.nodeListQueue?.items : items}
        disableAdverts={true}
      />
      <div ref={ref}>{loading && <div>Loading...</div>}</div>
    </div>
  );
};
