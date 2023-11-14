import { type FC, useCallback } from "react";
import { useQuery } from "react-query";
import {
  TeaserCard,
  TeaserTextOnly,
  TeaserWide,
} from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { GenericNewsList } from "~/src/components/generic-news-list/generic-news-list.component";
import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import { NewsCategoryTitle } from "~/src/components/news-category/news-category.component";
import { NewsByCategoryGenericQuery } from "~/src/generated";
import { TeasersUnion } from "~/src/types/types";
import { news } from "~/src/lib/news-factory.lib";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import { Spacer } from "~/src/components/spacer/spacer.component";
import useScreenSize from "~/src/utils/useScreenSize";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import { urlSafePath } from "~/src/utils/url-safe-path";
import type { GetServerSideProps } from "next";
import StrippedString from "~/src/utils/strippedString";

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  const parentCategory = urlSafePath(query?.parent as string);
  const subCategory = urlSafePath(query?.subcategory as string);

  const variables = {
    urlAlias: `/news/category/${parentCategory}/${subCategory}`,
    limit: 40,
    offset: 0,
    includeRelatedCategories: true,
  };

  // NOTE: TODO: wtf???
  // if you watch the fetch for this query in console.log,
  // you will see that for the initial fetch, subcategory is undefined
  // is next calling the index page at parent before the subcategory page?
  const { dehydratedState } = await ssrQueries({
    ctxRes: res,
    queries: [
      news.newsByCategoryGeneric({ variables }),
      news.newsCategoriesTree(),
    ],
  });

  return {
    props: {
      dehydratedState,
      variables,
    },
  };
};

const SubCategoryPage: FC<{
  variables: any;
}> = ({ variables }) => {
  const { params, incrementParams } = useParams(40);
  const { data } = useQuery(
    news.newsByCategoryGeneric({
      variables: { ...params, urlAlias: variables.urlAlias },
      options: {
        enabled: true,
        select: useCallback((d) => {
          const short = d?.nodeListByCategory;
          return {
            nodeListByCategory: {
              ...short,
              items: short?.items?.filter(
                (x) =>
                  x?.__typename !== "Commentary" && Object.keys(x).length !== 0,
              ),
            },
          };
        }, []),
      },
    }),
  );

  const { ref, items, loading } = useInfinite({
    items: data?.nodeListByCategory?.items,
    incrementParams,
    total: data?.nodeListByCategory?.total,
  });

  let itemsOrData = !items?.length ? data?.nodeListByCategory?.items : items;
  // Filter and handle teaserSnippet field missing
  itemsOrData = itemsOrData?.map((item) => {
    if (!item.teaserSnippet) {
      const pFirst = StrippedString(item?.source?.description)?.replace(
        "&nbsp;",
        " ",
      );
      return { ...item, teaserSnippet: pFirst };
    }
    return { ...item };
  });

  const { isMobile } = useScreenSize();

  return (
    <LayoutNewsLanding title="News">
      <div className="px-5 mx-auto w-full max-w-full box-border md:px-10 lg:px-10 xl:px-0 xl:w-[1240px]">
        <NewsCategoryTitle />
        {!isMobile ? (
          <FirstSectionDesktop data={itemsOrData?.slice(0, 4)} />
        ) : (
          <>
            <Spacer className="h-2.5 border-b border-ktc-borders" />
            <FirstSectionMobile data={itemsOrData?.slice(0, 4)} />
          </>
        )}
        <Spacer className="h-5" />
        <GenericNewsList
          data={itemsOrData?.slice(4, itemsOrData?.length)}
          hideCategory={true}
          layoutSecond={true}
        />
        <div ref={ref}>{loading && <div>Loading...</div>}</div>
      </div>
    </LayoutNewsLanding>
  );
};

export default SubCategoryPage;

type Data = NewsByCategoryGenericQuery["nodeListByCategory"]["items"];

const FirstSectionDesktop: FC<{ data: Data }> = ({ data }) => {
  return (
    <div className="flex flex-col pb-10 lg:pb-10 md:pb-0 border-b border-ktc-borders lg:flex-row">
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
