import Link from "next/link";
import React from "react";
import styles from "./ListItemOneLine.module.scss";

import ArticleTeaserListItemTag from "../../ArticleTeaserListItemTag/ArticleTeaserListItemTag";

import hrefMatcher from "~/src/utils/hrefMatcher";
import type { Label } from "~/src/generated";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";

interface Props {
  title: string;
  teaserHeadline: string;
  source: string;
  date: string;
  tag?: Label;
  isOdd: boolean;
  isBold: boolean;
  url: string;
}

const ListItemOneLine: React.FC<Props> = ({
  date,
  title,
  teaserHeadline,
  source,
  tag,
  isOdd,
  isBold,
  url,
}) => {
  const containerStyle = [styles.container, isOdd && styles.odd]
    .filter((e) => e)
    .join(" ");

  const titleStyle = [styles.title, isBold && styles.bold]
    .filter((e) => e)
    .join(" ");

  return (
    <div className={containerStyle}>
      <div className="flex items-center">
        <ArticleTeaserListItemTag tag={tag} />{" "}
        {!hrefMatcher(url) ? (
          <a href={url} className={titleStyle}>
            {teaserHeadline ?? title}
          </a>
        ) : (
          <Link className={titleStyle} href={url}>
            {teaserHeadline ?? title}
          </Link>
        )}
      </div>
      <div>
        <span className={styles.source}>{source}</span>{" "}
        <time>{teaserTimestamp(date, "MMM DD")}</time>
      </div>
    </div>
  );
};

export default ListItemOneLine;
