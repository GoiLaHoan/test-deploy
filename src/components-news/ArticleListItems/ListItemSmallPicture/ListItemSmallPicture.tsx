import type { FC } from "react";

import styles from "./ListItemSmallPicture.module.scss";
import { ImageMS } from "~/src/components/ImageMS/ImageMS.component";
import cs from "~/src/utils/cs";
import useScreenSize from "~/src/utils/useScreenSize";
import { teaserTimestamp } from "~/src/utils/teaser-timestamp";

interface Props {
  date: string;
  summary: string;
  image: string;
  source: string;
  title: string;
}

const ListItemSmallPicture: FC<Props> = ({
  date,
  summary,
  image,
  source,
  title,
}) => {
  const { isMobile } = useScreenSize();
  const imgWidth = isMobile ? "w-[120px]" : "w-[150px]";
  const imgHeight = isMobile ? "h-[90px]" : "h-[100px]";
  const contentWidth = isMobile
    ? "w-[calc(100%_-_120px)]"
    : "w-[calc(100%_-_150px)]";
  return (
    <div className={styles.wrapper}>
      <div className={`${imgWidth} relative block aspect-video`}>
        <ImageMS
          src={image}
          alt={`${title}`}
          priority={true}
          width={304}
          height={170}
          service="icms"
          className={`${imgHeight} object-cover relative rounded-lg w-full`}
        />
      </div>
      <div className={`${contentWidth} block pl-[14px]`}>
        <h5
          className={cs([
            "text-[16px] leading-[130%] line-clamp-3",
            styles.title,
          ])}
        >
          {title}
        </h5>
        <p
          className={cs([
            "text-sm text-ktc-date-gray font-medium",
            styles.date,
          ])}
        >
          {source && (
            <>
              <span>{source}</span> |{" "}
            </>
          )}
          <time>{teaserTimestamp(date, "MMM DD")}</time>
        </p>
        <div className={styles.synopsis}>
          <div
            className={cs([
              "text-sm text-ktc-date-gray font-medium",
              styles.summary,
            ])}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListItemSmallPicture;
