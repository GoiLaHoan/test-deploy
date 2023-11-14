import React, { FC, useEffect, useState } from "react";

import DigetNewsTabs from "~/src/components/DigetNewsTabs/DigetNewsTabs";
import Layout from "~/src/components/Layout/Layout";
import styles from "~/src/styles/pages/DigestNews.module.scss";
import HomePageChartCell from "~/src/features/home-page/HomePageChartCell";
import { clsx } from "clsx";
import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import {
  NewsDigestLatest,
  NewsDigestStreetTalk,
  NewsDigestByURL,
} from "~/src/components-news/NewsDigest/NewDigest";
import Router from "next/router";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { ssrQueries } from "~/src/utils/ssr-wrappers";
import { news } from "~/src/lib/news-factory.lib";
import { digest } from "~/src/lib/digest-factory.lib";

export const getServerSideProps: GetServerSideProps = async (c) => {
  const params = {
    limit: 40,
    offset: 0,
  };

  const { dehydratedState } = await ssrQueries({
    ctxRes: c.res,
    queries: [
      news.newsByCategoryGeneric({
        variables: { ...params, urlAlias: "/news/category/commodities" },
      }),
      news.newsByCategoryGeneric({
        variables: { ...params, urlAlias: "/news/category/cryptocurrencies" },
      }),
      news.newsByCategoryGeneric({
        variables: { ...params, urlAlias: "/news/category/mining" },
      }),
      news.newsByCategoryGeneric({
        variables: { ...params, urlAlias: "/news/category/economy" },
      }),
      digest.streetTalk({ variables: { ...params } }),
      digest.latestNews({ variables: { ...params } }),
    ],
  });
  return {
    props: { dehydratedState },
  };
};

const NewDigest: FC = () => {
  return (
    <Layout title="News Digest">
      <NewsDigestHead />
      <div className={clsx("gap-8", styles.digestWrapper)}>
        <div className={styles.contentRight}>
          <DigetNewsTabs />
          <ContentSection />
        </div>
        <div className={styles.chartLeft}>
          <div className={styles.chartWrapper}>
            <HomePageChartCell />
          </div>
          <AdvertisingSlot
            id={`adv-digest`}
            className={"md:h-[600px] md:w-[300px] bg-red-400 mx-auto"}
            viewportsEnabled={{
              mobile: true,
              tablet: false,
              desktop: false,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default NewDigest;

const NewsDigestHead = () => {
  return (
    <div className="border-b border-[#BFBFBF] mb-5 mx-5 xl:mx-0 layoutNewsDigest">
      <div
        className={clsx(
          styles.title,
          "flex items-center text-base text-[#0C87D2] md:hidden",
        )}
      >
        <h1
          className={clsx(
            'font-["Bebas_Neue"] uppercase text-[32px] md:leading-[58px] leading-[38px] md:text-[48px] text-[#232323]',
          )}
        >
          Market News Digest
        </h1>
      </div>
      <div className="hidden md:flex justify-between items-center">
        <div className="flex items-center leading-[38px] md:leading-[58px] mb-1">
          <Link href={"/news"}>
            <h1 className="font-['Bebas_Neue'] uppercase text-[32px] md:text-[48px] text-ktc-date-gray">
              NEWS
            </h1>
          </Link>
          <h1 className="font-['Bebas_Neue'] uppercase text-[32px] md:text-[48px] text-ktc-date-gray px-1 md:px-2">
            /
          </h1>
          <h1 className="font-['Bebas_Neue'] uppercase text-[32px] md:leading-[58px] leading-[38px] md:text-[48px] text-[#373737]">
            Market News Digest
          </h1>
        </div>
      </div>
    </div>
  );
};

const ContentSection = () => {
  const { router } = Router;
  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    setCurrentUrl(window.location.hash);
  }, [router?.asPath]);

  switch (currentUrl) {
    case "#metals":
      return (
        <NewsDigestByURL
          urlAlias="/news/category/commodities"
          title="Metals News"
        />
      );

    case "#crypto":
      return (
        <NewsDigestByURL
          urlAlias="/news/category/cryptocurrencies"
          title="Crypto News"
        />
      );

    case "#mining":
      return (
        <NewsDigestByURL urlAlias="/news/category/mining" title="Mining News" />
      );

    case "#market":
      return (
        <NewsDigestByURL
          urlAlias="/news/category/economy"
          title="Market News"
        />
      );

    case "#streettalk":
      return <NewsDigestStreetTalk />;

    default:
      return <NewsDigestLatest />;
  }
};
