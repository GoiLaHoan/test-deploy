import { FC, useEffect, useState } from "react";

import { useQuery } from "react-query";
import { LatestArticlesSidebar } from "~/src/components/latest-articles-sidebar/latest-articles-sidebar.component";
import { news } from "~/src/lib/news-factory.lib";

export const variables = {
  limit: 10,
  offset: 0,
};

const LatestNewsCell: FC<{ limit?: number }> = ({ limit }) => {
  const [shouldEnable, setShouldEnable] = useState(false);
  const { data } = useQuery(
    news.nodeListQueue({
      variables: {
        limit: limit ? limit : 10,
        offset: 0,
        queueId: "latest_news",
      },
      options: {
        enabled: shouldEnable,
      },
    }),
  );

  useEffect(() => {
    if (!data?.nodeListQueue?.items?.length) {
      setShouldEnable(true);
    }
  }, [data?.nodeListQueue?.items?.length]);

  return (
    <div>
      <LatestArticlesSidebar data={data} />
    </div>
  );
};

export default LatestNewsCell;
