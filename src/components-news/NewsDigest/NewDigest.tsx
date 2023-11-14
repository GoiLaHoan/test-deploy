import dayjs from "dayjs";
import type { FC } from "react";
import cs from "~/src/utils/cs";
import { useQuery } from "react-query";

import { digest } from "~/src/lib/digest-factory.lib";
import { useParams, useInfinite } from "~/src/utils/infiniteScroll";
import { news } from "~/src/lib/news-factory.lib";
import styles from "~/src/styles/pages/DigestNews.module.scss";

export const NewsDigestLatest: FC = () => {
  const { params, incrementParams } = useParams(40, 20);
  const { data } = useQuery(
    digest.latestNews({ variables: { ...params }, options: { enabled: true } }),
  );
  const { items, fetchMore, isNextPage } = useInfinite({
    items: data?.nodeListQueue?.items,
    incrementParams,
    total: data?.nodeListQueue?.total,
  });

  return (
    <>
      <LatestNews items={items?.slice(0, 20)} title="Latest News" />
      <div className={styles.dividerBold} />
      <section>
        <NewsMore items={items?.slice(20)} />
        <LoadMoreButton isNextPage={isNextPage} fetchMore={fetchMore} />
      </section>
    </>
  );
};

export const NewsDigestByURL: FC<{ urlAlias: string; title: string }> = ({
  urlAlias,
  title,
}) => {
  const { params, incrementParams } = useParams(40, 20);
  const { data } = useQuery(
    news.newsByCategoryGeneric({
      variables: { ...params, urlAlias: urlAlias },
      options: {
        enabled: true,
      },
    }),
  );
  const { items, fetchMore, isNextPage } = useInfinite({
    items: data?.nodeListByCategory?.items,
    incrementParams,
    total: data?.nodeListByCategory?.total,
  });

  return (
    <section>
      <LatestNews items={items?.slice(0, 20)} title={title} />
      <div className={styles.dividerBold} />
      <section>
        <NewsMore items={items?.slice(20)} />
        <LoadMoreButton isNextPage={isNextPage} fetchMore={fetchMore} />
      </section>
    </section>
  );
};

export const NewsDigestStreetTalk: FC = () => {
  const { params, incrementParams } = useParams(40, 20);
  const { data } = useQuery(
    digest.streetTalk({
      variables: { ...params },
      options: {
        enabled: true,
      },
    }),
  );
  const { items, fetchMore, isNextPage } = useInfinite({
    items: data?.nodeList?.items,
    incrementParams,
    total: data?.nodeList?.total,
  });

  return (
    <section>
      <LatestNews items={items?.slice(0, 20)} title="Street Talk" />
      <div className={styles.dividerBold} />
      <section>
        <NewsMore items={items?.slice(20)} />
        <LoadMoreButton isNextPage={isNextPage} fetchMore={fetchMore} />
      </section>
    </section>
  );
};

const LatestNews: FC<{
  items: any[];
  title: string;
}> = ({ items, title }) => {
  return (
    <section className="mb-8">
      <h2 className={styles.sectionTitle}>{title}</h2>
      {items?.map((x) => (
        <NewDigestItem key={x.id} x={x} />
      ))}
    </section>
  );
};

const NewsMore: FC<{
  items: any[];
}> = ({ items }) => {
  return (
    <>
      <h2 className={styles.sectionTitle}>More News</h2>
      <div className="news-section-wrapper">
        {items?.map((x: any) => (
          <NewDigestItem x={x} key={x.id} />
        ))}
      </div>
    </>
  );
};

const NewDigestItem: FC<{
  x: any;
}> = ({ x }) => {
  return (
    <div className={cs(["flex justify-between", styles.newItem])} key={x.id}>
      <a href={x.urlAlias ? x.urlAlias : x.url} className="grow">
        <h5 className="font-normal text-gray-800 pr-8 line-clamp-1">
          {x?.title}
        </h5>
      </a>
      <span className={cs(["grow-0 px-2 line-clamp-1", styles.itemSource])}>
        {x.sourceText ? x.sourceText : x?.source?.name}
      </span>
      <p className="text-gray-500 grow-0">
        {dayjs(x.updatedAt).format("MMM DD, YYYY hh:mmA")}
      </p>
    </div>
  );
};

const LoadMoreButton: FC<{ isNextPage: boolean; fetchMore: any }> = ({
  isNextPage,
  fetchMore,
}) => {
  return (
    <div className="py-10">
      <button
        className={cs([
          "py-3 rounded-md text-base float-right",
          !isNextPage && "cursor-not-allowed text-ktc-date-gray",
        ])}
        type="button"
        onClick={() => fetchMore()}
      >
        <span className="font-bold text-sm uppercase tracking-normal">
          LOAD MORE NEWS
        </span>
        <div className={styles.chevronDown}>
          <svg
            className={cs([styles.mdsIcon, !isNextPage && styles.iconDisable])}
            id="icon-arrow-down"
            viewBox="0 0 24 24"
          >
            <title>icon-arrow-down</title>
            <polyline points="20.48 7.76 12 16.24 3.52 7.76"></polyline>
          </svg>
          <svg
            className={cs([styles.mdsIcon, !isNextPage && styles.iconDisable])}
            id="icon-arrow-down"
            viewBox="0 0 24 24"
          >
            <title>icon-arrow-down</title>
            <polyline points="20.48 7.76 12 16.24 3.52 7.76"></polyline>
          </svg>
        </div>
      </button>
    </div>
  );
};
