import { FC } from "react";
import styles from "./BreakingNewsJustIn.module.scss";
import JustInSVG from "./JustInSVG";

interface Props {
  body: string;
  byline: string;
  title: string;
  url: string;
}

// TODO: Add URL
const BreakingNewsJustIn: FC<Props> = ({ body, byline, url }) => {
  function openNewTab() {
    window.open(url, "_blank");
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      onClick={openNewTab}
      className={styles.link}
    >
      <div className={styles.svgContainer}>
        <JustInSVG />
      </div>
      <div className="px-3 py-2">
        {/* <h1 className="font-semibold text-black">{title}</h1> */}
        <p className="text-white">{body}</p>
        <p className="text-gray-400">{byline}</p>
      </div>
    </a>
  );
};

export default BreakingNewsJustIn;
