import type { GetServerSideProps, NextPage } from "next";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import useScreenSize from "~/src/utils/useScreenSize";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { urlSafePath } from "~/src/utils/url-safe-path";

import LayoutNewsLanding from "~/src/components/LayoutNewsLanding/LayoutNewsLanding";
import ListItemFourLine from "~/src/components-news/ArticleListItems/ListItemFourLine";
import AuthorPageTitleBlock from "~/src/components-news/AuthorPageTitleBlock/AuthorPageTitleBlock";

import ContributorsCell from "~/src/components-news/ContributorsCell/ContributorsCell";
import ReportersCell from "~/src/components-news/ReportersCell/ReportersCell";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import { TeaserWide } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";

import clsx from "clsx";
import styles from "./author-page.module.scss";

export const getServerSideProps = (async (c) => {
  const authorPath = urlSafePath(c.query.alias as string);

  const { dehydratedState } = await ssrQueries({
    ctxRes: c.res,
    queries: [
      news.reporters(),
      news.authorByUrlAlias({
        variables: { urlAlias: `/author/${authorPath}` },
      }),
      news.nodeListByAuthor({
        variables: {
          urlAlias: `/author/${authorPath}`,
          limit: 20,
          offset: 0,
        },
      }),
    ],
  });
  let isAuthorHidden: boolean;
  for (const x of dehydratedState?.queries ?? []) {
    if (x?.state?.data?.authorByUrlAlias?.hidden) {
      isAuthorHidden = true;
      break;
    } else {
      isAuthorHidden = false;
    }
  }

  return {
    props: {
      dehydratedState,
      alias: c.query.alias,
      isPageNotCrawlable: isAuthorHidden,
    },
  };
}) satisfies GetServerSideProps;

const AuthorPage: NextPage<{ alias: string; isPageNotCrawlable: boolean }> = ({
  alias,
  isPageNotCrawlable,
}) => {
  const { data: author } = useQuery(
    news.authorByUrlAlias({
      variables: { urlAlias: `/author/${alias}` },
      options: {
        enabled: true,
      },
    }),
  );

  const { params, incrementParams } = useParams(20);
  const { data } = useQuery(
    news.nodeListByAuthor({
      variables: { ...params, urlAlias: `/author/${alias}` },
      options: {
        enabled: true,
      },
    }),
  );

  const { ref, items, loading } = useInfinite({
    items: data?.nodeListByAuthor?.items,
    incrementParams,
    total: data?.nodeListByAuthor?.total,
  });

  const { isMobile } = useScreenSize();

  const dataItems = !items.length ? data?.nodeListByAuthor?.items : items;

  return (
    <LayoutNewsLanding isPageNotCrawlable={isPageNotCrawlable} title={alias}>
      <div
        className={clsx(
          "px-[20px] mx-auto md:px-10 lg:px-10 xl:px-0",
          "w-full max-w-full",
          "box-border xl:w-[1240px]",
        )}
      >
        {/* main content */}
        <div className="pt-2.5">
          {!author?.authorByUrlAlias ? (
            <AuthorPageTitleBlock loading={true} author={null} />
          ) : (
            <AuthorPageTitleBlock
              author={author?.authorByUrlAlias}
              loading={false}
            />
          )}
        </div>

        <div className="block lg:layout-cols-2">
          <section className="mr-0 lg:mr-12">
            <h4 className={styles.sectionTitle}>Latest</h4>
            <ul className="pt-8 md:pt-0">
              {!dataItems ? (
                <ListItemFourLine.Loading howMany={5} />
              ) : (
                dataItems.map((node: any) => (
                  <>
                    {isMobile ? (
                      <TeaserWide
                        node={node}
                        size="md"
                        aspectRatio="16x9"
                        key={node.id}
                        hideCategory={true}
                      />
                    ) : (
                      <ListItemFourLine.DataOnTheRight
                        key={node.id}
                        authorName={node.author?.fullName}
                        authorUrlAlias={node.author?.urlAlias}
                        date={node.updatedAt}
                        summary={node.teaserSnippet}
                        image={
                          node.image?.detail?.sources?.desktop?.srcset ??
                          node?.legacyThumbnailImageUrl
                        }
                        source={node.__typename}
                        title={node.title}
                        url={node.urlAlias}
                        categoryUrlAlias={node?.category?.urlAlias}
                        categoryName={node?.category?.name}
                        size="lg"
                      />
                    )}
                  </>
                ))
              )}
            </ul>
            <div ref={ref}>{loading && <div>Loading...</div>}</div>
          </section>
          <div className={clsx("hidden lg:block")}>
            {/* FIX: on mobile, lets try to keep these from rendering so we dont have to make network requests */}
            {/* {!isDesktop ? null : ( */}
            <>
              <ReportersCell />
              <ContributorsCell />
            </>
            {/* )} */}
          </div>
        </div>
      </div>
    </LayoutNewsLanding>
  );
};

export default AuthorPage;
