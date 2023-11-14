import Router from "next/router";
import { FC, useEffect, useState } from "react";
import { DIGEST_NEWS } from "~/src/types/index";

import cs from "~/src/utils/cs";
import styles from "./DigetNewsTabs.module.scss";

const DigetNewsTabs: FC = () => {
  const { router } = Router;
  const allViews = [
    { id: 1, name: "Latest News", typing: DIGEST_NEWS.LASTEST },
    { id: 2, name: "Metals News", typing: DIGEST_NEWS.METALS },
    { id: 3, name: "Crypto News", typing: DIGEST_NEWS.CRYPTO },
    { id: 4, name: "Mining News", typing: DIGEST_NEWS.MINING },
    { id: 5, name: "Market News", typing: DIGEST_NEWS.MARKET },
    { id: 6, name: "Street Talk", typing: DIGEST_NEWS.STREET_TALK },
  ];

  const [currentUrl, setCurrentUrl] = useState("");
  useEffect(() => {
    setCurrentUrl(window.location.hash);
  }, [router?.asPath]);

  const activeTab = (typing) => {
    if (!currentUrl && typing === DIGEST_NEWS.LASTEST) return true;
    if (currentUrl === `#${typing}`) return true;

    return false;
  };

  const handleClick = (typing) => {
    return router.push(`/news/digest#${typing}`);
  };

  return (
    <div className={styles.tabsContainer}>
      {allViews.map(({ id, name, typing }) => (
        <button
          key={id}
          type="button"
          onClick={(event) => {
            activeTab(typing) ? event.preventDefault() : handleClick(typing);
          }}
          className={
            !activeTab(typing)
              ? cs([styles.tab])
              : cs([styles.tab, styles.active])
          }
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default DigetNewsTabs;
