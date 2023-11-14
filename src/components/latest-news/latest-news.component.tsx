import type { FC } from "react";
import { Fragment } from "react";
import { useQuery } from "react-query";
import { TeaserLabelTitleDate } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { ArticleTeaserFragmentFragment } from "~/src/generated";
import { news } from "~/src/lib/news-factory.lib";

// used on news landing and article detail page so far
export const LatestNewsNewsPages: FC = () => {
  const { data } = useQuery(
    news.nodeListQueue({
      variables: {
        limit: 5,
        offset: 0,
        queueId: "latest_news",
      },
    }),
  );
  return (
    <Fragment>
      <h3 className="uppercase text-base">
        <span>Latest News</span>
      </h3>
      <Spacer />
      {data?.nodeListQueue?.items?.map((x: ArticleTeaserFragmentFragment) => (
        <div className="pb-4" key={x.id}>
          <TeaserLabelTitleDate node={x} size="sm" />
        </div>
      ))}
    </Fragment>
  );
};

const Spacer = () => <div className="h-[1px] bg-ktc-borders my-2" />;
