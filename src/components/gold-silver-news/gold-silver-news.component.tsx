import ListItemTwoLine from "~/src/components-news/ArticleListItems/ListItemTwoLine";
import dayjs from "dayjs";
import { ArticleTeaserFragmentFragment } from "~/src/generated";

import { useQuery } from "react-query";
import { news } from "~/src/lib/news-factory.lib";
import styles from "./gold-silver-news.module.scss";
import ArticleMoreButton from "../article-more-button/article-more-button.component";
import ListItemOneLine from "~/src/components-news/ArticleListItems/ListItemOneLine/ListItemOneLine";
import Link from "next/link";
import { ImageMS } from "../ImageMS/ImageMS.component";

const GoldSilverNews = () => {
  const { data } = useQuery(
    news.nodeListQueue({
      variables: {
        limit: 11,
        offset: 0,
        queueId: "latest_news",
      },
    }),
  );

  return (
    <section className={styles.section}>
      <h1 className={styles.sectionTitle}>
        Gold And Silver Prices, News and Quotes
      </h1>
      <div className={styles.lineTitle} />
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          {data?.nodeListQueue?.items?.slice(0, 1).map((x: any) => (
            <div key={x.id}>
              <Link href={x.urlAlias}>
                {x?.image.detail?.default?.srcset && (
                  <ImageMS
                    src={
                      x?.image.detail?.default?.srcset ??
                      x?.legacyThumbnailImageUrl
                    }
                    alt={`${x.title}`}
                    priority={true}
                    width={304}
                    height={170}
                    service="icms"
                    className={`object-cover relative rounded-lg w-full`}
                  />
                )}
                <h6 className={styles.title}>{x.title}</h6>
              </Link>
              <p className={styles.date}>
                {x.source?.name && `${x.source?.name} |`}{" "}
                {dayjs(x.updatedAt).format("MMM DD")}
              </p>
              <div
                dangerouslySetInnerHTML={{ __html: x.teaserSnippet }}
                className="text-sm font-medium text-ktc-date-gray font-mulish"
              ></div>
            </div>
          ))}
        </div>
        <div className={styles.rightColumn}>
          {!data ? (
            <ListItemTwoLine.Loading howMany={10} />
          ) : (
            data.nodeListQueue.items
              .slice(1, 11)
              .map((x: ArticleTeaserFragmentFragment, idx) => (
                <ListItemOneLine
                  date={x.createdAt}
                  source={x.source?.name}
                  title={x.title}
                  teaserHeadline={x?.teaserHeadline}
                  url={x.urlAlias}
                  key={x.id}
                  isOdd={!(idx % 2)}
                  isBold={data?.ids?.includes(x.id)}
                />
              ))
          )}
        </div>
      </div>
      <div className={styles.bottomPanel} />
      <ArticleMoreButton title={"More News"} href="/news/digest" />
    </section>
  );
};

export default GoldSilverNews;
