import type { FC } from "react";
import type { CommentaryTeaserFragmentFragment } from "~/src/generated";

import { useQuery } from "react-query";
import { TeaserTextOnlyWithAuthor } from "~/src/components-news/ArticleTeasers/teasers-from-figma.component";
import { news } from "~/src/lib/news-factory.lib";

// used on mobile and tablet component as well
export const OpinionsSection: FC = () => {
  const { data } = useQuery(
    news.newsCommentaries({
      variables: { limit: 4, offset: 0 },
    }),
  );
  return (
    <div className="flex flex-col gap-3">
      {data?.commentaries?.items?.map(
        (x: CommentaryTeaserFragmentFragment, indx: number) => (
          <div key={x.id}>
            <TeaserTextOnlyWithAuthor
              hideCategory={true}
              hideSummary={true}
              key={x.id}
              node={x as any}
              size="sm"
            />
            {data?.commentaries?.items.length !== indx + 1 && (
              <div className="border-b border-[#e5e5e5]" />
            )}
          </div>
        ),
      )}
    </div>
  );
};
