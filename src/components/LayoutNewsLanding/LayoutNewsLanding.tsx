import AdvertisingSlot from "~/src/features/advertising/AdvertisingSlot";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Nav from "../Nav/Nav";

import React from "react";
import { clsx } from "clsx";
import css from "./layout-news-landing.module.scss";
import darkStyles from "./dark-mode-styles.module.scss";

const LayoutNewsLanding = ({
  children,
  title,
  enableDarkBG,
  isPageNotCrawlable,
}: {
  children?: React.ReactNode;
  title: string;
  isPageNotCrawlable?: boolean;
  enableDarkBG?: boolean;
}) => {
  return (
    <div className={clsx(!enableDarkBG ? undefined : "bg-[#0F181D]")}>
      <Header isPageNotCrawlable={isPageNotCrawlable} title={title} />
      <div className="py-8">
        <AdvertisingSlot
          id={"leaderboard"}
          className={clsx(
            "h-[100px] w-[320px] md:h-[90px] md:w-[728px]",
            "mx-auto bg-red-400",
            "flex justify-center items-center",
          )}
          viewportsEnabled={{ desktop: true, tablet: true, mobile: true }}
        />
      </div>
      <Nav />
      {!enableDarkBG && <div className="relative h-5 md:h-10" />}
      <main
        className={clsx(
          css.fontify,
          !enableDarkBG ? undefined : darkStyles.donnieDarko,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutNewsLanding;
