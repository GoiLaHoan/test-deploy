import ListItemOneLine from "~/src/components-news/ArticleListItems/ListItemOneLine/ListItemOneLine";
import React from "react";
import { useQuery } from "react-query";
import type { PressRelease } from "~/src/generated";
import { news } from "~/src/lib/news-factory.lib";
import ArticleMoreButton from "~/src/components/article-more-button/article-more-button.component";
import styles from "./press-releases.module.scss";
import Link from "next/link";

export const PressReleases = () => {
  const test = useQuery(
    news.nodeListPressReleases({
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
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>Latest Press Releases</h3>
      </header>
      <div className={styles.articleList}>
        {test?.data?.nodeList?.items?.map((x: PressRelease, idx) => (
          <ListItemOneLine
            isOdd={Boolean(idx % 2)}
            // @ts-ignore TODO: fix this
            isBold={test?.data?.ids?.includes(x.id)}
            tag={null}
            title={x.title}
            teaserHeadline={x?.teaserHeadline}
            source={!x.author ? "" : x.author.name}
            date={x.createdAt}
            url={x?.url}
            key={x.id}
          />
        ))}
      </div>
      <footer className={styles.footer}>
        <ArticleMoreButton
          title={"More Press Releases"}
          href="/mining/press-release"
        />
      </footer>
    </div>
  );
};

export const PressReleaseForSidebar = () => {
  const data = useQuery(
    news.nodeListPressReleases({
      variables: {
        limit: 6,
        offset: 0,
      },
      options: {
        enabled: true,
      },
    }),
  );

  return (
    <>
      <div className={styles.widgetContainer}>
        <h3 className={styles.sidebarTitle}>Latest Press Releases</h3>
        <div className={styles.prWrapper}>
          <div className="pr--banner">
            <table>
              <tbody>
                <tr>
                  <td>
                    <a
                      href="https://www.kitco.com/scripts/count/count_db.pl?id=8290024"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        alt='Discovery-Silver-PR"'
                        src="https://www.kitco.com/images/spots/Discovery-Silver_Tony-Makuch-PARP-Mining-Black_PNG_278x120_2023-01-24.png"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.prNewsBlockWrap}>
            {data?.data?.nodeList?.items?.map((x: PressRelease) => (
              <div className={styles.prNewsBlock} key={x.id}>
                <a href={x.url}>{x?.teaserHeadline ?? x.title}</a>
              </div>
            ))}
          </div>

          <div className={styles.prButton}>
            <Link href={"/mining/press-release"}>
              <button className={styles.button}>+ More Press Releases</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
