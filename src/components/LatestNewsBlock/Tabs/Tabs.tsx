import { FC } from "react";
import { LATEST_NEWS_TABS } from "~/src/types/index";

import cs from "~/src/utils/cs";
import styles from "./Tabs.module.scss";

interface Props {
  currentTab: any;
  setCurrentTab: any;
  // fetchMarketNews: () => void
  // fetchStreetNews: () => void
}

const Tabs: FC<Props> = ({
  currentTab,
  setCurrentTab,
  // fetchMarketNews,
  // fetchStreetNews,
}) => (
  <ul className={styles.tabs}>
    <li
      className={cs([
        styles.tab,
        currentTab === LATEST_NEWS_TABS.NEWS && styles.activeTab,
      ])}
      onClick={() => setCurrentTab(LATEST_NEWS_TABS.NEWS)}
    >
      <img
        src={
          currentTab === LATEST_NEWS_TABS.NEWS
            ? "/newsletter_icon_hover.png"
            : "/latest_icon.png"
        }
        alt="latest news"
        className={styles.icon}
      />
      <span>Latest Gold News</span>
    </li>
    <li
      className={cs([
        styles.tab,
        currentTab === LATEST_NEWS_TABS.MARKET && styles.activeTab,
      ])}
      onClick={(e) => {
        e.preventDefault();
        setCurrentTab(LATEST_NEWS_TABS.MARKET);
      }}
    >
      <img
        src={
          currentTab === LATEST_NEWS_TABS.MARKET
            ? "/market_icon_hover.png"
            : "/market_icon.png"
        }
        alt="latest news"
        className={styles.icon}
      />
      <span>Market News</span>
    </li>
    <li
      className={cs([
        styles.tab,
        currentTab === LATEST_NEWS_TABS.STREET && styles.activeTab,
      ])}
      onClick={(e) => {
        e.preventDefault();
        setCurrentTab(LATEST_NEWS_TABS.STREET);
      }}
    >
      <img
        src={
          currentTab === LATEST_NEWS_TABS.STREET
            ? "/bubbles_icon_hover.png"
            : "/bubbles_icon.png"
        }
        alt="latest news"
        className={styles.icon}
      />
      <span>Street Talk</span>
    </li>
  </ul>
);

export default Tabs;
