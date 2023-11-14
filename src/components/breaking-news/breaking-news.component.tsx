import { FC, useEffect, useState } from "react";

// TODO: Fix this dir structure and naming
import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import BreakingNewsJustIn from "./BreakingNewsJustIn/BreakingNewsJustIn";
import BreakingNewsWatchNow from "./BreakingNewsWatchNow/BreakingNewsWatchNow";

export const BreakingNews: FC = () => {
  const [idx, setIdx] = useState(0);
  const { data } = useQuery(news.breakingNews({}));
  const list = data?.nodeList?.items as any[];

  useEffect(() => {
    const interval = setInterval(() => {
      if (list) {
        const humanLength = list.length - 1;
        if (idx === humanLength) {
          setIdx(0);
        } else {
          setIdx(idx + 1);
        }
      }
    }, 5000);
    return () => window.clearInterval(interval);
  }, [setIdx]);

  return (
    <>
      {data &&
        list?.length > 0 &&
        ((list?.[idx].category === "watch_now" && (
          <BreakingNewsWatchNow
            body={list[idx].title}
            byline={list[idx].byline}
            title={list[idx].title}
            url={list[idx].url}
            key={list[idx].id}
          />
        )) ||
          (list?.[idx].category === "just_in" && (
            <BreakingNewsJustIn
              body={list[idx].title}
              title={list[idx].title}
              byline={list[idx].byline}
              key={list[idx].id}
              url={list[idx].url}
            />
          )))}
    </>
  );
};
