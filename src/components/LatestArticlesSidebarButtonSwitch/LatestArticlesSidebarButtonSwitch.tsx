import { FC } from "react";
import { LATEST_ARTICLE_VIEWS } from "~/src/types/enums";

import styles from "./LatestArticlesSidebarButtonSwitch.module.scss";

interface Props {
  view: LATEST_ARTICLE_VIEWS;
  setView: (arg0: LATEST_ARTICLE_VIEWS) => void;
  fetchVideos: () => void;
  fetchOpinions: () => void;
}

const LatestArticlesSidebarButtonSwitch: FC<Props> = ({
  view,
  setView,
  fetchVideos,
  fetchOpinions,
}) => {
  return (
    <div className={styles.buttonSwitchGrid}>
      <button
        type="button"
        className={
          view === LATEST_ARTICLE_VIEWS.NEWS ? styles.buttonActive : undefined
        }
        onClick={() => setView(LATEST_ARTICLE_VIEWS.NEWS)}
      >
        News
      </button>
      <button
        type="button"
        className={
          view === LATEST_ARTICLE_VIEWS.VIDEOS ? styles.buttonActive : undefined
        }
        onClick={() => setView(LATEST_ARTICLE_VIEWS.VIDEOS)}
        onMouseOver={() => fetchVideos()}
      >
        Videos
      </button>
      <button
        type="button"
        className={
          view === LATEST_ARTICLE_VIEWS.OPINIONS
            ? styles.buttonActive
            : undefined
        }
        onClick={() => setView(LATEST_ARTICLE_VIEWS.OPINIONS)}
        onMouseOver={() => fetchOpinions()}
      >
        Opinions
      </button>
    </div>
  );
};

export default LatestArticlesSidebarButtonSwitch;
