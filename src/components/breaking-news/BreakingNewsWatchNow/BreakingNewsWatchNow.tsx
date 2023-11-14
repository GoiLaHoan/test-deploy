import Link from "next/link";
import React, { FC } from "react";
import styles from "./BreakingNewsWatchNow.module.scss";
import WatchNowSVG from "./WatchNowSVG";

interface Props {
  body: string;
  byline: string;
  title: string;
  url: string;
}

// TODO: Add URL
const BreakingNewsWatchNow: FC<Props> = ({ body, byline, url }) => {
  return (
    <Link className={styles.link} href={url}>
      <>
        <div className={styles.imageContainer}>
          <WatchNowSVG />
        </div>
        <div className="px-3 py-2">
          {/* <h1 className="font-semibold text-black">{title}</h1> */}
          <p className="text-black">{body}</p>
          <p className="text-gray-700">{byline}</p>
        </div>
      </>
    </Link>
  );
};

export default BreakingNewsWatchNow;
