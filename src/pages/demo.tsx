import React, { useCallback } from "react";
import { useQuery } from "react-query";
import { NewsArticle } from "~/src/generated";
import { news } from "../lib/news-factory.lib";
// import { vcms } from '../lib/vcms-factory.lib'

export async function getServerSideProps() {
  return {
    props: {
      // initialData: { test },
    },
  };
}

export default function Demo() {
  const article = useQuery(
    news.nodeByUrlAlias({
      variables: {
        urlAlias:
          "/news/article/2022-07-14/bmo-conference-2022-worry-about-mining-ceo-who-gold-bug-b2gold",
      },
    }),
  );

  // const vid = useQuery(
  //   vcms.videoByAlias({
  //     variables: {
  //       urlAlias:
  //         '/news/video/2022-12-19/sbf-is-a-pawn-someone-above-may-be-controlling-him-mark-yusko',
  //     },
  //   })
  // )

  const art = article?.data?.nodeByUrlAlias as NewsArticle;
  return (
    <div className="w-full m-auto mt-10 mb-20">
      <h1 className="mb-10 text-6xl font-bold">Charts Demo</h1>
      <main className={""}>
        <h1 className="text-2xl font-semibold">Technical Chart</h1>

        <div className="h-[800px] border">
          {/* <img src="http://www-origin.kitco.com/LFgif/aumay2021.gif" /> */}
        </div>

        <div>{/*<ChartThumb symbol="AG" timescale="1d" />*/}</div>
        <div>
          <h1>{art?.title}</h1>
          <Img article={art} />
        </div>
      </main>
    </div>
  );
}

function Img({ article }: { article: NewsArticle }) {
  const b = "https://kitco-images-resize-cdn.favish.workers.dev";
  const priceSrc = useCallback(() => {
    const src = article?.image?.detail?.sources;
    if (src?.desktop?.srcset) {
      const url = new URL(src?.desktop?.srcset);

      const cleanPath = url.pathname.replace("/image/", "");

      return `${b}/img/s_200x200/icms/${cleanPath}`;
    }
    return src?.desktop?.srcset;
  }, [article]);

  console.log(priceSrc());
  return <img src={priceSrc()} />;
}
