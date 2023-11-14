import { FC, useState } from "react";
import { LATEST_ARTICLE_VIEWS } from "~/src/types/enums";

import BlockHeader from "~/src/components/BlockHeader/BlockHeader";

import ArticleTileMini from "~/src/components-news/ArticleTileMini/ArticleTileMini";
import LatestArticlesSidebarButtonSwitch from "~/src/components/LatestArticlesSidebarButtonSwitch/LatestArticlesSidebarButtonSwitch";
import VideoNewsSidebar from "~/src/components/VideoNewsSidebar/VideoNewsSidebar";
import { useQuery } from "react-query";
import {
  ArticleTeaserFragmentFragment,
  NodeListQueueQuery,
  // Commentary,
} from "~/src/generated";
import { news } from "~/src/lib/news-factory.lib";
import styles from "./latest-articles-sidebar.module.scss";

// TODO: this component should be responsible for its own data fetching, stop passing as prop
// TODO: also give it its own gql file and queries, no recycling
export const LatestArticlesSidebar: FC<{ data: NodeListQueueQuery }> = ({
  data,
}) => {
  const [view, setView] = useState<LATEST_ARTICLE_VIEWS>(
    LATEST_ARTICLE_VIEWS.NEWS,
  );

  const { data: opinions } = useQuery(
    news.newsCommentaries({
      variables: { limit: 5, offset: 0 },
      options: { enabled: view === LATEST_ARTICLE_VIEWS.OPINIONS },
    }),
  );

  const loaders = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <div>
      <BlockHeader title="Latest Articles" />
      <div className={styles.borderWrapper}>
        <LatestArticlesSidebarButtonSwitch
          view={view}
          setView={setView}
          fetchVideos={() => console.warn("FIX THIS")}
          fetchOpinions={() => console.warn("FIX THIS")}
        />
        {view === LATEST_ARTICLE_VIEWS.NEWS && (
          <>
            {!data ? (
              <>
                {loaders.map((_, idx) => (
                  <ArticleTileMini id={null} key={idx} />
                ))}
              </>
            ) : (
              data?.nodeListQueue?.items?.map(
                (x: ArticleTeaserFragmentFragment) => (
                  <ArticleTileMini
                    key={x.id}
                    url={x.urlAlias}
                    id={x.id}
                    title={x.title}
                    teaserHeadline={x?.teaserHeadline}
                    date={x.createdAt}
                    // category={!x.category ? '' : x.category[0].name}
                    category=""
                  />
                ),
              )
            )}
          </>
        )}

        {view === "videos" && <VideoNewsSidebar />}
        {view === "opinions" && (
          <>
            {!opinions ? (
              <>
                {loaders.map((_, idx) => (
                  <ArticleTileMini id={null} key={idx} />
                ))}
              </>
            ) : (
              // TODO: FIX THIS TYPE PRONTO
              opinions?.commentaries?.items?.map((x: any) => (
                <ArticleTileMini
                  key={x.id}
                  url={x.urlAlias}
                  id={x.id}
                  author={x.author?.name}
                  title={x.title}
                  teaserHeadline={x?.teaserHeadline}
                  date={x.createdAt}
                  // category={!x.category ? '' : x.category[0].name}
                  category=""
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};
