// PLEASE DEPRECATE THIS COMPONENT / FILE
// PLEASE DEPRECATE THIS COMPONENT / FILE
// PLEASE DEPRECATE THIS COMPONENT / FILE
// PLEASE DEPRECATE THIS COMPONENT / FILE
// PLEASE DEPRECATE THIS COMPONENT / FILE
// PLEASE DEPRECATE THIS COMPONENT / FILE
// PLEASE DEPRECATE THIS COMPONENT / FILE

import ImageWithFallback from "~/src/components/ImageWithFallback/ImageWithFallback";
import dayjs from "dayjs";
import Link from "next/link";
import React, { FC } from "react";

import hrefMatcher from "~/src/utils/hrefMatcher";
import styles from "./ListItemFourLine.module.scss";
import cs from "~/src/utils/cs";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import { Spacer } from "~/src/components/spacer/spacer.component";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";

interface DataProps {
  authorName?: string;
  authorUrlAlias?: string;
  date?: string;
  summary?: string;
  image?: string;
  source?: string;
  title: string;
  url?: string;
  teaserHeadline?: string;
}

interface LoadingProps {
  howMany: number;
}

const Data: FC<DataProps> = ({
  authorName,
  authorUrlAlias,
  date,
  summary,
  image,
  source,
  title,
  url,
  teaserHeadline,
}) => {
  const imageExists = image && image.split("/?");

  return (
    <div className={styles.flexWrapper}>
      <div className={styles.articleContentContainer}>
        <Link href={hrefMatcher(url)} as={url}>
          <h3 className="font-semibold mb-1">{teaserHeadline ?? title}</h3>
        </Link>
        <div
          className={styles.articleDescription}
          dangerouslySetInnerHTML={{ __html: summary }}
        />
        {authorUrlAlias && (
          <Link href={hrefMatcher(url)} as={authorUrlAlias}>
            <span className={styles.author}>{authorName}</span>
          </Link>
        )}
        <p className={styles.date}>
          Kitco {source} · {dayjs(date).format("MMM DD - HH:mm")}
        </p>
      </div>
      <div className={styles.imageContainer}>
        {image && imageExists.length === 1 && (
          <Link href={hrefMatcher(url)} as={url}>
            <ImageWithFallback
              src={image}
              alt="Article Image"
              width="200"
              height="112"
              className={styles.imageTeaser}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

interface ArticleProps extends DataProps {
  size: string;
  categoryUrlAlias: string;
  categoryName: string;
}
const DataOnTheRight: FC<ArticleProps> = ({
  authorName,
  authorUrlAlias,
  date,
  summary,
  image,
  title,
  url,
  size,
  categoryUrlAlias,
  categoryName,
}) => {
  const sizeCSS = {
    sm: "text-[14px] leading-[142%]",
    md: "text-[16px] leading-[130%]",
    lg: "text-[20px] leading-[130%]",
    xl: "text-[34px] leading-[115%]",
  };

  const imgContainerCSS = {
    sm: "w-[120px]",
    md: "w-[120px]",
    lg: "w-[150px] relative",
    xl: "w-6/12 pr-[10px]",
  };

  const bodyContainerCSS = {
    sm: "block pl-[14px] pl-4 w-[calc(100%_-_120px)]",
    md: "block pl-[14px] pl-4 w-[calc(100%_-_120px)]",
    lg: "block pl-5 w-[calc(100%_-_150px)] mt-[-1px]",
    xl: "block pl-[10px] w-6/12",
  };

  const spacerCSS = {
    sm: "h-1",
    md: "h-1",
    lg: "h-2",
    xl: "h-2",
  };

  const sumaryCSS = {
    sm: "",
    md: "",
    lg: "",
    xl: "text-lg leading-[135%]",
  };

  const maxHeightCSS = {
    sm: "",
    md: "",
    lg: "max-h-[100px] h-[100px]",
    xl: "max-h-[250px]",
  };

  const marginCSS = {
    sm: "my-[20px]",
    md: "my-[20px]",
    lg: "my-[40px]",
    xl: "my-[40px]",
  };

  return (
    <div
      className={cs(["w-full flex", styles.articleDataRight, marginCSS[size]])}
    >
      <Link className={imgContainerCSS[size]} href={url ?? "/"}>
        <ImageMS
          src={image}
          alt="Article Image"
          priority={true}
          width={304}
          height={170}
          service="icms"
          className={cs([
            "rounded-lg aspect-video object-cover! w-full",
            maxHeightCSS[size],
          ])}
        />
      </Link>
      <div className={bodyContainerCSS[size]}>
        {categoryName && (
          <>
            <CategoryLink urlAlias={categoryUrlAlias} text={categoryName} />
            <div className="h-1 bg-transparent" />
          </>
        )}
        <Link href={url ?? "/"}>
          <>
            <h3 className={cs([sizeCSS[size], "line-clamp-3"])}>{title}</h3>
            <div className={cs([spacerCSS[size]])} />
            {(size === "lg" || size === "xl") && (
              <>
                <div
                  className={cs(["summary", sumaryCSS[size]])}
                  dangerouslySetInnerHTML={{ __html: summary }}
                ></div>
                <Spacer className="h-2" />
              </>
            )}
            {authorUrlAlias && (
              <Link href={authorUrlAlias} as={authorUrlAlias}>
                <span className={styles.author}>{authorName}</span>
              </Link>
            )}
            <DateStamp stamp={date} />
          </>
        </Link>
      </div>
    </div>
  );
};

const DateStamp: FC<{ stamp: string; classNames?: string }> = ({
  stamp,
  classNames,
}) => (
  <>
    <time
      className={cs([classNames, "text-sm text-ktc-date-gray font-medium"])}
    >
      {stamp && teaserTimestamp(stamp)}
    </time>
  </>
);

const Loading: FC<LoadingProps> = ({ howMany }) => {
  const loadersCount = Array.from({ length: howMany }, (_, i) => i);
  return (
    <>
      {loadersCount.map((v) => (
        <div className={styles.flexWrapper} key={v}>
          <div className={styles.articleContentContainer}>
            <div>
              <h3 className={styles.titleLoading}></h3>
              <div className={styles.summaryLoading}></div>
            </div>
            <p className={styles.authorLoading}></p>
            <p className={styles.dateLoading}></p>
          </div>
          <div className={styles.imageContainerLoading}></div>
        </div>
      ))}
    </>
  );
};

const CategoryLink: FC<{ urlAlias: string; text: string }> = ({
  urlAlias,
  text,
}) => (
  <>
    <div className="leading-[0]">
      <Link
        className={cs([
          "relative text-ktc-category uppercase font-extrabold !text-[12px] leading-none tracking-[0.15em]",
        ])}
        href={urlAlias ?? "/_error"}
      >
        {text}
      </Link>
    </div>
  </>
);

export default {
  Data,
  DataOnTheRight,
  Loading,
};
