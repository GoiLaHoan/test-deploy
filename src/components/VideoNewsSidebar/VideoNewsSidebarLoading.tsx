// import BlockHeader from '../BlockHeader/BlockHeader'
import styles from "./VideoNewsSidebar.module.scss";

const VideoNewsSidebarLoading = () => (
  <div>
    {/* <BlockHeader title="Video News" /> */}
    <div className={styles.firstVideoContainerLoading}>
      <div className={styles.mainImgLoading} />
      <div className={styles.loadingText}></div>
      <div className={styles.loadingTextTwo}></div>
    </div>

    <div className={styles.gridTwoColumnLoading}>
      <div>
        <div className={styles.lilImgLoading} />
        <div className={styles.loadingText}></div>
        <div className={styles.loadingTextTwo}></div>
      </div>
      <div>
        <div className={styles.lilImgLoading} />
        <div className={styles.loadingText}></div>
        <div className={styles.loadingTextTwo}></div>
      </div>
    </div>
  </div>
);

export default VideoNewsSidebarLoading;
