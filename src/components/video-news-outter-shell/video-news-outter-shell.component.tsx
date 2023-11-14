import BlockHeader from "~/src/components/BlockHeader/BlockHeader";
import VideoNewsSidebar from "~/src/components/VideoNewsSidebar/VideoNewsSidebar";

import styles from "./video-news-outter-shell.module.scss";

export const VideoNewsOutter = () => {
  return (
    <div>
      <BlockHeader title="Video News" />
      <div className={styles.wrapperBorder}>
        <VideoNewsSidebar />
      </div>
    </div>
  );
};
