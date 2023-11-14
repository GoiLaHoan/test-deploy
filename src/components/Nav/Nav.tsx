import { useState } from "react";
import { useRouter } from "next/router";
import { List, Root, Viewport } from "@radix-ui/react-navigation-menu";
import { IoMenu } from "react-icons/io5";
import clsx from "clsx";

import { FavoritesBar } from "../FavoritesBar/FavoritesBar";
import BuySellItem from "./BuySellItem/BuySellItem";
import ChartsItem from "./ChartsItem/ChartsItem";
import MarketsItem from "./MarketsItem/MarketsItem";
import MiningItem from "./MiningItem/MiningItem";
import MoreItem from "./MoreItem/MoreItem";
import NewsItem from "./NewsItem/NewsItem";
import QuotesItem from "./QuotesItem/QuotesItem";

import Account from "./Account/Account";
import MobileFooter from "./MobileFooter/MobileFooter";
import Search, { SearchNavInput } from "./Search/Search";

import styles from "./Nav.module.scss";
import useScreenSize from "~/src/utils/useScreenSize";
import React from "react";
import { NavLogo } from "./NavLogo";

const Nav = () => {
  const r = useRouter();
  const [mobileNavActivate, setMobileNavActivate] = useState(false);
  const { isDesktop } = useScreenSize();

  return (
    <>
      <Root
        orientation={!isDesktop ? "vertical" : "horizontal"}
        className={clsx(
          "w-full relative",
          "px-2",
          mobileNavActivate ? "h-auto" : "h-14",
          r.pathname.includes("/news/video") ? "bg-[#0F181D]" : "bg-ktc-black",
        )}
      >
        <div
          className={clsx(
            "w-full h-full max-w-[1240px] px-2 mx-auto",
            "relative flex flex-wrap",
            "lg:flex-nowrap lg:justify-between",
          )}
        >
          <NavLogo />
          {!isDesktop && mobileNavActivate && (
            <div className={clsx("relative order-3 w-full mt-6")}>
              <SearchNavInput mobileNavActivate={mobileNavActivate} />
            </div>
          )}
          <List
            className={clsx(
              "h-full w-full left-0 mx-auto mt-20",
              "flex-col order-last",
              "lg:w-auto lg:flex-row lg:order-2 lg:mt-0",
              mobileNavActivate ? "flex" : "hidden lg:flex",
              // radix wraps this component in an unreachable parent div.. lol
              styles.radixList,
            )}
          >
            <BuySellItem />
            <QuotesItem />
            <ChartsItem />
            <MarketsItem />
            <NewsItem />
            <MiningItem />
            <MoreItem />
          </List>
          <MobileFooter />
          <List
            className={clsx(
              "h-14 max-h-full w-full",
              "flex justify-end z-[2147483647]",
              "self-start order-2",
              "lg:order-last",
              // radix wraps this component in an unreachable parent div.. lol
              styles.iconsParentDiv,
            )}
          >
            <Search
              mobileNavActivate={mobileNavActivate}
              toggleMobileNav={() => setMobileNavActivate(!mobileNavActivate)}
            />
            <Account />
            <li className={clsx(styles.hamburgerContainer)}>
              <button
                type="button"
                onClick={() => setMobileNavActivate(!mobileNavActivate)}
              >
                <IoMenu size="28px" color="white" />
              </button>
            </li>
          </List>
        </div>
        {isDesktop && (
          <div className={clsx("relative mt-1 w-full z-[20000000]", "mx-auto")}>
            <Viewport />
          </div>
        )}
      </Root>
      {/* dont show the favorites bar on video news paths */}
      {!r.pathname.includes("/video") ? <FavoritesBar /> : null}
    </>
  );
};

export default Nav;
