import React from "react";
import clsx from "clsx";

import * as Navigation from "./../Composables";
import BuySellMenu from "./BuySellMenu";

import styles from "./../item.module.scss";

const BuySellItem = () => {
  return (
    <Navigation.Item>
      <Navigation.Trigger>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://online.kitco.com/?utm_source=kitco.com&utm_medium=referral&utm_content=Menu-Coins-Online-Store-Button&utm_campaign=2017-03-23_kitcoweb"
          className={clsx(
            styles.goldBanner,
            "!block whitespace-nowrap font-medium",
          )}
        >
          Buy/Sell Gold &amp; Silver <br />
          <span>Bullion Coins and Bars</span>
        </a>
      </Navigation.Trigger>
      <Navigation.Content>
        <BuySellMenu />
      </Navigation.Content>
    </Navigation.Item>
  );
};

export default BuySellItem;
