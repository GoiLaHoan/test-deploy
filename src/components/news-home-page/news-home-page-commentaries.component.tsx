import React from "react";
import type { CommentaryTeaserFragmentFragment } from "~/src/generated";

import ListItemOneLine from "~/src/components-news/ArticleListItems/ListItemOneLine/ListItemOneLine";
import ArticleMoreButton from "~/src/components/article-more-button/article-more-button.component";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";

export const NewsHomepageCommentaries = () => {
  const { data } = useQuery(
    news.nodeListQueueCommentaries({
      variables: {
        limit: 15,
        offset: 0,
      },
      options: {
        enabled: true,
      },
    }),
  );

  return (
    <div>
      <header className="border-b-[2px]">
        <h3 className="text-xl">Contributed Commentaries</h3>
      </header>
      <div className="mb-3">
        {data?.commentaries?.items?.map(
          (x: CommentaryTeaserFragmentFragment, idx: number) => (
            <ListItemOneLine
              isOdd={Boolean(idx % 2)}
              isBold={data?.ids.includes(x.id)}
              tag={{}}
              title={x.title}
              teaserHeadline={x?.teaserHeadline}
              source={!x.author?.name ? "" : x.author.name}
              date={x.createdAt}
              url={x.urlAlias}
              key={x.id}
            />
          ),
        )}
      </div>
      <footer>
        <ArticleMoreButton title="More Commentaries" href="/opinions" />
      </footer>
    </div>
  );
};
