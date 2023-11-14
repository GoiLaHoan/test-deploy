import React, { FC, useState } from "react";
import type {
  ArticleTeaserFragmentFragment,
  StreetTalk,
} from "~/src/generated";

import Tabs from "~/src/components/LatestNewsBlock/Tabs/Tabs";
import ListItemOneLine from "~/src/components-news/ArticleListItems/ListItemOneLine/ListItemOneLine";
import ArticleMoreButton from "~/src/components/article-more-button/article-more-button.component";

import { LATEST_NEWS_TABS } from "~/src/types/index";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

export const NewsHomepageDesktop = () => {
  const [currentTab, setCurrentTab] = useState(LATEST_NEWS_TABS.NEWS);

  return (
    <div>
      <header className="flex justify-between items-end">
        <Tabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          // fetchMarketNews={fetchMarketNews}
          // fetchStreetNews={fetchStreetNews}
        />
      </header>
      {currentTab === LATEST_NEWS_TABS.NEWS && <LatestNews />}
      {currentTab === LATEST_NEWS_TABS.MARKET && <MarketNews />}
      {currentTab === LATEST_NEWS_TABS.STREET && <StreetNews />}
      <footer>
        {currentTab === LATEST_NEWS_TABS.NEWS && (
          <ArticleMoreButton
            title={"More Gold News"}
            href="/news/category/commodities/gold"
          />
        )}
        {currentTab === LATEST_NEWS_TABS.MARKET && (
          <ArticleMoreButton
            title={"More Street Talk"}
            href="/news/digest#streettalk"
          />
        )}
        {currentTab === LATEST_NEWS_TABS.STREET && (
          <ArticleMoreButton
            title={"More Street Talk"}
            href="/news/digest#streettalk"
          />
        )}
      </footer>
    </div>
  );
};

const LatestNews = () => {
  const { data } = useQuery(
    news.nodeListQueue({
      variables: {
        limit: 15,
        offset: 0,
        queueId: "latest_news",
      },
    }),
  );

  return (
    <div className="mb-3">
      {data?.nodeListQueue?.items?.map(
        (x: ArticleTeaserFragmentFragment, idx) => (
          <ListItemOneLine
            isOdd={!(idx % 2)}
            isBold={data?.ids?.includes(x.id)}
            // tag={x.label} // TODO: FIX
            title={x.title}
            teaserHeadline={x?.teaserHeadline}
            source={x.source?.name}
            date={x.createdAt}
            url={x.urlAlias}
            key={x.id}
          />
        ),
      )}
    </div>
  );
};

const MarketNews: FC = () => {
  const { data } = useQuery(
    news.marketNews({
      variables: {
        limit: 15,
        offset: 0,
      },
      options: {
        enabled: true,
      },
    }),
  );

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <div className="mb-3">
      {data?.marketNews?.items?.map((x: any, idx: number) => (
        <ListItemOneLine
          isOdd={!(idx % 2)}
          isBold={false}
          tag={null}
          title={x.title}
          teaserHeadline={x?.teaserHeadline}
          source={x.source?.name}
          date={x.changed}
          key={x.id}
          url={x.urlAlias}
        />
      ))}
    </div>
  );
};

const StreetNews: FC = () => {
  const { data, isLoading } = useQuery(
    news.streetNews({
      variables: {
        limit: 15,
        offset: 0,
      },
      options: {
        enabled: true,
        retryOnMount: true,
        refetchOnMount: true,
      },
    }),
  );

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <div className="mb-3">
      {data?.nodeList?.items?.map((x: StreetTalk, idx) => (
        <ListItemOneLine
          isOdd={!(idx % 2)}
          isBold={false}
          tag={null}
          title={x.title}
          teaserHeadline={x?.teaserHeadline}
          source={x.source}
          date={x.createdAt}
          url={x.url}
          key={x.id}
        />
      ))}
    </div>
  );
};
