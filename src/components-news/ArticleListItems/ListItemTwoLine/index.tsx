import Link from "next/link";
import React, { FC } from "react";
import styles from "./ListItemTwoLine.module.scss";
import cs from "~/src/utils/cs";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";

interface LoadingProps {
  howMany: number;
}

interface DataProps {
  date: string;
  source: string;
  title: string;
  url: string;
}

const Data: FC<DataProps> = ({ date, source, title, url }) => {
  return (
    <div className={styles.item}>
      <Link
        className={cs([
          "text-[16px] leading-[130%] line-clamp-1",
          styles.title,
        ])}
        href={url}
      >
        {title}
      </Link>
      <h5 className="text-sm font-medium text-ktc-date-gray">
        {source && (
          <>
            <span className={styles.source}>{source}</span>|
          </>
        )}
        <time className={styles.date}>{teaserTimestamp(date, "MMM DD")}</time>
      </h5>
    </div>
  );
};

const Loading: FC<LoadingProps> = ({ howMany }) => {
  const loadersCount = Array.from({ length: howMany }, (_, i) => i);
  return (
    <>
      {loadersCount.map((v) => (
        <div className={styles.itemLoading} key={v}>
          <p />
          <h5 />
        </div>
      ))}
    </>
  );
};

export default {
  Data,
  Loading,
};
