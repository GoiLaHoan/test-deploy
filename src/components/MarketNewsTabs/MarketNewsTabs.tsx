import { FC } from "react";
import { MARKET_VIEWS } from "~/src/types/index";

import cs from "~/src/utils/cs";
import Link from "next/link";
import styles from "./MarketNewsTabs.module.scss";

interface Props {
  currentView: MARKET_VIEWS;
}

const MarketNewsTabs: FC<Props> = ({ currentView }) => {
  const allViews = [
    { id: 1, name: "Gold News", typing: MARKET_VIEWS.GOLD },
    { id: 2, name: "Market News", typing: MARKET_VIEWS.MARKET },
    { id: 3, name: "Street Talk", typing: MARKET_VIEWS.STREET },
    { id: 4, name: "All News", typing: MARKET_VIEWS.ALL },
  ];

  return (
    <div className={styles.tabsContainer}>
      {allViews.map(({ id, name, typing }) => (
        <Link
          href={`/news/more/${typing}`}
          as={`/news/more/${typing}`}
          key={id}
        >
          <>
            <button
              type="button"
              name={typing}
              className={
                currentView !== typing
                  ? cs([styles.tab])
                  : cs([styles.tab, styles.active])
              }
            >
              {name}
            </button>
          </>
        </Link>
      ))}
    </div>
  );
};

export default MarketNewsTabs;
